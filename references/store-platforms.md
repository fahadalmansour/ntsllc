# Store Platforms — Deep Reference Guide
**NeoTechnology Solutions LLC — Internal Use Only**  
Version 1.0 | May 2026

---

## 1. Platform Coverage Matrix

| Platform | Market Focus | Monthly Cost (USD) | Transaction Fee | Hosted? | Arabic / RTL? | VAT Support? |
|---|---|---|---|---|---|---|
| Shopify | Global / US | $39–$399 | 0.5–2% (non-Shopify Payments) | Yes | Partial (theme-level) | Via app |
| WooCommerce | Global / Self-hosted | $0 (plugin) + hosting | 0% (gateway fee only) | No | Full (plugin + WPML) | WooCommerce Germanized / SUMO VAT |
| Salla | GCC (Saudi-first) | SAR 117–499/mo (~$31–133) | 0% | Yes | Native | Native (15% VAT on invoices) |
| Zid | GCC (Saudi-first) | SAR 99–399/mo (~$26–106) | 0–1% | Yes | Native | Native |
| Wuilt | MENA / SMB | $9–$49/mo | 2% (free plan) | Yes | Yes | Partial |
| Magento (Adobe Commerce) | Enterprise global | $0 (Open Source) / $22k+ (Commerce) | 0% | No (Open Source) | Via extension | Full |
| BigCommerce | Global / Mid-market | $39–$399/mo | 0% | Yes | Via app | Via app |
| Shopware | Europe / DACH | $0 (Community) / €600+/mo | 0% | No | Via plugin | Full |

---

## 2. Shopify

### 2.1 Plan Structure (2026)
| Plan | Monthly (billed annually) | Staff accounts | Shipping discount | Transaction fee (no Shopify Pay) |
|---|---|---|---|---|
| Basic | $29 | 2 | Up to 77% | 2.0% |
| Shopify | $79 | 5 | Up to 88% | 1.0% |
| Advanced | $299 | 15 | Up to 88% | 0.5% |
| Plus | $2,300 (min) | Unlimited | Negotiated | 0.15% |

> **Note:** Shopify Payments is unavailable in Saudi Arabia and most GCC countries as of 2026. All GCC merchants pay the transaction fee on top of gateway fees. For US merchants, Shopify Payments eliminates the transaction fee.

### 2.2 GCC-Specific Limitations
- **No Shopify Payments** in SA, UAE, Kuwait, Bahrain, Qatar, Oman (Stripe's Saudi availability is limited; must use Tap, HyperPay, Moyasar, PayTabs as gateways, all incurring transaction fee)
- Arabic: theme-level RTL only — quality depends entirely on theme; no first-party RTL system
- **Salla/Zid are preferred** for Saudi-first merchants due to native Mada support and Arabic UX

### 2.3 Integration Approach (NeoTechnology Workflow)
```
1. Create development store (Partner Program — free)
2. Install Debut/Dawn/custom theme → add RTL CSS overrides
3. Install gateway app (Tap, HyperPay, or Moyasar)
4. Install Arabic translation app (Weglot, Translate & Adapt, or Langify)
5. Connect n8n via Shopify Webhook (orders/create, orders/updated, refunds/create)
6. Configure SendGrid transactional email via Shopify Email Settings → SMTP override
```

### 2.4 When to Recommend Shopify
**Recommend when:**
- Client sells primarily to US/EU customers
- Client needs Shopify POS (physical retail + online)
- Client has a US bank account and can use Shopify Payments
- Client wants the largest third-party app ecosystem (~10,000+ apps)
- Client is B2C, high-volume, fashion / consumer goods

**Do NOT recommend when:**
- Client is Saudi-first and requires Mada + STC Pay natively
- Client is in a pure B2B wholesale context (pricing is awkward)
- Client needs heavy custom logic (Shopify's Liquid templating is restrictive)
- Budget is tight — gateway transaction fees compound at volume

### 2.5 NeoTech Delivery Checklist
- [ ] Theme installed and approved
- [ ] RTL CSS added (Arabic locale)
- [ ] Payment gateway app installed and tested (SAR 1 test transaction)
- [ ] Shipping zones: Saudi Arabia (Aramex, SMSA), US (USPS/UPS/FedEx)
- [ ] Tax rules configured (15% VAT KSA, applicable US states)
- [ ] n8n webhook connected: order notifications, inventory alerts
- [ ] Meta Pixel + Google Analytics 4 installed
- [ ] Product catalog imported (CSV or Matrixify)
- [ ] Test checkout: credit card + Mada (sandbox)

---

## 3. WooCommerce

### 3.1 Cost Structure
WooCommerce core is free. Real cost = hosting + extensions:

| Component | Typical Cost |
|---|---|
| WooCommerce plugin | Free |
| WordPress hosting (VPS/managed) | $5–$40/mo |
| Premium theme (Flatsome, Astra Pro, Woodmart) | $59–$89 one-time |
| WPML (multilingual AR/EN) | $99/yr |
| Arabic RTL plugin | Free (RTL WooCommerce) or included in theme |
| WooCommerce Subscriptions | $279/yr |
| WooCommerce Bookings | $249/yr |
| VAT compliance plugin (Saudi) | $49–$99/yr |
| Gateway plugin (Moyasar, HyperPay, Tap) | Free (official plugins) |

**Total typical GCC setup: $60–$250 year-one, $30–$150/yr renewal**

### 3.2 Hosting Options for WooCommerce
| Provider | Type | Monthly Cost | Notes |
|---|---|---|---|
| Namecheap Stellar Plus | Shared | $2.98/mo | OK for <500 orders/mo; Fahad's VPS already there |
| Cloudways (DigitalOcean) | Cloud VPS | $14–$50/mo | Best performance/$ ratio |
| Kinsta | Managed WP | $35–$100/mo | Premium, best for 5k+ orders/mo |
| WP Engine | Managed WP | $30–$60/mo | US-focused |
| Local by Flywheel | Local dev | Free | Development only |

> **Fahad's VPS (162.254.39.146)**: Can host WooCommerce stores; already runs PHP 8.5 + MariaDB 11.4. Use `wp-config.php` table prefix (`wp_ngs_`, `wp_nk_`) to colocate multiple stores if needed.

### 3.3 Key Plugins for GCC WooCommerce Stores

**Payment:**
- `woocommerce-moyasar` — official Moyasar plugin, supports Mada + Apple Pay (free)
- `hyperpaywoocommerce` — HyperPay official plugin (free)
- `tap-payments-for-woocommerce` — Tap official (free)

**Arabic / RTL:**
- `wp-rtl-translation` — auto-RTL for WP admin
- `woocommerce-arabic-translations` — translateable `.po` files
- WPML + WooCommerce Multilingual — full bilingual catalog

**VAT / Compliance:**
- `woocommerce-tax-b2b` or `WooCommerce PDF Invoices & Packing Slips` — VAT-compliant invoices
- `SUMO WooCommerce Checkout VAT Number` — for B2B VAT exemptions

**Shipping:**
- `woo-aramex` — Aramex Saudi (official)
- `smsa-express-woocommerce` — SMSA official
- `WooCommerce Shipping` — DHL, FedEx, UPS

**Automation hook:**
- WooCommerce REST API v3 → n8n WooCommerce node
- Webhooks: `order.created`, `order.updated`, `customer.created`

### 3.4 When to Recommend WooCommerce
**Recommend when:**
- Client already has WordPress and wants to add e-commerce
- Client needs maximum customization (no platform lock-in)
- Client is technical or has an in-house developer
- Client has complex product catalog (variable, bundled, subscription)
- Client wants to own all data on their server

**Do NOT recommend when:**
- Client is non-technical and wants a fully managed SaaS experience
- Client needs very fast launch (2–3 days) — setup time is higher
- Client is Saudi-first without any WordPress familiarity (Salla is better)

### 3.5 NeoTech Delivery Checklist
- [ ] VPS provisioned (PHP 8.1+, MySQL 8+, 2GB+ RAM)
- [ ] WordPress + WooCommerce installed via WP-CLI
- [ ] Theme installed and child theme created (never edit parent)
- [ ] Arabic RTL verified in both admin and frontend
- [ ] Payment gateway tested (SAR 1 live test or sandbox)
- [ ] SSL verified (Let's Encrypt or provided cert)
- [ ] Aramex + SMSA shipping zones configured
- [ ] VAT rule 15% applied to KSA
- [ ] WooCommerce REST API keys generated for n8n
- [ ] wp-config.php: `WP_DEBUG false`, `WP_CACHE true`
- [ ] Jetpack or WP Rocket for caching

---

## 4. Salla

### 4.1 Plan Structure (2026, SAR)
| Plan | Monthly (SAR) | Monthly (~USD) | Products | Staff accounts | Key features |
|---|---|---|---|---|---|
| Starter | SAR 117 | ~$31 | 100 | 1 | Basic store, Mada, STC Pay |
| Growth | SAR 249 | ~$66 | 5,000 | 5 | Abandoned cart, analytics |
| Professional | SAR 499 | ~$133 | Unlimited | 15 | API access, custom domain, advanced automation |
| Elite (annual only) | SAR 2,999/yr | ~$800/yr | Unlimited | Unlimited | Dedicated account manager, priority support |

> Prices include VAT for Saudi-registered merchants.

### 4.2 Why Salla is the Default GCC Recommendation
1. **Native Mada + STC Pay + Apple Pay** — no extra plugin, built-in
2. **Arabic-first UI** — admin panel, invoices, shipping labels, customer comms all in Arabic
3. **ZATCA e-invoicing built-in** — Phase 2 FATOORA-compliant, required for SA merchants >SAR 5M revenue
4. **Local shipping integrations** — Aramex, SMSA, Naqel, Fetchr, J&T — one-click activation
5. **VAT 15%** — pre-configured for Saudi Tax Authority
6. **WhatsApp Business Integration** — built-in order notifications
7. **Salla Partners Program** — NeoTech can earn SAR 200–500 referral per merchant

### 4.3 Integration Approach
```
1. Create store via Salla Partner Portal
2. Select theme (Elegance, Beauty, Turbo, or custom Salla template)
3. Enable payment methods: Mada, STC Pay, Apple Pay, Tabby/Tamara (BNPL)
4. Configure shipping: Aramex + SMSA (credentials required)
5. Connect n8n via Salla Webhook (order.created, order.statusChanged)
   OR via Salla Apps (official n8n Salla node available)
6. Enable Salla Marketing → SendGrid/Mailchimp for email
7. Import products via Salla CSV template or API
```

### 4.4 Salla API & Developer Notes
- REST API v2: `https://api.salla.dev/` — OAuth2 bearer token
- Webhooks: 25+ event types (orders, products, customers, returns)
- Partner App SDK: Build custom Salla apps (Node.js / PHP)
- **n8n node**: Native Salla node available in n8n (search "Salla" in integrations)

### 4.5 Salla Limitations
- **No cross-border payment** — USD checkout not natively supported; requires Stripe app
- **US market** — not suitable for US-primarily customers
- **Custom checkout** — limited; Salla controls the checkout flow
- **Platform lock-in** — migrating away from Salla is painful; export formats are limited

### 4.6 NeoTech Delivery Checklist
- [ ] Partner store created (linked to NeoTech Partner account)
- [ ] Domain connected (CNAME or A record)
- [ ] Theme customized: logo, colors, fonts, Arabic copy
- [ ] Payment: Mada ✓, STC Pay ✓, Apple Pay ✓, Tabby/Tamara ✓
- [ ] Shipping: Aramex ✓, SMSA ✓ (rates configured per zone)
- [ ] ZATCA e-invoicing enabled (for VAT-registered merchants)
- [ ] n8n webhook: order.created → Slack/WhatsApp notification
- [ ] Test purchase: SAR 1 (Mada sandbox or test card)
- [ ] Google Analytics 4 + Meta Pixel via Salla Marketing

---

## 5. Zid

### 5.1 Plan Structure (2026, SAR)
| Plan | Monthly (SAR) | Monthly (~USD) | Features |
|---|---|---|---|
| Starter | SAR 99 | ~$26 | 200 products, 1 staff |
| Growth | SAR 249 | ~$66 | 10,000 products, 3 staff, abandoned cart |
| Advanced | SAR 399 | ~$106 | Unlimited, API, custom domain, analytics |

### 5.2 Zid vs. Salla — Decision Matrix

| Criteria | Salla | Zid |
|---|---|---|
| Arabic-first | ✓ Both | ✓ Both |
| Payment gateways | Mada/STC built-in | Mada/STC built-in |
| Theme ecosystem | Larger (200+ themes) | Smaller (50+ themes) |
| API documentation | Good | Good |
| ZATCA compliance | Full (Phase 2) | Full (Phase 2) |
| App/integrations marketplace | Larger | Smaller but growing |
| Partner commissions | SAR 200–500/referral | SAR 150–400/referral |
| UI/UX (merchant) | Slightly more polished | Cleaner, simpler |
| B2B features | Limited | Better B2B catalog |

**Rule of thumb:** Default to Salla for B2C fashion, home goods, and beauty. Prefer Zid for B2B wholesale, food & beverage, or merchants who want a simpler admin.

### 5.3 Integration Approach
```
1. Register store via Zid Partners
2. Connect domain (A record → Zid)
3. Enable payment: Mada, STC Pay, Visa/MC, Tabby
4. Configure Aramex / SMSA via Zid Shipping
5. n8n: Use Zid Webhook (order.placed, order.shipped)
   OR Zid's Zapier-like "Zid Flow" (internal)
6. Products: import via Zid CSV template or API v2
```

### 5.4 Zid API Notes
- REST API v2: `https://api.zid.sa/v1/`
- Auth: Bearer token (OAuth2)
- Rate limits: 1,000 req/hour (Growth), 5,000 req/hour (Advanced)
- Webhooks: order lifecycle, inventory, customer events

---

## 6. Wuilt

### 6.1 Overview
Wuilt is a website + e-commerce builder targeting MENA SMBs. Lower technical ceiling than Salla/Zid but simpler setup. Useful for merchants who want drag-and-drop with basic e-commerce.

### 6.2 Plan Structure
| Plan | Monthly (USD) | Features |
|---|---|---|
| Free | $0 | 5 products, Wuilt subdomain, 2% transaction fee |
| Starter | $9 | 100 products, custom domain, 2% fee |
| Business | $29 | 1,000 products, 0% fee, analytics |
| Pro | $49 | Unlimited, advanced SEO, priority support |

### 6.3 When Wuilt Makes Sense
- Micro-merchant (fewer than 50 SKUs, < SAR 10,000/month revenue)
- Client wants a combined website + store (services + products)
- Budget under $30/month total
- Client is Jordanian, Egyptian, or Lebanese (Wuilt has better MENA banking connections outside KSA)

**Not recommended for Saudi-first merchants** — Mada not natively supported; must use PayPal or Stripe (both limited in KSA).

---

## 7. Magento (Adobe Commerce)

### 7.1 Editions
| Edition | License | Monthly Cost | Best For |
|---|---|---|---|
| Magento Open Source (CE) | Free | Hosting only | Developers, custom builds |
| Adobe Commerce (EE) | Proprietary | ~$22,000+/yr | Enterprise 500+ orders/day |
| Adobe Commerce Cloud | SaaS + PaaS | $40,000+/yr | Largest retailers |

### 7.2 Technical Requirements
- PHP 8.1–8.3
- MySQL 8.0 / MariaDB 10.6
- Elasticsearch or OpenSearch (mandatory for catalog search)
- Redis (session + cache)
- VPS minimum: 4 vCPU, 8GB RAM, SSD
- Recommended: 8 vCPU, 16GB RAM for 1,000+ products

### 7.3 When NeoTech Recommends Magento
**Only when:**
- Client has >5,000 SKUs
- Client needs complex B2B functionality (company accounts, purchase orders, credit limits)
- Client has in-house Magento developer or budget for ongoing development (>$3,000/mo)
- Client has multi-store / multi-brand requirement (Magento handles this natively)

**Not recommended for:**
- Any client under 1,000 SKUs — overhead is not justified
- GCC clients without existing Magento dev team — Salla/WooCommerce is a better fit

### 7.4 Integration Notes
- Magento 2 REST API: full CRUD for products, orders, customers, carts
- GraphQL API: available for headless PWA setups
- n8n Magento node: available natively
- Arabic: via Magento Language Pack (Weblate/community) + RTL CSS
- GCC payments: Tap, HyperPay, PayTabs all have official Magento 2 extensions (free on GitHub)

---

## 8. Platform Selection Decision Tree

```
START: New client needs an online store
│
├── Primary market: Saudi Arabia / GCC?
│   ├── YES → Revenue < SAR 100k/year?
│   │   ├── YES → SALLA Starter ($31/mo) — fastest, native Mada
│   │   └── NO → Revenue > SAR 500k/year?
│   │       ├── YES → SALLA Professional or WooCommerce on VPS
│   │       └── NO → SALLA Growth ($66/mo) or ZID Growth ($66/mo)
│   │           └── B2B catalog? → ZID preferred
│   │
│   └── NO → Primary market: USA?
│       ├── YES → Already on WordPress?
│       │   ├── YES → WooCommerce + Stripe
│       │   └── NO → SHOPIFY Basic/Shopify (has Shopify Payments)
│       │
│       └── BOTH (US + GCC) → WooCommerce + VPS
│           (most flexible for multi-currency, multi-gateway)
│
├── SKU count >5,000 AND has dev team?
│   └── YES → Evaluate MAGENTO Open Source
│
└── Micro-merchant, limited budget, non-Saudi market?
    └── YES → WUILT Business or SHOPIFY Basic
```

---

## 9. Migration Paths

### Salla → WooCommerce
1. Export products via Salla CSV export
2. Transform CSV columns to WooCommerce format (SKU, price, categories, images)
3. Import via WooCommerce Product CSV Import Suite
4. Customer history: Salla API → export JSON → import via WooCommerce REST API
5. Orders: document-only (WooCommerce cannot import historical orders from Salla meaningfully; advise client to keep Salla read-only for 6 months post-migration)

### Shopify → WooCommerce
1. Use Shopify's built-in export (Products, Customers, Orders CSV)
2. Use "Cart2Cart" or "LitExtension" for automated migration (~$99–$299 one-time)
3. Image assets: `rsync` or bulk download tool

### WooCommerce → Salla
- Products: WooCommerce REST API → transform → Salla API (custom script required)
- **Warning:** Salla does not import order history; migration is product-only

---

## 10. NeoTech Partner Program Summary

| Platform | Program | Commission | Notes |
|---|---|---|---|
| Salla | Salla Partners | SAR 200–500/store setup | Plus ongoing 10% of client's monthly fee for 12 months |
| Zid | Zid Partners | SAR 150–400/store | Contact Zid Partners team |
| Shopify | Shopify Partners | 20% of monthly plan (Basic/Shopify/Advanced) | Recurring for life of client |
| WooCommerce | None (open source) | — | Revenue from setup/hosting fees only |
| Magento | Adobe Solution Partner | Requires Adobe certification | Not currently pursued |

> **Action:** Ensure NeoTech is registered in all three partner programs (Salla, Zid, Shopify). Partner accounts give free development stores, priority support, and referral tracking.
