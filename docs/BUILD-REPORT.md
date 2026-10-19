# StudentKit Nigeria — Build Report

**Build type:** Static multi-page website (hand-written HTML + CSS + vanilla JS). No framework, no packages, no database, no external APIs, no CLI build step — fully compatible with the approved restrictions and with zero-config Vercel static hosting.
**Date:** 2026-10-18.

> **Honesty note on QA:** This machine cannot run a local dev server for this project (CLI is disallowed, and the environment blocks local previews under `~/Documents`). So interactive QA below is reported as **verified by code inspection** and **verified by independent hand-calculation**, not by live browser testing. Live visual/interaction QA should be run on the first Vercel **preview** deployment (Deployment report, §7). Each item states exactly how it was checked.

---

## 1. Page completion report

| # | Route | File | Status |
|---|---|---|---|
| 1 | `/` | `index.html` | Implemented |
| 2 | `/tools` | `tools/index.html` | Implemented |
| 3 | `/guides` | `guides/index.html` | Implemented |
| 4 | `/tools/cgpa-calculator` | `tools/cgpa-calculator/index.html` | Implemented + functional |
| 5 | `/tools/study-planner` | `tools/study-planner/index.html` | Implemented + functional |
| 6 | `/tools/practice-quiz` | `tools/practice-quiz/index.html` | Implemented + functional |
| 7 | `/tools/exam-score-planner` | `tools/exam-score-planner/index.html` | Implemented + functional |
| 8 | `/tools/percentage-calculator` | `tools/percentage-calculator/index.html` | Implemented + functional |
| 9 | `/guides/how-cgpa-is-calculated` | guide | Implemented |
| 10 | `/guides/how-to-create-a-study-timetable` | guide | Implemented |
| 11 | `/guides/how-to-review-practice-quiz-results` | guide | Implemented |
| 12 | `/about` | `about/index.html` | Implemented (operator identity = placeholder, D6) |
| 13 | `/contact` | `contact/index.html` | Implemented (email pending, D2) |
| 14 | `/privacy-policy` | `privacy-policy/index.html` | Implemented (draft, [VERIFY] flags) |
| 15 | `/terms` | `terms/index.html` | Implemented (draft, legal review) |
| 16 | `/disclaimer` | `disclaimer/index.html` | Implemented |
| 17 | 404 | `404.html` | Implemented (Vercel serves it on unknown routes) |
| — | No-results | — | **Not applicable** — no site-wide search in scope |
| — | Print layouts | `assets/css/print.css` | Implemented for CGPA result + Study Planner timetable |

Shared: `assets/css/styles.css` (design system), `assets/css/print.css`, `assets/js/main.js` (header/footer/nav/canonical/helpers), per-tool scripts, `assets/favicon.svg`, `robots.txt`, `sitemap.xml`, `vercel.json`.

---

## 2. Functional feature report

**CGPA Calculator** — *verified by code inspection + hand-calculation.*
- Scales: 5.0 (A5 B4 C3 D2 E1 F0) and 4.0 (A4 B3 C2 D1 F0), selectable, labelled "not an official standard".
- GPA = Σ(point×units) ÷ Σ(units). Hand-checked: A(3)B(2)C(4)A(1) on 5.0 → 40÷10 = **4.00** ✓.
- Cumulative: prev 40 units @3.50 (=140 QP) + 40 QP/10 units → 180÷50 = **3.60** ✓.
- Validates units >0 and grade chosen; rejects zero total credits; cumulative requires valid prev units (>0) and prev CGPA (0–scale max). Add/remove rows, reset-with-confirm, device-only localStorage + "Clear saved data", print layout, `aria-live` results.

**Study Planner** — *verified by code inspection + hand-calculation.*
- Deterministic smooth weighted round-robin; weight = priority (High3/Med2/Low1) +1 if exam ≤14 days (documented on-page).
- Slot fit: `n = floor((window+break)/(session+break))`. Hand-checked 16:00–20:00, 60-min + 10-min break → 3 sessions (16:00–17:00, 17:10–18:10, 18:20–19:20) ✓; no overlaps, none outside window.
- Handles: ≥1 subject, ≥1 day, end>start; "cannot generate" explains the fix (e.g. window shorter than one session). Regenerate (variation), edit, reset, print, localStorage + clear.

**Practice Quiz** — *verified by code inspection; answer keys hand-checked.*
- Original question bank (`quiz-data.js`): Mathematics (14), English (10), Physics (8). Only subjects/topics/difficulties/counts **with real questions** are offered; max count = available count.
- One-at-a-time questions, radio selection, progress + answered count, Prev/Next, submit with unanswered warning, no double submission, unanswered never scored correct. Results: score/correct/incorrect, full review with explanations, "incorrect only" filter, retry/new quiz. Answers never revealed before submit.
- Transparency: states questions are original and no affiliation with JAMB/WAEC/NECO.

**Exam Score Planner** — *verified by code inspection + hand-calculation.*
- Model documented on-page: components with weight % (sum→100) and mark % (blank = not taken); target overall %.
- required = (target − currentWeighted) ÷ (remainingWeight/100). Hand-checked: CA 30%@80% (=24%) + Exam 70% blank, target 50% → (50−24)/0.70 = **37.1%** ✓.
- Validations: weight 0–100, mark 0–100, target 0–100; weight-sum≠100 warning; "already achieved" (required ≤0), "not achievable" with max reachable (required >100), all-complete final-overall path (no division by zero).

**Percentage Calculator** — *verified by code inspection + hand-calculation.*
- Three separate modes. Hand-checked: 15% of 240 = **36** ✓; 45 of 180 = **25%** ✓; 50→65 = **30% increase** ✓; 80→60 = **25% decrease** ✓.
- Division-by-zero guarded (Y=0; original=0); negatives allowed where mathematically valid; reset per mode; `aria-live` result sentence.

---

## 3. Content report

- **Guides:** three original, substantive articles with TOC, worked/illustrative examples (labelled), common mistakes, FAQ, and a CTA to the matching tool. Math in the CGPA guide matches the calculator.
- **Policy pages:** About (no invented credentials; operator = placeholder), Contact (email pending), Privacy (honest draft with `[VERIFY]` on hosting logs / cookies / analytics / ads), Terms (draft, `[LEGAL REVIEW]` on liability/IP/jurisdiction), Disclaimer (plain-language, explicit no-affiliation + no-guarantee).
- **Information still required from you:** operator/owner name (About, Terms IP); contact email (Contact, Privacy, footer intent); governing law (Terms); publication/effective dates; optional extra quiz content.

---

## 4. SEO report

- **Metadata:** every public page has a unique `<title>`, meta description, and Open Graph tags. One `<h1>` per page; semantic headings; landmarks (`header`/`nav`/`main`/`footer`); descriptive link text.
- **Canonical / og:url:** hard-coded per page to the production domain `https://studykit.com.ng/...` (the runtime script no longer overrides them; it only fills a self-canonical if one is ever missing).
- **Sitemap & robots:** `sitemap.xml` lists all 16 public routes and `robots.txt` references the sitemap — both now use the real domain `https://studykit.com.ng`. Submit the sitemap in Search Console after the domain is connected and serving.
- **404:** `404.html` carries `noindex`; Vercel serves it on unknown routes.
- **Internal linking:** tools ⇄ matching guides, cross-tool links, policy links in footer on every page.
- **Performance:** system font stack (no web-font download), inline SVG icons (no icon library), no third-party scripts, small hand-written CSS/JS, `img{max-width:100%}`, cache headers for `/assets` via `vercel.json`.
- **Structured data (JSON-LD):** intentionally **not** added yet — it needs absolute URLs (domain) and must avoid fabricated authors/ratings. Recommended as a post-domain enhancement (BreadcrumbList / WebSite).
- Not done/claimed: no indexing or ranking is promised; Search Console verification is a manual step (§7).

---

## 5. Accessibility & responsive report

*Verified by code inspection (not by assistive-tech or automated audit on this machine).*
- Skip-to-content link; visible 2px focus rings; 44px minimum touch targets; labelled form controls (placeholder never the only label); required marked with text + `*`; inline errors via `aria-describedby` with icon + text + colour (never colour alone); results in polite `aria-live` regions.
- Mobile-first: single-column layouts, stacked forms, full-width primary buttons on mobile, disclosure nav with focus handling + Escape; wide tables scroll inside their own container (body never scrolls sideways); `prefers-reduced-motion` honoured; text uses rem (scales to 200%).
- **Known gaps to verify/finish (honest):**
  1. **Segmented controls** (percentage modes, CGPA GPA/CGPA switch, exam/quiz) use `role="radio"` buttons that are Tab + Enter/Space operable but do **not** yet implement full arrow-key `radiogroup` navigation — recommended polish.
  2. Colour-contrast pairs meet AA by design intent but should be re-measured on the live build.
  3. Full keyboard/screen-reader pass should be run on the Vercel preview.

---

## 6. AdSense readiness report

**Technical/content readiness present:** original tools + guides, clear navigation, accessible policy pages (Privacy, Terms, Disclaimer) linked in the footer sitewide, accurate product descriptions, no fake testimonials/stats/affiliations, no deceptive buttons, no dead links, no empty pages, usable with zero ads. Reserved ad slots exist but are **empty/collapsed** and never beside controls or answers.

**Must be done before applying (outstanding):**
- Replace the domain placeholder in `sitemap.xml` + `robots.txt`; deploy to the real custom domain; confirm the site is publicly accessible and crawlable.
- Complete all placeholders: operator identity (D6), contact email (D2), Privacy `[VERIFY]` items (reconcile with the live build — hosting logs, cookies, analytics), Terms legal review, dates.
- Add AdSense **only** with your real publisher account details and approval (no invented publisher ID / verification tag is present).

**Not claimed:** no guarantee of approval, no invented timeline, and no minimum page/word/traffic thresholds. Technical readiness ≠ Google's review decision.

---

## 7. Deployment report (Vercel) — manual steps, no CLI executed

The project has **not** been deployed (deploying requires CLI/account actions you must perform). It is deploy-ready as a static site. Suggested path:

1. **Put the project under version control / upload.** Either push this folder to a Git repo (GitHub/GitLab/Bitbucket) or drag-and-drop it in the Vercel dashboard. (If you want me to prepare Git, say so — it needs CLI, which is currently disallowed.)
2. **Create a Vercel project** from the repo/folder. Framework preset: **Other / Static**. Build command: **none**. Output directory: **/** (the project root — these files are the site). `vercel.json` is already included.
3. **First deploy = a preview URL.** Open it and run the live QA (tools, forms, mobile, print) — this is the browser testing that couldn't run locally here.
4. **Custom domain (studykit.com.ng):** add it in Vercel → Project → Settings → Domains, and set the DNS records Vercel shows at your registrar (typically an `A`/`ALIAS` for the apex or a `CNAME`). Pick one canonical host and let Vercel redirect the other (`www` ⇄ apex). I can't change registrar settings for you.
5. **Domain is already wired into the site** — canonical, Open Graph, `sitemap.xml` and `robots.txt` all use `https://studykit.com.ng`. No find-and-replace needed.
6. **Google Search Console (manual):** add the property, verify ownership (DNS or HTML-tag method), submit `sitemap.xml`. Not done/claimed here.

---

## 8. Outstanding decisions / information needed from you

| ID | Needed | Affects |
|---|---|---|
| D2 | Real contact email | Contact page (wire the `mailto:`), Privacy, footer |
| D3 | Confirm 5.0/4.0 grade→point mappings are correct for your audience | CGPA tool + guide |
| D4 | Any additional subjects/questions to include | Practice Quiz breadth |
| D6 | Operator/owner name; governing law; publication dates | About, Terms, Privacy |
| — | Production domain | ✅ resolved — `studykit.com.ng` wired into canonical/OG/sitemap/robots |
| — | Privacy `[VERIFY]` reconciliation after choosing host/analytics/ads | Privacy Policy |
| — | Legal review of Terms liability/IP/jurisdiction | Terms |

---

## 9. Final launch checklist (ordered)

1. Supply D2/D3/D4/D6 content; replace all `[PLACEHOLDER]`/`[VERIFY]`/`[LEGAL REVIEW]` markers.
2. Wire the Contact `mailto:` with the real email.
3. Deploy to Vercel (preview) and run full live QA: every tool's calculations, forms/validation, mobile layouts, print output, keyboard/screen-reader pass, and the segmented-control arrow-key polish.
4. Connect **studykit.com.ng** in Vercel; set DNS at the registrar (domain already wired into the site).
5. Reconcile the Privacy Policy with the live build; complete legal review of Terms; set dates.
6. Confirm the live site is public and crawlable; submit sitemap in Search Console.
7. Only then apply to AdSense with your real account; add ad code per Google's instructions into the reserved slots.
