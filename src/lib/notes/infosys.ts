import type { ResearchNote } from "./types";

export const infosysNote: ResearchNote = {
  slug: "infosys",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹1,320", sub: "vs ₹1,175 current" },
    { label: "Implied upside", value: "+12.3%" },
    { label: "Market cap", value: "₹4,86,000 Cr", sub: "≈ 41.4 bn shares" },
    { label: "TTM P/E (actual)", value: "~15.2x", sub: "TTM EPS ~₹79 (FY27E ₹86-90)" },
    { label: "Q1 FY27 revenue", value: "₹48,442 Cr", sub: "+13.6% YoY; ~+3% CC" },
    { label: "Q1 FY27 operating margin", value: "21.1%", sub: "-20 bps YoY; guidance 21-23%" },
    { label: "Q1 FY27 large deal TCV", value: "$1.6 bn", sub: "regulated ~5% YoY digital mix" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (23 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 revenue", value: "₹48,442 Cr", sub: "+13.6% YoY in INR; ~+3.0% CC" },
            { label: "Q1 FY27 PAT", value: "~₹8,004 Cr", sub: "+3.1% YoY; margin 21.1%" },
            { label: "Deal wins (Q1)", value: "$1.6 bn TCV", sub: "mix of financial-services and retail AI/cloud" },
            { label: "FY26 full year", value: "$20.01 bn revenue", sub: "+4.6% YoY constant currency" },
            { label: "Guidance FY27", value: "Revenue +3-5% CC", sub: "margin 21-23%; unchanged band" },
            { label: "Dividend", value: "₹50 total (incl. special)", sub: "yield ~4.3% at current price" },
          ],
        },
        {
          type: "p",
          text:
            "Infosys reported Q1 FY27 on 23 July 2026: revenue of **₹48,442 Cr (+13.6% YoY in INR, ~+3.0% CC)**, operating margin of **21.1% (-20 bps YoY)**, and PAT of **~₹8,004 Cr**. Constant-currency growth remains the key metric the street watches; the ~3% print is the third consecutive quarter inside the 'low-single-digit' recovery band.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "Upgrade to a fuller Buy colour while keeping the target inside consensus. Infosys trades at a discount to TCS (TTM ~15.2x vs ~17.2x) yet carries a similar AI exposure and a large, unchanged capital-returns programme. We set a target of **₹1,320 (~15x FY27E EPS ~₹88, E)** — inside the post-result street band (Morgan Stanley ₹1,250, Citi ₹1,400, consensus avg ~₹1,201) — and we would add on any dip toward ₹1,050-1,100.",
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
            "The consensus debate on Infosys is three-layered: (i) **growth re-acceleration** — can AI/cloud take CC growth from ~4% back to 8-10%, or is +3-5% the 'new structural' band; (ii) **margin ceiling** — management keeps guiding 20-23% and has repeatedly defended ~21% against wage/frontline investments; (iii) **capital returns** — the ₹50 dividend and ongoing buybacks mask an otherwise deeply de-rated multiple.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence"],
          rows: [
            [
              "CC growth ~3-4%",
              "Structural ceiling",
              "AI + large-deal ramp lifts it to 4-6% over 6-12 months",
              "Q1 TCV $1.6 bn; India/agri leaders; strong bookings",
            ],
            [
              "Margin ~21%",
              "At risk of erosion",
              "Guidance band 21-23% is the floor; no overhaul promised",
              "Three quarters of 21%+ with wage increments priced",
            ],
            [
              "AI monetisation",
              "Behind TCS",
              "Comparable: Topaz, 3.0+, agentic practice shipping",
              "AI-driven deals in Q1 TCV; consulting pipeline up",
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
              driver: "1. Large-deal engine and revenue visibility",
              evidence:
                "Q1 FY27 total contract value of ~$1.6 bn, with guided 21-23% margins and a comfortably ≥90% revenue conversion in the books; FY27 guidance +3-5% CC implies continued small sequential CC gains each quarter.",
              consequence:
                "A 4-6% CC revenue environment plus a 21% floor margin feeds ~10-12% EPS CAGR from FX and lower taxes — the base case for a Buy at ~15x.",
              monitor:
                "Quarterly CC growth, TCV/RDQ, deal bookings for 2027, managed-services revival.",
            },
            {
              driver: "2. Margin floor and risk to the guide",
              evidence:
                "Guidance band of 20-23% held for three years; Q1 at 21.1% (-20bps YoY) despite wage increments — pyramid refresh and offshore mix cushioning.",
              consequence:
                "If margin were to print toward 22%, EPS upgrades of 4-6% follow mechanically; hedging/floating the guide is the main downside grip.",
              monitor:
                "Utilisation, subcon %, attrition, RMB/JPY crosses, quarterly margin vs band.",
            },
            {
              driver: "3. Capital allocation and ownership of the story",
              evidence:
                "FY26 paid total dividend ₹50 (incl. special), buyback ongoing; net cash FY26 ~$3.6 bn; guidance for continued returns.",
              consequence:
                "At ~4.3% dividend yield plus buybacks, downside is cushioned; any AI-triggered re-rating to 18x +4.6% mixes upside ~+30%.",
              monitor:
                "Distributed cash, buyback size, FCF-to-earnings conversion.",
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
            "Infosys sits at a two-speed crossing in the IT services cycle: the mature outsourcing/ financial-services base grows low-single digits while the AI-led consulting, cloud and platform book is compounding much faster. Q1 FY27 confirmed both: margins held at 21% despite wage cost, and the large-deal TCV ($1.6 bn) keeps the pipeline funded.",
        },
        {
          type: "p",
          text:
            "The durable point of inflection is the **shift from 'IF4 status quo' to 'AI-ready delivery firm'** — Anthropic/OpenAI/IBM-style partnerships, Topaz-based AI factories and a re-tooled consulting arm. If this rotation re-bases the growth rate to 5-6%, the current valuation is cheap for a cash-flush 40-top firm.",
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
              text: "Expect CC growth toward +4-5%, margin stable at 21%, and a new large AI/cloud deal print; if the guide is raised, the taper to ~12x87 is the buy trigger.",
            },
            {
              lead: "Buyback and dividend actions",
              text: "A declared special dividend or fresh buyback (FY27) adds ~2-3% EPS per annum and tightens the equity float.",
            },
            {
              lead: "AI revenue disclosure",
              text: "A move to disclose AI/cloud run-rate separately (like TCS $2.6bn) would end the 'who is ahead in AI' argument.",
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
          title: "Accumulate (Buy-leaning) — ₹1,320 target",
          text:
            "Infosys offers TCS-like AI exposure and a steeper discount: ~15x TTM with a 21% margin floor, $12bn net cash and a 4.3% dividend. Growth is low now, but each incremental CC point is worth ~₹40-60 Cr of PAT; the sector is at a spending-trough after the FY25-26 pause.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) If CC growth defaults to flat-to-negative for 2-3 straight quarters, re-rating goes the other way toward 13x; (2) AI-led price deflation on large fixed-bid deals; (3) US economy/tech-spend softness into 2027; (4) attrition surprises on the 592k employee base; (5) FX translation risk from CAD/JPY strength.",
        },
      ],
    },
  ],
};