import type { ResearchNote } from "./types";
import { trentNote } from "./trent";
import { titanNote } from "./titan";
import { relianceNote } from "./reliance";
import { hdfcBankNote } from "./hdfc-bank";
import { dmartNote } from "./dmart";
import { bhartiAirtelNote } from "./bharti-airtel";
import { tcsNote } from "./tcs";
import { infosysNote } from "./infosys";
import { hclTechNote } from "./hcl-technologies";
import { sbiNote } from "./sbi";
import { iciciBankNote } from "./icici-bank";
import { hulNote } from "./hul";
import { itcNote } from "./itc";
import { bajajFinanceNote } from "./bajaj-finance";
import { lntNote } from "./lnt";
import { marutiNote } from "./maruti";
import { sunPharmaNote } from "./sun-pharma";
import { tatamotorsNote } from "./tata-motors";
import { mahindraNote } from "./mahindra";
import { kotakNote } from "./kotak";
import { axisNote } from "./axis";
import { ntpNote } from "./ntpc";
import { ongcNote } from "./ongc";
import { powerGridNote } from "./power-grid";
import { adaniPortsNote } from "./adani-ports";
import { coalIndiaNote } from "./coal-india";
import { bajajFinservNote } from "./bajaj-finserv";
import { bajajAutoNote } from "./bajaj-auto";
import { siemensNote } from "./siemens";
import { nestleNote } from "./nestle";
import { belNote } from "./bel";
import { adaniPowerNote } from "./adani-power";
import { jswSteelNote } from "./jsw-steel";

const NOTES: Record<string, ResearchNote> = {
  [trentNote.slug]: trentNote,
  [titanNote.slug]: titanNote,
  [relianceNote.slug]: relianceNote,
  [hdfcBankNote.slug]: hdfcBankNote,
  [dmartNote.slug]: dmartNote,
  [bhartiAirtelNote.slug]: bhartiAirtelNote,
  [tcsNote.slug]: tcsNote,
  [infosysNote.slug]: infosysNote,
  [hclTechNote.slug]: hclTechNote,
  [sbiNote.slug]: sbiNote,
  [iciciBankNote.slug]: iciciBankNote,
  [hulNote.slug]: hulNote,
  [itcNote.slug]: itcNote,
  [bajajFinanceNote.slug]: bajajFinanceNote,
  [lntNote.slug]: lntNote,
  [marutiNote.slug]: marutiNote,
  [sunPharmaNote.slug]: sunPharmaNote,
  [tatamotorsNote.slug]: tatamotorsNote,
  [mahindraNote.slug]: mahindraNote,
  [kotakNote.slug]: kotakNote,
  [axisNote.slug]: axisNote,
  [ntpNote.slug]: ntpNote,
  [ongcNote.slug]: ongcNote,
  [powerGridNote.slug]: powerGridNote,
  [adaniPortsNote.slug]: adaniPortsNote,
  [coalIndiaNote.slug]: coalIndiaNote,
  [bajajFinservNote.slug]: bajajFinservNote,
  [bajajAutoNote.slug]: bajajAutoNote,
  [siemensNote.slug]: siemensNote,
  [nestleNote.slug]: nestleNote,
  [belNote.slug]: belNote,
  [adaniPowerNote.slug]: adaniPowerNote,
  [jswSteelNote.slug]: jswSteelNote,
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