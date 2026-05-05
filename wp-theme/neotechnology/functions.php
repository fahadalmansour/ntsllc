<?php
defined('ABSPATH') || exit;

function neo_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form','comment-form','comment-list','gallery','caption']);
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
    if (!isset($_POST['neo_contact_nonce'])
        || !wp_verify_nonce($_POST['neo_contact_nonce'], 'neo_contact'))
        return;

    $name    = sanitize_text_field($_POST['name'] ?? '');
    $email   = sanitize_email($_POST['email'] ?? '');
    $company = sanitize_text_field($_POST['company'] ?? '');
    $market  = sanitize_text_field($_POST['market'] ?? '');
    $stage   = sanitize_text_field($_POST['stage'] ?? '');
    $message = sanitize_textarea_field($_POST['message'] ?? '');

    if (!$name || !$email || !$message) {
        wp_die('Please fill in all required fields.');
    }

    $to      = get_option('admin_email');
    $subject = "New contact from {$name} — NeoTechnology Solutions";
    $body    = "Name: {$name}\nEmail: {$email}\nCompany: {$company}\nMarket: {$market}\nStage: {$stage}\n\n{$message}";
    $headers = ["From: {$name} <{$email}>", 'Content-Type: text/plain; charset=UTF-8'];

    wp_mail($to, $subject, $body, $headers);

    global $wpdb;
    $wpdb->insert(
        $wpdb->prefix . 'nts_contacts',
        compact('name','email','company','market','stage','message'),
        ['%s','%s','%s','%s','%s','%s']
    );

    wp_redirect(add_query_arg('sent', '1', wp_get_referer()));
    exit;
}
add_action('admin_post_nopriv_neo_contact', 'neo_handle_contact');
add_action('admin_post_neo_contact',        'neo_handle_contact');

function neo_create_table() {
    global $wpdb;
    $table = $wpdb->prefix . 'nts_contacts';
    if ($wpdb->get_var("SHOW TABLES LIKE '{$table}'") !== $table) {
        $wpdb->query("CREATE TABLE {$table} (
            id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name       VARCHAR(200)  NOT NULL,
            email      VARCHAR(200)  NOT NULL,
            company    VARCHAR(200)  DEFAULT '',
            market     VARCHAR(100)  DEFAULT '',
            stage      VARCHAR(100)  DEFAULT '',
            message    TEXT          NOT NULL,
            created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
        ) {$wpdb->get_charset_collate()}");
    }
}
add_action('after_switch_theme', 'neo_create_table');
