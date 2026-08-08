import type { ResearchNote } from "./types";

export const lntNote: ResearchNote = {
  slug: "larsen-toubro",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹4,497", sub: "vs ₹4,040 current" },
    { label: "Implied upside", value: "+11.3%" },
    { label: "Market cap", value: "₹5,57,000 Cr", sub: "≈ 1,379 bn shares" },
    { label: "TTM P/E (actual)", value: "~33.6x", sub: "FY27E EPS ~₹168 (E); P/E ~24x" },
    { label: "Q1 FY27 revenue", value: "₹67,942 Cr (+6.7% YoY)", sub: "Q1 seasonally weaker" },
    { label: "Q1 FY27 PAT", value: "₹4,988 Cr (+15.5%)", sub: "better than expectation" },
    { label: "FY26 revenue", value: "₹2,92,000 Cr", sub: "+12.2% YoY; order inflow ~₹4.6 lakh Cr" },
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
            { label: "Q1 FY27 revenue", value: "₹67,942 Cr", sub: "+6.7% YoY; strong infra segment" },
            { label: "Q1 FY27 PAT", value: "₹4,988 Cr", sub: "+15.5% YoY; margin beat" },
            { label: "Order inflow Q1", value: "₹1,10,000+ Cr", sub: "broad-based; energy heavy" },
            { label: "Order book", value: "~₹5,30,000 Cr", sub: "6.8x FY26 revenue; record" },
            { label: "FY26 revenue", value: "₹2,92,000 Cr", sub: "+12.2% YoY (S&P ₹2.92T)" },
            { label: "Guidance FY27", value: "Inflows +15%, revenue +15%", sub: "EBITDA margin ~13-14% (E)" },
          ],
        },
        {
          type: "p",
          text:
            "L&T reported Q1 FY27 on 28 July 2026: revenue of **₹67,942 Cr (+6.7% YoY)** and PAT of **₹4,988 Cr (+15.5%)**, with order inflow of **₹1.1 lakh Cr** in a seasonally quiet quarter. The order book stands at a record **~₹5.3 lakh Cr** — the clearest earnings-visibility franchise in Indian EPC.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We upgrade to a constructive **Accumulate** with target **₹4,497 (~26.5x FY27E EPS ₹170, E)** — matching the 32-analyst consensus average (₹4,497). The derating to ~24x FY27E vs a 40%+ EPS CAGR opportunity is our core argument; the drags are working-capital intensity and the two-step segment mix.",
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
            "L&T's three debates: (i) **order quality** — how much of the record book converts to revenue, and at what margin; (ii) **working capital** — receivables/advance structure consumes cash at scale; (iii) **conglomerate discount** — the software (LTIMindtree), financials (L&T Finance) and infra monorail/AMC units deserve separate valuations.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Order book quality",
              "Mixed margins",
              "Infra-heavy & high quality",
              "record inflows; margin trend +",
            ],
            [
              "Working capital",
              "Consumes cash",
              "Improving discipline",
              "WC-to-sales trend; cash flows Q1",
            ],
            [
              "Conglomerate discount",
              "Fair",
              "Narrowing (finance demerger)",
              "L&T Finance demerger done (2025)",
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
              driver: "1. Record order book with high visibility",
              evidence:
                "Order book ~₹5.3 lakh Cr (6.8x revenue), inflows ₹1.1 lakh Cr in Q1 FY27; India capex plus Middle East energy dominate.",
              consequence:
                "At even 75% conversion, FY27-29 revenue CAGR of ~14-16% is bankable — the machine delivers when the book is this deep.",
              monitor: "Order inflow run-rate, book-to-sales, bid pipeline, L1 positioning.",
            },
            {
              driver: "2. Margin normalization on mix",
              evidence:
                "EBITDA margin ~12.7-13% in Q1 vs 13% FY26; energy/hydrocarbon margins improving; infra margins ~8-9%.",
              consequence:
                "A 50-100 bps group EBITDA margin expansion is worth ₹2,500-4,500 Cr of PBT — roughly +8-12% to earnings at current scale.",
              monitor: "Segmental EBITDA margins, retention/gain claims, fixed-bid concentration.",
            },
            {
              driver: "3. Capital efficiency & demerger tail",
              evidence:
                "L&T Finance demerged (Sep 2025); ITD Cem/AMC sales simplify; buyback + dividends yield ~1.5%.",
              consequence:
                "Simplified group structure narrows the holdco discount, improving the total-return math even without operational surprises.",
              monitor: "Divestment progress, buyback pace, net working capital days.",
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
            "L&T's inflection: **the 'capex super-cycle' is finally converting into an earnings super-cycle** — a record book, guidance for +15% inflows, and Q1 PAT growth of 15.5% despite seasonality. India's infra spending plus Middle East energy capex are structural, multi-year tailwinds.",
        },
        {
          type: "p",
          text:
            "The demerger/divestment agenda (finance done; infra/IT units next) transforms the group into a 'pure EPC + high-tech' story — historically the re-rating trigger for L&T's multiple.",
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
              text: "Order inflow beat (expect ₹1.3-1.5 lakh Cr), margin expansion confirmation, and any divestment update.",
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
          title: "Accumulate — ₹4,497 target",
          text:
            "L&T offers India's best large-cap visibility: a record ₹5.3 lakh Cr book, +15% guidance, margin improvement and a simplification story. At ~24x FY27E (11% forward yield-adjusted discount to IT peers), it remains a core holdings candidate.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Middle East geopolitical shock slows energy orders; (2) working capital/receivables spike; (3) fixed-bid cost overruns; (4) cement/IT divestment disappointment; (5) domestic capex cyclicality post FY28.",
        },
      ],
    },
  ],
};