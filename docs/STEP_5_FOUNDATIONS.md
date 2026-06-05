# Step 5 — Foundations

End-to-end log for the Foundations work. Three phases:

- **Phase 1** — docs helpers + Colors page
- **Phase 2** — remaining 7 foundation pages (Typography, Spacing, Radius, Motion, Elevation, Iconography, Accessibility)
- **Phase 3** — `<UsesTokens>` footer on all 17 migrated component pages

All 8 foundation routes are now real pages — no more `<ComingSoon />` stubs under `/foundations/*`.

---

## Token inventory

What lives in [src/index.css](../src/index.css), and what Phase 2 added.

### Colors

All defined in the `@theme inline {}` block (lines ~8–272) and `:root` / `.dark` (lines ~274–371).

- **Semantic tokens (light + dark):** `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--warning`, `--warning-foreground`, `--border`, `--input`, `--ring`, `--primary-focus-ring`
- **Sidebar tokens (light + dark):** `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`
- **Chart tokens (single mode):** `--chart-primary`, `--chart-primary-light`, `--chart-secondary`, `--chart-secondary-light`, `--chart-tertiary`, `--chart-tertiary-light`, `--chart-quaternary`, `--chart-quaternary-light`, `--chart-quinary`, `--chart-quinary-light` — *not surfaced on the Colors page; will get their own page when Charts is documented.*
- **Palette scales** (16 scales × 12 shades = 192 tokens): gray, slate, sage, blue-gray, primary, secondary, sps, informative, success, warning, error, turquoise, purple, pink, rose, khaki — all in `@theme inline {}`.

### Radius

Already present, surfaced on the Radius page:

- `--radius` (0.625rem base)
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`, `--radius-3xl`, `--radius-4xl` — all derived from `--radius` via `calc()`.

### Motion (added in Phase 2)

Added via a new non-inline `@theme {}` block in `src/index.css`:

- `--duration-instant: 0ms`
- `--duration-fast: 150ms`
- `--duration-normal: 300ms`
- `--duration-slow: 500ms`
- `--duration-slower: 700ms`
- `--ease-custom: cubic-bezier(0.4, 0, 0.2, 1)`
- `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`

Tailwind's default `ease-in / ease-out / ease-in-out / ease-linear` left untouched.

### Elevation (added in Phase 2)

Added to the same non-inline `@theme {}` block:

- Shadows: `--shadow-card`, `--shadow-popover`, `--shadow-modal`, `--shadow-toast`
- Z-index layers: `--z-base` (0), `--z-dropdown` (1000), `--z-sticky` (1020), `--z-fixed` (1030), `--z-modal-backdrop` (1040), `--z-modal` (1050), `--z-popover` (1060), `--z-toast` (1070), `--z-tooltip` (1080)

Tailwind's `shadow-sm / md / lg / xl / 2xl` left untouched (documented as reference only).

### Spacing, Typography, Iconography

**No CSS variables added** — the Mixed-tokens decision was to document Tailwind defaults for these. Spacing rides on Tailwind's `--spacing` base, Typography on the font-family vars + Tailwind's text-* scale, Iconography on Lucide + Tailwind size-* utilities.

---

## Helpers added

All four exported via the barrel at [src/components/docs/index.ts](../src/components/docs/index.ts).

- **`<FoundationPage>`** — wraps each foundation page. Same chrome as `<ComponentPage>` minus the category prop; instead, all foundations get a "Foundation" badge.
- **`<TokenSwatch>`** — single-row token display with a Copy button. Copies `var(--name)` to clipboard. Used in early Colors iteration; replaced by an inline strip pattern after the Tailwind-style redesign, but kept in the barrel for future pages.
- **`<TokenScale>`** — 4-column table (Token / Value / Tailwind / Example) for numeric scales. Used on Spacing (live width bars), Radius (live shape swatches), and Typography (Tailwind mapping table).
- **`<UsesTokens>`** — small caption row above `<RelatedLinks>` that links to consumed foundations. Foundation keys are pre-mapped to labels and hrefs.

---

## Per-page notes

### Colors

- Semantic tokens render light + dark resolved values **side-by-side** via hardcoded oklch strings — `var()` doesn't resolve at runtime because the tokens live in `@theme inline {}` (which only emits compile-time substitutions into utility classes, not runtime `:root` variables).
- Palette scales had the same problem — fix was a literal `PALETTE_VALUES` map mirroring [src/index.css](../src/index.css). Comment in the file explains why and reminds future editors to keep the map in sync.
- Foreground tokens annotated with `pair` + `contrast` chips (AAA / AA / AA Large / Verify). Conservative manual assessment based on oklch lightness — declarative documentation, not live computation. Some surfaces (`primary-foreground` on `primary`, `muted-foreground` on `muted`, `destructive-foreground` on `destructive`, `warning-foreground` on `warning`) land at **AA Large only** — surfaced honestly with amber chips.
- All 8 sidebar tokens included. `--sidebar-accent` is `transparent` in light mode — its foreground gets a `Verify` chip rather than a false-positive AAA.
- Found a quirk: `src/index.css` defines `--color-rose-*` twice — the second block overrides the first with coral/orange hues (43°–60°), not true rose. Page mirrors the resolved values with a comment in `PALETTE_VALUES.rose` flagging this. **Cleanup candidate** — delete the second block in `index.css` if you want true rose.

### Typography

- Documents Dubai (sans, weights 300/400/500/700) and Bukra (mono, weights 300/400/700/900) via inline `style={{ fontFamily, fontWeight }}` so weights render correctly even if a font file is missing.
- Type scale uses Tailwind defaults (`text-xs` through `text-5xl`) mapped to semantic names (Display, H1–H6, Body, Small, Caption). Live rendering — every row is the actual size + line-height it documents.

### Spacing

- 17-step spacing scale rendered via `<TokenScale>` with live width bars (`0`, `0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `4`, `5`, `6`, `8`, `10`, `12`, `16`, `20`, `24`, `32`).
- Container width reference table (`max-w-prose` through `max-w-7xl`) with typical use cases.
- Override snippet points at Tailwind v4's `--spacing` base; one line rescales the entire system.

### Radius

- 9-step scale (none, sm, md, lg, xl, 2xl, 3xl, 4xl, full) with live shape swatches.
- Surfaces the `calc()` relationships from [src/index.css](../src/index.css) — every step derives from `--radius`, so the override snippet just changes the base.
- In-context demo card mixes radii (input md, buttons lg, container 2xl, avatar/badge full) to illustrate the "outer larger than inner" rule.

### Motion

- Each row owns its own hover/focus state via `useState`. Transform is set inline (`translateX(0)` ↔ `translateX(targetPx)`); transition is inline (`transitionProperty` / `transitionDuration` / `transitionTimingFunction`). No Tailwind hover variants in the animation path — that earlier approach allowed Tailwind class precedence to mask per-row timing differences and made all rows look the same.
- Demos use a fixed 180px middle column so duration and easing sections align visually.
- Override snippet includes the `prefers-reduced-motion` `@media` block — the design system does **not** enforce reduced motion automatically; apps must paste this into their stylesheet.

### Elevation

- 4 semantic shadows + 9 z-index layers, both surfaced as real CSS variables and demoed live (semantic shadows render the actual `box-shadow`; Tailwind defaults shown as preview swatches).
- Z-index layers have 10–20 gaps between them — leaves room for slotting in custom layers without renumbering the scale.
- Override snippet includes a `.dark` block example since dark-mode shadows usually need higher alpha to be visible.

### Iconography

- Lucide gallery (8 representative icons), 4 size rows (`size-4` → `size-8`), 3 stroke widths (1.5 / 2 / 2.5), 4 color swatches showing `currentColor` inheritance.
- Common-patterns section: icon-only button (with required `aria-label`), icon + text, decorative `aria-hidden`, leading-icon input — each pattern paired with the snippet to copy.
- **Lottie subsection** — 6 curated animations from `lottieRegistry` (icon-01 → icon-06). Slim auto-playing tiles with lazy-loaded JSON. Callout strip links out to the full `/lottie-icons` search gallery.

### Accessibility

- Prose-heavy, no token swatches. Anatomy is intentionally different from the other 7 token pages.
- 5 rule sections (Keyboard, ARIA, Color contrast, Motion, Touch targets) + Pre-merge checklist (8 items) + Going-deeper external links (WCAG, ARIA APG, axe DevTools, WebAIM, Inclusive Components).
- Rules reference specific tokens and components: `--ring`, Radix Dialog focus trap, Colors page contrast chips, Button size thresholds (xl=48 / xxl=56 meet AAA touch target; xs=32 / sm=36 don't).

---

## Phase 3 — `<UsesTokens>` footers

Applied to all 17 migrated component pages via a Python batch script. Two edits per file: add `UsesTokens` to the `@/components/docs` import (re-sorted alphabetically), insert `<UsesTokens foundations={[...]} />` immediately above `<RelatedLinks>`.

| Page | Foundations consumed |
|---|---|
| Button | colors, radius, spacing, motion, typography |
| Input | colors, radius, spacing, typography |
| Select | colors, radius, spacing, typography, elevation, motion |
| Card | colors, radius, spacing, elevation, typography |
| Tabs | colors, radius, spacing, typography, motion |
| Tooltip | colors, radius, spacing, typography, elevation, motion |
| Toast | colors, radius, spacing, typography, elevation, motion |
| Dialog | colors, radius, spacing, typography, elevation, motion |
| Sidebar | colors, spacing, typography, iconography, radius |
| Form | colors, radius, spacing, typography |
| Table | colors, spacing, typography, radius |
| Textarea | colors, radius, spacing, typography |
| Checkbox | colors, radius, spacing, typography, motion |
| Radio | colors, radius, spacing, typography, motion |
| Datepicker | colors, radius, spacing, typography, elevation, motion |
| Input OTP | colors, radius, spacing, typography |
| File Upload | colors, radius, spacing, typography |

Component pages outside this list (the legacy `forms-page` / `ui-components-page` dispatch routes and the `lottie-icons` / `icons-page` standalone references) are left untouched per the brief — they'll get their footer in Step 7 cleanup.

---

## Verification

- `npx tsc -b` — clean after every phase.
- All 8 foundation routes return HTTP 200.
- Sample component pages (Buttons, Textarea, Tooltip) post-footer all return HTTP 200.
- Colors page override snippet was mentally tested: pasting the snippet into a sample stylesheet would set `:root { --primary: oklch(0.55 0.15 250) }` etc., which cascades into every component via the existing `bg-primary` Tailwind utility. The `@theme inline {}` block doesn't interfere because semantic tokens like `--primary` live in `:root` / `.dark`, not in the inline block.

---

## Open follow-ups (Step 7 territory)

- **Rose palette** — `--color-rose-*` is defined twice in `src/index.css`; the second block overrides with coral/orange. Decide whether to delete the override.
- **Chart tokens** — `--chart-*` exist but aren't surfaced anywhere. Either fold into the Colors page or build a Charts foundation/component page that owns them.
- **`ease-custom-ease`** — Button uses `ease-custom-ease` class but I added `--ease-custom` (no double "ease" suffix). Either rename the var to `--ease-custom-ease`, alias it, or update Button to use `ease-custom` instead.
- **Visual click-through in dark mode** — I haven't visually verified every foundation page in dark mode; a manual sweep is worth it before declaring done.
- **Accessibility automated audit** — run axe on each foundation page; the Color contrast chips are conservative but axe is authoritative.
