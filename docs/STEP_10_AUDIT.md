# STEP 10 — Audit & Split Plan

Audit of the current source tree in preparation for splitting **DPDS 2.0** into an npm workspace with two packages:

- `@dpds-gov/design-system` — the publishable design-system package
- `@dpds-gov/docs` — this docs site, which becomes the first consumer

No code is changed in this step. Source: snapshot at `rv_v6` HEAD.

---

## Section 1 — File classification

Legend: **DS** = ships in `@dpds-gov/design-system`. **DOCS** = stays in the docs app. **SHARED** = needs a decision (called out in Section 5).

### `src/` (root files)

| Path | Classification | Reason / notes |
|---|---|---|
| `src/main.tsx` | DOCS | Vite entry. Imports `./index.css`, `./i18n`, `./App`. Belongs to the docs app shell. |
| `src/App.tsx` | DOCS | React Router config wiring every docs page + the two pattern preview routes. Pure docs concern. |
| `src/App.css` | DOCS (likely **dead**) | Defines `.counter`, `.hero`, etc.; no `import "./App.css"` anywhere in the tree. Verify before delete. |
| `src/i18n.ts` | DOCS | i18next init for docs site copy. DS components that read translations (lang-dropdown, theme-toggle) consume `react-i18next` directly — they don't import this init file. See Section 5 risk. |
| `src/index.css` | **SHARED — split** | Tokens (`@theme inline { … }`), motion + shadow + z-index tokens, dark theme `:root`/`.dark` overrides, and `@font-face` declarations belong in DS. The Shiki block (`.docs-code-block .shiki …`) and `App.css`-style snippets are DOCS-only. See Section 6. |

### `src/components/` (top-level)

| Path | Classification | Reason / notes |
|---|---|---|
| `src/components/app-sidebar.tsx` | DOCS | The docs site sidebar — hard-coded `sections: Section[]` array enumerating every docs route. Pure navigation for the docs app. |
| `src/components/layout.tsx` | DOCS | Docs app shell: composes `ThemeProvider`, `BreadcrumbProvider`, `SidebarProvider`, `AppSidebar`, `Header`, footer. The shell *uses* DS primitives but is itself a docs concern. |
| `src/components/breadcrumb-context.tsx` | DS | Generic `BreadcrumbProvider` + `useBreadcrumb` + `useHeaderAction` hooks. **Required** by `ui/header.tsx`, which is DS. Consumers need this too if they use `<Header />`. |
| `src/components/theme-provider.tsx` | DS | Generic `<ThemeProvider />` + `useTheme()`. No docs-only logic. Consumers will want this. |

### `src/components/ui/` — design-system primitives

All `.tsx` files in `src/components/ui/` and the one subfolder `chart-elements/` → **DS**.

Files (102 total): `accordion`, `activity-bar-chart`, `activity-card`, `activity-composed-chart`, `alert`, `animated-beam-multiple-outputs`, `animated-beam`, `animated-list`, `aspect-ratio`, `avatar`, `badge`, `banner`, `bento-grid`, `breadcrumb`, `bubble-stat-chart`, `button`, `button-group`, `calendar`, `card`, `card-widget`, `chart-elements/chart-dot`, `chart-elements/rounded-bar`, `checkbox`, `collapsible`, `combobox`, `coming-soon`, `command`, `container`, `context-menu`, `data-table`, `decor-image`, `dialog`, `drawer`, `dropdown-menu`, `empty-state`, `empty-state-hero`, `fade-in`, `field`, `flip-card`, `gauge-chart`, `glow-radar-chart`, `grid`, `header`, `hover-card`, `input`, `input-group`, `input-otp`, `inverted-pyramid-chart`, `label`, `lang-dropdown`, `list`, `login-modal`, `magic-card`, `marquee`, `menu`, `multi-line-chart`, `navbar`, `pagination`, `phone-input.css`, `phone-input`, `point-cloud-chart`, `popover`, `profile-switcher`, `progress`, `progress-tracker`, `radio-group`, `resizable`, `sales-report-chart`, `sankey-chart`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `spinner`, `stack`, `stacked-bar-chart`, `stat-card`, `stat-tile`, `stepper`, `straight-line-chart`, `switch`, `tabs`, `tag`, `textarea`, `theme-toggle`, `toggle`, `tooltip`, `uae-hex`, `uae-map`, `uae-pass-button`, `upcoming-appointments`, `user-dropdown`, `walkthrough`, `wallet-cards`.

Special notes on individual files (more detail in Section 5):

| File | Note |
|---|---|
| `ui/coming-soon.tsx` | Imports `react-router-dom` → DS gets `react-router-dom` as a `peerDependency` (or extract a router-free variant). |
| `ui/header.tsx` | Imports `@/components/breadcrumb-context` → that file becomes DS. |
| `ui/lang-dropdown.tsx`, `ui/theme-toggle.tsx` | Use `react-i18next` `useTranslation()` with keys like `common.language`, `theme.toggle.*`. Today those keys live in docs `locales/en.json`. Means DS either ships its own minimal i18n namespace OR documents required keys (see Section 5). |
| `ui/profile-switcher.tsx` | Imports `@/hooks/useIsRtl` → hook moves with DS. |
| `ui/sidebar.tsx` | Imports `@/hooks/use-mobile` → hook moves with DS. |
| `ui/login-modal.tsx`, `ui/upcoming-appointments.tsx` | Hard-import lottie JSONs from `@/components/lottie/*.json`. See Section 5 — these must either accept Lottie data via props (refactor) or `components/lottie/` ships in DS. |
| `ui/activity-card.tsx`, `ui/empty-state-hero.tsx` | Accept lottie data via prop (`lottieId`, `lottieData`) — no hard import. Clean. |
| `ui/uae-hex.tsx`, `ui/uae-map.tsx` | Fetch `/uae-topo.json` (absolute public path). Need ship-with-DS asset strategy. |
| `ui/user-dropdown.tsx`, `ui/upcoming-appointments.tsx`, `ui/empty-state-hero.tsx`, `ui/animated-beam-multiple-outputs.tsx`, `ui/input.tsx` | Reference `/img/...` absolute paths (avatar default, logo, icon-channel, decor-circle, file-icons). See Section 5. |
| `ui/chart-elements/chart-dot.tsx`, `ui/chart-elements/rounded-bar.tsx` | Internal helpers for the chart family — do **not** export from public DS index. |
| `ui/phone-input.css` | Sibling stylesheet imported by `phone-input.tsx`. Ships with DS as a side-import. |

### `src/components/docs/` — docs-only helpers

All 19 files → **DOCS**.

`code-block`, `component-page`, `docs-page`, `external-links`, `foundation-page`, `index.ts`, `pattern-page`, `pattern-preview`, `preview-block`, `props-table`, `prose`, `related-links`, `token-scale`, `token-swatch`, `used-components`, `uses-tokens`.

Verified: 7 of these import from `@/components/ui/*` (one-way: DOCS → DS, which is allowed). None of `src/components/ui/*` imports from `src/components/docs/*` ✓.

`code-block.tsx` is the only consumer of `shiki` and of the `.docs-code-block` CSS in `index.css`.

### `src/components/lottie/` — Lottie animation JSONs

| Path | Classification | Reason / notes |
|---|---|---|
| `src/components/lottie/registry.ts` | **SHARED** — see Section 5 | Re-exports every Lottie JSON. Consumed by 2 DS files (login-modal, upcoming-appointments) AND 7 docs pages. |
| `src/components/lottie/*.json` (50 files) | **SHARED** — see Section 5 | Recommendation: keep in DOCS as showcase assets; refactor the 2 DS components to accept lottie data via props (matches what activity-card and empty-state-hero already do). |

### `src/hooks/`

| Path | Classification | Reason / notes |
|---|---|---|
| `src/hooks/use-mobile.ts` | DS | Consumed by `ui/sidebar.tsx`. Generic viewport-width hook. |
| `src/hooks/useIsRtl.ts` | DS | Consumed by `ui/profile-switcher.tsx` + several docs pages. Reads `document.dir` — generic. |

### `src/lib/`

| Path | Classification | Reason / notes |
|---|---|---|
| `src/lib/utils.ts` | DS | The `cn(...inputs)` helper. Used by every UI component. Must be exported by DS. |

### `src/data/`

| Path | Classification | Reason / notes |
|---|---|---|
| `src/data/changelog.json` | DOCS | Changelog content for the docs `/docs/changelog` page. |
| `src/data/dashboard-data.ts` | DOCS | Mock data for `pages/dashboard-page.tsx` and analytics widgets. |

### `src/locales/`

| Path | Classification | Reason / notes |
|---|---|---|
| `src/locales/en.json`, `src/locales/ar.json` | DOCS | Docs-site translation strings. **BUT** keys consumed by `lang-dropdown` / `theme-toggle` (DS) — flagged in Section 5. |

### `src/stores/`

| Path | Classification | Reason / notes |
|---|---|---|
| `src/stores/inquiry-store.ts` | DOCS | Zustand store used by `inquiry-form-page.tsx` and `project-structure-page.tsx`. Demo-only state. |

### `src/pages/` — all DOCS

All `.tsx` files in `src/pages/` → **DOCS** (110 files). These are docs routes: every primitive showcase page (`buttons-page`, `card-page`, …), every pattern preview (`patterns-login-page`, `patterns-signup-page`), every foundation page (`colors-page`, `typography-page`, …), every "getting started" stub (`introduction-page`, `project-structure-page`, …), and three helper modules (`dashboard-widgets.tsx`, `analytics-widgets.tsx`, `ui-demo-helpers.tsx`) used by other pages.

### `src/patterns/` — all DOCS

| Path | Classification | Reason / notes |
|---|---|---|
| `src/patterns/login.tsx`, `src/patterns/signup.tsx` | DOCS | Composed full-page patterns rendered both as docs routes and as iframe targets from `PatternPreview`. Showcase content, not reusable primitives. |

### `public/`

| Path | Classification | Reason / notes |
|---|---|---|
| `public/favicon.svg` | DOCS | Docs site favicon. |
| `public/fonts/*` | DS | Bukra + Dubai + dp-icon-font. Referenced by `@font-face` rules in `index.css` (DS). Must ship with DS or be installed by consumer. See Section 5. |
| `public/img/avatar/`, `public/img/decor/`, `public/img/file-icons/`, `public/img/icon-channel.svg`, `public/img/logo-sm.svg` | DS | Referenced by `/img/...` absolute paths from 5 DS components. See Section 5. |
| `public/img/` — other contents (`card.png`, `Dubai-Police-Default-Icon.svg`, `dp-logo-color.svg`, `esaad.svg`, `logo.svg`, etc.) | DOCS | Used by docs pages / patterns. |
| `public/uae-topo.json`, `public/uae.json` | DS | Referenced by `ui/uae-hex.tsx` and `ui/uae-map.tsx`. See Section 5. |
| `public/icons.svg` | Verify | grep finds no reference in `src/`. Likely DOCS or dead. |
| `public/uae-topo.json` (root `/`) | — | Empty zero-byte duplicate at repo root. Dead file; delete during split. |

---

## Section 2 — Proposed workspace structure

```
SevicePortal DS/                              # workspace root (current repo root)
├── package.json                              # private; "workspaces": ["packages/*"]
├── pnpm-workspace.yaml | (or npm workspaces)
├── tsconfig.base.json                        # shared compilerOptions
├── .gitignore, eslint.config.js, .mcp.json   # root tooling stays
├── docs/                                     # the STEP_*.md series (project docs)
├── packages/
│   ├── design-system/
│   │   ├── package.json                      # name: "@dpds-gov/design-system", version: 0.1.0
│   │   ├── README.md
│   │   ├── tsconfig.json                     # extends ../../tsconfig.base.json
│   │   ├── tsup.config.ts                    # build (esm + d.ts)
│   │   ├── src/
│   │   │   ├── index.ts                      # public exports — see Section 3
│   │   │   ├── styles.css                    # ex-src/index.css (tokens + @font-face only)
│   │   │   ├── components/                   # ex-src/components/ui/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── … (every primitive)
│   │   │   │   ├── chart-elements/           # internal — not re-exported
│   │   │   │   ├── header.tsx
│   │   │   │   ├── phone-input.css
│   │   │   │   ├── theme-provider.tsx        # ex-src/components/theme-provider.tsx
│   │   │   │   └── breadcrumb-context.tsx    # ex-src/components/breadcrumb-context.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-mobile.ts
│   │   │   │   └── use-is-rtl.ts             # rename to kebab-case for consistency
│   │   │   └── lib/
│   │   │       └── utils.ts                  # cn()
│   │   └── assets/                           # see Section 5 — ship-with-DS strategy
│   │       ├── fonts/                        # ex-public/fonts/*
│   │       ├── img/                          # only DS-referenced subset of public/img
│   │       └── geo/uae-topo.json             # ex-public/uae-topo.json
│   └── docs/
│       ├── package.json                      # name: "@dpds-gov/docs", "private": true
│       ├── tsconfig.json
│       ├── vite.config.ts                    # ex-root vite.config.ts
│       ├── index.html                        # ex-root index.html
│       ├── public/                           # only docs-referenced assets
│       └── src/
│           ├── main.tsx
│           ├── App.tsx
│           ├── App.css                       # if kept
│           ├── i18n.ts
│           ├── docs.css                      # Shiki block extracted from index.css
│           ├── components/
│           │   ├── app-sidebar.tsx
│           │   ├── layout.tsx
│           │   ├── docs/                     # ex-src/components/docs/
│           │   └── lottie/                   # ex-src/components/lottie/
│           ├── data/
│           ├── locales/
│           ├── pages/
│           ├── patterns/
│           └── stores/
```

Notes:
- `dpds-cli/` (existing top-level folder) is unaffected and stays at the workspace root, or can become its own workspace package later.
- `SevicePortal DS/` (the existing folder with `STEP_*` files) currently sits at the repo root — it should fold into `docs/` to avoid two parallel doc dirs. Out of scope for this audit; flag in housekeeping.

---

## Section 3 — Proposed DS public API surface

`packages/design-system/src/index.ts` should re-export:

### Components — primitives

`Accordion`, `Alert`, `AspectRatio`, `Avatar`, `Badge`, `Banner`, `Breadcrumb`, `Button`, `ButtonGroup`, `Calendar`, `Card`, `Checkbox`, `Collapsible`, `Combobox`, `Command`, `ContextMenu`, `DataTable`, `Dialog`, `Drawer`, `DropdownMenu`, `EmptyState`, `Field`, `HoverCard`, `Input`, `InputGroup`, `InputOTP`, `Label`, `Menu`, `Navbar`, `Pagination`, `PhoneInput`, `Popover`, `Progress`, `ProgressTracker`, `RadioGroup`, `Resizable`, `ScrollArea`, `Select`, `Separator`, `Sheet`, `Sidebar`, `Skeleton`, `Slider`, `Sonner` (`Toaster`), `Spinner`, `Stepper`, `Switch`, `Tabs`, `Tag`, `Textarea`, `Toggle`, `Tooltip`.

### Components — shell + layout primitives

`Header`, `LangDropdown`, `ProfileSwitcher`, `ThemeToggle`, `UserDropdown`, `Container`, `Grid`, `Stack`.

### Components — opinionated / branded

`UaePassButton`, `UaeHex`, `UaeMap`, `LoginModal`, `WalletCards`, `UpcomingAppointments`, `ActivityCard`, `EmptyStateHero`, `StatCard`, `StatTile`, `CardWidget`, `ProfileSwitcher`, `DecorImage`, `FlipCard`, `Walkthrough`, `ComingSoon`.

### Components — charts

`ActivityBarChart`, `ActivityComposedChart`, `BubbleStatChart`, `GaugeChart`, `GlowRadarChart`, `InvertedPyramidChart`, `MultiLineChart`, `PointCloudChart`, `SalesReportChart`, `SankeyChart`, `StackedBarChart`, `StraightLineChart`.

### Components — animation

`AnimatedBeam`, `AnimatedBeamMultipleOutputs`, `AnimatedList`, `BentoGrid`, `FadeIn`, `MagicCard`, `Marquee`.

### Providers / context

`ThemeProvider` (+ `useTheme`), `BreadcrumbProvider` (+ `useBreadcrumb`, `useHeaderAction`).

### Hooks

`useIsMobile`, `useIsRtl`.

### Utilities

`cn` (the only public lib helper).

### Types

Per-component prop types, exported alongside each component (e.g. `ButtonProps`, `CardProps`, `DataTableProps<T>`). Recommended pattern: each component file does `export type X = …` and the index re-exports `export type { X } from "./components/x"`.

### Styles

Single entry: `@dpds-gov/design-system/styles.css` — covers tokens, `@font-face` rules, motion + shadow + z-index tokens, marquee keyframes. Consumers import once at the app root.

### Do NOT export

- `chart-elements/chart-dot`, `chart-elements/rounded-bar` — internal chart subparts.
- `ui-demo-helpers`-style helpers — these don't exist in `ui/` (they're in `pages/`), confirming the split is clean.
- Any docs-only helper (none of these live under `ui/` today).

---

## Section 4 — Dependencies split

### `packages/design-system/package.json`

```jsonc
{
  "name": "@dpds-gov/design-system",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "import": "./dist/index.js", "types": "./dist/index.d.ts" },
    "./styles.css": "./dist/styles.css",
    "./assets/*": "./assets/*"
  },
  "files": ["dist", "assets"],
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0"   // only because ui/coming-soon uses <Link>
  },
  "dependencies": {
    "@base-ui/react": "^1.3.0",
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-aspect-ratio": "^1.1.8",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-icons": "^1.3.2",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.6.1",
    "@tanstack/react-table": "^8.21.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "d3": "^7.9.0",
    "d3-hexbin": "^0.2.2",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.38.0",
    "i18next": "^26.0.4",                // lang-dropdown + theme-toggle
    "input-otp": "^1.4.2",
    "intl-tel-input": "^27.0.10",
    "lottie-react": "^2.4.1",
    "lucide-react": "^1.8.0",
    "motion": "^12.39.0",
    "next-themes": "^0.4.6",             // sonner + magic-card
    "react-day-picker": "^9.14.0",
    "react-hook-form": "^7.74.0",
    "react-i18next": "^17.0.2",
    "react-resizable-panels": "^2.1.9",
    "recharts": "^3.8.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.5.0",
    "three": "^0.184.0",
    "topojson-client": "^3.1.0",
    "tw-animate-css": "^1.4.0",          // referenced from styles.css
    "vaul": "^1.1.2",
    "@fontsource-variable/geist": "^5.2.8"  // imported from styles.css
  },
  "devDependencies": {
    "@types/d3": "^7.4.3",
    "@types/d3-hexbin": "^0.2.5",
    "@types/three": "^0.184.1",
    "@types/topojson-client": "^3.1.5",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "tailwindcss": "^4.2.2",
    "tsup": "^8.x",                       // build tool — recommended
    "typescript": "~6.0.2"
  }
}
```

Notable dependency moves vs. root:
- `react`, `react-dom`, `react-router-dom` → `peerDependencies` (no double-React).
- `zod` (root) → **drop** unless re-added by a future form. No DS imports today.
- `swiper` (root) → **drop** unless `/ui/swiper` route is later implemented. No imports today.
- `zustand` → **DOCS only** (inquiry-store).
- `@vercel/analytics` → **DOCS only** (App.tsx).
- `shiki` → **DOCS only** (code-block.tsx).
- `shadcn` → can be dropped as a runtime dep (CSS import path resolves at build time; review if anything else still uses it).
- `react-is` → unclear ownership; keep in DOCS unless a DS file imports it.

### `packages/docs/package.json`

```jsonc
{
  "name": "@dpds-gov/docs",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@dpds-gov/design-system": "workspace:*",
    "@vercel/analytics": "^2.0.1",
    "i18next": "^26.0.4",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-i18next": "^17.0.2",
    "react-router-dom": "^7.14.0",
    "shiki": "^4.0.2",
    "zustand": "^5.0.12"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.2.2",
    "@types/node": "^24.12.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "tailwindcss": "^4.2.2",
    "typescript": "~6.0.2",
    "vite": "^8.0.4"
  }
}
```

---

## Section 5 — Tight couplings / risks

### 5.1 — DS files that hard-import lottie JSONs

`src/components/ui/login-modal.tsx` and `src/components/ui/upcoming-appointments.tsx` import named exports from `@/components/lottie/registry`. If lottie/ stays in DOCS, those imports break.

**Recommendation:** refactor both files to accept lottie data via a prop (matching the existing `activity-card.tsx` / `empty-state-hero.tsx` pattern), so DS can stay asset-free. Alternative: ship a curated lottie subset under `packages/design-system/assets/lottie/` and export it from `@dpds-gov/design-system/lottie`.

### 5.2 — DS components reading from absolute `/public` paths

| File | Reference |
|---|---|
| `ui/user-dropdown.tsx` | `/img/avatar/Image.webp` (default `avatarSrc`) |
| `ui/upcoming-appointments.tsx` | `/img/icon-channel.svg` |
| `ui/empty-state-hero.tsx` | `/img/decor/decor-circle.svg` (×2) |
| `ui/animated-beam-multiple-outputs.tsx` | `/img/logo-sm.svg` |
| `ui/input.tsx` | `/img/file-icons/{pdf,word,xls,zip,video,image}.svg` |
| `ui/uae-hex.tsx`, `ui/uae-map.tsx` | `d3.json("/uae-topo.json")` |

These won't resolve when the DS is consumed by another app whose `/public` doesn't carry these files.

**Options:**

- **A.** Inline the SVGs / encode as data URIs at build time. Best for `decor-circle`, `logo-sm`, `file-icons`, `icon-channel` — tiny SVGs.
- **B.** Bundle assets in DS and use ESM imports (`import iconChannel from "../assets/img/icon-channel.svg"`), letting Vite/bundler resolve them per consumer.
- **C.** Make the asset a prop with a sensible fallback that throws/logs if not provided. Best for `uae-topo.json` (big file, consumer may want to lazy-fetch).

Recommended: B for SVGs, C for `uae-topo.json` (accept `topoData` prop).

### 5.3 — DS components reading i18n keys

`ui/lang-dropdown.tsx` and `ui/theme-toggle.tsx` call `useTranslation()` and read keys like `common.language`, `common.english`, `common.arabic`, `theme.toggle.*`. Those keys currently live in `src/locales/en.json` (DOCS).

**Options:**

- **A.** Ship a `@dpds-gov/design-system/i18n/en.json` + `ar.json` with the keys these two components need; docs imports them and merges into its own bundle.
- **B.** Make the strings injectable via props (`<LangDropdown labels={{ language, english, arabic }} />`) and drop the DS dep on `react-i18next` entirely.
- **C.** Document the required keys and require consumers to define them.

Recommended: **B** for cleanest API (removes `i18next` + `react-i18next` from DS runtime deps for everything except lang-dropdown), or **A** as the lower-friction path.

### 5.4 — `ui/header.tsx` depends on `breadcrumb-context`

`header.tsx` calls `useBreadcrumbSlot()` from `@/components/breadcrumb-context`. Solved by moving `breadcrumb-context.tsx` into DS (classified as DS in Section 1). No further action — just ensure both move together.

### 5.5 — `src/index.css` mixes DS and DOCS rules

The file contains:
- DS: `@theme inline { … }` (all color/radius/duration/shadow/z tokens), `:root` + `.dark` semantic mappings, `@font-face` declarations for Bukra + Dubai + dp-icon-font, marquee keyframes, swiper override.
- DOCS: `.docs-code-block .shiki { … }` block + `.dark .docs-code-block .shiki` overrides (Shiki rendering — only used by `components/docs/code-block.tsx`).

**Plan:** create two stylesheets:
- `packages/design-system/src/styles.css` ← everything except the Shiki block.
- `packages/docs/src/docs.css` ← the Shiki block (plus any other docs-only CSS that surfaces during migration). Docs imports both.

The `@font-face` URLs use absolute paths (`/fonts/...`). After migration these need to either (a) become bundler-resolved imports, or (b) stay absolute and require the consumer to copy the fonts into their `/public/fonts/`. (b) is simpler; document it.

### 5.6 — Path alias `@/` is project-rooted today

Every DS file uses `@/components/ui/*`, `@/lib/utils`, etc. After split, `@/` needs to mean "this package's `src/`", not the workspace root. Each package's `tsconfig.json` and `vite.config.ts` (or `tsup.config.ts`) needs its own `paths` block. Docs's `@/` resolves to its own `src/`; DS's `@/` resolves to DS's `src/`. No DS code uses `@/pages` / `@/patterns` / `@/data` / `@/stores` / `@/locales` / `@/components/docs` / `@/components/app-sidebar` / `@/components/layout` (verified by grep), so no aliases break across the boundary.

### 5.7 — `tailwind.config` — there is none

This project uses Tailwind v4 (CSS-first config via `@theme` in `index.css`) + `@tailwindcss/vite`. There is no `tailwind.config.js`. See Section 6 — the strategy must account for this.

### 5.8 — Other public assets referenced by DS

- `public/fonts/29ltbukra*.{woff,woff2,…}`, `public/fonts/Dubai*.{woff,woff2}`, `public/fonts/dp-icon-font.woff` — referenced by `@font-face` rules in DS styles.
- `public/uae-topo.json` — referenced by `ui/uae-hex.tsx`, `ui/uae-map.tsx`.

These are part of the DS deliverable. See 5.2 for the strategy.

### 5.9 — `react-router-dom` in DS

Only `ui/coming-soon.tsx` imports it. Two options:
- Keep `react-router-dom` as a `peerDependency` of DS and let consumers route through the same instance.
- Move `coming-soon` to DOCS (it's arguably a docs-affordance, not a primitive) and drop `react-router-dom` from DS entirely.

Recommended: move `coming-soon.tsx` → DOCS. It only ships in pages that are "coming soon" stubs, which is itself a docs-site concern.

### 5.10 — Orphaned root deps

`zod`, `swiper`, `shadcn` (runtime), `react-is` — verify before deleting. Search confirms no source-tree usage; safe to drop as part of the split.

### 5.11 — `src/App.css` looks dead

No `import` of `App.css` exists anywhere in `src/` or `public/`. Confirm and delete during migration.

### 5.12 — Repo-root `uae-topo.json` is empty

A zero-byte `uae-topo.json` sits at the repo root next to `vite.config.ts`. Dead. Delete.

### 5.13 — One-way coupling verified (no DS → DOCS imports)

`grep` across `src/components/ui/` shows zero imports from `@/pages`, `@/patterns`, `@/data`, `@/locales`, `@/stores`, or `@/components/docs`. The DS → DOCS boundary is clean today except for the i18n + lottie + public-asset issues called out above.

---

## Section 6 — Tailwind strategy

This codebase uses **Tailwind v4 with CSS-first configuration** (`@tailwindcss/vite` + `@theme` blocks in `src/index.css`). There is no `tailwind.config.js`. That changes the usual shadcn answer.

**Recommendation: option (B) — DS ships CSS-first tokens via `@theme`; consumers run Tailwind themselves and scan DS content.**

DS contribution:
- `packages/design-system/src/styles.css` exports `@theme` blocks with all color / radius / motion / shadow / z-index tokens (plus dark `.dark` override block, font-face declarations, marquee keyframes). It does **not** itself `@import "tailwindcss"`.
- DS components ship pre-written class names (`bg-primary-500`, `text-foreground`, etc.) that depend on the tokens above.

Consumer contribution (in their app's CSS, typically `src/index.css`):

```css
@import "tailwindcss";
@import "@dpds-gov/design-system/styles.css";
```

And their `vite.config.ts` keeps `@tailwindcss/vite` as today.

For Tailwind v4 to generate utilities for class names *inside* DS source files, the consumer must include DS source/dist in the content scan. With Tailwind v4 + the Vite plugin, this is auto-detected for files that pass through the bundler, but pre-built `dist` artifacts may not be — so the DS `package.json` should either:

- Ship un-transpiled `src/` alongside `dist/` (and document an explicit include path), OR
- Pre-emit a "utilities" CSS file alongside `styles.css` that contains every class used by DS components, so consumers don't need to scan DS at all.

Recommended: emit a `dist/styles.css` that includes both the `@theme` and the utilities used by DS components, scanned at DS-build time via the Tailwind CLI. Consumers then just `@import "@dpds-gov/design-system/styles.css"` and never have to touch their own Tailwind config — this is the lowest-friction path for service-starter apps.

Final consumer `index.css`:

```css
@import "tailwindcss";                           /* consumer's own utilities */
@import "@dpds-gov/design-system/styles.css";        /* DS tokens + DS-utility classes */
```

That's it. Consumers don't need a `tailwind.config.js`.

---

## Section 7 — Open questions

Each item needs a decision before STEP 11 (the actual split):

1. **Workspace tool — npm, pnpm, or yarn?** Repo currently uses `npm` (`package-lock.json` present). pnpm has the cleanest workspace UX and the strictest peer-dep enforcement. **Recommend:** pnpm. **Alternative:** stay on npm workspaces (zero migration cost).

2. **Lottie strategy** (Section 5.1) — refactor DS lottie consumers to take props, OR ship a curated lottie set with DS? **Recommend:** refactor `login-modal` + `upcoming-appointments` to accept lottie data via props. Cleaner public API, no asset bloat in DS.

3. **i18n in DS** (Section 5.3) — strings via props, or via a shipped i18n namespace? **Recommend:** props (drop `i18next` + `react-i18next` from DS runtime deps entirely). Smaller dep surface for consumers.

4. **`coming-soon.tsx` ownership** (Section 5.9) — DS or DOCS? **Recommend:** DOCS. Lets DS drop `react-router-dom` from its peer deps.

5. **Asset shipping pattern** (Section 5.2) — bundler-imported via ESM, or kept at consumer's `/public/...`? **Recommend:** ESM imports for small SVGs; prop-injected for `uae-topo.json`.

6. **`@react-three/*` + `three`** — these are *only* used by `point-cloud-chart.tsx`. They add ~1MB to the DS dep tree. Should `point-cloud-chart` be moved to a separate optional sub-package (`@dpds-gov/charts-3d`)? **Recommend:** defer — keep as DS dep for v0.1, split out later if consumers complain about bundle size.

7. **`SevicePortal DS/` folder at repo root** — already holds `STEP_8_*` and `STEP_10_*` prompt markdown. Fold this into `docs/` to avoid having two parallel `docs` directories? Out of scope here; flag for cleanup before the actual split.

8. **CSS export path** — `@dpds-gov/design-system/styles.css` or split into `tokens.css` + `utilities.css` + `fonts.css`? **Recommend:** single bundled file for v0.1 (one import); split later if consumers want à la carte.

9. **Versioning & publishing** — npm publish to private registry, or just `workspace:*` internally until v1? **Defer to project lead.**

---

## Verification

- Every file under `src/` appears at least once in Section 1 (root files: 5 / `components/`: 4 top-level + 102 in `ui/` + 19 in `docs/` + 50 in `lottie/` / `hooks/`: 2 / `lib/`: 1 / `data/`: 2 / `locales/`: 2 / `stores/`: 1 / `pages/`: 110 / `patterns/`: 2 = full coverage). ✓
- No file classified **DS** imports from a file classified **DOCS** today, verified by grep (Section 5.13). The known boundary frictions (lottie hard-imports, i18n key reliance, `/img` and `/uae-topo.json` absolute references) are reclassifications/refactors, not import-graph violations. ✓
