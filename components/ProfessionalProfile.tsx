"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, BadgeCheck, Building2, ClipboardCheck, MapPin, MessageCircle, Navigation, Phone, Play } from "lucide-react";
import { ProfessionalImage } from "@/components/ProfessionalImage";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ProfileShareButton } from "@/components/ProfileShareButton";
import type { ProfileView } from "@/lib/profile-view";

// Usa o "www" direto: o domínio sem www responde com redirecionamento 308 sem CORS, o que bloquearia a leitura no app.
const LIVE_DATA_URL = "https://www.guiasaude.app.br/app-data/profiles.json";
const LIVE_CACHE_KEY = "guia-saude:live-profiles";
const LIVE_MAX_AGE_MS = 60 * 60 * 1000;

type LiveData = { generatedAt: string; profiles: Record<string, ProfileView>; redirects?: Record<string, string> };
/** Perfil que saiu do diretório público depois do build do app (retirado ou com novo endereço). */
type Withdrawn = { withdrawn: true; redirectTo?: string };

function readCache(): (LiveData & { fetchedAt: number }) | null {
  try {
    const raw = window.localStorage.getItem(LIVE_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Dentro do app, usa a versão mais recente do perfil publicada no site (contatos, foto, textos). */
function useLiveProfile(initial: ProfileView, builtAt: string) {
  const [profile, setProfile] = useState<ProfileView | Withdrawn>(initial);
  useEffect(() => {
    let active = true;
    const apply = (data: LiveData | null) => {
      if (!active || !data?.profiles || !(data.generatedAt > builtAt)) return;
      const live = data.profiles[initial.slug];
      // Ausente num arquivo mais novo que o pacote: o perfil foi retirado ou mudou de endereço.
      if (!live) { setProfile({ withdrawn: true, redirectTo: data.redirects?.[initial.slug] }); return; }
      // Fotos novas não existem no pacote do app: carrega do site.
      const imageUrl = live.imageUrl && live.imageUrl !== initial.imageUrl && live.imageUrl.startsWith("/") ? `https://www.guiasaude.app.br${live.imageUrl}` : live.imageUrl;
      setProfile({ ...live, imageUrl });
    };
    void import("@capacitor/core").then(async ({ Capacitor }) => {
      if (!Capacitor.isNativePlatform()) return;
      const cached = readCache();
      apply(cached);
      if (cached && Date.now() - cached.fetchedAt < LIVE_MAX_AGE_MS) return;
      try {
        const response = await fetch(LIVE_DATA_URL, { cache: "no-store", signal: AbortSignal.timeout(8000) });
        if (!response.ok) return;
        const data = (await response.json()) as LiveData;
        try {
          window.localStorage.setItem(LIVE_CACHE_KEY, JSON.stringify({ ...data, fetchedAt: Date.now() }));
        } catch {
          // Sem espaço no armazenamento: segue só com os dados em memória.
        }
        apply(data);
      } catch {
        // Sem internet: mantém os dados do pacote ou do cache.
      }
    });
    return () => { active = false; };
  }, [initial, builtAt]);
  return profile;
}

export function ProfessionalProfile({ initial, builtAt }: { initial: ProfileView; builtAt: string }) {
  const live = useLiveProfile(initial, builtAt);
  if ("withdrawn" in live) return <main className="profile-page-clean"><section className="profile-clean-wrap">
   <Link href={`/buscar?cidade=${encodeURIComponent(initial.city)}`} className="profile-clean-back"><ArrowLeft size={18}/><span>Voltar para a busca</span></Link>
   <article className="pcx-card"><div className="pcx-identity"><h1>Perfil indisponível</h1><p className="pcx-summary">Este perfil não está mais publicado no Guia Saúde e os contatos foram removidos.</p><div className="pcx-cta"><Link className="pcx-cta-primary" href={live.redirectTo||`/buscar?cidade=${encodeURIComponent(initial.city)}`}>{live.redirectTo?.startsWith("/profissionais/")?"Ver perfil atualizado":"Buscar outros profissionais"}</Link></div></div></article>
  </section></main>;
  const p = live;
  const favorite = { slug: p.slug, name: p.name, profession: p.profession, specialty: p.specialty, city: p.city, organization: p.organization, imageUrl: p.imageUrl };
  const primaryLocation = p.locations[0];
  const hasAbout = !!(p.education || p.audience.length || p.insuranceInfo);
  return <><main className="profile-page-clean"><section className="profile-clean-wrap">
  <Link href={`/buscar?cidade=${encodeURIComponent(p.city)}`} className="profile-clean-back"><ArrowLeft size={18}/><span>Voltar para a busca</span></Link>
  <div className="profile-desk-grid"><div className="profile-desk-main">
  <article className="pcx-card">
   <div className="pcx-cover" aria-hidden="true"/>
   <div className={`pcx-avatar${p.hasRealPhoto?"":" pcx-avatar-initials"}`} aria-hidden="true">{p.hasRealPhoto&&p.imageUrl?<ProfessionalImage src={p.imageUrl} sizes="160px" eager fetchPriority="high"/>:<span>{p.initials}</span>}</div>
   <div className="pcx-identity">
    <p className="pcx-profession">{p.professionLabel}</p>
    <h1>{p.name}{p.verified&&p.registration?<BadgeCheck className="pcx-verified" size={22} aria-label="Registro profissional conferido"/>:null}</h1>
    <div className="pcx-actions">
     {p.primaryWhats?<a className="pcx-action pcx-action-wa" href={p.primaryWhats} target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp"><MessageCircle size={18}/></a>:null}
     {p.primaryPhone?<a className="pcx-action" href={`tel:+${p.primaryPhone}`} aria-label="Ligar"><Phone size={18}/></a>:null}
     {p.primaryMapHref?<a className="pcx-action" href={p.primaryMapHref} target="_blank" rel="noopener noreferrer" aria-label="Como chegar"><Navigation size={18}/></a>:null}
     <FavoriteButton compact professional={favorite}/>
     <ProfileShareButton name={p.name} url={p.canonicalUrl}/>
    </div>
    <p className="pcx-specialty">{p.specialty}</p>
    {p.registration?<p className="pcx-registration"><ClipboardCheck size={14}/>{p.registration}</p>:null}
    <div className="pcx-chips"><span><MapPin size={14}/>{p.city}/MG</span>{primaryLocation?.name?<span><Building2 size={14}/>{primaryLocation.name}</span>:null}</div>
    {p.summary?<p className="pcx-summary">{p.summary}</p>:null}
    {p.primaryWhats||p.primaryPhone?<div className="pcx-cta">{p.primaryWhats?<a className="pcx-cta-primary" href={p.primaryWhats} target="_blank" rel="noreferrer"><MessageCircle size={18}/>Agendar pelo WhatsApp</a>:<a className="pcx-cta-primary" href={`tel:+${p.primaryPhone}`}><Phone size={18}/>Ligar para agendar</a>}</div>:null}
   </div>
  </article>
  <nav className="pcx-tabs" aria-label="Seções do perfil">{p.services.length?<a href="#atuacao">Atuação</a>:null}{hasAbout?<a href="#sobre">Sobre</a>:null}{p.locations.length?<a href="#onde-atende">Onde atende</a>:null}{p.podcast?<a href="#podcast">Podcast</a>:null}</nav>
  <section className="profile-clean-details">
   {p.services.length?<article id="atuacao"><h2>Especialidades e áreas de atuação</h2><div className="profile-clean-services">{p.services.map((service)=><span key={service}>{service}</span>)}</div></article>:null}
   {p.education?<article id="sobre" className="profile-clean-note"><h2>Formação e experiência</h2><p>{p.education}</p></article>:null}
   {p.audience.length?<article id={p.education?undefined:"sobre"}><h2>Público atendido</h2><div className="profile-clean-services">{p.audience.map((audience)=><span key={audience}>{audience}</span>)}</div></article>:null}
   {p.insuranceInfo?<article id={p.education||p.audience.length?undefined:"sobre"} className="profile-clean-note"><h2>Convênios e formas de atendimento</h2><p>{p.insuranceInfo}</p></article>:null}
   {p.locations.length?<article id="onde-atende"><h2>{p.locations.length>1?"Locais de atendimento":"Local de atendimento"}</h2>{p.locations.map((location)=><div className="profile-clean-location" key={`${location.name}-${location.address}`}><Building2 size={20}/><div><strong>{location.organizationSlug?<Link href={`/empresas/${location.organizationSlug}`}>{location.name}</Link>:location.name}</strong>{location.address?<span>{location.address}</span>:null}<span>{p.city}, Minas Gerais</span>{location.mapHref?<a href={location.mapHref} target="_blank" rel="noopener noreferrer">Ver localização</a>:null}{location.phone?<a className="profile-location-contact" href={`tel:+${location.phone}`}>Ligar para {location.name}</a>:null}{location.whatsappHref?<a className="profile-location-contact" href={location.whatsappHref} target="_blank" rel="noreferrer">WhatsApp de {location.name}</a>:null}</div></div>)}</article>:null}
   {p.podcast?<article id="podcast" className="profile-podcast"><div className="profile-podcast-icon"><Play size={20} fill="currentColor"/></div><div><span>Participação no Conexão Saúde</span><h2>{p.podcast.topic}</h2><p>{p.podcast.guest} · {p.podcast.role}</p></div><a href={p.podcast.episodeUrl||"/podcast"} target={p.podcast.episodeUrl?"_blank":undefined} rel={p.podcast.episodeUrl?"noreferrer":undefined}>Assistir ao podcast</a></article>:null}
  </section>
  <p className="profile-clean-source">Informações reunidas a partir de fontes públicas e canais profissionais. <Link href="/sobre#como-verificamos">Como verificamos as informações</Link></p>{p.confirmedAt?<p className="profile-clean-confirmed">Informações confirmadas em {p.confirmedAt}.</p>:null}
  </div><div className="profile-desk-rail"><div className="profile-desk-contact"><h2>Fale com o consultório</h2><div className="pdc-primary">{p.primaryWhats?<a className="pdc-wa" href={p.primaryWhats} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp</a>:null}{p.primaryPhone?<a className="pdc-call" href={`tel:+${p.primaryPhone}`}><Phone size={17}/> {p.primaryPhoneLabel}</a>:null}{p.primaryMapHref?<a className="pdc-route" href={p.primaryMapHref} target="_blank" rel="noopener noreferrer"><Navigation size={17}/> Como chegar</a>:null}</div><div className="pdc-secondary"><FavoriteButton professional={favorite}/><ProfileShareButton name={p.name} url={p.canonicalUrl}/></div></div>
  <section className="profile-clean-update"><div><h2>Atualize este perfil</h2><p>É este profissional ou representa o perfil? Solicite a atualização das informações.</p></div><div><Link href={`/inclusao?tipo=professional&perfil=${encodeURIComponent(p.slug)}&acao=atualizacao`}>Solicitar atualização</Link></div></section></div></div>
 </section></main>{(p.primaryWhats||p.primaryPhone||p.primaryMapHref)?<div className={`profile-fixed-bar${(((p.primaryWhats||p.primaryPhone)?1:0)+(p.primaryMapHref?1:0))===1?" is-single":""}`}>{p.primaryWhats?<a className="pfb-primary" href={p.primaryWhats} target="_blank" rel="noreferrer"><MessageCircle size={19}/> WhatsApp</a>:p.primaryPhone?<a className="pfb-primary" href={`tel:+${p.primaryPhone}`}><Phone size={19}/> Ligar</a>:null}{p.primaryMapHref?<a className="pfb-route" href={p.primaryMapHref} target="_blank" rel="noopener noreferrer"><Navigation size={19}/> Como chegar</a>:null}</div>:null}</>;
}
