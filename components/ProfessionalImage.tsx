"use client";

import { useState } from "react";
import manifest from "@/lib/data/professional-image-manifest.json";

type ManifestEntry = {
  width: number;
  height: number;
  avif: { width: number; src: string }[];
  webp: { width: number; src: string }[];
};

type ProfessionalImageProps = {
  src: string;
  alt?: string;
  sizes: string;
  eager?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

const imageManifest = manifest as Record<string, ManifestEntry>;

function srcSet(variants: { width: number; src: string }[]) {
  return variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");
}

export function ProfessionalImage({
  src,
  alt = "",
  sizes,
  eager = false,
  fetchPriority = eager ? "high" : "auto",
}: ProfessionalImageProps) {
  const [loaded, setLoaded] = useState(false);
  const optimized = imageManifest[src];

  return (
    <picture className="professional-image-picture">
      {optimized ? <source type="image/avif" srcSet={srcSet(optimized.avif)} sizes={sizes} /> : null}
      {optimized ? <source type="image/webp" srcSet={srcSet(optimized.webp)} sizes={sizes} /> : null}
      {/* A exportação estática usa o pipeline responsivo próprio acima. */}
      <img
        ref={(image) => { if (image?.complete) setLoaded(true); }}
        className={`professional-image${loaded ? " is-loaded" : ""}`}
        src={src}
        alt={alt}
        width={optimized?.width}
        height={optimized?.height}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={fetchPriority}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </picture>
  );
}
