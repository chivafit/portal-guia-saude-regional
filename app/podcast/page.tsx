import Link from "next/link";
import { ArrowUpRight, AtSign, Headphones, Play, UserRound, Video } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { podcasts } from "@/lib/data";
import { publishedContent, type ContentRecord } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Podcast Conexão Saúde",
  "Episódios e entrevistas do Conexão Saúde com profissionais da região sobre prevenção, inovação e qualidade de vida.",
  "/podcast",
);

type Episode = {
  slug: string;
  guest: string;
  role: string;
  topic: string;
  date: string;
  duration: string;
  status: string;
  imageUrl?: string;
  episodeUrl?: string;
  professionalSlugs?: string[];
};

export default async function PodcastPage() {
  const saved = await publishedContent("podcast");
  const episodes: Episode[] = [
    ...saved.map((item: ContentRecord) => ({
      slug: item.slug,
      guest: "Convidado informado no episódio",
      role: item.summary || "Conexão Saúde",
      topic: item.title,
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("pt-BR") : "Publicado",
      duration: "Episódio",
      status: "Disponível",
    })),
    ...podcasts,
  ];
  const feature = episodes.find((episode) => episode.status === "Disponível") ?? episodes[0];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="content-hero portal-section-hero">
          <div className="shell portal-section-hero-grid">
            <div>
              <p className="eyebrow">Podcast Conexão Saúde</p>
              <h1>Conversas que informam e aproximam.</h1>
              <p>Entrevistas com profissionais da região sobre prevenção, tratamentos, inovação e qualidade de vida.</p>
            </div>
            <aside className="portal-section-summary">
              <strong>Você encontra:</strong>
              <span><Video size={17} /> Episódios completos em vídeo</span>
              <span><UserRound size={17} /> Especialistas da região</span>
              <span><Headphones size={17} /> Conversas em linguagem clara</span>
              <small>Novos episódios e cortes são publicados ao longo do ano.</small>
            </aside>
          </div>
        </section>
        <section className="shell content-section">
          <article className="podcast-feature">
            {feature.imageUrl ? (
              feature.episodeUrl ? <a className="podcast-feature-cover podcast-feature-play" href={feature.episodeUrl} target="_blank" rel="noreferrer" style={{ backgroundImage: `url(${feature.imageUrl})` }} aria-label={`Assistir episódio com ${feature.guest}`}><span><Play size={28} fill="currentColor" /></span></a> : <div className="podcast-feature-cover" style={{ backgroundImage: `url(${feature.imageUrl})` }} role="img" aria-label={`Episódio com ${feature.guest}`} />
            ) : (
              <div className="podcast-mark"><span>CONEXÃO</span><strong>SAÚDE</strong><i>AO VIVO</i></div>
            )}
            <div>
              <p className="eyebrow">Último episódio</p>
              <h2>{feature.topic}</h2>
              <p><strong>{feature.guest}</strong> · {feature.role}</p>
              <small>{feature.date} · {feature.duration}</small>
              {feature.episodeUrl ? (
                <a className="podcast-watch-btn" href={feature.episodeUrl} target="_blank" rel="noreferrer"><Play size={16} fill="currentColor" /> Assistir episódio</a>
              ) : (
                <span className="podcast-upcoming-label">{feature.status}</span>
              )}
            </div>
          </article>
          <div className="content-title">
            <div>
              <p className="eyebrow">Biblioteca</p>
              <h2>Últimos episódios</h2>
            </div>
            <span>Novos episódios e cortes toda semana</span>
          </div>
          <div className="episode-list">
            {episodes.map((episode, index) => (
              <article key={`${episode.slug}-${index}`} className="episode-card">
                {episode.episodeUrl ? (
                  <a className="episode-cover-wrap" href={episode.episodeUrl} target="_blank" rel="noreferrer" aria-label={`Assistir ${episode.topic}`}>
                    {episode.imageUrl ? (
                      <span className="episode-cover" style={{ backgroundImage: `url(${episode.imageUrl})` }} role="img" aria-label={`Episódio com ${episode.guest}`} />
                    ) : (
                      <span className="episode-number">{String(index + 1).padStart(2, "0")}</span>
                    )}
                    <span className="episode-play-over"><Play size={17} fill="currentColor" /></span>
                  </a>
                ) : (
                  <div className="episode-cover-wrap">
                    {episode.imageUrl ? (
                      <span className="episode-cover" style={{ backgroundImage: `url(${episode.imageUrl})` }} role="img" aria-label={`Episódio com ${episode.guest}`} />
                    ) : (
                      <span className="episode-number">{String(index + 1).padStart(2, "0")}</span>
                    )}
                  </div>
                )}
                <div className="episode-body">
                  <small>{episode.status} · {episode.date}</small>
                  <h2>{episode.topic}</h2>
                  <p>{episode.guest} · {episode.role}</p>
                  {episode.professionalSlugs?.[0] ? (
                    <Link className="episode-guest-link" href={`/profissionais/${episode.professionalSlugs[0]}`}>
                      Ver perfil do convidado <ArrowUpRight size={13} />
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
          <div className="platform-row">
            <span>Assista e acompanhe</span>
            <a href="https://www.youtube.com/@redemeggabrasil" target="_blank" rel="noreferrer"><Video size={16} /> YouTube</a>
            <a href="https://open.spotify.com/search/Conex%C3%A3o%20Sa%C3%BAde%20Rede%20Megga" target="_blank" rel="noreferrer"><Headphones size={16} /> Spotify</a>
            <a href="https://www.instagram.com/saudeguia" target="_blank" rel="noreferrer"><AtSign size={16} /> Instagram</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
