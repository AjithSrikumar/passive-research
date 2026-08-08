import type { ResearchNote } from "./types";

export const bajajFinanceNote: ResearchNote = {
  slug: "bajaj-finance",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹1,175", sub: "vs ₹1,060 current" },
    { label: "Implied upside", value: "+10.8%" },
    { label: "Market cap", value: "₹6,58,000 Cr", sub: "≈ 620 mn shares" },
    { label: "TTM P/E (actual)", value: "~34x", sub: "FY27E EPS ~₹33-35 (E)" },
    { label: "Q1 FY27 PAT", value: "₹6,081 Cr", sub: "+28% YoY; AUM +24% to ₹5.47 lakh Cr" },
    { label: "Q1 FY27 co-lend share", value: "~20%+", sub: "AUM mix diversification" },
    { label: "AUM growth guidance", value: "~22-25%", sub: "FY27; consistent" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (~24 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 PAT", value: "₹6,081 Cr", sub: "+28% YoY; beats the street" },
            { label: "Q1 FY27 NII", value: "₹12,571 Cr", sub: "+23% YoY" },
            { label: "AUM", value: "₹5,46,944 Cr", sub: "+24% YoY; robust across retail sleeves" },
            { label: "New loans (Q1)", value: "16.13 mn", sub: "+20% YoY; customers +30% to 124.4 mn" },
            { label: "GNPA", value: "1.11%", sub: "resilient sub-1.2% despite 24% growth" },
            { label: "Co-lending", value: "~20% of flows", sub: "key to lower cost and growth" },
          ],
        },
        {
          type: "p",
          text:
            "Bajaj Finance reported Q1 FY27 (~24 July 2026): PAT of **₹6,081 Cr (+28% YoY)** on NII of **₹12,571 Cr (+23%)**, with AUM of **₹5.47 lakh Cr (+24%)**, 16.1 mn new loans (+20%) and a customer base of 124.4 mn. The NBFC continues to demonstrate a 'growth + quality' combination that is rare in Indian credit.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We maintain **Buy** (target ~₹1,160-1,200, top of street). Q1 confirmed: loan book compounding ~25%, credit costs contained, and co-lending has de-risked the liability. Consensus (Nuvama ₹1,175, Nomura ₹1,140, avg ~₹1,075-1,200) is slightly lower than our constructive base.",
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
            "Bajaj Finance's debates: (i) **scalability of retail unsecured** — can +23% AUM growth persist without rising delinquency; (ii) **cost-to-income** — expansion into new products (SME, EVs, gold) raises cost; (iii) **rate cycle** — the rural MSME book is rate-sensitive and any macro shock in the unsecured sleeve is the main bearer risk.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "AUM growth 22-25%",
              "Slowing toward 15-18%",
              "Keeps 20%+ on pull-through",
              "Q1 +24% run-rate; first-half strong",
            ],
            [
              "Unsecured credit cycle",
              "Post-teardown",
              "Adverse but bounded",
              "GNPA 1.11%; credit cost ~12 bps",
            ],
            [
              "Co-lending dilution",
              "Margin negative",
              "Net-positive capital",
              "Growth doubles at ~30% lower risk",
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
              driver: "1. Original machine — new loans and customers",
              evidence:
                "Q1: 16.1 mn loans (+20%), customers 124.4 mn (+30%), 28 product lines and 4M+ hmm.",
              consequence:
                "The growth-side flywheel is compounding at mid-20s without stealing margin — the single largest EPS driver of the franchise.",
              monitor: "New loans, customers, cross-sell ratio, product delivery cost.",
            },
            {
              driver: "2. Credit risk management and co-lending",
              evidence:
                "GNPA ~1.11%, credit cost ~12-15 bps; co-lending covers ~20% of flows and allocates ~20-25% of risk. Payback from more data and the co-bank model is competent.",
              consequence:
                "A diversified-risk stack keeps credit costs low enough that builds scalability, protecting the book and the multiple.",
              monitor: "GNPA/Stage2, portfolio mix, co-lending share, collections efficiency.",
            },
            {
              driver: "3. Multiple de-rating as a source of return",
              evidence:
                "Bajaj Finance at ~34x TTM is well off the 40-50x prints of FY21-22; earnings are compounding 25-30%.",
              consequence:
                "Even without re-rating, the 25%+ EPS CAGR plus a modest dividend (~₹6-8/share) supports our double-digit upside over 12 months.",
              monitor: "P/E vs history, deposit growth, competitive borrower yields.",
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
            "Bajaj Finance is past the consumer-credit inflection point and into the capital-hygiene phase: AUM >₹5.5 lakh Cr with 24% growth AND credit costs near 12 bps is a rare conjunction. The watch is the microfocus: co-lending, digital Ebitda, and the new Debit Card pay landscape.",
        },
        {
          type: "p",
          text:
            "The real inflection is the diversification risk-reduction: SME, EVs, gold and structured finance now complement the classic consumer loans. That lowers the one-asset-class tail risk while preserving the historical growth compounder.",
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
              text: "Watch AUM growth holding 23%+, NIM ~9.5%, credit costs ~10-12 bps, and any co-lending/licence news.",
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
          title: "Buy — ₹1,160 target",
          text:
            "Bajaj Finance is the highest-quality compounder in Indian consumer credit: ~25% AUM growth, ~12 bps credit cost and doing it with scale. At 34x TTM it's fair-to-cheap vs history; we are Buyers on this base.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) microfinance/retail credit-cycle rollover; (2) co-lending execution; (3) rates cost upends NIM; (4) valuation derating vs causality; (5) regulatory cap on fees/field actions — a present vector.",
        },
      ],
    },
  ],
};