import { createInclusionRequest } from "@/lib/inclusion";

export async function POST(request: Request) {
  const data = await request.json() as Record<string, string>;
  if (!data.entityType || !data.name || !data.contactName || !data.contactPhone) {
    return Response.json({ error: "Preencha tipo, nome, responsável e telefone." }, { status: 400 });
  }
  try {
    const id = await createInclusionRequest({
      entityType: data.entityType,
      name: data.name,
      category: data.category,
      cityName: data.cityName,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      message: data.message,
    });
    return Response.json({ id, ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Não foi possível enviar a solicitação agora." }, { status: 500 });
  }
}
