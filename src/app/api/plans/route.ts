import { getData } from "../../../lib/data";

export async function GET() {
  return Response.json(getData("plans.json"));
}
