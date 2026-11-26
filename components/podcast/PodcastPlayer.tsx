"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown, Pause, Play, RotateCcw, RotateCw, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PodcastCover } from "@/components/podcast/PodcastCover";

// Player do podcast no app inteiro (montado no layout): ao minimizar, vira uma faixa
// acima da barra de navegação e o episódio continua tocando enquanto a pessoa navega.

export type PlayerEpisode={slug:string;guest:string;role:string;topic:string;publishedAt:string;duration:string;status:string;imageUrl?:string;episodeUrl?:string;audioUrl?:string;professionalSlugs?:string[];guestPhoto?:string;guestArea?:string};
export function people(episode:PlayerEpisode){return episode.role?`${episode.guest} · ${episode.role}`:episode.guest}
function formatTime(value:number){if(!Number.isFinite(value))return"0:00";const m=Math.floor(value/60);const s=Math.floor(value%60);return`${m}:${String(s).padStart(2,"0")}`}
export function youtubeId(value?:string){if(!value)return"";try{const url=new URL(value);if(url.hostname==="youtu.be")return url.pathname.slice(1);if(url.hostname.includes("youtube.com"))return url.searchParams.get("v")??url.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1]??""}catch{}return""}

type PlayerApi={play:(episode:PlayerEpisode)=>void;current:PlayerEpisode|null};
const PlayerContext=createContext<PlayerApi>({play:()=>{},current:null});
export function usePodcastPlayer(){return useContext(PlayerContext)}

export function PodcastPlayerProvider({children}:{children:ReactNode}){
 const[episode,setEpisode]=useState<PlayerEpisode|null>(null);const[expanded,setExpanded]=useState(true);
 const play=useCallback((next:PlayerEpisode)=>{setEpisode(next);setExpanded(true)},[]);
 const minimize=useCallback(()=>setExpanded(false),[]);const expand=useCallback(()=>setExpanded(true),[]);const close=useCallback(()=>setEpisode(null),[]);
 useEffect(()=>{document.body.classList.toggle("has-mini-player",Boolean(episode)&&!expanded);return()=>document.body.classList.remove("has-mini-player")},[episode,expanded]);
 const api=useMemo(()=>({play,current:episode}),[play,episode]);
 return <PlayerContext.Provider value={api}>{children}{episode?<NativePlayer key={episode.slug} episode={episode} expanded={expanded} onMinimize={minimize} onExpand={expand} onClose={close}/>:null}</PlayerContext.Provider>;
}

function NativePlayer({episode,expanded,onMinimize,onExpand,onClose}:{episode:PlayerEpisode;expanded:boolean;onMinimize:()=>void;onExpand:()=>void;onClose:()=>void}){
 const audioRef=useRef<HTMLAudioElement>(null);const[playing,setPlaying]=useState(false);const[current,setCurrent]=useState(0);const[duration,setDuration]=useState(0);const[failed,setFailed]=useState(false);
 const videoId=youtubeId(episode.episodeUrl);
 useEffect(()=>{if(!expanded)return;document.body.classList.add("podcast-player-open");const close=(event:KeyboardEvent)=>{if(event.key==="Escape")onMinimize()};window.addEventListener("keydown",close);return()=>{document.body.classList.remove("podcast-player-open");window.removeEventListener("keydown",close)}},[expanded,onMinimize]);
 const seek=(delta:number)=>{const audio=audioRef.current;if(audio){audio.currentTime=Math.max(0,Math.min(audio.duration||0,audio.currentTime+delta))}};
 const toggle=()=>{const audio=audioRef.current;if(!audio||failed)return;if(audio.paused)void audio.play().catch(()=>setFailed(true));else audio.pause()};
 return <>{!expanded?<div className="pp-mini" role="region" aria-label="Podcast tocando"><button type="button" className="pp-mini-open" onClick={onExpand} aria-label={`Abrir player: ${episode.topic}`}><span className="pp-mini-cover"><PodcastCover episode={episode}/></span><span className="pp-mini-text"><small>Conexão Saúde · tocando</small><strong>{episode.topic}</strong></span></button>{episode.audioUrl&&!failed?<button type="button" className="pp-mini-btn" onClick={toggle} aria-label={playing?"Pausar":"Reproduzir"}>{playing?<Pause size={20} fill="currentColor"/>:<Play size={20} fill="currentColor"/>}</button>:null}<button type="button" className="pp-mini-btn is-close" onClick={onClose} aria-label="Parar e fechar o player"><X size={18}/></button></div>:null}<div className={`hos-player-backdrop${expanded?"":" is-mini"}`} onMouseDown={(e)=>expanded&&e.target===e.currentTarget&&onMinimize()}><section className={`hos-player${episode.audioUrl?" hos-player-audio-only":" hos-player-video-player"}`} role="dialog" aria-modal={expanded} aria-hidden={!expanded} aria-label={`Player: ${episode.topic}`}>
  <header><div><small>Conexão Saúde</small><strong>Reproduzindo agora</strong></div><div className="pp-head-actions"><button type="button" onClick={onMinimize} aria-label="Minimizar e continuar ouvindo"><ChevronDown size={20}/></button><button type="button" onClick={onClose} aria-label="Parar e fechar"><X size={18}/></button></div></header>
  {episode.audioUrl?<><div className="hos-player-copy"><h2>{episode.topic}</h2><p>{people(episode)}</p></div><audio ref={audioRef} src={episode.audioUrl} preload="metadata" autoPlay onLoadedMetadata={(e)=>setDuration(e.currentTarget.duration)} onTimeUpdate={(e)=>setCurrent(e.currentTarget.currentTime)} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={()=>setPlaying(false)} onError={()=>setFailed(true)}/>{failed?<p className="hos-player-error" role="status">Não foi possível carregar este áudio agora.</p>:<><div className="hos-player-progress"><input aria-label="Progresso do episódio" type="range" min="0" max={duration||0} step="1" value={Math.min(current,duration||0)} onChange={(e)=>{if(audioRef.current)audioRef.current.currentTime=Number(e.target.value)}}/><div><span>{formatTime(current)}</span><span>{formatTime(duration)}</span></div></div><div className="hos-player-controls"><button type="button" onClick={()=>seek(-15)} aria-label="Voltar 15 segundos"><RotateCcw size={19}/><small>15</small></button><button type="button" className="primary" onClick={toggle} aria-label={playing?"Pausar":"Reproduzir"}>{playing?<Pause size={25} fill="currentColor"/>:<Play size={25} fill="currentColor"/>}</button><button type="button" onClick={()=>seek(15)} aria-label="Avançar 15 segundos"><RotateCw size={19}/><small>15</small></button></div></>}</>:videoId?<><div className="hos-player-video"><iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`} title={episode.topic} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div><div className="hos-player-copy"><h2>{episode.topic}</h2><p>{people(episode)}</p></div><a className="hos-player-youtube" href={episode.episodeUrl} target="_blank" rel="noreferrer">Abrir também no YouTube <ArrowUpRight size={14}/></a></>:<p className="hos-player-error" role="status">Não foi possível carregar este episódio agora.</p>}
  {episode.professionalSlugs?.[0]?<Link className="hos-player-profile" href={`/profissionais/${episode.professionalSlugs[0]}`} onClick={onMinimize}>Ver perfil do convidado <ArrowUpRight size={14}/></Link>:null}
 </section></div></>
}
