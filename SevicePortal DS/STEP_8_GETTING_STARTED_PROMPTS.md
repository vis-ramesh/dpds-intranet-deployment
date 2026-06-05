# Step 8 — Getting Started build-out (prompts for Claude Code)

Six self-contained prompts. Run **one at a time**, share the result, then move to the next. Each prompt is written for a fresh Claude Code session with no prior context.

Order:

1. **8.1** — Discovery (classify current state, no changes)
2. **8.2** — Build Introduction page
3. **8.3** — Build Project Structure page
4. **8.4** — Build Theming page
5. **8.5** — Build Dark Mode page
6. **8.6** — Typography cut + sidebar reorder + changelog + final verify

---

## Step 8.1 — Getting Started discovery

You're picking up a Service Portal Design System docs site (Vite + React + TS + Tailwind, shadcn-style).

Goal: classify the current state of the 5 Getting Started pages so we can scope the build. No code changes in this step.

### Pre-flight read

- `src/components/app-sidebar.tsx`
- `src/App.tsx`
- `src/components/ui/coming-soon.tsx`
- `src/locales/en.json` — skim the `docs.*` and `foundations.*` namespaces (this is the i18n convention)
- `src/components/docs/index.ts` — barrel of doc page helpers

### Task

For each route, find its source file and classify as **STUB / PARTIAL / DONE**:

- `/docs/introduction`
- `/docs/project-structure`
- `/docs/theming`
- `/docs/dark-mode`
- `/docs/typography`

Write `docs/STEP_8_DISCOVERY.md` with one row per page:

- Route
- Source file path
- LOC count
- Uses `<ComingSoon>`? (yes/no)
- Has real prose? (yes/no/partial)
- Has i18n keys? (yes/no/partial)
- Verdict (STUB / PARTIAL / DONE)
- Planned action (Build full / Build remaining sections / Cut / Skip)

Also include in the doc:

- Whether `src/components/docs/` has prose-page helpers (something like `<DocsPage>`, `<Prose>`, `<DocSection>`) or only the component-page helpers (`<ComponentPage>`, etc.). If prose helpers are missing, flag it — we will reuse existing shells rather than build new ones in this phase.
- Whether a `<TokenTable>` or similar token-rendering component exists in `src/components/docs/`.
- Whether `src/lib/use-theme.ts` or `src/components/theme-toggle.tsx` (or equivalent) exists — needed for the Dark Mode page.

Do not modify any source files. Commit only `docs/STEP_8_DISCOVERY.md`.

---

## Step 8.2 — Build the Introduction page

Pre-req: Step 8.1 done, classification in `docs/STEP_8_DISCOVERY.md`.

### Pre-flight read

- `docs/STEP_8_DISCOVERY.md` — your own classification
- The current Introduction page file (per discovery)
- `src/pages/buttons-page.tsx` — canonical doc page template
- One Foundation page (e.g. Colors) — prose conventions
- `src/locales/en.json` — i18n namespace patterns

If the codebase doesn't have prose-page helpers, reuse the most appropriate existing shells (e.g. `<ComponentPage>` skeleton minus Preview, or compose with `<Section>`). **Do not invent a new abstraction in this step** — flag it in the migration log if you think one is needed.

### Build Introduction (~200 lines)

Sections (h2):

1. **Hero** — title "Service Portal Design System", one-line tagline, small "Internal · v0.x" badge.
2. **What is this** — 2–3 paragraphs. A shadcn-style component library for the Service Portal CRM, consumed by all internal product teams. Single source of truth for UI primitives, tokens, and patterns.
3. **Who it's for** — Product engineers building screens inside Service Portal apps. Not for external customers, not for marketing surfaces.
4. **What's in scope** — Components, Foundations, Patterns. One sentence each.
5. **What's NOT in scope** — Full app scaffolds, marketing pages, customer-facing branded sites.
6. **Where to start** — three cards (use existing `Card` primitive) linking to: Foundations → Colors, Components → Button, Patterns → Login (mark "coming soon" if patterns nav target doesn't exist yet).
7. **Conventions** — brief: component pages follow Preview / Usage / Examples / API / a11y / Related. Foundation pages follow Overview / Tokens / Tailwind mapping / Usage rules / Override.

### i18n discipline

All strings under `docs.gettingStarted.introduction.*`. No hardcoded English in JSX (single-word ARIA labels excepted).

### Verify

- Page renders clean in light + dark mode.
- All three "Where to start" cards link to real existing routes (verify each href resolves).
- i18n grep on the new file finds no plain-text English (ARIA labels excepted).

### Log

Append to `docs/STEP_8_MIGRATION_LOG.md` (create if missing):

- LOC, files modified/created
- Any deviations from this brief + reasoning
- One screenshot spot-check suggestion

Commit on a clean build.

---

## Step 8.3 — Build the Project Structure page

Pre-req: Step 8.2 done.

### Pre-flight read

- The current Project Structure page file
- The newly-built Introduction page from 8.2 — match its prose-page style

### Build Project Structure (~150 lines)

Two-part page.

**Part A — This repo's layout** (for contributors)

Render a file tree via `<CodeBlock language="bash">`:

```
src/
  components/
    ui/          # primitive components (Button, Input, ...)
    docs/        # doc-site helpers (ComponentPage, CodeBlock, ...)
    app-sidebar.tsx
  pages/         # one page per route
  patterns/      # full-screen pattern compositions
  locales/       # i18n strings (en.json, ...)
  data/          # static data (changelog.json, ...)
  lib/           # utilities (cn, ...)
```

Short annotation paragraph under each top-level folder: what lives there, what doesn't.

**Part B — Recommended layout for consuming apps**

File tree:

```
src/
  components/
    ui/          # imports from @serviceportal/ui
    features/    # app-specific composite components
  pages/         # app routes
  hooks/         # app-specific hooks
  lib/           # app utilities
```

Plus one paragraph on the **wrap, don't fork** principle — extend DS components by composition, not by editing source.

### i18n discipline

All strings under `docs.gettingStarted.projectStructure.*`.

### Verify + log

Same pattern as 8.2. Append to `docs/STEP_8_MIGRATION_LOG.md`. Commit on a clean build.

---

## Step 8.4 — Build the Theming page

Pre-req: Step 8.3 done.

### Pre-flight read

- Current Theming page file
- `src/index.css` — current CSS variables for light + dark
- `src/components/docs/` barrel — check for a `<TokenTable>` or similar token-rendering component (your 8.1 discovery flagged this)

### Build Theming (~250 lines)

Sections:

1. **Token architecture** — CSS variables as the single source of truth; every primitive reads from these.
2. **Token layers** — semantic tokens (`--background`, `--foreground`, `--primary`, `--border`, `--ring`, `--destructive`, `--muted`) sit on top of palette tokens (`--neutral-50` … `--neutral-950`). **Devs override the semantic layer, not the palette.**
3. **Light + Dark token tables** — render side-by-side. **If `<TokenTable>` exists, reuse it. If not, render plain semantic HTML tables — do not invent a new abstraction in this step.** Flag in log if you think one is warranted.
4. **Overriding tokens** — code example:
   ```css
   .brand-acme {
     --primary: 220 90% 50%;
     --primary-foreground: 0 0% 100%;
   }
   ```
   Then `class="brand-acme"` on `<html>` or a subtree.
5. **Multi-tenant theming** — short note: brands compose with dark mode (`.brand-acme.dark { … }` works).
6. **Related** — Foundations → Colors, Foundations → Typography, Dark Mode.

### i18n discipline

`docs.gettingStarted.theming.*`.

### Verify + log

Same pattern. Commit on a clean build.

---

## Step 8.5 — Build the Dark Mode page

Pre-req: Step 8.4 done.

### Pre-flight read

- Current Dark Mode page file
- The existing theme hook / toggle (per 8.1 discovery — likely `src/lib/use-theme.ts` or `src/components/theme-toggle.tsx`). **Document whatever the code actually does — do not invent.**

### Build Dark Mode (~150 lines)

Sections:

1. **How it works** — `.dark` class on `<html>` (`document.documentElement.classList`); every CSS variable swaps to its dark value.
2. **Wiring the toggle** — show the actual hook usage from the codebase:
   ```tsx
   const { theme, setTheme } = useTheme()
   <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
     Toggle theme
   </Button>
   ```
   If the hook signature differs, document the real one.
3. **Persistence** — localStorage key + system-preference fallback (whatever the current implementation does).
4. **Tokens that swap** — short paragraph, link to Theming.
5. **Caveats** — flash-of-incorrect-theme on cold load; suggested mitigation (early inline script in `index.html`).
6. **Related** — Theming, Foundations → Colors.

### i18n discipline

`docs.gettingStarted.darkMode.*`.

### Verify + log

Toggle dark mode in the preview — page itself must respond correctly. Commit on a clean build.

---

## Step 8.6 — Typography cut + sidebar + changelog + final verify

Pre-req: Steps 8.2–8.5 done.

### Pre-flight read

- `src/components/app-sidebar.tsx`
- `src/App.tsx`
- `src/data/changelog.json`
- The Typography (Getting Started) page file

### Task A — Cut the Getting Started Typography page

1. Remove the `/docs/typography` route element from `src/App.tsx`.
2. Add redirect: `<Route path="/docs/typography" element={<Navigate to="/foundations/typography" replace />} />`.
3. Remove the Typography entry from the Getting Started section in `src/components/app-sidebar.tsx`.
4. **Before deleting the stub page file**: grep for imports across the repo. If unreferenced, delete. If referenced anywhere, stop and report.
5. Remove orphan i18n keys under `docs.gettingStarted.typography.*` if present.

### Task B — Sidebar nav order

After cleanup, Getting Started in `app-sidebar.tsx` should read, in order:

1. Introduction
2. Project Structure
3. Theming
4. Dark Mode
5. Changelog (leave untouched if it exists; flag if missing — do not build)

Confirm no leftover "Installation" entry.

### Task C — Changelog entry

Prepend to `src/data/changelog.json`:

```json
{
  "version": "0.x.0",
  "date": "<today's ISO date>",
  "title": "Getting Started complete",
  "entries": [
    "Added Introduction, Project Structure, Theming, Dark Mode pages",
    "Cut duplicate Typography page from Getting Started (now redirects to Foundations → Typography)"
  ]
}
```

### Task D — Final verify

- `/docs/typography` redirects to `/foundations/typography`.
- All 4 new Getting Started pages render in light + dark with no console errors.
- Sidebar Getting Started order matches Task B.
- i18n grep on all 4 new page files: no plain-text English (ARIA labels excepted).

### Log

Close `docs/STEP_8_MIGRATION_LOG.md` with a final summary:

- Pages built (LOC each)
- Files created / modified / deleted
- All deviations + reasoning
- Outstanding follow-ups (if any) for Step 9

Commit on a clean build.
