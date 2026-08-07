import type { ResearchNote } from "./types";
import { trentNote } from "./trent";

const NOTES: Record<string, ResearchNote> = {
  [trentNote.slug]: trentNote,
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