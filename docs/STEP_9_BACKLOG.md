# Step 9 — Backlog (seeded from Step 8 flags)

Items harvested from [STEP_8_MIGRATION_LOG.md](./STEP_8_MIGRATION_LOG.md) and [STEP_8_DISCOVERY.md](./STEP_8_DISCOVERY.md). Each item has a source-of-flag link so a future PR can verify the issue still exists before fixing.

## A. Token audit

Six oddities surfaced while documenting `src/index.css :root` / `.dark` for the Theming page. None block the docs site; all are worth a focused PR.

1. **`--destructive-foreground` collapses to the same hue family as `--destructive` in dark mode.**
   `:root` has bg = error-50 / fg = error-600 (proper contrast); `.dark` has bg = error-300 / fg = error-300 (same value). Likely an oversight — dark destructive button text is roughly the same colour as its background. Fix: bind `--destructive-foreground` in `.dark` to a lighter / inverted value.
   *Flagged in: Step 8.4 migration log § Surprises in src/index.css, item 1.*

2. **`--color-primary-500` (palette token) is overridden inside `.dark`.**
   Palette tokens should be stable across modes; only semantic tokens should swap. The Theming page (§2 "Token layers") explicitly publishes the rule "override the semantic layer, not the palette" — but the project's own index.css violates it. Fix: define a `--primary` override under `.dark` that points at a different palette-N (e.g. `var(--color-primary-300)`), and remove the `--color-primary-500` redefinition.
   *Flagged in: Step 8.4 migration log § Surprises in src/index.css, item 2.*

3. **`--sidebar-accent` and `--sidebar-accent-foreground` both bind to `var(--color-success-300)` in dark.**
   Identical bg + fg → invisible text. Either intentional decorative trick (unlikely) or a bug. Fix: bind `--sidebar-accent-foreground` to a contrasting colour (likely `oklch(0.985 0 0)` to match other foreground tokens).
   *Flagged in: Step 8.4 migration log § Surprises in src/index.css, item 3.*

4. **`--sidebar-accent` is `transparent` in light but a real colour in dark.**
   Same token does different visual jobs depending on mode — asymmetric semantics. Fix: pick one role (probably "active sidebar item background tint") and apply consistently with mode-appropriate tints in both `:root` and `.dark`.
   *Flagged in: Step 8.4 migration log § Surprises in src/index.css, item 4.*

5. **`--primary-focus-ring` defined in `:root` only, missing a `.dark` override.**
   May currently fall back fine via `color-mix`, but worth either confirming intentional or adding an explicit dark variant. Fix: either add `.dark { --primary-focus-ring: ... }` or document why the light value works in both modes (in [theming-page.tsx](../src/pages/theming-page.tsx)).
   *Flagged in: Step 8.4 migration log § Surprises in src/index.css, item 5.*

6. **Stray comments inside variable blocks hint at past hand-editing drift.**
   `--primary: var(--color-primary-500); /* #008755 */` and `--sub-title: oklch(...); /* slate-900 */`. The hex / palette-name in the comment may not match the resolved value any more. Fix: audit by computing the actual oklch → hex for each annotated line and either delete stale comments or correct them.
   *Flagged in: Step 8.4 migration log § Surprises in src/index.css, item 6.*

## B. Theme hook surface area

7. **`useTheme()` does not return `resolvedTheme`.**
   Currently `{ theme, setTheme }` only. Consumers that need the resolved mode (e.g. `<ThemeToggle>` for the trigger icon swap) have to call `window.matchMedia("(prefers-color-scheme: dark)")` themselves. Adding `resolvedTheme: "light" | "dark"` would let `<ThemeToggle>` drop its `window` reference and would also enable SSR-safer consumers in the future.
   File: [src/components/theme-provider.tsx:66](../src/components/theme-provider.tsx#L66).
   *Flagged in: Step 8.5 migration log § useTheme signature.*

## C. Pre-paint script (cold-load flash)

8. **`index.html` has no inline pre-paint script that sets the `dark` class before React mounts.**
   Currently the initial class is added inside `<ThemeProvider>`'s mount effect, so dark-mode users on a cold reload see a brief flash of light content before the swap. The Dark Mode page (§6 Caveats) publishes the exact minimal script to drop in — it just needs to actually be added to [index.html](../index.html).
   *Flagged in: Step 8.5 migration log § localStorage key + § Screenshot spot-check.*

## D. Theming page extensions (deferred)

9. **Extended-tokens grid: chart / sidebar / focus-ring / radius / sub-title.**
   The Theming page documents 21 core semantic tokens. Twelve more live in the same `:root` (`--chart-primary` × 5 pairs, `--sidebar-*` × 8, `--primary-focus-ring`, `--sub-title`, `--radius`) and were intentionally not added to keep the page from becoming a wall of swatches. Add a collapsible "Extended tokens" group if a downstream team asks for them.
   *Flagged in: Step 8.4 migration log § Deviations from brief, "Did not list chart-* / sidebar-* tokens".*

## E. UI sweep (smaller)

10. **`app-sidebar.tsx` still has `status: "backlog"` chips on the Getting Started entries** (Introduction, Project Structure, Theming, Dark Mode, Changelog) even though the first four pages have shipped this step. Update the status to `"done"` to keep the sidebar chips honest. The Changelog entry's status is correctly still `"backlog"` if that page is incomplete — verify.
    *Flagged in: Step 8.6 (this step) — intentionally not touched here to keep the scope tight.*

## Cross-references

- [STEP_8_DISCOVERY.md](./STEP_8_DISCOVERY.md) — Phase 1 classification (all 5 routes STUB, 3 infra gaps named).
- [STEP_8_MIGRATION_LOG.md](./STEP_8_MIGRATION_LOG.md) — per-step decisions, deviations, and the full source list for each flag above.
