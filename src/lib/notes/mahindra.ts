import type { ResearchNote } from "./types";

export const mahindraNote: ResearchNote = {
  slug: "mahindra-mahindra",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹4,100", sub: "vs ₹3,468 current" },
    { label: "Implied upside", value: "+18.2%" },
    { label: "Market cap", value: "₹4,32,000 Cr", sub: "≈ 1,246 bn shares" },
    { label: "TTM P/E (actual)", value: "~24x", sub: "FY27E EPS ~₹170-180 (E)" },
    { label: "Q1 FY27 revenue", value: "₹58,188 Cr (+28% YoY)", sub: "consolidated incl. Tech/M&M" },
    { label: "Q1 FY27 PAT", value: "₹5,455 Cr (+34%)", sub: "UV + farm strong" },
    { label: "FY26 revenue", value: "₹1,72,000 Cr", sub: "+20% YoY" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (30 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 revenue", value: "₹58,188 Cr", sub: "+28% YoY; strong UV and farm" },
            { label: "Q1 FY27 PAT", value: "₹5,455 Cr", sub: "+34% YoY; margin beat" },
            { label: "SUV (UV) business", value: "share ~25%", sub: "XUV/xuv3x0 + BE Ramp" },
            { label: "Tractor business", value: "farm ~45% share", sub: "fleet-led; exports" },
            { label: "New businesses", value: "EV, Tech, L&J", sub: "BE 6e/7e scaling" },
            { label: "RoE", value: "~23%", sub: "consolidated; strong capital returns" },
          ],
        },
        {
          type: "p",
          text:
            "M&M reported Q1 FY27 on 30 July 2026: consolidated revenue of **₹58,188 Cr (+28% YoY)**, PAT of **₹5,455 Cr (+34%)** with SUV share ~25% and farm at ~45%+ share. The stock at ₹3,468 (mcap ₹4.32 lakh Cr) trades ~24x TTM — reflecting the strong execution streak and the EV/tech optionality.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We rate **Buy** with target **₹4,100 (~24x FY27E EPS ~₹172, E)** — near the street top (avg ~₹3,900-4,100). The combination of SUV share, farm margins and new-business scale is rare; the risk is the premium valuation and farm cyclicality.",
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
            "M&M's debates: (i) **SUV momentum sustainability** — XUV and new BE 6e/7e keep share rising, but at the cost of price/mix; (ii) **farm cyclicality** — the tractor cycle turns; (iii) **new businesses** — EV (M&M + Mahindra Tech) and logistics absorb cash before contributing.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "SUV share 25%",
              "Peak",
              "Sustained via product cadence",
              "BE6e/7e, XUV700 refresh",
            ],
            [
              "Farm cycle",
              "Turning down",
              "Mild; 45% share defensive",
              "exports + high-margin mix",
            ],
            [
              "EV/tech drag",
              "Dilutes RoE",
              "Option value",
              "BE6e volumes; Tech IPO plan",
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
              driver: "1. SUV share compounding with premium mix",
              evidence: "UV share ~25% (top-2), XUV700/Scorpio-N selling above capacity; new BE 6e/7e for FY27.",
              consequence:
                "Each point of share and mix lifts ASP and margins; SUV portfolio is a structural revenue/margin driver into FY28.",
              monitor: "UV share, XUV7xx/Scorpio volumes, EV mix, waiting lists.",
            },
            {
              driver: "2. Farm franchise resilience",
              evidence: "Tractor share ~45%; exports strong; high-margin aftermarket.",
              consequence:
                "Farm EBITDA margins (~17-18%) fund growth, cushioning auto-cycle volatility.",
              monitor: "Tractor volumes, market share, exports, aftermarket revenue.",
            },
            {
              driver: "3. New-business optionality (EV, Tech, L&J)",
              evidence:
                "Mahindra EV (BE6e/7e), Mahindra Tech (engineering services, ~30% EBITDA) & Logistic/capabilities scaling; possible Tech IPO.",
              consequence:
                "These unlock separate value — each could be worth ₹40-80k Cr at IPO, a meaningful % of mcap.",
              monitor: "EV volumes, Tech revenue/margin, IPO readiness, logistics margins.",
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
            "M&M is at a **portfolio inflection**: from a farm+auto conglomerate to a 'lifestyle & technology' growth story — SUV leadership, farm resilience and new EV/Tech businesses maturing. Q1 FY27 (PAT +34%) confirms the compounding phase.",
        },
        {
          type: "p",
          text:
            "The value unlock (Tech/EV listings) and consistent 20%+ RoE are what justify the premium multiple vs auto peers.",
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
              text: "Watch UV share/volumes, BE6e ramp, farm guidance, and any Tech/EV listing update.",
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
          title: "Buy — ₹4,100 target",
          text:
            "M&M is the rare Indian auto name with share gains, margin expansion and portfolio optionality. At ~24x TTM with ~18% EPS CAGR, the risk-reward is constructive for the premium franchise.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) SUV share reverts; (2) farm downturn; (3) EV cash burn; (4) premium de-rating; (5) group governance/related-party overhang.",
        },
      ],
    },
  ],
};