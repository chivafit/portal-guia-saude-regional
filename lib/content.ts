export type ContentType = "article" | "podcast" | "magazine" | "banner";
export type ContentStatus = "draft" | "review" | "published";
export type ContentRecord = {
  id: number; type: ContentType; slug: string; title: string; summary: string | null;
  body: string | null; status: ContentStatus; citySlug: string | null;
  metadata: string | null; authorEmail: string | null; publishedAt: string | null;
  createdAt: string; updatedAt: string;
};

const selectColumns = `id, type, slug, title, summary, body, status,
  city_slug as citySlug, metadata, author_email as authorEmail,
  published_at as publishedAt, created_at as createdAt, updated_at as updatedAt`;

async function getD1() { const { env } = await import("cloudflare:workers"); return env.DB; }

export async function listContent(filters?: { type?: string; status?: string }) {
  const conditions: string[] = [];
  const values: string[] = [];
  if (filters?.type) { conditions.push("type = ?"); values.push(filters.type); }
  if (filters?.status) { conditions.push("status = ?"); values.push(filters.status); }
  const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
  const db = await getD1();
  const statement = db.prepare(`SELECT ${selectColumns} FROM content_items${where} ORDER BY updated_at DESC`);
  const result = await statement.bind(...values).all<ContentRecord>();
  return result.results;
}

export async function createContent(input: {
  type: ContentType; slug: string; title: string; summary?: string; body?: string;
  status?: ContentStatus; citySlug?: string; metadata?: string; authorEmail?: string;
}) {
  const status = input.status ?? "draft";
  const publishedAt = status === "published" ? new Date().toISOString() : null;
  const db = await getD1();
  const result = await db.prepare(`INSERT INTO content_items
    (type, slug, title, summary, body, status, city_slug, metadata, author_email, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`)
    .bind(input.type, input.slug, input.title, input.summary ?? null, input.body ?? null,
      status, input.citySlug ?? null, input.metadata ?? null, input.authorEmail ?? null, publishedAt)
    .first<{ id: number }>();
  return result?.id;
}

export async function setContentStatus(id: number, status: ContentStatus, actorEmail?: string) {
  const publishedAt = status === "published" ? new Date().toISOString() : null;
  const db = await getD1();
  await db.batch([
    db.prepare("UPDATE content_items SET status = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(status, publishedAt, id),
    db.prepare("INSERT INTO audit_log (entity_type, entity_id, action, actor_email, detail) VALUES (?, ?, ?, ?, ?)").bind("content", id, `status:${status}`, actorEmail ?? null, null),
  ]);
}

export async function removeContent(id: number, actorEmail?: string) {
  const db = await getD1();
  await db.batch([
    db.prepare("DELETE FROM content_items WHERE id = ?").bind(id),
    db.prepare("INSERT INTO audit_log (entity_type, entity_id, action, actor_email, detail) VALUES (?, ?, ?, ?, ?)").bind("content", id, "deleted", actorEmail ?? null, null),
  ]);
}

export async function publishedContent(type: ContentType) {
  try { return await listContent({ type, status: "published" }); }
  catch { return [] as ContentRecord[]; }
}
