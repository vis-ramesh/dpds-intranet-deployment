# Step 7B — Data Display + Navigation Discovery

Phase 1 output. **PAUSE before Phase 2 to confirm.** Same classification rubric as Step 7A.

## Method

For each of the 11 components: check if the docs page file exists, whether it uses `<ComponentPage>` + `<UsesTokens>` + `<RelatedLinks>` + ≥6 `<Section>` blocks, whether the route hits a real page or a stub/dispatch, and whether `docs.<name>.*` keys exist in [src/locales/en.json](../src/locales/en.json). Also note whether the underlying primitive exists in [src/components/ui/](../src/components/ui/).

## Result

| # | Component | Bucket | Page file | Route element | i18n | Primitive |
|---|---|---|---|---|---|---|
| 1 | **Data Table** | **STUB** | MISSING | **No route exists** | MISSING | [data-table.tsx](../src/components/ui/data-table.tsx) (370 L) |
| 2 | Badge | STUB | MISSING | `<UiComponentsPage section="badges" />` (legacy dispatch) | MISSING | [badge.tsx](../src/components/ui/badge.tsx) (62 L) |
| 3 | Avatar | STUB | MISSING | `<ComingSoon />` | MISSING | [avatar.tsx](../src/components/ui/avatar.tsx) (96 L) |
| 4 | Skeleton | STUB | MISSING | `<ComingSoon />` | MISSING | [skeleton.tsx](../src/components/ui/skeleton.tsx) (13 L) |
| 5 | Navbar | STUB | MISSING | `<ComingSoon />` | MISSING | **no `src/components/ui/navbar.tsx`** |
| 6 | Breadcrumb | STUB | MISSING | `<UiComponentsPage section="breadcrumb" />` | MISSING | [breadcrumb.tsx](../src/components/ui/breadcrumb.tsx) (125 L) |
| 7 | Pagination | STUB | MISSING | `<ComingSoon />` | MISSING | **no `src/components/ui/pagination.tsx`** |
| 8 | Stepper (absorbs Progress Tracker) | STUB | MISSING | `<UiComponentsPage section="stepper" />` | MISSING | [stepper.tsx](../src/components/ui/stepper.tsx) (111 L). Also [progress-tracker.tsx](../src/components/ui/progress-tracker.tsx) (167 L) — the rename source |
| 9 | Command | STUB | MISSING | `<ComingSoon />` | MISSING | **no `src/components/ui/command.tsx`** (cmdk dep already installed in Step 7A) |
| 10 | Menu (renamed from Navigation Menu) | STUB | MISSING | `<UiComponentsPage section="navigation-menu" />` | MISSING | **[navigation-menu.tsx](../src/components/ui/navigation-menu.tsx) (168 L) is the rename source** — Step 2 said rename it to Menu |
| 11 | Context Menu | STUB | MISSING | `<ComingSoon />` | MISSING | **no `src/components/ui/context-menu.tsx`** |

**Totals: 0 DONE · 0 PARTIAL · 11 STUB**

## Scope flags worth surfacing

### HARD STOP — Data Table
Per the brief: *"if Data Table is STUB or PARTIAL, stop after classifying it in Phase 1 and ask me whether to build it now or defer to a dedicated step."*

Data Table is STUB. The primitive exists ([data-table.tsx](../src/components/ui/data-table.tsx) is 370 lines, built on TanStack Table). But the docs page would be the largest in the library — sortable / filterable / paginated / row-selection / row-actions / row-expansion / empty / loading variants × realistic data. **Decision needed before Phase 2 starts.**

There is also **no `/ui/data-table` route** in [App.tsx](../src/App.tsx) — the existing `/ui/table` route is for the basic Table primitive (already DONE per Step 4). A new route needs to be added.

### Missing primitives (4)
Four components have no primitive in `src/components/ui/`:
- **Navbar** — need to build from scratch
- **Pagination** — need to build (could lean on existing pagination logic inside data-table.tsx)
- **Command** — need to build using cmdk (already a dep from Step 7A's Combobox work — thin wrapper, ~80 lines like shadcn's standard)
- **Context Menu** — need to build using Radix Context Menu (the existing menu primitives use Radix; check whether `@radix-ui/react-context-menu` needs adding)

### Rename / consolidation calls to make
- **Menu** — the existing `navigation-menu.tsx` is the rename source per Step 2. Options: (a) rename the file `navigation-menu.tsx → menu.tsx` and update import sites; (b) leave the file name as-is but expose the API under "Menu" naming on the docs page only; (c) build a thin re-export shim.
- **Stepper vs Progress Tracker** — both primitive files exist. Step 2 absorbed Progress Tracker into Stepper. The `/ui/progress-tracker → /ui/stepper` redirect is already in App.tsx. Question: is `progress-tracker.tsx` (167 L) just dead-code-after-rename, or is it different enough to keep as a separate primitive? Worth a brief look during Phase 2 — flag for Step 7D housekeeping if it's a duplicate.

### Dead legacy dispatch to log for Step 7D
Four routes still use the `<UiComponentsPage section="…" />` pattern:
- `/ui/badges` → `section="badges"`
- `/ui/breadcrumb` → `section="breadcrumb"`
- `/ui/stepper` → `section="stepper"`
- `/ui/navigation-menu` → `section="navigation-menu"`

When Phase 2 swaps these routes to real pages, the section JSX in [ui-components-page.tsx](../src/pages/ui-components-page.tsx) becomes dead code reachable only via direct import. Don't remove this pass — log for Step 7D.

## Recommended Phase-2 order (when confirmed)

If Data Table is approved for this batch:
1. **Badge** (smallest scope; primitive ready)
2. **Avatar** (medium; primitive ready)
3. **Skeleton** (small primitive but page is interesting — full-page loading state demos)
4. **Breadcrumb** (medium; primitive ready)
5. **Pagination** (medium; need to build primitive)
6. **Stepper** (medium; resolve progress-tracker duplication along the way)
7. **Command** (medium; build primitive from cmdk)
8. **Menu** (medium; rename or alias navigation-menu)
9. **Context Menu** (medium; need to build primitive + maybe install Radix Context Menu)
10. **Navbar** (medium-plus; build primitive from scratch)
11. **Data Table** (largest — last, own commit, own review pass)

If Data Table is deferred: same order minus 11. Ship 10 pages in Phase 2 and revisit Data Table in Step 7C or its own dedicated step.

## Open questions for the user

1. **Data Table** — build now (one large commit at end of Phase 2), defer to Step 7C as its own pass, or skip entirely for now?
2. **Menu rename** — keep `navigation-menu.tsx` as the filename, rename it to `menu.tsx` (updating import sites), or ship a thin `menu.tsx` re-export shim that points at the existing file?
3. **Stepper vs Progress Tracker** — are these meaningfully different primitives, or is `progress-tracker.tsx` a candidate for Step 7D deletion?
4. **Context Menu** — `@radix-ui/react-context-menu` isn't visibly in package.json. OK to add as a new dep, or use a different approach?
5. **Cadence** — same as Step 7A (commit per page)?
