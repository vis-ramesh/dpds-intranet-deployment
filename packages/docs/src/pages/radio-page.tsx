import { useState } from "react"
import { useTranslation } from "react-i18next"

import { RadioGroup, RadioGroupItem } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { RadioGroup, RadioGroupItem } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { RadioGroup, RadioGroupItem } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"

export function PrioritySelect() {
  return (
    <RadioGroup defaultValue="medium">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="low" id="p-low" />
        <Label htmlFor="p-low">Low</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="medium" id="p-medium" />
        <Label htmlFor="p-medium">Medium</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="high" id="p-high" />
        <Label htmlFor="p-high">High</Label>
      </div>
    </RadioGroup>
  )
}`

const PREVIEW_SNIPPET = `<RadioGroup defaultValue="medium">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="low" id="pv-low" />
    <Label htmlFor="pv-low">Low</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="medium" id="pv-medium" />
    <Label htmlFor="pv-medium">Medium</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="high" id="pv-high" />
    <Label htmlFor="pv-high">High</Label>
  </div>
</RadioGroup>`

const EXAMPLE_SNIPPETS = {
  default: `<RadioGroup>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="a" id="a" />
    <Label htmlFor="a">Option A</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="b" id="b" />
    <Label htmlFor="b">Option B</Label>
  </div>
</RadioGroup>`,
  defaultValue: `<RadioGroup defaultValue="medium">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="low" id="dl" />
    <Label htmlFor="dl">Low</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="medium" id="dm" />
    <Label htmlFor="dm">Medium</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="high" id="dh" />
    <Label htmlFor="dh">High</Label>
  </div>
</RadioGroup>`,
  controlled: `const [value, setValue] = useState("email")

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="email" id="m-email" />
    <Label htmlFor="m-email">Email</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="sms" id="m-sms" />
    <Label htmlFor="m-sms">SMS</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="both" id="m-both" />
    <Label htmlFor="m-both">Both</Label>
  </div>
</RadioGroup>`,
  withDescriptions: `<RadioGroup defaultValue="standard">
  <div className="flex items-start gap-3">
    <RadioGroupItem value="standard" id="t-standard" className="mt-1" />
    <div className="grid gap-1.5">
      <Label htmlFor="t-standard">Standard processing</Label>
      <p className="text-xs text-muted-foreground">5–7 business days. No additional fee.</p>
    </div>
  </div>
  <div className="flex items-start gap-3">
    <RadioGroupItem value="express" id="t-express" className="mt-1" />
    <div className="grid gap-1.5">
      <Label htmlFor="t-express">Express processing</Label>
      <p className="text-xs text-muted-foreground">1–2 business days. AED 150 surcharge.</p>
    </div>
  </div>
</RadioGroup>`,
  horizontal: `<RadioGroup defaultValue="yes" className="flex flex-row gap-6">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="yes" id="h-yes" />
    <Label htmlFor="h-yes">Yes</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="no" id="h-no" />
    <Label htmlFor="h-no">No</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="maybe" id="h-maybe" />
    <Label htmlFor="h-maybe">Maybe</Label>
  </div>
</RadioGroup>`,
  disabled: `<RadioGroup defaultValue="b" disabled>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="a" id="dis-a" />
    <Label htmlFor="dis-a" className="opacity-50">Option A</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="b" id="dis-b" />
    <Label htmlFor="dis-b" className="opacity-50">Option B (selected)</Label>
  </div>
</RadioGroup>`,
  disabledItem: `<RadioGroup defaultValue="open">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="open" id="s-open" />
    <Label htmlFor="s-open">Open</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="in-progress" id="s-progress" />
    <Label htmlFor="s-progress">In progress</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="closed" id="s-closed" disabled />
    <Label htmlFor="s-closed" className="opacity-50">Closed (no permission)</Label>
  </div>
</RadioGroup>`,
  required: `<form>
  <RadioGroup name="agreement" required>
    <div className="flex items-center gap-3">
      <RadioGroupItem value="yes" id="r-yes" />
      <Label htmlFor="r-yes">I agree</Label>
    </div>
    <div className="flex items-center gap-3">
      <RadioGroupItem value="no" id="r-no" />
      <Label htmlFor="r-no">I do not agree</Label>
    </div>
  </RadioGroup>
  <button type="submit">Continue</button>
</form>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "RadioGroup.value",
      type: "string",
      description: "Controlled selected value. Pair with onValueChange.",
    },
    {
      name: "RadioGroup.defaultValue",
      type: "string",
      description: "Initial selected value when uncontrolled. Use this to mark a sensible default option.",
    },
    {
      name: "RadioGroup.onValueChange",
      type: "(value: string) => void",
      description: "Fires when the user picks a different option. Receives the new value.",
    },
    {
      name: "RadioGroup.disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables every item in the group. Apply opacity to each Label to match.",
    },
    {
      name: "RadioGroup.required",
      type: "boolean",
      defaultValue: "false",
      description: "When inside a form, requires the user to pick an option before submit.",
    },
    {
      name: "RadioGroup.name",
      type: "string",
      description: "Form name. Required when submitting via a native form.",
    },
    {
      name: "RadioGroup.orientation",
      type: '"horizontal" | "vertical"',
      defaultValue: '"vertical"',
      description: "Sets arrow-key navigation direction. Visual layout is up to your CSS — set it to match.",
    },
    {
      name: "RadioGroupItem.value",
      type: "string",
      required: true,
      description: "Unique value submitted when this item is selected.",
    },
    {
      name: "RadioGroupItem.id",
      type: "string",
      description: "DOM id. Required for Label htmlFor association — without it, clicking the label won't select the item.",
    },
    {
      name: "RadioGroupItem.disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables this single item while leaving the rest of the group interactive.",
    },
  ]
}

/* ── Live demo bits ── */

function ControlledExample() {
  const [value, setValue] = useState("email")
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="email" id="m-email" />
          <Label htmlFor="m-email">Email</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="sms" id="m-sms" />
          <Label htmlFor="m-sms">SMS</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="both" id="m-both" />
          <Label htmlFor="m-both">Both</Label>
        </div>
      </RadioGroup>
      <p className="text-xs text-muted-foreground">
        Selected: <code className="font-mono">{value}</code>
      </p>
    </div>
  )
}

/* ── Page ── */

export default function RadioPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.radio.title")}
      description={t("docs.radio.description")}
      category={t("docs.radio.category")}
    >
      <Section title={t("docs.radio.preview.title")} description={t("docs.radio.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <RadioGroup defaultValue="medium" className="max-w-xs">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="low" id="pv-low" />
              <Label htmlFor="pv-low">Low</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="medium" id="pv-medium" />
              <Label htmlFor="pv-medium">Medium</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="high" id="pv-high" />
              <Label htmlFor="pv-high">High</Label>
            </div>
          </RadioGroup>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.radio.installation.title")} description={t("docs.radio.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.radio.installation.filename")} />
      </Section>

      <Section title={t("docs.radio.usage.title")} description={t("docs.radio.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.radio.examples.title")} description={t("docs.radio.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.radio.examples.default.label")}
            description={t("docs.radio.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <RadioGroup className="max-w-xs">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="a" id="ex-a" />
                <Label htmlFor="ex-a">Option A</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="b" id="ex-b" />
                <Label htmlFor="ex-b">Option B</Label>
              </div>
            </RadioGroup>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.radio.examples.defaultValue.label")}
            description={t("docs.radio.examples.defaultValue.description")}
            code={EXAMPLE_SNIPPETS.defaultValue}
          >
            <RadioGroup defaultValue="medium" className="max-w-xs">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="low" id="dl" />
                <Label htmlFor="dl">Low</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="medium" id="dm" />
                <Label htmlFor="dm">Medium</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="high" id="dh" />
                <Label htmlFor="dh">High</Label>
              </div>
            </RadioGroup>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.radio.examples.controlled.label")}
            description={t("docs.radio.examples.controlled.description")}
            code={EXAMPLE_SNIPPETS.controlled}
          >
            <ControlledExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.radio.examples.withDescriptions.label")}
            description={t("docs.radio.examples.withDescriptions.description")}
            code={EXAMPLE_SNIPPETS.withDescriptions}
          >
            <RadioGroup defaultValue="standard" className="max-w-sm">
              <div className="flex items-start gap-3">
                <RadioGroupItem value="standard" id="t-standard" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="t-standard">Standard processing</Label>
                  <p className="text-xs text-muted-foreground">5–7 business days. No additional fee.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="express" id="t-express" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="t-express">Express processing</Label>
                  <p className="text-xs text-muted-foreground">1–2 business days. AED 150 surcharge.</p>
                </div>
              </div>
            </RadioGroup>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.radio.examples.horizontal.label")}
            description={t("docs.radio.examples.horizontal.description")}
            code={EXAMPLE_SNIPPETS.horizontal}
          >
            <RadioGroup defaultValue="yes" className="flex flex-row gap-6">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="h-yes" />
                <Label htmlFor="h-yes">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="h-no" />
                <Label htmlFor="h-no">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="maybe" id="h-maybe" />
                <Label htmlFor="h-maybe">Maybe</Label>
              </div>
            </RadioGroup>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.radio.examples.disabled.label")}
            description={t("docs.radio.examples.disabled.description")}
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <RadioGroup defaultValue="b" disabled className="max-w-xs">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="a" id="dis-a" />
                <Label htmlFor="dis-a" className="opacity-50">Option A</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="b" id="dis-b" />
                <Label htmlFor="dis-b" className="opacity-50">Option B (selected)</Label>
              </div>
            </RadioGroup>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.radio.examples.disabledItem.label")}
            description={t("docs.radio.examples.disabledItem.description")}
            code={EXAMPLE_SNIPPETS.disabledItem}
          >
            <RadioGroup defaultValue="open" className="max-w-xs">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="open" id="s-open" />
                <Label htmlFor="s-open">Open</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="in-progress" id="s-progress" />
                <Label htmlFor="s-progress">In progress</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="closed" id="s-closed" disabled />
                <Label htmlFor="s-closed" className="opacity-50">Closed (no permission)</Label>
              </div>
            </RadioGroup>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.radio.examples.required.label")}
            description={t("docs.radio.examples.required.description")}
            code={EXAMPLE_SNIPPETS.required}
          >
            <RadioGroup name="agreement" required className="max-w-xs">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="r-yes" />
                <Label htmlFor="r-yes">I agree</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="r-no" />
                <Label htmlFor="r-no">I do not agree</Label>
              </div>
            </RadioGroup>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.radio.props.title")} description={t("docs.radio.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.radio.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.radio.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.radio.accessibility.items.label")}</li>
          <li>{t("docs.radio.accessibility.items.keyboard")}</li>
          <li>{t("docs.radio.accessibility.items.group")}</li>
          <li>{t("docs.radio.accessibility.items.disabled")}</li>
          <li>{t("docs.radio.accessibility.items.checkbox")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "motion"]} />

      <RelatedLinks
        title={t("docs.radio.related.title")}
        items={[
          { label: "Checkbox", href: "/forms/checkbox" },
          { label: "Switch", href: "/forms/switch" },
          { label: "Label", href: "/forms/label" },
          { label: "Form", href: "/forms/form" },
        ]}
      />
    </ComponentPage>
  )
}
