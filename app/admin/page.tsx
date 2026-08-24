import Link from "next/link";
import type { Metadata } from "next";
import { CampaignManager } from "./CampaignManager";
import { ContentManager } from "./ContentManager";
import { DirectoryManager } from "./DirectoryManager";
import { InclusionRequestsManager } from "./InclusionRequestsManager";
import { LeadsManager } from "./LeadsManager";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";
import { articles, organizations, podcasts, professionals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Administração",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const verified = professionals.filter((item) => item.verified).length;
  const contentTotal = articles.length + podcasts.length;
  return <main className="admin-page"><header className="admin-header"><Link href="/" className="brand"><GuiaSaudeLogo compact /><small>Administração</small></Link><div><span>Central operacional</span><Link href="/">Voltar ao portal</Link></div></header><section className="admin-intro"><p className="eyebrow">Operação do portal</p><h1>Visão geral do Guia Saúde</h1><p>Veja o que está publicado e siga diretamente para a área que precisa de atenção.</p><div className="admin-overview" aria-label="Resumo do portal"><div><strong>{professionals.length}</strong><span>Profissionais cadastrados</span></div><div><strong>{organizations.length}</strong><span>Empresas e serviços</span></div><div><strong>{verified}</strong><span>Perfis verificados</span></div><div><strong>{contentTotal}</strong><span>Matérias e podcasts</span></div></div><div className="admin-flow" aria-label="Fluxo de publicação"><span>1. Cadastrar</span><span>2. Revisar</span><span>3. Verificar</span><span>4. Publicar</span></div></section><LeadsManager /><InclusionRequestsManager /><DirectoryManager /><CampaignManager /><ContentManager /></main>;
}
