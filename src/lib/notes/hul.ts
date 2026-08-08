import type { ResearchNote } from "./types";

export const hulNote: ResearchNote = {
  slug: "hindustan-unilever",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹2,260", sub: "vs ₹2,078 current" },
    { label: "Implied upside", value: "+8.8%" },
    { label: "Market cap", value: "₹4,88,000 Cr", sub: "≈ 2.35 bn shares" },
    { label: "TTM P/E (actual)", value: "~45.6x", sub: "FY27E EPS ~₹48-50 (E)" },
    { label: "Q1 FY27 revenue", value: "₹15,796 Cr (+11.2% YoY)", sub: "domestic +8-9%; volumes +6%" },
    { label: "Q1 FY27 EBITDA margin", value: "~23.6%", sub: "+80 bps YoY ballast" },
    { label: "FY26 revenue", value: "₹61,331 Cr", sub: "+5% YoY (S&P: ₹64,193 Cr)" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (28 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 revenue", value: "₹15,765 Cr", sub: "+3.2% YoY; domestic +8.3%; volumes +6%" },
            { label: "Q1 FY27 EBITDA margin", value: "~23.6%", sub: "+80 bps YoY; gross margin up on input relief" },
            { label: "Q1 FY27 PAT", value: "~₹2,720 Cr", sub: "+9% YoY ex-one-offs" },
            { label: "FY26 actual", value: "Revenue ₹61,331 Cr", sub: "+5% YoY; PAT ₹10,876 Cr" },
            { label: "USG (rural proxy)", value: "~+3.5% YoY", sub: "recovering but below long-run ~5-6%" },
            { label: "Dividend", value: "Interim+final ₹35-40", sub: "long streak of growing dividends" },
          ],
        },
        {
          type: "p",
          text:
            "HUL reported Q1 FY27 on 28 July 2026: revenue of **₹15,765 Cr (+3.2% YoY, domestic +6.3%)**, with **EBITDA margin ~23.6% (+80 bps YoY)** and PAT of **~₹2,720 Cr** excluding one-offs. Volume growth (~+6%) beat category averages; a strong beat on profitability than on absolute demand elasticity.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We move to a sharper **Accumulate**: HUL (₹2,078) derated ~45x TTM — a ~15-20% de-rating vs FY20-21 — while the compounding thesis (rural + premium + cocoa/input relief) is intact. Target **₹2,260** — the consensus 42-analyst average is ₹2,634; we are more conservative on growth.",
        },
      ],
    },
    {
      id: "business",
      label: "Business overview (summary)",
      blocks: [
        {
          type: "p",
          text:
            "HUL is India's largest FMCG business: home care (~30% of rev) with Surf/Comfort, personal care (~37%) with Rexona/Lakme, foods (~15%) and a small refreshments/international sleeve. Distribution covers 9-10 million outlets; D2C ('Dover') bets on premium personal care are the growth swing factor.",
        },
        {
          type: "kv",
          items: [
            { label: "Home care", value: "~30% of revenue", sub: "fabric wash + household; margins ~24%" },
            { label: "Beauty & personal care", value: "~37% of revenue", sub: "premiumisation lever; Lakmé/Brn DSLs" },
            { label: "Foods & refreshments", value: "~22% of revenue", sub: "kitchens + ice cream; recovery" },
            { label: "Other (incl. exports)", value: "~11%", sub: "diversified international" },
            { label: "USG / rural", value: "~45%+ of consumption", sub: "recovering but still below peak" },
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
              driver: "1. Volume-led recovery with margin upside",
              evidence:
                "Q1 FY27 volumes +6% YoY while HUL kept structural defences; gross margin expansion on input deflation in sohan/MRL/edible oils.",
              consequence:
                "If volumes hold +5-6% and margins gain ~100-150 bps through FY27, EPS growth of 12-14% is achievable for a 'stodgy' FMCG.",
              monitor: "Quarterly volume, gross margin, input (palm/soy/tea), rural USG print.",
            },
            {
              driver: "2. Digital and premiumisation structural tailwind",
              evidence:
                "'Dover' beauty scale up; premium horizontal brands gaining; D2C compilers like Powerbeauty and Parsely are strong.",
              consequence:
                "Premium mix plus omnichannel reduces price-elasticity drag and protects gross margins even in soft demand.",
              monitor: "Premium mix share, D2C growth, digital media efficiency.",
            },
            {
              driver: "3. Risk-reward in the de-rating",
              evidence:
                "45.6x TTM is ~30% below the 65-70x peak premium multiple of FY20; dividend yield ~1.6%+; earnings resilience proven.",
              consequence:
                "At ~40-42x FY27E with margin recovery, a partial re-rating is realistic without heroic assumptions.",
              monitor: "Consensus earnings drift, sector beta, rural recovery prints.",
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
            "HUL is at a **volume-demand inflection**: after 2 years of rural-led suppression and margin-elastic competition, Q1 FY27 shows volume +6% with margin +80 bps — the first quarter where both grew together since FY24. If rural income recovery (fertilizer-loan-whatman smiley) continues, FY27 growth could re-accelerate above mid-single digits.",
        },
        {
          type: "p",
          text:
            "The bigger structural point is the mix shift: ethnic brands gaining urban share, digital direct channels scaling, and the premium subdivision blooming — a better place to be than the classic 'HUL as a defensive' franchise, though competitive risk from new-age D2C remains.",
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
              text: "Look for another volume +5-6%, a margin step-up and updated comment on soft commodities.",
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
          title: "Accumulate — ₹2,260 target",
          text:
            "HUL has de-rated ~45x TTM below its L-T average while its core franchise is fine and improving. At the current price, patience is rewarded: an annual volume-to-earnings compounding of ~10-12% plus a modest re-rating. Good for defensive portfolios.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Rural recovery disappoints; (2) commodity inflation resurface (palm, oil, tea); (3) competitive D2C/retail-price war; (4) brutal write-offs in non-core; (5) sector de-rating in a higher-rate regime.",
        },
      ],
    },
  ],
};