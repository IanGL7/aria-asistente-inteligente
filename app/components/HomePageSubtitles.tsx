interface HomePageSubtitlesProps {
    user: IUser;
    page: "home" | "settings" | "create";
    languageCode?: string;
}

const HomePageSubtitles: React.FC<HomePageSubtitlesProps> = ({
    user,
    page,
    languageCode = "es-ES",
}) => {
    if (page === "home") {
        if (user.user_info.user_type === "doctor") {
            return (
                <p className="text-sm text-gray-600">
                    {"Usa este panel o tu dispositivo Aria para apoyar a tus pacientes o personas a tu cuidado."}
                </p>
            );
        } else {
            return (
                <p className="text-sm text-gray-600">
                    {"Habla con Aria o con cualquiera de los personajes disponibles abajo."}
                </p>
            );
        }
    } else if (page === "settings") {
        return (
            <p className="text-sm text-gray-600">
                {"Aquí puedes actualizar la configuración de tu cuenta y de tu dispositivo Aria."}
            </p>
        );
    } else if (page === "create") {
        return (
            <p className="text-sm text-gray-600">
                {"Personaliza la voz, el idioma y el estilo de Aria para adaptarla a tu hogar."}
            </p>
        );
    }

    // if they are a regular user
    // return <CreditsRemaining user={user} languageCode={languageCode} />;
};

export default HomePageSubtitles;
