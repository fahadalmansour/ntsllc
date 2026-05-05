-- NeoTechnology Solutions LLC
-- Database: fsalmansour_wp596
-- Add only these two tables. Do NOT touch existing WordPress tables.

USE `fsalmansour_wp596`;

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
