"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Sectors", href: "/sectors" },
  { label: "Screener", href: "/screener" },
  { label: "Latest Research", href: "/latest-research" },
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/methodology" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="logo" aria-label="Passive home">
          <span className="logo-mark">P</span>
          <span className="logo-block">
            <span className="logo-text">PASSIVE</span>
            <span className="logo-sub">Professional Equity Research</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <ThemeToggle />
          <Link href="/research" className="btn btn-primary btn-nav">
            Explore Research
          </Link>
          <button
            type="button"
            className="hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu ${mobileOpen ? "open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active" : undefined}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/coverage-universe" onClick={() => setMobileOpen(false)}>
          Coverage Universe
        </Link>
        <Link href="/research" className="btn btn-primary mobile-cta">
          Explore Research
        </Link>
      </div>
    </header>
  );
}