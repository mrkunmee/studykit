# Stage 2 — Page Inventory & Architecture

One row per page in the approved sitemap. Detailed top-to-bottom specs follow in Stage 3 (files `03`–`06`). "States" lists the meaningful states each page must handle; "Dependencies" lists content that must be supplied or decisions to be made.

Legend for dependencies: **D1–D6** = Open Decisions in `README.md` / `08-final-checklist.md`.

## Main pages

| # | URL | Purpose | Primary action | Main sections | Key components | Internal links | States | Dependencies |
|---|---|---|---|---|---|---|---|---|
| 1 | `/` | Explain the product fast; route to tools | Open the tools directory | Hero, Popular tools, How it works, Guides preview, Trust/transparency, Final CTA | Tool cards, Guide cards, Button, Header, Footer, (reserved ad slot) | /tools, each tool, /guides, each guide, /about | Static (no form) | D5 (ad slot) |
| 2 | `/tools` | Discover all tools | Open a chosen tool | Intro, Tool list (5), Short "how to choose", Link to guides | Tool cards, Button | all 5 tools, /guides, relevant guides | Static; empty-state only if filtering ever added (not now) | — |
| 3 | `/guides` | Discover educational guides | Open a guide | Intro, Guide list (3), Link to tools | Guide cards | all 3 guides, /tools | Static; empty state (if no guides) documented | D-content (more guides later) |

## Tool pages

| # | URL | Purpose | Primary action | Main sections | Key components | Internal links | States | Dependencies |
|---|---|---|---|---|---|---|---|---|
| 4 | `/tools/cgpa-calculator` | Compute semester GPA and cumulative CGPA | Calculate GPA/CGPA | Intro, Scale setup, Course rows, Cumulative mode, Results, Worked example, Notice, FAQ, Related | Select (scale), Add/Remove row, Number/Text fields, Segmented control (GPA/CGPA), Result tiles, Inline errors, Print layout | /guides/how-cgpa-is-calculated, other tools | Initial, partial, invalid, calculating→success, reset | D1 (persistence), D3 (scales) |
| 5 | `/tools/study-planner` | Build a study timetable from available time | Generate timetable | Intro, Planning form, Generated schedule, Controls, Empty/error, Educational note, Related | Fieldsets, Checkboxes (days), Time inputs, Add/Remove subject rows, Priority select, Schedule grid, Print layout | /guides/how-to-create-a-study-timetable, other tools | Initial/empty, missing input, generated, cannot-generate, reset | D1 (persistence) |
| 6 | `/tools/practice-quiz` | Focused self-test with review | Start / submit quiz | Intro, Quiz setup, Question view, Results, Mistake review, Notice, Related | Select (subject/topic/difficulty/count), Radio answers, Progress, Prev/Next, Submit, Review list | /guides/how-to-review-practice-quiz-results, other tools | No selection, no questions available, in-progress, unanswered, submitted, results, no-match | D4 (question content) |
| 7 | `/tools/exam-score-planner` | Work out marks needed to hit a target | Calculate required score | Intro, Assumptions note, Inputs, Results, Validation, Example, FAQ, Related | Number fields (weights/scores/target), Result tiles, Inline validation, Print layout | related guides, other tools | Initial, partial, invalid/impossible, success, reset | Assumptions (documented in spec) |
| 8 | `/tools/percentage-calculator` | Everyday percentage maths | Calculate | Intro, Mode selector, Mode inputs, Result, Explanation, Example, Related | Segmented control (3 modes), Number fields, Result panel, Inline errors | other tools | Per-mode: initial, invalid (incl. ÷0), success, reset | — |

## Educational guides

| # | URL | Purpose | Primary action | Main sections | Key components | Internal links | States | Dependencies |
|---|---|---|---|---|---|---|---|---|
| 9 | `/guides/how-cgpa-is-calculated` | Teach GPA/CGPA calculation | Read; then open calculator | Title, Intro, TOC, GPA vs CGPA, Formula, Worked example, Credit units, Institutional differences, Common mistakes, FAQ, Related | Article layout, TOC, Formula block, Example block, FAQ | /tools/cgpa-calculator, other guides | Static article | Math accuracy verify |
| 10 | `/guides/how-to-create-a-study-timetable` | Teach timetable building | Read; then open planner | Header, Intro, Step method, Allocating time, Breaks/revision, Adapting to exam dates, Illustrative example, Common mistakes, Related | Article layout, Example (labelled illustrative) | /tools/study-planner, other guides | Static article | — |
| 11 | `/guides/how-to-review-practice-quiz-results` | Teach learning from results | Read; then open quiz | Title, Intro, Interpreting results, Reviewing wrong answers, Finding gaps, Planning revision, Example, Common mistakes, Related | Article layout, Example block | /tools/practice-quiz, other guides | Static article | — |

## Trust & information pages

| # | URL | Purpose | Primary action | Main sections | Key components | Internal links | States | Dependencies |
|---|---|---|---|---|---|---|---|---|
| 12 | `/about` | Say what the site is and whom it serves | Explore tools/guides | Title, Purpose, Audience, What we offer, Our commitments, Contact pathway | Prose, Callouts, Link list | /tools, /guides, /contact | Static | D6 (operator identity placeholder) |
| 13 | `/contact` | Let users reach the operator | Send/record a message | Intro, Contact method OR form, Alternative route, (confirmation) | Form fields OR static details, Inline validation, Confirmation state | /about, /privacy-policy | Variant A (static): static. Variant B (form): initial, invalid, submitting, success, failure | D2 (contact mechanism) |
| 14 | `/privacy-policy` | Explain real data practices | Read | Heading, Last-updated, TOC, Info collected, Voluntary info, Local storage, Cookies/analytics, Advertising, Retention/security, Choices/rights, Contact | Legal article, TOC, Last-updated stamp | /contact, /terms, /disclaimer | Static | D1, D2, D5, D6, **VERIFY against build** |
| 15 | `/terms` | Set terms of use | Read | Acceptance, Permitted use, Tool use, Limitations of calculations, IP, Availability/changes, Liability, Contact, Effective date | Legal article, TOC | /privacy-policy, /disclaimer, /contact | Static | D6, **legal review** |
| 16 | `/disclaimer` | State limits & no-affiliation | Read | Educational purpose, Calculator assumptions, Grading differences, Limits of planning/estimates, Accuracy/verification, No performance guarantee, No affiliation, Contact | Readable article | tools, /terms | Static | D6 |

## System pages

| # | URL/trigger | Purpose | Primary action | Main sections | Key components | Internal links | States | Dependencies |
|---|---|---|---|---|---|---|---|---|
| 17 | Custom 404 | Help a lost user recover | Go somewhere useful | Message, Links to home/tools/guides | Header, Footer, Link list | /, /tools, /guides | Shown on unknown route | — |
| 18 | Generic error states | Handle failures gracefully | Retry / go back | Plain-language message, next step | Inline error panel, Full-page error template | context-dependent | Field error, calc failure, tool unavailable, failed action, missing content | — |
| 19 | Empty search / no-results | Handle no matches | Broaden/browse | Explanation, suggestions, browse links | No-results component | /tools, /guides | **Not applicable** unless search approved | Search = out of scope (see README) |
| 20 | Print-friendly results | Clean printed output | Print (user-triggered) | Result title, details, no chrome | Print CSS for CGPA, Study Planner, (Exam planner) | — | Triggered from result panels | No PDF export (D/assumption) |

**Notes**
- Page 19 is documented as *Not applicable* in `06-pages-system.md` because no site-wide search is in scope. If search is later approved, it becomes active with the spec already written.
- Page 20 is a print **stylesheet** across applicable tool results, not a separate URL and not a PDF export.
