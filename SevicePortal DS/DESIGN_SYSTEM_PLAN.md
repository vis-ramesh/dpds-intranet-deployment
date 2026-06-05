# Service Portal Design System — Structure & Build Plan

A shadcn-style internal component library for the Service Portal CRM. This doc defines the side-nav structure, page-by-page contents, and a phased build plan.

> **Audit basis:** Reviewed the deployed build at `crm-dashboard-template-iota.vercel.app`. Already present in the bundle: Buttons, Cards, Inputs, Forms, Alerts, Toasts, Dialogs, Tables, Badges, Avatars, Tabs, Tooltips, Dropdowns, Breadcrumbs, Popovers, Sheets, Drawers, Selects, Sliders, Stepper, Progress, Accordion, Pagination, Checkbox, Radio, Switch, Textarea, Label, Combobox, Date Picker, OTP, File upload, Chart, Hover Card, Aspect Ratio, Collapsible, Resizable, Scroll Area, Alert Dialog, Navigation Menu, Menubar, Toggle, Sonner, Skeleton, Spinner, Sidebar, Command, Context Menu, plus Foundations (Colors, Typography, Spacing, Radius, Motion, Elevation, Iconography). Category labels detected: Foundations, Layout, Overlay, Content/Display, Patterns/Blocks, Resources, Charts. **The library is substantially complete — this plan focuses on organising what exists and filling small gaps, not building from zero.**

---

## Side Navigation Structure

The nav is organised into seven category dividers, mirroring shadcn/ui's pattern of "section title in muted small caps, followed by a flat list of links." Order is deliberate: developers land on Getting Started, then drop into Foundations to understand tokens, then go straight to the component group they need.

### 1. Getting Started

Top-of-funnel pages. Keep these short and skimmable.

- **Introduction** — what this DS is, who it's for, what's in scope.
- **Installation** — how to pull components into a Service Portal project (CLI or copy-paste).
- **Project Structure** — recommended folder layout for consuming apps.
- **Theming** — token system, CSS variables, brand override pattern.
- **Dark Mode** — how the theme switch works, class strategy.
- **Typography** — font stack, scale, line-height rules (links to Foundations).
- **Changelog** — version history.

### 2. Foundations

Design tokens and primitives that everything else depends on. One page per token family.

- **Colors** — palette, semantic tokens (bg, fg, border, accent, destructive…), contrast pairs.
- **Typography** — type scale, weights, usage rules.
- **Spacing & Layout** — 4px base unit, scale, layout grid.
- **Iconography** — icon set (Lucide-style), sizes, usage rules.
- **Elevation & Shadows** — shadow scale, z-index layers.
- **Border Radius** — radius scale (sm, md, lg, full).
- **Motion** — duration, easing tokens, when to animate.
- **Accessibility** — global a11y rules every component must meet.

### 3. Components — Form & Input

- Button
- Input
- Textarea
- Label
- Select
- Combobox
- Checkbox
- Radio Group
- Switch
- Slider
- Date Picker
- Input OTP
- File Upload
- Form (validation wrapper)

### 4. Components — Data Display

- Card
- Table
- Data Table (sortable, filterable, paginated)
- Badge
- Tag / Chip
- Avatar
- List
- Stat / KPI Tile
- Empty State
- Skeleton
- Tooltip

### 5. Components — Navigation

- Sidebar
- Navbar / App Header
- Breadcrumb
- Tabs
- Pagination
- Stepper
- Command (cmdk palette)
- Menu / Dropdown
- Context Menu

### 6. Components — Feedback & Overlay

- Alert (inline)
- Banner (top-of-page)
- Toast / Sonner
- Dialog / Modal
- Drawer / Sheet
- Popover
- Hover Card
- Progress
- Spinner / Loader

### 7. Components — Layout

- Container
- Grid
- Stack (hstack / vstack)
- Separator
- Accordion
- Collapsible
- Resizable Panels
- Scroll Area
- Aspect Ratio

### 8. Patterns (Blocks) — _optional, Phase 5_

Full screen compositions developers can copy wholesale. Keep this section small and high-value.

- Authentication (Login, Reset Password)
- Dashboard layout
- Settings page
- Customer Profile / 360 view
- Ticket / Case detail
- Empty / Error states

### 9. Resources

- Figma library link
- Component checklist (what "done" means)
- Versioning & releases
- FAQ
- Contributing _(add later if devs will contribute back)_

---

## What to Add vs. What to Remove (delta against your current build)

Your bundle already covers nearly the full shadcn surface. The gaps and clean-ups:

**Add — missing or thin:**
- **Stat / KPI Tile** — high-frequency CRM pattern, not in the bundle.
- **Empty State** — common need, worth a dedicated page rather than buried in examples.
- **Banner** (page-level) — you have Alert (inline) but no top-of-page banner pattern.
- **List** — distinct from Table for activity feeds, comment threads.
- **Tag / Chip** — distinct from Badge (interactive vs. display).
- **Foundations: Accessibility page** — global a11y rules every component must meet.
- **Patterns / Blocks** — you have the label but few real entries. Build Login, Dashboard, Ticket Detail, Customer 360, Settings.

**Remove or demote — low value for an internal CRM DS:**
- **Carousel** — rarely needed in B2B service tooling. Remove unless used.
- **Menubar** (macOS-style menu) — Dropdown + Command cover the use cases.
- **Aspect Ratio** — keep but bury under Layout, not a top-level entry.
- **Toggle / Toggle Group** — overlaps with Switch + Tabs; merge into a single page or drop.

**Rename / consolidate for clarity:**
- **"Sonner" → "Toast"** — keep one name. Devs new to the codebase get confused by two.
- **"Sheet" → "Drawer / Sheet"** — surface both terms on one page.
- **"Alert Dialog" → fold into "Dialog"** as a variant — they share 90% of the API.
- **"Navigation Menu" → "Menu"** — current name is ambiguous with Sidebar/Navbar.

---

## Component Page Template

Every component page should follow the same anatomy so devs can scan quickly. Aim for one page per component, around 200-400 lines.

1. **Title + one-line description**
2. **Live preview** (interactive, with theme switcher)
3. **Installation** (single copy-paste command or import line)
4. **Usage** (minimum viable code snippet)
5. **Examples** — one per variant or state (default, with icon, loading, disabled, error, etc.)
6. **API / Props table** (name, type, default, description)
7. **Accessibility notes** (keyboard, ARIA, focus behaviour)
8. **Related components** (cross-links)

---

## Phased Build Plan

Five phases, ~5 weeks total. Since most components already exist, the plan emphasises **organising, hardening, and filling gaps** rather than building from scratch.

### Phase 1 — Restructure the Side Nav (Week 1)

Goal: nav matches the seven-category structure in this doc; existing pages slot in cleanly.

- Refactor side nav into the 7 dividers: Getting Started, Foundations, Form & Input, Data Display, Navigation, Feedback & Overlay, Layout.
- Move existing pages into their new categories. No content changes yet — just reorganisation.
- Consolidate duplicates: Sonner → Toast, Alert Dialog → Dialog variant, Toggle → Switch page.
- Add the missing top-level entries as placeholder pages: Stat Tile, Empty State, Banner, List, Tag.

**Exit criteria:** Side nav renders with category dividers, every existing component is reachable, no orphan pages.

### Phase 2 — Standardise the Component Page Template (Week 2)

Goal: every page follows the same anatomy, so devs can scan any component the same way.

- Lock the 8-section page template (see above) on **Button** as the canonical example.
- Migrate existing component pages to the template — prioritise the 10 most-used: Button, Input, Select, Card, Table, Dialog, Tabs, Toast, Form, Sidebar.
- Add copy buttons to every code block. Add a live theme switcher in the preview frame.

**Exit criteria:** Top 10 components match the template exactly; remaining pages have a TODO banner pointing to the template.

### Phase 3 — Foundations Hardening (Week 3)

Goal: tokens are publishable, dark mode is solid, accessibility rules are documented.

- Audit Foundations pages: Colors, Typography, Spacing, Radius, Elevation, Motion, Iconography.
- Add the missing **Accessibility** page covering keyboard, ARIA, focus rings, contrast minimums.
- Verify all CSS variables exist for light + dark; document the theming override pattern.
- Cross-link Foundations from every component page ("uses these tokens: …").

**Exit criteria:** A dev can theme the whole library by overriding one set of CSS variables.

### Phase 4 — Fill the Gaps (Week 4)

Goal: add the missing component pages identified in the delta above.

- Build **Stat / KPI Tile**, **Empty State**, **Banner**, **List**, **Tag / Chip**.
- Remove or merge low-value pages: Carousel (if unused), Menubar, Toggle Group.
- Migrate remaining component pages onto the standard template.

**Exit criteria:** Every page in the nav is on the standard template; no placeholders left.

### Phase 5 — Patterns, Search, Launch (Week 5)

Goal: ship v1 and hand off to product teams.

- Build 5 Patterns / Blocks: Login, Dashboard, Customer Profile, Ticket Detail, Settings.
- Add docs search (Pagefind for static, free; upgrade to Algolia DocSearch later).
- Write a one-page Contributing guide (even if read-only for now — devs will want it).
- Cut v1.0.0, publish a changelog, send a launch note to product teams.

**Exit criteria:** v1 deployed, at least one product team consuming a component in a real screen.

---

## Tooling Recommendations

A short list — make decisions early so phases don't stall.

- **Docs framework:** Vite + React + MDX (you're already on Vite) or Nextra if you want zero-config.
- **Component primitives:** Radix UI underneath (matches shadcn approach, handles a11y for free).
- **Styling:** Tailwind CSS + CSS variables for tokens.
- **Icons:** Lucide (matches shadcn, huge set, consistent style).
- **Forms:** react-hook-form + zod.
- **Tables:** TanStack Table.
- **Theme switching:** `next-themes` or a small custom hook.
- **Code blocks:** Shiki for syntax highlighting; add a Copy button on every snippet.
- **Search:** Pagefind (static, free) for v1; upgrade to Algolia later if needed.

---

## Open Questions to Resolve Before Phase 1

- Do we want the docs site itself to live alongside the component package (monorepo) or separately?
- What package name / import path will consuming apps use? (e.g. `@serviceportal/ui`)
- Single theme or multi-tenant theming (different brands per customer)?
- Who owns the Figma library and how does it stay in sync with code?
