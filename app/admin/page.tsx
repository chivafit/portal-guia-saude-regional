import Link from "next/link";
import { AdminBoard } from "./AdminBoard";

export default function AdminPage() {
  return <main className="admin-page"><header className="admin-header"><Link href="/" className="brand"><span>GUIA SAÚDE</span><small>Administração</small></Link><div><span>Ambiente interno demonstrativo</span><Link href="/">Voltar ao portal</Link></div></header><section className="admin-intro"><p className="eyebrow">Operação editorial</p><h1>Revisão e publicação de cadastros</h1><p>Visualize o caminho entre a importação de uma fonte pública e a publicação de um perfil conferido.</p></section><AdminBoard /></main>;
}
