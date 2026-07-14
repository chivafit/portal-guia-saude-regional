import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { articles } from "@/lib/data";
import { publishedContent } from "@/lib/content";

const extra = [
  { category: "Saúde bucal", title: "Prevenção e acompanhamento: o que muda o cuidado com o sorriso", excerpt: "Orientações e conversas com especialistas para decisões mais informadas." },
  { category: "Bem-estar", title: "Sono de qualidade também é parte da prevenção", excerpt: "Hábitos, sinais de atenção e o momento certo de procurar avaliação profissional." },
  { category: "Alimentação", title: "Suplementação exige indicação individualizada", excerpt: "Informação responsável para entender quando suplementos podem fazer sentido." },
];

export default async function MateriasPage(){const saved=await publishedContent("article");const catalog=[...saved.map(item=>({category:item.citySlug?"Conteúdo local":"Guia Saúde",title:item.title,excerpt:item.summary||item.body||"Conteúdo publicado pela equipe editorial."})),...articles,...extra];return <><SiteHeader/><main><section className="content-hero"><div className="shell"><p className="eyebrow">Conteúdo editorial</p><h1>Informação para cuidar melhor.</h1><p>Matérias, entrevistas e orientações produzidas para aproximar conhecimento e comunidade.</p></div></section><section className="shell content-section"><div className="content-tabs"><b>Mais recentes</b><span>Prevenção</span><span>Bem-estar</span><span>Especialistas</span></div><div className="featured-article"><div className="article-visual">GUIA<br/>SAÚDE</div><div><p className="eyebrow">Especial da semana</p><h2>O cuidado muda com o tempo. A atenção, não.</h2><p>Uma leitura sobre prevenção, acompanhamento e escolhas conscientes em cada fase da vida.</p><span>Leitura de 6 minutos →</span></div></div><div className="content-card-grid">{catalog.map((item,index)=><article key={`${item.title}-${index}`}><div className={`content-card-art tone-${index%3}`}><span>{item.category}</span></div><small>{item.category}</small><h2>{item.title}</h2><p>{item.excerpt}</p><span>Ler matéria →</span></article>)}</div><div className="editorial-note"><strong>Compromisso editorial</strong><p>Conteúdos de saúde têm caráter informativo e não substituem avaliação ou orientação profissional.</p></div></section></main><SiteFooter/></>}
