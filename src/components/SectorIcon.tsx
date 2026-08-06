const icons: Record<string, React.ReactNode> = {
  banking: (
    <>
      <path d="M3 21h18M4 10h16M5 10v8m4.5-8v8M12 10v8m3.5-8v8M17 10v8M12 3 2.5 7h19L12 3z" />
    </>
  ),
  it: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" />
    </>
  ),
  consumer: (
    <>
      <path d="M6 7h12l1.5 13h-15L6 7z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </>
  ),
  durables: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 3l1.5 4M16 3l-1.5 4M10 14l3 3m0-3-3 3" />
    </>
  ),
  retail: (
    <>
      <path d="M3 9h18l-1.5 11a2 2 0 0 1-2 1.8h-11A2 2 0 0 1 4.5 20L3 9z" />
      <path d="M8 9v1.5a4 4 0 0 0 8 0V9" />
    </>
  ),
  healthcare: (
    <>
      <path d="M12 21C7 17 3 13.5 3 9.5A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9 3.5c0 4-4 7.5-9 11.5z" />
      <path d="M9.5 12h5M12 9.5v5" />
    </>
  ),
  pharma: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="5" />
      <path d="M10 12h4" />
    </>
  ),
  capital: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m9.9 9.9 2.1 2.1m0-14.1-2.1 2.1M7 16.9l-2.1 2.1" />
    </>
  ),
  industrials: (
    <>
      <path d="M3 21V9l5 4V9l5 4V9l5 4v8H3z" />
      <path d="M3 21h18M17 9V6h3v3" />
    </>
  ),
  chemicals: (
    <>
      <path d="M10 3v6L4.5 18a2.5 2.5 0 0 0 2.2 3.8h10.6A2.5 2.5 0 0 0 19.5 18L14 9V3" />
      <path d="M8 3h8M9 13h6" />
    </>
  ),
  automobiles: (
    <>
      <path d="M3 17l1.8-5.5A2 2 0 0 1 6.7 10h10.6a2 2 0 0 1 1.9 1.5L21 17" />
      <path d="M3 17h18v3h-3v-2H6v2H3v-3z" />
      <circle cx="7.5" cy="17" r="1.2" />
      <circle cx="16.5" cy="17" r="1.2" />
    </>
  ),
  financial: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M15 9.5c-.6-1-1.8-1.5-3-1.5-1.7 0-3 .8-3 2s1.1 1.8 3 2.2c1.9.4 3 .9 3 2.2 0 1.2-1.3 2-3 2-1.2 0-2.4-.5-3-1.5" />
    </>
  ),
  insurance: (
    <>
      <path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  realestate: (
    <>
      <path d="M3 21h18M5 21V8l7-5 7 5v13" />
      <path d="M10 21v-5h4v5M9 10h.01M15 10h.01M12 10h.01" />
    </>
  ),
  energy: (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1.5v3m0 15v3M1.5 12h3m15 0h3M4.6 4.6l2.1 2.1m10.6 10.6 2.1 2.1m0-14.8-2.1 2.1M6.7 17.3l-2.1 2.1" />
    </>
  ),
  oilgas: (
    <>
      <path d="M12 3c3.5 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.5-6 6-10z" />
      <path d="M10 13a2 2 0 0 0 2 2" />
    </>
  ),
  utilities: (
    <>
      <path d="M13 2 5 13h6l-1 9 8-11h-6l1-9z" />
    </>
  ),
  telecom: (
    <>
      <path d="M7 5a9.9 9.9 0 0 1 10 0M9.5 8.5a5.8 5.8 0 0 1 5 0" />
      <path d="M12 12h.01M2 12h.01M22 12h.01M12 2v.01M12 22v.01M4 4h.01M20 20h.01M4 20h.01M20 4h.01" />
    </>
  ),
  media: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9l5 3-5 3V9z" />
    </>
  ),
  metals: (
    <>
      <path d="M4 17l8 4 8-4M4 13l8 4 8-4M4 9l8 4 8-4M12 3l8 4-8 4-8-4 8-4z" />
    </>
  ),
  mining: (
    <>
      <path d="M3 21h18M4 21l4.5-9 4.5 6 3-7L21 21" />
      <path d="M12 21v-6" />
    </>
  ),
  textiles: (
    <>
      <path d="M12 3v18M7 5c0 3 10 3 10 0M7 9c0 3 10 3 10 0M7 13c0 3 10 3 10 0M7 17c0 3 10 3 10 0" />
    </>
  ),
  infrastructure: (
    <>
      <path d="M8 21v-4h8v4M3 21h18M4 17h16M6 17v-6m12 6v-6M3 8l9-5 9 5-9 4-9-4z" />
      <path d="M12 8h.01" />
    </>
  ),
};

export default function SectorIcon({
  name,
  size = 22,
}: {
  name: string;
  size?: number;
}) {
  return (
    <svg
      className="sector-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {icons[name] ?? icons.consumer}
    </svg>
  );
}