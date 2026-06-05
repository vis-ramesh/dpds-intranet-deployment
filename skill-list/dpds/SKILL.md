---
name: dpds
description: "Dubai Police Design System (DPDS) — installation, starter template, and skill setup for the published @dpds-gov/design-system React library. Use whenever someone is starting, installing, or setting up a Dubai Police service/dashboard/portal: creating a project from the service-starter template, authenticating to GitHub Packages, running the app, or installing the DPDS agent skill into an AI tool. Covers the GH_PACKAGES_TOKEN flow, npm run setup / npm run dev, and npx @dpds-gov/design-system add skill."
---
<!-- dpds:managed v=0.7.0 -->
# DPDS skill — setup

DPDS ships as a single published React library, **`@dpds-gov/design-system`**. You install one package and import everything from it — components are not copied into the repo, and there is no plan/scaffold step.

```tsx
import { Button, Card, CardWidget, DataTable } from "@dpds-gov/design-system"
```

This skill covers getting set up. Read the section that matches what you're doing:

## Reference index

**Setup**
- **Creating a project?** See `starter-template.md` — make a repo from `dpds-gov/service-starter`, clone, and run it locally.
- **Hitting a 401 / token problem on install?** See `installation.md` — the package, the `GH_PACKAGES_TOKEN` flow, why `npm run setup` not `npm install`, CI, and troubleshooting.
- **Installing the agent skill into your AI tool?** See `add-skill.md` — `npm run skill` / `add skill`, targets, and options.

**Building UI**
- **Unsure which rule applies?** See `composition-rules.md` — layout/grid, widget selection, spacing, color, typography, navigation, states, responsive, a11y, forbidden list.
- **Need a token name?** See `design-tokens.md` — colors, typography, radius, motion, shadow, z-layers.
- **Composing from a wireframe, or a KPI with no catalog match?** See `layout-patterns.md` — wireframe→grid, KPI composition fallback, worked examples.
- **Adding a page, sidebar entry, or header control?** See `page-workflows.md` — service folder + route + sidebar + i18n wiring, sidebar/topbar update workflows.

For the full component export catalog with props/variants, see `component-catalog.md` (shipped with the design system's own skill).

## Golden rules

1. Import UI **only** from `@dpds-gov/design-system`. No copying component files in, no second UI library.
2. Components are built on **Radix** — `asChild` works (Dialog, Sheet, Drawer, Button…). Do not use base-ui's `render` prop; base-ui is being removed.
3. Don't edit `src/index.css`, don't add a Tailwind config — tokens come from the DS stylesheet.
4. Service token scope is `read:packages` only. `write:packages`/`admin` in a service repo or CI is a supply-chain risk — keep write tokens to the publisher's machine.
5. The CLI installs the **skill**; it does not scaffold components or apply a plan.
<!-- dpds:managed:end -->
