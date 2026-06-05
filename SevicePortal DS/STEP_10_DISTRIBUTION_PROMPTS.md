# Step 10 — Distribution & Vibe-Coding Enablement (prompts for Claude Code)

Goal: turn the current single-repo design system into a versioned, privately-published npm package that non-coders (Wael, Sami, Adnan) can consume to vibe-code service pages, while Ramesh remains the single source of truth.

Seven self-contained prompts. Run **one at a time**, share the result, then move to the next. Each prompt is written for a fresh Claude Code session with no prior context.

**Architecture decisions locked in:**

- Repo structure: same repo, npm workspace with two packages (`design-system` + `docs`).
- Registry: GitHub Packages (private).
- Current scope: `@<your-gh-username>` (personal account). Migrates to `@dubai-police` later via repo transfer + scope rename — straightforward.

**Order:**

1. **10.1** — Discovery: audit + workspace plan (no changes)
2. **10.2** — Restructure the repo as an npm workspace
3. **10.3** — Configure the DS package (build, exports, types, peers)
4. **10.4** — First publish to GitHub Packages
5. **10.5** — Create the service-starter template repo
6. **10.6** — Write CLAUDE.md + add ESLint guardrails
7. **10.7** — Pilot run + iterate

---

## Step 10.1 — Distribution discovery

You're picking up a Service Portal / Dubai Police Design System docs site (Vite + React + TS + Tailwind, shadcn-style). The current repo bundles the design system *and* the docs site together. We're about to split them into an npm workspace so the design system can be published as a private npm package consumed by service-starter repos.

Goal: audit the current source tree and produce a complete split plan. **No code changes in this step.**

### Pre-flight read

- `package.json` (root) — current dependencies, scripts
- `vite.config.ts`, `tsconfig.json`, `tailwind.config.*` if present, `postcss.config.*`
- `src/main.tsx`, `src/App.tsx`
- `src/index.css` — token definitions
- `src/components/ui/` — list every file (these are DS primitives)
- `src/components/docs/` — list every file (docs-only helpers)
- `src/components/` — every other top-level file
- `src/lib/` — utilities (cn, formatters, hooks)
- `src/hooks/` if it exists
- `src/pages/` — docs pages
- `src/patterns/` — pattern compositions
- `src/locales/`, `src/data/` — docs content
- `public/` — fonts, static assets (note which are DS-shipped vs docs-only)

### Task

Write `docs/STEP_10_AUDIT.md` with the following sections:

**Section 1 — File classification**

A table with one row per src file (or folder if uniform), columns:

- Path
- Classification: **DS** (ships in `@scope/design-system`) / **DOCS** (stays in docs app) / **SHARED** (call it out — needs a decision)
- Reason / notes

Be thorough — every file in `src/` must appear. Examples of expected classifications:

- `src/components/ui/button.tsx` → DS
- `src/components/docs/docs-page.tsx` → DOCS (docs-site-only helper)
- `src/components/app-sidebar.tsx` → DOCS
- `src/components/site-shell.tsx` → DOCS
- `src/lib/utils.ts` (cn) → DS
- `src/index.css` (tokens) → DS
- `src/pages/*` → DOCS
- `src/locales/*` → DOCS
- `src/patterns/*` → likely DOCS (used as examples in docs site); flag if you think any deserve to ship in DS

**Section 2 — Proposed workspace structure**

Show the target tree after restructure:

```
SevicePortal DS/
├── package.json                       # workspace root, "workspaces": ["packages/*"]
├── packages/
│   ├── design-system/
│   │   ├── package.json               # name: @<scope>/dp-design-system
│   │   ├── src/
│   │   │   ├── components/            # ex-ui/
│   │   │   ├── lib/
│   │   │   ├── hooks/
│   │   │   ├── styles.css             # ex-index.css
│   │   │   └── index.ts               # public exports
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts (or vite lib config)
│   └── docs/
│       ├── package.json
│       ├── src/                       # everything that stayed
│       ├── vite.config.ts
│       ├── index.html
│       └── tsconfig.json
└── ...
```

**Section 3 — Proposed public API surface for the DS package**

List what `packages/design-system/src/index.ts` should export. Group by:

- Components (Button, Card, Input, Badge, …)
- Hooks (`useTheme`, …)
- Utilities (`cn`)
- Types (component prop types worth exporting)
- Styles (the stylesheet entry path — `@<scope>/dp-design-system/styles.css`)

Flag any component that has internal-only sub-parts that should NOT be exported.

**Section 4 — Dependencies split**

For the DS package's `package.json`:

- **`peerDependencies`**: `react`, `react-dom` (consumer brings these)
- **`dependencies`**: every runtime dep the components actually use — list each (radix-ui packages, lucide-react, class-variance-authority, clsx, tailwind-merge, etc.). Audit the actual imports — don't copy the root package.json blindly.
- **`devDependencies`**: build tooling (typescript, tsup/vite, etc.)

For the docs package's `package.json`:

- Add `@<scope>/dp-design-system: "workspace:*"` so it consumes the local package via workspace link
- Keep docs-only deps (anything used by `src/pages/` or `src/components/docs/` that isn't in the DS package)

**Section 5 — Tight couplings / risks**

List anything that will break the split:

- DS components importing from `src/pages/` or `src/components/docs/` (should be zero — flag every instance)
- Hardcoded paths or aliases that assume current `src/` layout (`@/` alias mappings, etc.)
- CSS imports with relative paths that will move
- `tailwind.config` content globs that will need updating
- Anything in `public/` referenced via absolute paths (`/fonts/...`)

**Section 6 — Tailwind strategy**

Decide and document:

- Does Tailwind get processed inside the DS package (so consumers don't need to configure it), OR
- Does the DS ship class-name strings and require consumers to install Tailwind + scan its content?

Note: shadcn convention is the latter (consumers own Tailwind). Recommend this unless there's a strong reason to go the former route. Document the decision and what the consumer's `tailwind.config.js` will need to add (specifically: `content: ["./node_modules/@<scope>/dp-design-system/dist/**/*.{js,mjs}"]`).

**Section 7 — Open questions**

Anything you couldn't decide alone — list with options + your recommendation.

### Verify

- Every file in `src/` appears in Section 1.
- No "DS" file imports from a "DOCS" file (if any do — that's a Section 5 finding).

### Commit

Only `docs/STEP_10_AUDIT.md`. Do not modify any source files.

---

## Step 10.2 — Restructure as npm workspace

Pre-req: Step 10.1 done. `docs/STEP_10_AUDIT.md` is the source of truth for the split.

You will physically move files into the new `packages/design-system` and `packages/docs` layout, set up the workspace, and get both packages building independently.

### Pre-flight read

- `docs/STEP_10_AUDIT.md` — the plan
- Current root `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.*`

### Tasks

**A. Set up workspace at root**

1. Create `packages/design-system/` and `packages/docs/` directories.
2. Update root `package.json`:
   - Set `"private": true`
   - Add `"workspaces": ["packages/*"]`
   - Move ONLY workspace-management scripts to root (e.g. `"dev": "npm run dev -w docs"`, `"build:ds": "npm run build -w design-system"`, `"build:docs": "npm run build -w docs"`). Remove app-level scripts that belong inside packages.
   - Remove dependencies from root `package.json` — they all move into the package(s) that actually use them.
3. Keep `.gitignore`, `.git/`, `docs/` (project docs), `README.md`, `STEP_*.md` at root.

**B. Move files into `packages/design-system/`**

Based on Section 1 of the audit, move every DS-classified file. Preserve relative folder structure inside `packages/design-system/src/` (e.g. `src/components/ui/button.tsx` → `packages/design-system/src/components/button.tsx`).

Create `packages/design-system/package.json` per Section 4 of the audit:
- `"name": "@<scope>/dp-design-system"` — use the actual GitHub username for `<scope>`
- `"version": "0.1.0"`
- `"private": true` (we'll flip this when publishing)
- `peerDependencies`, `dependencies`, `devDependencies` per the audit
- `"main"`, `"module"`, `"types"`, `"exports"` — leave as TODO; Step 10.3 finalizes these
- `"files": ["dist", "styles.css"]`

Create `packages/design-system/src/index.ts` per Section 3 of the audit — the public API.

Create `packages/design-system/tsconfig.json` based on the current root tsconfig but scoped to this package.

**Do not configure the build yet** (no tsup/vite lib config in this step). Step 10.3 handles build.

**C. Move files into `packages/docs/`**

Move every DOCS-classified file. The docs package keeps the Vite app shape:
- `packages/docs/index.html`
- `packages/docs/vite.config.ts`
- `packages/docs/tailwind.config.*`
- `packages/docs/postcss.config.*`
- `packages/docs/tsconfig.json`
- `packages/docs/package.json` — name: `dp-docs`, depends on `@<scope>/dp-design-system: "workspace:*"`
- `packages/docs/src/` — all docs files

Update every import in docs files that previously imported DS pieces from `@/components/ui/...` or `@/lib/utils`: change to `@<scope>/dp-design-system`. Use the audit's Section 3 to know what the package exports.

Update `packages/docs/vite.config.ts` `@/` alias to point to `packages/docs/src` (not the moved DS files).

Update `packages/docs/tailwind.config.*` `content` globs to scan both the docs source AND the design-system source (during dev, before publishing). Something like:
```
content: [
  "./index.html",
  "./src/**/*.{ts,tsx}",
  "../design-system/src/**/*.{ts,tsx}",
]
```

**D. Verify**

Run from root:
```
npm install
npm run build:ds         # if you set up a no-op script, otherwise skip
npm run dev              # docs site comes up
npm run build:docs       # docs builds clean
```

The docs site must look and behave identically to before the move. Light mode, dark mode, every Getting Started page, every Component page, every Foundation page — spot check at least 4 routes.

**E. Log**

Create `docs/STEP_10_MIGRATION_LOG.md` and document:
- File counts moved (DS / DOCS / left at root)
- Any audit Section 5 (tight couplings) issues actually hit + how resolved
- Any deviations from the audit + reasoning
- Build/dev command changes (so future contributors know how to run things)

### Commit

One commit covering the whole restructure. Title: `chore: split into design-system + docs workspace`.

---

## Step 10.3 — Configure the DS package for publishing

Pre-req: Step 10.2 done. Workspace runs locally.

Now configure `packages/design-system` to build a publishable artifact: ESM + CJS + types, with a clean public exports map.

### Pre-flight read

- `packages/design-system/package.json`
- `packages/design-system/src/index.ts`
- `packages/design-system/tsconfig.json`
- Audit Section 3 (public API) and Section 6 (Tailwind strategy)

### Tasks

**A. Build tool**

Use **tsup** (Rollup wrapper, sensible defaults for libraries). Add as devDependency:

```
npm i -D tsup -w design-system
```

Create `packages/design-system/tsup.config.ts`:

```ts
import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
})
```

**B. Stylesheet**

Copy `packages/design-system/src/styles.css` to the build output. Add a postbuild step or include via tsup:

- Simplest: `"build": "tsup && cp src/styles.css dist/styles.css"`
- Stylesheet must include all `@layer base` token definitions, font imports, and any reset CSS the consumers need.

If the DS uses fonts shipped from `public/fonts/`, move those into `packages/design-system/fonts/` and update the `@font-face` URLs in `styles.css` to be relative to the published package (e.g. `url("./fonts/Inter.woff2")`). Add `"fonts"` to the package's `"files"` array.

**C. `package.json` finalization**

Set up the exports map cleanly:

```jsonc
{
  "name": "@<scope>/dp-design-system",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css",
    "./tailwind-preset": "./tailwind-preset.cjs"
  },
  "files": ["dist", "fonts", "tailwind-preset.cjs"],
  "sideEffects": ["**/*.css"],
  "scripts": {
    "build": "tsup && cp src/styles.css dist/styles.css",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

**D. Tailwind preset (consumer ergonomics)**

Create `packages/design-system/tailwind-preset.cjs` exporting the design system's Tailwind config (theme extensions, plugins, content globs for the package itself):

```cjs
module.exports = {
  content: ["./node_modules/@<scope>/dp-design-system/dist/**/*.{js,mjs,cjs}"],
  theme: {
    extend: { /* the project's current theme extensions */ }
  },
  plugins: [ /* whatever the docs currently uses */ ]
}
```

Then update `packages/docs/tailwind.config.*` to use the preset:

```js
import preset from "@<scope>/dp-design-system/tailwind-preset"
export default {
  presets: [preset],
  content: ["./index.html", "./src/**/*.{ts,tsx}"]
}
```

This way consumers (docs site today, service-starters tomorrow) get the right theme without copy-pasting config.

**E. Smoke test the build**

```
npm run build -w design-system
```

Verify the `dist/` output contains:
- `index.js` (ESM), `index.cjs` (CJS), `index.d.ts` (types)
- `styles.css`
- Source maps

Then in `packages/docs/`, ensure the docs site can still consume via the workspace link AND that `import "@<scope>/dp-design-system/styles.css"` works from `packages/docs/src/main.tsx`.

Boot the docs site — must still render identically.

**F. Log**

Append to `docs/STEP_10_MIGRATION_LOG.md`:
- Build output sizes (JS, CSS, types)
- Tailwind preset decisions
- Any tree-shake or external mark issues found
- Public API frozen at v0.1.0 (link to `index.ts` for snapshot)

### Commit

`feat(design-system): build pipeline + public exports`

---

## Step 10.4 — First publish to GitHub Packages

Pre-req: Step 10.3 done. `packages/design-system` builds clean.

This step gets the package published privately to GitHub Packages and the docs site verified consuming the published version (briefly, as a smoke test — then we revert to workspace link for normal dev).

### Pre-flight

- Confirm the GitHub repo's owner (`<scope>` = your GitHub username for now).
- Create a GitHub **Personal Access Token (classic)** with `read:packages`, `write:packages`, and `repo` scopes. Save it somewhere safe — you'll need it again for the service-starter.

### Tasks

**A. Configure GitHub Packages on the design-system package**

In `packages/design-system/package.json`:

- Remove `"private": true` (or set `false`) — the package itself must be publishable. (The repo can still be a private GitHub repo; that's separate.)
- Add `publishConfig`:

```jsonc
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "restricted"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/<owner>/<repo>.git",
    "directory": "packages/design-system"
  }
}
```

Replace `<owner>` and `<repo>` with the actual values.

**B. Root `.npmrc`**

Create `.npmrc` at the repo root:

```
@<scope>:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

Add `.npmrc` to `.gitignore` ONLY if it contains a literal token. The form above reads from env, so it's safe to commit — but the token must be in the local shell env or `.env`. **Do not commit the token.**

Add a `.env.example` documenting `GH_PACKAGES_TOKEN=ghp_...`.

**C. First publish**

```
cd packages/design-system
npm run build
export GH_PACKAGES_TOKEN=<token>
npm publish
```

Expected: `+ @<scope>/dp-design-system@0.1.0` published to GitHub Packages.

Verify on GitHub: `https://github.com/<owner>?tab=packages` should show the package.

**D. Smoke test consumption from outside the workspace**

In a scratch folder OUTSIDE this repo:

```
mkdir /tmp/dp-smoke && cd /tmp/dp-smoke
npm init -y
echo "@<scope>:registry=https://npm.pkg.github.com" > .npmrc
echo "//npm.pkg.github.com/:_authToken=$GH_PACKAGES_TOKEN" >> .npmrc
npm i @<scope>/dp-design-system
```

Verify `node_modules/@<scope>/dp-design-system/dist/index.js` exists and `node -e "console.log(Object.keys(require('@<scope>/dp-design-system')))"` lists the expected exports.

Clean up the scratch folder afterwards.

**E. Document the publish flow**

Create `docs/PUBLISHING.md`:

- Versioning policy (semver: patch for fixes, minor for additive, major for breaking)
- Pre-publish checklist (run docs build, run typecheck, bump version in `packages/design-system/package.json`)
- Publish command (with env var setup)
- Post-publish: tag the git commit `v0.1.0`, push tag, create a GitHub Release with notes from `src/data/changelog.json`

**F. Log**

Append to `docs/STEP_10_MIGRATION_LOG.md`:
- Published version + date
- Package size (gzipped)
- Smoke test results
- Link to the published package on GitHub

### Commit

`chore: configure GitHub Packages publishing`

(The `v0.1.0` tag pushes separately after the commit lands.)

---

## Step 10.5 — Create the service-starter template repo

Pre-req: Step 10.4 done. The DS package is published and consumable from outside this workspace.

This step creates a **new, separate** repo on GitHub: `dp-service-starter`. Non-coders will click "Use this template" on this repo every time they need to build a new service. It's a minimal Vite + React + TS shell that imports the DS via the published package.

### Pre-flight

- Confirm the scratch location for the new repo (suggest: `~/Documents/Sandbox/dp-service-starter` or alongside the current repo). The new repo is NOT inside this workspace.
- You'll need `gh` CLI or web access to create the GitHub repo.

### Tasks

**A. Scaffold the project**

Outside the current workspace:

```
npm create vite@latest dp-service-starter -- --template react-ts
cd dp-service-starter
git init
```

**B. Install the DS package**

Create `.npmrc`:

```
@<scope>:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

Add to `.gitignore`: nothing extra needed if the token is env-only. Otherwise add `.npmrc` to `.gitignore`.

Then:

```
npm i @<scope>/dp-design-system
npm i -D tailwindcss postcss autoprefixer @types/node
npx tailwindcss init -p
```

**C. Wire Tailwind to the DS preset**

`tailwind.config.js`:

```js
import preset from "@<scope>/dp-design-system/tailwind-preset"

export default {
  presets: [preset],
  content: ["./index.html", "./src/**/*.{ts,tsx}"]
}
```

`src/index.css`:

```css
@import "@<scope>/dp-design-system/styles.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

`src/main.tsx`:

```tsx
import "./index.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**D. Sample service page**

Create `src/services/` as the folder where all new services live (one folder per service).

Build a `src/services/sample-vehicle-registration/` containing:
- `page.tsx` — a real-looking service page using DS primitives (Card, Button, Input, Label, Badge — whatever the DS exports). Two columns: form on the left, summary card on the right. Header row with title + status Badge. Submit button. Empty state for when there's no data yet.
- A short `README.md` saying "Sample only. Copy this folder to start a new service. Delete when you no longer need the reference."

`src/App.tsx` mounts the sample page. Use a tiny router (or none — just render the sample).

**E. Service folder convention**

Document in the starter's top-level `README.md`:

```
src/
  services/                  # one folder per service
    sample-vehicle-registration/   # delete or rename when you start
    <your-service-name>/
      page.tsx
      components/            # service-specific composite components
      data/                  # mock data, form schemas
      README.md              # what this service does
```

**F. Project metadata**

`package.json`:

- name: `dp-service-starter`
- private: true
- Scripts: `dev`, `build`, `preview`, `typecheck`
- Add a comment in the README about how to start: "Click Use this template on GitHub. Then in your new repo: `npm i` → `npm run dev`."

**G. Push to GitHub + mark as template**

- Create the repo on GitHub (under your personal account for now): `dp-service-starter`
- Push.
- In repo Settings → "Template repository" → enable.
- Add a short README at the repo root explaining: what this is, who it's for, how to use it.

**H. Smoke test the consumer flow end-to-end**

In yet another scratch folder, simulate Wael's flow:

```
gh repo create dp-test-service --template=<owner>/dp-service-starter --clone --private
cd dp-test-service
export GH_PACKAGES_TOKEN=<token>
npm i
npm run dev
```

The sample service page must render with full DS styling. Spot-check dark mode if the starter ships a theme toggle (it should — consider adding `<ThemeToggle />` from the DS in the App shell).

Clean up the scratch repo.

**I. Log**

Back in the main repo, append to `docs/STEP_10_MIGRATION_LOG.md`:
- Service-starter repo URL
- Sample page screenshot suggestion
- Any DS exports missing that the starter needed (file as Step 10.6 follow-up)

### Commit

In the main repo, only a log entry. The starter repo has its own history.

---

## Step 10.6 — CLAUDE.md + ESLint guardrails

Pre-req: Step 10.5 done. Service-starter exists and consumes the DS.

This is the **most important** step for the vibe-coding flow. `CLAUDE.md` is the agent brief — it teaches Claude Code exactly how to use the DS without hallucinating or drifting. ESLint catches the drift Claude does anyway.

### Pre-flight read

- The DS package's `src/index.ts` (the public API)
- The sample service page from Step 10.5
- The Components and Foundations doc pages (URLs in the deployed docs site) — these are the canonical reference

### Tasks

**A. Write `CLAUDE.md` at the root of `dp-service-starter`**

Structure (target length: 250-400 lines of dense, scannable content):

1. **Project context (5 lines)** — what this repo is, who you (Claude) are working for, what the deliverable is.

2. **The Golden Rules (a short non-negotiables list)**
   - Only import from `@<scope>/dp-design-system`. Never write custom CSS files. Never edit `node_modules/`. Never use inline `style={}` for visual properties. Never hardcode colors (`#fff`, `rgb(...)`, named colors) — always use Tailwind utility classes from the preset or CSS variables from the DS. Never invent components that look like DS components — if it doesn't exist, ask the user.

3. **Where things go**
   - New services: `src/services/<service-name>/`
   - Page component: `src/services/<service-name>/page.tsx`
   - Service-specific composite components: `src/services/<service-name>/components/`
   - Mock data and form schemas: `src/services/<service-name>/data/`
   - Routing: keep `App.tsx` simple; one route per service page.

4. **Component catalog** — every export from the DS, with import path, key props, and a one-line "use when" description. Group by category:
   - Layout: Card, Separator, ...
   - Inputs: Button, Input, Label, Textarea, Select, Checkbox, RadioGroup, Switch, ...
   - Data display: Badge, Avatar, Table, ...
   - Overlays: Dialog, DropdownMenu, Tooltip, Popover, ...
   - Feedback: Alert, Toast (if exported), Progress, Skeleton, ...
   - Navigation: Tabs, Breadcrumb, ...
   - Theme: useTheme, ThemeToggle, ...

   For each, show one minimal usage example. Example:

   ```tsx
   import { Button } from "@<scope>/dp-design-system"

   <Button variant="default" size="default" onClick={...}>
     Submit
   </Button>
   // Variants: default | secondary | outline | ghost | destructive | link
   // Sizes: default | sm | lg | icon
   ```

   **Pull the actual variant lists from the DS source — do not invent.**

5. **Patterns** — recipes for common composite UIs:
   - Two-column form layout (form left, summary right)
   - Page header with title + breadcrumb + action buttons
   - Empty state card
   - Loading skeleton
   - Data table with row actions
   - Modal confirm flow

   Show actual code using DS primitives.

6. **What NOT to do** (with bad/good examples)

   ```
   ❌ BAD
   <button style={{ backgroundColor: '#1e40af', color: 'white' }}>Submit</button>

   ✅ GOOD
   <Button variant="default">Submit</Button>
   ```

   Cover: custom colors, custom typography, inline styles, creating new components that wrap a single DS component for no reason, importing Radix directly.

7. **When the DS is missing something**
   - Stop. Add a `// TODO(DS): need <component-name>` comment in the code.
   - Ask the user to flag it to Ramesh for the next DS release.
   - Use the closest existing primitive as a placeholder, with the TODO visible.

8. **Theme + dark mode**
   - The starter has a `<ThemeToggle />` in the App shell. Don't remove it.
   - `useTheme` returns `{ theme, setTheme }` (no `resolvedTheme`).
   - Dark mode is the `.dark` class on `<html>`. Don't add your own dark-mode toggle logic.

9. **Accessibility expectations**
   - Every interactive element gets a visible focus ring (already in DS — don't override).
   - Labels for every input (use `<Label>` from DS).
   - Icons-only buttons need an `aria-label`.

10. **Review expectations**
    - When done, push to a branch. Ramesh will review the diff.
    - Ramesh's review checks: only DS imports, no custom CSS, no inline color styles, proper aria-labels, no `TODO(DS)` left unannounced.

11. **How to ask for help** — if Claude is unsure, ask the user (Wael/Sami/Adnan) before guessing. Better to ask than drift.

**B. Add ESLint guardrails to the starter**

Install:

```
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-no-restricted-imports
```

`.eslintrc.cjs`:

```js
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    // Force DS imports for any UI primitive
    "no-restricted-imports": ["error", {
      patterns: [
        { group: ["@radix-ui/*"], message: "Import from @<scope>/dp-design-system instead of Radix directly." },
        { group: ["@/components/ui/*"], message: "No DS components live in this repo. Import from @<scope>/dp-design-system." },
      ]
    }],
    // Catch inline color styles
    "react/forbid-component-props": ["warn", {
      forbid: [{
        propName: "style",
        message: "Use Tailwind utility classes from the DS preset, not inline styles."
      }]
    }],
  },
  settings: { react: { version: "detect" } }
}
```

Add a custom rule (or commit-time check via a tiny script) that greps for:
- `#[0-9a-fA-F]{3,8}` in `.tsx`/`.css` files (hex colors)
- `rgb\(`, `hsl\(` in source files
- `style={{` in JSX

Wire as `npm run lint`. Run in CI (GitHub Actions, super short workflow).

**C. CI workflow**

`.github/workflows/check.yml` in the starter:

```yaml
name: check
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: echo "@<scope>:registry=https://npm.pkg.github.com" > .npmrc
      - run: echo "//npm.pkg.github.com/:_authToken=${{ secrets.GH_PACKAGES_TOKEN }}" >> .npmrc
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
```

Add `GH_PACKAGES_TOKEN` to the starter repo's Actions secrets. (Workflow templates will need this secret to be present in *each* service repo that's spun up from the starter — document this in `CLAUDE.md` and the starter README.)

**D. Dependabot for DS updates**

`.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule: { interval: "weekly" }
    allow:
      - dependency-name: "@<scope>/dp-design-system"
```

Now whenever you publish a new DS version, every service repo gets an auto-PR bumping the dependency.

**E. Log**

Update the starter repo's `README.md`:
- Link to `CLAUDE.md` as the "if you're an AI agent reading this, start here" file
- Brief humans-facing summary of the rules

Back in the main repo, append to `docs/STEP_10_MIGRATION_LOG.md`:
- `CLAUDE.md` LOC
- Lint rule summary
- Outstanding follow-ups for Step 10.7

### Commit

In the starter repo: `feat: CLAUDE.md + lint guardrails`.

---

## Step 10.7 — Pilot run + iterate

Pre-req: Step 10.6 done. `CLAUDE.md` written, lint guardrails active.

This is the truth test: hand one real service brief to Claude inside a fresh starter clone and see where it trips. The output of this step is a **revised `CLAUDE.md`** based on actual failure modes.

### Pre-flight

- Pick one real service brief — ideally a short PRD (1-2 pages) for a service Wael/Sami/Adnan would actually build. If no real brief is available, write a synthetic but realistic one (e.g. "Fine Payment Status Lookup" or "Vehicle Renewal Reminder").
- Spin up a fresh repo from `dp-service-starter` (via "Use this template").

### Tasks

**A. Run the pilot**

1. Open the fresh repo in Claude Code (or Cowork).
2. Upload the PRD into the chat.
3. Prompt: *"Build this service per the PRD. Follow the conventions in CLAUDE.md. The page should live at src/services/<service-name>/."*
4. Watch what Claude does **without intervening**. Let it finish. Save the resulting code as the pilot artifact.

**B. Score the output**

Score against these criteria (yes/no/partial for each):

- Imported only from `@<scope>/dp-design-system` (zero Radix-direct, zero custom UI files)
- No custom CSS files created
- No inline `style={}` for visual properties
- No hardcoded colors
- Used `<Label>` with every `<Input>`
- Icon-only buttons have `aria-label`
- Service folder structure matches the convention (`src/services/<name>/page.tsx`)
- Page renders correctly in light AND dark mode
- Page is keyboard-navigable end to end
- ESLint passes (`npm run lint`)
- TypeScript passes (`npm run typecheck`)
- Build passes (`npm run build`)

**C. Diagnose every failure**

For each "no" or "partial":
- What did Claude do?
- Was the rule clearly stated in `CLAUDE.md`?
- Was the example clear?
- What single change to `CLAUDE.md` would have prevented this?

**D. Revise `CLAUDE.md`**

Apply every diagnosed fix. Add explicit examples for any pattern Claude missed. Strengthen the "What NOT to do" section with the exact failures observed.

**E. Re-run the pilot from scratch**

Same brief, fresh repo. Score again. The second run should score better. Document the delta.

**F. Final write-up**

Create `docs/STEP_10_PILOT.md` in the main repo:
- The brief used
- First-run score
- Failure modes + `CLAUDE.md` revisions
- Second-run score
- Outstanding gaps (file as Step 11 backlog)
- Recommended cadence for re-piloting (e.g. every DS minor release)

**G. Hand-off prep**

When you're satisfied with the second-run quality:
- Update the starter `README.md` with the final flow for Wael/Sami/Adnan:
  1. Click "Use this template" on the dp-service-starter repo
  2. Clone your new repo locally
  3. Run `npm i` then `npm run dev`
  4. Open the project in Cowork / Claude Code
  5. Drop your PRD into the chat
  6. Prompt: *"Build this service per the PRD."*
  7. Iterate until you're happy with the preview
  8. Push to a branch and ping Ramesh for review
- Write a 5-minute walkthrough doc (with screenshots) covering steps 1-8 above. Save to the main repo as `docs/SERVICE_BUILDER_GUIDE.md`.

### Commit

Main repo: `docs: Step 10 pilot results + service builder guide`.
Starter repo: `chore: CLAUDE.md revisions from pilot`.

---

## What's left after Step 10

- **Step 11** — Onboarding session with Wael, Sami, Adnan. Watch them do it live for the first time. More `CLAUDE.md` revisions.
- **Step 12** — Set up the actual review workflow (PR templates, review checklist, merge cadence).
- **Future** — When Dubai Police provides a GitHub org: repo transfer + scope rename. Small, mechanical.
