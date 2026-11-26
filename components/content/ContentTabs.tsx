import Link from "next/link";

const tabs = [
  { key: "materias", label: "Matérias", href: "/materias" },
  { key: "podcast", label: "Podcast", href: "/podcast" },
  { key: "revista", label: "Revista", href: "/revista" },
] as const;

/** Abas de Conteúdos: matérias, podcast e revista juntos, como no design de referência. */
export function ContentTabs({ active }: { active: (typeof tabs)[number]["key"] }) {
  return <nav className="cn-tabs" aria-label="Tipos de conteúdo">
    {tabs.map((tab) => <Link key={tab.key} href={tab.href} className={tab.key === active ? "active" : undefined} aria-current={tab.key === active ? "page" : undefined}>{tab.label}</Link>)}
  </nav>;
}
