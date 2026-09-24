import Image from "next/image";
import { Apple, ArrowRight, BadgeCheck, BookOpen, Building2, HeartPulse, MapPin, Play, Search, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";

const benefits = [
  { icon: Search, title: "Encontre com facilidade", text: "Profissionais, clínicas e serviços de saúde da sua região em poucos toques." },
  { icon: BadgeCheck, title: "Informação organizada", text: "Perfis claros, especialidades, contatos e endereços reunidos em um só lugar." },
  { icon: BookOpen, title: "Conteúdo que aproxima", text: "Matérias, revista e podcast produzidos com profissionais da região." },
];

function StoreBadges() {
  return <div className="landing-stores" aria-label="Disponibilidade dos aplicativos">
    <span><Apple aria-hidden="true"/><span><small>Em breve na</small><strong>App Store</strong></span></span>
    <span><Play aria-hidden="true" fill="currentColor"/><span><small>Em breve no</small><strong>Google Play</strong></span></span>
  </div>;
}

export function LandingPage() {
  return <main className="landing-page">
    <header className="landing-header">
      <a href="#inicio" aria-label="Guia Saúde — início"><GuiaSaudeLogo/></a>
      <nav aria-label="Navegação da página"><a href="#aplicativo">O aplicativo</a><a href="#recursos">Recursos</a><a href="#para-negocios">Para profissionais</a></nav>
      <a className="landing-header-cta" href="#baixar">Baixar o app <ArrowRight size={16}/></a>
    </header>

    <section className="landing-hero" id="inicio">
      <div className="landing-hero-copy">
        <p className="landing-eyebrow"><Sparkles size={15}/> SUA SAÚDE MAIS PERTO</p>
        <h1>Toda a saúde da sua região, <em>na palma da mão.</em></h1>
        <p>O Guia Saúde conecta você a profissionais, clínicas, serviços e informação confiável em uma experiência simples e feita para o celular.</p>
        <StoreBadges/>
        <div className="landing-trust"><span><ShieldCheck size={16}/> Dados organizados</span><span><MapPin size={16}/> Feito para a região</span></div>
      </div>
      <div className="landing-visual" aria-label="Telas do aplicativo Guia Saúde">
        <div className="landing-orb"/>
        <div className="landing-phone landing-phone-back"><Image src="/guia-saude-mobile-profile-real.png" alt="Perfil profissional no aplicativo Guia Saúde" fill sizes="260px" priority/></div>
        <div className="landing-phone landing-phone-front"><Image src="/guia-saude-mobile-home-real.png" alt="Página inicial do aplicativo Guia Saúde" fill sizes="280px" priority/></div>
        <span className="landing-float landing-float-search"><Search size={18}/><b>Busca rápida</b><small>Encontre o cuidado certo</small></span>
        <span className="landing-float landing-float-care"><HeartPulse size={18}/><b>Cuidado local</b><small>Mais perto de você</small></span>
      </div>
    </section>

    <section className="landing-intro" id="aplicativo">
      <p className="landing-eyebrow">UM GUIA PARA O DIA A DIA</p>
      <h2>Menos tempo procurando.<br/>Mais facilidade para cuidar.</h2>
      <p>Uma experiência pensada para tornar a jornada de saúde mais clara, próxima e prática.</p>
    </section>

    <section className="landing-benefits" id="recursos">
      {benefits.map(({icon:Icon,title,text})=><article key={title}><span><Icon size={23}/></span><h3>{title}</h3><p>{text}</p></article>)}
    </section>

    <section className="landing-showcase">
      <div className="landing-showcase-art"><Image src="/guia-saude-mobile-specialties-real.png" alt="Especialidades disponíveis no Guia Saúde" fill sizes="(max-width: 800px) 80vw, 380px"/></div>
      <div><p className="landing-eyebrow">TUDO EM UM SÓ APP</p><h2>O caminho mais simples até o cuidado que você procura.</h2><ul><li><Stethoscope/> Profissionais e especialidades</li><li><Building2/> Clínicas e serviços</li><li><BookOpen/> Conteúdo, revista e podcast</li><li><HeartPulse/> Favoritos sempre por perto</li></ul></div>
    </section>

    <section className="landing-business" id="para-negocios">
      <div><p className="landing-eyebrow">PARA QUEM CUIDA</p><h2>Sua presença profissional onde as pessoas procuram saúde.</h2><p>O aplicativo aproxima profissionais e estabelecimentos da comunidade com informação clara e uma apresentação consistente.</p></div>
      <a href="mailto:contato@guiasaude.app.br">Falar com o Guia Saúde <ArrowRight size={17}/></a>
    </section>

    <section className="landing-download" id="baixar"><div><p className="landing-eyebrow">GUIA SAÚDE NO SEU CELULAR</p><h2>Seu próximo cuidado começa aqui.</h2><p>Os aplicativos para iPhone e Android estarão disponíveis em breve.</p><StoreBadges/></div><div className="landing-download-mark"><HeartPulse size={54}/></div></section>

    <footer className="landing-footer"><div><GuiaSaudeLogo/><p>Saúde, informação e conexões locais em uma experiência feita para você.</p></div><div><a href="/privacidade">Privacidade</a><a href="/termos">Termos de uso</a><a href="mailto:contato@guiasaude.app.br">Contato</a></div><small>© {new Date().getFullYear()} Guia Saúde. Todos os direitos reservados.</small></footer>
  </main>;
}
