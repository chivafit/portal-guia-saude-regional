// Links do WhatsApp com mensagem pronta: a pessoa já começa a conversa e o
// profissional ou estabelecimento sabe que o contato veio do Guia Saúde.

export type WhatsappAudience = "professional" | "place";

const messages: Record<WhatsappAudience, string> = {
  professional: "Olá! Encontrei seu perfil no Guia Saúde e gostaria de agendar um atendimento.",
  place: "Olá! Encontrei o contato de vocês no Guia Saúde e gostaria de mais informações.",
};

/** Número (ou link wa.me) → link do WhatsApp com a mensagem; "" se o número não for válido. */
export function whatsappLink(value: string | undefined, audience: WhatsappAudience = "professional") {
  const digits = (value ?? "").replace(/\D/g, "");
  if (digits.length < 10) return "";
  const number = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(messages[audience])}`;
}
