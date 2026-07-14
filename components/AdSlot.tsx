import { ArrowRight } from "lucide-react";
import { activeCampaign } from "@/lib/campaigns";

function fallbackCampaign(code: string) {
  const city = code
    .replace(/^CITY_/, "")
    .replace(/_TOP$/, "")
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  if (code.startsWith("CITY_")) {
    return {
      name: `Saúde preventiva em ${city}`,
      advertiserName: "Apoiador local",
      destinationUrl: "/materias",
    };
  }

  return {
    name: "Cuidado perto de você",
    advertiserName: "Guia Saúde",
    destinationUrl: "/materias",
  };
}

export async function AdSlot({ code, compact = false }: { code: string; compact?: boolean }) {
  const campaign = await activeCampaign(code);
  const displayCampaign = campaign ?? fallbackCampaign(code);
  return (
    <aside className={`ad-slot ad-slot-live ${compact ? "ad-slot-compact" : ""}`} aria-label="Publicidade">
      {campaign?.imageUrl ? <div className="ad-slot-image" style={{ backgroundImage: `url(${campaign.imageUrl})` }} aria-label={campaign.name} /> : null}
      <div>
        <span>APOIO LOCAL · PUBLICIDADE</span>
        <strong>{displayCampaign.name}</strong>
        <small>{displayCampaign.advertiserName}</small>
        <a href={displayCampaign.destinationUrl} target={campaign ? "_blank" : undefined} rel={campaign ? "noreferrer" : undefined}>Conhecer <ArrowRight size={14} /></a>
      </div>
    </aside>
  );
}
