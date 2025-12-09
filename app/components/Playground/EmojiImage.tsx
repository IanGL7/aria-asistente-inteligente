import Twemoji from "react-twemoji";
import { useMemo } from "react";

// List of cute animals and human faces emojis
const emojiList = [
  "🏠", // hogar / casa
  "🛡️", // seguridad / protección
  "💜", // cariño / calidez
  "🧓", // personas mayores
  "👩‍⚕️", // cuidado / acompañamiento
  "😌", // calma / tranquilidad
  "🤝", // apoyo / compañía
  "📞", // contacto / llamadas de ayuda
  "🤖", // asistente inteligente / IA
  "📱", // app móvil / conexión con Aria
];

// Simple hash function to get a consistent number from a string
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const EmojiComponent = ({ personality, size = 100 }: { personality: IPersonality, size?: number }) => {
  // Use useMemo to avoid recalculating on every render
  const emoji = useMemo(() => {
    // Use personality.id or another unique property as seed
    const seed = personality.personality_id || personality.title;
    const hash = hashString(seed);
    const index = hash % emojiList.length;
    return emojiList[index];
  }, [personality]);

  return (
	<div className="flex items-center justify-center" style={{ width: `${size}px`, height: `${size}px` }}>
	<Twemoji
	  options={{ 
		className: "twemoji flex-shrink-0",
		style: { fontSize: `${size}px` }
	  }}
	>
	  {emoji}
	</Twemoji>
  </div>
  );
};