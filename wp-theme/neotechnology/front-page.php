<?php get_header(); ?>

<!-- ══ HERO ═══════════════════════════════════════════════════════════════ -->
<section class="hero" id="hero">
  <div class="container">
    <div class="hero-inner">

      <!-- Left: headline -->
      <div class="">
        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          <span class="hero-badge-text">Online · Wyoming LLC · NeoTechnology Solutions</span>
        </div>

        <h1 class="hero-title">
          The complete<br>
          <em>e-commerce</em><br>
          technology partner
        </h1>

        <p class="hero-sub">
          From first store setup to advanced workflow automation — NeoTechnology Solutions delivers every layer of technical infrastructure GCC and US merchants need.
        </p>

        <div class="hero-actions">
          <a href="#pricing" class="btn btn-primary">View pricing</a>
          <a href="#services" class="btn btn-ghost">Explore services</a>
        </div>

        <div class="hero-stats">
          <div>
            <div class="hero-stat-val">6,000+</div>
            <div class="hero-stat-label">Automation templates</div>
          </div>
          <div>
            <div class="hero-stat-val">8+</div>
            <div class="hero-stat-label">Payment gateways</div>
          </div>
          <div>
            <div class="hero-stat-val">7 days</div>
            <div class="hero-stat-label">First staging</div>
          </div>
          <div>
            <div class="hero-stat-val">GCC+US</div>
            <div class="hero-stat-label">Active markets</div>
          </div>
        </div>
      </div>

      <!-- Right: terminal panel -->
      <div class="hero-panel">
        <div class="panel-bar">
          <div class="panel-dots">
            <div class="panel-dot panel-dot-r"></div>
            <div class="panel-dot panel-dot-y"></div>
            <div class="panel-dot panel-dot-g"></div>
          </div>
          <span class="panel-title">neo@deployment-terminal</span>
          <span class="panel-title">neotechnology.solutions</span>
        </div>
        <div class="panel-body">
          <div class="panel-line cmd">$ neotech init --platform=production</div>
          <div class="panel-line ok">✓  store-setup ............ ready</div>
          <div class="panel-line ok">✓  payment-gateways ....... 8+ active</div>
          <div class="panel-line ok">✓  automation ............. 6,000+ templates</div>
          <div class="panel-line ok">✓  markets ................ US + GCC online</div>
          <div class="panel-line dim">————————————————————————————</div>
          <div class="panel-line ok">STATUS: READY FOR DEPLOYMENT</div>
        </div>
        <div class="panel-status">
          <span>● READY</span>
          <span>neotechnology.solutions</span>
          <span>Wyoming LLC</span>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══ SERVICES ══════════════════════════════════════════════════════════ -->
<section class="services section-pad" id="services">
  <div class="container">

    <div class="services-header">
      <div class="eyebrow">
        <span class="eyebrow-dot" style="background:rgba(255,255,255,0.3)"></span>
        Services
      </div>
      <h2 class="section-title">Eight services.<br>One platform. Zero complexity.</h2>
      <p class="section-sub">Stop assembling your tech stack from a dozen vendors. Every layer of e-commerce infrastructure under one roof.</p>
    </div>

    <div class="services-grid">
      <?php
      $services = [
        ['01','Store Setup & Integration',  'Custom builds on Shopify, WooCommerce, Salla, Zid, and Wuilt — bilingual themes, SSL, and full payment gateway integration.'],
        ['02','Payment Solutions',           'Native support for Mada, STC Pay, Apple Pay, Tap, HyperPay, PayTabs, Moyasar, and Stripe — every major method, GCC and US.'],
        ['03','Workflow Automation',         'Managed n8n hosting with 6,000+ ready templates — invoicing, inventory sync, abandoned cart recovery, WhatsApp notifications.'],
        ['04','Domain & Hosting',            'Domain registration, professional email, SSL, and VPS hosting through GoDaddy and Enom — managed from a single dashboard.'],
        ['05','AI-Powered Consulting',       'Built on Claude Agent SDK and the Model Context Protocol — generate BRDs, automation flows, and compliant legal templates.'],
        ['06','Freelance Brokerage',         'A vetted developer and designer network, managed end-to-end with escrow protection and full quality assurance.'],
        ['07','Quick-Fix Support',           'On-demand help for SSL, performance tuning, plugin conflicts, and DNS — at fixed, transparent prices. $99–$299.'],
        ['08','Communication Suite',         'Email (SendGrid/Resend), SMS (Twilio), WhatsApp Business API, and social posting — integrated into your dashboard.'],
      ];
      foreach ($services as [$num, $title, $desc]):
      ?>
      <div class="service-card">
        <div class="service-num"><?= esc_html($num) ?></div>
        <h3 class="service-title"><?= esc_html($title) ?></h3>
        <p class="service-desc"><?= esc_html($desc) ?></p>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="services-footer">
      <a href="#contact" class="btn btn-ghost" style="display:inline-flex">View all services →</a>
    </div>

  </div>
</section>

<!-- ══ WHY NEOTECHNOLOGY ══════════════════════════════════════════════════ -->
<section class="why section-pad" id="why">
  <div class="container">
    <div class="why-layout">

      <div class="why-left">
        <div class="eyebrow"><span class="eyebrow-dot"></span>Why us</div>
        <h2 class="section-title">Built for merchants who refuse to compromise</h2>
        <p class="section-sub">Four principles we never trade away — no matter the project size.</p>
      </div>

      <div class="why-grid">
        <?php
        $whys = [
          ['01','US-incorporated structure',  'A Wyoming LLC framework gives every engagement the predictability of US contract law, clear IP protection, and transparent governance.'],
          ['02','E-commerce native',           'Every line of code, every workflow, every integration is built specifically for online stores — Shopify, WooCommerce, Salla, Zid, and beyond.'],
          ['03','Transparent pricing',         'Fixed-price packages starting at $999. No hourly billing, no surprise fees, no vendor lock-in. You see the price before you commit.'],
          ['04','AI-native operations',        'Powered by Claude Agent SDK and MCP, our automation turns multi-step setup into one-click workflows — and keeps getting smarter as you scale.'],
        ];
        foreach ($whys as [$num, $title, $body]):
        ?>
        <div class="why-card">
          <div class="why-num"><?= esc_html($num) ?></div>
          <h3 class="why-card-title"><?= esc_html($title) ?></h3>
          <p class="why-card-body"><?= esc_html($body) ?></p>
        </div>
        <?php endforeach; ?>
      </div>

    </div>
  </div>
</section>

<!-- ══ PROCESS ════════════════════════════════════════════════════════════ -->
<section class="process section-pad" id="process">
  <div class="container">

    <div class="process-header">
      <div class="eyebrow" style="color:rgba(255,255,255,0.4)">
        <span class="eyebrow-dot" style="background:rgba(255,255,255,0.3)"></span>
        How it works
      </div>
      <h2 class="section-title">A clear process, every time</h2>
      <p class="section-sub">Six steps from first conversation to long-term partnership.</p>
    </div>

    <div class="process-steps">
      <?php
      $steps = [
        ['STEP 01','Discovery',  'Free 30-minute scoping call. No sales pressure, just an honest conversation about your goals.'],
        ['STEP 02','Proposal',   'Fixed pricing and exact deliverables delivered within one business day.'],
        ['STEP 03','Kickoff',    '50% deposit + signed agreement. Shared project workspace opens immediately.'],
        ['STEP 04','Build',      'Staging environment you can access from day one. Weekly written updates throughout.'],
        ['STEP 05','Launch',     'Deploy to production after your explicit approval. Final invoice triggered on launch.'],
        ['STEP 06','Support',    'Defined support window included in every package. Quick-fix or maintenance after that.'],
      ];
      foreach ($steps as [$num, $title, $desc]):
      ?>
      <div class="process-step">
        <div class="step-number"><?= esc_html($num) ?></div>
        <h3 class="step-title"><?= esc_html($title) ?></h3>
        <p class="step-desc"><?= esc_html($desc) ?></p>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="process-cta">
      <a href="#contact" class="btn btn-ghost" style="display:inline-flex">Book a free scoping call →</a>
    </div>

  </div>
</section>

<!-- ══ TECHNOLOGY / INTEGRATIONS ═════════════════════════════════════════ -->
<section class="tech section-pad" id="technology">
  <div class="container">

    <div class="tech-header">
      <div class="eyebrow"><span class="eyebrow-dot"></span>Integrations</div>
      <h2 class="section-title">Every platform your business already uses</h2>
    </div>

    <div class="tech-pill-wrap">
      <?php
      $platforms = [
        'Shopify','WooCommerce','Salla','Zid','Wuilt',
        'Stripe','Tap Payments','HyperPay','PayTabs','Moyasar',
        'Mada','STC Pay','Apple Pay','n8n','SendGrid',
        'Resend','Twilio','WhatsApp Business','Google Workspace',
        'GoDaddy','Enom','Cloudflare','Claude SDK','WordPress',
      ];
      foreach ($platforms as $p) {
        echo '<span class="tech-pill">' . esc_html($p) . '</span>';
      }
      ?>
    </div>

    <div class="tech-stats">
      <div class="tech-stat"><div class="tech-stat-val">6,000+</div><div class="tech-stat-label">Automation templates</div></div>
      <div class="tech-stat"><div class="tech-stat-val">8+</div><div class="tech-stat-label">Payment gateways</div></div>
      <div class="tech-stat"><div class="tech-stat-val">24</div><div class="tech-stat-label">Platforms integrated</div></div>
      <div class="tech-stat"><div class="tech-stat-val">2</div><div class="tech-stat-label">Markets (GCC + US)</div></div>
    </div>

  </div>
</section>

<!-- ══ GUARANTEES ════════════════════════════════════════════════════════ -->
<section class="guarantees section-pad" id="guarantees">
  <div class="container">
    <div class="guarantees-layout">

      <div class="guarantees-left">
        <div class="eyebrow"><span class="eyebrow-dot" style="background:rgba(255,255,255,0.3)"></span>Our commitment</div>
        <h2 class="section-title">Built on trust. Proven by results.</h2>
        <p class="section-sub">Client testimonials are added as projects complete. Here is exactly what every engagement guarantees.</p>

        <div class="stat-grid">
          <div class="stat-cell"><div class="stat-val">7</div><div class="stat-label">Days to first staging</div></div>
          <div class="stat-cell"><div class="stat-val">50%</div><div class="stat-label">Deposit to start</div></div>
          <div class="stat-cell"><div class="stat-val">$0</div><div class="stat-label">Surprise fees</div></div>
          <div class="stat-cell"><div class="stat-val">100%</div><div class="stat-label">IP transferred to you</div></div>
        </div>

        <div style="margin-top:32px">
          <a href="#contact" class="btn btn-outline-indigo" style="display:inline-flex">Book a free call →</a>
        </div>
      </div>

      <div class="guarantee-cards">
        <?php
        $gs = [
          ['✓','Fixed-price contract',   'You see the exact price before signing. No hourly billing, no scope creep charges, no renegotiation.'],
          ['⌘','Staging from day one',   'Access a live staging environment from week one and review every build increment before it goes live.'],
          ['◈','Full IP ownership',      'Every line of code and every asset transfers to you on final payment — no lock-in, no licensing fees.'],
          ['◷','30-day support included','Post-launch support window included in every package. No asterisks, no add-on fee required.'],
        ];
        foreach ($gs as [$icon, $title, $body]):
        ?>
        <div class="guarantee-card">
          <div class="guarantee-icon"><?= esc_html($icon) ?></div>
          <h3 class="guarantee-title"><?= esc_html($title) ?></h3>
          <p class="guarantee-body"><?= esc_html($body) ?></p>
        </div>
        <?php endforeach; ?>

        <div class="early-client-card">
          <div class="early-dot"></div>
          <p class="early-client-text">
            <strong>Accepting first clients.</strong> We are actively onboarding early engagements. Your project will be documented and featured here upon completion — with your permission.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══ PRICING ════════════════════════════════════════════════════════════ -->
<section class="pricing section-pad" id="pricing">
  <div class="container">

    <div class="pricing-header">
      <div class="eyebrow"><span class="eyebrow-dot"></span>Pricing</div>
      <h2 class="section-title">Transparent pricing.<br>No surprises.</h2>
      <p class="section-sub">One-time project fees. You see the exact price before committing. No monthly retainers, no hidden extras.</p>
    </div>

    <div class="pricing-grid">

      <div class="pricing-card">
        <div class="pricing-name">Starter</div>
        <div class="pricing-price"><sup>$</sup>999</div>
        <div class="pricing-note">One-time setup fee</div>
        <p class="pricing-sub">For new merchants launching their first store.</p>
        <ul class="pricing-features">
          <li><span class="check">✓</span>Domain + SSL + hosting</li>
          <li><span class="check">✓</span>One payment gateway</li>
          <li><span class="check">✓</span>Custom theme</li>
          <li><span class="check">✓</span>One automation flow</li>
          <li><span class="check">✓</span>30 days of support</li>
        </ul>
        <a href="#contact" class="pricing-cta pricing-cta-outline">Choose Starter</a>
      </div>

      <div class="pricing-card featured">
        <div class="pricing-badge">Most popular</div>
        <div class="pricing-name">Professional</div>
        <div class="pricing-price"><sup>$</sup>2,499</div>
        <div class="pricing-note">One-time setup fee</div>
        <p class="pricing-sub">For growing merchants ready to scale operations.</p>
        <ul class="pricing-features">
          <li><span class="check">✓</span>Everything in Starter</li>
          <li><span class="check">✓</span>Reports dashboard</li>
          <li><span class="check">✓</span>CRM or Sheets integration</li>
          <li><span class="check">✓</span>Dedicated n8n server</li>
          <li><span class="check">✓</span>Three automation flows</li>
        </ul>
        <a href="#contact" class="pricing-cta pricing-cta-primary">Choose Professional</a>
      </div>

      <div class="pricing-card">
        <div class="pricing-name">GCC Special</div>
        <div class="pricing-price"><sup>$</sup>3,499</div>
        <div class="pricing-note">One-time setup fee</div>
        <p class="pricing-sub">For merchants serving Gulf markets.</p>
        <ul class="pricing-features">
          <li><span class="check">✓</span>Mada, Apple Pay, STC Pay</li>
          <li><span class="check">✓</span>Full Arabic localization (RTL)</li>
          <li><span class="check">✓</span>VAT setup (15% / 5%)</li>
          <li><span class="check">✓</span>Three legal consultations</li>
          <li><span class="check">✓</span>Compliance review</li>
        </ul>
        <a href="#contact" class="pricing-cta pricing-cta-outline">Choose GCC</a>
      </div>

      <div class="pricing-card">
        <div class="pricing-name">Enterprise</div>
        <div class="pricing-price" style="font-size:36px;padding-top:6px">Custom</div>
        <div class="pricing-note">Scoped per project</div>
        <p class="pricing-sub">For merchants operating at scale.</p>
        <ul class="pricing-features">
          <li><span class="check">✓</span>Multi-vendor marketplace</li>
          <li><span class="check">✓</span>Advanced reporting</li>
          <li><span class="check">✓</span>Mobile application</li>
          <li><span class="check">✓</span>Dedicated SLA</li>
          <li><span class="check">✓</span>Ongoing maintenance</li>
        </ul>
        <a href="#contact" class="pricing-cta pricing-cta-outline">Talk to sales</a>
      </div>

    </div>

    <p class="pricing-footnote">
      All prices USD · One-time setup fees · Add-ons: managed n8n $149 setup + $15/mo · quick-fix $99–$299
    </p>

  </div>
</section>

<!-- ══ ABOUT ══════════════════════════════════════════════════════════════ -->
<section class="about section-pad" id="about">
  <div class="container">
    <div class="about-layout">

      <div class="about-left">
        <div class="eyebrow"><span class="eyebrow-dot" style="background:rgba(255,255,255,0.3)"></span>About us</div>
        <h2 class="section-title">One contract.<br>One point of accountability.</h2>
        <div class="about-body">
          <p>NeoTechnology Solutions LLC is a US-incorporated technology company, registered in the State of Wyoming. We exist to remove the technical complexity that holds online merchants back.</p>
          <p>Whether you are launching your first Shopify store or scaling a GCC marketplace with Arabic localization and VAT compliance — we deliver the complete technical infrastructure under a single agreement.</p>
          <p>Our team operates across the United States and the Gulf Cooperation Council. Every engagement is governed by US law, priced transparently, and delivered on a fixed timeline.</p>
        </div>
      </div>

      <div class="about-stats">
        <div class="about-stat">
          <div class="about-stat-val">Wyoming</div>
          <div class="about-stat-label">State of incorporation, United States</div>
        </div>
        <div class="about-stat">
          <div class="about-stat-val">GCC + US</div>
          <div class="about-stat-label">Active service markets</div>
        </div>
        <div class="about-stat">
          <div class="about-stat-val">$999</div>
          <div class="about-stat-label">Starting price, fixed-fee packages</div>
        </div>
        <div class="about-stat">
          <div class="about-stat-val">7 days</div>
          <div class="about-stat-label">First staging environment delivered</div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══ FAQ ════════════════════════════════════════════════════════════════ -->
<section class="faq section-pad" id="faq">
  <div class="container">
    <div class="faq-layout">

      <div class="faq-left">
        <div class="eyebrow"><span class="eyebrow-dot"></span>FAQ</div>
        <h2 class="section-title">Common questions, honest answers</h2>
        <p class="section-sub">Everything you need to know before starting a project.</p>

        <div class="faq-cta-box">
          <h4>Still have questions?</h4>
          <p>Book a free 30-minute call — no sales pressure, just answers.</p>
          <a href="#contact" class="btn btn-primary" style="display:inline-flex;font-size:14px;padding:11px 22px">Book a free call</a>
        </div>
      </div>

      <div class="accordion">
        <?php
        $faqs = [
          ['How long does a typical project take?',
           'Starter packages launch in 7–10 business days. Professional packages typically take 3–4 weeks. GCC Special engagements run 4–6 weeks due to localization requirements. Enterprise timelines are scoped individually.'],
          ['Do you work with platforms other than the ones listed?',
           'Yes. While we specialize in Shopify, WooCommerce, Salla, Zid, and Wuilt, we have worked on Magento, BigCommerce, and custom-built stores. Send us your platform details and we will confirm fit.'],
          ['Who owns the code and assets you build?',
           'You do. Every deliverable — code, designs, automation workflows, documentation — transfers to you upon final payment. We retain no ownership and no licensing claims over your work.'],
          ['What happens if something breaks after launch?',
           'Every package includes a defined support window (30 days minimum). After that, you can purchase support as quick-fix tickets ($99–$299) or upgrade to an ongoing maintenance agreement.'],
          ['Do you handle hosting after launch?',
           'Yes, optionally. We offer managed VPS hosting from $5/month and managed n8n automation servers at $149 setup + $15/month. You can also self-host if preferred.'],
          ['How do payments work?',
           '50% deposit to begin, 50% upon final delivery. We accept Stripe (cards, ACH, Apple Pay) and bank wires. Enterprise engagements may use milestone-based billing.'],
          ['Can I see the work before paying the final invoice?',
           'Always. You will have full access to a staging environment from the first week of any engagement. Final payment is only triggered after you have reviewed and approved the deliverables.'],
          ['Do you sign NDAs?',
           'Yes. We sign mutual non-disclosure agreements before any project kickoff that involves sharing confidential business information.'],
          ['What if I am not technical and do not know what I need?',
           'That is exactly who our consulting service is built for. A $299 starter consultation produces a complete requirements document that lays out what you need, why, and what it should cost.'],
          ['Are your prices negotiable?',
           'Our published packages are fixed-price. For Enterprise scope or multi-package commitments, custom pricing is available — schedule a call to discuss.'],
        ];
        foreach ($faqs as $i => [$q, $a]):
        ?>
        <div class="accordion-item">
          <button class="accordion-trigger" data-index="<?= $i ?>">
            <?= esc_html($q) ?>
            <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="accordion-body"><?= esc_html($a) ?></div>
        </div>
        <?php endforeach; ?>
      </div>

    </div>
  </div>
</section>

<!-- ══ REGIONAL PARTNER ═══════════════════════════════════════════════════ -->
<section class="partner section-pad" id="partner">
  <div class="container">
    <div class="partner-layout">

      <div class="partner-left">
        <div class="eyebrow"><span class="eyebrow-dot" style="background:rgba(255,255,255,0.3)"></span>Regional partner</div>
        <h2 class="section-title">On-the-ground presence in Saudi Arabia</h2>
        <p class="section-sub">For clients operating in the Kingdom, we work alongside an independent local partner for relationship management and on-ground engagement.</p>
      </div>

      <div class="partner-card">
        <div class="partner-header">
          <div class="partner-icon">SA</div>
          <div>
            <h3 class="partner-name">Fahad Saad Fahad Almansour Office for Electronic Services</h3>
            <div class="partner-tag">
              <span style="width:6px;height:6px;border-radius:50%;background:#4ADE80;display:inline-block"></span>
              Honorary partner · Saudi Arabia
            </div>
          </div>
        </div>
        <p class="partner-body">An independent Saudi-registered office that supports our regional client relationships and on-the-ground engagement in the Kingdom. The office assists with local introductions, meeting facilitation, and in-region communication support.</p>
        <div class="partner-notice">
          NeoTechnology Solutions LLC and the Almansour Office are separate legal entities; this is a relationship-based partnership, not a parent-subsidiary structure.
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══ CONTACT ════════════════════════════════════════════════════════════ -->
<section class="contact section-pad" id="contact">
  <div class="container">
    <div class="contact-layout">

      <div class="contact-left">
        <div class="eyebrow"><span class="eyebrow-dot"></span>Get started</div>
        <h2 class="section-title">Ready to launch?</h2>
        <p class="section-sub">Book a free 30-minute scoping call. No sales pressure, no commitment — just an honest conversation about your project.</p>

        <div class="contact-info" style="margin-top:28px">
          <div class="contact-info-line"><span>Email</span> hello@neotechnology.solutions</div>
          <div class="contact-info-line"><span>Web</span> neotechnology.solutions</div>
          <div class="contact-info-line"><span>Entity</span> NeoTechnology Solutions LLC (Wyoming)</div>
          <div class="contact-info-line"><span>EIN</span> 36-5148912</div>
        </div>
      </div>

      <div class="contact-form-wrap">
        <?php if (isset($_GET['sent'])): ?>
          <div style="background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.25);border-radius:8px;padding:16px 20px;margin-bottom:24px;font-size:14px;color:#15803D;">
            Message received — we will be in touch within one business day.
          </div>
        <?php endif; ?>

        <form method="post" action="<?= esc_url(admin_url('admin-post.php')) ?>">
          <?php wp_nonce_field('neo_contact', 'neo_contact_nonce'); ?>
          <input type="hidden" name="action" value="neo_contact">

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="name">Name <span style="color:#EF4444">*</span></label>
              <input class="form-input" type="text" id="name" name="name" required placeholder="Your name">
            </div>
            <div class="form-group">
              <label class="form-label" for="email">Email <span style="color:#EF4444">*</span></label>
              <input class="form-input" type="email" id="email" name="email" required placeholder="you@company.com">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="company">Company</label>
              <input class="form-input" type="text" id="company" name="company" placeholder="Optional">
            </div>
            <div class="form-group">
              <label class="form-label" for="market">Market</label>
              <select class="form-select" id="market" name="market">
                <option value="">Select market</option>
                <option value="Gulf">Gulf (GCC)</option>
                <option value="US">United States</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="stage">Project stage</label>
            <select class="form-select" id="stage" name="stage">
              <option value="">Select stage</option>
              <option value="Idea">Just an idea</option>
              <option value="Planning">Planning stage</option>
              <option value="Ready to start">Ready to start</option>
              <option value="Existing store">Existing store needing improvement</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="message">Message <span style="color:#EF4444">*</span></label>
            <textarea class="form-textarea" id="message" name="message" required placeholder="Tell us about your project…"></textarea>
          </div>

          <button type="submit" class="form-submit">Send message →</button>
        </form>
      </div>

    </div>
  </div>
</section>

<?php get_footer(); ?>
