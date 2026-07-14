export type InclusionInput = {
  entityType: string; name: string; category?: string; cityName?: string;
  contactName: string; contactEmail?: string; contactPhone: string; message?: string;
};

export type InclusionRequest = {
  id: number; entityType: string; name: string; category: string | null; cityName: string | null;
  contactName: string; contactEmail: string | null; contactPhone: string; message: string | null;
  status: string; source: string; createdAt: string; updatedAt: string;
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

const columns = `id, entity_type as entityType, name, category, city_name as cityName,
  contact_name as contactName, contact_email as contactEmail, contact_phone as contactPhone,
  message, status, source, created_at as createdAt, updated_at as updatedAt`;

export async function listInclusionRequests(filters?: { status?: string }) {
  const db = await getD1();
  const where = filters?.status ? " WHERE status = ?" : "";
  const statement = db.prepare(`SELECT ${columns} FROM inclusion_requests${where} ORDER BY created_at DESC, id DESC`);
  const result = filters?.status
    ? await statement.bind(filters.status).all<InclusionRequest>()
    : await statement.all<InclusionRequest>();
  return result.results;
}

export async function setInclusionStatus(id: number, status: string, actorEmail?: string) {
  const db = await getD1();
  await db.batch([
    db.prepare("UPDATE inclusion_requests SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(status, id),
    db.prepare("INSERT INTO audit_log (entity_type, entity_id, action, actor_email, detail) VALUES (?, ?, ?, ?, ?)")
      .bind("inclusion_request", id, `status:${status}`, actorEmail ?? null, null),
  ]);
}

export async function removeInclusionRequest(id: number, actorEmail?: string) {
  const db = await getD1();
  await db.batch([
    db.prepare("DELETE FROM inclusion_requests WHERE id = ?").bind(id),
    db.prepare("INSERT INTO audit_log (entity_type, entity_id, action, actor_email, detail) VALUES (?, ?, ?, ?, ?)")
      .bind("inclusion_request", id, "deleted", actorEmail ?? null, null),
  ]);
}
