import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Portal Guia Saúde — início">
          <span>GUIA SAÚDE</span>
          <small>Portal regional</small>
        </Link>
        <nav className="main-nav" aria-label="Navegação principal">
          <Link href="/buscar">Profissionais</Link>
          <Link href="/empresas">Empresas</Link>
          <Link href="/#materias">Matérias</Link>
          <Link href="/#podcast">Podcast</Link>
          <Link href="/#revista">Revista</Link>
        </nav>
        <Link href="/admin" className="admin-link">Área interna</Link>
      </div>
    </header>
  );
}
