"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const swUrl = "/service-worker.js";

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log("Service Worker registrado:", registration.scope);
      })
      .catch((error) => {
        console.error("Error al registrar el Service Worker:", error);
      });
  }, []);

  return null;
}
