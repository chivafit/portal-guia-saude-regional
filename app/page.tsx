import PiumhiGuidePage from "./cidades/[slug]/page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Saúde em Piumhi",
  "Encontre profissionais, clínicas, serviços e conteúdos de saúde em Piumhi.",
  "/",
);

/** A página inicial é o Guia Saúde de Piumhi durante esta primeira fase do portal. */
export default function Home() {
  return <PiumhiGuidePage params={Promise.resolve({ slug: "piumhi" })} />;
}
