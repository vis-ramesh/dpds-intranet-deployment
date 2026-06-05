# Nav Audit — DPDS 2.0

Read-only audit of the current side-nav and routes against [DESIGN_SYSTEM_PLAN.md](../SevicePortal%20DS/DESIGN_SYSTEM_PLAN.md). No code changed.

## 1. Config file locations

| Purpose | Path |
|---|---|
| Side-nav data (sections + items) | [src/components/app-sidebar.tsx](../src/components/app-sidebar.tsx) — `sections` const, lines 66–147 |
| Routes (URL → page) | [src/App.tsx](../src/App.tsx) — `<Routes>` block, lines 35–100 |
| Nav i18n strings | [src/locales/en.json](../src/locales/en.json) (and `ar.json`) — `sidebar.*` namespace |

Nav is data-driven (typed `Section[]`), routes are inline JSX in `App.tsx`. There is no separate `routes.ts`.

## 2. Current nav inventory

Six top-level sections, 43 items total (counting Services children).

**Dashboard** (1): Dashboard
**UI Components** (21): Cards, Buttons, Badges, Toast, Tabs, Modal Popups, Side Drawers, Drawer, Table, Dropdown Menu, Progress Bar, Charts, Analytics, Accordion, Breadcrumb, Navigation Menu, Alert, Profile Switcher, Stepper, Swiper, Progress Tracker
**Forms** (12): Form, Input, Select, Checkbox, Radio, Textarea, Datepicker, File Upload, Slider, Toggle, Switch, Text Editor
**Icons** (1): Huge Icons
**Animations** (2): Animations, Bento Demo
**Pages** (5 + 6 nested under Services): Login Modal, Page Preview, Email Templates, Lottie Icons, Services → (Inquiry Detail, Inquiry Form, Service Status, Confirmation, Transaction Enquiry, Request Detail)

## 3. Mapping table — current page → target plan category

Sorted by target category for easier slot-in during Phase 1 nav refactor. "—" means no obvious plan slot.

### → Getting Started
None. Section does not exist in code yet (entirely missing).

### → Foundations
| Current page | Current section | Target page in plan |
|---|---|---|
| `/icons/huge-icons` | Icons | Iconography |
| `/lottie-icons` | Pages | Iconography (animated icons subsection) |
| `/animations` | Animations | Motion |

### → Form & Input
| Current page | Current section | Target page in plan |
|---|---|---|
| `/buttons` | UI Components | Button |
| `/forms/form` | Forms | Form (validation wrapper) |
| `/forms/input` | Forms | Input |
| `/forms/textarea` | Forms | Textarea |
| `/forms/select` | Forms | Select |
| `/forms/checkbox` | Forms | Checkbox |
| `/forms/radio` | Forms | Radio Group |
| `/forms/switch` | Forms | Switch |
| `/forms/slider` | Forms | Slider |
| `/forms/datepicker` | Forms | Date Picker |
| `/forms/fileupload` | Forms | File Upload |
| `/forms/toggle` | Forms | (merge into Switch per plan §"Remove or demote") |
| `/forms/text-editor` | Forms | — (no plan slot; closest is Textarea variant) |

### → Data Display
| Current page | Current section | Target page in plan |
|---|---|---|
| `/cards` | UI Components | Card |
| `/ui/badges` | UI Components | Badge |
| `/ui/table` | UI Components | Table / Data Table |
| `/charts` | UI Components | — (plan does not list Chart in DD; treat as Data Display add-on or Patterns) |
| `/analytics` | UI Components | — (pattern, not a primitive — should move to Patterns) |

### → Navigation
| Current page | Current section | Target page in plan |
|---|---|---|
| `/ui/tabs` | UI Components | Tabs |
| `/ui/breadcrumb` | UI Components | Breadcrumb |
| `/ui/dropdown-menu` | UI Components | Menu / Dropdown |
| `/ui/navigation-menu` | UI Components | Menu (plan §"Rename" merges Navigation Menu → Menu) |
| `/ui/stepper` | UI Components | Stepper |
| `/ui/progress-tracker` | UI Components | (variant of Stepper — consolidate) |
| `/ui/profile-switcher` | UI Components | — (no plan slot; closest is Sidebar/Navbar sub-pattern) |

### → Feedback & Overlay
| Current page | Current section | Target page in plan |
|---|---|---|
| `/ui/alert` | UI Components | Alert (inline) |
| `/ui/toast` | UI Components | Toast (consolidate Sonner → Toast) |
| `/ui/modal-popups` | UI Components | Dialog / Modal |
| `/ui/side-drawers` | UI Components | Drawer / Sheet |
| `/ui/drawer` | UI Components | Drawer / Sheet — **duplicate of side-drawers**, consolidate |
| `/ui/progress-bar` | UI Components | Progress |
| `/ui/login-modal` | Pages | Dialog example, OR Patterns → Authentication |

### → Layout
| Current page | Current section | Target page in plan |
|---|---|---|
| `/ui/accordion` | UI Components | Accordion |
| `/animations/bento` | Animations | — (closest is Grid; bento is a layout demo) |
| `/ui/swiper` | UI Components | — (Carousel; plan says remove unless used) |

### → Patterns (optional Phase 5)
| Current page | Current section | Target page in plan |
|---|---|---|
| `/` (Dashboard) | Dashboard | Dashboard layout |
| `/analytics` | UI Components | Dashboard layout (analytics variant) |
| `/email-templates` | Pages | — (pattern not in plan; "Email templates" candidate) |
| `/services` | Pages | Ticket / Case detail (services list) |
| `/services/inquiry` | Pages › Services | Ticket / Case detail |
| `/services/inquiry/form` | Pages › Services | Ticket / Case detail (form view) |
| `/services/status` | Pages › Services | Ticket / Case detail (status view) |
| `/services/confirmation` | Pages › Services | Ticket / Case detail (confirmation step) |
| `/services/transaction-enquiry` | Pages › Services | Ticket / Case detail (enquiry view) |
| `/services/request-detail` | Pages › Services | Ticket / Case detail (request view) |
| `/login`, `/signup` | (standalone routes, not in nav) | Authentication |

### → Resources / unclassified
| Current page | Current section | Notes |
|---|---|---|
| `/page-previews` | Pages | Internal preview tool; possibly Resources or remove from public nav |

## 4. Flags

### 4a. Pages in the plan but missing from the codebase

**Getting Started** — entire section missing as pages:
- Introduction, Installation, Project Structure, Theming, Dark Mode, Typography (intro), Changelog

**Foundations** — most pages missing (some primitives exist in code but have no docs page):
- Colors, Typography, Spacing & Layout, Elevation & Shadows, Border Radius, Accessibility — no pages
- Iconography — partial (huge-icons + lottie-icons exist but no umbrella page)
- Motion — partial (animations page is more demo than token doc)

**Form & Input** — missing pages (primitive may exist):
- Combobox (no primitive, no page)
- Input OTP — primitive `input-otp.tsx` exists in `src/components/ui/`, no page or route
- Label — primitive `label.tsx` exists, no page

**Data Display** — missing pages:
- Tag / Chip — no primitive, no page
- Avatar — primitive `avatar.tsx` exists, no page
- List — no primitive, no page
- Stat / KPI Tile — primitive `stat-card.tsx` exists, no page
- Empty State — primitive `empty-state.tsx` exists, no page
- Tooltip — primitive `tooltip.tsx` exists, no page

**Navigation** — missing pages:
- Sidebar — primitive `sidebar.tsx` exists, no docs page (used by app-sidebar)
- Navbar / App Header — primitive `header.tsx` exists, no page
- Pagination — no primitive, no page (handled inline in DataTable)
- Command (cmdk) — no primitive, no page
- Context Menu — no primitive, no page

**Feedback & Overlay** — missing pages:
- Banner (page-level) — no primitive, no page
- Hover Card — no primitive, no page
- Popover — primitive `popover.tsx` exists, no page
- Spinner / Loader — no dedicated primitive (likely inline), no page

**Layout** — missing pages:
- Container, Grid, Stack, Separator (primitive `separator.tsx` exists), Collapsible, Resizable Panels, Scroll Area, Aspect Ratio — all missing as pages

**Patterns** — most missing:
- Login pattern page (the `/login` route exists but as a real auth page, not a Patterns demo)
- Reset Password, Settings, Customer Profile / 360, Empty / Error states — all missing

**Resources** — entire section missing:
- Figma library link, Component checklist, Versioning, FAQ, Contributing

### 4b. Pages in the codebase but not in the plan

Pages that exist in nav but don't slot cleanly into any plan category. Decide: rename, merge, demote, or remove.

| Page | Likely action |
|---|---|
| `/analytics` | Move to Patterns (Dashboard variant) — not a primitive |
| `/charts` | Either keep as Data Display add-on or fold into Patterns |
| `/ui/profile-switcher` | Fold into Sidebar/Navbar docs, or keep as Pattern |
| `/ui/swiper` | Plan says remove Carousel "unless used" — verify usage, likely demote |
| `/ui/progress-tracker` | Consolidate with Stepper (same family) |
| `/forms/text-editor` | No plan slot — either add as RTE primitive or demote |
| `/animations/bento` | Demo, not a primitive — Patterns or remove from public nav |
| `/lottie-icons` | Fold into Iconography page or keep as separate Foundations entry |
| `/email-templates` | Pattern — likely move under Patterns |
| `/page-previews` | Internal tool — remove from docs nav or move to Resources |
| `/services/*` (6 pages) | Multiple slot under Patterns → Ticket / Case detail; consider grouping |

### 4c. Duplicates / consolidations called out by plan

| Current | Action per plan |
|---|---|
| `/ui/toast` + `src/components/ui/sonner.tsx` | Rename to **Toast** (single page, Sonner is the impl) |
| `/ui/drawer` + `/ui/side-drawers` + `src/components/ui/sheet.tsx` | Merge to **Drawer / Sheet** (single page) |
| `/ui/modal-popups` + Alert Dialog (if separate) | Fold Alert Dialog into **Dialog** as a variant |
| `/ui/navigation-menu` | Rename to **Menu** |
| `/forms/toggle` | Plan says merge into Switch page (or drop) |
| `/ui/progress-tracker` vs `/ui/stepper` | Merge under **Stepper** (variants) |
| `/ui/progress-bar` | Rename to **Progress** to match plan |

## 5. Additional observations

- **Standalone routes not in nav:** `/login`, `/signup`, `/404` are rendered outside the sidebar `<Layout>`. These are real auth screens, not docs pages — fine, but flag them when building the Patterns → Authentication entry so they don't get confused with the Patterns docs page.
- **Chart sub-components** (`activity-bar-chart.tsx`, `bubble-stat-chart.tsx`, `gauge-chart.tsx`, `glow-radar-chart.tsx`, `inverted-pyramid-chart.tsx`, `multi-line-chart.tsx`, `point-cloud-chart.tsx`, `sales-report-chart.tsx`, `sankey-chart.tsx`, `stacked-bar-chart.tsx`, `straight-line-chart.tsx`) all live in `src/components/ui/` but are only reachable via the single `/charts` route. Consider one page per chart family or a single Chart hub.
- **Internal-only primitives** (no nav slot, no plan slot): `card-widget.tsx`, `field.tsx`, `input-group.tsx`, `button-group.tsx`, `user-dropdown.tsx`, `lang-dropdown.tsx`, `walkthrough.tsx`, `decor-image.tsx`, `magic-card.tsx`, `marquee.tsx`, `animated-beam*.tsx`, `animated-list.tsx`, `fade-in.tsx`, `uae-hex.tsx`, `uae-map.tsx`, `uae-pass-button.tsx`, `upcoming-appointments.tsx`, `phone-input.tsx`. Decide per item whether each warrants a docs page or stays internal.
- **i18n impact:** Every nav rename needs a matching key update in `src/locales/en.json` and `src/locales/ar.json` under `sidebar.*`.

## 6. Suggested Phase 1 execution order

For the eventual nav refactor (not done in this step):

1. Introduce the 7 plan section dividers in `app-sidebar.tsx` (Getting Started, Foundations, Form & Input, Data Display, Navigation, Feedback & Overlay, Layout). Keep all existing pages reachable.
2. Move existing pages into their new sections per the mapping above. No content changes.
3. Apply the consolidations in 4c (rename routes + i18n keys, fold duplicates).
4. Add placeholder pages for the high-priority gaps: Stat Tile, Empty State, Banner, List, Tag, Foundations/Accessibility.
5. Move the Services + Login Modal + Email Templates + Dashboard + Analytics under a new "Patterns" section divider.
6. Remove or demote: Swiper, Bento Demo, Page Previews (decide per item).

Plan exit criteria: side nav renders with the 7 dividers, every existing component is still reachable, no orphan pages.
