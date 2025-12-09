import Image from "next/image";
import Link from "next/link";

interface LeftNavbarButtonsProps {
  user: IUser | null; // lo seguimos aceptando para no romper dónde se usa
}

export default function LeftNavbarButtons({ user: _user }: LeftNavbarButtonsProps) {
  return (
    <div className="flex flex-row items-center">
      <Link
        href="/"
        aria-label="Ir al inicio"
        title="Ir al inicio"
        className="flex items-center gap-2"
      >
       <Image
          src="/logos/aria1.png"
          alt="Logo Aria"
          width={400}      // cualquier valor que respete más o menos el aspect ratio
          height={100}     // idem (solo define la proporción)
          className="h-8 w-auto md:h-10"  // 👈 aquí mandas tú
        />
      </Link>
    </div>
  );
}
