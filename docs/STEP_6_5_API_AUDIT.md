# Step 6.5 — API Audit

Focused conformance check of the 5 Step 6 primitives against the brief's spec. **Zero drift found** — every required prop is present with the correct shape across all 5 components. No fixes applied; no docs pages or i18n strings touched.

## Method

For each primitive: enumerate spec props (type + behavior), match to the actual `export interface ...Props`, verify behavior in the render body. "Extra surface" is anything the primitive exposes that's not in the spec — flagged when it widens the API beyond what was asked for, but not removed.

`npx tsc -b` — clean before and after the audit.

---

## 1. Tag — [src/components/ui/tag.tsx](../src/components/ui/tag.tsx)

| Spec prop | Status | Notes |
|---|---|---|
| `variant: 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'destructive'` | ✅ | All 6 in `cva` block (lines 11–23) |
| `size: 'sm' \| 'md'` | ✅ | cva block (lines 25–28); defaultVariants `md` |
| `selected: boolean` | ✅ | Applied via `data-selected="true"` + `data-[selected=true]:` Tailwind variants (line 76) |
| `removable: boolean` | ✅ | Conditional X button (line 91) |
| `onRemove: () => void` | ✅ | Fired from X-button `onClick` with `e.stopPropagation()` (lines 95–98) |
| `icon: ReactNode` | ✅ | Leading slot (lines 85–89), `[&_svg]:size-3.5` for consistent Lucide sizing |
| `onClick: () => void` | ✅ | When set, root renders as `<button>` (line 69); otherwise `<span>` — keeps non-interactive tags out of tab order |

**Required behavior — X button stops propagation and calls onRemove:** ✅ Verified at lines 95–98.

**Extra surface beyond spec:**
- Extends `Omit<HTMLAttributes<HTMLElement>, "onClick">` — `className`, `id`, `aria-*`, etc. work via spread. Standard React idiom.
- Exports `tagVariants` (the cva instance) alongside the component. Useful for composition; not in spec but harmless.

**Verdict:** ✅ Ships unchanged.

---

## 2. Banner — [src/components/ui/banner.tsx](../src/components/ui/banner.tsx)

| Spec prop | Status | Notes |
|---|---|---|
| `variant: 'info' \| 'success' \| 'warning' \| 'error'` | ✅ | All 4 in cva (lines 12–19); default `info` |
| `title: string` | ✅ | Optional heading (line 46) |
| `description: ReactNode` | ✅ | Rich-content body (line 48) |
| `action: ReactNode` | ✅ | Trailing slot, stacks on mobile (line 107) |
| `dismissible: boolean` | ✅ | Conditional X button (line 112) |
| `onDismiss: () => void` | ✅ | Fires from X-button `onClick` (line 116) |
| `icon: ReactNode (override)` | ✅ | `icon === undefined` → default-per-variant; `null` → no icon (line 75) |
| Default icons per variant (Info / CheckCircle2 / AlertTriangle / XCircle from Lucide) | ✅ | `defaultIconByVariant` map (lines 35–40) |
| Full-width page-level styling, distinct from inline Alert | ✅ | `w-full` (line 8) |

**Extra surface beyond spec:**
- `role="status"` on the root (line 79) — polite live region. Accessibility win; spec didn't ask for it but it's the right default.
- Exports `bannerVariants`. Same rationale as Tag.

**Verdict:** ✅ Ships unchanged.

---

## 3. EmptyState — [src/components/ui/empty-state.tsx](../src/components/ui/empty-state.tsx)

| Spec prop | Status | Notes |
|---|---|---|
| `variant: 'no-results' \| 'no-data' \| 'error' \| 'permission'` | ✅ | `EmptyVariant` type (line 6); default `no-data` |
| `icon: ReactNode` (overrides default-per-variant) | ✅ | `icon === undefined` → default; `null` → no icon (line 51) |
| `title: string` (required) | ✅ | Required in the interface (line 28) — no `?` |
| `description: ReactNode` | ✅ | Optional rich content (line 30) |
| `action: ReactNode` | ✅ | Primary action slot (line 32) |
| `secondaryAction: ReactNode` | ✅ | Renders beside the primary (line 34) |
| Centred vertically + horizontally | ✅ | `items-center justify-center text-center` (line 58) |

**Required behavior — default icon + tint per variant:**
- ✅ `no-results` → `SearchX` (gray)
- ✅ `no-data` → `Inbox` (primary)
- ✅ `error` → `AlertTriangle` (error)
- ✅ `permission` → `Lock` (warning)

**Extra surface beyond spec:**
- Extends `Omit<HTMLAttributes<HTMLDivElement>, "title">` — necessary because `title` overrides the native HTML attribute. Correct shape.
- Note: the *original* `empty-state.tsx` was renamed to `empty-state-hero.tsx` during Step 6 (per the migration log). That rename is unrelated to API conformance; the new compact `EmptyState` is the one this audit covers.

**Verdict:** ✅ Ships unchanged.

---

## 4. List — [src/components/ui/list.tsx](../src/components/ui/list.tsx)

Composition pattern (not array-prop). Spec required dot-notation API.

| Spec member | Status | Notes |
|---|---|---|
| `<List density?: 'dense' \| 'comfortable' divided?: boolean>` | ✅ | Both props in `ListRootProps` (lines 12–17); propagated via React context |
| `<List.Item interactive? onClick?>` | ✅ | `interactive` adds hover bg, focus ring, `role="button"`, `tabIndex={0}` (line 70); Enter/Space activation (lines 49–55) |
| `<List.Leading>` | ✅ | Slot (line 82) |
| `<List.Content>` | ✅ | Slot (line 94) |
| `<List.Trailing>` | ✅ | Slot (line 130) |
| `<List.Title>` | ✅ | Primary text (line 106) |
| `<List.Description>` | ✅ | Secondary text (line 118) |

**Composition mechanism:** ✅ `Object.assign(ListRoot, { Item, Leading, Content, Title, Description, Trailing })` at lines 153–160. Both `List.Item` and the named import `ListItem` work — the named exports cover tree-shaking edge cases.

**Required behavior — `<li>` stays semantic even when interactive:** ✅ `interactive` does NOT swap to `<button>` (line 58 — always `<li>`). This is the right choice; lets consumers place real `<button>` elements in the trailing slot without nested-button HTML errors.

**Extra surface beyond spec:**
- Named exports (`ListItem`, `ListLeading`, …) alongside dot-notation. Documented in the original migration log as intentional.
- One quirk flagged in the original log: `onKeyDown` casts `KeyboardEvent` to `MouseEvent` when invoking `onClick`. Not an API issue; deferred as a possible Step 7 polish.

**Verdict:** ✅ Ships unchanged.

---

## 5. StatTile — [src/components/ui/stat-tile.tsx](../src/components/ui/stat-tile.tsx)

| Spec prop | Status | Notes |
|---|---|---|
| `label: string` | ✅ | Required (line 23) |
| `value: string \| number` | ✅ | Required (line 24) |
| `delta: { value, direction: 'up'\|'down'\|'neutral', label? }` | ✅ | `StatTileDelta` interface (lines 12–19); optional on the tile (line 25) |
| **`deltaTone: 'positive' \| 'negative' \| 'neutral'` (non-negotiable)** | ✅ | Present (line 30) and **OVERRIDES direction-based coloring** via `resolveTone()` (lines 41–46) — explicit `deltaTone` wins over direction-derived default |
| `icon: ReactNode` | ✅ | Header chip (line 31) |
| `sparkline: number[]` | ✅ | Renders inline SVG (lines 60–99) |
| `loading: boolean` | ✅ | Skeleton placeholders on label / value / delta / sparkline (lines 138, 158, 168–169, 182–183) |
| `onClick: () => void` | ✅ | Polymorphic root (`<div>` ↔ `<button>`), interactive disabled while loading (line 117) |
| Sparkline adapts colors in dark mode | ✅ | `text-primary-500 dark:text-primary-300` on the svg (line 86); uses `currentColor` for stroke + fill |

**Required behavior — `deltaTone` is the key correctness check:** ✅ `resolveTone(direction, override)` short-circuits to the override when set. So a metric like "Avg response time −18%" with `direction: "down"` and `deltaTone: "positive"` paints green, exactly as the spec demands.

**Extra surface beyond spec:**
- `Sparkline` is internal (not exported). Sensible scope.
- `sparkline.length < 2` silently renders nothing instead of throwing. Documented in the original migration log; not an API issue.

**Verdict:** ✅ Ships unchanged.

---

## Summary

| Component | Required props present | Reshaped | Added | Extra surface |
|---|---|---|---|---|
| Tag | 7 / 7 | 0 | 0 | `HTMLAttributes` spread, `tagVariants` export |
| Banner | 7 / 7 + defaults | 0 | 0 | `role="status"`, `bannerVariants` export |
| EmptyState | 6 / 6 + defaults | 0 | 0 | `Omit<…, "title">` for native attribute clash |
| List | 8 composition members | 0 | 0 | Named exports alongside dot-notation |
| StatTile | 9 / 9 (incl. `deltaTone`) | 0 | 0 | Internal `Sparkline`, length-guard |

**Net result:** zero fixes applied. The primitives conform to the brief as written. No docs pages, props tables, or `docs.<name>.*` i18n keys needed touching. `npx tsc -b` clean.

**Manual checks worth running** (out of audit scope; flagged from the original Step 6 verification log):
- Dark-mode visual sweep of StatTile sparkline (already known to use `text-primary-500 / dark:text-primary-300`).
- Confirm `<ComingSoon />` no longer renders for `/ui/tag`, `/ui/banner`, `/ui/empty-state`, `/ui/list`, `/ui/stat`.
- Copy button on one CodeBlock per docs page.
