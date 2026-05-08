<?php
defined('ABSPATH') || exit;

const NEO_DB_VERSION = '2.0.0';

function neo_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form','comment-form','comment-list','gallery','caption']);
    neo_maybe_upgrade_db();
}
add_action('after_setup_theme', 'neo_setup');

function neo_enqueue() {
    wp_enqueue_style('neo-style', get_stylesheet_uri(), [], '1.0.0');
    wp_enqueue_script('neo-main', get_template_directory_uri() . '/js/main.js', [], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'neo_enqueue');

function neo_register_menus() {
    register_nav_menus(['primary' => 'Primary Navigation']);
}
add_action('init', 'neo_register_menus');

/* ── Contact form handler ── */
function neo_handle_contact() {
    $nonce = isset($_POST['neo_contact_nonce'])
        ? sanitize_text_field(wp_unslash($_POST['neo_contact_nonce']))
        : '';
    if (!wp_verify_nonce($nonce, 'neo_contact')) {
        return;
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
    $site_email = get_option('admin_email');

    $to      = $site_email;
    $subject = sprintf('New contact from %s — NeoTechnology Solutions', $clean_name);
    $body    = "Name: {$clean_name}\nEmail: {$email}\nCompany: {$company}\nMarket: {$market}\nStage: {$stage}\n\n{$message}";
    $headers = [
        'From: NeoTechnology Solutions <' . $site_email . '>',
        'Reply-To: ' . $clean_name . ' <' . $email . '>',
        'Content-Type: text/plain; charset=UTF-8',
    ];

    wp_mail($to, $subject, $body, $headers);

    global $wpdb;
    $wpdb->insert(
        $wpdb->prefix . 'nts_contacts',
        [
            'name'       => $clean_name,
            'email'      => $email,
            'company'    => $company,
            'market'     => $market,
            'stage'      => $stage,
            'message'    => $message,
            'ip_address' => isset($_SERVER['REMOTE_ADDR'])
                ? substr(sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])), 0, 45)
                : '',
            'user_agent' => isset($_SERVER['HTTP_USER_AGENT'])
                ? substr(sanitize_text_field(wp_unslash($_SERVER['HTTP_USER_AGENT'])), 0, 500)
                : '',
            'status'     => 'new',
        ],
        ['%s','%s','%s','%s','%s','%s','%s','%s','%s']
    );

    $referer = wp_get_referer();
    $target  = $referer ? add_query_arg('sent', '1', $referer) : home_url('/');
    wp_safe_redirect($target);
    exit;
}
add_action('admin_post_nopriv_neo_contact', 'neo_handle_contact');
add_action('admin_post_neo_contact',        'neo_handle_contact');

/**
 * Schema for {$wpdb->prefix}nts_contacts. Single source of truth.
 * Mirrors the columns/indexes in nts_schema.sql so the SQL file becomes
 * a documentation artifact, not a divergent runtime path.
 */
function neo_install_schema() {
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
 * Idempotent migration runner. Re-runs dbDelta whenever NEO_DB_VERSION bumps.
 * Replaces the old after_switch_theme hook so re-deploys upgrade the schema.
 */
function neo_maybe_upgrade_db() {
    if (get_option('nts_db_version') !== NEO_DB_VERSION) {
        neo_install_schema();
        update_option('nts_db_version', NEO_DB_VERSION);
    }
}
