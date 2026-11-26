// Formatos públicos usados pela busca do portal.
export type PublicProfessional = {
  aliases?: string[];
  locations?: import("./data").ProfessionalLocation[];
  slug: string; name: string; profession: string; specialty: string; city: string;
  organization: string; registration: string; verified: boolean; summary: string;
  phone: string; whatsapp: string; services: string[]; imageUrl?: string; coverImageUrl?: string; logoUrl?: string; source?: string;
  featured?: boolean; sponsored?: boolean; displayOrder?: number;
};

export type PublicOrganization = {
  slug: string; name: string; aliases?: string[]; category: string; city: string; address: string;
  phone: string; whatsapp?: string; summary: string; services: string[]; logoUrl?: string; coverImageUrl?: string; source?: string;
  categoryKey?: string; subcategories?: string[]; keywords?: string[]; sourceUrls?: string[];
  lastVerifiedAt?: string; publicationStatus?: "draft" | "published" | "inactive";
  updatedAt?: string; hours?: string; neighborhood?: string; state?: string; postalCode?: string;
  website?: string; instagram?: string; mapUrl?: string;
  verificationStatus?: "public-source" | "official-source" | "direct-confirmation";
  relationship?: "organic" | "partner" | "sponsored"; featured?: boolean; sponsored?: boolean; displayOrder?: number;
};
