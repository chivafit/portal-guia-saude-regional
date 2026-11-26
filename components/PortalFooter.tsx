import Link from "next/link";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";

const columns = [
  { title: "Encontre", links: [
    { label: "Profissionais", href: "/buscar?cidade=piumhi&tipo=professionals" },
    { label: "Clínicas e serviços", href: "/buscar?cidade=piumhi&tipo=services" },
    { label: "Farmácias", href: "/buscar?categoria=farmacias&cidade=piumhi&tipo=services" },
    { label: "Especialidades", href: "/buscar/especialidades" },
  ] },
  { title: "Conteúdo", links: [
    { label: "Matérias", href: "/materias" },
    { label: "Podcast Conexão Saúde", href: "/podcast" },
    { label: "Revista Guia Saúde", href: "/revista" },
  ] },
  { title: "Guia Saúde", links: [
    { label: "Sobre", href: "/sobre" },
    { label: "Anuncie", href: "/anuncie" },
    { label: "Cadastre seu perfil", href: "/inclusao" },
    { label: "Contato", href: "mailto:rmproguia@gmail.com" },
  ] },
];

/** Rodapé único do site. No app ele fica oculto (navegação inferior). */
export function PortalFooter() {
  return (
    <footer className="official-footer portal-footer">
      <div className="official-footer-top">
        <Link href="/" className="official-brand" aria-label="Guia Saúde — início"><GuiaSaudeLogo /></Link>
        <p>Profissionais, serviços e conteúdo de saúde de Piumhi e região, com informação, confiança e proximidade.</p>
        <div className="official-footer-links">
          {columns.map((column) => (
            <div key={column.title}>
              <b>{column.title}</b>
              {column.links.map((link) => link.href.startsWith("mailto:")
                ? <a key={link.label} href={link.href}>{link.label}</a>
                : <Link key={link.label} href={link.href} prefetch={link.href.startsWith("/anuncie") ? false : undefined}>{link.label}</Link>)}
            </div>
          ))}
        </div>
      </div>
      <div className="official-footer-bottom">
        <span>© {new Date().getFullYear()} Guia Saúde · Piumhi, MG</span>
        <nav aria-label="Políticas"><Link href="/privacidade">Privacidade</Link><span>·</span><Link href="/termos">Termos de uso</Link><span>·</span><Link href="/politica-editorial">Política editorial</Link><span>·</span><Link href="/correcoes">Correções</Link></nav>
        <span>Conteúdo informativo: não substitui avaliação profissional.</span>
      </div>
    </footer>
  );
}
