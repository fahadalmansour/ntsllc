# Communication Suite — Deep Reference Guide
**NeoTechnology Solutions LLC — Internal Use Only**  
Version 1.0 | May 2026

---

## 1. Platform Coverage Matrix

| Platform | Category | Free tier | Price starts | GCC delivery | Arabic support | n8n node? |
|---|---|---|---|---|---|---|
| SendGrid | Transactional email | 100 emails/day | $20/mo (50k) | Good | Yes | Yes |
| Resend | Transactional email | 3,000/mo | $20/mo (50k) | Improving | Yes | Yes (HTTP) |
| Mailchimp | Email marketing | 500 contacts | $13/mo | Good | Yes | Yes |
| Postmark | Transactional email | 100/mo | $15/mo (10k) | Good | Yes | Via HTTP |
| Amazon SES | Transactional email | 62k/mo (from EC2) | $0.10/1,000 | Good | Yes | Via HTTP |
| Twilio (SMS) | SMS | None | ~$0.0079/SMS | Full (SA, UAE, KW) | N/A | Yes |
| MessageBird/Bird | SMS + WhatsApp | None | Pay-as-go | Good | N/A | Via HTTP |
| Unifonic | SMS + WhatsApp | None | Custom | Saudi-first | Yes | Via HTTP |
| Wati | WhatsApp Business | None | $49/mo | Full | Yes | Via HTTP |
| Interakt | WhatsApp Business | None | $15/mo | Good | Yes | Via HTTP |
| WhatsApp Cloud API | WhatsApp | 1,000 free convos/mo | Per-conversation | Full | Yes | Via HTTP |

---

## 2. Transactional Email

### 2.1 SendGrid

#### Pricing (2026)
| Plan | Monthly Cost | Emails/mo | Dedicated IP | Template engine |
|---|---|---|---|---|
| Free | $0 | 100/day | No | Yes (Dynamic) |
| Essentials 50k | $20 | 50,000 | No | Yes |
| Essentials 100k | $35 | 100,000 | No | Yes |
| Pro 100k | $90 | 100,000 | Yes | Yes + advanced stats |
| Premier | Custom | Custom | Yes | Full |

> **SMTP relay:** SendGrid works as SMTP relay — configure WooCommerce, Salla, or any CMS to use `smtp.sendgrid.net:587` with API key as password.

#### Integration with WooCommerce (SMTP plugin)
```php
// wp-config.php — use WP Mail SMTP plugin (free) or configure directly
// WP Mail SMTP Settings:
Mailer: SendGrid
API Key: SG.xxxxxxxxxxxxxxxxxx
From Email: noreply@yourdomain.com
From Name: Your Store Name

// OR configure via code (in mu-plugins):
add_action('phpmailer_init', function($phpmailer) {
    $phpmailer->isSMTP();
    $phpmailer->Host = 'smtp.sendgrid.net';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = 587;
    $phpmailer->Username = 'apikey';
    $phpmailer->Password = 'SG.xxxxxxxxxxxx';
    $phpmailer->From = 'noreply@yourdomain.com';
    $phpmailer->FromName = 'Your Store';
});
```

#### SendGrid API — Send Email
```javascript
// n8n HTTP Request node or direct API call
Method: POST
URL: https://api.sendgrid.com/v3/mail/send
Headers: {Authorization: "Bearer SG.xxxxxx", Content-Type: "application/json"}
Body: {
  "personalizations": [{
    "to": [{"email": "customer@example.com", "name": "Ahmed"}],
    "dynamic_template_data": {
      "order_id": "12345",
      "customer_name": "Ahmed",
      "total": "SAR 450",
      "tracking_url": "https://..."
    }
  }],
  "from": {"email": "orders@yourdomain.com", "name": "YourStore"},
  "template_id": "d-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

#### Dynamic Templates (Recommended Workflow)
1. Build template in SendGrid UI → use `{{customer_name}}` Handlebars syntax
2. Get template ID (`d-xxxxx`)
3. Call API with `template_id` + `dynamic_template_data` object
4. Arabic templates: SendGrid supports RTL HTML — add `dir="rtl"` to `<table>` and `<td>` in template
5. Best practice: Create separate EN and AR template versions; pass `lang` variable to select

#### Domain Authentication (Required for Deliverability)
```
In SendGrid: Settings → Sender Authentication → Authenticate Your Domain
DNS records to add (provided by SendGrid):
  CNAME  em1234.yourdomain.com  → u1234567.wl.sendgrid.net
  CNAME  s1._domainkey.yourdomain.com  → s1.domainkey.uxxxxxx.wl.sendgrid.net
  CNAME  s2._domainkey.yourdomain.com  → s2.domainkey.uxxxxxx.wl.sendgrid.net
```

#### GCC Deliverability Notes
- Gmail, Yahoo, Outlook: High deliverability from SendGrid's IP pools
- Saudi corporate email (STC, Mobily): Occasional spam filtering — use dedicated IP ($30/mo) for high-volume
- Verify SPF + DKIM + DMARC before first send
- Bounce rate > 5% will trigger account warning; always use double opt-in for marketing

---

### 2.2 Resend

#### Overview
Resend is a developer-first transactional email API (2022 launch). Cleaner API than SendGrid, React Email template support, excellent for modern React/Next.js apps.

#### Pricing (2026)
| Plan | Monthly Cost | Emails/mo | Domains |
|---|---|---|---|
| Free | $0 | 3,000 | 1 |
| Pro | $20 | 50,000 | 5 |
| Scale | $90 | 100,000+ | Unlimited |

#### API — Send Email
```javascript
// Using Resend Node SDK (npm install resend)
import { Resend } from 'resend';
const resend = new Resend('re_xxxxxxxxxxxx');

await resend.emails.send({
  from: 'NeoTech Orders <orders@yourdomain.com>',
  to: ['customer@example.com'],
  subject: 'Order Confirmed #12345',
  html: '<h1>Your order is confirmed!</h1>',
  // OR use React Email template:
  react: <OrderConfirmationEmail orderData={orderData} />
});
```

#### When to Choose Resend Over SendGrid
- New project using React/Next.js (React Email templates are superior)
- Simpler pricing structure needed
- Developer prefers clean API over enterprise complexity
- Starting out — 3,000 free emails/mo is more useful than SendGrid's 100/day

#### When SendGrid is Better
- Client needs marketing + transactional from one platform
- Client needs dedicated IP (high volume, reputation management)
- Client has existing SendGrid templates

---

### 2.3 Amazon SES

#### Pricing
- $0.10 per 1,000 emails (no monthly fee)
- From EC2: First 62,000 emails/month free
- Dedicated IPs: $24.95/IP/month

#### When to Use SES
- Client is already on AWS
- Volume >100,000 emails/month (becomes cheapest option)
- Client needs S3 integration for email attachments

#### Setup Notes
- Requires moving out of SES sandbox (submit request to AWS support)
- Sandbox limits: 200 emails/24hr, only to verified addresses
- Production approval: 1–2 business days
- SES is harder to set up than SendGrid/Resend — only recommend for technical clients

---

## 3. SMS

### 3.1 Twilio

#### Pricing (Saudi Arabia numbers, 2026)
| Type | Cost | Notes |
|---|---|---|
| Inbound local number (SA) | $1/mo | Saudi local number |
| Outbound SMS to SA | $0.0479/SMS | Carrier fees included |
| Outbound SMS to US | $0.0079/SMS | Very cheap |
| WhatsApp session (Twilio) | $0.005–$0.0877/message | Varies by conversation type |
| Programmable voice (SA) | $0.013/min inbound, $0.022/min outbound | For IVR |

> **Important:** Twilio SMS to Saudi Arabia may require pre-approved sender ID for marketing messages. Transactional OTP/order updates go through fine.

#### Saudi Sender ID Registration
Saudi telecoms require sender IDs to be registered:
1. Submit DLT registration form via Twilio's Saudi Sender ID Request
2. Approval: 2–4 weeks via CITC-registered channels
3. Use short sender ID (e.g., "NEOTech" — max 11 chars alphanumeric)
4. Until approved: use long code (local Saudi number) for testing

#### Twilio API — Send SMS
```javascript
// n8n Twilio node OR HTTP Request
const twilio = require('twilio');
const client = twilio(accountSid, authToken);

client.messages.create({
  body: 'تم تأكيد طلبك رقم 12345 — نيوتك',
  from: '+966XXXXXXXXX',  // Your Twilio Saudi number
  to: '+966XXXXXXXXX'     // Customer number
});
```

#### n8n Twilio Node Configuration
```
Credential: Twilio API
  Account SID: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  Auth Token: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Node: Twilio - Send SMS
  From: +966XXXXXXXXX
  To: {{$json.customer_phone}}
  Message: {{$json.sms_body}}
```

#### Twilio for OTP (Order Verification)
```javascript
// n8n flow for phone verification:
// 1. Generate 6-digit OTP
const otp = Math.floor(100000 + Math.random() * 900000).toString();
// 2. Store in DB with expiry (15 min)
// 3. Send via Twilio
// 4. Webhook from client form → verify OTP → proceed
```

---

### 3.2 Unifonic (Saudi-First SMS + WhatsApp)

#### Overview
Unifonic is a Saudi-based CPaaS (Communications Platform as a Service). Recommended for Saudi-only campaigns where local sender ID approval is faster.

#### Products
- SMS Messaging (local sender ID pre-approved for Saudi businesses)
- WhatsApp Business API (official Meta partner)
- Push notifications
- Voice calls
- Chat SDK (web/mobile widget)

#### Pricing
Custom pricing — contact Unifonic sales. Typical range:
- SMS to SA: SAR 0.18–0.25/SMS (comparable to Twilio)
- WhatsApp conversations: Per conversation (same Meta BSP pricing)
- Monthly platform fee: Starts ~SAR 500/mo

#### When to Choose Unifonic Over Twilio
- Client is Saudi-registered company needing approved alphanumeric sender ID fast
- Client wants Arabic-first support and Saudi-based account management
- Compliance requirements favor local Saudi vendor

#### API Integration
```
Base URL: https://api.unifonic.com/rest/
Method: POST /messages/send
Headers: {AppSid: your_app_sid}
Body: {
  "Recipient": "0501234567",
  "Body": "طلبك رقم 12345 تم تأكيده",
  "SenderID": "NEOTech"
}
```

---

## 4. WhatsApp Business

### 4.1 WhatsApp Business API Overview

There are three tiers:
1. **WhatsApp Business App** — Free, manual, 1 device, no API. For micro-businesses only.
2. **WhatsApp Cloud API** — Official Meta API, direct integration, pay-per-conversation.
3. **Business Solution Provider (BSP)** — Meta-certified partners (Twilio, Wati, Interakt, Unifonic) who wrap the Cloud API with a UI, support, and template management.

**NeoTech clients: Use Cloud API directly (via n8n) OR a BSP for non-technical clients.**

---

### 4.2 WhatsApp Cloud API (Direct)

#### Pricing (Meta, 2026)
WhatsApp charges per **conversation** (24-hour window), not per message:

| Conversation Type | Price per conversation (SA) |
|---|---|
| Marketing | $0.0640 |
| Utility (order updates, confirmations) | $0.0160 |
| Authentication (OTP) | $0.0160 |
| Service (customer-initiated) | $0.0000 (free) |
| Free tier | 1,000 free conversations/month per phone number |

> As of 2024, Meta changed billing to conversation-type based. Marketing conversations are most expensive; order confirmations are 4x cheaper.

#### Setup Process
1. Create Meta Business Manager account
2. Add WhatsApp Business Account (WABA)
3. Register phone number (Saudi or US)
4. Verify business (Meta business verification — upload CR document or equivalent)
5. Create message templates (must be pre-approved by Meta, 24–48 hours)
6. Get permanent access token
7. Configure webhook URL (n8n webhook to receive inbound messages)

#### API — Send Template Message (n8n HTTP node)
```javascript
Method: POST
URL: https://graph.facebook.com/v19.0/{PHONE_NUMBER_ID}/messages
Headers: {Authorization: "Bearer {ACCESS_TOKEN}"}
Body: {
  "messaging_product": "whatsapp",
  "to": "966501234567",
  "type": "template",
  "template": {
    "name": "order_confirmation",  // Pre-approved template name
    "language": {"code": "ar"},
    "components": [{
      "type": "body",
      "parameters": [
        {"type": "text", "text": "Ahmed"},
        {"type": "text", "text": "12345"},
        {"type": "text", "text": "SAR 450"}
      ]
    }]
  }
}
```

#### API — Send Free-Form Message (within 24hr session)
```javascript
{
  "messaging_product": "whatsapp",
  "to": "966501234567",
  "type": "text",
  "text": {"body": "مرحباً! كيف يمكننا مساعدتك؟"}
}
```

#### API — Receive Incoming Messages (Webhook)
```javascript
// n8n Webhook node receives:
{
  "object": "whatsapp_business_account",
  "entry": [{
    "changes": [{
      "value": {
        "messages": [{
          "from": "966501234567",
          "type": "text",
          "text": {"body": "أريد معرفة حالة طلبي"},
          "timestamp": "1700000000",
          "id": "wamid.xxxxxxxx"
        }]
      }
    }]
  }]
}
```

#### Template Requirements
- Templates must be approved by Meta before use
- Cannot use templates for promotional messages without explicit opt-in
- Template format: `Hello {{1}}, your order {{2}} is confirmed.`
- Variables: positional, must match payload `parameters` array
- Arabic templates: write template body in Arabic, set `language.code: "ar"`
- Approval time: 24–48 hours (automated review, occasionally manual)

---

### 4.3 Wati (WhatsApp BSP)

#### Overview
Wati provides a no-code WhatsApp platform on top of the WhatsApp Cloud API. Suitable for clients who want a CRM-like interface without coding.

#### Pricing
| Plan | Monthly | WhatsApp conversations | Agents |
|---|---|---|---|
| Growth | $49 | 1,000 included | 5 |
| Pro | $99 | 3,000 included | 10 |
| Business | $299 | 10,000 included | 20 |
| Enterprise | Custom | Custom | Unlimited |

> Extra conversations billed at Meta's conversation rate + Wati's small markup.

#### Features
- Shared inbox (team handles messages)
- Chatbot builder (no-code decision tree)
- Broadcast (bulk messaging approved templates)
- Contact management
- n8n / Zapier integration via Wati API

#### Wati API Integration (n8n)
```javascript
Method: POST
URL: https://live-mt-server.wati.io/api/v1/sendTemplateMessage
Headers: {
  Authorization: "Bearer {WATI_TOKEN}",
  Content-Type: "application/json"
}
Body: {
  "broadcastName": "order_confirmation",
  "template_name": "order_confirmation",
  "broadcast_input": [{
    "whatsappNumber": "966501234567",
    "parameters": [
      {"name": "name", "value": "Ahmed"},
      {"name": "order_id", "value": "12345"},
      {"name": "total", "value": "SAR 450"}
    ]
  }]
}
```

---

### 4.4 Interakt (WhatsApp BSP)

#### Overview
Interakt is an Indian-built BSP with strong GCC adoption. Lower pricing than Wati.

#### Pricing
| Plan | Monthly | Features |
|---|---|---|
| Starter | $15 | 500 conversations, 1 agent, basic templates |
| Growth | $35 | 2,000 conversations, 5 agents, automation |
| Advanced | $65 | 5,000 conversations, 15 agents, full API |

#### When to Choose Interakt
- Budget-conscious client needing WhatsApp BSP
- Client doesn't need advanced CRM features
- Client is in fashion, beauty, or direct-to-consumer GCC

---

## 5. Choosing the Right Stack

### 5.1 Communication Stack Decision Tree

```
START: Client needs email + SMS + WhatsApp

Email:
├── New project, React/Next.js → RESEND
├── High volume >50k/mo → SENDGRID (dedicated IP) or AMAZON SES
├── Marketing + transactional combined → MAILCHIMP (marketing) + SENDGRID (transactional)
└── Simple, WooCommerce only → SENDGRID (WP Mail SMTP plugin)

SMS:
├── Saudi-first, needs local sender ID fast → UNIFONIC
├── US + Saudi combined → TWILIO
└── Saudi-only, tech-savvy client → TWILIO (cheaper, better API)

WhatsApp:
├── Client is technical (developer or has n8n) → WhatsApp CLOUD API directly
├── Client needs team inbox (multiple agents) → WATI ($49+/mo)
├── Client is budget-conscious → INTERAKT ($15/mo)
└── Client is Saudi, enterprise → UNIFONIC WhatsApp
```

### 5.2 Recommended Stacks by Client Type

**Starter ($999 package) — Simple setup:**
- Email: SendGrid (free 100/day for early stage) → upgrade when needed
- SMS: Twilio (pay-as-go, ~$5/mo for 100 order confirmations)
- WhatsApp: Skip — or Cloud API basic (1,000 free conversations/mo)

**Professional ($2,499 package) — Full setup:**
- Email: SendGrid Essentials ($20/mo, 50k emails, domain authenticated)
- SMS: Twilio (SA sender ID registered)
- WhatsApp: Wati Growth ($49/mo) for team inbox, or Cloud API via n8n for automation

**GCC Special ($3,499 package) — Saudi-optimized:**
- Email: SendGrid Pro ($90/mo, dedicated IP for reputation) + Arabic templates
- SMS: Unifonic (pre-approved Saudi sender ID, Arabic interface)
- WhatsApp: Cloud API + n8n (full automation, order confirmations, abandoned cart)

**Enterprise:**
- Email: Amazon SES ($0.10/1k, custom setup)
- SMS: Unifonic or Twilio dedicated
- WhatsApp: Cloud API (direct) with custom chatbot built in n8n

---

## 6. Deliverability Best Practices

### 6.1 Email Deliverability Checklist
```
DNS Setup (required):
□ SPF record: v=spf1 include:sendgrid.net ~all
□ DKIM: CNAME records from SendGrid/Resend
□ DMARC: v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com

From Address:
□ Use subdomain for transactional: orders@mail.yourdomain.com
□ Authenticate subdomain separately from main domain
□ Never send from a free email (gmail.com, yahoo.com)

List Hygiene:
□ Remove hard bounces immediately after first bounce
□ Suppress unsubscribes within 24 hours
□ Use double opt-in for marketing lists
□ Warm up new IP/domain gradually:
   Week 1: 200 emails/day → Week 2: 1,000 → Week 3: 5,000+

Content:
□ Spam word check before send (test with Mail-Tester.com)
□ Text/image ratio ≥ 60/40 (not all-image emails)
□ Unsubscribe link in all marketing emails (required by CAN-SPAM, GDPR)
□ Physical address in footer (required by CAN-SPAM)
```

### 6.2 SMS Deliverability for Saudi Arabia
```
□ Sender ID registered (alphanumeric, max 11 chars)
□ Messages are under 160 chars (1 SMS unit) — Arabic is 70 chars per unit
□ Opt-in documented (CITC regulation)
□ Content does not include URLs from free URL shorteners (marked as spam)
□ Use Bitly Business or custom short domain for tracking links
□ Time of day: send between 8am–9pm KSA time
□ Do not send during prayer times for conservative segments
```

### 6.3 WhatsApp Compliance
```
□ Only send template messages to users who have opted in
□ Opt-in must be explicit — "I agree to receive WhatsApp messages from X"
□ Document opt-in source (website form, order page, app)
□ Respond to incoming messages within 24 hours (opens free session window)
□ Never use WhatsApp for unsolicited marketing (account will be banned)
□ Template must match approved content exactly
□ Add clear opt-out message in first outbound contact:
  "للتوقف عن الرسائل، أرسل STOP"
```

---

## 7. Integration Reference (n8n Templates)

### 7.1 Order Confirmed → Email + SMS + WhatsApp
```
[WooCommerce Trigger: order.created]
    │
    ├── [SendGrid] Send order confirmation email (HTML template)
    │       from: orders@domain.com
    │       to: {{customer.email}}
    │       template_id: d-order-confirm
    │
    ├── [Twilio] Send SMS
    │       to: {{customer.phone}}
    │       body: "Order #{{id}} confirmed — {{total}} SAR"
    │
    └── [HTTP: WhatsApp Cloud API] Send WhatsApp template
            to: {{customer.whatsapp}}
            template: order_confirmation
```

### 7.2 Cart Abandonment Sequence
```
[Cron: every 30 min]
    → [MySQL] SELECT abandoned carts > 1 hour
    → [For each abandoned cart]:
        ├── IF no_email_sent_1 → [SendGrid] Email 1: "You left something behind"
        │   Mark: email_1_sent = NOW()
        ├── IF email_1_sent AND > 24hrs AND no_email_2 → [SendGrid] Email 2: discount offer
        └── IF email_1_sent AND > 4hrs AND phone → [Twilio] SMS: gentle reminder
```

### 7.3 WhatsApp AI Support Bot
```
[Webhook: WhatsApp incoming message]
    │
    ├── [MySQL] Fetch order history for this phone number
    │
    ├── [OpenAI / Claude] 
    │   System: "You are a customer support agent for {company}. 
    │            Customer order history: {orders}. 
    │            Answer in the same language the customer used."
    │   User: {{message.text}}
    │
    ├── IF AI_confidence > 0.85:
    │   └── [WhatsApp API] Reply with AI response
    └── ELSE:
        └── [Slack] Forward to human agent: "Customer needs help: {{message}}"
```

---

## 8. Monthly Cost Reference (NeoTech Client Estimates)

### Small Store (100 orders/month)
| Service | Volume | Monthly Cost |
|---|---|---|
| SendGrid | 500 emails/mo (5 per order) | Free tier |
| Twilio SMS | 200 SMS (2 per order) | ~$1 |
| WhatsApp Cloud | 100 conversations | Free (within free tier) |
| **Total** | | **~$1/mo** |

### Mid Store (1,000 orders/month)
| Service | Volume | Monthly Cost |
|---|---|---|
| SendGrid Essentials | 5,000 emails/mo | $20 |
| Twilio SMS | 2,000 SMS | ~$10 |
| WhatsApp Cloud | 1,000 conversations (utility) | ~$16 |
| **Total** | | **~$46/mo** |

### Large Store (10,000 orders/month)
| Service | Volume | Monthly Cost |
|---|---|---|
| SendGrid Pro | 50,000 emails/mo | $90 |
| Twilio SMS | 20,000 SMS | ~$96 |
| WhatsApp Cloud | 10,000 utility conversations | ~$160 |
| **Total** | | **~$346/mo** |

> These costs are passed to the client as part of their ongoing service subscription or direct vendor payment. NeoTech's margin is in setup ($149–$299 one-time) and optional monthly management ($49/mo).
