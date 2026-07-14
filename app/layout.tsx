import type { Metadata } from "next";
import { CityEntryModal } from "@/components/CityEntryModal";
import { defaultDescription, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Guia Saúde — Portal Regional", template: "%s | Guia Saúde" },
  description: defaultDescription,
  icons: { icon: "/favicon.svg" },
  applicationName: siteName,
  keywords: ["Guia Saúde", "portal de saúde", "profissionais de saúde", "Piumhi", "Capitólio", "Arcos", "Campo Belo", "Bambuí", "São Roque de Minas"],
  openGraph: { title: "Guia Saúde — Portal Regional", description: defaultDescription, type: "website", locale: "pt_BR", siteName, images: [{ url: "/og.png", width: 1536, height: 864, alt: "Guia Saúde — o portal de saúde do Centro-Oeste de Minas" }] },
  twitter: { card: "summary_large_image", title: "Guia Saúde — Portal Regional", description: defaultDescription, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}<CityEntryModal /></body></html>;
}
