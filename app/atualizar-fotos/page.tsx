import type { Metadata } from "next";
import Link from "next/link";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";
import { publicProfessionals } from "@/lib/public-directory";
import { PhotoUpdateManager } from "./PhotoUpdateManager";

export const metadata: Metadata = {
  title: "Atualizar fotos dos profissionais",
  robots: { index: false, follow: false },
};

export default function PhotoUpdatePage() {
  const profiles = publicProfessionals
    .map((professional) => ({ slug: professional.slug, name: professional.name, profession: professional.profession, specialty: professional.specialty, city: professional.city, imageUrl: professional.imageUrl ?? "" }))
    .sort((first, second) => first.name.localeCompare(second.name, "pt-BR"));

  return (
    <main className="photo-admin-page">
      <header className="photo-admin-header">
        <Link href="/" className="photo-admin-brand" aria-label="Voltar ao Guia Saúde"><GuiaSaudeLogo compact /><small>Atualização de fotos</small></Link>
        <Link href="/" className="photo-admin-back">Voltar ao portal</Link>
      </header>
      <PhotoUpdateManager profiles={profiles} />
    </main>
  );
}
