"use client";

import { useState } from "react";
import Image from "next/image";
import type { Company } from "@/lib/companies";

export default function CompanyLogo({
  company,
  size = 52,
}: {
  company: Company;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  const initials = company.name
    .split(" ")
    .filter((w) => w.length > 2 || /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  if (failed) {
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

  return (
    <span
      className="company-logo"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image
        src={`/logos/${company.ticker}.png`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        unoptimized
        onError={() => setFailed(true)}
      />
    </span>
  );
}
