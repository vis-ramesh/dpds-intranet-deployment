import { useTranslation } from "react-i18next"

import {
  CodeBlock,
  FoundationPage,
  RelatedLinks,
  Section,
  TokenScale,
  type TokenScaleItem,
} from "@/components/docs"

/* ── Font specimen data ── */

interface FontFamily {
  name: string
  cssVar: string
  fontFamily: string
  tailwindClass: string
  weights: { weight: number; label: string }[]
  sample: string
  purpose: string
}

const FONT_FAMILIES: FontFamily[] = [
  {
    name: "Dubai (sans)",
    cssVar: "--font-sans",
    fontFamily: "'dubai', sans-serif",
    tailwindClass: "font-sans",
    weights: [
      { weight: 300, label: "Light" },
      { weight: 400, label: "Regular" },
      { weight: 500, label: "Medium" },
      { weight: 700, label: "Bold" },
    ],
    sample: "The quick brown fox jumps over the lazy dog. 0123456789",
    purpose: "Default UI face. Body copy, labels, navigation, dialog content — everything that isn't code or a heading.",
  },
  {
    name: "Bukra (mono / display)",
    cssVar: "--font-mono",
    fontFamily: "'bukra', monospace",
    tailwindClass: "font-mono",
    weights: [
      { weight: 300, label: "Light" },
      { weight: 400, label: "Regular" },
      { weight: 700, label: "Bold" },
      { weight: 900, label: "Black" },
    ],
    sample: "TICKET-2025-0142 · AED 1,200.00",
    purpose: "Display headings, badge labels, button text, code snippets, and any metadata where character alignment matters.",
  },
]

/* ── Type scale data — semantic name → Tailwind class → resolved size ── */

interface TypeStep {
  name: string
  tailwindClass: string
  size: string
  lineHeight: string
  example: string
}

const TYPE_SCALE: TypeStep[] = [
  { name: "Display",  tailwindClass: "text-5xl",  size: "48px",   lineHeight: "1",      example: "Display" },
  { name: "H1",       tailwindClass: "text-4xl",  size: "36px",   lineHeight: "2.5rem", example: "Heading 1" },
  { name: "H2",       tailwindClass: "text-3xl",  size: "30px",   lineHeight: "2.25rem", example: "Heading 2" },
  { name: "H3",       tailwindClass: "text-2xl",  size: "24px",   lineHeight: "2rem",   example: "Heading 3" },
  { name: "H4",       tailwindClass: "text-xl",   size: "20px",   lineHeight: "1.75rem", example: "Heading 4" },
  { name: "H5",       tailwindClass: "text-lg",   size: "18px",   lineHeight: "1.75rem", example: "Heading 5" },
  { name: "H6 / Body",tailwindClass: "text-base", size: "16px",   lineHeight: "1.5rem", example: "Body copy — the workhorse size for everything readable." },
  { name: "Small",    tailwindClass: "text-sm",   size: "14px",   lineHeight: "1.25rem", example: "Small — helper text, table cells, dense layouts." },
  { name: "Caption",  tailwindClass: "text-xs",   size: "12px",   lineHeight: "1rem",   example: "Caption — timestamps, footnotes, legal copy." },
]

const TAILWIND_MAPPING: TokenScaleItem[] = TYPE_SCALE.map((step) => ({
  token: step.name,
  value: `${step.size} / ${step.lineHeight}`,
  tailwindClass: step.tailwindClass,
  example: (
    <span className={step.tailwindClass} style={{ lineHeight: step.lineHeight }}>
      {step.example}
    </span>
  ),
}))

const OVERRIDE_SNIPPET = `/* app/styles/brand.css — swap the font stack */
:root {
  /* Replace with your brand fonts. Keep the fallback chain. */
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* --font-heading falls back to --font-sans by default; override
     separately if your brand uses a different display face. */
  --font-heading: 'Cal Sans', var(--font-sans);
}

/* Optional: register your faces with @font-face for self-hosting,
   then they'll resolve through the --font-sans / --font-mono vars. */`

/* ── Page ── */

export default function TypographyPage() {
  const { t } = useTranslation()

  return (
    <FoundationPage
      title={t("foundations.typography.title")}
      description={t("foundations.typography.description")}
    >
      <Section title={t("foundations.typography.overview.title")}>
        <p className="max-w-3xl text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
          {t("foundations.typography.overview.body")}
        </p>
      </Section>

      <Section
        title={t("foundations.typography.families.title")}
        description={t("foundations.typography.families.description")}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {FONT_FAMILIES.map((family) => (
            <div
              key={family.cssVar}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100">
                  {family.name}
                </h3>
                <code className="text-xs font-mono text-gray-400 dark:text-slate-500">
                  {family.cssVar}
                </code>
                <code className="text-xs font-mono text-gray-400 dark:text-slate-500">
                  {family.tailwindClass}
                </code>
              </div>

              <p
                className="text-2xl text-gray-900 dark:text-slate-100"
                style={{ fontFamily: family.fontFamily }}
              >
                {family.sample}
              </p>

              <div className="flex flex-col gap-2">
                {family.weights.map((w) => (
                  <div
                    key={w.weight}
                    className="grid grid-cols-[80px_1fr] items-baseline gap-3"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 dark:text-slate-400">
                      {w.label} ({w.weight})
                    </span>
                    <span
                      className="text-base text-gray-900 dark:text-slate-100"
                      style={{ fontFamily: family.fontFamily, fontWeight: w.weight }}
                    >
                      Aa Bb Cc — the quick brown fox
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 dark:text-slate-400 max-w-prose">
                {family.purpose}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={t("foundations.typography.scale.title")}
        description={t("foundations.typography.scale.description")}
      >
        <div className="flex flex-col gap-3">
          {TYPE_SCALE.map((step) => (
            <div
              key={step.name}
              className="grid grid-cols-[160px_1fr] items-baseline gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-4"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
                  {step.name}
                </span>
                <code className="text-[11px] font-mono text-gray-500 dark:text-slate-400">
                  {step.tailwindClass}
                </code>
                <code className="text-[11px] font-mono text-gray-400 dark:text-slate-500">
                  {step.size} / {step.lineHeight}
                </code>
              </div>
              <p className={step.tailwindClass + " text-gray-900 dark:text-slate-100"} style={{ lineHeight: step.lineHeight }}>
                {step.example}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={t("foundations.typography.tailwind.title")}
        description={t("foundations.typography.tailwind.description")}
      >
        <TokenScale items={TAILWIND_MAPPING} exampleHeader="Preview" />
      </Section>

      <Section
        title={t("foundations.typography.rules.title")}
        description={t("foundations.typography.rules.description")}
      >
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("foundations.typography.rules.items.lineLength")}</li>
          <li>{t("foundations.typography.rules.items.lineHeight")}</li>
          <li>{t("foundations.typography.rules.items.weight")}</li>
          <li>{t("foundations.typography.rules.items.mono")}</li>
          <li>{t("foundations.typography.rules.items.alignment")}</li>
          <li>{t("foundations.typography.rules.items.scaling")}</li>
        </ul>
      </Section>

      <Section
        title={t("foundations.typography.override.title")}
        description={t("foundations.typography.override.description")}
      >
        <CodeBlock code={OVERRIDE_SNIPPET} language="css" filename="app/styles/brand.css" />
      </Section>

      <RelatedLinks
        title={t("foundations.typography.related.title")}
        items={[
          { label: "Colors", href: "/foundations/colors" },
          { label: "Accessibility", href: "/foundations/accessibility" },
          { label: "Spacing", href: "/foundations/spacing" },
        ]}
      />
    </FoundationPage>
  )
}
