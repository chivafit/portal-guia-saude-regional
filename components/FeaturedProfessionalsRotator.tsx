"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { ProfessionalImage } from "@/components/ProfessionalImage";

type FeaturedProfessional = { slug:string; name:string; specialty:string; organization:string; registration:string; imageUrl?:string };

export function FeaturedProfessionalsRotator({ professionals }: { professionals: FeaturedProfessional[] }) {
  const visible = professionals.slice(0, 6);
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: number) => rail.current?.scrollBy({ left: direction * Math.max(270, rail.current.clientWidth * .78), behavior: "smooth" });

  return <div className="home-featured-spatial">
    <div className="home-featured-controls" aria-label="Navegar pelos profissionais em destaque">
      <button type="button" onClick={() => move(-1)} aria-label="Profissional anterior"><ArrowLeft size={17}/></button>
      <button type="button" onClick={() => move(1)} aria-label="Próximo profissional"><ArrowRight size={17}/></button>
    </div>
    <div className="home-featured-professionals-grid home-featured-spatial-rail" ref={rail}>
      {visible.map((item,index)=><Link key={item.slug} href={`/profissionais/${item.slug}`} className="home-featured-professional-card home-featured-spatial-card">
        <span className={`home-featured-professional-avatar${item.imageUrl?" has-photo":""}`} aria-hidden="true">
          {item.imageUrl?<ProfessionalImage src={item.imageUrl} sizes="(max-width: 640px) 72px, 84px" eager={index<2}/>:null}
          {!item.imageUrl?item.name.split(" ").filter(word=>!/^dr\.?|^dra\.?$/i.test(word)).slice(0,2).map(word=>word[0]).join(""):null}
        </span>
        <div className="home-featured-professional-copy"><div className="home-featured-professional-name"><strong>{item.name}</strong><span aria-label="Profissional em destaque" title="Profissional em destaque"><Star size={14} fill="currentColor"/></span></div><small>{item.specialty}</small>{item.organization?<span className="home-featured-professional-org">{item.organization}</span>:null}<em>Ver perfil <ArrowUpRight size={13}/></em></div>
      </Link>)}
    </div>
  </div>;
}
