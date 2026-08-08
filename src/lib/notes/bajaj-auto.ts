import type { ResearchNote } from "./types";

export const bajajAutoNote: ResearchNote = {
  slug: "bajaj-auto",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹12,500", sub: "vs ₹11,856 current" },
    { label: "Implied upside", value: "+5.4%" },
    { label: "Market cap", value: "₹3,31,000 Cr", sub: "≈ 279 mn shares" },
    { label: "TTM P/E (actual)", value: "~28x", sub: "FY27E EPS ~₹460 (E)" },
    { label: "Q1 FY27 revenue", value: "₹17,244 Cr (+37% YoY)", sub: "PAT ~₹3,420 Cr" },
    { label: "Export mix", value: "~55% of volumes", sub: "3W + 2W critical" },
    { label: "Dividend", value: "₹190", sub: "yield ~1.6%" },
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
            { label: "Q1 FY27 revenue", value: "₹17,244 Cr", sub: "+37% YoY; PAT ~₹3,420 Cr" },
            { label: "Motorcycle volumes", value: "+~40% YoY", sub: "125-160cc sweet spot" },
            { label: "Chetak EV", value: "rising", sub: "2W EV scaling" },
            { label: "3W & Exports", value: "strong", sub: "LATAM, SE-Asia, Africa" },
            { label: "Margin", value: "~20%", sub: "industry-best" },
            { label: "FY26 dividend", value: "₹190", sub: "incl. special; history strong" },
          ],
        },
        {
          type: "p",
          text:
            "Bajaj Auto reported Q1 FY27 on 21 July 2026: revenue of **₹17,244 Cr (+37% YoY)** with PAT of **~₹3,420 Cr**, driven by a bumper motorcycle and export cycle. At ₹11,856 (mcap ~₹3.31 lakh Cr) it trades ~28x TTM — rich, but the export growth optionality and margin leadership are the compensating drivers.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We keep **Accumulate** with a target of **₹12,500 (~31x FY27E EPS ₹402, E)** — trendy near coverage average (~₹12,600). The growth is real, the valuation is high; a buy waits for a better entry price.",
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
            "Bajaj Auto's debates: (i) **export recovery** — emerging-market volumes drive growth; (ii) **domestic 2W competition** — Honda & Hero share pressure; (iii) **EV optionality** — Chetak's scale vs rivals; (iv) **valuation** — 28x, pricey for a cyclical 2W exporter.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Export growth",
              "Peaked",
              "Structural recovery",
              "LATAM/Africa +37% rev",
            ],
            [
              "2W competition",
              "Price war",
              "Margin protected",
              "Pulsar/125cc premium mix",
            ],
            [
              "EV Chetak",
              "Niche",
              "Optionality",
              "Chetak scaling, exports to SE Asia",
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
              driver: "1. Export engine / global footprint",
              evidence: "~55% of volumes abroad; Vietnam, Nigeria, Latam; MT Nations.",
              consequence: "Global 2W/3W growth de-links earnings from domestic cycle; each export MB gain is high-margin.",
              monitor: "Export volumes, share by region, global motorcycle demand, freight.",
            },
            {
              driver: "2. Margin leader in 2W",
              evidence: "~20% EBITDA margin; 100%+ high-margin; premiumisation & capacity utilisation.",
              consequence: "Top-of-industry margin converts volume into profit; premium mix raises value twice.",
              monitor: "EBITDA margin, mix KPIs, raw material vs price, export pricing.",
            },
            {
              driver: "3. EV & product optionality",
              evidence: "Chetak EV & electric 3W; multiple platforms; adoption curve inflecting.",
              consequence: "EV presence keeps the franchise relevant and is a hedge on the premium.",
              monitor: "EV volumes, share of 2W EV, charging as-of-date.",
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
            "Bajaj Auto's inflection is the **export-plus-everything compounding**: a ~37% revenue Q1, exports scaling and EV/EV-3W ramping. The company has achieved critical mass in motorcycles abroad — the growth engine that domestic peers lack.",
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
              text: "Export trajectory, Chetak ramp and any EV-for-all play; margins and volume both matter.",
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
          title: "Accumulate — ₹12,500 target",
          text: "Bajaj Auto is a high-quality Indian exporter with global optionality — but a rich multiple. Accumulate around the ₹11,500-12,000 band for the compounding; don't chase strength.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Global demand slump; (2) currency / tariff in export markets; (3) 2W price wars; (4) EV disruption lag; (5) high multiple compresses.",
        },
      ],
    },
  ],
};