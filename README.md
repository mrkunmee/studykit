# StudentKit Nigeria

Free, mobile-first study tools and guides for Nigerian students. Built as a
**static site** — plain HTML, CSS and vanilla JavaScript. No framework, no build
step, no packages, no database, no external APIs. Everything runs in the browser.

## Structure

```
/                         Homepage
/tools, /guides           Directories
/tools/<tool>/            CGPA, study planner, practice quiz, exam planner, percentage
/guides/<guide>/          Three how-to articles
/about /contact           Trust pages
/privacy-policy /terms /disclaimer   Policy pages (drafts — see docs/BUILD-REPORT.md)
/404.html                 Custom not-found page
/assets/css               styles.css (design system) + print.css
/assets/js                main.js (shared layout/helpers) + one script per tool + quiz-data.js
/sitemap.xml /robots.txt  SEO (domain: https://www.studykit.com.ng)
/vercel.json              Static hosting config (clean URLs, headers)
/docs                     UI/UX specification + BUILD-REPORT.md
```

## Deploy (Vercel, static — no build command)

1. Upload this folder to Vercel (Git import or drag-and-drop).
2. Framework preset: **Other / Static**. Build command: **none**. Output dir: project root.
3. Open the preview URL and run live QA.
4. Add the custom domain **studykit.com.ng** in Vercel → Settings → Domains; set the DNS records Vercel shows at your registrar (and let Vercel redirect `www` → apex, or vice-versa, so one host is canonical).
5. Domain is already wired into the site (canonical, Open Graph, `sitemap.xml`, `robots.txt`) as `https://www.studykit.com.ng`.

Full status, QA results, outstanding decisions and the launch checklist are in
[`docs/BUILD-REPORT.md`](docs/BUILD-REPORT.md). The approved UI/UX specification is in
[`docs/`](docs/).

## Before going live / applying to AdSense

Complete the `[PLACEHOLDER]` / `[VERIFY]` / `[LEGAL REVIEW]` items (contact email,
operator identity, dates, Privacy reconciliation, Terms legal review). AdSense code is
**not** included — add it only with your real publisher account after the site is live.
