/** Derive the NSE ticker (logo filename) from a factor RIC code.
 *  `RELI.NS` -> `RELI`; `MINT.NS^K22` -> `MINT`; `KENI.BO` -> `KENI`. */
export function tickerFromRic(ric: string): string {
  return ric
    .split("^")[0]
    .replace(/\.(NS|BO)$/i, "")
    .toUpperCase();
}
