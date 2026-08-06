import type { Company } from "@/lib/companies";

export default function CompanyLogo({
  company,
  size = 52,
}: {
  company: Company;
  size?: number;
}) {
  const initials = company.name
    .split(" ")
    .filter((w) => w.length > 2 || /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <span
      className="company-logo"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${company.logoColor} 0%, ${company.logoColor}cc 100%)`,
        fontSize: Math.round(size * 0.36),
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}