"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { companies, formatPrice } from "@/lib/companies";
import CompanyLogo from "./CompanyLogo";
import RatingBadge from "./RatingBadge";

export default function SearchCompanies({ size = "lg" }: { size?: "lg" | "md" }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return companies
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.ticker.toLowerCase().includes(q) ||
          c.sector.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.shortThesis.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  const submit = () => {
    if (query.trim()) {
      router.push(`/research?q=${encodeURIComponent(query.trim())}`);
      setFocused(false);
    }
  };

  return (
    <div className={`search-wrap search-${size}`} ref={wrapRef}>
      <form
        className="search-bar"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="Search Companies — name, ticker, sector or industry"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          aria-label="Search companies"
        />
        <button type="submit" className="search-btn" aria-label="Search">
          Search
        </button>
      </form>

      {focused && query.trim().length >= 2 && (
        <div className="search-results">
          {results.length > 0 ? (
            <ul>
              {results.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/company/${c.slug}`}
                    onClick={() => setFocused(false)}
                  >
                    <CompanyLogo company={c} size={36} />
                    <span className="sr-main">
                      <span className="sr-title">
                        {c.legalName}
                        <em> · {c.ticker}</em>
                      </span>
                      <span className="sr-sub">
                        {c.industry} · {formatPrice(c.currentPrice)}
                      </span>
                    </span>
                    <RatingBadge rating={c.recommendation} size="sm" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search-results-empty">
              No companies match “{query}”. Try a ticker like “TCS” or “TITAN”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}