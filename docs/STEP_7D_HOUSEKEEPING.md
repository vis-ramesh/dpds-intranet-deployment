# Step 7D — Housekeeping

Tight cleanup pass on 3 items from the post-Step-7C backlog. **Item 2 was deferred after Phase-1 analysis** — see below.

## Item 1 — Dead `<UiComponentsPage section="…" />` JSX cleanup ✅

Per Step 7B's migration log, 4 sections inside [src/pages/ui-components-page.tsx](../src/pages/ui-components-page.tsx) were reachable only via direct import — their `/ui/*` routes had been rewired to dedicated pages in Step 7B but the dispatch JSX was never deleted.

**Removed:**
- 4 section JSX blocks (`badges`, `breadcrumb`, `stepper`, `navigation-menu`) — 273 lines
- 4 dead union members from the `UiSection` type
- 4 unused imports: `Badge`, `Stepper`, `Breadcrumb*`, `NavigationMenu*`
- `InteractiveStepper` helper (consumed only by the deleted stepper section)
- `badgeProps` + `stepperProps` PropRow constants (consumed only by the deleted sections)

**Net diff:** `-316 lines, +3 lines` in one file.

**Preserved:** `UiComponentsPage` itself stays alive because 7 sections still route through it — `dropdown-menu`, `profile-switcher`, `alert`, `drawer`, `progress-bar`, `accordion`, `swiper`. None have dedicated docs pages yet. Deleting the dispatch component would break those routes.

**Verified:** All 11 routes (7 still-dispatched + 4 rewired) return HTTP 200; `tsc -b` clean.

## Item 2 — Progress Tracker → Stepper consolidation 🚩 DEFERRED

**Phase-1 discovery surfaced a hard blocker.** Per the brief: *"If a site is using a feature Progress Tracker has but Stepper doesn't, STOP and tell me."*

Four active import sites:
1. [src/pages/confirmation-page.tsx](../src/pages/confirmation-page.tsx)
2. [src/pages/service-status-page.tsx](../src/pages/service-status-page.tsx)
3. [src/pages/ui-components-page.tsx](../src/pages/ui-components-page.tsx) (the `progress-tracker` documentation section)
4. [src/pages/inquiry-detail-page.tsx](../src/pages/inquiry-detail-page.tsx)

**Every single site uses features Stepper doesn't have:**

| Feature | Stepper | ProgressTracker |
|---|---|---|
| Layout | Horizontal only | Vertical only |
| Per-item content slots (`<ProgressTrackerContent>`) | ❌ items are title-strings | ✅ rich JSX (links, descriptions, action buttons) |
| Header slot (`<ProgressTrackerHeader>`) | ❌ | ✅ |
| `statusLabel` prop ("Completed", "Pending review") | ❌ | ✅ |
| `"in-progress"` status | ❌ uses `"active"` | ✅ |

A real consolidation requires extending Stepper to support vertical orientation, composition slots, statusLabel, and a `"in-progress"` status alias. That's a primitive rebuild — the original brief explicitly listed it as v1.1 backlog ("Stepper primitive extensions — out of scope").

**Decision:** Keep Progress Tracker as a separate primitive. The Step 2 consolidation stands at the **nav level only** — `/ui/progress-tracker → /ui/stepper` redirect remains. [STEP_2_DECISIONS.md](./STEP_2_DECISIONS.md) updated to reflect this outcome.

## Item 3 — Colors + Iconography i18n drift fix ✅

The brief named the Colors "Tokens in context" card as having hardcoded English. Spot-check found the same drift on Iconography "Common patterns" demos.

**Moved to en.json:**
- `foundations.colors.inContext.demo.{label, title, body, primaryAction, secondaryAction}` — the notification-card example
- `foundations.iconography.patterns.demo.{exportLabel, statusLabel, searchPlaceholder}` — the three rendered demos inside the patterns grid

**Intentionally left as literal English:**
- Code-snippet strings inside `<code>{`...`}</code>` blocks — these are copy-paste reference material for consumers, not page copy. Translating them would make the snippets non-functional.

**Spot-checked all 8 foundation pages** for the same drift. Findings:
- Typography, Spacing, Elevation, Radius, Motion, Accessibility — no user-facing prose drift.
- All foundation pages have routine **table column headers** hardcoded ("Utility", "When to use", "Tailwind", "Preview", "Pixels", "Formula", "What it sets"). These were considered out of scope — they're table chrome, present across many pages, and a separate broader i18n pass would be cleaner than spot-fixing them here. **Flagged for a future "i18n parity" pass.**

## Deferred items from the original housekeeping list

These were explicitly out of scope per the brief; documenting where they'll be tackled:

| Item | Where |
|---|---|
| Pagination primitive integration with `data-table.tsx` | Step 9 polish |
| DropdownMenu docs page | Navigation category sweep (future) |
| Stepper primitive extensions (vertical / clickable / error state) | v1.1 backlog |
| Foundation page table-header i18n | Future "i18n parity" pass (now logged here as well as in Step 7D scope) |
| Progress Tracker primitive consolidation | Reopened when/if Stepper gets its v1.1 extensions |

## Verification

- ✅ `npx tsc -b` clean after each item.
- ✅ All 11 `<UiComponentsPage>`-touched routes return HTTP 200.
- ✅ `/foundations/colors` + `/foundations/iconography` return 200 with new i18n keys.
- ✅ No `<UiComponentsPage section="badges|breadcrumb|stepper|navigation-menu" />` JSX remains anywhere in the codebase.
- ✅ Colors "Tokens in context" card has zero hardcoded English in the rendered JSX (verified by grep — only matches that remain are inside code-snippet template strings).

## Commits

1. `Step 7D #1 — remove dead UiComponentsPage section blocks` (1 file, -316/+3)
2. `Step 7D #3 — Colors + Iconography i18n drift fix` (3 files, +22/-10)
3. *This log + STEP_2 update + changelog entry* (this commit)

## Manual checks worth running (your side)

- [ ] Hit each of the 11 `<UiComponentsPage>`-driven routes and click around — confirm content still renders for the 7 still-dispatched and the 4 swapped routes.
- [ ] Visit `/foundations/colors` and confirm the notification card renders correctly with the new i18n strings (English copy unchanged).
- [ ] If you have a non-English locale: change locale and confirm the card translates. Otherwise grep `src/pages/colors-page.tsx` and `src/pages/iconography-page.tsx` for `"Notification"` / `"Export"` / etc. — only code-snippet template literals should match.
