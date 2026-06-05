# Step 2 — Nav Restructure Decisions

Tracks every orphan / consolidated page identified in [NAV_AUDIT.md](./NAV_AUDIT.md) and what happened to it during the Phase 1 nav refactor.

The goal of this step was structure, not content. Where two pages were consolidated into one, the merge is **structural only** — the canonical URL/nav entry now points to the existing page, and the duplicate URL redirects via `<Navigate>`. Content merge (adding the other variant's examples onto the canonical page) is Phase 2 work.

## Section structure

8 top-level dividers (the 7 from the plan + a Patterns section for orphan flows):

1. Getting Started
2. Foundations
3. Form & Input
4. Data Display
5. Navigation
6. Feedback & Overlay
7. Layout
8. Patterns

The Installation page was intentionally omitted from Getting Started per task brief.

## Consolidations (single page, duplicate redirects to canonical)

| Duplicate URL | Canonical URL | Nav label | Notes |
|---|---|---|---|
| `/ui/side-drawers` | `/ui/drawer` | "Drawer / Sheet" | Redirect added in App.tsx. Content merge (fold Side Drawers examples into Drawer page) is Phase 2. |
| `/forms/toggle` | `/forms/switch` | "Switch" | Redirect added. Toggle becomes a variant section on Switch in Phase 2. |
| `/ui/progress-tracker` | `/ui/stepper` | "Stepper" | Redirect added. **Nav-level consolidation only — see Step 7D note below.** Stepper and ProgressTracker remain separate primitives because their APIs differ fundamentally (horizontal vs vertical, title-only vs composition slots, `active` vs `in-progress` statuses, `statusLabel` prop on Tracker only). |
| Alert Dialog content | `/ui/modal-popups` | "Dialog" | No separate Alert Dialog route existed; Alert Dialog content already lives on the Modal Popups page. Nav label renamed to "Dialog". |
| `src/components/ui/sonner.tsx` (impl) | `/ui/toast` | "Toast" | Sonner is the implementation; Toast is the docs page label. |
| Navigation Menu name | `/ui/navigation-menu` | "Menu" | URL preserved for bookmarks; nav label renamed from "Navigation Menu" to "Menu" per plan. |
| Progress Bar name | `/ui/progress-bar` | "Progress" | URL preserved; nav label renamed to match plan. |

## Orphan pages — actions taken

### Moved to Patterns (top-level new section)

| Page | URL | Old section | Reasoning |
|---|---|---|---|
| Dashboard | `/` | Dashboard (singleton) | Plan lists Dashboard layout under Patterns. The route stays as the home page. |
| Analytics | `/analytics` | UI Components | Composed dashboard, not a primitive. |
| Charts | `/charts` | UI Components | Composed views (revenue, gauge, sankey, etc.), not a single primitive. Future Phase 4 may split per-chart docs under Data Display. |
| Login Modal | `/ui/login-modal` | Pages | Auth pattern; Patterns → Authentication eventually. |
| Email Templates | `/email-templates` | Pages | Layout composition, not a primitive. |
| Services (parent + 6 children) | `/services`, `/services/inquiry`, `/services/inquiry/form`, `/services/status`, `/services/confirmation`, `/services/transaction-enquiry`, `/services/request-detail` | Pages › Services | All Ticket / Case detail variants. Kept as a nested accordion under Patterns › Services. |

### Demoted off the main nav (routes preserved for direct access)

These pages still resolve at their original URLs (so existing bookmarks don't 404) but are no longer surfaced in the sidebar. They belong in a Resources section that will be added in a later step.

| Page | URL | Old section | Reasoning |
|---|---|---|---|
| Huge Icons | `/icons/huge-icons` | Icons | Belongs under Foundations › Iconography. The stub `/foundations/iconography` is the new nav entry; this concrete demo will be linked from there. |
| Lottie Icons | `/lottie-icons` | Pages | Same as Huge Icons — sub-resource of Iconography, not a primary nav target. |
| Animations | `/animations` | Animations | Framer Motion demo. Linked from `/foundations/motion` once that page has content. |
| Bento Grid | `/animations/bento` | Animations | One-off layout demo. Resources / pattern showcase, not a primitive. |
| Page Previews | `/page-previews` | Pages | Internal preview tool. Will move under a Resources section. |
| Swiper / Slider | `/ui/swiper` | UI Components | Plan flags Carousel for removal "unless used"; demoted while we decide. |
| Text Editor | `/forms/text-editor` | Forms | No plan slot. Demoted pending decision on whether to keep as RTE primitive or fold into Textarea. |

### Kept in nav with new placement

| Page | URL | Old section | New section | Notes |
|---|---|---|---|---|
| Profile Switcher | `/ui/profile-switcher` | UI Components | Navigation | Audit suggested folding into Sidebar/Navbar docs. Kept as its own nav entry until those parent docs exist; will fold in then. |
| Cards | `/cards` | UI Components | Data Display | Slotted per plan. |
| Buttons | `/buttons` | UI Components | Form & Input | Slotted per plan. |
| Accordion | `/ui/accordion` | UI Components | Layout | Plan groups Accordion under Layout, not UI Components. |
| All `/forms/*` pages | unchanged | Forms | Form & Input | Section renamed, URLs preserved. |

### Standalone routes (outside Layout, not in sidebar)

`/login`, `/signup`, `/404` continue to render without the sidebar (they are real screens, not docs pages). A `// TODO(Phase 5)` comment in `App.tsx` flags that the future Patterns → Authentication entry will be a separate docs route that links to these screens.

## New stub routes (point to `<ComingSoon />`)

All slotted into the correct section. Each route renders the shared `ComingSoon` placeholder at [src/components/ui/coming-soon.tsx](../src/components/ui/coming-soon.tsx); the title auto-derives from the URL slug.

**Getting Started (6 stubs):** `/docs/introduction`, `/docs/project-structure`, `/docs/theming`, `/docs/dark-mode`, `/docs/typography`, `/docs/changelog`

**Foundations (8 stubs):** `/foundations/colors`, `/foundations/typography`, `/foundations/spacing`, `/foundations/iconography`, `/foundations/elevation`, `/foundations/radius`, `/foundations/motion`, `/foundations/accessibility`

**Form & Input (3 stubs):** `/forms/combobox`, `/forms/input-otp`, `/ui/label`

**Data Display (7 stubs):** `/ui/tag`, `/ui/avatar`, `/ui/list`, `/ui/stat`, `/ui/empty-state`, `/ui/skeleton`, `/ui/tooltip`

**Navigation (5 stubs):** `/ui/sidebar`, `/ui/navbar`, `/ui/pagination`, `/ui/command`, `/ui/context-menu`

**Feedback & Overlay (4 stubs):** `/ui/banner`, `/ui/popover`, `/ui/hover-card`, `/ui/spinner`

**Layout (8 stubs):** `/ui/container`, `/ui/grid`, `/ui/stack`, `/ui/separator`, `/ui/collapsible`, `/ui/resizable`, `/ui/scroll-area`, `/ui/aspect-ratio`

41 stubs total.

## Files touched

- [src/components/ui/coming-soon.tsx](../src/components/ui/coming-soon.tsx) — new
- [src/components/app-sidebar.tsx](../src/components/app-sidebar.tsx) — rewrote `sections` array, added icon imports
- [src/App.tsx](../src/App.tsx) — restructured routes, added redirects, added `<ComingSoon />` stub routes, added Phase 5 TODO
- [src/locales/en.json](../src/locales/en.json) — added new `sidebar.*` keys for the 8 dividers and 41 stub entries

## Open items for later phases

1. **Content merge** for the three Phase 2 consolidations (Toggle → Switch, **Progress Tracker → Stepper — closed in Step 7D as nav-level only, see note below**, Side Drawers → Drawer).
2. **Resources section** for the demoted off-nav pages (Lottie, Bento, Page Previews, Swiper, Text Editor, Animations).
3. **ar.json** — new keys not yet mirrored; i18next falls back to English for now, but Arabic strings should be added before launch.
4. **Sidebar/Navbar/Header docs pages** — once these are written, fold Profile Switcher in as a variant.
5. **Charts split** — decide whether the single `/charts` page stays as a Patterns demo or splits into per-chart-family docs under Data Display.

---

## Step 7D outcome — Progress Tracker / Stepper consolidation

Reviewed during the Step 7D housekeeping pass. **Closing as nav-level consolidation only.**

The `/ui/progress-tracker → /ui/stepper` redirect stays in place. The Stepper docs page is the single discovery surface for both primitives.

The primitives remain separate because their APIs differ fundamentally — see the row above and [docs/STEP_7D_HOUSEKEEPING.md](./STEP_7D_HOUSEKEEPING.md) for the gap analysis. A true primitive merge would require extending Stepper with vertical orientation, composition slots, `statusLabel`, and a `"in-progress"` status — which the original brief listed as v1.1 backlog and Step 7D explicitly scoped out.

**Reopen criteria:** if Stepper gets its v1.1 extensions, revisit the 4 ProgressTracker import sites ([confirmation-page.tsx](../src/pages/confirmation-page.tsx), [service-status-page.tsx](../src/pages/service-status-page.tsx), [ui-components-page.tsx](../src/pages/ui-components-page.tsx), [inquiry-detail-page.tsx](../src/pages/inquiry-detail-page.tsx)) and migrate them in one focused pass.
