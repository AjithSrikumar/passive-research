import type { ResearchNote } from "./types";

export const siemensNote: ResearchNote = {
  slug: "siemens-india",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹4,300", sub: "vs ₹3,938 current" },
    { label: "Implied upside", value: "+9.2%" },
    { label: "Market cap", value: "₹1,41,000 Cr", sub: "≈ 35.6 bn shares (E)" },
    { label: "TTM P/E (actual)", value: "~94x", sub: "FY26 (18-mo) EPS ₹44.6; distorted by one-off" },
    { label: "FY26 rev (18 months)", value: "₹16,787 Cr", sub: "-3.3% vs FY25 (pro-forma)" },
    { label: "FY26 operating margin", value: "10.0%", sub: "incl. exit one-offs (E)" },
    { label: "Order backlog", value: "record ₹45,000 Cr", sub: "data-centre + energy demand" },
    { label: "Note date", value: "7 Aug 2026", sub: "Q1 FY27 results due 11 Aug (not yet reported)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "FY26 revenue (18-mo)", value: "₹16,787 Cr", sub: "-3.3% vs prior fiscal-year" },
            { label: "FY26 net income", value: "₹1,587 Cr", sub: "EPS ₹44.6; margin 9.5%" },
            { label: "Balance sheet", value: "Net cash ₹53,094 Cr", sub: "very strong; implies per-share ₹149" },
            { label: "Smart infrastructure", value: "₹98,209 Cr revenue", sub: "largest segment; electrification demand" },
            { label: "Digital industries", value: "₹40,584 Cr revenue", sub: "automation cyclicity" },
            { label: "Order backlog", value: "≈₹45,000 Cr", sub: "record; data centres + power" },
          ],
        },
        {
          type: "p",
          text:
            "Siemens India pivoted its fiscal year to **April-March** effective FY26, making FY26 an 18-month period ending March 2026: revenue of **₹16,787 Cr (pro-forma -3.3%)**, net income of **₹1,587 Cr** and an operating margin of **~10%**. The stock trades at ~₹3,938 with a record order backlog (~₹45,000 Cr) driven by data-centre electrification and grid modernization.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "Q1 FY27 results (due 11 August) are not yet published; we base this note on FY26 reported and the order book. We set **Accumulate** (target **₹4,300**, ~2.5x the net-cash book - a structural-proxy for the electrification capex cycle). The consensus (26 analysts, avg TP ~₹3,789) is more conservative.",
        },
      ],
    },
    {
      id: "variant-perception",
      label: "Variant perception",
      blocks: [
        {
          type: "p",
          text: "Siemens India's debates: (i) **order backlog conversion** — does the ₹45,000 Cr list convert at quoted margin; (ii) **margin & FX** — the 18-month base and currency swings cloud comparability; (iii) **valuation** — ~94x TTM (post-period distorted) vs the growth option on the energy transition.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "PE ~94x",
              "Extreme",
              "Distorted by 18-mo, one-off",
              "FY26 net cash; forward more <70x",
            ],
            [
              "Order backlog",
              "Mere pipeline",
              "Cash conversion ahead",
              "₹45k Cr; data-centre orders",
            ],
            [
              "Energy demand",
              "Peaking",
              "Multi-year grid capex",
              "HVDC; manufacturing localization",
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
              driver: "1. Capex super-cycle (data centres + grid)",
              evidence: "Record ₹45k Cr order book; electrification of data centres, renewables interconnection, and HVDC.",
              consequence: "Backlog conversion over 24-36 months supports revenue & margin; the structural capex story is strong.",
              monitor: "Order intake, backlog-to-revenue, margin on new orders, DC capacity additions.",
            },
            {
              driver: "2. Localisation and 'Make in India'",
              evidence: "Kalwa/ord plants consume domestic content; government 'localization' policies lift volumes.",
              consequence: "Localisation lowers FX risk and cost; supports sustainable margins on exportable goods.",
              monitor: "local procurement %, plant utilisation, import substitution policy impact.",
            },
            {
              driver: "3. Balance-sheet & optionality",
              evidence: "Net cash ₹53,094 Cr (~₹149/share), strong payouts historically.",
              consequence: "The cash + order book creates a value floor; downside protected, upside from cash conversion.",
              monitor: "Net cash, dividend/ buyback policy, one-off gains repeatability.",
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
            "Siemens India's inflection is the **data-centre → grid → industry electrification cycle**: the FY26 record order backlog is the leading indicator with a couple of years of visibility. The 18-month fiscal makes the numbers base-clumsy — but the backlog, localisation and cash strengthen the story.",
        },
        {
          type: "p",
          text:
            "The swing factor is delivery: when the backlog converts at ~10-11% operating margin, FY27E/fy28 earnings should re-rate to a lower PE while the base normalises.",
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
              lead: "Q1 FY27 (due 11 Aug 2026)",
              text: "First quarter on the new fiscal basis — margin, order intake and any exhorting of FY27 guide: key calibration point.",
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
          title: "Accumulate — ₹4,300 target",
          text:
            "Siemens India is the premium way to play India's electrification/capex super-cycle — record backlog, net cash, and a presence across data centres, utilities, and factories. Accumulate rather than chase at ~94x; the backlog backs the forward multiple.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Order cancellations; (2) margin surprise on new orders; (3) FX / import content; (4) premium valuation de-rates hard; (5) parent-group capital choices. Q1 FY27 (due 11 Aug) not yet reported.",
        },
      ],
    },
  ],
};