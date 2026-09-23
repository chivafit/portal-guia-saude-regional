import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, FlaskConical, Heart, MapPin, Pill, Search, Stethoscope } from "lucide-react";
import { professionals } from "@/lib/data";
import { publishedProfessionals } from "@/lib/public-directory";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";

export async function HealthOSHome(){
 const source=await publishedProfessionals(professionals); const wanted=["dra-simone-mota-bonisson-endocrinologia-piumhi","gabriela-araujo-fisioterapia-pelvica-piumhi"]; const featured=wanted.map(slug=>source.find(item=>item.slug===slug)).filter(Boolean);
 return <main className="ref-mobile-home health-os-home"><div className="ref-mobile-inner"><header><GuiaSaudeLogo compact/><span><MapPin/> Piumhi <small>⌄</small></span></header><h1>Qual cuidado você procura hoje?</h1><p>Profissionais e serviços de saúde de Piumhi e região.</p><form action="/buscar"><Search/><input name="q" placeholder="Especialidade ou profissional" aria-label="Especialidade ou profissional"/><input type="hidden" name="cidade" value="piumhi"/><button aria-label="Buscar"><ArrowRight/></button></form><nav className="ref-mobile-shortcuts"><Link href="/buscar?tipo=professionals"><Stethoscope/><small>Médicos</small></Link><Link href="/empresas"><Building2/><small>Clínicas</small></Link><Link href="/buscar?q=exames"><FlaskConical/><small>Exames</small></Link><Link href="/buscar?q=farmacias"><Pill/><small>Farmácias</small></Link></nav><div className="ref-mobile-heading"><h2>Em destaque</h2><Link href="/profissionais-destaque">Ver todos</Link></div><section>{featured.map(p=><article key={p!.slug}><div className="ref-mobile-photo">{p!.imageUrl?<Image src={p!.imageUrl} alt={p!.name} fill unoptimized sizes="72px"/>:null}</div><div><small>{p!.specialty}</small><strong>{p!.name}</strong><span>{p!.organization||"Piumhi"}</span><div><Link href={`/profissionais/${p!.slug}`}>Ver perfil</Link><a href={p!.phone?`tel:${p!.phone}`:`/profissionais/${p!.slug}`} aria-label="Ligar">☎</a><button aria-label="Salvar"><Heart/></button></div></div></article>)}</section></div></main>;
}
