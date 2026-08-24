// Atribuição determinística de avatar ilustrado a partir do slug do perfil.
// Mesmo perfil recebe sempre o mesmo avatar. Gerados por scripts/generate-avatars.mjs.
export const AVATAR_COUNT = 16;

const PLACEHOLDER = "/placeholders/professional-photo.svg";

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
}

export function avatarForSlug(slug: string): string {
  const index = (hash(slug) % AVATAR_COUNT) + 1;
  return `/avatars/av-${String(index).padStart(2, "0")}.svg`;
}

// Retorna a imagem real do perfil quando houver; caso contrário, um avatar ilustrado.
// O placeholder cinza genérico é tratado como "sem imagem".
export function resolveProfessionalImage(slug: string, imageUrl?: string): string {
  if (imageUrl && imageUrl !== PLACEHOLDER) return imageUrl;
  return avatarForSlug(slug);
}
