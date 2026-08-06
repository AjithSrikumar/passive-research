# SECURITY.md

> Threat model for a **fully static, read-only, public website**. Attack
> surface is small by construction (no backend, no forms that persist, no
> authentication). This file documents the posture and the near-term plan.

## 1. Asset & Threat Model

| Asset | Exposure | Mitigation |
|---|---|---|
| Page HTML/content | Public read-only | None needed (public info) |
| Company/analyst data | Public | Data is authored in-repo; reviewed in PR |
| `localStorage` theme pref | Per-browser | No secrets stored |
| Build toolchain | CI/local | Pinned lockfile; `npm audit` gate planned |
| Domains/SEO | Public | DNS + host controls |

**No user data, no accounts, no auth, no persisted input, no forms that
store data, no payments.** Contact page is informational.

## 2. Authentication & Authorization

Not applicable — public read-only site. If a member area is ever added
(ROADMAP: "private dashboards"), an ADR must precede it, and it must use the
host's auth integration (e.g., Vercel/Auth.js) with standard OWASP session
handling.

## 3. OWASP Considerations (mapped)

| Category | Status |
|---|---|
| **XSS** | Low risk. The only `dangerouslySetInnerHTML` is the JSON-LD `<script>` on `/company/[slug]`, populated exclusively from the internal `Company` dataset (no user input, no URL params reflected). New `dangerouslySetInnerHTML` is forbidden without review (OPENCODE "Never To Change" #6). |
| **CSRF** | Not applicable (no state-changing endpoints). |
| **Injection** | Not applicable (no DB/queries). Content is TS-typed; build fails on invalid data. |
| **Open redirects** | Not applicable (no redirect endpoints). |
| **SSRF / server-side** | Not applicable (no backend requests). |
| **IDOR / authz** | Not applicable. |
| **Input validation** | Search/browser filters are client-side arrays; no server input. Slugs are validated by `getCompany`/`getSector` lookups (404 on miss). |
| **Rate limiting** | Not applicable (static). Add at the CDN/edge only if a public API ships (ROADMAP). |
| **Clickjacking** | Default headers on host should include `X-Frame-Options`/`frame-ancestors`; enforce via CSP (M1). |
| **Supply chain** | Version-pinned lockfile; audit gate planned (M2). |

## 4. Security Headers

- **Today:** host defaults (Vercel sends `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `X-DNS-Prefetch-Control`, and
  `Permissions-Policy` on its CDN). No custom CSP.
- **Planned (task M1):**
  - Strict `Content-Security-Policy`:
    `default-src 'self'; script-src 'self' 'unsafe-inline'` — the JSON-LD
    script is markup, not JS, but Next may inject inline RSC bootstrapping;
    verify before enabling `'unsafe-inline'` for scripts, prefer `'nonce'` if
    the host supports it.
    `style-src 'self' 'unsafe-inline'` (React inline styles used in
    components/theme); `font-src 'self'`; `img-src 'self' data:`.
  - Framing: `frame-ancestors 'none'`.
- Implement via `next.config.ts` `headers()` or `vercel.json` + `headers`
  middleware; document the tested set here.

## 5. XSS Detail — the JSON-LD page

`src/app/company/[slug]/page.tsx` renders:

```tsx
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

- `jsonLd` is built **only** from `c` fields read from the dataset.
- String fields are internal authoring (`shortThesis`, `name`, `ticker`).
- **Constraint:** never concatenate route params or user input here.
- Value of `"<script>"` inside a string would need to break the enclosing tag
  to be exploitable; keep authoring trusted (repo + PR review).

## 6. Dependency Policy

- Runtime deps are locked to `next`, `react`, `react-dom`
  (ADR-001). New runtime deps require an ADR.
- `package-lock.json` is committed.
- CI gate planned: `npm audit --audit-level=high` on every build (M2).

## 7. Secrets

No secrets in the repo. If `.env*` is ever introduced, it stays in
`.gitignore` (already ignores `.env*`), and values live in the host's secret
manager.

## 8. Security Checklist (before each release)

- [ ] No `dangerouslySetInnerHTML` beyond the JSON-LD script
- [ ] No user-input sent to HTML without escaping (none exist)
- [ ] No secrets/absolute paths committed
- [ ] `npm audit` clean (once gate live; otherwise spot-check)
- [ ] Host headers reviewed once M1 lands (CSP/frame-ancestors present)
- [ ] `robots.txt` scoped correctly

## 9. Incident Response

Static site: incidents = content or build failures.

- **Revert** the content/build; redeploy prior tag (see
  `docs/DEPLOYMENT.md` rollback).
- If a data field ever renders unexpectedly, fix the row in
  `companies.ts`/`report.ts` + add a smoke assertion
  (`docs/TESTING.md`).

## 10. Security Review Cadence

- On every major release (data/architecture change).
- After any change touching `dangerouslySetInnerHTML`, middleware, or
  headers.
- Dependency review at the same cadence (or on `npm audit` alerts).