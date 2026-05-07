# SERVICE LEVEL AGREEMENT

**NeoTechnology Solutions LLC**  
*For use with Professional, GCC Special, and Enterprise retainer clients*

**SLA Reference:** NTS-SLA-[YEAR]-[NUMBER]  
**Client:** [CLIENT LEGAL NAME]  
**Effective Date:** [DATE]  
**Term:** [12 months / month-to-month]  
**Related MSA:** [MSA date]  
**Monthly Retainer Fee:** $[AMOUNT]

---

## 1. PURPOSE

This Service Level Agreement ("SLA") defines the support and maintenance standards NeoTechnology Solutions LLC ("NTS") will provide to Client for the digital infrastructure delivered under the Master Services Agreement and applicable Statements of Work.

---

## 2. SCOPE OF COVERAGE

### 2.1 Covered Systems

This SLA covers the following systems delivered by NTS:

| System | Platform | URL |
|--------|---------|-----|
| Primary e-commerce store | [Shopify / WooCommerce / Salla / Zid] | [URL] |
| n8n automation server | n8n (self-hosted) | [URL or N/A] |
| Custom integrations | [list] | N/A |
| [Other] | | |

### 2.2 Excluded from Coverage

- Third-party platform outages (Shopify, Salla, Zid, Stripe, Mada, etc.) — these are the respective platforms' responsibility
- Issues caused by Client modifications made without NTS involvement
- Plugin or extension updates made by Client without NTS review
- New features or functionality outside the original SOW scope
- Hardware owned or managed by Client

---

## 3. SUPPORT TIERS

### 3.1 Incident Severity Classification

| Severity | Definition | Examples |
|---------|-----------|---------|
| **P1 — Critical** | Site or checkout is completely inaccessible; no sales can be made | Store 500 error, payment gateway completely down, SSL expired |
| **P2 — High** | Major functionality broken; significant revenue impact | Checkout broken for one payment method, automation flows all failing, admin unreachable |
| **P3 — Medium** | Partial degradation; workaround exists | One automation flow failing, analytics not reporting, minor display bug |
| **P4 — Low** | Cosmetic issue or feature request; no revenue impact | Text alignment issue, typo, minor style bug |

### 3.2 Response Time Commitments

| Severity | Initial Response | Target Resolution | Available Hours |
|---------|----------------|-----------------|----------------|
| P1 — Critical | 2 hours | 8 hours | 24/7 |
| P2 — High | 4 business hours | 24 business hours | Business hours* |
| P3 — Medium | 1 business day | 5 business days | Business hours |
| P4 — Low | 3 business days | 14 business days | Business hours |

*Business hours: Sunday–Thursday 09:00–18:00 AST (Arabia Standard Time, UTC+3) and Monday–Friday 09:00–17:00 MST (UTC-7). Adjust based on client's primary timezone.

**"Initial Response"** means NTS has acknowledged the ticket and provided an initial assessment or begun investigation.  
**"Target Resolution"** means the issue is resolved or a documented workaround is in place.

---

## 4. SUPPORT CHANNELS

| Channel | Best for | Response expectation |
|---------|---------|---------------------|
| Email: [support@neotechnology.solutions] | P3, P4 issues; non-urgent requests | Per table above |
| WhatsApp: [+X XXX XXX XXXX] | P1, P2 urgent issues | 24/7 for P1 |
| Monthly review call | Strategic reviews, roadmap discussion | Scheduled monthly |

Client must use the following format when reporting an issue:

```
Severity: [P1/P2/P3/P4]
System: [Store / n8n / Integration / Other]
Description: [What happened, when, and impact on business]
Steps to reproduce: [if applicable]
Error messages: [copy/paste or screenshot]
```

---

## 5. UPTIME COMMITMENT (n8n Managed Hosting)

For clients with managed n8n hosting under this SLA:

| Metric | Commitment |
|--------|-----------|
| Monthly uptime target | 99.5% |
| Scheduled maintenance window | Sundays 02:00–04:00 AST (notified 48hrs in advance) |
| Backup frequency | Daily automated backups |
| Backup retention | 14 days |
| Recovery Point Objective (RPO) | 24 hours |
| Recovery Time Objective (RTO) | 4 hours |

**Uptime calculation:** % = (total minutes in month - downtime minutes) / total minutes × 100. Scheduled maintenance is excluded from downtime calculation.

---

## 6. SERVICE CREDITS (SLA BREACH)

If NTS fails to meet the commitments in this SLA, Client is entitled to the following credits applied to the next monthly invoice:

| Breach | Credit |
|--------|--------|
| P1 response > 2 hours | 5% of monthly retainer fee |
| P1 resolution > 8 hours (each additional 4 hours) | 2% of monthly retainer fee |
| Monthly uptime < 99.5% (n8n) | 5% of monthly retainer fee per 0.1% below target |
| Monthly uptime < 99.0% (n8n) | 10% of monthly retainer fee |

**Maximum total credit in any month:** 30% of monthly retainer fee.

Credits are Client's sole remedy for SLA breaches. Credits do not apply to outages caused by: (a) third-party platform failures; (b) Client's actions or inaction; (c) force majeure events; or (d) scheduled maintenance.

---

## 7. INCLUDED MONTHLY ACTIVITIES

Under this SLA retainer, NTS will perform the following each month at no additional charge:

| Activity | Frequency | Deliverable |
|---------|-----------|------------|
| System health check (store + n8n) | Monthly | Brief written report |
| Security updates (WP plugins / WooCommerce) | As released | Change log |
| Automation flow health review | Monthly | Status report |
| Payment gateway test transactions | Monthly | Confirmation screenshot |
| Performance check (Core Web Vitals) | Monthly | Score + recommendations |
| Monthly review call (30 min) | Monthly | Call notes |

**Included support hours per month:** [X] hours  
**Additional hours beyond included:** $[150]/hour, billed in 30-minute increments

---

## 8. CHANGE REQUESTS

Work outside the scope of this SLA (new features, new pages, new flows) is quoted and billed separately via Change Order. Minor configuration changes (text edits, colour changes, small layout tweaks) within [30] minutes of work are covered by included support hours.

---

## 9. TERM AND RENEWAL

9.1 This SLA has an initial term of [12 months / month-to-month].

9.2 For 12-month terms: automatically renews for successive 12-month periods unless either party provides 60 days' written notice of non-renewal before the term end date.

9.3 For month-to-month: either party may cancel on 30 days' written notice.

9.4 NTS may adjust retainer fees on 60 days' notice for renewing terms.

---

## 10. ESCALATION

If Client is dissatisfied with incident handling:

1. **Level 1**: Email [support@neotechnology.solutions] — project team
2. **Level 2**: Email [fahad@neotechnology.solutions] — Managing Member, response within 4 business hours
3. **Level 3**: Dispute resolution per the MSA (arbitration)

---

## SIGNATURES

**NeoTechnology Solutions LLC**

Signature: _________________________ Date: _______________  
Name: Fahad Almansour  
Title: Managing Member


**[CLIENT LEGAL NAME]**

Signature: _________________________ Date: _______________  
Name: _________________________  
Title: _________________________

---

*SLA Template v1.0 | NeoTechnology Solutions LLC*
