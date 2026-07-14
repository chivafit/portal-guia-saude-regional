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

export type PublicProfessional = {
  slug: string; name: string; profession: string; specialty: string; city: string;
  organization: string; registration: string; verified: boolean; summary: string;
  phone: string; whatsapp: string; services: string[];
};

export type PublicOrganization = {
  slug: string; name: string; category: string; city: string; address: string;
  phone: string; summary: string; services: string[];
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

export async function updateProfessional(id: number, input: {
  publicName: string; profession: string; specialty?: string; cityName?: string;
  organizationName?: string; publicPhone?: string; whatsapp?: string; councilAcronym?: string;
  councilState?: string; registrationNumber?: string; summary?: string; services?: string; status?: DirectoryStatus;
}, actorEmail?: string) {
  const db = await getD1();
  await db.batch([
    db.prepare(`UPDATE professionals SET
      public_name = ?, profession = ?, specialty = ?, city_name = ?, organization_name = ?,
      public_phone = ?, whatsapp = ?, council_acronym = ?, council_state = ?,
      registration_number = ?, summary = ?, services = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`)
      .bind(input.publicName, input.profession, input.specialty ?? null, input.cityName ?? null,
        input.organizationName ?? null, input.publicPhone ?? null, input.whatsapp ?? null,
        input.councilAcronym ?? null, input.councilState ?? null, input.registrationNumber ?? null,
        input.summary ?? null, input.services ?? null, input.status ?? "draft", id),
    db.prepare("INSERT INTO audit_log (entity_type, entity_id, action, actor_email, detail) VALUES (?, ?, ?, ?, ?)")
      .bind("professional", id, "updated", actorEmail ?? null, null),
  ]);
}

export async function updateOrganization(id: number, input: {
  publicName: string; category: string; cityName?: string; publicPhone?: string; address?: string;
  cnesCode?: string; summary?: string; services?: string; status?: DirectoryStatus;
}, actorEmail?: string) {
  const db = await getD1();
  await db.batch([
    db.prepare(`UPDATE organizations SET
      public_name = ?, category = ?, city_name = ?, public_phone = ?, address = ?,
      cnes_code = ?, summary = ?, services = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`)
      .bind(input.publicName, input.category, input.cityName ?? null, input.publicPhone ?? null,
        input.address ?? null, input.cnesCode ?? null, input.summary ?? null,
        input.services ?? null, input.status ?? "draft", id),
    db.prepare("INSERT INTO audit_log (entity_type, entity_id, action, actor_email, detail) VALUES (?, ?, ?, ?, ?)")
      .bind("organization", id, "updated", actorEmail ?? null, null),
  ]);
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

function splitServices(value: string | null) {
  return (value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
}

function registration(item: AdminProfessional) {
  const council = [item.councilAcronym, item.councilState].filter(Boolean).join("-");
  return [council, item.registrationNumber].filter(Boolean).join(" · ") || "Registro aguardando validação";
}

export async function publishedProfessionals(fallback: PublicProfessional[] = []) {
  try {
    const items = await listDirectory("professional", { status: "published" }) as AdminProfessional[];
    if (!items.length) return fallback;
    return items.map((item): PublicProfessional => ({
      slug: item.slug,
      name: item.publicName,
      profession: item.profession,
      specialty: item.specialty ?? item.profession,
      city: item.cityName ?? "Regional",
      organization: item.organizationName ?? "Local de atendimento informado no perfil",
      registration: registration(item),
      verified: true,
      summary: item.summary ?? "Perfil publicado pela equipe Guia Saúde após revisão editorial.",
      phone: item.publicPhone ?? "Contato não informado",
      whatsapp: item.whatsapp ?? "#",
      services: splitServices(item.services),
    }));
  } catch {
    return fallback;
  }
}

export async function publishedOrganizations(fallback: PublicOrganization[] = []) {
  try {
    const items = await listDirectory("organization", { status: "published" }) as AdminOrganization[];
    if (!items.length) return fallback;
    return items.map((item): PublicOrganization => ({
      slug: item.slug,
      name: item.publicName,
      category: item.category,
      city: item.cityName ?? "Regional",
      address: item.address ?? "Endereço aguardando validação",
      phone: item.publicPhone ?? "Contato não informado",
      summary: item.summary ?? "Cadastro publicado pela equipe Guia Saúde após revisão editorial.",
      services: splitServices(item.services),
    }));
  } catch {
    return fallback;
  }
}

export async function findPublishedProfessional(slug: string, fallback: PublicProfessional[] = []) {
  const items = await publishedProfessionals(fallback);
  return items.find((item) => item.slug === slug) ?? null;
}
