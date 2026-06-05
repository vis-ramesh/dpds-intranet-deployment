# Step 7F — Layout Migration

Phase 2 output. Phase 1 discovery in [STEP_7F_DISCOVERY.md](./STEP_7F_DISCOVERY.md).

## Summary

9 layout pages migrated. 6 of 9 needed a new primitive (Container, Grid, Stack, Collapsible, Scroll Area, Resizable); 3 used existing primitives (Aspect Ratio existed, Separator existed, Accordion existed). 2 new Radix deps, 1 new flex-panel dep. Per-page commit cadence matched Steps 6 / 7A / 7B / 7E.

| # | Component | Status | Notes |
|---|---|---|---|
| 1 | Aspect Ratio | ✅ Built primitive + page | **New** [aspect-ratio.tsx](../src/components/ui/aspect-ratio.tsx) — Radix wrapper. New dep: `@radix-ui/react-aspect-ratio`. 6 examples. |
| 2 | Separator | ✅ Page only | base-ui Separator (not Radix) — no `decorative` prop. Removed it from props table; replaced "decorative vs semantic" example with "Inside a card". 6 examples. |
| 3 | Container | ✅ **Built primitive** + page | **New** [container.tsx](../src/components/ui/container.tsx) — polymorphic mx-auto + max-w-screen-* wrapper. CVA sizes sm/md/lg/xl/2xl/full. Typed `Component: any` for polymorphic ref. 6 examples. |
| 4 | Collapsible | ✅ **Built primitive** + page | **New** [collapsible.tsx](../src/components/ui/collapsible.tsx) — three Radix re-exports. New dep: `@radix-ui/react-collapsible`. 6 examples. |
| 5 | Scroll Area | ✅ **Built primitive** + page | **New** [scroll-area.tsx](../src/components/ui/scroll-area.tsx) — Radix wrapper with styled scrollbars. New dep: `@radix-ui/react-scroll-area`. 6 examples. |
| 6 | Grid | ✅ **Built primitive** + page | **New** [grid.tsx](../src/components/ui/grid.tsx) — polymorphic CSS Grid wrapper. CVA cols (1/2/3/4/5/6/12) × gap (0–12). 6 examples. |
| 7 | Stack | ✅ **Built primitive** + page | **New** [stack.tsx](../src/components/ui/stack.tsx) — flex wrapper. Exports Stack + HStack + VStack. `divider` prop interleaves between children via React.Children.toArray + flatMap. 7 examples. |
| 8 | Accordion | ✅ Page only + legacy JSX removed | Page replaces `<UiComponentsPage section="accordion" />` dispatch JSX. 78-line accordion block and 7-line propsTable entry deleted from ui-components-page.tsx. 6 examples including controlled state. |
| 9 | Resizable | ✅ **Built primitive** + page | **New** [resizable.tsx](../src/components/ui/resizable.tsx) — react-resizable-panels wrapper with grip handle. New dep: `react-resizable-panels@^2.1.7` (v4 has different export names — pinned to v2 for the shadcn-standard API). 6 examples. |

**9 per-page commits.** Plus this log + changelog entry as the 10th.

## New primitives shipped this pass

| Primitive | File | Built on | Lines |
|---|---|---|---|
| Aspect Ratio | [aspect-ratio.tsx](../src/components/ui/aspect-ratio.tsx) | **`@radix-ui/react-aspect-ratio`** (new dep) | ~8 |
| Container | [container.tsx](../src/components/ui/container.tsx) | CVA + polymorphic | ~50 |
| Collapsible | [collapsible.tsx](../src/components/ui/collapsible.tsx) | **`@radix-ui/react-collapsible`** (new dep) | ~8 |
| Scroll Area | [scroll-area.tsx](../src/components/ui/scroll-area.tsx) | **`@radix-ui/react-scroll-area`** (new dep) | ~55 |
| Grid | [grid.tsx](../src/components/ui/grid.tsx) | CVA + polymorphic | ~60 |
| Stack | [stack.tsx](../src/components/ui/stack.tsx) | CVA + flex (with divider interleave) | ~105 |
| Resizable | [resizable.tsx](../src/components/ui/resizable.tsx) | **`react-resizable-panels`** (new dep, pinned to v2) | ~55 |

## Dependency additions

```jsonc
{
  "@radix-ui/react-aspect-ratio": "…",
  "@radix-ui/react-collapsible":  "…",
  "@radix-ui/react-scroll-area":  "…",
  "react-resizable-panels":       "^2.1.7"   // ⚠️ pinned — v4 renamed exports
}
```

The Resizable v4 → v2 pin is the only non-obvious one. v4.x rebranded `PanelGroup`/`PanelResizeHandle` to `Group`/`Separator` and renamed `direction` → `orientation`. v2.1.7 keeps the shadcn-standard API and is well-supported.

## Brief-vs-reality notes

### Brief expected 4 primitives to exist; 6 needed building
Phase 1 discovery flagged that the brief intro line — *"Aspect Ratio, Separator, and Accordion are existing primitives; Container, Grid, Stack likely don't exist"* — was partially wrong:

| Primitive | Brief claim | Reality |
|---|---|---|
| Aspect Ratio | existing | **missing** — built it |
| Separator | existing | ✅ exists (base-ui, not Radix) |
| Accordion | existing | ✅ exists (base-ui) |
| Collapsible | not mentioned as missing | **missing** — built it |
| Scroll Area | not mentioned as missing | **missing** — built it |
| Container / Grid / Stack | "likely missing" | ✅ missing, built all 3 |
| Resizable | not mentioned as missing | **missing** — built it |

Flagged in [STEP_7F_DISCOVERY.md](./STEP_7F_DISCOVERY.md) two-column table before Phase 2 started; user confirmed "Build all 7 this pass" answer.

### Container polymorphic ref typing
React's `forwardRef` collides with `as: React.ElementType` — TypeScript narrows `Component`'s prop set to the intersection of all possible ElementTypes (empty). The standard escape hatch is `Component: any` with an eslint-disable comment, which is what we used in [container.tsx](../src/components/ui/container.tsx#L34) and [grid.tsx](../src/components/ui/grid.tsx#L47). Same pattern shadcn uses for its polymorphic primitives.

### Separator `decorative` prop doesn't exist
Initial draft of separator-page.tsx documented `<Separator decorative={false} />` assuming the Radix API. The codebase uses **base-ui** Separator (per [separator.tsx](../src/components/ui/separator.tsx)), which doesn't expose that prop. Fixed: dropped the prop from the props table, replaced the "decorative vs semantic" example with "Inside a card", and renamed the a11y items key from `decorative` to `role`.

### Stack divider with React.Children
The `divider` prop interleaves an element between children. Implementation uses `React.Children.toArray(children).filter(isValidElement).flatMap((child, i, arr) => i < arr.length - 1 ? [child, cloneElement(divider, { key })] : [child])`. Filtering with `isValidElement` is necessary because text children can't accept React keys.

## i18n additions

Nine new namespaces under `docs.*` in [src/locales/en.json](../src/locales/en.json):

- `docs.aspectRatio.*`
- `docs.separator.*`
- `docs.container.*`
- `docs.collapsible.*`
- `docs.scrollArea.*`
- `docs.grid.*`
- `docs.stack.*`
- `docs.accordion.*`
- `docs.resizable.*`

All follow the canonical `docs.<component>.{title, description, category, preview, installation, usage, examples, props, accessibility, related}` shape from [STEP_3_TEMPLATE.md](./STEP_3_TEMPLATE.md).

## Routes — final state of all 9 candidates

```
/ui/aspect-ratio   → AspectRatioPage   (new this pass)
/ui/separator      → SeparatorPage     (new this pass)
/ui/container      → ContainerPage     (new this pass)
/ui/collapsible    → CollapsiblePage   (new this pass)
/ui/scroll-area    → ScrollAreaPage    (new this pass)
/ui/grid           → GridPage          (new this pass)
/ui/stack          → StackPage         (new this pass)
/ui/accordion      → AccordionPage     (new this pass, replaces UiComponentsPage dispatch)
/ui/resizable      → ResizablePage     (new this pass)
```

All confirmed `curl -s -o /dev/null -w "%{http_code}"` → 200 after each commit.

## Legacy code removed

One `<UiComponentsPage section="accordion" />` JSX block (78 lines) and its accompanying `accordionProps: PropRow[]` table (7 lines) removed from [ui-components-page.tsx](../src/pages/ui-components-page.tsx). Unused `Accordion*` imports and the `"accordion"` union member of `UiSection` also dropped. Net delta: −91 lines in that file, 0 broken references (grep clean).

## Dead-code debt to flag for future housekeeping

Earlier Step 7E flagged three orphaned section blocks (`alert` / `drawer` / `progress-bar`). Step 7F removes one more (`accordion`). Remaining sections still served by the dispatch:

```
toast | tabs | modal-popups | side-drawers | table | dropdown-menu | progress-bar
| alert | profile-switcher | swiper | drawer | progress-tracker
```

Of these, `progress-bar`, `alert`, and `drawer` are now unreachable (routes go to dedicated pages); `swiper` and `profile-switcher` are still in-use (no dedicated pages yet); the rest are reachable through routes or sidebar entries that weren't part of any Step migration. Defer to a future housekeeping pass.

## Files changed (summary)

```
9 pages       → src/pages/{aspect-ratio,separator,container,collapsible,scroll-area,grid,stack,accordion,resizable}-page.tsx
7 primitives  → src/components/ui/{aspect-ratio,container,collapsible,scroll-area,grid,stack,resizable}.tsx
1 router      → src/App.tsx (9 route swaps + 9 imports)
1 dispatch    → src/pages/ui-components-page.tsx (Accordion block removed)
1 i18n        → src/locales/en.json (9 new namespaces)
1 package     → package.json + lock (4 new deps)
```

Step 7F closes the Layout category. 9 routes that were stubs are now full 8-section docs pages with CRM-flavoured examples.
