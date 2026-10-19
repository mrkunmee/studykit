# Stage 5 — Final Review & Approval

The specification phase is complete and ready for your review. **No implementation has begun. Nothing will be built, installed, run, or changed until you explicitly approve.**

---

## A. Completed specifications

**Foundation (Stage 1):** ✔ principles, colour palette (exact values), type scale, spacing scale, borders/radius/elevation, icon direction, component inventory, header, footer, breakpoints, accessibility principles.

**Architecture (Stage 2):** ✔ full page-inventory table for all 20 sitemap entries.

**Page specs (Stage 3):** all specified top-to-bottom with objective, sections, wireframe, copy intent, components, states, responsive behaviour, accessibility, ad considerations, internal links, and content-to-supply:

| # | Page | Status |
|---|---|---|
| 1 | Homepage | ✔ |
| 2 | Tools directory | ✔ |
| 3 | CGPA Calculator | ✔ |
| 4 | Study Planner | ✔ |
| 5 | Practice Quiz | ✔ |
| 6 | Exam Score Planner | ✔ |
| 7 | Percentage Calculator | ✔ |
| 8 | Guides directory | ✔ |
| 9 | CGPA guide | ✔ |
| 10 | Study timetable guide | ✔ |
| 11 | Quiz review guide | ✔ |
| 12 | About | ✔ |
| 13 | Contact | ✔ (two variants, pending D2) |
| 14 | Privacy Policy | ✔ (draft, [VERIFY] flags) |
| 15 | Terms of Use | ✔ (draft, legal review) |
| 16 | Disclaimer | ✔ |
| 17 | Custom 404 | ✔ |
| 18 | Generic error states | ✔ |
| 19 | No-results | ✔ documented Not Applicable (no search in scope) |
| 20 | Print-friendly results | ✔ (CSS print, no PDF export) |

**Consistency (Stage 4):** ✔ completed — see `07-consistency-review.md`.

---

## B. Decisions still requiring your approval

| ID | Decision | Why it matters | Default if unanswered |
|---|---|---|---|
| **D1** | Local persistence (`localStorage`, device-only) for tool inputs/results? | Changes copy on CGPA, Study Planner, homepage step 2, and the Privacy "local storage" section | **No persistence** — tools reset on reload |
| **D2** | Contact mechanism: static details / `mailto` / form + backend? | Determines Contact page variant and whether a "message sent" claim is truthful | **Variant A (static details)**, marked pending |
| **D3** | Which grading scales ship + exact grade→point mappings | Powers the CGPA calculator's scale selector and explanations | Offer one 5.0 and one 4.0 scale, both labelled selectable (not official) — **confirm mappings** |
| **D4** | Which subjects/topics/difficulties/counts have real original questions at launch | Quiz must only show choices with content; no fake counts | Launch with the subjects you can supply original questions for |
| **D5** | Which reserved ad slots to keep in the final build | Affects layout reserves; ads implemented only in a later phase | Keep slots reserved but empty; decide at implementation |
| **D6** | Operator/owner identity, real contact details, legal review of Privacy/Terms/Disclaimer | Replaces placeholders; required before launch & AdSense | Keep labelled placeholders until supplied |

---

## C. Content that must be supplied (currently placeholders)

- Operator/owner name or organisation (About, Terms IP, legal) — `[PLACEHOLDER — D6]`
- Contact email and/or social handle (Contact, Privacy, Disclaimer, footer) — `[PLACEHOLDER — D2/D6]`
- Exact grade-scale mappings (CGPA tool + guide) — `[PLACEHOLDER — D3]`
- Original quiz questions + explanations, per subject/topic (Quiz) — `[PLACEHOLDER — D4]`
- Privacy "Last updated" and Terms "Effective" dates — set at publication
- Jurisdiction/governing terms (Terms) — `[PLACEHOLDER — D6]`
- Final hero and page copy (editable throughout)

---

## D. Unresolved functionality questions

1. Does the Contact form need real delivery at launch, or can launch ship with static contact details? (D2)
2. Should timetables/CGPA entries persist on the device between visits? (D1)
3. Is dark mode wanted now, or deferred? (Recommended: deferred.)
4. Should the Exam Score Planner use the documented weight/mark model (components with weights summing to 100), or a different model you have in mind?
5. Do all three calculators get print layouts, or only CGPA + Study Planner? (Recommended: CGPA + Study Planner; Exam optional.)

---

## E. Potential accessibility issues to watch in build

- Sticky header must not cover content on short viewports or at 200% zoom (if sticky is used at all).
- Segmented controls (percentage modes, quiz answers, CGPA GPA/CGPA switch) must be real, keyboard-operable radio/tab patterns — not styled divs.
- Live-region result announcements must not become chatty on every keystroke (announce on calculate/submit, not per character).
- Colour-blind safety: every status (correct/incorrect, valid/invalid, increase/decrease) must keep its icon + text cue; verify with a simulator.
- Contrast of the teal primary on white and of muted text must be re-measured against AA in the real build.
- Course/component rows that stack on mobile must keep each field's label visible, not rely on column headers that disappear.

---

## F. Policy / AdSense items to verify **before** submitting an application

> A compliant-looking design is not approval. These must be true of the finished, deployed site.

- Privacy Policy reconciled with the **actual** build: real statements on data collected, local storage, cookies, analytics, and advertising — **[VERIFY all]**. No claim of "collects nothing", "no cookies", or "no analytics" unless verified against every connected service.
- Advertising section updated to reflect reality: states ads are not active until they are; discloses third-party ad tech when added.
- Terms liability/IP/jurisdiction reviewed by a qualified person.
- Every placeholder (C above) replaced with real content; no `[PLACEHOLDER]`/`[VERIFY]` strings left in production.
- All public pages are genuinely finished (no thin/empty pages), navigation complete, policy pages reachable.
- Original content only: quiz items original/licensed; no copied past questions; no fabricated reviews, authors, or stats.
- No deceptive buttons; ads clearly separated from controls and content; no accidental-click layouts; no intrusive overlays.
- Site is fully usable with **zero** ads present.

*(No promise is made that any of this guarantees approval, and no minimum page/word/visitor/day thresholds are invented.)*

---

## G. Recommendation (optional, for approval)

None of these expand scope; raise only if you want them considered:
- **Add a short `/faq` page** later if common questions outgrow per-tool FAQs. *(Recommendation only — not added without approval.)*
- **Defer dark mode** to a post-launch iteration.
- **Launch with CGPA + Study Planner print layouts**, add Exam planner print later if wanted.

---

## Next step

Please review and tell me either:
- **Approve** the specification as-is (I'll note the defaults in B as accepted), or
- **Approve with changes** (give answers to D1–D6 and any edits), or
- **Revise** specific pages/sections before approval.

I will **not** begin implementation, generate the site, install anything, run commands, or change the project until you explicitly approve.
