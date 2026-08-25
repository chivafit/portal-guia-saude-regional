import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";
import { FooterNav } from "@/components/FooterNav";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div className="footer-brand">
          <GuiaSaudeLogo />
          <p>O portal de saúde do Centro-Oeste de Minas — conteúdo, profissionais e serviços perto de você.</p>
          <div className="footer-contact">
            <a href="mailto:rmproguia@gmail.com"><Mail size={15} /> rmproguia@gmail.com</a>
            <span><MapPin size={15} /> Centro-Oeste de Minas Gerais</span>
          </div>
          <div className="footer-social">
            <a href="https://www.instagram.com/saudeguia" target="_blank" rel="noreferrer" aria-label="Instagram do Guia Saúde"><InstagramIcon /></a>
            <a href="https://www.youtube.com/@redemeggabrasil" target="_blank" rel="noreferrer" aria-label="Canal do podcast no YouTube"><YoutubeIcon /></a>
          </div>
        </div>

        <nav className="footer-links" aria-label="Links do rodapé">
          <FooterNav />
          <div>
            <span>Conteúdo</span>
            <Link href="/podcast">Podcast Conexão Saúde</Link>
            <Link href="/revista">Revista digital</Link>
            <Link href="/materias">Prevenção e bem-estar</Link>
          </div>
          <div>
            <span>Institucional</span>
            <Link href="/sobre">Sobre o Guia Saúde</Link>
            <Link href="/inclusao">Cadastre-se no Guia</Link>
            <a href="mailto:rmproguia@gmail.com">Contato</a>
          </div>
        </nav>

        <div className="footer-cta">
          <strong>É profissional ou marca de saúde?</strong>
          <p>Apareça para quem procura atendimento na região.</p>
          <Link href="/anuncie">Anunciar no Guia <ArrowUpRight size={15} /></Link>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© 2026 RM Produções e Eventos · Guia Saúde</span>
        <span>Portal informativo · não substitui avaliação profissional</span>
      </div>
    </footer>
  );
}
