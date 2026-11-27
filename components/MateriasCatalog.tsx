"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Play } from "lucide-react";
import { PodcastCover } from "@/components/podcast/PodcastCover";
import { HealthOSSectionHeader } from "@/components/HealthOSSectionHeader";
import { ContentTabs } from "@/components/content/ContentTabs";

type EditorialArticle={slug:string;category:string;title:string;excerpt:string;author?:string;authorRole?:string;date?:string;readingTime?:string;professionalSlug?:string;image?:string};
type LatestEpisode={slug:string;topic:string;guest:string;role?:string;guestPhoto?:string;guestArea?:string};

const topics=["Mais recentes","Prevenção","Saúde da mulher","Saúde infantil","Saúde bucal","Alimentação","Saúde mental","Pele","Cardiologia","Ortopedia","Oftalmologia","Bem-estar"];
function topicsFor(a:EditorialArticle){const c=`${a.category} ${a.title} ${a.excerpt}`.toLocaleLowerCase("pt-BR");const m:[string,RegExp][]=[["Prevenção",/preven|medicamento/],["Saúde da mulher",/mulher|gineco|gesta/],["Saúde infantil",/infância|infantil|pediatr/],["Saúde bucal",/bucal|odonto|implant/],["Alimentação",/alimenta|nutri/],["Saúde mental",/mental|vínculo|psican/],["Pele",/pele|dermat/],["Cardiologia",/cardio/],["Ortopedia",/ortoped|lesão/],["Oftalmologia",/oftalmo|olho|cirurgia refrativa/],["Bem-estar",/reabilita|vida saudável|respirat|qualidade de vida/]];return m.filter(([,r])=>r.test(c)).map(([t])=>t)}
function byline(a:EditorialArticle){if(!a.author||a.author==="Redação Guia Saúde")return a.readingTime?`Guia Saúde · ${a.readingTime}`:"Guia Saúde";return `${a.author}${a.readingTime?` · ${a.readingTime}`:""}`}

/** Conteúdos no layout do design de referência: abas, matéria em destaque,
 *  último episódio do podcast e lista das mais recentes. */
export function MateriasCatalog({articles,latestEpisode}:{articles:EditorialArticle[];latestEpisode?:LatestEpisode}){
 const[topic,setTopic]=useState("Mais recentes");const[count,setCount]=useState(8);
 const catalog=useMemo(()=>articles.filter(a=>topic==="Mais recentes"||topicsFor(a).includes(topic)),[articles,topic]);
 const usedTopics=topics.filter(t=>t==="Mais recentes"||articles.some(a=>topicsFor(a).includes(t)));
 const feature=catalog[0],recent=catalog.slice(1,count+1);
 return <main className="content-native-page cn-page"><div className="cn-shell">
  <ContentTabs active="materias"/>
  <HealthOSSectionHeader eyebrow="Guia Saúde" title="Matérias" description="Informação e orientação de saúde com profissionais da nossa região." />
  {feature?<Link href={`/materias/${feature.slug}`} className="cn-feature">
   <span className={`cn-feature-art${feature.image?"":" is-empty"}`} style={feature.image?{backgroundImage:`url(${feature.image})`}:undefined}>{feature.image?null:<BookOpen size={40} aria-hidden="true"/>}<span className="cn-pill">{feature.category}</span></span>
   <span className="cn-feature-body"><strong className="cn-feature-title">{feature.title}</strong><span className="cn-meta">{byline(feature)}</span></span>
  </Link>:<div className="ms-empty"><strong>Nenhum conteúdo neste tema</strong><p>Escolha outro tema.</p></div>}
  {latestEpisode?<Link href={`/podcast?episodio=${encodeURIComponent(latestEpisode.slug)}`} className="cn-listen">
   <span className="cn-listen-icon" aria-hidden="true"><PodcastCover episode={latestEpisode}/></span>
   <span className="cn-listen-copy"><small>Episódio novo · Conexão Saúde</small><strong>{latestEpisode.topic}</strong></span>
   <span className="cn-listen-play" aria-hidden="true"><Play size={20} fill="currentColor"/></span>
  </Link>:null}
  <div className="cn-topics" role="tablist" aria-label="Temas">{usedTopics.map(t=><button type="button" role="tab" aria-selected={topic===t} key={t} className={topic===t?"active":""} onClick={()=>{setTopic(t);setCount(8)}}>{t}</button>)}</div>
  {recent.length?<><div className="cn-section-head"><h2>{topic==="Mais recentes"?"Mais recentes":topic}</h2></div>
  <div className="cn-list">{recent.map(a=><Link href={`/materias/${a.slug}`} className="cn-card" key={a.slug}>
   <span className={`cn-card-art${a.image?"":" is-empty"}`} style={a.image?{backgroundImage:`url(${a.image})`}:undefined}>{a.image?null:<BookOpen size={26} aria-hidden="true"/>}</span>
   <span className="cn-card-body"><small>{a.category}</small><strong>{a.title}</strong><em>{a.readingTime??"Ler matéria"}</em></span>
   <ArrowRight size={18} aria-hidden="true"/>
  </Link>)}</div></>:null}
  {catalog.length>count+1?<button type="button" className="ms-more" onClick={()=>setCount(c=>c+6)}>Ver mais matérias</button>:null}
 </div></main>
}
