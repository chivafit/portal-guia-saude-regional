import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarClock, Camera, ExternalLink, Globe, Landmark, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { OrganizationIcon } from "@/components/search/MobileSearch";
import { resolveProfessionalImage } from "@/lib/avatars";
import { notFound } from "next/navigation";
import { organizations } from "@/lib/data";
import { findPublishedOrganization, organizationsForProfessional, publicProfessionals, publishedOrganizations } from "@/lib/public-directory";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { ProfessionalImage } from "@/components/ProfessionalImage";
export const dynamic="force-static";
export async function generateStaticParams(){return(await publishedOrganizations(organizations)).map(organization=>({slug:organization.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const item=await findPublishedOrganization((await params).slug);return item?pageMetadata(item.name,`${item.category} em Piumhi. ${item.services.join(", ")}.`,`/empresas/${item.slug}`):pageMetadata("Serviço não encontrado","Este serviço não está disponível.","/empresas")}
function updateRequestHref(slug:string){return`/inclusao?tipo=organization&perfil=${encodeURIComponent(slug)}&acao=atualizacao`}
function addressParts(address:string){const segments=address.split(",").map(p=>p.trim()).filter(Boolean);if(segments.length<2)return{street:address,neighborhood:""};return{street:segments.slice(0,-1).join(", "),neighborhood:segments.at(-1)??""}}
function categoryLabels(category:string){const[network,area]=category.split("•").map(p=>p.trim());return{network,area:area||network}}
export default async function OrganizationPage({params}:{params:Promise<{slug:string}>}){const item=await findPublishedOrganization((await params).slug);if(!item)notFound();const linkedProfessionals=publicProfessionals.filter(p=>organizationsForProfessional(p).some(o=>o.slug===item.slug));const visibleProfessionals=linkedProfessionals.slice(0,6);const digits=item.phone.replace(/\D/g,"");const whatsappDigits=(item.whatsapp??"").replace(/\D/g,"");const phoneHref=digits.length>=10?`tel:+55${digits}`:"";const whatsappHref=whatsappLink(whatsappDigits,"place");const address=addressParts(item.address);const labels=categoryLabels(item.category);const isPublicHealthUnit=item.category.startsWith("Rede pública")||/^(Gestão pública|Serviço público)/.test(item.category);const publicUrl=`${siteUrl}/empresas/${item.slug}/`;const structuredData={"@context":"https://schema.org","@type":item.categoryKey==="farmacias"?"Pharmacy":"MedicalBusiness",name:item.name,description:item.publicSummary??item.summary,url:publicUrl,telephone:phoneHref?`+55${digits}`:undefined,address:{"@type":"PostalAddress",streetAddress:item.address,addressLocality:"Piumhi",addressRegion:"MG",addressCountry:"BR"},sameAs:[item.website,item.instagram,item.mapUrl].filter(Boolean)};
const cover=item.coverImageUrl&&!item.coverImageUrl.includes("/placeholders/")?item.coverImageUrl:"";
return <><main className={`organization-page pf-page org-page${phoneHref||whatsappHref||item.mapUrl?" has-actionbar":""}`}>
  <div className="pf-hero" aria-hidden="true"/>
  <div className="pf-wrap">
    <div className="pf-topbar"><Link className="pf-icon-btn" href="/empresas" aria-label="Voltar para clínicas e serviços"><ArrowLeft size={20}/></Link></div>
    <div className="pf-grid">
      <div className="pf-main">
        <div className={`pf-avatar org-avatar${cover?" has-image":""}`} aria-hidden="true" style={cover?{backgroundImage:`url(${cover})`}:undefined}>{!cover?<OrganizationIcon item={item} size={52}/>:null}</div>
        <article className="pf-card pf-identity">
          <p className="pf-eyebrow">{labels.area}{labels.area!==labels.network?` · ${labels.network}`:""}</p>
          <h1 className="pf-name">{item.name}</h1>
          <div className="pf-chips"><span><MapPin size={16} aria-hidden="true"/>{address.neighborhood?`${address.neighborhood}, Piumhi`:"Piumhi, MG"}</span>{isPublicHealthUnit?<span><Landmark size={16} aria-hidden="true"/>Rede pública</span>:null}</div>
          {item.publicSummary?<p className="pf-summary">{item.publicSummary}</p>:null}
        </article>
        {item.services.length?<section className="pf-card"><h2>Serviços disponíveis</h2><div className="pf-tags">{item.services.map(service=><span key={service}>{service}</span>)}</div></section>:null}
        <section className="pf-card"><h2>Endereço e contato</h2>
          <div className="pf-location"><span className="pf-location-icon" aria-hidden="true"><MapPin size={22}/></span><div><strong>{address.street}</strong><span>{address.neighborhood?`${address.neighborhood} · `:""}Piumhi, MG</span><div className="pf-location-links">{phoneHref?<a href={phoneHref}><Phone size={15}/>{item.phone}</a>:null}{whatsappHref?<a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={15}/>WhatsApp</a>:null}{item.mapUrl?<a href={item.mapUrl} target="_blank" rel="noreferrer">Ver no mapa<ArrowUpRight size={15}/></a>:null}</div></div></div>
          {item.hours?<div className="pf-location"><span className="pf-location-icon" aria-hidden="true"><CalendarClock size={22}/></span><div><strong>Horário de funcionamento</strong><span>{item.hours}</span></div></div>:null}
          {item.website||item.instagram?<div className="pf-location"><span className="pf-location-icon" aria-hidden="true"><Globe size={22}/></span><div><strong>Na internet</strong><div className="pf-location-links">{item.website?<a href={item.website} target="_blank" rel="noreferrer">Site<ExternalLink size={14}/></a>:null}{item.instagram?<a href={item.instagram} target="_blank" rel="noreferrer"><Camera size={15}/>Instagram</a>:null}</div></div></div>:null}
        </section>
        {linkedProfessionals.length?<section className="pf-card"><h2>Profissionais que atendem aqui <small className="org-count">{linkedProfessionals.length}</small></h2><div className="org-team">{visibleProfessionals.map(p=><Link href={`/profissionais/${p.slug}`} className="dz-card" key={p.slug}><span className="dz-photo" aria-hidden="true"><ProfessionalImage src={resolveProfessionalImage(p.slug,p.imageUrl,p)} sizes="76px"/></span><span className="dz-info"><small>{p.specialty||p.profession}</small><strong>{p.name}</strong>{p.registration&&/\d/.test(p.registration)?<span>{p.registration}</span>:null}</span><ArrowRight className="dz-arrow" size={18} aria-hidden="true"/></Link>)}</div>{linkedProfessionals.length>visibleProfessionals.length?<Link className="org-more" href={`/buscar?cidade=piumhi&tipo=professionals&q=${encodeURIComponent(item.name)}`}>Ver todos os {linkedProfessionals.length} profissionais <ArrowRight size={16}/></Link>:null}</section>:null}
        <p className="pf-source">Informações verificadas em fontes públicas{item.updatedAt?` · Atualizadas em ${new Intl.DateTimeFormat("pt-BR",{month:"long",year:"numeric"}).format(new Date(`${item.updatedAt}T12:00:00`))}`:""}. <Link href="/sobre#como-verificamos">Como verificamos</Link></p>
        <section className="pf-update"><div><h2>Atualize estas informações</h2><p>Representa este estabelecimento? Solicite a atualização dos dados.</p></div><Link href={updateRequestHref(item.slug)}>Solicitar atualização</Link></section>
      </div>
      <aside className="pf-rail" aria-label="Contato"><div className="pf-card pf-contact"><h2>Fale com o estabelecimento</h2><div className="pf-contact-actions">{whatsappHref?<a className="pf-btn pf-btn-primary" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={18}/>WhatsApp</a>:null}{phoneHref?<a className={`pf-btn ${whatsappHref?"pf-btn-outline":"pf-btn-primary"}`} href={phoneHref}><Phone size={18}/>{whatsappHref?item.phone:"Ligar"}</a>:null}{item.mapUrl?<a className="pf-btn pf-btn-dark" href={item.mapUrl} target="_blank" rel="noreferrer"><Navigation size={18}/>Como chegar</a>:null}{!phoneHref&&!whatsappHref&&!item.mapUrl?<p className="pf-empty">Ainda sem contato público confirmado.</p>:null}</div></div></aside>
    </div>
  </div>
  {phoneHref||whatsappHref||item.mapUrl?<div className={`pf-actionbar${(phoneHref||whatsappHref)&&item.mapUrl?"":" is-single"}`}>{whatsappHref?<a className="pf-btn pf-btn-primary" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={19}/>WhatsApp</a>:phoneHref?<a className="pf-btn pf-btn-primary" href={phoneHref}><Phone size={19}/>Ligar</a>:null}{item.mapUrl?<a className="pf-btn pf-btn-dark" href={item.mapUrl} target="_blank" rel="noreferrer"><Navigation size={19}/>Como chegar</a>:null}</div>:null}
</main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/></>}
