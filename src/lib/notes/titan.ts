import type { ResearchNote } from "./types";

export const titanNote: ResearchNote = {
  slug: "titan",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹5,100", sub: "vs ₹4,905 current" },
    { label: "Implied upside", value: "+4.0%" },
    { label: "Market cap", value: "₹4,35,000 Cr", sub: "≈ 88.8 Cr shares" },
    { label: "FY27E P/E", value: "~71x", sub: "consensus EPS ~₹69 (E)" },
    { label: "FY26 P/E (actual)", value: "~86x", sub: "EPS ₹57.19" },
    { label: "Dividend yield", value: "~0.3%", sub: "DPS ₹15 final (FY26)" },
    { label: "FY26 EBIT margin", value: "10.6%", sub: "ex-bullion; 9.6% in FY25" },
    { label: "Note date", value: "7 Aug 2026", sub: "pre-Q1 FY27 results" },
    { label: "Next catalyst", value: "Q1 FY27 results, 7 Aug 2026" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "FY26 total income (ex-bullion)", value: "₹76,078 Cr", sub: "+33% YoY; reported ₹88,136 Cr incl bullion, +45%" },
            { label: "FY26 PAT", value: "₹5,073 Cr", sub: "+52% YoY; margin 6.7% vs 5.8%" },
            { label: "Q4FY26 PAT", value: "₹1,179 Cr", sub: "+35% YoY; EBIT margin 9.2%" },
            { label: "Q1FY27 business update", value: "+41%", sub: "consumer businesses YoY (6-Jul-26); third straight 40%+ quarter" },
            { label: "Retail network", value: "3,680 stores", sub: "+77 net in Q1FY27; 3,517 domestic" },
            { label: "Promoter holding (Mar-26)", value: "52.9%", sub: "Tata Sons 20.84% + TIDCO 27.88%; zero pledge" },
          ],
        },
        {
          type: "p",
          text:
            "Titan reported FY26 results on 8 May 2026 — a landmark year: total income of **₹76,078 Cr** (excluding bullion and Digi-gold) grew **33% YoY** and PAT of **₹5,073 Cr** grew **52%**, the fastest profit growth in five years. The reported total income including bullion sales was ₹88,136 Cr (+45%). Jewellery — 91.5% of revenue — grew 32% to ₹64,345 Cr with EBIT of ₹7,146 Cr at an 11.1% margin, while Watches delivered a step-change in profitability (EBIT ₹827 Cr, +49%, 16.2% margin).",
        },
        {
          type: "p",
          text:
            "The quarter that matters for the current call is the June one: on 6 July the company's Q1FY27 business update showed **+41% YoY consumer-business growth**, led by jewellery at +39% and international at +128% (Damas consolidated from January 2026). Management's FY30 ambition — a 20% revenue/EBIT CAGR — is intact, and the Street's FY27E EPS of ~₹69 (PL ₹69.1) implies ~21% EPS growth off the FY26 base of ₹57.19.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We maintain Accumulate. FY26 delivered exactly what the platform story promised (52% PAT growth, jewellery EBIT margin steady at ~11% ex-bullion). The stock has re-rated 16% YTD to ~₹4,905, so the gap to the consensus average target (₹5,074, S&P Global / 37 analysts) has narrowed to ~4% — we keep a target of ₹5,100 and let the Q1 FY27 print, due 7 August 2026, set the next leg.",
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
            "The market's Titan debate has three pillars: (i) margins — elevated gold prices push the mix toward plain gold and coins, the studded share fell 300bps YoY to ~31% in Q4FY26, and Damas is margin-dilutive, so street models assume EBIT margin compression; (ii) buyer growth — high gold prices compress jewellery buyer counts (high-single-digit in Q4FY26 after near-flat quarters); and (iii) valuation — ~86x trailing earnings looks stretched for a company growing ~20%.",
        },
        {
          type: "table",
          caption: "Where our view differs from consensus",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Jewellery EBIT margin",
              "Structurally compressing",
              "~11% ex-bullion is a floor, not a ceiling; mix normalises as studded recovers and Damas scales",
              "FY26 EBIT margin 11.1% (+92bps YoY); Q4 dip to 10.0% driven by one-off gold-price disruption",
            ],
            [
              "Gold-price impact",
              "Higher gold = margin and demand risk",
              "Net positive for revenue (ASPs), manageable for demand; buyer growth already recovering",
              "FY26 revenue +33% despite ~40% gold inflation (E); Q1FY27 buyer growth early double-digit",
            ],
            [
              "Valuation",
              "~86x trailing is bubble territory",
              "Fair on 20%+ EPS CAGR; fwd P/E ~71x (FY27E) and ~59x (FY28E) is a quality-growth discount vs historical",
              "PAT CAGR 23% FY25-28E (ICICI); EPS ₹57.19 → ~₹69 FY27E → ~₹83 FY28E (PL)",
            ],
            [
              "Damas / international",
              "Margin-dilutive drag",
              "Option value: 174% Q4 revenue growth, loss narrows as scale builds; gateway to GCC jewellery market",
              "Q4FY26 international income ₹1,081 Cr (+174%); EBIT loss −₹82 Cr in Q4 (vs −₹19 Cr Q4FY25)",
            ],
          ],
        },
        {
          type: "p",
          text:
            "The disagreement is testable every quarter: jewellery EBIT margin (ex-bullion), studded mix, buyer growth, international EBIT, and the Q1FY27 print due today. If jewellery EBIT margins hold ≥10.5% while revenue growth stays in the thirties, the de-rating story is wrong. If margins fall below 10% with buyer growth stalling, the multiple should compress toward 60x forward earnings.",
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
              driver: "1. Formalisation of Indian jewellery — share gain in a ₹10 lakh Cr+ market",
              evidence:
                "Titan's jewellery market share is ~8.5% in a largely unorganised market (PL estimate); management targets ~11% by FY30 through Tanishq, Mia, Zoya, CaratLane and beYon. FY26 jewellery revenue grew 32% to ₹64,345 Cr ex-bullion.",
              consequence:
                "Each 100bps of share gain is ~₹10,000-12,000 Cr of revenue (E). Formalisation is structural — hallmarking, GST and consumer trust in certified gold keep shifting share to organised brands.",
              monitor:
                "Quarterly jewellery growth vs industry; buyer counts; store additions (27 net in Q4FY26: 8 Tanishq + 14 Mia + 5 CaratLane); market-share trackers.",
            },
            {
              driver: "2. Premiumisation across every category",
              evidence:
                "Watches EBIT margin nearly doubled to 16.2% in FY26 (+374bps) on analog-led growth; CaratLane EBIT margin up 158bps to 9.9%; beYon (lab-grown diamonds) launches at ~₹23-25K/carat vs ₹30K+ industry pricing.",
              consequence:
                "Premium mix raises gross margins without price aggression. Watches alone swung EBIT from ₹556 Cr (FY25) to ₹827 Cr (FY26) on +14% revenue — operating leverage at work.",
              monitor:
                "Studded share of jewellery (31% in Q4FY26), CaratLane growth (42% YoY in Q1FY27 update), analog vs smartwatch mix, beYon store rollout (8-10 planned).",
            },
            {
              driver: "3. Network and adjacency expansion — India plus Gulf",
              evidence:
                "3,680 stores at Jun-26 (+77 net in Q1FY27); 436 towns, 4.9 mn sq ft of retail space; Damas Jewellery (67% stake, Dubai) added 127 stores and consolidated from Q4FY26; Taneira, Skinn, IRTH and TEAL (aerospace) broaden the platform.",
              consequence:
                "The store engine compounds same-store growth with expansion while 5-6% annual store growth adds capacity. International becomes a second growth line (FY26: ₹3,434 Cr, +93%).",
              monitor:
                "Net store additions, retail area, international revenue and EBIT breakeven, CaratLane store count, TEAL order book.",
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
            "Titan crossed a financial inflection in FY26: the ₹50,000 Cr annual-revenue milestone fell in FY25 after ~40 years, and the next ₹25,000 Cr came in a single year. Ex-bullion income rose from ₹57,339 Cr (FY25) to ₹76,078 Cr (FY26), PAT from ₹3,337 Cr to ₹5,073 Cr, and EBIT margin expanded 105bps to 10.6% — growth and margin expansion together, for the first time since the FY23-24 gold-price shock.",
        },
        {
          type: "p",
          text:
            "The strategic inflection is the **Damas acquisition**: a 67% controlling stake in the Gulf's established jeweller (Dubai-based, ~127 stores) consolidated from Q4FY26. It gives Titan a real international jewellery business (FY26 international income ₹3,434 Cr, +93%) rather than an export business, and a beachhead in a gold-rich, under-organised GCC market. Q1FY27 international grew 128% YoY. The margin dilution is real (international EBIT −₹88 Cr in FY26) but bounded, and scale is compounding quickly.",
        },
        {
          type: "p",
          text:
            "Management change completes the picture: **Ajoy Chawla** took over as MD & CEO in January 2026 (previously CFO) and Dr. S. Vijayakumar became non-executive Chairman in June 2026. Guidance is ambitious — 20% revenue/EBIT CAGR FY26-30 — and the FY26 print gives it credibility.",
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
              lead: "Q1 FY27 results — 7 Aug 2026",
              text:
                "Third straight 40%+ growth quarter is guided; the market will focus on jewellery EBIT margin (Q4 was 10.0% ex-bullion) and whether the studded mix recovers from ~31%.",
            },
            {
              lead: "Festive season H2 FY27",
              text:
                "Diwali is the single largest jewellery demand window; the Akshaya Tritiya Q1 performance (+39% jewellery) sets up a strong H1 base.",
            },
            {
              lead: "Damas and international scaling",
              text:
                "International revenue roughly doubled (Q1FY27 +128%); watch for EBIT breakeven in the GCC business — a positive margin surprise is the biggest upgrade risk to consensus.",
            },
            {
              lead: "beYon (lab-grown diamonds) rollout",
              text:
                "8-10 stores in Mumbai/Delhi planned; if LGD trust builds under the Tanishq umbrella, it reopens the studded-mix growth channel with better margins.",
            },
            {
              lead: "Watches / eyecare margin accretion",
              text:
                "Watches EBIT margin at 16.2% (FY26) with analog-led growth; eyecare grew 17.5% in Q4FY26. Both are margin-accretive mix lines.",
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
            "India's most trusted discretionary brand compounding at ~20% EPS growth with a fortress balance sheet — buy for the five-year platform, not for the next quarter.",
        },
        {
          type: "callout",
          tone: "info",
          title: "What we are buying",
          text:
            "A ~21% FY26-28E EPS CAGR (ICICI: revenue/PAT CAGR 18%/23% FY25-28E) driven by jewellery formalisation, premiumisation, network growth and the GCC expansion — at ~71x FY27E earnings, a premium justified by brand trust, an 11% ex-bullion jewellery EBIT margin and an AAA-rated balance sheet.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "What we are paying for",
          text:
            "Gold-price volatility is the recurring risk: a sharp gold spike compresses buyer counts and the studded mix, as seen in Q1FY26. Our valuation assumes margins hold near ~10-11% ex-bullion — if gold disrupts demand again (2024-25 style), FY27E EPS risk is ~10-12% and the multiple has room to de-rate.",
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
            { label: "Founded", value: "1984", sub: "Tata Group (20.84%) + TIDCO (27.88%) joint venture" },
            { label: "FY26 total income", value: "₹76,078 Cr", sub: "ex-bullion & Digi-gold; reported ₹88,136 Cr" },
            { label: "FY26 PAT / margin", value: "₹5,073 Cr / 6.7%", sub: "5.8% in FY25" },
            { label: "Retail network", value: "3,680 stores", sub: "436 towns; 4.9 mn sq ft (Mar-26)" },
            { label: "Jewellery share", value: "91.5% of revenue", sub: "Tanishq, Mia, Zoya, CaratLane, beYon, Damas" },
            { label: "Watches share", value: "~7% of revenue", sub: "Titan, Fastrack, Sonata, Helios, Xylys, Favre-Leuba" },
            { label: "Other businesses", value: "EyeCare, Taneira, Skinn, IRTH, TEAL", sub: "TEAL: aerospace & precision engineering" },
            { label: "Ratings", value: "CARE AAA / Stable", sub: "4 May 2026" },
          ],
        },
        {
          type: "p",
          text:
            "Titan is India's largest organised jewellery retailer and the fifth-largest integrated watch manufacturer in the world. The business is a trust arbitrage: in a market where consumers fear adulteration, Tanishq's certification, karat guarantee and transparent exchange programme command share. The same trust engine powers CaratLane (digital-first, 22% growth in Q4FY26) and now beYon in lab-grown diamonds.",
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
            "Titan manufactures (or sources) and retails through its own store network — a vertically integrated, brand-owning model. Jewellery revenue is a function of gold grammage x price, so rising gold prices flow through revenue; profitability depends on the studded-plain mix (studded carries materially higher margins, currently ~31% of jewellery sales) and on operating leverage across a fixed store base.",
        },
        {
          type: "kv",
          items: [
            { label: "Revenue driver", value: "Store network + gold prices", sub: "Jewellery; buyer count is the volume driver" },
            { label: "Margin engine", value: "Studded/plain mix + watches", sub: "Studded ~31%; watches EBIT margin 16.2%" },
            { label: "Capital", value: "Inventory-heavy, asset-backed", sub: "gold inventory is liquid; low debt" },
            { label: "Distribution", value: "Own stores + e-commerce", sub: "CaratLane (digital-first), Titan World, Eye+" },
            { label: "Growth vector", value: "Store additions + adjacencies", sub: "+77 net stores in Q1FY27; Damas in GCC" },
            { label: "Moats", value: "Brand trust, certification, scale", sub: "exchange program; premium LGD positioning" },
          ],
        },
        {
          type: "p",
          text:
            "The key model subtlety: buyers are capped by gold-price affordability, so Titan's growth comes from (i) increasing share of a formalising market, (ii) raising ticket sizes via premiumisation, and (iii) adding stores and categories. Margins are protected by the studded/high-grossing mix and by the operating leverage of a scaled network — this is why EBIT growth (FY26 +47%) outruns revenue growth (+33%).",
        },
      ],
    },
    {
      id: "revenue-breakdown",
      label: "Revenue breakdown",
      blocks: [
        {
          type: "table",
          caption: "Segment income, fiscal years ended 31 March (₹ Cr; ex-bullion & Digi-gold)",
          cols: ["Segment", "FY25", "FY26", "YoY"],
          rows: [
            ["Jewellery (domestic)", "48,722", "64,345", "+32%"],
            ["Watches", "4,465", "5,105", "+14%"],
            ["EyeCare", "791", "898", "+14%"],
            ["Emerging businesses (Taneira, Skinn, IRTH)", "406", "508", "+25%"],
            ["International (incl Damas)", "1,784", "3,434", "+93%"],
            ["Other / corporate", "301", "290 (E)", "−4%"],
            ["Total ex-bullion", "57,339", "76,078", "+33%"],
          ],
        },
        {
          type: "small",
          text:
            "*Bullion & Digi-Gold sales excluded from all rows for comparability (₹3,603 Cr FY25 → ₹12,058 Cr FY26, +235% YoY). Reported consolidated total income incl bullion: FY25 ₹60,942 Cr, FY26 ₹88,136 Cr (+45%). Figures rounded; FY26 includes Damas consolidation from January 2026.",
        },
        {
          type: "p",
          text:
            "Jewellery dominance is the defining feature — **91.5% of FY26 revenue** comes from a single category. That is a concentration risk but also the source of the compounding: gold demand in India is ~₹10 lakh Cr+ annually, formalisation is one-way traffic, and Titan keeps taking share. Watches (~7%) and eyecare (~1%) are margin-accretive de-risking lines that flatter the group multiple.",
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
            { label: "India", value: "~95% (E)", sub: "domestic businesses; 3,517 domestic stores" },
            { label: "International", value: "~5% (E)", sub: "₹3,434 Cr FY26 (incl Damas Dubai); +93% YoY" },
            { label: "Overseas network", value: "~163 stores", sub: "GCC / Middle East focus; Damas 127 stores" },
            { label: "Target market", value: "Rural-to-metro India", sub: "Tanishq → Mia → Zoya; 436 towns" },
          ],
        },
        {
          type: "p",
          text:
            "The geographic story is two-speed: domestic India is a trust-led share-gain story in a formalising jewellery market, while the GCC (via Damas, consolidated from Q4FY26) is the new growth frontier — international income grew 61% in FY26 and ~128% in Q1FY27. Margins differ sharply: domestic jewellery EBIT ~11% vs international loss-making (~−₹82 Cr Q4FY26, E), so mix drag is a quarterly watch item.",
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
              title: "Jewellery — Tanishq, Mia, Zoya, CaratLane, beYon, Damas (91.5% of revenue)",
              body:
                "FY26 income ₹64,345 Cr (+32%), EBIT ₹7,146 Cr at 11.1% margin (+92bps). Domestic business grew 46% in Q4 (Tanishq/Mia/Zoya +48%, CaratLane +22%). Studded mix ~31%. Store adds: 27 net in Q4 (8 Tanishq, 14 Mia, 5 CaratLane). The share-gain engine of the group.",
            },
            {
              title: "Watches & wearables (Titan, Fastrack, Sonata, Helios, Xylys)",
              body:
                "FY26 income ₹5,105 Cr (+14%), EBIT ₹827 Cr at 16.2% margin (+374bps). Analog-led growth; premiumisation via Titan and International brands. Smartwatches declined ~50% in Q4 (deliberate de-emphasis).",
            },
            {
              title: "EyeCare (Titan Eye+)",
              body:
                "FY26 income ₹898 Cr (+14%), EBIT ₹81 Cr at 9.0% margin. Q4 revenue +17.5%, led by International Brands and price realisation. Network optimisation: 12 new, 32 closed, 37 refurbished in Q4.",
            },
            {
              title: "Emerging businesses & TEAL",
              body:
                "Taneira, Skinn, IRTH and fragrances: ~₹508 Cr FY26 (+25%). TEAL (aerospace & precision engineering): FY26 ₹1,499 Cr (+72%), EBIT ₹287 Cr at 19.1% margin. Damas (GCC) runs within jewellery.",
            },
          ],
        },
        {
          type: "p",
          text:
            "Segments compound heterogeneously but consistently: higher-margin non-jewellery lines (watches 16.2%, TEAL 19.1%) are growing double-digit, broadening the mix beyond the jewellery concentration. The Damas international business is the highest-variance line — a possible re-rating catalyst if it turns profitable.",
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
            { label: "CEO / MD", value: "Ajoy Chawla (since Jan 2026)", sub: "previously CFO; internal promotion" },
            { label: "Chairman", value: "Dr. S. Vijayakumar (June 2026)", sub: "TIDCO nominee; replaced Dr. V. V. Raghunathan" },
            { label: "Track record", value: "FY23-26 revenue CAGR ~17%", sub: "incl. FY26 +33% ex-bullion" },
            { label: "Capital discipline", value: "AAA / Stable (CARE)", sub: "net cash; no equity raised since IPO" },
            { label: "Governance", value: "Tata + TIDCO promoters (52.9%)", sub: "zero promoter pledge; independent board" },
          ],
        },
        {
          type: "p",
          text:
            "Management has shifted from a store-build era (FY23-24) to a profit-led platform era: FY24-26 PAT grew ~28% a year on the back of margin discipline, premiumisation and the Damas acquisition. Chief among successes is the Watches margin surge (EBIT margin from ~12.5% to 16.2% in a year) and the disciplined smartwatch withdrawal. The FY30 guidance of 20% revenue/EBIT CAGR is a live, checkable commitment.",
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
            "India's jewellery & watches industry is a ~₹6-7 lakh Cr (gold + non-gold) domestic market growing at low-double-digits, structurally in transition: (i) hallmarking and BIS regulation push out counterfeits; (ii) GST and digitisation shift purchasing to organised players; (iii) gold as an asset class sustains ASP upside; (iv) real income growth and weddings drive buyer counts; (v) offline trust retains the premium end for organised brands.",
        },
        {
          type: "p",
          text:
            "Three industry forces press Titan: gold-price inflation (~40% YoY in FY26, E) which inflates revenue but pressures the mix; import duties on gold raised most recently in Aug-24; and aggressive regional competition (Kalyan Jewellers, Malabar, PC Jeweller) expanding branded organised share. Titan's answer is to lead premiumisation, hold the trust slot, and convert gold inflation into ASP growth rather than margin compression.",
        },
      ],
    },
    {
      id: "competitive-positioning",
      label: "Competitive positioning",
      blocks: [
        {
          type: "table",
          caption: "Organised jewellery competitive map (FY26 basis; E = our assessment)",
          cols: ["Player", "Scale (FY26, E)", "EBIT margin (E)", "Growth vector", "Positioning"],
          rows: [
            ["Titan (Tanishq et al.)", "₹64,345 Cr", "~11.1%", "Trust + premiumisation + GCC", "National premium leader"],
            ["Kalyan Jewellers", "~₹25,000 Cr", "~10-11% (E)", "Unorganised-to-organised shift", "Mid-market, aspirational"],
            ["PC Jeweller", "~₹9,000 Cr", "~4-6%", "Price-conscious, turnaround", "Value segment"],
            ["Joyalukkas / others", "~₹5-8,000 Cr", "~4-7%", "Regional expansion", "Regional, organised"],
            ["CaratLane (Titan-owned)", "~₹4,700 Cr", "~10-11%", "Digital-first bridal", "Younger, tech-led"],
          ],
        },
        {
          type: "p",
          text:
            "India's organised jewellery market is still fragmented despite consolidation: the top organised players collectively serve well under half of the ~45-50% organised share (E), and regional brands remain strong. Titan's over-riding advantage is the bundling of **trust, network (3,680 stores), and scale economics** — competitors match one, rarely all three.",
        },
      ],
    },
    {
      id: "shareholding-pattern",
      label: "Shareholding pattern",
      blocks: [
        {
          type: "table",
          caption: "Ownership composition, % of equity (quarterly shareholding disclosures)",
          cols: ["Class", "Mar-25", "Jun-25", "Sep-25", "Dec-25", "Mar-26"],
          rows: [
            ["Promoter & group", "52.9%", "52.9%", "52.9%", "52.9%", "52.9%"],
            ["FII / FPI", "18.1%", "17.4%", "16.8%", "15.6%", "~15.4%"],
            ["DII (incl MF)", "15.3%", "15.0%", "15.0% (E)", "15.0%", "~15.0%"],
            ["MF alone", "9.24%", "8.68%", "8.72%", "8.46%", "8.45%"],
            ["General public", "14.2%", "14.5%", "14.9%", "14.5%", "~14.5%"],
          ],
        },
        {
          type: "p",
          text:
            "The register tells a quiet-quality story: **promoter holding is rock-stable at 52.9%** — TIDCO 27.88%, Tata Sons 20.84%, Tata Investment Corp 2.01% — with **zero pledge**. Foreign holding drifted from ~18% to ~15.4% over the year; domestic institutions (MF ~8.45%) and retail (~14.5%) absorbed the flows. The 4.9 mn sq ft network and 3,680 stores are assets no competitor can replicate quickly.",
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
            ["Total income (reported, incl bullion)", "33,296", "36,361", "47,501", "60,942", "88,136"],
            ["Total income (ex-bullion & Digi-gold)", "~30,000 (E)", "~33,500 (E)", "~43,900 (E)", "57,339", "76,078"],
            ["EBIT (ex-bullion)", "~3,200 (E)", "~3,000 (E)", "~4,300 (E)", "5,488", "8,082"],
            ["EBIT margin", "~10.6% (E)", "~9.0% (E)", "~9.8% (E)", "9.6%", "10.6%"],
            ["PAT", "2,173", "2,714", "3,078", "3,337", "5,073"],
            ["PAT margin", "6.5%", "7.5%", "6.5%", "5.5%", "5.8%"],
            ["EPS (₹, ~88.8 cr shares)", "24.5 (E)", "30.6 (E)", "34.7 (E)", "37.62", "57.19"],
          ],
        },
        {
          type: "small",
          text:
            "FY22-24 ex-bullion figures are our estimates (E) derived from reported total income and company disclosures; FY25-26 are as reported. FY26 includes Damas consolidation. PAT margins computed on ex-bullion income. EPS based on ~88.5-88.8 Cr shares before and after buybacks; management guidance implies ~20% revenue CAGR FY26-30.",
        },
        {
          type: "p",
          text:
            "The five-year record is a textbook compounding story: reported income more than doubled from ₹33,296 Cr (FY22) to ₹88,136 Cr (FY26) while PAT grew from ₹2,173 Cr to ₹5,073 Cr — and the last two years show the operating-leverage kick (PAT CAGR FY24-26 ~28% vs revenue ~36%, E). The most instructive number: an EBIT margin of 10.6% ex-bullion at a time gold inflation is at cycle highs says the model converts scale into margins rather than giving it all away.",
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
            ["Total income reported (₹ Cr)", "88,136", "~100,000", "~1,15,000"],
            ["Ex-bullion income (₹ Cr)", "76,078", "~90,500", "~1,07,000"],
            ["EBIT margin (ex-bullion)", "10.6%", "~10.8%", "~11.0%"],
            ["PAT (₹ Cr)", "5,073", "~6,100", "~7,300"],
            ["PAT growth", "+52%", "~20%", "~20%"],
            ["EPS (₹)", "57.19", "~69", "~82"],
          ],
        },
        {
          type: "p",
          text:
            "Our build tracks management's FY30 guidance (20% revenue/EBIT CAGR) through FY27 with jewellery growing ~15-20%, watches/eyecare mid-teens, and international ₹3,000-4,000 Cr. We model jewellery EBIT margin ~11% ex-bullion (flat vs FY26) — the premiumisation/studded-mix offset is balanced by gold-mix drag. CaratLane (~₹4,700 Cr FY26 at ~10% EBITDA margin) and TEAL (~₹1,500 Cr, 19% EBIT) are the standalone-upside candidates.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key estimate risks",
          text:
            "The forecasts embed a stable-gold-price world. Every ~10% gold-price increment that feeds through to jewellery ASPs with buyer growth flat adds ~9% to revenue but erodes mix quality; our EBIT-margin floor of 10% (ex-bullion) fails if gold outruns imports or studded mix slips below 28%.",
        },
      ],
    },
    {
      id: "consensus",
      label: "Consensus & revisions",
      blocks: [
        {
          type: "table",
          caption: "Street view (S&P Global / stockanalysis.com, 37 analysts, Jul 2026)",
          cols: ["Measure", "Value"],
          rows: [
            ["Average target price", "₹5,074"],
            ["Target range", "₹4,250 to ₹5,800"],
            ["Consensus rating", "Buy (17 Strong Buy / 12 Buy / 4 Hold / 3 Sell)"],
            ["Current price (7 Aug 2026)", "₹4,905"],
            ["Implied upside to consensus", "+4.6%"],
          ],
        },
        {
          type: "list",
          items: [
            {
              lead: "The street is constructive but not euphoric",
              text:
                "Recent published moves: Kotak upgraded Titan to Add (FV ₹4,725) on improved execution and margin resilience; Prabhudas Lilladher BUY at ₹5,161 (SOTP: CaratLane ₹225/sh + TEAL ₹154/sh); ICICI Direct Buy at ₹4,980; Motilal Oswal Buy ₹5,000; BOB Capital Hold ₹4,626 (15-May-26); Geojit Hold ₹4,444 (13-Mar-26). Kotak's upgrade to Add is the recent spectrum shift.",
            },
            {
              lead: "Where we sit",
              text:
                "Our ₹5,100 target is ~ ₹25 above the street average and sits at the median of published targets. We are constructive on the 5-year platform (FY30 CAGR + Damas) but respect that the stock now trades in line with fair value until Q1 delivers a margin surprise.",
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
            "We value Titan on a forward P/E anchored to consensus-consistent FY27E EPS, cross-checked with momentum/mix. At ₹4,905 the stock trades at ~86x FY26 EPS of ₹57.19 and ~71x our FY27E of ~₹69 — a premium that has persisted for the quality-growth profile, tightened by the 16% YTD re-rating.",
        },
        {
          type: "table",
          caption: "Target price derivation (on our estimates)",
          cols: ["Step", "Parameter", "Value"],
          rows: [
            ["1", "FY27E EPS", "₹69 (E)"],
            ["2", "FY28E EPS", "₹82 (E)"],
            ["3", "Target multiple", "~74x FY27E / ~62x FY28E"],
            ["4", "Target price", "₹69 × 74 ≈ ₹5,106 → ₹5,100"],
            ["5", "Upside to current price (₹4,905)", "+4.0%"],
          ],
        },
        {
          type: "p",
          text:
            "**Multiple justification.** ~74x FY27E (vs ~20% EPS CAGR) is a quality-growth premium — the price of owning India's best discretionary consumption compounder. We justify the multiple by (i) the jewellery formalisation tailwind, (ii) GCC expansion upside via Damas, (iii) EBIT margin of 10.6% at cycle-high gold inflation showing pricing power, and (iv) an AAA-rated, near-zero-debt balance sheet. The haircut from the stock's 86x trailing print is deliberate: gold-mix drag and the Q4 studded-mix slide are real.",
        },
        {
          type: "table",
          caption: "Sensitivity — target price vs multiple and FY27E EPS",
          cols: ["Multiple / EPS", "₹64 (bear)", "₹69 (base)", "₹74 (bull)"],
          rows: [
            ["70x FY27E", "₹4,480", "₹4,830", "₹5,180"],
            ["74x FY27E", "₹4,736", "₹5,106", "₹5,476"],
            ["78x FY27E", "₹4,992", "₹5,382", "₹5,772"],
          ],
        },
        {
          type: "p",
          text:
            "Our base multiple of ~74x on FY27E EPS maps to ~62x on FY28E — consistent with how the stock has historically traded (~66x three-year average forward P/E, E). In the bear case (FY27E EPS ₹64 at 70x) fair value is ₹4,480, ~9% below the current price; in the bull case (Damas profits, FY27E EPS ₹74 at 78x) fair value is ₹5,772, ~18% above. The current price already embeds a lot of the good news — risk-reward is balanced until the Q1 print (7 Aug) confirms margins.",
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
              risk: "Gold-price volatility / import-duty hikes",
              probability: "High",
              financial: "A gold spike compresses buyer counts and shifts mix to plain gold/coins; FY27E revenue off ~5-8%, EBIT margin risk ~100-150bps.",
              valuation: "Multiple de-rates toward 60x fwd as the growth story is questioned; fair value near ₹4,200-4,400.",
              indicator: "MCX gold price, import-duty commentary, quarterly buyer counts and studded mix.",
              mitigation: "Business converts ASP inflation to revenue; exchange programmes cushion demand; mix management.",
              kpi: "Buyer growth ≥ high-single-digit; studded mix ≥ 28%.",
            },
            {
              risk: "Studded-mix erosion / margin compression",
              probability: "Medium",
              financial: "Studded share fell to ~31% (Q4FY26); if it holds below 28%, jewellery EBIT margin slips below 10.5% and group EBIT falls ~5%.",
              valuation: "Growth-multiple theory breaks; fair value compresses to ~₹4,500 as ~10% margins price in.",
              indicator: "Quarterly studded share, jewellery EBIT margin (ex-bullion), CaratLane mix, beYon ramp.",
              mitigation: "beYon/LGD, CaratLane bridal, premiumisation; studded-mix recovery is core to the thesis.",
              kpi: "Jewellery EBIT margin ≥ 10.5% ex-bullion; studded share ≥ 30%.",
            },
            {
              risk: "Damas integration / international losses",
              probability: "Medium",
              financial: "International EBIT loss ~₹88 Cr FY26; if the GCC business does not reach breakeven by FY27E, consolidation drag continues (~₹100 Cr/yr, E).",
              valuation: "Valuation drag on the group multiple; consensus SOTP reassessments downgrade international line.",
              indicator: "International revenue growth, EBIT trajectory, Damas store adds, GCC macro/consumer.",
              mitigation: "Scale is compounding (127 stores, +128% in Q1FY27); management compounds via Damas brand, not subsidies.",
              kpi: "International EBIT breakeven by FY27; revenue growth > 30%.",
            },
            {
              risk: "Buyer-count stagnation in a pricey-gold world",
              probability: "Medium",
              financial: "Buyer counts were high-single-digit in Q4FY26; if they stall, revenue growth falls to mid-teens even with ASP growth.",
              valuation: "Multiple contraction risk; growth halves and premium valuation looks one-way earnings-based.",
              indicator: "Quarterly buyer counts, wedding-season demand, store LFL.",
              mitigation: "Store additions and exchange schemes, entry price points (Mia), wedding-led demand.",
              kpi: "Buyer growth ≥ 6% in festival quarters.",
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
              label: "Q1FY27 quarterly update (6 Jul 2026)",
              url: "https://www.bseindia.com/xml-data/corpfiling/AttachHis/864579ea-6da4-4c5a-888e-38892550b592.pdf",
              note: "+41% consumer-business growth, 3,680 stores",
            },
            {
              label: "Q4FY26 financial press release",
              url: "https://www.titancompany.in/sites/default/files/2026-05/SEoutcomeBMQ4202526.pdf",
              note: "Q4 FY26 income ₹20,300 Cr, PAT ₹1,179 Cr (+35%)",
            },
            {
              label: "Q4FY26 earnings presentation",
              url: "https://www.titancompany.in/sites/default/files/2026-05/Q4FY26%20Earnings%20Presentation%20-%20Uploaded.pdf",
              note: "FY26 segments, EBIT margins, jewellery mix",
            },
            {
              label: "Shareholding pattern",
              url: "https://www.titancompany.in/investors/shareholding-pattern",
              note: "Promoter 52.9%, zero pledge",
            },
            {
              label: "Consensus & valuation data",
              url: "https://stockanalysis.com/quote/bom/500114/forecast/",
              note: "37 analysts, avg target ₹5,074",
            },
            {
              label: "Analyst revisit (Kotak Add / PL BUY)",
              url: "https://www.kotakneo.com/uploads/Rating_Monitor_Titan_15_May_2026_dd187dbc8f.pdf",
              note: "Kotak Add FV ₹4,725; PL TP ₹5,161",
            },
          ],
        },
      ],
    },
  ],
};
