import type { Metadata } from "next";
import { CityEntryModal } from "@/components/CityEntryModal";
import { defaultDescription, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Guia Saúde — Portal Regional", template: "%s | Guia Saúde" },
  description: defaultDescription,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    shortcut: "/favicon.svg",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  applicationName: siteName,
  keywords: ["Guia Saúde", "portal de saúde", "profissionais de saúde", "Piumhi"],
  openGraph: { title: "Guia Saúde — Portal Regional", description: defaultDescription, type: "website", locale: "pt_BR", siteName, images: [{ url: "/og.png", width: 1536, height: 864, alt: "Guia Saúde — portal de saúde" }] },
  twitter: { card: "summary_large_image", title: "Guia Saúde — Portal Regional", description: defaultDescription, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}<CityEntryModal /></body></html>;
}
