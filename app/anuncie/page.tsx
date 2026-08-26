import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, Building2, LayoutTemplate, MapPin, Megaphone, Mic2, Search } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articles, cities, podcasts } from "@/lib/data";
import { citySlug } from "@/lib/city-utils";
import { isCityAvailable } from "@/lib/cities";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Anuncie no Guia Saúde",
  "Conheça as formas de anunciar sua clínica, empresa ou marca no portal Guia Saúde.",
  "/anuncie",
);

const formats = [
  {
    icon: LayoutTemplate,
    title: "Banner no portal",
    text: "Sua marca aparece em posições de destaque nas páginas do portal ou de uma cidade escolhida.",
    ideal: "Ideal para campanhas, inaugurações, serviços e reconhecimento de marca.",
  },
  {
    icon: BadgeCheck,
    title: "Perfil em destaque",
    text: "Profissionais, clínicas e empresas ganham mais visibilidade na busca e no diretório.",
    ideal: "Ideal para quem deseja ser encontrado com mais facilidade.",
  },
  {
    icon: BookOpen,
    title: "Conteúdo patrocinado",
    text: "Matéria ou entrevista identificada como conteúdo de marca e revisada pela equipe editorial.",
    ideal: "Ideal para explicar serviços, projetos e campanhas educativas.",
  },
  {
    icon: Mic2,
    title: "Podcast e revista",
    text: "Apoio a episódios, entrevistas e presença combinada na revista e nos canais digitais.",
    ideal: "Ideal para fortalecer autoridade e presença regional.",
  },
];

const steps = [
  ["1", "Conte o que deseja divulgar", "Informe sua empresa, objetivo, cidade e período da campanha."],
  ["2", "Receba uma proposta", "Nossa equipe indica os formatos mais adequados e apresenta valores e disponibilidade."],
  ["3", "Aprove e publique", "Após a aprovação, preparamos a campanha e combinamos a data de publicação."],
];

export default function AdvertisePage() {
  return (
    <>
      <SiteHeader />
      <main className="advertise-simple">
        <section className="advertise-hero media-kit-hero">
          <div className="shell advertise-simple-hero">
            <div>
              <p className="eyebrow">Anuncie no Guia Saúde</p>
              <h1>Mostre sua marca para quem busca saúde na região.</h1>
              <p>
                Divulgue sua clínica, empresa, serviço ou marca no portal, nas páginas das cidades,
                no podcast e na revista Guia Saúde.
              </p>
              <div className="media-kit-actions">
                <a href="https://wa.me/5537999474443" target="_blank" rel="noreferrer">
                  Pedir uma proposta <ArrowRight size={15} />
                </a>
                <Link href="/buscar">Conhecer o portal <Search size={15} /></Link>
              </div>
            </div>
            <aside className="advertise-simple-summary">
              <strong>Você escolhe:</strong>
              <span><MapPin size={16} /> Em quais cidades anunciar</span>
              <span><Megaphone size={16} /> Qual formato deseja usar</span>
              <span><Building2 size={16} /> Por quanto tempo divulgar</span>
              <small>Valores e disponibilidade são informados na proposta.</small>
            </aside>
          </div>
        </section>

        <section className="section shell advertise-why">
          <div className="advertise-simple-heading">
            <p className="eyebrow">Por que aqui</p>
            <h2>Um público que já está procurando saúde</h2>
            <p>Quem chega ao Guia Saúde não está distraído — está buscando um profissional, uma clínica ou uma informação de saúde na própria cidade. Sua marca aparece no momento da decisão.</p>
          </div>
          <div className="advertise-stat-grid">
            <div><strong>{cities.length}</strong><span>cidade disponível no Guia Saúde</span></div>
            <div><strong>{podcasts.length}</strong><span>episódios do podcast Conexão Saúde</span></div>
            <div><strong>{articles.length}</strong><span>matérias com especialistas da região</span></div>
            <div><strong>100%</strong><span>público regional e segmentado em saúde</span></div>
          </div>
          <p className="advertise-who">Faz sentido para clínicas, consultórios, laboratórios, farmácias, óticas, academias, planos e marcas ligadas à saúde e ao bem-estar.</p>
        </section>

        <section className="section shell advertise-simple-section">
          <div className="advertise-simple-heading">
            <p className="eyebrow">Formas de anunciar</p>
            <h2>Escolha como sua marca vai aparecer</h2>
            <p>Você não precisa decidir tudo agora. Nossa equipe ajuda a montar a melhor combinação.</p>
          </div>
          <div className="advertise-format-simple-grid">
            {formats.map(({ icon: Icon, title, text, ideal }) => (
              <article key={title}>
                <span className="advertise-format-icon"><Icon size={24} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <small>{ideal}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="advertise-city-section">
          <div className="shell advertise-city-layout">
            <div>
              <p className="eyebrow">Onde anunciar</p>
              <h2>Escolha uma cidade ou toda a região</h2>
              <p>Sua campanha pode aparecer somente no município de interesse ou alcançar todas as cidades do portal.</p>
            </div>
            <div className="advertise-city-links">
              {cities.map((city) => (
                isCityAvailable(city) ? <Link key={city} href="/">
                  <MapPin size={14} /> {city}
                </Link> : <span key={city} className="city-coming-soon" aria-disabled="true"><MapPin size={14} /> {city}<small>EM BREVE</small></span>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell advertise-simple-section">
          <div className="advertise-simple-heading">
            <p className="eyebrow">Como contratar</p>
            <h2>É simples começar</h2>
          </div>
          <ol className="advertise-step-grid">
            {steps.map(([number, title, text]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="shell advertise-faq">
          <div>
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2>Antes de solicitar sua proposta</h2>
          </div>
          <div>
            <details>
              <summary>Quanto custa anunciar?</summary>
              <p>O valor depende da cidade, formato e período escolhidos. A proposta apresenta todas as condições antes da contratação.</p>
            </details>
            <details>
              <summary>Preciso fornecer a arte?</summary>
              <p>Você pode enviar uma arte pronta ou conversar com a equipe sobre a preparação do material.</p>
            </details>
            <details>
              <summary>Posso anunciar em apenas uma cidade?</summary>
              <p>Sim. Também é possível combinar várias cidades ou criar uma campanha para toda a região.</p>
            </details>
            <details>
              <summary>Publicidade de saúde passa por revisão?</summary>
              <p>Sim. Os materiais devem seguir as regras aplicáveis e são identificados claramente como publicidade ou conteúdo patrocinado.</p>
            </details>
          </div>
        </section>

        <section className="commercial-cta advertise-final-cta">
          <div className="shell">
            <div>
              <p className="eyebrow">Solicite uma proposta</p>
              <h2>Conte onde e como você quer divulgar sua marca.</h2>
              <p>Responderemos com formatos, disponibilidade, prazo e valores.</p>
            </div>
            <a href="https://wa.me/5537999474443" target="_blank" rel="noreferrer">
              Falar pelo WhatsApp <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
