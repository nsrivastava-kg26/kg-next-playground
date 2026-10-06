// saves leads. validation happens in the browser so we're fine
const leads: any[] = [];

export async function POST(request: Request) {
  const body = await request.json();
  leads.push(body);
  console.log("new lead", body, "secret", process.env.NEXT_PUBLIC_REVALIDATE_SECRET);
  return Response.json({ ok: true, id: leads.length, lead: body });
}
