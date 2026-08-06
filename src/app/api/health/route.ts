import { getDbStatus } from "@/lib/store";

export async function GET() {
  const status = await getDbStatus();
  return Response.json({
    ok: status.configured && status.reachable,
    service: "db",
    configured: status.configured,
    reachable: status.reachable,
    counts: {
      companies: status.companies,
      sectors: status.sectors,
      reportSections: status.reportSections,
    },
    timestamp: new Date().toISOString(),
  });
}