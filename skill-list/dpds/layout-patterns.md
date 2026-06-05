# What this covers

Two layout workflows: turning a wireframe into an exact grid (L5), and the KPI-card composition fallback when no catalog widget matches (W6). Plus worked examples. All UI is composed by importing primitives from `@dpds-gov/design-system` — there is no plan file and no per-component install.

---

## Wireframe → exact grid structure (L5)

When the user attaches a wireframe, do **not** approximate. Read it as a grid spec and reproduce it with `col-span-*` / `row-span-*`.

### Step 1 — Count the column grid

Count the equal-width columns the widest row implies (max 4 per L1).

| Widest row | Grid |
|---|---|
| 4 equal tiles | `grid-cols-4` |
| 3 equal tiles | `grid-cols-3` |
| 2 equal tiles | `grid-cols-2` |
| 1 wide + 1 sidebar | `grid-cols-3` (wide takes `col-span-2`) |
| 1 full-width banner | `grid-cols-1` or `col-span-full` |

### Step 2 — Identify spans

- Width N columns → `col-span-N`. Height N rows → `row-span-N`. Full width → `col-span-full`. 1×1 → no class.

### Step 3 — Emit the grid

```tsx
{/* 3-col: left KPI banner (2 cols), right tile (1 col, 2 rows tall),
    row 2: two cards (1 col each) */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <div className="lg:col-span-2"><CardWidget>…</CardWidget></div>
  <div className="lg:row-span-2"><CardWidget className="h-full">…</CardWidget></div>
  <div><CardWidget>…</CardWidget></div>
</div>
```

### Step 4 — Mobile collapse

Spans apply only at the breakpoint where the full grid activates:

```tsx
<div className="lg:col-span-2 lg:row-span-2">   // GOOD — spans at lg only
<div className="col-span-2 row-span-2">         // BAD — breaks mobile
```

### Step 5 — Row-span height

`row-span-N` needs siblings filling the same rows; add `h-full` to the widget inside a tall cell.

> **DS quirk (≤0.1.2)**: responsive grid-column utilities can be overridden by the DS base CSS. Add `!` to responsive column utilities — `lg:grid-cols-4!`, `md:grid-cols-2!`, `lg:col-span-2!`. Mobile-first (non-prefixed) utilities don't need it. See `ds-quirks.md`.

> **Hard rule**: a wireframe is a grid contract. Reproduce asymmetry; don't flatten to equal tiles.

---

## KPI row — snap slider (W7 / R5)

A KPI strip is **always** a horizontal scroll-snap slider: **4 cards per view on desktop**, **~1.3 cards on mobile** (one full + a peek of the next, so the swipe affordance is obvious). Use CSS scroll-snap — **no carousel/swiper library** (F4), no arbitrary widths (F3).

```tsx
{/* Mobile: snap slider, ~1.3 cards (basis-3/4 = 75% → 1 full + 25% peek).
    lg+: 4-up grid, overflow reset. */}
<div
  className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4
             lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4! lg:overflow-visible"
>
  {kpis.map((kpi, i) => (
    <FadeIn key={kpi.id} index={i} stagger={0.06} from="up"
            className="snap-start shrink-0 basis-3/4 sm:basis-1/2 lg:basis-auto">
      <CardWidget className="h-full">
        <CardWidgetHeader>
          <CardWidgetIcon><kpi.Icon className="size-6 text-primary-600" aria-hidden="true" /></CardWidgetIcon>
          <CardWidgetTitle>{kpi.title}</CardWidgetTitle>
        </CardWidgetHeader>
        <CardWidgetContent>
          <p className="font-mono font-bold text-3xl text-sub-title tabular-nums">{kpi.value}</p>
        </CardWidgetContent>
      </CardWidget>
    </FadeIn>
  ))}
</div>
```

The KPI cards cascade in: each `FadeIn` gets `index={i}` + a shared `stagger={0.06}`, so card *i* delays by `i * 0.06s` (M2). `FadeIn` replaces the slide wrapper `<div>` — it carries the same slider classes and adds the staggered entrance.

How it works:
- **`basis-3/4`** → each card is 75% of the viewport on mobile = 1 full card + ~25% peek ≈ **1.3 cards**. `sm:basis-1/2` widens to ~2-up on small tablets.
- **`lg:basis-auto` + `lg:grid lg:grid-cols-4!`** → 4 equal columns on desktop (the `!` defeats the DS base-CSS override, see `ds-quirks.md`); `lg:overflow-visible` drops the scroll.
- **`snap-x snap-mandatory` + `snap-start`** → each card snaps into place when swiped.
- **`-mx-4 px-4`** → lets the first/last card bleed to the screen edge on mobile while keeping the peek; reset at `lg`.
- `shrink-0` stops flex from compressing the cards. `h-full` keeps cards equal height.

> RTL: scroll-snap follows `dir` automatically — no extra work. Keep gap on the logical `gap-*` (not directional margins).

---

## Staggered entrance for any collection (M2)

Wrap each item of a grid/list in `FadeIn` with `index={i}` and a shared `stagger`. The items cascade in order instead of popping in together. Works for card grids, lists, profile grids, dashboard sections.

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3! gap-4">
  {items.map((item, i) => (
    <FadeIn key={item.id} index={i} stagger={0.08} from="up" duration={0.5}>
      <Card>…</Card>
    </FadeIn>
  ))}
</div>
```

- `index={i}` + `stagger` → delay `i * stagger`; tighten `stagger` (0.05–0.08) and `duration` (~0.4–0.5) for dense lists, looser for hero sections.
- `FadeIn` is viewport-triggered (`once` by default) — items animate when scrolled into view.
- Use the DS `FadeIn` / `AnimatedList`, never hand-rolled inline-style transitions (M1, M5, F2). No new animation library.

---

## KPI card not in catalog — composition fallback (W6)

When a screenshot/PRD shows a KPI design with no direct catalog match, use this ladder — **never hand-roll a card surface, never invent a component**.

### Step 1 — Check the catalog (`component-catalog.md`)

| Catalog widget | Use when |
|---|---|
| `StatTile` | Single metric, compact, no chart |
| `StatCard` | Single metric with sparkline/trend |
| `CardWidget` | KPI surface needing icon header + glow |

If one fits (even approximately), use it — adjust label/value/icon, not the component.

### Step 2 — Compose inside `CardWidget`

`CardWidget` is the sanctioned custom KPI surface. Build missing designs from its sub-parts + existing primitives:

```tsx
<CardWidget>
  <CardWidgetHeader>
    <CardWidgetIcon><TrendingUp className="size-6 text-primary-600" aria-hidden="true" /></CardWidgetIcon>
    <CardWidgetTitle>Active Cases</CardWidgetTitle>
    <CardWidgetAction><Badge variant="success">+12%</Badge></CardWidgetAction>
  </CardWidgetHeader>
  <CardWidgetContent>
    <p className="font-mono font-bold text-3xl text-sub-title tabular-nums">1,284</p>
    <p className="text-xs text-muted-foreground">vs 1,147 last week</p>
  </CardWidgetContent>
</CardWidget>
```

**Allowed inside `CardWidgetContent`**: `Badge`, `Avatar`, `Progress`, `Separator`, DS charts, lucide icons, typography. **Not allowed**: raw `<div>` card shells, new npm packages, arbitrary Tailwind values.

### Step 3 — Genuine gap

If the design truly needs a new pattern, implement the closest `CardWidget` composition now and flag it for the DS owner (see `missing-components.md`). Don't scaffold a one-off widget file.

```tsx
{/* TODO: DS candidate — "card-kpi-flip" with front/back metric reveal */}
```

---

## Worked examples

### Example 1 — "Station ops dashboard"

PRD: *Top row 4 KPIs; middle officer directory; right announcements + recent requests.*

1. Create `src/services/station-ops/page.tsx`.
2. Top row: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4! gap-4` of `CardWidget` KPIs.
3. Directory: `Card` + `DataTable` (or a profile grid of `Card`s).
4. Right column: `Card` announcements + `DataTable` recent requests in a `lg:grid-cols-3` layout (main `col-span-2`, side `col-span-1`).
5. Wire it: add a `<Route>` in `src/App.tsx`, a `navItems` entry in `src/components/app-sidebar.tsx`, and `sidebar.*` keys in `en.json` + `ar.json`.

### Example 2 — "Resizable analytics view"

PRD: *New `/analytics/workspace` where panels resize.*

1. Create `src/services/analytics-workspace/page.tsx` using `ResizablePanelGroup` + `ResizablePanel` + `ResizableHandle`, with DS charts inside `CardWidget` tiles.
2. Add the route + sidebar entry + EN/AR keys as above.
