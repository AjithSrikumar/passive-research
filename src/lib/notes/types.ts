export interface NoteKv {
  label: string;
  value: string;
  sub?: string;
}

export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "callout"; tone?: "info" | "key" | "warn"; title?: string; text: string }
  | { type: "kv"; items: NoteKv[] }
  | { type: "table"; caption?: string; cols: string[]; rows: string[][] }
  | {
      type: "drivers";
      rows: {
        driver: string;
        evidence: string;
        consequence: string;
        monitor: string;
      }[];
    }
  | { type: "cards"; items: { title: string; body: string }[] }
  | { type: "list"; items: { lead: string; text: string }[] }
  | { type: "quote"; text: string; source: string }
  | {
      type: "risks";
      rows: {
        risk: string;
        probability: string;
        financial: string;
        valuation: string;
        indicator: string;
        mitigation: string;
        kpi: string;
      }[];
    }
  | { type: "downloads"; items: { label: string; url: string; note?: string }[] }
  | { type: "small"; text: string };

export interface NoteSection {
  id: string;
  label: string;
  blocks: NoteBlock[];
}

export interface ResearchNote {
  slug: string;
  header: NoteKv[];
  sections: NoteSection[];
}