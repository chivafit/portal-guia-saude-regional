export type Campaign = {
  id: number; advertiserName: string; name: string; positionCode: string;
  citySlug: string | null; startsAt: string; endsAt: string; destinationUrl: string; status: string;
};

async function getD1() { const { env } = await import("cloudflare:workers"); return env.DB; }

const columns = `id, advertiser_name as advertiserName, name, position_code as positionCode,
  city_slug as citySlug, starts_at as startsAt, ends_at as endsAt, destination_url as destinationUrl, status`;

export async function activeCampaign(positionCode: string) {
  try {
    const db = await getD1();
    const now = new Date().toISOString();
    const item = await db.prepare(`SELECT ${columns} FROM campaigns
      WHERE position_code = ? AND status = 'published' AND starts_at <= ? AND ends_at >= ?
      ORDER BY starts_at DESC LIMIT 1`)
      .bind(positionCode, now, now)
      .first<Campaign>();
    return item ?? null;
  } catch {
    return null;
  }
}

export async function listCampaigns() {
  const db = await getD1();
  const result = await db.prepare(`SELECT ${columns} FROM campaigns ORDER BY starts_at DESC, id DESC`).all<Campaign>();
  return result.results;
}

export async function createCampaign(input: {
  advertiserName: string; name: string; positionCode: string; citySlug?: string;
  startsAt?: string; endsAt?: string; destinationUrl: string; status?: string;
}) {
  const db = await getD1();
  const startsAt = input.startsAt || new Date().toISOString();
  const endsAt = input.endsAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const result = await db.prepare(`INSERT INTO campaigns
    (advertiser_name, name, position_code, city_slug, starts_at, ends_at, destination_url, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`)
    .bind(input.advertiserName, input.name, input.positionCode, input.citySlug || null,
      startsAt, endsAt, input.destinationUrl, input.status || "draft")
    .first<{ id: number }>();
  return result?.id;
}

export async function setCampaignStatus(id: number, status: string, actorEmail?: string) {
  const db = await getD1();
  await db.batch([
    db.prepare("UPDATE campaigns SET status = ? WHERE id = ?").bind(status, id),
    db.prepare("INSERT INTO audit_log (entity_type, entity_id, action, actor_email, detail) VALUES (?, ?, ?, ?, ?)")
      .bind("campaign", id, `status:${status}`, actorEmail ?? null, null),
  ]);
}

export async function removeCampaign(id: number, actorEmail?: string) {
  const db = await getD1();
  await db.batch([
    db.prepare("DELETE FROM campaigns WHERE id = ?").bind(id),
    db.prepare("INSERT INTO audit_log (entity_type, entity_id, action, actor_email, detail) VALUES (?, ?, ?, ?, ?)")
      .bind("campaign", id, "deleted", actorEmail ?? null, null),
  ]);
}
