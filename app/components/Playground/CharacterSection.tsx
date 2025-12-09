import ModifyCharacterSheet from "./ModifyCharacterSheet";
import Image from "next/image";
import { cn, getPersonalityImageSrc } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmojiComponent } from "./EmojiImage";

interface CharacterSectionProps {
  allPersonalities: IPersonality[];
  languageState: string;
  personalityIdState: string;
  onPersonalityPicked: (personalityIdPicked: string) => void;
  title: string;
  disableButtons: boolean;
  selectedFilters: PersonalityFilter[];
}

const CharacterSection = ({
  allPersonalities,
  languageState,
  personalityIdState,
  onPersonalityPicked,
  title,
  disableButtons,
  selectedFilters,
}: CharacterSectionProps) => {
  const filteredPersonalities = allPersonalities.filter((personality) => {
    // mismo comportamiento que el original:
    // debe cumplir TODOS los filtros activos
    return selectedFilters.every((filter) => {
      return personality[filter] === true;
    });
  });

  if (filteredPersonalities.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Título + explicación con enfoque Aria */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
        <p className="text-sm font-semibold text-slate-900 flex flex-row items-center gap-2">
          <span>{title}</span>
        </p>
        <p className="text-xs text-slate-500">
          Toca cualquier tarjeta para probarlo con Aria o enviarlo a tu
          dispositivo en casa.
        </p>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-6 gap-4">
          {filteredPersonalities.map((personality) => {
            const isCurrentPersonality =
              personalityIdState === personality.personality_id;

            return (
              <ModifyCharacterSheet
                key={personality.personality_id}
                openPersonality={personality}
                languageState={languageState}
                isCurrentPersonality={isCurrentPersonality}
                onPersonalityPicked={onPersonalityPicked}
                disableButtons={disableButtons}
              >
                <Card
                  className={cn(
                    "p-0 rounded-3xl cursor-pointer shadow-lg transition-all hover:scale-103 flex flex-col border border-slate-200",
                    isCurrentPersonality
                      ? "border-[#6C63FF] border-2 ring-2 ring-[#6C63FF] ring-offset-2"
                      : "hover:border-[#6C63FF]/50"
                  )}
                >
                  <CardContent className="flex-shrink-0 p-0 h-[160px] sm:h-[180px] relative">
                    {personality.creator_id === null ? (
                      <Image
                        // 👇 AQUÍ está la clave: le seguimos pasando un string
                        src={getPersonalityImageSrc(personality.key)}
                        alt={personality.key}
                        width={100}
                        height={180}
                        className="rounded-3xl rounded-br-none rounded-bl-none w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-row items-center justify-center h-full bg-slate-100">
                        <EmojiComponent personality={personality} />
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant={isCurrentPersonality ? "default" : "outline"}
                      className={`absolute shadow-lg top-2 right-2 rounded-full h-9 w-9 p-0 ${
                        isCurrentPersonality
                          ? "bg-[#6C63FF] text-white border-none"
                          : ""
                      }`}
                      onClick={() =>
                        onPersonalityPicked(personality.personality_id!)
                      }
                      aria-label={
                        isCurrentPersonality
                          ? "Quitar asistente actual"
                          : "Seleccionar asistente"
                      }
                    >
                      {true ? (
                        <Check className="h-4 w-4" strokeWidth={3} />
                      ) : (
                        <CheckCircle className="h-4 w-4" strokeWidth={3} />
                      )}
                    </Button>
                  </CardContent>

                  <CardHeader className="flex-shrink-0 gap-0 px-4 py-2">
                    <CardTitle className="font-semibold text-md flex flex-row items-center gap-2">
                      {personality.title}
                    </CardTitle>
                    <CardDescription className="text-sm font-normal text-slate-600">
                      {personality.subtitle}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ModifyCharacterSheet>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterSection;
