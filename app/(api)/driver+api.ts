import { neon } from "@neondatabase/serverless";

/**
 * GET /api/driver endpoint
 * @param {Request} request the incoming request
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`SELECT * FROM drivers`;

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
