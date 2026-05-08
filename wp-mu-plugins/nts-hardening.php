<?php
/**
 * Plugin Name: NTS — Hardening
 * Description: Reduces public attack surface — blocks user enumeration,
 *              hides version metadata, removes user sitemap, sets SameSite
 *              on auth cookies, disables XML-RPC at the PHP layer.
 * Version:     1.0.0
 * Author:      NeoTechnology Solutions
 *
 * Closes the following items in
 * ~/.claude/reports/ntsllc/readiness-2026-05-08.md:
 *  - HIGH: /?author=1 -> /author/<slug>/ exposes admin slug.
 *  - HIGH: wp-json/wp/v2/users returns user list to unauthenticated.
 *  - HIGH: User sitemap exposes admin slug.
 *  - HIGH: xmlrpc.php reachable (this is the PHP-layer half;
 *          the htaccess block in htaccess-snippet.partial is the other half).
 *  - MEDIUM: WP/WC generator meta tag exposes versions.
 *  - MEDIUM: wp-login.php cookie missing SameSite.
 */

defined('ABSPATH') || exit;

/**
 * 1. Kill ?author=N enumeration.
 *    /?author=1 -> WP rewrites to /author/<slug>/ which leaks the admin
 *    username. We 404 the request before the redirect can leak.
 */
function nts_block_author_enumeration() {
    if (is_admin()) return;
    if (isset($_GET['author']) && is_numeric($_GET['author'])) {
        status_header(404);
        nocache_headers();
        if (function_exists('wp_safe_redirect')) {
            // Send to homepage with no hint about why.
            wp_safe_redirect(home_url('/'), 302);
            exit;
        }
        exit;
    }
}
add_action('template_redirect', 'nts_block_author_enumeration', 1);

/**
 * 2. Strip user routes from the REST API for unauthenticated requests.
 *    Logged-in users still see them (admin needs them for the editor).
 */
function nts_strip_rest_users_for_unauth($endpoints) {
    if (is_user_logged_in()) {
        return $endpoints;
    }
    foreach (['/wp/v2/users', '/wp/v2/users/(?P<id>[\d]+)'] as $route) {
        if (isset($endpoints[$route])) {
            unset($endpoints[$route]);
        }
    }
    return $endpoints;
}
add_filter('rest_endpoints', 'nts_strip_rest_users_for_unauth');

/**
 * 3. Strip generator metas + version query strings on assets.
 *    Reduces fingerprinting fuel for vuln scanners.
 */
remove_action('wp_head', 'wp_generator');
add_filter('the_generator', '__return_empty_string');

function nts_strip_version_query($src) {
    if (!$src) return $src;
    return remove_query_arg('ver', $src);
}
add_filter('style_loader_src',  'nts_strip_version_query', 9999);
add_filter('script_loader_src', 'nts_strip_version_query', 9999);

/**
 * 4. Drop the `users` sitemap provider entirely so /wp-sitemap-users-*.xml
 *    no longer indexes the admin slug.
 */
function nts_disable_users_sitemap($provider, $name) {
    if ($name === 'users') {
        return false;
    }
    return $provider;
}
add_filter('wp_sitemaps_add_provider', 'nts_disable_users_sitemap', 10, 2);

/**
 * 5. Disable XML-RPC at the PHP layer (htaccess block is the
 *    real defense; this is belt + suspenders in case htaccess
 *    is reset by a host migration or plugin).
 */
add_filter('xmlrpc_enabled',          '__return_false');
add_filter('xmlrpc_methods',          '__return_empty_array');
add_filter('pre_update_option_enable_xmlrpc', '__return_false');
remove_action('wp_head', 'rsd_link');                // RSD link advertises xmlrpc
remove_action('wp_head', 'wlwmanifest_link');        // Windows Live Writer manifest

/**
 * 6. SameSite=Lax on auth cookies. WP doesn't set SameSite by default;
 *    PHP 7.3+ supports the array signature for setcookie(). Host runs
 *    8.4 per audit so safe.
 *
 * We re-issue WP's cookies with the same name/value/expiry but extra
 * `samesite` attribute by hooking after WP sets them.
 */
function nts_samesite_auth_cookies($logged_in_cookie, $expire, $expiration, $user_id, $scheme) {
    nts_resend_cookie(LOGGED_IN_COOKIE, $logged_in_cookie, $expire);
}
add_action('set_logged_in_cookie', 'nts_samesite_auth_cookies', 10, 5);

function nts_samesite_auth_cookie($auth_cookie, $expire, $expiration, $user_id, $scheme) {
    $cookie_name = $scheme === 'secure_auth' ? SECURE_AUTH_COOKIE : AUTH_COOKIE;
    nts_resend_cookie($cookie_name, $auth_cookie, $expire);
}
add_action('set_auth_cookie', 'nts_samesite_auth_cookie', 10, 5);

function nts_resend_cookie($name, $value, $expire) {
    if (headers_sent()) return; // already too late; cookie was set with default SameSite

    $cookie_options = [
        'expires'  => $expire,
        'path'     => COOKIEPATH ?: '/',
        'domain'   => COOKIE_DOMAIN ?: '',
        'secure'   => is_ssl(),
        'httponly' => true,
        'samesite' => 'Lax',
    ];
    setcookie($name, $value, $cookie_options);
}
