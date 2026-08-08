import type { ResearchNote } from "./types";

export const bajajFinservNote: ResearchNote = {
  slug: "bajaj-finserv",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹2,362", sub: "vs ₹2,004 current" },
    { label: "Implied upside", value: "+17.9%" },
    { label: "Market cap", value: "₹3,33,000 Cr", sub: "≈ 166 bn shares (post-split (E))" },
    { label: "TTM P/E (actual)", value: "~34x", sub: "FY27E EPS ~₹72-75 (E)" },
    { label: "Q1 FY27 income", value: "₹52,817 Cr (+19% YoY)", sub: "consolidated; PAT ₹4,412 Cr" },
    { label: "Assets ( subsidiaries)", value: "Insurance + Bajaj Fin", sub: "Bajaj Finance stake core" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (31 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 income", value: "₹52,800 Cr", sub: "+18% YoY consolidated" },
            { label: "Q1 FY27 PAT", value: "~₹4,412 Cr", sub: "+20%+ YoY" },
            { label: "Bajaj Finance (sub)", value: "24% income growth", sub: "largest component" },
            { label: "Insurance cos", value: "Baja Allianz", sub: "life + general scaling" },
            { label: "FY26 consolidated", value: "Income ₹4.5L Cr", sub: "mature insurance + lending" },
            { label: "Dividend", value: "₹1.10", sub: "₹1.10/share" },
          ],
        },
        { type: "p", text: "Bajaj Finserv reported Q1 FY27 on 31 July 2026: consolidated income of **~₹52,800 Cr (+18% YoY)** with PAT of **~₹4,412 Cr (+20%)**. The company is a financial conglomerate holding Bajaj Finance (consumer lender), Bajaj Allianz (life & general insurance) and a growing asset-management footprint. It trades at ~34x TTM — a BFinance proxy plus insurance optionality." },
        { type: "callout", tone: "key", title: "What we changed", text: "We rate **Buy** (target **₹2,362**, ~35x FY27E, matching consensus avg for 14 analysts (+17.9%)). The sum-of-parts rarely discounts the insurance upside; the discount narrows as FY27 and FY28 roll." },
      ],
    },
    {
      id: "variant-perception",
      label: "Variant perception",
      blocks: [
        {
          type: "p",
          text: "Bajaj Finserv's debates: (i) **holding discount** — the market prices the Bajaj Finance stake (~65-70% of SOTP), not the other subsidiaries; (ii) **insurance growth** — Bajaj Allianz growth vs sector; (iii) **corporate structure** — the two-letter vehicle vs direct holdings.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Holding discount",
              "Permanent",
              "Shrinks over time",
              "IPO/cash-return agenda",
            ],
            [
              "Insurance",
              "Minority",
              "Growth compounding",
              "business +25% YoY mix",
            ],
            [
              "Valuation",
              "34x rich",
              "Fair vs growth",
              "P/E/Bajaj Fin + insurance",
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
              driver: "1. Bajaj Finance stake engine",
              evidence: "Owns ~40%+ of Bajaj Finance — 25%+ earnings compounder; valued on minority basis.",
              consequence: "The core equity is a low-charge gateway to the NBFC's compounding; holding discount shrinks with time.",
              monitor: "BIF quarterly AUM growth, dividend flow to FIH parent, holding discount trajectory.",
            },
            {
              driver: "2. Insurance & lending scale",
              evidence: "Baja Allianz (life + general) scaled; health + motor underwriting improving.",
              consequence: "Insurance lines provide counter-cyclical growth and margin stability relative to pure NBFC.",
              monitor: "Premium growth, combined ratio, new-business value, policy mix.",
            },
            {
              driver: "3. Discount narrowing & catalyst",
              evidence: "Portfolio-level buybacks, simplified structure, insurance distribution demands.",
              consequence: "Channelled and distributed earnings — the discount leg is the main de-rating into value.",
              monitor: "Corporate actions, buyback/dividend, SOTP disclosures.",
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
            "Bajaj Finserv's inflection is in the **scale-out of insurance + the widening of the finance engine**: Q1 FY27 income +18%, and insurance premium growth re-accelerated. The parent is levered to the same compounding cycle as Bajaj Finance without paying the full SOTP.",
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
              text: "Watch Bajaj Finance AUM growth, insurance quarterly performance, and any capital across the subsidiaries.",
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
          title: "Buy — ₹2,362 target",
          text:
            "Bajaj Finserv offers Bajaj Finance with insurance optionality and a holding discount that should narrow. The compounding across entities plus low-key valuation support a Buy.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Bajaj Finance stress; (2) insurance underwriting cycle; (3) holding discount persists; (4) regulatory change; (5) group governance perception.",
        },
      ],
    },
  ],
};