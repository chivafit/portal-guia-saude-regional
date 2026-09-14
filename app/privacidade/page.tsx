import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Política de Privacidade", "Como o Guia Saúde trata dados no portal e nos aplicativos.", "/privacidade");

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Privacidade" title="Política de Privacidade" intro="Transparência sobre os dados tratados pelo Guia Saúde no portal e nos aplicativos.">
      <h2>Quais dados recebemos</h2>
      <p>Quando você usa nossos formulários, podemos receber nome, dados de contato, cidade, atividade profissional e a mensagem enviada por você.</p>
      <h2>Favoritos no aplicativo</h2>
      <p>Os perfis marcados como favoritos são armazenados somente no aparelho ou navegador utilizado. O Guia Saúde não recebe essa lista e ela pode ser removida pelo próprio usuário a qualquer momento.</p>
      <h2>Para que usamos</h2>
      <p>Usamos os dados enviados para responder solicitações, analisar inclusões ou correções cadastrais e enviar propostas quando solicitadas. Não vendemos dados pessoais.</p>
      <h2>Compartilhamento e retenção</h2>
      <p>Os dados enviados são acessados apenas pela equipe responsável pelo Guia Saúde e mantidos pelo tempo necessário para atender a solicitação e cumprir obrigações aplicáveis.</p>
      <h2>Seus direitos</h2>
      <p>Você pode solicitar acesso, correção ou exclusão dos dados enviados pelo e-mail <a href="mailto:rmproguia@gmail.com">rmproguia@gmail.com</a>.</p>
    </LegalPage>
  );
}
