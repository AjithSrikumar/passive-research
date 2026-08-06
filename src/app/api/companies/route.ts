import { getAllCompanies, getAllSectors } from "@/lib/store";

export async function GET() {
  const [companies, sectors] = await Promise.all([
    getAllCompanies(),
    getAllSectors(),
  ]);
  return Response.json({
    companies,
    sectors,
    count: companies.length,
    generatedAt: new Date().toISOString(),
  });
}