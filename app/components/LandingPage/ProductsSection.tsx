"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    features: string[];
    url: string;
};

const products: Product[] = [
    {
        id: "1",
        name: "Aria – Dispositivo de asistencia inteligente",
        description:
            "Preorden del prototipo de Aria, un asistente diseñado para apoyo, cuidado y seguridad en el hogar, incluso sin conexión a internet.",
        price: 999, // MXN
        url: "https://mpago.li/2HMimMc", 
        imageUrl: "/products/aria-device.png", // ← ajusta al path real de tu imagen
        features: [
            "Botón grande para pedir ayuda rápidamente",
            "Llamadas y alertas a contactos de emergencia",
            "Pensado para personas que viven solas o adultos mayores",
            "Prototipo en preventa (producción limitada)",
        ],
    },
    {
  id: "2",
  name: "Aria Plus – Dispositivo avanzado",
  description:
    "Versión avanzada de Aria con más capacidades para monitoreo, automatización y comunicación en el hogar, pensada para un uso diario más completo.",
  price: 1299, // MXN, ajusta el precio que tú quieras
  url: "https://mpago.li/TU_LINK_DE_PAGO_ARIA_PLUS",
  imageUrl: "/products/aria-plus.png",
  features: [
    "Más funciones de monitoreo y alertas",
    "Mejor integración con dispositivos del hogar",
    "Pensado para uso diario intensivo",
    "Incluye todas las funciones de Aria estándar"
  ],
},
];

export default function ProductsSection() {
    return (
        <section className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
            <div className="container px-4 md:px-6 max-w-screen-sm mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                        Preordenar Aria
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">
                        Apoya el desarrollo del prototipo y asegura tu dispositivo Aria en la primera producción.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {products.map((product) => (
                        <Link href={product.url} key={product.id}>
                            <Card
                                key={product.id}
                                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 
                                     transform transition-all duration-300
                                     hover:shadow-xl hover:border-purple-200
                                     relative
                                     before:absolute before:inset-0  before:opacity-0 
                                     hover:before:opacity-100 before:transition-opacity
                                     hover:translate-y-[-2px] cursor-pointer"
                            >
                                <CardContent className="p-0 relative">
                                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                                        {/* Image Section */}
                                        <div className="w-full md:w-2/5 min-h-[200px] h-full relative rounded-xl overflow-hidden border border-purple-100">
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                        <div className="w-full md:w-3/5 flex flex-col gap-4 justify-between min-h-[200px]">
                                            {/* Content Section */}
                                            <div className="flex-1 flex flex-col items-start md:text-left">
                                                <h3 className="text-xl font-bold text-purple-900 mb-2">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    {product.description}
                                                </p>
                                                {/* Si quieres mostrar las características, descomenta esto:
                                                <div className="flex flex-col gap-2">
                                                    {product.features.map((feature) => (
                                                        <p key={feature} className="text-gray-600 text-sm">
                                                            {feature}
                                                        </p>
                                                    ))}
                                                </div>
                                                */}
                                            </div>

                                            {/* Price and Button Section */}
                                            <div className="flex flex-row items-center justify-end gap-4">
                                                <p className="text-2xl font-bold text-purple-900">
                                                    ${product.price}
                                                </p>
                                                <Button
                                                    size="lg"
                                                    className="w-full sm:w-auto flex-row items-center gap-2 px-4 bg-purple-600 text-white border-0 text-md"
                                                >
                                                    <ShoppingCart className="h-4 w-4" /> Preordenar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
