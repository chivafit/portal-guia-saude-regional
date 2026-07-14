import type { Metadata } from "next";

export const siteUrl = "https://guia-saude-regional.iararodriguesimih.chatgpt.site";
export const siteName = "Guia Saúde";
export const defaultDescription = "Portal regional de saúde com guias por cidade, profissionais, empresas, matérias, podcast e revista no Centro-Oeste de Minas.";

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
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
