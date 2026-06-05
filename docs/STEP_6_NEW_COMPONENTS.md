# Step 6 — Five new components

Five net-new primitives + docs pages, built in dependency order and committed per-component so any later breakage doesn't take down earlier work.

| # | Component | Route | Primitive | Docs page |
|---|---|---|---|---|
| 1 | Tag | `/ui/tag` | [tag.tsx](../src/components/ui/tag.tsx) | [tag-page.tsx](../src/pages/tag-page.tsx) |
| 2 | Banner | `/ui/banner` | [banner.tsx](../src/components/ui/banner.tsx) | [banner-page.tsx](../src/pages/banner-page.tsx) |
| 3 | EmptyState | `/ui/empty-state` | [empty-state.tsx](../src/components/ui/empty-state.tsx) | [empty-state-page.tsx](../src/pages/empty-state-page.tsx) |
| 4 | List | `/ui/list` | [list.tsx](../src/components/ui/list.tsx) | [list-page.tsx](../src/pages/list-page.tsx) |
| 5 | StatTile | `/ui/stat` | [stat-tile.tsx](../src/components/ui/stat-tile.tsx) | [stat-tile-page.tsx](../src/pages/stat-tile-page.tsx) |

Each docs page follows the 8-section template from [STEP_3_TEMPLATE.md](./STEP_3_TEMPLATE.md), pulls strings from `src/locales/en.json` under `docs.<name>.*`, and ends with `<UsesTokens>` + `<RelatedLinks>`.

All `<ComingSoon />` stubs for these 5 routes have been replaced in [src/App.tsx](../src/App.tsx).

---

## 1. Tag

**API chosen:**
```tsx
<Tag
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive'
  size?: 'sm' | 'md'
  selected?: boolean
  removable?: boolean
  onRemove?: () => void
  icon?: ReactNode
  onClick?: () => void
>
  ...
</Tag>
```

**Design decisions:**
- Built with cva for variant + size. Six color tokens matching the design system's status palette.
- Renders as `<button>` only when `onClick` is set. Otherwise `<span>`. This keeps non-interactive tags out of the tab order.
- `removable` renders a real nested `<button>` for the X — works regardless of parent element. `onRemove` is called and event propagation stopped so the parent's `onClick` doesn't also fire.
- `selected` state uses `data-selected="true"` attribute plus Tailwind `data-[selected=true]:` variants for a stronger background + border in the same color family.
- Pill shape (`rounded-full`), not the Badge's rounded-md — visually distinct.

**Quirks worth flagging:**
- The polymorphic ref needs `ref as never` since `HTMLElement` widens to both `HTMLButtonElement` and `HTMLSpanElement`. Standard React/TS pattern but worth documenting if anyone extends.
- The `Omit<HTMLAttributes<HTMLElement>, "onClick">` is needed because the default `onClick` signature accepts a MouseEvent, but we expose it as `() => void` for simplicity.

---

## 2. Banner

**API chosen:**
```tsx
<Banner
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  description?: ReactNode
  action?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  icon?: ReactNode
/>
```

**Design decisions:**
- Default icon per variant (Info, CheckCircle2, AlertTriangle, XCircle from Lucide). Pass `icon={null}` to suppress.
- Renders with `role="status"` (polite live region). Use Dialog for blocking errors instead of `role="alert"` — banners shouldn't interrupt.
- Action stays inline on desktop (`sm:flex-row`), stacks below description on mobile.
- Dismiss button is a real `<button>` with `aria-label="Dismiss"`.
- Description supports `ReactNode` (not just string) so callers can embed links, code, or formatting.

**Quirks worth flagging:**
- The variant icon override prop accepts `null` to mean "no icon", but `undefined` means "use default". The conditional in render handles both via `icon === undefined`.
- Dark-mode `bg-{tone}-500/10` is subtle; if a banner needs more emphasis in dark mode, override `className` on a case-by-case basis.

---

## 3. EmptyState (and EmptyStateHero rename)

**Rename:** The pre-existing `src/components/ui/empty-state.tsx` (a Lottie/decor splash with orbiting circles, 40px display title, used by `upcoming-appointments` and `services-listing-page`) was renamed to `empty-state-hero.tsx` and now exports `EmptyStateHero`. Two import sites updated. The legacy API is unchanged.

**API chosen (new compact EmptyState):**
```tsx
<EmptyState
  variant?: 'no-results' | 'no-data' | 'error' | 'permission'
  icon?: ReactNode
  title: string
  description?: ReactNode
  action?: ReactNode
  secondaryAction?: ReactNode
/>
```

**Design decisions:**
- Default icon + tint per variant: SearchX/gray for `no-results`, Inbox/primary for `no-data`, AlertTriangle/error for `error`, Lock/warning for `permission`. Tint communicates tone without needing a separate `tone` prop.
- Vertical centered layout, max-w-md for description so prose doesn't sprawl.
- `action` + `secondaryAction` render side-by-side on desktop, stack on mobile.
- `<h3>` for the title — fits inside section-level layouts which usually own the h2.

**Quirks worth flagging:**
- Two empty-state primitives now coexist. Docs page (accessibility section) explicitly tells consumers when to reach for each: compact for inline, hero for full-page splashes.
- The legacy hero version still uses `EmptyState` as its variable name in `upcoming-appointments.tsx` and `services-listing-page.tsx` JSX — only the import + JSX tag was renamed via sed. That's correct and intentional; flagging in case a future Step 7 cleanup audits the rename for completeness.

---

## 4. List

**API chosen (dot-notation composition):**
```tsx
<List density?: 'dense' | 'comfortable' divided?: boolean>
  <List.Item interactive? onClick?>
    <List.Leading>...</List.Leading>
    <List.Content>
      <List.Title>...</List.Title>
      <List.Description>...</List.Description>
    </List.Content>
    <List.Trailing>...</List.Trailing>
  </List.Item>
</List>
```

**Design decisions:**
- Density (root prop) is propagated via React context — `List.Item` reads it and applies the appropriate padding. Adding density per-item would invite inconsistency.
- `divided` (root prop) toggles `border-b` on every item via the same context.
- `interactive` (item prop) adds hover bg, focus ring, role="button", tabIndex={0}, and Enter/Space activation. Crucially, `List.Item` is **not** rendered as `<button>` — it stays as `<li>` so consumers can place real `<button>` elements in the trailing slot without invalid nested buttons.
- Native `<ul>` / `<li>` semantics preserved. Screen readers announce "list, N items" automatically.
- Both dot-notation (`List.Item`) and named (`ListItem`) imports work. The dot-notation is the canonical API; named exports are there for tree-shaking edge cases.

**Quirks worth flagging:**
- `List.Title` and `List.Description` truncate at one line (`truncate` class). If content needs to wrap, override via `className="whitespace-normal"`. Documented in the a11y section.
- The `onKeyDown` handler casts `KeyboardEvent` to `MouseEvent` when calling `onClick` — practically fine, but a stricter version would expose `onActivate` as a separate prop. Left as a Step 7 candidate if it bites.

---

## 5. StatTile

**API chosen:**
```tsx
<StatTile
  label: string
  value: string | number
  delta?: { value: string | number; direction: 'up' | 'down' | 'neutral'; label?: string }
  deltaTone?: 'positive' | 'negative' | 'neutral'   // overrides direction-based coloring
  icon?: ReactNode
  sparkline?: number[]
  loading?: boolean
  onClick?: () => void
/>
```

**Design decisions:**
- `deltaTone` is the key design choice. Default: `up=positive (green)`, `down=negative (red)`, `neutral=neutral (gray)`. But several CRM metrics invert this (response time *down* is good). Passing `deltaTone="positive"` forces green regardless of direction. This is cleaner than asking consumers to swap colors manually.
- Sparkline is a hand-rolled inline SVG (80×24px) — no Recharts, no third party. Computes min/max from the array, normalizes to viewBox, draws a polyline + 12% area fill. Uses `currentColor` so the parent can tint via `text-*`.
- Loading state renders 4 skeleton placeholders (label, value, delta, sparkline) with `animate-pulse`. Safe under `prefers-reduced-motion` because Tailwind's pulse is an opacity animation only.
- Polymorphic root (`div` vs `button` when `onClick` is set). Adds hover bg + focus ring when interactive.

**Quirks worth flagging:**
- The polymorphic Component spread required a double-typed cast: `{...(props as ComponentPropsWithoutRef<"div"> & ComponentPropsWithoutRef<"button">)}`. TypeScript can't widen `HTMLDivElement` props to `HTMLButtonElement` automatically because of clipboard event handler type narrowing. The cast is contained to one line and the behavior is correct.
- Sparkline data with `length < 2` is silently skipped. No error, no warning. Consumers should pass `sparkline={undefined}` for "no chart" rather than `sparkline={[5]}` and expecting nothing — but the silent skip means a single-point array doesn't crash.
- The `deltaTone="positive"` override paints green even when the description text says "Backlog −18%". The component trusts you — color is a signal, but the label is the ground truth. The a11y section documents this explicitly.

---

## What's deferred (Step 7 candidates)

- **Polish pass on Banner dark mode** — the `bg-{tone}-500/10` is subtle; some app surfaces (already-tinted backgrounds) need a stronger banner. Add a `tone="emphasized"` variant if it comes up.
- **List per-item density override** — currently density is root-only. If a heterogeneous list needs one comfortable row in a dense list (e.g. a "load more" footer), it'll need a className override. Document the pattern or add an explicit prop.
- **StatTile `loading` skeleton color tuning** — uses `bg-gray-200` / `dark:bg-white/10`. On colored cards this can look slightly off. Consider a CSS variable or a context-aware tone if Step 7 surfaces a need.
- **Sparkline interactivity** — current sparkline is purely visual. A future enhancement could add hover tooltips showing point values. Out of scope for Step 6; mention in Step 7 if needed.

---

## Verification log

- `npx tsc -b` clean after each component commit.
- All 5 routes return HTTP 200:
  - `/ui/tag` ✓
  - `/ui/banner` ✓
  - `/ui/empty-state` ✓
  - `/ui/list` ✓
  - `/ui/stat` ✓
- Each docs page renders the full 8-section anatomy.
- `<UsesTokens>` footer added to all 5 — links resolve to live foundation pages.
- 5 commits, one per component:
  1. `Add Tag component + docs page (Step 6 #1)`
  2. `Add Banner component + docs page (Step 6 #2)`
  3. `Rename legacy EmptyState → EmptyStateHero, add new compact EmptyState (Step 6 #3)`
  4. `Add List component + docs page (Step 6 #4)`
  5. `Add StatTile component + docs page (Step 6 #5)`

**Manual checks still pending** (user-side, can't automate):
- Visual dark-mode pass on each preview block — especially StatTile sparklines (they use `text-primary-500 / dark:text-primary-300` and should adapt).
- Copy-button on at least one CodeBlock per page.
- Confirm `<ComingSoon />` no longer renders for any of these 5 routes.
