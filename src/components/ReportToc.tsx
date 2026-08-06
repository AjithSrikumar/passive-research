"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

export default function ReportToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    const els = document.querySelectorAll<HTMLElement>("[data-report-section]");
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="report-toc" aria-label="Report sections">
      <div className="report-toc-label">In this report</div>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={active === item.id ? "active" : undefined}
          onClick={(e) => {
            const el = document.getElementById(item.id);
            if (el) {
              e.preventDefault();
              const y = el.getBoundingClientRect().top + window.scrollY - 88;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}