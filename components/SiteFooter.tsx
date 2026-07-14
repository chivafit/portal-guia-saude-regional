import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><strong>GUIA SAÚDE</strong><p>Informação e conexões para a saúde regional.</p></div>
        <div><span>Portal</span><Link href="/buscar">Encontrar profissionais</Link><Link href="/empresas">Empresas e serviços</Link></div>
        <div><span>Institucional</span><Link href="/anuncie">Anuncie</Link><a href="mailto:rmproguias@gmail.com">Contato</a></div>
      </div>
      <div className="shell footer-bottom">© 2026 RM Produções e Eventos · Versão demonstrativa do portal</div>
    </footer>
  );
}
