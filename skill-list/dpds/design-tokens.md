# What this covers

The DPDS design-token set — colors, typography, radius, motion, shadow, z-layers — shipped via `@theme` inside the design system's stylesheet. Use these token names through semantic Tailwind classes; never hardcode values. Don't edit `src/index.css` or add a Tailwind config.

---

## Colors

- **Brand**: primary (DP green `oklch(0.5495 0.1269 158.75)` ≈ `#26D07C`). Families: primary, secondary, error, warning, success, informative, gray, slate, sage, blue-gray, turquoise, purple, pink, rose, khaki, sps. Each: `10/25/50/100/200/300/400/500/600/700/800/900`.
- **Semantic**: background, foreground, card, popover, primary, secondary, muted, accent, destructive, warning, border, input, ring, sub-title, sidebar.
- **Chart**: `chart-primary` / `-secondary` / `-tertiary` / `-quaternary` / `-quinary` + matching `-light` variants.
- **Alpha**: tokens are OKLCH, not HSL. Use `bg-primary/10` or `color-mix(in oklch, var(--primary) 15%, transparent)`. Never `hsl(var(--primary))`.

## Typography

- `font-sans` → **Dubai** — body, labels (cascade default).
- `font-mono` → **Bukra** — headings, reference IDs, numbers, badges (`font-mono font-bold`).
- Scale: Tailwind default `text-xs` … `text-4xl`.

## Radius

Base `--radius` 0.625rem. Scale: `rounded-sm` (0.6×), `-md` (0.8×), `-lg` (1.0×), `-xl` (1.4×), `-2xl` (1.8×), `-3xl` (2.2×), `-4xl` (2.6×). Button has its own animated radius — don't override. Don't invent new radius values; use the scale, or `rounded-[Xpx]` for rare one-offs.

## Motion

`--duration-instant/fast/normal/slow/slower`. `--ease-custom`, `--ease-spring`.

## Shadow

`--shadow-card/popover/modal/toast`.

## Z-layer

`--z-base/dropdown/sticky/fixed/modal-backdrop/modal/popover/toast/tooltip`. Never set z-index manually on overlay components.
