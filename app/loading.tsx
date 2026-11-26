/** Tela de carregamento entre páginas: blocos no formato dos cartões, sem tela vazia. */
export default function Loading() {
  return <main className="sk-page" aria-busy="true" aria-label="Carregando">
    <div className="sk-shell">
      <span className="sk sk-eyebrow" />
      <span className="sk sk-title" />
      <span className="sk sk-search" />
      {[0, 1, 2, 3].map((i) => <div className="sk-card" key={i}>
        <span className="sk sk-avatar" />
        <span className="sk-lines"><span className="sk sk-line short" /><span className="sk sk-line" /><span className="sk sk-line mid" /></span>
      </div>)}
    </div>
  </main>;
}
