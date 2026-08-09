"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const PALETTE = [
  "#3b6ea5",
  "#7a5ca8",
  "#2e8b74",
  "#b0713a",
  "#a24d5e",
  "#4d7c46",
  "#5a6bb5",
  "#8a6a4f",
  "#3a8a9e",
  "#996f4a",
];

const hashColor = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
};

/** Company logo for factor-universe rows: renders /logos/<ticker>.png with a
 *  deterministic initials fallback when the logo is missing. */
export default function TickerLogo({
  ticker,
  name,
  size = 28,
}: {
  ticker: string;
  name: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  const initials = useMemo(
    () =>
      name
        .split(" ")
        .filter((w) => w.length > 2 || /^[A-Z]/.test(w))
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join(""),
    [name]
  );

  if (failed) {
    return (
      <span
        className="company-logo"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${hashColor(name)} 0%, ${hashColor(name)}cc 100%)`,
          fontSize: Math.round(size * 0.36),
          flexShrink: 0,
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
      style={{ width: size, height: size, flexShrink: 0 }}
      aria-hidden
    >
      <Image
        src={`/logos/${ticker}.png`}
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
