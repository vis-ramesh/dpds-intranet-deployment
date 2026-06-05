# STEP 10 — Migration log (decouple DS from DOCS)

Source of truth: `docs/STEP_10_AUDIT.md`. This log records what was actually changed during the decoupling step. No file *moves* except those explicitly listed in the brief; the rest is in-place refactor + asset relocation.

## Task A — Lottie refactor

Removed direct `lottie/registry` and `lottie/*.json` imports from DS files. Both DS consumers now take a `lottieData?: object` prop and render the Lottie player only when the prop is provided.

| File | Change |
|---|---|
| [src/components/ui/login-modal.tsx](../src/components/ui/login-modal.tsx) | Dropped `import Icon34 from "@/components/lottie/Icon_34.json"`. Added `lottieData?: object` to `LoginModalContentProps`. Guarded the Lottie slot with `{lottieData && …}`. |
| [src/components/ui/upcoming-appointments.tsx](../src/components/ui/upcoming-appointments.tsx) | Dropped `import { Icon01 } from "@/components/lottie/registry"`. Added `UpcomingAppointmentsProps { lottieData?: object }` and forwarded it to the two `EmptyStateHero` instances. |

Docs callers updated to pass the registry entry explicitly:

| Caller | Change |
|---|---|
| [src/pages/login-modal-page.tsx](../src/pages/login-modal-page.tsx) | Added `import Icon34 from "@/components/lottie/Icon_34.json"`. Passed `lottieData={Icon34}` to both `<LoginModalContent variant="full" />` and `<LoginModalContent variant="uaepass" />`. |
| [src/pages/dashboard-page.tsx](../src/pages/dashboard-page.tsx) | `Icon01` was already imported from the registry; passed `lottieData={Icon01}` to both `<UpcomingAppointments />` instances. |

Naming decision: kept `lottieData` (existing convention in `EmptyStateHero`) rather than introducing `lottieAnimation`.

## Task B — i18n refactor

DS components no longer import `react-i18next`. Both accept a `labels?` prop with English defaults inline. `LangDropdown` additionally became fully controlled (`value` + `onValueChange`) since its job is to change the active language — without this, removing react-i18next would have killed the only state-change wiring inside the component.

| File | Change |
|---|---|
| [src/components/ui/lang-dropdown.tsx](../src/components/ui/lang-dropdown.tsx) | Rewrote (~38 LOC, was 26). Drops `useTranslation`. New `LangDropdownProps` exposes `value`, `onValueChange`, `labels?: { language?, english?, arabic? }`. Defaults: "Language" / "English" / "Arabic". `language` becomes the trigger's `aria-label`. |
| [src/components/ui/theme-toggle.tsx](../src/components/ui/theme-toggle.tsx) | Dropped `useTranslation`. Added `labels?: { toggleTheme?, light?, dark?, system? }`. Defaults: "Toggle theme" / "Light" / "Dark" / "System". |

Header is the only consumer of `LangDropdown` and `ThemeToggle` in `src/`. Because Header ships in DS, it cannot itself read `react-i18next` — so the props bubble up:

| Caller | Change |
|---|---|
| [src/components/ui/header.tsx](../src/components/ui/header.tsx) | Added `HeaderProps { language?, onLanguageChange?, langLabels?, themeLabels? }`. Forwards to `LangDropdown` + `ThemeToggle`. |
| [src/components/layout.tsx](../src/components/layout.tsx) (DOCS) | Added `useTranslation()`, built `handleLanguageChange` (mirrors the previous in-LangDropdown wiring incl. `localStorage.setItem("app-language", value)`), and passes `language`, `onLanguageChange`, `langLabels`, `themeLabels` into `<Header />`. |
| [src/pages/dark-mode-page.tsx](../src/pages/dark-mode-page.tsx) | Page already used `useTranslation`. Built a `themeLabels` object and passed it to the live `<ThemeToggle align="start" />` instance (the other `<ThemeToggle>` on this page is inside the `WIRING_SNIPPET` string — left untouched intentionally). |

Verified: `grep -r "react-i18next" src/components/ui/` returns empty.

## Task C — Asset path refactor

Created `src/assets/img/{avatar,decor,file-icons}/` (DS-bound). Used `git mv` for every relocation so history is preserved.

Relocations (`public/img/...` → `src/assets/img/...`):

- `avatar/Image.webp`
- `decor/decor-circle.svg`
- `logo-sm.svg`
- `icon-channel.svg`
- `file-icons/{pdf,word,xls,zip,video,image}.svg`

Component updates (absolute-path → ESM import):

| File | Change |
|---|---|
| [src/components/ui/user-dropdown.tsx](../src/components/ui/user-dropdown.tsx) | `import defaultAvatar from "@/assets/img/avatar/Image.webp"`. `avatarSrc` default switched from string literal to imported URL. |
| [src/components/ui/upcoming-appointments.tsx](../src/components/ui/upcoming-appointments.tsx) | `import iconChannel from "@/assets/img/icon-channel.svg"`. Switched `<img src="/img/icon-channel.svg" />` → `<img src={iconChannel} />`. |
| [src/components/ui/empty-state-hero.tsx](../src/components/ui/empty-state-hero.tsx) | `import decorCircle from "@/assets/img/decor/decor-circle.svg"`. Both `decor-circle.svg` references switched (replace_all). |
| [src/components/ui/animated-beam-multiple-outputs.tsx](../src/components/ui/animated-beam-multiple-outputs.tsx) | `import logoSm from "@/assets/img/logo-sm.svg"`. Switched `<img src="/img/logo-sm.svg" />` → `<img src={logoSm} />`. |
| [src/components/ui/input.tsx](../src/components/ui/input.tsx) | Imported the 6 file-icon SVGs and replaced the string returns inside `getFileIcon()`. Function signature unchanged (still returns `string \| null`). |

UAE maps now accept a `topoData` prop with a TODO marker for STEP_10_2B:

| File | Change |
|---|---|
| [src/components/ui/uae-hex.tsx](../src/components/ui/uae-hex.tsx) | Added `UAEHexbinMapProps { topoData?: object }`. Inside `useEffect`, `const topoPromise = topoData ? Promise.resolve(topoData) : d3.json("/uae-topo.json")` with `// TODO(10.2B): require topoData prop once asset is bundled`. `useEffect` deps now include `topoData`. |
| [src/components/ui/uae-map.tsx](../src/components/ui/uae-map.tsx) | Same shape. |

Verified: `grep -rE '"/img/' src/components/ui/` returns empty. The only `/uae-topo.json` references that remain are inside the documented fallback branch + JSDoc, per the brief.

## Task D — `coming-soon` → DOCS

| Change | Detail |
|---|---|
| `git mv src/components/ui/coming-soon.tsx src/components/docs/coming-soon.tsx` | File body unchanged. |
| [src/components/docs/index.ts](../src/components/docs/index.ts) | Added `export { ComingSoon } from "./coming-soon"`. |
| Importer updates | None required — grep found zero importers across `src/`. (App.tsx route hits `/ui/login-modal` but not `ComingSoon`; the component was exported but unused.) |

Verified: `grep -r "react-router-dom" src/components/ui/` returns empty.

## Task E — CSS split

| File | Change |
|---|---|
| [src/docs.css](../src/docs.css) | New file. Contains only the Shiki rules (`.docs-code-block .shiki { … }` + `.dark .docs-code-block .shiki` overrides + the slate-900 override). 25 LOC. |
| [src/index.css](../src/index.css) | Removed the Shiki block (-26 LOC). Remaining content is DS-pure: Tailwind/shadcn imports, `@theme` tokens, `:root` + `.dark` semantic mappings, motion/shadow/z-index tokens, marquee keyframes, swiper override, font-face declarations. |
| [src/main.tsx](../src/main.tsx) | Added `import './docs.css'` immediately after the existing `import './index.css'`. |

## Task F — Dead file cleanup

| Change | Detail |
|---|---|
| `git rm src/App.css` | Confirmed zero importers via grep across `src/` and `public/`. |
| `git rm uae-topo.json` | Empty zero-byte file at repo root (the real one lives in `public/`). |
| Root deps (`zod`, `swiper`, `shadcn`, `react-is`) | Left in place per brief — will be re-resolved during the workspace restructure. |

## Verification

- `npm run build` ✓ clean. TypeScript references compile (`tsc -b`); Vite emits the bundle. The `INEFFECTIVE_DYNAMIC_IMPORT` warnings against `src/components/lottie/*.json` are pre-existing (the registry both statically and dynamically re-exports the same JSONs); unrelated to this step.
- `npm run dev` ✓ Vite reports `ready in 93 ms` on `http://localhost:5173/`. HTTP probe on `/`, `/ui/login-modal`, `/docs/dark-mode`, `/forms/fileupload`, `/ui/empty-state`, `/charts`, `/foundations/colors` all return 200. Vite resolves the refactored `.tsx` modules and the new `src/assets/img/icon-channel.svg` (200 on each).
- Guard greps — all return empty:
  - `grep -r "react-i18next" src/components/ui/`
  - `grep -r "lottie/registry" src/components/ui/`
  - `grep -rE '"/img/' src/components/ui/`
  - `grep -r "react-router-dom" src/components/ui/`

## Deviations from the brief

1. **LangDropdown picked up an `onValueChange` prop** (not in the brief). The component's job is to switch the active language; removing `react-i18next` removed the only mechanism it had to do that. Without a controlled-component contract, the dropdown would become decorative. The brief said the verify grep must be empty, so an external state hook is required. Layout (DOCS) supplies the handler — same behavior as before, the wiring just moved up.
2. **Header gained `language` + `onLanguageChange` + `langLabels` + `themeLabels` props.** Same reasoning: Header is DS and cannot use `react-i18next`, so it forwards the props its DS children now need from its DOCS caller (Layout).

## Audit predictions that turned out differently

- **Section 5.1 (Lottie)** predicted "two DS components that hard-import lottie JSON." Confirmed: `login-modal` and `upcoming-appointments` (which the audit listed as importing from `@/components/lottie/registry`). Actually `login-modal` imports `Icon_34.json` directly (not via the registry) — same fix, slightly different path. No surprise.
- **Section 5.2 (assets)** predicted 5 files + 2 maps. Confirmed exactly. The audit listed `user-dropdown` as needing `/img/avatar/Image.webp` — confirmed.
- **Section 5.3 (i18n)** predicted `lang-dropdown` would need three keys; `theme-toggle` four. Confirmed. The actually-used i18n keys are exactly the ones the audit listed.
- **Section 5.9 (`coming-soon`)** predicted moving to DOCS would drop `react-router-dom` from DS entirely. Confirmed — the verify grep is empty.
- **Section 5.11 (`App.css`)** predicted "no importers in `src/` or `public/`." Confirmed.
- **Section 5.12 (root `uae-topo.json`)** predicted zero-byte dead file. Confirmed.
- **No DS → DOCS imports introduced**: still clean.

---

# STEP 10.2B — Workspace restructure

Physical split into `packages/design-system/` and `packages/docs/`. Both install via `npm install` from the workspace root; docs consumes DS via the npm-workspace symlink plus a TS path mapping (no DS dist yet — that's 10.3).

## File counts moved

| Group | Count | Destination |
|---|---|---|
| DS source files | 114 | `packages/design-system/src/` — 98 components + 2 hooks + 1 lib/utils + 1 styles.css + 11 image assets + 1 index.ts |
| Docs source files | 184 | `packages/docs/src/` — 110 pages, 19 docs/, 50 lottie JSONs, 2 patterns, 2 components (app-sidebar, layout), data/, locales/, stores/, App.tsx, main.tsx, i18n.ts, docs.css |
| Docs public assets | 64 | `packages/docs/public/` — fonts, favicon, brand images, uae-topo.json |
| Root configs migrated to docs | 5 | `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` |
| New config files | 4 | root `package.json` (rewritten), `tsconfig.base.json`, both package `package.json` + `tsconfig.json` |
| Deletions | 4 | `src/assets/{hero.png,react.svg,vite.svg}` (unused Vite-template scaffolding the audit missed — Section 1 didn't list them; confirmed zero importers); empty `src/` tree |

## `useIsRtl.ts` → `use-is-rtl.ts`

Renamed via `git mv` inside the DS hooks dir. Importers updated:

| File | Previous | Now |
|---|---|---|
| DS: `packages/design-system/src/components/profile-switcher.tsx` | `import useIsRtl from "@/hooks/useIsRtl"` | `import useIsRtl from "../hooks/use-is-rtl"` (relative; see Tailwind/alias note below) |
| Docs: `app-sidebar.tsx`, `pages/inquiry-form-page.tsx`, `pages/service-status-page.tsx`, `pages/inquiry-detail-page.tsx`, `pages/request-detail-page.tsx` | `import useIsRtl from "@/hooks/useIsRtl"` (default) | `import { useIsRtl } from "@dpds-gov/design-system"` (named — barrel re-exports the default as a named binding) |

The DS hooks file itself still does `export default function useIsRtl`. The barrel at `packages/design-system/src/index.ts` re-exports it as `export { default as useIsRtl }` so consumers get a named binding.

## Tailwind v4 content-scan approach

No `@source` directive needed. Verified the built CSS contains DS-side utility classes (`bg-primary`, `bg-primary-100`..`bg-primary-900`, `text-foreground`, `--color-primary-50`, etc.). Tailwind v4's `@tailwindcss/vite` plugin scans every module Vite touches, and since docs's import graph reaches DS source via the npm-workspace symlink, the DS `.tsx` files are scanned in place. The pre-split CSS bundle was 280 kB; post-split it's 148 kB — the drop is from removing `src/App.css` (dead) plus the previous build pulling in tw-animate-css extras that the new module graph no longer references. Confirmed via grep on the dist CSS that all expected utility classes are present.

## Path-alias and module-resolution choices

Three non-trivial decisions, each documented inline plus here:

1. **`@/` removed from DS source.** Original audit Section 5.6 assumed each package could keep its own `@/` alias pointing at its own `src/`. That works for tsc (each project has its own tsconfig) but **not** for Vite — Vite resolves `resolve.alias` globally against the build, so `@/components/badge` from a DS file would resolve to `packages/docs/src/components/badge` (wrong) instead of the DS sibling. Refactoring DS source to use relative imports (`./button`, `../lib/utils`, `../hooks/use-mobile`, `../assets/img/...`) removed the ambiguity. Bulk find-replace across all DS `.tsx` files; verified no `@/` remains under `packages/design-system/src/`.
2. **Docs `tsconfig.app.json` carries a `paths` entry pointing `@dpds-gov/design-system` at `../../design-system/src/index.ts`.** Without it, tsc could not resolve the module — DS's `package.json` deliberately has no `main`/`types`/`exports` (10.3 will add those alongside the tsup build). The mapping affects only TypeScript; Vite resolves through the node_modules symlink as normal.
3. **Removed the docs → DS TS project reference.** The brief proposed `references: [{ "path": "../design-system" }]`, but project references require the referenced project to be `composite: true` and emit-capable (TS6306/TS6310 errors), which conflicts with the brief's "no main/types/exports yet." Removing the reference is fine here because (a) DS has no build of its own to chain off in 10.2B, and (b) tsc still walks into DS sources via the path mapping above for type-checking. The reference can be re-added in 10.3 when DS becomes composite.

## Deviations from the brief

1. **Audit's orphan-deps list (`zod`, `swiper`, `shadcn`, `react-is`) was wrong on three of four.** Re-verified during install/build:
   - `zod` — used by `patterns/login.tsx`, `patterns/signup.tsx`, `stores/inquiry-store.ts`, `pages/{form,patterns-login,patterns-signup,transaction-enquiry}-page.tsx`. Restored to docs deps.
   - `swiper` — used by `pages/ui-components-page.tsx`. Restored to docs deps.
   - `shadcn` — DS `styles.css` does `@import "shadcn/tailwind.css"`. Restored to DS deps.
   - `react-is` — confirmed unused in our source (only transitively imported by `recharts`). Dropped.
2. **`workspace:*` → `*`.** Brief showed `"@dpds-gov/design-system": "workspace:*"`; that's a pnpm/yarn protocol and npm rejects it with `EUNSUPPORTEDPROTOCOL`. Changed to `"*"`, which npm resolves to the local workspace automatically.
3. **DS source uses relative imports rather than `@/`.** See "Path-alias" point 1 above. The DS `tsconfig.json` still defines `paths: { "@/*": ["*"] }` per the brief; it's harmless given no remaining DS file references `@/`, and keeps the file shape the brief specified.
4. **Removed TS project reference from docs to DS.** See "Path-alias" point 3 above.
5. **`components.json` (shadcn CLI config) restored.** It was implicitly deleted alongside the root-package strip; I restored it under `packages/design-system/components.json` with `tailwind.css` updated to `src/styles.css` and the `ui` alias collapsed to `@/components` (no longer `@/components/ui`).
6. **Barrel re-exports for `StepStatus` collision.** Both `stepper.tsx` and `progress-tracker.tsx` defined a public `StepStatus` type with different value unions, causing `TS2308`. The barrel now only re-exports `Stepper` and `StepperStep` from stepper (skipping its `StepStatus`), and `export *` from progress-tracker (canonical `StepStatus`). Docs callers of `StepStatus` (`progress-tracker-page.tsx`, `inquiry-detail-page.tsx`) already meant progress-tracker's variant.
7. **Two DS files had `from "../theme-provider"` that pre-existed in the codebase.** `activity-card.tsx` and `stat-card.tsx` were originally at `src/components/ui/` and reached "up" to `src/components/theme-provider.tsx`. After the move into `packages/design-system/src/components/`, `theme-provider.tsx` is a sibling, so I corrected both to `from "./theme-provider"`.
8. **i18n description string update.** `packages/docs/src/locales/en.json` line 2695 referenced "the renamed `@/components/ui/menu` file" as user-facing prose. Rewrote to "Re-exported from `@dpds-gov/design-system`" so the user-facing docs match the new import path.

## Outstanding for STEP 10.3

- DS dist build via tsup (or similar) — emit `.js` + `.d.ts` from `src/index.ts`.
- Add `main`/`module`/`types`/`exports` fields to `packages/design-system/package.json`.
- Replace the `paths` workaround in `packages/docs/tsconfig.app.json` with a real package entry once `dist` exists.
- Replace the `import "@dpds-gov/design-system/src/styles.css"` workaround in `packages/docs/src/main.tsx` with the package's stylesheet export. The line carries a `TODO(10.3)` comment.
- Bundle DS fonts (`public/fonts/*` currently still in docs's public/) — decide between consumer-installs vs. DS-ships-via-asset.
- Bundle `uae-topo.json` properly. `ui/uae-hex.tsx` and `ui/uae-map.tsx` currently fall back to `d3.json("/uae-topo.json")` — once the asset ships with DS, change to "prop required" and remove the fallback. Files already carry `TODO(10.2B)` comments — promote to `TODO(10.3)` or resolve.
- DS becomes `composite: true`; re-add `references: [{ "path": "../design-system" }]` to docs tsconfig so `tsc -b` chains correctly.

## Status of orphan deps + nested `SevicePortal DS/`

- Orphan deps audit was *mostly* wrong (see Deviations #1). Final state: `zod`, `swiper` live in docs; `shadcn` lives in DS; `react-is` confirmed dropped.
- The nested `SevicePortal DS/` folder at the repo root contains 4 markdown planning docs: `DESIGN_SYSTEM_PLAN.md`, `STEP_BY_STEP_PROMPTS.md`, `STEP_8_GETTING_STARTED_PROMPTS.md`, `STEP_10_DISTRIBUTION_PROMPTS.md`. Two of those are STEP-series prompts that arguably belong with the other steps in `docs/`. The folder is otherwise unrelated to the workspace split. Per the brief, **not deleted** — flagged for follow-up. Recommend moving the two `STEP_*` files into `docs/` and either renaming the folder to drop the typo or folding the remaining two planning docs into `docs/` as well.

## Verification (10.2B)

- `npm install` — 546 packages installed; `@dpds-gov/design-system` symlinked at `node_modules/@dpds-gov/design-system → packages/design-system`.
- `npm run typecheck` — both `@dpds-gov/design-system` and `@dpds-gov/docs` pass (`tsc --noEmit`).
- `npm run build` (= `build:docs`) — 5766 modules transformed, build succeeded. The pre-existing `INEFFECTIVE_DYNAMIC_IMPORT` warnings on Lottie JSONs persist; unrelated.
- `npm run dev` — Vite ready in ~1s. HTTP probe: `/`, `/buttons`, `/foundations/colors`, `/docs/dark-mode`, `/patterns/login`, `/forms/fileupload`, plus a direct fetch of the DS source via `/@fs/...` and an asset (`icon-channel.svg`) — all 200.
- Guard greps — all clean:
  - `grep -r "@/components/ui/" packages/docs/src/` → empty
  - `grep -r "@/components/docs/" packages/design-system/src/` → empty
  - `grep -rl "from \"@dpds-gov/design-system" packages/docs/src/` → 115 files
  - `grep -r "@/components/ui/" packages/design-system/src/` → empty

---

# STEP 10.3 — DS build pipeline (tsup + tailwind CLI + bundled assets)

DS now produces a real `dist/` and docs consumes it through the published exports map. All 10.2B workarounds (DS-source tsconfig path, `@dpds-gov/design-system/src/styles.css` import, Vite source alias) are gone.

## DS dist contents + sizes

| Artifact | Size | Notes |
|---|---|---|
| `dist/index.js` (+ map) | 465 KB (925 KB map) | tsup ESM bundle from `src/index.ts`. `react`, `react-dom`, `react-router-dom` are external. |
| `dist/index.d.ts` | 84 KB | All public types. tsup spawns its own tsc pass for declarations. |
| `dist/styles.css` | 179 KB | Minified Tailwind v4 build of `src/styles.css` (tokens + `@source`-scanned utilities + `@font-face` rules). |
| `dist/index.css` + map | 1.8 KB + 3.2 KB | Side-effect CSS from `phone-input.css` that tsup picks up via JS imports. |
| `dist/fonts/` | 40 files, 4.8 MB | Bukra (5 weights × 5 formats), Dubai (4 weights × 2 formats), `dp-icon-font.woff`. `@font-face` URLs in `styles.css` are now `./fonts/...` (package-relative). |
| `dist/geo/uae-topo.json` | 145 KB | UAE TopoJSON, sub-exported at `@dpds-gov/design-system/geo/uae-topo.json`. |
| `dist/*.svg` (8 files) + `dist/Image*.webp` | 51 KB total | Asset files tsup emits from ESM imports inside DS components (file-icons, decor-circle, logo-sm, icon-channel, default avatar). |
| **Total `dist/`** | **6.6 MB** | Dominated by fonts (4.8 MB) and the JS source map (925 KB; can be opt-out for publish). |

## TS project reference restored

Yes. `packages/docs/tsconfig.app.json` now has `references: [{ "path": "../design-system" }]`, and the `paths` block dropped the `@dpds-gov/design-system` workaround introduced in 10.2B. `npm run build` from root invokes `build:ds` first so `packages/design-system/dist/index.d.ts` exists before the docs `tsc -b` traverses the reference.

## Configuration moves

| File | Change |
|---|---|
| [packages/design-system/package.json](../packages/design-system/package.json) | Added `main`, `types`, `exports` map (`.`, `./styles.css`, `./geo/uae-topo.json`), `files: ["dist"]`, `sideEffects: ["**/*.css"]`. Added `tsup` + `@tailwindcss/cli` to devDependencies. New build script: tsup + `tailwindcss -i src/styles.css -o dist/styles.css --minify` + cp for fonts and geo. |
| [packages/design-system/tsup.config.ts](../packages/design-system/tsup.config.ts) | New. ESM only, `dts: { compilerOptions: { composite: false, incremental: false } }` (see deviations). `react`, `react-dom`, `react-router-dom` external. |
| [packages/design-system/tsconfig.json](../packages/design-system/tsconfig.json) | `composite: true`, `declaration: true`, `declarationMap: true`, `emitDeclarationOnly: true`, `outDir: "./dist"`, `rootDir: "./src"`. `paths` dropped (DS source uses relative imports since 10.2B). |
| [packages/design-system/src/styles.css](../packages/design-system/src/styles.css) | `@source "./components/**/*.{ts,tsx}"`, `@source "./hooks/**"`, `@source "./lib/**"` consolidated at top. All `@font-face` URLs rewritten from `/fonts/...` to `./fonts/...`. |
| Fonts | `git mv packages/docs/public/fonts → packages/design-system/src/fonts` (40 files). |
| `uae-topo.json` | `git mv packages/docs/public/uae-topo.json → packages/design-system/src/geo/uae-topo.json`. |
| [packages/design-system/src/components/uae-hex.tsx](../packages/design-system/src/components/uae-hex.tsx), [uae-map.tsx](../packages/design-system/src/components/uae-map.tsx) | `topoData` is now required (no `= {}` default, no `?` on prop). Removed the `d3.json("/uae-topo.json")` fallback; the `useEffect` body is now synchronous (no Promise wrap). |
| [packages/docs/tsconfig.app.json](../packages/docs/tsconfig.app.json) | Dropped the `@dpds-gov/design-system → ../../design-system/src/index.ts` workaround. Added `references: [{ "path": "../design-system" }]`. |
| [packages/docs/src/main.tsx](../packages/docs/src/main.tsx) | `import "@dpds-gov/design-system/src/styles.css"` → `import "@dpds-gov/design-system/styles.css"`. TODO removed. |
| [packages/docs/vite.config.ts](../packages/docs/vite.config.ts) | Dropped the array-form regex alias that pointed `@dpds-gov/design-system` at DS source; restored the original `@: ./src` single alias. Vite resolves DS through the workspace symlink + package.json `exports` now. |
| [packages/docs/src/pages/charts-page.tsx](../packages/docs/src/pages/charts-page.tsx) | UAE map JSX was inside a `/* */` block. Uncommented it; imported `UaeHex`, `UaeMap` from `@dpds-gov/design-system` and `uaeTopology` from `@dpds-gov/design-system/geo/uae-topo.json`. Both maps now render in the Charts demo. |
| Root [package.json](../package.json) | `build:ds` now runs the real DS build (`npm run build -w @dpds-gov/design-system`); `build` runs DS first then docs (chained). |

## Deviations from the brief

1. **tsup `dts` configured as an object, not `true`.** With DS as `composite: true`, tsup's default tsc-based DTS pass walked into the project and hit `TS6307` because composite mode requires *every* compiled file to be in the project's `include` list (and tsup's emitted virtual program lists only the entry). The fix is to give tsup's DTS pass its own override: `dts: { compilerOptions: { composite: false, incremental: false } }`. Inline override; no extra tsconfig file needed.
2. **DS tsconfig sets `emitDeclarationOnly: true`** (not in the brief). The base tsconfig has `allowImportingTsExtensions: true`, which TS rejects unless `noEmit` or `emitDeclarationOnly` is set. Since tsup emits the `.js`, tsc only needs to emit `.d.ts` — `emitDeclarationOnly: true` makes both rules happy without altering `noEmit` semantics from the brief.
3. **`charts-page.tsx` UAE JSX was commented out.** Brief assumed there's a UaeMap demo page. The only docs reference was a `/* */`-wrapped block in `charts-page.tsx`. Uncommented and wired with `topoData={uaeTopology}` so the brief's verify step ("UaeMap demo page must render") is meaningful. Tweaked the wrapper `<CardWidgetHeader>` markup since the original was using a missing `<WidgetHeader>` import — used the existing `CardWidgetHeader/Title` pair.
4. **Project reference still attached to `tsconfig.app.json`, not the root `tsconfig.json`.** The brief says "In `packages/docs/tsconfig.json` (or `tsconfig.app.json`, wherever app-side options live)". Docs uses the split pattern (`tsconfig.json` is just `references` to app + node), so the reference goes in `tsconfig.app.json`. Functionally equivalent.

## Verification

- `npm run build:ds` from root → tsup builds JS + DTS, tailwindcss CLI emits the minified `dist/styles.css`, fonts and geo are copied. Total `dist/` = 6.6 MB (4.8 MB of which is fonts).
- `npm run build` from root → chained build succeeds (DS first, then docs). Docs dist CSS is 216 KB (DS's pre-built `dist/styles.css` plus docs-side utilities); docs JS bundle is 8.98 MB (unchanged; same modules being transformed).
- `npm run typecheck` from root → both packages pass.
- `npm run dev` from root → Vite ready in ~120 ms. HTTP probe on `/`, `/buttons`, `/charts`, `/docs/dark-mode`, `/foundations/colors`, `/patterns/login` all 200. Direct probes confirm `dist/styles.css` and `dist/geo/uae-topo.json` are served via `/node_modules/@dpds-gov/design-system/dist/...`.
- Guard greps — all empty:
  - `grep -r "@dpds-gov/design-system/src/" packages/docs/src/`
  - `grep -rE "d3\.json\([\"']/uae-topo" packages/design-system/src/`
  - No more `@dpds-gov/design-system` entry in `packages/docs/tsconfig.app.json` `paths`.
- `dist/index.d.ts` inspected — declares every component listed in the audit's Section 3 public surface, plus the `UaeHex` / `UaeMap` default-as-named re-exports and `useIsRtl`.

## Outstanding for STEP 10.4 (publishing)

- **Scope decision.** Currently `@dpds`; final scope (`@dubaipolice/design-system`? `@dpds`?) to be chosen.
- **`publishConfig`**. Likely `{ "access": "restricted", "registry": "https://npm.pkg.github.com" }` for GitHub Packages. Decide between npm-registry private vs. GitHub Packages vs. self-hosted Verdaccio.
- **`.npmrc`** (repo root + CI). `@dpds:registry=...` plus `//registry-host/:_authToken=${NPM_TOKEN}` referencing an env var.
- **GitHub PAT** with `read:packages` for installs, `write:packages` for publishes. Doc the secret name(s) for CI workflows.
- **First publish dry-run.** `npm publish --dry-run -w @dpds-gov/design-system` to inspect tarball contents. Confirm `files: ["dist"]` keeps the tarball small (~6.6 MB → may want to add `sourcemap: false` to `tsup.config.ts` for the published build to drop the 925 KB `index.js.map`).
- **`private: true` flip** to `false` (or drop) once registry is locked in.
- **`README.md`**. The 10.2A stub stays; 10.4 fills it with install instructions for service starters.
- **Versioning workflow.** Pick semver + Changesets vs. manual bumps.

---

# STEP 10.4 — Publish `@dpds-gov/design-system@0.1.0` to GitHub Packages

The DS package is now installable from GitHub Packages by anyone with `read:packages` on the `dpds-gov` org. The docs site and any future service starter import via the same scope.

## Scope rename

| Before | After |
|---|---|
| `@dpds/design-system` | `@dpds-gov/design-system` |
| `@dpds/docs` | `@dpds-gov/docs` |
| `@dpds/charts-3d` (audit mention only, no code) | `@dpds-gov/charts-3d` |

Mechanically: `grep -rl "@dpds/"` across `.ts`, `.tsx`, `.json`, `.md`, `.css` (excluding `node_modules` and `.git`) hit **128 files**, all renamed via `sed`. Post-rename `grep -r "@dpds/"` is empty; `grep -rl "@dpds-gov/"` returns the same 128 paths. No surprise hits — the audit doc, the prompt MDs in `SevicePortal DS/` (untracked), every docs page, both package.jsons, the lockfile, and the workspace `.npmrc` all moved together.

## DS package configuration

`packages/design-system/package.json` — final state:

- Dropped `"private": true`
- Added `"description"`, `"repository"` (with `directory: "packages/design-system"`), and `"publishConfig"` (`registry: https://npm.pkg.github.com`, `access: restricted`)
- `"files": ["dist"]` (unchanged) — keeps the tarball lean
- `"sideEffects": ["**/*.css"]` (unchanged) — preserves CSS bundling

`tsup.config.ts` — `sourcemap: false` (was `true`). Dropped the 925 KB `.js.map` from the tarball — published bundle is `1.9 MB packed / 5.8 MB unpacked` (was projected ~6 MB).

## Build script bug fix

While dry-running the publish I caught **fonts being packaged at `dist/fonts/fonts/...`** (doubled path). Root cause: a previous build's `dist/fonts/` directory survived `tsup --clean` (tsup only cleans tracked outputs, not the side-channel `cp` target), so today's `cp -r src/fonts dist/fonts` nested inside it. Fix: prepend `rm -rf dist/fonts` to the build script. Clean rebuild verified font paths are single-level (`dist/fonts/29ltbukrabold.woff2` etc.).

## `.npmrc` + `.env.example`

New committed files:

- `/.npmrc` — `@dpds-gov:registry=...` + literal `${GH_PACKAGES_TOKEN}` env ref. Safe to commit (no token in file).
- `/.env.example` — template documenting the token format and required scopes.

`.env` (the real one) was never committed. Verified pre-publish via `git ls-files .env` (empty) and `git check-ignore .env` (ignored).

## Final tarball

| Stat | Value |
|---|---|
| Filename | `dpds-gov-design-system-0.1.0.tgz` |
| Packed | 1.9 MB |
| Unpacked | 5.8 MB |
| Total files | 57 |
| `README.md` + `package.json` | 6.5 kB |
| `dist/index.js` + `dist/index.d.ts` | 457 kB |
| `dist/styles.css` + `dist/index.css` | 186 kB |
| `dist/fonts/*` (40 files: Bukra × 5 weights × 5 formats, Dubai × 4 weights × 5 formats) | ~4.5 MB |
| `dist/geo/uae-topo.json` | 126 kB |
| Side-channel SVGs + 1 webp (tsup-emitted from ESM imports) | 69 kB |

`.map`, `src/`, `node_modules/`, `tsup.config.ts`, `tsconfig.json` — all absent. Verified via grep on the dry-run output.

**Future-size note**: ~75% of the tarball is fonts. Dropping `.eot` and `.svg` font formats (only needed for IE 8/9 / very old WebKit) would cut ~2.7 MB. Not blocking 0.1.0; flagged for a minor.

## Publish + tag + smoke test

| Step | Outcome |
|---|---|
| `npm publish` | `+ @dpds-gov/design-system@0.1.0` — restricted access, registry `https://npm.pkg.github.com` |
| `git tag v0.1.0 && git push origin v0.1.0` | tag created and pushed (`* [new tag] v0.1.0 -> v0.1.0`) |
| Scratch-folder install (`~/Desktop/dpds-smoke/`) | 633 packages installed; `dist/index.js`, `dist/index.d.ts`, `dist/styles.css`, `dist/geo/uae-topo.json`, `dist/fonts/` (40 files) all present; package.json `exports` map intact; `dist/index.js` parses cleanly via `node --check`; `dist/index.d.ts` re-exports **371 named identifiers**. Scratch folder cleaned up. |

The brief's exact ESM-import smoke command (`node --input-type=module -e "import * as ds from '@dpds-gov/...'"`) doesn't run in pure Node because the bundle includes `intl-tel-input/dist/css/intlTelInput.css` and Node's bare ESM loader can't process `.css` imports. Every real bundler (Vite, Next, Webpack) handles this — confirmed via the 5 alternative checks above which validate install, exports map, sub-paths, JS parse, and type surface.

## Deviations from the brief

1. **`npm version` step skipped.** Version stayed `0.1.0` from 10.3 — no bump needed for first publish.
2. **Brief's Node ESM smoke command can't pass.** Replaced with bundler-agnostic checks (file presence + JSON exports map + `node --check` + type-surface count). Documented inline.
3. **Caught and fixed the doubled-font-path build script bug** before publishing. The bug would have shipped broken `@font-face` URLs to consumers (paths point at `/fonts/...`, but actual files would have been at `dist/fonts/fonts/...`). Saved by the dry-run inspection.

## `.gitignore` cleanup (Task K addendum)

The workspace `.gitignore` was bare (only `node_modules`, `dist`, `dist-ssr`, `*.local`, the editor scaffold, and `.env`). Restored the standard ignores: `*.tsbuildinfo`, `.env.local`, `.env.*.local`, `.cache/`, `.turbo/`, `.idea/`, `.vscode/*` with allowlist exceptions for `settings.json` and `extensions.json`. The duplicate `.env` line at the bottom was deduped.

**Contamination check** — what the bare ignore would have allowed through:

| Pattern | Tracked in git? |
|---|---|
| `node_modules/` | None ✓ |
| `dist/` (anywhere) | None ✓ |
| `*.tsbuildinfo` | **1 hit**: `packages/design-system/tsconfig.tsbuildinfo` |
| `.vscode/` | None ✓ |
| `.idea/` | None ✓ |
| `.DS_Store` | None ✓ |

So the documented worry — bare ignore letting `node_modules/` slip in — didn't actually happen on `rv_v6+`. But one TypeScript build artefact (`packages/design-system/tsconfig.tsbuildinfo`) did sneak in and is currently tracked. **Per instruction, not removing in this commit.** Follow-up cleanup will need:

```bash
git rm --cached packages/design-system/tsconfig.tsbuildinfo
git commit -m "chore: stop tracking tsconfig.tsbuildinfo"
```

…and a one-off check on every long-lived branch (`rv_v6`, `rv_v7`, `main`) since the file may have been added in a long-merged commit.

## Outstanding for Step 10.5 (service-starter)

- Set up a `dpds-gov/service-starter` repo template with the matching `.npmrc` + `.env.example` patterns
- Configure CI secrets in service-starter org (`GH_PACKAGES_TOKEN` secret with `read:packages`)
- Dependabot config in service-starter to auto-bump `@dpds-gov/design-system` minors
- Decide if Changesets should drive future version bumps in this monorepo, or stick with manual `npm version`
- Drop `.eot` + `.svg` font formats in a future minor (~2.7 MB tarball reduction)
- One-off git history cleanup for `tsconfig.tsbuildinfo` (and any future contamination found)

## Files touched this step

- `packages/design-system/package.json` (publishConfig, repository, description, build script font fix)
- `packages/design-system/tsup.config.ts` (sourcemap off)
- `packages/design-system/README.md` (full content)
- `packages/docs/package.json` (`@dpds-gov/docs` rename)
- `package.json` (root `@dpds-gov/docs` workspace ref)
- Root `.npmrc`, `.env.example`, `.gitignore` (new + updated)
- `docs/PUBLISHING.md` (new)
- 128 docs source files (scope rename via sed)
- `packages/docs/src/pages/dashboard-page.tsx` (drop unused `cn` import and `sidebarCollapsed` const carried over from the rv_v6 dashboard cleanup)

---

## Step 10.4-patch (2026-06-01) — DS `0.1.1`: drop phantom `react-i18next` dep

Surfaced during STEP 10.5 starter integration: the published `@dpds-gov/design-system@0.1.0` tarball pulled in `react-i18next` because `packages/design-system/src/hooks/use-is-rtl.ts` had a stray `import { useTranslation } from "react-i18next"`. Every consumer was being forced to install `react-i18next` + `i18next` as phantom deps just to get a hook that only needed to know whether `<html dir>` is `rtl`. The STEP 10.2A audit grep had been scoped to `src/components/ui/` and missed `src/hooks/`.

### Fix

Refactored `useIsRtl` to a framework-agnostic `document.documentElement.dir` reader, subscribed via `MutationObserver` so it flips automatically when a host app sets `dir="rtl"` (whether via i18next, react-intl, FormatJS, or no i18n library at all).

```ts
// packages/design-system/src/hooks/use-is-rtl.ts
export function useIsRtl(): boolean {
  const get = () =>
    typeof document !== "undefined" && document.documentElement.dir === "rtl"

  const [isRtl, setIsRtl] = useState(get)

  useEffect(() => {
    if (typeof document === "undefined") return
    const observer = new MutationObserver(() => setIsRtl(get()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    })
    return () => observer.disconnect()
  }, [])

  return isRtl
}
```

The hook changed from default export to named export. Coordinated updates:

- `packages/design-system/src/index.ts` — barrel changed from `export { default as useIsRtl }` to `export { useIsRtl }`
- `packages/design-system/src/components/profile-switcher.tsx` — only internal caller, switched to `import { useIsRtl } from "../hooks/use-is-rtl"`

Docs side (`packages/docs/src/i18n.ts`) already calls `document.documentElement.dir = isArabic ? "rtl" : "ltr"` on `i18n.on("languageChanged", ...)` — no docs-side change needed; the MutationObserver picks it up automatically.

### Publish + verify

- `npm version patch` → `0.1.1`
- `npm run build:ds` in isolation (avoids the orthogonal `tsc -b` overwriting tsup's bundled `.d.ts` during the full workspace build — known issue, out of scope here)
- `npm publish` → `+ @dpds-gov/design-system@0.1.1` (1.9 MB packed, 5.8 MB unpacked, 57 files)
- Tag `v0.1.1` pushed
- `grep "react-i18next" dist/index.js` → 0 hits
- One remaining hit in `dist/index.d.ts` is in a doc comment ("Framework-agnostic — works with i18next, react-intl…"), not an import. Acceptable.

### Starter follow-through

`dp-service-starter` bumped to `^0.1.1`, dropped `i18next` + `react-i18next` from `dependencies`, README rewritten to front-load the GitHub web UI template flow (the CLI `gh repo create --template` silently ignored `--owner` for two dry-run consumers). Tracked in `STEP_10_5_LOG.md` in the starter repo.

### Commit + tag

- `ab5e54e fix(design-system): drop react-i18next from use-is-rtl, read document.dir directly`
- Tag: `v0.1.1`

### Lesson

Audit grep scopes need to cover `src/**` not just `src/components/ui/**`. The starter integration was the right forcing function — it caught the leak that the workspace's own dogfooding didn't, because the docs app had `react-i18next` installed for its own reasons and was masking the transitive pull.

---

## Step 10.4-patch-2 (2026-06-02) — DS `0.1.2`: export source `styles.css` for consumer `@reference`

Surfaced during STEP 10.7.3 starter integration. The starter has a fully ported docs shell, but light-mode background, sidebar background, and card surfaces all rendered wrong (defaulted to nothing or to `prefers-color-scheme` instead of the DS palette). The toggle visibly flipped a `.dark` class on `<html>` but no `dark:bg-*` utility classes responded.

### Root cause

The published `dist/styles.css` has Tailwind v4's `@theme inline { ... }` and `@custom-variant dark (...)` declarations **compiled away** — the runtime file has only the resolved CSS variables (`:root { --color-secondary-10: oklch(…) }`) and the precomputed utility classes. Tailwind in the consumer never sees the `@theme` or `@custom-variant` directives, so:

- `bg-secondary-10` in consumer code doesn't compile to any rule (the token isn't registered).
- `dark:bg-slate-900` falls back to Tailwind's default `prefers-color-scheme` variant, which doesn't respond to the `.dark` class the DS `ThemeProvider` toggles.

The workspace's docs site doesn't hit this because its `docs.css` does `@reference "../../design-system/src/styles.css"` — Tailwind reads the un-compiled DS source at build time. External consumers can't reach that relative path.

### Fix

Publish the raw, un-compiled DS source `styles.css` alongside the runtime bundle.

**`packages/design-system/package.json`**
- Build script now appends `&& cp src/styles.css dist/styles.source.css` so the tarball ships both.
- `exports` gained `"./styles.source.css": "./dist/styles.source.css"`.
- `npm version patch` → `0.1.2`.

The consumer pattern is now:

```css
/* in the consumer's index.css */
@reference "@dpds-gov/design-system/styles.source.css";  /* compile-time tokens + variants */
@import   "tailwindcss";
@import   "@dpds-gov/design-system/styles.css";          /* runtime CSS vars + DS classes */
@source   "./**/*.{ts,tsx}";
```

The order matters — `@reference` has to come before `@import "tailwindcss"` so Tailwind reads the DS theme declarations when generating utility classes.

### Publish + verify

- `npm run build:ds` → `dist/styles.source.css` (21.8 kB raw) + `dist/styles.css` (183.8 kB minified).
- `npm publish --dry-run` → 58 files, 1.9 MB tarball, both styles files included.
- `npm publish` → `+ @dpds-gov/design-system@0.1.2`.
- Registry: `["0.1.0", "0.1.1", "0.1.2"]`.
- Tag `v0.1.2` pushed to `origin/dp_v1`.

### Starter follow-through (in `dp-service-starter` on `dp_v1`)

- `package.json`: `@dpds-gov/design-system` bumped from `^0.1.1` to `^0.1.2`.
- `src/index.css`: added the `@reference` line at the top, removed a temporary `@custom-variant dark` declaration that was masking the symptom.
- Verified: starter's served CSS now contains the `.bg-secondary-10`, `.bg-sidebar`, `.bg-card` rules plus `dark:` variants targeting `:is(.dark *)` — identical to the docs site's compiled CSS.

### Commit + tag

- `5c12044 fix(design-system): export source styles.css for consumer @reference`
- Tag: `v0.1.2`

### Lesson

**Tailwind v4 `@theme` blocks must be referenceable from consumer CSS; the compiled `dist/styles.css` alone isn't enough for consumer-side utility generation.** Any future change to the DS palette / spacing / radius / variants needs to flow into the source styles file consumers `@reference`. The workspace tooling masked this because `@reference` to the relative source path worked silently — only the first external consumer (the starter) revealed the gap.

Going forward, every DS release that adds tokens or variants must ship the updated `src/styles.css` as `dist/styles.source.css`. The build script enforces this; don't bypass it.

---

## Step 10.8 (2026-06-02, `dp_v2`) — Getting Started: Installation page

Added the Installation page so onboarding service teams have a single linkable URL covering token generation, template usage, local setup, and the AI-assisted build workflow. Sits in the Getting Started sidebar between Project Structure and Theming.

### Files touched

| File | Change | LOC |
|---|---|---|
| `packages/docs/src/pages/installation-page.tsx` | New page. `<DocsPage>` + `<Section>` + `<Prose>` + `<CodeBlock>` + `<Alert>` + `<Table>` + 3 next-steps cards. All strings i18n. | 278 |
| `packages/docs/src/App.tsx` | New import + new `<Route path="/docs/installation">` slotted between project-structure and theming routes | +2 |
| `packages/docs/src/components/app-sidebar.tsx` | Added `Download` to the lucide import block, inserted `{ titleKey: "sidebar.installation", url: "/docs/installation", icon: Download, status: "done" }` between Project Structure and Theming | +2 |
| `packages/docs/src/locales/en.json` | Added `sidebar.installation` and the full `docs.gettingStarted.installation.*` namespace (10 sections × multiple keys, ~120 strings) | +127 |
| `packages/docs/src/locales/ar.json` | Added `sidebar.installation` and the full `docs.gettingStarted.installation.*` Arabic translation. Note: ar.json doesn't have any other `docs.gettingStarted.*` keys today — pre-existing pages fall back to English in Arabic mode. The Installation page is the first Getting Started page with complete Arabic. | +124 |
| `packages/docs/src/data/changelog.json` | Prepended 2026-06-02 "added" entry. Voice: plain English per Ramesh's standing preference (no path jargon in summary). | +13 |

Total: 1 new page + 5 file updates, ~540 added lines.

### Sidebar position

- Introduction → Project Structure → **Installation** (new, position 3) → Theming → Dark Mode → Changelog. Order preserved; Installation inserted at the requested slot.
- Icon: `Download` (brief allowed Download, Package, or Rocket — picked the one that reads as "install").

### Deviations from brief

- **Sidebar key name**: brief said `sidebar.gsInstallation`. Used `sidebar.installation` to match the existing flat convention — no `gs*` prefix exists anywhere in the sidebar namespace (siblings are `sidebar.introduction`, `sidebar.projectStructure`, etc.). Single-key deviation, called out so it's not a surprise.
- **Hero section**: brief described "Hero — Title + tagline" as section 1. The reusable `<DocsPage>` shell already renders eyebrow + title + description, so the hero is covered by `DocsPage`'s props rather than a separate `<Section>`. Matches how Introduction + Project Structure pages structure their hero too.
- **Next-steps "Card primitive"**: brief said "use existing Card primitive". The Introduction page uses bordered `<div>` / `<Link>` blocks rather than the DS `Card` for its "Where to start" grid. I followed the Introduction pattern (consistent with the closest sibling page) instead of switching to `Card` — easier to maintain in lockstep.

### Voice check

- Changelog summary: "Installation guide added to the docs" — plain English, no `useTranslation`, no path jargon.
- Page body strings (especially troubleshooting): describe symptoms in plain English first (e.g. "npm install returns 401"), then cause + fix in user-readable steps. The CLI commands embedded in fix copy are unavoidable (`@dpds-gov:registry=…`) but they're surrounded by plain prose explaining what to do with them.

### Verification

| Check | Result |
|---|---|
| `npm run typecheck` (`--workspaces`) | clean |
| `npm run lint` | clean for the touched files (the 48 pre-existing problems are in unrelated signup pattern / DS d.ts) |
| `npm run build` | `✓ built in 930ms` |
| `npm run dev` → `GET /docs/installation` | 200 |
| `GET /docs/project-structure` | 200 (sibling still works) |
| Plain-English-in-JSX grep over the new file | 0 hits (every visible string flows through `t(...)`) |
| `node -e "JSON.parse(...)"` on en.json, ar.json, changelog.json | all valid |

### Outstanding

- Arabic Getting Started coverage is still partial: Introduction, Project Structure, Theming, Dark Mode, and Changelog pages don't have Arabic translations and fall back to English. Out of scope here; backfill in a future step when Arabic onboarding parity becomes a deliverable.
- The "Read CLAUDE.md" next-steps card links to `github.com/dpds-gov/service-starter/blob/main/CLAUDE.md`. If the repo gets renamed or the file moves, this link breaks silently. Track in any future link-checking workflow.

---

## Step 10.9 (2026-06-03, `dp_v4`) — DS `0.2.0`: skills ship in the package

Architectural shift in how AI agent guidance reaches service teams: until 0.1.x, the dpds skill lived only in the starter template as a snapshot — each new service repo got a frozen copy at clone time, and subsequent updates required manually re-syncing or re-templating. From 0.2.0, the skill content ships inside `@dpds-gov/design-system` and propagates via npm. Dependabot's weekly bumps deliver skill updates the same way they deliver component updates.

### Files added (from `dp-service-starter@dp_v4`, verbatim)

| File | Source | Size |
|---|---|---|
| `packages/design-system/skills/dpds/SKILL.md` | starter `.claude/skills/dpds/SKILL.md` | 1.4 KB |
| `packages/design-system/skills/dpds/component-catalog.md` | starter | 15.3 KB |
| `packages/design-system/skills/dpds/layout-patterns.md` | starter | 5.2 KB |
| `packages/design-system/skills/dpds/bad-good-examples.md` | starter | 3.1 KB |
| `packages/design-system/skills/dpds/end-of-build-summary.md` | starter | 1.7 KB |
| `packages/design-system/skills/dpds/missing-components.md` | starter | 2.3 KB |
| `packages/design-system/skills/dpds/ds-quirks.md` | starter | 2.1 KB |

### Package changes

`packages/design-system/package.json`:

```diff
   "files": [
-    "dist"
+    "dist",
+    "skills"
   ],
   "exports": {
     ".": { ... },
     "./styles.css": "./dist/styles.css",
     "./styles.source.css": "./dist/styles.source.css",
+    "./skills/*": "./skills/*"
   },
-  "version": "0.1.2"
+  "version": "0.2.0"
```

`./skills/*` wildcard means a consumer can `import` (or just file-system-read at install time) any individual skill file, e.g. `@dpds-gov/design-system/skills/dpds/SKILL.md`. No build transformation — they're shipped as markdown.

### Publish + verify

- `npm run build:ds` → clean (dist + dist/styles.source.css unchanged from 0.1.2 since the slimmer dependency tree from c4d2f98 already landed).
- `npm publish --dry-run` → all 7 skill files in the tarball (28.0 KB combined), package size 1.9 MB / 64 total files.
- `npm publish` → `+ @dpds-gov/design-system@0.2.0`.
- Registry: `["0.1.0", "0.1.1", "0.1.2", "0.2.0"]`.

### Why minor (not major)

c4d2f98 dropped `PointCloudChart`, `UaeHex`, `UaeMap`, and three large geo/3D deps (`three`, `@react-three/fiber`, `@react-three/drei`, `d3`, `d3-hexbin`, `topojson-client`). Strictly that's breaking. Pre-1.0 we treat minors as soft-breaking and announce in the changelog (per `docs/PUBLISHING.md`'s versioning policy), so this single 0.2.0 minor rolls up both the dep cleanup and the additive skill feature. Consumers who actually used the removed maps will see a build error and can pin to `^0.1.x`. Consumers who didn't (almost all) get the skill for free.

### Consumer experience

In the starter (currently `dp-service-starter@dp_v4` with skills still living at `.claude/skills/dpds/`), the next bump to `^0.2.0` will install the skills under `node_modules/@dpds-gov/design-system/skills/dpds/*`. Phase B (separate task) wires a starter `postinstall` script that copies them from node_modules to `.claude/skills/dpds/` so Claude Code's loader picks them up. **Until Phase B lands, `dp_v4` in workspace is not merged to main** — the npm-propagated flow only works end-to-end once the starter's postinstall is in place.

### Docs

- `packages/docs/src/data/changelog.json`: prepended a 2026-06-03 "added" entry — "AI skills now ship with the design system" (plain English, stakeholder voice).
- `docs/PUBLISHING.md`: new "Skills ship with each release" section between Versioning and Pre-publish checklist. Covers what files ship, the bump table (patch/minor/major for typo/new-catalog-entry/restructure), the rule that a code change + skill change in the same release roll up to the higher bump, and a dry-run sanity check.

### Outstanding for Phase B (starter)

- Add `postinstall` to `dp-service-starter/package.json` that copies `node_modules/@dpds-gov/design-system/skills/dpds/` → `.claude/skills/dpds/`.
- Decide whether the starter's tracked `.claude/skills/dpds/` should be removed (and re-populated on every install) or kept as a fallback for offline / fresh-clone scenarios.
- Once the postinstall is verified end-to-end, merge workspace `dp_v4` → main.

### Commit + tag

- Commit: (this branch's HEAD on push)
- Tag: `v0.2.0`
- Branch: `dp_v4` (no merge to main — see Phase B above)
