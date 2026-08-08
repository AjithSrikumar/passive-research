import type { ResearchNote } from "./types";

export const hclTechNote: ResearchNote = {
  slug: "hcl-technologies",
  header: [
    { label: "Rating", value: "Accumulate" },
    { label: "Target price", value: "₹1,500", sub: "vs ₹1,356.6 current" },
    { label: "Implied upside", value: "+10.6%" },
    { label: "Market cap", value: "₹3,68,000 Cr", sub: "≈ 27.1 bn shares" },
    { label: "TTM P/E (actual)", value: "~20x", sub: "FY26 EPS ~₹67.7; FY27E ~₹73 (E)" },
    { label: "Q1 FY27 revenue", value: "₹34,579 Cr (+13.9% YoY)", sub: "+3% CC; guided FY27 +9-11%" },
    { label: "Q1 FY27 operating margin", value: "21.4%", sub: "+10 bps YoY; guided 19-20%" },
    { label: "Q1 FY27 PAT", value: "₹4,626 Cr", sub: "+20.3% YoY" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (13 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 revenue", value: "₹34,594 Cr", sub: "+13.9% YoY; +3.0% CC; guided FY27 +9-11%" },
            { label: "Q1 FY27 operating margin", value: "21.4%", sub: "+10 bps YoY; ~100 bps above guidance band" },
            { label: "Q1 FY27 deal TCV", value: "$2.3 bn", sub: "~10 deals >$20 mn each; pipeline healthy" },
            { label: "FY26 actuals", value: "₹130,634 Cr revenue", sub: "+11.2% YoY; PAT ₹18,361 Cr" },
            { label: "FY27 guidance", value: "Rev +9-11% CC", sub: "EBIT margin 19-20%; unchanged" },
            { label: "Dividend", value: "₹60 total (incl. special)", sub: "yield ~4.4% at current P" },
          ],
        },
        {
          type: "p",
          text:
            "HCLTech reported Q1 FY27 on 13 July 2026: revenue of **₹34,594 Cr (+13.9% YoY INR; ~+3% CC)**, operating margin **21.4% (+10 bps YoY)** — above the guided band — and PAT of **₹4,626 Cr (+20.3% YoY)**. The share has de-rated to ~20x trailing despite a twice-raised outlook, as software/product growth normalised and the market questions the FY26-27 growth guide.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "Keep a moderate Accumulate. The margin beat is real but growth is tracking the low end of guidance. We set target **₹1,500 (~20.5x FY27E EPS ~₹73, E)** — between street avg (~₹1,268) and the likes of Morgan Stanley (₹1,400). The strongest risk-adjusted entry is nearer ₹1,250-1,280, i.e. ~18.5x FY27E.",
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
            "HCLTech is the 'differentiated' IT major: software products (HCLSoftware) ride the cycle differently from services; engineering/R&D services (ERS) carry IP; and the Americas' mix gives tailwind. The market argues: (i) the services book cannot sustain +15% credit growth; (ii) products are not a moat; (iii) payoff multiple is rich vs TCS.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence"],
          rows: [
            [
              "Software products growth",
              "Low-single digit, not growth",
              "A platform of upskilling: ERP/CRM/HCM/ITSM recurring ~11-13%",
              "Software segment ~₹6-7k Cr/yr; 11+ products in cloud",
            ],
            [
              "Growth vs guide",
              "Lower end held",
              "+3% CC is the real run-rate; guide raises depend on large-deal string",
              "TCV $2.3 bn; but 0.14% conversion lag",
            ],
            [
              "Margin 21.4%",
              "Band 19-20%",
              "Band is conservatism; quality beats on software",
              "Q1 21.2% vs 19-20% guide; mix helps",
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
              driver: "1. Software/engineering IP premium",
              evidence:
                "HCLSoftware (ACT/Actian, BigFix, DRYiCE, VERINT assets) ~₹9,300 Cr/yr revenue; engineering & R&D (ERS) makes ~20% of services; DWS-sequenced cash etc.",
              consequence:
                "An IP-rich mix shields margins vs pure labour; small re-rating toward ITeer 'product+services'.",
              monitor: "Software license annuity, ERS deal momentum, platform adoption.",
            },
            {
              driver: "2. Cash returns and balance-sheet strength",
              evidence:
                "FY26 interim dividend ₹60 (yield ~4.4%), consistent buyback, zero-debt; FCF conversion 90%+.",
              consequence:
                "Even at ~20x P/E the total-return floor is ~9-10%/yr. Multiple reduces downside.",
              monitor:
                "Interim/dividend steps, buyback sizes, FCF margin, capex discipline.",
            },
            {
              driver: "3. US/EU macro re-rating tailwind",
              evidence:
                "60%+ of revenue from Americas; demand for cross-border post-2026 reshoring enterprise deals is still accelerating.",
              consequence:
                "If the guide (rev +9-11%) is met with FX at current, EPS ~₹73-75 supports ₹1,500 target.",
              monitor:
                "Americas growth, large-deal conversion, macro enterprise-spend surveys.",
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
            "HCLTech is mid-cycle in its earnings story: the FY24-26 period re-based guides lower (rev +15% → +9-11%) while delivering margin outperformance. The inflection to watch is software-modernisation + generative-AI adoption pulling ERS (engineering) work earlier in client cycles.",
        },
        {
          type: "p",
          text:
            "The company's stated move is 'digital foundation for everything' (Digital Foundation/Digital Business Development units). If that re-bases revenue growth meaningfully above ~10% with 19-20% margins held, the current multiple under-rewards it.",
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
              lead: "Q2 FY27 (Oct 2026)",
              text: "Watch CC growth toward the top of guide, EBIT margin ≥21%, and deal-signed TCV breakthrough; a dividend increase lands me daily.",
            },
            {
              lead: "Software-vs-services detail",
              text: "A clearer disclosure of HiroSoftware growth (11-40% actually) would challenge the de-rating.",
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
          title: "Accumulate — ₹1,500 target",
          text:
            "HCLTech is a quality-engineering IT major with a genuine software book, under an upgrade-risk-to-margin story. At ~20x TTM with a 4.4% yield, it's not a bargain, but growth and margin guide both lean above where the stock currently prices (~3-4% growth, 19% margin).",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Software segment stagnation; (2) USD/INR outperformance crediting from rival FX; (3) large-deal slip pushes CC <3% for half a year; (4) wage war in engineering; (5) cyber and IP litigations are a tail event on the software business.",
        },
      ],
    },
  ],
};