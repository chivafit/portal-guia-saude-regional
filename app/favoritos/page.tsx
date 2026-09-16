import { FavoritesList } from "@/components/FavoritesList";
import { HealthOSSectionHeader } from "@/components/HealthOSSectionHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Meus favoritos",
  "Profissionais de saúde salvos neste aparelho.",
  "/favoritos",
);

export default function FavoritesPage() {
  return (
    <main className="native-favorites-screen hos-standard-screen">
      <div className="native-favorites-aura" aria-hidden="true" />
      <section className="native-favorites-shell hos-standard-shell">
        <HealthOSSectionHeader
          eyebrow="SUA LISTA"
          title="Favoritos"
          description="Seus profissionais salvos ficam disponíveis neste aparelho para acesso rápido."
        />
        <FavoritesList />
      </section>
    </main>
  );
}
