# Step 7E — Feedback & Overlay Discovery

Phase 1 output. **PAUSE before Phase 2 to confirm.** Same classification rubric as Step 7A, 7B, 7D.

## Method

For each of the 6 components: check whether the docs page file exists, whether it uses `<ComponentPage>` + `<UsesTokens>` + `<RelatedLinks>` + ≥6 `<Section>` blocks, whether the route hits a real page or a stub/dispatch, and whether `docs.<name>.*` keys exist in [src/locales/en.json](../src/locales/en.json). Also note whether the underlying primitive exists in [src/components/ui/](../src/components/ui/).

## Result

| # | Component | Bucket | File | Route element | i18n | Primitive |
|---|---|---|---|---|---|---|
| 1 | Alert | **STUB** | MISSING | `<UiComponentsPage section="alert" />` (legacy dispatch) | MISSING | [alert.tsx](../src/components/ui/alert.tsx) (76 L) |
| 2 | Drawer / Sheet | **STUB** | MISSING | `<UiComponentsPage section="drawer" />` (with Step 2's `/ui/side-drawers → /ui/drawer` redirect already in place) | MISSING | **Two primitives:** [drawer.tsx](../src/components/ui/drawer.tsx) (132 L, vaul) + [sheet.tsx](../src/components/ui/sheet.tsx) (131 L, Radix Dialog) |
| 3 | Popover | **STUB** | MISSING | `<ComingSoon />` | MISSING | [popover.tsx](../src/components/ui/popover.tsx) (70 L, Radix Popover) |
| 4 | Hover Card | **STUB** | MISSING | `<ComingSoon />` | MISSING | **No `src/components/ui/hover-card.tsx`.** `@radix-ui/react-hover-card` not in [package.json](../package.json) |
| 5 | Progress | **STUB** | MISSING | `<UiComponentsPage section="progress-bar" />` at `/ui/progress-bar` (URL preserved per Step 2) | MISSING | [progress.tsx](../src/components/ui/progress.tsx) (23 L, Radix Progress) |
| 6 | Spinner | **STUB** | MISSING | `<ComingSoon />` | MISSING | **No `src/components/ui/spinner.tsx`.** Custom SVG, no dep needed |

**Totals: 0 DONE · 0 PARTIAL · 6 STUB**

## Phase-2 scope flags worth surfacing

### 1. Drawer ≠ Sheet despite the brief's intro line

The brief said *"Drawer and Sheet are the same component — mention this in the page intro."* That's **inaccurate**. They're two distinct primitives:

| | Drawer | Sheet |
|---|---|---|
| Backed by | `vaul` | `@radix-ui/react-dialog` |
| Open / close | Momentum-based with drag-to-dismiss gesture | Snap-open / snap-close, no drag |
| Best for | Mobile bottom sheets, edge panels that "feel native" | Desktop side panels, top/bottom utility panels, no mobile physics needed |
| Animation | Spring-physics with `dismissible` drag handle | CSS animation with overlay fade |

This is the **same situation as Stepper / Progress Tracker** in Step 7D — two distinct primitives, single docs page per Step 2's nav consolidation. The honest intro is "Drawer + Sheet share a docs page; pick Drawer for mobile drag-to-dismiss, Sheet for desktop panels."

**Decision needed:** approve this framing for the docs page, or insist the page treat them as one ("the same component")? The latter would require either deleting one primitive or pretending they're the same — both bad.

### 2. Hover Card — new primitive + new dep

Need to install `@radix-ui/react-hover-card` and build `src/components/ui/hover-card.tsx`. Same pattern as Context Menu in Step 7B (~150 line composition wrapper). Adds one Radix package.

### 3. Spinner — new primitive, no dep

Custom SVG with `animate-spin`. Small primitive (~30 lines). No dependency needed.

### 4. Progress URL is `/ui/progress-bar`

The route is `/ui/progress-bar`, not `/ui/progress`. Per Step 2 the nav label was renamed to "Progress" but the URL was preserved for existing bookmarks. The docs page should live at the existing URL — no new route, just swap the dispatch element.

## Dead-code debt to flag for future housekeeping (don't remove this pass)

When Phase 2 ships, these legacy `<UiComponentsPage section="…" />` JSX blocks in [ui-components-page.tsx](../src/pages/ui-components-page.tsx) become unreachable:
- `section="alert"`
- `section="drawer"`
- `section="progress-bar"`

That'll leave 4 still-routed sections after this pass: `dropdown-menu`, `profile-switcher`, `accordion`, `swiper`. UiComponentsPage stays alive until those four get dedicated docs pages.

## Recommended Phase-2 order (when confirmed)

Smallest → largest, mirroring 7A/7B's pattern:
1. **Spinner** (new tiny primitive + simple page)
2. **Progress** (primitive ready)
3. **Alert** (primitive ready)
4. **Popover** (primitive ready)
5. **Hover Card** (build primitive + add Radix dep + page)
6. **Drawer / Sheet** (largest — single page documenting two primitives with distinct positioning)

Commit per page, matching 7A/7B/6 cadence.

## Open questions for the user

1. **Drawer/Sheet framing** — approve "two distinct primitives sharing a docs page" or insist on "single component"?
2. **Hover Card** — install `@radix-ui/react-hover-card` (Radix is already the convention for popovers/menus), or defer Hover Card to a later step?
3. **Page ordering** — same simplest-first cadence as 7A/7B, or pick a different order?
4. **Cadence** — commit per page (matches 7A/7B/6)?
