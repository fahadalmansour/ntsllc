<?php
/**
 * Template Name: Arabic Homepage
 * Full RTL Arabic version of the NeoTechnology Solutions homepage.
 */
defined('ABSPATH') || exit;
$admin_url = esc_url(admin_url('admin-post.php'));
$home_url  = esc_url(home_url('/'));
$ar_url    = esc_url(home_url('/ar/'));
?>
<!DOCTYPE html>
<html dir="rtl" lang="ar" <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>نيوتكنولوجي سولوشنز — الشريك التقني للتجارة الإلكترونية في الخليج والولايات المتحدة</title>
  <meta name="description" content="نيوتكنولوجي سولوشنز — شركة أمريكية متخصصة في إعداد المتاجر الإلكترونية وربط بوابات الدفع وأتمتة سير العمل للتجار في الخليج والولايات المتحدة.">
  <?php wp_head(); ?>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    /* ── Arabic / RTL overrides ────────────────────────── */
    html[dir="rtl"] {
      --font-heading: 'Cairo', sans-serif;
      --font-body:    'Tajawal', sans-serif;
    }
    html[dir="rtl"] body {
      font-family: var(--font-body);
      direction: rtl;
    }
    html[dir="rtl"] h1,
    html[dir="rtl"] h2,
    html[dir="rtl"] h3,
    html[dir="rtl"] h4,
    html[dir="rtl"] h5 {
      font-family: var(--font-heading);
      letter-spacing: 0;
    }
    html[dir="rtl"] .eyebrow {
      font-family: 'JetBrains Mono', monospace;
      direction: ltr;
      justify-content: flex-end;
    }
    html[dir="rtl"] .nav-inner { flex-direction: row-reverse; }
    html[dir="rtl"] .nav-links { flex-direction: row-reverse; }
    html[dir="rtl"] .nav-logo { font-family: var(--font-heading); letter-spacing: 0; }
    html[dir="rtl"] .hero-inner { flex-direction: row-reverse; }
    html[dir="rtl"] .hero-actions { flex-direction: row-reverse; }
    html[dir="rtl"] .hero-stats { flex-direction: row-reverse; }
    html[dir="rtl"] .hero-badge { flex-direction: row-reverse; }
    html[dir="rtl"] .panel-bar { flex-direction: row-reverse; }
    html[dir="rtl"] .panel-dots { flex-direction: row-reverse; }
    html[dir="rtl"] .panel-status { flex-direction: row-reverse; }
    html[dir="rtl"] .panel-input-row { flex-direction: row-reverse; }
    html[dir="rtl"] .services-header { text-align: right; }
    html[dir="rtl"] .services-header .eyebrow { justify-content: flex-start; }
    html[dir="rtl"] .service-num { direction: ltr; display: inline-block; }
    html[dir="rtl"] .why-layout { flex-direction: row-reverse; }
    html[dir="rtl"] .process-header { text-align: right; }
    html[dir="rtl"] .process-header .eyebrow { justify-content: flex-start; }
    html[dir="rtl"] .tech-header { text-align: right; }
    html[dir="rtl"] .tech-header .eyebrow { justify-content: flex-start; }
    html[dir="rtl"] .tech-stats { flex-direction: row-reverse; }
    html[dir="rtl"] .guarantees-layout { flex-direction: row-reverse; }
    html[dir="rtl"] .stat-grid { flex-direction: row-reverse; }
    html[dir="rtl"] .guarantee-cards { flex-direction: column; }
    html[dir="rtl"] .pricing-header { text-align: right; }
    html[dir="rtl"] .pricing-header .eyebrow { justify-content: flex-start; }
    html[dir="rtl"] .pricing-features li { flex-direction: row-reverse; gap: 8px; }
    html[dir="rtl"] .pricing-badge { right: auto; left: 16px; }
    html[dir="rtl"] .about-layout { flex-direction: row-reverse; }
    html[dir="rtl"] .faq-layout { flex-direction: row-reverse; }
    html[dir="rtl"] .accordion-trigger { flex-direction: row-reverse; text-align: right; }
    html[dir="rtl"] .accordion-body { text-align: right; }
    html[dir="rtl"] .partner-layout { flex-direction: row-reverse; }
    html[dir="rtl"] .partner-header { flex-direction: row-reverse; }
    html[dir="rtl"] .contact-layout { flex-direction: row-reverse; }
    html[dir="rtl"] .form-row { flex-direction: row-reverse; }
    html[dir="rtl"] .form-label { text-align: right; }
    html[dir="rtl"] .form-input,
    html[dir="rtl"] .form-select,
    html[dir="rtl"] .form-textarea { text-align: right; direction: rtl; }
    html[dir="rtl"] .footer-grid { flex-direction: row-reverse; }
    html[dir="rtl"] .footer-col ul { text-align: right; }
    html[dir="rtl"] .footer-bottom { flex-direction: row-reverse; text-align: right; }
    html[dir="rtl"] .contact-info-line { flex-direction: row-reverse; }
    html[dir="rtl"] .section-title,
    html[dir="rtl"] .section-sub { text-align: right; }
    html[dir="rtl"] .hero-title,
    html[dir="rtl"] .hero-sub { text-align: right; }
    html[dir="rtl"] .mobile-menu { text-align: right; }
    html[dir="rtl"] .why-card { text-align: right; }
    html[dir="rtl"] .faq-cta-box { text-align: right; }
    html[dir="rtl"] .about-body { text-align: right; }
    html[dir="rtl"] .partner-body,
    html[dir="rtl"] .partner-notice { text-align: right; }
    html[dir="rtl"] .partner-tag { flex-direction: row-reverse; }
    html[dir="rtl"] .early-client-text { text-align: right; }
    html[dir="rtl"] .process-cta,
    html[dir="rtl"] .services-footer { direction: ltr; }
    /* lang toggle pill */
    .lang-toggle {
      display: inline-flex; align-items: center; gap: 6px;
      font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600;
      padding: 5px 12px; border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.7);
      text-decoration: none; letter-spacing: 0.06em;
      transition: border-color .15s, color .15s; white-space: nowrap;
    }
    .lang-toggle:hover { border-color: rgba(255,255,255,0.5); color: #fff; }
    html[dir="rtl"] .hero-stat-label { font-size: 12px; }
    html[dir="rtl"] .hero-title { line-height: 1.2; }
    html[dir="rtl"] .pricing-features { text-align: right; }
    html[dir="rtl"] .step-number { direction: ltr; }
    html[dir="rtl"] .about-stats { text-align: right; }
    html[dir="rtl"] .about-stat-val,
    html[dir="rtl"] .about-stat-label { text-align: right; }
  </style>
</head>
<body <?php body_class('rtl'); ?>>
<?php wp_body_open(); ?>

<!-- ── NAV ──────────────────────────────────────────────────────────────── -->
<nav class="site-nav" id="site-nav">
  <div class="nav-inner">
    <a href="<?= $ar_url ?>" class="nav-logo">نيو<span>تكنولوجي</span></a>

    <ul class="nav-links">
      <li><a href="#services">الخدمات</a></li>
      <li><a href="#process">العملية</a></li>
      <li><a href="#pricing">الأسعار</a></li>
      <li><a href="#about">عن الشركة</a></li>
      <li><a href="#faq">الأسئلة</a></li>
      <li><a href="<?= $home_url ?>" class="lang-toggle">EN ↗</a></li>
      <li><a href="#contact" class="nav-cta">ابدأ الآن</a></li>
    </ul>

    <button class="nav-hamburger" id="hamburger" aria-label="فتح القائمة">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="mobile-menu" id="mobile-menu">
  <a href="#services">الخدمات</a>
  <a href="#process">العملية</a>
  <a href="#pricing">الأسعار</a>
  <a href="#about">عن الشركة</a>
  <a href="#faq">الأسئلة الشائعة</a>
  <a href="<?= $home_url ?>">English</a>
  <a href="#contact">ابدأ الآن ←</a>
</div>

<!-- ══ HERO ═══════════════════════════════════════════════════════════════ -->
<section class="hero" id="hero">
  <div class="container">
    <div class="hero-inner">

      <div class="">
        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          <span class="hero-badge-text">متصل · شركة ذ.م.م · ولاية وايومنغ الأمريكية</span>
        </div>

        <h1 class="hero-title">
          الشريك التقني<br>
          <em>المتكامل</em><br>
          للتجارة الإلكترونية
        </h1>

        <p class="hero-sub">
          من إعداد أول متجر إلكتروني إلى أتمتة سير العمل المتقدمة — نيوتكنولوجي سولوشنز توفر البنية التحتية التقنية التي يحتاجها التجار للإطلاق أسرع، والبيع بذكاء، والنمو بلا حدود.
        </p>

        <div class="hero-actions">
          <a href="#pricing" class="btn btn-primary">عرض الأسعار</a>
          <a href="#services" class="btn btn-ghost">استعرض الخدمات</a>
        </div>

        <div class="hero-stats">
          <div>
            <div class="hero-stat-val">+6,000</div>
            <div class="hero-stat-label">قالب أتمتة</div>
          </div>
          <div>
            <div class="hero-stat-val">+8</div>
            <div class="hero-stat-label">بوابة دفع</div>
          </div>
          <div>
            <div class="hero-stat-val">7 أيام</div>
            <div class="hero-stat-label">أول بيئة تجريبية</div>
          </div>
          <div>
            <div class="hero-stat-val">خليج+US</div>
            <div class="hero-stat-label">أسواق نشطة</div>
          </div>
        </div>
      </div>

      <!-- Interactive terminal (stays LTR — it's a code console) -->
      <div class="hero-panel" id="hero-terminal" dir="ltr">
        <div class="panel-bar">
          <div class="panel-dots">
            <div class="panel-dot panel-dot-r"></div>
            <div class="panel-dot panel-dot-y"></div>
            <div class="panel-dot panel-dot-g"></div>
          </div>
          <span class="panel-title">neo@نيوتك — bash</span>
          <span class="panel-title panel-clock" id="panel-clock"></span>
        </div>

        <div class="panel-body" id="terminal-output"></div>

        <div class="panel-input-row" id="terminal-input-row">
          <span class="panel-prompt">$</span>
          <input
            type="text"
            id="terminal-input"
            class="terminal-input"
            placeholder="اكتب أمراً…"
            autocomplete="off"
            spellcheck="false"
            dir="ltr"
          >
        </div>

        <div class="panel-status">
          <span id="term-status">● BOOTING</span>
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
        الخدمات
      </div>
      <h2 class="section-title">ثماني خدمات. منصة واحدة. بلا تعقيد.</h2>
      <p class="section-sub">توقف عن تجميع منظومتك التقنية من عشرات الموردين. كل طبقات البنية التحتية للتجارة الإلكترونية تحت سقف واحد.</p>
    </div>

    <div class="services-grid">
      <?php
      $services = [
        ['01','إعداد المتجر والتكامل',   'بناء مخصص على Shopify وWooCommerce وSalla وZid وWuilt — تصاميم ثنائية اللغة، وشهادة SSL، وتكامل كامل لوسائل الدفع.'],
        ['02','حلول الدفع',              'مدى وSTC Pay وApple Pay وTap وHyperPay وPayTabs وMoyasar وStripe — جميع وسائل الدفع الرئيسية في الخليج والولايات المتحدة.'],
        ['03','أتمتة سير العمل',         'استضافة n8n مُدارة مع أكثر من 6,000 قالب جاهز — الفواتير ومزامنة المخزون واسترداد السلة المتروكة وإشعارات WhatsApp.'],
        ['04','النطاق والاستضافة',       'تسجيل النطاق والبريد الإلكتروني وشهادة SSL واستضافة VPS — كل شيء يُدار من لوحة تحكم واحدة.'],
        ['05','استشارات الذكاء الاصطناعي','Claude Agent SDK وMCP — إنشاء وثائق متطلبات الأعمال وتدفقات الأتمتة والقوالب القانونية للامتثال.'],
        ['06','وساطة المستقلين',         'شبكة من المطورين والمصممين الموثوقين، إدارة متكاملة من البداية إلى النهاية مع حماية الضمان.'],
        ['07','دعم الإصلاح السريع',      'SSL والأداء وتعارضات الإضافات وDNS — أسعار ثابتة وشفافة. من $99 إلى $299.'],
        ['08','حزمة الاتصالات',          'البريد الإلكتروني (SendGrid/Resend) والرسائل القصيرة (Twilio) وWhatsApp Business API والنشر الاجتماعي — مدمج في لوحة التحكم.'],
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
      <a href="#contact" class="btn btn-ghost" style="display:inline-flex">← عرض جميع الخدمات</a>
    </div>

  </div>
</section>

<!-- ══ WHY ════════════════════════════════════════════════════════════════ -->
<section class="why section-pad" id="why">
  <div class="container">
    <div class="why-layout">

      <div class="why-left">
        <div class="eyebrow"><span class="eyebrow-dot"></span>لماذا نحن</div>
        <h2 class="section-title">مبني للتجار الذين يرفضون التنازل</h2>
        <p class="section-sub">أربعة مبادئ لا نتخلى عنها — بغض النظر عن حجم المشروع.</p>
      </div>

      <div class="why-grid">
        <?php
        $whys = [
          ['01','هيكل شركة أمريكية',      'إطار شركة ذ.م.م بولاية وايومنغ يمنح كل مشروع قدرة التنبؤ بموجب القانون التجاري الأمريكي، وحماية واضحة للملكية الفكرية، وحوكمة شفافة.'],
          ['02','متخصص في التجارة الإلكترونية', 'كل سطر من الكود، وكل تدفق عمل، وكل تكامل مبني خصيصاً للمتاجر الإلكترونية — Shopify وWooCommerce وSalla وZid وما يتجاوزها.'],
          ['03','أسعار شفافة',            'باقات بأسعار ثابتة تبدأ من $999. لا فوترة بالساعة، لا رسوم مخفية، لا تقييد بالمورد. تعرف السعر قبل أن تلتزم.'],
          ['04','تشغيل بتقنيات الذكاء الاصطناعي', 'بالاعتماد على Claude Agent SDK وMCP، تتحول إعدادات متعددة الخطوات إلى تدفقات عمل بنقرة واحدة — وتزداد ذكاءً مع نموك.'],
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
        كيف نعمل
      </div>
      <h2 class="section-title">عملية واضحة في كل مرة</h2>
      <p class="section-sub">ست خطوات من أول محادثة إلى شراكة طويلة الأمد.</p>
    </div>

    <div class="process-steps">
      <?php
      $steps = [
        ['STEP 01','الاكتشاف',   'جلسة تقييم مجانية لمدة 30 دقيقة. لا ضغوط مبيعات، فقط محادثة صادقة حول أهدافك.'],
        ['STEP 02','الاقتراح',   'أسعار ثابتة ومخرجات دقيقة تُسلَّم خلال يوم عمل واحد.'],
        ['STEP 03','الانطلاق',   '50% دفعة مقدمة + اتفاقية موقعة. مساحة العمل المشتركة تُفتح فوراً.'],
        ['STEP 04','البناء',     'بيئة تجريبية يمكنك الوصول إليها منذ اليوم الأول. تحديثات أسبوعية مكتوبة طوال المشروع.'],
        ['STEP 05','الإطلاق',    'نشر على الخادم الرئيسي بعد موافقتك الصريحة. الفاتورة النهائية تُصدر عند الإطلاق.'],
        ['STEP 06','الدعم',      'نافذة دعم محددة مدرجة في كل باقة. إصلاح سريع أو صيانة بعدها.'],
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
      <a href="#contact" class="btn btn-ghost" style="display:inline-flex">← احجز جلسة تقييم مجانية</a>
    </div>

  </div>
</section>

<!-- ══ TECHNOLOGY ════════════════════════════════════════════════════════ -->
<section class="tech section-pad" id="technology">
  <div class="container">

    <div class="tech-header">
      <div class="eyebrow"><span class="eyebrow-dot"></span>التكاملات</div>
      <h2 class="section-title">كل منصة يستخدمها عملك بالفعل</h2>
    </div>

    <div class="tech-pill-wrap">
      <?php
      $platforms = [
        'Shopify','WooCommerce','Salla','Zid','Wuilt',
        'Stripe','Tap Payments','HyperPay','PayTabs','Moyasar',
        'مدى','STC Pay','Apple Pay','n8n','SendGrid',
        'Resend','Twilio','WhatsApp Business','Google Workspace',
        'GoDaddy','Enom','Cloudflare','Claude SDK','WordPress',
      ];
      foreach ($platforms as $p) {
        echo '<span class="tech-pill">' . esc_html($p) . '</span>';
      }
      ?>
    </div>

    <div class="tech-stats">
      <div class="tech-stat"><div class="tech-stat-val">+6,000</div><div class="tech-stat-label">قالب أتمتة</div></div>
      <div class="tech-stat"><div class="tech-stat-val">+8</div><div class="tech-stat-label">بوابة دفع</div></div>
      <div class="tech-stat"><div class="tech-stat-val">24</div><div class="tech-stat-label">منصة مدمجة</div></div>
      <div class="tech-stat"><div class="tech-stat-val">2</div><div class="tech-stat-label">أسواق (الخليج + US)</div></div>
    </div>

  </div>
</section>

<!-- ══ GUARANTEES ════════════════════════════════════════════════════════ -->
<section class="guarantees section-pad" id="guarantees">
  <div class="container">
    <div class="guarantees-layout">

      <div class="guarantees-left">
        <div class="eyebrow"><span class="eyebrow-dot" style="background:rgba(255,255,255,0.3)"></span>التزامنا</div>
        <h2 class="section-title">مبني على الثقة. مثبوت بالنتائج.</h2>
        <p class="section-sub">إليك بالضبط ما يضمنه كل مشروع.</p>

        <div class="stat-grid">
          <div class="stat-cell"><div class="stat-val">7</div><div class="stat-label">أيام لأول بيئة تجريبية</div></div>
          <div class="stat-cell"><div class="stat-val">50%</div><div class="stat-label">دفعة مقدمة للبدء</div></div>
          <div class="stat-cell"><div class="stat-val">$0</div><div class="stat-label">رسوم مفاجئة</div></div>
          <div class="stat-cell"><div class="stat-val">100%</div><div class="stat-label">ملكية فكرية لك</div></div>
        </div>

        <div style="margin-top:32px">
          <a href="#contact" class="btn btn-outline-indigo" style="display:inline-flex">← احجز مكالمة مجانية</a>
        </div>
      </div>

      <div class="guarantee-cards">
        <?php
        $gs = [
          ['✓','عقد بسعر ثابت',       'ترى السعر الدقيق قبل التوقيع. لا فوترة بالساعة، لا رسوم زحف نطاق، لا إعادة تفاوض.'],
          ['⌘','بيئة تجريبية من اليوم الأول', 'تصل إلى بيئة تجريبية حية منذ الأسبوع الأول وتراجع كل مرحلة بناء قبل النشر.'],
          ['◈','ملكية فكرية كاملة',   'كل سطر كود وكل أصل ينتقل إليك عند الدفع النهائي — لا تقييد، لا رسوم ترخيص.'],
          ['◷','دعم 30 يوماً مشمول', 'نافذة دعم ما بعد الإطلاق مشمولة في كل باقة. بدون أي رسوم إضافية.'],
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
            <strong>نقبل أولى مشاريعنا الآن.</strong> نحن نُعالج مشاريع مبكرة بنشاط. مشروعك سيُوثَّق ويُعرض هنا عند اكتماله — بإذنك.
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
      <div class="eyebrow"><span class="eyebrow-dot"></span>الأسعار</div>
      <h2 class="section-title">أسعار شفافة.<br>بلا مفاجآت.</h2>
      <p class="section-sub">رسوم إعداد لمرة واحدة. ترى السعر الدقيق قبل الالتزام. لا اشتراكات شهرية، لا إضافات خفية.</p>
    </div>

    <div class="pricing-grid">

      <div class="pricing-card">
        <div class="pricing-name">المبتدئة</div>
        <div class="pricing-price"><sup>$</sup>999</div>
        <div class="pricing-note">رسوم إعداد لمرة واحدة</div>
        <p class="pricing-sub">للتجار الجدد الذين يطلقون أول متجر إلكتروني.</p>
        <ul class="pricing-features">
          <li><span class="check">✓</span>نطاق + SSL + استضافة</li>
          <li><span class="check">✓</span>بوابة دفع واحدة</li>
          <li><span class="check">✓</span>تصميم مخصص</li>
          <li><span class="check">✓</span>تدفق أتمتة واحد</li>
          <li><span class="check">✓</span>دعم 30 يوماً</li>
        </ul>
        <a href="#contact" class="pricing-cta pricing-cta-outline">اختر المبتدئة</a>
      </div>

      <div class="pricing-card featured">
        <div class="pricing-badge">الأكثر شيوعاً</div>
        <div class="pricing-name">الاحترافية</div>
        <div class="pricing-price"><sup>$</sup>2,499</div>
        <div class="pricing-note">رسوم إعداد لمرة واحدة</div>
        <p class="pricing-sub">للتجار في مرحلة النمو المستعدين للتوسع.</p>
        <ul class="pricing-features">
          <li><span class="check">✓</span>كل شيء في المبتدئة</li>
          <li><span class="check">✓</span>لوحة تقارير</li>
          <li><span class="check">✓</span>تكامل CRM أو Sheets</li>
          <li><span class="check">✓</span>خادم n8n مخصص</li>
          <li><span class="check">✓</span>ثلاثة تدفقات أتمتة</li>
        </ul>
        <a href="#contact" class="pricing-cta pricing-cta-primary">اختر الاحترافية</a>
      </div>

      <div class="pricing-card">
        <div class="pricing-name">الخليج الخاصة</div>
        <div class="pricing-price"><sup>$</sup>3,499</div>
        <div class="pricing-note">رسوم إعداد لمرة واحدة</div>
        <p class="pricing-sub">للتجار الذين يخدمون أسواق الخليج.</p>
        <ul class="pricing-features">
          <li><span class="check">✓</span>مدى + Apple Pay + STC Pay</li>
          <li><span class="check">✓</span>توطين عربي كامل (RTL)</li>
          <li><span class="check">✓</span>إعداد ضريبة القيمة المضافة</li>
          <li><span class="check">✓</span>ثلاث استشارات قانونية</li>
          <li><span class="check">✓</span>مراجعة الامتثال</li>
        </ul>
        <a href="#contact" class="pricing-cta pricing-cta-outline">اختر الخليج</a>
      </div>

      <div class="pricing-card">
        <div class="pricing-name">المؤسسات</div>
        <div class="pricing-price" style="font-size:36px;padding-top:6px">مخصص</div>
        <div class="pricing-note">يُحدَّد بحسب نطاق المشروع</div>
        <p class="pricing-sub">للتجار الذين يعملون على نطاق واسع.</p>
        <ul class="pricing-features">
          <li><span class="check">✓</span>سوق متعدد البائعين</li>
          <li><span class="check">✓</span>تقارير متقدمة</li>
          <li><span class="check">✓</span>تطبيق جوال</li>
          <li><span class="check">✓</span>SLA مخصص</li>
          <li><span class="check">✓</span>صيانة مستمرة</li>
        </ul>
        <a href="#contact" class="pricing-cta pricing-cta-outline">تحدث مع المبيعات</a>
      </div>

    </div>

    <p class="pricing-footnote">
      جميع الأسعار بالدولار الأمريكي · رسوم إعداد لمرة واحدة · الإضافات: n8n مُدار $149 إعداد + $15/شهر · إصلاح سريع $99–$299
    </p>

  </div>
</section>

<!-- ══ ABOUT ══════════════════════════════════════════════════════════════ -->
<section class="about section-pad" id="about">
  <div class="container">
    <div class="about-layout">

      <div class="about-left">
        <div class="eyebrow"><span class="eyebrow-dot" style="background:rgba(255,255,255,0.3)"></span>عن الشركة</div>
        <h2 class="section-title">عقد واحد.<br>جهة مسؤولية واحدة.</h2>
        <div class="about-body">
          <p>نيوتكنولوجي سولوشنز ذ.م.م شركة تقنية أمريكية مسجلة في ولاية وايومنغ. نهدف إلى إزالة التعقيد التقني الذي يعيق التجار الإلكترونيين.</p>
          <p>سواء كنت تطلق أول متجر على Shopify أو تطور سوقاً إلكترونياً في الخليج مع توطين عربي كامل وامتثال لضريبة القيمة المضافة — نوفر البنية التحتية التقنية الكاملة تحت اتفاقية واحدة.</p>
          <p>فريقنا يعمل في الولايات المتحدة ودول مجلس التعاون الخليجي. كل مشروع يخضع للقانون الأمريكي، بأسعار شفافة، ويُسلَّم في جدول زمني ثابت.</p>
        </div>
      </div>

      <div class="about-stats">
        <div class="about-stat">
          <div class="about-stat-val">وايومنغ</div>
          <div class="about-stat-label">ولاية التأسيس، الولايات المتحدة</div>
        </div>
        <div class="about-stat">
          <div class="about-stat-val">خليج + US</div>
          <div class="about-stat-label">أسواق الخدمة النشطة</div>
        </div>
        <div class="about-stat">
          <div class="about-stat-val">$999</div>
          <div class="about-stat-label">السعر المبدئي، باقات بسعر ثابت</div>
        </div>
        <div class="about-stat">
          <div class="about-stat-val">7 أيام</div>
          <div class="about-stat-label">أول بيئة تجريبية تُسلَّم</div>
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
        <div class="eyebrow"><span class="eyebrow-dot"></span>الأسئلة الشائعة</div>
        <h2 class="section-title">أسئلة شائعة، إجابات صادقة</h2>
        <p class="section-sub">كل ما تحتاج معرفته قبل بدء مشروعك.</p>

        <div class="faq-cta-box">
          <h4>لا تزال لديك أسئلة؟</h4>
          <p>احجز مكالمة مجانية لمدة 30 دقيقة — بدون ضغوط مبيعات، فقط إجابات.</p>
          <a href="#contact" class="btn btn-primary" style="display:inline-flex;font-size:14px;padding:11px 22px">احجز مكالمة مجانية</a>
        </div>
      </div>

      <div class="accordion">
        <?php
        $faqs = [
          ['كم يستغرق المشروع عادةً؟',
           'الباقة المبتدئة تُطلق في 7-10 أيام عمل. الباقة الاحترافية عادةً 3-4 أسابيع. باقة الخليج الخاصة تستغرق 4-6 أسابيع بسبب متطلبات التوطين. جداول مشاريع المؤسسات تُحدَّد بشكل فردي.'],
          ['هل تعملون مع منصات غير المذكورة؟',
           'نعم. بينما نتخصص في Shopify وWooCommerce وSalla وZid وWuilt، عملنا على Magento وBigCommerce ومتاجر مبنية مخصصة. أرسل لنا تفاصيل منصتك وسنؤكد الملاءمة.'],
          ['من يمتلك الكود والأصول التي تبنيها؟',
           'أنت. كل مخرج — الكود والتصاميم وتدفقات الأتمتة والتوثيق — ينتقل إليك عند الدفع النهائي. لا نحتفظ بأي ملكية أو مطالبات ترخيص على عملك.'],
          ['ماذا لو انكسر شيء بعد الإطلاق؟',
           'كل باقة تشمل نافذة دعم محددة (30 يوماً كحد أدنى). بعدها يمكنك شراء الدعم كتذاكر إصلاح سريع ($99-$299) أو الترقية إلى اتفاقية صيانة مستمرة.'],
          ['هل تتولون الاستضافة بعد الإطلاق؟',
           'نعم، بشكل اختياري. نقدم استضافة VPS مُدارة من $5/شهر وخوادم أتمتة n8n مُدارة بـ $149 إعداد + $15/شهر. يمكنك أيضاً الاستضافة الذاتية إن أردت.'],
          ['كيف تسير المدفوعات؟',
           '50% دفعة مقدمة للبدء، 50% عند التسليم النهائي. نقبل Stripe (بطاقات، ACH، Apple Pay) والتحويلات البنكية. مشاريع المؤسسات قد تستخدم فوترة قائمة على مراحل.'],
          ['هل يمكنني رؤية العمل قبل الفاتورة النهائية؟',
           'دائماً. ستصل إلى بيئة تجريبية كاملة منذ الأسبوع الأول من أي مشروع. الدفع النهائي يُفعَّل فقط بعد مراجعتك وموافقتك على المخرجات.'],
          ['هل توقعون اتفاقيات عدم إفصاح؟',
           'نعم. نوقع اتفاقيات عدم إفصاح متبادلة قبل بدء أي مشروع يتضمن مشاركة معلومات تجارية سرية.'],
          ['ماذا لو لم أكن تقنياً ولا أعرف ما أحتاجه؟',
           'هذا بالضبط من بُنيت خدمة الاستشارات لأجله. استشارة بداية بـ $299 تنتج وثيقة متطلبات كاملة توضح ما تحتاجه ولماذا وما يجب أن يكلفه.'],
          ['هل الأسعار قابلة للتفاوض؟',
           'باقاتنا المنشورة بأسعار ثابتة. لنطاق مشاريع المؤسسات أو الالتزامات متعددة الباقات، يتوفر تسعير مخصص — حدد موعداً للحديث.'],
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
        <div class="eyebrow"><span class="eyebrow-dot" style="background:rgba(255,255,255,0.3)"></span>الشريك الإقليمي</div>
        <h2 class="section-title">حضور محلي في المملكة العربية السعودية</h2>
        <p class="section-sub">للعملاء العاملين في المملكة، نتعاون مع شريك محلي مستقل لإدارة العلاقات والتواصل الميداني.</p>
      </div>

      <div class="partner-card">
        <div class="partner-header">
          <div class="partner-icon">SA</div>
          <div>
            <h3 class="partner-name">مكتب فهد سعد فهد المنصور للخدمات الإلكترونية</h3>
            <div class="partner-tag">
              <span style="width:6px;height:6px;border-radius:50%;background:#4ADE80;display:inline-block"></span>
              شريك شرفي · المملكة العربية السعودية
            </div>
          </div>
        </div>
        <p class="partner-body">مكتب سعودي مستقل يدعم علاقاتنا مع العملاء الإقليميين والمشاركة الميدانية في المملكة. يساعد المكتب في التعريفات المحلية وتيسير الاجتماعات ودعم الاتصالات داخل المنطقة.</p>
        <div class="partner-notice">
          نيوتكنولوجي سولوشنز ذ.م.م ومكتب المنصور كيانان قانونيان مستقلان؛ هذه شراكة قائمة على العلاقات، وليست هيكل شركة أم وتابعة.
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
        <div class="eyebrow"><span class="eyebrow-dot"></span>ابدأ الآن</div>
        <h2 class="section-title">هل أنت مستعد للإطلاق؟</h2>
        <p class="section-sub">احجز جلسة تقييم مجانية لمدة 30 دقيقة. بدون ضغوط مبيعات، بدون التزام — فقط محادثة صادقة حول مشروعك.</p>

        <div class="contact-info" style="margin-top:28px">
          <div class="contact-info-line"><span>البريد</span> hello@neotechnology.solutions</div>
          <div class="contact-info-line"><span>الموقع</span> neotechnology.solutions</div>
          <div class="contact-info-line"><span>الكيان</span> NeoTechnology Solutions LLC (Wyoming)</div>
          <div class="contact-info-line"><span>EIN</span> 36-5148912</div>
        </div>
      </div>

      <div class="contact-form-wrap">
        <?php if (isset($_GET['sent'])): ?>
          <div style="background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.25);border-radius:8px;padding:16px 20px;margin-bottom:24px;font-size:14px;color:#15803D;">
            تم استلام رسالتك — سنتواصل معك خلال يوم عمل واحد.
          </div>
        <?php endif; ?>

        <form method="post" action="<?= $admin_url ?>">
          <?php wp_nonce_field('nts_contact', 'nts_contact_nonce'); ?>
          <input type="hidden" name="action" value="nts_contact">
          <div aria-hidden="true" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden">
            <label for="nts_hp_url">Website</label>
            <input type="text" id="nts_hp_url" name="nts_hp_url" tabindex="-1" autocomplete="off" value="">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="name-ar">الاسم <span style="color:#EF4444">*</span></label>
              <input class="form-input" type="text" id="name-ar" name="name" required placeholder="اسمك">
            </div>
            <div class="form-group">
              <label class="form-label" for="email-ar">البريد الإلكتروني <span style="color:#EF4444">*</span></label>
              <input class="form-input" type="email" id="email-ar" name="email" required placeholder="you@company.com" dir="ltr">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="company-ar">الشركة</label>
              <input class="form-input" type="text" id="company-ar" name="company" placeholder="اختياري">
            </div>
            <div class="form-group">
              <label class="form-label" for="market-ar">السوق</label>
              <select class="form-select" id="market-ar" name="market">
                <option value="">اختر السوق</option>
                <option value="Gulf">الخليج (GCC)</option>
                <option value="US">الولايات المتحدة</option>
                <option value="Both">كلاهما</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="stage-ar">مرحلة المشروع</label>
            <select class="form-select" id="stage-ar" name="stage">
              <option value="">اختر المرحلة</option>
              <option value="Idea">فكرة فقط</option>
              <option value="Planning">مرحلة التخطيط</option>
              <option value="Ready to start">جاهز للبدء</option>
              <option value="Existing store">متجر قائم يحتاج تحسيناً</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="message-ar">الرسالة <span style="color:#EF4444">*</span></label>
            <textarea class="form-textarea" id="message-ar" name="message" required placeholder="أخبرنا عن مشروعك…"></textarea>
          </div>

          <button type="submit" class="form-submit">← إرسال الرسالة</button>
        </form>
      </div>

    </div>
  </div>
</section>

<!-- ── FOOTER ────────────────────────────────────────────────────────────── -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">

      <div class="footer-col">
        <div class="footer-brand-logo" style="font-family:'Cairo',sans-serif">نيو<span>تكنولوجي</span></div>
        <p class="footer-brand-desc">
          شركة ذ.م.م أمريكية تقدم بنية تحتية متكاملة للتجارة الإلكترونية للتجار في الخليج والولايات المتحدة. عقد واحد. جهة مسؤولية واحدة.
        </p>
      </div>

      <div class="footer-col">
        <div class="footer-col-title">الخدمات</div>
        <ul>
          <li><a href="#services">إعداد المتجر</a></li>
          <li><a href="#services">حلول الدفع</a></li>
          <li><a href="#services">أتمتة سير العمل</a></li>
          <li><a href="#services">النطاق والاستضافة</a></li>
          <li><a href="#services">استشارات الذكاء الاصطناعي</a></li>
          <li><a href="#services">دعم الإصلاح السريع</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <div class="footer-col-title">الشركة</div>
        <ul>
          <li><a href="#about">عن الشركة</a></li>
          <li><a href="#process">العملية</a></li>
          <li><a href="#faq">الأسئلة الشائعة</a></li>
          <li><a href="#contact">تواصل معنا</a></li>
          <li><a href="#pricing">الأسعار</a></li>
          <li><a href="<?= $home_url ?>">English ↗</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <div class="footer-col-title">القانونية</div>
        <ul>
          <li><a href="<?= esc_url(home_url('/privacy-policy/')) ?>">سياسة الخصوصية</a></li>
          <li><a href="<?= esc_url(home_url('/terms-of-service/')) ?>">شروط الخدمة</a></li>
          <li><a href="<?= esc_url(home_url('/refund-policy/')) ?>">سياسة الاسترداد</a></li>
          <li><a href="<?= esc_url(home_url('/sla/')) ?>">اتفاقية مستوى الخدمة</a></li>
          <li><a href="<?= esc_url(home_url('/cookie-policy/')) ?>">سياسة ملفات تعريف الارتباط</a></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <p class="footer-copy">
        © <?= date('Y') ?> نيوتكنولوجي سولوشنز ذ.م.م.<br>
        شركة ذات مسؤولية محدودة بولاية وايومنغ، الولايات المتحدة الأمريكية. EIN 36-5148912.
      </p>
      <p class="footer-partner-note">
        الشريك الإقليمي: مكتب فهد سعد فهد المنصور للخدمات الإلكترونية — شريك شرفي مستقل، المملكة العربية السعودية. نيوتكنولوجي سولوشنز ذ.م.م ومكتب المنصور كيانان قانونيان مستقلان.
      </p>
    </div>

  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
