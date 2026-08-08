import type { ResearchNote } from "./types";

export const itcNote: ResearchNote = {
  slug: "itc",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹320", sub: "vs ₹289 current" },
    { label: "Implied upside", value: "+10.7%" },
    { label: "Market cap", value: "₹3,62,000 Cr", sub: "≈ 1,252 bn shares" },
    { label: "TTM P/E (actual)", value: "~17.8x", sub: "FY27E EPS ~₹17.9 (E)" },
    { label: "Q1 FY27 PAT", value: "₹5,823 Cr", sub: "+2.1% YoY (consolidated)" },
    { label: "FY26 revenue", value: "₹81,640 Cr", sub: "+10% YoY; PAT ₹20,286 Cr" },
    { label: "Dividend", value: "₹8.25+", sub: "incl. specials; yield ~2.9%" },
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
            { label: "Q1 FY27 PAT", value: "₹5,823 Cr", sub: "+2.1% YoY; paperboard/agri in soft patch" },
            { label: "Cigarette volume", value: "~flat YoY", sub: "1.1% volume growth; pricing intact" },
            { label: "FMCG businesses", value: "Sunfeast/Classmate growth", sub: "revenue +~6% YoY" },
            { label: "Hotels", value: "EBITDA margin 30%+", sub: "record quarters in FY26" },
            { label: "Agri business", value: "soft, leaf export drag", sub: "FX tailwind partial" },
            { label: "Return on capital", value: "ROCE ~30%", sub: "consistently high; cash-rich" },
          ],
        },
        {
          type: "p",
          text:
            "ITC reported Q1 FY27 on 31 July 2026: PAT of **₹5,823 Cr (+2.1% YoY)**, with the cigarette franchise delivering stable volumes while FMCG-others and hotels grew double-digits. The conglomerate trades at ~17.8x TTM earnings — a ~40% discount to the FMCG peer basket — reflecting the regulated-nature of the core business.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We stay with **Accumulate** (target **₹320**, ~18x FY27E EPS ~₹17.9, E). The tobacco-tax risk is the big unknown; the balance sheet (net cash ~₹40k Cr) and 75%+ payout posture support downside protection. Consensus (CLSA ₹340, Nomura ₹325, Kotak ₹322) sits in a similar band.",
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
            "ITC's three debates: (i) **taxation** — any GST-excise move on cigarettes lands directly on margins, but the government needs the revenue and ITC is the most efficient way to collect it; (ii) **the demerger of hotels** — the December 2025 Hotels demerger list split the hospitality business into ITC Hotels, which now trades separately — the parent is a purer FMCG/agri play; (iii) **agri-commodity cycle** — leaf and grain exports swing quarter-to-quarter.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Cigarette pricing power",
              "Fully priced",
              "Still compounding on mix",
              "stable volumes, price-led NII growth",
            ],
            [
              "Hotels demerger",
              "Value unlock done",
              "Parent now simpler, purer",
              "ITC Hotels listing (Dec 2025)",
            ],
            [
              "FMCG-others",
              "Dilutive",
              "Inflection near",
              "Sunfeast/Classmate scale and margin climb",
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
              driver: "1. Cigarette cash machine with pricing power",
              evidence:
                "ITC owns ~70%+ of the legal cigarette market; volumes stable while price/mix adds ~5-6% a year; large free float and high payouts.",
              consequence:
                "The core generates ~₹12-14k Cr of annual FCF at near-zero incremental capex — funding every other business and shareholder returns.",
              monitor: "Cigarette volume %, price/mix, duty/tax changes, illicit trade share.",
            },
            {
              driver: "2. FMCG 'second engine' crossing the chasm",
              evidence:
                "Sunfeast (biscuits), Aashirvaad (atta), Classmate and Yippee all #1-2 in their categories; aggregate FMCG-others margins improving to ~9-10%.",
              consequence:
                "Each 100 bps of FMCG-others margin adds ~₹500 Cr of PBT — a multiplier for the group's earnings growth as it nears the 10%+ margin mark.",
              monitor: "FMCG-others revenue, margin trajectory, brand share trends.",
            },
            {
              driver: "3. Balance-sheet optionality (net cash ₹40k Cr+)",
              evidence:
                "Post Hotels demerger, ITC holds large net cash; buybacks of ₹15-20k Cr over FY24-26; dividends ₹8.25+ per share.",
              consequence:
                "Capital returns + growth optionality (agri-commodity trading, FMCG M&A) cap downside risk; dividend yield ~3% at current price.",
              monitor: "Buyback/dividend announcements, M&A pipeline, agri trading margins.",
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
            "ITC's inflection post-demerger is **the refocus from a tobacco-beholden conglomerate to a multi-legged FMCG powerhouse** — with hotels gone, the consolidated result more directly mirrors cigarettes + FMCG + agri. Management has guided FMCG-others margins toward 10%+ and the cash pile is being returned aggressively.",
        },
        {
          type: "p",
          text:
            "The watch item is regulatory: any change in cigarette taxation has a compounding effect on the equity story; conversely, stable policy + continued buybacks could re-rate the stock toward ~20x — a ~15% upside to our target.",
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
              lead: "Q2 FY27 (Nov 2026)",
              text: "Cigarette volume trend, FMCG-others margin expansion, interim dividend announcement.",
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
          title: "Accumulate — ₹320 target",
          text:
            "ITC is a high-quality cash compounder at a defensible ~18x; the demerger simplifies the story and the buyback-dividend program underwrites the equity. We'd be buyers below ₹280.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Cigarette taxation/duty shock; (2) illicit trade share gain; (3) FMCG-others margin stalls; (4) agri-leaf volatility; (5) hotel-unlock disappointment post demerger.",
        },
      ],
    },
  ],
};