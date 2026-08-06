import { getCompanyBySlug, getReportSections } from "@/lib/store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) {
    return Response.json({ error: "Company not found", slug }, { status: 404 });
  }
  const sections = await getReportSections(slug);
  return Response.json({
    company,
    sections: sections ?? null,
    generatedAt: new Date().toISOString(),
  });
}