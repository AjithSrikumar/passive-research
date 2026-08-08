import type { ResearchNote } from "./types";

export const ntpNote: ResearchNote = {
  slug: "ntpc",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹400", sub: "vs ₹344.3 current" },
    { label: "Implied upside", value: "+16.2%" },
    { label: "Market cap", value: "₹3,34,000 Cr", sub: "≈ 9.7 bn shares" },
    { label: "TTM P/E (actual)", value: "~16.5x", sub: "FY27E EPS ~₹21-22 (E)" },
    { label: "Q1 FY27 PAT", value: "₹5,342 Cr (+11.9% YoY)", sub: "standalone; rev ₹43,832 Cr (+3%)" },
    { label: "Capacity", value: "90,904 MW", sub: "largest utility in India" },
    { label: "Dividend", value: "₹5.75/share", sub: "yield ~1.7%" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (24 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 revenue", value: "₹43,832 Cr", sub: "+3.0% YoY standalone" },
            { label: "Q1 FY27 PAT", value: "₹5,342 Cr", sub: "+11.9% YoY standalone; cons ₹6,896 Cr" },
            { label: "EBITDA", value: "₹13,309 Cr", sub: "+20.5% YoY; strong" },
            { label: "Coal PLF", value: "76.7%", sub: "healthy utilisation" },
            { label: "Capacity", value: "90,904 MW", sub: "incl. RE portfolio scaling" },
            { label: "Green pipeline", value: "~30 GW+", sub: "renewables + hydro + battery" },
          ],
        },
        {
          type: "p",
          text:
            "NTPC reported Q1 FY27 on 24 July 2026: standalone PAT of **₹5,342 Cr (+11.9% YoY)** on revenue of **₹43,832 Cr (+3%)**, with consolidated PAT at ₹6,896 Cr. The company remains India's largest power generator (90,904 MW) and the centrepiece of the 'thermal-to-green' energy transition.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We maintain **Accumulate** with a target of **₹400 (~19x FY27E EPS ₹21.5, E)** — close to the consensus average (~₹400). The bull case: earnings growth + RE optionality + generous dividend; the bear case: thermal utilisation and regulated-return constraints.",
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
            "NTPC's debates: (i) **thermal vs green** — the transition to renewables dilutes the thermal moat unless ROE holds; (ii) **regulatory ROCE** — regulated returns (~15.5%) plus merchant upside; (iii) **valuation** — ~16.5x TTM looks rich for a utility but reflects the RE growth option.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Thermal decline",
              "In progress",
              "Slower than feared",
              "PLF 76.7%; peak demand rising",
            ],
            [
              "RE growth",
              "Sceptical",
              "Accelerating",
              "30+ GW pipeline",
            ],
            [
              "ROE",
              "15.5% cap",
              "Merchant adds",
              "merchant surplus 2026",
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
              driver: "1. India's power demand super-cycle",
              evidence: "Peak demand growth 7-9% YoY; data-centre & industrial electrification; PLF 76.7%.",
              consequence: "NTPC's 90+ GW thermal fleet runs harder, lifting utilisation, EBITDA and merchant revenue.",
              monitor: "Peak demand, PLF, thermal tariffs, energy served.",
            },
            {
              driver: "2. Green capacity build-out",
              evidence: "30+ GW RE pipeline (solar, wind, hydro, battery, green H2); capex ₹80-90k Cr planned FY26-28.",
              consequence: "RE adds ~1.2-1.5 GW/yr; each GW of RE at ~15% ROE adds ~₹150-200 Cr annual PAT.",
              monitor: "RE commissioning, capex, offtake (PPA/FDRE), green H2 progress.",
            },
            {
              driver: "3. Capital returns and balance-sheet",
              evidence: "Dividend ₹5.75; strong FCF; D/E ~1.0; sovereign support.",
              consequence: "Stable payout + growth funding keep the equity compounding; re-rating if RE ROE holds.",
              monitor: "Dividend policy, capex funding, FCF conversion, gearing.",
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
            "NTPC is at the **centre of India's power-transition inflection**: thermal demand growth (data centres, EVs) plus a 30+ GW RE pipeline. Q1 FY27 (EBITDA +20.5%) shows the thermal cash engine firing while the green build-out begins to contribute.",
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
              text: "Watch PLF, merchant prices, RE commissioning pace and any tariff/regulatory announcements.",
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
          title: "Accumulate — ₹400 target",
          text:
            "NTPC is India's power backbone with an earnings growth plus green option; at ~16.5x TTM it's not cheap but the growth and dividend support the multiple. Accumulate on dips.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Demand shock / PLF collapse; (2) RE execution lag; (3) regulatory return cuts; (4) fuel (coal) price spike; (5) equity dilution for capex.",
        },
      ],
    },
  ],
};