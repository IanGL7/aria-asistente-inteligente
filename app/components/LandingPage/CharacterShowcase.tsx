'use client';

import { useState } from 'react';
import Image from "next/image";
import { cn, getPersonalityImageSrc } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { EmojiComponent } from "../Playground/EmojiImage";


interface CharacterShowcaseProps {
  allPersonalities: IPersonality[];
}

export const CharacterShowcase = ({ allPersonalities }: CharacterShowcaseProps) => {
  return (
    <section className="pt-16 md:pb-16  pb-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <div className="flex flex-col lg:flex-row items-center gap-12">
		 <div className="order-2 lg:order-1 w-full lg:w-3/5 sm:max-w-[400px] mx-auto">
     <div className="relative">
    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none rounded-t-lg"></div>
    
    <div
  className="
    max-h-[360px] md:max-h-[500px]
    w-full max-w-md
    mx-auto
    overflow-y-auto
    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
    rounded-lg
  "
>
  <div className="grid grid-cols-1 gap-4 md:gap-6 p-4">
    {allPersonalities.map((personality, index) => (
      <Card
        className={cn(
          "p-0 rounded-3xl cursor-pointer shadow-lg transition-all hover:scale-[1.03] flex flex-col hover:border-primary/50",
        )}
      >
        <CardContent className="flex-shrink-0 p-0 h-[160px] sm:h-[180px] relative">
          {personality.creator_id === null ? (
            <Image
              src={getPersonalityImageSrc(personality.key)}
              alt={personality.key}
              width={100}
              height={180}
              className="rounded-3xl rounded-br-none rounded-bl-none w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-row items-center justify-center h-full">
              <EmojiComponent personality={personality} />
            </div>
          )}
        </CardContent>

        <CardHeader className="flex-shrink-0 gap-0 px-4 py-2">
          <CardTitle className="font-semibold text-md flex flex-row items-center gap-2">
            {personality.title}
          </CardTitle>
          <CardDescription className="text-sm font-normal">
            {personality.subtitle}
          </CardDescription>
        </CardHeader>
      </Card>
    ))}
  </div>
</div>

    
    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none rounded-b-lg"></div>
  </div>
             </div>

      <div className="order-1 lg:order-2 w-full lg:w-2/5">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          ¿Cómo te ayuda Aria en casa?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Aria es un asistente diseñado para brindar apoyo, seguridad y acompañamiento
          en el hogar, especialmente para personas que viven solas, adultos mayores
          o personas con discapacidad.
        </p>
        <div className="bg-[#E9D9FF] p-4 rounded-lg border border-[#D1B8FF]">
          <h3 className="font-semibold text-[#32175A] mb-2">
            Experiencia pensada para tu tranquilidad
          </h3>
          <p className="text-[#4B3A7A]">
            Configura contactos de emergencia, recordatorios y acciones rápidas.
            Aria puede ayudarte a pedir ayuda, enviar alertas y controlar dispositivos
            del hogar de forma sencilla, todo desde un solo dispositivo.
          </p>
        </div>
      </div>
    </div>
  </div>

    </section>
  );
};