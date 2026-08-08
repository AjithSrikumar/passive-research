import type { ResearchNote } from "./types";

export const adaniPowerNote: ResearchNote = {
  slug: "adani-power",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹252", sub: "vs ₹209 current" },
    { label: "Implied upside", value: "+20.6%" },
    { label: "Market cap", value: "₹81,000 Cr", sub: "≈ 3.87 bn shares (as listed)" },
    { label: "TTM P/E (actual)", value: "~28x", sub: "FY26 EPS ~₹7.4-8.2 (E)" },
    { label: "Q1 FY27 PAT", value: "₹4,866.6 Cr (+47% YoY)", sub: "rev ₹19,322 Cr (+33%)" },
    { label: "Capacity", value: "18,330 MW", sub: "incl. 4.89 GW under construction" },
    { label: "Dividend", value: "₹0.05", sub: "token; yields minimal" },
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
            { label: "Q1 FY27 revenue", value: "₹19,322 Cr", sub: "+33% YoY" },
            { label: "Q1 FY27 PAT", value: "₹4,866.6 Cr", sub: "+47% YoY" },
            { label: "Power sales (Q1)", value: "28.8 BU", sub: "+16.9% YoY" },
            { label: "Capacity", value: "18,330 MW", sub: "+7% YoY; 4,890 MW WIP" },
            { label: "PPA shelf life", value: "53-year av.", sub: "long-term contracted" },
            { label: "Net debt", value: "~₹30,000 Cr", sub: "declining; leverage manageable" },
          ],
        },
        {
          type: "p",
          text:
            "Adani Power reported Q1 FY27 on 22 July 2026: revenue of **₹19,322 Cr (+33% YoY)** and PAT of **₹4,866.6 Cr (+47%)**, driven by higher realisations and volume (28.8 BU). At ₹209 (mcap ~₹81,000 Cr) it trades ~28x TTM with a pure-thermal IPP profile and a long-term contracted queue.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We rate **Accumulate** with target **₹252** — the 9-analyst consensus average (range ~₹220-270). The growth is strong and contracted; the risks are thermal-merchant price volatility and the capital intensity of the under-construction fleet. Buy volatility, not the headline.",
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
            "Adani Power's debates: (i) **thermal peak** — is coal power still growing or is the fixed PPA shelf mostly done; (ii) **merchant vs contract mix** — Q1 merchant realisations drove the beat; (iii) **capex risk** — the 4.89 GW under construction needs funding; (iv) **group linkage** — the Adani ecosystem carries perception risk.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Thermal demand",
              "Peaking",
              "Growing into FY28",
              "peak-demand growth; PPAs 30-yr",
            ],
            [
              "Merchant upside",
              "One-off",
              "Structural shortage",
              "capacity constraints, high PLF",
            ],
            [
              "Capex",
              "Dilutive",
              "Contracted-returns",
              "4.89 GW plants with PPAs",
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
              driver: "1. Contracted thermal capacity cycle",
              evidence: "18,330 MW incl. under-construction; majority of capacity under long-term (30-yr) PPAs.",
              consequence: "Near-full visibility on revenue; earnings levered to PLF, merchant, and fuel spreads.",
              monitor: "PPA additions, PLF, merchant dispatches, capacity commissioning.",
            },
            {
              driver: "2. Merchant power / peak demand",
              evidence: "Q1 revenue +33% partly merchant-driven; India peak shortages; gas-level PLF soft.",
              consequence: "A strong summer & data-centre power demand raises realisations and EBITDA per unit.",
              monitor: "Power exchange prices, peak shortage, merchant share, utilisation.",
            },
            {
              driver: "3. Deleveraging & return",
              evidence: "Net debt declining on cash flows; path to higher ROE as burst capacity is paid down.",
              consequence: "Lower leverage + growing earnings → ROE and re-rating; optional dividend appears late-cycle.",
              monitor: "Net debt/EBITDA, cash flow, ROE, dividend initiation.",
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
            "Adani Power is at a **thermal peak-demIndia generation inflection**: record Q1 volume and realisations, a 4.89 GW build-out and a contracted book. The stock at 28x is paying for growth, not the peak — the near-term catalyst is power-price and commissioning.",
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
              text: "Watch merchant realisations, summer peak, commissioning timing and any group-level statement.",
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
          title: "Accumulate — ₹252 target",
          text:
            "Adani Power is a thermal-power + contracted-growth equity: strong Q1 (+47% PAT) and a visible build-out. At 28x the growth is being paid for; accumulate for the cycle, not the tip.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) merchant price collapse; (2) commissioning delays overrun capex; (3) thermal demand peak risks; (4) group/perception events; (5) balance-sheet/capital cost risk on build.",
        },
      ],
    },
  ],
};