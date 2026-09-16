import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Guia Saúde — Portal Regional",
    short_name: "Guia Saúde",
    description: "Profissionais, clínicas, serviços e conteúdos de saúde da sua região.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f4f7fa",
    theme_color: "#f4f7fa",
    categories: ["health", "medical", "lifestyle"],
    lang: "pt-BR",
    icons: [
      { src: "/app-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/app-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/app-icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
