import type { ResearchNote } from "./types";

export const axisNote: ResearchNote = {
  slug: "axis-bank",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹1,350", sub: "vs ₹1,102 current" },
    { label: "Implied upside", value: "+22.5%" },
    { label: "Market cap", value: "₹3,40,000 Cr", sub: "≈ 309 bn shares" },
    { label: "TTM P/B (actual)", value: "~1.4x", sub: "FY27E book ~₹800 (E)" },
    { label: "Q1 FY27 PAT", value: "₹7,114 Cr (+23% YoY)", sub: "NII ₹14,646 Cr (+8%)" },
    { label: "Q1 FY27 NIM", value: "~3.5%", sub: "stable domestic" },
    { label: "GNPA", value: "1.28%", sub: "improving; PCR high" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (21 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 PAT", value: "₹7,114 Cr", sub: "+23% YoY; strong" },
            { label: "Q1 FY27 NII", value: "₹14,646 Cr", sub: "+8% YoY" },
            { label: "Loan growth", value: "~19% YoY", sub: "deposits +18%; balanced" },
            { label: "NIM", value: "~3.5%", sub: "stable; domestic stead" },
            { label: "Asset quality", value: "GNPA 1.28%; NNPA 0.39%", sub: "improving; PCR ~80%" },
            { label: "CET-1", value: "~15.9%", sub: "comfortable" },
          ],
        },
        {
          type: "p",
          text:
            "Axis reported Q1 FY27 on 21 July 2026: PAT of **₹7,114 Cr (+23% YoY)** on NII of **₹14,646 Cr (+8%)**, with loan growth ~19% and a GNPA of 1.28%. The turnaround runs; the valuation (~1.4x P/B) leaves room if growth sustains above system rate.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We stay **Accumulate** with a target of **₹1,350 (~3.1x FY27E book ₹430, E)** — inside the 45-analyst consensus band (avg ~₹1,520, majority Buy). We pay up only slightly given the earnings momentum; the downside grip is strong deposit franchise.",
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
            "Axis's debates: (i) **post-Citi integration momentum** — whether the Citi book synergies materialize as promised; (ii) **growth vs margins** — loan growth 19% with NII only +8% reflects margin pressure; (iii) **asset quality in retail** — the unsecured/agri book mix is a monitorable.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "NII growth vs loan growth",
              "NII lag",
              "Resolving",
              "margin stabilisation Q2+",
            ],
            [
              "Citi merger sync",
              "Priced in",
              "Runway continues",
              "cross-sell; affluent base",
            ],
            [
              "Retail book stress",
              "Concern",
              "Managed",
              "PCR ~80%; slippage low",
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
              driver: "1. Citi portfolio synergy and wealth build-out",
              evidence: "Citi consumer book integrated; affluent wealth franchise growing 20%+.",
              consequence: "Fee synergies + cross-sell lift operating leverage; each 100 bps of fee = ~₹1,000 Cr PBT.",
              monitor: "Fee income, wealth AUM, Citi-sync progress.",
            },
            {
              driver: "2. Balance-sheet growth above system",
              evidence: "Loans +19% (largely retail + SME dominant), deposits +18%.",
              consequence: "Market-share gains in retail lending compound NII even at flat NIM.",
              monitor: "Loan/deposit growth, CASA, NIM trajectory.",
            },
            {
              driver: "3. Asset-quality normalisation & re-rating",
              evidence: "GNPA 1.28%, NNPA 0.39%; PCR ~80%; CET-1 15.9%.",
              consequence: "Low credit costs and capital headroom allow RoE ~18%+; 1.4x P/B discounts that.",
              monitor: "Credit cost, slippage, PCR, RoE trajectory.",
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
            "Axis is at a quality-transition point: from turnaround to **scale compounding** — one of India's largest private banks using the Citi franchise and retail-focus to grow above system while quality keeps improving.",
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
              text: "Watch NII rebound, Citi synergies, and any credit cycle surprise or leadership change announcement.",
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
          title: "Accumulate — ₹1,350 target",
          text:
            "Axis offers scale growth + wealth upside + a cheap multiple. The Citi synergies are the catalyst; the retail book is the quality anchor; the P/B is modest.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Citi integration disappointment; (2) margin compression; (3) retail unsecured stress; (4) leadership change; (5) macro/rates shock.",
        },
      ],
    },
  ],
};