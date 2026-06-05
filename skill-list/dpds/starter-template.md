# What this covers

How to start a new Dubai Police service: creating a repo from the `dpds-gov/service-starter` template, cloning it, and running it locally. The starter is the canonical, pre-wired baseline every service begins from.

---

## The package

| | |
| --- | --- |
| Name | `@dpds-gov/design-system` |
| Registry | GitHub Packages (`https://npm.pkg.github.com`), **restricted** — auth required |
| Scope | `@dpds-gov` |
| Source of truth | github.com/dpds-gov/design-system |
| Styles | `@dpds-gov/design-system/styles.css` + `@dpds-gov/design-system/styles.source.css` |

You consume DPDS by importing from the installed package:

```tsx
import { Button, Card, CardWidget } from "@dpds-gov/design-system"
```

There is no per-component install and no copy-in. Install the package once (via the starter), then import.

## Starter template

Every service starts as a copy of **`dpds-gov/service-starter`** — pre-wired with the design system, Tailwind v4, i18n/RTL, the app shell, and a sample service.

### Create your repo from the template

1. Open <https://github.com/dpds-gov/service-starter>.
2. **Use this template → Create a new repository**.
3. In **Owner**, select **`dpds-gov`** (not your personal account) — services live under the org so the team can find and review them.
4. Name it (e.g. `vehicle-registration-service`), choose **Private**, **Create repository**.

> Don't use `gh repo create --template` — the CLI ignores the owner flag and defaults to your namespace. Use the web UI for owner selection.

### Set up locally

```bash
git clone https://github.com/dpds-gov/<your-service-name>.git
cd <your-service-name>
cp .env.example .env       # then paste your token into .env (see installation.md)
npm run setup              # NOT plain `npm install` (see installation.md)
npm run dev
```

Open the URL it prints — you should see the sample service.

### What's already wired (don't touch)

- `src/index.css` — `@reference` + two `@import`s pull in the DS stylesheet (`styles.source.css` for `@theme` tokens at compile time, `styles.css` for runtime variables + utilities). Don't edit it.
- No `tailwind.config.js` — DPDS ships tokens via `@theme` inside its stylesheet. Don't add a Tailwind config.
- The app shell (layout, sidebar, header, i18n) ships ready; add services under `src/services/<name>/`.
