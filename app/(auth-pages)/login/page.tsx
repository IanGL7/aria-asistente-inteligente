import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface LoginProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Login({ searchParams }: LoginProps) {
  const toy_id = searchParams?.toy_id as string | undefined;
  const personality_id = searchParams?.personality_id as string | undefined;
  const isGoogleOAuthEnabled = process.env.GOOGLE_OAUTH === "True";

  const signInOrSignUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    // Intentar iniciar sesión primero
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Si inicia sesión correctamente, redirigir a home
    if (!signInError) {
      return redirect("/home");
    }

    // Si falla el login, intentar registrarse
    const origin = headers().get("origin");
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          toy_id: toy_id,
          personality_id: personality_id,
        },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (signUpError) {
      return redirect(`/login?message=${signUpError.message}`);
    }

    return redirect(
      "/login?message=Revisa tu correo para continuar con el inicio de sesión"
    );
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card className="shadow-md sm:bg-white bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="flex flex-row gap-1 items-center">
            Inicia sesión en Aria
          </CardTitle>
          <CardDescription>
            Inicia sesión o crea una cuenta para configurar y usar tu
            dispositivo Aria.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* <ToyPreview /> */}

          {isGoogleOAuthEnabled && (
            <GoogleLoginButton
              toy_id={toy_id}
              personality_id={personality_id}
            />
          )}

          <Separator className="mt-2" />
          <span className="text-sm text-gray-500">
            Usa un correo y una contraseña para registrarte y puedas acceder al
            panel de administracion de Aria.
          </span>

          <form className="flex-1 flex flex-col w-full justify-center gap-4">
            <Label className="text-md" htmlFor="email">
              Correo electrónico
            </Label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border"
              name="email"
              placeholder="tu@ejemplo.com"
              required
            />
            <Label className="text-md" htmlFor="email">
              Contraseña
            </Label>

            <input
              className="rounded-md px-4 py-2 bg-inherit border"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />

            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              ¿Olvidaste tu contraseña?
            </Link>

            <SubmitButton
              formAction={signInOrSignUp}
              className="text-sm font-medium bg-[#7B29DD] hover:bg-[#4b218a] text-green-50 border-[0.1px] rounded-md px-4 py-2 text-foreground my-2"
              pendingText="Iniciando sesión..."
            >
              Continuar con correo
            </SubmitButton>
            {searchParams?.message && (
              <p className="p-4 rounded-md border bg-green-50 border-green-400 text-gray-900 text-center text-sm">
                {searchParams.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Botón para regresar al inicio */}
      <div className="mt-4 flex justify-end">
        <Link href="/">
          <Button
            variant="outline"
            className="text-sm border-[#7B29DD] text-[#32175A]"
          >
            ← Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
