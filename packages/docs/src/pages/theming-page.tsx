import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  CodeBlock,
  DocsPage,
  Prose,
  RelatedLinks,
  Section,
  TokenSwatch,
} from "@/components/docs"

/** Six representative tokens shown side-by-side in §3 — the full catalogue lives on /foundations/colors. */
const MODE_PREVIEW_TOKENS = [
  "--background",
  "--foreground",
  "--primary",
  "--muted",
  "--border",
  "--destructive",
] as const

/* ── Token inventory (resolved values verified against src/index.css :root + .dark) ──
 *
 * `light` and `dark` are the literal oklch() values from index.css with every
 * var(--color-…-N) palette ref pre-resolved. We render these as inline-style
 * backgrounds so the swatch always shows the right mode-specific colour
 * regardless of the page's own theme — bypassing the var() cascade that would
 * otherwise resolve `--color-primary-500` etc. against the page's active mode.
 */

interface SemanticToken {
  cssVar: string
  name: string
  light: string
  dark: string
}

const CORE_TOKENS: SemanticToken[] = [
  { cssVar: "--background", name: "Background", light: "oklch(1 0 0)", dark: "oklch(0.145 0 0)" },
  { cssVar: "--foreground", name: "Foreground", light: "oklch(0.145 0 0)", dark: "oklch(86.72% 0.0128 271.27)" },
  { cssVar: "--card", name: "Card", light: "oklch(1 0 0)", dark: "oklch(18.74% 0.0083 274.45)" },
  { cssVar: "--card-foreground", name: "Card foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.985 0 0)" },
  { cssVar: "--popover", name: "Popover", light: "oklch(1 0 0)", dark: "oklch(18.74% 0.0083 274.45)" },
  { cssVar: "--popover-foreground", name: "Popover foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.985 0 0)" },
  { cssVar: "--primary", name: "Primary", light: "oklch(0.5495 0.1269 158.75)", dark: "oklch(0.7274 0.1098 168.27)" },
  { cssVar: "--primary-foreground", name: "Primary foreground", light: "oklch(0.8799 0.0511 172.77)", dark: "oklch(0.205 0 0)" },
  { cssVar: "--secondary", name: "Secondary", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)" },
  { cssVar: "--secondary-foreground", name: "Secondary foreground", light: "oklch(0.205 0 0)", dark: "oklch(0.985 0 0)" },
  { cssVar: "--muted", name: "Muted", light: "oklch(0.97 0 0)", dark: "oklch(30.10% 0.0173 266.38)" },
  { cssVar: "--muted-foreground", name: "Muted foreground", light: "oklch(0.556 0 0)", dark: "oklch(66.62% 0.0218 267.20)" },
  { cssVar: "--accent", name: "Accent", light: "oklch(0.97 0 0)", dark: "oklch(18.74% 0.0083 274.45)" },
  { cssVar: "--accent-foreground", name: "Accent foreground", light: "oklch(0.205 0 0)", dark: "oklch(0.985 0 0)" },
  { cssVar: "--destructive", name: "Destructive", light: "oklch(0.9007 0.0384 23.87)", dark: "oklch(0.7143 0.1281 25.43)" },
  { cssVar: "--destructive-foreground", name: "Destructive foreground", light: "oklch(0.4901 0.1754 29.29)", dark: "oklch(0.7143 0.1281 25.43)" },
  { cssVar: "--warning", name: "Warning", light: "oklch(0.9423 0.0659 87.15)", dark: "oklch(0.1749 0.0340 75.24)" },
  { cssVar: "--warning-foreground", name: "Warning foreground", light: "oklch(0.5137 0.1149 63.42)", dark: "oklch(0.8351 0.1681 81.85)" },
  { cssVar: "--border", name: "Border", light: "oklch(92.191% 0.0001 271.152)", dark: "oklch(1 0 0 / 10%)" },
  { cssVar: "--input", name: "Input", light: "oklch(0.8822 0.0000 89.88)", dark: "oklch(38.25% 0.0199 266.03)" },
  { cssVar: "--ring", name: "Ring", light: "oklch(0.708 0 0)", dark: "oklch(0.556 0 0)" },
]

/* ── Tailwind utility table (moved from foundations/colors page) ── */

interface TailwindRow {
  key: string
  bg: string
  text: string
  border: string
}

const TAILWIND_ROWS: TailwindRow[] = [
  { key: "background", bg: "bg-background", text: "text-background", border: "—" },
  { key: "foreground", bg: "—", text: "text-foreground", border: "—" },
  { key: "primary", bg: "bg-primary", text: "text-primary", border: "border-primary" },
  { key: "secondary", bg: "bg-secondary", text: "text-secondary", border: "—" },
  { key: "muted", bg: "bg-muted", text: "text-muted-foreground", border: "—" },
  { key: "accent", bg: "bg-accent", text: "text-accent-foreground", border: "—" },
  { key: "destructive", bg: "bg-destructive", text: "text-destructive", border: "—" },
  { key: "warning", bg: "bg-warning", text: "text-warning", border: "—" },
  { key: "border", bg: "—", text: "—", border: "border-border" },
  { key: "input", bg: "—", text: "—", border: "border-input" },
  { key: "ring", bg: "—", text: "—", border: "ring-ring" },
]

/* ── Snippets ── */

/** Global override — replace the design system's defaults. The canonical "I want a brand swap" pattern. */
const OVERRIDE_SNIPPET = `/* app/styles/brand.css — override design-system colors */
:root {
  /* Brand primary — swap with your own */
  --primary: oklch(0.55 0.15 250);          /* indigo-ish */
  --primary-foreground: oklch(0.98 0 0);    /* near white */

  /* Status colors — usually keep these */
  --destructive: oklch(0.90 0.04 24);
  --warning: oklch(0.94 0.07 87);
}

.dark {
  --primary: oklch(0.72 0.11 250);
  --primary-foreground: oklch(0.20 0 0);
}`

/** Scoped brand class — for multi-tenant apps where different brands live side-by-side. */
const MULTI_TENANT_SNIPPET = `/* Scoped to a brand class so multiple brands compose on the same document. */
.brand-dpds {
  --primary: oklch(0.6 0.15 250);
  --primary-foreground: oklch(1 0 0);
}

/* Brand × dark mode composes via CSS specificity — class order doesn't matter. */
.brand-dpds.dark {
  --primary: oklch(0.7 0.15 250);
}`

const SCOPED_SNIPPET = `<!-- Whole document: every screen in this app uses the brand override. -->
<html class="brand-dpds">

<!-- Subtree only: a customer-branded portal embedded inside the
     internal CRM keeps its theme without leaking to siblings. -->
<div class="brand-dpds">
  <CustomerPortal />
</div>`

/* ── Page ── */

export default function ThemingPage() {
  const { t } = useTranslation()

  return (
    <DocsPage
      eyebrow={t("docs.gettingStarted.eyebrow")}
      title={t("docs.gettingStarted.theming.title")}
      description={t("docs.gettingStarted.theming.description")}
    >
      {/* 1. Token architecture */}
      <Section title={t("docs.gettingStarted.theming.architecture.title")}>
        <Prose>
          <p>{t("docs.gettingStarted.theming.architecture.p1")}</p>
          <p>{t("docs.gettingStarted.theming.architecture.p2")}</p>
        </Prose>
      </Section>

      {/* 2. Token layers */}
      <Section title={t("docs.gettingStarted.theming.layers.title")}>
        <Prose>
          <p>{t("docs.gettingStarted.theming.layers.intro")}</p>
          <ul>
            <li>
              <strong>{t("docs.gettingStarted.theming.layers.palette.title")}</strong>
              {" — "}
              {t("docs.gettingStarted.theming.layers.palette.body")}
            </li>
            <li>
              <strong>{t("docs.gettingStarted.theming.layers.semantic.title")}</strong>
              {" — "}
              {t("docs.gettingStarted.theming.layers.semantic.body")}
            </li>
          </ul>
        </Prose>

        <div className="rounded-xl border-l-4 border-l-primary border border-border bg-primary/5 p-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
            {t("docs.gettingStarted.theming.layers.rule.title")}
          </p>
          <p className="mt-1 text-sm text-gray-700 dark:text-slate-300">
            {t("docs.gettingStarted.theming.layers.rule.body")}
          </p>
        </div>

        <Prose>
          <p>{t("docs.gettingStarted.theming.layers.list.intro")}</p>
        </Prose>

        <div className="grid grid-cols-4 gap-x-6 gap-y-1">
          {CORE_TOKENS.map((token) => (
            <code
              key={token.cssVar}
              className="text-xs font-mono text-gray-700 dark:text-slate-300"
            >
              {token.cssVar}
            </code>
          ))}
        </div>
      </Section>

      {/* 3. Light + Dark token tables */}
      <Section
        title={t("docs.gettingStarted.theming.modes.title")}
        description={t("docs.gettingStarted.theming.modes.description")}
      >
        {(() => {
          const previewTokens = CORE_TOKENS.filter((t) =>
            (MODE_PREVIEW_TOKENS as readonly string[]).includes(t.cssVar)
          )
          return (
            <div className="grid grid-cols-2 gap-6">
              <TokenColumn
                heading={t("docs.gettingStarted.theming.modes.light")}
                tokens={previewTokens}
                mode="light"
              />
              <TokenColumn
                heading={t("docs.gettingStarted.theming.modes.dark")}
                tokens={previewTokens}
                mode="dark"
              />
            </div>
          )
        })()}
        <Link
          to="/foundations/colors"
          className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {t("docs.gettingStarted.theming.modes.fullCatalogue")}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Section>

      {/* 4. Tailwind mapping */}
      <Section
        title={t("docs.gettingStarted.theming.tailwind.title")}
        description={t("docs.gettingStarted.theming.tailwind.description")}
      >
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-left text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-slate-400">
                  <th className="px-4 py-3 font-medium">{t("docs.gettingStarted.theming.tailwind.headers.token")}</th>
                  <th className="px-4 py-3 font-medium">{t("docs.gettingStarted.theming.tailwind.headers.background")}</th>
                  <th className="px-4 py-3 font-medium">{t("docs.gettingStarted.theming.tailwind.headers.text")}</th>
                  <th className="px-4 py-3 font-medium">{t("docs.gettingStarted.theming.tailwind.headers.border")}</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {TAILWIND_ROWS.map((row) => (
                  <tr key={row.key} className="border-b border-gray-200 last:border-0 dark:border-white/5">
                    <td className="px-4 py-2 text-gray-900 dark:text-slate-100">{row.key}</td>
                    <td className="px-4 py-2 text-gray-600 dark:text-slate-300">{row.bg}</td>
                    <td className="px-4 py-2 text-gray-600 dark:text-slate-300">{row.text}</td>
                    <td className="px-4 py-2 text-gray-600 dark:text-slate-300">{row.border}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* 5. Overriding tokens — global default replacement */}
      <Section
        title={t("docs.gettingStarted.theming.override.title")}
        description={t("docs.gettingStarted.theming.override.description")}
      >
        <CodeBlock code={OVERRIDE_SNIPPET} language="css" filename="app/styles/brand.css" />
      </Section>

      {/* 6. Multi-tenant theming — scoped brand classes + brand × dark */}
      <Section title={t("docs.gettingStarted.theming.multiTenant.title")}>
        <Prose>
          <p>{t("docs.gettingStarted.theming.multiTenant.intro")}</p>
        </Prose>
        <CodeBlock code={MULTI_TENANT_SNIPPET} language="css" filename="app/styles/brand.css" />
        <Prose>
          <p>{t("docs.gettingStarted.theming.multiTenant.scope")}</p>
        </Prose>
        <CodeBlock code={SCOPED_SNIPPET} language="html" />
      </Section>

      {/* 7. Usage rules */}
      <Section
        title={t("docs.gettingStarted.theming.rules.title")}
        description={t("docs.gettingStarted.theming.rules.description")}
      >
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5">
          <li>{t("docs.gettingStarted.theming.rules.items.semantic")}</li>
          <li>{t("docs.gettingStarted.theming.rules.items.contrast")}</li>
          <li>{t("docs.gettingStarted.theming.rules.items.brand")}</li>
          <li>{t("docs.gettingStarted.theming.rules.items.status")}</li>
          <li>{t("docs.gettingStarted.theming.rules.items.darkparity")}</li>
        </ul>
      </Section>

      {/* 8. Related */}
      <RelatedLinks
        title={t("docs.gettingStarted.theming.related.title")}
        items={[
          { label: t("docs.gettingStarted.theming.related.colors"), href: "/foundations/colors" },
          { label: t("docs.gettingStarted.theming.related.typography"), href: "/foundations/typography" },
          { label: t("docs.gettingStarted.theming.related.darkMode"), href: "/docs/dark-mode" },
        ]}
      />
    </DocsPage>
  )
}

/* ── Sub-component: a vertical column of TokenSwatches in a given mode ── */

function TokenColumn({
  heading,
  tokens,
  mode,
}: {
  heading: string
  tokens: SemanticToken[]
  mode: "light" | "dark"
}) {
  const resolve = (t: SemanticToken) => (mode === "light" ? t.light : t.dark)

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
        {heading}
      </h3>
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-3">
        {tokens.map((token) => {
          const resolved = resolve(token)
          return (
            <TokenSwatch
              key={token.cssVar}
              name={token.name}
              cssVar={token.cssVar}
              value={resolved}
              preview={
                <div
                  className="size-full"
                  style={{ background: resolved }}
                  aria-hidden
                />
              }
            />
          )
        })}
      </div>
    </div>
  )
}
