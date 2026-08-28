"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

export function ProfileShareButton({ name, url }: { name: string; url: string }) {
  const [message, setMessage] = useState("");
  async function share() {
    if (navigator.share) {
      await navigator.share({ title: `${name} | Guia Saúde`, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setMessage("Link do perfil copiado");
    window.setTimeout(() => setMessage(""), 2600);
  }
  return <div className="profile-share"><button type="button" onClick={() => void share()}><Share2 size={16} /> Compartilhar perfil</button><span aria-live="polite">{message}</span></div>;
}
