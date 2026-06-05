# @dpds-gov/design-system

Dubai Police Design System 2.0 (DPDS 2.0) — the component library, hooks, and tokens used across internal Service Portal applications. Built on React 19, Tailwind v4, Radix primitives, and the shadcn convention. Distributed privately via GitHub Packages.

## Installation

This package lives on GitHub Packages under the `dpds-gov` organisation. Consuming apps need a `.npmrc` and a personal access token before installing.

### 1. Configure your registry

Create or extend `.npmrc` at the repo root:

```ini
@dpds-gov:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

The `${GH_PACKAGES_TOKEN}` reference is expanded from the environment at install time — never commit a literal token.

### 2. Generate a token

At [github.com/settings/tokens](https://github.com/settings/tokens) create a classic PAT with:

- `read:packages` — required to install
- Membership of (or access to) the `dpds-gov` GitHub organisation

Export it before running install:

```bash
export GH_PACKAGES_TOKEN=ghp_xxx
```

### 3. Install

```bash
npm install @dpds-gov/design-system
```

The peer dependencies (`react`, `react-dom`, `react-router-dom`) come from your app.

## Quickstart

```tsx
import "@dpds-gov/design-system/styles.css"
import { Button, ThemeProvider } from "@dpds-gov/design-system"

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Button>Hello DPDS</Button>
    </ThemeProvider>
  )
}
```

`styles.css` ships the design tokens, base reset, and every component utility class. Import it once at your app root.

## Documentation

The live docs site is the canonical reference for every component, prop, and pattern. See `https://docs.dpds-gov.internal` once deployed. The repository's own docs package lives at [`packages/docs`](../docs).

## What's exported

- **Components** — Button, Input, InputGroup, Card, Dialog, Drawer, Combobox, Calendar, every chart family, Sidebar shell, layout primitives, etc. Browse `src/index.ts` for the full surface.
- **Providers + hooks** — `ThemeProvider`/`useTheme`, `BreadcrumbProvider`/`useBreadcrumb`, `useIsMobile`, `useIsRtl`.
- **Utilities** — the `cn()` class-name helper.
- **Sub-exports** — `@dpds-gov/design-system/styles.css` for the stylesheet, `@dpds-gov/design-system/geo/uae-topo.json` for the UAE map TopoJSON used by `UaeMap` and `UaeHex`.

## Peer dependencies

| Package | Range |
|---|---|
| `react` | `^19.0.0` |
| `react-dom` | `^19.0.0` |
| `react-router-dom` | `^7.0.0` |

Consumers must install matching versions; bundling them inside the design system would create the dual-React hazard.

## Versioning

Semver. Current version: `0.1.0`. Until 1.0.0:

- **patch** — bug fixes, internal refactors, type-only changes
- **minor** — new components, new props with defaults that preserve behaviour, additive theme tokens
- **major** — breaking changes to the public API or rendered output

## Repository

[github.com/dpds-gov/design-system](https://github.com/dpds-gov/design-system). Issues, pull requests, and release notes live there. The publishing flow is documented in [`docs/PUBLISHING.md`](../../docs/PUBLISHING.md) at the workspace root.
