import { DesktopHome } from "@/components/DesktopHome";
import { HealthOSHome } from "@/components/HealthOSHome";
import { LandingPage } from "@/components/LandingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Saúde em Piumhi",
  "Encontre profissionais, clínicas, serviços e conteúdos de saúde em Piumhi.",
  "/",
);

export default function Home() {
  if (process.env.NEXT_PUBLIC_BUILD_TARGET !== "app") return <LandingPage />;
  return (
    <>
      <DesktopHome />
      <HealthOSHome />
    </>
  );
}
