import { Suspense } from "react";
import { ServicesDirectory } from "@/components/services/ServicesDirectory";
import { organizations } from "@/lib/data";
import { publishedOrganizations } from "@/lib/public-directory";
import { categoryOptionsFor } from "@/lib/service-taxonomy";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Clínicas e serviços", "Encontre clínicas, hospitais, odontologia, academias e outros serviços de saúde publicados em Piumhi.", "/empresas");

export default async function CompaniesPage() {
  const source = await publishedOrganizations(organizations);
  const categories = categoryOptionsFor(source).map(({ key, label, count }) => ({ key, label, count }));
  return <main className="company-directory-page cs-page">
    <Suspense fallback={null}><ServicesDirectory organizations={source} categories={categories} /></Suspense>
  </main>;
}
