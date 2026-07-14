import { ArrowRight } from "lucide-react";
import { activeCampaign } from "@/lib/campaigns";

export async function AdSlot({ code, compact = false }: { code: string; compact?: boolean }) {
  const campaign = await activeCampaign(code);
  if (campaign) {
    return (
      <aside className={`ad-slot ad-slot-live ${compact ? "ad-slot-compact" : ""}`} aria-label="Publicidade">
        <span>PUBLICIDADE</span>
        <strong>{campaign.name}</strong>
        <small>{campaign.advertiserName} · {code}</small>
        <a href={campaign.destinationUrl} target="_blank" rel="noreferrer">Conhecer campanha <ArrowRight size={14} /></a>
      </aside>
    );
  }
  return (
    <aside className={`ad-slot ${compact ? "ad-slot-compact" : ""}`} aria-label="Espaço publicitário demonstrativo">
      <span>PUBLICIDADE</span>
      <strong>Espaço disponível para campanhas regionais</strong>
      <small>{code} · segmentação por cidade e categoria</small>
    </aside>
  );
}
