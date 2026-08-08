"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FACTOR_YEARS, type FactorRowTuple } from "@/lib/factor/data";

interface Props {
  byYear: Record<number, FactorRowTuple[]>;
}

type SortKey = "rank" | "composite" | "growth" | "quality" | "valuation" | "momentum";

const BLOCKS: { key: SortKey; label: string; title: string }[] = [
  { key: "growth", label: "G", title: "Growth score" },
  { key: "quality", label: "Q", title: "Quality score" },
  { key: "valuation", label: "V", title: "Valuation score" },
  { key: "momentum", label: "M", title: "Momentum score" },
];

function ScoreCell({ v }: { v: number | null }) {
  if (v === null) return <td className="num">—</td>;
  return (
    <td className="num score-cell">
      <span className="score-bar">
        <span style={{ width: `${v * 100}%` }} />
      </span>
      {(v * 100).toFixed(1)}
    </td>
  );
}

export default function FactorScreener({ byYear }: Props) {
  const [year, setYear] = useState(FACTOR_YEARS[FACTOR_YEARS.length - 1]);
  const [q, setQ] = useState("");
  const [minComposite, setMinComposite] = useState(0);
  const [minBlock, setMinBlock] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortAsc, setSortAsc] = useState(true);

  const rows = useMemo(() => byYear[year] ?? [], [byYear, year]);
  const years = FACTOR_YEARS;

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = rows.filter((r) => {
      const [, name, slug, sector, , composite, growth, quality, valuation, momentum] = r;
      if (composite < minComposite) return false;
      if (minBlock > 0) {
        if ((growth ?? 0) < minBlock) return false;
        if ((quality ?? 0) < minBlock) return false;
        if ((valuation ?? 0) < minBlock) return false;
        if ((momentum ?? 0) < minBlock) return false;
      }
      if (query) {
        const hay = `${name} ${slug ?? ""} ${r[0]} ${sector ?? ""}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
    const idx: Record<SortKey, number> = { rank: 4, composite: 5, growth: 6, quality: 7, valuation: 8, momentum: 9 };
    const i = idx[sortKey];
    list = [...list].sort((a, b) => {
      const av = a[i] ?? 0;
      const bv = b[i] ?? 0;
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [rows, q, minComposite, minBlock, sortKey, sortAsc]);

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) setSortAsc((v) => !v);
    else {
      setSortKey(k);
      setSortAsc(k === "rank");
    }
  };

  const exportCsv = () => {
    const header = ["Rank", "RIC", "Company", "Slug", "Sector", "Composite", "Growth", "Quality", "Valuation", "Momentum"];
    const lines = filtered.map((r) =>
      [r[4], r[0], r[1], r[2] ?? "", r[3] ?? "", r[5], r[6] ?? "", r[7] ?? "", r[8] ?? "", r[9] ?? ""].join(",")
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `factor-screener-FY${year}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="section-inner">
      <div className="filter-bar">
        <select
          className="filter-select"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          aria-label="Fiscal year"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              FY{y + 2000}
            </option>
          ))}
        </select>
        <input
          className="filter-input"
          type="search"
          placeholder="Search company, ticker or sector…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search"
        />
        <label className="filter-num">
          Min composite
          <input
            type="number"
            min={0}
            max={1}
            step={0.05}
            value={minComposite}
            onChange={(e) => setMinComposite(Math.max(0, Math.min(1, Number(e.target.value))))}
          />
        </label>
        <label className="filter-num">
          Min block score
          <input
            type="number"
            min={0}
            max={1}
            step={0.05}
            value={minBlock}
            onChange={(e) => setMinBlock(Math.max(0, Math.min(1, Number(e.target.value))))}
          />
        </label>
        <button type="button" className="filter-pill" onClick={exportCsv}>
          Export CSV
        </button>
      </div>

      <div className="sort-row">
        <span>
          <b>{filtered.length}</b> of {rows.length} companies · FY{year + 2000}
          {minComposite > 0 || minBlock > 0 ? " · filtered" : " · full ranked universe"}
        </span>
      </div>

      <div className="coverage-table-wrap">
        <table className="coverage-table factor-table">
          <thead>
            <tr>
              <th>
                <button type="button" className="th-btn" onClick={() => toggleSort("rank")}>
                  Rank {sortKey === "rank" ? (sortAsc ? "↑" : "↓") : ""}
                </button>
              </th>
              <th>Company</th>
              <th>Sector</th>
              <th>
                <button type="button" className="th-btn" onClick={() => toggleSort("composite")}>
                  Composite {sortKey === "composite" ? (sortAsc ? "↑" : "↓") : ""}
                </button>
              </th>
              {BLOCKS.map((b) => (
                <th key={b.key} title={b.title}>
                  <button type="button" className="th-btn" onClick={() => toggleSort(b.key)}>
                    {b.label} {sortKey === b.key ? (sortAsc ? "↑" : "↓") : ""}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const [ric, name, slug, sector, rank, composite, growth, quality, valuation, momentum] = r;
              return (
                <tr key={`${year}-${ric}`}>
                  <td className="num">{rank}</td>
                  <td>
                    {slug ? (
                      <Link href={`/company/${slug}`} className="co-name">
                        {name}
                        <span className="co-ticker">{ric}</span>
                      </Link>
                    ) : (
                      <span className="co-name">
                        {name}
                        <span className="co-ticker">{ric}</span>
                      </span>
                    )}
                  </td>
                  <td>{sector ?? "—"}</td>
                  <td className="num">
                    <strong>{(composite * 100).toFixed(1)}%</strong>
                  </td>
                  <ScoreCell v={growth} />
                  <ScoreCell v={quality} />
                  <ScoreCell v={valuation} />
                  <ScoreCell v={momentum} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>No companies match the current filters for FY{year + 2000}.</p>
        </div>
      )}
    </div>
  );
}
