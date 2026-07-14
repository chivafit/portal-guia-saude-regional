export type DirectoryStatus = "imported" | "draft" | "review" | "published" | "archived";
export type DirectoryEntity = "professional" | "organization";

export type AdminProfessional = {
  id: number; publicName: string; slug: string; profession: string; specialty: string | null;
  cityName: string | null; organizationName: string | null; publicPhone: string | null;
  whatsapp: string | null; councilAcronym: string | null; councilState: string | null;
  registrationNumber: string | null; summary: string | null; services: string | null;
  status: DirectoryStatus; updatedAt: string;
};

export type AdminOrganization = {
  id: number; publicName: string; slug: string; category: string; cityName: string | null;
  publicPhone: string | null; address: string | null; cnesCode: string | null;
  summary: string | null; services: string | null; status: DirectoryStatus; updatedAt: string;
};

async function getD1() { const { env } = await import("cloudflare:workers"); return env.DB; }

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function uniqueSlug(base: string) {
  return `${slugify(base)}-${Date.now().toString(36)}`;
}

const professionalColumns = `id, public_name as publicName, slug, profession, specialty,
  city_name as cityName, organization_name as organizationName, public_phone as publicPhone,
  whatsapp, council_acronym as councilAcronym, council_state as councilState,
  registration_number as registrationNumber, summary, services, status, updated_at as updatedAt`;

const organizationColumns = `id, public_name as publicName, slug, category, city_name as cityName,
  public_phone as publicPhone, address, cnes_code as cnesCode, summary, services, status,
  updated_at as updatedAt`;

export async function listDirectory(entity: DirectoryEntity, filters?: { status?: string }) {
  const db = await getD1();
  const table = entity === "professional" ? "professionals" : "organizations";
  const columns = entity === "professional" ? professionalColumns : organizationColumns;
  const where = filters?.status ? " WHERE status = ?" : "";
  const statement = db.prepare(`SELECT ${columns} FROM ${table}${where} ORDER BY updated_at DESC, id DESC`);
  const result = filters?.status
    ? await statement.bind(filters.status).all<AdminProfessional | AdminOrganization>()
    : await statement.all<AdminProfessional | AdminOrganization>();
  return result.results;
}

export async function createProfessional(input: {
  publicName: string; profession: string; specialty?: string; cityName?: string;
  organizationName?: string; publicPhone?: string; whatsapp?: string; councilAcronym?: string;
  councilState?: string; registrationNumber?: string; summary?: string; services?: string; status?: DirectoryStatus;
}) {
  const db = await getD1();
  const slug = uniqueSlug(`${input.publicName}-${input.specialty ?? input.profession}-${input.cityName ?? "regional"}`);
  const result = await db.prepare(`INSERT INTO professionals
    (public_name, slug, profession, specialty, city_name, organization_name, public_phone, whatsapp,
     council_acronym, council_state, registration_number, summary, services, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`)
    .bind(input.publicName, slug, input.profession, input.specialty ?? null, input.cityName ?? null,
      input.organizationName ?? null, input.publicPhone ?? null, input.whatsapp ?? null,
      input.councilAcronym ?? null, input.councilState ?? null, input.registrationNumber ?? null,
      input.summary ?? null, input.services ?? null, input.status ?? "draft")
    .first<{ id: number }>();
  return result?.id;
}

export async function createOrganization(input: {
  publicName: string; category: string; cityName?: string; publicPhone?: string; address?: string;
  cnesCode?: string; summary?: string; services?: string; status?: DirectoryStatus;
}) {
  const db = await getD1();
  const slug = uniqueSlug(`${input.publicName}-${input.category}-${input.cityName ?? "regional"}`);
  const result = await db.prepare(`INSERT INTO organizations
    (public_name, slug, category, city_name, public_phone, address, cnes_code, summary, services, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`)
    .bind(input.publicName, slug, input.category, input.cityName ?? null, input.publicPhone ?? null,
      input.address ?? null, input.cnesCode ?? null, input.summary ?? null, input.services ?? null,
      input.status ?? "draft")
    .first<{ id: number }>();
  return result?.id;
}

export async function setDirectoryStatus(entity: DirectoryEntity, id: number, status: DirectoryStatus, actorEmail?: string) {
  const db = await getD1();
  const table = entity === "professional" ? "professionals" : "organizations";
  await db.batch([
    db.prepare(`UPDATE ${table} SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).bind(status, id),
    db.prepare("INSERT INTO audit_log (entity_type, entity_id, action, actor_email, detail) VALUES (?, ?, ?, ?, ?)")
      .bind(entity, id, `status:${status}`, actorEmail ?? null, null),
  ]);
}

export async function removeDirectory(entity: DirectoryEntity, id: number, actorEmail?: string) {
  const db = await getD1();
  const table = entity === "professional" ? "professionals" : "organizations";
  await db.batch([
    db.prepare(`DELETE FROM ${table} WHERE id = ?`).bind(id),
    db.prepare("INSERT INTO audit_log (entity_type, entity_id, action, actor_email, detail) VALUES (?, ?, ?, ?, ?)")
      .bind(entity, id, "deleted", actorEmail ?? null, null),
  ]);
}
