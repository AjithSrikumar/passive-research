import type { ResearchNote } from "./types";

export const sbiNote: ResearchNote = {
  slug: "state-bank-of-india",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹1,230", sub: "vs ₹1,098 current" },
    { label: "Implied upside", value: "+12.0%" },
    { label: "Market cap", value: "₹9,98,000 Cr", sub: "≈ 9.08 bn shares" },
    { label: "TTM P/B (actual)", value: "~1.85x", sub: "FY27E book ~₹640; P/B 1.72x (E)" },
    { label: "Q1 FY27 NII", value: "₹46,992 Cr (+14.9% YoY)", sub: "domestic NIM ~3.0%" },
    { label: "Q1 FY27 PAT", value: "₹21,121 Cr (+10.2%)", sub: "GNPA 1.47% vs 1.53% QoQ" },
    { label: "FY26 PAT", value: "₹80,032 Cr", sub: "+12.9% YoY; ROE ~18% (standalone)" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (7 Aug 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 NII", value: "₹46,992 Cr", sub: "+14.9% YoY; robust loan profitability" },
            { label: "Q1 FY27 PAT", value: "₹21,121 Cr", sub: "+10.2% YoY; ~400 bps prepandemic slip" },
            { label: "NIM (domestic)", value: "3.00%", sub: "-3 bps QoQ; tight but stable" },
            { label: "Asset quality", value: "GNPA 1.21%", sub: "down 15 bps QoQ; NNPA ~0.08%" },
            { label: "Deposits growth", value: "~10-11% YoY", sub: "CASA ratio healthy; liquidity strong" },
            { label: "Dividend", value: "₹12.25/share", sub: "declared for FY26; yield ~1.1%" },
          ],
        },
        {
          type: "p",
          text:
            "SBI reported Q1 FY27 on 7 August 2026: PAT of **₹21,121 Cr (+10.2% YoY)**, NII of **₹46,992 Cr (+14.9% YoY)**, with GNPA down to **1.21%** and an ROA of ~1.0%+ on a standalone basis. The stock trades at ~1.5x FY27E book — the cheapest large-format bank in the index on quality-adjusted terms.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "Keep **Buy**. We set target **₹1,230 (~1.9x FY27E book ₹650, E)** — inside the 20-analyst band (avg ~₹1,192-1,210). Strength: deposit/dignity moat, 45%+ market share in several retail books, world-class cost-to-deposit; the challenge is a flatter margin trajectory into 1H FY28.",
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
            "The SBI debate: (i) **margin optics** — domestic NIM ~3.0% looks flat while system credit grows 15%+; (ii) **asset quality cyclically** — 1.21% GNPA is a 15-year low, yet the rural/unsecured books get less credit; (iii) **state-ownership discount** — 57% government holding caps float, but also anchors the balance-sheet.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "NIM ~3.0%",
              "Structural ceiling",
              "Stable — no material compression near-term",
              "CASA 44%+; pricing discipline; Q1 NIM flat",
            ],
            [
              "Rural/unsecured risk",
              "Sleeve of worry",
              "Managed — watch list manageable",
              "Slippage ~1%; NNPA 0.08%",
            ],
            [
              "P/B 1.5x forward",
              "Fair for PSU",
              "Cheap on ROA improvement",
              "ROA 1.0%+; FY26 ROE ~18%",
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
              driver: "1. Deposit franchise and CASA moat",
              evidence:
                "44%+ CASA; 22,500+ branches; ~15% of national deposits; low cost of deposits vs private peers.",
              consequence:
                "A structural NIM floor: even at ~3% domestic NIM, SBI generates ~₹45-48k Cr NII per quarter with essentially no deposit-price risk.",
              monitor: "CASA %, deposit growth, cost of deposits, NIM by quarter.",
            },
            {
              driver: "2. Credit cost at cyclical lows",
              evidence:
                "GNPA 1.21%, NNPA ~0.08%, PCR ~80%; slippage ~1% annualised; credit cost ~30-40 bps.",
              consequence:
                "Every 10 bps of credit-cost improvement adds ~₹3,000-4,000 Cr to PAT — the single largest earnings-leverage item at SBI.",
              monitor: "Slippage ratio, PCR, SMA-1/2 watch, agri & microfinance book trends.",
            },
            {
              driver: "3. Capital returns unlock",
              evidence:
                "FY26 dividend ₹12.25; government stake 57%; steady buyback trajectory; CET-1 ~12.3%.",
              consequence:
                "As growth normalises, cash returns should rise; each 100 bps of payout improvement is ~1.2% of yield-equivalent upside at today's price.",
              monitor: "Dividend/buyback announcements, govt share-sale, ROE trajectory.",
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
            "SBI's inflection is the **shift from 'safer public-sector' to 'systemically regulated wealth compounder'**: FY26 PAT ₹80,032 Cr was the strongest single-year print in history, GNPA at 1.21% a 15+ year low, and credit cost now ~30 bps — while a 44%+ CASA book and 1.1% ROA explain the soft derating vs private peers.",
        },
        {
          type: "callout",
          tone: "info",
          title: "SBI paradox",
          text:
            "SBI offers the sector's best balance-sheet and earnings growth + a risk-appetite short — the derating is warranted on NIM (~3%) and growth-windowage, yet the capital returns (buyback + dividend ~₹12.25) have begun to matter.",
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
              lead: "Q2 FY27 (early Nov 2026)",
              text: "Look for NIM stability ~3%, slippage <1% and a credit growth beat; also watch provisioning on the agriculture book.",
            },
            {
              lead: "Capex and solar/green transition",
              text: "SBI lending power into the energy-transition and infra capex theme can lift loan growth 1-2 points.",
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
          title: "Buy — ₹1,230 target",
          text:
            "At ~1.85x trailing book and ~9x FY27E earnings, SBI prices in almost no improvement. With ROA climbing toward 1.1%+ and a fortress balance sheet, the risk-reward is asymmetric: P/B re-rating toward 2x yields ~+25%.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) PSU-specific governance/turnover; (2) deposit-rate pressure caps NIM; (3) government bank levy/fee-tinkering; (4) corporate NPL resurgence in cyclicals; (5) heavy foreign-flow sensitivity on large-cap PSU.",
        },
      ],
    },
  ],
};