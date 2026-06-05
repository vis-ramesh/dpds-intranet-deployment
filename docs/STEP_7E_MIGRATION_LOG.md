# Step 7E — Feedback & Overlay Migration

Phase 2 output. Phase 1 discovery in [STEP_7E_DISCOVERY.md](./STEP_7E_DISCOVERY.md).

## Summary

All 6 candidates were STUB. Phase 2 built 6 pages, 2 new primitives, added 1 dep, and extended the Alert primitive with 3 new variants. Per-page commits matched the Step 6/7A/7B cadence.

| # | Component | Status | Notes |
|---|---|---|---|
| 1 | Spinner | ✅ Built primitive + page | **New** [spinner.tsx](../src/components/ui/spinner.tsx) — custom SVG, no dep. 5 sizes × 5 tones via cva. 8 examples. |
| 2 | Progress | ✅ Page only | Primitive was 23 lines; page demos sizes/tones/segmented/SLA-countdown via className overrides on the inner indicator. 8 examples. |
| 3 | Alert | ✅ **Primitive extended** + page | Added info / success / warning variants to alert.tsx (was default + destructive only). Additive change. 7 examples. |
| 4 | Popover | ✅ Page only | Composition primitive with rich slot helpers already in place. 7 examples. |
| 5 | Hover Card | ✅ **Built primitive** + page | **New** [hover-card.tsx](../src/components/ui/hover-card.tsx) (3 Radix wrappers). New dep: `@radix-ui/react-hover-card`. 5 examples with strong a11y warnings on touch fallback. |
| 6 | Drawer / Sheet | ✅ Single page covering both primitives | Honest framing: Sheet = Radix Dialog (desktop side panels), Drawer = vaul (mobile drag-to-dismiss). Step 2 consolidation closed as nav-level only. 6 examples mix Sheet + Drawer use cases. |

**6 per-page commits.** Plus this log + changelog entry as the 7th.

## New primitives shipped this pass

| Primitive | File | Built on | Lines |
|---|---|---|---|
| Spinner | [spinner.tsx](../src/components/ui/spinner.tsx) | Custom SVG, no dep | ~75 |
| Hover Card | [hover-card.tsx](../src/components/ui/hover-card.tsx) | **`@radix-ui/react-hover-card`** (new dep) | ~30 |

## Primitive extension

[alert.tsx](../src/components/ui/alert.tsx) `alertVariants` extended from 2 to 5 entries: `default`, `info`, `success`, `warning`, `destructive`. Existing `destructive` was restyled to match the new status palette (was monochrome-on-card; now matches the Banner / Toast tinting system).

**Migration impact:** zero. Existing `<Alert>` and `<Alert variant="destructive">` callsites continue to render — the destructive style is bolder now but visually compatible.

## Brief-vs-reality notes

### Drawer ≠ Sheet
Per the brief intro line, *"Drawer and Sheet are the same component."* They aren't — different libraries (vaul vs Radix Dialog), different physics, different best-fits. The docs page intro replaces that line with a two-card explainer pointing each at its right use case. Same playbook as Stepper/Progress Tracker in Step 7D.

### Progress route URL
The route is `/ui/progress-bar`, not `/ui/progress` — preserved per Step 2's nav rename ("Progress" label, original URL). The page lives at the existing URL.

## i18n additions

Six new namespaces under `docs.*` in [src/locales/en.json](../src/locales/en.json):

- `docs.spinner.*` — 10 top-level keys
- `docs.progress.*` — 10 top-level keys
- `docs.alert.*` — 10 top-level keys
- `docs.popover.*` — 10 top-level keys
- `docs.hoverCard.*` — 10 top-level keys
- `docs.drawer.*` — 11 top-level keys (extra `intro` block for the two-primitives framing)

All follow the canonical `docs.<component>.{title, description, category, preview, installation, usage, examples, props, accessibility, related}` shape from [STEP_3_TEMPLATE.md](./STEP_3_TEMPLATE.md).

## Routes — final state of all 6 candidates + neighbours

```
/ui/alert            → AlertPage          (new this pass)
/ui/drawer           → DrawerSheetPage    (new this pass)
/ui/side-drawers     → Navigate /ui/drawer (Step 2 redirect, untouched)
/ui/popover          → PopoverPage        (new this pass)
/ui/hover-card       → HoverCardPage      (new this pass)
/ui/progress-bar     → ProgressPage       (new this pass)
/ui/spinner          → SpinnerPage        (new this pass)
```

**Already shipped (regression-checked, still 200):**
```
/ui/banner           → BannerPage         (Step 6)
/ui/toast            → ToastPage          (Step 4)
/ui/modal-popups     → DialogPage         (Step 4)
```

## Dead-code debt to flag for future housekeeping

Three legacy `<UiComponentsPage section="…" />` JSX blocks in [ui-components-page.tsx](../src/pages/ui-components-page.tsx) became unreachable this pass:

- `section="alert"`
- `section="drawer"`
- `section="progress-bar"`

Don't remove this pass per the brief. Logged for the next housekeeping sweep.

After this pass, 4 sections still need UiComponentsPage: `dropdown-menu`, `profile-switcher`, `accordion`, `swiper`. UiComponentsPage stays alive until those four get dedicated docs pages.

## Verification

- ✅ `npx tsc -b` clean after every commit and at the final state.
- ✅ All 6 swapped routes return HTTP 200.
- ✅ Banner / Toast / Dialog regression: all still 200.
- ✅ Side-drawers redirect to /ui/drawer still resolves.
- ✅ Each new page renders the full 8-section anatomy (title chip → preview → install → usage → examples → props → a11y → UsesTokens → related).
- ✅ `<UsesTokens>` footer applied to all 6 with appropriate foundation arrays.

## Open items / future candidates

1. **Alert primitive's old destructive style** — the restyling is bolder. If any specific consumer depended on the previous monochrome look, override via className. No callsites to migrate; the visual change ships.
2. **Drawer/Sheet API convergence** — both expose the same composition shape (Header/Content/Footer). A unified `<Panel>` primitive could theoretically replace both, but the physics are too different to share an implementation. Documented as nav-level consolidation; primitives stay separate.
3. **Progress indeterminate mode** — the primitive doesn't ship one; the docs page shows two workarounds (pulse + sliding stripe via CSS keyframes). Adding a native `indeterminate` prop is a primitive extension candidate.
4. **Hover Card touch fallback** — no built-in touch alternative. For information that must be reachable on touch, the docs explicitly recommend Popover or in-page rendering. Worth a `<HoverPopover>` shim primitive in the future if the pattern proves common.

## Manual checks worth running (your side)

- [ ] Visual dark-mode pass on the 6 new pages (especially Alert variants and Drawer drag handle).
- [ ] On the Drawer/Sheet page, open both the right Sheet and the bottom Drawer and confirm the physics feel right (Sheet snaps, Drawer can be dragged).
- [ ] On Hover Card, hover the user preview and verify the open delay feels appropriate; on touch, confirm the content doesn't appear (it shouldn't — that's the point of the touch-fallback warning).
- [ ] On the Progress live upload demo, click through the simulated upload and reset; on the SLA countdown, confirm the tone steps from green → amber → red.
