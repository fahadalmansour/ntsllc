<?php
defined('ABSPATH') || exit;

const NTS_DB_VERSION           = '2.0.0';
const NTS_CONTACT_RATE_WINDOW  = 60; // seconds between submissions per IP

function nts_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form','comment-form','comment-list','gallery','caption']);
    load_theme_textdomain('neotechnology', get_template_directory() . '/languages');
    nts_maybe_upgrade_db();
}
add_action('after_setup_theme', 'nts_setup');

function nts_enqueue() {
    wp_enqueue_style('nts-style', get_stylesheet_uri(), [], '1.0.0');
    wp_enqueue_script('nts-main', get_template_directory_uri() . '/js/main.js', [], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'nts_enqueue');

function nts_register_menus() {
    register_nav_menus(['primary' => __('Primary Navigation', 'neotechnology')]);
}
add_action('init', 'nts_register_menus');

/* ── Contact form handler ── */
function nts_handle_contact() {
    $nonce = isset($_POST['nts_contact_nonce'])
        ? sanitize_text_field(wp_unslash($_POST['nts_contact_nonce']))
        : '';
    if (!wp_verify_nonce($nonce, 'nts_contact')) {
        return;
    }

    // Honeypot: hidden field must be empty. Bots fill every input; humans never see it.
    if (!empty($_POST['nts_hp_url'])) {
        wp_safe_redirect(home_url('/?sent=1'));
        exit;
    }

    // Per-IP rate limit via transient. Silent success on throttle to avoid threshold probing.
    $ip = isset($_SERVER['REMOTE_ADDR'])
        ? substr(sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])), 0, 45)
        : '';
    if ($ip !== '') {
        $rate_key = 'nts_contact_rl_' . md5($ip);
        if (get_transient($rate_key)) {
            wp_safe_redirect(home_url('/?sent=1'));
            exit;
        }
        set_transient($rate_key, 1, NTS_CONTACT_RATE_WINDOW);
    }

    $name    = isset($_POST['name'])    ? sanitize_text_field(wp_unslash($_POST['name']))         : '';
    $email   = isset($_POST['email'])   ? sanitize_email(wp_unslash($_POST['email']))             : '';
    $company = isset($_POST['company']) ? sanitize_text_field(wp_unslash($_POST['company']))      : '';
    $market  = isset($_POST['market'])  ? sanitize_text_field(wp_unslash($_POST['market']))       : '';
    $stage   = isset($_POST['stage'])   ? sanitize_text_field(wp_unslash($_POST['stage']))        : '';
    $message = isset($_POST['message']) ? sanitize_textarea_field(wp_unslash($_POST['message'])) : '';

    if (!$name || !is_email($email) || !$message) {
        wp_die(esc_html__('Please fill in all required fields.', 'neotechnology'));
    }

    $clean_name = preg_replace('/[\r\n]+/', ' ', $name);
    $display    = '"' . str_replace(['"', '<', '>'], '', $clean_name) . '"';
    $site_email = get_option('admin_email');
    $brand      = __('NeoTechnology Solutions', 'neotechnology');

    $to      = $site_email;
    /* translators: %s: visitor display name. */
    $subject = sprintf(__('New contact from %s — NeoTechnology Solutions', 'neotechnology'), $clean_name);
    $body    = "Name: {$clean_name}\nEmail: {$email}\nCompany: {$company}\nMarket: {$market}\nStage: {$stage}\n\n{$message}";
    $headers = [
        'From: ' . $brand . ' <' . $site_email . '>',
        'Reply-To: ' . $display . ' <' . $email . '>',
        'Content-Type: text/plain; charset=UTF-8',
    ];

    wp_mail($to, $subject, $body, $headers);

    global $wpdb;
    $inserted = $wpdb->insert(
        $wpdb->prefix . 'nts_contacts',
        [
            'name'       => $clean_name,
            'email'      => $email,
            'company'    => $company,
            'market'     => $market,
            'stage'      => $stage,
            'message'    => $message,
            'ip_address' => $ip,
            'user_agent' => isset($_SERVER['HTTP_USER_AGENT'])
                ? substr(sanitize_text_field(wp_unslash($_SERVER['HTTP_USER_AGENT'])), 0, 500)
                : '',
            'status'     => 'new',
        ],
        ['%s','%s','%s','%s','%s','%s','%s','%s','%s']
    );

    if (false === $inserted) {
        error_log('[neotechnology] nts_contacts insert failed: ' . $wpdb->last_error);
    }

    $referer = wp_get_referer();
    $target  = $referer ? add_query_arg('sent', '1', $referer) : home_url('/');
    wp_safe_redirect($target);
    exit;
}
add_action('admin_post_nopriv_nts_contact', 'nts_handle_contact');
add_action('admin_post_nts_contact',        'nts_handle_contact');

/**
 * Schema for {$wpdb->prefix}nts_contacts. Single source of truth.
 * Mirrors the columns/indexes in nts_schema.sql so the SQL file becomes
 * a documentation artifact, not a divergent runtime path.
 */
function nts_install_schema() {
    global $wpdb;

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';

    $table   = $wpdb->prefix . 'nts_contacts';
    $charset = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE {$table} (
        id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        name        VARCHAR(200)    NOT NULL,
        email       VARCHAR(254)    NOT NULL,
        company     VARCHAR(200)    NOT NULL DEFAULT '',
        market      VARCHAR(100)    NOT NULL DEFAULT '',
        stage       VARCHAR(100)    NOT NULL DEFAULT '',
        message     TEXT            NOT NULL,
        ip_address  VARCHAR(45)     NOT NULL DEFAULT '',
        user_agent  VARCHAR(500)    NOT NULL DEFAULT '',
        status      VARCHAR(20)     NOT NULL DEFAULT 'new',
        created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        KEY idx_email      (email),
        KEY idx_status     (status),
        KEY idx_created_at (created_at)
    ) {$charset};";

    dbDelta($sql);
}

/**
 * Idempotent migration runner. Re-runs dbDelta whenever NTS_DB_VERSION bumps.
 */
function nts_maybe_upgrade_db() {
    if (get_option('nts_db_version') !== NTS_DB_VERSION) {
        nts_install_schema();
        update_option('nts_db_version', NTS_DB_VERSION);
    }
}
