# NTSLLC — Visual/UX Audit

Last run: **2026-05-08** · Run ID: **2026-05-08-1500**
Captured: `~/.claude/reports/NTSLLC/screenshots/2026-05-08/` (24 shots: home + privacy + terms + arabic × 3 viewports × 2 locales)
HEAD: `02afd12`
Notion: https://www.notion.so/e38bdfd54e3343109402b1def5e8c693

> Constraint: targeted component-level fixes only. No theme rewrites. Findings that would require a rewrite live under **OUT-OF-SCOPE**.

**Tally:** 3 BLOCKER · 6 HIGH · 5 MEDIUM · 2 LOW = **16 findings**

---

## BLOCKER

### B1. `<nav role="banner">` misuse — landmark conflict for assistive tech
- Viewport / page / locale: all / home + arabic / en + ar
- Source: `wp-theme/neotechnology/header.php:12` and `wp-theme/neotechnology/page-arabic.php:126`
- Fix: Remove `role="banner"` from `<nav>`. Wrap the nav in `<header role="banner">`. ARIA spec: only one banner landmark per page; banner must be on `<header>`, not `<nav>`. WCAG 1.3.6.

### B2. Arabic page `lang` attribute overwritten by `wp_head()` — locale switch non-functional
- Viewport / page / locale: all / arabic / ar
- Source: `wp-theme/neotechnology/page-arabic.php:12-18`
- Screenshot: `arabic-360-en.png` and `arabic-360-ar.png` are pixel-identical
- Fix: Remove the hardcoded `<html dir="rtl" lang="ar">`. Use `add_filter('language_attributes', fn() => 'dir="rtl" lang="ar"', 20)` BEFORE `wp_head()`, then let WordPress render `<html>` via `language_attributes()`.
- Evidence: page-arabic.php opens its own `<!DOCTYPE html><html dir="rtl" lang="ar">` on line 12, then `wp_head()` on line 18 re-emits WordPress's configured locale (en-US) inside `<head>`, silently winning. The two 360 px screenshots are identical.

### B3. "Most popular" pricing badge — white text on white gradient, invisible
- Viewport / page / locale: all / home + arabic / en + ar
- Source: `wp-theme/neotechnology/style.css:550-557`
- Fix: Change badge text color from `#fff` to `#09090B` (near-black) OR invert the badge to a dark background. Contrast ratio currently ~1.05:1; WCAG AA needs ≥4.5:1.
- Evidence: `background: linear-gradient(135deg, #e4e4e7, #ffffff); color: #fff` on the pricing-card "Most popular" badge.

---

## HIGH

### H1. Hero stat labels fail WCAG AA contrast (4.2:1 on `.hero-stat-label`)
- Source: `wp-theme/neotechnology/style.css:250` — `color: rgba(255,255,255,0.38)` on `#09090B`
- Fix: Raise opacity to ≥0.50 (~`#808082`). Same affects `.panel-status span` (line 284) and `.step-number` eyebrow labels.

### H2. Hero stats 4-column grid does not reflow at 360 — text truncated
- Source: `wp-theme/neotechnology/style.css:241-244`
- Fix: `@media (max-width: 640px) { .hero-stats { grid-template-columns: repeat(2,1fr); } }`. Each column at 360 is ~65 px and truncates labels like "Automation templates".

### H3. Hamburger button missing `aria-expanded` — open/closed state not announced
- Source: `wp-theme/neotechnology/header.php:36-38` and `wp-theme/neotechnology/page-arabic.php:140-142`
- Fix: Add `aria-expanded="false"` and toggle in `main.js` alongside the `open` class. Also add `aria-controls="mobile-menu"`. WCAG 4.1.2.

### H4. No `<header>` landmark in EN template — banner landmark entirely absent
- Source: `wp-theme/neotechnology/header.php:1-50` (51-line file has no `<header>` element)
- Fix: Wrap the `<nav>` in `<header role="banner">` (or just `<header>`).

### H5. CTA arrows (`→` / `←`) are raw Unicode with no accessible label
- Source: `wp-theme/neotechnology/front-page.php:127`, `wp-theme/neotechnology/page-arabic.php:278, 351, 409`, AND `page-arabic.php:153` ("ابدأ الآن ←" — arrow points the wrong direction in RTL)
- Fix: Wrap arrows in `<span aria-hidden="true">` and ensure RTL versions point right (or use a CSS `transform: scaleX(-1)`).

### H6. Terminal panel input has no accessible label — `type="text"` with placeholder only
- Source: `wp-theme/neotechnology/front-page.php:70-78` — `<input id="terminal-input" placeholder="type a command…">`
- Fix: Add `aria-label="Terminal command input"` (EN/AR variants). Placeholder disappears on focus; fails WCAG 1.3.1 + 3.3.2.

---

## MEDIUM

### M1. WooCommerce + Jetpack + Reddit/Snap pixels enqueue on legal pages — ~180 KB waste
- Source: `wp-theme/neotechnology/functions.php:16-19`
- Fix: Add `is_page(['privacy-policy','terms-of-service'])` check in a custom `wp_enqueue_scripts` hook with priority 20 to dequeue `wc-*`, `jetpack-*`, and pixel scripts on those pages.

### M2. RTL Arabic accordion chevron doesn't mirror — points same direction as LTR
- Source: `wp-theme/neotechnology/page-arabic.php:608` (`<polyline points="6 9 12 15 18 9">`) — RTL overrides at lines 74-75 reverse trigger flex-direction but don't flip the icon
- Fix: `html[dir="rtl"] .accordion-icon { transform: scaleX(-1); }` in the RTL style block.

### M3. Skip-link target `#content` lands under the 60 px fixed nav — no `scroll-margin-top`
- Source: `wp-theme/neotechnology/header.php:10` (skip link) + `wp-theme/neotechnology/style.css:63` (section padding)
- Fix: Add `#content { scroll-margin-top: 60px; }`. Also confirm `.screen-reader-text:focus` styles are intact.

### M4. 4-column services grid cramped at 768 px — ~160 px columns, dense line-wrap
- Source: `wp-theme/neotechnology/style.css:307-313`
- Fix: `@media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2,1fr); } }`.

### M5. Lang-toggle `aria-label` is English on a control that switches TO Arabic
- Source: `wp-theme/neotechnology/header.php:34` — `aria-label="Arabic version"` on `<a>عر</a>`
- Fix: Change to `aria-label="النسخة العربية"` or bilingual `aria-label="Arabic version — النسخة العربية"`.

---

## LOW

### L1. Accordion items lack `aria-controls` + `aria-expanded` — state not communicated
- Source: `wp-theme/neotechnology/front-page.php:454-461` + `wp-theme/neotechnology/js/main.js:32-46`
- Fix: Add `aria-expanded="false"` per button, generate unique IDs on `.accordion-body` divs, add `aria-controls`, update `aria-expanded` in the click handler. WCAG 4.1.2.

### L2. Email + EIN rendered as plain text — not tappable on mobile
- Source: `wp-theme/neotechnology/front-page.php:511-514` (and `page-arabic.php:662`)
- Fix: Wrap `hello@neotechnology.solutions` in `<a href="mailto:hello@neotechnology.solutions">…</a>`.

---

## Summary

NTSLLC's terminal-aesthetic theme is structurally sound at the visual level but accumulates a tight cluster of accessibility, RTL, and semantic issues. The single highest-leverage finding is **B2** (Arabic `lang` attribute getting overwritten by `wp_head()`): it's why `arabic-360-en.png` and `arabic-360-ar.png` are pixel-identical — the locale param doesn't actually change anything in the browser. Fixing this with a `language_attributes` filter unblocks the entire Arabic-locale experience and resolves the duplicate-`lang`-attribute bug too.

The second pattern is **landmark/role misuse**: `<nav role="banner">` on header.php:12 + page-arabic.php:126 (B1), no `<header>` in EN (H4), and missing `aria-expanded` on the hamburger (H3) collectively break screen-reader landmark navigation. All four are 1-2 line fixes.

Color contrast is the third theme: B3 (invisible "Most popular" badge) and H1 (hero-stat-label opacity below AA threshold) fail WCAG.

Mobile reflow (H2 hero stats, M4 services grid) shows the desktop-first design didn't shrink past 768 cleanly.

No findings here required a theme rewrite — every item is a targeted CSS/PHP edit.
