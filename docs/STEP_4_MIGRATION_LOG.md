# Step 4 — Migration Log

10 component docs pages migrated onto the canonical 8-section template ([STEP_3_TEMPLATE.md](./STEP_3_TEMPLATE.md)). Every page uses the same helpers from `src/components/docs/`, pulls strings through `src/locales/en.json` under `docs.<component>.*`, and resolves at the same URL it did before Step 4.

## Per-page summary

| # | Component | Page file | Route | Existing demo content preserved? | New examples added | TODO sections | Notes |
|---|---|---|---|---|---|---|---|
| 1 | **Input** | [`input-page.tsx`](../src/pages/input-page.tsx) | `/forms/input` | Partial — kept Default / Disabled / Password (visibility toggle) / Search-with-icon. Did NOT carry over PhoneInput, InputOTP, FileInput, MultiFileInput, date / datetime-local, or leading-text patterns (each belongs on its own primitive page later). | With Label, With Helper Text, With Error State, Read-only. CRM examples: REQ-2025-0142, Emirates ID format, customer email validation. | None. | Password visibility toggle is implemented locally (useState + button overlay) rather than via InputGroup, matching what's shown in the docs snippet for clarity. The existing forms-page section="input" still routes? — **No, replaced**. Old demo remains as dead code inside `forms-page.tsx`; Step 7 cleanup will remove it. |
| 2 | **Select** | [`select-page.tsx`](../src/pages/select-page.tsx) | `/forms/select` | Partial — adapted the Status filter idea ("All / New / Under investigation / Pending approval / Completed") and the disabled state. Did NOT carry over the trailing-dropdown Amount + currency pattern (that's an InputGroup composition, belongs on the Input docs). | Grouped options (My queues / Team queues), With Icons (priority indicators), Controlled. | None. | Existing `forms-page` section="select" is dead code after this — same Step 7 cleanup. |
| 3 | **Card** | [`card-page.tsx`](../src/pages/card-page.tsx) | `/cards` | None — the old `cards-page.tsx` was a dashboard, not a docs page. Wrote the docs page from scratch using the Card primitive in [`src/components/ui/card.tsx`](../src/components/ui/card.tsx). | Basic, Header + Footer, With CardAction, With Avatar, Hoverable (interactive), Stat Tile pattern. All CRM-flavoured (REQ-2025-0142, customer profiles, KPI tile). | None. | Old `cards-page.tsx` file still exists but is no longer routed (App.tsx now uses the new `card-page.tsx`). Step 7 should delete `cards-page.tsx`. |
| 4 | **Tabs** | [`tabs-page.tsx`](../src/pages/tabs-page.tsx) | `/ui/tabs` | Yes — kept the Overview / Documents / Activity ticket-detail pattern and the controlled-tabs example. | Line/underline variant, Vertical orientation, With Icons, With Badges (open count / overdue count). | None. | Tabs uses `@base-ui/react`, not Radix — note the `onValueChange` signature accepts an unknown that needs casting to string in the controlled example. |
| 5 | **Tooltip** | [`tooltip-page.tsx`](../src/pages/tooltip-page.tsx) | `/ui/tooltip` | N/A — was a `<ComingSoon />` stub. | Built from scratch: Placement (top/right/bottom/left), On Icon Buttons (Copy/Save/Delete), Rich content (SLA status with title + description), Custom Delay. | None. | All previews share a single `<TooltipProvider>` around the examples grid to keep delay timing consistent. Replaced stub route in App.tsx. |
| 6 | **Toast** | [`toast-page.tsx`](../src/pages/toast-page.tsx) | `/ui/toast` | Yes — preserved success / error / warning / info / default / with-action examples and the snippet pattern. | Promise (loading → success/error with `fakeSubmit` helper). | None. | Sonner toast.success / toast.error etc. are called directly inline (the existing app's `<Toaster />` mounted in App.tsx surfaces them). Buttons use realistic CRM copy. |
| 7 | **Dialog** | [`dialog-page.tsx`](../src/pages/dialog-page.tsx) | `/ui/modal-popups` | Yes — preserved Basic, Form (Add note pattern), and Size (max-w-2xl) examples. | **Destructive (Alert Dialog pattern)** — explicit Step 2 consolidation, rendered with red icon + filledDestructive button + no close X. Scrollable content. | None. | DialogTrigger / DialogClose use the `render` prop (not `asChild`). Documented this explicitly in the props table and usage snippet. URL kept as `/ui/modal-popups` per the "preserve URLs" rule even though the nav label is now "Dialog". |
| 8 | **Sidebar** | [`sidebar-page.tsx`](../src/pages/sidebar-page.tsx) | `/ui/sidebar` | N/A — was a `<ComingSoon />` stub. The live app uses Sidebar but doesn't preview it. | Scaled-down `SidebarShell` mock components reproduce the visual anatomy inside PreviewBlocks. Variants: Default, Collapsible (expanded + collapsed side-by-side), Sections + Dividers, Nested items, Badges + Footer, Active state. Snippets reference the real Sidebar API. | None — but a **caveat** is documented inline: the previews are styled mocks, not live instances of the real `Sidebar` component (which uses fixed positioning + a SidebarProvider context that fights the docs layout). The user explicitly chose this approach in the pre-flight question. | The real component lives in `src/components/ui/sidebar.tsx` and remains untouched. The Props table covers the real API. |
| 9 | **Form** | [`form-page.tsx`](../src/pages/form-page.tsx) | `/forms/form` | None — the old `forms-page.tsx` section="form" was a 2-column layout demo with no validation. | Built from scratch using **react-hook-form + zod + Field helpers** (the project's actual pattern — there is no `<Form>` wrapper component). Live, working examples: Simple (name + email with Zod), Validation (Emirates ID regex, mode="onBlur"), Async Submit (isSubmitting + spinner), Conditional Fields (priority → escalation reason). | None. | **Honest about the missing wrapper**: the page description and installation section explicitly say "There is no `<Form>` wrapper component — compose primitives directly." The user opted not to author a wrapper in this step. The page is fully functional and demonstrates the actual usage pattern. |
| 10 | **Table** | [`table-page.tsx`](../src/pages/table-page.tsx) | `/ui/table` | None — the old `ui-components-page.tsx` section="table" demoed the full `DataTable` (sortable, filterable). This new page is for the **basic primitive only**, per the brief. | Built from scratch: Basic, Striped, Row Selection (Checkbox + data-state="selected" + indeterminate), Sticky Header, Empty State, Row Actions. All examples use a shared `TICKETS` array of CRM tickets. | None. | **Prerequisite change**: exported `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` from [`data-table.tsx`](../src/components/ui/data-table.tsx) (they existed as private functions). The user opted into this in the pre-flight question. Step 7 should consider moving these into their own `src/components/ui/table.tsx` and re-exporting from `data-table.tsx` so the import path matches the primitive name. |

## Quirks worth flagging for Step 7's cleanup pass

1. **Dead code in dispatch pages.** `forms-page.tsx` (section="form" / "input" / "select") and `ui-components-page.tsx` (section="tabs" / "toast" / "modal-popups" / "table") still contain demo JSX for the migrated sections — those code paths are no longer routed. Removing them shrinks the bundle and avoids confusion.
2. **`cards-page.tsx` is orphaned.** Replaced by `card-page.tsx` in App.tsx. The old file is no longer imported anywhere.
3. **Table primitives live in `data-table.tsx`.** Functional but the import path is awkward (`from "@/components/ui/data-table"` to get the basic `Table`). Consider splitting into `src/components/ui/table.tsx` and re-exporting from `data-table.tsx`.
4. **No Form wrapper.** The pattern works but every form rewires the same useForm + handleSubmit + register boilerplate. A 30-line `<Form>` wrapper exporting `FormField` / `FormControl` (like shadcn) would simplify every example in `form-page.tsx` and any future form-heavy pattern pages.
5. **Sidebar previews are mocks.** If the real Sidebar grows a `bounded` variant that doesn't require fixed positioning, those previews could be upgraded to live instances of the real component.
6. **Tooltip page wraps every example in its own TooltipProvider.** Could be hoisted to the page level (already done for the Examples section, but the Preview section instantiates a second provider). Tiny duplication, but worth noting.
7. **Toast `position` prop documented but unused in examples.** The Toaster is mounted globally; per-toast position overrides are rare but valid. Worth a live demo if Step 6 adds an "advanced patterns" section.
8. **i18n: ar.json not mirrored.** The new `docs.*` namespace was added to `en.json` only. i18next falls back to English for Arabic users; Step 7 should mirror the keys.
9. **Card page hover-state preview** uses `transition-shadow hover:shadow-lg`. Works visually but the Card's existing `<span>` decorator absolute-positioned on top may need a stacking-context tweak if shadows are clipped — keep an eye on it in the cleanup pass.
10. **Sidebar page renders the active-state preview with a string literal containing escaped quotes** (`isActive on \"Customers\"` was the original write; cleaned to plain `"Customers"` after a tsc fix). No issue now but worth a lint rule to forbid escaped quotes inside JSX text.

## Verification

- `npx tsc -b` — clean.
- Routes smoke-tested with curl:
  ```
  /forms/input    200
  /forms/select   200
  /cards          200
  /ui/tabs        200
  /ui/tooltip     200
  /ui/toast       200
  /ui/modal-popups 200
  /ui/sidebar     200
  /forms/form     200
  /ui/table       200
  ```
- Manual click-through and dark-mode toggle still need to be done by the user (no screenshot tool from this environment).

## Files touched

**New:**
- `src/pages/input-page.tsx`
- `src/pages/select-page.tsx`
- `src/pages/card-page.tsx`
- `src/pages/tabs-page.tsx`
- `src/pages/tooltip-page.tsx`
- `src/pages/toast-page.tsx`
- `src/pages/dialog-page.tsx`
- `src/pages/sidebar-page.tsx`
- `src/pages/form-page.tsx`
- `src/pages/table-page.tsx`
- `docs/STEP_4_MIGRATION_LOG.md` (this file)

**Modified:**
- `src/App.tsx` — routes 10 components to their new dedicated pages
- `src/locales/en.json` — 10 new `docs.*` namespaces
- `src/components/ui/data-table.tsx` — exported the basic Table primitives

**Untouched (per the rules):**
- `src/components/docs/*` — helpers from Step 3
- Other component pages not in the batch (`/forms/checkbox`, `/forms/radio`, `/ui/badges`, etc.) — still routed to the dispatch pages
