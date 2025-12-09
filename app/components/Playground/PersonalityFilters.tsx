import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FaBookOpen, FaHandHoldingMedical } from "react-icons/fa";
import { FaChild } from "react-icons/fa6";

interface PersonalityFiltersProps {
  setSelectedFilters: Dispatch<SetStateAction<PersonalityFilter[]>>;
  selectedFilters: PersonalityFilter[];
  languageState: string;
  currentUser: IUser;
}

const PersonalityFilters = ({
  setSelectedFilters,
  selectedFilters,
  languageState,
  currentUser,
}: PersonalityFiltersProps) => {
  const isDoctor = currentUser.user_info?.user_type === "doctor";

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <ToggleGroup
        type="multiple"
        variant="outline"
        size="sm"
        value={selectedFilters}
        onValueChange={(value: string[]) =>
          setSelectedFilters(value as PersonalityFilter[])
        }
        className="flex gap-2"
      >
        {/* Acompañamiento / historias */}
        <ToggleGroupItem
          value="is_story"
          aria-label="Filtrar asistentes de de cuidado y seguridad"
          className="gap-2 px-3"
        >
          <FaBookOpen className="h-4 w-4 text-gray-800" />
          {"Modo cuidado"}
          {selectedFilters.includes("is_story") && (
            <X className="h-4 w-4" aria-hidden="true" />
          )}
        </ToggleGroupItem>

        {/* Voces para niñas y niños */}
        <ToggleGroupItem
          value="is_child_voice"
          aria-label="Filtrar asistentes pensados para niñas y niños"
          className="gap-2 px-3"
        >
          <FaChild className="h-4 w-4 text-gray-800" />
          {"Para menores"}
          {selectedFilters.includes("is_child_voice") && (
            <X className="h-4 w-4" aria-hidden="true" />
          )}
        </ToggleGroupItem>

        {/* Asistentes para cuidadores (solo si el usuario es doctor/cuidador) */}
        {isDoctor && (
          <ToggleGroupItem
            value="is_doctor"
            aria-label="Filtrar asistentes para cuidadores o personal médico"
            className="gap-2 px-3"
          >
            <FaHandHoldingMedical className="h-4 w-4 text-gray-800" />
            {"Para cuidadores"}
            {selectedFilters.includes("is_doctor") && (
              <X className="h-4 w-4" aria-hidden="true" />
            )}
          </ToggleGroupItem>
        )}
      </ToggleGroup>
    </div>
  );
};

export default PersonalityFilters;
