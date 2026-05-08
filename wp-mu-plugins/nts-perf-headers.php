<?php
/**
 * Plugin Name: NTS — Perf & Security Headers
 * Description: Emits standard Cache-Control / security headers and trims the
 *              brochure-homepage payload (dequeues WooCommerce front-end assets
 *              on non-Woo pages, drops jquery-migrate, defers theme JS).
 * Version:     1.0.0
 * Author:      NeoTechnology Solutions
 *
 * Closes the following items in
 * ~/.claude/reports/ntsllc/readiness-2026-05-08.md:
 *  - Site Health "Page cache is not detected" (no standard Cache-Control on
 *    public responses; LSCache only emits x-litespeed-cache-control which
 *    Site Health, browsers, and CDNs ignore).
 *  - HIGH: missing HSTS, X-Content-Type-Options, Referrer-Policy,
 *    X-Frame-Options, Permissions-Policy on /.
 *  - HIGH: over-provisioned plugin stack on a 0-product brochure
 *    (jquery-migrate render-blocking; WC frontend bundles enqueued).
 *
 * NOT addressed here (decided in plan):
 *  - Content-Security-Policy. Needs per-asset enumeration of LiteSpeed-injected
 *    scripts + Google Fonts before we can ship a strict CSP without breaking
 *    the page. A wrong CSP is worse than none. TODO: separate task.
 */

defined('ABSPATH') || exit;

const NTS_PUBLIC_CACHE_TTL = 600; // 10 minutes — long enough to matter, short enough to forgive bad pushes.

/**
 * True iff the current request is safely cacheable as `public`.
 * Skips: admin, logged-in users, non-GET methods, wp-login, form-success bounces.
 */
function nts_is_public_cacheable() {
    if (is_admin())                              return false;
    if (is_user_logged_in())                     return false;
    if (defined('DOING_AJAX') && DOING_AJAX)     return false;
    if (defined('REST_REQUEST') && REST_REQUEST) return false;

    $method = isset($_SERVER['REQUEST_METHOD']) ? strtoupper($_SERVER['REQUEST_METHOD']) : 'GET';
    if ($method !== 'GET' && $method !== 'HEAD') return false;

    $uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
    if (strpos($uri, 'wp-login') !== false)      return false;
    if (strpos($uri, 'wp-cron') !== false)       return false;

    // Form-success bounce: ?sent=1. Force fresh so the success banner renders.
    if (isset($_GET['sent']))                    return false;

    return true;
}

/**
 * Emit standard cache + security headers on every front-end response.
 *
 * Hooked late on `send_headers` so any earlier handler (LSCache, plugins) has
 * already run and our values win for the public cacheable path.
 */
function nts_emit_response_headers() {
    // 1) Security headers — apply to ALL front-end responses (including admin
    //    is_admin path is fine for HSTS/nosniff/referrer; X-Frame-Options
    //    SAMEORIGIN doesn't break wp-admin).
    header('Strict-Transport-Security: max-age=63072000; includeSubDomains; preload');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('X-Frame-Options: SAMEORIGIN');
    header('Permissions-Policy: geolocation=(), microphone=(), camera=(), interest-cohort=()');

    // 2) Cache-Control — only on safely-cacheable public responses.
    if (nts_is_public_cacheable()) {
        header('Cache-Control: public, max-age=' . NTS_PUBLIC_CACHE_TTL . ', s-maxage=' . NTS_PUBLIC_CACHE_TTL . ', stale-while-revalidate=60');
        header('Expires: ' . gmdate('D, d M Y H:i:s', time() + NTS_PUBLIC_CACHE_TTL) . ' GMT');
    } else {
        // Logged-in / admin / form-success → never cache as public.
        header('Cache-Control: private, no-cache, no-store, must-revalidate, max-age=0');
        header('Pragma: no-cache');
        header('Expires: 0');
    }
}
add_action('send_headers', 'nts_emit_response_headers', 9999);

/**
 * Strip jquery-migrate from the front-end. WP loads it as a default
 * dependency for jquery; almost no fresh themes need it.
 */
function nts_dequeue_jquery_migrate($scripts) {
    if (is_admin() || empty($scripts->registered['jquery'])) return;
    $jq = $scripts->registered['jquery'];
    if (!empty($jq->deps)) {
        $jq->deps = array_diff($jq->deps, ['jquery-migrate']);
    }
}
add_action('wp_default_scripts', 'nts_dequeue_jquery_migrate');

/**
 * Dequeue WooCommerce frontend bundles on every page that isn't a Woo
 * surface. The site is a brochure today (0 products per Woo MCP); the
 * homepage was carrying ~80–120 KB of WC layout/general/smallscreen CSS
 * and the cart-fragments AJAX poller for nothing.
 */
function nts_dequeue_woocommerce_assets() {
    if (!class_exists('WooCommerce')) return;

    $is_woo_surface =
        (function_exists('is_woocommerce') && is_woocommerce())
        || (function_exists('is_cart')        && is_cart())
        || (function_exists('is_checkout')    && is_checkout())
        || (function_exists('is_account_page')&& is_account_page());

    if ($is_woo_surface) return;

    $handles = [
        'woocommerce-layout',
        'woocommerce-general',
        'woocommerce-smallscreen',
        'wc-blocks-style',
        'wc-blocks-vendors-style',
        'wc-cart-fragments',
        'wc-add-to-cart',
        'woocommerce-inline',
    ];
    foreach ($handles as $h) {
        wp_dequeue_style($h);
        wp_deregister_style($h);
        wp_dequeue_script($h);
        wp_deregister_script($h);
    }
}
add_action('wp_enqueue_scripts', 'nts_dequeue_woocommerce_assets', 99);

/**
 * Add `defer` to the theme's main JS handle. Non-critical: the page renders
 * before nts-main (terminal animation, mobile menu, accordion) attaches.
 */
function nts_defer_theme_js($tag, $handle) {
    if ($handle === 'nts-main' && strpos($tag, ' defer') === false) {
        return str_replace(' src=', ' defer src=', $tag);
    }
    return $tag;
}
add_filter('script_loader_tag', 'nts_defer_theme_js', 10, 2);
