import type { ResearchNote } from "./types";

export const sunPharmaNote: ResearchNote = {
  slug: "sun-pharmaceutical",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹2,167", sub: "vs ₹1,946 current" },
    { label: "Implied upside", value: "+11.4%" },
    { label: "Market cap", value: "₹4,68,000 Cr", sub: "≈ 2.4 bn shares" },
    { label: "TTM P/E (actual)", value: "~38.7x", sub: "FY27E EPS ~₹57-60 (E)" },
    { label: "Q1 FY27 PAT", value: "₹2,895 Cr (+26.8% YoY)", sub: "rev ₹15,300 Cr (+11.9%)" },
    { label: "Q1 FY27 margin", value: "EBITDA ~32%", sub: "strong specialty mix" },
    { label: "Dividend", value: "₹16/share", sub: "incl. interim; yield ~0.8%" },
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
            { label: "Q1 FY27 revenue", value: "₹15,299.8 Cr", sub: "+11.9% YoY; ex-Taro" },
            { label: "Q1 FY27 PAT", value: "₹2,894.7 Cr", sub: "+26.8% YoY; strong specialty ops" },
            { label: "EBITDA margin", value: "~32%", sub: "+~150 bps YoY" },
            { label: "India business", value: "+16% YoY", sub: "specialty mix-led" },
            { label: "US generics", value: "soft", sub: "pricing pressure; specialty offsets" },
            { label: "FY26 actual", value: "₹56,649 Cr revenue", sub: "+11.9% YoY (S&P: ₹58,462 Cr)" },
          ],
        },
        {
          type: "p",
          text:
            "Sun Pharma reported Q1 FY27 on 31 July 2026: revenue of **₹15,300 Cr (+11.9% YoY)** and PAT of **₹2,895 Cr (+26.8%)**, with EBITDA margin **~32%**. The stock at ₹1,946 (mcap ₹4.68 lakh Cr) trades ~38.7x TTM — a premium for the specialty pipeline and stable India franchise.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We rate **Buy** with a target of **₹2,167** — aligning with the 33-analyst consensus average (₹2,167, +11.4%). The bet: specialty drugs (Ilumya/Ilumetri, deuruxolitinib) plus India demand compounding; the risk: US generics erosion and the emerging-market macro.",
        },
      ],
    },
    {
      id: "business-model",
      label: "Business model (summary)",
      blocks: [
        {
          type: "p",
          text:
            "Sun Pharma is India's largest pharmaceutical company: domestic branded generics (~30%+ of sales), global specialty (remains fastest growing), and global generics (US formulations incl. Taro). Its moat is the specialty portfolio in dermatology/eyecare and a large Indian franchise.",
        },
        {
          type: "kv",
          items: [
            { label: "India formulations", value: "~35% of sales", sub: "branded + acquisitions (Alkem style)" },
            { label: "US business", value: "~35% of sales", sub: "specialty-led; Taro absorbed" },
            { label: "Emerging markets", value: "~20% of sales", sub: "high-touch emerging Asia/Africa" },
            { label: "Rest of world", value: "~10%", sub: "regulated/misc" },
            { label: "Specialty (global)", value: "growing 20%+", sub: "margins ~50%+" },
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
              driver: "1. Specialty-derived margin expansion",
              evidence:
                "Ilumori + deurux are light on; specialty mix is lifting EBITDA margin toward 32% and gross margin ~urban protected.",
              consequence:
                "Each topline point of specialty shift adds several points of margin — EPS can compound 12-15% with flat sales.",
              monitor: "Specialty revenue share, sales force productivity, molecule ramp, margins.",
            },
            {
              driver: "2. India growth franchise",
              evidence:
                "India sales +16% YoY in Q1 FY27; a large doctor-market franchise (26k+ MRs), therapies broad-based, and co-promotion excellence.",
              consequence:
                "A stable 10-13% India CAGR underpins the core, de-risking from US generics volatility.",
              monitor: "India growth, market share in Rx, therapy leadership, new launches.",
            },
            {
              driver: "3. Pipeline & life-cycle optionality",
              evidence:
                "Global specialty pipeline: deuruxolitinib (hair), Ilumetri (IL-17), drone-mar; plus biosimilars/IP into India.",
              consequence:
                "A single strong specialty asset is ~20-30% of market cap in option value; the pipeline is financed by cash (~$3bn).",
              monitor: "Regulatory decisions, clinical reads, launch timing.",
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
            "Sun Pharma's inflection is **the transition from generic-pharma to specialty-pharma**: FY26 revenue grew ~12% while margin expanded to ~30%+. Q1 FY27 confirmed margin ~32%. The specialty scale-up is the re-rating engine for the group underscore the flagship franchise.",
        },
        {
          type: "p",
          text:
            "The measures that matter: specialty contribution, R&D productivity, and India linearity. On strong specialty, the stock deserves a premium multiple.",
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
              text: "Watch specialty growth (deurux/Ilumori trajectory) and India quarterly print; any generic-field competition on US funders matters.",
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
          title: "Buy — ₹2,167 target",
          text:
            "Sun Pharma is a quality pharma with a specialty compounding story and a stable India crown; at 38.7x it is expensive in absolute terms but cheap against history (~50x). Buy for the specialty mix and the option in the pipeline.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) US generics pricing collapses; (2) specialty ramp disappoints; (3) emerging-market FX stress; (4) M&A/legal overhang; (5) pipeline delays (clinical/FDA).",
        },
      ],
    },
  ],
};