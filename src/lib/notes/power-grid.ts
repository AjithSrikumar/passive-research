import type { ResearchNote } from "./types";

export const powerGridNote: ResearchNote = {
  slug: "power-grid-corporation",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹325", sub: "vs ₹271.6 current" },
    { label: "Implied upside", value: "+19.7%" },
    { label: "Market cap", value: "₹2,55,000 Cr", sub: "≈ 930 bn shares" },
    { label: "TTM P/E (actual)", value: "~16x", sub: "FY27E EPS ~₹21 (E)" },
    { label: "Q1 FY27 PAT", value: "₹3,393 Cr", sub: "cons ~₹3,598 Cr; inline" },
    { label: "FY26 revenue", value: "₹48,843 Cr", sub: "regulated asset base growth" },
    { label: "Dividend", value: "₹9.0", sub: "yield ~3.3% incl. buyback" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (5 Aug 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 consolidated PAT", value: "₹3,393 Cr", sub: "inline; opex control" },
            { label: "FY26 PAT", value: "~₹16,200 Cr", sub: "+7% YoY; regulated ROE" },
            { label: "Capex FY26-28", value: "₹37,000 Cr/yr", sub: "TBCB + HVDC + big green corridors" },
            { label: "Asset base (RAB)", value: "~₹2.7 lakh Cr", sub: "growing 10%+ (E)" },
            { label: "Public/strategic", value: "regulatory IP", sub: "returns well within band" },
            { label: "Dividend", value: "₹9.0 + buyback", sub: "total yield ~4%" },
          ],
        },
        {
          type: "p",
          text:
            "Power Grid reported Q1 FY27 (5 August 2026): consolidated PAT of **₹3,598 Cr** in line with street expectations. The core story is a **record capex programme (~₹37,000 Cr/yr)** tied to India's grid-modernisation (renewable corridors, HVDC, inter-regional links), with ~15.5% regulated RoE on a growing rate base.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We rate **Buy** with **target ₹325** (~15.5x FY27E EPS ₹21, E) — inside the 25-analyst band (avg ~₹328). The business is a regulated-infra compounder with a capex boom; the dividend + buyback make holding cheap at ~16x.",
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
            "Power Grid's debates: (i) **rate-base growth vs demand** — the 15%+ growth posable; (ii) **regulatory lag/ROE** — the 15.5% post-tax return on transmission; (iii) **capex cyclicality** — 37k Cr/yr is a record; anti-dilution and financing details matter; (iv) **interest rates** — the re-financing cost affects NIM on the regulated asset.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Capex cycle",
              "Past peak",
              "Peak continues",
              "₹37k Cr FY26-28 commitments",
            ],
            [
              "ROE/lag",
              "Softens",
              "Steady 15.5%+",
              "regulatory formula protects",
            ],
            [
              "Valuation",
              "Fair 17-18x",
              "Cheap with dividend",
              "16x + 4% yield + growth",
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
              driver: "1. Record grid capex programme",
              evidence:
                "Capex ~₹37,000 Cr/yr FY26-28: RE corridors, HVDC, cross-border interconnects, ISTS expansion.",
              consequence:
                "Very large capex → regulated asset base growth >15% → earnings CAGR mid-teens on a regulated margin.",
              monitor: "Commissioning, order hit-rate, TBCB wins, capex utilisation.",
            },
            {
              driver: "2. Regulated ROE protection",
              evidence: "15.5% post-tax return on equity capital employed; quarterly tariff orders reprice RAB.",
              consequence: "Combines stability (defensive) with growth; valuation = RAB multiple × tariff efficiency.",
              monitor: "Tariff orders, RAB, allowed RoE, incentive schemes.",
            },
            {
              driver: "3. Cash returns",
              evidence: "Dividend ₹9, buyback ongoing; strong FCF.",
              consequence: "At 16x with 4% yield, a baseline ~10% total-return is guaranteed.",
              monitor: "Payout, buyback, capex funding mix (debt/equity).",
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
            "Power Grid's inflection: **the electrification & green-corridor build-out** — India's transmission backbone needs record spend to carry RE at scale. The company is the primary beneficiary of this 'grid before megawatts' policy.",
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
              text: "Watch RAB growth, capex pace, dividend/buyback and any competitive-bid (TBCB) wins by private players.",
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
          title: "Buy — ₹325 target",
          text:
            "Power Grid is a regulated compounder in a capex super-cycle — 15%+ RAB growth, protected ROEs, and a 4% total return floor. Buy for the grid, not just the yield.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Tariff/regulatory cuts; (2) capex slippage; (3) interest-rate repricing hits WACC; (4) competition in TBCB; (5) general PSU de-rating flows.",
        },
      ],
    },
  ],
};