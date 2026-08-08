import type { ResearchNote } from "./types";

export const kotakNote: ResearchNote = {
  slug: "kotak-mahindra-bank",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹460", sub: "vs ₹391 current" },
    { label: "Implied upside", value: "+17.6%" },
    { label: "Market cap", value: "₹3,90,000 Cr", sub: "≈ 1,000 bn shares" },
    { label: "TTM P/B (actual)", value: "~1.4x", sub: "FY27E book ~₹330 (E)" },
    { label: "Q1 FY27 PAT", value: "₹4,123 Cr (+25.6% YoY)", sub: "NII ₹7,928 Cr (+9.2%)" },
    { label: "Q1 FY27 NIM", value: "~4.5%", sub: "resilient; GNPA 1.18%" },
    { label: "FY26 PAT", value: "~₹14,500 Cr", sub: "+17% YoY (E)" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (18 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 PAT", value: "₹4,122.96 Cr", sub: "+25.64% YoY; beat" },
            { label: "Q1 FY27 NII", value: "₹7,928 Cr", sub: "+9.2% YoY" },
            { label: "NIM", value: "~4.5%", sub: "sector-best; stable QoQ" },
            { label: "Asset quality", value: "GNPA 1.18%; NNPA 0.27%", sub: "strong; PCR high" },
            { label: "Deposit growth", value: "~15%+ YoY", sub: "liability franchise healthy" },
            { label: "CEO transition", value: "K. V. S. Manian named", sub: "succeeds Ashok Vaswani (2026)" },
          ],
        },
        {
          type: "p",
          text:
            "Kotak reported Q1 FY27 on 18 July 2026: PAT of **₹4,123 Cr (+25.6% YoY)** on NII of **₹7,928 Cr (+9.2%)** with **NIM ~4.5%** and GNPA of 1.18%. The bank's core franchise (retail, NIM, quality) is intact; the main debate is growth resumption after years of scale-up deliberation and the 2026 CEO transition.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We maintain **Accumulate** with a target of **₹460 (~1.4x FY27E book ₹330, E)** — below the 43-analyst average (~₹462) but above street low. The bank trades at a P/B discount to its own history; NIM leadership + quality justify a modest re-rating once loan growth re-accelerates.",
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
            "Kotak's debates: (i) **growth vs quality** — loan growth ~15-17% is below peers' 20%+; (ii) **CEO transition** — the Vaswani→Manian handover creates uncertainty; (iii) **valuation** — 1.4x P/B is a discount vs its history (~2x+); the NIM moat (4.5%) is real but the balance-sheet is increasingly retail-centric.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Loan growth",
              "Laggard",
              "Re-accelerating",
              "Q1 +~17%; MSME/consumo bets",
            ],
            [
              "NIM 4.5%",
              "Won't hold",
              "Holds on liability mix",
              "CASA 45%+; branch scale",
            ],
            [
              "CEO change",
              "Overhang",
              "Managed",
              "internal successor continuity",
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
              driver: "1. NIM leadership and low-cost liabilities",
              evidence: "NIM ~4.5% vs sector 3.2-4.0%; CASA 45%+; branch network ~2,000+.",
              consequence: "High NIM x low cost of deposits = structurally superior operating profitability.",
              monitor: "NIM, CASA, cost of deposits, SA growth.",
            },
            {
              driver: "2. Quality book & sector-low credit costs",
              evidence: "GNPA 1.18%, NNPA 0.27%; PCR ~80%; retail mix ~60%.",
              consequence: "Credit cost ~30-40 bps frees capital for growth and buybacks.",
              monitor: "Slippage, PCR, GNPA/NNPA, retail book mix.",
            },
            {
              driver: "3. Valuation re-rating on growth",
              evidence: "P/B 1.4x vs 2x history; growth stepping up to ~17-18%.",
              consequence: "Each 100 bps of loan growth = ~2-3% EPS; re-rating to 1.7x adds ~20% upside.",
              monitor: "Loan growth, NIM, fee income, buyback announcements.",
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
            "Kotak is at a **management-transition + growth-resumption inflection**: a handover in 2026, a re-invigorated retail engine, and a P/B at historical discount. Q1 FY27 (+25.6% PAT) suggests the earnings momentum is already there; the re-rate awaits confidence in the new CEO's growth agenda.",
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
              text: "Growth acceleration, NIM stability, and CEO-transition updates will decide the re-rating speed.",
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
          title: "Accumulate — ₹460 target",
          text:
            "Kotak offers sector-best NIM, pristine quality, and a P/B discount to history. The transition year is the discount; the compounding is the payoff.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Growth stays sub-15%; (2) CEO-transition execution; (3) NIM compression on rate cuts; (4) retail unsecured stress; (5) holding-company discount at group level.",
        },
      ],
    },
  ],
};