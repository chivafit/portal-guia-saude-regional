"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { CheckCircle2, FileImage, KeyRound, LoaderCircle, Search, ShieldCheck, Upload } from "lucide-react";

type Profile = { slug: string; name: string; profession: string; specialty: string; city: string; imageUrl: string };
type Props = { profiles: Profile[] };

const REPOSITORY = "chivafit/portal-guia-saude-regional";
const BRANCH = "main";
const OVERRIDES_PATH = "lib/data/professional-photo-overrides.json";
const MAX_SIZE = 5 * 1024 * 1024;

function contentHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token.trim()}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

function decodeBase64(value: string) {
  const clean = value.replace(/\n/g, "");
  const bytes = Uint8Array.from(atob(clean), (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeText(value: string) {
  return btoa(unescape(encodeURIComponent(value)));
}

async function encodeFile(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let result = "";
  const chunk = 0x8000;
  for (let start = 0; start < bytes.length; start += chunk) result += String.fromCharCode(...bytes.subarray(start, start + chunk));
  return btoa(result);
}

function extensionFor(file: File) {
  const byType: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
  return byType[file.type] ?? "jpg";
}

function profileLabel(profile: Profile) {
  return `${profile.name} — ${profile.profession}${profile.specialty ? ` · ${profile.specialty}` : ""}`;
}

export function PhotoUpdateManager({ profiles }: Props) {
  const [query, setQuery] = useState("");
  const [profileSlug, setProfileSlug] = useState("");
  const [token, setToken] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const selected = profiles.find((profile) => profile.slug === profileSlug) ?? null;
  const matches = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return profiles.slice(0, 12);
    return profiles.filter((profile) => profileLabel(profile).toLocaleLowerCase("pt-BR").includes(normalized)).slice(0, 12);
  }, [profiles, query]);

  function select(profile: Profile) {
    setProfileSlug(profile.slug);
    setQuery(profile.name);
    setNotice("");
    setError("");
  }

  function changeFile(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    setError("");
    setNotice("");
    if (!next) return;
    if (!/^image\/(jpeg|png|webp)$/.test(next.type)) {
      setFile(null);
      setPreview("");
      setError("Use uma imagem JPG, PNG ou WebP.");
      return;
    }
    if (next.size > MAX_SIZE) {
      setFile(null);
      setPreview("");
      setError("A imagem deve ter no máximo 5 MB.");
      return;
    }
    setFile(next);
    setPreview(URL.createObjectURL(next));
  }

  async function publish() {
    setNotice("");
    setError("");
    if (!selected) return setError("Escolha o profissional que receberá a foto.");
    if (!file) return setError("Selecione a nova foto do profissional.");
    if (!token.trim()) return setError("Informe seu token do GitHub para publicar a atualização.");

    setSaving(true);
    try {
      const headers = contentHeaders(token);
      const base = `https://api.github.com/repos/${REPOSITORY}/contents`;
      const account = await fetch("https://api.github.com/user", { headers });
      if (!account.ok) throw new Error("Não foi possível validar o token do GitHub. Gere um token com permissão de conteúdo neste repositório.");

      const overridesResponse = await fetch(`${base}/${OVERRIDES_PATH}?ref=${BRANCH}`, { headers });
      if (!overridesResponse.ok) throw new Error("Não foi possível abrir o catálogo de fotos do portal.");
      const overridesFile = await overridesResponse.json() as { content: string; sha: string };
      const overrides = JSON.parse(decodeBase64(overridesFile.content)) as Record<string, string>;
      const filePath = `public/professionals/${selected.slug}.${extensionFor(file)}`;
      const imageResponse = await fetch(`${base}/${filePath}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ message: `Atualiza foto de ${selected.name}`, content: await encodeFile(file), branch: BRANCH }),
      });
      if (!imageResponse.ok) throw new Error("A foto não foi enviada. Confira a permissão do token e tente novamente.");

      overrides[selected.slug] = `/${filePath.replace(/^public\//, "")}`;
      const updateResponse = await fetch(`${base}/${OVERRIDES_PATH}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ message: `Vincula foto de ${selected.name}`, content: encodeText(`${JSON.stringify(overrides, null, 2)}\n`), sha: overridesFile.sha, branch: BRANCH }),
      });
      if (!updateResponse.ok) throw new Error("A foto foi enviada, mas não foi possível vinculá-la ao perfil. Tente novamente para concluir.");

      setNotice(`Foto de ${selected.name} atualizada. Ela aparecerá no portal assim que a publicação automática terminar.`);
      setFile(null);
      setPreview("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível atualizar a foto.");
    } finally {
      setSaving(false);
    }
  }

  return <section className="photo-admin-shell">
    <div className="photo-admin-intro">
      <p className="eyebrow">GESTÃO EDITORIAL</p>
      <h1>Atualize fotos dos profissionais</h1>
      <p>Escolha um perfil, envie uma fotografia e publique a atualização. A foto atual só é substituída depois da confirmação.</p>
    </div>

    <div className="photo-admin-grid">
      <section className="photo-admin-card photo-admin-step">
        <div className="photo-admin-step-title"><span>1</span><div><h2>Escolha o profissional</h2><p>Busque por nome, profissão ou especialidade.</p></div></div>
        <label className="photo-search"><Search size={18} /><input value={query} onChange={(event) => { setQuery(event.target.value); setProfileSlug(""); }} placeholder="Ex.: Gabriela Oliveira" autoComplete="off" /></label>
        <div className="photo-profile-results" role="listbox" aria-label="Resultados da busca">
          {matches.map((profile) => <button type="button" key={profile.slug} className={profile.slug === profileSlug ? "selected" : ""} onClick={() => select(profile)}>
            <span className="photo-profile-thumb" style={profile.imageUrl ? { backgroundImage: `url(${profile.imageUrl})` } : undefined} />
            <span><strong>{profile.name}</strong><small>{profile.profession} · {profile.specialty}</small></span>
            {profile.slug === profileSlug ? <CheckCircle2 size={18} /> : null}
          </button>)}
          {!matches.length ? <p>Nenhum profissional encontrado.</p> : null}
        </div>
      </section>

      <section className="photo-admin-card photo-admin-step">
        <div className="photo-admin-step-title"><span>2</span><div><h2>Envie a nova foto</h2><p>JPG, PNG ou WebP, com no máximo 5 MB.</p></div></div>
        <label className={`photo-dropzone${preview ? " has-preview" : ""}`}>
          {preview ? <img src={preview} alt="Prévia da nova foto" /> : <><FileImage size={34} /><strong>Selecione uma imagem</strong><span>Prefira foto frontal, clara e sem textos sobrepostos.</span></>}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={changeFile} />
        </label>
        {file ? <p className="photo-file-name"><Upload size={15} /> {file.name}</p> : null}
      </section>

      <section className="photo-admin-card photo-admin-publish">
        <div className="photo-admin-step-title"><span>3</span><div><h2>Confirme e publique</h2><p>O token é usado somente nesta atualização e não é armazenado.</p></div></div>
        {selected ? <div className="photo-confirmation"><span className="photo-profile-thumb large" style={selected.imageUrl ? { backgroundImage: `url(${selected.imageUrl})` } : undefined} /><div><strong>{selected.name}</strong><small>{selected.profession} · {selected.specialty}</small></div></div> : <p className="photo-empty-selection">Selecione um profissional para continuar.</p>}
        <label className="photo-token"><KeyRound size={18} /><input type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Token do GitHub com permissão de conteúdo" autoComplete="off" spellCheck="false" /></label>
        <p className="photo-security"><ShieldCheck size={16} /> O token fica apenas nesta tela durante o envio e nunca é salvo pelo portal.</p>
        {error ? <p className="photo-message error">{error}</p> : null}
        {notice ? <p className="photo-message success">{notice}</p> : null}
        <button type="button" className="photo-publish-button" onClick={publish} disabled={saving || !selected || !file}>{saving ? <><LoaderCircle className="spin" size={18} /> Publicando foto...</> : "Publicar nova foto"}</button>
      </section>
    </div>
  </section>;
}
