# Step 8A — Pattern Page Template

The Login docs page at [src/pages/patterns-login-page.tsx](../src/pages/patterns-login-page.tsx) is now the canonical template for pattern docs. Every other pattern page (Step 8B, 8C, …) follows the same anatomy. This file is the playbook for cloning.

Patterns are real, composable screens — not single primitives. They live in [src/patterns/](../src/patterns/) and are rendered into three places:

1. **The auth/working route** (e.g. `/login`) — the real, full-bleed pattern users actually use.
2. **The preview route** (`/preview/<pattern>`) — same component, outside the sidebar `<Layout>`, used by the iframe embed.
3. **The docs route** (`/patterns/<pattern>`) — the documentation page with preview, source, used components, and customize tips.

---

## Anatomy — the 5 sections

| # | Section | Helper | Notes |
|---|---|---|---|
| 1 | Title + description + category chip | `<PatternPage>` (wrapper) | Renders the page header. Same shape as `<ComponentPage>`. |
| 2 | Live preview | `<Section>` + `<PatternPreview>` | Sized iframe embedding `/preview/<pattern>` with a viewport switcher (Desktop / Tablet / Mobile) and "Open in new tab". |
| 3 | Used components | `<Section>` + `<UsedComponents>` | Pill chips linking back to each consumed primitive's docs. |
| 4 | Source | `<Section>` + `<CodeBlock>` | Full source of `src/patterns/<pattern>.tsx` in one Shiki-highlighted block. |
| 5 | How to customize | `<Section>` + grid of titled snippets | Prose + code for the most common tweaks (brand mark, copy, illustration, link targets). |

There is **no Props table** section (the pattern is a single export, often with only a handful of slot props) and **no Accessibility section** as a separate block (the underlying primitives carry their a11y docs; flag pattern-specific concerns in prose if needed).

---

## Helpers reference

All three helpers live in [src/components/docs/](../src/components/docs/). Import via the barrel:

```tsx
import {
  PatternPage,
  PatternPreview,
  UsedComponents,
  Section,
  CodeBlock,
} from "@/components/docs"
import type { UsedComponentItem } from "@/components/docs"
```

### `<PatternPage>`

Outer wrapper. Renders the title, one-line description, and a `<Badge>` category chip (same casing/sizing/variant defaults as `<ComponentPage>`).

```tsx
<PatternPage
  title={t("patterns.login.title")}
  description={t("patterns.login.description")}
  category={t("patterns.login.category")}
>
  {/* sections go here */}
</PatternPage>
```

Props: `title`, `description`, `category?` (defaults to "Pattern"), `categoryVariant?` (defaults to `"success"`).

### `<PatternPreview>`

Sized iframe + viewport toolbar. Loads the standalone preview route in a fresh document so styles/scripts isolate cleanly from the sidebar layout.

```tsx
<PatternPreview
  standalonePath="/preview/login"
  iframeTitle={t("patterns.login.title")}
  height={780}
/>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `standalonePath` | `string` | — | Path to the `/preview/<pattern>` route (must be outside `<Layout>`). |
| `iframeTitle` | `string` | `"Pattern preview"` | Accessible name for the iframe. |
| `height` | `number` | `720` | Pixel height of the iframe. |
| `labels` | `{ desktop, tablet, mobile, openInNewTab }?` | English defaults | Localize the toolbar. |

Viewport widths: Desktop 1280px / Tablet 768px / Mobile 375px. Switching resizes the iframe container; the iframe itself renders the standalone route at the iframe's CSS width — the pattern's responsive breakpoints apply naturally.

### `<UsedComponents>`

Dashed-border card with pill chips listing every primitive the pattern actually imports. Visually distinct from `<RelatedLinks>` so it doesn't read as a footer.

```tsx
const USED: UsedComponentItem[] = [
  { label: "Button", href: "/buttons" },
  { label: "Input", href: "/forms/input" },
  { label: "Checkbox", href: "/forms/checkbox" },
]

<UsedComponents items={USED} />
```

**Accuracy rule:** the list must reflect what the pattern file actually imports. Don't list adjacent primitives that aren't used.

---

## Route topology

Three URLs per pattern:

```
/<pattern-real-route>     → src/patterns/<pattern>.tsx   (e.g. /login)            outside <Layout>
/preview/<pattern>        → src/patterns/<pattern>.tsx   (e.g. /preview/login)    outside <Layout>
/patterns/<pattern>       → src/pages/patterns-<pattern>-page.tsx                 inside  <Layout>
```

The first two render the **same** component — the only difference is the route. The third is the docs page that embeds the second.

In [src/App.tsx](../src/App.tsx):

```tsx
{/* Standalone (no sidebar) */}
<Route path="/login" element={<LoginPattern />} />

{/* Pattern preview routes — outside <Layout>, full-bleed */}
<Route path="/preview/login" element={<LoginPattern />} />

{/* Inside the Layout switch */}
<Route path="/patterns/login" element={<PatternsLoginPage />} />
```

---

## How to clone the template for a new pattern

### 1. Create the pattern component

```bash
# example: signup pattern
touch src/patterns/signup.tsx
```

Inside `src/patterns/signup.tsx` — export a default React component that:

- Renders a full-bleed layout (`min-h-screen`, optional two-column).
- Reads strings via `useTranslation()` against `patterns.<name>.*`.
- Uses `react-hook-form + zod` for form validation (the project's pattern — see [src/pages/form-page.tsx](../src/pages/form-page.tsx)).
- Wires submission to `toast.success(...)` from `sonner` for the mock-auth feedback.
- Accepts a small set of slot props for customization (logo, illustration, link targets, etc.).

Polish bar: dark mode must work everywhere, responsive must collapse cleanly at 375px, and visible strings must come from i18n.

### 2. Add the i18n namespace

Add a `patterns.<name>.*` block to [src/locales/en.json](../src/locales/en.json) mirroring the `patterns.login` shape:

```json
"patterns": {
  "login": { ... },
  "signup": {
    "category": "Authentication",
    "title": "Sign up",
    "description": "One-line description.",
    "<...form/cta keys the pattern reads at runtime...>",
    "docs": {
      "preview": { "title": "...", "description": "..." },
      "usedComponents": { "title": "...", "description": "..." },
      "source": { "title": "...", "description": "..." },
      "customize": {
        "title": "How to customize",
        "description": "...",
        "items": {
          "<id>": { "title": "...", "body": "..." }
        }
      }
    },
    "related": { "title": "Related patterns" }
  }
}
```

### 3. Build the docs page

Copy [src/pages/patterns-login-page.tsx](../src/pages/patterns-login-page.tsx) and:

1. Rename the default export (e.g. `PatternsSignupPage`).
2. Swap every `patterns.login.*` i18n key for `patterns.<name>.*`.
3. Replace the `SOURCE_SNIPPET` constant with a copy-pasteable abridgement of the pattern file (you can include the full source if it's short enough — the goal is "drop this into your codebase and ship").
4. Update `USED` to reflect the new pattern's imports.
5. Update the four `CUSTOMIZE_*_SNIPPET` constants to show the new pattern's most likely tweaks (brand, copy, slot props, link targets).
6. Update the `<PatternPreview standalonePath>` to point at `/preview/<name>`.

### 4. Route it

In [src/App.tsx](../src/App.tsx):

- Add `<Route path="/preview/<name>" element={<NamePattern />} />` outside `<Layout>`.
- Add `<Route path="/patterns/<name>" element={<PatternsNamePage />} />` inside `<Layout>`.
- If the pattern also has a real route (`/signup`, `/onboarding`, etc.), point that at the pattern too.
- Update the Patterns sidebar group in [src/components/app-sidebar.tsx](../src/components/app-sidebar.tsx).

### 5. Verify

- `npx tsc -b` — must stay clean.
- Visit `/patterns/<name>` — preview iframe loads, viewport switcher resizes, "Open in new tab" goes to `/preview/<name>`.
- Visit `/preview/<name>` directly — pattern renders full-bleed without the sidebar.
- Visit the real route (e.g. `/login`) — same component renders.
- Toggle dark mode on all three.
- Confirm responsive: at 375px the two-column layout collapses gracefully.
- Confirm form submission shows a toast or disables the submit button (mock auth).

---

## i18n contract

Keep the **same nested key shape** across every pattern's namespace. The runtime keys (read by the pattern component) and the docs keys (read by the docs page) live side-by-side:

```
patterns.<name>.{category, title, description}                          ← header
patterns.<name>.<pattern-specific runtime keys>                          ← what the pattern renders
patterns.<name>.docs.preview.{title, description}                       ← docs only
patterns.<name>.docs.usedComponents.{title, description}                ← docs only
patterns.<name>.docs.source.{title, description}                        ← docs only
patterns.<name>.docs.customize.{title, description, items.<id>.{title, body}}  ← docs only
patterns.<name>.related.{title}                                          ← docs only (optional)
```

The `docs.*` subtree is reserved for strings the docs page reads. Pattern-runtime keys sit at the top of the namespace so the component file isn't crawling through `patterns.login.docs.preview.…` for a heading.

---

## Snippet authoring tips

- **The `SOURCE_SNIPPET` is the most important snippet on the page.** Devs copy it into their codebase. Keep it self-contained, no unused imports, no stray comments.
- **Customize snippets demonstrate the slot API.** Show what props the pattern accepts and how a consumer would override them. Don't repeat the source — show the diff.
- **Don't escape inside template literals.** Snippets are not compiled. Use plain JSX inside backticks.

---

## What's intentionally NOT in this template

- **A live editor.** The iframe shows the rendered pattern; source is static text. Consumers copy and adapt.
- **Per-component a11y docs.** Each used primitive has its own a11y section on its docs page. Pattern docs only call out a11y when something at the composition level matters (focus order across two columns, modal trap, etc).
- **Auto-generated source.** `SOURCE_SNIPPET` is hand-curated so it can be slightly abridged for clarity. The pattern file is the source of truth; the snippet is the teaching version.

---

## Files that define the template

- [src/components/docs/pattern-page.tsx](../src/components/docs/pattern-page.tsx)
- [src/components/docs/pattern-preview.tsx](../src/components/docs/pattern-preview.tsx)
- [src/components/docs/used-components.tsx](../src/components/docs/used-components.tsx)
- [src/components/docs/index.ts](../src/components/docs/index.ts) (barrel)
- [src/patterns/login.tsx](../src/patterns/login.tsx) (canonical pattern reference)
- [src/pages/patterns-login-page.tsx](../src/pages/patterns-login-page.tsx) (canonical docs page reference)
- [src/App.tsx](../src/App.tsx) (route topology — `/login`, `/preview/login`, `/patterns/login`)
