import { GeistSans } from "geist/font/sans";
import { Product, WithContext } from "schema-dts";
import {
    Inter,
    Baloo_2,
    Comic_Neue,
    Quicksand,
    Fredoka,
    Lora,
    Inter_Tight,
    Borel,
    Silkscreen,
    Luckiest_Guy,
} from "next/font/google";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/Footer";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { fetchGithubStars } from "./actions";
import { Metadata, Viewport } from "next";
import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Karla } from "next/font/google";




const karla = Karla({
	subsets: ["latin"],
	variable: "--font-karla",
});

import Script from "next/script";
import { Navbar } from "./components/Nav/Navbar";
import { getUserById } from "@/db/users";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const inter_tight = Inter_Tight({
    weight: ["500", "600", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-inter-tight",
    display: "swap",
});

const baloo2 = Baloo_2({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-baloo2",
});

const comicNeue = Comic_Neue({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-comic-neue",
    weight: ["300", "400", "700"],
});

const quicksand = Quicksand({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-quicksand",
});

const fredoka = Fredoka({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-fredoka",
});

const lora = Lora({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-lora",
});

const borel = Borel({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-borel",
    weight: ["400"],
});

const silkscreen = Silkscreen({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-silkscreen",
    weight: ["400"],
});

const luckiestGuy = Luckiest_Guy({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-luckiest-guy",
    weight: ["400"],
});

const fonts = `${inter.variable} ${inter_tight.variable} ${baloo2.variable} ${comicNeue.variable} ${quicksand.variable} ${fredoka.variable} ${lora.variable} ${karla.variable} ${borel.variable} ${silkscreen.variable} ${luckiestGuy.variable}`;

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: {
        default: "Aria | Asistente inteligente",
        template: "%s | Aria",
    },
    applicationName: "Aria - Asistente inteligente",
    description:
        "Aria es un asistente inteligente para cuidado y seguridad que funciona incluso sin internet. Permite realizar llamadas y alertas, controlar dispositivos del hogar y apoyar a personas que viven solas, adultos mayores o personas con discapacidad.",

     manifest: "/manifest.webmanifest",
    
    
    authors: [
        {
            name: "Ian Gonzalez Luna",
            url: "https://portafolio-ian-gl-5djm.vercel.app",
        },
    ],
    keywords: [
        "Aria",
        "asistente inteligente",
        "dispositivo de cuidado",
        "seguridad en el hogar",
        "adultos mayores",
        "personas con discapacidad",
        "botón de emergencia",
        "dispositivo offline",
        "IoT",
        "control del hogar",
        "asistente de voz",
        "domótica",
        "cuidado 24/7",
        "alertas de emergencia",
    ],
    openGraph: {
        title: "Aria - Asistente inteligente para cuidado y seguridad",
        description:
            "Aria es un asistente inteligente que brinda apoyo en el cuidado y la seguridad de personas que viven solas, adultos mayores o personas con discapacidad, incluso sin conexión a internet.",
        siteName: "Aria",
        locale: "es-MX", 
        type: "website",
        images: [
            {
                url: `/img/og-aria.png`,
                width: 1200,
                height: 630,
                alt: "Asistente inteligente para cuidado y seguridad",
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
    generator: "Next.js",
    creator: "IanGL",
    publisher: "Proyecto Aria",
    alternates: {
        canonical: defaultUrl, 
        languages: {
            "es-MX": defaultUrl, 
        },
    },
    icons: {
  icon: [
    { url: "/favicon.ico", type: "image/x-icon" },
    { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  apple: [
    { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
  ],
},

    twitter: {
        card: "summary_large_image",
        title:
            "Aria - Asistente inteligente para cuidado y seguridad en el hogar",
        description:
            "Aria es un asistente inteligente que ofrece apoyo en cuidado y seguridad, con llamadas y alertas incluso sin internet, ideal para adultos mayores y personas que viven solas.",
        images: [`/img/og-aria.png`],
    },
    assets: `/img/og-aria.png`, // TODO: Ajustar a la carpeta de assets real si cambia
    formatDetection: {
        telephone: false,
    },
    appleWebApp: {
        capable: true,
        title: "Aria",
        statusBarStyle: "black-translucent",
    },
    category: "Asistente inteligente / Tecnología asistiva",
    classification:
        "Asistente inteligente para cuidado, seguridad y domótica offline",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#020617",
};

const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Aria",
    description:
        "Aria es un asistente inteligente para cuidado y seguridad que funciona incluso sin conexión a internet. Facilita llamadas de emergencia, alertas y control local de dispositivos del hogar.",
    brand: {
        "@type": "Brand",
        name: "Aria",
    },
    offers: {
        "@type": "Offer",
        url: defaultUrl, 
        priceCurrency: "MXN", 
        price: "0.00", 
        priceValidUntil: "2026-12-31", 
        availability: "https://schema.org/PreOrder", 
        seller: {
            "@type": "Organization",
            name: "Proyecto Aria", 
        },
        hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            returnPolicyCategory:
                "https://schema.org/MerchantReturnUnspecified",
            merchantReturnDays: 30, 
        },
        shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingDestination: {
                "@type": "DefinedRegion",
                name: "México", 
            },
            shippingRate: {
                "@type": "MonetaryAmount",
                value: "0.00",
                currency: "MXN",
            },
        },
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0", 
        reviewCount: "0", 
    },
    
    review: [
        {
            "@type": "Review",
            author: {
                "@type": "Person",
                name: "Cuidadora profesional",
            },
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
            },
            reviewBody:
                "Aria facilita mucho el seguimiento de recordatorios y la respuesta rápida ante emergencias.",
        },
        {
            "@type": "Review",
            author: {
                "@type": "Person",
                name: "Familiar de persona mayor",
            },
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
            },
            reviewBody:
                "Nos da tranquilidad saber que nuestra abuela puede pedir ayuda de forma sencilla, incluso sin internet.",
        },
        {
            "@type": "Review",
            author: {
                "@type": "Person",
                name: "Persona con movilidad reducida",
            },
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
            },
            reviewBody:
                "Poder controlar las luces y enviar alertas solo con la voz es una gran ayuda en el día a día.",
        },
        {
            "@type": "Review",
            author: {
                "@type": "Person",
                name: "Tester del prototipo",
            },
            reviewRating: {
                "@type": "Rating",
                ratingValue: "4.5",
            },
            reviewBody:
                "El concepto es excelente; será aún mejor cuando se integren más dispositivos del hogar.",
        },
    ],
    image: `${defaultUrl}/images/og-aria.png`, 
    category: "Asistente inteligente para cuidado y seguridad",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    const { stars } = await fetchGithubStars("IanGL7/aria-asistente-inteligente");

    const {
        data: { user },
    } = await supabase.auth.getUser();

    let dbUser: IUser | undefined;
    if (user) {
        dbUser = await getUserById(supabase, user.id);
    }

    return (
        <html
            lang="es" 
            className={`${GeistSans.className} h-full ${fonts}`}
            suppressHydrationWarning
        >
            <head>
                <link
                    rel="canonical"
                    href={defaultUrl}
                />{" "}
                {/* TODO: Ajustar canonical si se usa un dominio distinto a defaultUrl */}
                <Script
                    id="product-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd),
                    }}
                />
            </head>
            <body className="bg-background text-foreground flex flex-col min-h-screen bg-[#FCFAFF] font-karla">
                <NextTopLoader
                    showSpinner={false}
                    color="#7B29DD" // color primario del proyecto Aria
                />

                {/* <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                > */}
                <main className="flex-grow mx-auto w-full flex flex-col">
                    <Navbar user={dbUser ?? null} stars={stars} />
                    {children}
                    <Footer />
                </main>
                {/* <Analytics /> */}
                <Toaster />
                {/* </ThemeProvider> */}
                 <ServiceWorkerRegister />
            </body>
            <GoogleAnalytics gaId="G-XXXXXXXXXX" />{" "}
            {/* TODO: Reemplazar por el ID real de Google Analytics o eliminar si no se usa */}
        </html>
    );
}
