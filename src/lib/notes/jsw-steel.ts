import type { ResearchNote } from "./types";

export const jswSteelNote: ResearchNote = {
  slug: "jsw-steel",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹1,378", sub: "vs ₹1,298 current" },
    { label: "Implied upside", value: "+6.2%" },
    { label: "Market cap", value: "₹3,19,000 Cr", sub: "≈ 244 bn shares (E)" },
    { label: "TTM P/E (actual)", value: "~12.9x", sub: "FY26 EPS ~₹12.6 (distorted by one-offs)" },
    { label: "Q1 FY27 revenue", value: "₹47,364 Cr", sub: "+17% YoY; EBITDA margin ~20%" },
    { label: "Q1 FY27 PAT", value: "~₹5,090 Cr", sub: "fy-off earnings; margin up" },
    { label: "Net debt", value: "₹45,750 Cr", sub: "~2.2x EBITDA; deleveraging" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (17 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 revenue", value: "₹47,364 Cr", sub: "+17% YoY; Q1 steel season" },
            { label: "Q1 FY27 EBITDA", value: "~₹9,500 Cr (E)", sub: "margin ~20%; cost relief" },
            { label: "Crude steel production", value: "~12-13 MT qtr-run", sub: "capacity utilisation high" },
            { label: "Net debt", value: "₹45,750 Cr", sub: "-₹2,000 Cr YoY; deleveraging" },
            { label: "FY26 revenue", value: "₹1,77,000 Cr", sub: "+9.9% YoY (S&P)" },
            { label: "Dividend", value: "₹7.10", sub: "yield ~0.5%" },
          ],
        },
        {
          type: "p",
          text:
            "JSW Steel reported Q1 FY27 on 17 July 2026: revenue of **₹47,364 Cr (+17% YoY)** with EBITDA margin ~20% on better cost and volume. At ₹1,298 (mcap ₹3.19 lakh Cr) it trades ~12.9x trailing — a fair price for the largest private Indian steelmaker with a multi-year capacity path to 50 MTPA.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We keep **Accumulate** with target **₹1,378 (~0.85x EV/ton, ~13x FY27E)**, broadly in the street band (avg ~₹1,378). The bullish case — volume growth, cost-relief, deleveraging — must outweigh metal-cycle risk; we favour accumulation over chasing high steel prices.",
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
            "JSW Steel's debates: (i) **steel price cycle** — India's HRC prices and import pressure; (ii) **capacity build** — 50 MTPA target needs ₹30k+ Cr capex; (iii) **leverage** — $2.2x debt/EBITDA affords but constrains dividends; (iv) **global cyclicality** — China, Europe and crude steel forces.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Steel demand India",
              "Peaking",
              "Structural growth",
              "infra/auto/EV demand +7% CAGR",
            ],
            [
              "Pricing",
              "Eroding",
              "Cost relief offsets",
              "Q1 margin ~20%; iron-ore relaxed",
            ],
            [
              "Leverage",
              "Worry",
              "Deleveraging path",
              "net debt ₹45.7kCr & 2.2x EBITDA",
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
              driver: "1. Domestic volume growth & scale",
              evidence: "Crude production rising, capacity toward 50 MTPA by FY28-30; JSW is the largest private steelmaker.",
              consequence: "Volume growth 8-10% plus India's steel-demand growth (infra/auto/EV) — a high-conviction core.",
              monitor: "Crude steel, utilisation, capacity ramp, domestic demand growth.",
            },
            {
              driver: "2. Cost reduction & deleveraging",
              evidence: "Iron-ore softening, energy optimisation, high share of captive ore; net debt ₹45.7k Cr falling.",
              consequence: "Better-spread + lower finance cost → EPS re-rating; deleveraging raises value per tonne.",
              monitor: "Net debt/EBITDA, spread (HRC-coking cost), cash conversion.",
            },
            {
              driver: "3. Diversified product & export mix",
              evidence: "Flat products + special steels + WB clap; exports steady.",
              consequence: "Product/ops mix de-risks the price cycle; export optionality buffers domestic softness.",
              monitor: "Special-steel share, export volume, realizations vs benchmark.",
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
            "JSW Steel's inflection is **scale-plus-margin-upcycle**: FY26 saw volume and margin growth with Q1 FY27 at EBITDA margin ~20%. The deleveraging path plus domestic demand make the growth story intact — the turning point is recent steel-price stabilisation.",
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
              text: "Watch steel realisations, iron-ore cost, coking-cost, and capex/funding announcements.",
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
          title: "Accumulate — ₹1,378 target",
          text:
            "JSW Steel is the flagship of Indian steel scale-up: growth, cost-angle, and deleveraging. The price is cyclically sensitive; accumulate on dips, sell the highs.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) steel price crash; (2) input cost reversal; (3) capex overrun / dilution; (4) China-Europe import pressure; (5) regulatory-mining/royalty changes; (6) debt/cost-of-capital pressure.",
        },
      ],
    },
  ],
};