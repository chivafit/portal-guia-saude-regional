export const favoritesStorageKey = "guia-saude:favorites:v1";
export const favoritesChangedEvent = "guia-saude:favorites-change";

export type FavoriteProfessional = {
  slug: string;
  name: string;
  profession: string;
  specialty: string;
  city: string;
  organization: string;
  imageUrl?: string;
};

export function readFavorites(): FavoriteProfessional[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(favoritesStorageKey);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is FavoriteProfessional => (
      typeof item === "object" && item !== null
      && typeof (item as FavoriteProfessional).slug === "string"
      && typeof (item as FavoriteProfessional).name === "string"
    ));
  } catch {
    return [];
  }
}

export function writeFavorites(favorites: FavoriteProfessional[]) {
  window.localStorage.setItem(favoritesStorageKey, JSON.stringify(favorites));
  window.dispatchEvent(new CustomEvent(favoritesChangedEvent));
}
