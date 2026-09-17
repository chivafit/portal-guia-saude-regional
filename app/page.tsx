import { DesktopHome } from "@/components/DesktopHome";
import { HealthOSHome } from "@/components/HealthOSHome";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Saúde em Piumhi",
  "Encontre profissionais, clínicas, serviços e conteúdos de saúde em Piumhi.",
  "/",
);

export default function Home() {
  return <><DesktopHome /><HealthOSHome /></>;
}
