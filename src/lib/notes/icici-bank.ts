import type { ResearchNote } from "./types";

export const iciciBankNote: ResearchNote = {
  slug: "icici-bank",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹1,680", sub: "vs ₹1,420 current" },
    { label: "Implied upside", value: "+18.3%" },
    { label: "Market cap", value: "₹9,98,000 Cr", sub: "≈ 7.03 bn shares" },
    { label: "TTM P/E (actual)", value: "~17.5x", sub: "TTM EPS ~₹81; FY27E ~₹95 (E)" },
    { label: "Q1 FY27 NII", value: "+12% YoY", sub: "NIM ~4.1-4.3%; domestic loans +18-19%" },
    { label: "Q1 FY27 PAT", value: "₹15,440 Cr", sub: "+10% YoY; peel-back from high base" },
    { label: "FY26 standalone PAT", value: "₹50,747 Cr", sub: "+18% YoY; asset quality best-in-class" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (18 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 NII", value: "grew ~12% YoY", sub: "loan growth 17-19%; NIM steady ~4.1%" },
            { label: "Q1 FY27 PAT", value: "₹15,440 Cr", sub: "+10% YoY; credit cost low ~0.3%" },
            { label: "FY26 standalone PAT", value: "₹50,747 Cr", sub: "+18% YoY; ₹14,000+ Cr Q4 annualised" },
            { label: "Asset quality", value: "GNPA ~ NB 0.02 credit losses", sub: "PCR ~77%; slippage benign" },
            { label: "Fee momentum", value: "~15-18% YoY", sub: "cards/first tech + corporate cross-flow" },
            { label: "Digital", value: "Ways2T hub scaling", sub: "iMobile super-app user base 100mn+" },
          ],
        },
        {
          type: "p",
          text:
            "ICICI Bank reported Q1 FY27 on 18 July 2026 with PAT of **₹15,440 Cr (+10% YoY)** — a quarter largely in line, with **NIM stable ~4.1-4.3%**, domestic loan growth of **18-19%** and a clean asset-quality print. The bank remains one of the few in the sector compounding earnings mid-teens with a CET-1 ratio among the highest in Indian banking.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "Keep **Buy** with target **₹1,680 (~17.5x FY27E EPS ₹96, E)** — inside the consensus band (avg TP ~₹1,681, range ₹1,430-1,890 across 40+ analysts). We prefer ICICI to peers on fee growth, NIM resilience and a sub-35% incremental cost-to-income.",
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
            "The three pillars of the ICICI debate: (i) **NIM trajectory** — whether the ~4.1% deposit-rate-driven compression has bottomed or still has ~15bps of room down; (ii) **loan versus deposit growth gap** — with system credit growing >15% and deposits ~11-12%, how much market share can ICICI take without funding stress; (iii) **fee-to-asset conversion and cyber/news overhang** — small, but real tail risks.",
        },
        {
          type: "table",
          caption: "Where our view sits",
          cols: ["Question", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "NIM structural floor",
              "4.0-4.2% is the base",
              "NIM stays ~4.1-4.3% on loan mix & rate drift",
              "Q1 NIM held; retail/sequential re-pricing",
            ],
            [
              "Growth at cost of quality",
              "acceptable as long as PCR high",
              "Best-in-class NPA watchlist placement",
              "low slippage, value of watchlist, better provisioning",
            ],
            [
              "Fee and liability moat",
              "Neutral",
              "Top-3 retail fee franchise",
              "wallets, iSafe, trade, NRI flows in top-2",
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
              driver: "1. Retail-led earnings compounding with protected asset quality",
              evidence:
                "Retail + SME loans growing high-teens; Q1 FY27 slivers-well under control; CET-1 ~14.6% post-paid; FY26 PAT +18% YoY.",
              consequence:
                "Low credit cost (≈30-40 bps of loans) gives ~100 bps of extra pre-provision upside per year vs peers, feeding +14-18% EPS CAGRs.",
              monitor:
                "Quarterly NII, credit cost, GNPA/NNPA, slippage ratio, PCR, loan growth by sleeve.",
            },
            {
              driver: "2. Fee income and wealth/insurance platforms",
              evidence:
                "Retail fee flow growing mid-to-high teens (portfolio-turn, insurance distribution, digital-first print). This builds non-NII contribution above 40% of operating profit. Fee ~18% YoY in FY26; insurance cross-sell via ICICI Pru (life) & ICSGI (non-life).",
              consequence:
                "Higher fee mix protects margins, so even in a flat-rate environment ROA can hold ~2.2%.",
              monitor:
                "Fee growth, cps cross-sale channels, wealth AUM growth, digital onboarding.",
            },
            {
              driver: "3. Structural NIM tailwind from liability franchise",
              evidence:
                "Deposit growth accelerating; REPO-rate periods tightening; current/savings ratio ~44%; branch network 10,000+.",
              consequence:
                "A sticky CASA base and pricing discipline underpin earnings through the cycle — lower beta funding in a pinch.",
              monitor:
                "CASA ratio, deposit growth, incremental NIM, cost of deposits.",
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
            "ICICI Bank's inflection is not a single quarter but a regime: **the shift from 'turnaround' to 'steady-state compounding'** — NIM stabilising in the 4.1-4.4% band, credit costs at cyclical lows and fee income newly dominant. FY26 (PAT ₹50,747 Cr) marks the cleanest quality print in its history.",
        },
        {
          type: "p",
          text:
            "The key question is whether India's systemic deposit-sustain problem forces a 'growth at margins cost' trade. We believe ICICI — basis its 44% CASA and fee breadth — is the least-penalised large private bank in that scenario.",
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
              lead: "Q2 FY27 results (mid-Oct 2026)",
              text: "Confirm NIM stability above 4% and loan growth ~17%; any upgrade in guidance, or a buyback, is a re-rating card.",
            },
            {
              lead: "Capex cycle/infra credit",
              text: "Larger corporate loan demand can show up as fee/NII tailwind in H2 FY27.",
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
          title: "Buy — ₹1,680 target",
          text:
            "ICICI Bank is the best balance between growth, quality and price in Indian large-cap financials. At ~17.5x TTM earnings, ~2.1x P/BY27E with 18% earnings CAGR and asset quality at cyclical best, the earnings-per-share path jealously beats inflation.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Global rate/credit surprises; (2) India corporate or unsecured retail credit cycle rollover; (3) regulations on IIRF/NBFC consolidation; (4) deposit competition and cost of funds; (5) cyber/operating outage tail-risks to the digital franchise.",
        },
      ],
    },
  ],
};