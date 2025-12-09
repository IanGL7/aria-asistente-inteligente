export const defaultToyId: string = "56224f7f-250d-4351-84ee-e4a13b881c7b";
export const defaultPersonalityId: string =
  "a1c073e6-653d-40cf-acc1-891331689409";

export const paymentLink = "https://mpago.li/TU_LINK_DE_PAGO_ARIA";
export const devkitPaymentLink = "https://mpago.li/TU_LINK_DE_PAGO_ARIA_DEVKIT";

export const discordInviteLink = "https://discord.gg/TU_SERVIDOR_ARIA";
export const tiktokLink = "https://www.tiktok.com/@aria_asistente";
export const githubPublicLink = "https://github.com/IanGL7/aria-asistente-inteligente";
export const businessDemoLink = "https://portafolio-ian-gl-5djm.vercel.app";
export const feedbackFormLink =
  "mailto:iangonzalezluna7@gmail.com" +
  "?subject=Interés%20en%20Aria" +
  "&body=Hola%2C%20me%20gustaría%20saber%20más%20sobre%20el%20proyecto%20Aria.";
export const kickstarterLink = "";

export const r2Url = "https://pub-cd736d767add4fecafea55c239c28497.r2.dev";
export const r2UrlAudio = "https://pub-8d4cd7df0c5e43ffabc240263a7702b8.r2.dev";

export const videoSrc = `${r2Url}/IMG_1673.mov`;
export const videoSrc2 = `${r2Url}/IMG_1675.mov`;
export const videoSrc3 = `${r2Url}/IMG_1676.mov`;
export const videoSrc4 = `${r2Url}/IMG_1677.mov`;

export const voiceSampleUrl =
  "https://xygbupeczfhwamhqnucy.supabase.co/storage/v1/object/public/voices/";

export const userFormPersonaLabel =
  "Describe brevemente a la persona que usará Aria y su contexto";
export const userFormPersonaPlaceholder =
  "Por ejemplo: vivo solo, me gusta que me hablen con calma y necesito recordatorios claros para mis medicinas y pendientes del día.";
export const userFormAgeLabel = "Edad de la persona usuaria";
export const userFormAgeDescription =
  "Si la persona tiene menos de 13 años, un adulto debe ayudar a configurar Aria.";
export const userFormNameLabel = "Nombre de la persona usuaria";

export const INITIAL_CREDITS = 50;
export const SECONDS_PER_CREDIT = (30 * 60) / INITIAL_CREDITS; // 30 minutes equals 50 credits

export const DEVICE_COST = 999;      // Precio de preventa Aria (MXN)
export const ORIGINAL_COST = 1299;   // Precio de referencia / normal (MXN)
export const SUBSCRIPTION_COST = 0;  // Sin suscripción mensual por ahora

export const openaiVoices: VoiceType[] = [
  {
    id: "alloy",
    name: "Alloy",
    description: "Neutra y equilibrada",
    color: "bg-slate-100",
    emoji: "🧑",
    provider: "openai",
  },
  {
    id: "echo",
    name: "Echo",
    description: "Cálida y tranquila",
    color: "bg-purple-100",
    emoji: "👩‍🎤",
    provider: "openai",
  },
  {
    id: "shimmer",
    name: "Shimmer",
    description: "Clara y entendible",
    color: "bg-cyan-100",
    emoji: "👱‍♀️",
    provider: "openai",
  },
  {
    id: "ash",
    name: "Ash",
    description: "Suave y pausada",
    color: "bg-gray-100",
    emoji: "🧔",
    provider: "openai",
  },
  {
    id: "ballad",
    name: "Ballad",
    description: "Más expresiva",
    color: "bg-indigo-100",
    emoji: "🎭",
    provider: "openai",
  },
  {
    id: "coral",
    name: "Coral",
    description: "Amable y cercana",
    color: "bg-rose-100",
    emoji: "👩",
    provider: "openai",
  },
  {
    id: "sage",
    name: "Sage",
    description: "Serena y madura",
    color: "bg-emerald-100",
    emoji: "🧓",
    provider: "openai",
  },
  {
    id: "verse",
    name: "Verse",
    description: "Tipo narrador",
    color: "bg-blue-100",
    emoji: "👨‍🎨",
    provider: "openai",
  },
];

export const geminiVoices: VoiceType[] = [
  {
    id: "Zephyr",
    name: "Zephyr",
    description: "Brillante y clara",
    color: "bg-yellow-100",
    provider: "gemini",
  },
  {
    id: "Puck",
    name: "Puck",
    description: "Ágil y animada",
    color: "bg-orange-100",
    provider: "gemini",
  },
  {
    id: "Charon",
    name: "Charon",
    description: "Tono informativo",
    color: "bg-blue-100",
    provider: "gemini",
  },
  {
    id: "Kore",
    name: "Kore",
    description: "Firme y estable",
    color: "bg-gray-100",
    provider: "gemini",
  },
  {
    id: "Fenrir",
    name: "Fenrir",
    description: "Energética",
    color: "bg-red-100",
    provider: "gemini",
  },
  {
    id: "Leda",
    name: "Leda",
    description: "Juvenil",
    color: "bg-pink-100",
    provider: "gemini",
  },
  {
    id: "Orus",
    name: "Orus",
    description: "Firme",
    color: "bg-slate-100",
    provider: "gemini",
  },
  {
    id: "Aoede",
    name: "Aoede",
    description: "Suave y fresca",
    color: "bg-sky-100",
    provider: "gemini",
  },
  {
    id: "Callirrhoe",
    name: "Callirrhoe",
    description: "Relajada",
    color: "bg-green-100",
    provider: "gemini",
  },
  {
    id: "Autonoe",
    name: "Autonoe",
    description: "Clara",
    color: "bg-amber-100",
    provider: "gemini",
  },
  {
    id: "Enceladus",
    name: "Enceladus",
    description: "Muy suave",
    color: "bg-cyan-100",
    provider: "gemini",
  },
  {
    id: "Iapetus",
    name: "Iapetus",
    description: "Limpia",
    color: "bg-white",
    provider: "gemini",
  },
  {
    id: "Umbriel",
    name: "Umbriel",
    description: "Relajada",
    color: "bg-emerald-100",
    provider: "gemini",
  },
  {
    id: "Algieba",
    name: "Algieba",
    description: "Fluida",
    color: "bg-violet-100",
    provider: "gemini",
  },
  {
    id: "Despina",
    name: "Despina",
    description: "Uniforme",
    color: "bg-purple-100",
    provider: "gemini",
  },
  {
    id: "Erinome",
    name: "Erinome",
    description: "Neutra",
    color: "bg-neutral-100",
    provider: "gemini",
  },
  {
    id: "Algenib",
    name: "Algenib",
    description: "Más grave",
    color: "bg-stone-100",
    provider: "gemini",
  },
  {
    id: "Rasalgethi",
    name: "Rasalgethi",
    description: "Explicativa",
    color: "bg-indigo-100",
    provider: "gemini",
  },
  {
    id: "Laomedeia",
    name: "Laomedeia",
    description: "Positiva",
    color: "bg-lime-100",
    provider: "gemini",
  },
  {
    id: "Achernar",
    name: "Achernar",
    description: "Suave",
    color: "bg-rose-100",
    provider: "gemini",
  },
  {
    id: "Alnilam",
    name: "Alnilam",
    description: "Clara y firme",
    color: "bg-zinc-100",
    provider: "gemini",
  },
  {
    id: "Schedar",
    name: "Schedar",
    description: "Equilibrada",
    color: "bg-teal-100",
    provider: "gemini",
  },
  {
    id: "Gacrux",
    name: "Gacrux",
    description: "Madura",
    color: "bg-brown-100",
    provider: "gemini",
  },
  {
    id: "Pulcherrima",
    name: "Pulcherrima",
    description: "Muy presente",
    color: "bg-fuchsia-100",
    provider: "gemini",
  },
  {
    id: "Achird",
    name: "Achird",
    description: "Amigable",
    color: "bg-yellow-100",
    provider: "gemini",
  },
  {
    id: "Zubenelgenubi",
    name: "Zubenelgenubi",
    description: "Casual",
    color: "bg-orange-100",
    provider: "gemini",
  },
  {
    id: "Vindemiatrix",
    name: "Vindemiatrix",
    description: "Gentil",
    color: "bg-green-100",
    provider: "gemini",
  },
  {
    id: "Sadachbia",
    name: "Sadachbia",
    description: "Dinámica",
    color: "bg-red-100",
    provider: "gemini",
  },
  {
    id: "Sadaltager",
    name: "Sadaltager",
    description: "Confiable",
    color: "bg-blue-100",
    provider: "gemini",
  },
  {
    id: "Sulafat",
    name: "Sulafat",
    description: "Cálida",
    color: "bg-orange-100",
    provider: "gemini",
  },
];



export const emotionOptions = [
  {
    value: "neutral",
    label: "Neutro",
    icon: "😐",
    color: "bg-slate-100",
  },
  {
    value: "cheerful",
    label: "Cálido y alegre",
    icon: "😊",
    color: "bg-amber-100",
  },
  {
    value: "serious",
    label: "Serio pero claro",
    icon: "🧠",
    color: "bg-blue-100",
  },
  {
    value: "calm",
    label: "Tranquilo y empático",
    icon: "🤗",
    color: "bg-purple-100",
  },
  {
    value: "excited",
    label: "Enérgico positivo",
    icon: "💪",
    color: "bg-orange-100",
  },
  {
    value: "professional",
    label: "Claro y directo",
    icon: "👔",
    color: "bg-emerald-100",
  },
];


