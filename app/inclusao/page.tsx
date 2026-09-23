import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Suspense } from "react";
import { HomeFooter } from "@/components/HomeFooter";
import { pageMetadata } from "@/lib/seo";
import { InclusionForm } from "./InclusionForm";

export const metadata = pageMetadata(
  "Atualizar perfil ou solicitar inclusão",
  "Envie informações para atualizar um perfil público ou solicitar inclusão no Guia Saúde.",
  "/inclusao",
);

export default function InclusionPage() {
  return (
    <>
      <main className="inclusion-page">
        <section className="inclusion-compact-hero"><div className="inclusion-shell"><p className="inclusion-kicker">ATUALIZAÇÃO E INCLUSÃO</p><h1>Ajude a manter o Guia Saúde correto e atualizado.</h1><p>Use o formulário para incluir ou atualizar um profissional, clínica, empresa ou serviço de saúde.</p><div className="inclusion-trust"><span><CheckCircle2 size={15}/> Revisão antes da publicação</span><span><ShieldCheck size={15}/> Envio protegido pela Política de Privacidade</span></div></div></section>
        <section className="inclusion-shell inclusion-main"><div className="inclusion-form-intro"><div><p className="inclusion-kicker">ENVIE AS INFORMAÇÕES</p><h2>Preencha os dados abaixo.</h2></div><p>Quanto mais completos os dados, mais fácil será revisar e publicar o perfil.</p></div><Suspense fallback={<div className="inclusion-form inclusion-form-loading" aria-busy="true" />}><InclusionForm /></Suspense><div className="inclusion-after-form"><span>O envio não publica o perfil automaticamente.</span><span>A equipe revisa as informações antes de qualquer alteração.</span><Link href="/anuncie">Quer anunciar? Conheça as opções comerciais <ArrowRight size={14}/></Link></div></section>
      </main>
      <HomeFooter />
    </>
  );
}
