import type { ResearchNote } from "./types";

export const bhartiAirtelNote: ResearchNote = {
  slug: "bharti-airtel",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹2,330", sub: "vs ₹1,950 current" },
    { label: "Implied upside", value: "+19.5%" },
    { label: "Market cap", value: "₹12,20,000 Cr", sub: "≈ 6.24 bn shares (post ICIL issue)" },
    { label: "FY27E P/E", value: "~37x", sub: "consensus EPS ~₹52 (E)" },
    { label: "FY26 P/E (actual)", value: "~44x", sub: "TTM EPS ₹43.81" },
    { label: "ARPU (Q1 FY27)", value: "₹264", sub: "+5.6% YoY, +2.7% QoQ" },
    { label: "FY26 EBITDA margin", value: "56.7%", sub: "₹1,19,675 Cr EBITDA" },
    { label: "Net debt / EBITDA", value: "~1.2x", sub: "post-Q1 (CLSA); gearing low" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 PAT", value: "₹8,167 Cr", sub: "+37.3% YoY; ex-exceptional ₹8,057 Cr (+35.5%)" },
            { label: "Q1 FY27 revenue", value: "₹58,539 Cr", sub: "+18.4% YoY; 19th consecutive profit quarter" },
            { label: "Q1 FY27 ARPU", value: "₹264", sub: "vs ₹250 Q1FY26, ₹257 Q4FY26; 2.7% QoQ" },
            { label: "India business revenue", value: "₹41,214 Cr", sub: "+9.7% YoY; mobile +9.2% to ₹29,929 Cr" },
            { label: "Africa stake", value: "Raised to >79%", sub: "EPS-accretive share swap completed in Q1" },
            { label: "FCF / capex (Q1)", value: "₹16,500 Cr / ₹13,400 Cr", sub: "post-lease; gearing ~1.2x (CLSA)" },
          ],
        },
        {
          type: "p",
          text:
            "Bharti Airtel reported Q1 FY27 results on 4 August 2026: consolidated PAT of **₹8,167 Cr (+37.3% YoY)**, revenue of **₹58,539 Cr (+18.4%)**, and ARPU of **₹264** — a fifth consecutive quarter of ARPU expansion and the highest in the industry (Jio: ₹215.6). India mobile grew 9.2% to ₹29,929 Cr on record postpaid net additions (1 million, the highest ever, aided by the new Fast Lane 5G network-slicing plan) and smartphone data customer gains.",
        },
        {
          type: "p",
          text:
            "The strategic headline was the **Airtel Africa stake increase to over 79%** via an EPS-accretive share swap completed during the quarter — management's strongest statement yet on Africa as a growth engine. Free cash flow ran at ₹16,500 Cr post-lease with capex of ₹13,400 Cr, and the balance sheet remains low-geared (~1.2x net debt/EBITDA). The stock has rallied ~4% post-results to ~₹1,950, still 7% lower YTD.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We maintain Buy. Q1 validated the operating leverage thesis (EBITDA +13% YoY in India ex-Indus, margin ~60%) and the ARPU upcycle is intact even before the next tariff hike. We set a target of ₹2,330 (~19.5x FY27E EV/EBITDA, in line with the post-Q1 street: Citi ₹2,190, Macquarie ₹2,220, CLSA ₹2,330, Jefferies ₹2,360) — no credit yet for a tariff hike beyond the current trajectory.",
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
            "The market's Airtel debate has three pillars: (i) ARPU sustainability — investors question whether ₹264 can keep rising without a fresh tariff hike, which management has repeatedly deferred (now guided toward Q4FY27); (ii) Africa — the enlarged >79% stake brings higher growth but FX risk, inflation and repatriation uncertainty; and (iii) capital allocation — capex intensity, spectrum obligations and a rising share of profits from non-mobile lines (Airtel Business, Nxtra, Homes, NBFC).",
        },
        {
          type: "table",
          caption: "Where our view differs from consensus",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "ARPU trajectory",
              "Plateau until the next hike",
              "5-6% annualised ARPU growth without tariff action (usage + postpaid + enterprise mix) is sustainable through FY28",
              "ARPU ₹250 → ₹257 → ₹264 across the last three quarters; postpaid mix rising",
            ],
            [
              "Africa stake increase",
              "Adds growth, adds FX risk",
              "Net positive: EPS-accretive at >79%, structural subscriber growth >9% YoY, cost to serve falling",
              "Swap completed Q1FY27, described by management as EPS accretive",
            ],
            [
              "Tariff hike timing",
              "Q4FY27 or later; risk of pushback",
              "Hike likely in H2FY27; each ₹5-10 ARPU lift adds ~₹2,500-4,500 Cr annual revenue (E) — a real upgrade trigger",
              "Management guidance of Q4FY27; industry pricing discipline intact (Jio ARPU ₹216)",
            ],
            [
              "Valuation (~44x TTM)",
              "Full after the FY26 rerating",
              "Fair for 28% EPS CAGR (FY27-29E, Jefferies) with 14% EBITDA CAGR; fwd P/E ~37x is below Jio's implied multiple",
              "Q1 PAT +37%; FY26 ex-ex PAT +53%; Jefferies models EBITDA/EPS CAGR 14%/28%",
            ],
          ],
        },
        {
          type: "p",
          text:
            "The disagreement is testable every quarter: ARPU, India EBITDA margin, postpaid adds, Africa revenue and EBITDA in local currency, and FCF conversion. If ARPU crosses ₹275 by Q3FY27 without a tariff hike, the upcycle is structural and our target is conservative. If ARPU stalls near ₹264 with Africa's FX headwinds, the multiple compresses toward 32-35x and our target is at risk.",
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
              driver: "1. The ARPU upcycle — pricing power in a three-player market",
              evidence:
                "ARPU ₹264 in Q1FY27 (+5.6% YoY, +2.7% QoQ) with no tariff hike; India mobile revenue +9.2%; postpaid net adds of 1 million (record, Fast Lane 5G slicing); data consumption per user compounding at 15-20% YoY (E).",
              consequence:
                "Every ₹10 of ARPU is ~₹4,500 Cr of annualised India mobile revenue (E) and ~65-70% of that drops to India EBITDA (E). A Q4FY27 hike of ₹10-15 would add ~10-15% to FY28E EPS (E) — the single largest earnings driver.",
              monitor:
                "Quarterly ARPU, data per user, postpaid adds, India EBITDA margin, any tariff-hike announcements.",
            },
            {
              driver: "2. Africa as a second growth engine",
              evidence:
                "Stake raised to >79% in Q1FY27 via EPS-accretive share swap; Africa revenue grew ~10% YoY in FY26 (E) with customer base crossing 170 mn (E); margin expansion on network modernisation.",
              consequence:
                "Africa contributes ~28% of consolidated revenue (E) and is growing faster than India; the enlarged stake converts a listed-entity discount into consolidated EPS directly. FX (NGN, KES, etc.) is the offsetting cost.",
              monitor:
                "Africa revenue/EBITDA in local currency, FX rates, subscriber adds, repatriation flows.",
            },
            {
              driver: "3. Diversified portfolio — Business, Homes, Nxtra, NBFC",
              evidence:
                "Airtel Business growing double digits; Nxtra scaled to ~1 GW of data-centre capacity; Homes fibre adds accelerating; the NBFC (Airtel Finance) launched. These lines now contribute a growing share of group EBITDA (E).",
              consequence:
                "Non-mobile lines de-risk the telco multiple and raise the group's revenue quality; enterprise and B2B have structurally higher margins than consumer mobile. As these scale, the group trades less like a utility and more like a digital services company.",
              monitor:
                "Airtel Business revenue growth, Nxtra capacity and utilisation, fibre adds, NBFC book growth.",
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
            "Airtel crossed the most important inflection in its history in FY26: **19 consecutive profitable quarters** after the six straight loss years that ended in FY21. The FY26 result (revenue ₹2,10,973 Cr, +22%; operating-profit/EBITDA ₹1,19,675 Cr, 56.7% margin; ex-exceptional PAT ~₹26,700 Cr, +52% vs ₹17,573 Cr in FY25) confirmed the new regime: pricing discipline across the industry has made telecom a rational three-player market.",
        },
        {
          type: "p",
          text:
            "The strategic inflection of FY27 is **the Africa consolidation**: taking the stake to >79% turns Airtel Africa from a minority investment into the group's second engine. Combined with Nxtra's 1 GW data-centre programme, the NBFC, and Airtel Business' enterprise scale, Airtel is now a diversified digital platform rather than a pure mobile operator — which is precisely why the market has rerated it from ~15x to ~37x forward earnings over two years.",
        },
        {
          type: "p",
          text:
            "The final missing leg is the next **tariff hike** (guided toward Q4FY27). Airtel and Jio have alternated hikes since FY22; the industry has already shown it can move pricing without destroying churn (postpaid adds at record highs). A hike would be the cleanest catalyst for the next leg of the re-rating.",
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
              lead: "Q2 FY27 results (Nov 2026)",
              text:
                "The run-rate test: ARPU (₹264 in Q1), India EBITDA margin, postpaid adds post-Fast Lane, and Africa performance in constant currency.",
            },
            {
              lead: "Tariff hike (guided Q4FY27)",
              text:
                "Every ₹10 of ARPU adds ~₹4,500 Cr of annualised India revenue (E); a Q4FY27 hike lands in FY28 EPS — the single biggest earnings catalyst on the horizon.",
            },
            {
              lead: "Africa consolidation and earnings",
              text:
                "With >79% ownership, Africa's P&L now flows through largely in full; a stabilising NGN and margin expansion would be a multi-quarter EPS tailwind.",
            },
            {
              lead: "Airtel Business and Nxtra scaling",
              text:
                "Enterprise and data-centre growth are margin-accretive; Nxtra's 1 GW build-out converts into contracted revenue as hyperscaler demand absorbs capacity.",
            },
            {
              lead: "Spectrum and capex clarity",
              text:
                "Any positive outcome on spectrum payment terms or a slower capex cycle improves FCF and deleveraging — FCF was already ₹16,500 Cr in Q1.",
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
          title: "Buy — ₹2,330 target, +19.5%",
          text:
            "Airtel is compounding EPS at ~28% (Jefferies FY27-29E) on a disciplined, three-player industry — ARPU ₹264 and rising, India EBITDA margins ~60%, and a structurally deleveraging balance sheet (~1.2x). The Q1 FY27 beat (PAT +37%, revenue +18.4%) plus the Africa consolidation to >79% make the risk-reward favourable even after the rerating.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text:
            "(1) Tariff-hike slippage — a delay past H1FY28 stalls ARPU and the multiple. (2) Africa FX/inflation — Nigeria, Kenya and the wider set carry the volatility of high-hold currencies. (3) Spectrum costs and capex intensity cap FCF. (4) India 5G monetisation slower than modelled. (5) Macro-demand shock weakens prepaid usage and enterprise spend.",
        },
        {
          type: "kv",
          items: [
            { label: "India mobile revenue share", value: "~73% of India revenue", sub: "₹29,929 Cr of ₹41,214 Cr (Q1 FY27)" },
            { label: "India mobile revenue growth", value: "+9.2% YoY", sub: "ARPU ₹264; 19th profitable quarter" },
            { label: "Africa stake", value: ">79%", sub: "EPS-accretive share swap completed in Q1" },
            { label: "ROCE / ROE (TTM)", value: "~24.7% / ~22.7%", sub: "screener; improving with gearing" },
            { label: "Dividend", value: "₹6/share FY26", sub: "progressive payout as FCF grows" },
          ],
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
            { label: "What it does", value: "Integrated telecom operator", sub: "mobile, broadband, enterprise, data centres, NBFC" },
            { label: "India scale", value: "~482 mn customers (FY26, E)", sub: "mobile ~354 mn on 5G-ready network" },
            { label: "Africa scale", value: "~170 mn customers (E)", sub: "14 countries, stake now >79%" },
            { label: "Portfolio", value: "Airtel Business, Nxtra (DCs), Airtel Homes, Airtel Finance", sub: "diversified beyond mobile" },
            { label: "Network", value: "Pan-India 4G/5G", sub: "largest fibre and ~1 GW Nxtra DC capacity" },
            { label: "Competitive position", value: "#2 in India", sub: "after Jio; strongly ahead of Vi; BSNL distant" },
          ],
        },
        {
          type: "p",
          text:
            "Bharti Airtel is India's #2 mobile operator and a pan-African operator (14 countries, >79% owned), with fast-growing non-mobile lines. The FY26 result — revenue ₹2,10,973 Cr (+22%), EBITDA ₹1,21,268 Cr (57.5%), ex-ex PAT ₹26,904 Cr (+53%) — was the strongest in its history. The Africa share swap in Q1FY27 increased the stake to over 79%, consolidating the second growth engine.",
        },
        {
          type: "p",
          text:
            "The India mobile business (~73% of India revenue) is leading the ARPU upcycle at ₹264; the enterprise, data-centre (Nxtra ~1 GW) and NBFC lines address ₹50,000+ Cr addressable markets (E) and are margin-accretive. Airtel Finance is scaling the affordability lending book, monetising over 480 mn customers.",
        },
      ],
    },
    {
      id: "business-model",
      label: "Business model",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Revenue model", value: "Subscriptions + enterprise", sub: "usage, postpaid, B2B, digital services and Airtel Finance" },
            { label: "Cost structure", value: "Network, spectrum, power", sub: "amortisation + interconnection + overhead" },
            { label: "Growth engine", value: "ARPU upcycle + Africa", sub: "19 straight profitable quarters" },
            { label: "Balance sheet", value: "Net debt/EBITDA ~1.2x", sub: "net debt & leverage declining" },
            { label: "Cash generation", value: "FCF ₹16,500 Cr / qtr", sub: "post-lease; strong conversion (Q1 FY27)" },
          ],
        },
        {
          type: "p",
          text:
            "Airtel monetises usage (minutes/data), postpaid, enterprise and now finance. The marginal economics are strong: incremental data usage flows to EBITDA at ~65-70% (E). Network and spectrum capex dominate expenses, and depreciation is a large P&L item.",
        },
      ],
    },
    {
      id: "revenue-breakdown",
      label: "Revenue breakdown (Q1 FY27)",
      blocks: [
        {
          type: "table",
          cols: ["Line", "Q1 FY27 rev", "Growth YoY", "% of consolidated"],
          rows: [
            ["India — Mobile", "₹29,929 Cr", "+9.2%", "~51%"],
            ["India — Others (Business, Homes, DC, Levotech)", "₹11,285 Cr", "+10.8%", "~19%"],
            ["Total India", "₹41,214 Cr", "+9.7%", "~70%"],
            ["Africa", "~₹16,000 Cr", "+8-10% (E)", "~28%"],
            ["Middle East & Others", "~₹1,300 Cr", "flat (E)", "~2%"],
            ["Consolidated", "₹58,539 Cr", "+18.4% YoY", "100%"],
          ],
        },
        {
          type: "table",
          caption: "Africa (consolidated stake >79% post-swap)",
          cols: ["Metric", "FY26 / Q1FY27 (E)", "Comment"],
          rows: [
            ["Customers", "~170 mn (E)", "growing high-single-digit YoY"],
            ["Revenue (local currency)", "~10% YoY (E)", "data-led growth"],
            ["EBITDA margin", "~46-48% (E)", "improving on scale & network modernisation"],
            ["Ownership", ">79%", "stake raised via EPS-accretive share swap"],
          ],
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
            { label: "India", value: "~71% of revenue", sub: "~482 mn customers; ₹354 ARPU only in India (Q1)" },
            { label: "Africa", value: "~28% of revenue", sub: "rising stake; 14 countries" },
            { label: "Rest (Airtel Business intl., rest of world)", value: "~1%", sub: "including mobile Airtel-Africa rest" },
            { label: "Network geographies", value: "15 countries total", sub: "India + 14 in Africa" },
          ],
        },
        {
          type: "p",
          text:
            "India accounts for ~70% of revenue and the majority of EBITDA (India mobile EBITDA margin ~60%, blended group ~57.5%). Africa — now >79% owned — is the #2 growth driver. The model is deliberately weighted to India (regulated, rational pricing) with Africa as a structural growth optionality.",
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
              title: "India Mobile",
              body: "ARPU ₹264 (+5.6% YoY). Record 1 mn postpaid net adds (Fast Lane 5G). Healthy prepaid mix gains. Data per user compounds double-digit. The cash engine: ~60% EBITDA margin (E).",
            },
            {
              title: "Airtel Business",
              body: "Enterprise connectivity + ICT. Double-digit growth (E). Energy / Levotech & security; growing share of group EBITDA (E).",
            },
            {
              title: "Airtel Africa",
              body: "Stake >79% post swap. 170 mn+ customers across 14 geographies. Local-currency revenue growing ~10% YoY with margin gap-closing as network investments pay off.",
            },
            {
              title: "Airtel Homes (broadband) & Nxtra DCs",
              body: "Fibre adds accelerating, ARPU rising. Nxtra is India's leading DC platform; ~1 GW capacity targeting hyperscaler demand. Long-term margin-accretive.",
            },
            {
              title: "Airtel Finance (NBFC)",
              body: "Affordability-led lending to the 480 mn+ customer base, resetting risk with better data. Early but reveals the linkage to consumption.",
            },
          ],
        },
      ],
    },
    // __B3__
    {
      id: "financial-analysis",
      label: "Financial analysis",
      blocks: [
        {
          type: "table",
          caption: "Consolidated financials (FY22 – FY26E)",
          cols: ["Metric", "FY2022", "FY2023", "FY2024", "FY2025", "FY2026"],
          rows: [
            ["Revenue (₹ Cr)", "1,16,547", "1,39,145", "1,49,982", "1,72,985", "2,10,973"],
            ["Revenue growth", "15.8%", "19.4%", "7.8%", "15.3%", "22.0%"],
            ["EBITDA (₹ Cr): op profit", "57,534", "71,274", "78,292", "93,159", "1,19,675"],
            ["EBITDA margin (op)", "49.4%", "51.2%", "52.2%", "53.8%", "56.7%"],
            ["PAT — reported (₹ Cr)", "4,255", "8,346", "7,467", "33,556", "26,695"],
            ["PAT — ex-exceptional (₹ Cr)", "4,255 (E)", "8,346 (E)", "7,467 (E)", "17,573", "~26,700"],
            ["Net debt / EBITDA", "~2.5x", "~2.2x", "~1.9x", "~1.4x", "~1.2x"],
          ],
        },
        {
          type: "p",
          text:
            "Revenue has compounded at ~16% since FY22 and EBITDA at ~20% on margin mix. FY26's +22% growth was driven by the ARPU upcycle and restructuring at expanding margins (56.7% operating-profit margin vs 49.4% in FY22). Net-debt/EBITDA improved from ~2.5x to ~1.2x; management guides to a further step down. Depreciation/amortisation remains the largest P&L drag (spectrum + network), so reported PAT understates the cash run-rate.",
        },
        {
          type: "p",
          text:
            "Reported PAT uses screener-consistent after-minority figures (FY25 ₹33,556 Cr and FY22-24 figures include one-time Indus Towers/other gains — see ex-exceptional row). The ex-exceptional series (FY25 ₹17,573 Cr from official FY25 highlight; FY26 ~₹26,700 Cr) is the cleaner basis for modelling: +52% YoY compounding from ₹17,573 Cr. Q1 FY27 already adds PAT of ₹8,167 Cr (+37.3% YoY) with post-lease FCF of ₹16,500 Cr.",
        },
      ],
    },
    {
      id: "consensus",
      label: "Consensus",
      blocks: [
        {
          type: "p",
          text:
            "After the Q1 FY27 results (4 August 2026) broker target prices cluster ₹2,190-2,360: **Citi Buy ₹2,190 (+12%)**, **CLSA Outperform ₹2,330 (+19.5%)**, **Macquarie Outperform ₹2,220 (+13.5%)** and **Jefferies Accumulate ₹2,360** (raised from ₹2,350, +21%; EBITDA/EPS CAGR 14%/28% FY27-29E). Consensus target ~₹2,310-2,330 against a price of ~₹1,950.",
        },
        {
          type: "list",
          items: [
            { lead: "Jefferies (Accumulate)", text: "TP ₹2,360 — models EBITDA/EPS CAGR 14%/28% FY27-29; sees tariff-hike optionality." },
            { lead: "CLSA (Outperform)", text: "TP ₹2,330 — Q1 beat; Africa swap EPS-accretive; gearing fell to ~1.2x." },
            { lead: "Citi (Buy)", text: "TP ₹2,190 — ARPU inflection and free-cash-flows; postpaid fast lane." },
            { lead: "Macquarie (Outperform)", text: "TP ₹2,220 — cash-flow inflection with capex normalising." },
          ],
        },
      ],
    },
    {
      id: "valuation",
      label: "Valuation",
      blocks: [
        {
          type: "callout",
          tone: "key",
          title: "Target derivation — ₹2,330",
          text:
            "We value Bharti on FY27E EV/EBITDA. India EBITDA at ~₹1,20,000 Cr (E) and Africa at its own multiple; a blended ~19.5x FY27E EV/EBITDA (in line with post-Q1 street, and below Jio's implied) yields ~₹2,330/share. On P/E the same is ~37x FY27E EPS ~₹52 (E), vs 44x TTM.",
        },
        {
          type: "table",
          cols: ["Scenario", "FY27E EV/EBITDA", "Implied value/share", "Upside"],
          rows: [
            ["Bear (ARPU stall, FX hit)", "~17x", "₹1,800", "-8%"],
            ["Base (ARPU ~₹270-275)", "~19.5x", "₹2,330", "+19.5%"],
            ["Bull (tariff hike H2FY27)", "~21x", "₹2,650", "+36%"],
          ],
        },
        {
          type: "p",
          text:
            "Risks to the call: tariff policy, FX in Africa, and cost inflation in network build. Upside: any tariff hike that lands in FY28 EPS, Nxtra re-rating, and continued postpaid mix shift.",
        },
      ],
    },
    // __B4__
    {
      id: "management-quality",
      label: "Management quality",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Promoter & leadership", value: "Sunil Mittal (Chairman)", sub: "Gopal Vittal (Executive Vice Chairman); strong professional management" },
            { label: "ESG / governance", value: "Clear strategy and disclosure", sub: "track record of hitting targets" },
            { label: "Capital allocation", value: "Deleveraging + dividends", sub: "net debt/EBITDA ~1.4x (down); ₹6 DPS" },
            { label: "Majority-owner discipline", value: "Clean cap structure", sub: "no debt overhang; stake raise via swap (EPS-accretive)" },
            { label: "BUiT & culture", value: "BEST-in-industry execution", sub: "postpaid and 5G slicing innovation (Fast Lane)" },
          ],
        },
        {
          type: "p",
          text:
            "Airtel's management has a strong record: 19 straight profitable quarters, the Airtel Africa stake swap executed (EPS-accretive), data-centre (Nxtra) build-out, and consistent execution against guidance. Vittal's leadership remains a key differentiator for the model.",
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
            "India telecom is now a rational three-player market (Airtel #2, Jio #1, and a weakened Vi). The FY22-26 sequence of tariff hikes (ARPU from ~₹145 to ₹264 industry-wide) reset the economics; the industry's ARPU average is ~₹216-264, with India poised to keep rising. Beyond India, Africa is displaying protocol — price competition and prepaid-led upgrades underpin growth sponsors.",
        },
        {
          type: "kv",
          items: [
            { label: "Industry ARPU (India)", value: "₹216 (Jio), ₹264 (Airtel)", sub: "industry average climbing every quarter" },
            { label: "Growth driver", value: "Data + pricing upcycle", sub: "video, 5G slicing, enterprise" },
            { label: "Market structure", value: "3-player discipline", sub: "Bharti #2 vs Jio #1" },
            { label: "Regulatory", value: "Spectrum and AGR regimes", sub: "payments over life of licences" },
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
          caption: "vs key peers",
          cols: ["Factor", "Bharti Airtel", "Reliance Jio", "Vi / BSNL"],
          rows: [
            ["India market share (FY26)", "~32% (E)", "~38% (E)", "~18-20% combined"],
            ["ARPU (Q1 FY27)", "₹264", "₹216", "~₹145-170"],
            ["EBITDA margin", "~57.5%", "~48-52%", "sub-30%"],
            ["5G / network", "4G+5G pan-India", "5G pan-India", "lagging"],
            ["Typical tariff hike strategy", "benchmark", "benchmark", "under-priced"],
          ],
        },
      ],
    },
    {
      id: "shareholding-pattern",
      label: "Shareholding pattern",
      blocks: [
        {
          type: "table",
          caption: "Shareholding (Jun-26, screener)",
          cols: ["Holder", "Stake", "Notes"],
          rows: [
            ["Promoters & group", "48.87%", "from 50.07% — hit by Airtel-Africa swap dilution"],
            ["Singtel (largest FII)", "~26.8%", "long-term strategic anchor investor"],
            ["Other FIIs", "~0.4% (E)", "besides Singtel"],
            ["DII", "21.08%", "MFs 12.14%"],
            ["Public & others", "2.69%", "retail + institutions"],
          ],
        },
        {
          type: "p",
          text:
            "Promoter holding diluted by the June 2026 ICIL share issue (146.76 mn shares @ ₹1,923) for the Africa swap. Singtel remains the anchor FII. The share count post-issue is ~6.24 bn shares.", 
        },
      ],
    },
    // __B5__
    {
      id: "risks",
      label: "Risk register",
      blocks: [
        {
          type: "table",
          cols: ["Risk", "Impact", "Probability", "Mitigant"],
          rows: [
            ["Tariff-hike delay past FY28", "High", "Medium", "ARPU upcycle from usage/postpaid shows ARPU can rise without tariff action"],
            ["Africa FX volatility", "Medium", "High", "Operating-cost discipline; local-currency revenue; only partial repatriation"],
            ["Capex / spectrum lease renewals", "Medium", "Medium", "Spread and pre-funding via NCDs; group leverage low"],
            ["5G monetisation miss", "Medium", "Medium", "Fast Lane slicing; postpaid adds; enterprise 5G"],
          ],
        },
      ],
    },
    {
      id: "downloads",
      label: "Downloads & primary sources",
      blocks: [
        {
          type: "downloads",
          items: [
            { label: "airtel.in — Investor relations cockpit", url: "https://www.airtel.in/" },
            { label: "ET — Q1 FY27 results report", url: "https://economictimes.indiatimes.com/markets/stocks/news/airtel-profit-jumps-37-beats-estimates-amid-record-arco-in-arpu/articleshow/132858553.cms" },
            { label: "ET — broker reactions (5 Aug 2026)", url: "https://economictimes.indiatimes.com/markets/stocks/news/bharti-airtel-q1-results-brokerages-raise-target-prices/articleshow/132889091.cms" },
            { label: "Business Standard — Q1 FY27", url: "https://www.business-standard.com/companies/news/bharti-airtel-q1-profit-jumps-37-to-rs-8-167-crore-revenue-up-18-articleshow/" },
            { label: "Screener.in — financials", url: "https://www.screener.in/company/BHARTIARTL/" },
            { label: "ETMoney — live quote and mcap", url: "https://www.etmoney.com/stocks/bharti-airtel-ltd/quote/5012" },
          ],
        },
      ],
    },
  ],
};
