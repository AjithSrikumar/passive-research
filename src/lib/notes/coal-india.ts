import type { ResearchNote } from "./types";

export const coalIndiaNote: ResearchNote = {
  slug: "coal-india",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹460", sub: "vs ₹413.65 current" },
    { label: "Implied upside", value: "+11.2%" },
    { label: "Market cap", value: "₹2,55,000 Cr", sub: "≈ 616 bn shares (E)" },
    { label: "TTM P/E (actual)", value: "~8.2x", sub: "FY26 EPS ~₹48; yield ~6.4%" },
    { label: "Q1 FY27 PAT", value: "₹8,850 Cr (+0.7%)", sub: "in-line; revenue ₹46,255 Cr (+7.8%)" },
    { label: "FY26 production", value: "~800 MT", sub: "world's largest coal miner" },
    { label: "Dividend", value: "₹26.5 total", sub: "incl. specials; yield ~6.4%" },
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
            { label: "Q1 FY27 revenue", value: "₹46,255 Cr", sub: "+7.8% YoY; offtake up" },
            { label: "Q1 FY27 PAT", value: "₹8,850 Cr", sub: "+0.7% YoY; flat" },
            { label: "Production (Q1)", value: "~215 MT", sub: "+6-7% YoY" },
            { label: "Offtake (Q1)", value: "~220 MT", sub: "strong e-auction + gencos" },
            { label: "FY26 dividend", value: "₹26.5", sub: "incl. special ₹4.50" },
            { label: "E-auction premium", value: "normalising", sub: "last FY elevated" },
          ],
        },
        {
          type: "p",
          text:
            "Coal India reported Q1 FY27 on 27 July 2026: revenue of **₹46,255 Cr (+7.8% YoY)** and PAT of **₹8,850 Cr (+0.7%** — a flattish quarter as e-auction premiums normalised but overall volumes grew. The stock trades at ~8.2x TTM earnings with a ~6.4% yield — a classic value-plus-yield large-cap.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We keep **Accumulate** with a target of **₹460 (~9.6x FY26 EPS ₹48, E)** — near the 25-analyst consensus (avg ~₹460). The attractive points: monopoly scale, high yield, demand growth; the risks: thermal demand peak, capex to renewables and the e-auction premium fading.",
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
            "Coal India's debates: (i) **thermal-to-green transition** — EV/renewables reduce coal tonne growth; (ii) **e-auction economics** — the premium is cyclic and drives margins; (iii) **cost inflation** — labour, diesel, royalty; (iv) **capital returns** — the ~6.4% yield and cash pile.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Demand for coal",
              "Declining, peak",
              "Growing through FY27+",
              "gencos + steel demand",
            ],
            [
              "Price/e-auction",
              "Weakening",
              "Normalising to base",
              "offtake growth keeps margin",
            ],
            [
              "Valuation",
              "Cheap for reason",
              "Yield underpin",
              "6.4% yield, 8.2x P/E",
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
              driver: "1. Monopoly production scale",
              evidence: "~800 MT annual; ~80% of India's production; low-cost incl. huge reserves.",
              consequence: "Volume and pricing stay basin-controlled; a 1% volume gain is ~$80-100 bn coal EBITDA.",
              monitor: "Monthly production, offtake, inventory, as per Q-genco demand.",
            },
            {
              driver: "2. Yield & balance-sheet",
              evidence: "Cash-rich; dividend ₹26.5 + specials repeatedly; zero debt (net cash).",
              consequence: "At ₹415 ~6.4% yield and 8.2x, the return profile is strong even with flat margins.",
              monitor: "Payout ratio, buyback/bonus, e-auction realisation and cash.",
            },
            {
              driver: "3. Thermal-bridge demand",
              evidence: "Peak power demand growing; genco stockpile replacement; imports substitution.",
              consequence: "Coal sales in India still growing 5-7%/yr as renewables are insufficient — a multi-year bridge.",
              monitor: "Power demand, generation gaps, FSA/PPA, exports.",
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
            "Coal India's inflection point is the balance between **peak-coal and the energy transition**: India's coal demand keeps growing for a decade while renewables are insuffised. The company funds its own transition via growing cash flow — a yield-plus-transition story.",
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
              text: "Watch production ramp, e-auction realisation, fuel-supply agreements, and interim dividend announcements.",
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
            "Coal India's core — growing coal volumes, cash generation and a 6.4% yield — is the sum of the parts; at 8.2x it pays you back over the cycle. Accumulate for income, monitor the energy transition.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) thermal demand peak; (2) e-auction price slump; (3) freight-wage-royalty inflation; (4) strikes/logistics; (5) government dividend/subsidy policy.",
        },
      ],
    },
  ],
};