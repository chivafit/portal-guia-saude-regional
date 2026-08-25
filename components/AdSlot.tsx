import { ArrowRight } from "lucide-react";
import { supporters } from "@/lib/data";

// Arte de exemplo usada APENAS na demonstração comercial (página /anuncie).
// Nas páginas de conteúdo, um espaço não vendido não exibe criativo grande —
// para o portal não parecer que tudo é anúncio.
const DEMO_CODE = "DEMONSTRACAO_COMERCIAL";
type StaticCampaign = { imageUrl: string | null; name: string; advertiserName: string; destinationUrl: string };

function campaignForStaticSite(_code: string): StaticCampaign | null {
  return null;
}

export async function AdSlot({ code, compact = false }: { code: string; compact?: boolean }) {
  const campaign = campaignForStaticSite(code);

  // Espaço vendido: exibe a campanha real (imagem, quando houver, + texto).
  if (campaign) {
    return (
      <aside className={`ad-slot ad-slot-live ${compact ? "ad-slot-compact" : ""}`} aria-label="Publicidade">
        {campaign.imageUrl ? (
          <div className="ad-slot-image" style={{ backgroundImage: `url(${campaign.imageUrl})` }} aria-label={campaign.name} />
        ) : null}
        <div>
          <span>APOIO LOCAL · PUBLICIDADE</span>
          <strong>{campaign.name}</strong>
          <small>{campaign.advertiserName}</small>
          <a href={campaign.destinationUrl} target="_blank" rel="noreferrer">Conhecer <ArrowRight size={14} /></a>
        </div>
      </aside>
    );
  }

  // Demonstração comercial (mídia kit): mantém a arte de exemplo para vendas.
  if (code === DEMO_CODE) {
    return (
      <aside className={`ad-slot ad-slot-live ${compact ? "ad-slot-compact" : ""}`} aria-label="Exemplo de anúncio">
        <div className="ad-slot-image" style={{ backgroundImage: "url(/ads/perfil-destaque.svg)" }} aria-label="Exemplo de anúncio" />
        <div>
          <span>EXEMPLO · FORMATO COMERCIAL</span>
          <strong>Este espaço pode ser da sua marca</strong>
          <small>Guia Saúde</small>
          <a href="/anuncie">Ver formatos <ArrowRight size={14} /></a>
        </div>
      </aside>
    );
  }

  // Espaço não vendido: apenas as logos das empresas apoiadoras (sem rótulo/CTA).
  if (!supporters.length) return null;
  return (
    <aside className={`ad-slot ad-slot-house ${compact ? "ad-slot-compact" : ""}`} aria-label="Empresas apoiadoras">
      <div className="supporter-logos" role="list">
        {supporters.map((item) => (
          <span
            key={item.logo}
            role="img"
            aria-label={item.name}
            className="supporter-logo"
            style={{ backgroundImage: `url(${item.logo})` }}
          />
        ))}
      </div>
    </aside>
  );
}
