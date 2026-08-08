import type { ResearchNote } from "./types";

export const tcsNote: ResearchNote = {
  slug: "tata-consultancy-services",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹2,650", sub: "vs ₹2,455 current" },
    { label: "Implied upside", value: "+7.9%" },
    { label: "Market cap", value: "₹8,87,000 Cr", sub: "≈ 3.62 bn shares" },
    { label: "FY27E P/E", value: "~18x", sub: "consensus FY27E EPS ~₹137-140 (E)" },
    { label: "TTM P/E (actual)", value: "~17.2x", sub: "TTM EPS ₹137.64" },
    { label: "Q1 FY27 revenue", value: "$7.62 bn (+2.7% YoY)", sub: "+3.2% CC; ₹72,275 Cr" },
    { label: "Q1 FY27 operating margin", value: "24.0%", sub: "-130 bps YoY; wage increments quarter" },
    { label: "Q1 FY27 TCV", value: "$9.5 bn", sub: "incl. ~$800 mn SKF AI deal" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (9 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 revenue", value: "$7.62 bn / ₹72,275 Cr", sub: "+2.7% YoY in USD, +3.2% CC; INR tail" },
            { label: "Q1 FY27 PAT", value: "₹13,349 Cr", sub: "+4.9% YoY; QoQ -3% (wages); ex-ex ₹13,849 Cr (+8.5%)" },
            { label: "Q1 FY27 operating margin", value: "24.0%", sub: "-130 bps YoY vs 25.3%; wage increments absorbed" },
            { label: "Deal wins (Q1)", value: "$9.5 bn TCV", sub: "incl. ~$800 mn SKF AI-infrastructure deal" },
            { label: "AI revenue run-rate", value: "$2.6 bn", sub: "~8.5% of revenue; +13.6% sequentially" },
            { label: "Headcount", value: "593,798", sub: "+9,279 in Q1; first major FY27 hiring quarter" },
          ],
        },
        {
          type: "p",
          text:
            "TCS reported Q1 FY27 on 9 July 2026: revenue of **$7.62 bn (+2.9% YoY in constant currency, +3.2% sequentially)**, PAT of **₹13,349 Cr (+4.9% YoY)**, and an operating margin of **24.0% (-130 bps YoY)** — ahead of street expectations on the top line, driven by banking/financial-services conversions and early AI-led engagements. AI services revenue reached a **$2.6 bn annualised run-rate (~8.5% of revenue, +13.6% QoQ)**.",
        },
        {
          type: "p",
          text:
            "The disruptive headline of July was the **corporate reorganisation into five new business groups** — a deliberate rotation of leadership and capital toward AI, platforms and 'breakaway' growth — plus an announced build-out of **up to 8,900 forward-deployed engineers** to embed with clients in an OpenAI/Anthropic-style model. The stock rallied ~4% post-results to **₹2,455**, still ~19% below its 52-week high.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "Maintain Buy. Q1 validated the margin discipline (24.0% in a peak-hiring quarter) and the AI TCV inflection (40%+ of deal pipeline AI-led per management). We set a target of **₹2,650 (~18.5x FY27E EPS ~₹143 (E))** — inside the post-Q1 street band (Jefferies ₹2,600, Citi ₹2,700, Motilal ₹2,550, consensus avg ~₹2,485) — paying up modestly for the AI 'breakaway' option.",
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
            "The market's TCS debate has three pillars: (i) **growth durability** — can a ~595k-employee company re-accelerate, or is ~3-5% CC the structural ceiling without M&A; (ii) **AI monetisation** — whether the $2.6 bn AI run-rate is genuine incremental value or re-labelled managed services; and (iii) **valuation** — at ~17x TTM P/E (vs 30x in FY21-22), whether the de-rating is an opportunity or an insurance against AI-driven disruption of the delivery model.",
        },
        {
          type: "table",
          caption: "Where our view differs from consensus",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Structural growth",
              "4-6% CAGR ceiling",
              "AI + platform services can lift CC growth to ~7-8% by FY28-29 with margin-neutral delivery",
              "AI run-rate +13.6% QoQ; ~40% of TCV AI-led; reorganisation of 5 BUs",
            ],
            [
              "AI monetisation",
              "$2.6 bn is partly label",
              "Incremental AI is margin-accretive services + software; TCV mix proves willingness to pay",
              "$800 mn SKF deal, FDE hiring plan of 8,900, AI CoEs in 10+ cities",
            ],
            [
              "Margin 24.0%",
              "Persistent wage pressure",
              "24% in a peak-hiring quarter; runway to 25% as pyramid+utilisation normalise",
              "Management guides 26-28% long-term; hiring front-loaded this year",
            ],
            [
              "Valuation ~17x TTM",
              "Fair — de-rating is structural",
              "Below HCL/Infosys by quality premium; EPS CAGR ~8-10% with 100%+ payout floor",
              "FY26 EPS ₹137-140 (E); record dividend ₹111 incl. special",
            ],
          ],
        },
        {
          type: "p",
          text:
            "The disagreement is testable each quarter via: CC growth, AI revenue run-rate, TCV + RCV mix, operating margin, and hiring/FDE conversion. If CC growth exits FY28 near 7-8% with margins held, our target is conservative. If AI revenue stalls and CC growth drifts back toward 3-4%, a re-rating down to ~15x TTM is possible.",
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
              driver: "1. AI as a services engine, not just a cost",
              evidence:
                "AI revenue run-rate reached $2.6 bn in Q1 FY27 (~8.5% of revenue, +13.6% QoQ); ~40% of the deal pipeline is now AI-led; TCV $9.5 bn included an ~$800 mn SKF AI-infrastructure mega-deal; hiring of forward-deployed engineers (up to 8,900) to deploy agentic/AI at client sites.",
              consequence:
                "Each $ bn of incremental AI revenue is ~10-15% of current quarterly revenue; if AI maintains a double-digit QoQ run-rate, FY29E revenue can print ~8-10% CC growth — changing the equity market growth narrative.",
              monitor:
                "Quarterly AI run-rate, % of TCV AI-led, FDE headcount and utilisation, new AI 'mega-deal' count.",
            },
            {
              driver: "2. Margin band discipline and payout floor",
              evidence:
                "Operating margin 24.0% in Q1 FY27 despite peak wage increments; FY26 through-year margin ~25.0%; TRAJ has historically re-based toward 24-26% band; dividend trajectory ₹66 → ₹87 (FY25 incl. special) → ₹111 (FY26).",
              consequence:
                "Every 100 bps of margin is ~₹2,700 Cr of EPS (~4-5%). With a >60% payout, TCS converts ~₹ many crore of FCF into yield — supporting a high multiple in a lower-rate era.",
              monitor:
                "Quarterly OM, utilisation, subcontractor mix, dividend/buyback announcements.",
            },
            {
              driver: "3. Structural 'breakaway' reorganisation",
              evidence:
                "Board created five new business groups (July 2026) and a leadership overhaul across BFSI, verticals and geographies; new hires of 9,279 in Q1 are the fastest in three years; a FDE 'agent engineer' model positions TCS like a scaled AI consultancy.",
              consequence:
                "If the reorganisation re-shapes share toward higher-growth AI/platform/cloud segments, TCS can re-rate from a 'utility' multiple toward a software-services multiple, supporting the upside scenario.",
              monitor:
                "Growth of new groups' revenue, R&D/engineering absorption, platform revenue disclose, EBIT margin by new unit.",
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
            "TCS sits precisely at a business inflection: FY26 was the first year in which **AI services became a disclosed, $2 bn+ revenue line** and TCV rotated decisively toward AI-led deals. The FY26 annual result (revenue ₹2,67,021 Cr +4.6%, operating margin 25.2%, EPS ₹137.64) marked the trough of the discretionary-spend cycle; Q1 FY27 confirmed the turn.",
        },
        {
          type: "p",
          text:
            "Structurally, the inflection is the **shift from 'labor pyramid' to 'AI deployment platform'**: FDEs, AI CoEs, SKF-type mega-deals and the reorganisation into 5 BUs redefine TCS as a provider of AI-integrated operations. History says TCS wins when clients are forced to migrate — and AI migration is that force.",
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
              lead: "Q2 FY27 results (early Oct 2026)",
              text: "Expect (1) CC growth uptick toward 4-5%, (2) AI run-rate > $3 bn, (3) fresh large AI deals; margin ~24-24.5%.",
            },
            {
              lead: "Forward-deployed engineers / FDE scale-up",
              text: "Hiring 8,900 FDEs creates a differentiated 'deployment-as-a-service' that can lift both growth and stickiness.",
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
          title: "Buy — ₹2,650 target, +7.9%",
          text:
            "TCS is a cash-generative great-business meeting a genuine AI maturation cycle. Q1 FY27 proved the momentum ($7.6 bn revenue, $9.5 bn TCV, AI $2.6 bn) and margin discipline (24%) under the 5-BU reorganisation. At ~17x TTM / ~18x FY27E with ~4-5% dividend yield, the downside is protected by an >95% payout floor.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) AI ordering slows and incremental revenue under-delivers; (2) pricing squeeze in legacy-managed services; (3) a binary 'displacement' of the delivery model by AI agents in BFSI back-office; (4) cross-currency and subcon inflation; (5) leadership transition risk from the reorganisation.",
        },
      ],
    },
    {
      id: "business-overview",
      label: "Business overview",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "What it does", value: "AI-first IT services & consulting", sub: "cloud, platforms, BPM, engineering" },
            { label: "Global scale", value: "~595k employees", sub: "46 geographies; customers in ~130 countries" },
            { label: "BFSI concentration", value: "~30%+ of revenue", sub: "largest first buyer; strong Q1 BFSI +8.1% CC" },
            { label: "AI run-rate", value: "$2.6 bn", sub: "~8.5% of revenue, +13.6% QoQ" },
            { label: "Moat", value: "Scale + brand + platform assets", sub: "BaNCS, Chroma, AI-plants; customers fully outsourced for decades" },
          ],
        },
      ],
    },
  ],
};