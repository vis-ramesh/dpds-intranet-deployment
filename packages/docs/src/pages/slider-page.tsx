import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Slider } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Slider } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Slider } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"

export function SlaWindowHours() {
  return (
    <div className="grid w-full gap-2">
      <div className="flex items-baseline justify-between">
        <Label htmlFor="sla">SLA response window</Label>
        <span className="text-sm font-medium tabular-nums">8 hours</span>
      </div>
      <Slider id="sla" defaultValue={[8]} min={1} max={24} step={1} />
    </div>
  )
}`

const PREVIEW_SNIPPET = `<Slider defaultValue={[40]} min={0} max={100} step={1} />`

const EXAMPLE_SNIPPETS = {
  default: `<Slider defaultValue={[50]} />`,
  withValueLabel: `const [v, setV] = useState([8])

<div className="grid w-full gap-2">
  <div className="flex items-baseline justify-between">
    <Label htmlFor="sla">SLA response window</Label>
    <span className="text-sm font-medium tabular-nums">{v[0]} hours</span>
  </div>
  <Slider id="sla" value={v} onValueChange={setV} min={1} max={24} step={1} />
</div>`,
  range: `// Two thumbs by passing an array of two values.
const [range, setRange] = useState([100, 750])

<div className="grid gap-2">
  <Label>Price range (AED)</Label>
  <Slider value={range} onValueChange={setRange} min={0} max={1000} step={25} />
  <p className="text-xs text-muted-foreground tabular-nums">
    AED {range[0]} – AED {range[1]}
  </p>
</div>`,
  withSteps: `// 5 steps over a 0–100 range = 25-unit ticks. Render the marks under the track.
<div className="grid w-full gap-3">
  <Slider defaultValue={[50]} min={0} max={100} step={25} />
  <div className="flex justify-between text-xs text-muted-foreground tabular-nums px-1">
    {[0, 25, 50, 75, 100].map((m) => <span key={m}>{m}</span>)}
  </div>
</div>`,
  withMinMax: `<div className="grid w-full gap-2">
  <Label>Priority weight</Label>
  <Slider defaultValue={[3]} min={1} max={5} step={1} />
  <div className="flex justify-between text-xs text-muted-foreground">
    <span>Low</span>
    <span>High</span>
  </div>
</div>`,
  disabled: `<Slider defaultValue={[40]} disabled />`,
  vertical: `<Slider
  orientation="vertical"
  defaultValue={[70]}
  className="h-32 w-2 flex-col items-center"
/>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "value",
      type: "number[]",
      description: "Controlled value. Single-value sliders pass [n]; range sliders pass [low, high].",
    },
    {
      name: "defaultValue",
      type: "number[]",
      description: "Initial value for uncontrolled sliders. Same shape as value.",
    },
    {
      name: "onValueChange",
      type: "(value: number[]) => void",
      description: "Fires on every drag tick. For \"commit on release\" semantics, use onValueCommit instead.",
    },
    {
      name: "onValueCommit",
      type: "(value: number[]) => void",
      description: "Fires once when the user releases the thumb. Use for expensive operations (network requests).",
    },
    {
      name: "min",
      type: "number",
      defaultValue: "0",
      description: "Lower bound of the range.",
    },
    {
      name: "max",
      type: "number",
      defaultValue: "100",
      description: "Upper bound of the range.",
    },
    {
      name: "step",
      type: "number",
      defaultValue: "1",
      description: "Granularity. Step={5} snaps to multiples of 5. Use larger steps for currency or hours to avoid sub-unit values.",
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      defaultValue: '"horizontal"',
      description: "Layout direction. Vertical needs an explicit height on the className.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Greys out the slider and removes thumbs from tab order.",
    },
    {
      name: "name",
      type: "string",
      description: "Form name. Required when submitting via a native form. Range sliders submit comma-separated values.",
    },
    {
      name: "inverted",
      type: "boolean",
      defaultValue: "false",
      description: "Reverses the direction (high → low). Useful for metrics where lower is better (response time, churn).",
    },
  ]
}

/* ── Live demo bits ── */

function WithValueLabelExample() {
  const [v, setV] = useState<number[]>([8])
  return (
    <div className="grid w-full max-w-md gap-2">
      <div className="flex items-baseline justify-between">
        <Label htmlFor="ex-sla">SLA response window</Label>
        <span className="text-sm font-medium tabular-nums">{v[0]} hours</span>
      </div>
      <Slider id="ex-sla" value={v} onValueChange={setV} min={1} max={24} step={1} />
    </div>
  )
}

function RangeExample() {
  const [range, setRange] = useState<number[]>([100, 750])
  return (
    <div className="grid w-full max-w-md gap-2">
      <Label>Price range (AED)</Label>
      <Slider value={range} onValueChange={setRange} min={0} max={1000} step={25} />
      <p className="text-xs text-muted-foreground tabular-nums">
        AED {range[0]} – AED {range[1]}
      </p>
    </div>
  )
}

/* ── Page ── */

export default function SliderPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.slider.title")}
      description={t("docs.slider.description")}
      category={t("docs.slider.category")}
    >
      <Section title={t("docs.slider.preview.title")} description={t("docs.slider.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="w-full max-w-md">
            <Slider defaultValue={[40]} min={0} max={100} step={1} />
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.slider.installation.title")} description={t("docs.slider.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.slider.installation.filename")} />
      </Section>

      <Section title={t("docs.slider.usage.title")} description={t("docs.slider.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.slider.examples.title")} description={t("docs.slider.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.slider.examples.default.label")}
            description={t("docs.slider.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <div className="w-full max-w-md">
              <Slider defaultValue={[50]} />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.slider.examples.withValueLabel.label")}
            description={t("docs.slider.examples.withValueLabel.description")}
            code={EXAMPLE_SNIPPETS.withValueLabel}
          >
            <WithValueLabelExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.slider.examples.range.label")}
            description={t("docs.slider.examples.range.description")}
            code={EXAMPLE_SNIPPETS.range}
          >
            <RangeExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.slider.examples.withSteps.label")}
            description={t("docs.slider.examples.withSteps.description")}
            code={EXAMPLE_SNIPPETS.withSteps}
          >
            <div className="grid w-full max-w-md gap-3">
              <Slider defaultValue={[50]} min={0} max={100} step={25} />
              <div className="flex justify-between text-xs text-muted-foreground tabular-nums px-1">
                {[0, 25, 50, 75, 100].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.slider.examples.withMinMax.label")}
            description={t("docs.slider.examples.withMinMax.description")}
            code={EXAMPLE_SNIPPETS.withMinMax}
          >
            <div className="grid w-full max-w-md gap-2">
              <Label>Priority weight</Label>
              <Slider defaultValue={[3]} min={1} max={5} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.slider.examples.disabled.label")}
            description={t("docs.slider.examples.disabled.description")}
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <div className="w-full max-w-md">
              <Slider defaultValue={[40]} disabled />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.slider.examples.vertical.label")}
            description={t("docs.slider.examples.vertical.description")}
            code={EXAMPLE_SNIPPETS.vertical}
          >
            <div className="flex h-32 items-center">
              <Slider
                orientation="vertical"
                defaultValue={[70]}
                className="h-32 w-2 flex-col items-center"
              />
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.slider.props.title")} description={t("docs.slider.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.slider.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.slider.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.slider.accessibility.items.label")}</li>
          <li>{t("docs.slider.accessibility.items.keyboard")}</li>
          <li>{t("docs.slider.accessibility.items.value")}</li>
          <li>{t("docs.slider.accessibility.items.touch")}</li>
          <li>{t("docs.slider.accessibility.items.alternatives")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "motion"]} />

      <RelatedLinks
        title={t("docs.slider.related.title")}
        items={[
          { label: "Input", href: "/forms/input" },
          { label: "Form", href: "/forms/form" },
          { label: "Label", href: "/forms/label" },
        ]}
      />
    </ComponentPage>
  )
}
