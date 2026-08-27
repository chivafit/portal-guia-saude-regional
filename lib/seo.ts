import type { Metadata } from "next";

export const siteUrl = "https://guiasaude.app.br";
export const siteName = "Guia Saúde";
export const defaultDescription = "Portal de saúde com profissionais, empresas, matérias, podcast e revista para ajudar você a encontrar cuidado perto de você.";

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  const url = `${siteUrl}${normalizedPath}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      type: "website",
      locale: "pt_BR",
      images: [{ url: "/og.png", width: 1536, height: 864, alt: `${siteName} — portal regional de saúde` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteName}`, description, images: ["/og.png"] },
  };
}
