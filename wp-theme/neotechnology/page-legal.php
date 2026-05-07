<?php
/**
 * Template Name: Legal Page
 *
 * Renders Terms, Privacy, Refund, Cookies, or SLA based on page slug.
 */
defined('ABSPATH') || exit;

$slug = get_post_field('post_name', get_post());
$year = date('Y');

$docs = [

/* ─────────────────────────────────────────────────────────
   PRIVACY POLICY
───────────────────────────────────────────────────────── */
'privacy-policy' => [
  'title'    => 'Privacy Policy',
  'updated'  => 'May 2026',
  'intro'    => 'This Privacy Policy explains how NeoTechnology Solutions LLC (&ldquo;NTS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, stores, and shares information when you visit neotechnology.solutions or engage our services.',
  'content'  => <<<HTML
<h2>1. Who We Are</h2>
<p><strong>Data Controller:</strong> NeoTechnology Solutions LLC &mdash; Wyoming, United States &mdash; EIN 36-5148912<br>
Contact: <a href="mailto:privacy@neotechnology.solutions">privacy@neotechnology.solutions</a></p>

<h2>2. Information We Collect</h2>
<h3>Information you provide directly</h3>
<table>
  <thead><tr><th>Category</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td>Contact information</td><td>Name, email address, phone number</td></tr>
    <tr><td>Business information</td><td>Company name, VAT/CR number, industry</td></tr>
    <tr><td>Payment information</td><td>Processed by Stripe — NTS does not store card numbers</td></tr>
    <tr><td>Project content</td><td>Files, credentials, product data you share for project delivery</td></tr>
    <tr><td>Communications</td><td>Email threads, WhatsApp messages, call notes</td></tr>
  </tbody>
</table>
<h3>Information collected automatically</h3>
<table>
  <thead><tr><th>Category</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td>Usage data</td><td>Pages visited, time on page, referral source</td></tr>
    <tr><td>Device information</td><td>Browser type, OS, screen resolution</td></tr>
    <tr><td>IP address</td><td>General location (country/city level)</td></tr>
    <tr><td>Cookies</td><td>Session and analytics cookies — see Cookie Policy</td></tr>
  </tbody>
</table>

<h2>3. How We Use Your Information</h2>
<ul>
  <li>Providing and delivering the Services you contracted</li>
  <li>Processing payments via Stripe</li>
  <li>Communicating about your project</li>
  <li>Sending service-related updates</li>
  <li>Sending marketing emails only if you opted in</li>
  <li>Improving our Site and Services</li>
  <li>Complying with legal obligations</li>
  <li>Fraud prevention and security</li>
</ul>
<p>We do not use your information for automated decision-making or profiling.</p>

<h2>4. How We Share Your Information</h2>
<p>We do not sell your personal information. We share it only with:</p>
<ul>
  <li><strong>Service providers</strong>: Stripe (payments), Google Analytics (site analytics), Resend/SendGrid (email), Notion (project management), GitHub (code), and vetted subcontractors bound by confidentiality agreements.</li>
  <li><strong>Legal obligation</strong>: When required by law, court order, or government authority.</li>
  <li><strong>Business transfer</strong>: In the event of a merger or sale of assets (with advance notice to you).</li>
</ul>

<h2>5. Data Retention</h2>
<table>
  <thead><tr><th>Data type</th><th>Retention period</th></tr></thead>
  <tbody>
    <tr><td>Client project files and communications</td><td>5 years after project completion</td></tr>
    <tr><td>Payment records</td><td>7 years (legal/tax requirement)</td></tr>
    <tr><td>Contact form submissions</td><td>2 years from last contact</td></tr>
    <tr><td>Marketing email list</td><td>Until you unsubscribe</td></tr>
    <tr><td>Client system credentials</td><td>Deleted within 7 days of project completion</td></tr>
  </tbody>
</table>

<h2>6. Your Rights</h2>
<h3>GDPR (EEA / UK residents)</h3>
<p>You have the right to access, rectify, erase, restrict, port, and object to processing of your personal data. To exercise any right, email <a href="mailto:privacy@neotechnology.solutions">privacy@neotechnology.solutions</a>. We respond within 30 days.</p>
<h3>CCPA (California, USA residents)</h3>
<p>You have the right to know what data we collect, delete it, and opt out of any sale (we do not sell data). Submit requests to <a href="mailto:privacy@neotechnology.solutions">privacy@neotechnology.solutions</a> with subject &ldquo;CCPA Request.&rdquo;</p>
<h3>Saudi PDPL (Saudi Arabia residents)</h3>
<p>In accordance with Saudi Arabia&rsquo;s Personal Data Protection Law, you have the right to know, access, correct, and erase your data. Contact <a href="mailto:privacy@neotechnology.solutions">privacy@neotechnology.solutions</a>.</p>

<h2>7. International Transfers</h2>
<p>NTS is based in the USA. Data may be transferred to and processed in the US, which may not provide the same protections as your home jurisdiction. Where required, we rely on appropriate safeguards (Standard Contractual Clauses for EU transfers).</p>

<h2>8. Security</h2>
<p>We implement industry-standard security measures: encrypted credential storage, HTTPS/TLS for data in transit, access controls, and secure deletion of client credentials post-project. No method of transmission is 100% secure.</p>

<h2>9. Children&rsquo;s Privacy</h2>
<p>Our Site and Services are not directed to children under 18. If you believe we have inadvertently collected such information, contact us and we will delete it promptly.</p>

<h2>10. Changes to This Policy</h2>
<p>We will post the updated date at the top of this page. For material changes, active clients will be notified by email.</p>

<h2>11. Contact</h2>
<p>NeoTechnology Solutions LLC &mdash; Wyoming, United States<br>
Email: <a href="mailto:privacy@neotechnology.solutions">privacy@neotechnology.solutions</a><br>
Response time: within 5 business days for inquiries, 30 days for rights requests.</p>
HTML,
],

/* ─────────────────────────────────────────────────────────
   TERMS OF SERVICE
───────────────────────────────────────────────────────── */
'terms-of-service' => [
  'title'   => 'Terms of Service',
  'updated' => 'May 2026',
  'intro'   => 'These Terms of Service govern your use of neotechnology.solutions and your purchase of services from NeoTechnology Solutions LLC (&ldquo;NTS&rdquo;). By using the Site or purchasing any Service, you agree to be bound by these Terms.',
  'content' => <<<HTML
<h2>1. Who We Are</h2>
<p>NeoTechnology Solutions LLC is a US-incorporated technology services company registered in the State of Wyoming (EIN 36-5148912). We provide e-commerce setup, payment integration, workflow automation, hosting, and related technology services to merchants globally.</p>

<h2>2. Services</h2>
<p>We offer project-based services including e-commerce store setup, payment gateway integration, workflow automation (n8n), domain and hosting management, AI-powered consulting, and technical support. All project work is governed by a Master Services Agreement (MSA) and Statement of Work (SOW) signed before any project commences.</p>
<p>Quick-Fix tickets ($99&ndash;$299) are provided on a best-efforts basis. Diagnosis commences within 24 business hours of receiving access. Quick-Fix fees are non-refundable once diagnosis has commenced.</p>

<h2>3. Pricing and Payment</h2>
<ul>
  <li>All prices are in US Dollars (USD) unless otherwise stated.</li>
  <li>Project-based services require a <strong>50% non-refundable deposit</strong> before work commences; the remaining 50% is due upon final delivery.</li>
  <li>Managed services (n8n hosting, VPS) are billed monthly in advance.</li>
  <li>Prices exclude applicable taxes. You are responsible for VAT, GST, withholding, or other taxes in your jurisdiction.</li>
  <li>Late invoices accrue interest at 1.5% per month after 14 days past due.</li>
</ul>

<h2>4. Refunds and Cancellations</h2>
<p>See our full <a href="<?= esc_url(home_url('/refund-policy/')) ?>">Refund Policy</a> for complete terms. Summary:</p>
<ul>
  <li>Project deposits are non-refundable once work has commenced.</li>
  <li>Cancellation within 48 hours of deposit and before any work begins: full deposit refund.</li>
  <li>Monthly managed services: cancel with 30 days&rsquo; written notice; no partial-month refunds.</li>
</ul>

<h2>5. Intellectual Property</h2>
<ul>
  <li>All Site content is owned by NTS or its licensors.</li>
  <li>Upon full payment, all project Deliverables are assigned to you as described in the MSA.</li>
  <li>You retain ownership of all content, data, and materials you provide to us.</li>
  <li>You grant us a limited licence to use your content solely to perform the Services.</li>
</ul>

<h2>6. Your Obligations</h2>
<p>You agree to: provide accurate information; cooperate with our reasonable requests for access and materials; use Deliverables in compliance with all applicable laws; not use the Site or Services for any unlawful purpose; and not attempt to gain unauthorised access to our systems.</p>

<h2>7. Third-Party Platforms</h2>
<p>Our Services involve third-party platforms (Shopify, WooCommerce, Salla, Zid, etc.) and payment gateways (Mada, STC Pay, Stripe, etc.). Your use of those platforms is subject to their own terms. We are not responsible for changes, outages, or policy decisions by third-party providers.</p>

<h2>8. Disclaimer of Warranties</h2>
<p>THE SITE AND SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Information on the Site about regulations (ZATCA, VAT, etc.) is informational only and does not constitute legal advice.</p>

<h2>9. Limitation of Liability</h2>
<p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, NTS&rsquo;S TOTAL LIABILITY FOR ANY CLAIM ARISING FROM THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU IN THE THREE MONTHS PRECEDING THE CLAIM. NTS SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, PUNITIVE, OR SPECIAL DAMAGES.</p>

<h2>10. Governing Law and Disputes</h2>
<p>These Terms are governed by the laws of the State of Wyoming, USA. Disputes are subject to a 30-day good-faith negotiation period, then binding arbitration under the American Arbitration Association Commercial Rules, conducted in Wyoming.</p>

<h2>11. Changes to These Terms</h2>
<p>We may update these Terms periodically. Material changes will be posted on this page with an updated date. Continued use of the Site or Services constitutes acceptance.</p>

<h2>12. Contact</h2>
<p>NeoTechnology Solutions LLC &mdash; Wyoming, United States<br>
Email: <a href="mailto:hello@neotechnology.solutions">hello@neotechnology.solutions</a></p>
HTML,
],

/* ─────────────────────────────────────────────────────────
   REFUND POLICY
───────────────────────────────────────────────────────── */
'refund-policy' => [
  'title'   => 'Refund Policy',
  'updated' => 'May 2026',
  'intro'   => 'This Refund Policy applies to all services purchased from NeoTechnology Solutions LLC. Our policy is designed to be fair to both parties &mdash; reflecting the work we invest while protecting clients against non-delivery.',
  'content' => <<<HTML
<h2>1. Project-Based Services (Starter, Professional, GCC Special, Enterprise)</h2>
<h3>Deposit (50%)</h3>
<p>The 50% deposit is <strong>non-refundable once work has commenced</strong>.</p>
<table>
  <thead><tr><th>Scenario</th><th>Refund</th></tr></thead>
  <tbody>
    <tr><td>Client cancels within 48 hours of deposit AND before any work has started</td><td>100% deposit refunded</td></tr>
    <tr><td>Client cancels after 48 hours or after any work has commenced</td><td>No refund of deposit</td></tr>
    <tr><td>NTS cannot commence work within 7 business days of deposit (NTS fault)</td><td>100% deposit refunded</td></tr>
  </tbody>
</table>

<h3>Final Payment (50%)</h3>
<table>
  <thead><tr><th>Scenario</th><th>Refund</th></tr></thead>
  <tbody>
    <tr><td>Client cancels after final payment, before delivery</td><td>Pro-rata refund based on % of work not yet completed</td></tr>
    <tr><td>Deliverables materially do not conform to SOW specifications</td><td>NTS remedies within 15 business days; if unable, pro-rata refund issued</td></tr>
    <tr><td>Client refuses to accept Deliverables without valid reason</td><td>No refund</td></tr>
    <tr><td>NTS fails to deliver within 30 days of the SOW deadline (NTS fault)</td><td>Full refund of final payment for incomplete scope</td></tr>
  </tbody>
</table>

<h2>2. Quick-Fix Services ($99&ndash;$299)</h2>
<table>
  <thead><tr><th>Scenario</th><th>Refund</th></tr></thead>
  <tbody>
    <tr><td>NTS cannot diagnose the reported issue</td><td>100% refund</td></tr>
    <tr><td>NTS diagnoses but cannot fix without additional paid work</td><td>50% refund</td></tr>
    <tr><td>Issue fixed but recurs within 48 hours (same root cause)</td><td>NTS remedies at no charge</td></tr>
    <tr><td>Issue fixed successfully</td><td>No refund</td></tr>
  </tbody>
</table>

<h2>3. Managed Services (n8n Hosting, VPS)</h2>
<ul>
  <li>Cancelled before billing period begins: 100% refund.</li>
  <li>Cancelled mid-month: no refund for remaining days (monthly billing).</li>
  <li>Service downtime &gt;24 consecutive hours due to NTS fault: pro-rata credit on next invoice.</li>
  <li>30 days&rsquo; written notice required to cancel managed services.</li>
</ul>

<h2>4. Scope Changes Are Not Refunds</h2>
<p>If you decide you want different deliverables than those in the SOW, this is a <strong>change of scope</strong>, not a refund. In-scope work already completed is not refundable. We will issue a Change Order for any additional work.</p>

<h2>5. How to Request a Refund</h2>
<ol>
  <li>Email <a href="mailto:billing@neotechnology.solutions">billing@neotechnology.solutions</a> with subject: &ldquo;Refund Request &mdash; [your project reference].&rdquo;</li>
  <li>Describe the reason for the request.</li>
  <li>NTS will acknowledge within 2 business days.</li>
  <li>Agreed refunds are processed via original payment method within 7 business days.</li>
</ol>
<p><em>Chargebacks filed without first contacting NTS will be contested. We maintain complete project records for this purpose.</em></p>

<h2>6. Disputes</h2>
<p>Refund disputes that cannot be resolved by mutual agreement are subject to the dispute resolution procedure in the Master Services Agreement (binding arbitration, Wyoming).</p>
HTML,
],

/* ─────────────────────────────────────────────────────────
   COOKIE POLICY
───────────────────────────────────────────────────────── */
'cookie-policy' => [
  'title'   => 'Cookie Policy',
  'updated' => 'May 2026',
  'intro'   => 'This Cookie Policy explains how NeoTechnology Solutions LLC uses cookies and similar tracking technologies on neotechnology.solutions.',
  'content' => <<<HTML
<h2>1. What Are Cookies?</h2>
<p>Cookies are small text files placed on your device when you visit a website. They help the website remember information about your visit, such as your privacy preferences. This makes your next visit easier and the Site more useful.</p>

<h2>2. Cookies We Use</h2>
<h3>Essential Cookies (always active)</h3>
<p>These cookies are necessary for the Site to function. They cannot be switched off.</p>
<table>
  <thead><tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr></thead>
  <tbody>
    <tr><td>session_id</td><td>Maintains your session state</td><td>Session</td></tr>
    <tr><td>csrf_token</td><td>Security &mdash; prevents cross-site request forgery</td><td>Session</td></tr>
    <tr><td>cookie_consent</td><td>Stores your cookie preferences</td><td>12 months</td></tr>
  </tbody>
</table>

<h3>Analytics Cookies (optional &mdash; consent required)</h3>
<p>These allow us to count visits and measure Site performance. All information is aggregated and anonymised.</p>
<table>
  <thead><tr><th>Cookie</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr></thead>
  <tbody>
    <tr><td>_ga</td><td>Google Analytics</td><td>Distinguishes users</td><td>2 years</td></tr>
    <tr><td>_ga_*</td><td>Google Analytics</td><td>Session state</td><td>2 years</td></tr>
    <tr><td>_gid</td><td>Google Analytics</td><td>Short-term user distinction</td><td>24 hours</td></tr>
  </tbody>
</table>
<p>We use Google Analytics with IP anonymisation enabled. We do not use Google Analytics for advertising.</p>

<h3>Marketing / Tracking Cookies</h3>
<p>We do not currently use advertising or retargeting cookies. If this changes, this policy will be updated and new consent will be requested.</p>

<h2>3. How to Manage Cookies</h2>
<h3>On our Site</h3>
<p>A cookie consent banner appears on your first visit. You can accept or decline optional cookies and change your preferences at any time via &ldquo;Cookie Settings&rdquo; in the footer.</p>
<h3>In your browser</h3>
<ul>
  <li><strong>Chrome</strong>: Settings &rarr; Privacy and security &rarr; Cookies</li>
  <li><strong>Safari</strong>: Preferences &rarr; Privacy</li>
  <li><strong>Firefox</strong>: Preferences &rarr; Privacy &amp; Security</li>
  <li><strong>Edge</strong>: Settings &rarr; Privacy, search, and services</li>
</ul>
<p>Deleting essential cookies may affect your ability to use the Site.</p>
<h3>Google Analytics opt-out</h3>
<p>Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out Browser Add-on</a> to prevent data collection across all websites.</p>

<h2>4. Updates</h2>
<p>We may update this policy when we add new cookies. We will update the &ldquo;Last updated&rdquo; date and, for material changes, request new consent.</p>

<h2>5. Contact</h2>
<p>NeoTechnology Solutions LLC<br>
Email: <a href="mailto:privacy@neotechnology.solutions">privacy@neotechnology.solutions</a></p>
HTML,
],

/* ─────────────────────────────────────────────────────────
   SLA
───────────────────────────────────────────────────────── */
'sla' => [
  'title'   => 'Service Level Agreement',
  'updated' => 'May 2026',
  'intro'   => 'This Service Level Agreement (&ldquo;SLA&rdquo;) defines the support and maintenance standards NeoTechnology Solutions LLC provides to clients under Professional, GCC Special, and Enterprise retainer engagements.',
  'content' => <<<HTML
<h2>1. Scope</h2>
<p>This SLA applies to: e-commerce stores delivered by NTS, managed n8n automation servers, and custom integrations where a monthly retainer is in effect. Third-party platform outages (Shopify, Salla, Stripe, Mada, etc.) are outside NTS&rsquo;s scope.</p>

<h2>2. Incident Severity and Response Times</h2>
<table>
  <thead><tr><th>Severity</th><th>Definition</th><th>Response</th><th>Resolution</th><th>Hours</th></tr></thead>
  <tbody>
    <tr><td><strong>P1 &mdash; Critical</strong></td><td>Store completely inaccessible; no sales can be made</td><td>2 hours</td><td>8 hours</td><td>24/7</td></tr>
    <tr><td><strong>P2 &mdash; High</strong></td><td>Major functionality broken; significant revenue impact</td><td>4 business hours</td><td>24 business hours</td><td>Business hours</td></tr>
    <tr><td><strong>P3 &mdash; Medium</strong></td><td>Partial degradation; workaround exists</td><td>1 business day</td><td>5 business days</td><td>Business hours</td></tr>
    <tr><td><strong>P4 &mdash; Low</strong></td><td>Cosmetic issue or feature request; no revenue impact</td><td>3 business days</td><td>14 business days</td><td>Business hours</td></tr>
  </tbody>
</table>
<p><em>Business hours: Sunday&ndash;Thursday 09:00&ndash;18:00 AST (UTC+3).</em></p>

<h2>3. Uptime Commitment (Managed n8n Hosting)</h2>
<table>
  <thead><tr><th>Metric</th><th>Commitment</th></tr></thead>
  <tbody>
    <tr><td>Monthly uptime target</td><td>99.5%</td></tr>
    <tr><td>Scheduled maintenance window</td><td>Sundays 02:00&ndash;04:00 AST (48hrs notice)</td></tr>
    <tr><td>Backup frequency</td><td>Daily automated backups</td></tr>
    <tr><td>Backup retention</td><td>14 days</td></tr>
    <tr><td>Recovery Point Objective (RPO)</td><td>24 hours</td></tr>
    <tr><td>Recovery Time Objective (RTO)</td><td>4 hours</td></tr>
  </tbody>
</table>

<h2>4. Service Credits (SLA Breach)</h2>
<table>
  <thead><tr><th>Breach</th><th>Credit</th></tr></thead>
  <tbody>
    <tr><td>P1 response &gt; 2 hours</td><td>5% of monthly retainer fee</td></tr>
    <tr><td>P1 resolution &gt; 8 hours (each additional 4 hours)</td><td>2% of monthly retainer fee</td></tr>
    <tr><td>Monthly uptime &lt; 99.5%</td><td>5% per 0.1% below target</td></tr>
    <tr><td>Monthly uptime &lt; 99.0%</td><td>10% of monthly retainer fee</td></tr>
  </tbody>
</table>
<p>Maximum total credit in any month: 30% of monthly retainer fee. Credits are Client&rsquo;s sole remedy for SLA breaches.</p>

<h2>5. Monthly Included Activities</h2>
<ul>
  <li>System health check (store + n8n) with brief written report</li>
  <li>Security updates (WP plugins, WooCommerce) as released</li>
  <li>Automation flow health review</li>
  <li>Monthly payment gateway test transactions</li>
  <li>Core Web Vitals performance check</li>
  <li>30-minute monthly review call</li>
</ul>

<h2>6. Support Channels</h2>
<ul>
  <li><strong>Email</strong>: <a href="mailto:support@neotechnology.solutions">support@neotechnology.solutions</a> &mdash; P3, P4 issues</li>
  <li><strong>WhatsApp</strong>: provided at project kickoff &mdash; P1, P2 urgent issues (24/7 for P1)</li>
  <li><strong>Escalation</strong>: <a href="mailto:hello@neotechnology.solutions">hello@neotechnology.solutions</a> &mdash; Managing Member, response within 4 business hours</li>
</ul>

<h2>7. Governing Terms</h2>
<p>This SLA is subject to and incorporated into the Master Services Agreement between NTS and Client. Disputes are resolved per the MSA (binding arbitration, Wyoming).</p>

<h2>8. Custom SLA</h2>
<p>Enterprise clients receive a custom SLA tailored to their specific infrastructure, operating hours, and compliance requirements. <a href="<?= esc_url(home_url('/#contact')) ?>">Contact us</a> to discuss.</p>
HTML,
],

]; // end $docs

// ── Fallback ──────────────────────────────────────────────────────────────
if (!isset($docs[$slug])) {
    wp_redirect(home_url('/'));
    exit;
}
$doc = $docs[$slug];

get_header();
?>

<main class="legal-page">

  <!-- Hero -->
  <div class="legal-hero">
    <div class="container">
      <a href="<?= esc_url(home_url('/')) ?>" class="legal-back">← Back to home</a>
      <h1 class="legal-title"><?= esc_html($doc['title']) ?></h1>
      <p class="legal-meta">NeoTechnology Solutions LLC &mdash; Last updated: <?= esc_html($doc['updated']) ?></p>
      <p class="legal-intro"><?= $doc['intro'] ?></p>
    </div>
  </div>

  <!-- Content -->
  <div class="legal-body">
    <div class="container">
      <div class="legal-content">
        <?= $doc['content'] ?>
      </div>

      <!-- Footer note -->
      <div class="legal-footer-note">
        <p>NeoTechnology Solutions LLC &mdash; Wyoming, United States &mdash; EIN 36-5148912</p>
        <p>Questions? Email <a href="mailto:hello@neotechnology.solutions">hello@neotechnology.solutions</a></p>
        <div class="legal-sibling-links">
          <a href="<?= esc_url(home_url('/privacy-policy/')) ?>">Privacy Policy</a>
          <a href="<?= esc_url(home_url('/terms-of-service/')) ?>">Terms of Service</a>
          <a href="<?= esc_url(home_url('/refund-policy/')) ?>">Refund Policy</a>
          <a href="<?= esc_url(home_url('/cookie-policy/')) ?>">Cookie Policy</a>
          <a href="<?= esc_url(home_url('/sla/')) ?>">SLA</a>
        </div>
      </div>
    </div>
  </div>

</main>

<?php get_footer(); ?>
