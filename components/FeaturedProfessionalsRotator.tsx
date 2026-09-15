"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { ProfessionalImage } from "@/components/ProfessionalImage";

type FeaturedProfessional = { slug:string; name:string; specialty:string; organization:string; registration:string; imageUrl?:string };

function pickThree(professionals: FeaturedProfessional[]) {
  if (professionals.length <= 3) return professionals;
  const shuffled = [...professionals];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled.slice(0, 3);
}

export function FeaturedProfessionalsRotator({ professionals }: { professionals: FeaturedProfessional[] }) {
  const [visible, setVisible] = useState(() => professionals.slice(0, 3));

  useEffect(() => {
    setVisible(pickThree(professionals));
  }, [professionals]);

  return <div className="home-featured-spatial">
    <div className="home-featured-professionals-grid home-featured-spatial-rail">
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
