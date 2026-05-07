<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<nav class="site-nav" id="site-nav">
  <div class="nav-inner">
    <a href="<?= esc_url(home_url('/')) ?>" class="nav-logo">
      Neo<span>Technology</span>
    </a>

<?php
$home   = esc_url(home_url('/'));
$is_front = is_front_page();
function neo_anchor($anchor) {
    global $is_front, $home;
    return $is_front ? '#' . $anchor : $home . '#' . $anchor;
}
?>
    <ul class="nav-links">
      <li><a href="<?= neo_anchor('services') ?>">Services</a></li>
      <li><a href="<?= neo_anchor('process') ?>">Process</a></li>
      <li><a href="<?= neo_anchor('pricing') ?>">Pricing</a></li>
      <li><a href="<?= neo_anchor('about') ?>">About</a></li>
      <li><a href="<?= neo_anchor('faq') ?>">FAQ</a></li>
      <li><a href="<?= neo_anchor('contact') ?>" class="nav-cta">Get started</a></li>
    </ul>

    <button class="nav-hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="mobile-menu" id="mobile-menu">
  <a href="<?= neo_anchor('services') ?>">Services</a>
  <a href="<?= neo_anchor('process') ?>">Process</a>
  <a href="<?= neo_anchor('pricing') ?>">Pricing</a>
  <a href="<?= neo_anchor('about') ?>">About</a>
  <a href="<?= neo_anchor('faq') ?>">FAQ</a>
  <a href="<?= neo_anchor('contact') ?>">Get started →</a>
</div>
