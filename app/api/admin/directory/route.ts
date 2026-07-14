import { getChatGPTUser } from "@/app/chatgpt-auth";
import {
  createOrganization,
  createProfessional,
  listDirectory,
  removeDirectory,
  setDirectoryStatus,
  updateOrganization,
  updateProfessional,
  type DirectoryEntity,
  type DirectoryStatus,
} from "@/lib/directory";

function parseEntity(value: string | null): DirectoryEntity {
  return value === "organization" ? "organization" : "professional";
}

export async function GET(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const url = new URL(request.url);
  const entity = parseEntity(url.searchParams.get("entity"));
  const items = await listDirectory(entity, { status: url.searchParams.get("status") ?? undefined });
  return Response.json({ items, entity, user });
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const data = await request.json() as Record<string, string>;
  const entity = parseEntity(data.entity);
  try {
    if (entity === "professional") {
      if (!data.publicName || !data.profession) return Response.json({ error: "Nome e profissão são obrigatórios" }, { status: 400 });
      const id = await createProfessional({
        publicName: data.publicName,
        profession: data.profession,
        specialty: data.specialty,
        cityName: data.cityName,
        organizationName: data.organizationName,
        publicPhone: data.publicPhone,
        whatsapp: data.whatsapp,
        councilAcronym: data.councilAcronym,
        councilState: data.councilState,
        registrationNumber: data.registrationNumber,
        summary: data.summary,
        services: data.services,
        imageUrl: data.imageUrl,
        coverImageUrl: data.coverImageUrl,
        logoUrl: data.logoUrl,
        status: (data.status || "draft") as DirectoryStatus,
      });
      return Response.json({ id }, { status: 201 });
    }
    if (!data.publicName || !data.category) return Response.json({ error: "Nome e categoria são obrigatórios" }, { status: 400 });
    const id = await createOrganization({
      publicName: data.publicName,
      category: data.category,
      cityName: data.cityName,
      publicPhone: data.publicPhone,
      address: data.address,
      cnesCode: data.cnesCode,
      summary: data.summary,
      services: data.services,
      logoUrl: data.logoUrl,
      coverImageUrl: data.coverImageUrl,
      status: (data.status || "draft") as DirectoryStatus,
    });
    return Response.json({ id }, { status: 201 });
  } catch {
    return Response.json({ error: "Não foi possível salvar o cadastro" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const data = await request.json() as { id: number; entity?: string; status: DirectoryStatus };
  await setDirectoryStatus(parseEntity(data.entity ?? null), Number(data.id), data.status, user.email);
  return Response.json({ ok: true });
}

export async function PUT(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const data = await request.json() as Record<string, string>;
  const entity = parseEntity(data.entity);
  const id = Number(data.id);
  if (!id) return Response.json({ error: "ID inválido" }, { status: 400 });
  try {
    if (entity === "professional") {
      if (!data.publicName || !data.profession) return Response.json({ error: "Nome e profissão são obrigatórios" }, { status: 400 });
      await updateProfessional(id, {
        publicName: data.publicName,
        profession: data.profession,
        specialty: data.specialty,
        cityName: data.cityName,
        organizationName: data.organizationName,
        publicPhone: data.publicPhone,
        whatsapp: data.whatsapp,
        councilAcronym: data.councilAcronym,
        councilState: data.councilState,
        registrationNumber: data.registrationNumber,
        summary: data.summary,
        services: data.services,
        imageUrl: data.imageUrl,
        coverImageUrl: data.coverImageUrl,
        logoUrl: data.logoUrl,
        status: (data.status || "draft") as DirectoryStatus,
      }, user.email);
      return Response.json({ ok: true });
    }
    if (!data.publicName || !data.category) return Response.json({ error: "Nome e categoria são obrigatórios" }, { status: 400 });
    await updateOrganization(id, {
      publicName: data.publicName,
      category: data.category,
      cityName: data.cityName,
      publicPhone: data.publicPhone,
      address: data.address,
      cnesCode: data.cnesCode,
      summary: data.summary,
      services: data.services,
      logoUrl: data.logoUrl,
      coverImageUrl: data.coverImageUrl,
      status: (data.status || "draft") as DirectoryStatus,
    }, user.email);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Não foi possível atualizar o cadastro" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const url = new URL(request.url);
  const id = Number(url.searchParams.get("id"));
  if (!id) return Response.json({ error: "ID inválido" }, { status: 400 });
  await removeDirectory(parseEntity(url.searchParams.get("entity")), id, user.email);
  return Response.json({ ok: true });
}
