# BLOCKER #1 — Supabase key leak: remediation runbook

**Status:** repo-side mitigations landed; *destructive history rewrite + dashboard work pending user action*.

## What leaked

Commit `5793185` (Initial commit, 2026-05-05) contained anon JWTs for two Supabase projects:

| Path (now removed/refactored) | Project | Status as of 2026-05-08 |
|---|---|---|
| `utils/supabase/info.tsx` (deleted in HEAD) | `amxadrultuaogbsrzcws`, exp 2036 | **Live** (HTTP 401 from REST endpoint = real). Not imported by current code. |
| `src/app/utils/supabase/info.tsx` (refactored to env in HEAD) | `pxfabcirmctfswutvmjg`, exp 2035-08-29 | **Dead / orphan** (connection refused on 2026-05-08). |

Both keys remain readable in `git log` and any prior clone until history is rewritten.

Anon keys are public-by-design *only if* every public table has Row-Level Security (RLS) enabled with policies that don't allow uncontrolled `select`/`insert`. RLS state on the live project could not be verified externally.

## Remediation done in HEAD (`f36a4b7..` series)

- Deleted `utils/supabase/info.tsx` and the empty `utils/` tree.
- Rewrote `src/app/utils/supabase/info.tsx` to read from `import.meta.env.VITE_SUPABASE_PROJECT_ID` / `VITE_SUPABASE_ANON_KEY`. Throws clearly if env is missing. No literals in source.
- Added `.env.example` documenting the required vars.
- Tightened `.gitignore`: `utils/supabase/`, `.env`, `.env.local`, `.env.production`, `.env.development`.

This stops *new* leaks. It does not erase the existing leak from history.

## Steps the user must run (in this order)

### 1. Rotate the live key — Supabase dashboard

Project `amxadrultuaogbsrzcws`:
- https://supabase.com/dashboard/project/amxadrultuaogbsrzcws/settings/api
- Under **Project API keys** → click **Reset** on the `anon` `public` key.
- Copy the new key into a local `.env.local` file at the repo root:
  ```
  VITE_SUPABASE_PROJECT_ID=amxadrultuaogbsrzcws
  VITE_SUPABASE_ANON_KEY=<new key from dashboard>
  ```
- Verify: `curl -s -H 'apikey: <new>' https://amxadrultuaogbsrzcws.supabase.co/rest/v1/ | head` — expect a JSON OpenAPI doc, not 401.

### 2. Decide the dead project

Project `pxfabcirmctfswutvmjg` is not responding (likely paused or deleted). Two options:
- **Delete it** in the dashboard (https://supabase.com/dashboard/project/pxfabcirmctfswutvmjg/settings/general → **Delete project**). The leaked key becomes inert. Recommended.
- Or restore + rotate, if there's data worth keeping. (Unlikely — no current code points at it any more after the env refactor.)

### 3. Audit RLS on the live project

In the dashboard for `amxadrultuaogbsrzcws`:
- **Authentication → Policies**: every table in `public` schema must show "RLS enabled".
- For each table, check there is no `USING (true)` policy that allows unauthenticated reads of sensitive data.
- Document which tables are intentionally public (anon-readable) vs. authenticated-only.

### 4. Rewrite history to remove the leaked literals

`git-filter-repo` is the recommended tool (faster + safer than `filter-branch`). Install:
```
brew install git-filter-repo
```

Then from `~/sites/NTSLLC/`:
```
# Confirm both paths exist in history (should print both):
git log --oneline --all -- utils/supabase/info.tsx src/app/utils/supabase/info.tsx | head

# Backup ref before rewrite:
git tag pre-filter-repo-2026-05-08

# Rewrite. --invert-paths removes the listed paths from every commit.
git filter-repo \
  --path utils/supabase/info.tsx \
  --path src/app/utils/supabase/info.tsx \
  --invert-paths

# filter-repo strips the origin remote on purpose. Re-add:
git remote add origin git@github.com:fahadalmansour/ntsllc.git
```

### 5. Force-push the rewritten history

This is destructive — every existing clone of `main` will need to be re-cloned or hard-reset. Coordinate with anyone else who has a working copy first. CI on the repo will also see a divergent history.

```
git push --force origin main
```

After this, GitHub will show a single linear history without the `info.tsx` literals. The leaked keys will no longer be visible via the GitHub web UI, raw blob URLs, or `git log` on a fresh clone.

### 6. Recover any other refs

If there are tags, branches, PRs, or CI artifacts that referenced the leaked commit, re-run the rewrite for those refs (`git filter-repo` defaults to all refs already) and force-push them too.

### 7. Notify other clones

Each engineer with a local clone needs to:
```
git fetch --all
git checkout main
git reset --hard origin/main
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```
Until they do, the old commit + keys are still in their reflog and `.git/objects/`.

## Why this order matters

Force-pushing first does **not** recall the keys — anyone who already cloned has them locally. Only **rotating the keys in Supabase invalidates the threat**. The history rewrite is hygiene that prevents *future* readers from finding the keys.
