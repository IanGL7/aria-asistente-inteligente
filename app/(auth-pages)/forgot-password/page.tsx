import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-1 items-center">
            Restablecer contraseña
          </CardTitle>
          <CardDescription>
          Ingrese su correo electrónico para restablecer la contraseña de su cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* <ToyPreview /> */}
          <form className="flex-1 flex flex-col w-full justify-center gap-4">
            <div className="flex flex-col gap-2 [&>input]:mb-3">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="tu@ejemplo.com" required />
              <SubmitButton
  formAction={forgotPasswordAction}
  className="text-sm font-medium bg-[#7B29DD] hover:bg-[#4b218a] text-white border-0 rounded-md px-4 py-2 mt-2"
>
  Restablecer contraseña
</SubmitButton>

              <FormMessage message={searchParams} />
            </div>
            <div>
              <p className="text-sm text-secondary-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link className="text-primary underline" href="/login">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* Botón para regresar al inicio */}
      <div className="mt-4 flex justify-end">
        <Link href="/login">
          <Button
            variant="outline"
            className="text-sm border-[#7B29DD] text-[#32175A]"
          >
            ← Volver
          </Button>
        </Link>
      </div>
    </div>
  );
}
