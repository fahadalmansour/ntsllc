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

    <ul class="nav-links">
      <li><a href="#services">Services</a></li>
      <li><a href="#process">Process</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li><a href="#contact" class="nav-cta">Get started</a></li>
    </ul>

    <button class="nav-hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="mobile-menu" id="mobile-menu">
  <a href="#services">Services</a>
  <a href="#process">Process</a>
  <a href="#pricing">Pricing</a>
  <a href="#about">About</a>
  <a href="#faq">FAQ</a>
  <a href="#contact">Get started →</a>
</div>
