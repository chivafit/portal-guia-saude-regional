export function AdSlot({ code, compact = false }: { code: string; compact?: boolean }) {
  return (
    <aside className={`ad-slot ${compact ? "ad-slot-compact" : ""}`} aria-label="Espaço publicitário demonstrativo">
      <span>PUBLICIDADE</span>
      <strong>Espaço disponível para campanhas regionais</strong>
      <small>{code} · segmentação por cidade e categoria</small>
    </aside>
  );
}
