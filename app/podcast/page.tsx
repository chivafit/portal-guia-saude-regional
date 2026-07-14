import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { podcasts } from "@/lib/data";
import { publishedContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Podcast Conexão Saúde",
  "Episódios e entrevistas do Conexão Saúde com profissionais da região sobre prevenção, inovação e qualidade de vida.",
  "/podcast",
);

export default async function PodcastPage(){const saved=await publishedContent("podcast");const episodes=[...saved.map(item=>({slug:item.slug,guest:"Convidado informado no episódio",role:item.summary||"Conexão Saúde",topic:item.title,date:item.publishedAt?new Date(item.publishedAt).toLocaleDateString("pt-BR"):"Publicado",duration:"Episódio",status:"Disponível"})),...podcasts];return <><SiteHeader/><main><section className="content-hero"><div className="shell"><p className="eyebrow">Podcast Conexão Saúde</p><h1>Conversas que informam e aproximam.</h1><p>Entrevistas com profissionais da região sobre prevenção, tratamentos, inovação e qualidade de vida.</p></div></section><section className="shell content-section"><article className="podcast-feature"><div className="podcast-mark"><span>CONEXÃO</span><strong>SAÚDE</strong><i>● AO VIVO</i></div><div><p className="eyebrow">Próximo episódio</p><h2>{podcasts[0].topic}</h2><p><strong>{podcasts[0].guest}</strong> · {podcasts[0].role}</p><small>{podcasts[0].date} · {podcasts[0].duration}</small><button>▶ Acompanhar episódio</button></div></article><div className="content-title"><div><p className="eyebrow">Biblioteca</p><h2>Últimos episódios</h2></div><span>Novos episódios e cortes toda semana</span></div><div className="episode-list">{episodes.map((episode,index)=><article key={`${episode.slug}-${index}`}><div className="episode-number">{String(index+1).padStart(2,"0")}</div><div><small>{episode.status} · {episode.date}</small><h2>{episode.topic}</h2><p>{episode.guest} · {episode.role}</p></div><button aria-label={`Reproduzir ${episode.topic}`}>▶</button></article>)}</div><div className="platform-row"><span>Assista e acompanhe</span><b>YouTube</b><b>Spotify</b><b>Instagram</b><b>Rede Megga</b></div></section></main><SiteFooter/></>}
