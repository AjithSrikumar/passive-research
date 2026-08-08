import type { ResearchNote } from "./types";

export const tatamotorsNote: ResearchNote = {
  slug: "tata-motors",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹420", sub: "vs ₹345.9 current (TMPV)" },
    { label: "Implied upside", value: "+21.4%" },
    { label: "Market cap", value: "₹1,27,000 Cr", sub: "TMPV (private equity listing)" },
    { label: "TTM P/E (actual)", value: "~1.5x (one-off)", sub: "FY27E P/E ~10x pulled" },
    { label: "Q1 FY27 units", value: "108,488", sub: "+27% YoY (group)" },
    { label: "JLR FY26 revenue", value: "£31-32 bn", sub: "+~13% YoY" },
    { label: "Dividend", value: "₹3.00", sub: "post-demerger base" },
    { label: "Note date", value: "7 Aug 2026", sub: "post-demerger TMPV; CV entity separate" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Demerger structure", value: "TMPV + Tata Motors CV listed", sub: "PV+EV+JLR tracked under TMPV (Nov 2025)" },
            { label: "Q1 FY27 PV+CV units", value: "108,488", sub: "+27% YoY across listings" },
            { label: "JLR revenue FY26", value: "₹31-32bn", sub: "+12-13% YoY; order book strong" },
            { label: "ET/PV maker", value: "EV at Tata EV", sub: "independent EV Co listing plan" },
            { label: "National BS", value: "Nexon/Punch/Harrier", sub: "EV + ICE platform mix" },
            { label: "Dividend", value: "₹3.00", sub: "first ever payout post-demerger" },
          ],
        },
        {
          type: "p",
          text:
            "Post the November 2025 demerger, Tata Motors operated as **Tata Motors Passenger Vehicles (TMPV)** — the PV + EV + JLR unit — plus a separately listed CV entity (Tata Motors Commercial Vehicles). The key listed proxy now trades at ~₹345.9 with an mcap of ~₹1.27 lakh Cr; the FY26 group figures have been re-cast across the two listings.",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We rate **Buy** on the cleanly-separated passenger + JLR story: the demerger removes CV cyclicality, and with JLR delivered a strong FY26 (~+13% YoY revenue) the group story becomes more investable. Target **₹420** (~8-9x FY27E EPS of the operating entity — a fair PB for PV+JLR).",
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
            "The debates: (i) **post-demerger clarity** — investors now judge JLR+PV and CV separately, with TMPV as the growth-and-margin story; (ii) **JLR** — Range Rover / Defender order flow and pricing retention vs EV transition; (iii) **EV scale** — Tata's Nexon/EV lineup vs market share heat from Mahindra and Maruti.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Demerger structure",
              "Confusing",
              "Cleaner per-unit P/E",
              "TMPV & CV separately carrier",
            ],
            [
              "JLR demand",
              "Peaking",
              "Range Rover order bank robust; China up",
              "FY26 revenue +13%.",
            ],
            [
              "EV share",
              "Eroding",
              "Retains #1 through e‑Punch/SUV",
              "TMPV + Gujarat; Nexon/Punch lead India",
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
              driver: "1. PV+EV leadership with clean product action",
              evidence: "Tata PV + EV in top-3; e‑Nexon, e‑Punch & Harrier sold 50k+ units annualized; strong JD/EM posures.",
              consequence:
                "PV volume growth ~12-18% with SUV/EV mix supports revenue compound; after the CV demerger, TMPV is a cleaner compounding story.",
              monitor: "PV volumes, EV share, JLR ASP & inventory, RXP/plaw.",
            },
            {
              driver: "2. JLR premium stability & EV franchises (Tata EV)",
              evidence:
                "Range Rover/RR Sport/Rr Evoque at TMPV; JLR FY26 revenue ~₹31-32bn (+~13%), orderbook strong; EV Ramadasdaq program.",
              consequence:
                "JLR generates most of the group's full gross profit — its stable demand underpins quality earnings.",
              monitor: "JLR wholesale, price, BEVs (RR/RRC electric), China demand.",
            },
            {
              driver: "3. Structure & capital returns",
              evidence:
                "Separate listings; dividend initiated (₹3); TMPV trades at a ~8x FY27E P/E; Debtz to JLR mostly spun-off.",
              consequence:
                "A simpler balance-sheet and a fresh capital-returns policy support de-concentration of the thesis.",
              monitor: "Group capex, JLR debt, dividend policy, listing price discovery.",
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
            "The inflection for the Tata Motors family is the **post-demerger re-rating**: previously a single conglomerate P/E, now the PV+JLR business trades alone. Each leg is profitable and growing; the market is still pricing the fused entity's legacy.",
        },
        {
          type: "p",
          text:
            "Watch the EV unit: Tata EV is planned as an independently listed 'winner'; that unlock — plus JLR's continued strength — can re-rate the TMPV stock toward value.",
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
              text: "Q1 PV volumes, JLR quarterly, EVM performance and pricing; margin direction matters most.",
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
          title: "Buy — ₹420 target",
          text:
            "Post demerger, TMPV is a cleaner 'India EV + JLR luxury' compounding story at ~8x FY27E earnings. The overlap with legacy CV no longer drags the multiple; we're constructive on the re-rate.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) JLR shock (luxury demand); (2) EV share loss; (3) China/macro; (4) high net debt at legacy group level; (5) structural TMPV/CV/EV separation complexities.",
        },
      ],
    },
  ],
};