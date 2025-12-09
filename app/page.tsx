import Link from "next/link"
import { ChevronRight, Zap, Star, Home, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DEVICE_COST, SUBSCRIPTION_COST } from "@/lib/data";
import { createClient } from "@/utils/supabase/server"
import { getAllPersonalities } from "@/db/personalities"
import { CharacterShowcase } from "./components/LandingPage/CharacterShowcase";
import { CreateCharacterShowcase } from "./components/LandingPage/CreateCharacterShowcase";
import ProductsSection from "./components/LandingPage/ProductsSection";
import Image from "next/image";
import { fetchGithubStars } from "./actions";
import YoutubeDemo from "./components/LandingPage/YoutubeDemo";
import { kickstarterLink } from "@/lib/data"; // TODO: Asegúrate de que este link apunte a la campaña/proyecto de Aria

export default async function LandingPage() {
  const supabase = createClient();
  const { stars = 0 } = await fetchGithubStars("usuario/aria-asistente-inteligente"); // TODO: Reemplaza con el repo real de Aria en GitHub

  const allPersonalities = await getAllPersonalities(supabase);
  const adultPersonalities = allPersonalities.filter((personality) => !personality.is_story && !personality.is_child_voice);
  return (
    <div className="flex min-h-screen flex-col bg-[#FCFAFF]">
      <main className="flex-1">
        {/* Hero Section */}
<section className="relative w-full py-16 md:py-44 overflow-hidden bg-[#FCFAFF]">
  {/* Imagen de fondo a tamaño completo */}
  <Image
    src="/logos/aria1.png" // asegúrate de que exista en /public
    alt="Aria fondo"
    fill
    priority
    className="
      pointer-events-none select-none opacity-60
      object-contain 
      object-right-center
    "
  />

  {/* Manchas de color suaves tipo glow */}
  <div
    className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#7B29DD33] blur-3xl"
    aria-hidden="true"
  />
  <div
    className="pointer-events-none absolute -top-32 right-[-80px] h-80 w-80 rounded-full bg-[#FDC40033] blur-3xl"
    aria-hidden="true"
  />

  <div className="container pl-6 pr-4 md:pl-24 md:pr-6 max-w-full relative">
    {/* Solo la columna de texto, encima del fondo */}
    <div className=" relative z-10 max-w-full md:ml-8 lg:ml-16">
      <h1 className="text-4xl md:text-7xl font-bold leading-tight text-[#32175A]">
        Más seguridad,
        <br />
        más tranquilidad en casa
      </h1>

     <p className="mt-6 text-base md:text-2xl text-gray-700 max-w-5xl">
  Aria es un asistente inteligente para cuidado y seguridad que funciona
  incluso sin conexión a internet.
    </p>
    <p className="mt-6 text-base md:text-2xl text-gray-700 max-w-5xl">
      Realiza llamadas y alertas de
  emergencia, y controla dispositivos del hogar de forma local para
  apoyar a personas que viven solas, adultos mayores o personas con
  discapacidad.
    </p>


      {/* Botón principal */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Link href="/home">
          <Button
            size="lg"
            className="w-full sm:w-auto flex-row items-center gap-2 bg-[#FDC400] hover:bg-[#e5b100] text-black border-0 text-sm md:text-base h-11 md:h-12"
          >
            <span>Ver panel web</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* CTA / descarga / GitHub */}
      <div className="flex flex-col items-start justify-center space-y-2 pt-4">
  <p className="text-gray-700 text-sm md:text-lg font-semibold">
    Si te gusta mi proyecto, puedes descargar la aplicación móvil para Android.
  </p>
  <a
    href="https://play.google.com/store/apps/details?id=TU.PAQUETE.ARIA" 
    // TODO: Reemplaza por la URL real de tu app en Google Play
    target="_blank"
    rel="noopener noreferrer"
    className="
      w-full sm:w-auto
      inline-flex items-center justify-center
      rounded-lg
      bg-[#32175A]
      text-white
      px-4 md:px-5
      h-11 md:h-12
      shadow-md
      hover:bg-[#27134A]
      transition
    "
  >
    {/* Icono Google Play simplificado */}
    <img src="logos/playstore.png" alt="" width={100} height={24} style={{ height: '32px', width: 'auto' }} />

    <div className="flex flex-col leading-tight text-left pl-2">
      <span className="text-[10px] uppercase tracking-wide opacity-80">
        Disponible en
      </span>
      <span className="text-sm md:text-base font-semibold">
        Google Play
      </span>
    </div>
  </a>
</div>

    </div>
  </div>
  
</section>

<section className="w-full pb-16   bg-[#FCFAFF]">
  <div className="max-w-screen-lg mx-auto px-4">
    <h3 className="text-center text-sm md:text-base font-medium text-gray-500 mb-4 md:mb-6">
      Impulsado por
    </h3>

    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
      <a
        href="https://vercel.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all flex items-center justify-center"
      >
        <Image
          src="/logos/vercel.png"
          alt="Vercel"
          width={100}
          height={24}
          className="h-6 w-auto md:h-9"
        />
      </a>

      <a
        href="https://supabase.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all flex items-center justify-center"
      >
        <Image
          src="/logos/supabase.png"
          alt="Supabase"
          width={100}
          height={24}
          className="h-7 w-auto md:h-10"
        />
      </a>

      <a
        href="https://arduino.cc"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all flex items-center justify-center"
      >
        <Image
          src="/logos/arduino.png"
          alt="Arduino"
          width={100}
          height={24}
          className="h-7 w-auto md:h-10"
        />
      </a>

      <a
        href="https://espressif.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all flex items-center justify-center"
      >
        <Image
          src="/logos/espressif.png"
          alt="Espressif ESP32"
          width={100}
          height={24}
          className="h-7 w-auto md:h-10"
        />
      </a>
    </div>
  </div>
</section>




        <YoutubeDemo caption="Demo del prototipo Aria - asistente inteligente para cuidado y seguridad" />
        {/* Products Section */}
        <ProductsSection />

        {/* How It Works */}
        <section className="w-full py-12 bg-gradient-to-b from-[#FCFAFF] to-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Muy fácil de usar
              </h2>
              <p className="text-lg text-gray-600 mt-2">
                Solo 3 pasos para tener más seguridad y tranquilidad en casa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#E2D9FF] transform transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-[#E9D9FF] rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[#7B29DD]">1</span>
                </div>
                <h3 className="text-xl font-bold text-[#32175A] mb-2">Instala</h3>
                <p className="text-gray-600">
                  Coloca el dispositivo Aria en un lugar accesible de tu hogar, cerca de quien necesite apoyo.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#E2D9FF] transform transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-[#E9D9FF] rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[#7B29DD]">2</span>
                </div>
                <h3 className="text-xl font-bold text-[#32175A] mb-2">Configura</h3>
                <p className="text-gray-600">
                  Usa nuestra{" "}
                  <a href="https://play.google.com/store/apps/details?id=TU.PAQUETE.ARIA" className="text-[#7B29DD]">
                    App
                  </a>{" "}
                  para registrar contactos de emergencia, recordatorios y dispositivos del hogar.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#E2D9FF] transform transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-[#E9D9FF] rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[#7B29DD]">3</span>
                </div>
                <h3 className="text-xl font-bold text-[#32175A] mb-2">Usa Aria</h3>
                <p className="text-gray-600">
                  Con un botón grande o comandos de voz, la persona puede pedir ayuda, activar recordatorios y controlar el
                  hogar de forma sencilla.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Character Showcase */}
        <CharacterShowcase allPersonalities={adultPersonalities} />

        {/* Create Character Showcase */}
        <CreateCharacterShowcase />
      </main>
    </div>
  )
}
