<footer class="site-footer">
  <div class="container">

    <div class="footer-grid">
      <div class="footer-col">
        <div class="footer-brand-logo">Neo<span>Technology</span></div>
        <p class="footer-brand-desc">
          A Wyoming LLC delivering full-stack e-commerce infrastructure for GCC and US merchants. One contract. One point of accountability.
        </p>
      </div>

      <div class="footer-col">
        <div class="footer-col-title">Services</div>
        <ul>
          <li><a href="#services">Store Setup</a></li>
          <li><a href="#services">Payment Solutions</a></li>
          <li><a href="#services">Workflow Automation</a></li>
          <li><a href="#services">Domain &amp; Hosting</a></li>
          <li><a href="#services">AI Consulting</a></li>
          <li><a href="#services">Freelance Brokerage</a></li>
          <li><a href="#services">Quick-Fix Support</a></li>
          <li><a href="#services">Communication Suite</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <div class="footer-col-title">Company</div>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <div class="footer-col-title">Legal</div>
        <ul>
          <li><a href="<?= esc_url(home_url('/privacy-policy/')) ?>">Privacy Policy</a></li>
          <li><a href="<?= esc_url(home_url('/terms-of-service/')) ?>">Terms of Service</a></li>
          <li><a href="<?= esc_url(home_url('/refund-policy/')) ?>">Refund Policy</a></li>
          <li><a href="<?= esc_url(home_url('/sla/')) ?>">SLA</a></li>
          <li><a href="<?= esc_url(home_url('/cookie-policy/')) ?>">Cookies</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-copy">
        © <?= date('Y') ?> NeoTechnology Solutions LLC.<br>
        A Wyoming limited liability company, United States. EIN 36-5148912.
      </p>
      <p class="footer-partner-note">
        Regional partner: Fahad Saad Fahad Almansour Office for Electronic Services — independent honorary partner, Saudi Arabia. NeoTechnology Solutions LLC and the Almansour Office are separate legal entities.
      </p>
    </div>

  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
