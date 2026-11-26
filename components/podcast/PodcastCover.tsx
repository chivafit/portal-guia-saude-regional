import { Mic2 } from "lucide-react";
import { initialsFor } from "@/lib/avatars";

export type CoverEpisode = { guest: string; role?: string; guestPhoto?: string; guestArea?: string };

/** Capa padrão do Conexão Saúde, igual para todos os episódios: fundo verde-escuro da
 *  marca, iniciais do convidado num círculo com anel verde-limão e o selo do microfone.
 *  Gerada pelo próprio site, inclusive para os episódios que chegam sozinhos do YouTube.
 *  `size="feature"` mostra também o nome do programa; `size="row"` é a miniatura da lista. */
export function PodcastCover({ episode, size = "row" }: { episode: CoverEpisode; size?: "row" | "feature" }) {
  return <span className={`pc pc-${size}`} aria-hidden="true">
    <span className="pc-glow" />
    {size === "feature" ? <span className="pc-brand">Conexão<br />Saúde</span> : null}
    <span className="pc-photo"><span className="pc-initials">{initialsFor(episode.guest)}</span></span>
    <span className="pc-badge"><Mic2 size={size === "feature" ? 16 : 11} /></span>
  </span>;
}
