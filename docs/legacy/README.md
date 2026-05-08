# Legacy / frozen reference

Files in this directory are kept for historical context only — they are NOT
applied at runtime. Don't add new code here.

## `nts_schema.sql`

Original DDL for `nts_contacts` + `nts_subscribers`. Superseded by
`nts_install_schema()` in `wp-theme/neotechnology/functions.php`, which
installs the WP-prefixed `{$wpdb->prefix}nts_contacts` table via `dbDelta()`
and is idempotent via the `nts_db_version` option (`NTS_DB_VERSION`).

`nts_subscribers` is an orphan — no runtime code reads or writes it. If a
newsletter capture form is added later, the new table should also be
installed via `dbDelta()` from a theme or mu-plugin path, not by applying
this SQL.

Closes audit BLOCKER #3 in
`~/.claude/reports/ntsllc/readiness-2026-05-08.md`.
