import type { MetadataRoute } from "next";
import { professionals } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/buscar", "/empresas", "/materias", "/podcast", "/revista", "/anuncie", "/sobre", "/inclusao"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" as const : "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const profileRoutes = professionals.filter((item) => item.city === "Piumhi").map((item) => ({
    url: `${siteUrl}/profissionais/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...profileRoutes];
}
