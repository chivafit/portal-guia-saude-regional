import type { CSSProperties } from "react";
import { Mic2 } from "lucide-react";
import { initialsFor, paletteFor } from "@/lib/avatars";
import { ProfessionalImage } from "@/components/ProfessionalImage";

export type CoverEpisode = { guest: string; role?: string; guestPhoto?: string; guestArea?: string };

/** Capa padrão do Conexão Saúde: fundo verde-escuro da marca, foto do convidado (ou as
 *  iniciais na cor da área) com anel verde-limão e o selo do programa. Gerada pelo
 *  próprio site, inclusive para os episódios que chegam sozinhos do YouTube.
 *  `size="feature"` mostra também o nome do programa; `size="row"` é a miniatura da lista. */
export function PodcastCover({ episode, size = "row" }: { episode: CoverEpisode; size?: "row" | "feature" }) {
  const area = episode.guestArea || episode.role || "";
  const palette = paletteFor(area);
  return <span className={`pc pc-${size}`} aria-hidden="true">
    <span className="pc-glow" />
    {size === "feature" ? <span className="pc-brand">Conexão<br />Saúde</span> : null}
    <span className="pc-photo">
      {episode.guestPhoto
        ? <ProfessionalImage src={episode.guestPhoto} sizes={size === "feature" ? "180px" : "72px"} />
        : <span className="pc-initials" style={{ "--pc-bg": palette.background, "--pc-fg": palette.text } as CSSProperties}>{initialsFor(episode.guest)}</span>}
    </span>
    <span className="pc-badge"><Mic2 size={size === "feature" ? 16 : 11} /></span>
  </span>;
}
