# Stage 1 — Design Foundation

The design system every page inherits. Defined once here; page specs reference it rather than redefining values.

---

## 1. Design principles

1. **Usefulness is visible in the first screen.** Above the fold on a phone, a student can tell what the site does and reach a tool.
2. **Mobile-first, not mobile-shrunk.** Layouts are designed for a ~360–414px phone first, then expanded. Desktop never dictates mobile.
3. **One coherent product.** Shared header, footer, type, spacing, buttons, and form patterns across every page. Pages differ in layout to fit purpose, not in visual language.
4. **Content before decoration.** Minimal ornament. No unnecessary animation, heavy gradients, glassmorphism, oversized graphics, excessive rounding, generic AI illustrations, emoji used as interface icons, or fake product screenshots.
5. **Honesty in the interface.** No invented numbers, no fake authority, no deceptive buttons. Results and limitations are stated plainly.
6. **Accessible by default.** Colour is never the only signal; focus is always visible; targets are finger-sized; text reflows and scales.
7. **Works without JavaScript errors blocking core reading.** Content and navigation are readable; tools enhance on top.
8. **Useful with zero ads.** The layout must look finished when no advertisement is present.

---

## 2. Colour system

A restrained palette built for readability and trust, not trend. Primary is a deep, calm blue-green associated with education and reliability; it is used sparingly for actions and emphasis, on mostly neutral pages.

All pairings below are chosen to meet **WCAG 2.1 AA** contrast (≥4.5:1 for normal text, ≥3:1 for large text and UI borders). Contrast must be re-verified in implementation.

### Brand & action
| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#0F6E5C` (deep teal-green) | Primary buttons, active nav, key links, focus accents |
| `--color-primary-hover` | `#0B5A4B` | Primary button hover/active |
| `--color-primary-weak` | `#E3F1ED` | Subtle primary-tinted backgrounds (selected states, info strips) |
| `--color-secondary` | `#1F3A5F` (deep navy) | Secondary emphasis, headings accent, chart/label accents |

### Neutrals (the bulk of the UI)
| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#13171C` | Primary text |
| `--color-ink-muted` | `#4A5560` | Secondary text, helper text, captions |
| `--color-line` | `#D7DCE1` | Borders, dividers, input outlines |
| `--color-surface` | `#FFFFFF` | Cards, inputs, panels |
| `--color-bg` | `#F6F8FA` | Page background |
| `--color-bg-raised` | `#EEF1F4` | Subtle section banding |

### Status (each paired with a non-colour cue — icon + text)
| Token | Value | Use |
|---|---|---|
| `--color-success` | `#1E7D43` | Success text/borders; icon: check |
| `--color-success-weak` | `#E6F4EC` | Success panel background |
| `--color-warning` | `#9A6400` | Warning text/borders; icon: triangle |
| `--color-warning-weak` | `#FBF0DB` | Warning panel background |
| `--color-error` | `#B3261E` | Error text/borders, invalid fields; icon: alert circle |
| `--color-error-weak` | `#FBE9E7` | Error panel background |
| `--color-info` | `#1F3A5F` | Informational notices; icon: info circle |
| `--color-info-weak` | `#E9EEF5` | Info panel background |

**Rules**
- Status is always icon + text + colour, never colour alone.
- Invalid inputs get a red outline **and** an error icon **and** a text message, plus `aria-invalid`.
- Links are distinguishable from body text by colour **and** underline (at least on hover/focus; persistent underline in article body copy).

### Dark mode
Dark mode is **recommended but a later decision**; it is not required for approval. If built, invert surfaces (`--color-bg` → near-`#12161A`, `--color-surface` → `#1B2026`, ink → light) and re-verify every contrast pair. Not designed in detail in this phase.

---

## 3. Typography

System font stack for speed and native feel (no web-font download, better on slow connections):

`font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;`

Base size **16px**; body line-height **1.6**; headings line-height **1.25**. Numerals in results use `font-variant-numeric: tabular-nums` so figures align.

### Type scale (rem; 1rem = 16px)
| Token | Size | Weight | Use |
|---|---|---|---|
| `--fs-display` | 2.0rem (32px) | 700 | Homepage hero H1 |
| `--fs-h1` | 1.625rem (26px) | 700 | Page H1 |
| `--fs-h2` | 1.3rem (≈21px) | 600 | Section headings |
| `--fs-h3` | 1.1rem (≈18px) | 600 | Sub-headings, card titles |
| `--fs-body` | 1.0rem (16px) | 400 | Body text |
| `--fs-small` | 0.875rem (14px) | 400 | Helper text, captions, labels |
| `--fs-micro` | 0.75rem (12px) | 500 | Overlines, tags (use sparingly) |

Mobile reduces only the largest sizes: hero display → 1.75rem, page H1 → 1.4rem. Everything from H3 down stays constant so reading text never shrinks below 16px.

**Readability rules**
- Article/guide and legal body copy capped at **~65–72 characters per line** (`max-width: ~38rem`).
- Never set body copy below 16px. Minimum anywhere is 12px (`--fs-micro`), reserved for non-essential labels.
- Respect the user's browser font-size; layouts use rem and must not break at 200% text zoom.

---

## 4. Spacing scale

4px base unit. Use tokens, not arbitrary values.

| Token | px | Typical use |
|---|---|---|
| `--space-1` | 4 | Icon-to-text gaps |
| `--space-2` | 8 | Tight internal padding |
| `--space-3` | 12 | Input padding, chip padding |
| `--space-4` | 16 | Default gap, card padding (mobile) |
| `--space-5` | 24 | Card padding (desktop), control spacing |
| `--space-6` | 32 | Between sub-sections |
| `--space-8` | 48 | Between major page sections |
| `--space-10` | 64 | Hero vertical padding (desktop) |

Section rhythm: major sections separated by `--space-8` on mobile, up to `--space-10` on desktop. Content container max-width **1120px**, side gutters **16px** (mobile) / **24px** (tablet+).

---

## 5. Borders, radius, elevation

| Token | Value | Use |
|---|---|---|
| `--border-width` | 1px | Standard borders |
| `--border-width-strong` | 2px | Focus ring, selected state, invalid field |
| `--radius-sm` | 6px | Inputs, chips, small buttons |
| `--radius-md` | 10px | Cards, panels, buttons |
| `--radius-lg` | 14px | Large containers (used sparingly) |
| `--shadow-1` | `0 1px 2px rgba(19,23,28,.06)` | Resting cards |
| `--shadow-2` | `0 4px 12px rgba(19,23,28,.10)` | Menus, dialogs, sticky header when scrolled |

Radius is modest and consistent — no pill-everything, no deeply rounded blobs. Elevation is subtle; most separation comes from borders and background banding, not shadows.

---

## 6. Icon direction

- **Line (stroke) icons**, single weight (~1.75px stroke), 24px grid, currentColor so they inherit text colour.
- Functional only: navigation, tool identity, status, add/remove, print, external link, menu/close.
- **No emoji as UI icons.** No multicolour illustrative icon sets. No decorative mascots.
- Each tool gets one simple, distinct line icon reused everywhere it appears (home card, tools directory, tool page header, footer link) for recognition.
- Every icon that conveys meaning has an accessible name; purely decorative icons are `aria-hidden`.

---

## 7. Component inventory

Shared components defined once and reused. Detailed behaviour/states for each are in the relevant sections below and in page specs.

- **Layout:** Header, Footer, Page container, Section band, Breadcrumb (on tool/guide sub-pages), Content+aside layout (guides).
- **Navigation:** Primary nav, Mobile menu (disclosure), Active link indicator, Skip-to-content link, "On this page" table of contents (long articles/legal).
- **Actions:** Button (primary / secondary / tertiary / text), Icon button, Link.
- **Forms:** Text field, Number field, Select, Checkbox, Radio group, Segmented control (calculation-mode / tab selector), Add-row & Remove-row controls, Fieldset + legend, Field label, Helper text, Required indicator, Inline error.
- **Feedback:** Inline notice (info / success / warning / error), Toast-free confirmation (inline, not overlay) , Empty state, Loading/working state, No-results state, Result panel, Confirmation dialog (only where genuinely destructive).
- **Content:** Card, Tool card, Guide card, Stat/result tile, Formula block, Worked-example block, FAQ (accordion), "Related" link list, Important-notice callout, Last-updated stamp.
- **Advertising (future):** Reserved ad container with a visible "Advertisement" label slot — empty and collapsed in this phase (see §10).

---

## 8. Header specification

**Structure (desktop ≥768px), left to right:**
`[Logo + wordmark] ................ [Tools] [Guides] [About] [Contact] ...... [Primary action: Open tools]`

- **Logo/wordmark:** Simple text wordmark "StudentKit" with "Nigeria" in `--color-ink-muted`, preceded by one small line mark. Links to `/`. Optional tagline hidden on mobile, shown only in the footer and homepage hero to avoid header clutter.
- **Primary nav links:** Tools, Guides, About, Contact. Kept to four so mobile stays uncrowded; Privacy/Terms/Disclaimer live in the footer.
- **Primary action (desktop):** A primary button "Open tools" → `/tools`. Optional; the Tools nav link already covers it, so this is a light emphasis, not a duplicate clutter item. May be dropped on review.
- **Active state:** Current section link shown with `--color-primary` text **and** a 2px underline/indicator (colour + shape, not colour alone). `aria-current="page"`.
- **Scroll behaviour:** Header is static by default. If sticky is used, it stays ≤56px tall, gains `--shadow-2` and a solid `--color-surface` background when scrolled, and must never cover more than ~15% of a short viewport. Reduced-motion users get no transition.

**Mobile (<768px):**
- Row: `[Logo] ................ [Menu button ☰]`. Menu button is a 44×44px icon button labelled "Menu" (`aria-expanded`, `aria-controls`).
- Tapping opens a **disclosure panel** (not a full takeover unless needed) listing: Tools, Guides, About, Contact, then a divider, then Privacy, Terms, Disclaimer. Close via an X (44×44) or tapping outside; focus moves into the menu on open and returns to the button on close; Escape closes.
- No horizontal scrolling nav bar; no nested dropdowns on mobile.

**Keyboard/focus:** First focusable element is a **"Skip to main content"** link (visually hidden until focused). All nav items are reachable in logical order with a visible 2px focus ring. Mobile menu is fully operable by keyboard and traps focus only while open.

---

## 9. Footer specification

Consistent on every page. Grouped link columns on desktop; stacked accordion-free columns on mobile (headings then links).

**Columns**
1. **StudentKit Nigeria** — one-sentence brand description (neutral, no claims): *"Practical study tools and guides for Nigerian students."* Plus the tagline.
2. **Tools** — CGPA Calculator, Study Planner, Practice Quiz, Exam Score Planner, Percentage Calculator, All tools.
3. **Guides** — How CGPA is calculated, How to create a study timetable, How to review quiz results, All guides.
4. **Information** — About, Contact, Privacy Policy, Terms of Use, Disclaimer.

**Bottom strip**
- Copyright: `© [YEAR] StudentKit Nigeria.` (year rendered at build/runtime; no fabricated founding year).
- Short line: *"Educational tools. Results are estimates — always verify with your institution."*
- **No invented address, phone, or email.** Where contact detail belongs, use `[PLACEHOLDER — contact detail, to be supplied]` (see D2).

**Responsive:** 4 columns (desktop) → 2 columns (tablet) → 1 column stacked (mobile), in the order above. Nothing essential is hidden on mobile; it only reflows.

---

## 10. Advertising space considerations (future-proofing only)

AdSense is intended **after** the site is built; no ad code, fake ads, or publisher IDs appear now. The design only *reserves sensible, optional locations* so a later phase has somewhere clean to place a unit.

**Reserved slots (all optional, all approval-gated under D5):**
- Homepage: one slot **between** major editorial sections (e.g. after "How it works", before "Guides"). Never inside the hero or the tools grid.
- Tools directory & guides directory: at most one slot below the listing.
- Tool pages: optionally one slot **below the results/educational content**, never between the form and its primary action, never beside answer/calculator controls.
- Guide articles: optionally one in-content slot between two sections, clearly separated.

**Hard rules**
- Every reserved slot carries a visible "Advertisement" label when filled.
- Ads must never resemble nav links, calculator buttons, or quiz answers, and must have clear separation (whitespace + divider) from interactive controls.
- No slot placed where accidental clicks are likely (not adjacent to Submit/Calculate/answer options).
- In this phase every slot is **empty and collapsed to zero height** — it reserves intent in the spec, not blank boxes that make the site look unfinished.
- No overlay/interstitial/pop-up ads. No promise that any placement will be approved.
- The page must be fully usable and visually complete with every ad slot empty.

---

## 11. Responsive breakpoints (recommendations)

Mobile-first; min-width breakpoints.

| Name | Range | Layout intent |
|---|---|---|
| Base (mobile) | 0–599px | Single column; stacked forms; full-width primary buttons; disclosure nav |
| `sm` | 600px | Two-up cards where sensible; larger gutters |
| `md` | 768px | Desktop header nav appears; 2–3 column grids; content+aside for guides |
| `lg` | 1024px | 3-column tool grid; wider result layouts |
| `xl` | 1280px | Container caps at 1120px; extra space becomes margin, not wider text |

Tables and wide results scroll **inside their own container** (`overflow-x:auto`); the page body never scrolls sideways.

---

## 12. Accessibility principles (apply to every page)

- **Semantics:** One `<h1>` per page; headings nested without skipping levels; landmarks (`header`, `nav`, `main`, `footer`); lists for link groups.
- **Keyboard:** Everything operable without a mouse; logical tab order; visible 2px focus ring on all interactives; skip link first.
- **Labels:** Every field has a programmatically associated `<label>` (or `aria-label`). **Placeholder is never the only label.** Required fields marked with text + `*` and `aria-required`.
- **Status & errors:** Conveyed with icon + text + colour; validation messages linked via `aria-describedby`; dynamic results announced via a polite `aria-live` region.
- **Contrast:** AA minimum for text and meaningful UI; verified in build.
- **Touch targets:** Minimum 44×44px with adequate spacing; primary actions full-width on mobile.
- **Motion:** Minimal by default; honour `prefers-reduced-motion` (disable non-essential transitions).
- **Text:** Resizable to 200% without loss of content/function; no text baked into images.
- **Never colour alone** to signal meaning (correct/incorrect, valid/invalid, active/inactive all carry a second cue).
