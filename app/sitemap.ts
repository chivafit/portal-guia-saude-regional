import type { MetadataRoute } from "next";
import { cityDetails, professionals } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/buscar", "/empresas", "/materias", "/podcast", "/revista", "/anuncie", "/sobre", "/inclusao"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" as const : "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const cityRoutes = Object.keys(cityDetails).map((slug) => ({
    url: `${siteUrl}/cidades/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));
  const profileRoutes = professionals.map((item) => ({
    url: `${siteUrl}/profissionais/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...cityRoutes, ...profileRoutes];
}
