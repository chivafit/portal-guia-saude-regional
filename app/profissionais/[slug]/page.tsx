import Link from "next/link";
import { notFound } from "next/navigation";
import { professionals } from "@/lib/data";
import { findPublishedProfessional, publicProfessionals } from "@/lib/public-directory";
import { pageMetadata } from "@/lib/seo";
import { professionalRedirects, professionalRedirectTarget } from "@/lib/professional-redirects";
import { siteUrl } from "@/lib/seo";
import { buildProfileView } from "@/lib/profile-view";
import { ProfessionalProfile } from "@/components/ProfessionalProfile";

// Momento do build: o app só troca os dados do pacote por dados online mais novos que isto.
const builtAt = new Date().toISOString();

export function generateStaticParams(){return publicProfessionals.length?[...publicProfessionals.map((professional)=>({slug:professional.slug})),...Object.keys(professionalRedirects).map((slug)=>({slug}))]:[{slug:"perfil-indisponivel"}]}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const redirectTarget=professionalRedirectTarget(slug);if(redirectTarget)return{title:"Perfil atualizado | Guia Saúde",description:"Este endereço foi atualizado no Guia Saúde.",alternates:{canonical:`${siteUrl}${redirectTarget}`},robots:{index:false,follow:true}};const item=await findPublishedProfessional(slug,professionals);if(!item)return pageMetadata("Profissional não encontrado","Perfil profissional não encontrado no Guia Saúde.",`/profissionais/${slug}`);return pageMetadata(`${item.name} — ${item.specialty}`,`${item.profession} em ${item.city}. Perfil informativo no Guia Saúde, sem agendamento online.`,`/profissionais/${slug}`)}

export default async function ProfessionalPage({params}:{params:Promise<{slug:string}>}){
 const{slug}=await params;const redirectTarget=professionalRedirectTarget(slug);if(redirectTarget)return <main className="shell" style={{padding:"5rem 1.5rem"}}><meta httpEquiv="refresh" content={`0; url=${redirectTarget}`}/><script dangerouslySetInnerHTML={{__html:`window.location.replace(${JSON.stringify(redirectTarget)});`}}/><h1>Endereço atualizado</h1><p>Você será direcionado para a página atual.</p><Link href={redirectTarget}>Continuar</Link></main>;
 const item=await findPublishedProfessional(slug,professionals);if(!item)notFound();const view=buildProfileView(item);const primaryLocation=view.locations[0];
 const isPhysician=/^m[eé]dic/i.test(item.profession);const structuredData={"@context":"https://schema.org","@graph":[{"@type":"ProfilePage","@id":`${view.canonicalUrl}#profilepage`,url:view.canonicalUrl,name:`${item.name} — ${item.specialty} em ${item.city}/MG`,mainEntity:{"@id":`${view.canonicalUrl}#professional`}},{"@type":isPhysician?"Physician":"Person","@id":`${view.canonicalUrl}#professional`,name:item.name,...(isPhysician?{medicalSpecialty:item.specialty}:{jobTitle:`${item.profession} — ${item.specialty}`}),...(view.hasRealPhoto?{image:`${siteUrl}${item.imageUrl}`}:{}),...(view.summary?{description:view.summary}:{}),...(primaryLocation?.address?{address:{"@type":"PostalAddress",streetAddress:primaryLocation.address,addressLocality:item.city,addressRegion:"MG",addressCountry:"BR"}}:{}),...(view.primaryPhone?{telephone:`+${view.primaryPhone}`}:{}),url:view.canonicalUrl},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Guia Saúde",item:siteUrl},{"@type":"ListItem",position:2,name:"Profissionais",item:`${siteUrl}/buscar/`},{"@type":"ListItem",position:3,name:item.name,item:view.canonicalUrl}]}]};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/><ProfessionalProfile initial={view} builtAt={builtAt}/></>
}
