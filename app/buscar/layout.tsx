import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata(
    "Buscar profissionais e serviços de saúde em Piumhi",
    "Pesquise profissionais, especialidades, clínicas, exames, farmácias e outros serviços de saúde em Piumhi, Minas Gerais.",
    "/buscar",
  ),
  robots: { index: false, follow: true },
};

export default function SearchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
