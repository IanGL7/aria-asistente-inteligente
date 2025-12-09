// app/api/mobile/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import { createClient } from "@/utils/supabase/server";
import { getPersonalityById } from "@/db/personalities";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const openAiApiKey = process.env.OPENAI_API_KEY;
    if (!openAiApiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 },
      );
    }

    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 },
      );
    }

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

    // 1) Obtener personalidad desde Supabase
    const supabase = createClient();
    const personality = await getPersonalityById(supabase, personality_id);

    if (!personality) {
      return NextResponse.json(
        { error: "Personality not found" },
        { status: 404 },
      );
    }

    // Prompt base alineado con Aria
    const systemPrompt =
      personality.character_prompt &&
      personality.character_prompt.trim().length > 0
        ? personality.character_prompt
        : `Eres ${personality.title}, un asistente del proyecto Aria. 
Responde siempre en español neutro, con tono cálido, claro y respetuoso. 
Habla con frases cortas y fáciles de entender.`;

    // 2) Llamada de chat (texto) a OpenAI
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
      console.error("OpenAI chat error:", text);
      return NextResponse.json(
        { error: "OpenAI chat API error", details: text },
        { status: 500 },
      );
    }

    const completionJson = (await completionRes.json()) as any;
    const reply: string =
      completionJson.choices?.[0]?.message?.content ?? "No response";

    // 3) Si se pide voz, generamos audio TTS
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
          model: "gpt-4o-mini-tts",
          voice: personality.oai_voice || "alloy",
          input: reply,
          response_format: "mp3",
        }),
      });

      if (!ttsRes.ok) {
        const text = await ttsRes.text();
        console.error("OpenAI TTS error:", text);
        // No rompemos toda la respuesta: devolvemos texto y audio=null
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
    console.error("Error in /api/mobile/chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
