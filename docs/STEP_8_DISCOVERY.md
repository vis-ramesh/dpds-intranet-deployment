# Step 8 — Getting Started Discovery

Phase 1 (discovery only — no code changes). Goal: classify the 5 Getting Started routes and surface the infra gaps before scoping the build.

## Headline

**All 5 routes are STUB.** No dedicated source file exists for any of them — each is wired directly to `<ComingSoon />` in `src/App.tsx`. No content i18n keys exist either (only sidebar labels).

The bigger finding: `src/components/docs/` is **component-/foundation-/pattern-page focused** — there are no prose-page helpers (`<DocsPage>`, `<Prose>`, `<DocSection>`). The Getting Started pages will need at least one new shell helper before Phase 2 builds anything, or we explicitly reuse `<ComponentPage>` / `<FoundationPage>` and accept the visual mismatch.

## Per-route classification

| Route | Source file | LOC | Uses `<ComingSoon>`? | Real prose? | i18n keys? | Verdict | Planned action |
|---|---|---|---|---|---|---|---|
| `/docs/introduction` | *(none — inline at [src/App.tsx:215](../src/App.tsx#L215))* | 0 | yes | no | partial (sidebar label only) | **STUB** | Build full |
| `/docs/project-structure` | *(none — inline at [src/App.tsx:216](../src/App.tsx#L216))* | 0 | yes | no | partial (sidebar label only) | **STUB** | Build full |
| `/docs/theming` | *(none — inline at [src/App.tsx:217](../src/App.tsx#L217))* | 0 | yes | no | partial (sidebar label only) | **STUB** | Build full |
| `/docs/dark-mode` | *(none — inline at [src/App.tsx:218](../src/App.tsx#L218))* | 0 | yes | no | partial (sidebar label only) | **STUB** | Build full |
| `/docs/typography` | *(none — inline at [src/App.tsx:219](../src/App.tsx#L219))* | 0 | yes | no | partial (sidebar label only) | **STUB** | Build full |

Notes on the table:

- "LOC" measures the page's own source file. All five are wired as `<Route … element={<ComingSoon />} />` with no per-page file, so each is 0.
- "i18n keys = partial" means the route has a sidebar **label** in `en.json` (`sidebar.introduction`, `sidebar.projectStructure`, `sidebar.theming`, `sidebar.darkMode`, `sidebar.gsTypography` — lines 69–73) but no page-content namespace (`docs.introduction.*` etc.) exists yet.
- The existing [src/pages/typography-page.tsx](../src/pages/typography-page.tsx) belongs to the **Foundations** route `/foundations/typography`, not Getting Started `/docs/typography`. The two are intentionally separate per the sidebar (`sidebar.typography` vs `sidebar.gsTypography`).

## Infrastructure inventory

### Prose-page helpers — ❌ MISSING

`src/components/docs/` exports:

```
ComponentPage, Section, CodeBlock, PreviewBlock, PropsTable, RelatedLinks,
FoundationPage, TokenSwatch, TokenScale, UsesTokens, ExternalLinks,
PatternPage, PatternPreview, UsedComponents
```

There is **no `<DocsPage>`, `<Prose>`, `<DocSection>`, `<Callout>`, or `<Alert>` helper** suitable for a multi-section text-heavy page. The closest fits are:

- `<ComponentPage>` — has a category Badge + title + description header, then renders children. Would work but the category chip + the existing component-page visual idiom may feel off for a Getting Started essay.
- `<FoundationPage>` — same shape; less appropriate (semantically "foundation" not "getting started").
- `<Section>` — section heading + description + content slot. Reusable as-is for the inner blocks.

**Recommendation for Phase 2:** before building any Getting Started page, add a single `<DocsPage>` shell (mirroring `<FoundationPage>` but with `category="Getting started"` defaulted) and a small `<Prose>` helper (`max-w-prose` typographic block with proper heading rhythm). That lets all 5 pages share one shell.

### `<TokenTable>` or similar — ❌ MISSING

No `<TokenTable>` exists. Available token-rendering helpers:

- `<TokenSwatch>` — single swatch (color, radius, spacing chip)
- `<TokenScale>` — list of swatches with labels

For the Theming page (which typically shows a 3-column table: token name / CSS var / value / preview), we'll need either a new `<TokenTable>` or to compose `<TokenScale>` + a borrowed table layout from `<PropsTable>`.

### Dark-mode infrastructure — ✅ PARTIAL

- ✅ `src/components/theme-provider.tsx` exists. Exports `ThemeProvider` + `useTheme()` hook. Mode tri-state: `"dark" | "light" | "system"`. Persists to `localStorage` (`vite-ui-theme` key). Toggles the `dark` / `light` class on `<html>`.
- ❌ No `src/lib/use-theme.ts` file — the hook lives at `src/components/theme-provider.tsx:66`.
- ❌ No `src/components/theme-toggle.tsx` (or equivalent) — no reusable UI control that wraps the hook. The `menu-toggle.tsx` file in `src/components/` is the sidebar hamburger, not a theme toggle.

**Recommendation for Phase 2:** ship a tiny `<ThemeToggle>` component on the Dark Mode page (or extract to `src/components/theme-toggle.tsx` so the header can adopt it too). The page itself will demo: the toggle, the `dark:` Tailwind variant, and how `useTheme()` is consumed.

## Summary scoreboard

| Question | Answer |
|---|---|
| Pages already DONE | 0 / 5 |
| Pages PARTIAL | 0 / 5 |
| Pages STUB | **5 / 5** |
| Prose helpers in place | No |
| `<TokenTable>` in place | No |
| Theme hook / provider in place | Yes (`useTheme` in [theme-provider.tsx:66](../src/components/theme-provider.tsx#L66)) |
| Theme toggle UI in place | No |

## Recommended Phase-2 order

If we go ahead and build, the dependency-minimal sequence is:

1. **Infra** — add `<DocsPage>` + `<Prose>` shell helpers, add a tiny `<ThemeToggle>` component, add `<TokenTable>` (or commit to composing `<TokenScale>` + the props-table layout). Single PR.
2. **Introduction** — short essay page. Lowest content risk; validates the new shell.
3. **Project Structure** — directory tree + per-folder rationale. Mostly file-tree + bullets.
4. **Theming** — leans on `<TokenTable>` heavily + a "swap brand colors in 5 minutes" walkthrough.
5. **Dark Mode** — needs `<ThemeToggle>` live in the page + `dark:` variant examples + how `useTheme()` works.
6. **Typography (Getting Started)** — overlaps with Foundations Typography; scope as "how-to-use" essay rather than "what-tokens-exist" reference (which already lives at `/foundations/typography`).

If we cut, Typography is the cuttable one — the Foundations Typography page covers the same surface from the reference angle. Everything else is unique to Getting Started.

## Files referenced

- [src/App.tsx](../src/App.tsx) — 5 stub routes at lines 215–219
- [src/components/app-sidebar.tsx](../src/components/app-sidebar.tsx) — sidebar.gettingStarted block lists all 5
- [src/components/ui/coming-soon.tsx](../src/components/ui/coming-soon.tsx) — what every route currently renders
- [src/components/docs/index.ts](../src/components/docs/index.ts) — helpers barrel (no prose shell exports)
- [src/components/theme-provider.tsx](../src/components/theme-provider.tsx) — `ThemeProvider` + `useTheme`
- [src/locales/en.json](../src/locales/en.json) — sidebar labels at lines 69–73; no `docs.{introduction,projectStructure,theming,darkMode}.*` namespaces yet
