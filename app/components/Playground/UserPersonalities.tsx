import CharacterSection from "./CharacterSection";

interface UserPersonalitiesProps {
  onPersonalityPicked: (personalityIdPicked: string) => void;
  allPersonalities: IPersonality[];
  personalityIdState: string;
  languageState: string;
  disableButtons: boolean;
  selectedFilters: PersonalityFilter[];
  myPersonalities: IPersonality[];
}

const UserPersonalities: React.FC<UserPersonalitiesProps> = ({
  onPersonalityPicked,
  allPersonalities,
  personalityIdState,
  languageState,
  disableButtons,
  selectedFilters,
  myPersonalities,
}) => {
  return (
    <div className="space-y-8">
      {/* Asistentes creados por el usuario */}
      {myPersonalities.length > 0 && (
        <CharacterSection
          allPersonalities={myPersonalities}
          languageState={languageState}
          personalityIdState={personalityIdState}
          onPersonalityPicked={onPersonalityPicked}
          title={"Mis asistentes personalizados"}
          disableButtons={disableButtons}
          selectedFilters={selectedFilters}
        />
      )}

      {/* Asistentes recomendados por Aria */}
      <CharacterSection
        allPersonalities={allPersonalities}
        languageState={languageState}
        personalityIdState={personalityIdState}
        onPersonalityPicked={onPersonalityPicked}
        title={"Asistentes Aria recomendados"}
        disableButtons={disableButtons}
        selectedFilters={selectedFilters}
      />
    </div>
  );
};

export default UserPersonalities;
