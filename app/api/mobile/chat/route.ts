import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getPersonalityById } from "@/db/personalities"; // ajusta el import si se llama distinto

export async function POST(req: NextRequest) {
  try {
    const openAiApiKey = process.env.OPENAI_API_KEY;
    if (!openAiApiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { personality_id, message, voice } = body as {
      personality_id?: string;
      message?: string;
      voice?: boolean;
    };

    if (!personality_id || !message) {
      return NextResponse.json(
        { error: "personality_id and message are required" },
        { status: 400 },
      );
    }

    const supabase = createClient();
    const personality = await getPersonalityById(supabase, personality_id);
    if (!personality) {
      return NextResponse.json(
        { error: "Personality not found" },
        { status: 404 },
      );
    }

    const systemPrompt =
      personality.character_prompt ||
      `You are ${personality.title}. Respond in a friendly way.`;

    // 1) Chat de texto (igual que antes)
    const completionRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
        }),
      },
    );

    if (!completionRes.ok) {
      const text = await completionRes.text();
      console.error("OpenAI error:", text);
      return NextResponse.json(
        { error: "OpenAI API error", details: text },
        { status: 500 },
      );
    }

    const completionJson = await completionRes.json();
    const reply: string =
      completionJson.choices?.[0]?.message?.content ?? "No response";

    // 2) Si el cliente pide voz, generamos audio con audio/speech
    let audioBase64: string | null = null;
    let audioFormat: string | null = null;

    if (voice) {
      const ttsRes = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini-tts", // modelo TTS recomendado:contentReference[oaicite:1]{index=1}
          voice: personality.oai_voice || "alloy", // usa el voice de la personalidad o default
          input: reply,
          response_format: "mp3",
        }),
      });

      if (!ttsRes.ok) {
        const text = await ttsRes.text();
        console.error("TTS error:", text);
        // no rompemos todo, solo devolvemos texto
      } else {
        const arrayBuffer = await ttsRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        audioBase64 = buffer.toString("base64");
        audioFormat = "mp3";
      }
    }

    return NextResponse.json({
      ok: true,
      reply,
      audio_base64: audioBase64,
      audio_format: audioFormat,
    });
  } catch (error) {
    console.error("Error in /api/mobile/chat", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
