export type InclusionInput = {
  entityType: string; name: string; category?: string; cityName?: string;
  contactName: string; contactEmail?: string; contactPhone: string; message?: string;
};

async function getD1() { const { env } = await import("cloudflare:workers"); return env.DB; }

export async function createInclusionRequest(input: InclusionInput) {
  const db = await getD1();
  const result = await db.prepare(`INSERT INTO inclusion_requests
    (entity_type, name, category, city_name, contact_name, contact_email, contact_phone, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`)
    .bind(input.entityType, input.name, input.category ?? null, input.cityName ?? null,
      input.contactName, input.contactEmail ?? null, input.contactPhone, input.message ?? null)
    .first<{ id: number }>();
  return result?.id;
}
