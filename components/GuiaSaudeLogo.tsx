export function GuiaSaudeLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "guia-logo guia-logo-compact" : "guia-logo"} aria-hidden="true">
      <span className="guia-logo-kicker">GUIA</span>
      <span className="guia-logo-main">saúde</span>
      {!compact ? <span className="guia-logo-tagline">Portal regional</span> : null}
    </span>
  );
}
