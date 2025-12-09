import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // 👈 lee tus variables de Next

import fs from "fs";
import path from "path";
import OpenAI from "openai";


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // usa la misma clave que tienes en .env.local
});

const voices = [
  {
    id: "alloy",
    text: "Hola, soy Aria con una voz neutra y equilibrada. Puedo ayudarte a organizar el día de tu familia.",
  },
  {
    id: "echo",
    text: "Hola, soy Aria con una voz cálida y tranquila. Estoy aquí para acompañarte y recordarte lo importante.",
  },
  {
    id: "shimmer",
    text: "Hola, soy Aria con una voz clara y fácil de entender. Te explico las cosas paso a paso.",
  },
  {
    id: "ballad",
    text: "Hola, soy Aria con una voz más expresiva. Puedo contar historias y animar tus momentos del día.",
  },
  {
    id: "coral",
    text: "Hola, soy Aria con una voz amable y cercana. Te hablo como a alguien de confianza en casa.",
  },
  {
    id: "sage",
    text: "Hola, soy Aria con una voz serena y madura. Te ayudo a tomar decisiones con calma.",
  },
  {
    id: "verse",
    text: "Hola, soy Aria con una voz de narradora. Puedo guiarte como si estuviéramos leyendo un cuento juntos.",
  },
  {
    id: "ash",
    text: "Hola, soy Aria con una voz suave y pausada. Ideal para momentos tranquilos y relajantes.",
  },
];

async function main() {
  // 👉 carpeta donde se van a guardar los wav
  const outputDir = path.resolve("./public/audio/voices");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const voice of voices) {
    const filePath = path.join(outputDir, `${voice.id}.wav`);
    console.log(`Generando ${filePath}...`);

    const audio = await client.audio.speech.create({
      model: "gpt-4o-mini-tts", // o "tts-1" / "tts-1-hd"
      voice: voice.id as any,    // alloy, echo, shimmer...
      input: voice.text,
      response_format: "wav",
    });

    const arrayBuffer = await audio.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);

    await fs.promises.writeFile(filePath, uint8);
    console.log(`✅ Guardado: ${filePath}`);
  }
}

main().catch((err) => {
  console.error("Error generando audios:", err);
  process.exit(1);
});
