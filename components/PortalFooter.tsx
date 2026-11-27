import Link from "next/link";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";

const mainLinks = [
  { label: "Profissionais", href: "/buscar?cidade=piumhi&tipo=professionals" },
  { label: "Clínicas", href: "/empresas" },
  { label: "Conteúdos", href: "/materias" },
  { label: "Podcast", href: "/podcast" },
  { label: "Revista", href: "/revista" },
  { label: "Sobre", href: "/sobre" },
  { label: "Cadastre seu perfil", href: "/inclusao" },
];

const legalLinks = [
  { label: "Privacidade", href: "/privacidade" },
  { label: "Termos", href: "/termos" },
  { label: "Política editorial", href: "/politica-editorial" },
  { label: "Correções", href: "/correcoes" },
  { label: "Contato", href: "mailto:rmproguia@gmail.com" },
];

/** Rodapé compacto do site: marca, links principais numa linha e, embaixo, os
 *  links legais e o aviso. No app ele fica oculto (navegação inferior). */
export function PortalFooter() {
  return (
    <footer className="official-footer portal-footer ft">
      <div className="ft-top">
        <Link href="/" className="official-brand ft-brand" aria-label="Guia Saúde — início"><GuiaSaudeLogo /></Link>
        <nav className="ft-links" aria-label="Rodapé">
          {mainLinks.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}
        </nav>
        <Link className="ft-cta" href="/anuncie" prefetch={false}>Anuncie</Link>
      </div>
      <div className="ft-bottom">
        <span>© {new Date().getFullYear()} Guia Saúde · Piumhi, MG · Conteúdo informativo: não substitui avaliação profissional.</span>
        <nav className="ft-legal" aria-label="Políticas">
          {legalLinks.map((link) => link.href.startsWith("mailto:")
            ? <a key={link.label} href={link.href}>{link.label}</a>
            : <Link key={link.label} href={link.href}>{link.label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
