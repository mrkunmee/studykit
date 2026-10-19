# StudentKit Nigeria — UI/UX Design Specification

**Phase:** UI/UX specification only. No application code, APIs, databases, authentication, packages, or integrations are produced in this phase.
**Status:** Draft for review and approval.
**Prepared:** 2026-10-18.

---

## What this document is

This is a complete, reviewable UI/UX blueprint for **StudentKit Nigeria**, a practical educational website for Nigerian students. It describes how every page should look, how users move between pages, how each component behaves, and what content each page must contain — **before** any application logic is built.

It is **not** a finished website and it is **not** a guarantee of Google AdSense approval. A compliant-looking design does not by itself earn approval; the finished site's real content, functionality, accessibility, and policy compliance still decide the outcome.

## How to read it

Read the files in order. Each stage builds on the previous one.

| File | Stage | Contents |
|---|---|---|
| `README.md` | — | This map, product overview, scope, assumptions, open decisions |
| `01-design-foundation.md` | Stage 1 | Principles, colour, type, spacing, borders, icons, components, header/footer, breakpoints, accessibility |
| `02-page-inventory.md` | Stage 2 | One-row-per-page architecture table for the whole sitemap |
| `03-pages-main-and-tools.md` | Stage 3 | Pages 1–7: Homepage, Tools directory, 5 tool pages |
| `04-pages-guides.md` | Stage 3 | Pages 8–11: Guides directory + 3 guide articles |
| `05-pages-trust.md` | Stage 3 | Pages 12–16: About, Contact, Privacy, Terms, Disclaimer |
| `06-pages-system.md` | Stage 3 | Pages 17–20: 404, error states, no-results, print layouts |
| `07-consistency-review.md` | Stage 4 | Cross-page consistency checks |
| `08-final-checklist.md` | Stage 5 | Status checklist, open decisions, content to supply, accessibility and policy items to verify |

Responsive behaviour, interaction states, and trust rules are documented **inside each page spec** and summarised in Stage 4 and Stage 5, so nothing lives in only one place.

---

## Product overview

- **Product name:** StudentKit Nigeria
- **Working tagline:** Practical tools for smarter studying.
- **What it is:** A small, focused toolkit — five calculators/planners plus three how-to guides — that helps Nigerian students with everyday academic tasks.
- **What it is not:** Not a blog farm, not a school portal, not an ad-wrapper, not an AI-template clone. No account is required to use any tool.

**Target audience**
- Nigerian university and polytechnic students.
- Students preparing for examinations.
- Students organising study schedules.
- Students trying to understand their CGPA and academic performance.
- Students using practical tools on phones first, computers second.

**Primary design objective:** The interface must communicate usefulness immediately. A student should land, understand what the site offers, find the right tool, and use it without friction — on a mid-range Android phone, often on a slow connection.

---

## Scope boundaries honoured throughout

This specification does **not**: use or add external APIs; add a database or authentication; run CLI commands to inspect or build; install packages; add third-party services; implement full application logic; restructure or delete existing project files; or begin implementing pages. It introduces **no** feature beyond the approved scope.

It also does **not** fabricate: testimonials, student counts, institutional partnerships, qualifications, trust claims, AdSense publisher IDs, approval claims, or any affiliation with JAMB, WAEC, NECO, or any university. Everything not yet known is a **clearly labelled placeholder** (see below).

---

## Documented assumptions

These are design assumptions made to complete the specification. They change nothing in scope and can be corrected on review.

1. **Client-side only.** Every tool computes in the browser. No data leaves the device. This drives the privacy policy wording and the "nothing is saved to our servers" language on tool pages.
2. **Optional local persistence.** Where a tool benefits from remembering the last entry (e.g. CGPA course rows, a generated timetable), the design assumes **browser `localStorage` on the user's own device only**, and marks it as a decision requiring approval (see Open Decisions). If not approved, tools reset on reload and the copy is written accordingly.
3. **No site-wide search.** Five tools and three guides are navigable without search. Page 19 (no-results) is therefore documented as **Not applicable** unless search is later approved.
4. **Print, not PDF export.** "Print-friendly" means a CSS print stylesheet the user triggers with their browser/OS print function. No PDF-generation library or export service is designed.
5. **Contact mechanism pending.** No submission backend is assumed. The Contact page is specified in two variants (static contact details vs. a form), with the form variant clearly marked as needing a backend decision before it can truthfully claim to send messages.
6. **Grading scales are configurable, never "official".** The CGPA calculator offers common Nigerian scales as **selectable options with on-screen explanations**, never as "the official scale". Users are told to verify their institution's rules.
7. **Quiz content is original and small to start.** The quiz is designed to show only subjects/topics/counts that actually have original questions behind them. No fake question counts, no past-question archive claim.
8. **Single founder/owner, identity pending.** About/Contact/legal pages reference the operator via a labelled placeholder until real details are supplied.

---

## Open decisions requiring your approval (summary)

Full list with context is in `08-final-checklist.md`. The headline items:

- **D1 — Local persistence:** May tools remember inputs/results in the user's own browser (`localStorage`)? Yes/No changes several copy strings and the privacy policy.
- **D2 — Contact method:** Static email/details, a form with a backend, or a form that opens the user's mail app (`mailto`)? Determines the Contact page variant.
- **D3 — Grading scales to include:** Which specific scales ship at launch (e.g. a 5.0 scale and a 4.0 scale), and their exact grade→point mappings.
- **D4 — Quiz launch content:** Which subjects/topics have enough original questions to appear at launch.
- **D5 — Ad placements:** Which reserved ad slots (if any) are kept in the final build, to be filled only after real AdSense implementation in a later phase.
- **D6 — Operator identity & legal review:** Real owner/contact details, and sign-off that Privacy/Terms/Disclaimer wording matches the built site before launch.

---

## Placeholder convention

Anything not yet supplied appears as a bracketed, labelled placeholder so it is impossible to mistake for real content, e.g.:

`[PLACEHOLDER — contact email, to be supplied]`
`[PLACEHOLDER — operator/owner name, to be supplied]`
`[VERIFY — statement depends on final implementation]`

No placeholder may ship to production as-is; each is tracked in Stage 5.
