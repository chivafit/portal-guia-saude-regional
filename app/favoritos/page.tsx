import { FavoritesList } from "@/components/FavoritesList";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Meus favoritos",
  "Profissionais de saúde salvos neste aparelho.",
  "/favoritos",
);

export default function FavoritesPage() {
  return (
    <>
      <SiteHeader />
      <main className="favorites-page">
        <header className="shell favorites-header">
          <p className="eyebrow">Acesso rápido</p>
          <h1>Meus favoritos</h1>
          <p>Os perfis ficam salvos somente neste aparelho.</p>
        </header>
        <div className="shell"><FavoritesList /></div>
      </main>
      <SiteFooter />
    </>
  );
}
