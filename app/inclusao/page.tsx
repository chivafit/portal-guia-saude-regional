import Link from "next/link";
import { Suspense } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";
import { InclusionForm } from "./InclusionForm";

export const metadata = pageMetadata(
  "Atualizar perfil ou solicitar inclusão",
  "Envie informações para atualizar um perfil público ou solicitar inclusão de profissional, clínica, empresa ou serviço no Guia Saúde.",
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
            <p className="eyebrow">Atualização e inclusão</p>
            <h1>Envie dados para manter o Guia Saúde atualizado.</h1>
            <p>Use este formulário para atualizar um perfil existente ou indicar profissionais, clínicas, consultórios, laboratórios, farmácias, óticas, academias e outros serviços ligados à saúde. Ao enviar, você concorda com a <Link href="/privacidade">Política de Privacidade</Link>.</p>
          </div>
        </section>
        <section className="shell content-section inclusion-layout">
          <div>
            <p className="eyebrow">Fluxo de validação</p>
            <h2>O envio não altera o perfil automaticamente.</h2>
            <p>O Guia Saúde é um portal informativo. Toda inclusão precisa passar por revisão antes de aparecer publicamente.</p>
            <ol>
              {steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <div className="inclusion-note">
              <strong>Quer anunciar?</strong>
              <p>Se a intenção é contratar banner, perfil em destaque, revista ou podcast, veja como anunciar.</p>
              <Link href="/anuncie">Ver oportunidades comerciais →</Link>
            </div>
          </div>
          <Suspense fallback={<div className="inclusion-form" aria-busy="true" />}><InclusionForm /></Suspense>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
