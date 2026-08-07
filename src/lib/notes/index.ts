import type { ResearchNote } from "./types";
import { trentNote } from "./trent";
import { titanNote } from "./titan";
import { relianceNote } from "./reliance";
import { hdfcBankNote } from "./hdfc-bank";
import { dmartNote } from "./dmart";
import { bhartiAirtelNote } from "./bharti-airtel";

const NOTES: Record<string, ResearchNote> = {
  [trentNote.slug]: trentNote,
  [titanNote.slug]: titanNote,
  [relianceNote.slug]: relianceNote,
  [hdfcBankNote.slug]: hdfcBankNote,
  [dmartNote.slug]: dmartNote,
  [bhartiAirtelNote.slug]: bhartiAirtelNote,
};

export function getNote(slug: string): ResearchNote | undefined {
  return NOTES[slug];
}

export function hasNote(slug: string): boolean {
  return Boolean(NOTES[slug]);
}

export function noteToc(note: ResearchNote): { id: string; label: string }[] {
  return note.sections.map((s) => ({ id: s.id, label: s.label }));
}