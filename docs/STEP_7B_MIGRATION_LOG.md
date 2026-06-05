# Step 7B — Data Display + Navigation Migration

Phase 2 output. Phase 1 discovery is in [STEP_7B_DISCOVERY.md](./STEP_7B_DISCOVERY.md).

## Summary

Discovery found all 11 candidate pages were STUB/MISSING. Per the hard-stop, **Data Table was deferred to Step 7C** as its own dedicated build. The remaining 10 pages shipped as one commit per page (matching Step 7A's cadence).

| # | Component | Status | Notes |
|---|---|---|---|
| 1 | Data Table | **Deferred to Step 7C** | Largest single component in the library; warranted its own scoped commit. |
| 2 | Badge | ✅ Built | Page only — primitive already existed. 7 examples incl. semantic statuses, status dot, counter on button, render-as-link. |
| 3 | Avatar | ✅ Built | Page only — primitive already existed. 7 examples incl. status dots (online/away/busy/offline), avatar group with +N overflow, square treatment. |
| 4 | Skeleton | ✅ Built | Page only — primitive already existed (13 lines). 6 examples incl. full customer card and 5-row table placeholder. |
| 5 | Navbar | ✅ Built primitive + page | **New primitive** ([navbar.tsx](../src/components/ui/navbar.tsx)) — 6 composition pieces (Navbar, NavbarBrand, NavbarLinks, NavbarLink, NavbarSearch, NavbarTrailing). 5 examples. |
| 6 | Breadcrumb | ✅ Built | Page only — primitive already existed. 6 examples incl. truncated middle with ellipsis-dropdown. |
| 7 | Pagination | ✅ Built primitive + page | **New primitive** ([pagination.tsx](../src/components/ui/pagination.tsx)) — 9 composition pieces. 6 examples. |
| 8 | Stepper | ✅ Page only | Progress Tracker primitive coexists; see notes below. 5 examples mapped to the 3 step statuses. |
| 9 | Command | ✅ Built primitive + page | **New primitive** ([command.tsx](../src/components/ui/command.tsx)) — 10 cmdk wrappers + CommandDialog. cmdk dep was already installed (Step 7A). 6 examples incl. live ⌘K palette. |
| 10 | Menu (renamed from Navigation Menu) | ✅ Renamed + built page | **File rename**: `navigation-menu.tsx → menu.tsx`. Exports keep `NavigationMenu*` names. One import site updated ([ui-components-page.tsx](../src/pages/ui-components-page.tsx)). 5 examples. |
| 11 | Context Menu | ✅ Built primitive + page | **New primitive** ([context-menu.tsx](../src/components/ui/context-menu.tsx)) — 15 Radix Context Menu wrappers including submenu / checkbox-item / radio-item. **New dep:** `@radix-ui/react-context-menu`. 7 examples. |

**10 commits** (one per page), plus a 1-line follow-up commit for a Command tsc fix.

## New primitives shipped this pass

| Primitive | File | Built on |
|---|---|---|
| Pagination (9 exports) | [pagination.tsx](../src/components/ui/pagination.tsx) | Custom (Lucide chevrons only) |
| Command (10 exports) | [command.tsx](../src/components/ui/command.tsx) | cmdk (existing dep from Step 7A) |
| Context Menu (15 exports) | [context-menu.tsx](../src/components/ui/context-menu.tsx) | **@radix-ui/react-context-menu** (new dep) |
| Navbar (6 exports) | [navbar.tsx](../src/components/ui/navbar.tsx) | Custom layout (no dep) |

## File rename

`navigation-menu.tsx → menu.tsx` per the Step 2 rename. Exports keep their `NavigationMenu*` names so existing consumers don't break. The rename was a `git mv` + one-line sed update of the single import site in [ui-components-page.tsx](../src/pages/ui-components-page.tsx). Docs page is titled "Menu" but still imports `NavigationMenu*` from `@/components/ui/menu`.

## Stepper / Progress Tracker — the duplication question

Per the Phase 1 brief: "are these meaningfully different primitives, or is `progress-tracker.tsx` a candidate for Step 7D deletion?"

**Diff result:** Different shapes. Stepper is a horizontal array API (`<Stepper steps={[{title, status}]} />`); Progress Tracker is vertical composition (`<ProgressTracker><ProgressTrackerItem><ProgressTrackerHeader/><ProgressTrackerContent/></ProgressTrackerItem></ProgressTracker>`). Statuses differ too: Stepper uses `"completed" | "active" | "pending"`; Progress Tracker uses `"completed" | "in-progress" | "pending"`.

**5 active import sites for ProgressTracker:**
- [confirmation-page.tsx](../src/pages/confirmation-page.tsx)
- [service-status-page.tsx](../src/pages/service-status-page.tsx)
- [ui-components-page.tsx](../src/pages/ui-components-page.tsx) (two imports)
- [inquiry-detail-page.tsx](../src/pages/inquiry-detail-page.tsx)

**Conclusion:** Both primitives stay. The Stepper docs page documents Stepper only. The `/ui/progress-tracker → /ui/stepper` redirect from Step 2 is in place. Full API convergence (one primitive serving both shapes) is non-trivial work for Step 7D, alongside the broader housekeeping pass.

## Brief-vs-reality mismatches worth flagging

A few brief items didn't map cleanly to the primitive APIs in this codebase:

### Stepper — the brief asked for variants the primitive doesn't support
The Phase 2 brief listed: *horizontal numbered, vertical with descriptions, with completed/current/upcoming states, clickable past steps, with error state on a step.*

The actual [stepper.tsx](../src/components/ui/stepper.tsx) only supports horizontal layout with 3 statuses (completed/active/pending). No vertical, no descriptions, no clickable steps, no error state. The page documents what exists; primitive extension is a Step 7D candidate if those variants are needed.

### Menu — the brief described DropdownMenu features, not NavigationMenu
The Phase 2 brief listed: *simple dropdown items, with icons, with submenu, with shortcuts, with destructive item, with separators + section labels.* Those are **DropdownMenu** features (and exist in [dropdown-menu.tsx](../src/components/ui/dropdown-menu.tsx)).

The Menu page documents [menu.tsx](../src/components/ui/menu.tsx) — the renamed top-bar NavigationMenu — with shapes that fit a top-bar nav: standalone links, dropdown content panels, icons, active state, grouped content. The page intro distinguishes Menu (top-bar) from DropdownMenu (action menu). DropdownMenu has its own primitive and can get its own docs page in Step 7D.

## Dead-code debt for Step 7D

These dispatch routes were rewired to real pages this pass, but the corresponding section JSX inside [src/pages/ui-components-page.tsx](../src/pages/ui-components-page.tsx) is still present — dead code reachable only via direct `<UiComponentsPage section="…" />` import:

- `section="badges"`
- `section="breadcrumb"`
- `section="stepper"`
- `section="navigation-menu"`

Per the brief: don't delete yet; log for Step 7D's housekeeping pass.

## i18n additions

Ten new namespaces in [src/locales/en.json](../src/locales/en.json):

`docs.badge.*`, `docs.avatar.*`, `docs.skeleton.*`, `docs.breadcrumb.*`, `docs.pagination.*`, `docs.stepper.*`, `docs.command.*`, `docs.menu.*`, `docs.contextMenu.*`, `docs.navbar.*` — each with the canonical 10 top-level keys (title, description, category, preview, installation, usage, examples, props, accessibility, related).

## Routes — final state of all 11 candidates

```
/ui/data-table       → DEFERRED to Step 7C (no route added this pass)
/ui/badges           → BadgePage         (new this pass)
/ui/avatar           → AvatarPage        (new this pass)
/ui/skeleton         → SkeletonPage      (new this pass)
/ui/breadcrumb       → BreadcrumbDocsPage (new this pass)
/ui/pagination       → PaginationPage    (new this pass; primitive new too)
/ui/stepper          → StepperPage       (new this pass)
/ui/command          → CommandPage       (new this pass; primitive new too)
/ui/navigation-menu  → MenuPage          (new this pass; file renamed)
/ui/context-menu     → ContextMenuPage   (new this pass; primitive new too)
/ui/navbar           → NavbarPage        (new this pass; primitive new too)
/ui/progress-tracker → Navigate /ui/stepper  (untouched; Step 2 redirect)
```

No `<ComingSoon />` or `<UiComponentsPage section="…" />` reachable for any of these 11 routes (10 routed to real pages + 1 deferred without a route).

## Verification

- ✅ `npx tsc -b` clean after every commit and at the final state.
- ✅ All 10 swapped routes return HTTP 200.
- ✅ Each new page renders the full 8-section anatomy (title chip → preview → install → usage → examples → props → a11y → UsesTokens → related).
- ✅ `<UsesTokens>` footer applied to all 10 new pages with appropriate foundation arrays.
- ✅ No `<ComingSoon />` reachable for the 10 built routes.

## Open items / Step 7D candidates

1. **Data Table** — own scoped build (Step 7C).
2. **Progress Tracker convergence** — 5 active import sites need migration if we want a single primitive. Non-trivial because the shapes differ.
3. **`<UiComponentsPage section="…" />` dispatch cleanup** — 4 dead sections (badges, breadcrumb, stepper, navigation-menu) reachable only via direct import.
4. **Stepper primitive extensions** — vertical orientation, descriptions per step, error state, clickable past steps. Worth adding if real usage surfaces a need.
5. **DropdownMenu docs page** — has its own primitive ([dropdown-menu.tsx](../src/components/ui/dropdown-menu.tsx)) and was implicitly out of scope for "Menu". Belongs on the Step 7D candidate list.
6. **Pagination primitive integration with Data Table** — the existing pagination logic inside [data-table.tsx](../src/components/ui/data-table.tsx) predates this primitive. When Data Table ships in Step 7C, ideally swap it to use the new Pagination primitive for consistency.

## Manual checks worth running (your side)

These cannot be automated:

- [ ] Visual dark-mode pass on all 10 new pages.
- [ ] Right-click the Context Menu trigger areas to confirm the popover positions correctly.
- [ ] Hit `⌘ K` / `Ctrl K` on the Command page to test the global palette.
- [ ] Open the Combobox vs Command pages back-to-back to verify the UX feels distinct (search-and-select vs keyboard-launcher).
- [ ] Hover the Menu page's "Services" trigger to verify the dropdown panel animates in cleanly.
