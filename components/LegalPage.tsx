import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { ReactNode } from "react";

type LegalPageProps = { eyebrow: string; title: string; intro: string; children: ReactNode };

export function LegalPage({ eyebrow, title, intro, children }: LegalPageProps) {
  return <><SiteHeader /><main><section className="content-hero"><div className="shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section><article className="shell content-section article-read legal-page">{children}</article></main><SiteFooter /></>;
}
