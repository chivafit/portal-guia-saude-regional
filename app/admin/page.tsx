import Link from "next/link";
import { CampaignManager } from "./CampaignManager";
import { ContentManager } from "./ContentManager";
import { DirectoryManager } from "./DirectoryManager";

export default function AdminPage() {
  return <main className="admin-page"><header className="admin-header"><Link href="/" className="brand"><span>GUIA SAÚDE</span><small>Administração</small></Link><div><span>Central operacional</span><Link href="/">Voltar ao portal</Link></div></header><section className="admin-intro"><p className="eyebrow">Operação do portal</p><h1>Conteúdo, diretório, revista, podcast e mídia.</h1><p>Crie, revise e publique conteúdos, profissionais, empresas e campanhas da plataforma regional.</p></section><DirectoryManager /><CampaignManager /><ContentManager /></main>;
}
