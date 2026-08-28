import type { MetadataRoute } from "next";
import { articles, magazineEditions } from "@/lib/data";
import { publicProfessionals } from "@/lib/public-directory";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path = "") => path ? `${siteUrl}/${path.replace(/^\/+|\/+$/g, "")}/` : `${siteUrl}/`;
  // Datas de deploy não representam atualização editorial. Sem uma data confiável,
  // omitimos lastModified para não enviar sinais falsos aos mecanismos de busca.
  const staticRoutes = ["", "empresas", "materias", "podcast", "revista", "anuncie", "sobre", "inclusao"].map((path) => ({
    url: url(path),
    changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const profileRoutes = publicProfessionals.map((item) => ({
    url: url(`profissionais/${item.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const articleRoutes = articles.map((article) => ({
    url: url(`materias/${article.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const editionRoutes = magazineEditions.map((edition) => ({
    url: url(`revista/${edition.slug}`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...articleRoutes, ...editionRoutes, ...profileRoutes];
}
