import type { ResearchNote } from "./types";

export const dmartNote: ResearchNote = {
  slug: "avenue-supermarts",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹4,500", sub: "vs ₹3,852 current" },
    { label: "Implied upside", value: "+16.8%" },
    { label: "Market cap", value: "₹2,51,000 Cr", sub: "≈ 65.2 Cr shares" },
    { label: "FY27E P/E", value: "~65x", sub: "consensus EPS ~₹59 (E)" },
    { label: "FY26 P/E (actual)", value: "~78x", sub: "EPS ₹49.54 (standalone)" },
    { label: "FY27E P/S", value: "~3.2x", sub: "consensus revenue ~₹78,500 Cr (E)" },
    { label: "FY26 EBITDA margin", value: "7.8%", sub: "standalone; 7.9% in FY25" },
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
            { label: "Q1 FY27 revenue (cons)", value: "₹18,794 Cr", sub: "+14.9% YoY" },
            { label: "Q1 FY27 PAT (cons)", value: "₹860 Cr", sub: "+11.3% YoY; margin 4.6%" },
            { label: "Q1 FY27 EBITDA (standalone)", value: "₹1,527 Cr", sub: "+16.3%; margin 8.3%" },
            { label: "Mature-store growth (2+ yrs)", value: "+5.5%", sub: "vs +7.1% in Q1FY26; metro flat" },
            { label: "Store count", value: "503", sub: "+3 in Q1 after 85 in FY26" },
            { label: "52-week range", value: "₹3,529 – ₹4,949", sub: "stock −22% from high (6 Aug 2026)" },
          ],
        },
        {
          type: "p",
          text:
            "Avenue Supermarts reported Q1 FY27 results on 11 July 2026. Consolidated revenue grew **14.9% to ₹18,794 Cr** and PAT **11.3% to ₹860 Cr** (margin 4.6% vs 4.7%), while standalone revenue rose 15.1% to ₹18,343 Cr with EBITDA of ₹1,527 Cr at 8.3%. The quality signal was mixed: growth came from **non-metro stores** while mature-store like-for-like growth slowed to **5.5%** (from 7.1%) and metro markets were flat — the first clear sign of quick-commerce competition in the top cities.",
        },
        {
          type: "p",
          text:
            "The stock has de-rated hard through 2026 — from a 52-week high of ₹4,949 to **₹3,852 (−22%)** — as the market prices the quick-commerce threat (Blinkit, Zepto, Swiggy Instamart) into the mature-metro franchise. Meanwhile the company made two structural announcements in Q1: approval to raise **₹1,000 Cr via NCDs** (first meaningful debt raise in a debt-averse history) and the appointment of **Lalit Ahuja as COO**.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We initiate with Accumulate at ₹4,500 target (+16.8% upside), anchored to ~62x FY28E EPS of ~₹72 (E) and cross-checked against the consensus average of ₹4,346. The de-rating has already priced a good deal of the quick-commerce worry; the franchise's price leadership, 500-store scale and debt-free history now offer a margin-of-safety that was absent at ₹4,900.",
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
            "The market's DMart debate has three pillars: (i) quick commerce — Blinkit/Zepto/Swiggy are winning incremental metro grocery spend, DMart's delivery arm (DMart Ready, Swift) is small and loss-making, so the mature-store engine is decelerating (LFL 5.5% vs 7.1% a year ago); (ii) margin ceiling — EBITDA margin has hovered at 7.8-8.3% for years, with new-store opex and depreciation growing faster than revenue; and (iii) valuation — ~78x trailing standalone earnings leaves no room for error.",
        },
        {
          type: "table",
          caption: "Where our view differs from consensus",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Quick-commerce threat",
              "Structural share loss in metros",
              "Real in metros but bounded: DMart's core is non-metro & staple-led; delivery is being built (NCDs, COO, Swift)",
              "Q1FY27: non-metro led growth; metro LFL flat; mature-store growth 5.5%",
            ],
            [
              "Store-acceleration economics",
              "New stores dilute returns",
              "Back-ended FY26 adds (58 of 85 in Q4) create FY27 revenue payback; store adds guided back toward ~15% YoY",
              "FY26 +85 stores to 500; Q1 adds only 3 (guided moderation)",
            ],
            [
              "Margin ceiling",
              "EBITDA stuck at ~8%",
              "Stable at 8% is the model, not a bug: EDLP wins share in staples; gross margin improvement + operating leverage is the upside",
              "FY26 standalone EBITDA ₹5,255 Cr at 7.8% margin; Q1FY27 8.3%",
            ],
            [
              "Valuation at ₹3,852",
              "Premium multiple must compress",
              "P/E ~78x FY26 / ~65x FY27E is at the low end of DMart's own 3-year band (~66-100x, E); bear case is partially priced",
              "52-wk low ₹3,529; stock −22% from high; consensus avg ₹4,346",
            ],
          ],
        },
        {
          type: "p",
          text:
            "The disagreement is testable every quarter: mature-store LFL, store-add pace, EBITDA margin, DMart Ready/Swift scale, and metro vs non-metro mix. If LFL re-accelerates above 7% with margins holding 8%, the current price is the bear case. If LFL slides below 4% and margins fall below 7.5%, the quick-commerce thesis is confirmed and fair value moves toward ₹3,300-3,600.",
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
              driver: "1. Store-led expansion in under-penetrated non-metro India",
              evidence:
                "500 stores at Mar-26 (+85 in FY26, +58 in Q4); 503 at Jun-26. Management guides ~15% YoY store additions — a pace that nearly doubles the store base every ~5 years — with new geographies and towns below the top-30 cities.",
              consequence:
                "Each 100-store tranche adds roughly ₹12,000-14,000 Cr of annualised revenue at current revenue/store (E). Non-metro markets face far less quick-commerce competition, preserving the EDLP model's share-gain logic.",
              monitor:
                "Quarterly store adds, new-town entries, revenue/store, store payback periods.",
            },
            {
              driver: "2. Price leadership as the durable moat",
              evidence:
                "EDLP at 5-8% below market prices on staples; supplier-led sourcing with no listing fees; gross margins stable-to-up while peers discount; 11 crore bill cuts in Q1FY27 (+13% YoY).",
              consequence:
                "Price gap defends share in inflation-led downturns (FY24-26 showed resilience) and converts to volume when grocery demand recovers; the model needs no promotional spend.",
              monitor:
                "Quarterly LFL, bill cuts, gross margin, price-gap trackers vs kirana and quick-commerce.",
            },
            {
              driver: "3. Omnichannel build — DMart Ready, Swift, home delivery",
              evidence:
                "DMart Ready operates in ~18 cities; Q1FY27 announced ₹1,000 Cr NCD raising (first major debt raise) and a new COO (Lalit Ahuja) — clear signals of delivery and quick-commerce investment.",
              consequence:
                "The question is whether DMart can convert its cost advantage into profitable delivery (30-45 min) or must compete with near-term losses; success preserves metro share, failure caps it — the swing factor in FY28-29 EPS.",
              monitor:
                "DMart Ready/Swift city count, delivery order share, delivery EBITDA contribution, NCD drawdown.",
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
            "DMart crossed a company-defining inflection in FY26: **500 stores**, standalone revenue of ₹66,968 Cr (+15.9%) with PAT of ₹3,224 Cr (+10.1%). The strategic inflection is omnichannel — after two decades of near-pure price-led offline retail, the company is now funding delivery capability (₹1,000 Cr NCD, a dedicated COO) while re-tuning the store cadence. The 85-store FY26 expansion (58 of them in Q4) is being replaced by a guided **~15% YoY** store-add pace, a deliberate reset management frames as sustainable rather than exhausted.",
        },
        {
          type: "p",
          text:
            "The financial inflection is visible: PAT grew from ₹2,927 Cr (FY25) to ₹3,224 Cr (FY26, +10.1%) with EBITDA margin steady at 7.8%, despite a year of heavy store opening. Q1 FY27 (revenue +14.9%, EBITDA +16.3% standalone) shows the payback on the FY26 store wave beginning. The model's durability rests on the EDLP price gap — a flywheel (price → traffic → volume → procurement scale → price) that quick-commerce has not yet broken outside metros.",
        },
        {
          type: "p",
          text:
            "The leadership transition (MD & CEO **Anshul Asawa**, Feb-2026) plus the new-organised operating rhythm, signals the Damani era institutionalising without losing the price-and-discipline religion. The inflection is not a step-down in quality; it is a step-up in internal capability building while the store engine matures.",
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
              lead: "Q2 FY27 results (Oct 2026)",
              text:
                "The materialisation test: mature-store LFL, EBITDA margin, and store-add disclosures for the first full quarter under the new cadence.",
            },
            {
              lead: "Store-acceleration aftermath",
              text:
                "58 stores opened in Q4FY26 are now ramping; each 100-store tranche adds ~₹12,000-14,000 Cr annualised revenue (E). The LFL recovery to ≥7% is the key share-and-margin battleground.",
            },
            {
              lead: "Quick-commerce chess",
              text:
                "Blinkit/Zepto/Swiggy entry into small towns, and DMart Swift/Ready delivery scaling — a battle of last-mile economics where DMart's store cost advantage is the interesting card.",
            },
            {
              lead: "Input-cost normalisation",
              text:
                "If food inflation stays benign, staple price deflation reverses into volume; DMart's LFL is sensitive to the grocery price index.",
            },
            {
              lead: "Capital deployment & valuation re-rating",
              text:
                "A ₹1,000 Cr NCD raise signals capital for delivery build — a potential negative catalyst if announced with no profitability path; our target assumes disciplined deployment.",
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
          title: "Thesis in one line",
          text:
            "India's most efficient grocery retailer compounding at ~15-22%, now trading at the low end of its historical multiple, with the market paying for the worst-case of quick-commerce rather than the base-case of share gain plus delivery economics.",
        },
        {
          type: "callout",
          tone: "info",
          title: "What we are buying",
          text:
            "A boring, debt-free, price-led food retailer with 500+ stores, ~₹67,000 Cr revenue, ~4.8% PAT margin and a history of zero dividend-but-superior compound: growth through reinvestment. At ~65x FY27E EPS the market is paying 15x EV/EBITDA with no credit for the delivery optionality.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "What we are paying for",
          text:
            "The stocks the market is pricing the worst-case: if quick-commerce caps same-store growth below 4% for two straight years and delivery losses mount, FY28-29 PAT could stall and the multiple could compress toward 45-50x. That is ~25-30% below our base-case; the asymmetry is acceptable at ₹3,852.",
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
            { label: "Founded", value: "2000", sub: "inaugural store in Powai, Mumbai" },
            { label: "FY26 revenue (standalone)", value: "₹66,968 Cr", sub: "+15.9% YoY" },
            { label: "FY26 PAT (standalone)", value: "₹3,224 Cr", sub: "+10.1% YoY" },
            { label: "Stores", value: "503 at Jun-26", sub: "500 at Mar-26 (+85 FY26)" },
            { label: "Format", value: "Grocery & general merchandise", sub: "EDLP, self-owned stores" },
            { label: "Digital", value: "DMart Ready (18 cities)", sub: "DMart Swift quick-commerce; new COO" },
            { label: "Dividend", value: "None", sub: "never paid in company history" },
            { label: "Promoter", value: "Radhakishan Damani ~22.98%", sub: "family ~74.5% combined" },
          ],
        },
        {
          type: "p",
          text:
            "Avenue Supermarts operates DMart — India's largest pure-play food & grocery retail chain by revenue — on an **everyday-low-price (EDLP)** model across 500+ owned stores. The proposition is simple: no promotions, 5-8% price advantage on staples, high-ticket weekly/monthly fill-ups, and a debt-free balance sheet. The company has never paid a dividend, preferring to fund the next store tranche — the purest reinvestment compound in Indian retail.",
        },
      ],
    },
    {
      id: "business-model",
      label: "Business model",
      blocks: [
        {
          type: "p",
          text:
            "DMart's model is **EDLP + cost discipline + store physics**. It buys 60-65% staples with terms that make working capital a float: suppliers fund inventory, consumers fund the P&L. Stores are large-format (80,000+ sq ft against hypermarkets' ~20-30k), lower-rent suburban, and the chain keeps expenses lean (no advertisement mass, no franchisee cut, no heavy e-commerce spend historically). Revenue = stores × sales per store; profitability = price gap minus opex + operating leverage.",
        },
        {
          type: "kv",
          items: [
            { label: "Pricing", value: "Everyday-low-price", sub: "5-8% below local market on staples" },
            { label: "Assortment", value: "Staples + FMCG + general", sub: "high-turn food, lower-margin general merchandise" },
            { label: "Real estate", value: "Own / long-lease", sub: "buy-&-hold; lease expense ~5-7% of sales (E)" },
            { label: "Sourcing", value: "Direct + national", sub: "payables > inventory days = negative WC" },
            { label: "Employee costs", value: "Lean, store-fixed", sub: "store P&L is a stable percentage of revenue" },
            { label: "Dividend policy", value: "None", sub: "100% reinvestment" },
          ],
        },
        {
          type: "table",
          caption: "Model economics (standalone, FY26)",
          cols: ["Metric", "FY26", "Comment"],
          rows: [
            ["Revenue", "₹66,968 Cr", "+15.9% YoY"],
            ["EBITDA / margin", "₹5,255 Cr / 7.8%", "stable vs 7.9% FY25"],
            ["PAT / margin", "₹3,224 Cr / 4.8%", "+10.1% YoY"],
            ["EPS", "₹49.54", "+10.1% YoY"],
            ["Stores added", "+85", "58 in Q4FY26 alone"],
            ["Working capital", "Negative", "payables float; debt-free except lease obligations"],
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
          caption: "Revenue by product category (company classification; E where estimated)",
          cols: ["Category", "Share (E)", "Growth profile"],
          rows: [
            ["Food & grocery (staples, dairy, FMCG)", "~55-60%", "high-turn; inflation-driven ASP when prices rise"],
            ["General merchandise & apparel", "~25-30%", "discretionary; higher margin, lower frequency"],
            ["Other (home, bazaar, merchandising)", "~10-15%", "margin-accretive; promo-light"],
          ],
        },
        {
          type: "p",
          text:
            "DMart's revenue is the most predictable in Indian retail: a consumer staples base in a country of ~14,000 (E) kirana stores that DMart undercuts and displaces share from. Same-store sales are the cleanest read on the health of Indian mass consumption, making DMart's LFL a national consumption macro-data point — Q1FY27's +5.5% (vs +7.1% a year ago) is the metric to watch each quarter.",
        },
        {
          type: "p",
          text:
            "Revenue beyond store fills: DMart Ready (~18 cities) and Swift add a digital slice that is still small; the negative side is the delivery opex (picker, last-mile), which the company is only now tooling with capital and a COO. We model online GMV ~2-3% of total (E) as a start.",
        },
      ],
    },
    {
      id: "geographic-mix",
      label: "Geographic mix",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Maharashtra (home state)", value: "128 stores (Jun-26)", sub: "~26% of national fleet; Powai/Hiranandani origin" },
            { label: "Western (Gujarat, MP, Rajasthan)", value: "~100+ stores (E)", sub: "high-store density per capita" },
            { label: "Southern (KA, TN, AP, TS)", value: "~80+ (E)", sub: "fast-growing, urban mix" },
            { label: "Northern + Eastern", value: "~60-70 (E)", sub: "lower penetration, offline-growth runway" },
            { label: "Strategy", value: "Foothold-first", sub: "enter a town, localise assortment, then deepen" },
          ],
        },
        {
          type: "p",
          text:
            "The store map tracks the aspirational middle of India rather than just the metros — DMart wins where price outperforms brand and where tenants roll. The geographic mix tells the growth story: Maharashtra matured, the West and South add density, and the North/East remain the long-run same-store base. DMart ready cities (18) largely overlap the top-25, giving the delivery battle a natural adjacency.",
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
              title: "DMart stores — grocery engine",
              body:
                "500-505 stores, ~₹67,000 Cr revenue, 7.8% EBITDA margin: an everyday-low-price model with negative net working capital. Mature-store LFL +5.5% (Q1FY27). The core cash generator funding all else.",
            },
            {
              title: "DMart Ready — e-commerce",
              body:
                "App-based 4-8 hour delivery in ~18 cities, fulfilled from store inventory. Small revenue, heavy opex; the competition hedge against Blinkit/Zepto.",
            },
            {
              title: "DMart Swift — quick commerce",
              body:
                "30-45 min delivery pilot in metro store-dense clusters; early losses accepted. The bet: reuse store inventory + own logistics, listed company cost advantage into convenience.",
            },
            {
              title: "New capability (COO, NCDs)",
              body:
                "First COO (Lalit Ahuja) and a ₹1,000 Cr NCD approval in Q1FY27 — capital for the omnichannel and delivery build; borderline change in a historically debt-free company.",
            },
          ],
        },
        {
          type: "p",
          text:
            "The segment map is really two engines: the **store cash-cow** (steady, cash-heavy) and the **online build** (opex-heavy, currently dilutive but strategically defensive). The delivery build is where the market is testing the thesis — each quarter's Consolidated-vs-Standalone PAT gap (₹76 Cr in Q1FY27) is the visible cost of competing with quick-commerce.",
        },
      ],
    },
    {
      id: "management-quality",
      label: "Management quality",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Chairman", value: "Radhakishan Damani", sub: "promoter; legendary value investor" },
            { label: "MD & CEO", value: "Anshul Asawa", sub: "appointed Feb-2026; continuity of philosophy" },
            { label: "COO", value: "Lalit Ahuja", sub: "appointed Q1FY27; delivery build" },
            { label: "History", value: "Zero losses, zero dividend, zero dilution", sub: "since 2017 IPO; 500-store compound" },
            { label: "Capital discipline", value: "Debt-free until FY26", sub: "first NCD raise (₹1,000 Cr) approved Q1FY27" },
          ],
        },
        {
          type: "p",
          text:
            "The Damani-built organisation is the model: owner-operator discipline, a CEO promoted from within who openly says the company will 'keep the price first, everything else second', and a board that has resisted shortcuts for 25 years. The Q1FY27 appointments (COO, NCD approval) are the first visible signals that the omnichannel age requires capital and a logistics leader — the question is whether execution matches the philosophy.",
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
            "Indian food & grocery retail is a ~₹45-50 lakh Cr (E) market growing low-to-mid single digits, with organised share still <10% (E) — the structural tailwind that built DMart. The game has changed: **quick-commerce** (Blinkit, Zepto, Swiggy Instamart) has compressed delivery times to 10-30 minutes in metros and is expanding into smaller cities, forcing legacy offline retailers into omnichannel. At the same time, food inflation volatility swings same-store sales either way (FY23 up, FY26 down), and urban kirana remains the price-competition baseline.",
        },
        {
          type: "p",
          text:
            "DMart's industry edge is twofold: (i) it competes on price, the single most decisive variable in Indian grocery; and (ii) it owns store economics (real estate, negative working capital) that delivery-only players lack. The industry-level risk is not demand — it is the cost structure of convenience: if 10-minute delivery wins metro wallet share and GMV keeps shifting, DMart's LFL and margin face structural pressure. The industry debate is DMart's debate.",
        },
      ],
    },
    {
      id: "competitive-positioning",
      label: "Competitive positioning",
      blocks: [
        {
          type: "table",
          caption: "Grocery retail competitive map (E = our estimates)",
          cols: ["Player", "Model", "Scale (FY26, E)", "EBITDA margin (E)", "Positioning"],
          rows: [
            ["DMart (Avenue Supermarts)", "EDLP own-store", "₹66,968 Cr", "~7.8%", "Price leader, staples core"],
            ["Reliance Retail (B2C food)", "Hypermarket + quick", "~₹3.7 lakh Cr group", "~8% group (E)", "Scale + omnichannel"],
            ["BigBasket / BB Now (Tata)", "e-grocery", "~₹10-12,000 Cr GMV", "loss-making", "Digital-first grocery"],
            ["Blinkit (Zomato)", "10-min quick", "~₹8-10,000 Cr GMV (E)", "loss-making", "Convenience leader, metros"],
            ["Zepto", "10-min quick", "~₹7-9,000 Cr GMV (E)", "loss-making", "Aggressive expansion"],
            ["Kirana / unorganised", "Local general store", "~85% of market (E)", "—", "Price + credit; DMart's base"],
          ],
        },
        {
          type: "p",
          text:
            "DMart competes on the same aisle as everyone but with a different P&L: it makes money while competitors lose money on grocery delivery. The strategic tension is that quick-commerce is not yet profitable anywhere at scale, while DMart's stores are. The market has nonetheless de-rated DMart toward the quick-commerce worst-case — our positioning is that this is the moment to own the cheap price leader, not the loss-making disruptor.",
        },
      ],
    },
    {
      id: "shareholding-pattern",
      label: "Shareholding pattern",
      blocks: [
        {
          type: "table",
          caption: "Ownership by investor class, % of equity (quarterly disclosures)",
          cols: ["Class", "Jun-25", "Dec-25", "Mar-26", "Jun-26"],
          rows: [
            ["Promoter & group", "74.5%", "74.5%", "74.5%", "74.5%"],
            ["FII / FPI", "9.9%", "9.4%", "9.0%", "9.2%"],
            ["Mutual funds", "6.6%", "6.8%", "6.7%", "6.6%"],
            ["Insurance & other DII", "2.5% (E)", "2.6% (E)", "2.7% (E)", "2.8% (E)"],
            ["Retail & others", "6.5%", "6.7%", "6.6%", "6.6%"],
          ],
        },
        {
          type: "p",
          text:
            "The register is unusually concentrated: the **promoter family holds ~74.5%** (Radhakishan Damani 22.98%, Bright Star Investments 13.61%, Gopikishan 5.59%, plus trusts and other family vehicles ~32%, E), leaving a small free float that amplifies index flows. FII ~9.2% (Jun-26, +20bps QoQ), MF ~6.6%. The structure caps near-term supply and keeps governance simple — but the float constraint can also exaggerate both rallies and drawdowns.",
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
            ["Revenue", "30,353", "41,833", "49,533", "57,790", "66,968"],
            ["Revenue growth", "+21.3%", "+37.8%", "+18.4%", "+16.7%", "+15.9%"],
            ["EBITDA", "2,502", "3,460 (E)", "3,762 (E)", "4,543", "5,255"],
            ["EBITDA margin", "8.2%", "8.3% (E)", "7.6% (E)", "7.9%", "7.8%"],
            ["PAT", "1,616", "2,410 (E)", "2,543 (E)", "2,927", "3,224"],
            ["PAT margin", "5.3%", "5.8%", "5.1%", "5.1%", "4.8%"],
            ["EPS (₹)", "25.4 (E)", "37.4 (E)", "39.5 (E)", "44.98", "49.54"],
            ["Stores (year-end)", "285", "324", "341", "415", "500"],
          ],
        },
        {
          type: "small",
          text:
            "FY23 PAT includes a one-off tax benefit of ₹138.8 Cr; FY25 includes ₹36 Cr (company notes). EPS on ~65.2 Cr shares (face ₹10). Store counts: 285 (FY22), 324 (FY23), 341 (FY24), 415 (FY25), 500 (FY26). Consolidated FY26: revenue ₹68,821 Cr, PAT ₹2,970 Cr (delivery subsidiaries drag ~₹250 Cr vs standalone).",
        },
        {
          type: "p",
          text:
            "The record shows what a price-led model does in every regime: double-digit revenue compounding (FY22-26 CAGR ~22%) with margins oscillating in a tight 7.6-8.3% band and PAT margins 4.8-5.8%. The leverage-free balance sheet, negative working capital and 500 stores make this the highest-quality P&L in Indian retail — the valuation is the only debatable number.",
        },
      ],
    },
    {
      id: "forecasts",
      label: "Forecasts",
      blocks: [
        {
          type: "table",
          caption: "Our estimates, fiscal years ending 31 March (₹ Cr; E = our estimates)",
          cols: ["Metric", "FY26A", "FY27E", "FY28E"],
          rows: [
            ["Revenue (standalone)", "66,968", "~77,000", "~88,500"],
            ["Revenue growth", "+15.9%", "~15%", "~15%"],
            ["EBITDA / margin", "5,255 / 7.8%", "~6,000 / ~7.8%", "~6,900 / ~7.8%"],
            ["PAT", "3,224", "~3,600", "~4,000"],
            ["PAT growth", "+10.1%", "~12%", "~11%"],
            ["EPS (₹)", "49.54", "~55", "~61"],
            ["Stores (year-end)", "500", "~565", "~635"],
          ],
        },
        {
          type: "p",
          text:
            "Our build: ~15% store adds (~75-80 stores/yr in FY27-28, guided ~15% YoY), LFL recovering gradually from 5.5% toward ~7% as quick-commerce normalisation and a benign food-price cycle kick in, EBITDA margin stable at 7.8% (delivery opex offset by core operating leverage), and a slow ~125-150 Cr/yr (E) consolidated drag from online. Consensus (31 analysts, trendlyne) expects FY27 revenue growth ~17.2% and profit growth ~19.9% — we are slightly more cautious on margin but directionally aligned.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key estimate risks",
          text:
            "Our FY27E EPS of ~₹55 embeds stable margins. Two deviations would matter: (i) delivery build surpassing ₹400 Cr/yr of EBITDA burn (metro volumes needed twice for paying P&L), and (ii) a sharper quick-commerce-driven LFL decay below 4% — together worth ~15-20% of FY28E EPS.",
        },
      ],
    },
    {
      id: "consensus",
      label: "Consensus & revisions",
      blocks: [
        {
          type: "table",
          caption: "Street view (S&P Global / stockanalysis.com, 31 analysts, Jul-2026)",
          cols: ["Measure", "Value"],
          rows: [
            ["Average target price", "₹4,346 (+6.9% vs current)"],
            ["Target range", "₹3,250 to ₹5,723"],
            ["Consensus rating", "Hold (3 Strong Buy / 7 Buy / 6 Sell of 16 rated)"],
            ["Current price (7 Aug 2026)", "₹3,852"],
            ["Implied upside to consensus", "+12.8%"],
          ],
        },
        {
          type: "list",
          items: [
            {
              lead: "Recent published moves",
              text:
                "Bernstein Buy ₹5,000 (13-Jul-26); Motilal Oswal Buy, TP raised ₹4,750→₹4,800 (12-Jul-26); JPMorgan Hold ₹4,250 (15-Jul-26); ICICI Sec Hold ₹4,200 (14-Jul-26); PL Hold ₹4,103 (12-Jul-26); Geojit Buy ₹5,063 (23-Jun-26); Axis Direct Buy ₹5,270 (4-May-26); Kotak Reduce ₹4,250 (6-Apr-26); Emkay Sell ₹3,700 (15-Apr-26).",
            },
            {
              lead: "Where we sit",
              text:
                "Our ₹4,500 target sits at the upper half of the recent consensus band and above the S&P Global average (₹4,346). We are constructive because the de-rating (stock −22% from peak) has outrun the earnings change — the latest quarterly prints still show double-digit revenue growth with margins intact.",
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
            "We value DMart on a forward P/E anchored to consensus-consistent FY27-28E EPS, cross-checked against its own history (3-year average forward P/E ~76x, Geojit) and EV/EBITDA. At ₹3,852 the stock trades at ~78x FY26 EPS (₹49.54) and ~65x our FY27E (~₹59, E).",
        },
        {
          type: "table",
          caption: "Target price derivation (on our estimates)",
          cols: ["Step", "Parameter", "Value"],
          rows: [
            ["1", "FY27E EPS", "₹55 (E)"],
            ["2", "FY28E EPS", "₹61 (E)"],
            ["3", "Target multiple", "~74x FY27E / ~62x FY28E"],
            ["4", "Target price", "₹61 × 74 ≈ ₹4,514 → ₹4,500"],
            ["5", "Upside to current price (₹3,852)", "+16.8%"],
          ],
        },
        {
          type: "p",
          text:
            "**Multiple justification.** 74x FY27E (~1.2x PEG vs ~15-20% EPS growth) is a premium to every other Indian retailer and requires the entire thesis to be right: continued revenue compounding, margin stability ~7.8% and quick-commerce contained. We accept the multiple because (i) DMart's cash conversion is extreme (no capex beyond stores, negative working capital), (ii) EPS has never declined in 9 years as a listed company, and (iii) the franchise's price leadership is a structural moat. The multiple is capped relative to FY26's ~85x because the delivery-cost risk is real.",
        },
        {
          type: "table",
          caption: "Sensitivity — target price vs multiple and FY28E EPS",
          cols: ["Multiple / EPS", "₹55 (bear)", "₹61 (base)", "₹68 (bull)"],
          rows: [
            ["50x FY28E", "₹2,750", "₹3,050", "₹3,400"],
            ["62x FY28E", "₹3,410", "₹3,782", "₹4,216"],
            ["74x FY28E", "₹4,070", "₹4,514", "₹5,032"],
          ],
        },
        {
          type: "p",
          text:
            "In the bear case (quick-commerce caps LFL, FY28 EPS ₹55 at 50x) fair value is ₹2,750 — the market's worst-case is already close to our bear. In the bull case (delivery economics work, 15%+ growth continues, FY28 EPS ₹68 at 74x) fair value is ₹5,032, ~31% above current. The risk-reward is skewed favourably at ₹3,852 even with a Hold-consensus street.",
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
              risk: "Quick-commerce structural share loss",
              probability: "High",
              financial: "Blinkit/Zepto/Swiggy scale in metros and small towns; DMart inline LFL declines to <3% for two consecutive years; FY28 consolidated PAT −10-15%.",
              valuation: "Multiple collapses toward 45-50x; fair value ₹2,700-3,000 (E) — the market's current worry front-loaded.",
              indicator: "Mature-store LFL, metro vs non-metro mix, delivery GMV share, store-add pace.",
              mitigation: "DMart Swift/Ready delivery build, price-gap duration, non-metro store prioritisation, own-store cost advantage.",
              kpi: "LFL ≥ 5%; metro LFL ≥ 3%; Swift/Ready GMV ramp.",
            },
            {
              risk: "Margin compression from the delivery build",
              probability: "Medium",
              financial: "Consolidated-vs-standalone PAT gap (₹76 Cr Q1FY27) widens if delivery opex scales; EBITDA margin dips below 7.2%.",
              valuation: "EPS growth stalls at ~5%; the 74x multiple is no longer defensible; fair value ₹3,200-3,400.",
              indicator: "Consolidated vs standalone PAT gap, opex/employee growth, NCD drawdown usage.",
              mitigation: "COO appointment, phased city-tiering, store-fulfilled model keeps incremental cost low.",
              kpi: "Consolidated EBITDA ~7.8% in FY27; online loss < ₹150 Cr/yr.",
            },
            {
              risk: "Store-acceleration payback miss",
              probability: "Medium",
              financial: "85 new stores (58 in Q4FY26) show slower payback; revenue/store dilutes; capex pressure rises.",
              valuation: "Growth premium erodes; P/E compresses to the 55-60x line.",
              indicator: "Revenue/store, store payback period vs guided ~7 years, store-add pace vs guided 15%.",
              mitigation: "Land-bank and lean construction, lease-first approach, store-cluster economics.",
              kpi: "Revenue/store flat-to-up; new-store break-even ≤ 3 years.",
            },
            {
              risk: "Promoter float & liquidity event",
              probability: "Low",
              financial: "No P&L impact; share-supply risk via any future offer-for-sale of the small float.",
              valuation: "Temporary multiple reset on overhang; history shows float news is absorbed.",
              indicator: "SEBI-block/pro counts, block-deal chatter, promoter filings.",
              mitigation: "Track record of no dilution since 2017 IPO.",
              kpi: "None — event-driven.",
            },
            {
              risk: "Valuation de-rating persists",
              probability: "Medium",
              financial: "No P&L impact; the multiple itself is the risk at ~65x FY27E.",
              valuation: "If peers re-rate down (Reliance Retail, quick-commerce IPOs distract flows), DMart's premium unwinds toward 50-55x.",
              indicator: "Sector P/E ratio, quick-commerce valuations, index flows.",
              mitigation: "Earnings-driven de-risking: consistent 15%+ EPS growth and flat margin is the floor.",
              kpi: "P/E vs 3-yr average; EPS growth ≥ 10%.",
            },
            {
              risk: "Regulatory / food-price shocks",
              probability: "Low",
              financial: "Food-inflation or supply-side shocks compress LFL; a one-off.",
              valuation: "LFL headlines reset near-term multiple but not the compounding case.",
              indicator: "CPI food, basket pricing, seasonal trends.",
              mitigation: "Staples-first model absorbs inflation better than discretionary.",
              kpi: "LFL ≥ 3% in any single quarter.",
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
            "All factual statements in this note are drawn from the primary documents below. Where figures are derived or estimated, they are marked (E) and reconciled against company disclosures.",
        },
        {
          type: "downloads",
          items: [
            {
              label: "Q4FY26 press release (2 May 2026)",
              url: "https://api.dmartindia.com/corporate/content/file/v1/2/R2aWBiIpiuD39xgfm4wrqQKc1777723315/Press%20release%20dated%202nd%20May,%202026.pdf",
              note: "FY26 revenue ₹66,968 Cr, PAT ₹3,224 Cr, 500 stores, EPS ₹49.54",
            },
            {
              label: "Q1FY27 results article (11 Jul 2026)",
              url: "https://www.thehindubusinessline.com/companies/d-mart-owner-avenue-supermarts-q1-net-profit-jumps-113-to-86044-cr-sales-rise-149/article71210383.ece",
              note: "Q1 FY27 cons revenue ₹18,794 Cr, PAT ₹860 Cr; NCD approval; COO appointment",
            },
            {
              label: "FY26 investor presentation (BSE filing)",
              url: "https://www.bseindia.com/xml-data/corpfiling/AttachHis/41f9f4a8-9c40-484c-a705-25c0bf4b96d3.pdf",
              note: "Store and same-store metrics, segment revenue mix",
            },
            {
              label: "Consensus & valuation data",
              url: "https://stockanalysis.com/quote/nse/DMART/forecast/",
              note: "31 analysts, avg target ₹4,346, consensus Hold",
            },
            {
              label: "Shareholding pattern (BSE)",
              url: "https://www.bseindia.com/stock-share-price/avenue-supermarts-ltd/540376/shareholding-pattern/",
              note: "Promoter ~74.5%, FII ~9.2%, MF ~6.6%",
            },
            {
              label: "Cross-check: Q4 FY26 results coverage",
              url: "https://economictimes.indiatimes.com/markets/stocks/earnings/dmart-q4-results-avenue-supermarts-cons-pat-jumps-19-to-rs-656-crore-revenue-too-rises-19/articleshow/130715883.cms",
              note: "Q4 cons PAT ₹656 Cr, LFL +10.8%, 500 stores crossed",
            },
          ],
        },
      ],
    },
  ],
};
