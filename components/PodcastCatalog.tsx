"use client";

import { ArrowRight, Headphones, Play, Search } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { HealthOSSectionHeader } from "@/components/HealthOSSectionHeader";
import { ContentTabs } from "@/components/content/ContentTabs";
import { PodcastCover } from "@/components/podcast/PodcastCover";
import { people, usePodcastPlayer, youtubeId, type PlayerEpisode } from "@/components/podcast/PodcastPlayer";

type Episode=PlayerEpisode;
function parsed(value:string){const[y,m,d]=value.split("-").map(Number);return y&&m&&d?new Date(y,m-1,d,12):undefined}
function date(value:string){const result=parsed(value);return result?new Intl.DateTimeFormat("pt-BR",{day:"numeric",month:"short",year:"numeric"}).format(result):value}

function playable(episode:Episode){return Boolean(episode.audioUrl||episode.episodeUrl)}
function status(episode:Episode){if(playable(episode))return `Disponível · ${date(episode.publishedAt)}`;const result=parsed(episode.publishedAt);return result&&result.getTime()>Date.now()?`Próximo · ${date(episode.publishedAt)}`:"Em breve"}
function tags(episode:Episode){const source=`${episode.topic} ${episode.guest} ${episode.role}`.toLowerCase();const categories:[string,RegExp][]=[["Saúde da mulher",/pélvica|gineco|mulher|harmonização/],["Saúde bucal",/odonto|dent|implant|ortodont/],["Saúde mental",/vínculo|mental|psicanal/],["Nutrição",/nutri|aliment/],["Fisioterapia",/fisioterap/],["Oftalmologia",/oftalmo|blefaro|olhos|refrativa/],["Dermatologia",/dermat|pele/],["Ortopedia",/ortoped|lesão|regenerativa/],["Endocrinologia",/endocrino|hormônio|metabolismo/]];return categories.filter(([,r])=>r.test(source)).map(([label])=>label)}
function Cover({episode,size="row"}:{episode:Episode;size?:"row"|"feature"}){return <PodcastCover episode={episode} size={size}/>}
function openEpisode(episode:Episode,setPlaying:(episode:Episode)=>void){if(episode.audioUrl||youtubeId(episode.episodeUrl)){setPlaying(episode);return}if(episode.episodeUrl){const opened=window.open(episode.episodeUrl,"_blank","noopener,noreferrer");if(!opened)window.location.assign(episode.episodeUrl)}}


// Dentro do app, a lista vem do site para mostrar episódios novos sem nova versão na loja.
const LIVE_PODCASTS_URL="https://www.guiasaude.app.br/app-data/podcasts.json";
function useLiveEpisodes(initial:Episode[]){const[episodes,setEpisodes]=useState(initial);useEffect(()=>{let active=true;void import("@capacitor/core").then(async({Capacitor})=>{if(!Capacitor.isNativePlatform())return;try{const response=await fetch(LIVE_PODCASTS_URL,{cache:"no-store",signal:AbortSignal.timeout(8000)});if(!response.ok)return;const data=await response.json() as {episodes?:Episode[]};if(active&&Array.isArray(data.episodes)&&data.episodes.length)setEpisodes(data.episodes.map((episode)=>({...episode,imageUrl:episode.imageUrl?.startsWith("/")?`https://www.guiasaude.app.br${episode.imageUrl}`:episode.imageUrl,guestPhoto:episode.guestPhoto?.startsWith("/")?`https://www.guiasaude.app.br${episode.guestPhoto}`:episode.guestPhoto})))}catch{/* Sem internet: mantém a lista do pacote. */}});return()=>{active=false}},[]);return episodes}

export function PodcastCatalog({episodes:initialEpisodes}:{episodes:Episode[]}){
 const episodes=useLiveEpisodes(initialEpisodes);
 const[q,setQ]=useState("");const[search,setSearch]=useState("");const[tag,setTag]=useState("Todos");const[visible,setVisible]=useState(8);const{play:setPlaying}=usePodcastPlayer();const feature=episodes.find(playable)??episodes[0];const categories=Array.from(new Set(episodes.flatMap(tags)));
 const filtered=useMemo(()=>episodes.filter((episode)=>episode.slug!==feature?.slug&&(tag==="Todos"||tags(episode).includes(tag))&&(!search||`${episode.topic} ${episode.guest} ${episode.role}`.toLowerCase().includes(search.toLowerCase()))),[episodes,feature?.slug,tag,search]);
 // Links como /podcast?episodio=<slug> (vindos das matérias) abrem o episódio direto.
 useEffect(()=>{const slug=new URLSearchParams(window.location.search).get("episodio");const episode=slug?episodes.find(item=>item.slug===slug):undefined;if(episode&&playable(episode))openEpisode(episode,setPlaying)},[episodes,setPlaying]);
 const submit=(e:FormEvent)=>{e.preventDefault();setSearch(q.trim());setVisible(8)};const playEpisode=(episode:Episode)=>{if(playable(episode))openEpisode(episode,setPlaying)};
 return <main className="hos-podcast-page"><section className="hos-podcast-shell">
  <ContentTabs active="podcast"/>
  <HealthOSSectionHeader eyebrow="Conexão Saúde" title="Podcast" description="Conversas com profissionais da nossa região para ouvir no seu tempo." />
  {feature?<article className={`hos-podcast-feature${playable(feature)?"":" is-unavailable"}`}><button type="button" className="hos-podcast-feature-art" onClick={()=>playEpisode(feature)} disabled={!playable(feature)} aria-label={`Reproduzir ${feature.topic}`}><Cover episode={feature} size="feature"/></button><div><small>Episódio em destaque</small><h3>{feature.topic}</h3><p>{people(feature)}</p><span>{status(feature)}{feature.duration&&feature.duration!=="Episódio completo"?` · ${feature.duration}`:""}</span>{playable(feature)?<><button type="button" className="hos-podcast-feature-cta" onClick={()=>playEpisode(feature)}><Play size={13} fill="currentColor"/> {feature.audioUrl?"Ouvir no Guia Saúde":"Reproduzir no Guia Saúde"}</button></>:<em>Disponível em breve</em>}</div></article>:null}
  <section className="hos-podcast-discover"><div className="hos-podcast-section-head"><div><small>Biblioteca</small><h2>Explore os episódios</h2></div></div><form onSubmit={submit} className="hos-podcast-search"><Search size={17}/><input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Tema ou convidado" aria-label="Buscar episódio"/><button type="submit" aria-label="Buscar"><ArrowRight size={16}/></button></form><div className="hos-podcast-chips">{["Todos",...categories].map((item)=><button type="button" key={item} className={tag===item?"active":""} onClick={()=>{setTag(item);setVisible(8)}}>{item}</button>)}</div></section>
  <section className="hos-podcast-list">{filtered.slice(0,visible).map((episode)=>{const available=playable(episode);return <article className={`hos-podcast-row${available?"":" is-unavailable"}`} key={episode.slug}><button type="button" className="hos-podcast-row-art" onClick={()=>playEpisode(episode)} disabled={!available} aria-label={available?`Reproduzir ${episode.topic}`:`${episode.topic} em breve`}><Cover episode={episode}/></button><div><small>{status(episode)}</small><h3>{episode.topic}</h3><p>{people(episode)}</p></div>{available?<button type="button" className="hos-podcast-row-play" onClick={()=>playEpisode(episode)} aria-label="Abrir player"><Play size={15} fill="currentColor"/></button>:<span className="hos-podcast-row-soon">Em breve</span>}</article>})}{filtered.length>visible?<button type="button" className="hos-podcast-more" onClick={()=>setVisible(v=>v+6)}>Ver mais episódios <ArrowRight size={14}/></button>:null}{!filtered.length?<div className="hos-podcast-empty"><Headphones size={24}/><strong>Nenhum episódio encontrado</strong><button type="button" onClick={()=>{setQ("");setSearch("");setTag("Todos")}}>Limpar busca</button></div>:null}</section>
 </section></main>
}
