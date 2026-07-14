import Link from "next/link";
import { ContentManager } from "./ContentManager";

export default function AdminPage() {
  return <main className="admin-page"><header className="admin-header"><Link href="/" className="brand"><span>GUIA SAÚDE</span><small>Administração</small></Link><div><span>Central de conteúdo</span><Link href="/">Voltar ao portal</Link></div></header><section className="admin-intro"><p className="eyebrow">Operação editorial</p><h1>Conteúdo, revista, podcast e mídia.</h1><p>Crie, revise e publique os conteúdos do portal em uma única central.</p></section><ContentManager /></main>;
}
