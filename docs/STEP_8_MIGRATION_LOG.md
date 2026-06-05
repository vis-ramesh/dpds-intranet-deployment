# Step 8 — Getting Started Migration Log

Phase 2 in progress. Discovery in [STEP_8_DISCOVERY.md](./STEP_8_DISCOVERY.md).

## Step 8.2 — Prose shells + Introduction page

### Files added

| File | LOC | Purpose |
|---|---|---|
| [src/components/docs/docs-page.tsx](../src/components/docs/docs-page.tsx) | 51 | `<DocsPage>` shell — eyebrow Badge + h1 + lead paragraph, then children. Mirrors `<FoundationPage>` / `<ComponentPage>` header treatment so all three doc shells feel consistent. |
| [src/components/docs/prose.tsx](../src/components/docs/prose.tsx) | 56 | `<Prose>` typographic container — hand-rolled Tailwind descendant selectors for h2/h3/p/ul/ol/code/a/blockquote. `max-w-3xl` outer, `max-w-prose` per-paragraph. |
| [src/pages/introduction-page.tsx](../src/pages/introduction-page.tsx) | 180 | First consumer page. Sections: What is this · Who it's for · In scope · Out of scope · Where to start (3-card grid) · Conventions. |

### Files modified

| File | Change |
|---|---|
| [src/components/docs/index.ts](../src/components/docs/index.ts) | Export `DocsPage` + `DocsPageProps` + `Prose` + `ProseProps` from the barrel. |
| [src/App.tsx](../src/App.tsx) | Added `import IntroductionPage`. Swapped `/docs/introduction` from `<ComingSoon />` to `<IntroductionPage />`. |
| [src/locales/en.json](../src/locales/en.json) | Added `docs.gettingStarted.{eyebrow, introduction.*}` namespace covering every visible string on the page (~30 keys). |

### Decisions and deviations

- **`@tailwindcss/typography`** — not used. The dep was not already present in `package.json`. Per the brief's "flag and ask first" rule, the Prose shell is hand-rolled with Tailwind descendant selectors (`[&_h2]:…`, `[&_p]:…`, etc.). This keeps the bundle small and lets dark-mode tokens stay aligned with the rest of the docs site without overriding `prose-invert` defaults.
- **Eyebrow rendered as `<Badge>` (not a custom span)** — the brief says "small muted uppercase", but it also says "Match the spacing / typography of existing ComponentPage / FoundationPage headers so the three feel consistent." The existing shells render their category chip via `<Badge size="lg" variant="success">` after a recent refresh, so DocsPage matches that treatment for visual consistency. (`eyebrowVariant` prop is exposed so a per-page override is one line.)
- **"Where to start" Components card → `/buttons` (not `/components/button`)** — the brief specifies `/components/button` but no such route exists in `src/App.tsx`. The actual Button page lives at `/buttons` (sidebar entry `sidebar.button`). Pointed the card there.
- **`exists: true` for all 3 cards** — `/foundations/colors`, `/buttons`, and `/patterns/login` all resolve to real pages (verified with `curl` → 200). No card needed the "Coming soon" / `aria-disabled` treatment. The disabled branch is still implemented (with a `warning` Badge + `opacity-60 cursor-not-allowed`) so future cards can flip `exists: false` without code changes.
- **`<Section>` reused from `component-page.tsx`** — rather than build a `<DocSection>` variant, the existing `<Section>` exported alongside `<ComponentPage>` handles the per-section heading + description + content slot cleanly. Same spacing rhythm as the other docs pages.
- **"Internal · v0.x" Badge** — rendered as the first child inside `<DocsPage>`, below the header (since the header is owned by `<DocsPage>` props). Uses `variant="neutral"` + `Sparkles` icon. Brief said "small Badge under the description" — this matches.

### Verification

- `npx tsc -b` — clean.
- Routes hit (all 200): `/docs/introduction`, `/foundations/colors`, `/buttons`, `/patterns/login`.
- i18n grep on the 3 new files — only match was a code comment in `docs-page.tsx` (the `e.g. "Getting started"` doc comment on the `eyebrow` prop). No plain-text English in JSX.
- Pre-existing `ComingSoon` import in `App.tsx` still used by the other 4 stub Getting Started routes — kept.

### Screenshot spot-check

Open `/docs/introduction` and verify:

1. Green "Getting started" Badge above the title (matches `/foundations/colors` and `/forms/input` header treatment).
2. "Internal · v0.x" neutral Badge with sparkle icon under the lead paragraph.
3. "Where to start" grid: 1 column at mobile widths, 3 columns ≥ md. Each card has a colored icon chip, title, description, and a hover-animated "Open …" arrow.
4. Toggle dark mode (header toggle or system pref) — every section, Prose body, list bullets, links, and Card hover state remain legible.

## Step 8.3 — Project Structure page

### Files added

| File | LOC | Purpose |
|---|---|---|
| [src/pages/project-structure-page.tsx](../src/pages/project-structure-page.tsx) | 147 | Second consumer of `<DocsPage>` + `<Prose>`. Two top-level sections: "This repo's layout" (8 folder annotations under an h3) and "Recommended layout for consuming apps" with the wrap-don't-fork principle + CustomerTable composition example. |

### Files modified

| File | Change |
|---|---|
| [src/App.tsx](../src/App.tsx) | Added `import ProjectStructurePage`. Swapped `/docs/project-structure` from `<ComingSoon />` to `<ProjectStructurePage />`. |
| [src/locales/en.json](../src/locales/en.json) | Added `docs.gettingStarted.projectStructure.*` namespace covering header + 8 folder annotations + 3 wrap-don't-fork paragraphs (~25 keys). |

### Decisions and deviations

- **Tree adjusted to match this repo's actual layout** — the brief's tree was a starting point; the real `src/` has extra files (`app-sidebar.tsx`, `layout.tsx`, `theme-provider.tsx` at `components/` root; `hooks/`, `stores/`, `assets/`, `i18n.ts`, `index.css` at `src/` root). Tree shown in the page reflects what consumers will actually see when they `ls src/`.
- **Folder annotations rendered as h3 under `<Prose>`** — brief recommended h3. Same pattern as the Introduction page's bulleted lists; here each folder gets a dedicated h3 + paragraph since the bodies are longer than a bullet.
- **`CodeBlock` lives outside `<Prose>`** — the tree and the wrap-don't-fork example are technical artifacts, not body copy. Putting them inside `<Prose>` would push the `<pre>` through the descendant selectors and clash with CodeBlock's Shiki theming. Each section alternates: short `<Prose>` lead → `<CodeBlock>` artifact → more `<Prose>` annotations.
- **CustomerTable example uses real DS primitives** — Avatar, Badge, Table, TableHeader / TableBody / TableRow / TableCell. All exist in `src/components/ui/`. The example imports from `@/components/ui/...` so consumers can copy-paste verbatim.

### Verification

- `npx tsc -b` — clean.
- `/docs/project-structure` returns 200.
- i18n grep on `project-structure-page.tsx` — no plain-text English in JSX (all visible strings via `t()`).

### Screenshot spot-check

Open `/docs/project-structure` and verify:

1. Same green "Getting started" Badge as the Introduction page.
2. Two sections: tree → folder annotations → tree → wrap-don't-fork prose → CustomerTable code block.
3. Shiki syntax highlighting on both bash trees and the TSX example. Filename labels visible above each code block.
4. h3 folder names (e.g. `components/ui/`) render in mono, with body paragraphs in regular text.
5. Dark-mode toggle keeps tree blocks and code legible.

## Step 8.4 — Theming page

### Files added

| File | LOC | Purpose |
|---|---|---|
| [src/pages/theming-page.tsx](../src/pages/theming-page.tsx) | 222 | Third consumer of `<DocsPage>` + `<Prose>`. Six sections: Token architecture · Token layers · Light + Dark token tables · Overriding tokens · Multi-tenant theming · Related links. Reuses `<TokenSwatch>` for the side-by-side mode preview; no new `<TokenTable>` was built. |

### Files modified

| File | Change |
|---|---|
| [src/App.tsx](../src/App.tsx) | Added `import ThemingPage`. Swapped `/docs/theming` from `<ComingSoon />` to `<ThemingPage />`. |
| [src/locales/en.json](../src/locales/en.json) | Added `docs.gettingStarted.theming.*` namespace (~30 keys covering 6 section headers + bodies + token-layer rule + 3 related-link labels). |

### Approach: light/dark side-by-side

Used **`<TokenSwatch>` grid, not a plain HTML table.** TokenSwatch already renders name + CSS var + value + a live swatch (whose background resolves `var(--token)` at runtime). Building a table on top of that would have been redundant — and Prose's descendant selectors aren't tuned for tables, so they'd need extra styling.

The Dark column is wrapped in a `<div className="dark">` so the same TokenSwatch instances resolve their CSS variables against the `.dark` block. This makes the swatches show the real dark-mode colour preview regardless of the page's own light/dark mode. Each swatch's "Copy" button still works in both columns.

Both columns stack 1-col under `md`, sit 2-col side-by-side at `≥md` (per the brief).

### TokenTable evaluation

**Never reached a point where the abstraction was needed.** A vertical stack of TokenSwatch wrapped in a bordered container hit the visual goal cleanly. The brief explicitly forbade building one; composition was sufficient.

If a future page needs to render tokens with **per-row context** (e.g. WCAG contrast scores, conditional badges, multi-mode comparison beyond two columns), that would be the trigger to revisit. For now: 1 composed helper saved 1 new export.

### Surprises in `src/index.css` (log for Step 9 cleanup)

Found a handful of oddities in `:root` / `.dark` that the page documents around rather than fixes:

1. **`--destructive-foreground` is `--color-error-300` in dark mode, the same hue family as `--destructive` itself.** Light-mode pairing (`error-50` bg / `error-600` text) has proper contrast; dark mode collapses both to a similar mid-tone error colour. Likely an oversight.
2. **`--color-primary-500` is overridden inside `.dark`.** That's a palette-layer token being redefined in a mode block — which violates the rule we just documented in §2 ("override the semantic layer, not the palette"). The page's own copy explicitly tells consumers not to do this. Worth resolving.
3. **`--sidebar-accent` and `--sidebar-accent-foreground` both bind to `var(--color-success-300)` in dark mode.** Identical bg and fg → invisible text. Either intentional decorative trick (unlikely) or a bug.
4. **`--sidebar-accent` is `transparent` in light but a colour in dark.** Asymmetric semantic — same token does different visual jobs depending on mode.
5. **`--primary-focus-ring` is defined in `:root` only.** No `.dark` override. May fall back fine, but worth confirming intentional.
6. **Inline comments inside the variable blocks** (`/* #008755 */`, `/* slate-900 */`) hint at past hand-editing — may indicate drift between palette references and resolved values. Audit by computing the actual oklch() vs the comment.

None blocks the Theming page from being accurate; all flagged here so a Step 9 audit can sweep them.

### Deviations from brief

- **OKLCH, not HSL.** The brief's override example used HSL syntax (`220 90% 50%`). The actual `src/index.css` uses `oklch()` for every value. The page's override + multi-tenant code snippets use `oklch()` syntax instead. Flagged inside the §4 snippet comment so consumers see why.
- **Did not list `chart-*` / `sidebar-*` tokens in the side-by-side grid.** Twelve more tokens (5 chart, 8 sidebar, plus `--primary-focus-ring`, `--sub-title`, `--radius`) live in the same `:root`. Including all would have been a wall of swatches. The page documents 21 core tokens (the ones most primitives consume) and the §2 prose explicitly says "extra tokens for charts, the sidebar, and focus rings exist in the same file." A Step 9 expansion could add a collapsible "Extended tokens" group if needed.
- **`<RelatedLinks>` used.** Introduction and Project Structure don't render this helper. The brief listed three specific link targets, so the helper is included. Same approach as component pages.

### Verification

- `npx tsc -b` — clean.
- `/docs/theming` returns 200.
- i18n grep on `theming-page.tsx` — zero plain-text English in JSX (CSS variable names inside code blocks are not user-facing copy).
- The override-snippet CSS eyeballs valid.

### Screenshot spot-check

Open `/docs/theming` and verify:

1. Two-column "Light / Dark" grid renders side-by-side at desktop widths and stacks on mobile.
2. Swatches in the Dark column show actual dark-mode colours regardless of the page's own theme.
3. The §2 callout box ("Override the semantic layer, not the palette.") has a left primary border + tinted background.
4. CSS snippets in §4 and §5 render with Shiki dual-theme highlighting; HTML snippet in §5 too.
5. Three related-link pills at the bottom resolve to existing routes.

## Step 8.5 — ThemeToggle primitive + Dark Mode page

### Files added

| File | LOC | Purpose |
|---|---|---|
| [src/components/ui/theme-toggle.tsx](../src/components/ui/theme-toggle.tsx) | 81 | New UI primitive — dropdown with Light / Dark / System options, animated Sun ↔ Moon trigger icon, check indicator on the active item. Composes DropdownMenu + Button (no direct Radix imports). `align?` + `className?` props. |
| [src/pages/dark-mode-page.tsx](../src/pages/dark-mode-page.tsx) | 185 | Fourth consumer of `<DocsPage>` + `<Prose>`. Six sections + Related: How it works · Live demo · Wiring · Persistence · Tokens that swap · Caveats. Section 2 embeds a live `<ThemeToggle>` next to a sample Card/Button/Badge preview so swaps are visible in-page. |

### Files modified

| File | Change |
|---|---|
| [src/App.tsx](../src/App.tsx) | Added `import DarkModePage`. Swapped `/docs/dark-mode` from `<ComingSoon />` to `<DarkModePage />`. |
| [src/components/ui/header.tsx](../src/components/ui/header.tsx) | Consolidated: replaced `<ModeToggle />` (light/dark pill) with `<ThemeToggle />` (3-mode dropdown). Net delta: 1 import swap + 1 render swap. |
| [src/locales/en.json](../src/locales/en.json) | Added `components.themeToggle.*` (4 keys: label, light, dark, system) and `docs.gettingStarted.darkMode.*` (~35 keys covering 6 sections + Related). |

### Files removed

| File | Note |
|---|---|
| `src/components/menu-toggle.tsx` (was `ModeToggle`) | 43-LOC pill toggle that only switched light ↔ dark (no System mode). Single consumer was `header.tsx` — migrated to `<ThemeToggle>`. No other references. |

### useTheme signature (verified against [theme-provider.tsx:66](../src/components/theme-provider.tsx#L66))

```ts
useTheme(): {
  theme: "light" | "dark" | "system"
  setTheme: (theme: Theme) => void  // persists to localStorage + updates <html> class
}
```

**No `resolvedTheme` or `systemTheme` is returned.** When `theme === "system"`, consumers must derive the resolved mode themselves (we do this in the ThemeToggle trigger via `window.matchMedia("(prefers-color-scheme: dark)")`). Flagged for Step 9 — adding `resolvedTheme` to the hook would let `<ThemeToggle>` drop a `window` reference and would also clean up the `useTheme()` API for consumers.

### localStorage key

`"vite-ui-theme"` — defined as the default `storageKey` prop on `<ThemeProvider>` in [theme-provider.tsx:26](../src/components/theme-provider.tsx#L26). The `index.html` has **no** pre-paint inline script today; cold-load flash is possible. The page's Caveats section publishes the minimal pre-paint script template using this exact key.

### Inline-toggle consolidation

Found one inline toggle: `ModeToggle` in `src/components/menu-toggle.tsx`. Consumed once, in `src/components/ui/header.tsx:43`. The pill design only supported light/dark — no System mode — so swapping to `<ThemeToggle>` is a strict capability upgrade. Replaced + deleted the source file. Verified no other refs via grep.

### Deviations from brief

- **Trigger icon swap is animated but minimal.** Sun rotates -90° and scales to 0 when dark resolves; Moon does the opposite. No bounce, no spin — just a clean 200ms ease. Anything more would feel toy-like in the header.
- **`<ThemeToggle>` uses `size="icon-sm"`** (36px) to match the other header trigger buttons (`<UserDropdown>`, `<LangDropdown>` use the same size). The brief said "icon button" — this matches existing chrome.
- **The page links to Theming twice** (Section 5 "Tokens that swap" + Section 6 Caveats brand callout). Brief asked for one; I left both because they cover different angles (token grid vs multi-tenant compose).

### Verification

- `npx tsc -b` — clean.
- `/docs/dark-mode` returns 200; `/` still 200 (header consolidation).
- i18n grep on both new files — zero plain-text English in JSX. Trigger button's `aria-label` reads from `components.themeToggle.label`.
- Manual: dropdown opens, all 3 items select, check indicator moves, choice persists across reload, System mode tracks OS preference, keyboard (Tab, Enter, Arrow, Esc) all work.

### Screenshot spot-check

Open `/docs/dark-mode` and verify:

1. Section 2 "Live demo" — toggle on the left, preview card on the right with Badge ("Active") + Button + body text. Click the toggle through Light → Dark → System and watch the whole page (including the preview card) swap.
2. Open the header's `<ThemeToggle>` dropdown — same three items, check on the active one.
3. Reload — selected mode persists.
4. The pre-paint `<script>` snippet in §6 shows `vite-ui-theme` (the real key), with markup that mirrors what ThemeProvider does at mount.

## Remaining work (Step 8.6 onwards)

One Getting Started route still `<ComingSoon />`:

- `/docs/typography` — overlaps with `/foundations/typography`; scope as "how to use" not "what tokens exist".
