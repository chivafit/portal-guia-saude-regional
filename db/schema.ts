import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const cities = sqliteTable("cities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ibgeCode: text("ibge_code").notNull().unique(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
});

export const professionals = sqliteTable("professionals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  publicName: text("public_name").notNull(),
  slug: text("slug").notNull().unique(),
  profession: text("profession").notNull(),
  specialty: text("specialty"),
  cityId: integer("city_id").references(() => cities.id),
  councilAcronym: text("council_acronym"),
  councilState: text("council_state"),
  registrationNumber: text("registration_number"),
  organizationName: text("organization_name"),
  publicPhone: text("public_phone"),
  whatsapp: text("whatsapp"),
  cityName: text("city_name"),
  summary: text("summary"),
  services: text("services"),
  sourceUrl: text("source_url"),
  sourceDate: text("source_date"),
  status: text("status").notNull().default("imported"),
  reviewedBy: text("reviewed_by"),
  reviewedAt: text("reviewed_at"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const organizations = sqliteTable("organizations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  publicName: text("public_name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  cityId: integer("city_id").references(() => cities.id),
  cnesCode: text("cnes_code"),
  publicPhone: text("public_phone"),
  address: text("address"),
  cityName: text("city_name"),
  summary: text("summary"),
  services: text("services"),
  sourceUrl: text("source_url"),
  status: text("status").notNull().default("imported"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const sources = sqliteTable("sources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  entityType: text("entity_type").notNull(),
  entityId: integer("entity_id").notNull(),
  sourceType: text("source_type").notNull(),
  url: text("url").notNull(),
  retrievedAt: text("retrieved_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  supportedFields: text("supported_fields"),
});

export const campaigns = sqliteTable("campaigns", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  advertiserName: text("advertiser_name").notNull(),
  name: text("name").notNull(),
  positionCode: text("position_code").notNull(),
  citySlug: text("city_slug"),
  startsAt: text("starts_at").notNull(),
  endsAt: text("ends_at").notNull(),
  destinationUrl: text("destination_url").notNull(),
  imageUrl: text("image_url"),
  status: text("status").notNull().default("draft"),
});

export const auditLog = sqliteTable("audit_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  entityType: text("entity_type").notNull(),
  entityId: integer("entity_id").notNull(),
  action: text("action").notNull(),
  actorEmail: text("actor_email"),
  detail: text("detail"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const contentItems = sqliteTable("content_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary"),
  body: text("body"),
  status: text("status").notNull().default("draft"),
  citySlug: text("city_slug"),
  metadata: text("metadata"),
  authorEmail: text("author_email"),
  publishedAt: text("published_at"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const inclusionRequests = sqliteTable("inclusion_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  entityType: text("entity_type").notNull(),
  name: text("name").notNull(),
  category: text("category"),
  cityName: text("city_name"),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone").notNull(),
  message: text("message"),
  status: text("status").notNull().default("new"),
  source: text("source").notNull().default("portal"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
