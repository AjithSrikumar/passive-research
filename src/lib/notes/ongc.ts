import type { ResearchNote } from "./types";

export const ongcNote: ResearchNote = {
  slug: "ongc",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹295", sub: "vs ₹237.3 current" },
    { label: "Implied upside", value: "+24.3%" },
    { label: "Market cap", value: "₹2,99,000 Cr", sub: "≈ 1,258 bn shares" },
    { label: "TTM P/E (actual)", value: "~6.9x", sub: "FY27E EPS ~₹35-37 (E)" },
    { label: "Q1 FY27 PAT", value: "₹6,554 Cr (cons)", sub: "cons PAT incl. OMPL; crude-linked" },
    { label: "Q1 FY27 realisation", value: "$99.45/bbl", sub: "strong crude realisation +~50% YoY" },
    { label: "Dividend", value: "₹13.25", sub: "FY26 total; yield ~5.6%" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (4 Aug 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 consolidated PAT", value: "₹6,554 Cr", sub: "incl. HPCL/ONGC segments; softer" },
            { label: "Standalone upstream PAT", value: "~₹17,034 Cr", sub: "crude realisations ~$99/bbl" },
            { label: "Q1 crude realisation", value: "~$99.45/bbl", sub: "high; on strength in Brent" },
            { label: "FY26 dividend", value: "₹13.25", sub: "incl. interim; strong cash return" },
            { label: "Subsidiaries", value: "HPCL, OMPL, ONGC Videsh", sub: "downstream drag/upside" },
            { label: "Production", value: "~stable", sub: "crude ~600k bpd + gas" },
          ],
        },
        {
          type: "p",
          text:
            "ONGC reported Q1 FY27 on 4 August 2026: **consolidated PAT of ₹6,554 Cr** (driven by strong crude realisations at ~$99/bbl) — a sharp jump YoY as realisations recovered. The stock at ₹237.3 (mcap ~₹2.99 lakh Cr) trades ~6.9x TTM earnings with a ~5.6% dividend yield.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We rate **Buy** with a target of **₹295 (~8.5x FY27E EPS ~₹35, E)** — above the street average (~₹276-295 across ~30 analysts). The upstream earnings are crude-linked, while the downstream (HPCL) position is a quality offset. The high yield underwrites value.",
        },
      ],
    },
    {
      id: "variant-perception",
      label: "Variant perception",
      blocks: [
        {
          type: "p",
          text:
            "ONGC's debates: (i) **crude price beta** — the earnings are a brutal crude play; (ii) **production stagnation** — volumes are flat; (iii) **downstream drag** — owning HPCL reduces the upstream alpha; (iv) **state-owned discount** — the PSU structure limits re-rating but enables generous cash returns.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Crude price",
              "Peaking",
              "Range $75-95 supports",
              "FY26 realisation $99; APM floors",
            ],
            [
              "Production",
              "Declining",
              "Stable + asset monetisation",
              "crude ~600kbpd; gas stable",
            ],
            [
              "HPCL slot",
              "Discount",
              "Offset (swap optional)",
              "cash return supports",
            ],
          ],
        },
      ],
    },
    {
      id: "investment-drivers",
      label: "Three investment drivers",
      blocks: [
        {
          type: "drivers",
          rows: [
            {
              driver: "1. Crude price realisation beta",
              evidence: "Brent strength; ONGC realisations ~$99/bbl in Q1; India's largest upstream producer.",
              consequence: "Every $10/bbl on realised price ≈ +₹7-9 EPS (~₹55-70 Cr per bbl-move) — the equity is a leveraged crude play.",
              monitor: "Brent, realisations, differential, PSU pricing mechanism.",
            },
            {
              driver: "2. Gas monetisation & discovery cycle",
              evidence: "KG basin + new explorations; gas volumes rising; LNG import substitution.",
              consequence: "Gas growth offsets crude plateau; ~1.2x revenue stability from gas-linked contracts.",
              monitor: "Gas output, exploration results, domestic APM realisation.",
            },
            {
              driver: "3. Yield + balance-sheet strength",
              evidence: "Dividend ₹13.25, net cash; high payout; sovereign-promoted investment.",
              consequence: "At ~6.9x with ~5.6% yield, valuation is supported by owned cash — re-rating adds.",
              monitor: "Payout policy, buybacks, capex (deep-water), FCF.",
            },
          ],
        },
      ],
    },
    {
      id: "business-inflection",
      label: "Business inflection point",
      blocks: [
        {
          type: "p",
          text:
            "ONGC's inflection is the **crude-price upcycle plus production optionality**: after a soft FY25, FY26 saw realisations rebound (~$99 vs ~$66), pulling standalone earnings up sharply while dividends/production hold steady. The upstream probably delivered its best quarter in years.",
        },
      ],
    },
    {
      id: "catalysts",
      label: "Catalysts",
      blocks: [
        {
          type: "list",
          items: [
            {
              lead: "Q2 FY27 (early Nov 2026)",
              text: "Crude momentum, production/discovery updates, and dividend declarations will drive the name.",
            },
          ],
        },
      ],
    },
    {
      id: "investment-thesis",
      label: "Investment thesis",
      blocks: [
        {
          type: "callout",
          tone: "key",
          title: "Buy — ₹295 target",
          text:
            "ONGC gives you crude leverage, a ~5.6% yield and a cheap ~6.9x multiple. A modified best-case crude + stable production is sufficient for 20%+ upside. Quality at a PSU discount.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) crude price crash; (2) production decline accelerating; (3) downstream (HPCL) losses; (4) PSU policy/divestment; (5) rupee/energy cyclicality.",
        },
      ],
    },
  ],
};