# Workflow Automation — Deep Reference Guide
**NeoTechnology Solutions LLC — Internal Use Only**  
Version 1.0 | May 2026

---

## 1. Platform Overview

| Platform | Type | Price | Self-hostable? | Node count | GCC-ready? | Best for |
|---|---|---|---|---|---|---|
| n8n | Open-source / cloud | Free (self-hosted) / $24–$50/mo (cloud) | Yes | 400+ | Yes (generic HTTP) | NeoTech default — full control |
| Zapier | SaaS only | $20–$100+/mo | No | 7,000+ | Limited | Non-technical clients, simple 2-step zaps |
| Make (formerly Integromat) | SaaS only | $9–$159/mo | No | 1,500+ | Limited | Visual-first, complex flows, lower price than Zapier |
| Pipedream | Hybrid | Free–$49/mo | Partial (code-first) | 1,000+ | No | Developers who want code + no-code |
| ActivePieces | Open-source | Free (self-hosted) | Yes | 100+ | Limited | n8n alternative, newer, simpler |

---

## 2. n8n (NeoTechnology Default)

### 2.1 Why n8n is the NeoTech Standard
1. **Self-hostable** — run on Fahad's Proxmox infra or VPS; no per-task pricing
2. **6,000+ workflow templates** — the "6,000+ templates" claim in NeoTech marketing
3. **No per-execution pricing** — Zapier/Make charge per task/operation; n8n self-hosted is unlimited
4. **Code nodes** — write JavaScript or Python directly inside a flow
5. **AI agent nodes** — native LangChain/OpenAI integration for AI workflows
6. **Webhook support** — any inbound webhook is free; no limits

### 2.2 Pricing Comparison
| Tier | Price | Workflow executions | Active workflows | Notes |
|---|---|---|---|---|
| Self-hosted (Community) | Free | Unlimited | Unlimited | Requires VPS; no enterprise features |
| n8n Cloud Starter | $24/mo | 2,500/mo | 5 | Good for testing |
| n8n Cloud Pro | $50/mo | 10,000/mo | 15 | Small businesses |
| n8n Cloud Enterprise | Custom | Unlimited | Unlimited | Large orgs |
| **NeoTech managed n8n** | $15/mo (client fee) | Unlimited | 20 per client | n8n on Proxmox; margin: ~$14/client |

> **NeoTech managed n8n offering:** Run n8n on `ai-dev-gpu` CT 113 (192.168.8.113) or dedicated Docker container on docker-host VM 130 (192.168.8.131). Each client gets their own n8n instance (namespace or separate container) for isolation.

### 2.3 Deployment (Self-hosted on Proxmox / VPS)

**Docker Compose (recommended):**
```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - N8N_HOST=n8n.yourdomain.com
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://n8n.yourdomain.com/
      - GENERIC_TIMEZONE=Asia/Riyadh
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres

  postgres:
    image: postgres:16
    restart: always
    environment:
      - POSTGRES_DB=n8n
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  n8n_data:
  postgres_data:
```

**Nginx reverse proxy snippet:**
```nginx
server {
    listen 443 ssl;
    server_name n8n.yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### 2.4 Key n8n Nodes for E-commerce

| Node | Use Case | Notes |
|---|---|---|
| **WooCommerce** | Trigger on new orders, update order status | Uses WC REST API v3 |
| **Shopify** | Order created/updated, product sync | Requires API key + secret |
| **Salla** | Order notifications, status changes | Salla webhook → HTTP node |
| **Zid** | Same | Zid webhook → HTTP node |
| **MySQL / Postgres** | Read/write to NeoTech or client database | NeoTech's own DB on VPS |
| **HTTP Request** | Call any REST API (Moyasar, Tap, Aramex, SaudiPost) | Most flexible node |
| **SendGrid** | Transactional email on order events | API key required |
| **Twilio** | SMS on order confirmed / shipped | Account SID + Auth token |
| **WhatsApp Business** | Order notifications, customer support | Via Cloud API or Twilio |
| **Google Sheets** | Inventory tracking, order export | OAuth2 |
| **Slack / Telegram** | Internal team notifications | Webhook or Bot token |
| **OpenAI / Anthropic** | AI-powered customer replies, content | API key |
| **Cron** | Scheduled jobs (daily reports, inventory sync) | Built-in scheduler |
| **Webhook** | Receive data from any system | Exposes HTTPS endpoint |
| **Code (JavaScript)** | Custom logic, data transformation | Full Node.js runtime |
| **IF / Switch** | Conditional branching | Core logic node |
| **Merge** | Combine data from multiple branches | Core |

### 2.5 Core E-commerce Automation Templates

#### Template 1: New Order → WhatsApp + Slack + Google Sheets
```
Trigger: WooCommerce / Salla webhook → order.created
  ├── WhatsApp Business: "New order #{id} from {customer_name} — {total} {currency}"
  ├── Slack: Post to #orders channel
  └── Google Sheets: Append row [order_id, customer, total, date, status]
```

#### Template 2: Abandoned Cart Recovery
```
Trigger: Cron (every 30 min)
  → WooCommerce REST: GET /cart (or abandoned cart plugin data)
  → Filter: cart_age > 60min AND no order placed
  → For each abandoned cart:
      ├── IF email exists → SendGrid: abandoned cart email
      └── IF phone exists → Twilio SMS: "You left items in your cart..."
```

#### Template 3: Order Status → Customer SMS
```
Trigger: WooCommerce webhook → order.updated
  → Switch on order.status:
      ├── "processing" → SMS: "Order confirmed, we're preparing it"
      ├── "shipped" → SMS: "Order shipped — tracking: {tracking_number}"
      └── "completed" → SMS + Email: "Order delivered, please review us"
```

#### Template 4: Low Stock Alert
```
Trigger: Cron (daily at 8am Riyadh)
  → WooCommerce REST: GET /products?stock_status=instock&per_page=100
  → Filter: stock_quantity <= 5
  → Slack + WhatsApp: "⚠️ Low stock: {product_name} has {qty} remaining"
  → Google Sheets: Update inventory tracking sheet
```

#### Template 5: Invoice Generation + Send
```
Trigger: WooCommerce webhook → order.completed
  → HTTP Request → PDF generation API (or custom PHP endpoint)
  → Upload PDF → Google Drive
  → SendGrid: Send invoice email with PDF attachment
  → MySQL: Mark invoice as sent in nts_invoices table
```

#### Template 6: n8n AI Agent for Customer Support
```
Trigger: Incoming WhatsApp / Telegram message (customer query)
  → OpenAI node: "Given this order history: {context}, answer: {message}"
  → If confidence > 0.8 → auto-reply
  → If confidence < 0.8 → forward to human agent via Slack
  → Log all interactions to Google Sheets
```

### 2.6 n8n API (For External Workflow Triggering)
```
Base URL: https://n8n.yourdomain.com/api/v1/
Auth: X-N8N-API-KEY header

# List all workflows
GET /workflows

# Execute a workflow (if active)
POST /workflows/{id}/execute
{"data": {"your": "payload"}}

# Get execution result
GET /executions/{id}
```

---

## 3. Zapier

### 3.1 Pricing (2026)
| Plan | Monthly | Tasks/month | Multi-step Zaps | Premium apps |
|---|---|---|---|---|
| Free | $0 | 100 | No (2-step only) | No |
| Starter | $20 | 750 | Yes (up to 3 steps) | No |
| Professional | $49 | 2,000 | Yes (unlimited steps) | Yes |
| Team | $69 | 2,000 | Yes | Yes + shared workspace |
| Company | $103 | 2,000 | Yes | Yes + SSO |

> **Task = one action step execution.** A 3-step Zap triggered 100 times = 300 tasks.

### 3.2 Zapier vs. n8n Decision Matrix

| Criteria | Zapier | n8n (self-hosted) |
|---|---|---|
| Setup time | <5 min | 30–60 min (Docker) |
| Technical skill required | None | Linux / Docker basics |
| Monthly cost at 5,000 tasks | ~$50/mo | $0 (server cost only) |
| Connector count | 7,000+ | 400+ (but HTTP node covers any REST API) |
| Execution limits | Per-task pricing | Unlimited on self-hosted |
| Data privacy | Zapier stores your data | Your server, your data |
| Custom code | No (basic filter/format) | Yes (full JS/Python) |
| AI/agent workflows | Limited | Full LangChain support |
| White-labeling for clients | No | Yes (custom domain + branding) |
| Saudi-specific apps (Salla, Zid, Mada) | No (use HTTP) | No (use HTTP) |

**When NeoTech uses Zapier:**
- Client refuses self-hosted tooling and wants SaaS
- Simple 2-3 step automation (e.g., Shopify → Gmail)
- Client has an existing Zapier account and wants specific apps

**When NeoTech always uses n8n:**
- Client volume >500 orders/month (Zapier gets expensive fast)
- Client needs WhatsApp, Aramex, or custom Saudi API integrations
- NeoTech-managed automation (margin is better)
- Automation involves sensitive order/customer data

### 3.3 Common Zapier Workflows for Clients
- Shopify new order → Google Sheets row
- WooCommerce new order → Slack DM
- Typeform contact form → Gmail + CRM
- Calendly booking → Google Calendar + Welcome email

---

## 4. Make (formerly Integromat)

### 4.1 Pricing (2026)
| Plan | Monthly | Operations/mo | Minimum interval | Data transfer |
|---|---|---|---|---|
| Free | $0 | 1,000 | 15 min | 1 GB |
| Core | $9 | 10,000 | 5 min | 1 GB |
| Pro | $16 | 10,000 | 1 min | 10 GB |
| Teams | $29 | 10,000 | 1 min | 10 GB + shared |
| Enterprise | Custom | Custom | On-demand | Custom |

> **Operation = 1 module execution.** Same 3-step scenario = 300 operations/100 triggers.

### 4.2 Make Advantages Over Zapier
- Much cheaper at equivalent volume (Core = $9 vs Zapier Professional = $49)
- **Visual scenario editor** is more intuitive for complex flows
- Error handling is better (retry logic, rollback)
- Free tier has 1,000 operations (Zapier free = 100 tasks)
- More built-in data manipulation (array operations, math, regex)

### 4.3 Make vs. n8n
- Make is SaaS-only (data leaves your server)
- Make has 1,500+ integrations vs n8n 400+ (but n8n HTTP covers the gap)
- For client privacy requirements: n8n always wins
- For non-technical clients who don't want to manage servers: Make is the best visual-first option

### 4.4 NeoTech Use of Make
Make is offered as a middle option in the "Workflow Automation" add-on:
- **Option A — n8n managed:** $15/mo setup + hosting (recommended)
- **Option B — Make Core:** NeoTech sets up, client pays Make directly (~$9/mo)
- **Option C — Zapier:** Client-managed, NeoTech builds flows only (setup fee: $299)

---

## 5. Automation Use Case Library (All Platforms)

### 5.1 E-commerce Core
| Use Case | Trigger | Actions | Platform |
|---|---|---|---|
| Order confirmation | Order placed | Email + SMS to customer | n8n/Zapier/Make |
| Order shipped | Order status → Shipped | SMS with tracking link | n8n |
| Abandoned cart | 1 hour after cart idle | Email sequence (day 1, day 3) | n8n |
| Low stock alert | Daily cron | WhatsApp to merchant | n8n |
| Return request | Order refund created | Email to warehouse + update sheet | n8n |
| Review request | 7 days after delivery | Email asking for Google review | n8n/Zapier |

### 5.2 Business Operations
| Use Case | Trigger | Actions | Platform |
|---|---|---|---|
| New inquiry → CRM | Contact form submit | Create deal in HubSpot/Monday | n8n/Zapier |
| Invoice generation | Order complete | Create PDF → email → Drive | n8n |
| Daily sales report | Cron 8am | Pull WC/Salla data → Google Sheets | n8n |
| Social posting | New product created | Post to Instagram/Twitter | n8n + Buffer |
| Supplier reorder | Stock below threshold | Email purchase order to supplier | n8n |

### 5.3 AI-Powered
| Use Case | Trigger | Actions | Platform |
|---|---|---|---|
| AI product description | New product added | GPT-4/Claude → update description | n8n |
| Customer support triage | New WhatsApp message | Claude API → classify → route | n8n |
| Price monitoring | Daily cron | Scrape competitor prices → alert | n8n + Code node |
| Sentiment analysis | New review | OpenAI → tag sentiment → Slack | n8n |

---

## 6. Pricing for NeoTech Automation Service

### 6.1 What's Included in Each Package

| Package | Automation Included | n8n Server |
|---|---|---|
| Starter ($999) | 1 basic flow (order confirmation) | No — uses n8n cloud free tier |
| Professional ($2,499) | 3 flows of client choice | Yes — dedicated n8n instance ($15/mo add-on) |
| GCC Special ($3,499) | 5 flows including Saudi-specific (Aramex, Mada alerts, VAT invoice) | Yes — included in package |
| Enterprise | Custom | Dedicated VPS with n8n |

### 6.2 À La Carte Automation Pricing
| Service | Price |
|---|---|
| n8n managed server setup | $149 one-time |
| n8n managed server hosting | $15/mo |
| Single workflow build (simple, 1–3 nodes) | $99 |
| Single workflow build (complex, 4–10 nodes) | $199 |
| Single workflow build (AI-powered, 10+ nodes) | $299–$499 |
| Workflow audit / optimization | $149 |
| Monthly workflow maintenance | $49/mo |

---

## 7. n8n Integrations with Saudi-Specific Services

### 7.1 Aramex
```javascript
// n8n HTTP Request node
Method: POST
URL: https://ws.aramex.net/ShippingAPI.V2/Shipping/Service_1_0.svc/json/CreateShipments
Headers: {Content-Type: application/json}
Body: {
  "ClientInfo": {
    "UserName": "{{$credentials.aramexUser}}",
    "Password": "{{$credentials.aramexPass}}",
    "Version": "v1.0",
    "AccountNumber": "{{$credentials.aramexAccount}}",
    "AccountPin": "{{$credentials.aramexPin}}",
    "AccountEntity": "RUH",
    "AccountCountryCode": "SA"
  },
  "Shipments": [{
    "Shipper": { ... },
    "Consignee": { ... },
    "ShippingDateTime": "{{new Date().toISOString()}}",
    "PickupLocation": "RECEPTION",
    "Details": { "ProductType": "PDX", "ServiceType": "PPX" }
  }]
}
```

### 7.2 Moyasar (Check Payment Status)
```javascript
// n8n HTTP Request node
Method: GET
URL: https://api.moyasar.com/v1/payments/{{$json.payment_id}}
Auth: Basic (API key as username, empty password)
```

### 7.3 SMSA Express
```javascript
// n8n HTTP Request node
Method: POST
URL: https://www.smsaexpress.com/api/Shipments
Headers: {Authorization: "Bearer {{$credentials.smsaToken}}"}
```

### 7.4 Salla Webhook Handler
```javascript
// n8n Webhook node setup
Path: /salla-orders
Method: POST
// n8n receives: { event: "order.created", data: { ... } }

// Verify HMAC signature (important for security):
const crypto = require('crypto');
const secret = 'your_salla_webhook_secret';
const sig = $input.headers['x-salla-signature'];
const computed = crypto.createHmac('sha256', secret)
  .update(JSON.stringify($input.body))
  .digest('hex');
if (sig !== computed) throw new Error('Invalid signature');
```

---

## 8. Recommended n8n Architecture for NeoTech-Managed Clients

```
                    ┌─────────────────────────────────────────┐
                    │         NeoTech Proxmox Server          │
                    │         (docker-host VM 130)            │
                    │                                         │
                    │  ┌─────────┐  ┌─────────┐  ┌────────┐  │
Client A ──webhook→ │  │ n8n-A   │  │ n8n-B   │  │ n8n-C  │  │
Client B ──webhook→ │  │ :5678   │  │ :5679   │  │ :5680  │  │
Client C ──webhook→ │  └─────────┘  └─────────┘  └────────┘  │
                    │       ↓             ↓            ↓       │
                    │  ┌───────────────────────────────────┐   │
                    │  │     Shared Postgres DB            │   │
                    │  │ (n8n_client_a / n8n_client_b)     │   │
                    │  └───────────────────────────────────┘   │
                    └─────────────────────────────────────────┘
                                        │
                              nginx reverse proxy
                              n8n-clientA.neotech.systems
                              n8n-clientB.neotech.systems
```

Each client gets:
- Isolated n8n container (separate port)
- Separate database schema
- Custom subdomain via Cloudflare (CNAME → Proxmox IP)
- Basic auth credentials (separate per client)
- Monthly report of execution counts
