# Stage 4 — Cross-Page Consistency Review

A pass across the whole specification to confirm it holds together. Each row: the check, the result, and where it's enforced.

## Design-system consistency
| Check | Result | Enforced in |
|---|---|---|
| All pages use one colour/type/spacing/border system | ✔ Tokens defined once | `01` §2–§5; every page references them |
| Headings follow one scale, one H1 per page | ✔ | `01` §3; each page spec |
| Icons: single line style, no emoji UI icons | ✔ | `01` §6 |
| Cards, tiles, callouts reused, not reinvented | ✔ | `01` §7; tool/guide pages |

## Navigation consistency
| Check | Result | Notes |
|---|---|---|
| Same header/footer on every page | ✔ | `01` §8–§9; 404 & error pages included |
| Nav limited to Tools/Guides/About/Contact; policies in footer | ✔ | avoids mobile overcrowding |
| Active state shown by colour **and** shape + `aria-current` | ✔ | `01` §8 |
| Breadcrumbs on tool/guide sub-pages | ✔ | pages 3–11 |
| Skip-to-content link present | ✔ | `01` §8, §12 |

## Button & action consistency
| Check | Result | Notes |
|---|---|---|
| One button hierarchy (primary/secondary/tertiary/text) everywhere | ✔ | `01` §7 |
| Labels describe the action ("Open CGPA Calculator", "Calculate", "Print result") | ✔ | all pages; no bare "Open"/"Click here" |
| Full-width primary buttons on mobile | ✔ | `01` §11–§12; tools |
| Destructive reset uses confirm only when data exists | ✔ | CGPA, Study Planner |

## Form & validation consistency
| Check | Result | Notes |
|---|---|---|
| Every field has a real label; placeholder never the only label | ✔ | `01` §12; all forms |
| Inline errors = icon + text + colour + `aria-describedby` | ✔ | tools, contact |
| Required fields marked with text + `*` + `aria-required` | ✔ | `01` §12 |
| Add/Remove row pattern identical across CGPA, Study Planner, Exam planner | ✔ | shared component `01` §7 |
| Results announced via `aria-live` | ✔ | all calculators |

## Purpose & content
| Check | Result | Notes |
|---|---|---|
| Every public page has one clear purpose | ✔ | `02` inventory |
| Tool pages link to their matching guide | ✔ | CGPA→guide 9, Planner→10, Quiz→11 |
| Guides link back to their matching tool | ✔ | guides 9–11 |
| Policy pages reachable from footer on every page | ✔ | `01` §9 |
| No page is a heading over a few links (directories have real context) | ✔ | pages 2, 8 |

## Mobile layout
| Check | Result | Notes |
|---|---|---|
| Mobile-first; no page merely scaled from desktop | ✔ | `01` §11; per-page responsive notes |
| Tool rows stack into labelled fields on mobile | ✔ | CGPA, Planner, Exam |
| Wide content scrolls inside its own container; body never scrolls sideways | ✔ | `01` §11 |
| Touch targets ≥44px | ✔ | `01` §12 |
| No conflicting content order between breakpoints | ✔ | home, tools, guides |

## Trust & accuracy
| Check | Result | Notes |
|---|---|---|
| No fabricated stats, testimonials, partnerships, credentials, publisher IDs | ✔ | all pages |
| No implied affiliation with JAMB/WAEC/NECO/universities | ✔ | quiz, guides, disclaimer, home |
| All worked examples mathematically correct and labelled as examples | ✔ (CGPA 4.00/3.60; %: 36/25%/30%; exam 37.1%) | pages 3,6,7,9 |
| Grading scales presented as selectable, never "official/universal" | ✔ | page 3, guide 9 |
| Policy claims about data/cookies/analytics/ads flagged [VERIFY] | ✔ | page 14 |

## Scope discipline
| Check | Result | Notes |
|---|---|---|
| No external APIs, DB, auth, packages, integrations introduced | ✔ | README scope |
| No feature added beyond approved scope | ✔ | search documented as out-of-scope (page 19) |
| Ads: reserved slots only, empty this phase, never near controls | ✔ | `01` §10; per-page ad notes |
| Print = CSS stylesheet, not PDF export | ✔ | page 20 |
| Existing project files untouched | ✔ | only the new spec folder created |

## Gaps surfaced (carried to Stage 5)
- Open decisions **D1–D6** affect copy on multiple pages (persistence wording, contact mechanism, grade scales, quiz content, ad slots, operator identity/legal review).
- Privacy/Terms require reconciliation with the final build and legal review before launch.
- Dark mode intentionally not fully specified (optional, later).
