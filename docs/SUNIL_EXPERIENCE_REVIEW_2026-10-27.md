# Sunil's 27 October feedback — reviewable website prototypes

**Status: review only; not approved for launch.** This branch originates from the INZBC organisation's 25 October `inzview/main`, not the fork's older 13 October main. No live website publishing takes place on a GitHub push; the INZBC Vibe owner must intentionally publish approved changes. The organisation site is managed by Paras / INZBC, so Roshan's proposal must be reviewed with that lane owner.

## Review URLs once this PR is run in a staging preview

- `/sip-preview` — visual, interactive walkthrough of SIP collection, review, approval, and the 13-section Daily Intelligence Brief outline. **No real daily intelligence.**
- `/experience-preview` — real public upcoming event list, attendee-count *selection preview*, existing organiser handoff, and a clickable member-area concept with links to public content and the existing membership provider.

Both routes are intentionally **absent from public navigation** and marked `noindex,nofollow`. They are **not access-controlled**: never put private intelligence or member details in them. Only publish them to staging, with INZBC's explicit permission.

## What works on this review branch

- Event selection comes from the existing, sourced `INZBC_EVENTS` list, with a DST/locale-safe Auckland date calculation and no invented available places or prices.
- One-, two- and three-attendee selections are validated, reviewed in-page and marked **selection only**. There is no fake success screen, confirmation number, transaction, payment, or attendee record.
- For the named November summit, the CTA goes to INZBC's previously recorded organiser summit site. Other listed events link back to event information, **not** a falsely claimed registration endpoint.
- Members preview has navigable tabs for public resources, membership and events. Gated content is not accessible without an approved identity and entitlement integration. Join uses the established Member Jungle destination.
- SIP preview lets Sunil inspect four operational stages and expand all thirteen standard brief sections. It shows **implemented/tested** versus **not yet evidenced on a real run**; no fake source-check outcome or CEO approval.

## What this cannot do yet — decisions before production development

1. **Event system of record:** which current tool truly receives registrations (Sunil mentioned a provider uncertainly), ownership, event creation/update feed, ticketing, cancellations, refunds, check-in, GST/payment decisions, consent and retention.
2. **Member source of record:** the **16 October** decision was to retain Member Jungle, website link-out. Sunil's new "perhaps all in-house" comment merits an option study, **not** a silent reversal. Scope a separate decision to retain, integrate with API/SSO, or replace; weigh payment and legal-register migration and support.
3. **Secure identity:** approved member roles, expired-membership logic, privacy assessment and NZ/AU hosting policy. Wix `getCurrentMember()` is not proof of an INZBC-paid membership in Member Jungle. Do not render a membership badge, fake login or member-only report based only on it.
4. **SIP production:** secure platform, safe atomic import, actual 112 SIP-185 source outcomes, real human QA and recipient-specific CEO distribution decision; see [INZBC SIP PR #483](https://github.com/India-New-Zealand-Business-Council/inzbc/pull/483).

## Suggested acceptance checks

- Direct navigation to each route, keyboard and screen-reader interaction with tabs, event selector, radio options and report accordion.
- Current/future event ordering at an NZ DST boundary, empty events list, no event selected, and count changes invalidating a previous review selection.
- Confirm **no network POST, no new storage, no payment or external model call** on any preview page.
- Confirm an existing known organiser URL opens as a normal external link; other events link to available event details, and joining opens the existing membership service.
- Confirm main public navigation and the existing join flow are unchanged, and both new URLs carry noindex.
- Verify `npm run check`, `npm run test:run`, and `npm run build` in the trusted Wix build environment before approving. **Not executed from this connector-only editing session**; do not claim that these checks passed.

## Next actions

- **Sunil:** view both screens in a staging preview; specify what to keep; decide required member and event functions, access/fees and recipients for SIP reports.
- **Paras:** review design, navigation, mobile/accessibility and Wix implementation; determine provider APIs and the rightful event platform.
- **Bhanu:** review security, identity, storage/payment architecture and approve a real backend integration contract only after client scope is signed.
- **Roshan:** provide collector evidence / SIP walkthrough and fix review findings in this proposal. Neither merge nor publish without lead review.
