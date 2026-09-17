import { DesktopHome } from "@/components/DesktopHome";
import { HealthOSHome } from "@/components/HealthOSHome";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Saúde em Piumhi",
  "Encontre profissionais, clínicas, serviços e conteúdos de saúde em Piumhi.",
  "/",
);

export default function Home() {
  return (
    <>
      <DesktopHome />
      <HealthOSHome />
      {/*
        Route-level guard: the web home and the app home intentionally coexist in
        the markup, but only one experience may be visible at a time. Keeping this
        guard next to the route prevents later global visual layers from reviving
        the mobile Health OS on desktop (or the desktop landing on mobile).
      */}
      <style>{`
        @media (min-width: 901px) {
          .desktop-home { display: block !important; }
          .health-os-home { display: none !important; }
        }
        @media (max-width: 900px) {
          .desktop-home { display: none !important; }
          .health-os-home { display: block !important; }
        }
      `}</style>
    </>
  );
}
