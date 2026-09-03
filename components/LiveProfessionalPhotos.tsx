"use client";

import { useEffect } from "react";

type PhotoOverrides = Record<string, string>;

const PHOTO_MAP_URL = "https://raw.githubusercontent.com/chivafit/portal-guia-saude-regional/main/lib/data/professional-photo-overrides.json";

function slugFromHref(href: string) {
  const match = href.match(/\/profissionais\/([^/?#]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : "";
}

function applyPhoto(element: HTMLElement, imageUrl: string) {
  element.style.backgroundImage = `url(${imageUrl}?v=${Date.now()})`;
  element.classList.add("has-photo");
  element.classList.remove("profile-clean-initials");
  if (element.classList.contains("profile-clean-photo")) element.replaceChildren();
}

export function LiveProfessionalPhotos() {
  useEffect(() => {
    let cancelled = false;

    async function syncPhotos() {
      try {
        const response = await fetch(`${PHOTO_MAP_URL}?v=${Date.now()}`, { cache: "no-store" });
        if (!response.ok || cancelled) return;
        const overrides = await response.json() as PhotoOverrides;
        if (cancelled) return;

        document.querySelectorAll<HTMLElement>(".doctor-avatar, .city-featured-avatar, .featured-directory-avatar").forEach((avatar) => {
          const link = avatar.closest<HTMLAnchorElement>('a[href*="/profissionais/"]')
            ?? avatar.parentElement?.querySelector<HTMLAnchorElement>('a[href*="/profissionais/"]')
            ?? avatar.closest(".doctor-card")?.querySelector<HTMLAnchorElement>('a[href*="/profissionais/"]');
          const slug = link ? slugFromHref(link.getAttribute("href") ?? "") : "";
          if (slug && overrides[slug]) applyPhoto(avatar, overrides[slug]);
        });

        const profileMatch = window.location.pathname.match(/^\/profissionais\/([^/]+)/);
        const profileSlug = profileMatch?.[1] ? decodeURIComponent(profileMatch[1]) : "";
        const profilePhoto = document.querySelector<HTMLElement>(".profile-clean-photo");
        if (profileSlug && profilePhoto && overrides[profileSlug]) applyPhoto(profilePhoto, overrides[profileSlug]);
      } catch {
        // Mantém a foto renderizada no HTML caso a sincronização externa esteja indisponível.
      }
    }

    void syncPhotos();
    return () => { cancelled = true; };
  }, []);

  return null;
}
