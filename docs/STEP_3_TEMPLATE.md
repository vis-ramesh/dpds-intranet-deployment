# Step 3 — Component Page Template

The Button docs page at [src/pages/buttons-page.tsx](../src/pages/buttons-page.tsx) is now the canonical template. Every other component page (Input, Card, Dialog, Tabs, Toast, Form, Sidebar, ...) follows the same anatomy. This file is the playbook for cloning.

---

## Anatomy — the 8 sections

Every component page renders these in order:

| # | Section | Helper | Notes |
|---|---|---|---|
| 1 | Title + description + category chip | `<ComponentPage>` (wrapper) | Renders the page header. Provided as wrapper props, not children. |
| 2 | Live preview | `<Section>` + `<PreviewBlock>` | One default, interactive instance. Toggle reveals the source. |
| 3 | Installation | `<Section>` + `<CodeBlock>` | Single import line, optionally with `filename` prop. |
| 4 | Usage | `<Section>` + `<CodeBlock>` | Smallest viable real-world snippet (more than just the import). |
| 5 | Examples | `<Section>` + grid of `<PreviewBlock>`s | 6–8 variants/states. Use a `grid-cols-1 lg:grid-cols-2` layout so previews sit side-by-side on desktop. |
| 6 | API / Props table | `<Section>` + `<PropsTable>` | Required props get a red asterisk. |
| 7 | Accessibility | `<Section>` + prose `<ul>` | Keyboard, focus, ARIA, label requirements. |
| 8 | Related components | `<RelatedLinks>` (top-level, no `<Section>` wrapper) | Pill links to 3–5 nearby pages. |

---

## Helpers reference

All five helpers live in `src/components/docs/`. Import via the barrel:

```tsx
import {
  ComponentPage,
  Section,
  PreviewBlock,
  CodeBlock,
  PropsTable,
  RelatedLinks,
} from "@/components/docs"
import type { PropRow } from "@/components/docs"
```

### `<ComponentPage>`

Outer wrapper. Renders the title, one-line description, and an optional category chip.

```tsx
<ComponentPage
  title={t("docs.button.title")}
  description={t("docs.button.description")}
  category={t("docs.button.category")}
>
  {/* sections go here */}
</ComponentPage>
```

### `<Section>`

Per-section heading + description + content slot. Exported from the same module as `ComponentPage`.

```tsx
<Section title={t("docs.button.preview.title")} description={t("docs.button.preview.description")}>
  {/* preview or content */}
</Section>
```

### `<PreviewBlock>`

Bordered preview area with a "View code" toggle in the top-right.

```tsx
<PreviewBlock
  title="Default"             // optional header above the preview
  description="A default..."   // optional one-liner under the title
  code={EXAMPLE_SNIPPETS.default}
>
  <Button variant="filled">Default</Button>
</PreviewBlock>
```

Children render as the live preview. Pass the corresponding source as the `code` prop; users toggle between the two. Drop `code` to render a preview-only block (no toggle).

### `<CodeBlock>`

Standalone code snippet with a "Copy" button. Uses Shiki for highlighting; dual-themed for light + dark mode.

```tsx
<CodeBlock code={USAGE_SNIPPET} language="tsx" filename="your-file.tsx" />
```

Supported `language` values: `tsx`, `ts`, `jsx`, `js`, `bash`, `shell`, `html`, `css`, `json`. Add more by extending the type in `code-block.tsx` — Shiki supports hundreds of grammars out of the box.

### `<PropsTable>`

Four-column table: Name, Type, Default, Description. Type cell renders as `<code>`. Required props get a red asterisk.

```tsx
const rows: PropRow[] = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    description: "Button content.",
  },
  {
    name: "variant",
    type: '"filled" | "gray" | "outlineGray" | ...',
    defaultValue: '"filled"',
    description: "Visual hierarchy.",
  },
]

<PropsTable rows={rows} />
```

Keep `type` strings tight — long unions render as a horizontally scrollable code chip.

### `<RelatedLinks>`

Pill-style cross-link row. Renders nothing if `items` is empty.

```tsx
<RelatedLinks
  title={t("docs.button.related.title")}
  items={[
    { label: "Input", href: "/forms/input" },
    { label: "Form", href: "/forms/form" },
  ]}
/>
```

---

## How to clone the template for a new component

### 1. Create the i18n namespace

Add a `docs.<componentName>.*` block to [src/locales/en.json](../src/locales/en.json) mirroring the `docs.button` shape:

```json
"docs": {
  "button": { ... },
  "input": {
    "category": "Form & Input",
    "title": "Input",
    "description": "One-line component description.",
    "preview": { "title": "Preview", "description": "...", "label": "..." },
    "installation": { "title": "Installation", "description": "...", "filename": "your-file.tsx" },
    "usage": { "title": "Usage", "description": "..." },
    "examples": {
      "title": "Examples",
      "description": "...",
      "<exampleId>": { "label": "...", "description": "..." }
    },
    "props": { "title": "API", "description": "Props available on the Input component." },
    "accessibility": {
      "title": "Accessibility",
      "intro": "...",
      "items": { "keyboard": "...", "focus": "...", "aria": "...", "nesting": "...", "label": "..." }
    },
    "related": { "title": "Related components" }
  }
}
```

### 2. Copy the Button page as a starting point

```bash
cp src/pages/buttons-page.tsx src/pages/input-page.tsx
```

Then in the new file:

1. Rename the default export (e.g. `InputPage`).
2. Swap every `docs.button.*` i18n key for `docs.input.*`.
3. Swap the imports (`Button` → `Input`, etc.) and the snippet constants at the top.
4. Update `getPropRows()` for the new component's API.
5. Update the `<RelatedLinks>` items to point at the new component's neighbours.

### 3. Route it

Add (or replace the existing `<ComingSoon />` stub for) the route in [src/App.tsx](../src/App.tsx). The Step 2 nav restructure already pre-wired every component to either a real page or `ComingSoon`, so you'll usually be **replacing a `<ComingSoon />` route**, not adding a new one.

### 4. Verify

- `npx tsc -b` — should stay clean.
- Visit the page in `npm run dev`. Walk through all 8 sections.
- Toggle "View code" on every `<PreviewBlock>` and "Copy" on every `<CodeBlock>` — both should fire.
- Toggle dark mode at the OS level — preview surfaces, code blocks (Shiki dual-theme), and the props table should all switch.

### 5. Lock the i18n contract

Keep the **same nested key shape** across every component's namespace. Future Phase 4 will add a script that runs through `docs.*` and flags missing keys; deviating from the shape today breaks that script tomorrow.

---

## Snippet authoring tips

- **Keep snippets short.** Two helpful examples beat one exhaustive one.
- **Wrap snippets as `const`** at the top of the file. Inline strings make the JSX noisy.
- **Don't escape inside template literals.** Snippets are not compiled — they're displayed verbatim. Use plain JSX inside backticks.
- **Match prop ordering** between the snippet and the live preview. A reader scanning both should see the same prop order in both columns.
- **Avoid noisy imports** in usage snippets — show the component import only, not every util.

---

## What's intentionally NOT in this template

- **Live editing.** Snippets are static text; users copy and paste into their own file. (Phase 5 may add an editable sandbox; out of scope for now.)
- **Per-prop deep-dive sections.** The PropsTable is the contract. If a prop needs a long story, that's a `<Section>` of its own (e.g. "The `asChild` pattern") — not a separate column.
- **Auto-generated props.** The PropsTable is hand-curated so the description text can be opinionated. Future tooling may parse TypeScript types, but the prose is what makes the page useful.

---

## Files that define the template

- [src/components/docs/component-page.tsx](../src/components/docs/component-page.tsx)
- [src/components/docs/preview-block.tsx](../src/components/docs/preview-block.tsx)
- [src/components/docs/code-block.tsx](../src/components/docs/code-block.tsx)
- [src/components/docs/props-table.tsx](../src/components/docs/props-table.tsx)
- [src/components/docs/related-links.tsx](../src/components/docs/related-links.tsx)
- [src/components/docs/index.ts](../src/components/docs/index.ts) (barrel export)
- [src/index.css](../src/index.css) (Shiki dual-theme CSS at the bottom)
- [src/pages/buttons-page.tsx](../src/pages/buttons-page.tsx) (canonical reference)
