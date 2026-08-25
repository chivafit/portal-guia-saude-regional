import { createContactLead } from "@/lib/leads";

export async function POST(request: Request) {
  const data = await request.json() as Record<string, string | boolean>;
  if (!data.entityType || !data.entitySlug || !data.entityName) {
    return Response.json({ error: "Perfil inválido" }, { status: 400 });
  }
  if (!data.visitorName || !data.visitorWhatsapp || !data.consent) {
    return Response.json({ error: "Nome, WhatsApp e consentimento são obrigatórios" }, { status: 400 });
  }
  const id = await createContactLead({
    entityType: String(data.entityType),
    entitySlug: String(data.entitySlug),
    entityName: String(data.entityName),
    category: data.category ? String(data.category) : undefined,
    cityName: data.cityName ? String(data.cityName) : undefined,
    visitorName: String(data.visitorName),
    visitorWhatsapp: String(data.visitorWhatsapp),
    visitorCity: data.visitorCity ? String(data.visitorCity) : undefined,
    interest: data.interest ? String(data.interest) : undefined,
    sourcePath: data.sourcePath ? String(data.sourcePath) : undefined,
    consent: Boolean(data.consent),
  });
  return Response.json({ ok: true, id });
}
