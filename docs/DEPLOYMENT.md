# DEPLOYMENT.md

> Current target: **Next.js on a Node-capable host (Vercel recommended)**.
> The site is 100% static output at build time; there is no runtime
> infrastructure beyond the web server.

## 1. Hosting & Environments

| Environment | URL | Notes |
|---|---|---|
| Local dev | `http://localhost:3000` | `npm run dev` (Turbopack) |
| Production | `https://passive-research.in` | Canonical origin; hard-coded in `src/app/layout.tsx` (`metadataBase`), `sitemap.ts`, `robots.ts` |

No staging environment exists yet (single env is fine for a read-only static
site; add one when data pipelines land).

## 2. Build & Release

```bash
npm ci
npm run lint
npm run build
npm start        # production server; or deploy via Vercel
```

Expected build output: **172 static pages** (117 company + 23 sector + 11
static + sitemap + robots + 404).

## 3. CI/CD

- **Current:** Vercel is connected to the GitHub repo (`AjithSrikumar/
  passive-research`). **Every push to `main` triggers an automatic production
  deployment** — no manual deploy steps, no other pipeline.
  Deployed URL: `https://passive-research.vercel.app`; the custom domain
  `passive-research.in` is attached on Vercel. Status—Project dashboard:
  `vercel.com`. To verify a deploy: wait ~1–2 min, then
  `Invoke-WebRequest https://passive-research.vercel.app` → 200.
- **Pre-push gate (repo policy, OPENCODE.md):** `npm run lint` +
  `npm run build` + smoke check + docs update. This runs locally before every
  commit; the exact CI gate above is belt-and-suspenders.
- **Augmentation options (M1/M2, not yet adopted):**
  GitHub Actions to add `npm audit --audit-level=high` and health checks —
  Vercel builds and deploys first; a failed post-deploy smoke can roll back.

## 4. Secrets

**No secrets exist.** The app has no env vars, no tokens, no API keys. If the
data pipeline (H1) adds one, store it in the host's secret manager and
reference it from `next.config.ts` `env` only.

## 5. Rollback Process

- Vercel: redeploy the previous deployment (immutable deployments).
- Self-hosted: `git checkout <previous-tag>` + `npm run build` + `npm start`.
- The data layer is type-checked at build, so rollback is rarely required;
  when it is, roll the last release tag.

## 6. Deployment Checklist

- [ ] `npm run lint` clean
- [ ] `npm run build` clean, 172 pages
- [ ] Smoke test pass (`docs/TESTING.md` § 3)
- [ ] `sitemap.xml` includes new companies/sectors if the universe changed
- [ ] `metadataBase` matches the production origin
- [ ] `docs/CHANGELOG.md` version bumped and tagged
- [ ] No absolute local paths / machine-specific config committed
- [ ] `robots.txt` allows crawling of intended pages only

## 7. Future Options

- **Full static export** (`output: "export"`) + CDN if the Node server isn't
  needed (task L2) — note: `generateStaticParams` + `dynamicParams=false`
  already make the site export-ready in principle.
- **ISR/on-demand** for live price refreshes when a data API lands (see
  `docs/ROADMAP.md`).