import type { ResearchNote } from "./types";

export const hdfcBankNote: ResearchNote = {
  slug: "hdfc-bank",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹1,040", sub: "vs ₹837 current" },
    { label: "Implied upside", value: "+24.3%" },
    { label: "Market cap", value: "₹12,80,000 Cr", sub: "≈ 15.3 bn shares" },
    { label: "FY27E P/E", value: "~15x", sub: "consensus EPS ~₹55" },
    { label: "FY26 P/E (actual)", value: "~17x", sub: "EPS ₹48.8" },
    { label: "P/ABV (FY27E)", value: "~2.5x", sub: "ABV ~₹415 (E)" },
    { label: "FY26 RoE / RoA", value: "14.1% / 1.9%" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results" },
    { label: "Next catalyst", value: "Q2 FY27 results, Oct 2026" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 PAT (standalone)", value: "₹19,060 Cr", sub: "+5.0% YoY; +9.8% core-adjusted" },
            { label: "Q1 FY27 NII", value: "₹33,535 Cr", sub: "+6.7% YoY" },
            { label: "Q1 FY27 NIM", value: "3.26% / 3.40%", sub: "on assets / on interest-earning assets" },
            { label: "Q1 FY27 GNPA", value: "1.17%", sub: "ex-agri ~0.91% (E)" },
            { label: "Loan / deposit growth", value: "+15.6% / +14.7%", sub: "YoY, Q1 FY27" },
            { label: "FII holding (Jun-26)", value: "41.8%", sub: "down from 48.8% a year earlier" },
          ],
        },
        {
          type: "p",
          text:
            "HDFC Bank reported Q1 FY27 results on 18 July 2026. Standalone PAT of **₹19,060 Cr** rose **5.0% YoY** — but the year-ago quarter carried ₹9,130 Cr of transaction gains from the HDB Financial Services (HDBFS) IPO offer-for-sale, so adjusted for that gain, prior-year one-off provisions and tax credits, core profit growth was **~9.8%**. Net interest income grew **6.7% YoY to ₹33,535 Cr** and NIM was broadly stable at **3.26% on assets / 3.40% on interest-earning assets** — evidence that the post-merger NIM trough is holding.",
        },
        {
          type: "p",
          text:
            "Two trends from the quarter matter more than the headline: (i) the credit-deposit ratio stayed elevated at ~96%, with loan growth (+15.6% YoY) still outpacing deposit growth (+14.7% YoY) — the liability race with the rest of the system is not over; and (ii) asset quality remains the cleanest in large-cap banking, with GNPA at 1.17% and lower net slippages than expected by brokers. The bank has maintained ~4.5 million shareholders, and domestic institutions (mutual funds at 30.6%) have absorbed the continued FII reduction.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We maintain Buy. We keep our FY27E PAT at ~₹83,500 Cr (+12% YoY, in line with consensus) and FY28E at ~₹93,000 Cr. Our target price of ₹1,040 (19x FY27E EPS of ~₹55) is unchanged and sits in line with the consensus average target of ~₹1,040.",
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
            "The market's HDFC Bank debate has three pillars: (i) NIM compression is structural — the merged balance sheet carries a legacy housing-loan book at low yields and a lower CASA ratio (~34% vs ~46% pre-merger), so the bank earns less per rupee of assets; (ii) the credit-deposit ratio near 96% caps growth and forces expensive deposit competition; and (iii) post-merger return ratios (RoE ~14%) are a permanent step down from the ~17% pre-merger level.",
        },
        {
          type: "table",
          caption: "Where our view differs from consensus",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "NIM trajectory",
              "Structural compression continues",
              "Trough reached; stable at 3.3-3.4% (IEA) with gradual recovery as the legacy book reprices",
              "NIM flat-to-up for three quarters; Q1 FY27 3.40% IEA vs 3.40% in Q4 FY26",
            ],
            [
              "Credit-deposit ratio",
              "Growth ceiling; forces costly deposits",
              "LDR ~96% is near peak; deposit franchise (34.1% CASA, granular base) allows normalization without margin sacrifice",
              "Deposits +14.7% YoY despite system-wide competition; CASA 34.1%",
            ],
            [
              "Return ratios",
              "RoE 14% is the new normal",
              "RoA 1.9% is top-quartile; RoE recovers toward 15% as leverage and NIM normalise",
              "RoE 14.1% FY26 vs 13.9% FY25 (PL); RoA stable 1.8-1.9%",
            ],
            [
              "FII outflows",
              "Structural foreign de-rating",
              "Rotation into domestic hands; retail base of 4.5 mn holders is a stabiliser",
              "MF holding up to 30.6% (Jun-26); FII down 7pts over 4 quarters",
            ],
          ],
        },
        {
          type: "p",
          text:
            "The disagreement is testable every quarter: reported NIM, CASA ratio, LDR, loan and deposit growth, GNPA, and shareholding disclosures. If NIM falls below 3.2% (IEA) for two consecutive quarters while the LDR stays above 98%, the compression thesis is right and our multiple should be cut. If NIM holds at 3.3-3.4% with LDR stable, the de-rating to ~17x trailing earnings is an opportunity.",
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
              driver: "1. Liability franchise as the compounding moat",
              evidence:
                "Deposits of ₹31,05,300 Cr at FY26-end (+14.4% YoY), CASA 34.1%, ~8,700+ branches and 4.5 mn shareholders; granular retail deposit base built over three decades; no promoter overhang (0% promoter holding).",
              consequence:
                "A 100bps improvement in the deposit mix (CASA) is worth ~₹60-70 bn of NII a year (E) at current balance-sheet size; deposit growth of ~14% funds loan growth without wholesale-market dependence.",
              monitor:
                "Quarterly CASA ratio, CD ratio, deposit growth vs system; cost of deposits vs peers.",
            },
            {
              driver: "2. NIM trough and operating leverage",
              evidence:
                "NIM stabilised at 3.26% (assets) / 3.40% (IEA) in Q1 FY27; cost-to-income ~40% (E) with opex growth below revenue; legacy HDFC Ltd housing book repricing gradually lifts asset yields.",
              consequence:
                "Each 10bps of NIM is ~₹7,300 Cr of NII (E); our FY27E NIM of ~3.3-3.4% with ~12% PAT growth is achievable with flat NIM and fee/digital growth.",
              monitor:
                "Quarterly NIM, NII growth, cost-to-income ratio, fee income (Q1 FY27: ~₹9,800 Cr).",
            },
            {
              driver: "3. Subsidiary ecosystem and digital scale",
              evidence:
                "HDBFS IPO completed (Oct-2025) monetising the retail-finance arm; stakes in HDFC AMC, HDFC Life and HDFC Ergo retained; digital banking and payments scale across 8,700+ branches.",
              consequence:
                "Subsidiary dividends and valuation are embedded in book value (ABV ~₹390 FY26, E); a full/partial monetisation cycle adds one-off income without core-risk taking.",
              monitor:
                "Subsidiary performance, IPO/monetisation announcements, dividend income line, digital adoption metrics.",
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
            "HDFC Bank is at the classic post-merger normalization point: the July-2023 amalgamation of HDFC Ltd doubled the balance sheet (assets ₹43.6 lakh Cr at FY26-end) and temporarily depressed NIM, CASA and RoE. Three years on, the legacy housing book has substantially repriced, GNPA is back to ~1.15-1.17%, CAR stands at 19.7% (CET1 ~17.3%), and NIM has stopped falling.",
        },
        {
          type: "p",
          text:
            "The financial inflection is visible in the numbers: PAT grew from ₹60,812 Cr (FY24) to ₹74,671 Cr (FY26), a ~11% CAGR on a 2023-merger base, with RoE stable at 14.1% and RoA at ~1.9% — comfortably the best risk-adjusted returns among large banks. The earnings power of the franchise (NII ₹1,28,686 Cr FY26, E) is back to growing in line with the balance sheet.",
        },
        {
          type: "p",
          text:
            "We would re-evaluate the thesis if (i) NIM falls below 3.2% on IEA for two consecutive quarters, (ii) the CD ratio breaks above 100%, or (iii) GNPA moves above 1.5% — any of these would signal that the merger overhang is structural rather than cyclical.",
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
              lead: "Quarterly results — next Q2 FY27 (Oct 2026)",
              text:
                "Each print answers the two monitored questions: NIM trajectory (our base case: stable 3.3-3.4% IEA) and deposit growth vs system. Q1 FY27 (PAT +5.0% reported, +9.8% core) was a positive hold.",
            },
            {
              lead: "Credit-growth re-acceleration",
              text:
                "Retail credit growth is decelerating system-wide; a macro recovery that lifts loan growth toward 14-16% with stable NIM directly compounds EPS toward our FY27E ~₹55.",
            },
            {
              lead: "NIM recovery on the legacy book",
              text:
                "The residual high-yield repricing of the merged mortgage book and any RBI policy easing are both positive for NII; each 10bps is ~₹7,300 Cr of annual NII (E).",
            },
            {
              lead: "Subsidiary monetisation",
              text:
                "HDBFS is listed; further value crystallisation in the AMC/insurance stakes (held at cost within book value) is an upside to our ABV-based cross-check.",
            },
            {
              lead: "Flow stabilisation",
              text:
                "Mutual funds (30.6%) and insurance (7.4%) are absorbing FII selling (41.8%, down from 48.8% a year ago); a pause in outflows removes the sentiment overhang on the multiple.",
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
          type: "p",
          text:
            "Our thesis is three evidence-linked chains. Each chain states an observation, the primary-source evidence, the operating driver it implies, the financial consequence we model, and the valuation implication.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Thesis 1 — The liability franchise is the durable moat",
          text:
            "Observation: the highest-cost input in Indian banking is deposits, and HDFC Bank wins it structurally. Evidence: deposits ₹31.05 lakh Cr (+14.4% YoY FY26), CASA 34.1%, ~8,700+ branches, 4.5 mn shareholders, zero promoter dependence. Driver: granular retail deposits repricing slowly and compounding with the branch network. Financial consequence: ~14% deposit growth funds the loan book (₹29.6 lakh Cr, +12% FY26) without wholesale-market reliance. Valuation implication: liability strength justifies a premium to peers (SBI 12.6x, Axis 13.1x, ICICI ~18x FY26E P/E).",
        },
        {
          type: "callout",
          tone: "info",
          title: "Thesis 2 — The NIM trough has been reached",
          text:
            "Observation: the market prices perpetual post-merger margin compression. Evidence: NIM stable at 3.26% (assets) / 3.40% (IEA) in Q1 FY27 vs 3.40% IEA in Q4 FY26; GNPA 1.17%; cost discipline holding. Driver: legacy mortgage repricing and granular deposit mix gradually lift net margins. Financial consequence: flat NIM alone supports ~12% FY27E PAT growth (₹83,500 Cr, E) on fee income and operating leverage. Valuation implication: at ~15x FY27E EPS the market pays ~7x less than the 10-year average multiple for a bank with a 1.9% RoA.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Thesis 3 — The market is pricing the merge, not the moat",
          text:
            "Observation: the stock de-rated from ~22x to ~17x trailing earnings through the merger digestion, while earnings grew from ₹44,109 Cr (FY23) to ₹74,671 Cr (FY26). Evidence: EPS ₹48.8 FY26; consensus FY27E EPS ~₹55 (+12%); RoA ~1.9% vs ~1.6-1.7% for the large-format peers. Driver: returns are driven by asset-quality discipline (GNPA 1.15-1.17%) and opex control, not cyclical leverage. Financial consequence: our FY28E EPS of ~₹61 (E) embeds only 11% growth. Valuation implication: our 19x FY27E multiple (~1.2x PEG) still leaves the stock 24% below the consensus fair-value zone it occupied for most of the past decade.",
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
            { label: "Promoter", value: "None", sub: "0% promoter holding; widely held public institution" },
            { label: "Founded", value: "1994", sub: "amalgamation with HDFC Ltd, Jul-2023" },
            { label: "Balance sheet (FY26)", value: "₹43.6 lakh Cr", sub: "largest private bank in India" },
            { label: "Deposits (FY26)", value: "₹31.05 lakh Cr", sub: "+14.4% YoY" },
            { label: "Advances (FY26)", value: "₹29.6 lakh Cr", sub: "+12.0% YoY" },
            { label: "Branches", value: "~8,700+", sub: "FY24-reported base, expanding" },
            { label: "FY26 PAT (standalone)", value: "₹74,671 Cr", sub: "+10.9% YoY" },
            { label: "CASA (FY26)", value: "34.1%", sub: "down from pre-merger ~46%" },
            { label: "MD & CEO", value: "—", sub: "succession is the key governance watch" },
          ],
        },
        {
          type: "p",
          text:
            "HDFC Bank is India's largest private-sector bank by assets. Its moat is the liability side: a granular retail deposit franchise built over three decades across ~8,700+ branches, complemented by corporate deposits and a large base of ~4.5 million shareholders. The July-2023 merger with erstwhile HDFC Ltd (India's largest housing finance company) added a ₹6.7 lakh Cr (E) mortgage book and made the bank the system's dominant mortgage lender.",
        },
        {
          type: "p",
          text:
            "The income mix is classic commercial banking: net interest income (~NII ₹1,28,686 Cr FY26, E) plus fees, treasury and other income, funding ~₹29.6 lakh Cr of advances across retail (home, auto, personal, credit cards), commercial and wholesale. The bank is the largest credit-card and payments issuer in the country, and its subsidiaries (HDBFS, HDFC AMC, HDFC Life, HDFC Ergo) extend the franchise into retail finance, asset management and insurance.",
        },
      ],
    },
    {
      id: "business-model",
      label: "Business model",
      blocks: [
        {
          type: "list",
          items: [
            {
              lead: "Deposit-led funding model",
              text:
                "Retail deposits with a CASA ratio of 34.1% (FY26) fund a ~96% loan-to-deposit profile at a blended cost of funds comfortably below the system (E). This is the moat competitors cannot replicate quickly.",
            },
            {
              lead: "Underwriting discipline",
              text:
                "GNPA 1.15-1.17% (Q4 FY26 / Q1 FY27) with ~73% provision coverage (E) reflects conservative credit policy across retail and corporate books; net slippages have been falling.",
            },
            {
              lead: "Fee and payments ecosystem",
              text:
                "Credit cards, wealth, trade and digital payments contribute ~₹9,800 Cr of quarterly fee income (Q1 FY27) — a growing annuity that compounds without incremental capital.",
            },
            {
              lead: "Digital + branch distribution",
              text:
                "The largest private branch network is paired with market-leading digital adoption; cost-to-income is ~40% (E), giving operating leverage as revenue grows faster than opex.",
            },
            {
              lead: "Subsidiary optionality",
              text:
                "HDBFS (listed), HDFC AMC, HDFC Life and HDFC Ergo stakes are carried in the books; monetisations (like the HDBFS OFS) recycle capital without diluting the core franchise.",
            },
          ],
        },
      ],
    },
    {
      id: "revenue-breakdown",
      label: "Revenue breakdown",
      blocks: [
        {
          type: "table",
          caption: "Net revenue composition, Q1 FY27 (disclosed; E = derived)",
          cols: ["Component", "Q1 FY27", "Q1 FY26", "YoY", "Share (E)"],
          rows: [
            ["Net interest income", "₹33,535 Cr", "₹31,420 Cr (E)", "+6.7%", "~72%"],
            ["Fee income", "~₹9,800 Cr", "~₹9,500 Cr (E)", "+3% (E)", "~21%"],
            ["Other income (treasury, dividend, misc.)", "~₹3,000 Cr (E)", "₹12,300 Cr (E)", "—", "~7%"],
            ["Net revenue (reported)", "₹46,360 Cr", "₹53,170 Cr", "-12.8%", "100%"],
          ],
        },
        {
          type: "p",
          text:
            "The Q1 FY26 net revenue figure of ₹53,170 Cr included ₹9,130 Cr of transaction gains from the HDBFS IPO offer-for-sale. Excluding that one-off, underlying net revenue grew low-single digits — a soft quarter on fees (brokerage estimates flagged a ~6% miss) offset by better opex and asset quality.",
        },
        {
          type: "p",
          text:
            "On the balance sheet, FY26 advances of ₹29.6 lakh Cr are roughly 55% retail / 45% wholesale (E); within retail, the merged mortgage book is the largest slice, followed by auto loans, personal loans, cards and Kisan-type agri products. Deposit mix: CASA 34.1%, with term deposits carrying the incremental system competition.",
        },
        {
          type: "small",
          text:
            "Segment-level net revenue is not disclosed in the standard format; figures marked (E) are our estimates consistent with reported net revenue and quarterly disclosures.",
        },
      ],
    },
    {
      id: "geographic-mix",
      label: "Geographic mix",
      blocks: [
        {
          type: "table",
          caption: "Branch network and footprint (disclosed)",
          cols: ["Metric", "FY22", "FY23", "FY24"],
          rows: [
            ["Branches", "6,342", "7,821", "8,738"],
            ["ATMs / BC network", "—", "—", "extensive (E)"],
            ["Shareholder base (mn)", "—", "—", "4.2+"],
          ],
        },
        {
          type: "p",
          text:
            "HDFC Bank's network spans every state; the branch build has run ~900/year since the merger, prioritising semi-urban and rural geographies where deposit mobilisation is cheaper and credit penetration lower. The merged mortgage book concentrates in the top-30 cities, giving the bank a complementary urban-rural mix (E).",
        },
      ],
    },
    {
      id: "segment-analysis",
      label: "Segment analysis",
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Retail banking — the earnings core",
              body:
                "~55% of advances (E): mortgages (largest portfolio post-merger), auto, personal loans, cards and wealth. Retail NIMs are structurally higher and loss rates lowest; this book is the source of the 1.9% RoA.",
            },
            {
              title: "Commercial & wholesale — cyclical earnings",
              body:
                "Working-capital, trade and project finance to mid-corporates and large corporates; margins thinner but capital-efficient, and the natural borrower of the corporate deposit base.",
            },
            {
              title: "Treasury & other — the swing line",
              body:
                "G-Sec and forex trading plus dividends; volatile quarter to quarter (the HDBFS OFS gain hit this line in Q1 FY26) but structurally small — ~7% of net revenue (E).",
            },
            {
              title: "Subsidiaries — the capital cycle",
              body:
                "HDBFS (retail finance, listed Oct-2025), HDFC AMC, HDFC Life, HDFC Ergo. They compound outside the bank's balance sheet and recycle capital through dividends and, occasionally, OFS transactions.",
            },
          ],
        },
      ],
    },
    {
      id: "management-quality",
      label: "Management & stewardship",
      blocks: [
        {
          type: "p",
          text:
            "HDFC Bank is run by one of the deepest professional management benches in Indian banking, with a public-company governance model — no promoter, a majority-independent board, and a leadership-succession cycle that is itself a well-publicised risk factor. The bank's published record through the merger (PAT ₹60,812 Cr FY24 to ₹74,671 Cr FY26, GNPA ~1.2%, CAR 19.7%) reflects execution discipline rather than leverage.",
        },
        {
          type: "list",
          items: [
            {
              lead: "Capital discipline",
              text:
                "CAR 19.7% (CET1 ~17.3%, PL) is comfortably above regulatory minimums; the bank self-funds growth and returns capital through dividends (FY26: ₹15.5/share, E) without diluting.",
            },
            {
              lead: "Disclosure quality",
              text:
                "Quarterly shareholding patterns, earnings presentations and press releases are published promptly on hdfc.bank.in — this note's factual base is drawn from those filings.",
            },
            {
              lead: "Governance watch",
              text:
                "Zero promoter holding removes related-party concentration; the key event risk is senior-management succession, which the market has priced before and will price again — we monitor board announcements.",
            },
          ],
        },
      ],
    },
    {
      id: "industry-overview",
      label: "Industry overview",
      blocks: [
        {
          type: "p",
          text:
            "Indian banking is growing credit at ~11-14% (E) with deposit growth lagging — the structural constraint of FY25-FY26. Net interest margins across the private sector are ~3-4% and normalising toward the low end on deposit-cost pressure; asset quality is at a cyclical low for GNPA (large banks ~1-2.5%).",
        },
        {
          type: "list",
          items: [
            {
              lead: "Deposit competition is the binding constraint",
              text:
                "System deposit growth trails credit growth; banks are paying up for term deposits, which pressures NIMs and favours franchises with high CASA and granular retail bases — HDFC Bank's structural advantage.",
            },
            {
              lead: "Credit cycle and underwriting quality",
              text:
                "Retail credit growth is decelerating after a multi-year boom; unsecured retail books are the cycle's stress point (E). A disciplined, collateralised-heavy book like HDFC's outperforms in this phase.",
            },
            {
              lead: "Policy and digital tailwinds",
              text:
                "RBI easing cycles support NIMs and loan repricing; UPI and account aggregators raise the stakes on digital distribution, where HDFC Bank's branch-plus-app model is among the best capitalised.",
            },
          ],
        },
      ],
    },
    {
      id: "competitive-positioning",
      label: "Competitive positioning",
      blocks: [
        {
          type: "table",
          caption: "Large-bank competitive map (P/E = FY26E trailing basis; E = our assessment)",
          cols: ["Bank", "GNPA (FY26)", "RoA (E)", "Growth vector", "Valuation (E)"],
          rows: [
            ["HDFC Bank", "1.15%", "~1.9%", "Liability-led retail compounding", "~17x TTM / 15x FY27E"],
            ["ICICI Bank", "~1.5% (E)", "~2.0% (E)", "Retail + digital", "~18x TTM"],
            ["State Bank of India", "~2.2% (E)", "~1.0% (E)", "PSU deposit franchise", "~12.6x TTM"],
            ["Axis Bank", "~1.7% (E)", "~1.6% (E)", "Merger + retail", "~13.1x TTM"],
            ["Kotak Mahindra Bank", "~1.5% (E)", "~1.9% (E)", "Wealth + digital", "~18.5x TTM"],
          ],
        },
        {
          type: "p",
          text:
            "HDFC Bank's competitive position rests on two structural facts: the **lowest large-bank GNPA** (1.15-1.17% vs ~1.5-2.2% for peers, E) and the **most granular deposit base**. It does not need to win price wars; it wins the funding race, then compounds. Its multiple (~17x TTM) trades at a discount to ICICI and Kotak on a comparable-risk basis (E) — the discount is the market's merger-anxiety premium, which is exactly the disagreement we are positioned against.",
        },
      ],
    },
    {
      id: "shareholding-pattern",
      label: "Shareholding pattern",
      blocks: [
        {
          type: "table",
          caption: "Ownership by investor class, % of equity (quarterly shareholding disclosures)",
          cols: ["Class", "Jun-25", "Sep-25", "Mar-26", "Jun-26"],
          rows: [
            ["Promoter & group", "0%", "0%", "0%", "0%"],
            ["FII / FPI", "48.8%", "48.4%", "44.1%", "41.8%"],
            ["Mutual funds", "25.6%", "26.0%", "29.5%", "30.6%"],
            ["Insurance & other DII", "10.4% (E)", "10.3% (E)", "10.8% (E)", "11.3%"],
            ["Retail & others", "15.2%", "15.3%", "15.6%", "16.3%"],
          ],
        },
        {
          type: "p",
          text:
            "HDFC Bank is the most widely held financial stock in India: **promoter holding is zero** and the register spans ~4.5 million holders. The visible rotation is foreign-to-domestic: FII/FPI holdings fell from **48.8% (Jun-25) to 41.8% (Jun-26)** while mutual funds rose from 25.6% to **30.6%** — SBI Nifty 50 ETF alone holds 7.48%. Insurance holds ~7.4% (LIC 4.77%).",
        },
        {
          type: "list",
          items: [
            {
              lead: "Largest institutional holders (Jun-26, reported)",
              text:
                "SBI Nifty 50 ETF 7.48%, ICICI Prudential Large Cap Fund 4.84%, LIC 4.77%, HDFC Flexi Cap Fund 3.05%, NPS-HDFC Pension Scheme 3.02%, Nippon India Nifty 50 BeES 2.93%, UTI Nifty 50 ETF 2.46%, Government of Singapore 2.17%.",
            },
            {
              lead: "What we watch",
              text:
                "Whether FII outflows pause (the ETF-heavy domestic bid is absorbing them), and any change in the bank's capital structure; there is no pledge or promoter-liquidity overhang by construction.",
            },
          ],
        },
      ],
    },
    {
      id: "financial-analysis",
      label: "Financial analysis",
      blocks: [
        {
          type: "table",
          caption: "Standalone financial history, fiscal years ended 31 March (₹ Cr; E = derived)",
          cols: ["Metric", "FY22", "FY23", "FY24", "FY25", "FY26"],
          rows: [
            ["Total income", "1,57,263", "1,92,800", "3,07,582", "3,46,149", "3,70,055"],
            ["Net interest income", "72,006", "78,242 (E)", "1,08,532", "1,22,670 (E)", "1,28,686 (E)"],
            ["PAT", "36,961", "44,109", "60,812", "67,347", "74,671"],
            ["PAT growth", "+18.8%", "+19.3%", "+37.9%*", "+10.7%", "+10.9%"],
            ["GNPA", "1.17%", "1.12% (E)", "1.24%", "1.30% (E)", "1.15%"],
            ["RoA (avg assets)", "2.03%", "~2.0% (E)", "~1.9% (E)", "~1.8% (E)", "~1.9%"],
            ["RoE (avg)", "16.9%", "~16% (E)", "~16% (E)", "~14% (E)", "14.1%"],
            ["CAR", "18.9%", "19.6% (E)", "18.8%", "19.6% (E)", "19.7%"],
          ],
        },
        {
          type: "small",
          text:
            "*FY24 growth is non-comparable: FY24 includes nine months of erstwhile HDFC Ltd operations after the 1-Jul-2023 amalgamation. FY23 figures are the pre-merger standalone bank. EPS FY26: ₹48.8 on ~15.3 bn shares.",
        },
        {
          type: "p",
          text:
            "The five-year record shows the merger arithmetic: total income more than doubled from FY22 to FY26 while the PAT base compounded from ₹36,961 Cr to ₹74,671 Cr. Asset quality is the standout — GNPA of 1.15% with ~73% coverage (E) — and capital is abundant (CAR 19.7%). The balance sheet is asset-light in risk terms: RoA of ~1.9% on ₹43.6 lakh Cr of assets is the industry's most consistent risk-adjusted return. Q1 FY27 (PAT ₹19,060 Cr, +5.0% reported / +9.8% core) keeps the 12-month trend intact.",
        },
      ],
    },
    {
      id: "forecasts",
      label: "Forecasts",
      blocks: [
        {
          type: "table",
          caption: "Our estimates, fiscal years ending 31 March (E = our estimates)",
          cols: ["Metric", "FY26A", "FY27E", "FY28E"],
          rows: [
            ["Total income (₹ Cr)", "3,70,055", "~3,95,000", "~4,25,000"],
            ["NII (₹ Cr)", "1,28,686 (E)", "~1,38,000", "~1,50,000"],
            ["PAT (₹ Cr)", "74,671", "83,500", "93,000"],
            ["PAT growth", "+10.9%", "+11.8%", "+11.4%"],
            ["EPS (₹, ~15.3 bn shares)", "48.8", "~55", "~61"],
            ["RoA / RoE", "1.9% / 14.1%", "~1.9% / ~14.3%", "~1.9% / ~14.5%"],
            ["GNPA (period-end)", "1.15%", "~1.1%", "~1.1%"],
          ],
        },
        {
          type: "p",
          text:
            "Our FY27E build: NIM stable at ~3.3-3.4% (IEA), loan growth ~13-15%, fee growth ~8-10%, opex growing below revenue, and credit costs ~60-70bps (E). The consensus (trendlyne, 39 analysts) expects ~12% profit growth for FY27 — our numbers are within a rounding of the street. Sensitivity: each 10bps of NIM is ~₹7,300 Cr of NII (E); each 50bps of credit cost is ~₹7,500 Cr of pre-tax profit (E).",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key estimate risks",
          text:
            "We embed zero NIM recovery; the upside case (RBI easing + legacy repricing) is worth ~5-8% EPS above our FY28E. The downside case is deposit-cost escalation, which would put FY27E EPS at ~₹52 rather than ₹55.",
        },
      ],
    },
    {
      id: "consensus",
      label: "Consensus & revisions",
      blocks: [
        {
          type: "table",
          caption: "Street view (in.marketscreener / investing.com / trendlyne, Aug 2026)",
          cols: ["Measure", "Value"],
          rows: [
            ["Average target price", "₹1,038-1,040 (+24%)"],
            ["Target range", "₹890 to ₹1,360"],
            ["Consensus rating", "Strong Buy (40 analysts)"],
            ["FY26 P/E", "~16.5x"],
            ["FY27E P/E", "~14.5x"],
            ["P/B (FY26E / FY27E)", "~2.2x / ~2.0x"],
          ],
        },
        {
          type: "list",
          items: [
            {
              lead: "Revisions have been steady at the margin",
              text:
                "Recent published moves: PL maintains Buy at ₹1,040 (19-Jul-26) after a 'soft quarter' on fees offset by opex and asset quality; ICICI Securities Buy at ₹1,120 (Mar-26); targets across the street cluster at ₹915-1,175 with a single sell-rated outlier at ₹890 (data: investing.com).",
            },
            {
              lead: "Where we sit",
              text:
                "Our ₹1,040 target sits on the consensus average. The debate is not direction but magnitude — how much of the merger drag is permanent. We are at the constructive end of a still-constructive street.",
            },
          ],
        },
      ],
    },
    {
      id: "valuation",
      label: "Valuation",
      blocks: [
        {
          type: "p",
          text:
            "We value HDFC Bank on a forward P/E anchored to consensus-consistent FY27E EPS, cross-checked against P/ABV. At ₹837 the stock trades at ~17x FY26 EPS of ₹48.8 and ~15x our FY27E of ₹55 — a discount to its own 10-year average (~22x) for a bank with a 1.9% RoA and the system's best asset quality.",
        },
        {
          type: "table",
          caption: "Target price derivation (on our estimates)",
          cols: ["Step", "Parameter", "Value"],
          rows: [
            ["1", "FY27E EPS", "₹55 (E)"],
            ["2", "FY28E EPS", "₹61 (E)"],
            ["3", "Target multiple", "19x FY27E"],
            ["4", "Target price", "₹1,045 → ₹1,040"],
            ["5", "Upside to current price (₹837)", "+24.3%"],
          ],
        },
        {
          type: "p",
          text:
            "**Multiple justification.** 19x FY27E (~1.2x PEG against ~12% EPS CAGR) is a premium to SBI (~12.6x) and Axis (~13.1x) and in line with ICICI (~18x) and Kotak (~18.5x) — justified by (i) the lowest large-bank GNPA at 1.15%, (ii) a 34.1% CASA deposit franchise that funds growth without wholesale dependence, (iii) RoA ~1.9% that is both high and stable, and (iv) a zero-promoter, 4.5-million-shareholder governance structure. The multiple is capped at ~20x by the reality of ~11-12% EPS growth — this is not a re-rating trade, it is a growth-at-the-right-price trade.",
        },
        {
          type: "table",
          caption: "Sensitivity — target price vs multiple and FY27E EPS",
          cols: ["Multiple / EPS", "₹52 (bear)", "₹55 (base)", "₹58 (bull)"],
          rows: [
            ["17x", "₹884", "₹935", "₹986"],
            ["19x", "₹988", "₹1,045", "₹1,102"],
            ["21x", "₹1,092", "₹1,155", "₹1,218"],
          ],
        },
        {
          type: "p",
          text:
            "In the bear case (NIM below 3.2%, credit costs rising, EPS ₹52 at 17x), fair value is ₹884 — still above the current price, meaning the downside is roughly the consensus low target. In the bull case (NIM recovery, EPS ₹58 at 21x), fair value is ₹1,218, ~46% above the current price. Risk-reward is asymmetric to the upside.",
        },
      ],
    },
    {
      id: "risks",
      label: "Risk register",
      blocks: [
        {
          type: "risks",
          rows: [
            {
              risk: "Structural NIM compression",
              probability: "Medium",
              financial:
                "Deposit-cost escalation + low-yield legacy mortgage book push NIM below 3.2% (IEA); FY27E PAT falls to ~₹78,000 Cr.",
              valuation:
                "Multiple de-rates toward 15x; fair value approaches ₹900 and the consensus-average premium disappears.",
              indicator:
                "Quarterly NIM on assets and IEA; cost of deposits vs system; CASA ratio; CD ratio.",
              mitigation:
                "Granular retail deposits, ~34% CASA, and legacy-book repricing; no wholesale dependence.",
              kpi: "NIM ≥ 3.2% IEA for two consecutive quarters; CD ratio < 100%.",
            },
            {
              risk: "Credit cycle stress in unsecured retail",
              probability: "Medium",
              financial:
                "Credit costs rise from ~60bps to ~90-100bps (E); FY27E PAT cut ~8-10%.",
              valuation:
                "Peers de-rate together; HDFC's quality premium (GNPA 1.15% vs ~1.5-2.2% peers) caps the relative damage.",
              indicator:
                "GNPA/NNPA, slippage rate, credit-card and personal-loan vintage curves, MFI and agri stress.",
              mitigation:
                "Collateralised-heavy book, ~73% provision coverage (E), conservative underwriting discipline.",
              kpi: "GNPA < 1.5%; net slippages to advances < 1%.",
            },
            {
              risk: "Deposit race / CD ratio breaks 100%",
              probability: "Medium",
              financial:
                "Lending growth constrained to deposit growth (~10-12%); NII growth slows to mid-single digits.",
              valuation:
                "EPS growth drops to ~8%; multiple compresses toward 15-16x as the compounding case stalls.",
              indicator:
                "CD ratio, deposit growth vs system, term-deposit pricing, loan growth.",
              mitigation:
                "Branches (~900/year builds), CASA 34.1%, corporate deposits; growth can be deliberately slowed.",
              kpi: "CD ratio < 100%; deposit growth ≥ 13%.",
            },
            {
              risk: "Senior management / succession events",
              probability: "Low",
              financial: "No direct P&L impact; operational continuity risk.",
              valuation:
                "History shows headline-driven multiple shocks of 5-10% on leadership news; our view would be reassessed on a discontinuity.",
              indicator: "Board announcements, leadership disclosures, media reports.",
              mitigation:
                "Institutionalised bench, zero-promoter governance, deep succession planning as a public watch item.",
              kpi: "None — event-driven watch.",
            },
            {
              risk: "Regulatory actions (RBI/SEBI) and compliance",
              probability: "Low",
              financial:
                "Fines, business restrictions (e.g., card-sourcing pauses) are historically one-off and modest vs earnings.",
              valuation: "Headline risk only; earnings impact immaterial (historical precedent).",
              indicator:
                "RBI enforcement actions, audit findings, penalty announcements.",
              mitigation:
                "Mature compliance framework; history of swift remediation.",
              kpi: "None — event-driven.",
            },
            {
              risk: "Index-flow / FII overhang persists",
              probability: "Medium",
              financial: "No direct P&L impact.",
              valuation:
                "Multiple compression independent of fundamentals if foreign selling resumes; already priced at ~15x FY27E.",
              indicator:
                "Quarterly shareholding; index-eligibility flows; foreign-portfolio stats.",
              mitigation:
                "MF absorption (30.6%) and 4.5 mn retail holders have stabilised the register.",
              kpi: "FII % stabilised ~42%; MF holding rising.",
            },
          ],
        },
      ],
    },
    {
      id: "sources-downloads",
      label: "Sources & downloads",
      blocks: [
        {
          type: "p",
          text:
            "All factual statements in this note are drawn from the primary documents below. Where we have derived figures (e.g., share counts, FY22-24 estimates), they are marked (E) and reconciled against disclosed totals.",
        },
        {
          type: "downloads",
          items: [
            {
              label: "Q1 FY27 press release (18 Jul 2026)",
              url: "https://www.hdfc.bank.in/content/dam/hdfcbankpws/in/en/pdf/about-us/financial-results/2026-2027/quarter-1/press-release-june-2026.pdf",
              note: "Q1 FY27 PAT ₹19,060 Cr, NIM 3.26%/3.40%, GNPA 1.17%",
            },
            {
              label: "Q1 FY27 financial results (full format)",
              url: "https://www.hdfc.bank.in/content/dam/hdfcbankpws/in/en/pdf/about-us/financial-results/2026-2027/quarter-1/financial-results-for-the-quarter-ended-june-30-2026.pdf",
              note: "Balance-sheet, deposits, advances, capital adequacy",
            },
            {
              label: "Q4 FY26 earnings presentation",
              url: "https://www.hdfc.bank.in/content/dam/hdfcbankpws/in/en/pdf/about-us/financial-results/2025-2026/quarter-4/q4fy26-earnings-presentation.pdf",
              note: "FY26 annual figures, GNPA 1.15%, RoA/RoE",
            },
            {
              label: "Shareholding pattern — June 2026",
              url: "https://www.hdfc.bank.in/content/dam/hdfcbankpws/in/en/personal-banking/discover-products/about-us/stakeholders-information/shareholding-ownership/Shareholding-Pattern-June-2026-updated.pdf",
              note: "FII 41.83%, MF 30.62%, retail 16.25%",
            },
            {
              label: "FY24 Integrated Annual Report",
              url: "https://www.hdfc.bank.in/content/dam/hdfcbankpws/in/en/pdf/annual-reports/2023-24/integrated-annual-report-2023-24.pdf",
              note: "Merger disclosures, NII ₹1,08,532 Cr, branches 8,738",
            },
            {
              label: "Consensus & valuation data",
              url: "https://www.marketscreener.com/quote/stock/HDFC-BANK-LIMITED-137537972/consensus/",
              note: "Average target ~₹1,040, Strong Buy, FY27E P/E ~14.5x",
            },
            {
              label: "Cross-check: yearly results & ratios",
              url: "https://economictimes.indiatimes.com/hdfc-bank-ltd/yearly/companyid-9195.cms",
              note: "FY22-FY26 total income and PAT history",
            },
          ],
        },
      ],
    },
  ],
};
