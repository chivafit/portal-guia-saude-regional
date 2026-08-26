import Link from "next/link";
import { BookOpen, Building2, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { cities } from "@/lib/data";
import { isCityAvailable } from "@/lib/cities";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Sobre",
  "Conheça o Guia Saúde, portal regional que conecta informação, profissionais, empresas, revista, podcast e mídia em saúde.",
  "/sobre",
);

const principles = [
  ["Informação responsável", "Conteúdo com caráter informativo, sem substituir avaliação, diagnóstico ou orientação profissional."],
  ["Busca regional", "Profissionais, clínicas e empresas organizados por cidade, categoria e área de atuação."],
  ["Validação antes da publicação", "Cadastros passam por revisão editorial e comercial antes de aparecerem publicamente."],
  ["Mídia identificada", "Banners, apoios e conteúdos de marca devem ser apresentados com transparência."],
];

const structure = [
  "Diretório de profissionais",
  "Guia de empresas e serviços",
  "Matérias editoriais",
  "Podcast Conexão Saúde",
  "Revista digital",
  "Banners e campanhas regionais",
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="content-hero about-hero portal-section-hero">
          <div className="shell portal-section-hero-grid">
            <div>
              <p className="eyebrow">Sobre o Guia Saúde</p>
              <h1>Um portal regional para aproximar cuidado, informação e presença profissional.</h1>
              <p>O Guia Saúde reúne profissionais, empresas, conteúdo editorial, revista, podcast e mídia paga em uma plataforma feita para o ecossistema de saúde da região.</p>
            </div>
            <aside className="portal-section-summary">
              <strong>O portal reúne:</strong>
              <span><MapPin size={17} /> Busca organizada por cidade</span>
              <span><Building2 size={17} /> Profissionais e empresas locais</span>
              <span><BookOpen size={17} /> Revista, matérias e podcast</span>
              <small>Informação regional em uma navegação direta e simples.</small>
            </aside>
          </div>
        </section>

        <section className="shell content-section about-grid">
          <div>
            <p className="eyebrow">Propósito</p>
            <h2>Organizar a saúde regional de forma útil, clara e confiável.</h2>
          </div>
          <div>
            <p>O portal foi pensado para ajudar moradores a encontrarem informações e contatos de saúde com mais facilidade, e para dar aos profissionais, clínicas e marcas uma presença digital regional mais estruturada.</p>
            <p>Não é uma plataforma de agendamento. O Guia Saúde é um portal informativo e comercial: apresenta perfis, conteúdos, serviços, campanhas e canais de contato.</p>
          </div>
        </section>

        <section className="shell about-principles">
          {principles.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="about-band">
          <div className="shell about-band-grid">
            <div>
              <p className="eyebrow">Estrutura da plataforma</p>
              <h2>Um ecossistema editorial, comercial e regional.</h2>
              <p>A proposta é integrar descoberta, autoridade, conteúdo e mídia para fortalecer a comunicação em saúde.</p>
            </div>
            <div className="about-structure-list">
              {structure.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        <section className="shell content-section about-cities">
          <div>
            <p className="eyebrow">Cidades prioritárias</p>
            <h2>Atuação regional com páginas locais.</h2>
          </div>
          <div className="about-city-grid">
            {cities.map((city) => (
              isCityAvailable(city) ? <Link key={city} href={`/cidades/${city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replaceAll(" ", "-")}`}>
                {city}
                <span>Ver cidade →</span>
              </Link> : <div key={city} className="city-coming-soon" aria-disabled="true">{city}<span>EM BREVE</span></div>
            ))}
          </div>
        </section>

        <section className="commercial-cta">
          <div className="shell commercial-grid">
            <div>
              <p className="eyebrow">Participe</p>
              <h2>Profissionais, empresas e marcas podem fazer parte do portal.</h2>
            </div>
            <p>Solicite inclusão, envie uma pauta ou consulte formatos comerciais para presença regional.</p>
            <Link href="/inclusao">Solicitar inclusão</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
