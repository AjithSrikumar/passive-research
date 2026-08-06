<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

> **AI agents:** start every session by reading [`./OPENCODE.md`](./OPENCODE.md)
> (project status, standards, constraints), then `docs/ARCHITECTURE.md`,
> `docs/DECISIONS.md`, and `docs/TASKS.md`. The repository — not chat history —
> is the source of truth.
>
> **Commit & deploy rule (mandatory):** after every change, run
> `npm run lint` + `npm run build`, update the relevant docs, then
> **commit and push to `main`** — Vercel auto-deploys on every push
> (see OPENCODE.md → "Commit & Deploy Policy"). Never leave the tree dirty.
