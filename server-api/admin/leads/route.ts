import { getChatGPTUser } from "@/app/chatgpt-auth";
import { listContactLeads } from "@/lib/leads";

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Autenticação necessária" }, { status: 401 });
  const items = await listContactLeads();
  return Response.json({ items, user });
}
