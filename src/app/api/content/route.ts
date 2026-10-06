import { getData } from "../../../lib/data";

// generic content endpoint so client components can load the cms
export async function GET(request: Request) {
  const file = new URL(request.url).searchParams.get("file") ?? "";
  if (!file.endsWith(".json") || file.includes("..")) return Response.json([], { status: 400 });
  return Response.json(getData(file));
}
