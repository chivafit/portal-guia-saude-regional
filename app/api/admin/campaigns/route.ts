import { getChatGPTUser } from "@/app/chatgpt-auth";
import { createCampaign, listCampaigns, removeCampaign, setCampaignStatus } from "@/lib/campaigns";

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  return Response.json({ items: await listCampaigns(), user });
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const data = await request.json() as Record<string, string>;
  if (!data.advertiserName || !data.name || !data.positionCode || !data.destinationUrl) {
    return Response.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
  }
  const id = await createCampaign({
    advertiserName: data.advertiserName,
    name: data.name,
    positionCode: data.positionCode,
    citySlug: data.citySlug,
    startsAt: data.startsAt,
    endsAt: data.endsAt,
    destinationUrl: data.destinationUrl,
    imageUrl: data.imageUrl,
    status: data.status,
  });
  return Response.json({ id }, { status: 201 });
}

export async function PATCH(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const data = await request.json() as { id: number; status: string };
  await setCampaignStatus(Number(data.id), data.status, user.email);
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return Response.json({ error: "ID inválido" }, { status: 400 });
  await removeCampaign(id, user.email);
  return Response.json({ ok: true });
}
