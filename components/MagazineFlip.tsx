"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Revista digital: flipbook com efeito de virar página (StPageFlip),
// a partir das imagens das páginas geradas do PDF.
export function MagazineFlip({ pages }: { pages: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<{ flipPrev: () => void; flipNext: () => void; destroy: () => void } | null>(null);
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let instance: any;
    (async () => {
      // @ts-expect-error page-flip não fornece tipos
      const mod = await import("page-flip");
      if (disposed || !containerRef.current) return;
      const PageFlip = mod.PageFlip;
      instance = new PageFlip(containerRef.current, {
        width: 380,
        height: 533,
        size: "stretch",
        minWidth: 255,
        maxWidth: 640,
        minHeight: 357,
        maxHeight: 897,
        showCover: true,
        drawShadow: true,
        maxShadowOpacity: 0.5,
        flippingTime: 700,
        mobileScrollSupport: true,
      });
      instance.loadFromImages(pages);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      instance.on("flip", (event: any) => setPage(Number(event.data) || 0));
      flipRef.current = instance;
      setReady(true);
    })();
    return () => {
      disposed = true;
      try {
        instance?.destroy();
      } catch {
        // ignore
      }
    };
  }, [pages]);

  const total = pages.length;

  return (
    <div className="magazine-flip">
      <div ref={containerRef} className="magazine-flip-book" aria-label="Revista digital — páginas" />
      <div className="magazine-flip-controls">
        <button type="button" onClick={() => flipRef.current?.flipPrev()} aria-label="Página anterior"><ChevronLeft size={18} /></button>
        <span>{ready ? `${Math.min(page + 1, total)} / ${total}` : "Carregando…"}</span>
        <button type="button" onClick={() => flipRef.current?.flipNext()} aria-label="Próxima página"><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
