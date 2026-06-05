import { useTranslation } from "react-i18next"

import {
  CodeBlock,
  FoundationPage,
  RelatedLinks,
  Section,
  TokenScale,
  type TokenScaleItem,
} from "@/components/docs"

/* ── Spacing scale data — Tailwind defaults (base unit = 0.25rem = 4px) ── */

interface SpacingStep {
  /** Tailwind scale token (e.g. "4" → p-4). */
  token: string
  /** rem value as Tailwind emits it. */
  rem: string
  /** Pixel equivalent at the default root font size (16px). */
  px: string
}

const SPACING_SCALE: SpacingStep[] = [
  { token: "0",   rem: "0",       px: "0px" },
  { token: "0.5", rem: "0.125rem", px: "2px" },
  { token: "1",   rem: "0.25rem",  px: "4px" },
  { token: "1.5", rem: "0.375rem", px: "6px" },
  { token: "2",   rem: "0.5rem",   px: "8px" },
  { token: "2.5", rem: "0.625rem", px: "10px" },
  { token: "3",   rem: "0.75rem",  px: "12px" },
  { token: "4",   rem: "1rem",     px: "16px" },
  { token: "5",   rem: "1.25rem",  px: "20px" },
  { token: "6",   rem: "1.5rem",   px: "24px" },
  { token: "8",   rem: "2rem",     px: "32px" },
  { token: "10",  rem: "2.5rem",   px: "40px" },
  { token: "12",  rem: "3rem",     px: "48px" },
  { token: "16",  rem: "4rem",     px: "64px" },
  { token: "20",  rem: "5rem",     px: "80px" },
  { token: "24",  rem: "6rem",     px: "96px" },
  { token: "32",  rem: "8rem",     px: "128px" },
]

const SPACING_ITEMS: TokenScaleItem[] = SPACING_SCALE.map((step) => ({
  token: step.token,
  value: `${step.rem} · ${step.px}`,
  tailwindClass: `p-${step.token} · gap-${step.token} · m-${step.token}`,
  example: (
    <div className="flex items-center gap-2">
      <div
        aria-hidden
        className="h-4 rounded bg-primary-500 dark:bg-primary-300"
        style={{ width: step.rem || "1px" }}
      />
    </div>
  ),
}))

/* ── Container scale — common max-width utilities used across docs and dashboards ── */

interface ContainerStep {
  token: string
  value: string
  /** Typical use case. */
  use: string
}

const CONTAINER_SCALE: ContainerStep[] = [
  { token: "max-w-prose", value: "65ch (~520px)", use: "Body copy and articles. Caps line length for readability." },
  { token: "max-w-md",    value: "28rem (448px)",  use: "Auth forms, login dialogs, single-column flows." },
  { token: "max-w-lg",    value: "32rem (512px)",  use: "Modal bodies, focused form panels." },
  { token: "max-w-xl",    value: "36rem (576px)",  use: "Onboarding steps, in-card form regions." },
  { token: "max-w-3xl",   value: "48rem (768px)",  use: "Settings pages, documentation prose." },
  { token: "max-w-5xl",   value: "64rem (1024px)", use: "Detail pages with side metadata column." },
  { token: "max-w-6xl",   value: "72rem (1152px)", use: "Default for docs and component pages. The current page is max-w-6xl." },
  { token: "max-w-7xl",   value: "80rem (1280px)", use: "Wide dashboards, data tables, charts." },
  { token: "max-w-full",  value: "100%",           use: "Edge-to-edge surfaces — chart canvases, full-bleed images." },
]

const OVERRIDE_SNIPPET = `/* app/styles/brand.css — adjust the spacing base unit */
:root {
  /* Tailwind v4 derives every spacing utility from --spacing.
     Default is 0.25rem (4px). Changing it scales the entire
     system proportionally — p-4 becomes 5px*4=20px if you set
     it to 0.3125rem, etc. */
  --spacing: 0.25rem;
}

/* Override the dashboard's outer container max-width by setting
   it on the layout shell, not by changing every page. */
.app-shell {
  max-width: 90rem;  /* ~1440px */
  margin-inline: auto;
}`

/* ── Page ── */

export default function SpacingPage() {
  const { t } = useTranslation()

  return (
    <FoundationPage
      title={t("foundations.spacing.title")}
      description={t("foundations.spacing.description")}
    >
      <Section title={t("foundations.spacing.overview.title")}>
        <p className="max-w-3xl text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
          {t("foundations.spacing.overview.body")}
        </p>
      </Section>

      <Section
        title={t("foundations.spacing.scale.title")}
        description={t("foundations.spacing.scale.description")}
      >
        <TokenScale items={SPACING_ITEMS} exampleHeader="Width" />
      </Section>

      <Section
        title={t("foundations.spacing.containers.title")}
        description={t("foundations.spacing.containers.description")}
      >
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-left text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-slate-400">
                  <th className="px-4 py-3 font-medium">Class</th>
                  <th className="px-4 py-3 font-medium">Width</th>
                  <th className="px-4 py-3 font-medium">When to use</th>
                </tr>
              </thead>
              <tbody>
                {CONTAINER_SCALE.map((c) => (
                  <tr
                    key={c.token}
                    className="border-b border-gray-200 last:border-0 dark:border-white/5"
                  >
                    <td className="px-4 py-3 align-top">
                      <code className="font-mono text-xs text-gray-900 dark:text-slate-100">{c.token}</code>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <code className="font-mono text-xs text-gray-600 dark:text-slate-300">{c.value}</code>
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700 dark:text-slate-300">
                      {c.use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section
        title={t("foundations.spacing.tailwind.title")}
        description={t("foundations.spacing.tailwind.description")}
      >
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-left text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-slate-400">
                  <th className="px-4 py-3 font-medium">Utility</th>
                  <th className="px-4 py-3 font-medium">What it sets</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {[
                  { u: "p-* / px-* / py-* / ps-* / pe-* / pt-* / pb-*", w: "Padding (all / horizontal / vertical / start / end / top / bottom). Use logical variants (ps/pe) for i18n-safe spacing." },
                  { u: "m-* / mx-* / my-* / ms-* / me-* / mt-* / mb-*", w: "Margin. Same axis options as padding." },
                  { u: "gap-* / gap-x-* / gap-y-*", w: "Spacing between children in flex/grid containers. Prefer over space-* for modern code." },
                  { u: "space-x-* / space-y-*", w: "Adds margin to direct children. Older pattern — use gap-* unless you need to support IE." },
                  { u: "max-w-* / w-* / min-w-*", w: "Container widths. max-w-* caps at the given size; max-w-prose caps at ~65ch." },
                  { u: "container", w: "Centered, responsive container. Pair with px-* for gutters." },
                ].map((row) => (
                  <tr key={row.u} className="border-b border-gray-200 last:border-0 dark:border-white/5">
                    <td className="px-4 py-2 align-top text-gray-900 dark:text-slate-100">{row.u}</td>
                    <td className="px-4 py-2 align-top text-gray-600 dark:text-slate-300 font-sans">{row.w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section
        title={t("foundations.spacing.rules.title")}
        description={t("foundations.spacing.rules.description")}
      >
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("foundations.spacing.rules.items.scale")}</li>
          <li>{t("foundations.spacing.rules.items.gapVsSpace")}</li>
          <li>{t("foundations.spacing.rules.items.responsive")}</li>
          <li>{t("foundations.spacing.rules.items.logical")}</li>
          <li>{t("foundations.spacing.rules.items.padVsMargin")}</li>
          <li>{t("foundations.spacing.rules.items.prose")}</li>
        </ul>
      </Section>

      <Section
        title={t("foundations.spacing.override.title")}
        description={t("foundations.spacing.override.description")}
      >
        <CodeBlock code={OVERRIDE_SNIPPET} language="css" filename="app/styles/brand.css" />
      </Section>

      <RelatedLinks
        title={t("foundations.spacing.related.title")}
        items={[
          { label: "Typography", href: "/foundations/typography" },
          { label: "Radius", href: "/foundations/radius" },
          { label: "Elevation", href: "/foundations/elevation" },
          { label: "Accessibility", href: "/foundations/accessibility" },
        ]}
      />
    </FoundationPage>
  )
}
