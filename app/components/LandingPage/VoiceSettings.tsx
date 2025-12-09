"use client";

import { Volume2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { emotionOptions, r2UrlAudio, openaiVoices } from "@/lib/data";
import EmojiComponent from "../CreateCharacter/EmojiComponent";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const VoiceSettings = () => {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [previewingVoice, setPreviewingVoice] = useState<OaiVoice | null>(null);

  const previewVoice = (voiceId: OaiVoice) => {
    // Si se hace clic en la misma voz mientras está sonando, se detiene
    if (previewingVoice === voiceId && audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setPreviewingVoice(null);
      return;
    }

    // Detener cualquier preview que esté sonando
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }

    const audioSampleUrl = `${r2UrlAudio}/${voiceId}.wav`;
    setPreviewingVoice(voiceId);

    const audio = new Audio(audioSampleUrl);
    setAudioElement(audio);

    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
      setPreviewingVoice(null);
    });

    audio.onended = () => {
      setPreviewingVoice(null);
    };

    setTimeout(() => {
      if (previewingVoice === voiceId) {
        setPreviewingVoice(null);
      }
    }, 10000);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Selección de voz para Aria */}
      <div className="space-y-2">
        <Label htmlFor="voice">Elige la voz de Aria</Label>
        <p className="text-xs text-gray-500 mb-1">
          Prueba diferentes voces para adaptar a Aria a la persona que va a usar el dispositivo.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {openaiVoices.map((voice) => (
            <div
              key={voice.id}
              className={`
                rounded-lg border p-3 transition-all relative
                ${
                  voice.id === previewingVoice
                    ? "border-2 border-[#7B29DD] shadow-sm " + voice.color
                    : "border-gray-200 hover:border-gray-300 cursor-pointer"
                }
              `}
              onClick={() => {
                previewVoice(voice.id as OaiVoice);
              }}
            >
              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                  <div className="text-2xl mt-0.5">
                    <EmojiComponent emoji={voice.emoji} />
                  </div>
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="font-medium">{voice.name}</span>
                    <span className="text-xs text-gray-600">
                      {voice.description}
                    </span>
                  </div>

                  {previewingVoice === voice.id && (
                    <div className="absolute top-2 right-2">
                      <div className="animate-pulse text-[#7B29DD]">
                        <Volume2 size={20} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selección de tono emocional para Aria */}
      <div className="space-y-3">
        <Label className="block mb-2">Tono emocional de Aria</Label>
        <p className="text-xs text-gray-500 mb-1">
          Elige el tono que mejor acompañe al usuario: más calmado, calido, serio...
        </p>
        <div className="grid grid-cols-3 gap-3">
          {emotionOptions.map((emotion) => (
            <div
              key={emotion.value}
              className={`
                rounded-lg border p-3 cursor-pointer transition-all
                ${
                  "" === emotion.value
                    ? "border-2 border-[#7B29DD] shadow-sm " + emotion.color
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div className="flex flex-col items-center text-center">
                <EmojiComponent emoji={emotion.icon} />
                <span className="text-sm font-medium">{emotion.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
