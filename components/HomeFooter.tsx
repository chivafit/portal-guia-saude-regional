import Link from "next/link";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";

// Rodapé no estilo da home (.gsd-footer). Reutilizado nas páginas institucionais
// (sobre, anuncie, cadastre-se, privacidade, termos, política editorial, correções).
// Aparece só no desktop; no mobile é escondido via CSS (as telas usam só o dock).
export function HomeFooter() {
  return (
    <footer className="gsd-footer">
      <div className="gsd-footer-top">
        <div className="gsd-footer-brand">
          <Link href="/" className="gsd-brand"><GuiaSaudeLogo /></Link>
          <p>Conectando pessoas à saúde da nossa região com informação, confiança e proximidade.</p>
        </div>
        <div className="gsd-footer-cols">
          <div><b>Encontre</b><Link href="/buscar?cidade=piumhi&tipo=professionals">Profissionais</Link><Link href="/buscar?cidade=piumhi&tipo=services">Clínicas e serviços</Link><Link href="/buscar?categoria=farmacias&cidade=piumhi&tipo=services">Farmácias</Link></div>
          <div><b>Conteúdo</b><Link href="/materias">Matérias</Link><Link href="/podcast">Podcast</Link><Link href="/revista">Revista</Link></div>
          <div><b>Guia Saúde</b><Link href="/sobre">Sobre</Link><Link href="/anuncie">Anuncie</Link><Link href="/inclusao">Cadastre-se</Link></div>
          <div><b>Políticas</b><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de uso</Link><Link href="/politica-editorial">Política editorial</Link></div>
        </div>
      </div>
      <div className="gsd-footer-bottom">
        <span>© 2026 RM Produções e Eventos · Guia Saúde · Piumhi · MG</span>
        <span>Portal informativo · não substitui avaliação profissional</span>
      </div>
    </footer>
  );
}
