# Stage 3 (Part A) — Main Pages & Tool Pages (1–7)

Each page is documented top to bottom: objective, section order, wireframe sketch, content/copy intent, components, interaction states, responsive behaviour, accessibility, ad considerations, internal links, and content to supply/verify. All copy is **suggested**; nothing fabricates numbers, authority, or affiliation.

---

## PAGE 1 — Homepage `/`

**Objective:** In the first screen, make a student understand what StudentKit is and get them to a tool. Everything else supports that.

**Section order:** Header → Hero → Popular tools → How it works → Guides preview → Trust/transparency → Final CTA → Footer.

**Wireframe (mobile)**
```
[Header: logo .......... ☰]
[Hero: H1, subtext, (Open tools) (Read guides)]
[Tool preview strip — restrained UI chips, not fake screenshots]
[Popular tools — 5 stacked tool cards]
[How it works — 3 numbered steps]
[—— reserved ad slot (empty this phase) ——]
[Guides — 3 guide cards]
[Trust/transparency — short plain-text block]
[Final CTA — (Open tools)]
[Footer]
```

**Hero**
- **H1 (suggested):** "Practical tools for smarter studying."
- **Subtext:** "Free CGPA, study-planning, quiz, exam-target and percentage tools built for Nigerian university and polytechnic students. No sign-up — open a tool and start." *(No stats, no claims.)*
- **Primary CTA:** "Open tools" → `/tools`. **Secondary:** "Read the guides" → `/guides`.
- **Visual:** A restrained arrangement of the five tool icons with their names — real interface elements (chips/mini cards), **not** fabricated dashboards, testimonials, or statistics.

**Popular tools section**
- H2: "The tools". Intro line: "Five focused tools. Pick what you need."
- Five **tool cards**, each: tool icon, name, one specific sentence, and an "Open" action (whole card is a link; the visible action labels the destination).
  - CGPA Calculator — "Work out your semester GPA and cumulative CGPA."
  - Study Planner — "Turn your free time into a clear study timetable."
  - Practice Quiz — "Test yourself and review every mistake."
  - Exam Score Planner — "See the exam mark you need to hit a target."
  - Percentage Calculator — "Quick, clearly-labelled percentage calculations."

**How it works (3 steps, no over-claiming)**
1. "Choose a tool." 2. "Enter your details — nothing leaves your device." 3. "Get a clear result you can read, print, or act on."
*(Step 2 wording depends on D1/architecture; marked VERIFY if persistence changes it.)*

**Guides preview**
- H2: "Learn the how and why". Three guide cards (title + one-line summary + "Read guide"). Links to the three guides.

**Trust & transparency**
- Short plain block, no invented credibility: "StudentKit Nigeria is a free set of study tools and guides. Our calculators give estimates based on the inputs and the grading scale you choose — always confirm the official rules at your own institution. We are not affiliated with JAMB, WAEC, NECO, or any university." Link: "More about StudentKit" → `/about`.

**Final CTA:** H2 "Ready to start?" + primary "Open tools".

**Interaction states:** Static page (no forms). Cards: default / hover (subtle `--shadow-2` + border) / focus (2px ring) / active. Links keyboard-reachable in reading order.

**Responsive:** Mobile single column, full-width CTAs, tool cards stacked. `md`: tool cards 2–3 per row, guides 3-up, CTAs inline. Content order never changes between breakpoints.

**Accessibility:** One H1; sections use H2. Tool/guide cards are real links with descriptive names ("Open CGPA Calculator"), not bare "Open". Icons decorative where names are present.

**Ads:** One reserved slot between "How it works" and "Guides"; empty/collapsed this phase (D5). None in hero or tools grid.

**Internal links:** /tools, all 5 tools, /guides, all 3 guides, /about.

**To supply/verify:** Final hero copy; confirm step-2 wording after D1.

---

## PAGE 2 — Tools Directory `/tools`

**Objective:** Let a student scan all tools and open the right one, with enough context that the page isn't just a heading over five links.

**Section order:** Header → Page intro → Tools list (5) → "How to choose" helper → Link to guides → Footer.

**Wireframe (mobile)**
```
[Header]
[H1: All tools] [intro paragraph]
[Tool card 1 ... 5 — each: icon, name, 2–3 line description, "Open"]
[How to choose — 3 short bullets]
[Callout: New here? Read the guides → /guides]
[Footer]
```

**Content**
- **H1:** "All tools". **Intro:** "Five free tools for everyday academic tasks. Each one runs in your browser and gives an estimate you can read and verify."
- **Tool cards** (slightly richer than homepage): icon, name, 2–3 line description incl. what it needs and what it returns, and an "Open [tool]" action.
  - *CGPA Calculator* — "Enter your courses, credit units and grades on a scale you choose. Get your semester GPA and, if you add previous totals, your cumulative CGPA."
  - *Study Planner* — "Tell it your subjects and free time; it lays out a day-by-day study timetable you can print."
  - *Practice Quiz* — "Pick a subject and length, answer original questions, then review which ones you missed and why."
  - *Exam Score Planner* — "Enter your assessment weights and current marks to see the exam score needed for a target."
  - *Percentage Calculator* — "Three clearly-labelled modes for the percentage maths students need most."
- **How to choose:** 3 bullets mapping a need to a tool ("Checking your grades? → CGPA Calculator", etc.).

**No search/filter/sort** — five tools don't need it (documented decision). If categories are ever added, each would get an empty state; none now.

**States:** Static. Cards: default/hover/focus/active.

**Responsive:** 1 col → 2 col (`sm`) → list retains 2–3 col grid (`lg`). Cards equal height; descriptions truncate by content, not clamp.

**Accessibility:** H1 + card titles as H2/H3; each card a labelled link.

**Ads:** Optional single slot below the list (D5); empty this phase.

**Internal links:** all 5 tools, /guides, and each relevant guide from its matching tool card ("Learn: How CGPA is calculated").

**To supply/verify:** none beyond copy.

---

## PAGE 3 — CGPA Calculator `/tools/cgpa-calculator`

**Objective:** Let a student compute an accurate **semester GPA** and, optionally, a **cumulative CGPA**, on a grading scale they select, with the math and its limits made clear.

**Section order:** Header → Breadcrumb → Intro → Grade-scale setup → Course entry → Cumulative mode (optional) → Actions → Results → Worked example → Important notice → FAQ → Related → Footer.

**Wireframe (mobile)**
```
[Header] [Breadcrumb: Tools / CGPA Calculator]
[H1 + intro]
[Scale setup: Select scale ▾ + explanation of chosen scale]
[Course entry:
   Row: Course (optional) | Units | Grade ▾ | [Remove]
   ...repeat...
   (+ Add course) ]
[Cumulative mode (collapsible):
   Previous cumulative units | Previous CGPA ]
[ (Calculate) (Reset) ]
[Results panel: GPA/CGPA (big), total units, quality points, breakdown]
[Worked example]
[Important notice callout]
[FAQ accordion]
[Related: CGPA guide, other tools]
[Footer]
```

**Intro:** "Calculate your GPA for one semester, or your cumulative CGPA across semesters. Choose the grading scale that matches your school — grade points differ between institutions, so confirm your school's official scale." *(No claim that any scale is universal.)*

**Grade-scale setup**
- `Select` labelled "Grading scale". Options come from D3 (e.g. a 5.0-point scale and a 4.0-point scale), each a **selectable option with an on-screen explanation** of its grade→point mapping. Changing scale updates the grade dropdown options and the explanation.
- Explanation block lists the exact mapping of the selected scale (e.g. for a 5.0 scale: A=5, B=4, C=3, D=2, E=1, F=0) **labelled as the selected scale, not "the official scale"**. Final mappings per D3.

**Course entry interface** — repeating row (fieldset per row, legend "Course N"):
- **Course name or code** — text, **optional**, helper "For your reference only."
- **Credit units** — number, required, min 0 (or 1 per D3), step 1; invalid if empty/≤0/non-numeric.
- **Grade** — select limited to the chosen scale's grades (shows grade and its point, e.g. "B (4)").
- **Remove** — icon button "Remove course N" (disabled when only one row remains, or re-adds an empty row on removing the last).
- **Add course** — tertiary button "+ Add course" appends a row; focus moves to the new row's first field.
- **Invalid/incomplete** rows are flagged inline (red outline + icon + message) and summarised near the Calculate button ("2 courses need a valid credit unit").

**Cumulative (CGPA) mode** — a collapsible/segmented switch "Semester GPA only / Include previous record":
- When "Include previous record" is on: **Previous cumulative credit units** (number) and **Previous CGPA** (number, bounded by the scale max). Helper text explains these come from the student's latest result.
- The interface clearly labels outputs as **Semester GPA** vs **Cumulative CGPA** so they're never confused.

**Actions:** Primary "Calculate" (disabled only while inputs are being corrected, otherwise enabled; on click validates). Secondary "Reset" (clears rows to one empty row and results; confirm dialog only if the user has entered data — "Clear all courses and results?").

**Results section** (announced via `aria-live="polite"`):
- **Primary tile:** large number — "Semester GPA: 4.00" and, if cumulative mode on, "Cumulative CGPA: 3.60", with tabular numerals.
- **Supporting tiles:** Total credit units; Total quality points (units × grade point summed).
- **Breakdown (expandable):** per-course quality points and the division performed.
- **Explanation line:** "GPA = total quality points ÷ total credit units."
- **Actions in results:** "Recalculate" (re-runs), "Reset", "Print result" (triggers print layout — see Page 20). **No PDF/export claim.**

**Worked example (verifiable, in content):**
> Semester: A (3 units), B (2 units), C (4 units), A (1 unit) on a 5.0 scale.
> Quality points = (5×3)+(4×2)+(3×4)+(5×1) = 15+8+12+5 = **40**.
> Credit units = 3+2+4+1 = **10**.
> **Semester GPA = 40 ÷ 10 = 4.00**.
> Cumulative: previous 40 units at CGPA 3.50 → previous quality points = 3.50×40 = 140. Add this semester (40 points, 10 units): total = 180 points over 50 units. **CGPA = 180 ÷ 50 = 3.60**.

**Important notice (callout):** "Grade points and rules differ between Nigerian institutions and can change. This tool follows the scale you selected above — always confirm your school's official grading policy."

**FAQ (only genuine questions):** "What's the difference between GPA and CGPA?", "My school uses different grade points — can I still use this?" (yes, pick/confirm the matching scale), "Do you store my results?" (answer per D1), "Why is my CGPA lower/higher than expected?" (common input mistakes).

**Interaction states:** *Initial* (one empty course row, no results). *Partially completed* (some rows valid). *Invalid* (inline + summary, Calculate blocked with a clear message, not a silent no-op). *Calculating→success* (brief working state only if needed; results appear and are announced). *Reset* (back to initial, with confirm if data existed).

**Responsive:** Rows are a grid on desktop (Course | Units | Grade | Remove) and **stack into labelled fields** on mobile with the Remove control as a full-width or clearly-placed button. Results tiles: row on desktop, stacked on mobile. The course list scrolls within the page normally (not a side-scroll table) because it stacks.

**Accessibility:** Each row is a `fieldset`; all inputs labelled; grade select announces grade + point; errors via `aria-describedby`; results in a live region; Add/Remove are real buttons with contextual names; number inputs use `inputmode="numeric"`.

**Ads:** Optional slot **below** results/worked example only; never between the form and Calculate, never beside grade selects.

**Internal links:** `/guides/how-cgpa-is-calculated` (prominent "Learn how this is calculated"), other tools.

**To supply/verify:** **D3** exact scales and mappings; **D1** persistence + storage copy; math example re-checked at build.

---

## PAGE 4 — Study Planner `/tools/study-planner`

**Objective:** Turn a student's subjects and available time into a clear, conflict-free study timetable they can read and print.

**Section order:** Header → Breadcrumb → Intro → Planning form → Actions → Generated schedule → Controls → Empty/error states → Educational note → Related → Footer.

**Wireframe (mobile)**
```
[Header][Breadcrumb]
[H1 + intro]
[Form:
  Subjects (add/remove rows: name + priority ▾ + optional exam date)
  Available days (checkbox group: Mon–Sun)
  Daily time window (start / end)  OR  per-day windows (optional, scope note)
  Session length (select: 30/45/60/90 min)
  Break length (select, optional)
 ]
[ (Generate timetable) (Reset) ]
[Schedule: day-by-day blocks with start–end + subject]
[Controls: Regenerate | Edit inputs | Print]
[Educational note + link to guide]
[Footer]
```

**Intro:** "A study timetable turns 'I'll study later' into specific sessions. Enter your subjects and the time you actually have; the planner spreads your subjects across your free time. It runs on your device and nothing is saved to a server." *(storage per D1.)*

**Planning form fields**
- **Subjects/topics** — repeating rows: name (required), **priority** select (High/Medium/Low — affects how much time/earliest placement), optional **exam date** (date). Add/Remove row controls.
- **Available study days** — checkbox group Mon–Sun (≥1 required).
- **Available time window** — start time + end time (end must be after start). *(Per-day windows marked optional/possible-later to avoid scope creep.)*
- **Session length** — select (e.g. 30/45/60/90 min).
- **Break preference** — select (None/5/10/15 min between sessions) — in scope as a simple option.
- **No unnecessary personal fields** (no name, email, etc.).

**Schedule generation area**
- Output grouped **day by day**; each entry shows **start–end time** and a readable subject label; priority reflected in frequency/placement.
- **Conflict prevention:** sessions never overlap; breaks inserted between sessions; sessions never exceed the daily window.
- **Unavailable time** (unchecked days, outside the window) is simply not scheduled.
- **Cannot produce a valid schedule:** if the window is too small for even one session, or no days/subjects chosen, show a clear explanation ("Your available time is shorter than one 60-minute session. Reduce session length or add time.") — not an empty grid.

**Result controls (approved scope):** "Regenerate" (new arrangement from same inputs), "Edit inputs" (scroll back to form with values intact), "Reset", "Print timetable" (Page 20). Copy must **not** imply the timetable is saved permanently unless D1 approves local persistence — if it does, wording is "Saved on this device only" with a "Clear saved plan" control.

**States:** *Initial/empty* (form only, helper text where the schedule will appear: "Your timetable will show here after you generate it."). *Missing input* (inline errors: which field, why). *Generated* (schedule + controls). *Cannot generate* (explanatory message with the specific fix). *Reset*.

**Responsive:** Form stacks on mobile; day checkboxes wrap in a 2–3 column grid. Schedule renders as **stacked day sections** on mobile (each day a card of time-blocks) and can become a columned week view on `lg` (horizontal scroll contained if needed). Touch targets ≥44px.

**Accessibility:** Checkbox group in a `fieldset`/`legend` "Available days"; time inputs labelled; generated schedule has headings per day and is announced via live region; "Regenerate" explains it will replace the current plan.

**Ads:** Optional slot below the educational note only; never between inputs and Generate.

**Internal links:** `/guides/how-to-create-a-study-timetable`, other tools.

**To supply/verify:** D1 persistence wording; confirm session-length and break options.

---

## PAGE 5 — Practice Quiz `/tools/practice-quiz`

**Objective:** A focused self-test (not a game) that helps a student learn by reviewing mistakes. Only shows subjects/topics/counts that have **real, original** questions behind them.

**Section order:** Header → Breadcrumb → Intro → Quiz setup → Question view → Results → Mistake review → Content/affiliation notice → Related → Footer.

**Wireframe (mobile)**
```
[Header][Breadcrumb]
[H1 + intro]
SETUP:
[Subject ▾][Topic ▾ (if any)][Difficulty ▾ (if any)][Number of questions ▾]
[ (Start quiz) ]
IN QUIZ:
[Progress: Question 3 of 10 • (answered dots)]
[Question text]
( ) option A  ( ) option B  ( ) option C  ( ) option D
[ (Previous) (Next) ]   [ (Submit) when complete ]
RESULTS:
[Score: 7/10] [Correct 7 • Incorrect 3]
[Review list: each Q with your answer, correct answer, explanation]
[ (Retry) (New quiz) ]
[Footer]
```

**Intro:** "Practise with short, original quizzes and learn from every answer. Choose a subject and length, then review the questions you missed with explanations." *(No claim of official past questions.)*

**Quiz setup** — selects only for options that **have content** (D4):
- **Subject** (required). **Topic** (only if that subject has topics). **Difficulty** (only if graded content exists). **Number of questions** (bounded by how many exist — e.g. max = available count; never a fabricated number).
- If a combination has no questions: **no-match state** ("No questions yet for this choice. Try another subject or fewer filters."). If nothing exists at all for a subject, it doesn't appear.

**Question interface**
- Question text (supports longer stems; wraps cleanly on mobile).
- Answer choices as a **radio group** (one selectable); clear selected state (filled control + border + not colour-alone).
- **Progress:** "Question X of N" plus a compact answered indicator.
- **Previous/Next** controls; **Submit/Finish** available once reachable; **unanswered indication** on submit attempt ("3 questions are unanswered — submit anyway or go back?").

**Results screen**
- **Score** (e.g. "7 / 10") + counts correct/incorrect.
- **Review of answers:** per question — the student's choice, the correct choice (clearly marked with icon + label, not colour alone), and an **explanation where available**.
- **Next actions:** "Retry same quiz", "New quiz", link to the quiz-review guide.

**Mistake review:** A filter/section to show **incorrect only**, each with the explanation and a prompt to revisit the topic — ties into `/guides/how-to-review-practice-quiz-results`.

**Content & affiliation notice:** "Questions are original practice items written for StudentKit. This is practice, not an official exam, and we are not affiliated with JAMB, WAEC, NECO, or any examination body." **No copied past questions; no fake counts.**

**States:** *No quiz selected* (setup only). *No questions available* (subject/topic hidden or disabled with reason). *In progress*. *Unanswered* (prompt on submit). *Submitted* (brief transition). *Results available*. *No matching questions* (clear message + how to adjust).

**Responsive:** Setup selects stack on mobile. In-quiz: question + options full width, Prev/Next as a bottom control row (large targets); Submit prominent when ready. Review list stacks. Long questions never overflow; options wrap.

**Accessibility:** Options are a `radiogroup` with labels; progress announced; results and review in a live region; correct/incorrect marked with icon + text + colour; keyboard: arrows move within options, Tab between controls.

**Ads:** Allowed only **outside** the active quiz flow (e.g. below results or on setup), never beside answer choices (must not resemble a quiz option).

**Internal links:** `/guides/how-to-review-practice-quiz-results`, other tools.

**To supply/verify:** **D4** which subjects/topics/difficulties/counts actually have original questions at launch; explanations authored per question.

---

## PAGE 6 — Exam Score Planner `/tools/exam-score-planner`

**Objective:** Help a student see the mark they'd need on remaining assessment(s) to reach a target — within clearly stated assumptions, never as a guaranteed outcome.

**Documented calculation assumptions (shown on-page):**
- The course is made of **assessment components**, each with a **weight (%)**; weights should sum to 100%.
- For each component the student enters either the **mark achieved (as % of that component)** or leaves it blank if not yet taken.
- The student enters a **target overall percentage**.
- The tool computes: current weighted total from completed components, remaining weight, and the **average mark required on remaining components** to hit the target. These are arithmetic results, **not** predictions and **not** an institutional marking system.

**Section order:** Header → Breadcrumb → Intro → Assumptions note → Inputs → Actions → Results → Validation messaging → Example → FAQ → Related → Footer.

**Wireframe (mobile)**
```
[Header][Breadcrumb][H1 + intro]
[Assumptions note (how this is calculated)]
[Components (rows): name | weight % | mark % (or "not taken")  (+ Add / Remove)]
[Target overall %]
[ (Calculate) (Reset) ]
[Results: current weighted total • remaining weight • required avg on remaining • plain-language line]
[Validation messages inline]
[Worked example][FAQ][Related][Footer]
```

**Intro:** "See the score you'd need on your remaining assessments to reach a target — based only on the weights and marks you enter. It can't predict your real result; grading and weighting depend on your course."

**Inputs**
- **Component rows:** name (optional), **weight %** (required, number), **mark %** (number, optional/blank if not taken). Add/Remove rows.
- **Target overall %** (required, 0–100).

**Results**
- **Target** echoed. **Current weighted total** (sum of weight×mark for completed components, ÷100). **Remaining weight.** **Required average on remaining components** = (target − current weighted total) ÷ (remaining weight ÷ 100).
- **Plain-language line:** e.g. "To reach 50% overall, you need about 37% on the remaining 70%."

**Validation for impossible/inconsistent values**
- Weights sum ≠ 100 → warning with the current sum ("Weights add up to 90%. Add 10% or adjust.").
- Required average **> 100** → "Not achievable with the remaining weight — even a perfect remaining score reaches only X%." (states the max reachable).
- Required average **≤ 0** → "You've already reached this target." Marks/target outside 0–100 → field errors.

**Worked example (verifiable):**
> Components: CA weight 30% with mark 80%; Exam weight 70% not yet taken. Target overall 50%.
> Current weighted total = 30%×80% = 0.30×0.80 = 0.24 → **24%**. Remaining weight = 70%.
> Required on exam = (50% − 24%) ÷ 70% = 26 ÷ 70 ≈ **37.1%**. Achievable (≤100%). ✔

**Educational notice:** "Actual grading, weighting, rounding and exam outcomes depend on your institution's rules. Treat this as planning maths, not a guaranteed result."

**States:** Initial, partial, invalid/impossible (as above), success, reset.

**Responsive:** Component rows stack with labels on mobile; results as stacked tiles; example and FAQ as normal article blocks.

**Accessibility:** Labelled numeric inputs (`inputmode="decimal"`); live-region results; validation via `aria-describedby`; "not achievable" conveyed in text, not colour alone.

**Ads:** Optional slot below results/example; never between inputs and Calculate.

**Internal links:** related guides (CGPA guide for grade context), other tools.

**To supply/verify:** Confirm the assumptions model matches what you want (D-note); math re-checked at build.

---

## PAGE 7 — Percentage Calculator `/tools/percentage-calculator`

**Objective:** Fast, unambiguous percentage maths via clearly-labelled modes — never unrelated inputs crammed into one form.

**Section order:** Header → Breadcrumb → Intro → Mode selector → Mode inputs/result → Explanation → Example → Related → Footer.

**Modes (segmented control, one active at a time):**
1. **Percent of a number** — inputs: percentage, number → result = (pct/100)×number.
2. **X is what percent of Y** — inputs: part, whole → result = (part/whole)×100 (guard whole = 0).
3. **Percentage increase/decrease** — inputs: original, new → result = ((new−original)/original)×100, labelled increase/decrease (guard original = 0).

**Wireframe (mobile)**
```
[Header][Breadcrumb][H1 + short intro]
[Segmented: % of a number | X % of Y | Increase/Decrease]
[Mode inputs (change per mode)]
[ (Calculate) (Reset) ]
[Result panel: value + restated sentence]
[Short explanation of the current mode]
[Example for the current mode]
[Related tools][Footer]
```

**Per mode, specify:** required inputs, validation (numeric; **division-by-zero guarded** with a clear message: "Can't divide by zero — enter a value above 0 for [Y / original]."), Calculate action, result display (value **and** a restated sentence, e.g. "15% of 240 = 36"), short explanation, and one example. Reset clears the current mode.

**Examples (verifiable):**
- % of a number: "15% of 240 = **36**."
- X % of Y: "45 is **25%** of 180."
- Increase/decrease: "From 50 to 65 is a **30% increase**." (From 80 to 60 is a **25% decrease**.)

**States (per mode):** initial, invalid (incl. ÷0), success, reset. Switching modes clears inputs and result and keeps the chosen mode's labels.

**Responsive:** Inputs stack on mobile; segmented control wraps to full-width buttons if needed; result panel full width.

**Accessibility:** Segmented control is a labelled tablist/radiogroup announcing the active mode; inputs labelled per mode; result in a live region; keep intro/explanation short so the page doesn't bloat.

**Ads:** Optional single slot below the example; not between inputs and Calculate.

**Internal links:** other tools (e.g. "Need grades instead? CGPA Calculator").

**To supply/verify:** none beyond copy.
