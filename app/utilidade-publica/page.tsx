import Link from "next/link";
import { CalendarDays, Pill, Phone, ArrowRight } from "lucide-react";
import { HealthOSSectionHeader } from "@/components/HealthOSSectionHeader";
export const metadata = { title: "Utilidade pública em Piumhi" };
const contacts = [{name:"SAMU",number:"192",description:"Emergências médicas"},{name:"Corpo de Bombeiros",number:"193",description:"Resgate e incêndios"}];
export default function PublicUtilityPage(){return <main className="gs-utility"><div className="gs-utility-shell"><HealthOSSectionHeader eyebrow="Utilidade pública" title="Saúde no dia a dia" description="Informações e contatos essenciais para Piumhi."/>
<section id="emergencia" className="gs-utility-card"><h2><Phone size={20}/> Urgência e emergência</h2><p>Em uma emergência, ligue diretamente para o serviço adequado.</p>{contacts.map(c=><a key={c.number} className="gs-utility-contact" href={`tel:${c.number}`}><span><strong>{c.name}</strong><small>{c.description}</small></span><b>{c.number}</b></a>)}<Link href="/empresas?categoria=hospitais">Consultar hospitais <ArrowRight size={16}/></Link></section>
<section id="plantao" className="gs-utility-card"><h2><Pill size={20}/> Farmácias de plantão</h2><p>A escala de plantão ainda não está disponível para consulta. Confirme o funcionamento diretamente com a farmácia antes de sair.</p><Link href="/empresas?categoria=farmacias">Consultar farmácias <ArrowRight size={16}/></Link></section>
<section id="agenda" className="gs-utility-card"><h2><CalendarDays size={20}/> Agenda da saúde</h2><p>Nenhum evento confirmado está publicado nesta agenda no momento.</p><Link href="/materias">Ver conteúdos de saúde <ArrowRight size={16}/></Link></section></div></main>}
