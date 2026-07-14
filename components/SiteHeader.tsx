import Link from "next/link";

export function SiteHeader() {
  return (
    <><div className="topline"><div className="shell">O portal de saúde do Centro-Oeste de Minas <span>Conteúdo, profissionais e serviços perto de você</span></div></div><header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Portal Guia Saúde — início">
          <span><b>saúde</b> GUIA</span>
          <small>Portal regional</small>
        </Link>
        <nav className="main-nav" aria-label="Navegação principal">
          <Link href="/buscar">Profissionais</Link>
          <Link href="/empresas">Empresas</Link>
          <Link href="/materias">Matérias</Link>
          <Link href="/podcast">Podcast</Link>
          <Link href="/revista">Revista</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/inclusao">Inclusão</Link>
        </nav>
        <Link href="/anuncie" className="admin-link">Anuncie <span>↗</span></Link>
      </div>
    </header></>
  );
}
