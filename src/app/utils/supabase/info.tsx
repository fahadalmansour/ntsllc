/**
 * Supabase project identifiers — read from environment, never committed.
 *
 * Closes audit BLOCKER #1 in
 * ~/.claude/reports/ntsllc/readiness-2026-05-08.md.
 *
 * Required env vars (Vite — set in `.env.local`, see `.env.example`):
 *   VITE_SUPABASE_PROJECT_ID
 *   VITE_SUPABASE_ANON_KEY
 *
 * If/when this codebase migrates to Next.js (per per-site CLAUDE.md the
 * canonical build tool was declared Next 16, but the runtime today is
 * Vite), swap `import.meta.env.VITE_*` for `process.env.NEXT_PUBLIC_*`
 * and rename the env keys accordingly.
 */

// Vite injects `import.meta.env` at build time. Cast to bypass the missing
// `vite/client` type declaration in this tsconfig.
const env = ((import.meta as unknown) as { env: Record<string, string | undefined> }).env;

function required(key: string): string {
  const v = env[key];
  if (!v) {
    throw new Error(
      `Missing env var ${key}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return v;
}

export const projectId = required('VITE_SUPABASE_PROJECT_ID');
export const publicAnonKey = required('VITE_SUPABASE_ANON_KEY');
