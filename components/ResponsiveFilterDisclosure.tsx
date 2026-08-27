"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ResponsiveFilterDisclosure({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 821px)");
    const update = () => {
      if (!ref.current) return;
      ref.current.open = media.matches;
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return <details ref={ref} className="filter-disclosure">{children}</details>;
}
