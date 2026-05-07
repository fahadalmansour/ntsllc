# NeoTechnology Solutions LLC — Legal & Compliance Checklist
**Date:** May 2026

---

## US Legal (Wyoming LLC)

### Formation & Registration
- [x] Wyoming LLC formed — Filing ID 2025-001744917
- [x] EIN obtained — 36-5148912
- [x] Mercury business banking opened
- [ ] Registered agent service active (required annually — ~$50/yr, verify with Wyoming SOS)
- [ ] Annual report filed with Wyoming Secretary of State (due each year)
- [ ] Operating Agreement drafted and signed by sole member

### Taxation
- [ ] US tax filing election confirmed (single-member LLC → Schedule C or Form 8832 for C-Corp election)
- [ ] US CPA / bookkeeper retained for annual filing
- [ ] Quarterly estimated tax payments scheduled (if revenue > $1,000/yr)
- [ ] Foreign income reporting reviewed (GCC client payments are US-sourced income for a US LLC)
- [ ] State income tax: Wyoming has no state income tax ✓

### Contracts (Need to Create)
- [ ] Master Services Agreement (MSA) — English
- [ ] Statement of Work (SOW) template — English
- [ ] Mutual Non-Disclosure Agreement (NDA)
- [ ] Freelancer Subcontractor Agreement (with IP assignment clause)
- [ ] Website Terms of Service
- [ ] Privacy Policy (CCPA-compliant for California clients)
- [ ] Refund Policy
- [ ] Cookie Policy (GDPR — for EU visitors)
- [ ] Service Level Agreement (SLA) template — for Enterprise/retainer clients
- [ ] Data Processing Agreement (DPA) — for Enterprise clients under GDPR

**Recommended**: Engage a Wyoming or Delaware business attorney for contract review. Estimated cost: $500–1,500 one-time. Consider Clerky, Stripe Atlas legal resources, or a KSA-licensed US-familiar attorney.

---

## Saudi Arabia / GCC Compliance

### Client-Side (NTS configures for clients)
- [ ] ZATCA Phase 2 e-invoicing setup — NTS delivers compliant XML invoice integration for Saudi clients
- [ ] KSA VAT 15% configuration in store checkout
- [ ] UAE VAT 5% configuration (for UAE clients)
- [ ] Bahrain VAT 10% configuration
- [ ] BNPL compliance (Tamara, Tabby) — requires merchant agreements, NTS sets up integration only

### NTS Entity (Monitoring)
- [ ] Saudi branch registration: **Not required** — NTS delivers via US entity; regional partner is advisory only
- [ ] Saudi Communications and Space Technology Commission (CST): Monitor if VPS/hosting revenue to Saudi clients exceeds SAR 375,000/yr — may trigger registration requirement
- [ ] Saudi PDPL (Personal Data Protection Law): Client data stored on VPS — review if NTS holds Saudi personal data; may require data localisation compliance
- [ ] SAMA (Saudi Central Bank): NTS does not process payments directly → not applicable; clients process via licensed gateways

### Regional Partner Compliance
- [ ] Saudi commercial registry (CR 7053130576) valid and renewed
- [ ] Clear legal separation: regional partner is advisory only; all contracts signed by US entity
- [ ] No revenue splitting that could trigger Saudi permanent establishment rules

---

## Data & Privacy

| Regulation | Applies if | Action required |
|-----------|-----------|----------------|
| GDPR (EU) | EU visitors to neotechnology.solutions | Privacy policy + cookie consent + DPA for EU Enterprise clients |
| CCPA (California, US) | California US clients | Privacy policy disclosures + opt-out mechanism |
| Saudi PDPL | Saudi personal data processed | Monitor — law enacted 2021, enforcement active 2024+ |
| PIPEDA (Canada) | Canadian clients (future) | Add if Canadian clients acquired |

**Immediate action**: Add GDPR-compliant cookie consent banner and a comprehensive Privacy Policy to neotechnology.solutions.

---

## Insurance

| Coverage | Priority | Notes |
|---------|---------|-------|
| Professional Liability / E&O | Medium | Covers claims from unsatisfied clients for errors in delivery |
| Cyber Liability | Low-Medium | If NTS holds client credentials (API keys, admin passwords) |
| General Liability | Low | Minimal physical business risk |

E&O insurance for small IT consultancies: ~$500–800/year. Consider after first 10 clients.

---

## Intellectual Property

### NTS Owns
- NeoTechnology Solutions brand name + logo
- Website code and theme (neotechnology.solutions)
- Internal SOPs and processes
- Automation flow templates (generic, not client-specific)

### Client Owns (After Final Payment)
- All code written for their project
- Their store theme and customisations
- Their automation flows
- All data in their systems

**This must be explicit in every MSA.** IP transfer clause: "Upon receipt of final payment, NTS assigns all deliverables to Client with no retained licence."

### What NTS Should NOT Do
- Do not use client's brand, store screenshots, or data in any public-facing material without written consent
- Get signed consent form when publishing case studies

---

## Financial Compliance

| Requirement | Status | Action |
|------------|--------|--------|
| USD banking (Mercury) | ✓ Active | Maintain |
| Stripe for payments | Pending | Set up business Stripe account with Wyoming LLC details |
| SAR → USD conversion | Via Mercury or wise.com | Use for Saudi client payments if they pay in SAR |
| AML / KYC | Handled by Mercury and Stripe | NTS does not need separate AML programme |
| FBAR filing | Required if foreign accounts > $10,000 | Monitor if Saudi bank account opened |
| Form 5471 / 8938 | If foreign ownership interests acquired | Not applicable today |

---

## Compliance Calendar

| Date | Action |
|------|--------|
| Annually (Wyoming) | File annual report + pay registered agent (~$50) |
| Annually (IRS) | File Schedule C or Form 1065 by April 15 |
| Quarterly | Pay estimated taxes (Apr 15, Jun 15, Sep 15, Jan 15) |
| When revenue > $100K | Engage US CPA proactively |
| When Saudi hosting revenue > SAR 375K | Evaluate CST registration |
| When first US client with sensitive data | Review CCPA obligations |

---

*Legal compliance is not legal advice. Engage qualified counsel for specific decisions.*
