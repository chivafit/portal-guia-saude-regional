import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { FavoritesList } from "@/components/FavoritesList";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Meus favoritos",
  "Profissionais de saúde salvos neste aparelho.",
  "/favoritos",
);

export default function FavoritesPage() {
  return (
    <main className="native-favorites-screen">
      <div className="native-favorites-aura" aria-hidden="true" />
      <section className="native-favorites-shell">
        <header className="native-favorites-topbar">
          <Link href="/" aria-label="Voltar"><ArrowLeft size={19} /></Link>
          <div><small>GUIA SAÚDE</small><strong>Favoritos</strong></div>
          <span aria-hidden="true"><Heart size={18} /></span>
        </header>
        <section className="native-favorites-intro">
          <p>SUA LISTA</p>
          <h1>Cuidados que você<br/><em>quer ter por perto.</em></h1>
          <span>Seus profissionais salvos ficam disponíveis neste aparelho para acesso rápido.</span>
        </section>
        <FavoritesList />
      </section>
    </main>
  );
}
