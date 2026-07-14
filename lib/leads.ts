export type ContactLead = {
  id: number;
  entityType: string;
  entitySlug: string;
  entityName: string;
  category: string | null;
  cityName: string | null;
  visitorName: string;
  visitorWhatsapp: string;
  visitorCity: string | null;
  interest: string | null;
  sourcePath: string | null;
  consent: boolean;
  createdAt: string;
};

async function getD1() { const { env } = await import("cloudflare:workers"); return env.DB; }

export async function createContactLead(input: {
  entityType: string; entitySlug: string; entityName: string; category?: string; cityName?: string;
  visitorName: string; visitorWhatsapp: string; visitorCity?: string; interest?: string; sourcePath?: string; consent: boolean;
}) {
  const db = await getD1();
  const result = await db.prepare(`INSERT INTO contact_leads
    (entity_type, entity_slug, entity_name, category, city_name, visitor_name, visitor_whatsapp, visitor_city, interest, source_path, consent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`)
    .bind(input.entityType, input.entitySlug, input.entityName, input.category ?? null, input.cityName ?? null,
      input.visitorName, input.visitorWhatsapp, input.visitorCity ?? null, input.interest ?? null, input.sourcePath ?? null, input.consent ? 1 : 0)
    .first<{ id: number }>();
  return result?.id;
}

export async function listContactLeads() {
  const db = await getD1();
  const result = await db.prepare(`SELECT id, entity_type as entityType, entity_slug as entitySlug, entity_name as entityName,
    category, city_name as cityName, visitor_name as visitorName, visitor_whatsapp as visitorWhatsapp,
    visitor_city as visitorCity, interest, source_path as sourcePath, consent, created_at as createdAt
    FROM contact_leads ORDER BY created_at DESC, id DESC LIMIT 300`).all<ContactLead>();
  return result.results;
}
