import type { ResearchNote } from "./types";

export const belNote: ResearchNote = {
  slug: "bharat-electronics",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹465", sub: "vs ₹390 current" },
    { label: "Implied upside", value: "+19.2%" },
    { label: "Market cap", value: "₹2,85,000 Cr", sub: "≈ 731 bn shares (E)" },
    { label: "TTM P/E (actual)", value: "~46x", sub: "FY27E EPS ~₹9.6 (E)" },
    { label: "Q1 FY27 revenue", value: "₹5,533 Cr (+25.3% YoY)", sub: "PAT ₹1,048 Cr (+8.2%)" },
    { label: "Order book", value: "₹72,258 Cr", sub: "as of 1-Jul-2026; 3.6x revenue" },
    { label: "Dividend", value: "₹2.90", sub: "yield ~0.7%" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (27 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 revenue", value: "₹5,533.06 Cr", sub: "+25.27% YoY" },
            { label: "Q1 FY27 PAT", value: "₹1,048.33 Cr", sub: "+8.17% YoY" },
            { label: "EBITDA margin", value: "25.83%", sub: "stable on scale" },
            { label: "Order book", value: "₹72,258 Cr", sub: "+8% QoQ; strong visibility" },
            { label: "FY26 revenue", value: "₹27,479.63 Cr", sub: "+16.15% YoY; PAT ₹6,048 Cr" },
            { label: "FY27 guidance", value: "Rev +15%, EBITDA 28%", sub: "inflows >₹55,000 Cr (E)" },
          ],
        },
        {
          type: "p",
          text:
            "BEL reported Q1 FY27 on 27 July 2026: revenue of **₹5,533 Cr (+25.3% YoY)** and PAT of **₹1,048 Cr (+8.2%)**, with an order book of **₹72,258 Cr** — 3.6x FY26 revenue. The stock at ₹390 (mcap ~₹2.85 lakh Cr) trades ~46x TTM; the long order book and defence capex super-cycle justify a premium.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We rate **Buy** with target **₹465 (~48x FY27E EPS ~₹9.6, E)** — near the street (avg ~₹450-480 across 30+ analysts). The defence-electronic order pipeline is structural: ₹72k Cr book plus the pending ₹30k+ Cr of expected inflows; the risk is execution pace.",
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
            "BEL's debates: (i) **order inflow vs execution** — the ₹72k Cr book converts slowly on long-cycle defence contracts; (ii) **margin quality** — EBITDA 25.8% is flat despite scale; (iii) **valuation** — 46x is high even for defence; the growth is secured by the 'Make in India' defence budget.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Order book 72k Cr",
              "Slow burn",
              "Accelerating receipts",
              "Q1 +25% revenue print",
            ],
            [
              "Margins",
              "Peaked",
              "Stable at ~26%",
              "scale + exports help",
            ],
            [
              "46x P/E",
              "Too rich",
              "Growth justifies",
              "defence budget growth, indigenisation",
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
              driver: "1. Defence capex super-cycle (Make in India)",
              evidence: "Defence budget growth; electronics content rising; exports to friendly nations.",
              consequence: "A multi-year order inflow pipeline (₹30k+ Cr expected) supports revenue CAGR ~15-18% and EPS growth.",
              monitor: "Order inflows, defence budget allocation, exports, offsets.",
            },
            {
              driver: "2. Indigenisation & high-value product mix",
              evidence: "Radars, EW, sonars, missile systems; content import-substitution roadmap.",
              consequence: "Higher domestic value keeps margins & ROE high even as volumes scale.",
              monitor: "Import substitution %, product mix, R&D spend.",
            },
            {
              driver: "3. Dividend & cash",
              evidence: "Dividend ₹2.90, strong balance sheet, controlled capex.",
              consequence: "At 46x TTM with 15%+ growth, dividend + buybacks add ~1% a year — modest but real.",
              monitor: "Payout, buybacks, working capital (receivables on defence).",
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
            "BEL's inflection is the **Make-in-India defence-electronics boom**: the ₹72k Cr order book, strong Q1 (+25% revenue) and a ~₹1.5 lakh Cr defence acquisition pipeline translate into years of visibility. This is the poster child of the indigenisation cycle.",
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
              text: "Watch order inflow announcements, margin delivery, and any export or AI-edge programme wins.",
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
          title: "Buy — ₹465 target",
          text:
            "BEL is the cleanest way to play India's defence-modernisation capex: 3.6x order-book cover, 25%+ revenue growth and a benign competitive position. The premium is deserved; buy the multi-year visibility.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Order-inflow timing slips; (2) margin compression on contracts; (3) defence budget cuts; (4) technology import dependence; (5) high-multiple de-rating in a risk-off tape.",
        },
      ],
    },
  ],
};