import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { Progress } from "@dpds-gov/design-system"
import { cn } from "@dpds-gov/design-system"
import {
  CodeBlock,
  ComponentPage,
  PreviewBlock,
  PropsTable,
  RelatedLinks,
  Section,
  UsesTokens,
} from "@/components/docs"
import type { PropRow } from "@/components/docs"

/* ── Snippets ── */

const INSTALL_SNIPPET = `import { Progress } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Progress } from "@dpds-gov/design-system"

export function UploadProgress({ percent }: { percent: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between text-sm">
        <span>Uploading attachment</span>
        <span className="text-muted-foreground tabular-nums">{percent}%</span>
      </div>
      <Progress value={percent} />
    </div>
  )
}`

const PREVIEW_SNIPPET = `<Progress value={68} />`

const EXAMPLE_SNIPPETS = {
  determinate: `<Progress value={68} />`,
  withLabel: `<div className="grid w-full max-w-md gap-1">
  <div className="flex items-baseline justify-between text-sm">
    <span>Onboarding completion</span>
    <span className="text-muted-foreground tabular-nums">68%</span>
  </div>
  <Progress value={68} />
</div>`,
  indeterminate: `// No native indeterminate prop — leave value off and override with an
// animated gradient stripe. CSS keyframes do the work.
<div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
  <div className="absolute inset-y-0 w-1/3 rounded-full bg-primary animate-[indeterminate_1.4s_ease-in-out_infinite]" />
</div>

// In your global CSS:
// @keyframes indeterminate {
//   0%   { transform: translateX(-100%); }
//   100% { transform: translateX(300%); }
// }`,
  sizes: `<Progress value={60} className="h-1" />   {/* sm */}
<Progress value={60} className="h-3" />   {/* md (default) */}
<Progress value={60} className="h-5" />   {/* lg */}`,
  tones: `// The default uses bg-primary on the indicator; override via [&>div] selector
// or wrap a custom variant in a className that targets the indicator.
<Progress value={68} className="[&>div]:bg-success-500" />
<Progress value={68} className="[&>div]:bg-warning-500" />
<Progress value={68} className="[&>div]:bg-error-500" />`,
  segmented: `// Stack two Progress bars in a flex row with proportional widths.
// Total: 24 tickets — 14 resolved, 6 in progress, 4 open.
<div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
  <div className="bg-success-500" style={{ width: '58.3%' }} />
  <div className="bg-warning-500" style={{ width: '25%' }} />
  <div className="bg-error-500" style={{ width: '16.7%' }} />
</div>`,
  liveUpload: `// File upload simulator — increments every 100ms until complete.
const [percent, setPercent] = useState(0)

useEffect(() => {
  if (percent >= 100) return
  const id = setTimeout(() => setPercent((p) => Math.min(100, p + 7)), 200)
  return () => clearTimeout(id)
}, [percent])

<Progress value={percent} />`,
  slaCountdown: `// SLA progress bar — tints destructive as the deadline approaches.
const percent = 78 // 78% of SLA window elapsed
const tone = percent >= 80 ? "[&>div]:bg-error-500"
           : percent >= 60 ? "[&>div]:bg-warning-500"
           : "[&>div]:bg-success-500"

<div className="grid gap-1">
  <div className="flex items-baseline justify-between text-sm">
    <span>SLA response window</span>
    <span className="tabular-nums">{percent}% elapsed</span>
  </div>
  <Progress value={percent} className={tone} />
</div>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "value",
      type: "number",
      description: "Current progress value, 0–100. Omit (or pass null) for indeterminate-style usage — see the indeterminate example for the override pattern.",
    },
    {
      name: "max",
      type: "number",
      defaultValue: "100",
      description: "Maximum value. Rarely useful — easier to convert to a percentage at the call site than to change max.",
    },
    {
      name: "className",
      type: "string",
      description: "Override container styles. The base is h-3 + rounded-full + bg-muted. Use [&>div]:bg-* to tint the indicator (the inner Radix Indicator div).",
    },
    {
      name: "...props",
      type: "ComponentProps<typeof ProgressPrimitive.Root>",
      description: "All Radix Progress root props (getValueLabel, id, etc.).",
    },
  ]
}

/* ── Live demo bits ── */

function LiveUploadExample() {
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    if (percent >= 100) return
    const id = setTimeout(() => setPercent((p) => Math.min(100, p + 7)), 200)
    return () => clearTimeout(id)
  }, [percent])
  return (
    <div className="grid w-full max-w-md gap-2">
      <div className="flex items-baseline justify-between text-sm">
        <span>Uploading passport-scan.pdf</span>
        <span className="text-muted-foreground tabular-nums">{percent}%</span>
      </div>
      <Progress value={percent} />
      <button
        type="button"
        onClick={() => setPercent(0)}
        className="self-start text-xs text-primary-600 hover:underline"
      >
        Reset
      </button>
    </div>
  )
}

function SlaExample({ percent }: { percent: number }) {
  const tone =
    percent >= 80
      ? "[&>div]:bg-error-500"
      : percent >= 60
        ? "[&>div]:bg-warning-500"
        : "[&>div]:bg-success-500"
  return (
    <div className="grid w-full max-w-md gap-1">
      <div className="flex items-baseline justify-between text-sm">
        <span>SLA response window</span>
        <span className="tabular-nums">{percent}% elapsed</span>
      </div>
      <Progress value={percent} className={cn(tone)} />
    </div>
  )
}

/* ── Page ── */

export default function ProgressPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.progress.title")}
      description={t("docs.progress.description")}
      category={t("docs.progress.category")}
    >
      <Section title={t("docs.progress.preview.title")} description={t("docs.progress.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Progress value={68} className="max-w-md" />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.progress.installation.title")} description={t("docs.progress.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.progress.installation.filename")} />
      </Section>

      <Section title={t("docs.progress.usage.title")} description={t("docs.progress.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.progress.examples.title")} description={t("docs.progress.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.progress.examples.determinate.label")}
            description={t("docs.progress.examples.determinate.description")}
            code={EXAMPLE_SNIPPETS.determinate}
          >
            <Progress value={68} className="max-w-md" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.progress.examples.withLabel.label")}
            description={t("docs.progress.examples.withLabel.description")}
            code={EXAMPLE_SNIPPETS.withLabel}
          >
            <div className="grid w-full max-w-md gap-1">
              <div className="flex items-baseline justify-between text-sm">
                <span>Onboarding completion</span>
                <span className="text-muted-foreground tabular-nums">68%</span>
              </div>
              <Progress value={68} />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.progress.examples.sizes.label")}
            description={t("docs.progress.examples.sizes.description")}
            code={EXAMPLE_SNIPPETS.sizes}
          >
            <div className="grid w-full max-w-md gap-3">
              <Progress value={60} className="h-1" />
              <Progress value={60} className="h-3" />
              <Progress value={60} className="h-5" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.progress.examples.tones.label")}
            description={t("docs.progress.examples.tones.description")}
            code={EXAMPLE_SNIPPETS.tones}
          >
            <div className="grid w-full max-w-md gap-2">
              <Progress value={68} />
              <Progress value={68} className="[&>div]:bg-success-500" />
              <Progress value={68} className="[&>div]:bg-warning-500" />
              <Progress value={68} className="[&>div]:bg-error-500" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.progress.examples.segmented.label")}
            description={t("docs.progress.examples.segmented.description")}
            code={EXAMPLE_SNIPPETS.segmented}
          >
            <div className="flex w-full max-w-md flex-col gap-2">
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
                <div className="bg-success-500" style={{ width: "58.3%" }} />
                <div className="bg-warning-500" style={{ width: "25%" }} />
                <div className="bg-error-500" style={{ width: "16.7%" }} />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-success-500" /> Resolved 14
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-warning-500" /> In progress 6
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-error-500" /> Open 4
                </span>
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.progress.examples.liveUpload.label")}
            description={t("docs.progress.examples.liveUpload.description")}
            code={EXAMPLE_SNIPPETS.liveUpload}
          >
            <LiveUploadExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.progress.examples.slaCountdown.label")}
            description={t("docs.progress.examples.slaCountdown.description")}
            code={EXAMPLE_SNIPPETS.slaCountdown}
          >
            <div className="grid w-full max-w-md gap-3">
              <SlaExample percent={42} />
              <SlaExample percent={67} />
              <SlaExample percent={88} />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.progress.examples.indeterminate.label")}
            description={t("docs.progress.examples.indeterminate.description")}
            code={EXAMPLE_SNIPPETS.indeterminate}
          >
            <div className="grid w-full max-w-md gap-2">
              <span className="text-sm">Generating report…</span>
              <Progress className="[&>div]:animate-pulse" value={45} />
              <p className="text-xs text-muted-foreground">
                The primitive doesn't ship a native indeterminate mode. For a quick "in progress" feel, pulse the indicator. For a true sliding stripe, define a @keyframes rule (see the code).
              </p>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.progress.props.title")} description={t("docs.progress.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.progress.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.progress.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.progress.accessibility.items.value")}</li>
          <li>{t("docs.progress.accessibility.items.label")}</li>
          <li>{t("docs.progress.accessibility.items.color")}</li>
          <li>{t("docs.progress.accessibility.items.live")}</li>
          <li>{t("docs.progress.accessibility.items.indeterminate")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "motion"]} />

      <RelatedLinks
        title={t("docs.progress.related.title")}
        items={[
          { label: "Spinner", href: "/ui/spinner" },
          { label: "Skeleton", href: "/ui/skeleton" },
          { label: "Stepper", href: "/ui/stepper" },
        ]}
      />
    </ComponentPage>
  )
}
