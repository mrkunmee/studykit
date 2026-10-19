# Stage 3 (Part B) — Guides (8–11)

Guides use a proper **article layout**: readable line length (~65–72 chars, `max-width ~38rem`), clear heading hierarchy, a contents list when long, and a sidebar/aside only on `md`+ (collapses above content on mobile). All examples are **labelled as examples/illustrative** and all maths is verifiable.

Shared article anatomy:
```
[Header][Breadcrumb: Guides / <title>]
[H1 title][meta: reading context, last-updated (optional)]
[Intro paragraph]
[On this page — TOC (long guides)]
[Sections with H2/H3, formula/example blocks, callouts]
[Key takeaways]
[CTA to the matching tool]
[Related resources]
[Footer]
```
**Responsive (all guides):** single column on mobile; TOC becomes a collapsible "On this page" at the top; on `lg` the TOC may sit as a sticky aside. Formulas and examples sit in bordered blocks that scroll horizontally only inside themselves if ever too wide. **Accessibility (all guides):** one H1, ordered headings, TOC links to in-page anchors, code/formula blocks readable at 200% zoom, no meaning via colour alone. **Ads (all guides):** at most one in-content slot between two sections, clearly separated; empty this phase (D5).

---

## PAGE 8 — Guides Directory `/guides`

**Objective:** A small, genuine resource library — easy to scan, not a thin-article feed made to fill space.

**Section order:** Header → H1 + intro → Guide list (3) → Link to tools → Footer.

**Content**
- **H1:** "Guides". **Intro:** "Short, practical guides that explain the thinking behind the tools — how CGPA works, how to build a timetable, and how to learn from quiz results."
- **Guide cards** (title, 1–2 line summary, optional category label only if useful, "Read guide"):
  - "How CGPA is calculated" — "GPA vs CGPA, the formula, and a worked example."
  - "How to create a study timetable" — "A simple method to turn your free time into a plan."
  - "How to review practice quiz results" — "Turn wrong answers into your next revision list."
- **Empty state (documented):** if no guides exist, show "Guides are coming soon." with a link to tools — **not** auto-generated filler.

**States:** Static; empty state as above.
**Responsive:** cards 1-up (mobile) → 2–3-up (`md`).
**Internal links:** all 3 guides, /tools (and each guide card links to its matching tool).
**To supply/verify:** whether more guides are added later (content decision, not scope change).

---

## PAGE 9 — CGPA Guide `/guides/how-cgpa-is-calculated`

**Objective:** Teach GPA/CGPA correctly, then send the reader to the calculator.

**Sections (H2):**
1. **Introduction** — what the guide covers and why CGPA matters for a student's academic standing.
2. **TOC** — "On this page" (this guide is long enough to justify it).
3. **GPA vs CGPA** — GPA = one semester; CGPA = cumulative across semesters.
4. **The formula** (formula block):
   - `GPA = Σ(credit units × grade point) ÷ Σ(credit units)`
   - `CGPA = Σ(all quality points to date) ÷ Σ(all credit units to date)`
5. **Worked example** (verifiable — same as the tool, for consistency):
   - A(3), B(2), C(4), A(1) on a 5.0 scale → quality points 15+8+12+5 = **40**; units = **10**; **GPA = 4.00**.
   - Add previous 40 units at 3.50 (=140 points): total 180 points ÷ 50 units = **CGPA 3.60**.
6. **What credit units mean** — why a 4-unit course weighs more than a 1-unit course.
7. **Institutional grading differences** — grade points and class boundaries differ between Nigerian institutions and can change; **presented as variation, not a single universal policy**; advise checking the student's own handbook.
8. **Common calculation mistakes** — forgetting to weight by units; mixing scales; dropping failed-course units; rounding too early.
9. **FAQ** — "Does a failed course count?" (depends on school rules — verify), "Can my CGPA go up after a bad semester?" (yes — show why with the formula).
10. **Related resources** + **CTA:** primary link "Open the CGPA Calculator" → `/tools/cgpa-calculator`; links to other guides.

**Content accuracy rule:** No unofficial scale stated as universal Nigerian policy; every numeric example labelled as an example on a stated scale.
**To supply/verify:** class-of-degree boundary examples only if shown as "example, varies by school"; math re-checked at build.

---

## PAGE 10 — Study Timetable Guide `/guides/how-to-create-a-study-timetable`

**Objective:** Give a repeatable method for building a realistic timetable, then send the reader to the planner.

**Sections (H2):**
1. **Introduction** — why a written timetable beats vague intentions.
2. **A step-by-step method** — (1) list subjects/topics, (2) find your real free time, (3) rank by priority and nearest exam, (4) assign sessions, (5) add breaks and revision, (6) review weekly.
3. **Allocating time across subjects** — give more sessions to harder/heavier/sooner subjects; balance so nothing is neglected.
4. **Breaks and revision** — short breaks between sessions; spaced revision beats cramming.
5. **Adapting to exam dates** — work backwards from each exam; increase a subject's time as its exam nears.
6. **An illustrative example** — **clearly labelled "Illustrative only — adjust to your own timetable."** A sample week: e.g. Mon/Wed/Fri 4–6pm split across two subjects with a 10-minute break; not presented as an ideal everyone should copy.
7. **Common mistakes** — over-packing the day; ignoring energy levels; no breaks; never reviewing the plan.
8. **Related resources** + **CTA:** "Open the Study Planner" → `/tools/study-planner`; other guides.

**Content rule:** the example is illustrative, never a guaranteed-ideal schedule.
**To supply/verify:** none beyond copy.

---

## PAGE 11 — Quiz Review Guide `/guides/how-to-review-practice-quiz-results`

**Objective:** Teach students to turn quiz results into a revision plan — without implying a score predicts an official exam result.

**Sections (H2):**
1. **Introduction** — the review matters more than the score.
2. **How to interpret your results** — look at patterns, not just the number; a practice score is feedback, **not** a prediction of WAEC/JAMB/NECO or any official result.
3. **How to review incorrect answers** — read each explanation; identify *why* it was wrong (misread, knowledge gap, guess).
4. **How to identify recurring knowledge gaps** — group mistakes by topic to see where to focus.
5. **How to plan follow-up revision** — convert gaps into specific next sessions (ties to the Study Planner).
6. **An illustrative review example** — labelled illustrative: e.g. "3 of 4 missed questions were on one topic → schedule two sessions on it this week."
7. **Common mistakes when interpreting scores** — chasing the score; ignoring explanations; assuming a good practice score guarantees exam success.
8. **Related resources** + **CTA:** "Open the Practice Quiz" → `/tools/practice-quiz`; other guides.

**Content rule:** explicitly no claim that a quiz score predicts an official examination result.
**To supply/verify:** none beyond copy.
