import type { ResearchNote } from "./types";

export const adaniPortsNote: ResearchNote = {
  slug: "adani-ports",
  header: [
    { label: "Rating", value: "Buy" },
    { label: "Target price", value: "₹1,950", sub: "vs ₹1,690 current" },
    { label: "Implied upside", value: "+15.4%" },
    { label: "Market cap", value: "₹3,60,000 Cr", sub: "≈ 216 bn shares" },
    { label: "TTM P/E (actual)", value: "~27x", sub: "FY27E EPS ~₹72-75 (E)" },
    { label: "Q1 FY27 revenue", value: "₹10,821 Cr (+18.6% YoY)", sub: "PAT ₹3,620 Cr (+9.2%)" },
    { label: "Cargo FY26", value: "504 MMT", sub: "+14% YoY; >27% share" },
    { label: "Dividend", value: "₹5.5", sub: "special & regulars" },
    { label: "Note date", value: "7 Aug 2026", sub: "post Q1 FY27 results (29 Jul 2026)" },
  ],
  sections: [
    {
      id: "what-changed",
      label: "What changed",
      blocks: [
        {
          type: "kv",
          items: [
            { label: "Q1 FY27 revenue", value: "₹10,820.8 Cr", sub: "+18.6% YoY; strong logistics OS" },
            { label: "Q1 FY27 PAT", value: "₹3,620 Cr", sub: "+9.2% YoY; beat" },
            { label: "Cargo volume", value: "138.1 MMT", sub: "+15% YoY (Q1)" },
            { label: "Ports EBIT margin", value: "~40%", sub: "scale-driven" },
            { label: "Logistics (LINE/Walki)", value: "scaling", sub: "rail+warehousing+EMEA" },
            { label: "Vizhinjam", value: "operational", sub: "trans-shipment hub gate" },
          ],
        },
        {
          type: "p",
          text:
            "Adani Ports reported Q1 FY27 on 29 July 2026: revenue of **₹10,820 Cr (+18.6% YoY)** and PAT of **₹3,620 Cr (+9.2%)**, with cargo of 138.1 MMT (+15%). The company is India's largest private port-logistics operator with a ~27% cargo share and a combined port+logistics network (ports, rail, warehouses).",
        },
        {
          type: "callout",
          tone: "key",
          title: "What we changed",
          text:
            "We rate **Buy** with a target of **₹1,950 (~27x FY27E EPS ~₹72, E)** — beneficial consensus (avg ~₹1,950-2,000 across ~27 analysts). The growth lever: handles the full-port cycle, trans-shipment (Vizhinjam), and logistics scale; risks are group-linkage perception.",
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
            "Adani Ports's debates: (i) **volume growth sustainability** — cargo +15% beats cargo-cycling; (ii) **capex intensity** — new terminals, trans-shipment and logistics build consume cash; (iii) **group linkage** — the promoter's other businesses (media, energy) carry sentiment risk; (iv) **valuation** — 27x for a port is a premium that needs the logistics/'network' story to hold.",
        },
        {
          type: "table",
          caption: "Where our view differs",
          cols: ["Issue", "Market view", "Our view", "Evidence base"],
          rows: [
            [
              "Cargo growth",
              "Peak",
              "Still compounding",
              "Q1 +15%; gate share up",
            ],
            [
              "Logistics",
              "cost centre",
              "EBITDA accretive",
              "rail+warehouse scaling",
            ],
            [
              "Group linkage",
              "Risk priced",
              "Managed covenant-light",
              "independent ops, deleveraged",
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
              driver: "1. Port network + logistics integration",
              evidence: "13+ ports w/ 138 MMT cargo, rail (Walk) & warehousing; single-window logistics.",
              consequence: "Network effects raise utilisation and EBITDA/tonne; each 100 bps of share is ~₹1,000+ Cr EBITDA.",
              monitor: "Cargo volume, share of India trade, rail volumes, EBITDA/tonne.",
            },
            {
              driver: "2. Trans-shipment & capex cycle",
              evidence: "Vizhinjam operational; mombai transshipment hub; closed loop north-south.",
              consequence: "Saves intra-India re-handling; turning from capex to cash generation near term.",
              monitor: "Vizhinjam throughput, terminal utilisation, capex cash flow.",
            },
            {
              driver: "3. Deleveraging & shareholder returns",
              evidence: "Dividend ₹5.5 + on/off; net debt declining; multiple ratings upgrade.",
              consequence: "Cash returns + ratings assurance support the multiple and the story.",
              monitor: "Net debt/EBITDA, dividend, ratings, subsidiary IPOs.",
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
            "Adani Ports is at an **integration inflection**: from port operator to a combined ports + logistics + trans-shipment platform. FY26-27 volumes (138 MMT quarterly) show the compound growth engine; each vertical is adding to the LTM EBITDA growth.",
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
              text: "Volume momentum, logistics profitability, trans-shipment ramp and any subsidiary IPO unlock.",
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
          title: "Buy — ₹1,950 target",
          text:
            "Adani Ports is a structural beneficiary of India's trade & trans-shipment expansion — the biggest integrated port-logistics franchise in the country at a growth + integrated revolution phase. Buy for the network, not the headlines.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "Key risks",
          text: "(1) Cargo growth stalls; (2) capex overrun; (3) group-promoter perceptions; (4) interest rates; (5) cargo cyclicality (iron ore, coal, containers).",
        },
      ],
    },
  ],
};