import type { ResearchNote } from "./types";

export const nestleNote: ResearchNote = {
  slug: "nestle-india",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹1,592", sub: "vs ₹1,535 current" },
    { label: "Implied upside", value: "+3.7%" },
    { label: "Market cap", value: "₹2,89,000 Cr", sub: "≈ 188 bn shares (bonus-adjusted)" },
    { label: "TTM P/E (actual)", value: "~75.9x", sub: "FY26 EPS ₹19.8; rich" },
    { label: "FY26 revenue", value: "₹23,113 Cr", sub: "+14.7% YoY; strongest in years" },
    { label: "FY26 net income", value: "₹3,499 Cr", sub: "+9.1% YoY" },
    { label: "Q1 FY27 (Jul-26)", value: "Profit +48% YoY", sub: "Maggi/KitKat/Nescafe demand" },
    { label: "Dividend", value: "₹14", sub: "incl. interim; yield ~0.9%" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (22 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "FY26 revenue", value: "₹23,113 Cr", sub: "+14.7% YoY; volume-led growth" },
            { label: "FY26 net income", value: "₹3,499 Cr", sub: "+9.1% YoY" },
            { label: "Q1 FY27 (Jul 22)", value: "Profit +48% YoY", sub: "Maggi/KitKat/Nescafe strong" },
            { label: "Out-of-home/pet", value: "premium upside", sub: "new categories scaling" },
            { label: "Gross margin", value: "improving", sub: "input relief, premium mix" },
            { label: "Bonus / splits", value: "1:1 bonus Aug-25", sub: "share count doubled; EPS ₹19.8" },
          ],
        },
        {
          type: "p",
          text:
            "Nestlé India posted Q1 FY27 results on 22 July 2026 with **profit up ~48% YoY** on strong Maggi, KitKat and Nescafe demand — an acceleration from FY26's +14.7% revenue growth (₹23,113 Cr). The stock at ₹1,535 (mcap ₹2.89 lakh Cr) trades at ~76x TTM earnings, one of the most expensive staples globally.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We rate **Accumulate** with target **₹1,592** (36-analyst consensus average; +3.7%). The quality, brands and innovation are unmatched — but ~76x leaves little margin of safety; we prefer a buy on dips below ₹1,450.",
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
            "Nestlé India's debates: (i) **growth durability** — the +48% Q1 is flattered by a weak base; (ii) **valuation** — 76x TTM is a premium multiple even for FMCG; (iii) **rural vs urban** — the premium-heavy portfolio depends on urban consumption; (iv) **new categories** (pet food, coffee, out-of-home) which add optionality.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Q1 +48% profit",
              "Base-effect",
              "Genuine demand recovery",
              "volume-led + premium mix",
            ],
            [
              "76x P/E",
              "Unjustified",
              "Justified by quality",
              "brand equity, margins, growth",
            ],
            [
              "New categories",
              "Niche",
              "Scaling",
              "pet food, coffee, out-of-home",
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
              driver: "1. Volume-led growth with premium mix",
              evidence: "FY26 revenue +14.7%; Q1 FY27 profit +48%; Maggi/KitKat/Nescafe brands leading.",
              consequence: "Volume-led revenue growth + mix premiumisation → double-digit earnings CAGR.",
              monitor: "Volume vs price split, premium mix, rural growth, category trends.",
            },
            {
              driver: "2. Innovation & category expansion",
              evidence: "Pet food, coffee (RTD), out-of-home, new SKUs; R&D from the global parent.",
              consequence: "New categories expand the TAM and add resilience — a structural re-rating driver.",
              monitor: "New launches, category share, Ecom/RTD growth, pet-food scale.",
            },
            {
              driver: "3. Margin & cash flows",
              evidence: "High gross margin, improving on input relief; dividend ₹14; strong balance sheet.",
              consequence: "High ROE + payout sustain compounding; any input tailwind is margin upside.",
              monitor: "Gross/EBITDA margin, input cost (milk, wheat, cocoa), payout.",
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
            "Nestlé India is at a **demand re-acceleration inflection**: FY26's +14.7% revenue and Q1 FY27's +48% profit mark a clear turn from the 2023-24 rural slowdown. The premium portfolio and category expansions (pet food, coffee, out-of-home) give the growth engine new legs.",
        },
        {
          type: "p",
          text:
            "The valuation keeps the story 'accumulate not chase' — quality compounding priced in; the multiple demands consistent execution.",
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
              lead: "Q2 FY27 (Oct 2026)",
              text: "Watch volume sustainability, premium mix, new launches and any input-cost commentary.",
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
          title: "Accumulate — ₹1,592 target",
          text:
            "Nestlé India combines unmatched brand quality, accelerating growth and premium optionality — the classic staples compounder. At ~76x, we accumulate rather than buy aggressively.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Premium-multiple de-rating; (2) rural demand fragility; (3) input inflation (milk/cocoa); (4) regulatory (sugar/salt guidelines, advertising); (5) growth base-effect normalization.",
        },
      ],
    },
  ],
};