# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this repo is

`ntsllc` backs **NeoTechnology Solutions LLC** — a Wyoming US LLC (Filing ID 2025-001744917, EIN 36-5148912) operating as the e-commerce technology partner for GCC and US merchants. Sole member: Fahad. Banking: Mercury (USD).

The repo is **hybrid**:
- React/Next.js front-end (entry `index.html` → `src/app/main.tsx`)
- WordPress theme variant under `wp-theme/neotechnology/`
- Supabase backend (`supabase/functions/` + `nts_schema.sql`)
- Business documents (`business-docs/`, `forms/`, `references/`, `guidelines/`)

Live target: `neotechnology.solutions`.

## Build-tool ambiguity (resolve before deploying)

`package.json` declares `next` ^16.2.4 but `index.html` mounts via `<script type="module" src="/src/app/main.tsx"></script>` — that pattern is Vite-style, not Next.js. Confirm with the operator which build tool is canonical, then update `~/sites/_docs/ntsllc/STACK.md` accordingly.

## Hard rules

- ❌ Never apply `nts_schema.sql` to live Supabase without explicit per-step approval.
- ❌ Never commit `.env` or service-role keys.
- ❌ Never disable RLS on any Supabase table.
- ❌ Never modify `business-docs/` without user approval — these are formation/banking documents.
- ❌ Reply in Arabic in the CLI (RTL breaks the terminal).

## Symbol prefixes

- React/TypeScript: standard camelCase / PascalCase.
- WordPress theme `wp-theme/neotechnology/`: standard `nts_*` / `neotech_*` (verify against existing files in that folder).

## Operations

Full operations contract: `~/sites/_docs/ntsllc/` (`README.md`, `STACK.md`, `HOSTING.md`, `DEPLOY.md`, `AGENT.md`, `AUTOMATION.md`, `RUNBOOK.md`).

Owning Claude agents:
- **`nextjs-site-auditor`** for `src/`, `index.html`, `next.config.*` (if present)
- **`wp-woo-standards-auditor`** for `wp-theme/neotechnology/` PHP
- **`general-purpose`** for `supabase/functions/`, `nts_schema.sql`, `business-docs/`
- **`security-engineer`** for any change touching the Supabase service-role key or compliance docs

CI: `.github/workflows/claude-ops.yml` (pnpm install + lint/typecheck/build gated until script names confirmed; PHP -l on wp-theme; Supabase schema parse-check; secrets scan).

The Notion mirror lives in the **NeoTech Sites & Repos** database.

## Live site state — added 2026-05-07

The live `https://neotechnology.solutions` (LiteSpeed-hosted WordPress, PHP 8.4.20) currently serves a near-default WP install — homepage + Hello-world post + Sample Page; no real business content. This repo's `wp-theme/neotechnology/` is **not deployed** to the live site.

Latest readiness audit: `~/.claude/reports/ntsllc/readiness-2026-05-07.md`. Verdict: **NOT READY.** Findings: user enumeration via `/wp-json/wp/v2/users` + `?author=1` + user sitemap (admin slug `fahadnts`); xmlrpc + unthrottled wp-login + no WAF/2FA; no security headers (HSTS, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy); no SEO meta or OG tags.

Cannot confirm without WP admin access: limit-login-attempts / Wordfence / 2FA configuration; whether `wp-cron` runs on system cron in addition to public hits; DKIM record; whether the Next.js project here will eventually replace the WP install.

When the user is ready to harden the live WP, get admin credentials → install `WordPress/mcp-adapter` plugin + mint a non-Admin Application Password → `claude mcp add ntsllc_mcp -s user ...` (Path A per the parent plan at `~/.claude/plans/ecommerce-agent-claude-code-mellow-papert.md`).
