import Link from "next/link";
import { ArrowRight, BookOpen, Building2, Check, MapPin, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Sobre",
  "Conheça o Guia Saúde, portal regional que aproxima pessoas, profissionais, empresas e informação de saúde em Piumhi e região.",
  "/sobre",
);

const principles = [
  ["Informação responsável", "Conteúdo informativo, com linguagem clara e sem substituir avaliação ou orientação profissional."],
  ["Presença regional", "Uma experiência feita para aproximar pessoas dos profissionais, empresas e serviços da região."],
  ["Transparência", "Perfis, mídia, conteúdos de marca e canais comerciais são apresentados com identificação."],
  ["Revisão editorial", "Dados públicos passam por conferência antes de aparecerem na área pública do portal."],
];

const ecosystem: Array<[string, string, LucideIcon]> = [
  ["Diretório", "Profissionais, clínicas e empresas organizados para uma busca mais simples.", Users],
  ["Conteúdo", "Matérias, entrevistas, podcast e revista para transformar informação em cuidado.", BookOpen],
  ["Conexão", "Canais de contato e presença regional para quem oferece saúde e bem-estar.", Building2],
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="about-page">
        <section className="about-intro"><div className="about-shell about-intro-grid"><div className="about-intro-copy"><p className="about-kicker">SOBRE O GUIA SAÚDE · PIUMHI E REGIÃO</p><h1>Saúde mais próxima começa com informação que faz sentido.</h1><p className="about-lead">O Guia Saúde é um portal regional que aproxima pessoas, profissionais, empresas e conteúdos em uma experiência simples, confiável e feita para a realidade da nossa região.</p><div className="about-intro-actions"><Link className="about-button about-button-primary" href="/buscar?cidade=piumhi">Explorar o Guia <ArrowRight size={16} /></Link><Link className="about-text-link" href="#como-verificamos">Como verificamos <ArrowRight size={15} /></Link></div></div><div className="about-intro-panel"><div className="about-panel-orb"/><div className="about-panel-card about-panel-card-main"><span><MapPin size={16}/> Piumhi · MG</span><strong>Uma rede local<br/><em>mais fácil de encontrar.</em></strong><small>Profissionais · Clínicas · Conteúdos</small></div><div className="about-panel-card about-panel-card-float"><ShieldCheck size={17}/><span><b>Diretório regional</b><small>Informação revisada</small></span></div></div></div></section>
        <section className="about-shell about-numbers" aria-label="O que o Guia Saúde reúne"><div><strong>01</strong><span>Uma busca mais direta para a saúde local.</span></div><div><strong>02</strong><span>Conteúdo editorial para decisões mais informadas.</span></div><div><strong>03</strong><span>Presença digital para profissionais e empresas.</span></div></section>
        <section className="about-shell about-purpose"><div className="about-section-label">NOSSO PROPÓSITO</div><div className="about-purpose-grid"><h2>Organizar o cuidado regional sem complicar.</h2><div><p>Encontrar um profissional, entender um serviço ou acompanhar uma conversa sobre saúde não deveria exigir uma busca dispersa. O Guia Saúde reúne esses caminhos em um só lugar, com linguagem próxima e navegação objetiva.</p><p>Para quem mora em Piumhi e região, é uma forma de descobrir. Para profissionais e empresas, é uma forma de apresentar seu trabalho com contexto, proximidade e credibilidade.</p></div></div></section>
        <section className="about-shell about-ecosystem"><div className="about-section-heading"><div><p className="about-section-label">COMO FUNCIONA</p><h2>Um ecossistema regional, não apenas uma lista.</h2></div><p>O portal conecta descoberta, informação e presença profissional em uma experiência contínua.</p></div><div className="about-ecosystem-grid">{ecosystem.map(([title, text, Icon], index) => <article key={String(title)}><span className="about-card-number">0{index + 1}</span><div className="about-card-icon"><Icon size={21}/></div><h3>{title}</h3><p>{text}</p><Link href={index === 0 ? "/buscar?cidade=piumhi" : index === 1 ? "/materias" : "/anuncie"}>Conhecer <ArrowRight size={15}/></Link></article>)}</div></section>
        <section id="como-verificamos" className="about-check-section"><div className="about-shell about-check-grid"><div><p className="about-section-label">COMO VERIFICAMOS</p><h2>Confiança também está no que escolhemos publicar.</h2><p className="about-check-intro">O Guia Saúde trabalha com informações públicas e canais profissionais para manter o diretório útil, responsável e transparente.</p></div><div className="about-check-list"><div><Check size={17}/><span><b>Identidade e atuação</b><small>Conferimos nome, profissão, cidade e área de atuação.</small></span></div><div><Check size={17}/><span><b>Registro quando aplicável</b><small>Incluímos registros profissionais disponíveis em fontes públicas.</small></span></div><div><Check size={17}/><span><b>Canal profissional</b><small>Buscamos ao menos um local, contato ou canal público verificável.</small></span></div><div><Check size={17}/><span><b>Correções abertas</b><small>Profissionais e empresas podem solicitar atualização das informações.</small></span></div></div></div></section>
        <section className="about-shell about-principles"><div className="about-section-heading"><div><p className="about-section-label">NOSSOS PRINCÍPIOS</p><h2>Clareza antes de excesso.</h2></div><p>Uma boa experiência de saúde começa por informação bem organizada e expectativas honestas.</p></div><div className="about-principles-grid">{principles.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className="about-final"><div className="about-shell about-final-inner"><div><p className="about-section-label">FAÇA PARTE</p><h2>Vamos aproximar a saúde da região?</h2><p>Profissionais e empresas podem solicitar inclusão, atualizar seus dados ou conhecer as possibilidades de presença no Guia Saúde.</p></div><div className="about-final-actions"><Link className="about-button about-button-primary" href="/inclusao">Solicitar inclusão <ArrowRight size={16}/></Link><Link className="about-button about-button-light" href="/anuncie">Anunciar no Guia <ArrowRight size={16}/></Link></div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
