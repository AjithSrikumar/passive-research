import type { ResearchNote } from "./types";

export const marutiNote: ResearchNote = {
  slug: "maruti-suzuki",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹16,000", sub: "vs ₹13,984 current" },
    { label: "Implied upside", value: "+14.4%" },
    { label: "Market cap", value: "₹4,40,000 Cr", sub: "≈ 314 bn shares" },
    { label: "TTM P/E (actual)", value: "~29x", sub: "FY27E EPS ~₹545-560 (E)" },
    { label: "Q1 FY27 net sales", value: "₹49,959 Cr (+36% YoY)", sub: "volumes 682,724 (+29.3%)" },
    { label: "Q1 FY27 EBITDA margin", value: "8.2%", sub: "vs 12.0% YoY — price/value mix hit" },
    { label: "Q1 FY27 PAT", value: "₹3,352 Cr", sub: "-10.8% YoY" },
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
            { label: "Q1 FY27 volumes", value: "682,724 units", sub: "+29.3% YoY; SUV share 41.2%" },
            { label: "Q1 FY27 net sales", value: "₹49,959 Cr", sub: "+36% YoY" },
            { label: "Q1 FY27 EBITDA margin", value: "8.2%", sub: "vs 12% YoY; commodity + fx drag" },
            { label: "Q1 FY27 PAT", value: "₹3,352 Cr", sub: "-10.8% YoY on lower margins" },
            { label: "EV/HEV mix", value: "EV ramp at e-Vitara", sub: "hybrids strong in city mix" },
            { label: "FY26 actual", value: "₹1,74,369 Cr net sales", sub: "+20.2% YoY; EBITDA ~12.3%" },
          ],
        },
        {
          type: "p",
          text:
            "Maruti Suzuki reported Q1 FY27 on 31 July 2026: volumes of **682,724 units (+29.3% YoY)**, net sales of **₹49,959 Cr (+36%)**, but EBITDA margin fell to **8.2% vs 12.0% YoY** — the margin compression on commodities (steel/copper), yen-driven import content and a value-led mix — PAT came in at **₹3,352 Cr (-10.8%)**.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We keep **Accumulate** with target **₹16,000 (~29x FY27E EPS ~₹552, E)** — inside consensus (avg ~₹15,700-16,600). The Q1 margin print is the key negative; the response is volume growth, SUV/e-Vitara mix and commodity relief from H2 FY27. If margins recover to ~11-12% on FY27 exit, the stock re-rates toward 30x.",
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
            "Maruti's debates: (i) **margin trajectory** — 8.2% in Q1 vs the 11-13% band that justifies its multiple; (ii) **product mix** — the SUV share (41%) is good for revenue, not margin; (iii) **EV disruption** — e-Vitara and Suzuki's global EV platform keep the story relevant, while hybrids under-answer in the city mix.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Margin 8.2%",
              "Structural compression",
              "Cyclical commodity blip",
              "steel/copper spike; yen drag; pricing Q2+",
            ],
            [
              "SUV share 41%",
              "Margin-negative",
              "Volume/mix positive",
              "volume +29%; ASP support",
            ],
            [
              "EV threat",
              "Disruption priced",
              "Gradual; Suzuki platform",
              "e-Vitara launch; Toyota-PEV partnerships",
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
              driver: "1. Volume leadership and capacity build-out",
              evidence:
                "682,724 units in Q1; ~30% domestic passenger-vehicle share; new Kharkhoda line ramping toward 4 mtpa by 2030.",
              consequence:
                "Scale + localization give Maruti a structural cost advantage; volume CAGR of ~8-10% is the base case under 'Grow with India'.",
              monitor: "Monthly dispatches, PV market share, capacity utilization, Kharkhoda progress.",
            },
            {
              driver: "2. Margin recovery cycle (commodity + mix)",
              evidence:
                "EBITDA margin 8.2% vs 12% YoY — steel/copper and JPY; management guides relief from H2 FY27 with pricing action taken.",
              consequence:
                "Every 100 bps of margin recovery is ~₹1,000 Cr of EBITDA — a potential +20% swing to FY27E EPS.",
              monitor: "Commodity index, JPY/INR, price hikes, mix contribution (EV/HEV).",
            },
            {
              driver: "3. EV & hybrid optionality",
              evidence:
                "e-Vitara sold in India & exported; Suzuki's platform shares; partnership with Toyota for hybrids; EV plant at Gujarat.",
              consequence:
                "EV scale + hybrid share position Maruti to protect share as the market electrifies; optionality not yet in the P/E.",
              monitor: "EV volumes, e-Vitara ramp, hybrid mix, charging ecosystem.",
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
            "Maruti is at a **two-speed inflection**: volume is compounding at a 29% print while margin printed a multi-quarter low. The stock trades ~29x TTM — the market has chosen to price the volume growth and mix, not the margin dip. Our base case: margins recover with commodities, and the growth engine re-asserts from Q3 FY27.",
        },
        {
          type: "p",
          text:
            "Structurally, Maruti's platform strategy (EV + hybrids + exports) and the Kharkhoda capacity are the multi-year catalysts that justify the premium multiple.",
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
              text: "Watch margin recovery (~10-11%), e-Vitara volumes, and any export breakthrough to developed markets.",
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
          title: "Accumulate — ₹16,000 target",
          text:
            "Maruti combines India's best volume franchise with a margin-recovery catalyst and EV optionality. The de-rating from 30x+ is temporary on Q1 noise; at ~26x FY27E with 15-18% EPS CAGR, the risk-reward is constructive.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Commodity/fx stays high; (2) SUV competition & discounting; (3) EV shift outpaces legacy margin; (4) wage/cost inflation at scale; (5) market-share loss in entry segments.",
        },
      ],
    },
  ],
};