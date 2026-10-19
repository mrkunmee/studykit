# Stage 3 (Part C) — Trust & Information Pages (12–16)

These pages carry the site's credibility and its AdSense-relevant policy content. **No fabricated identities, credentials, business details, affiliations, or claims.** Every unknown is a labelled placeholder; every implementation-dependent statement is flagged **[VERIFY]** so it is reconciled with the built site before launch. Policy/legal wording here is a **draft for review**, not legal advice.

Legal/info pages share a readable layout: `max-width ~40rem`, clear H2 sections, a "Last updated" stamp, and an "On this page" TOC for the long ones (Privacy, Terms).

---

## PAGE 12 — About `/about`

**Objective:** Explain plainly what StudentKit Nigeria is, whom it serves, and what it offers — without inventing credibility.

**Section order:** Header → H1 → Purpose → Who it's for → What we offer → Our commitments → Contact pathway → Footer.

**Content**
- **H1:** "About StudentKit Nigeria".
- **Purpose:** "StudentKit Nigeria is a free collection of practical study tools and guides for Nigerian students. The goal is simple: useful tools that work on your phone, with clear results and honest limitations."
- **Who it's for:** university and polytechnic students, exam preparers, and anyone organising study time or checking their academic performance.
- **What we offer:** short descriptions of the five tools and three guides, each linking to its page.
- **Our commitments:** clarity (plain language), usefulness (tools that do one job well), and transparency (results are estimates; always verify with your institution; no affiliation with examination bodies).
- **Contact pathway:** "Questions or feedback? Reach us via the Contact page." → `/contact`.

**Must NOT include** (and does not): founder biographies, staff, company registration, awards, school partnerships, student counts, years of experience, or claims of expert review that didn't happen.
**Placeholders:** `[PLACEHOLDER — operator/owner name or organisation, to be supplied (D6)]` used only if/where an owner identity is required; otherwise the page stands without one.
**States:** static. **Responsive:** single column, comfortable measure. **Accessibility:** H1 + H2 sections; links descriptive.
**Ads:** none (short trust page).
**Internal links:** /tools, /guides, /contact.

---

## PAGE 13 — Contact `/contact`

**Objective:** Give students a real, honest way to make contact. The exact mechanism is **D2** — two variants are specified; only the approved one ships.

**Shared:** H1 "Contact", short intro: "Have a question, found a problem, or want to suggest a tool? Send us a message." Plus a line pointing to `/about` and policy pages.

### Variant A — Static contact details (no backend)
- Display the approved contact method(s): `[PLACEHOLDER — contact email, to be supplied (D2/D6)]`, and optionally a social handle `[PLACEHOLDER — if provided]`.
- **No form that pretends to send.** If only an email is available, present it as a labelled link (`mailto:` optional).
- States: static.

### Variant B — Contact form
- **Fields:** Name (optional), Email (required, validated format), Subject (optional), Message (required, min length). All with visible labels + helper text; required marked with text + `*`.
- **Validation/error states:** inline per field (icon + text + red outline), summary on submit attempt.
- **Submitting state:** button shows working state; inputs disabled.
- **Success state:** inline confirmation "Thanks — your message has been sent." **shown only if a real submission mechanism exists.** Until a backend is chosen, the form must **not** claim success.
- **Failure state:** "Something went wrong — please try again, or email us at [PLACEHOLDER]."
- **Backend note [VERIFY]:** A form needs a delivery mechanism (e.g. a form service or mail endpoint). Choosing/adding one is **out of this UI-only phase** and is an approval item (D2). Until then, this page is marked **pending** and explains what's needed.

**Alternative route:** always offer at least one non-form route (email/social) where available so students aren't stuck if the form isn't live.
**Responsive:** fields full-width, stacked, large targets. **Accessibility:** labelled fields, `aria-describedby` errors, live-region confirmation, focus moves to first error.
**Ads:** none.
**Internal links:** /about, /privacy-policy.
**To supply/verify:** **D2** mechanism; real contact details (**D6**).

---

## PAGE 14 — Privacy Policy `/privacy-policy`

**Objective:** Describe the site's **actual** data practices — readable, sectioned, and reconciled with the final build before publication. **This is the page most sensitive to over-claiming.**

**Section order:** Header → H1 → Last-updated stamp → "On this page" TOC → sections below → Contact → Footer.

**Sections (H2) — draft content intent, each flagged where it depends on the build:**
1. **Overview** — what this policy covers; that the tools run in the browser.
2. **Information we collect** — **[VERIFY]** Based on the assumption of client-side tools, the site itself may collect little to none directly; state precisely what the final build does. **Do not claim "we collect nothing" until the full implementation and every connected service are reviewed.**
3. **Information you provide** — e.g. Contact form fields, **if** Variant B ships (D2).
4. **Local storage on your device** — **[VERIFY/D1]** if tools remember inputs/results via `localStorage`, explain it stays on the user's device and how to clear it; if not used, say so.
5. **Cookies and analytics** — **[VERIFY]** list only what is actually implemented. If no analytics at launch, state that; **do not claim analytics/cookies are active when they are not.**
6. **Advertising** — **[VERIFY/D5]** if/when Google AdSense (or any ad tech) is added, disclose third-party advertising, cookies/identifiers it may use, and link to the relevant third-party policies. Until ads are live, this section states that advertising is **not yet active** and will be updated before it is.
7. **Data retention & security** — **[VERIFY]** describe retention only for data actually collected (e.g. contact messages); no overstated security claims.
8. **Your choices & rights** — clearing local storage, declining/avoiding ad personalisation once ads exist, contacting us about data.
9. **Children / students** — neutral statement appropriate to a student audience **[VERIFY wording]**.
10. **Changes to this policy** — may be updated; date shown at top.
11. **Contact for privacy enquiries** — `[PLACEHOLDER — privacy contact, to be supplied (D6)]`.

**Last-updated:** `[PLACEHOLDER — date set at publication]`.
**Hard rules honoured:** no claim about collection, cookies, analytics, or advertising that isn't true of the built site; every such statement is **[VERIFY]** and reconciled before submission to AdSense.
**Responsive/Accessibility:** readable measure, TOC anchors, ordered headings.
**To supply/verify:** D1, D2, D5, D6 and a full implementation review (Stage 5 tracks this).

---

## PAGE 15 — Terms of Use `/terms`

**Objective:** Set out fair, readable terms with a clear hierarchy. **Draft for legal review**, not final legal text.

**Sections (H2):**
1. **Acceptance of these terms** — using the site means accepting the terms.
2. **Permitted use** — personal, educational use; don't misuse or disrupt the site.
3. **Using the tools appropriately** — tools give estimates from the inputs provided.
4. **Limitations of calculations and information** — results/guides are for general educational help and may not match an institution's official rules; verify independently.
5. **Intellectual property** — site content and original questions belong to StudentKit `[PLACEHOLDER — rights holder name, D6]`; no unauthorised copying.
6. **Availability and changes** — the site may change or be unavailable; features may be added or removed.
7. **Limitation of liability** — **[LEGAL REVIEW]** drafted conservatively; must be reviewed by a qualified person before launch.
8. **Governing terms / contact** — `[PLACEHOLDER — jurisdiction and contact, D6]`.
9. **Effective / last-updated date** — `[PLACEHOLDER — date]`.

**Rules honoured:** no invented business details; no unsupported legal claims; liability and IP sections flagged for legal review.
**Responsive/Accessibility:** as Privacy page.
**To supply/verify:** D6 details + **legal review** of liability/IP/jurisdiction.

---

## PAGE 16 — Disclaimer `/disclaimer`

**Objective:** A standalone, **readable** disclaimer (not an intimidating wall of text) covering the tools' limits and the absence of affiliation.

**Sections (H2), short and plain:**
1. **Educational purpose** — the site is for general educational help.
2. **Calculator assumptions** — each tool computes from your inputs and the scale/assumptions you choose; it doesn't know your institution's exact rules.
3. **Grading systems differ** — Nigerian institutions use different grade points and boundaries, which can change.
4. **Limits of planning and estimates** — study plans and exam-score figures are planning aids, not promises.
5. **Accuracy and verification** — we aim for correct maths and content, but always verify important decisions with official sources.
6. **No guarantee of results** — no tool here guarantees academic performance or examination outcomes.
7. **No affiliation** — StudentKit Nigeria is **not** affiliated with JAMB, WAEC, NECO, any university, or any examination body, unless such a relationship is ever independently established and stated.
8. **Contact** — `[PLACEHOLDER — contact, D6]`.

**Rules honoured:** readable tone; explicit no-affiliation and no-guarantee statements; no fabricated endorsements.
**Responsive/Accessibility:** readable measure; short paragraphs; ordered headings.
**Internal links:** tools, /terms, /privacy-policy.
**To supply/verify:** D6 contact.
