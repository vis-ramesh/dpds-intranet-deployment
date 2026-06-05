# Step-by-Step Prompts for Claude Code (Antigravity)

How to use this doc: feed Claude Code **one step at a time**. Each prompt is self-contained — it briefs Claude Code from scratch, points to the full plan in `DESIGN_SYSTEM_PLAN.md`, and ends with a verification step. Wait for each step to complete and review before moving to the next.

> Installation page is skipped as requested. Other "Getting Started" pages (Introduction, Theming, Dark Mode, Changelog) are kept.

---

## Step 1 — Audit the current side-nav and produce a route → category mapping

```
You're working in a Vite + React design-system docs project for an internal CRM 
(Service Portal Design System), modelled on shadcn/ui docs. 

Before changing any code, do a read-only audit.

Read /DESIGN_SYSTEM_PLAN.md in the project root for the target structure (7 nav 
categories: Getting Started, Foundations, Form & Input, Data Display, Navigation, 
Feedback & Overlay, Layout, plus optional Patterns and Resources).

Tasks:
1. Find the side-nav config file(s) and the routes config. Note their paths.
2. List every existing component/foundation/page in the current nav.
3. Produce a mapping table: current page name → current category (if any) → target 
   category from the plan.
4. Flag: pages currently missing from the plan, pages in the plan missing from 
   the codebase, and duplicates to consolidate (e.g. Sonner+Toast, Alert Dialog 
   variants).
5. Save the output as /docs/NAV_AUDIT.md.

Do NOT modify any component, route, or nav file in this step. Output only the 
audit doc and a short summary in chat.
```

---

## Step 2 — Refactor the side-nav into the 7 categorised dividers

```
Read /DESIGN_SYSTEM_PLAN.md and /docs/NAV_AUDIT.md from the previous step.

Goal: refactor the side-navigation so it renders 7 category dividers in this 
order, each with the entries listed in the plan:

1. Getting Started — Introduction, Project Structure, Theming, Dark Mode, 
   Typography, Changelog. (Skip "Installation" — do not add it.)
2. Foundations — Colors, Typography, Spacing & Layout, Iconography, Elevation 
   & Shadows, Border Radius, Motion, Accessibility.
3. Form & Input — Button, Input, Textarea, Label, Select, Combobox, Checkbox, 
   Radio Group, Switch, Slider, Date Picker, Input OTP, File Upload, Form.
4. Data Display — Card, Table, Data Table, Badge, Tag/Chip, Avatar, List, 
   Stat Tile, Empty State, Skeleton, Tooltip.
5. Navigation — Sidebar, Navbar, Breadcrumb, Tabs, Pagination, Stepper, 
   Command, Menu, Context Menu.
6. Feedback & Overlay — Alert, Banner, Toast, Dialog, Drawer/Sheet, Popover, 
   Hover Card, Progress, Spinner.
7. Layout — Container, Grid, Stack, Separator, Accordion, Collapsible, 
   Resizable Panels, Scroll Area, Aspect Ratio.

Rules:
- Category dividers should render as small-caps muted labels above each group 
  (shadcn style). Use a single reusable <NavSection title> wrapper.
- Existing pages get their routes preserved — only the nav structure changes. 
  Don't break any existing URLs.
- For entries in the plan that don't yet have a page (Tag/Chip, List, Stat Tile, 
  Empty State, Banner, Accessibility), create stub routes pointing to a shared 
  "Coming soon" placeholder component. Don't build the real pages yet.
- Consolidations: Sonner → Toast (single page), Alert Dialog → fold under Dialog 
  page as a variant section, Toggle Group → single Toggle page.

Verification: run the dev server, click every nav entry, confirm no 404s. Show 
me a screenshot or the new nav file paths.
```

---

## Step 3 — Lock the canonical component page template using Button

```
Read /DESIGN_SYSTEM_PLAN.md, section "Component Page Template".

Goal: make the Button page the canonical example of the 8-section template. 
Every future component page will be cloned from this structure.

The 8 sections, in order:
1. Title + one-line description
2. Live preview (interactive, respects current theme)
3. Installation snippet — single copy-paste import line
4. Usage — minimum viable code snippet
5. Examples — one card per variant/state (default, primary, secondary, ghost, 
   destructive, with icon, loading, disabled)
6. API / Props table — columns: name, type, default, description
7. Accessibility notes — keyboard, ARIA, focus behaviour
8. Related components — cross-links to Input, Form, Dialog, etc.

Extract reusable layout primitives:
- <ComponentPage> wrapping the whole page
- <PreviewBlock> for live previews
- <CodeBlock> with a Copy button (use Shiki or your existing highlighter)
- <PropsTable> for the API section
- <RelatedLinks> for the footer cross-links

Apply these to the Button page. Don't touch other component pages yet — they'll 
be migrated in later steps.

Verification: open /buttons (or whatever the route is), confirm all 8 sections 
render, copy button works on every code block, dark mode looks right.
```

---

## Step 4 — Migrate the top 10 component pages onto the template

```
Read /DESIGN_SYSTEM_PLAN.md and look at the Button page (the template lockdown 
from the previous step).

Migrate these 10 component pages onto the same 8-section template, in this 
order: Input, Select, Card, Table, Dialog, Tabs, Toast, Form, Sidebar, Tooltip.

For each page:
- Use the same <ComponentPage>, <PreviewBlock>, <CodeBlock>, <PropsTable>, 
  <RelatedLinks> primitives from the Button page.
- Preserve any existing live preview code — don't regress what's already working.
- If a section has no content yet (e.g. some pages may lack a real Props table), 
  put a TODO note in that section. Don't leave it blank.
- Examples section: aim for 4–8 variant cards per component. Use realistic 
  CRM-flavoured content where possible (ticket statuses, customer names, etc.).

Verification: every migrated page has the 8 sections in the same order, the 
nav still works, dark mode is consistent.
```

---

## Step 5 — Foundations audit + add the Accessibility page

```
Read /DESIGN_SYSTEM_PLAN.md, section "Foundations".

Audit the existing Foundations pages: Colors, Typography, Spacing, Iconography, 
Elevation & Shadows, Border Radius, Motion. For each:
- Confirm every token is defined as a CSS variable for both light and dark modes.
- Add a copy-to-clipboard button next to every token swatch / value.
- Add a "How to override" section showing the CSS-variable override pattern for 
  consuming apps.

Build a new Foundations page: Accessibility. Sections:
1. Keyboard — tab order, focus rings, common shortcuts.
2. ARIA — when to add roles, labels, descriptions; common mistakes.
3. Color contrast — WCAG AA minimums, our token contrast pairs, how to check.
4. Motion — prefers-reduced-motion handling.
5. Touch targets — minimum sizes for mobile and dense desktop modes.
6. Testing checklist — short list devs run before merging a component.

Cross-link every component page to the relevant Foundations entry ("Uses tokens 
from: Colors, Spacing"). Put this as a small footer row on each component page.

Verification: theming a single CSS variable changes the whole library; the 
new Accessibility page renders and is reachable from the side nav.
```

---

## Step 6 — Build the 5 new component pages

```
Read /DESIGN_SYSTEM_PLAN.md, sections "What to Add" and "Component Page Template".

Build real pages (replacing the placeholders from Step 2) for these 5 components:

1. Stat Tile / KPI Tile — number + label + delta indicator. Variants: positive 
   delta, negative delta, neutral, with sparkline, with icon, loading.
2. Empty State — illustration slot + headline + description + primary action. 
   Variants: no results, no data yet, error, permission denied.
3. Banner — page-level alert above the main content. Variants: info, success, 
   warning, error; dismissible vs. persistent.
4. List — vertical list of items with avatar/icon + primary + secondary text + 
   trailing action. Variants: dense, comfortable, with dividers, interactive (hover).
5. Tag / Chip — like Badge but interactive (clickable, removable). Variants: 
   default, selected, with icon, removable (with x button).

Each page must follow the 8-section template from Step 3. Use realistic CRM 
examples in the previews (open tickets, SLA breach, customer tier, etc.).

Verification: all 5 pages appear in their categories (Data Display for Stat 
Tile/Empty State/List/Tag, Feedback & Overlay for Banner), no placeholders 
remain, dark mode works.
```

---

## Step 7 — Migrate the remaining component pages onto the template

```
Read /DESIGN_SYSTEM_PLAN.md. From the Button page, see the 8-section template.

Migrate every remaining component page onto the template. This is the cleanup 
pass — top 10 was done in Step 4; everything else gets done now.

Components to migrate: Textarea, Label, Combobox, Checkbox, Radio Group, Switch, 
Slider, Date Picker, Input OTP, File Upload, Data Table, Badge, Avatar, 
Skeleton, Navbar, Breadcrumb, Pagination, Stepper, Command, Menu, Context Menu, 
Drawer/Sheet, Popover, Hover Card, Alert, Progress, Spinner, Container, Grid, 
Stack, Separator, Accordion, Collapsible, Resizable, Scroll Area, Aspect Ratio.

Rules same as Step 4: preserve existing preview code, use TODO notes for 
sections that lack content, prefer CRM-flavoured examples.

Also in this pass:
- Remove the Carousel page if no current product screen uses it.
- Remove the Menubar page (Dropdown + Command cover it).
- Merge Toggle Group into the Toggle page.

Verification: every nav entry leads to a page that has all 8 sections in 
order. No TODO sections in the top 15 most-used components.
```

---

## Step 8 — Build 5 Patterns / Blocks

```
Read /DESIGN_SYSTEM_PLAN.md, section "Patterns (Blocks)".

Add a new top-level nav category "Patterns" (or surface the existing one). 
Build 5 full-screen example blocks that compose the primitives into real CRM 
screens. Each one must be copy-pasteable — devs grab the whole snippet and 
adapt it.

1. Login — email + password + SSO buttons + forgot link + brand panel.
2. Dashboard — sidebar + topbar + 4 Stat Tiles + 1 chart + recent activity list.
3. Customer Profile — header with avatar/badges + tabbed sections (Overview, 
   Tickets, Notes, Files) + sidebar with key facts.
4. Ticket / Case Detail — header with status + assignee + SLA + tabs for 
   conversation/details/related + activity timeline.
5. Settings — sidebar of section links + form section with grouped inputs + 
   save/discard bar.

Each pattern page has:
- Live preview (full viewport iframe or sized container)
- Full source code, copy-pasteable
- "Used components" list with links back to component pages

Verification: each pattern renders end-to-end with no broken styles in light 
and dark mode; the "Used components" links all resolve.
```

---

## Step 9 — Add docs search and polish

```
Read /DESIGN_SYSTEM_PLAN.md.

Add static site search across all docs pages. Use Pagefind (free, static, 
zero-config) for v1.

Tasks:
1. Integrate Pagefind into the Vite build pipeline (post-build indexing step).
2. Add a search input in the top of the side nav with cmd/ctrl-K shortcut.
3. Use the Command component from the library for the search palette UI — 
   dogfooding.
4. Index page titles, headings, code-snippet content, and section text.
5. Results should show category + page title + snippet, with keyboard navigation.

Also in this pass — polish items:
- Add a "Copy as Markdown" button on each component page so devs can paste a 
  page into a PR description.
- Add prev/next page links at the bottom of every page (use nav order).
- Add a footer with version number, GitHub link, last updated date.

Verification: cmd-K opens search; typing finds components, foundations, and 
patterns; arrow-key + enter navigates; mobile layout still works.
```

---

## Step 10 — Versioning, changelog, contributing, launch v1

```
Read /DESIGN_SYSTEM_PLAN.md.

Final pass before launch.

Tasks:
1. Set up Changesets (or your preferred versioning tool) to manage version 
   bumps and changelogs.
2. Cut v1.0.0. Write the Changelog page with a clean v1.0.0 entry listing 
   every category and the components shipped.
3. Write the Resources pages:
   - Figma library link (placeholder URL if not ready)
   - Component checklist — what "done" means before a component ships 
     (template sections present, dark mode, a11y, props table, examples)
   - Versioning policy — semver rules for the library
   - FAQ — 5–10 entries devs will actually ask
4. Write a one-page Contributing guide even though it's TBD whether external 
   contributions are allowed — devs will want it. Cover: how to file a 
   request, naming conventions, the page template, accessibility bar.
5. Add a launch banner to the home page announcing v1.0.0.
6. Produce a one-page launch note (Markdown) summarising what's available 
   and how to consume it — save to /docs/LAUNCH_NOTE.md. This is what gets 
   sent to product teams.

Verification: visit every category, click every page, confirm the v1.0.0 
changelog entry is accurate, run a Lighthouse pass and fix any score below 
90 on Performance / Accessibility / Best Practices.
```

---

## Tips for running these

- **Run them in order.** Each step assumes the previous one is done.
- **Review between steps.** Eyeball the diff Claude Code produces before approving.
- **If a step is too large**, ask Claude Code to split it into sub-steps and confirm before proceeding.
- **Keep `DESIGN_SYSTEM_PLAN.md` in the repo root** — every prompt references it.
- **Commit after each step** with a clear message (`feat(ds): step 2 — categorised side nav`).
