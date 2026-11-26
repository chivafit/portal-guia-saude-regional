"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

/** No app usa a janela de compartilhar do sistema; no navegador, a Web Share API ou copia o link. */
export function ProfileShareButton({ name, url }: { name: string; url: string }) {
  const [message, setMessage] = useState("");
  async function share() {
    const title = `${name} | Guia Saúde`;
    try {
      const { Capacitor } = await import("@capacitor/core");
      if (Capacitor.isNativePlatform()) {
        const { Share } = await import("@capacitor/share");
        await Share.share({ title, url, dialogTitle: "Compartilhar perfil" });
        return;
      }
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setMessage("Link do perfil copiado");
      window.setTimeout(() => setMessage(""), 2600);
    } catch {
      // A pessoa fechou a janela de compartilhar: nada a fazer.
    }
  }
  return <div className="profile-share"><button type="button" onClick={() => void share()}><Share2 size={16} /> Compartilhar</button><span aria-live="polite">{message}</span></div>;
}
