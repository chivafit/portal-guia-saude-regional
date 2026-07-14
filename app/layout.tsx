import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Portal Guia Saúde", template: "%s | Guia Saúde" },
  description: "Profissionais, empresas, matérias, podcast e revista para a saúde regional.",
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "Portal Guia Saúde", description: "Saúde regional em um só lugar.", type: "website", locale: "pt_BR" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
