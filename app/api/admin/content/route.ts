import { getChatGPTUser } from "@/app/chatgpt-auth";
import { createContent, listContent, removeContent, setContentStatus, type ContentStatus, type ContentType } from "@/lib/content";

async function authorized() { return getChatGPTUser(); }

export async function GET(request: Request) {
  const user = await authorized();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const url = new URL(request.url);
  const items = await listContent({ type: url.searchParams.get("type") ?? undefined });
  return Response.json({ items, user });
}

export async function POST(request: Request) {
  const user = await authorized();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const data = await request.json() as Record<string, string>;
  if (!data.type || !data.title) return Response.json({ error: "Tipo e título são obrigatórios" }, { status: 400 });
  const slug = (data.slug || data.title).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  try {
    const id = await createContent({ type: data.type as ContentType, title: data.title, slug: `${slug}-${Date.now().toString(36)}`, summary: data.summary, body: data.body, citySlug: data.citySlug, metadata: data.metadata, status: (data.status || "draft") as ContentStatus, authorEmail: user.email });
    return Response.json({ id }, { status: 201 });
  } catch { return Response.json({ error: "Não foi possível salvar o conteúdo" }, { status: 500 }); }
}

export async function PATCH(request: Request) {
  const user = await authorized();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const data = await request.json() as { id: number; status: ContentStatus };
  await setContentStatus(Number(data.id), data.status, user.email);
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const user = await authorized();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return Response.json({ error: "ID inválido" }, { status: 400 });
  await removeContent(id, user.email);
  return Response.json({ ok: true });
}
