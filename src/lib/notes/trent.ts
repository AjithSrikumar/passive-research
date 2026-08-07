import type { ResearchNote } from "./types";

export const trentNote: ResearchNote = {
  slug: "trent",
  header: [
    { label: "Rating", value: "Strong Buy" },
    { label: "Target price", value: "₹5,200", sub: "vs ₹4,376 current" },
    { label: "Implied upside", value: "+18.8%" },
    { label: "Market cap", value: "₹155,600 Cr" },
    { label: "FY27E P/E", value: "74x", sub: "on our estimates" },
    { label: "FY26 P/E (actual)", value: "90x" },
    { label: "Operating ROCE (FY26)", value: "36.5%" },
    { label: "Dividend yield", value: "0.1%" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results" },
    { label: "Next catalyst", value: "Q2 FY27 results, Nov 2026" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 revenue (standalone)", value: "₹5,666 Cr", sub: "+19% YoY" },
            { label: "Q1 FY27 net profit (standalone)", value: "₹532 Cr", sub: "+26% YoY" },
            { label: "Q1 FY27 operating margin", value: "12.9%", sub: "vs 13.6% FY26 avg" },
            { label: "Stores at Jun-2026", value: "1,312", sub: "+20 net in Q1" },
            { label: "FII holding (Mar-26)", value: "15.6%", sub: "stabilised after 8-qtr decline" },
          ],
        },
        {
          type: "p",
          text:
            "Trent reported Q1 FY27 results on 6 August 2026. Standalone revenue from operations (excl. GST) rose **19% YoY to ₹5,666 Cr** and net profit rose **26% YoY to ₹531.8 Cr**, ahead of consensus on both lines. The operating EBITDA margin of 12.9% trailed the FY26 average of 13.6% on seasonal mix and the opening curve of new stores, but was in line with the historical Q1 pattern.",
        },
        {
          type: "p",
          text:
            "The store engine remains the central fact of the story: Trent added a net **19 Zudio and 1 Westside store** in the quarter, taking the fashion portfolio to **1,312 stores across 330 cities** (FY26-end: 1,286 stores, 321 cities). Management stated that the pace of FY27 store additions is broadly in line with the chairman's outlook of ~300 gross openings. Two items from the FY26 results are still being digested by the market: the proposed **bonus issue** (ratio subject to shareholder approval) and a dividend of ₹6 per share (FY25: ₹5).",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We retain our Strong Buy. We trim our FY27E revenue by 1% to ₹24,300 Cr (+21%) to reflect the slightly slower Westside opening cadence, hold our EBITDA margin assumption at 14.4%, and keep FY27E EPS at ₹59. Our target price of ₹5,200 (70x FY28E EPS of ₹74.5) is unchanged and sits 8% above the consensus average target of ₹4,832.",
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
            "The consensus view of Trent has two pillars: (i) Zudio's growth will decelerate toward 12-15% as the store base matures and competition (Reliance Trends, Ajio, online fast-fashion) intensifies, and (ii) at ~90x FY26 P/E the market has already paid for the roll-out. The stock's derating from 140x to 90x forward earnings since early FY25, alongside a steady FII stake decline from 27.9% (Jun-24) to 15.6% (Mar-26), suggests the sell-down is broad-based rather than thesis-driven.",
        },
        {
          type: "table",
          caption: "Where our view differs from consensus",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Zudio growth runway",
              "Decelerating; approaching saturation at ~1,000 stores",
              "Acceleration into Tier II/III; >2,000 stores (E) economically viable",
              "80%+ of new stores in Tier II/III; revenue/store stable at ~₹10.5-11 Cr (E)",
            ],
            [
              "Margin ceiling",
              "~14% operating EBITDA margin cap",
              "15%+ by FY29E on store maturity + private labels",
              "GM 44.4% in FY26 (up ~200bps YoY); margin rose 12.6% to 13.5% FY25-26",
            ],
            [
              "FII outflows",
              "Read as deteriorating sentiment / governance overhang",
              "Rotation into domestic institutional hands; holdings stabilised at 15.6%",
              "DII stake 13.2% (Mar-24) to 22.4% (Mar-26); FII flat for two quarters",
            ],
            [
              "Valuation of optionality",
              "Star, online and new formats worth little",
              "Option value worth ₹250-350/share (E) outside base case",
              "Star own brands 72% of Q4 FY25 revenue; online +43% in FY25",
            ],
          ],
        },
        {
          type: "p",
          text:
            "Our differing assumptions are testable every quarter: store adds, same-store growth, revenue/store, EBITDA margin and shareholding disclosures. If Zudio revenue/store begins to fall while gross margin holds, the first pillar of our view is wrong. If EBITDA margin breaks above 14% with store productivity stable, consensus is wrong.",
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
              driver: "1. Zudio's price-led volume engine",
              evidence:
                "Zudio revenue crossed US$1bn in FY25 (chairman's statement); 244 Zudio stores opened in FY25 and 212 in FY26, with 80%+ of new stores in Tier II/III cities. Portfolio at 982 Zudio stores (Jun-26) with stable revenue/store of ~₹10.5-11 Cr (E).",
              consequence:
                "Each ~200-store year at ~₹10-11 Cr/store (E) adds ~₹2,000-2,200 Cr of revenue, before same-store growth. We model Zudio revenue +22% in FY27E.",
              monitor:
                "Quarterly net store adds; Zudio same-store growth; revenue/store; city count (242 in FY25, 330 in Jun-26).",
            },
            {
              driver: "2. Margin and capital-efficiency step-up",
              evidence:
                "Operating EBITDA margin rose from ~12.6% (FY25) to 13.5% (FY26); gross margin improved ~200bps to 44.4% (FY26); operating ROCE 36.5% (FY26 annual report). Cash-and-carry model funds inventory from suppliers; no credit sales.",
              consequence:
                "Every 100bps of consolidated EBITDA margin is ~₹200 Cr of EBITDA (E). We model margin at 14.4% FY27E and 15.2% FY28E on store maturity and mix.",
              monitor:
                "Quarterly gross margin; EBITDA margin; ROCE; inventory turnover (5.1x in FY26).",
            },
            {
              driver: "3. Portfolio optionality beyond Zudio",
              evidence:
                "Westside scaled to 300 stores with online >6% of its revenue (+43% online growth in FY25); Star (food & grocery) owns 72% of its revenue through own brands and is consolidating the Metro India stores; new formats (Curry & Lime, U.S. Polo Association) at 23 stores.",
              consequence:
                "Adjacencies are ~15% of revenue today (E) and loss-making or breakeven; a Star turnaround or new-format scale adds earnings with no change to the Zudio story.",
              monitor:
                "Star same-store growth and margin; online share; new brand store adds; consolidated vs standalone revenue gap.",
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
            "We are positioned at the point where the Zudio rollout crosses from metropolitan beachhead into the deep Tier II/III market: stores grew from 765 (Mar-25) to 982 (Jun-26), and 80%+ of new openings target cities where organised value fashion is underpenetrated. This is the phase of the cycle in which unit economics are best — the store base is young, rent costs are at pre-densification levels, and the brand's price architecture (most SKUs under ₹1,000) is structurally protected by an own-brand supply chain.",
        },
        {
          type: "p",
          text:
            "The second inflection is financial. FY25-FY26 delivered the first clean step-up in profitability at scale: operating EBITDA margin 12.6% to 13.5%, operating ROCE at 36.5%, and gross margin to 44.4%. The FY26 annual report flags the proposed bonus issue and a dividend increase, a capital-return posture that only becomes credible when organic returns consistently exceed growth capital needs.",
        },
        {
          type: "p",
          text:
            "We would re-evaluate the thesis if either inflection stalls: (i) Zudio same-store growth turns negative while gross margin holds (saturation, not mix), or (ii) EBITDA margin slips back below 13% for two consecutive quarters on rollout costs without a step-up in store-level productivity.",
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
              lead: "Quarterly results, next 6-Nov-2026",
              text:
                "Each quarter provides direct evidence on the two monitored variables: store adds (our base case ~70-80 net per quarter) and same-store growth. Q1 FY27 revenue +19% and a 12.9% margin in line with seasonality is a positive print.",
            },
            {
              lead: "FY27 store-outlook confirmation at Q2 results",
              text:
                "Management's stated FY27 opening pace (~300 gross stores) implies Zudio net adds of ~200+, which alone underpins ~20% revenue growth for the year.",
            },
            {
              lead: "Bonus issue and dividend execution",
              text:
                "Shareholder approval and record dates for the proposed bonus issue and ₹6 dividend (proposed with FY26 results) will reset the EPS base and improve retail accessibility of the scrip.",
            },
            {
              lead: "Star / Metro integration milestones",
              text:
                "Star's own-brand share (72% of Q4 FY25 revenue) and any disclosure of Metro India store consolidation progress are the option-value catalysts outside the base case.",
            },
            {
              lead: "FII-flow stabilisation",
              text:
                "FII holding has been flat at 15.6% for two quarters after eight quarters of decline. Continued stability removes the sentiment overhang that has pressured the multiple.",
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
          title: "Thesis 1 — Zudio is a compounding volume platform, not a maturing format",
          text:
            "Observation: organised value fashion is underpenetrated in Tier II/III India. Evidence: 244 Zudio stores opened FY25 and 212 in FY26; 80%+ of new stores in Tier II/III; portfolio 765 (Mar-25) to 982 stores (Jun-26); revenue crossed US$1bn in FY25. Driver: price architecture (most SKUs under ₹1,000) and an own-brand supply chain that keeps the price gap vs branded alternatives wide. Financial consequence: we model Zudio revenue +22% in FY27E and store-level revenue stable at ~₹10.5-11 Cr (E). Valuation implication: the growth in the base business alone justifies holding the premium multiple; the format is still below half of its plausible scale.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Thesis 2 — Operating leverage is now visible in the numbers",
          text:
            "Observation: the rollout has reached the scale at which fixed costs stop growing with revenue. Evidence: operating EBITDA margin 12.6% (FY25) to 13.5% (FY26); gross margin to 44.4%; operating ROCE 36.5%; inventory turnover 5.1x; cash-and-carry model (no receivables) funded partly by supplier credit. Driver: store maturation — revenue/store of new cohorts rising toward the ~₹10.5-11 Cr portfolio average (E). Financial consequence: we model FY27E EBITDA margin 14.4% and FY28E 15.2%, taking PAT from ₹1,721 Cr (FY26) to ~₹2,650 Cr (FY28E, +24% CAGR). Valuation implication: EPS of ₹74.5 in FY28E is the anchor for our 70x target multiple.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Thesis 3 — The market pays for Zudio and receives the rest free",
          text:
            "Observation: the valuation debate focuses entirely on Zudio store economics. Evidence: Westside at 300 stores with online at >6% of its revenue (+43% online growth FY25); Star's own brands at 72% of Q4 FY25 revenue; 23 other-lifestyle stores; consolidated revenue exceeds standalone by only ~₹370 Cr, so Star is early-stage and optional, not dilutive. Driver: adjacent categories (beauty, footwear, food) cross-sold through the same store network. Financial consequence: adjacencies are ~15% of revenue (E) and roughly breakeven; a Star turnaround or new-format scale adds earnings with no change to the Zudio model. Valuation implication: we ascribe ₹250-350/share of option value (E) outside the base case; our target embeds only the base business.",
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
            { label: "Promoter", value: "Tata Sons group", sub: "37.0% holding, no pledge" },
            { label: "Format", value: "Value & premium fashion retail", sub: "plus food & grocery (Star)" },
            { label: "Fashion stores (Jun-26)", value: "1,312", sub: "301 Westside · 982 Zudio · 29 other" },
            { label: "Cities", value: "330", sub: "FY25: 242" },
            { label: "Fashion sq ft (FY26)", value: "17.7 Mn", sub: "14.9 Mn at FY25-end" },
            { label: "FY26 revenue (consolidated)", value: "₹20,074 Cr", sub: "+17% YoY, excl. GST" },
            { label: "FY26 PAT (consolidated)", value: "₹1,721 Cr", sub: "+12% YoY" },
            { label: "Chairman", value: "Noel N. Tata", sub: "also Chairman, Tata Sons (since Oct-24)" },
            { label: "CEO", value: "P. Venkatesalu", sub: "in office since 2015" },
          ],
        },
        {
          type: "p",
          text:
            "Trent is the Tata group's retail platform. The fashion business trades through three banners: **Zudio** (value fashion, own brands, most SKUs under ₹1,000), **Westside** (mid-premium private-label lifestyle retail, predominantly 20,000-30,000 sq ft stores) and a small portfolio of other lifestyle brands. The food-and-grocery arm, **Trent Hypermarket (Star)**, is consolidated and was enlarged by the acquisition of Metro AG's Indian cash-and-carry business, which closed in January 2024.",
        },
        {
          type: "p",
          text:
            "The business is a private-label retailer: the overwhelming majority of merchandise is own-branded, sourced directly, with no credit sales to customers. This makes Trent a margin-and-inventory story rather than a rent-and-receivables story, and explains the 36.5% operating ROCE at scale.",
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
              lead: "Own-brand value architecture (Zudio)",
              text:
                "Zudio replaces national brands with house brands at 40-60% (E) lower price points. This protects gross margin from brand-channel discounting and creates a structural price moat that online fast-fashion finds hard to replicate profitably.",
            },
            {
              lead: "Cash-and-carry with supplier-funded working capital",
              text:
                "No receivables; inventory funded in part by supplier credit; rent largely fixed-term. The model compounds with low incremental debt; net debt is negligible and D/E is ~0.2x (reported).",
            },
            {
              lead: "Capital-light store format at the value end",
              text:
                "Zudio stores are ~10,000-12,000 sq ft in high-street and mall locations in Tier II/III cities; fit-out cost is low relative to premium formats (E). Payback of ~2-3 years at steady state (E) funds the rollout from operating cash flow.",
            },
            {
              lead: "Premiumisation at the top (Westside)",
              text:
                "Westside adds premium and private-label lifestyle categories with an online channel >6% of its revenue; it upgrades the city portfolio and trains management for the adjacent market rather than the Zudio value end.",
            },
            {
              lead: "Star as a long-cycle option",
              text:
                "The food-and-grocery arm (78 stores at FY25-end, own brands 72% of Q4 FY25 revenue) is consolidating Metro India stores and is structurally at the earliest stage of the portfolio's maturity curve.",
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
          caption: "FY26 revenue by banner (estimates derived from disclosed totals; E = our estimate)",
          cols: ["Banner", "FY26 revenue (E)", "Share (E)", "Stores (Mar-26)", "Revenue/store (E)"],
          rows: [
            ["Zudio", "~₹10,300 Cr", "~52%", "963", "~₹10.7 Cr"],
            ["Westside", "~₹7,300 Cr", "~37%", "300", "~₹24.3 Cr"],
            ["Other lifestyle", "~₹2,100 Cr", "~11%", "23", "—"],
            ["Star (consolidated)", "~₹400 Cr", "~2%", "78 (FY25)", "—"],
          ],
        },
        {
          type: "p",
          text:
            "Disclosed anchors: standalone revenue from operations (excl. GST) was ₹19,701 Cr in FY26 and ₹16,668 Cr in FY25; Zudio crossed US$1bn in FY25 (chairman's statement); consolidated revenue from operations was ₹20,074 Cr in FY26 (consolidated vs standalone gap ≈ Star + inter-segment). Revenue per square foot is comparable across formats at ~₹10,000 (E) — the differentiator between banners is price architecture and store size, not unit productivity.",
        },
        {
          type: "small",
          text:
            "Banner-level revenue is not disclosed separately; figures marked (E) are our estimates consistent with disclosed totals and growth disclosures.",
        },
      ],
    },
    {
      id: "geographic-mix",
      label: "Geographic mix",
      blocks: [
        {
          type: "table",
          caption: "Store footprint progression (disclosed)",
          cols: ["Metric", "FY25", "FY26", "Q1 FY27"],
          rows: [
            ["Fashion stores (net)", "1,043", "1,286", "1,312"],
            ["Westside", "248", "300", "301"],
            ["Zudio (incl. UAE)", "765", "963", "982"],
            ["Other lifestyle", "30", "23", "29"],
            ["Cities", "242", "321", "330"],
            ["Fashion sq ft (Mn)", "14.9", "17.7", "18.0+"],
            ["Net store adds in year", "+266", "+243", "+20 (Q1)"],
          ],
        },
        {
          type: "p",
          text:
            "The rollout is deliberately provincial: **80%+ of new Zudio stores open in Tier II/III cities**, where organised value fashion penetration is lowest and rent economics are most favourable. City count grew from 242 (Mar-25) to 330 (Jun-26). International presence remains symbolic — 7 Zudio stores in the UAE — and is an option rather than a near-term driver. We estimate Zudio's revenue is ~75% Tier II/III weighted (E).",
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
              title: "Zudio — the compounding engine",
              body:
                "765 stores (Mar-25) to 982 (Jun-26); 212 net openings in FY26; US$1bn+ revenue in FY25; most SKUs under ₹1,000. The format's economics rest on revenue/store stability (~₹10.5-11 Cr, E) while the store count doubles. This is the segment that must deliver ~₹2,000 Cr of incremental revenue per year for our estimates.",
            },
            {
              title: "Westside — the premium counterweight",
              body:
                "300 stores at FY26-end; ~24,000 sq ft average; online >6% of revenue with +43% online growth in FY25. Westside provides the premium price architecture, national brand halo and the distribution backbone for private-label premium categories. FY26 opened 60 Westside stores; FY27 cadence is the monitorable.",
            },
            {
              title: "Star (Trent Hypermarket) — early-cycle option",
              body:
                "78 stores at FY25-end; own brands 72% of Q4 FY25 revenue; Q4 FY25 revenue +17% YoY; Metro India integration underway since the Jan-24 acquisition close. Star is ~2% of consolidated revenue (E) and roughly breakeven — it is option value, not earnings, at this point.",
            },
            {
              title: "Other lifestyle — portfolio experiment",
              body:
                "Curry & Lime, U.S. Polo Association and allied brands at 23-29 stores. Immaterial to the P&L; relevant only as evidence that the group can develop formats beyond its two anchors.",
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
            "Trent is run by a long-tenured retail management under the Tata Sons umbrella. Chairman **Noel N. Tata** also chairs Tata Sons (since October 2024), aligning the parent's interest with the retail platform; CEO **P. Venkatesalu** has led the company since 2015, through the Zudio rollout, the Star acquisition and the FY21 COVID trough (when the company posted a consolidated pre-tax loss of ₹132 Cr).",
        },
        {
          type: "list",
          items: [
            {
              lead: "Capital discipline",
              text:
                "Expansion is funded from operating cash flow with negligible net debt; FY26 saw the first dividend increase to ₹6/share and a proposed bonus issue — capital-return behaviour consistent with a business past its heavy investment phase.",
            },
            {
              lead: "Disclosure quality",
              text:
                "Store-level disclosures (adds by banner, city count, sq ft, UAE stores) are above Indian retail peers' standard, and quarterly shareholding filings are promptly available; this is what allows third-party analysis of the rollout economics.",
            },
            {
              lead: "Governance framework",
              text:
                "Promoter holdings (Tata Sons 32.4%, Tata Investment Corp 4.3%) are unencumbered and stable at 37.0%; related-party dealings with the Tata ecosystem are routine and disclosed; the board carries independent members and a working-chairman structure.",
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
            "India's apparel and fashion market is estimated in the US$70-90 bn range (industry estimates, E) and is one of the fastest-growing discretionary categories, with the organised share of the market still rising as GST compliance, urbanisation and branded consumption migrate spend from kirana and local tailoring. The fastest-growing pocket is value fashion — price points below ₹1,000 — where penetration of organised retail remains in the low teens (E).",
        },
        {
          type: "list",
          items: [
            {
              lead: "Penetration headroom",
              text:
                "Fashion retail per capita spend in India is a fraction of comparable Asian markets (E); every 1% of penetration shift from unorganised to organised trade is a multi-billion-dollar revenue pool.",
            },
            {
              lead: "Fast-fashion entrants",
              text:
                "Global fast-fashion brands and domestic value players (Reliance Trends, Ajio, Myntra marketplace formats) compete for the same customer; the competitive set has widened, which argues for monitoring price architecture more than market share headlines.",
            },
            {
              lead: "Consumption cycle",
              text:
                "Discretionary spend is sensitive to rural wages and urban middle-income confidence; the sector is cyclical, and 2025-26 has seen uneven consumption across categories — a risk our demand scenario addresses explicitly.",
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
          caption: "Fashion retail competitive map (E = our assessment)",
          cols: ["Player", "Price architecture", "Store economics", "Growth vector"],
          rows: [
            ["Zudio", "Value — most SKUs < ₹1,000", "High-density, ~11 Cr/store (E)", "Tier II/III store count"],
            ["Westside", "Mid-premium private label", "Premium locations, ~24 Cr/store (E)", "Premiumisation + online"],
            ["Reliance Trends", "Value-mid", "Similar format, wider network", "JioMart integration"],
            ["H&M / Uniqlo India", "Mid premium", "Flagship-heavy", "Metro density"],
            ["Ajio / Myntra / Shein (online)", "Value-mid, aggressive promos", "No store capex", "Discount-led volume"],
            ["Page / local brands", "Mid premium", "Franchise-led", "Brand assortment"],
          ],
        },
        {
          type: "p",
          text:
            "Zudio's structural advantage is its own-brand supply chain: it can hold the price gap against branded and online alternatives while retaining gross margin — the FY26 gross margin of 44.4% demonstrates that the value positioning does not trade away profitability. The main competitive risk is not a single entrant but simultaneous discount-led online price wars in the value band, which we address in the risk register.",
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
          cols: ["Class", "Mar-24", "Mar-25", "Dec-25", "Mar-26"],
          rows: [
            ["Promoter & group", "37.0%", "37.0%", "37.0%", "37.0%"],
            ["FII / FPI", "26.8%", "19.7%", "15.6%", "15.6%"],
            ["DII (incl. MFs, insurance)", "13.2%", "17.2%", "21.5%", "22.4%"],
            ["Other public", "—", "—", "—", "—"],
          ],
        },
        {
          type: "p",
          text:
            "The promoter and promoter group hold **37.01%** (Tata Sons 32.45%, Tata Investment Corporation 4.28%, Ewart Investments 0.28%, Titan 0.001%) — steady across quarters with no pledge. The visible rotation is institutional: **FII/FPI holdings declined from 26.8% (Mar-24) to 15.6% (Mar-26)**, bottoming out flat over the last two quarters, while domestic institutions rose from 13.2% (Mar-24) to 22.4% (Mar-26). Mutual funds hold 13.9% (Mar-26); insurance companies ~5.3% (LIC ~1.9%, SBI Life ~2.2%).",
        },
        {
          type: "list",
          items: [
            {
              lead: "Largest institutional holders (reported)",
              text:
                "ICICI Prudential Balanced Advantage Fund ~2.4%, SBI Nifty 50 ETF ~2.2%, Nippon India ETF ~1.6%, UTI Flexi Cap ~1.3%, SBI Life Insurance ~2.2%, LIC ~1.9%, Amansa Holdings ~1.0-1.35% (FII).",
            },
            {
              lead: "What we watch",
              text:
                "Continuation of the FII stabilisation; promoter pledge status (nil); and the share-count change when the proposed bonus issue is approved — the bonus resets the EPS denominator and the per-share price but changes no economics.",
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
          caption: "Consolidated financial history, fiscal years ended 31 March (₹ Cr; disclosed figures)",
          cols: ["Metric", "FY22", "FY23", "FY24", "FY25", "FY26"],
          rows: [
            ["Revenue from operations", "4,498", "8,242", "12,375", "17,135", "20,074"],
            ["Revenue growth", "+73%", "+83%", "+50%", "+39%", "+17%"],
            ["Gross margin (reported)", "42.6%", "42.3%", "42.2%", "42.4%", "44.4%"],
            ["Operating EBITDA margin", "—", "—", "—", "~12.6%", "13.5%"],
            ["PAT (attributable)", "~110*", "297", "1,487*", "1,534", "1,721"],
            ["Fashion stores (period-end)", "433", "566", "777", "1,043", "1,286"],
            ["Net store adds", "+81", "+133", "+211", "+266", "+243"],
          ],
        },
        {
          type: "small",
          text:
            "FY22 PAT and FY24 PAT include one-time items (FY24 includes gains related to the Metro India acquisition). Operating EBITDA figures for FY25-FY26 are computed from disclosed operating EBITDA (₹2,161.71 Cr FY25, ₹2,702.21 Cr FY26, consolidated) and are adjusted for the new labour code impact in FY26. Standalone FY26: revenue ₹19,701 Cr, PAT ₹1,968 Cr, EPS ₹55.36, operating EBITDA margin 13.64%, operating ROCE 36.54%.",
        },
        {
          type: "p",
          text:
            "The FY22-FY26 record is a compounder's financial profile: revenue grew 4.5x over four years with no dilution of gross margin, and the last two years delivered the operating-leverage payoff (EBITDA margin +~90bps, ROCE 36.5%). The FY26 balance sheet is effectively unlevered (D/E ~0.2x reported); the cash-and-carry model means inventory is the main working-capital item, turning ~5.1x in FY26. Free cash flow is thinner than the profit line during the rollout — we estimate ~₹700 Cr of FCF in FY26 (E) — because store fit-out is the growth capex of the business.",
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
            ["Revenue (consolidated, ₹ Cr)", "20,074", "24,300", "29,100"],
            ["Revenue growth", "+17%", "+21%", "+20%"],
            ["Operating EBITDA margin", "13.5%", "14.4%", "15.2%"],
            ["Operating EBITDA (₹ Cr)", "2,702", "3,500", "4,423"],
            ["PAT (₹ Cr)", "1,721", "2,100", "2,650"],
            ["PAT growth", "+12%", "+22%", "+26%"],
            ["EPS (₹, on current shares)", "48.4", "59.1", "74.5"],
          ],
        },
        {
          type: "p",
          text:
            "Our FY27E build: ~200-220 net Zudio adds and ~40-55 Westside adds (gross ~300 openings, per management's outlook), same-store growth in the low-to-mid single digits, and ~50bps of margin gain from store maturation. Sensitivity: each 50bps of EBITDA margin is ~₹120 Cr of EBITDA (E); each 100 incremental Zudio stores is ~₹1,050 Cr of revenue (E). EPS figures are on the current share count (~355.5 Mn shares); the proposed bonus issue would halve (or otherwise reset) the per-share figures on approval.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key estimate risks",
          text:
            "We are 8% above consensus on FY27E revenue and ~10% above on EPS. Consensus appears to embed similar store adds but a faster margin path; our margin assumptions are deliberately below the level at which price competition would threaten the model.",
        },
      ],
    },
    {
      id: "consensus",
      label: "Consensus & revisions",
      blocks: [
        {
          type: "table",
          caption: "Street view (in.marketscreener, 27 May 2026)",
          cols: ["Measure", "Value"],
          rows: [
            ["Average target price", "₹4,832 (+14%)"],
            ["Target range", "₹4,100 to ₹5,450"],
            ["Consensus rating", "OUTPERFORM"],
            ["FY26E P/E", "83.2x"],
            ["FY27E P/E", "63.7x"],
            ["P/B (FY26E / FY27E)", "21.4x / 16.6x"],
            ["EV/Sales (FY26E / FY27E)", "7.4x / 5.8x"],
          ],
        },
        {
          type: "list",
          items: [
            {
              lead: "Revisions have been constructive at the margin",
              text:
                "Recent published moves include an upgrade to Buy (Phillip, Feb-26, TP ₹4,647) and an initiation at Buy (Asian Markets Securities, Nov-25, TP ₹5,232); the notable negative was a Sell downgrade (Citi, Nov-25, TP ₹4,350) and a Hold cut on target (Jefferies, Apr-26, TP ₹4,675).",
            },
            {
              lead: "Where we sit",
              text:
                "Our ₹5,200 target is 8% above the consensus average and 1% below the highest published target (₹5,450). The dispersion reflects differing views on Zudio's runway — the exact debate we address in our variant perception.",
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
            "We value Trent on a forward P/E anchored to our FY28E EPS, cross-checked against consensus multiples and a sensitivity grid. The stock trades at ~90x FY26 actual earnings and ~74x our FY27E EPS; consensus FY27E P/E is 63.7x on street earnings that run ~10% above ours.",
        },
        {
          type: "table",
          caption: "Target price derivation (on our estimates)",
          cols: ["Step", "Parameter", "Value"],
          rows: [
            ["1", "FY28E PAT", "₹2,650 Cr (E)"],
            ["2", "FY28E EPS (current shares)", "₹74.5"],
            ["3", "Target multiple", "70x"],
            ["4", "Target price", "₹5,215 → ₹5,200"],
            ["5", "Upside to current price (₹4,376)", "+18.8%"],
          ],
        },
        {
          type: "p",
          text:
            "**Multiple justification.** A 70x FY28E multiple (~1.1x PEG against 20%+ EPS CAGR, ~63x on FY27E) is a premium to consensus FY27E of 63.7x, justified by: (i) 20%+ revenue compounding with operating ROCE of 36.5%; (ii) a Zudio runway we estimate at 2,000+ stores (E) — the market prices ~1,300-1,400; (iii) gross-margin evidence (44.4%) that value pricing is not eroding profitability; and (iv) capital-return posture (dividend hike, proposed bonus). The premium is capped by the same evidence: growth deceleration toward the mid-teens is the base case beyond FY28E, so we refuse to push the multiple above 75x.",
        },
        {
          type: "table",
          caption: "Sensitivity — target price vs multiple and FY28E EPS",
          cols: ["Multiple / EPS", "₹68 (bear)", "₹74.5 (base)", "₹81 (bull)"],
          rows: [
            ["65x", "₹4,420", "₹4,843", "₹5,265"],
            ["70x", "₹4,760", "₹5,215", "₹5,670"],
            ["75x", "₹5,100", "₹5,588", "₹6,075"],
          ],
        },
        {
          type: "p",
          text:
            "In the bear case (demand slowdown cuts FY28E EPS to ₹68 and the multiple de-rates to 65x), fair value is ₹4,420 — 1% above the current price, i.e. the downside is roughly the consensus low target. In the bull case (margin reaches 15.8% and Zudio momentum holds), fair value is ₹6,075, 39% above the current price. We see the risk-reward as asymmetric to the upside.",
        },
        {
          type: "small",
          text:
            "Valuation is on the current share count of ~355.5 Mn shares. If the proposed bonus issue is approved, per-share figures and target should be adjusted for the ratio; economic value is unchanged.",
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
              risk: "Urban & discretionary demand slowdown",
              probability: "High",
              financial:
                "Revenue growth falls below 15%; fixed-cost deleverage pressures the 14.4% FY27E margin.",
              valuation:
                "EPS falls and the multiple de-rates toward the sector (55-65x); fair value approaches ₹4,400.",
              indicator:
                "Quarterly same-store growth; industry retail sales; rural wage growth; GST collections on apparel.",
              mitigation:
                "Value positioning is the defensive pocket of fashion; portfolio spans income cohorts.",
              kpi: "Same-store growth and store-level revenue; two quarters below +5% triggers a review.",
            },
            {
              risk: "Zudio saturation / cannibalisation",
              probability: "Medium",
              financial:
                "Revenue per store declines as density rises; incremental stores no longer add EBITDA at current rates.",
              valuation:
                "The growth premium (70x vs 55x sector) compresses; our 2,000-store runway assumption breaks.",
              indicator:
                "Revenue/store by cohort; new-store productivity ramp; store closure rates.",
              mitigation:
                "Store resizing, format evolution (beauty, footwear, accessories), and price-architecture defence.",
              kpi: "Revenue/store stable at ~₹10.5-11 Cr (E) for two consecutive quarters.",
            },
            {
              risk: "Discount-led competition in the value band",
              probability: "Medium",
              financial:
                "Gross margin (44.4% FY26) gives back 200-300bps defending the price gap.",
              valuation:
                "EBITDA margin falls below 13%; EPS and target both cut.",
              indicator:
                "Gross margin; discount intensity in online marketplaces; competitor store adds in same cities.",
              mitigation:
                "Own-brand sourcing keeps the price gap structural; supplier relationships at scale.",
              kpi: "Gross margin; Zudio price index vs branded alternatives.",
            },
            {
              risk: "Rollout margin dilution from young-store curve",
              probability: "Medium",
              financial:
                "Break-even of new cohorts extends; FY27E margin misses by 50-80bps.",
              valuation:
                "One-year EPS miss alone de-rates the multiple; target falls to ₹4,800-4,900 range.",
              indicator:
                "Store-age mix; EBITDA margin vs our 14.4% FY27E path.",
              mitigation:
                "Disciplined opening cadence (~300 gross per management outlook); store resizing.",
              kpi: "Quarterly EBITDA margin; store-age weighted productivity.",
            },
            {
              risk: "FII outflows resume",
              probability: "Medium",
              financial: "No direct P&L impact.",
              valuation:
                "Multiple compresses regardless of fundamentals if the index-level selling resumes.",
              indicator:
                "Quarterly shareholding pattern; index flows; promoter pledge status.",
              mitigation:
                "Domestic institutional bid has absorbed the last 8 quarters of FII selling.",
              kpi: "FII % stabilised at 15.6% for two quarters; DII bid at 22.4%.",
            },
            {
              risk: "Governance & key-person events",
              probability: "Low",
              financial: "Operational disruption if management departs; no quantified impact.",
              valuation: "Headline-driven multiple shock; our view would be reassessed.",
              indicator:
                "Board announcements; promoter-holding changes; related-party disclosures.",
              mitigation:
                "Tata Sons stewardship and a working-chairman structure reduce event risk.",
              kpi: "None — qualitative watch.",
            },
            {
              risk: "Regulatory / quality scrutiny on fast fashion",
              probability: "Low",
              financial: "Operational cost increases; possible compliance capex.",
              valuation: "Marginal EBITDA impact; headline risk only.",
              indicator: "Policy announcements on textile standards; quality complaints.",
              mitigation: "Compliance investment; own-brand quality control at scale.",
              kpi: "None — event-driven.",
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
            "All factual statements in this note are drawn from the primary documents below. Where we have derived figures (e.g., banner-level revenue splits, revenue per store), they are marked (E) and reconciled against disclosed totals. Estimates of market size and competitor economics are third-party or our assessment and are marked (E).",
        },
        {
          type: "downloads",
          items: [
            {
              label: "Q4 FY26 results press release (22 Apr 2026)",
              url: "https://docs.trent-tata.com/Press_Release_Q4_FY26.pdf",
              note: "FY26 annual figures, Q4 FY26, store data, dividend & bonus proposal",
            },
            {
              label: "FY26 Annual Report",
              url: "https://docs.trent-tata.com/Annual_Report_FY_2025-26.pdf",
              note: "EPS ₹55.36, operating ROCE 36.54%, standalone operating EBITDA margin 13.64%",
            },
            {
              label: "Q4 FY25 results press release (29 Apr 2025)",
              url: "https://docs.trent-tata.com/Press_release_Q4_FY25_V3_(29042025).pdf",
              note: "FY25 annual figures, 1,043 fashion stores, Zudio >US$1bn revenue",
            },
            {
              label: "Shareholding pattern, Q4 FY25",
              url: "https://docs.trent-tata.com/Shareholding_Pattern_Q4_FY25.pdf",
              note: "Promoter 37.0058%, Tata Sons 32.4457%, Tata Investment Corp 4.2779%",
            },
            {
              label: "Trent investor relations — quarterly updates & ARs",
              url: "https://www.trentlimited.com/",
              note: "Q1 FY27 update (6 Aug 2026), FY22 annual report, prior period filings",
            },
            {
              label: "Consensus & valuation data",
              url: "https://in.marketscreener.com/quote/stock/TRENT-LIMITED-31311737/consensus/",
              note: "Average target ₹4,832, consensus OUTPERFORM, P/E 83.2x/63.7x FY26E/FY27E",
            },
            {
              label: "Consolidated financials & ratios",
              url: "https://www.screener.in/company/TRENT/consolidated/",
              note: "Cross-check on revenue, PAT and margin history FY22-FY26",
            },
          ],
        },
      ],
    },
  ],
};
