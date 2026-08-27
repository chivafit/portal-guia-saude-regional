import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata("Buscar profissionais e serviços", "Pesquisa interna de profissionais, clínicas e serviços do Guia Saúde.", "/buscar"),
  robots: { index: false, follow: true },
};

export default function SearchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
