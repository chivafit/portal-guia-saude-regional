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
