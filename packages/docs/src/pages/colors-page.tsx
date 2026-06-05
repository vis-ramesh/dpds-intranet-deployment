import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Check, Copy } from "lucide-react"

import {
  FoundationPage,
  RelatedLinks,
  Section,
} from "@/components/docs"
import { cn } from "@dpds-gov/design-system"

/* ── Semantic token data — resolved values hardcoded so we can show light and dark side-by-side regardless of the user's current theme ── */

type ContrastLevel = "AAA" | "AA" | "AA Large" | "Verify"

interface SemanticToken {
  name: string
  cssVar: string
  tailwind: string
  light: string
  dark: string
  /** Short semantic label (e.g. "Errors", "Brand action"). */
  note?: string
  /** Surface this token is intended to pair with. Only set on foreground tokens. */
  pair?: string
  /**
   * Conservative WCAG contrast assessment for the pair, based on the resolved oklch values.
   * - "AAA" / "AA": meets normal-text thresholds in both light and dark mode
   * - "AA Large": meets only the 3:1 large-text / non-text threshold in at least one mode
   * - "Verify": low-contrast pair, transparent surface, or otherwise ambiguous — run axe
   */
  contrast?: ContrastLevel
}

const SEMANTIC_TOKENS: SemanticToken[] = [
  /* ── Page surfaces ── */
  { name: "Background", cssVar: "--background", tailwind: "bg-background", light: "oklch(1 0 0)", dark: "oklch(0.145 0 0)" },
  { name: "Foreground", cssVar: "--foreground", tailwind: "text-foreground", light: "oklch(0.145 0 0)", dark: "oklch(77.32% 0.0193 269.04)", pair: "Background", contrast: "AAA" },
  { name: "Card", cssVar: "--card", tailwind: "bg-card", light: "oklch(1 0 0)", dark: "oklch(0.205 0 0)" },
  { name: "Card foreground", cssVar: "--card-foreground", tailwind: "text-card-foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.985 0 0)", pair: "Card", contrast: "AAA" },
  { name: "Popover", cssVar: "--popover", tailwind: "bg-popover", light: "oklch(1 0 0)", dark: "oklch(0.205 0 0)" },
  { name: "Popover foreground", cssVar: "--popover-foreground", tailwind: "text-popover-foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.985 0 0)", pair: "Popover", contrast: "AAA" },

  /* ── Brand / interactive ── */
  { name: "Primary", cssVar: "--primary", tailwind: "bg-primary", light: "oklch(0.5495 0.1269 158.75)", dark: "oklch(0.7274 0.1098 168.27)", note: "Brand action" },
  { name: "Primary foreground", cssVar: "--primary-foreground", tailwind: "text-primary-foreground", light: "oklch(0.8799 0.0511 172.77)", dark: "oklch(0.205 0 0)", pair: "Primary", contrast: "AA Large" },
  { name: "Secondary", cssVar: "--secondary", tailwind: "bg-secondary", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)" },
  { name: "Secondary foreground", cssVar: "--secondary-foreground", tailwind: "text-secondary-foreground", light: "oklch(0.205 0 0)", dark: "oklch(0.985 0 0)", pair: "Secondary", contrast: "AAA" },
  { name: "Muted", cssVar: "--muted", tailwind: "bg-muted", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)" },
  { name: "Muted foreground", cssVar: "--muted-foreground", tailwind: "text-muted-foreground", light: "oklch(0.556 0 0)", dark: "oklch(67.95% 0.0189 164.39)", pair: "Muted", contrast: "AA Large" },
  { name: "Accent", cssVar: "--accent", tailwind: "bg-accent", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)" },
  { name: "Accent foreground", cssVar: "--accent-foreground", tailwind: "text-accent-foreground", light: "oklch(0.205 0 0)", dark: "oklch(0.985 0 0)", pair: "Accent", contrast: "AAA" },

  /* ── Status ── */
  { name: "Destructive", cssVar: "--destructive", tailwind: "bg-destructive", light: "oklch(0.9007 0.0384 23.87)", dark: "oklch(0.7143 0.1281 25.43)", note: "Errors / delete" },
  { name: "Destructive foreground", cssVar: "--destructive-foreground", tailwind: "text-destructive-foreground", light: "oklch(0.4901 0.1754 29.29)", dark: "oklch(0.7143 0.1281 25.43)", pair: "Destructive", contrast: "AA Large" },
  { name: "Warning", cssVar: "--warning", tailwind: "bg-warning", light: "oklch(0.9423 0.0659 87.15)", dark: "oklch(0.1749 0.0340 75.24)", note: "Caution" },
  { name: "Warning foreground", cssVar: "--warning-foreground", tailwind: "text-warning-foreground", light: "oklch(0.5137 0.1149 63.42)", dark: "oklch(0.8351 0.1681 81.85)", pair: "Warning", contrast: "AA Large" },

  /* ── Borders / focus ── */
  { name: "Border", cssVar: "--border", tailwind: "border-border", light: "oklch(92.191% 0.0001 271.152)", dark: "oklch(1 0 0 / 10%)" },
  { name: "Input", cssVar: "--input", tailwind: "border-input", light: "oklch(0.8822 0 89.88)", dark: "oklch(38.25% 0.0199 266.03)" },
  { name: "Ring", cssVar: "--ring", tailwind: "ring-ring", light: "oklch(0.708 0 0)", dark: "oklch(0.556 0 0)" },

  /* ── Sidebar ── */
  { name: "Sidebar", cssVar: "--sidebar", tailwind: "bg-sidebar", light: "oklch(0.9821 0.0000 89.88)", dark: "oklch(23.88% 0.0124 264.31)" },
  { name: "Sidebar foreground", cssVar: "--sidebar-foreground", tailwind: "text-sidebar-foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.985 0 0)", pair: "Sidebar", contrast: "AAA" },
  { name: "Sidebar primary", cssVar: "--sidebar-primary", tailwind: "bg-sidebar-primary", light: "oklch(0.205 0 0)", dark: "oklch(0.5371 0.1198 155.49)", note: "Active nav item" },
  { name: "Sidebar primary foreground", cssVar: "--sidebar-primary-foreground", tailwind: "text-sidebar-primary-foreground", light: "oklch(0.985 0 0)", dark: "oklch(0.985 0 0)", pair: "Sidebar primary", contrast: "AA Large" },
  { name: "Sidebar accent", cssVar: "--sidebar-accent", tailwind: "bg-sidebar-accent", light: "transparent", dark: "oklch(0.7570 0.1783 155.01)", note: "Hover background" },
  { name: "Sidebar accent foreground", cssVar: "--sidebar-accent-foreground", tailwind: "text-sidebar-accent-foreground", light: "oklch(0.205 0 0)", dark: "oklch(0.7570 0.1783 155.01)", pair: "Sidebar accent", contrast: "Verify" },
  { name: "Sidebar border", cssVar: "--sidebar-border", tailwind: "border-sidebar-border", light: "oklch(0.922 0 0)", dark: "oklch(99.107% 0.00011 271.152 / 0.05)" },
  { name: "Sidebar ring", cssVar: "--sidebar-ring", tailwind: "ring-sidebar-ring", light: "oklch(0.708 0 0)", dark: "oklch(0.556 0 0)" },
]

/* ── Palette scales ── */

const SHADES = ["10", "25", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] as const

interface PaletteScale {
  slug: string
  name: string
}

const PALETTE_SCALES: PaletteScale[] = [
  // Neutrals
  { slug: "gray", name: "Gray" },
  { slug: "slate", name: "Slate" },
  { slug: "sage", name: "Sage" },
  { slug: "blue-gray", name: "Blue gray" },
  // Brand
  { slug: "primary", name: "Primary" },
  { slug: "secondary", name: "Secondary" },
  { slug: "sps", name: "SPS" },
  // Status
  { slug: "informative", name: "Informative" },
  { slug: "success", name: "Success" },
  { slug: "warning", name: "Warning" },
  { slug: "error", name: "Error" },
  // Accents
  { slug: "turquoise", name: "Turquoise" },
  { slug: "purple", name: "Purple" },
  { slug: "pink", name: "Pink" },
  { slug: "rose", name: "Rose" },
  { slug: "khaki", name: "Khaki" },
]

/**
 * Resolved OKLCH values mirrored from src/index.css (@theme inline block).
 * @theme inline emits values into utility classes but NOT to :root, so a runtime
 * var(--color-primary-500) lookup resolves to nothing. We render swatches with the
 * literal value so the page is decoupled from Tailwind's compile-time substitution.
 * Keep this map in sync with src/index.css.
 */
const PALETTE_VALUES: Record<string, Record<string, string>> = {
  gray: {
    "10":  "oklch(0.9821 0.0000 89.88)",
    "25":  "oklch(0.9672 0.0000 89.88)",
    "50":  "oklch(0.9404 0.0013 286.37)",
    "100": "oklch(0.8822 0.0000 89.88)",
    "200": "oklch(0.8206 0.0014 286.37)",
    "300": "oklch(0.7758 0.0018 247.85)",
    "400": "oklch(0.6307 0.0030 286.31)",
    "500": "oklch(0.5311 0.0033 264.53)",
    "600": "oklch(0.4160 0.0021 247.87)",
    "700": "oklch(0.3333 0.0017 286.31)",
    "800": "oklch(0.2478 0.0000 89.88)",
    "900": "oklch(0.1822 0.0000 89.88)",
  },
  primary: {
    "10":  "oklch(0.9914 0.0117 170.28)",
    "25":  "oklch(0.9606 0.0171 174.06)",
    "50":  "oklch(0.9192 0.0333 172.79)",
    "100": "oklch(0.8799 0.0511 172.77)",
    "200": "oklch(0.8019 0.0825 170.80)",
    "300": "oklch(0.7274 0.1098 168.27)",
    "400": "oklch(0.6248 0.1347 161.98)",
    "500": "oklch(0.5495 0.1269 158.75)",
    "600": "oklch(0.4685 0.1072 159.29)",
    "700": "oklch(0.3610 0.0817 159.98)",
    "800": "oklch(0.2736 0.0588 163.39)",
    "900": "oklch(0.1970 0.0409 166.01)",
  },
  secondary: {
    "10":  "oklch(0.9718 0.0059 170.45)",
    "25":  "oklch(0.9425 0.0089 179.59)",
    "50":  "oklch(0.8860 0.0200 181.06)",
    "100": "oklch(0.8272 0.0292 180.10)",
    "200": "oklch(0.7671 0.0394 179.75)",
    "300": "oklch(0.6487 0.0593 178.50)",
    "400": "oklch(0.5265 0.0752 175.92)",
    "500": "oklch(0.4097 0.0806 170.60)",
    "600": "oklch(0.3509 0.0686 171.18)",
    "700": "oklch(0.2931 0.0566 172.38)",
    "800": "oklch(0.2323 0.0440 174.46)",
    "900": "oklch(0.1945 0.0365 175.58)",
  },
  error: {
    "10":  "oklch(0.9813 0.0076 27.23)",
    "25":  "oklch(0.9613 0.0131 23.19)",
    "50":  "oklch(0.9007 0.0384 23.87)",
    "100": "oklch(0.8529 0.0603 23.50)",
    "200": "oklch(0.8052 0.0821 23.70)",
    "300": "oklch(0.7143 0.1281 25.43)",
    "400": "oklch(0.6363 0.1742 27.25)",
    "500": "oklch(0.5758 0.2088 29.48)",
    "600": "oklch(0.4901 0.1754 29.29)",
    "700": "oklch(0.3985 0.1393 29.29)",
    "800": "oklch(0.3394 0.1162 28.97)",
    "900": "oklch(0.2537 0.0796 28.50)",
  },
  warning: {
    "10":  "oklch(0.9895 0.0090 78.28)",
    "25":  "oklch(0.9751 0.0268 85.66)",
    "50":  "oklch(0.9423 0.0659 87.15)",
    "100": "oklch(0.9086 0.1068 87.51)",
    "200": "oklch(0.8620 0.1537 85.46)",
    "300": "oklch(0.8351 0.1681 81.85)",
    "400": "oklch(0.7609 0.1615 71.27)",
    "500": "oklch(0.6336 0.1437 62.49)",
    "600": "oklch(0.5137 0.1149 63.42)",
    "700": "oklch(0.3877 0.0853 64.66)",
    "800": "oklch(0.3056 0.0641 67.93)",
    "900": "oklch(0.1749 0.0340 75.24)",
  },
  success: {
    "10":  "oklch(0.9880 0.0084 168.76)",
    "25":  "oklch(0.9703 0.0207 166.11)",
    "50":  "oklch(0.9527 0.0657 163.18)",
    "100": "oklch(0.8653 0.1020 161.78)",
    "200": "oklch(0.8163 0.1378 159.48)",
    "300": "oklch(0.7570 0.1783 155.01)",
    "400": "oklch(0.6405 0.1493 155.27)",
    "500": "oklch(0.5424 0.1251 155.15)",
    "600": "oklch(0.4581 0.1034 155.88)",
    "700": "oklch(0.3924 0.0862 156.66)",
    "800": "oklch(0.3236 0.0691 156.97)",
    "900": "oklch(0.2550 0.0508 157.67)",
  },
  informative: {
    "10":  "oklch(0.9805 0.0079 253.85)",
    "25":  "oklch(0.9549 0.0188 255.53)",
    "50":  "oklch(0.9075 0.0406 257.51)",
    "100": "oklch(0.8626 0.0605 256.94)",
    "200": "oklch(0.8179 0.0826 256.50)",
    "300": "oklch(0.7288 0.1251 257.05)",
    "400": "oklch(0.6467 0.1680 257.21)",
    "500": "oklch(0.5720 0.2076 258.93)",
    "600": "oklch(0.4879 0.1728 258.65)",
    "700": "oklch(0.3978 0.1373 258.61)",
    "800": "oklch(0.3055 0.0996 258.00)",
    "900": "oklch(0.2565 0.0785 257.26)",
  },
  "blue-gray": {
    "10":  "oklch(0.9897 0.0041 301.43)",
    "25":  "oklch(0.9621 0.0081 278.64)",
    "50":  "oklch(0.9239 0.0163 278.49)",
    "100": "oklch(0.8823 0.0249 278.33)",
    "200": "oklch(0.8041 0.0426 277.92)",
    "300": "oklch(0.7058 0.0665 276.71)",
    "400": "oklch(0.6021 0.0924 275.34)",
    "500": "oklch(0.4976 0.1199 273.84)",
    "600": "oklch(0.4265 0.1000 273.60)",
    "700": "oklch(0.3531 0.0787 274.08)",
    "800": "oklch(0.2718 0.0560 274.90)",
    "900": "oklch(0.2309 0.0448 274.87)",
  },
  turquoise: {
    "10":  "oklch(0.9862 0.0117 203.47)",
    "25":  "oklch(0.9747 0.0201 204.43)",
    "50":  "oklch(0.9427 0.0504 210.28)",
    "100": "oklch(0.9006 0.0790 204.83)",
    "200": "oklch(0.8760 0.0965 204.61)",
    "300": "oklch(0.8081 0.1343 207.04)",
    "400": "oklch(0.6998 0.1109 212.72)",
    "500": "oklch(0.5827 0.0976 206.65)",
    "600": "oklch(0.5024 0.0837 206.95)",
    "700": "oklch(0.4219 0.0699 207.26)",
    "800": "oklch(0.3370 0.0547 206.04)",
    "900": "oklch(0.2464 0.0383 203.53)",
  },
  purple: {
    "10":  "oklch(0.9745 0.0134 295.33)",
    "25":  "oklch(0.9588 0.0202 295.19)",
    "50":  "oklch(0.9151 0.0437 294.12)",
    "100": "oklch(0.8738 0.0650 293.79)",
    "200": "oklch(0.8307 0.0882 293.85)",
    "300": "oklch(0.7467 0.1353 291.97)",
    "400": "oklch(0.6653 0.1807 290.10)",
    "500": "oklch(0.5890 0.2241 286.64)",
    "600": "oklch(0.5018 0.1867 287.12)",
    "700": "oklch(0.4106 0.1487 287.12)",
    "800": "oklch(0.3143 0.1064 288.19)",
    "900": "oklch(0.2634 0.0837 289.15)",
  },
  pink: {
    "10":  "oklch(0.9816 0.0075 345.34)",
    "25":  "oklch(0.9471 0.0218 344.21)",
    "50":  "oklch(0.8925 0.0462 344.21)",
    "100": "oklch(0.8395 0.0688 344.57)",
    "200": "oklch(0.7865 0.0948 345.34)",
    "300": "oklch(0.6893 0.1443 347.20)",
    "400": "oklch(0.6431 0.1687 348.53)",
    "500": "oklch(0.5648 0.2035 352.07)",
    "600": "oklch(0.4970 0.1941 354.92)",
    "700": "oklch(0.4146 0.1600 354.29)",
    "800": "oklch(0.3302 0.1243 353.73)",
    "900": "oklch(0.2372 0.0859 351.63)",
  },
  /**
   * NOTE: src/index.css defines --color-rose-* TWICE — the second block
   * (lines ~210–221) overrides the first with what reads as coral/orange
   * hues (43°–60°), not true rose. These values mirror the resolved second
   * block. If you want a true rose, delete the second block in index.css.
   */
  rose: {
    "10":  "oklch(0.9856 0.0084 56.32)",
    "25":  "oklch(0.9572 0.0177 53.98)",
    "50":  "oklch(0.9152 0.0377 54.30)",
    "100": "oklch(0.8689 0.0877 60.68)",
    "200": "oklch(0.7690 0.1230 53.13)",
    "300": "oklch(0.7031 0.1621 49.67)",
    "400": "oklch(0.6718 0.1778 46.80)",
    "500": "oklch(0.5730 0.1681 43.40)",
    "600": "oklch(0.4780 0.1377 44.35)",
    "700": "oklch(0.3799 0.1065 45.67)",
    "800": "oklch(0.3268 0.0904 47.02)",
    "900": "oklch(0.2733 0.0723 49.97)",
  },
  khaki: {
    "10":  "oklch(0.9831 0.0034 67.78)",
    "25":  "oklch(0.9337 0.0154 77.07)",
    "50":  "oklch(0.8995 0.0224 74.08)",
    "100": "oklch(0.8375 0.0332 80.97)",
    "200": "oklch(0.8320 0.0384 75.09)",
    "300": "oklch(0.7654 0.0477 79.96)",
    "400": "oklch(0.6116 0.0680 78.60)",
    "500": "oklch(0.5688 0.0654 72.47)",
    "600": "oklch(0.5140 0.0583 72.57)",
    "700": "oklch(0.4032 0.0433 72.92)",
    "800": "oklch(0.3505 0.0364 74.63)",
    "900": "oklch(0.2616 0.0242 77.48)",
  },
  sps: {
    "10":  "oklch(0.9782 0.0108 10.33)",
    "25":  "oklch(0.9429 0.0241 14.43)",
    "50":  "oklch(0.8870 0.0499 13.52)",
    "100": "oklch(0.8332 0.0783 14.92)",
    "200": "oklch(0.7326 0.1346 17.49)",
    "300": "oklch(0.6470 0.1894 20.90)",
    "400": "oklch(0.6160 0.2121 23.42)",
    "500": "oklch(0.5770 0.2339 27.95)",
    "600": "oklch(0.4895 0.1978 27.74)",
    "700": "oklch(0.3960 0.1589 27.32)",
    "800": "oklch(0.2983 0.1188 25.79)",
    "900": "oklch(0.1897 0.0736 22.73)",
  },
  slate: {
    "10":  "oklch(97.89% 0.0029 264.54)",
    "25":  "oklch(96.15% 0.0054 274.97)",
    "50":  "oklch(92.82% 0.0084 271.32)",
    "100": "oklch(86.72% 0.0128 271.27)",
    "200": "oklch(77.32% 0.0193 269.04)",
    "300": "oklch(66.62% 0.0218 267.20)",
    "400": "oklch(55.95% 0.0258 269.22)",
    "500": "oklch(46.75% 0.0239 267.05)",
    "600": "oklch(38.25% 0.0199 266.03)",
    "700": "oklch(30.10% 0.0173 266.38)",
    "800": "oklch(23.88% 0.0124 264.31)",
    "900": "oklch(18.74% 0.0083 274.45)",
  },
  sage: {
    "10":  "oklch(97.33% 0.0041 157.18)",
    "25":  "oklch(95.65% 0.0066 160.07)",
    "50":  "oklch(92.38% 0.0101 164.85)",
    "100": "oklch(86.90% 0.0144 162.42)",
    "200": "oklch(77.67% 0.0174 162.62)",
    "300": "oklch(67.95% 0.0189 164.39)",
    "400": "oklch(57.97% 0.0189 168.05)",
    "500": "oklch(49.84% 0.0167 168.69)",
    "600": "oklch(40.91% 0.0156 171.60)",
    "700": "oklch(32.95% 0.0156 176.95)",
    "800": "oklch(25.83% 0.0146 181.56)",
    "900": "oklch(21.16% 0.01115 217.117)",
  },
}

const OPACITY_STEPS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const

/* ── Semantic token row — light + dark resolved values side by side ── */

function SemanticRow({ token }: { token: SemanticToken }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`var(${token.cssVar})`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore
    }
  }

  return (
    <div className="group relative rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-3">
      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-slate-100">
            {token.name}
          </p>
          {token.note && (
            <span className="shrink-0 rounded-full bg-gray-100 dark:bg-white/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-gray-600 dark:text-slate-300">
              {token.note}
            </span>
          )}
          {token.pair && token.contrast && (
            <ContrastChip pair={token.pair} contrast={token.contrast} />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-500 dark:text-slate-400">
          <code className="font-mono">{token.cssVar}</code>
          <code className="font-mono text-gray-400 dark:text-slate-500">{token.tailwind}</code>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-2">
          <SwatchTile label="Light" value={token.light} />
          <SwatchTile label="Dark" value={token.dark} />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : `Copy var(${token.cssVar})`}
        className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1 text-xs font-medium text-gray-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-gray-50 dark:hover:bg-slate-700"
      >
        {copied ? (
          <>
            <Check className="size-3.5 text-primary-600" />
            <span className="text-primary-600">Copied</span>
          </>
        ) : (
          <>
            <Copy className="size-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  )
}

function ContrastChip({ pair, contrast }: { pair: string; contrast: ContrastLevel }) {
  const styles: Record<ContrastLevel, string> = {
    AAA: "bg-success-50 text-success-700 border-success-200 dark:bg-success-300/15 dark:text-success-200 dark:border-success-300/30",
    AA: "bg-success-50 text-success-700 border-success-200 dark:bg-success-300/15 dark:text-success-200 dark:border-success-300/30",
    "AA Large": "bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-500/15 dark:text-warning-200 dark:border-warning-500/30",
    Verify: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-white/10 dark:text-slate-200 dark:border-white/15",
  }
  return (
    <span
      title={
        contrast === "AA Large"
          ? `Meets WCAG AA for large text (18px+ or 14px+ bold) on ${pair}. For small text, pair with a darker surface or run axe.`
          : contrast === "Verify"
            ? `Surface is conditional (e.g. transparent in one mode). Verify contrast on ${pair} with axe before shipping.`
            : `Pairs with ${pair} at WCAG ${contrast} for normal text.`
      }
      className={cn(
        "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider",
        styles[contrast]
      )}
    >
      {contrast} · on {pair}
    </span>
  )
}

function SwatchTile({ label, value }: { label: string; value: string }) {
  const isLight = label === "Light"
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-2 py-1.5",
        isLight ? "bg-white border-gray-200" : "bg-slate-900 border-white/10"
      )}
    >
      <div
        aria-hidden
        className="size-6 shrink-0 rounded border border-black/10"
        style={{ background: value }}
      />
      <div className="min-w-0">
        <p className={cn("text-[10px] font-mono uppercase tracking-wider", isLight ? "text-gray-500" : "text-slate-400")}>
          {label}
        </p>
        <code className={cn("block truncate font-mono text-[10px]", isLight ? "text-gray-700" : "text-slate-200")}>
          {value}
        </code>
      </div>
    </div>
  )
}

/* ── Palette strip — Tailwind-style row of clickable swatches per scale ── */

function PaletteSwatch({ slug, shade, scaleName }: { slug: string; shade: string; scaleName: string }) {
  const [copied, setCopied] = useState(false)
  const cssVar = `--color-${slug}-${shade}`
  const value = PALETTE_VALUES[slug]?.[shade] ?? "transparent"

  async function handleCopy(e: React.MouseEvent) {
    const useTailwind = e.shiftKey
    const payload = useTailwind ? `bg-${slug}-${shade}` : `var(${cssVar})`
    try {
      await navigator.clipboard.writeText(payload)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`${scaleName} ${shade} — ${value}\nclick: var(${cssVar})\nshift+click: bg-${slug}-${shade}`}
      aria-label={`${scaleName} ${shade}`}
      className="group relative aspect-square w-full rounded-md border border-black/5 dark:border-white/10 cursor-pointer transition-transform hover:scale-110 hover:z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:z-10"
      style={{ background: value }}
    >
      {copied && (
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-gray-900 dark:bg-white px-1.5 py-0.5 text-[10px] font-medium text-white dark:text-gray-900 whitespace-nowrap z-20 pointer-events-none">
          Copied
        </span>
      )}
    </button>
  )
}

function PaletteGrid() {
  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <div className="min-w-[640px] flex flex-col gap-3">
        {/* Shade-number header row */}
        <div className="grid grid-cols-[120px_repeat(12,minmax(0,1fr))] items-center gap-1">
          <div />
          {SHADES.map((shade) => (
            <div
              key={shade}
              className="text-center text-[10px] font-mono text-gray-400 dark:text-slate-500"
            >
              {shade}
            </div>
          ))}
        </div>

        {PALETTE_SCALES.map((scale) => (
          <div
            key={scale.slug}
            className="grid grid-cols-[120px_repeat(12,minmax(0,1fr))] items-center gap-1"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
                {scale.name}
              </span>
              <code className="text-[10px] font-mono text-gray-400 dark:text-slate-500">
                --color-{scale.slug}-*
              </code>
            </div>
            {SHADES.map((shade) => (
              <PaletteSwatch
                key={shade}
                slug={scale.slug}
                shade={shade}
                scaleName={scale.name}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Page ── */

export default function ColorsPage() {
  const { t } = useTranslation()

  return (
    <FoundationPage
      title={t("foundations.colors.title")}
      description={t("foundations.colors.description")}
    >
      <Section title={t("foundations.colors.overview.title")}>
        <p className="max-w-3xl text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
          {t("foundations.colors.overview.body")}
        </p>
      </Section>

      <Section
        title={t("foundations.colors.palette.title")}
        description={t("foundations.colors.palette.description")}
      >
        <div className="flex flex-col gap-6">
          <p className="text-xs text-gray-500 dark:text-slate-400">
            {t("foundations.colors.palette.hint")}
          </p>
          <PaletteGrid />
        </div>
      </Section>

      <Section
        title={t("foundations.colors.semantic.title")}
        description={t("foundations.colors.semantic.description")}
      >
        <div className="grid grid-cols-2 gap-3">
          {SEMANTIC_TOKENS.map((token) => (
            <SemanticRow key={token.cssVar} token={token} />
          ))}
        </div>
      </Section>

      <Section
        title={t("foundations.colors.opacity.title")}
        description={t("foundations.colors.opacity.description")}
      >
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-10 gap-3">
            {OPACITY_STEPS.map((step) => (
              <div key={step} className="flex flex-col gap-2">
                <div
                  aria-hidden
                  className="aspect-square w-full rounded-2xl border border-black/5 dark:border-white/10"
                  style={{
                    background: `oklch(0.5495 0.1269 158.75 / ${step}%)`,
                  }}
                />
                <code className="text-center text-xs font-mono text-gray-500 dark:text-slate-400">
                  /{step}
                </code>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            {t("foundations.colors.opacity.note")}
          </p>
        </div>
      </Section>

      <RelatedLinks
        title={t("foundations.colors.related.title")}
        items={[
          { label: "Theming", href: "/docs/theming" },
          { label: "Typography", href: "/foundations/typography" },
          { label: "Accessibility", href: "/foundations/accessibility" },
          { label: "Elevation", href: "/foundations/elevation" },
          { label: "Radius", href: "/foundations/radius" },
        ]}
      />
    </FoundationPage>
  )
}
