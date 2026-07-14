import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://guia-saude-regional.iararodriguesimih.chatgpt.site"),
  title: { default: "Guia Saúde — Portal Regional", template: "%s | Guia Saúde" },
  description: "Profissionais, informação e cuidado perto de você no Centro-Oeste de Minas.",
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "Guia Saúde — Portal Regional", description: "Profissionais, informação e cuidado perto de você.", type: "website", locale: "pt_BR", images: [{ url: "/og.png", width: 1536, height: 864, alt: "Guia Saúde — o portal de saúde do Centro-Oeste de Minas" }] },
  twitter: { card: "summary_large_image", title: "Guia Saúde — Portal Regional", description: "Profissionais, informação e cuidado perto de você.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
