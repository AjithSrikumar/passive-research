"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { companies, sortByRating } from "@/lib/companies";
import CompanyCard from "@/components/CompanyCard";
import { sectors } from "@/lib/sectors";

export default function ResearchBrowser() {
  const sp = useSearchParams();
  const initialQuery = sp.get("q") ?? "";
  const initialSector = sp.get("sector") ?? "";

  const query = initialQuery;
  const [sector, setSector] = useState(initialSector);
  const [sort, setSort] = useState<"rating" | "mcap" | "new">("rating");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = companies.filter(
      (c) =>
        (sector === "" || c.sector === sector) &&
        (q === "" ||
          c.name.toLowerCase().includes(q) ||
          c.ticker.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.sector.toLowerCase().includes(q))
    );

    switch (sort) {
      case "rating":
        list = sortByRating(list);
        break;
      case "mcap":
        list = [...list].sort((a, b) => b.marketCapCr - a.marketCapCr);
        break;
      case "new":
        list = [...list].sort((a, b) =>
          b.updatedDate.localeCompare(a.updatedDate)
        );
        break;
    }
    return list;
  }, [query, sector, sort]);

  return (
    <div className="section-inner">
      <div className="filter-bar">
        <button
          type="button"
          className={`filter-pill ${sector === "" ? "active" : ""}`}
          onClick={() => setSector("")}
        >
          All Sectors <span className="count">{companies.length}</span>
        </button>
        {sectors.map((s) => {
          const count = companies.filter((c) => c.sector === s.slug).length;
          if (count === 0) return null;
          return (
            <button
              key={s.slug}
              type="button"
              className={`filter-pill ${sector === s.slug ? "active" : ""}`}
              onClick={() => setSector(s.slug)}
            >
              {s.name} <span className="count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="sort-row">
        <span>
          <b>{filtered.length}</b> research reports
          {sector && ` · ${sectors.find((s) => s.slug === sector)?.name}`}
          {query.trim() && ` · matching “${query.trim()}”`}
        </span>
        <label className="filter-pill" style={{ margin: 0 }}>
          Sort
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as typeof sort)
            }
            style={{
              border: "none",
              background: "transparent",
              fontFamily: "inherit",
              fontSize: 13.5,
              fontWeight: 600,
              color: "inherit",
              outline: "none",
            }}
          >
            <option value="rating">By Rating</option>
            <option value="mcap">By Market Cap</option>
            <option value="new">Newest First</option>
          </select>
        </label>
      </div>

      {filtered.length > 0 ? (
        <div className="companies-grid">
          {filtered.map((c) => (
            <CompanyCard key={c.slug} company={c} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No companies match your filters. Try clearing the search or
          choosing a different sector.</p>
        </div>
      )}
    </div>
  );
}