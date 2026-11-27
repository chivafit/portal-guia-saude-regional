import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { HealthOSSectionHeader } from "@/components/HealthOSSectionHeader";
import { Suspense } from "react";
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
        <section className="inclusion-compact-hero"><div className="inclusion-shell"><HealthOSSectionHeader eyebrow="Inclusão e atualização" title="Faça parte do Guia Saúde" description="Cadastre ou atualize seu perfil profissional, clínica ou serviço de saúde." /><div className="inclusion-trust"><span><CheckCircle2 size={15}/> Revisão antes da publicação</span><span><ShieldCheck size={15}/> Envio protegido pela Política de Privacidade</span></div></div></section>
        <section className="inclusion-shell inclusion-main"><div className="inclusion-form-intro"><div><p className="inclusion-kicker">Envie as informações</p><h2>Dados do cadastro</h2></div><p>Preencha os campos obrigatórios (*) e complemente seu perfil.</p></div><Suspense fallback={<div className="inclusion-form inclusion-form-loading" aria-busy="true" />}><InclusionForm /></Suspense><div className="inclusion-after-form"><span>O envio não publica o perfil automaticamente.</span><span>A equipe revisa as informações antes de qualquer alteração.</span><Link href="/anuncie" prefetch={false}>Quer anunciar? Conheça as opções comerciais <ArrowRight size={14}/></Link></div></section>
      </main>
    </>
  );
}
