import { useTranslation } from "react-i18next"

import {
  CodeBlock,
  FoundationPage,
  RelatedLinks,
  Section,
  TokenScale,
  type TokenScaleItem,
} from "@/components/docs"

/* ── Radius scale — values mirror src/index.css @theme inline block ── */

interface RadiusStep {
  /** Display name. */
  name: string
  /** CSS variable name including --. */
  cssVar: string
  /** Tailwind utility class. */
  tailwindClass: string
  /** Resolved pixel value at default --radius (0.625rem = 10px). */
  px: string
  /** calc() formula or plain value, mirrored from index.css. */
  formula: string
}

const RADIUS_SCALE: RadiusStep[] = [
  { name: "none", cssVar: "—",          tailwindClass: "rounded-none", px: "0px",      formula: "0" },
  { name: "sm",   cssVar: "--radius-sm", tailwindClass: "rounded-sm",   px: "6px",      formula: "calc(var(--radius) * 0.6)" },
  { name: "md",   cssVar: "--radius-md", tailwindClass: "rounded-md",   px: "8px",      formula: "calc(var(--radius) * 0.8)" },
  { name: "lg",   cssVar: "--radius-lg", tailwindClass: "rounded-lg",   px: "10px",     formula: "var(--radius)" },
  { name: "xl",   cssVar: "--radius-xl", tailwindClass: "rounded-xl",   px: "14px",     formula: "calc(var(--radius) * 1.4)" },
  { name: "2xl",  cssVar: "--radius-2xl", tailwindClass: "rounded-2xl", px: "18px",     formula: "calc(var(--radius) * 1.8)" },
  { name: "3xl",  cssVar: "--radius-3xl", tailwindClass: "rounded-3xl", px: "22px",     formula: "calc(var(--radius) * 2.2)" },
  { name: "4xl",  cssVar: "--radius-4xl", tailwindClass: "rounded-4xl", px: "26px",     formula: "calc(var(--radius) * 2.6)" },
  { name: "full", cssVar: "—",           tailwindClass: "rounded-full", px: "9999px",   formula: "9999px" },
]

/* ── Resolved pixel values keyed by step name — used to render the visual swatches without a runtime var() lookup. ── */

const RADIUS_PX: Record<string, string> = {
  none: "0px",
  sm: "6px",
  md: "8px",
  lg: "10px",
  xl: "14px",
  "2xl": "18px",
  "3xl": "22px",
  "4xl": "26px",
  full: "9999px",
}

const SCALE_ITEMS: TokenScaleItem[] = RADIUS_SCALE.map((step) => ({
  token: step.name,
  value: `${step.px} · ${step.formula}`,
  tailwindClass: step.tailwindClass,
  example: (
    <div
      aria-hidden
      className="size-10 border border-gray-300 dark:border-white/15 bg-primary-50 dark:bg-primary/20"
      style={{ borderRadius: RADIUS_PX[step.name] }}
    />
  ),
}))

const OVERRIDE_SNIPPET = `/* app/styles/brand.css — rescale the entire radius system */
:root {
  /* Every radius token (sm, md, lg, xl, 2xl, 3xl, 4xl)
     is derived from --radius via calc().
     Default is 0.625rem (10px). Halve it for a sharper feel,
     double it for a friendlier, more rounded look. */
  --radius: 0.625rem;

  /* If you need to break a single step out of the proportional
     scale, override it directly — but prefer adjusting --radius
     to keep the rhythm intact. */
  /* --radius-2xl: 1.5rem; */
}`

/* ── In-context demo card ── */

function DemoCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 max-w-md">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-primary-100 dark:bg-primary-500/30" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            Mohammed Al Mansoori
          </span>
          <span className="text-xs text-gray-500 dark:text-slate-400">
            Account verified
          </span>
        </div>
        <span className="ms-auto rounded-full bg-success-50 dark:bg-success-300/20 px-2.5 py-0.5 text-[11px] font-medium text-success-700 dark:text-success-200">
          Active
        </span>
      </div>
      <input
        type="text"
        readOnly
        defaultValue="REQ-2025-0142"
        className="rounded-md border border-input bg-transparent px-3 py-2 text-sm"
      />
      <div className="flex items-center gap-2">
        <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">
          Continue
        </button>
        <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
          Cancel
        </button>
      </div>
    </div>
  )
}

/* ── Page ── */

export default function RadiusPage() {
  const { t } = useTranslation()

  return (
    <FoundationPage
      title={t("foundations.radius.title")}
      description={t("foundations.radius.description")}
    >
      <Section title={t("foundations.radius.overview.title")}>
        <p className="max-w-3xl text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
          {t("foundations.radius.overview.body")}
        </p>
      </Section>

      <Section
        title={t("foundations.radius.scale.title")}
        description={t("foundations.radius.scale.description")}
      >
        <TokenScale items={SCALE_ITEMS} exampleHeader="Shape" />
      </Section>

      <Section
        title={t("foundations.radius.context.title")}
        description={t("foundations.radius.context.description")}
      >
        <DemoCard />
        <p className="mt-3 text-xs text-gray-500 dark:text-slate-400 max-w-2xl">
          {t("foundations.radius.context.note")}
        </p>
      </Section>

      <Section
        title={t("foundations.radius.tailwind.title")}
        description={t("foundations.radius.tailwind.description")}
      >
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-left text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-slate-400">
                  <th className="px-4 py-3 font-medium">Token</th>
                  <th className="px-4 py-3 font-medium">CSS variable</th>
                  <th className="px-4 py-3 font-medium">Tailwind</th>
                  <th className="px-4 py-3 font-medium">Formula</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {RADIUS_SCALE.map((step) => (
                  <tr key={step.name} className="border-b border-gray-200 last:border-0 dark:border-white/5">
                    <td className="px-4 py-2 text-gray-900 dark:text-slate-100">{step.name}</td>
                    <td className="px-4 py-2 text-gray-600 dark:text-slate-300">{step.cssVar}</td>
                    <td className="px-4 py-2 text-gray-600 dark:text-slate-300">{step.tailwindClass}</td>
                    <td className="px-4 py-2 text-gray-500 dark:text-slate-400">{step.formula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section
        title={t("foundations.radius.rules.title")}
        description={t("foundations.radius.rules.description")}
      >
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("foundations.radius.rules.items.consistency")}</li>
          <li>{t("foundations.radius.rules.items.nesting")}</li>
          <li>{t("foundations.radius.rules.items.full")}</li>
          <li>{t("foundations.radius.rules.items.none")}</li>
          <li>{t("foundations.radius.rules.items.scale")}</li>
        </ul>
      </Section>

      <Section
        title={t("foundations.radius.override.title")}
        description={t("foundations.radius.override.description")}
      >
        <CodeBlock code={OVERRIDE_SNIPPET} language="css" filename="app/styles/brand.css" />
      </Section>

      <RelatedLinks
        title={t("foundations.radius.related.title")}
        items={[
          { label: "Spacing", href: "/foundations/spacing" },
          { label: "Elevation", href: "/foundations/elevation" },
          { label: "Colors", href: "/foundations/colors" },
        ]}
      />
    </FoundationPage>
  )
}
