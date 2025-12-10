// app/offline/page.tsx
import { WifiOff } from "lucide-react";

export const metadata = {
  title: "Sin conexión | Aria",
};

export default function OfflinePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center gap-4">
      <WifiOff className="h-12 w-12 text-muted-foreground" />
      <h1 className="text-2xl font-semibold text-foreground">
        Estás sin conexión
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        No pudimos conectar con el servidor de Aria.  
        Puedes seguir viendo parte de la app, pero algunas funciones como el chat y las llamadas
        necesitan internet para funcionar.
      </p>
      <p className="text-xs text-muted-foreground/80">
        Cuando vuelva la conexión, recarga la página para continuar.
      </p>
    </div>
  );
}
