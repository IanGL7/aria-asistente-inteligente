import { VoiceSettings } from "./VoiceSettings"

export const CreateCharacterShowcase = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#FCFAFF] to-white">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          {/* Texto - derecha en desktop, arriba en móvil */}
          <div className="order-1 lg:order-2 w-full lg:w-2/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#32175A]">
              Personaliza cómo te habla Aria
            </h2>
            <p className="text-lg text-gray-600 mb-6 font-semibold">
              Ajusta la voz, el tono y las respuestas de Aria para adaptarla
              a las necesidades del hogar:
            </p>

            <li className="text-lg text-gray-600 mb-6">
              Recordatorios, mensajes de apoyo
              y avisos importantes para quienes más lo necesitan 😊.
            </li>
          </div>

          {/* Configuración de voz / personaje – izquierda en desktop, abajo en móvil */}
          <div className="order-2 lg:order-1 w-full lg:w-3/5 sm:max-w-[400px] mx-auto">
            <div className="mx-auto px-2 rounded-lg">
              <VoiceSettings />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
