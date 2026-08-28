import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, Building2, LayoutTemplate, MapPin, Megaphone, Mic2, Newspaper, Search, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CommercialProposalForm } from "@/components/CommercialProposalForm";
import { articleImage, articles, magazineEditions, podcasts } from "@/lib/data";
import { publicProfessionals } from "@/lib/public-directory";
import { pageMetadata } from "@/lib/seo";
import "./anuncie.css";

export const metadata = pageMetadata(
  "Anuncie no Guia Saúde | Divulgação regional em saúde",
  "Conheça oportunidades de divulgação para profissionais, clínicas, empresas e marcas no portal, podcast e Revista Guia Saúde.",
  "/anuncie",
);

const whatsapp = "https://wa.me/5537999474443?text=Ol%C3%A1%21%20Conheci%20as%20op%C3%A7%C3%B5es%20de%20divulga%C3%A7%C3%A3o%20pelo%20site%20do%20Guia%20Sa%C3%BAde%20e%20gostaria%20de%20receber%20uma%20proposta.%0A%0ANome%3A%0AProfiss%C3%A3o%20ou%20empresa%3A%0ACidade%3A%0AFormato%20de%20interesse%3A%0AO%20que%20desejo%20divulgar%3A";

const formats = [
  [BadgeCheck, "Perfil em destaque", "Profissionais, clínicas e serviços podem receber maior visibilidade dentro da busca e do diretório, com identificação clara de destaque.", "Quem já possui ou deseja criar um perfil no Guia Saúde.", "Tenho interesse"],
  [LayoutTemplate, "Banner no portal", "Sua campanha pode aparecer em posições selecionadas da página inicial, páginas de conteúdo ou áreas relacionadas à cidade.", "Campanhas, inaugurações, serviços, eventos e reconhecimento de marca.", "Ver exemplo"],
  [Newspaper, "Conteúdo patrocinado", "Matérias e entrevistas desenvolvidas em parceria com profissionais ou marcas, sempre identificadas como conteúdo patrocinado.", "Apresentar projetos, serviços e campanhas educativas com mais contexto.", "Conhecer o formato"],
  [Mic2, "Podcast Conexão Saúde", "Possibilidade de apoio institucional, presença de marca ou participação editorial, conforme tema, disponibilidade e avaliação da equipe.", "Marcas, profissionais e projetos relacionados à saúde regional.", "Conhecer oportunidades"],
  [BookOpen, "Revista Guia Saúde", "Presença publicitária e oportunidades editoriais nas edições da Revista Guia Saúde, conforme disponibilidade.", "Profissionais, clínicas, empresas e marcas da área da saúde.", "Anunciar na revista"],
] as const;

const steps = [
  ["1", "Conte o que deseja divulgar", "Informe sua profissão ou empresa, objetivo, formato de interesse e período desejado."],
  ["2", "Receba uma proposta", "A equipe apresenta os formatos disponíveis, prazos, condições e valores."],
  ["3", "Aprove o material", "Após a aprovação da proposta e da peça, a publicação é programada."],
  ["4", "Campanha publicada", "O conteúdo entra no ar na data combinada e permanece pelo período contratado."],
];

export default function AdvertisePage() {
  const latestMagazine = magazineEditions.find((edition) => edition.coverUrl);
  const featuredArticle = articles[0];
  const featuredPodcast = podcasts.find((episode) => episode.imageUrl);

  return <>
    <SiteHeader advertiseLabel="Anuncie" />
    <main className="commercial-page">
      <section className="commercial-hero">
        <div className="shell commercial-hero-grid">
          <div className="commercial-hero-copy">
            <p className="eyebrow">Anuncie no Guia Saúde</p>
            <h1>Mostre sua marca para quem busca saúde em Piumhi.</h1>
            <p>Divulgue seu perfil, clínica, empresa, serviço ou marca no portal, nas matérias, no Podcast Conexão Saúde e na Revista Guia Saúde.</p>
            <div className="commercial-actions"><a href={whatsapp} target="_blank" rel="noreferrer">Solicitar uma proposta <ArrowRight size={16} /></a><a href="#formatos">Ver formatos disponíveis <ArrowRight size={16} /></a></div>
          </div>
          <div className="commercial-media-kit" aria-label="Exemplos de canais do Guia Saúde">
            <span className="commercial-media-kit-label">Exemplos do ecossistema</span>
            <div className="commercial-portal-demo"><Search size={16} /><span>Busca no Guia Saúde</span><b>Profissionais e serviços em Piumhi</b></div>
            <div className="commercial-profile-demo"><BadgeCheck size={16} /><div><small>PERFIL NO GUIA</small><strong>Informações profissionais</strong><span>Dados claros e canais de contato</span></div></div>
            {latestMagazine?.coverUrl && <img className="commercial-magazine-cover" src={latestMagazine.coverUrl} alt={`Capa da ${latestMagazine.number} edição da Revista Guia Saúde`} />}
            {featuredPodcast?.imageUrl && <img className="commercial-podcast-card" src={featuredPodcast.imageUrl} alt={`Episódio do Podcast Conexão Saúde com ${featuredPodcast.guest}`} />}
            {articleImage(featuredArticle) && <img className="commercial-article-card" src={articleImage(featuredArticle)} alt={`Matéria ${featuredArticle.title}`} />}
            <span className="commercial-application">Exemplos de aplicação</span>
          </div>
        </div>
      </section>

      <section className="shell commercial-local"><div><p className="eyebrow">Atuação local</p><h2>Presença digital em Piumhi.</h2><p>O Guia Saúde reúne profissionais, serviços e conteúdos relacionados à saúde em Piumhi.</p></div><MapPin size={34} /></section>

      <section className="shell commercial-paths"><div className="commercial-section-heading"><p className="eyebrow">Caminhos comerciais</p><h2>Como você quer aparecer no Guia Saúde?</h2></div><div className="commercial-path-grid">
        <article><BadgeCheck size={27} /><h3>Sou profissional, clínica ou serviço de saúde</h3><p>Quero apresentar meu trabalho, facilitar o acesso às minhas informações ou destacar meu perfil no Guia Saúde.</p><span>Perfil profissional · Perfil de clínica ou serviço · Perfil em destaque · Participação em conteúdo · Podcast · Revista</span><a href="#formatos-profissionais">Ver opções para profissionais <ArrowRight size={15} /></a></article>
        <article><Building2 size={27} /><h3>Sou empresa ou marca</h3><p>Quero divulgar uma campanha, produto, projeto, evento ou serviço relacionado à saúde e ao bem-estar.</p><span>Banner no portal · Conteúdo patrocinado · Apoio ao podcast · Publicidade na revista · Campanhas combinadas</span><a href="#formatos-marcas">Ver opções para marcas <ArrowRight size={15} /></a></article>
      </div></section>

      <section className="shell commercial-value"><div className="commercial-section-heading"><p className="eyebrow">O Guia Saúde</p><h2>Um ecossistema regional de saúde e informação.</h2><p>Sua marca aparece durante a busca por profissionais, serviços e informações de saúde na cidade.</p></div><div className="commercial-fact-grid"><article><strong>{podcasts.length}</strong><span>episódios do Podcast Conexão Saúde</span></article><article><strong>{articles.length}</strong><span>matérias publicadas</span></article><article><strong>{magazineEditions.filter((edition) => edition.pdfUrl || edition.flipbook).length}</strong><span>edições digitalizadas da Revista Guia Saúde</span></article><article><strong>{publicProfessionals.length}</strong><span>perfis publicados no portal</span></article></div></section>

      <section className="commercial-showcase"><div className="shell"><div className="commercial-section-heading"><p className="eyebrow">Veja como sua marca pode aparecer</p><h2>Formatos integrados ao conteúdo do Guia Saúde.</h2></div><div className="commercial-examples"><article><BadgeCheck size={23} /><div><small>PERFIL EM DESTAQUE</small><h3>Presença clara na busca</h3><p>O perfil aparece em posição de maior visibilidade, sempre identificado como destaque.</p><span>Indicado para profissionais, clínicas e serviços cadastrados.</span></div></article><article><LayoutTemplate size={23} /><div><small>BANNER NO PORTAL</small><h3>Campanha em posição selecionada</h3><p>Arte identificada como publicidade em áreas relacionadas ao Guia.</p><span>Pode apresentar campanha, serviço, evento ou marca.</span></div></article><article><Newspaper size={23} /><div><small>CONTEÚDO PATROCINADO</small><h3>Informação identificada com transparência</h3><p>Matérias e entrevistas em parceria recebem identificação editorial adequada.</p><span>Indicado para projetos e campanhas educativas.</span></div></article></div></div></section>

      <section id="formatos" className="shell commercial-formats"><div className="commercial-section-heading"><p className="eyebrow">Formatos de divulgação</p><h2>Escolha como sua presença pode ser apresentada.</h2><p>Valores conforme formato, período e disponibilidade.</p></div><div className="commercial-format-grid">{formats.map(([Icon, title, text, ideal, cta], index) => <article id={index < 2 ? "formatos-profissionais" : "formatos-marcas"} key={title}><Icon size={24} /><h3>{title}</h3><p>{text}</p><small><b>Indicado para:</b> {ideal}</small><details><summary>Informações do formato</summary><p>Onde aparece, prazo de veiculação, materiais necessários, produção de arte, identificação publicitária, ação disponível, contratação e disponibilidade são definidos na proposta.</p></details><a href={whatsapp} target="_blank" rel="noreferrer">{cta} <ArrowRight size={14} /></a></article>)}</div></section>

      <section className="shell commercial-production"><Sparkles size={26} /><div><h2>Você pode enviar sua arte ou desenvolver o material com nossa equipe.</h2><p>Os formatos, prazos e condições de produção são definidos na proposta. Todas as peças passam por análise antes da publicação.</p></div></section>

      <section className="shell commercial-transparency"><div><p className="eyebrow">Transparência</p><h2>Publicidade identificada com clareza.</h2><p>Anúncios, apoios e conteúdos patrocinados são identificados de forma transparente. Os materiais passam por análise antes da publicação e devem respeitar as regras aplicáveis à comunicação em saúde.</p></div><ul><li>Perfis em destaque não representam classificação de qualidade.</li><li>Conteúdo patrocinado não substitui orientação profissional.</li><li>A publicidade não interfere na independência editorial do portal.</li><li>Participações editoriais dependem de avaliação e disponibilidade.</li></ul></section>

      <section className="shell commercial-process"><div className="commercial-section-heading"><p className="eyebrow">Como contratar</p><h2>É simples começar.</h2></div><ol>{steps.map(([number, title, text]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>

      <section className="shell commercial-faq"><div><p className="eyebrow">Dúvidas frequentes</p><h2>Antes de solicitar sua proposta</h2></div><div>{[["O Guia Saúde garante resultados?","Não. O Guia Saúde oferece espaços de divulgação e presença de marca, mas não garante contatos, pacientes, vendas, visualizações ou resultados comerciais."],["Preciso ter um perfil cadastrado?","Para utilizar o formato de perfil em destaque, é necessário possuir um perfil no Guia Saúde. Outros formatos podem ser contratados conforme disponibilidade."],["Por quanto tempo o anúncio fica disponível?","O período depende do formato contratado e é informado na proposta."],["Como conteúdos patrocinados são identificados?","Matérias, apoios e conteúdos comerciais recebem identificação visível, como “Conteúdo patrocinado” ou “Apoio de marca”."]].map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

      <section id="proposta" className="shell commercial-proposal"><div><p className="eyebrow">Solicite uma proposta</p><h2>Receba uma proposta personalizada.</h2><p>Conte o que deseja apresentar e receba informações sobre formatos, disponibilidade, prazos e valores.</p></div><CommercialProposalForm /></section>

    </main>
    <SiteFooter />
  </>;
}
