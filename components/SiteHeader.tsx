import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLink } from "@/components/BrandLink";
import { CitySelector } from "@/components/CitySelector";
import { ContextNav } from "@/components/ContextNav";

export function SiteHeader({ showTopline = true, advertiseLabel = "Anuncie" }: { showTopline?: boolean; advertiseLabel?: string }) {
  return (
    <>{showTopline ? <div className="topline"><div className="shell">Conteúdo, profissionais e serviços <span>Perto de você</span></div></div> : null}<header className="site-header">
      <div className="shell header-inner">
        <BrandLink />
        <ContextNav />
        <div className="header-actions">
          <CitySelector />
          <Link href="/anuncie" className="admin-link">{advertiseLabel} <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </header></>
  );
}
