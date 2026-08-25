import { getChatGPTUser } from "@/app/chatgpt-auth";
import { listInclusionRequests, removeInclusionRequest, setInclusionStatus } from "@/lib/inclusion";

export async function GET(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const url = new URL(request.url);
  const items = await listInclusionRequests({ status: url.searchParams.get("status") ?? undefined });
  return Response.json({ items, user });
}

export async function PATCH(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const data = await request.json() as { id: number; status: string };
  await setInclusionStatus(Number(data.id), data.status, user.email);
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return Response.json({ error: "ID inválido" }, { status: 400 });
  await removeInclusionRequest(id, user.email);
  return Response.json({ ok: true });
}
