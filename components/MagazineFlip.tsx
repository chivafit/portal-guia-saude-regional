"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, WifiOff } from "lucide-react";

// As páginas da revista não vão no pacote dos aplicativos (scripts/strip-app-magazine.mjs):
// dentro do app elas são lidas do site.
const SITE_ORIGIN = "https://www.guiasaude.app.br";
// Imagem vazia usada até a página chegar perto da leitura.
const PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
// Páginas carregadas antes e depois da que está aberta (na tela larga aparecem duas por vez).
const BEHIND = 2;
const AHEAD = 4;

type FlipPage = { image: HTMLImageElement; isLoad: boolean };
type FlipInstance = {
  loadFromImages: (images: string[]) => void;
  on: (event: string, callback: (event: { data: unknown }) => void) => void;
  getPage?: (index: number) => FlipPage;
  flipPrev: () => void;
  flipNext: () => void;
  destroy: () => void;
};

// Revista digital: flipbook com efeito de virar página (StPageFlip),
// a partir das imagens das páginas geradas do PDF.
export function MagazineFlip({ pages }: { pages: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<FlipInstance | null>(null);
  const sourcesRef = useRef<string[]>(pages);
  const requestedRef = useRef(new Set<number>());
  const failedRef = useRef(new Set<number>());
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(false);
  const [offline, setOffline] = useState(false);

  // Troca a imagem vazia pela página real quando ela chega perto da leitura.
  const requestAround = useCallback((index: number) => {
    const instance = flipRef.current;
    if (!instance?.getPage) return;
    const sources = sourcesRef.current;
    for (let i = Math.max(0, index - BEHIND); i <= Math.min(sources.length - 1, index + AHEAD); i++) {
      if (requestedRef.current.has(i)) continue;
      requestedRef.current.add(i);
      const item = instance.getPage(i);
      item.isLoad = false;
      item.image.onload = () => {
        item.isLoad = true;
        failedRef.current.delete(i);
        if (!failedRef.current.size) setOffline(false);
      };
      item.image.onerror = () => {
        failedRef.current.add(i);
        requestedRef.current.delete(i);
        setOffline(true);
      };
      item.image.src = sources[i];
    }
  }, []);

  useEffect(() => {
    let disposed = false;
    let instance: FlipInstance | undefined;
    requestedRef.current = new Set();
    failedRef.current = new Set();
    (async () => {
      const [{ Capacitor }, mod] = await Promise.all([
        import("@capacitor/core"),
        // @ts-expect-error page-flip não fornece tipos
        import("page-flip"),
      ]);
      if (disposed || !containerRef.current) return;
      sourcesRef.current = Capacitor.isNativePlatform() ? pages.map((src) => `${SITE_ORIGIN}${src}`) : pages;
      instance = new mod.PageFlip(containerRef.current, {
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
      }) as FlipInstance;
      flipRef.current = instance;
      // Sem acesso às páginas internas, carrega tudo de uma vez (comportamento original).
      instance.loadFromImages(instance.getPage ? pages.map(() => PLACEHOLDER) : sourcesRef.current);
      requestAround(0);
      instance.on("flip", (event) => {
        const index = Number(event.data) || 0;
        setPage(index);
        requestAround(index);
      });
      setReady(true);
    })();
    return () => {
      disposed = true;
      flipRef.current = null;
      try {
        instance?.destroy();
      } catch {
        // ignore
      }
    };
  }, [pages, requestAround]);

  const total = pages.length;

  return (
    <div className="magazine-flip">
      <div ref={containerRef} className="magazine-flip-book" aria-label="Revista digital — páginas" />
      {offline ? (
        <p className="magazine-flip-offline" role="status">
          <WifiOff size={16} />
          <span>Sem conexão: as páginas da revista precisam de internet.</span>
          <button type="button" onClick={() => requestAround(page)}>Tentar novamente</button>
        </p>
      ) : null}
      <div className="magazine-flip-controls">
        <button type="button" onClick={() => flipRef.current?.flipPrev()} aria-label="Página anterior"><ChevronLeft size={18} /></button>
        <span>{ready ? `${Math.min(page + 1, total)} / ${total}` : "Carregando…"}</span>
        <button type="button" onClick={() => flipRef.current?.flipNext()} aria-label="Próxima página"><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
