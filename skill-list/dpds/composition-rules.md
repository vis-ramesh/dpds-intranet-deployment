# What this covers

The mandatory composition rules for building Dubai Police UI with `@dpds-gov/design-system`: layout/grid, widget selection, spacing, color, typography, navigation, states, responsive, accessibility, and the forbidden list. These are design rules — they apply regardless of how you scaffold. See `bad-good-examples.md` for code pairs.

> Adapted for the published-library model: components are **imported** from `@dpds-gov/design-system`, not copied in or scaffolded from a plan file.

---

## Layout & grid
- **L1** — No more than **4 cards per row** at any breakpoint.
- **L2** — Use the gap scale: `gap-3` (dense), `gap-4` (standard), `gap-6` (sections).
- **L3** — Grid for tiled widgets, flex for inline rows. No 12-column grids.
- **L4** — Section spacing between widget groups is `gap-6`.
- **L5** — When the user attaches a wireframe, reproduce the exact grid structure with `col-span-*` / `row-span-*`. Mobile collapses all spans to one column; spans restore at the breakpoint where the full grid activates. See `layout-patterns.md`.

## Widget selection
- **W1** — `CardWidget` for primary dashboard widgets (KPI, chart, analytics).
- **W2** — `Card` for content surfaces (announcements, lists, forms, profiles).
- **W3** — `StatTile` / `StatCard` for single KPI values; never for multi-metric grids.
- **W4** — Match the widget to its intended use (see `component-catalog.md`).
- **W5** — Never compose a card from a raw `<div>` — always `Card` / `CardWidget` / `StatTile`.
- **W6** — If a KPI card in a screenshot/PRD has no direct match, compose inside `CardWidget` with existing primitives. Never hand-roll a card surface. See `layout-patterns.md`.
- **W7** — **KPI rows are a snap slider, 4-up on desktop, 1.3-up on mobile.** Render a KPI strip as a horizontal scroll-snap slider: **4 cards per view** at `lg`+, and **~1.3 cards visible on mobile** (one full card + a peek of the next, so users know to swipe). Use CSS scroll-snap — **no carousel/swiper library** (F4). Mobile card width is `basis-3/4` (75% → 1 full + 25% peek ≈ 1.3); at `lg` switch to a 4-column grid. See the KPI slider pattern in `layout-patterns.md`.

## Spacing
- **S1** — Allowed gap tokens: `gap-3`, `gap-4`, `gap-6`, `gap-8`. No `gap-[Npx]`.
- **S2** — Page main: `p-4 lg:p-6`. Card interior: `p-4` or `p-6`. Compact: `p-3`.
- **S3** — Heading → content `gap-3`; row → row `gap-4`; section → section `gap-6`.

## Color & theming
- **C1** — Semantic tokens only (`bg-card`, `text-muted-foreground`, `text-sub-title`). Never `bg-gray-500` or hex.
- **C2** — Never `hsl(var(--token))` — tokens are OKLCH. Use `bg-primary/10` or `color-mix(in oklch, var(--primary) 15%, transparent)`.
- **C3** — Accent color is set in `src/index.css`; never override per-component. Don't edit `src/index.css`.
- **C4** — Never branch on theme in code — tokens flip automatically on `.dark`.

## Typography
- **T1** — Headings + KPI values + reference IDs use `font-mono font-bold`. Body uses cascade default.
- **T2** — Page h1: `text-3xl md:text-5xl font-bold font-mono`. Section h2: `text-2xl font-mono font-bold text-sub-title`.
- **T3** — One `h1` per page; sections start at `h2`. No skipping levels.
- **T4** — Stacked KPI columns add `tabular-nums`.

## Sidebar & navigation
- **N1** — Sidebar items live in the `navItems` array in `src/components/app-sidebar.tsx` (flat list, no section grouping). Add an entry there.
- **N2** — Every item has a lucide-react icon (`LucideIcon`). No emoji, no inline SVG.
- **N3** — Max 1 level of nesting (`children`). No depth-2.
- **N4** — Active state is owned by `SidebarMenuButton.isActive`, not individual links.
- **N5** — Use an i18n `titleKey`, not raw labels. Add the key to **both** `src/locales/en.json` and `src/locales/ar.json`.
- **N6** — When a screenshot/PRD/prompt describes new sidebar navigation, **rebuild** the `navItems` array — don't append leftovers. Extract every item, map each to a lucide icon, add EN + AR keys, and add a matching `<Route>` in `src/App.tsx`. See `page-workflows.md`.
- **N7** — When a screenshot/PRD shows a different topbar/header, **edit the existing** header (shell `layout.tsx`) and inject page-level controls via the header-action hook. Never create a new header component. See `page-workflows.md`.
- **N8** — **Breadcrumbs go in the shell slot, not the page body.** The shell wraps the app in `BreadcrumbProvider` and renders the trail in the header. A page builds its `<Breadcrumb>` and hands it to `useBreadcrumb(node)` (pass the node directly — the hook owns the mount/unmount effect); it portals into the header slot. Never put the `<Breadcrumb>` in the page's returned JSX. `useBreadcrumbSlot()` is the shell's render side — don't call it from a page. Same pattern for header controls: `useHeaderAction(node)`.
- **N9** — **Wizard/multi-step services: the stepper lives outside the step content.** Render the `Stepper` (or `ProgressTracker`) at page level, above the step surface — not inside the `Card`/`CardWidget`/form that holds the current step. It must persist across steps; the step body swaps beneath it. See `page-workflows.md`.

## States
- **ST1** — Every data widget must render loading, empty, and error states.
- **ST2** — `Skeleton` for widget loading; `Spinner` only for sub-element actions.
- **ST3** — `EmptyState` for the empty pattern, never a custom no-data div.
- **ST4** — Error convention: widget shell + `Badge variant="destructive"` + retry `Button`.

## Responsive
- **R1** — Mobile-first: every grid starts at `grid-cols-1`.
- **R2** — Sidebar swaps to a `Sheet`/drawer below the mobile breakpoint.
- **R3** — No horizontal scrolling except inside explicit scroll containers.
- **R4** — Logical CSS props (`ps-*`/`pe-*`/`ms-*`/`me-*`/`start-*`/`end-*`) so RTL works for free.
- **R5** — KPI rows: mobile is a scroll-snap slider showing ~1.3 cards (`basis-3/4`, `overflow-x-auto snap-x`); at `lg` it becomes a 4-up grid with `overflow` reset. Never stack KPI cards vertically on mobile. See W7 + `layout-patterns.md`.

## Motion & animation
- **M1** — Animate with shipped libraries only: the DS primitives (`FadeIn`, `AnimatedList`/`AnimatedListItem`) or `framer-motion` / `motion` (already dependencies). Never add an animation library (F4).
- **M2** — **Stagger collections on entrance.** KPI rows, card grids, and lists animate in with a staggered `FadeIn`: wrap each item in `<FadeIn index={i} stagger={0.06}>` so they cascade in order rather than appearing at once. `FadeIn`'s final delay is `delay + index * stagger`.
- **M3** — Use motion sparingly and meaningfully: entrance for major sections/collections and real state changes. No gratuitous or looping motion (no `Marquee`/beam unless the design asks for it).
- **M4** — Keep it snappy: default `FadeIn` (~0.8s) suits hero sections; tighten to `duration={0.4}` and `stagger={0.05}`–`0.08` for dense lists/KPI strips. `from="up"` is the default entrance.
- **M5** — Don't hand-roll entrance with inline `style` + transitions (F2). Use `FadeIn`; it's viewport-triggered (`once` by default) and stagger-aware.

## Accessibility
- **A1** — Clickable = focusable. No `onClick` on a bare `<div>`.
- **A2** — Color is never the only signal — pair with icon or text.
- **A3** — Inputs need a `<Label>` (or `aria-label`). Use the `Field` primitive.
- **A4** — Min tap target on mobile 44×44px. Avoid `size="xs"` on mobile-facing actions.
- **A5** — Decorative icons get `aria-hidden="true"`.

## Forbidden
- **F1** — No raw `<div>` card composition.
- **F2** — No inline `style={{…}}` for layout/color. Layout-only dynamic styles are OK with an inline lint-disable reason.
- **F3** — No arbitrary Tailwind values (`w-[317px]`, `gap-[17px]`).
- **F4** — No new npm dependencies — the starter ships every lib you need (react-hook-form, zod, recharts/charts, framer-motion, etc.).
- **F5** — No `console.log` in generated code.
- **F6** — Components are **Radix-based**: use `asChild` for polymorphism (Dialog, Sheet, Drawer, Button…). Do **not** use base-ui's `render` prop — base-ui is being removed.
- **F7** — No `hsl(var(--token))` — tokens are OKLCH.
- **F8** — Never set z-index on overlays — Dialog/Sheet/Drawer/Popover/Tooltip manage their own stacking.
