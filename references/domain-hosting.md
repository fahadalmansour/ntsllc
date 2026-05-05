# Domain & Hosting — Deep Reference Guide
**NeoTechnology Solutions LLC — Internal Use Only**  
Version 1.0 | May 2026

---

## 1. Domain Registrars

### 1.1 Coverage Matrix

| Registrar | Reseller Program | .com Price/yr | .sa/.com.sa | .store | API | DNSSEC | Bulk Pricing |
|---|---|---|---|---|---|---|---|
| GoDaddy | Yes (discounts) | $12–$20 | Limited | $2 (promo) | Yes (GoDaddy API) | Yes | Yes |
| Enom | Yes (wholesale) | $8–$12 | No | Yes | Yes (EPP/XML) | Yes | Yes |
| Namecheap | Yes (Namecheap Reseller) | $9–$11 | No | Yes | Yes (Namecheap API) | Yes | Yes |
| Cloudflare Registrar | No (retail only) | $9.15 (at-cost) | No | No | Yes (API) | Yes | No |
| AWS Route 53 | No | $12 | No | No | Yes (AWS API) | Yes | No |
| SaudiNIC (nic.sa) | Yes (accredited registrar required) | N/A | SAR 150–300/yr | N/A | Via accredited registrar | Yes | No |

---

## 2. GoDaddy

### 2.1 Reseller Program
GoDaddy offers a **Reseller Program** through `godaddy.com/reseller`:
- White-label storefront at your own domain
- Commission: 10–30% on hosting packages; domains at reduced cost
- Access to **GoDaddy Pro** dashboard for managing multiple client accounts
- No minimum sales requirement to join

**NeoTech use case:** Register client domains under a GoDaddy Pro account. Client pays NeoTech; NeoTech buys at reseller rate. Margin: ~$3–8/domain/year.

### 2.2 Products Relevant to NeoTech Clients
| Product | Price/yr | Use Case |
|---|---|---|
| Domain .com | $12–$20 | Standard |
| Domain .store | $2–$5 (promo) | E-commerce brands |
| Domain .sa / .com.sa | Not directly — see SaudiNIC | Saudi-local brands |
| GoDaddy Managed WP | $10–$30/mo | Simple WooCommerce |
| cPanel VPS | $20–$80/mo | Multi-site hosting |
| SSL DV (Let's Encrypt via cPanel) | Free | Standard SSL |
| SSL OV (GoDaddy OV SSL) | $60–$100/yr | Trust indicator |
| Business Email (Microsoft 365) | $6/user/mo | Client email |
| GoDaddy Email Marketing | $10/mo | Basic newsletters |

### 2.3 API Integration
```
Base URL: https://api.godaddy.com/v1/
Auth: API Key + Secret (header: Authorization: sso-key {KEY}:{SECRET})

# Check domain availability
GET /domains/available?domain=example.com

# Purchase domain
POST /domains/purchase
{
  "domain": "example.com",
  "period": 1,
  "privacy": true,
  "autoRenew": true,
  "consent": { ... }
}

# Update DNS records
PATCH /domains/{domain}/records/{type}/{name}
[{"data": "1.2.3.4", "ttl": 600}]
```

### 2.4 GoDaddy Pros & Cons for NeoTech
**Pros:**
- Largest registrar globally — reliable infrastructure
- GoDaddy Pro dashboard handles 100+ client domains in one view
- White-label reseller program
- US-based support

**Cons:**
- Retail pricing is inflated — always use promo codes or reseller pricing
- Upsell-heavy checkout (annoying for client-facing purchases)
- Renewal prices jump significantly after year 1

---

## 3. Enom (now part of Tucows/OpenSRS)

### 3.1 Overview
Enom is a wholesale/reseller-first registrar. It is not intended for direct consumer purchases. **This is the registrar to use for volume domain reselling.**

### 3.2 Reseller Accounts
- Apply at `enom.com/resellers` — requires business verification
- Wholesale pricing: .com at $8.29/yr (vs. $12+ retail)
- White-label reseller portal included
- API: XML-based (legacy but reliable)

### 3.3 When to Use Enom
- Client is registering 10+ domains
- Building a multi-domain portfolio for a client (e.g., GCC market with regional TLDs)
- White-label domain reselling at scale

### 3.4 Enom API Notes
```
Protocol: HTTPS POST with form-encoded parameters
Base: https://reseller.enom.com/interface.asp

# Example: Check domain availability
cmd=Check&sld=example&tld=com&uid={USER}&pw={PASS}

# Register domain
cmd=Purchase&sld=example&tld=com&period=1&...

Response: XML or plain key=value pairs
```

> **Note:** Enom API is XML-based (early 2000s design). Wrap calls in a thin PHP/Python adapter. NeoTech uses this only for batch operations.

---

## 4. Namecheap

### 4.1 Products & Pricing
| Product | Price |
|---|---|
| .com domain | $9.98–$11/yr |
| .com.sa | Not available (use SaudiNIC path) |
| EasyWP (managed WordPress) | $3.88–$9.88/mo |
| Stellar Shared Hosting | $1.98–$4.98/mo |
| VPS (Pulsar) | $6/mo (1 vCPU, 2GB, 40GB SSD) |
| VPS (Quasar) | $12/mo (2 vCPU, 4GB, 80GB SSD) |
| Dedicated Server | $50+/mo |
| PositiveSSL | $5.99/yr |
| EssentialSSL (OV) | $29.99/yr |
| Business Email (Titan) | $1.58–$4.58/user/mo |
| Private Email | $1.58/user/mo |

> **Fahad's VPS:** 162.254.39.146 is a Namecheap cPanel VPS. Already in use for neotechnology.solutions, neogen.store email, and fahadalmansourconsulting.com.

### 4.2 Reseller Program
Namecheap offers a Reseller API program:
- Apply at `namecheap.com/reseller`
- Access to all products at reduced reseller pricing
- Namecheap API allows domain purchase, DNS management, SSL provisioning

### 4.3 Namecheap API
```
Base URL: https://api.namecheap.com/xml.response

Required params: ApiUser, ApiKey, UserName, ClientIp, Command

# Check domain availability
Command=namecheap.domains.check&DomainList=example.com,example.net

# Register domain
Command=namecheap.domains.create&DomainName=example.com&Years=1&...

# Update DNS (if using Namecheap DNS)
Command=namecheap.domains.dns.setHosts&SLD=example&TLD=com&...

# Create DNS record
HostName1=@ &RecordType1=A &Address1=1.2.3.4 &TTL1=1799
```

### 4.4 Namecheap Pros & Cons
**Pros:**
- Best value in the industry (no upsells, transparent pricing)
- Free WhoisGuard (privacy) on most TLDs
- Reliable cPanel VPS — Fahad already uses it
- Decent API documentation

**Cons:**
- Support response time slower than GoDaddy
- No Saudi-specific TLDs
- Shared hosting can be slow during peak hours

---

## 5. Cloudflare (DNS + CDN, not just registrar)

### 5.1 Cloudflare Registrar
- At-cost domain pricing — no markup on wholesale rates
- .com: ~$9.15/yr
- No reseller program (retail only)
- Best choice for domains you own and want cheapest renewal

### 5.2 Cloudflare DNS (Free plan)
Every NeoTech-managed site should be behind Cloudflare DNS for:
| Feature | Plan | Notes |
|---|---|---|
| Global Anycast DNS | Free | 100ms faster than registrar DNS |
| DDoS protection (L3/L4) | Free | Essential for e-commerce |
| SSL/TLS (Flexible, Full, Full Strict) | Free | Full Strict required for WooCommerce |
| WAF (basic ruleset) | Free | Stops common attacks |
| Page Rules | Free (3 rules) | URL redirects, cache rules |
| Caching (browser TTL) | Free | CDN for static assets |
| Workers (edge functions) | Free (100k req/day) | Useful for API proxying |
| R2 Object Storage | Free (10GB) | Alternative to S3 for images |
| Turnstile (CAPTCHA replacement) | Free | Use instead of reCAPTCHA |
| Bot Management | Pro ($20/mo) | Worth it for 1,000+ orders/day |
| Advanced WAF | Pro ($20/mo) | Extra rules |

### 5.3 Cloudflare Setup Template for NeoTech Clients
```
1. Add site to Cloudflare (change nameservers at registrar)
2. SSL: Full (strict) — requires valid origin cert
3. Always Use HTTPS: On
4. HSTS: On (max-age 12 months, includeSubDomains)
5. Minimum TLS Version: 1.2
6. Auto Minify: HTML, CSS, JS — On
7. Brotli: On
8. Rocket Loader: Off (breaks some JS-heavy apps)
9. Cache Level: Standard
10. Browser Cache TTL: 4 hours
11. Page Rules:
    - yourdomain.com/* → Cache Level: Cache Everything (for static stores)
    - /wp-admin/* → Cache Level: Bypass (for WooCommerce)
    - /cart → Cache Level: Bypass
    - /checkout → Cache Level: Bypass
12. Firewall Rules:
    - Block countries outside SA + US (if client is GCC-only)
    - Block known bad ASNs
13. Email routing: ON (forward admin@yourdomain.com → client Gmail)
```

### 5.4 Cloudflare API for Automation (n8n compatible)
```
Base URL: https://api.cloudflare.com/client/v4/
Auth: Bearer token or API Key + Email

# List zones
GET /zones

# Create DNS record
POST /zones/{zone_id}/dns_records
{
  "type": "A",
  "name": "subdomain.example.com",
  "content": "1.2.3.4",
  "ttl": 1,
  "proxied": true
}

# Purge cache
POST /zones/{zone_id}/purge_cache
{"purge_everything": true}
```

---

## 6. AWS Route 53

### 6.1 Pricing
- Domain registration: $12/yr (.com)
- Hosted zone: $0.50/zone/month
- DNS queries: $0.40/million (first 1B)
- Health checks: $0.50/endpoint/month

### 6.2 When to Use Route 53
- Client is already on AWS (EC2, ECS, CloudFront)
- Need latency-based routing or geo-routing
- Multi-region setup requiring programmatic DNS
- Route 53 Resolver for internal DNS on AWS VPC

**For typical NeoTech clients:** Route 53 is overkill. Use Cloudflare (free) instead.

---

## 7. Saudi .sa Domain Registration (SaudiNIC)

### 7.1 Overview
`.sa` and `.com.sa` domains are managed by **SaudiNIC** (part of CITC). Direct registration requires accredited Saudi registrars:
- **STC Telecom** (`domains.stc.com.sa`)
- **Arabia Domains** (`arabiadomains.com`)
- **Etihad Atheeb Telecom (GO)**
- **Zain** (limited)

### 7.2 Requirements
| Requirement | Individual (Saudi national) | Company |
|---|---|---|
| National ID | Saudi National ID (Iqama for expatriates) | CR number |
| Eligibility | .sa requires Saudi national or resident | Company must be registered in KSA |
| Price | SAR 150–300/yr | Same |
| Processing time | 1–3 business days | 1–5 business days |
| Ownership verification | CITC may audit | CITC may audit |

### 7.3 NeoTech Process for .sa Clients
1. Client provides: National ID / CR number, copy of ID
2. NeoTech submits registration via Arabia Domains or STC portal
3. CITC verifies ownership (automated in most cases)
4. DNS delegation: client points to Cloudflare or NeoTech nameservers
5. Annual renewal managed by NeoTech (add to calendar reminder)

> **Important:** `.sa` domains cannot be registered through GoDaddy, Namecheap, or Enom. Always use an accredited Saudi registrar.

---

## 8. SSL Certificates

### 8.1 Types and When to Use
| Type | Validation Level | Browser Trust | Price | Use Case |
|---|---|---|---|---|
| DV (Domain Validation) | Domain ownership only | Full | Free (Let's Encrypt) or $5–$20/yr | All standard e-commerce sites |
| OV (Organization Validation) | Domain + company verified | Full + org name in cert | $50–$200/yr | Corporate pages, SaaS platforms |
| EV (Extended Validation) | Most rigorous | Green bar (mostly removed in modern browsers) | $150–$400/yr | Banks, payment processors (less relevant now) |
| Wildcard DV | Domain + all subdomains | Full | Free (Let's Encrypt) or $50–$100/yr | Multi-subdomain setups |
| Multi-SAN | Multiple distinct domains | Full | $100–$300/yr | Multi-brand portfolios |

### 8.2 Let's Encrypt (Free SSL) — Standard for NeoTech
```bash
# Via cPanel (Namecheap VPS) — AutoSSL
# Login to cPanel → SSL/TLS → AutoSSL → Run AutoSSL

# Via Certbot (manual server)
certbot --nginx -d example.com -d www.example.com
certbot renew --quiet  # Add to cron: 0 3 * * * certbot renew --quiet

# Via Cloudflare Origin Certificate (wildcard, 15yr)
# Cloudflare Dashboard → SSL/TLS → Origin Server → Create Certificate
# Install on server, set CF SSL mode to "Full (strict)"
```

### 8.3 SSL Verification Checklist
```
□ https:// loads without warnings
□ HTTP → HTTPS redirect active
□ www → non-www (or vice versa) redirect active
□ Mixed content warnings: 0 (check browser console)
□ HSTS header present (Strict-Transport-Security)
□ Certificate expiry > 60 days (Let's Encrypt auto-renews at 30d)
□ Cloudflare: SSL mode is "Full (strict)" not "Flexible"
```

---

## 9. Hosting Architecture for NeoTech Client Types

### 9.1 Client Tier A — Starter ($999 package)
**Stack:** Namecheap VPS / cPanel shared → Salla/Zid hosted → or GoDaddy EasyWP  
**Cost to NeoTech:** $3–$15/mo  
**Suitable for:** <500 orders/mo, single store

### 9.2 Client Tier B — Professional ($2,499 package)
**Stack:** Cloudways (DigitalOcean) $14/mo VPS → WordPress + WooCommerce → Cloudflare CDN  
**Cost to NeoTech:** $14–$30/mo  
**Suitable for:** 500–5,000 orders/mo, needing automation + n8n

**Cloudways setup:**
1. Create server: DO 2GB ($14/mo) or DO 4GB ($22/mo) for high-traffic
2. Add WordPress application
3. One-click SSL (Let's Encrypt)
4. Enable Cloudways CDN (optional, $1/100GB served)
5. Enable Redis Object Cache
6. Enable New Relic monitoring ($15/mo — only if client requires it)

### 9.3 Client Tier C — GCC Special ($3,499 package)
**Stack:** Dedicated cPanel VPS (Namecheap or SSD Nodes) → WordPress + WooCommerce + Arabic theme  
**Cost to NeoTech:** $30–$60/mo  
**Suitable for:** Saudi-first, needs dedicated resources, Arabic + English

### 9.4 Client Tier D — Enterprise (Custom pricing)
**Stack:** AWS (EC2 + RDS + CloudFront + S3) or Hetzner dedicated  
**Cost to client:** $200–$1,000+/mo  
**NeoTech scope:** Architecture + deployment only; client handles ongoing ops

---

## 10. DNS Record Templates

### 10.1 Standard E-commerce Store
```
A      @          → VPS IP (e.g., 162.254.39.146)
A      www        → VPS IP
CNAME  shop       → hosted-platform.com (if using Salla/Shopify custom domain)
MX     @          → mail.provider.com (priority 10)
TXT    @          → "v=spf1 include:provider.com ~all"
TXT    @          → site verification (Google, Bing)
CNAME  _dmarc     → dmarc.provider.com
TXT    _dmarc     → "v=DMARC1; p=quarantine; rua=mailto:admin@domain.com"
```

### 10.2 Split Hosting (Website on VPS, Email on Namecheap)
*As used for NeoGen Store (31.220.42.110 website, 162.254.39.146 email):*
```
A      @          → 31.220.42.110  (website VPS)
A      www        → 31.220.42.110
MX     @          → mail.privateemail.com  (priority 10) — Namecheap email
TXT    @          → "v=spf1 include:privateemail.com ~all"
```

### 10.3 Cloudflare + Origin Server
```
A      @          → origin IP (proxied: ON — orange cloud)
A      www        → origin IP (proxied: ON)
A      direct     → origin IP (proxied: OFF — for SSH/monitoring bypass)
CNAME  mail       → mail.provider.com (proxied: OFF — email never proxied)
```

---

## 11. Hosting Cost Comparison (NeoTech Internal Margin Reference)

| Service | Cost to NeoTech | Charge to Client/yr | Margin |
|---|---|---|---|
| Namecheap VPS (Pulsar 2GB) | $72/yr | $150/yr | $78 |
| Cloudways DO 2GB | $168/yr | $300/yr | $132 |
| Cloudflare (Free plan) | $0 | $60/yr setup fee | $60 |
| GoDaddy .com domain | $10/yr | $25/yr | $15 |
| Namecheap .com domain | $10/yr | $20/yr | $10 |
| Let's Encrypt SSL | $0 | $30/yr (included in hosting) | — |
| Cloudflare Origin SSL | $0 | Bundled | — |
| Business Email (Titan via Namecheap) | $19/yr | $50/yr | $31 |

---

## 12. Post-Delivery Handoff Checklist

```
Domain & DNS
□ Domain registered (registrar confirmed, WHOIS accurate)
□ Privacy protection enabled
□ Nameservers pointing to Cloudflare (if used)
□ A/CNAME records verified (nslookup from external network)
□ MX records tested (send test email)
□ SPF, DKIM, DMARC configured

Hosting
□ Server provisioned (OS, PHP, MySQL versions documented)
□ cPanel/SSH credentials saved to client file
□ Backup policy: daily cPanel backups to remote location
□ Disk space headroom: >30% free

SSL
□ Certificate installed and valid (HTTPS loads without warnings)
□ HTTP → HTTPS redirect working
□ Auto-renewal configured (Certbot cron or cPanel AutoSSL)

Monitoring
□ UptimeRobot configured (5-minute checks, email + WhatsApp alerts)
□ Client notified of monitoring dashboard URL
```
