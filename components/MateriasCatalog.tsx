"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Headphones, Search } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { HealthOSSectionHeader } from "@/components/HealthOSSectionHeader";

type EditorialArticle = { slug:string; category:string; title:string; excerpt:string; author?:string; authorRole?:string; date?:string; readingTime?:string; professionalSlug?:string; image?:string };
const topics=["Mais recentes","Prevenção","Saúde da mulher","Saúde infantil","Saúde bucal","Alimentação","Saúde mental","Pele","Cardiologia","Ortopedia","Oftalmologia","Bem-estar"];
function topicsFor(a:EditorialArticle){const c=`${a.category} ${a.title} ${a.excerpt}`.toLocaleLowerCase("pt-BR");const m:[string,RegExp][]=[["Prevenção",/preven|medicamento/],["Saúde da mulher",/mulher|gineco|gesta/],["Saúde infantil",/infância|infantil|pediatr/],["Saúde bucal",/bucal|odonto|implant/],["Alimentação",/alimenta|nutri/],["Saúde mental",/mental|vínculo|psican/],["Pele",/pele|dermat/],["Cardiologia",/cardio/],["Ortopedia",/ortoped|lesão/],["Oftalmologia",/oftalmo|olho|cirurgia refrativa/],["Bem-estar",/reabilita|vida saudável|respirat|qualidade de vida/]];return m.filter(([,r])=>r.test(c)).map(([t])=>t)}
function byline(a:EditorialArticle){if(!a.author||a.author==="Redação Guia Saúde")return a.readingTime?`Guia Saúde · ${a.readingTime}`:"Guia Saúde";return `${a.author}${a.authorRole?` · ${a.authorRole}`:""}${a.readingTime?` · ${a.readingTime}`:""}`}
function Img({article}:{article:EditorialArticle}){return article.image?<div className="content-native-image" style={{backgroundImage:`url(${article.image})`}} role="img" aria-label={article.title}/>:<div className="content-native-image fallback"><BookOpen size={28}/></div>}
function CompactFeature({article}:{article:EditorialArticle}){
 const card={display:"flex",width:"100%",height:172,minHeight:172,maxHeight:172,padding:14,gap:14,overflow:"hidden",boxSizing:"border-box",borderRadius:26,background:"rgba(255,255,255,.82)",border:"1px solid rgba(255,255,255,.95)",boxShadow:"0 18px 44px rgba(15,81,70,.09)",textDecoration:"none",color:"inherit"} as const;
 const art={display:"block",flex:"0 0 104px",width:104,minWidth:104,maxWidth:104,height:144,minHeight:144,maxHeight:144,borderRadius:18,backgroundImage:article.image?`url(${article.image})`:undefined,backgroundSize:"cover",backgroundPosition:"center",backgroundColor:"#e9f4ef"} as const;
 const copy={display:"flex",flex:"1 1 auto",minWidth:0,height:144,maxHeight:144,overflow:"hidden",flexDirection:"column",alignItems:"flex-start",padding:"2px 0",boxSizing:"border-box"} as const;
 const category={fontSize:9,lineHeight:1.1,letterSpacing:".11em",fontWeight:800,color:"#178b72",textTransform:"uppercase"} as const;
 const title={fontFamily:"inherit",fontSize:16,lineHeight:1.05,letterSpacing:"-.025em",fontWeight:800,margin:"6px 0 5px",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"} as const;
 const excerpt={fontSize:9.5,lineHeight:1.3,color:"#728981",margin:"0 0 5px",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"} as const;
 const meta={fontSize:8.5,lineHeight:1.2,color:"#8ba099",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",width:"100%"} as const;
 const action={marginTop:"auto",display:"flex",alignItems:"center",gap:5,fontSize:9.5,lineHeight:1,fontWeight:800,color:"#167d69"} as const;
 return <Link href={`/materias/${article.slug}`} style={card} data-content-feature="compact"><span style={art} role="img" aria-label={article.title}/><span style={copy}><span style={category}>{article.category}</span><strong style={title}>{article.title}</strong><span style={excerpt}>{article.excerpt}</span><span style={meta}>{byline(article)}</span><span style={action}>Ler matéria <ArrowRight size={12}/></span></span></Link>;
}
export function MateriasCatalog({articles,podcastImage,magazineCover,magazineSlug}:{articles:EditorialArticle[];podcastImage?:string;magazineCover?:string;magazineSlug?:string}){
 const [topic,setTopic]=useState("Mais recentes"),[query,setQuery]=useState(""),[submitted,setSubmitted]=useState(""),[count,setCount]=useState(8);
 const catalog=useMemo(()=>{const q=submitted.trim().toLocaleLowerCase("pt-BR");return articles.filter(a=>(topic==="Mais recentes"||topicsFor(a).includes(topic))&&(!q||`${a.title} ${a.excerpt} ${a.category} ${a.author??""}`.toLocaleLowerCase("pt-BR").includes(q)))},[articles,topic,submitted]);
 const feature=catalog[0], recent=catalog.slice(1,count+1); const search=(e:FormEvent)=>{e.preventDefault();setSubmitted(query);setCount(8)};
 return <main className="content-native-page"><section className="content-native-shell">
   <HealthOSSectionHeader eyebrow="GUIA SAÚDE" title="Conteúdos" description="Informação confiável para cuidar melhor." />
   <form className="content-native-search" onSubmit={search}><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Busque um tema ou especialidade" aria-label="Buscar conteúdos"/><button aria-label="Buscar"><ArrowRight size={18}/></button></form>
   <div className="content-native-topics">{topics.map(t=><button type="button" key={t} className={topic===t?"active":""} onClick={()=>{setTopic(t);setCount(8)}}>{t}</button>)}</div>
   {feature?<CompactFeature article={feature}/>:<div className="content-native-empty"><strong>Nenhum conteúdo encontrado</strong><p>Tente outro tema ou categoria.</p></div>}
   {feature&&<><div className="content-native-heading"><div><span>ATUALIZAÇÕES</span><h2>Mais recentes</h2></div></div><div className="content-native-grid">{recent.map(a=><Link href={`/materias/${a.slug}`} className="content-native-card" key={a.slug}><Img article={a}/><div><span>{a.category}</span><h3>{a.title}</h3><small>{byline(a)}</small></div><ArrowRight className="content-native-card-arrow" size={16}/></Link>)}</div>{catalog.length>count+1&&<button className="content-native-more" type="button" onClick={()=>setCount(c=>c+6)}>Ver mais conteúdos <ArrowRight size={15}/></button>}</>}
   <div className="content-native-channels"><div className="content-native-heading"><div><span>EXPLORE</span><h2>Mais do Guia Saúde</h2></div></div><div className="content-native-channel-grid"><Link href="/podcast" className="content-native-channel">{podcastImage?<span style={{backgroundImage:`url(${podcastImage})`}}/>:<Headphones/>}<div><small>PODCAST</small><strong>Conversas sobre saúde</strong><b>Ouvir episódios <ArrowRight size={13}/></b></div></Link><Link href={magazineSlug?`/revista/${magazineSlug}`:"/revista"} className="content-native-channel">{magazineCover?<span style={{backgroundImage:`url(${magazineCover})`}}/>:<BookOpen/>}<div><small>REVISTA</small><strong>Leia a edição do Guia</strong><b>Abrir revista <ArrowRight size={13}/></b></div></Link></div></div>
 </section></main>
}
