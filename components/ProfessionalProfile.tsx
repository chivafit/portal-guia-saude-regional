"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, BadgeCheck, Building2, ClipboardCheck, MapPin, MessageCircle, Navigation, Phone, Play } from "lucide-react";
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

function neighborhoodFrom(address: string) {
  const tail = address.split(",").map((part) => part.trim()).filter(Boolean).at(-1) ?? "";
  return tail && tail.length <= 24 && !/\d/.test(tail) ? tail : "";
}

/** Perfil no layout do design de referência: topo em degradê, cartão de identidade,
 *  seções em cartões e barra fixa de contato no celular; duas colunas no computador. */
export function ProfessionalProfile({ initial, builtAt }: { initial: ProfileView; builtAt: string }) {
  const live = useLiveProfile(initial, builtAt);
  const backHref = `/buscar?cidade=${encodeURIComponent(initial.city)}`;
  if ("withdrawn" in live) return <main className="profile-page-clean pf-page">
    <div className="pf-hero" aria-hidden="true" />
    <div className="pf-wrap">
      <div className="pf-topbar"><Link className="pf-icon-btn" href={backHref} aria-label="Voltar para a busca"><ArrowLeft size={20} /></Link></div>
      <article className="pf-card pf-identity pf-withdrawn">
        <h1 className="pf-name">Perfil indisponível</h1>
        <p className="pf-summary">Este perfil não está mais publicado no Guia Saúde e os contatos foram removidos.</p>
        <Link className="pf-btn pf-btn-primary" href={live.redirectTo || backHref}>{live.redirectTo?.startsWith("/profissionais/") ? "Ver perfil atualizado" : "Buscar outros profissionais"}</Link>
      </article>
    </div>
  </main>;

  const p = live;
  const favorite = { slug: p.slug, name: p.name, profession: p.profession, specialty: p.specialty, city: p.city, organization: p.organization, imageUrl: p.imageUrl };
  const neighborhood = neighborhoodFrom(p.locations[0]?.address ?? "");
  const eyebrow = [p.professionLabel, p.specialty].filter(Boolean).filter((value, index, list) => list.indexOf(value) === index).join(" · ");
  const hasContact = Boolean(p.primaryWhats || p.primaryPhone || p.primaryMapHref);
  const primaryAction = p.primaryWhats
    ? <a className="pf-btn pf-btn-primary" href={p.primaryWhats} target="_blank" rel="noreferrer"><MessageCircle size={19} />WhatsApp</a>
    : p.primaryPhone ? <a className="pf-btn pf-btn-primary" href={`tel:+${p.primaryPhone}`}><Phone size={19} />Ligar</a> : null;
  const routeAction = p.primaryMapHref ? <a className="pf-btn pf-btn-dark" href={p.primaryMapHref} target="_blank" rel="noopener noreferrer"><Navigation size={19} />Como chegar</a> : null;

  return <main className={`profile-page-clean pf-page${hasContact ? " has-actionbar" : ""}`}>
    <div className="pf-hero" aria-hidden="true" />
    <div className="pf-wrap">
      <div className="pf-topbar">
        <Link className="pf-icon-btn" href={backHref} aria-label="Voltar para a busca"><ArrowLeft size={20} /></Link>
        <div className="pf-topbar-actions"><FavoriteButton compact professional={favorite} /><ProfileShareButton name={p.name} url={p.canonicalUrl} /></div>
      </div>

      <div className="pf-grid">
        <div className="pf-main">
          <div className="pf-avatar" aria-hidden="true">{p.imageUrl ? <ProfessionalImage src={p.imageUrl} sizes="160px" eager fetchPriority="high" /> : <span>{p.initials}</span>}</div>

          <article className="pf-card pf-identity">
            <p className="pf-eyebrow">{eyebrow}</p>
            <h1 className="pf-name">{p.name}</h1>
            <div className="pf-chips">
              {p.registration ? <span>{p.verified ? <BadgeCheck size={16} aria-hidden="true" /> : <ClipboardCheck size={16} aria-hidden="true" />}{p.registration}</span> : null}
              <span><MapPin size={16} aria-hidden="true" />{neighborhood ? `${neighborhood}, ${p.city}` : `${p.city}, MG`}</span>
            </div>
            {p.summary ? <p className="pf-summary">{p.summary}</p> : null}
          </article>

          {p.services.length ? <section className="pf-card" id="atuacao">
            <h2>Áreas de atuação</h2>
            <div className="pf-tags">{p.services.map((service) => <span key={service}>{service}</span>)}</div>
          </section> : null}

          {p.education || p.audience.length || p.insuranceInfo ? <section className="pf-card" id="sobre">
            <h2>Sobre o atendimento</h2>
            {p.education ? <div className="pf-about"><h3>Formação e experiência</h3><p>{p.education}</p></div> : null}
            {p.audience.length ? <div className="pf-about"><h3>Público atendido</h3><div className="pf-tags">{p.audience.map((item) => <span key={item}>{item}</span>)}</div></div> : null}
            {p.insuranceInfo ? <div className="pf-about"><h3>Convênios e formas de atendimento</h3><p>{p.insuranceInfo}</p></div> : null}
          </section> : null}

          {p.locations.length ? <section className="pf-card" id="onde-atende">
            <h2>{p.locations.length > 1 ? "Locais de atendimento" : "Local de atendimento"}</h2>
            {p.locations.map((location) => <div className="pf-location" key={`${location.name}-${location.address}`}>
              <span className="pf-location-icon" aria-hidden="true"><Building2 size={22} /></span>
              <div>
                <strong>{location.organizationSlug ? <Link href={`/empresas/${location.organizationSlug}`}>{location.name}</Link> : location.name}</strong>
                <span>{location.address ? `${location.address} · ` : ""}{p.city}, MG</span>
                <div className="pf-location-links">
                  {location.phone ? <a href={`tel:+${location.phone}`}><Phone size={15} />{location.phoneLabel || "Ligar"}</a> : null}
                  {location.whatsappHref ? <a href={location.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={15} />WhatsApp</a> : null}
                  {location.mapHref ? <a href={location.mapHref} target="_blank" rel="noopener noreferrer">Ver no mapa<ArrowUpRight size={15} /></a> : null}
                </div>
              </div>
            </div>)}
          </section> : null}

          {p.podcast ? <a className="pf-podcast" href={p.podcast.episodeUrl || "/podcast"} target={p.podcast.episodeUrl ? "_blank" : undefined} rel={p.podcast.episodeUrl ? "noreferrer" : undefined}>
            <span className="pf-podcast-play" aria-hidden="true"><Play size={22} fill="currentColor" /></span>
            <span><small>No Conexão Saúde</small><strong>{p.podcast.topic}</strong></span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a> : null}

          <p className="pf-source">Informações reunidas a partir de fontes públicas e canais profissionais. <Link href="/sobre#como-verificamos">Como verificamos</Link>{p.confirmedAt ? ` · Confirmadas em ${p.confirmedAt}.` : ""}</p>
          <section className="pf-update">
            <div><h2>Atualize este perfil</h2><p>É este profissional ou representa o perfil? Solicite a atualização das informações.</p></div>
            <Link href={`/inclusao?tipo=professional&perfil=${encodeURIComponent(p.slug)}&acao=atualizacao`}>Solicitar atualização</Link>
          </section>
        </div>

        <aside className="pf-rail" aria-label="Contato">
          <div className="pf-card pf-contact">
            <h2>{hasContact ? "Fale com o consultório" : "Contato"}</h2>
            {hasContact ? <div className="pf-contact-actions">{primaryAction}{p.primaryWhats && p.primaryPhone ? <a className="pf-btn pf-btn-outline" href={`tel:+${p.primaryPhone}`}><Phone size={18} />{p.primaryPhoneLabel}</a> : null}{routeAction}</div> : <p className="pf-empty">Este perfil ainda não tem telefone público confirmado. Salve o perfil ou procure o local de atendimento.</p>}
          </div>
        </aside>
      </div>
    </div>

    {hasContact ? <div className={`pf-actionbar${primaryAction && routeAction ? "" : " is-single"}`}>{primaryAction}{routeAction}</div> : null}
  </main>;
}
