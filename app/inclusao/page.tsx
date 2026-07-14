import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";
import { InclusionForm } from "./InclusionForm";

export const metadata = pageMetadata(
  "Solicitar inclusão",
  "Solicite inclusão de profissional, clínica, empresa ou serviço no diretório regional do Guia Saúde.",
  "/inclusao",
);

const steps = [
  "Você envia os dados básicos.",
  "A equipe revisa as informações.",
  "O cadastro pode ir para validação.",
  "Após aprovação, o perfil pode ser publicado no guia.",
];

export default function InclusionPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="content-hero inclusion-hero">
          <div className="shell">
            <p className="eyebrow">Solicitar inclusão</p>
            <h1>Cadastre interesse para aparecer no Guia Saúde.</h1>
            <p>Use este formulário para indicar profissionais, clínicas, consultórios, laboratórios, farmácias, óticas, academias e outros serviços ligados à saúde.</p>
          </div>
        </section>
        <section className="shell content-section inclusion-layout">
          <div>
            <p className="eyebrow">Fluxo de validação</p>
            <h2>Solicitar não publica automaticamente.</h2>
            <p>O Guia Saúde é um portal informativo. Toda inclusão precisa passar por revisão antes de aparecer publicamente.</p>
            <ol>
              {steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <div className="inclusion-note">
              <strong>Quer anunciar?</strong>
              <p>Se a intenção é contratar banner, perfil em destaque, revista ou podcast, acesse o mídia kit.</p>
              <Link href="/anuncie">Ver oportunidades comerciais →</Link>
            </div>
          </div>
          <InclusionForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
