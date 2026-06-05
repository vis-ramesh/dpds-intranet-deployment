import { useTranslation } from "react-i18next"

import {
  CodeBlock,
  FoundationPage,
  RelatedLinks,
  Section,
} from "@/components/docs"

/* ── Semantic shadows — mirror the @theme block in src/index.css ── */

interface ShadowToken {
  name: string
  cssVar: string
  /** Inline style value, mirroring the CSS variable for cases where var() lookup is unwanted. */
  value: string
  description: string
}

const SEMANTIC_SHADOWS: ShadowToken[] = [
  {
    name: "Card",
    cssVar: "--shadow-card",
    value: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
    description: "Subtle resting elevation. Cards, list items, table headers — anything that sits at page level but needs a hint of lift.",
  },
  {
    name: "Popover",
    cssVar: "--shadow-popover",
    value: "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 10px 15px -3px rgb(0 0 0 / 0.10)",
    description: "Floating-element elevation. Dropdowns, popovers, hover cards, comboboxes — anything that hovers above the page on user action.",
  },
  {
    name: "Modal",
    cssVar: "--shadow-modal",
    value: "0 10px 15px -3px rgb(0 0 0 / 0.10), 0 25px 50px -12px rgb(0 0 0 / 0.25)",
    description: "Dramatic elevation for top-of-stack surfaces. Dialogs, drawers, sheets — anything paired with a backdrop.",
  },
  {
    name: "Toast",
    cssVar: "--shadow-toast",
    value: "0 4px 6px -1px rgb(0 0 0 / 0.10), 0 8px 16px -4px rgb(0 0 0 / 0.12)",
    description: "Floating-stacking elevation. Toasts, transient banners, snackbars — components that appear without dimming the page.",
  },
]

/* ── Tailwind default shadow scale — reference only; no new CSS vars ── */

interface TailwindShadow {
  utility: string
  preview: string
  use: string
}

const TAILWIND_SHADOWS: TailwindShadow[] = [
  { utility: "shadow-none", preview: "none", use: "Reset elevation. Flatten an element back to the page." },
  { utility: "shadow-xs", preview: "0 1px rgb(0 0 0 / 0.05)", use: "Hairline lift — barely there. Use on dense surfaces." },
  { utility: "shadow-sm", preview: "0 1px 2px 0 rgb(0 0 0 / 0.05)", use: "Default for buttons, badges, inputs." },
  { utility: "shadow-md", preview: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", use: "Cards that need visible separation from the background." },
  { utility: "shadow-lg", preview: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", use: "Popovers, dropdowns, smaller floating UI." },
  { utility: "shadow-xl", preview: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", use: "Large floating surfaces. Most modals." },
  { utility: "shadow-2xl", preview: "0 25px 50px -12px rgb(0 0 0 / 0.25)", use: "Dramatic, attention-grabbing. Hero CTAs, premium cards." },
]

/* ── Z-index layers ── */

interface ZLayer {
  name: string
  cssVar: string
  value: number
  use: string
}

const Z_LAYERS: ZLayer[] = [
  { name: "Base",           cssVar: "--z-base",           value: 0,    use: "Page content. No explicit stacking." },
  { name: "Dropdown",       cssVar: "--z-dropdown",       value: 1000, use: "Select menus, autocomplete lists, context menus." },
  { name: "Sticky",         cssVar: "--z-sticky",         value: 1020, use: "Sticky headers, sticky filter bars." },
  { name: "Fixed",          cssVar: "--z-fixed",          value: 1030, use: "Fixed navigation, fixed action buttons." },
  { name: "Modal backdrop", cssVar: "--z-modal-backdrop", value: 1040, use: "The dimmed overlay behind a modal." },
  { name: "Modal",          cssVar: "--z-modal",          value: 1050, use: "Dialog and drawer bodies." },
  { name: "Popover",        cssVar: "--z-popover",        value: 1060, use: "Popovers and tooltips opened from a modal." },
  { name: "Toast",          cssVar: "--z-toast",          value: 1070, use: "Toast / sonner notifications — always on top of modals." },
  { name: "Tooltip",        cssVar: "--z-tooltip",        value: 1080, use: "Tooltips. Topmost layer; reserved for ephemeral hover text." },
]

const OVERRIDE_SNIPPET = `/* app/styles/brand.css — tune elevation and stacking */
:root {
  /* Semantic shadows. Lower opacity feels lighter; higher feels heavier. */
  --shadow-card: 0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06);
  --shadow-popover: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 10px 15px -3px rgb(0 0 0 / 0.10);
  --shadow-modal: 0 10px 15px -3px rgb(0 0 0 / 0.10), 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-toast: 0 4px 6px -1px rgb(0 0 0 / 0.10), 0 8px 16px -4px rgb(0 0 0 / 0.12);

  /* Z-index layers. Gaps of 10–20 between layers leave room for in-between
     stacking without renumbering the whole scale. */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-toast: 1070;
  --z-tooltip: 1080;
}

.dark {
  /* Dark-mode shadows are typically heavier (higher alpha) since they have less
     ambient contrast to fight. Tune to taste. */
  --shadow-card: 0 1px 2px 0 rgb(0 0 0 / 0.20), 0 1px 3px 0 rgb(0 0 0 / 0.30);
}`

/* ── Page ── */

export default function ElevationPage() {
  const { t } = useTranslation()

  return (
    <FoundationPage
      title={t("foundations.elevation.title")}
      description={t("foundations.elevation.description")}
    >
      <Section title={t("foundations.elevation.overview.title")}>
        <p className="max-w-3xl text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
          {t("foundations.elevation.overview.body")}
        </p>
      </Section>

      <Section
        title={t("foundations.elevation.semantic.title")}
        description={t("foundations.elevation.semantic.description")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SEMANTIC_SHADOWS.map((s) => (
            <div key={s.cssVar} className="flex flex-col gap-3">
              <div
                className="rounded-2xl bg-white dark:bg-slate-900 p-6 flex flex-col gap-2"
                style={{ boxShadow: s.value }}
              >
                <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                  {s.name}
                </span>
                <code className="text-[11px] font-mono text-gray-500 dark:text-slate-400">
                  box-shadow: var({s.cssVar})
                </code>
              </div>
              <p className="text-xs text-gray-600 dark:text-slate-400">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={t("foundations.elevation.tailwind.title")}
        description={t("foundations.elevation.tailwind.description")}
      >
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-left text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-slate-400">
                  <th className="px-4 py-3 font-medium">Utility</th>
                  <th className="px-4 py-3 font-medium">Preview</th>
                  <th className="px-4 py-3 font-medium">When to use</th>
                </tr>
              </thead>
              <tbody>
                {TAILWIND_SHADOWS.map((s) => (
                  <tr
                    key={s.utility}
                    className="border-b border-gray-200 last:border-0 dark:border-white/5"
                  >
                    <td className="px-4 py-4 align-middle">
                      <code className="font-mono text-xs text-gray-900 dark:text-slate-100">{s.utility}</code>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div
                        className="size-10 rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/5"
                        style={{ boxShadow: s.preview === "none" ? "none" : s.preview }}
                      />
                    </td>
                    <td className="px-4 py-4 align-middle text-sm text-gray-700 dark:text-slate-300">
                      {s.use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section
        title={t("foundations.elevation.zindex.title")}
        description={t("foundations.elevation.zindex.description")}
      >
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-left text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-slate-400">
                  <th className="px-4 py-3 font-medium">Layer</th>
                  <th className="px-4 py-3 font-medium">CSS variable</th>
                  <th className="px-4 py-3 font-medium">Value</th>
                  <th className="px-4 py-3 font-medium">When to use</th>
                </tr>
              </thead>
              <tbody>
                {Z_LAYERS.map((z) => (
                  <tr
                    key={z.cssVar}
                    className="border-b border-gray-200 last:border-0 dark:border-white/5"
                  >
                    <td className="px-4 py-3 align-middle text-sm font-medium text-gray-900 dark:text-slate-100">
                      {z.name}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <code className="font-mono text-xs text-gray-600 dark:text-slate-300">{z.cssVar}</code>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <code className="font-mono text-xs text-gray-500 dark:text-slate-400">{z.value}</code>
                    </td>
                    <td className="px-4 py-3 align-middle text-sm text-gray-700 dark:text-slate-300">
                      {z.use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section
        title={t("foundations.elevation.rules.title")}
        description={t("foundations.elevation.rules.description")}
      >
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("foundations.elevation.rules.items.intent")}</li>
          <li>{t("foundations.elevation.rules.items.layers")}</li>
          <li>{t("foundations.elevation.rules.items.dark")}</li>
          <li>{t("foundations.elevation.rules.items.adhoc")}</li>
          <li>{t("foundations.elevation.rules.items.color")}</li>
        </ul>
      </Section>

      <Section
        title={t("foundations.elevation.override.title")}
        description={t("foundations.elevation.override.description")}
      >
        <CodeBlock code={OVERRIDE_SNIPPET} language="css" filename="app/styles/brand.css" />
      </Section>

      <RelatedLinks
        title={t("foundations.elevation.related.title")}
        items={[
          { label: "Colors", href: "/foundations/colors" },
          { label: "Radius", href: "/foundations/radius" },
          { label: "Motion", href: "/foundations/motion" },
        ]}
      />
    </FoundationPage>
  )
}
