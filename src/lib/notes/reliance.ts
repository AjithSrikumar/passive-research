import type { ResearchNote } from "./types";

export const relianceNote: ResearchNote = {
  slug: "reliance-industries",
  header: [
    { label: "Rating", value: "Strong Buy" },
    { label: "Target price", value: "₹1,700", sub: "vs ₹1,309 current" },
    { label: "Implied upside", value: "+29.9%" },
    { label: "Market cap", value: "₹17.7 lakh Cr", sub: "≈ 13,532 mn shares" },
    { label: "FY27E P/E", value: "~16.9x", sub: "consensus EPS ~₹77 (E)" },
    { label: "FY26 P/E (actual)", value: "~18.5x", sub: "EPS ₹70.7" },
    { label: "FY26 EBITDA margin", value: "17.7%" },
    { label: "Dividend yield", value: "0.46%", sub: "₹6/share for FY26" },
    { label: "Net debt / EBITDA", value: "0.60x", sub: "cash ₹2.46 lakh Cr" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results" },
    { label: "Next catalyst", value: "Jio IPO / Q2 FY27 results" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 gross revenue", value: "₹3.40 lakh Cr", sub: "+24.5% YoY, record quarter" },
            { label: "Q1 FY27 recurring EBITDA", value: "₹54,067 Cr", sub: "+10.1% YoY, record" },
            { label: "Q1 FY27 attributable PAT", value: "₹20,946 Cr", sub: "-22.4% YoY on Asian Paints base" },
            { label: "Q1 FY27 recurring PAT", value: "₹23,196 Cr", sub: "+6.1% YoY, record" },
            { label: "Q1 FY27 capex", value: "₹38,682 Cr", sub: "O2C + New Energy + consumer build" },
            { label: "Jio DRHP", value: "Filed with SEBI", sub: "Jun-2026, proposed listing" },
          ],
        },
        {
          type: "p",
          text:
            "Reliance reported Q1 FY27 results on 17 July 2026. Gross revenue crossed ₹3 lakh Cr in a quarter for the first time (**₹3,40,257 Cr, +24.5% YoY**), recurring EBITDA hit a record **₹54,067 Cr (+10.1% YoY)** and recurring PAT a record **₹23,196 Cr (+6.1% YoY)**. The headline PAT fell 22.4% to ₹20,946 Cr only because the year-ago quarter carried a **₹8,924 Cr exceptional gain** from the sale of the Asian Paints stake. Every operating segment — O2C (+17% EBITDA), Digital Services (+16%), Retail (flat) and O&G (flat) — held or improved, against a backdrop management described as the largest energy-market dislocation in years (Strait of Hormuz disruption, SAED reintroduction).",
        },
        {
          type: "p",
          text:
            "The defining strategic event of the quarter was Jio Platforms filing its **Draft Red Herring Prospectus with SEBI (June 2026)** — the formal first step toward the long-awaited Jio IPO. Separately, RIL's balance sheet remains fortress-like: cash of **₹2.46 lakh Cr** covers net debt of **₹1.22 lakh Cr** (net debt/EBITDA 0.60x), and capex ran at ₹38,682 Cr in the quarter, dominated by O2C/New Energy giga-projects and consumer-network expansion.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We retain Strong Buy and raise our target price to ₹1,700 (from consensus-average alignment) on the back of the record recurring print and the Jio listing progression. Our FY27E PAT of ~₹1,04,500 Cr (+9.4%, in line with consensus) and FY28E of ~₹1,14,000 Cr are unchanged. The target is 1% above the consensus average of ₹1,682 and sits on the SOTP mid-point of published broker valuations.",
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
            "The consensus debate on Reliance has three pillars: (i) O2C earnings are hostage to a volatile and geopolitically dislocated crude market, with SAED reimposed on diesel/petrol/ATF exports; (ii) the consumer businesses are growing revenue but not yet profits — Retail EBITDA margin has compressed ~80bps on hyperlocal commerce investment, and Jio's depreciation rose ~9% YoY on 5G capitalisation; and (iii) the holding-company discount and New Energy's cash-burn phase weigh on the multiple.",
        },
        {
          type: "table",
          caption: "Where our view differs from consensus",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "O2C durability",
              "Windfall-linked; cracks are cyclical",
              "Configuration + feedstock optimisation (Russian/LatAm crude, ethane cracking) now cushions cycles; all-time-high middle-distillate cracks in Q1",
              "Q1 O2C EBITDA ₹17,010 Cr (+17.2%) despite SAED and turnaround",
            ],
            [
              "Consumer margins",
              "Hyperlocal is a permanent margin drag",
              "Investment phase, not structural: EBITDA margin dip is a choice with a payoff horizon; revenue +7-25% across segments",
              "Retail EBITDA ₹6,309 Cr Q1; hyperlocal orders +300% YoY; Jio EBITDA margin 53%+",
            ],
            [
              "Holding-company discount",
              "Structural ~10-15% (E)",
              "Narrows structurally as Jio lists and New Energy crosses over to positive contribution",
              "SOTP per PL: retail ₹716 + RJio ₹622 + O2C/E&P ₹280 + New Energy ₹111 = ₹1,728",
            ],
            [
              "New Energy",
              "Value-destructive cash burn",
              "Option worth ₹100+/share; giga-factory commissioning is 2026-27's theme",
              "PL adds ₹111/share at 2x announced capex of ₹75,000 Cr",
            ],
          ],
        },
        {
          type: "p",
          text:
            "The disagreement is testable every quarter: O2C EBITDA, segment EBITDA margins, hyperlocal order growth, Jio subscriber/ARPU data, New Energy commissioning milestones and DRHP/IPO progress. If O2C EBITDA breaks below ₹15,000 Cr for two quarters while cracks hold, the cyclical thesis is stronger than we assume. If Retail EBITDA margin recovers toward 8.5-9% by FY27-end while Jio EBITDA margin holds above 52%, consensus is wrong and the discount narrows.",
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
              driver: "1. O2C's optimised cash engine",
              evidence:
                "FY26 O2C revenue ₹6,62,401 Cr (+5.7%) with EBITDA ₹60,546 Cr (+10.1%, 9.1% margin); Q1 FY27 EBITDA ₹17,010 Cr (+17.2%) on all-time-high middle-distillate cracks, diversified crude basket and favourable ethane economics, despite SAED and a planned turnaround.",
              consequence:
                "Each US$1/bbl of incremental transportation-fuel crack spread is ~₹2,500-3,000 Cr of annualised O2C EBITDA (E); at current cracks O2C alone justifies ~₹280/share (PL SOTP, 7.5x FY28E EV/EBITDA).",
              monitor:
                "Quarterly O2C revenue/EBITDA; product cracks; crude basket share; SAED policy; refinery utilisation.",
            },
            {
              driver: "2. Jio's monetisation step-up and the listing",
              evidence:
                "Q1 FY27 Jio PAT ₹7,764 Cr (+9.2%); Digital Services EBITDA ₹21,255 Cr (+16.1%); subscribers 533 mn incl 285 mn True5G; ARPU ₹216 (+3% QoQ); FY26 EBITDA margin 51.9%; DRHP filed Jun-2026.",
              consequence:
                "Every ₹5 of ARPU is ~₹2,500 Cr of annualised Jio revenue (E); the IPO re-rates the segment in public hands and mechanically narrows the holding-company discount.",
              monitor:
                "Jio ARPU, subscriber adds, 5G/FWA penetration, DRHP/listing timeline, IPO valuation headlines.",
            },
            {
              driver: "3. Retail scale and hyperlocal conversion",
              evidence:
                "FY26 retail gross revenue ₹3,71,085 Cr (+12.1%), EBITDA ₹27,034 Cr (+7.9%); 20,160 stores; 387 mn registered customers; 1.93 bn transactions (+39% YoY); hyperlocal average daily orders +300% YoY in Q4 FY26.",
              consequence:
                "Transaction growth (+39%) running well ahead of revenue (+12%) is the investment phase; a ~100bps margin recovery is ~₹3,300 Cr of EBITDA (E) — the FY27-28 swing factor.",
              monitor:
                "Retail revenue/EBITDA margin, hyperlocal order growth, store adds, e-commerce contribution, RCPL trajectory.",
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
            "Reliance is at the point where its three growth engines cross from investment to monetisation. Jio has completed the 5G capitalisation cycle (depreciation now flattens the growth drag) and is filing for IPO; Retail is scaling hyperlocal commerce with revenue up 12% and margin compression that management frames as a deliberate investment window; and New Energy moves in 2026-27 from project execution (capex ₹1,44,271 Cr FY26) to commissioning, starting with the Kutch solar complex.",
        },
        {
          type: "p",
          text:
            "The financial inflection is already visible: FY26 delivered record revenue (₹11,75,919 Cr, +9.8%), record EBITDA (₹2,07,911 Cr, +13.4%, 17.7% margin) and record PAT (₹95,610 Cr, +18.3%), with consumer businesses contributing over 55% of EBITDA (management commentary). The balance sheet supports the transition without strain: net debt/EBITDA of 0.60x and cash of ₹2.46 lakh Cr.",
        },
        {
          type: "p",
          text:
            "We would re-evaluate the thesis if (i) O2C EBITDA falls below ₹15,000 Cr for two consecutive quarters, (ii) Jio's ARPU stalls while subscriber growth flatlines, or (iii) New Energy capex escalates without commissioning milestones — each would test the value-creation clock this conglomerate is running on.",
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
              lead: "Jio Platforms IPO — the defining 12-month event",
              text:
                "DRHP filed June 2026; bankers reportedly value Jio at up to ~US$170 bn (Bloomberg). Listing mechanics, valuation and dilution details will drive headline value recognition for the telecom segment.",
            },
            {
              lead: "Quarterly results — Q2 FY27 (Oct 2026)",
              text:
                "Each print tests O2C crack durability, Retail margin recovery and Jio ARPU — the three variables behind our FY27E of ₹1,04,500 Cr PAT.",
            },
            {
              lead: "New Energy commissioning",
              text:
                "Kutch (Gujarat) renewable project installation starts post-monsoon 2026 with exports expected within the year; giga-factory milestones are the New Energy value story.",
            },
            {
              lead: "Retail hyperlocal profitability turn",
              text:
                "Management targets doubling retail operating EBITDA over three years through scale (FY27) and monetisation (FY28-29); any early margin recovery is a direct EPS upgrade path.",
            },
            {
              lead: "O2C tailwinds",
              text:
                "All-time-high middle-distillate cracks, SAED policy normalisation and Jio-bp retail network expansion (2,199 outlets) are the swing factors on the energy side.",
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
          title: "Thesis 1 — O2C is an optimised cash machine, not a commodity lottery",
          text:
            "Observation: transport-fuel cracks are cyclical, but Reliance's O2C now earns through the cycle. Evidence: FY26 EBITDA ₹60,546 Cr (+10.1%) through sanctions and Middle-East dislocation; Q1 FY27 ₹17,010 Cr (+17.2%) despite SAED; feedstock diversification (Russian/LatAm crude, ethane cracking). Driver: configuration (largest single-site refining complex), yield management and product placement. Financial consequence: O2C EBITDA of ~₹60,000-65,000 Cr annualised (E) is the cash engine behind capex. Valuation implication: PL's 7.5x FY28E EV/EBITDA values this piece at ~₹280/share — before the consumer upside.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Thesis 2 — The consumer engine is monetising now",
          text:
            "Observation: Jio and Retail are at the transition from capex-led growth to cash-flow growth. Evidence: Jio FY26 EBITDA ₹76,255 Cr (+18.8%, margin 51.9%), Q1 FY27 PAT ₹7,764 Cr (+9.2%), 533 mn subscribers; Retail ₹3,71,085 Cr revenue with 20,160 stores; consumer businesses now >55% of consolidated EBITDA. Driver: ARPU and hyperlocal conversion — Jio ARPU ₹216 and rising, retail transactions +39% YoY. Financial consequence: Jio alone justifies ~₹622/share (PL, 15x FY28E EV/EBITDA). Valuation implication: the consumer two-thirds of the group now trades inside the parent's 18.5x P/E — the discount is the opportunity.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Thesis 3 — The Jio IPO and New Energy close the discount",
          text:
            "Observation: the holding-company discount persists even as segments disclose like listed companies. Evidence: DRHP filed Jun-2026; New Energy valued at ₹111/share (PL, 2x announced ₹75,000 Cr capex); net cash-positioned balance sheet (net debt/EBITDA 0.60x). Driver: public listings crystallise segment value; commissioning converts capex into assets. Financial consequence: our target of ₹1,700 embeds the base case only; a Jio IPO at reported ~US$170 bn banker estimates would add to the re-rating case. Valuation implication: the sum of the parts (~₹1,728/share, PL) exceeds our target — we are deliberately conservative on the discount close.",
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
            { label: "Promoter", value: "Mukesh Ambani & family", sub: "50.48% holding, no pledge" },
            { label: "Founded", value: "1966", sub: "India's largest company by mcap" },
            { label: "FY26 gross revenue", value: "₹11,75,919 Cr", sub: "+9.8% YoY, record" },
            { label: "FY26 EBITDA", value: "₹2,07,911 Cr", sub: "+13.4%, 17.7% margin" },
            { label: "FY26 PAT", value: "₹95,610 Cr", sub: "+18.3%, record" },
            { label: "Capex FY26", value: "₹1,44,271 Cr", sub: "O2C, New Energy, Jio, Retail" },
            { label: "Cash / net debt (Jun-26)", value: "₹2.46 lakh Cr / ₹1.22 lakh Cr", sub: "net debt/EBITDA 0.60x" },
            { label: "Employees", value: "~3.5 lakh (E)", sub: "plus Jio/Retail workforces" },
            { label: "Dividend FY26", value: "₹6/share", sub: "110% of face value" },
          ],
        },
        {
          type: "p",
          text:
            "Reliance Industries is India's largest company by market capitalisation and revenue. It operates five reportable segments: **Oil to Chemicals (O2C)** — the world's largest single-site refining complex at Jamnagar plus petrochemicals; **Oil & Gas** — KG D6 and CBM upstream; **Digital Services (Jio Platforms)** — the country's largest telecom network (533 mn subscribers) plus digital businesses; **Retail (Reliance Retail Ventures)** — 20,160 stores across grocery, fashion, electronics and digital commerce; and **Others** — including media & entertainment (JioStar), consumer products (RCPL) and the New Energy businesses (solar, batteries, green hydrogen).",
        },
        {
          type: "p",
          text:
            "The strategic arc is energy-to-digital: O2C and upstream fund the balance sheet while Jio, Retail, Media and New Energy build the future earnings pool. Management's stated intent is to list Jio Platforms and deliver New Energy exports from 2026-27 onward — the two events that define the group's next valuation chapter.",
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
              lead: "O2C — integrated refining-to-chemicals margin capture",
              text:
                "Jamnagar's single-site configuration captures value across crude grades, products and petrochemicals; feedstock flexibility (Russian/LatAm crude, ethane) plus Jio-bp retail (2,199 outlets) monetise the barrel domestically.",
            },
            {
              lead: "Jio — scale economics in connectivity and digital",
              text:
                "533 mn subscribers with 285 mn True5G; ARPU ₹216; 13 mn+ JioAirFiber premises; 241 exabytes of FY26 data traffic. Depreciation from 5G capitalisation is now flattening, unlocking operating leverage.",
            },
            {
              lead: "Retail — consumption at every income tier",
              text:
                "20,160 stores, 387 mn registered customers, 1.93 bn transactions (FY26); hyperlocal commerce scaling at +300% YoY order growth; fashion & lifestyle via the RCPL-demerged consumer ecosystem.",
            },
            {
              lead: "New Energy — the long option",
              text:
                "Giga-factories for solar, batteries and green hydrogen under construction; Kutch renewables project commissioning post-monsoon 2026; exports targeted from this year; funded from the balance sheet (net debt 0.60x).",
            },
            {
              lead: "Balance-sheet-as-competitive-advantage",
              text:
                "₹2.46 lakh Cr cash, negative net exposure (net debt ₹1.22 lakh Cr covered 2x by cash), investment-grade ratings — allows decade-long capital cycles that smaller peers cannot fund.",
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
          caption: "FY26 segment revenue and EBITDA (disclosed)",
          cols: ["Segment", "Revenue", "EBITDA", "EBITDA margin"],
          rows: [
            ["Oil to Chemicals", "₹6,62,401 Cr (+5.7%)", "₹60,546 Cr (+10.1%)", "9.1%"],
            ["Digital Services (Jio)", "₹1,76,164 Cr gross", "₹76,560 Cr (+17.8%)", "51.9%"],
            ["Retail", "₹3,71,085 Cr gross", "₹27,034 Cr (+7.9%)", "8.3%"],
            ["Oil & Gas", "declined (volume-led)", "₹19,050 Cr (-10.1%)", "—"],
            ["Others (Media, RCPL, New Energy)", "—", "₹24,721 Cr", "—"],
            ["Consolidated", "₹11,75,919 Cr (+9.8%)", "₹2,07,911 Cr (+13.4%)", "17.7%"],
          ],
        },
        {
          type: "p",
          text:
            "Consumer businesses now contribute **more than 55% of consolidated EBITDA** (management commentary, FY26) — the structural shift from energy-heavy to balanced. JioStar, the media & entertainment JV, added ₹36,248 Cr of FY26 revenue and ₹4,885 Cr of EBITDA with ~500 mn monthly active users on JioHotstar; RCPL (consumer products) revenue grew 2% YoY in Q1 FY27 to ₹8,600 Cr.",
        },
        {
          type: "small",
          text:
            "O2C and consolidated revenue are gross of excise/customs; segment margins are computed on net revenue per the company's practice. 'Others' EBITDA includes media, consumer products and New Energy operating results.",
        },
      ],
    },
    {
      id: "geographic-mix",
      label: "Geographic mix",
      blocks: [
        {
          type: "table",
          caption: "Footprint progression (disclosed)",
          cols: ["Metric", "FY25", "FY26", "Q1 FY27"],
          rows: [
            ["Jio subscribers", "488 mn (E)", "524 mn", "533 mn"],
            ["True5G users", "—", "268 mn", "285 mn"],
            ["JioAirFiber premises", "—", "~13 mn", "—"],
            ["Retail stores", "~17,000 (E)", "20,160", "—"],
            ["Registered customers", "—", "387 mn", "—"],
            ["Jio-bp fuel outlets", "—", "2,199", "—"],
          ],
        },
        {
          type: "p",
          text:
            "The footprint is India-first with export reach: O2C ships refined products across Asia-Pacific and beyond (exports ₹2,78,808 Cr in FY26); Jio covers every telecom circle in India; Retail spans 7,000+ cities/towns (E) via 20,160 stores; and New Energy targets global solar and battery markets with exports starting 2026-27. International connectivity exposure comes through the Airtel-Africa-linked ecosystem only at the margins (E).",
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
              title: "O2C — the cash engine",
              body:
                "FY26 revenue ₹6,62,401 Cr (+5.7%), EBITDA ₹60,546 Cr (+10.1%, 9.1% margin); Q1 FY27 EBITDA ₹17,010 Cr (+17.2%) at record fuel cracks. Jamnagar's configuration and feedstock flexibility are the moat; SAED and crude premiums are the noise.",
            },
            {
              title: "Digital Services / Jio — the growth compounder",
              body:
                "FY26 EBITDA ₹76,560 Cr (+17.8%, 51.9% margin), PAT ₹30,049 Cr (+15.1%); Q1 FY27 PAT ₹7,764 Cr (+9.2%) on ARPU ₹216 and 8.9 mn quarterly subscriber adds. DRHP filed; the listing is the segment's valuation event.",
            },
            {
              title: "Retail — the hyperlocal investment phase",
              body:
                "FY26 revenue ₹3,71,085 Cr (+12.1%), EBITDA ₹27,034 Cr (+7.9%, -30bps on hyperlocal); Q1 FY27 EBITDA ₹6,309 Cr (-1.1%) on +7.4% revenue (adj. for RCPL demerger: +11.6%). Margin is the monitored variable.",
            },
            {
              title: "Oil & Gas — the managed decline, for now",
              body:
                "KG D6 volumes and realisations fell in FY26 (EBITDA ₹19,050 Cr, -10.1%; Q4 realisations $9.63/MMBTU); a natural decline phase unless new wells change the curve. Offset by superior O2C integration.",
            },
            {
              title: "Others — Media, RCPL, New Energy",
              body:
                "JioStar FY26: revenue ₹36,248 Cr, EBITDA ₹4,885 Cr (+218.7% group media EBITDA); RCPL revenue ₹8,600 Cr (Q1 FY27, +2%); New Energy is pre-revenue, option-valued at ~₹111/share (PL).",
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
            "Chairman & MD **Mukesh Ambani** has steered the group through every cycle since 2002 — oil-price collapses, telecom entry, the Jio data revolution, sanctions-driven crude volatility and now the New Energy transition. The management record is execution-focused: Jio built a pan-India 5G network and crossed 524 mn subscribers; Retail crossed 20,000 stores; O2C ran at high utilisation through the 2026 Middle-East crisis.",
        },
        {
          type: "list",
          items: [
            {
              lead: "Capital stewardship",
              text:
                "Capex of ₹1,44,271 Cr (FY26) funded with net debt/EBITDA held at 0.60x; cash ₹2.46 lakh Cr exceeds net debt ₹1.22 lakh Cr; dividends maintained at ₹6/share (110% of face value) through the investment cycle.",
            },
            {
              lead: "Disclosure quality",
              text:
                "Quarterly segment-level revenue/EBITDA, quarterly capex, and integrated annual reporting are published on ril.com — this note's figures are drawn from those documents.",
            },
            {
              lead: "Governance watch",
              text:
                "Promoter holding is 50.48% (no pledge); succession and related-party intensity (promoter-owned companies in the Jio/Retail ecosystem) are the standing governance questions the market prices into the discount.",
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
            "Reliance sits at the intersection of three large Indian macro cycles: energy (refining, petrochemicals, gas), digital (telecom with ~1.2 bn mobile users (E) and rising ARPUs after the 2024-25 tariff hikes), and consumption (retail growing 12-15% with organised penetration still under 15% in most grocery categories, E).",
        },
        {
          type: "list",
          items: [
            {
              lead: "Energy volatility is the new normal",
              text:
                "Strait of Hormuz disruption, OPEC+ cuts (~10 mb/d, E), sanctions and SAED policy swings define the O2C operating environment; the winners are configured refineries with feedstock flexibility — exactly RIL's asset.",
            },
            {
              lead: "Telecom consolidation is complete",
              text:
                "Three private operators remain; tariff hikes (2024-25) reset ARPU economics; 5G penetration and fixed-wireless (FWA) are the next revenue pools — Jio leads on 5G subscribers (285 mn) and is the largest FWA operator globally (~13 mn premises).",
            },
            {
              lead: "Retail and energy transition",
              text:
                "Quick commerce and hyperlocal delivery have redrawn grocery competition; organised retail and new-energy supply chains are among the fastest-growing capital cycles in India — both are RIL's announced investment priorities.",
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
          caption: "Competitive map (E = our assessment)",
          cols: ["Business", "RIL position", "Key competitor", "Differentiator"],
          rows: [
            ["O2C", "Largest single-site complex", "Indian refiners (PSUs)", "Configuration, feedstock flexibility, retail JV"],
            ["Telecom", "#1 by subscribers (533 mn)", "Airtel, Vi", "5G leadership, JioAirFiber FWA, digital stack"],
            ["Retail", "#1 by stores (20,160)", "DMart, quick-commerce apps", "Omni-format breadth + hyperlocal network"],
            ["Media", "JioStar ~500 mn MAU", "Sony, Zee, digital platforms", "Live sports + streaming bundling with Jio"],
            ["New Energy", "Pre-revenue giga-capex", "Adani, Tata, global OEMs", "Balance-sheet scale; full-stack solar/battery/H2"],
          ],
        },
        {
          type: "p",
          text:
            "Across every segment Reliance competes on **scale plus balance sheet**: the cash position (₹2.46 lakh Cr) funds decade-long cycles (5G capex, 20,000-store retail, New Energy giga-factories) that pure-play competitors cannot match. The price is the holding-company discount — the market's standing bet that conglomerate structure destroys value; the Jio listing is the direct test of that bet.",
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
          cols: ["Class", "Mar-25", "Sep-25", "Mar-26", "Jun-26"],
          rows: [
            ["Promoter & group", "50.10%", "50.01%", "50.00%", "50.48%"],
            ["FII / FPI", "19.07%", "18.65%", "18.67%", "17.19%"],
            ["DII (incl. MFs, insurance)", "19.36%", "20.25%", "20.46%", "21.10%"],
            ["Mutual funds (within DII)", "9.21%", "9.66%", "9.78%", "10.11%"],
            ["Public & others", "11.47%", "11.09%", "10.87%", "11.23%"],
          ],
        },
        {
          type: "p",
          text:
            "The promoter group (Mukesh Ambani and family entities) holds **50.48%** (Jun-26) with **zero pledge**, after raising the stake slightly in Q1 FY27. The rotation is the mirror image of HDFC Bank's: **FII holdings fell from ~19% to 17.2%** over four quarters while **domestic institutions rose to 21.1%** (mutual funds 10.11%). The register spans **46.5 lakh shareholders**, making RIL India's most-held single stock.",
        },
        {
          type: "list",
          items: [
            {
              lead: "Largest institutional holders (reported)",
              text:
                "SBI Mutual Fund group ~2.55% (largest MF holder), with the SBI Nifty 50 ETF and index funds dominating the passive flows; insurance and pension funds (LIC, EPFO) are the other large domestic block (E).",
            },
            {
              lead: "What we watch",
              text:
                "Promoter stake moves (a 50%+ step is governance-positive), FII flow direction, and the share-count/dilution mechanics of the Jio IPO — the listing structure (holding vs direct) decides how much value lands in RIL shareholders' hands.",
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
          caption: "Consolidated financial history, fiscal years ended 31 March (₹ Cr; E = derived)",
          cols: ["Metric", "FY22", "FY23", "FY24", "FY25", "FY26"],
          rows: [
            ["Gross revenue", "7,92,000 (E)", "9,75,955 (E)", "10,00,122 (E)", "10,71,174", "11,75,919"],
            ["Revenue growth", "+44% (E)", "+23% (E)", "+2.5% (E)", "+7.1%", "+9.8%"],
            ["EBITDA", "1,16,095 (E)", "1,54,158 (E)", "1,70,350 (E)", "1,83,422", "2,07,911"],
            ["EBITDA margin", "14.7% (E)", "15.8% (E)", "17.0% (E)", "17.1%", "17.7%"],
            ["PAT", "66,184 (E)", "73,670 (E)", "79,020 (E)", "80,787", "95,610"],
            ["PAT growth", "+23% (E)", "+11% (E)", "+7.3% (E)", "+2.2%", "+18.3%"],
            ["Capex", "~95,000 (E)", "~1,21,000 (E)", "~1,41,000 (E)", "1,23,247 (E)", "1,44,271"],
          ],
        },
        {
          type: "small",
          text:
            "FY22-24 figures marked (E) are compiled from prior-period disclosures and annual-report summaries and are directionally consistent with the audited FY26 annual report series; FY25-FY26 are as per the FY26 results media release (24 Apr 2026).",
        },
        {
          type: "p",
          text:
            "The five-year record is a compounding conglomerate: revenue grew ~48% from FY22 to FY26 while EBITDA grew ~79%, with the margin up ~300bps on Jio/Retail operating leverage. PAT doubled-plus from FY22 to FY26 even after the FY23 energy-tax era, and FY26 delivered the cleanest step-up (PAT +18.3%) in the sequence. The FY26 balance sheet shows the transition funding model: ₹1.44 lakh Cr capex, cash ₹2.50 lakh Cr, net debt/EBITDA 0.60x, EPS ₹70.7 on 13,532 mn shares.",
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
            ["Gross revenue (₹ Cr)", "11,75,919", "~13,00,000", "~14,30,000"],
            ["Revenue growth", "+9.8%", "+10.6%", "+10.0%"],
            ["EBITDA (₹ Cr)", "2,07,911", "~2,28,000", "~2,52,000"],
            ["EBITDA margin", "17.7%", "~17.5%", "~17.6%"],
            ["PAT (₹ Cr)", "95,610", "~1,04,500", "~1,14,000"],
            ["PAT growth", "+18.3%", "+9.3%", "+9.1%"],
            ["EPS (₹, 13,532 mn shares)", "70.7", "~77", "~84"],
          ],
        },
        {
          type: "p",
          text:
            "Our FY27E build: O2C EBITDA broadly flat-to-up on crack strength (₹60,000-66,000 Cr), Jio EBITDA +13-15% (ARPU ₹225+, subscribers +25-30 mn), Retail EBITDA +12-15% on 50-100bps margin recovery, and New Energy at breakeven-to-small-loss. The consensus (trendlyne, 31 analysts) models ~9.4% profit growth for FY27 — our estimates sit within 1% of the street. Sensitivity: each ₹5 of Jio ARPU is ~₹2,500 Cr of revenue (E); each 50bps of retail margin is ~₹1,600 Cr of EBITDA (E); each US$1/bbl of crack is ~₹2,500-3,000 Cr of O2C EBITDA (E).",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key estimate risks",
          text:
            "Our FY27E embeds no SAED removal and no Jio IPO profit; both are upside. The downside is crude/crack collapse plus retail margin compression — together worth ~10% of FY27E EPS. Consensus dispersion is widest on O2C (fuel cracks), not on the consumer businesses.",
        },
      ],
    },
    {
      id: "consensus",
      label: "Consensus & revisions",
      blocks: [
        {
          type: "table",
          caption: "Street view (in.marketscreener / trendlyne, Aug 2026)",
          cols: ["Measure", "Value"],
          rows: [
            ["Average target price", "₹1,682-1,720 (+29%)"],
            ["Target range", "₹1,370 to ₹2,020"],
            ["Consensus rating", "Strong Buy (29-31 analysts; 18 SB / 10 B / 1 S)"],
            ["FY27E revenue growth", "~11.3%"],
            ["FY27E profit growth", "~9.4%"],
            ["TTM P/E", "~23x (street est.)"],
          ],
        },
        {
          type: "list",
          items: [
            {
              lead: "Revisions have been constructive",
              text:
                "Post-Q1: PL raised its target to ₹1,675 (BUY, 19-Jul-26) adding ₹111/share of New Energy value; Jefferies Buy at ₹1,740 (Mar-26); Ambit upgraded to Buy at ₹1,667 (Mar-26); Nomura ₹1,700. The revision direction is uniformly positive on the recurring-profit record and Jio IPO progress.",
            },
            {
              lead: "Where we sit",
              text:
                "Our ₹1,700 target is 1% above the trendlyne consensus (₹1,682) and 1% below the marketscreener average (₹1,720) — deliberately inside the range, because the swing factors (cracks, IPO valuation) are two-sided.",
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
            "We value Reliance on a sum-of-the-parts cross-checked against consensus, rather than a single-multiple method — the group's segments trade at structurally different multiples. At ₹1,309, the stock trades at ~18.5x FY26 EPS (₹70.7) and ~16.9x our FY27E (₹77); the SOTP implies the market is paying a meaningful discount to the sum of listed-comparable segment values.",
        },
        {
          type: "table",
          caption: "Target price derivation (SOTP-style, on broker-consistent segment values)",
          cols: ["Step", "Component", "Value/share"],
          rows: [
            ["1", "O2C + E&P (7.5x FY28E EV/EBITDA)", "₹280 (PL)"],
            ["2", "Retail equity (38x FY28E EV/EBITDA)", "₹716 (PL)"],
            ["3", "Jio equity (15x FY28E EV/EBITDA)", "₹622 (PL)"],
            ["4", "New Energy (2x announced capex)", "₹111 (PL)"],
            ["5", "Net debt adjustment", "-₹52"],
            ["6", "SOTP value", "₹1,728 → ₹1,700 (rounded)"],
            ["7", "Upside to current price (₹1,309)", "+29.9%"],
          ],
        },
        {
          type: "p",
          text:
            "**Multiple justification.** On a forward P/E basis, ~16.9x FY27E is below the Nifty large-cap financial/energy blend and well below the consumer-segment growth value — the discount reflects (i) the holding structure, (ii) O2C cyclicality, and (iii) New Energy's pre-revenue status. The SOTP cross-check (₹1,728/share) shows the base case supports the target with no credit for a premium Jio IPO valuation (bankers cited up to US$170 bn, Bloomberg) or a retail margin recovery beyond our base.",
        },
        {
          type: "table",
          caption: "Sensitivity — target price vs Jio value and retail margin",
          cols: ["Scenario", "Jio/share", "Retail/share", "SOTP"],
          rows: [
            ["Bear: cracks + retail margin hold 7.5%", "₹520 (13x)", "₹650 (35x)", "₹1,409"],
            ["Base: our estimates", "₹622 (15x)", "₹716 (38x)", "₹1,728"],
            ["Bull: IPO premium + margin recovery", "₹750 (18x)", "₹800 (42x)", "₹1,969"],
          ],
        },
        {
          type: "p",
          text:
            "The bear scenario (SOTP ~₹1,409) still leaves ~8% upside to the current price; the bull scenario (₹1,969) is ~50% above it. The asymmetry is driven by the consumer engine — the part of the group that reports every quarter with the least cyclical noise.",
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
              risk: "O2C margin environment (cracks, crude, SAED)",
              probability: "High",
              financial:
                "Crack collapse or SAED reimposition on exports could cut O2C EBITDA 20-30% from the FY26 ₹60,546 Cr base.",
              valuation:
                "Each ₹1,00,000 Cr of O2C EBITDA loss is ~₹70/share of SOTP (E); the bear SOTP (~₹1,409) prices this in.",
              indicator:
                "Product cracks, Dubai-Brent spreads, SAED policy, refinery utilisation, petrochemical deltas.",
              mitigation:
                "Feedstock flexibility, domestic placement (Jio-bp), ethane cracking economics, product-mix agility.",
              kpi: "O2C quarterly EBITDA ≥ ₹15,000 Cr.",
            },
            {
              risk: "Jio competitive intensity / ARPU stall",
              probability: "Medium",
              financial:
                "Aggressive tariff campaigns or unlimited-data wars pressure ARPU below ₹210; Jio PAT growth halves.",
              valuation:
                "Jio's 15x EV/EBITDA collapses toward 12x in a tariff war; ~₹40-60/share of SOTP loss (E).",
              indicator:
                "ARPU, subscriber adds (8.9 mn in Q1), data traffic growth, competitor tariff moves.",
              mitigation:
                "5G/FWA leadership (285 mn True5G, ~13 mn JioAirFiber), converged offerings, cost per GB leadership.",
              kpi: "ARPU ≥ ₹215; quarterly net adds ≥ 5 mn.",
            },
            {
              risk: "Retail hyperlocal margin drag persists",
              probability: "Medium",
              financial:
                "Margin stays at ~7% vs 8.3% FY26; retail EBITDA growth stalls below revenue growth.",
              valuation:
                "Retail re-rates down from 38x; ~₹50-80/share of SOTP loss (E).",
              indicator:
                "Retail EBITDA margin, hyperlocal order growth, digital-commerce share of revenue.",
              mitigation:
                "Order-density scale (Q4 orders +300% YoY), private labels, store-led economics.",
              kpi: "Retail EBITDA margin recovering toward 8.5% by FY27-end.",
            },
            {
              risk: "New Energy execution/cost overruns",
              probability: "Medium",
              financial:
                "Capex escalation beyond the ₹75,000 Cr announced scope delays positive contribution; carry cost on debt.",
              valuation:
                "The ₹111/share option value is delayed, not destroyed; the bear case prices it at nil.",
              indicator:
                "Commissioning milestones (Kutch solar post-monsoon 2026), export starts, funding structure.",
              mitigation:
                "Balance-sheet funding (cash ₹2.46 lakh Cr), phased giga-factory buildout.",
              kpi: "First commercial output from New Energy within FY27.",
            },
            {
              risk: "Jio IPO discount / deferred listing",
              probability: "Medium",
              financial: "No direct P&L impact; holding-company discount persists.",
              valuation:
                "The re-rating catalyst is delayed; stock remains range-bound near consensus target.",
              indicator: "DRHP observations, SEBI approval, launch timeline, anchor-book demand.",
              mitigation: "Group can wait — no IPO proceeds are needed for the balance sheet.",
              kpi: "SEBI approval and listing within 12 months.",
            },
            {
              risk: "Regulatory and policy risk (energy, telecom, retail)",
              probability: "Medium",
              financial:
                "SAED, tariff regulation, FDI/retail policy and gas-pricing formula changes are recurring P&L variables.",
              valuation: "Policy shocks typically cost 3-5% of market value transiently (historical pattern).",
              indicator:
                "Budget/energy-policy announcements, TRAI/telecom regulation, gas-price formula reviews.",
              mitigation: "Scale and compliance infrastructure; diversified segments absorb single-policy shocks.",
              kpi: "None — event-driven.",
            },
            {
              risk: "Governance / succession concentration",
              probability: "Low",
              financial: "No direct P&L impact.",
              valuation:
                "Key-man perception is priced into the discount; leadership transition announcements historically move the stock 5-10%.",
              indicator: "Board announcements, family-trust filings, group restructurings.",
              mitigation: "Promoter 50.48% with zero pledge; institutionalised segment leadership (Jio/Retail/O2C).",
              kpi: "None — qualitative watch.",
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
            "All factual statements in this note are drawn from the primary documents below. Where we have derived figures (e.g., segment-level sensitivity, FY22-24 history), they are marked (E) and reconciled against disclosed totals.",
        },
        {
          type: "downloads",
          items: [
            {
              label: "Q4 FY26 results media release (24 Apr 2026)",
              url: "https://www.ril.com/sites/default/files/2026-04/24042026_Media_Release_RIL_Q4_FY2025-26_Financial_and_Operational_Performance.pdf",
              note: "FY26 record revenue/EBITDA/PAT, segment data, ₹6 dividend",
            },
            {
              label: "Q1 FY27 results coverage (17 Jul 2026)",
              url: "https://www.thehindu.com/business/reliance-industries-limited-q1-profit-falls-fy26/article71234702.ece",
              note: "Q1 FY27 PAT ₹20,946 Cr, revenue ₹3,11,850-3,40,257 Cr, EBITDA ₹54,067 Cr",
            },
            {
              label: "FY25-26 Analyst Meeting presentation",
              url: "https://www.ril.com/sites/default/files/2026-04/FY2025-26_RIL_Analyst_Meeting.pdf",
              note: "Segment FY26 revenue/EBITDA table, Jio/Retail operating data",
            },
            {
              label: "Integrated Annual Report 2025-26",
              url: "https://www.ril.com/reports/RIL-Integrated-Annual-Report-2025-26.pdf",
              note: "Financial statistics series (revenue/EBITDA/PAT history)",
            },
            {
              label: "Shareholding pattern (quarterly)",
              url: "https://www.trendlyne.com/equity/share-holding/1127/RELIANCE/latest/reliance-industries-ltd/",
              note: "Promoter 50.48%, FII 17.19%, DII 21.10% (Jun-26)",
            },
            {
              label: "Consensus & valuation data",
              url: "https://www.marketscreener.com/quote/stock/RELIANCE-INDUSTRIES-LTD-9058833/consensus/",
              note: "Average target ₹1,719.94, range ₹1,370-2,020",
            },
            {
              label: "Broker SOTP reference (PL, 19 Jul 2026)",
              url: "https://www.plindia.com/ResReport/RELIANCE-19-7-26-PL.pdf",
              note: "SOTP ₹1,728: O2C 280, Retail 716, RJio 622, New Energy 111",
            },
          ],
        },
      ],
    },
  ],
};
