# Stage 3 (Part D) — System Pages (17–20)

Reusable, honest states for when things go missing, fail, or need to print. **No stack traces, no blame, no private data** shown to users.

---

## PAGE 17 — Custom 404

**Objective:** Help a lost user recover quickly; keep the site feeling intact.

**Wireframe**
```
[Header]
[H1: We couldn't find that page]
[Short line: The page may have moved or the address may be mistyped.]
[Helpful links: Go to homepage • Browse all tools • Browse all guides]
[Footer]
```
**Content:** H1 "We couldn't find that page." Supporting line (neutral, no blame). Three clear links: `/`, `/tools`, `/guides`. Consistent header and footer so navigation stays available.
**States:** shown on any unknown route.
**Responsive:** single column, large tap targets for the links.
**Accessibility:** H1 describes the situation; links descriptive; page still has `<main>` and landmarks.
**Rules honoured:** no technical stack trace; no "you did something wrong" tone.

---

## PAGE 18 — Generic Error States

**Objective:** One consistent pattern for failures, in plain language, always offering a next step. Two scales: **inline** (within a page/tool) and **full-page** (when a whole view can't load).

**Inline error panel** (e.g. in a tool): uses the error notice component — alert icon + heading + plain explanation + an action (Retry / go back / fix input). Example copy:
- **Invalid form inputs:** handled at field level (see tool specs) + a summary: "Please fix the highlighted fields."
- **Calculation failure:** "We couldn't complete that calculation. Check your inputs and try again." + "Try again".
- **Tool unavailable:** "This tool isn't available right now. Please try again later." + link to other tools.
- **Failed action (e.g. form send):** "Your action didn't complete. Please try again." + retry/alternative.
- **Missing content:** "This content isn't available." + link to the relevant directory.

**Full-page error template:** header + `<main>` with H1 "Something went wrong", a plain sentence, a primary "Try again" (reload) and a secondary "Go to homepage", then footer. Never shows raw errors.

**States:** each situation above.
**Responsive:** panels full width on mobile; actions stack.
**Accessibility:** error announced via `role="alert"`/live region; focus moved to the message; icon + text + colour (never colour alone).
**Rules honoured:** no raw implementation errors, no private info, no stack traces.

---

## PAGE 19 — Empty Search / No-Results

**Status: NOT APPLICABLE in the approved scope.**

No site-wide search is included (five tools and three guides are navigable without it — see README assumption 3 and Page 2). Therefore no search system is introduced just to create this page.

**If search is later approved**, this spec applies: a no-results view with (a) a clear "No results for '[term]'." message, (b) suggestions to adjust the query (check spelling, try fewer words), and (c) links to browse all tools and all guides — reusing the empty-state component. Until then, documented as not built.

---

## PAGE 20 — Print-Friendly Results

**Objective:** Let students print a clean result — **a print stylesheet the user triggers**, not a PDF-generation feature or export service.

**Applies to:** CGPA Calculator results, Study Planner timetable, and (optionally) Exam Score Planner results. Triggered by the "Print" control in each result panel (which calls the browser/OS print function).

**Print layout rules (`@media print`):**
- **Remove chrome:** no header, footer, nav, buttons, inputs, ads, or decorative backgrounds in the printed output.
- **Clear result title:** e.g. "StudentKit — CGPA Result" / "StudentKit — Study Timetable" + the date printed `[auto date]`.
- **Show the essentials only:**
  - CGPA: the GPA/CGPA figure, total units, total quality points, and the per-course breakdown table.
  - Study Planner: the day-by-day timetable with times and subjects.
  - Exam planner (optional): target, current weighted total, required remaining score, and the plain-language line.
- **Readable typography:** black text on white, body ~11–12pt, tabular numerals for figures.
- **Page breaks:** avoid breaking a course/day block across pages (`break-inside: avoid`); allow natural breaks between days.
- **No advertisements** in the printed core result.

**States:** print view is a transformed rendering of an existing result; if there is no result yet, the Print control is disabled.
**Accessibility:** printed output keeps logical heading order and real tables (not layout hacks) so it's legible and screen-reader-friendly before printing.
**Rules honoured:** print spec only — **no PDF generation, no export service** in this phase (assumption 4).
**To supply/verify:** confirm which tools get print layouts (CGPA + Study Planner recommended; Exam planner optional).
