-- =============================================================================
-- LEGACY / DOCUMENTATION ONLY — NOT THE RUNTIME SOURCE OF TRUTH
-- =============================================================================
-- The canonical schema for `{$wpdb->prefix}nts_contacts` is now installed by
-- `nts_install_schema()` via `dbDelta()` in
--   wp-theme/neotechnology/functions.php
-- and gated by the `nts_db_version` option (constant `NTS_DB_VERSION`).
--
-- Closes audit BLOCKER #3 (~/.claude/reports/ntsllc/readiness-2026-05-08.md):
-- "DB split-brain across 3 disjoint persistence layers" — this file is now
-- a frozen reference, not a runtime path. Do NOT apply this SQL to live
-- MySQL; doing so creates an UNPREFIXED table that diverges from the WP
-- runtime path.
--
-- Differences vs the runtime dbDelta schema:
--   * Table name here is `nts_contacts`; runtime uses `{$wpdb->prefix}nts_contacts`.
--   * `status` here is ENUM; runtime uses VARCHAR(20) (dbDelta-friendly).
--   * `nts_subscribers` (below) is ORPHAN — no runtime code reads or writes it.
--
-- Cosmetic: original header referenced cPanel account `fsalmansour_wp596`,
-- removed to drop the info-disclosure flag from the audit (MEDIUM finding).
-- =============================================================================


CREATE TABLE IF NOT EXISTS `nts_contacts` (
  `id`           BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `name`         VARCHAR(200)     NOT NULL,
  `email`        VARCHAR(254)     NOT NULL,
  `company`      VARCHAR(200)     NOT NULL DEFAULT '',
  `market`       VARCHAR(100)     NOT NULL DEFAULT '',
  `stage`        VARCHAR(100)     NOT NULL DEFAULT '',
  `message`      TEXT             NOT NULL,
  `ip_address`   VARCHAR(45)      NOT NULL DEFAULT '',
  `user_agent`   VARCHAR(500)     NOT NULL DEFAULT '',
  `status`       ENUM('new','read','replied','archived') NOT NULL DEFAULT 'new',
  `created_at`   DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_email`      (`email`),
  KEY `idx_status`     (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `nts_subscribers` (
  `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email`         VARCHAR(254)    NOT NULL,
  `source`        VARCHAR(100)    NOT NULL DEFAULT 'website',
  `subscribed_at` DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status`        ENUM('active','unsubscribed') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_email` (`email`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
