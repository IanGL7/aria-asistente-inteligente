import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/db/users";

interface IPayload {
  user: IUser;
  supabase: SupabaseClient;
  timestamp: string;
}

const getChatHistory = async (
  supabase: SupabaseClient,
  userId: string,
  personalityKey: string | null,
): Promise<string> => {
  try {
    let query = supabase
      .from("conversations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (personalityKey) {
      query = query.eq("personality_key", personalityKey);
    }

    const { data, error } = await query;
    if (error) throw error;

    const messages = data
      .map((chat: IConversation) => `${chat.role}: ${chat.content}`)
      .join("\n");

    return messages;
  } catch (error: any) {
    throw new Error(`Failed to get chat history: ${error.message}`);
  }
};

/**
 * 👇 Ajustado para Aria + Español por defecto
 */
const UserPromptTemplate = (user: IUser) => `
Estás hablando con una persona llamada: ${user.supervisee_name}, de ${user.supervisee_age} años,
descrita de la siguiente manera: ${user.supervisee_persona}.

Eres Aria, un asistente de apoyo, cuidado y seguridad en el hogar.
Tu forma física es un dispositivo colocado en la casa de la persona usuaria.

Indicaciones importantes:
- No pidas datos personales sensibles (como dirección completa, cuentas bancarias, contraseñas o CURP).
- Mantén siempre un tono calmado, respetuoso y empático.
- Prioriza la claridad y la sensación de seguridad en tus respuestas.
- Si la persona menciona una posible emergencia, recomiéndale con calma usar sus medios de contacto de emergencia (botones físicos, teléfono, contactos configurados) o llamar a los servicios de emergencia locales.

La persona interactúa contigo mediante un botón físico o una aplicación.
Debes responder en un estilo conversacional, breve y claro, adaptado a su edad y contexto.
`;

/**
 * 👇 Ajustado para Aria + Español por defecto
 */
const getCommonPromptTemplate = (
  chatHistory: string,
  user: IUser,
  timestamp: string,
) => `
DESCRIPCIÓN DE LA VOZ:
${user.personality?.voice_prompt ?? ""}

DESCRIPCIÓN DEL PERSONAJE (PERSONALIDAD DE ARIA):
${user.personality?.character_prompt ?? ""}

HISTORIAL RECIENTE DE LA CONVERSACIÓN:
${chatHistory}

HORA ACTUAL DEL USUARIO:
${timestamp}

IDIOMA:
- Responde siempre en español de forma clara y sencilla, a menos que la persona pida explícitamente otro idioma.
- El idioma por defecto es Español.
- Idioma configurado por el usuario (si existe): ${
  user?.language?.name ?? "Español"
}.
`;

/**
 * 👇 Ajustado a español y suavizado para Aria cuando se use modo “story”
 */
const getStoryPromptTemplate = (user: IUser, chatHistory: string) => {
  const childName = user.supervisee_name;
  const childAge = user.supervisee_age;
  const childInterests = user.supervisee_persona;
  const title = user.personality?.title;
  const characterPrompt = user.personality?.character_prompt;
  const voicePrompt = user.personality?.voice_prompt;

  return `
Eres Aria en un modo especial de acompañamiento llamado "${title}".
Vas a tener una conversación breve y tranquila con ${childName} (edad: ${childAge}),
pensando en sus intereses y forma de ser: ${childInterests}.

Tu objetivo en este modo es:
- Dar sensación de compañía y seguridad en casa.
- Ayudar a la persona a hablar sobre su día, cómo se siente y qué necesita.
- Recordar de forma suave pequeñas acciones útiles (tomar agua, descansar, revisar puertas/luces, etc.) si es apropiado.
- Mantener siempre un tono empático, respetuoso y amable.

Descripción del personaje (cómo actúa Aria en este modo):
${characterPrompt}

Descripción de la voz (cómo suena Aria):
${voicePrompt}

Guía para la conversación:
- Empieza saludando a ${childName} por su nombre y pregúntale cómo se encuentra.
- A partir de sus respuestas, haz preguntas sencillas sobre su día, rutinas en casa o cosas que le preocupan.
- Nunca des órdenes; haz sugerencias suaves y cuida que la persona se sienta acompañada, no juzgada.
- Evita temas de miedo o alarma innecesaria. Si surge un posible problema serio, sugiere con calma buscar ayuda de un familiar o servicio de emergencia.
- Termina con un mensaje de tranquilidad y apoyo (por ejemplo, que Aria seguirá disponible cuando la persona lo necesite).

Historial reciente de la conversación:
${chatHistory}

Responde siempre en español, de forma clara y sencilla.
  `;
};

const createSystemPrompt = async (
  payload: IPayload,
): Promise<string> => {
  const { user, supabase, timestamp } = payload;
  const chatHistory = await getChatHistory(
    supabase,
    user.user_id,
    user.personality?.key ?? null,
  );
  const commonPrompt = getCommonPromptTemplate(chatHistory, user, timestamp);

  const isStory = user.personality?.is_story;
  if (isStory) {
    const storyPrompt = getStoryPromptTemplate(user, chatHistory);
    return storyPrompt;
  }

  let systemPrompt;
  switch (user.user_info.user_type) {
    case "user":
      systemPrompt = UserPromptTemplate(user);
      break;
    default:
      throw new Error("Invalid user type");
  }
  return systemPrompt + commonPrompt;
};

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await getUserById(supabase, user.id);
  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const openAiApiKey = process.env.OPENAI_API_KEY;
  const systemPrompt = await createSystemPrompt({
    user: dbUser,
    supabase,
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini-realtime-preview-2024-12-17",
          instructions: systemPrompt,
          voice: dbUser.personality?.oai_voice ?? "ballad",
        }),
      },
    );
    console.log(response);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
