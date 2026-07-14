import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const channels = [
  ["Portal", "Banners, perfis em destaque e presença segmentada por cidade ou categoria."],
  ["Revista digital", "Edições, publieditoriais e cotas comerciais para marcas da saúde."],
  ["Podcast", "Apoio de episódios, chamadas comerciais e conteúdo com autoridade regional."],
  ["Instagram", "Distribuição social conectada às pautas, profissionais e campanhas."],
];

const formats = [
  { title: "Banner topo", tag: "Alta visibilidade", text: "Presença nas páginas principais do portal, ideal para campanhas institucionais." },
  { title: "Banner por cidade", tag: "Segmentação local", text: "Exibição em páginas de Piumhi, Capitólio, Arcos, Campo Belo, Bambuí e região." },
  { title: "Perfil em destaque", tag: "Diretório", text: "Mais destaque para profissionais, clínicas, consultórios, laboratórios e empresas." },
  { title: "Conteúdo de marca", tag: "Autoridade", text: "Matérias identificadas, entrevistas e pautas educativas com revisão editorial." },
  { title: "Podcast apoiado", tag: "Conexão Saúde", text: "Cotas de apoio, chamada do apresentador e distribuição integrada do episódio." },
  { title: "Revista + portal", tag: "Campanha integrada", text: "Presença combinada na revista digital, portal e redes sociais da Guia Saúde." },
];

const packages = [
  {
    name: "Presença",
    bestFor: "Profissionais e empresas que querem aparecer no guia.",
    items: ["Perfil revisado", "Contato e cidade", "Categoria profissional", "Possibilidade de destaque"],
  },
  {
    name: "Campanha local",
    bestFor: "Marcas que querem visibilidade em uma cidade ou especialidade.",
    items: ["Banner segmentado", "Página de cidade", "Relatório simples", "Período definido"],
  },
  {
    name: "Autoridade",
    bestFor: "Campanhas com conteúdo, reputação e distribuição multiplataforma.",
    items: ["Matéria identificada", "Podcast ou entrevista", "Revista digital", "Distribuição social"],
  },
];

const steps = [
  "Definição do objetivo da marca",
  "Escolha das cidades e categorias",
  "Montagem do formato comercial",
  "Publicação identificada e acompanhamento",
];

export default function AdvertisePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="advertise-hero media-kit-hero">
          <div className="shell media-kit-hero-grid">
            <div>
              <p className="eyebrow">Mídia regional integrada</p>
              <h1>Sua marca dentro do ecossistema Guia Saúde.</h1>
              <p>Portal, revista digital, podcast e Instagram conectados para campanhas de saúde, bem-estar, serviços e negócios regionais.</p>
              <div className="media-kit-actions">
                <a href="https://wa.me/5537999474443" target="_blank" rel="noreferrer">Solicitar proposta</a>
                <Link href="/buscar">Ver diretório</Link>
              </div>
            </div>
            <aside className="media-kit-card">
              <span>Guia Saúde</span>
              <strong>mídia kit regional</strong>
              <p>Formatos comerciais para profissionais, clínicas, laboratórios, escolas, marcas e empresas da saúde.</p>
              <small>Centro-Oeste de Minas · Serra da Canastra</small>
            </aside>
          </div>
        </section>

        <section className="section shell channel-section">
          <div className="section-kicker"><span>01</span><p>Canais comerciais</p></div>
          <div className="media-kit-heading">
            <h2>Uma presença distribuída, não um anúncio isolado.</h2>
            <p>A proposta é vender campanhas com contexto: busca local, conteúdo editorial, revista, podcast e distribuição social.</p>
          </div>
          <div className="channel-grid">
            {channels.map(([title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell">
          <div className="media-kit-heading compact">
            <div>
              <p className="eyebrow">Inventário digital</p>
              <h2>Formatos comerciais do portal</h2>
            </div>
            <p>Todos os espaços devem ser identificados como publicidade, apoio ou conteúdo de marca quando aplicável.</p>
          </div>
          <div className="format-grid">
            {formats.map((format) => (
              <article key={format.title}>
                <small>{format.tag}</small>
                <h3>{format.title}</h3>
                <p>{format.text}</p>
              </article>
            ))}
          </div>
          <AdSlot code="DEMONSTRACAO_COMERCIAL" />
        </section>

        <section className="media-kit-band">
          <div className="shell package-layout">
            <div>
              <p className="eyebrow">Pacotes sugeridos</p>
              <h2>Três caminhos para vender sem complicar.</h2>
              <p>Os pacotes funcionam como ponto de partida. A proposta final pode combinar banners, perfil, conteúdo, podcast, revista e redes sociais.</p>
            </div>
            <div className="package-grid">
              {packages.map((item) => (
                <article key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.bestFor}</p>
                  <ul>
                    {item.items.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell commercial-flow">
          <div>
            <p className="eyebrow">Como funciona</p>
            <h2>Da conversa à campanha publicada.</h2>
          </div>
          <ol>
            {steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>

        <section className="commercial-cta">
          <div className="shell commercial-grid">
            <div>
              <p className="eyebrow">Fale com a RM</p>
              <h2>Vamos montar uma proposta por cidade, objetivo e canal.</h2>
            </div>
            <p>Use esta página como mídia kit inicial. Depois podemos incluir valores, cotas, prazos, audiência e exemplos reais.</p>
            <Link href="https://wa.me/5537999474443">Conversar pelo WhatsApp</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
