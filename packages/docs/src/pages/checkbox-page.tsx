import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Checkbox } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Checkbox } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Checkbox } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"

export function MarketingConsent() {
  return (
    <div className="flex items-start gap-3">
      <Checkbox id="consent" />
      <div className="grid gap-1.5">
        <Label htmlFor="consent">Send me service updates</Label>
        <p className="text-xs text-muted-foreground">
          You can unsubscribe at any time from your profile.
        </p>
      </div>
    </div>
  )
}`

const PREVIEW_SNIPPET = `<div className="flex items-center gap-3">
  <Checkbox id="terms" />
  <Label htmlFor="terms">I agree to the terms</Label>
</div>`

const EXAMPLE_SNIPPETS = {
  default: `<Checkbox />`,
  checked: `<Checkbox defaultChecked />`,
  withLabel: `<div className="flex items-center gap-3">
  <Checkbox id="terms" />
  <Label htmlFor="terms">I agree to the terms</Label>
</div>`,
  withDescription: `<div className="flex items-start gap-3">
  <Checkbox id="consent" />
  <div className="grid gap-1.5">
    <Label htmlFor="consent">Send me service updates</Label>
    <p className="text-xs text-muted-foreground">
      You can unsubscribe at any time from your profile.
    </p>
  </div>
</div>`,
  indeterminate: `const [checked, setChecked] = useState<"indeterminate" | boolean>("indeterminate")

<Checkbox
  checked={checked}
  onCheckedChange={(c) => setChecked(c)}
/>`,
  selectAll: `// Parent checkbox reflects the state of its children.
const [items, setItems] = useState({ a: true, b: false, c: false })
const all = Object.values(items).every(Boolean)
const some = Object.values(items).some(Boolean)
const parentState: boolean | "indeterminate" = all ? true : some ? "indeterminate" : false

<Checkbox
  checked={parentState}
  onCheckedChange={(c) => setItems({ a: !!c, b: !!c, c: !!c })}
/>`,
  group: `// A simple filter group — each option is its own controlled checkbox.
const SERVICES = [
  { id: "trade-license", label: "Trade license renewal" },
  { id: "visa", label: "Residency visa" },
  { id: "vehicle", label: "Vehicle registration" },
]
const [selected, setSelected] = useState<Set<string>>(new Set())

<div className="flex flex-col gap-3">
  {SERVICES.map((s) => (
    <div key={s.id} className="flex items-center gap-3">
      <Checkbox
        id={s.id}
        checked={selected.has(s.id)}
        onCheckedChange={(c) => {
          const next = new Set(selected)
          c ? next.add(s.id) : next.delete(s.id)
          setSelected(next)
        }}
      />
      <Label htmlFor={s.id}>{s.label}</Label>
    </div>
  ))}
</div>`,
  disabled: `<div className="flex flex-col gap-3">
  <div className="flex items-center gap-3">
    <Checkbox id="d1" disabled />
    <Label htmlFor="d1" className="opacity-50">Disabled</Label>
  </div>
  <div className="flex items-center gap-3">
    <Checkbox id="d2" disabled defaultChecked />
    <Label htmlFor="d2" className="opacity-50">Disabled + checked</Label>
  </div>
</div>`,
  required: `// The required prop participates in native HTML form validation.
<form>
  <div className="flex items-center gap-3">
    <Checkbox id="req" required />
    <Label htmlFor="req">I accept the terms (required)</Label>
  </div>
  <button type="submit">Submit</button>
</form>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "checked",
      type: 'boolean | "indeterminate"',
      description: 'Controlled checked state. Use "indeterminate" to render the partially-checked visual (e.g. a parent "select all" with some children selected).',
    },
    {
      name: "defaultChecked",
      type: "boolean",
      description: "Initial checked state for an uncontrolled checkbox.",
    },
    {
      name: "onCheckedChange",
      type: '(checked: boolean | "indeterminate") => void',
      description: "Fires when the user toggles the checkbox. Receives the new state — note that user clicks resolve to true or false, never \"indeterminate\".",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Greys out the checkbox and removes it from tab order. Apply matching opacity to the linked Label.",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Participates in native HTML form validation. The form won't submit if the box is unchecked.",
    },
    {
      name: "name",
      type: "string",
      description: "Name submitted with the form. Pair with value when using checkbox groups in non-React forms.",
    },
    {
      name: "value",
      type: "string",
      defaultValue: '"on"',
      description: "Value submitted with the form when checked. Defaults to \"on\" like a native checkbox.",
    },
    {
      name: "id",
      type: "string",
      description: "DOM id. Required for Label htmlFor association — without it, clicking the label won't toggle the checkbox.",
    },
  ]
}

/* ── Live demo bits ── */

function IndeterminateExample() {
  const [checked, setChecked] = useState<"indeterminate" | boolean>("indeterminate")
  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id="ind-demo"
        checked={checked}
        onCheckedChange={(c) => setChecked(c)}
      />
      <Label htmlFor="ind-demo">
        {checked === "indeterminate" ? "Indeterminate" : checked ? "Checked" : "Unchecked"} — click to cycle
      </Label>
    </div>
  )
}

function SelectAllExample() {
  const [items, setItems] = useState({ a: true, b: false, c: false })
  const all = useMemo(() => Object.values(items).every(Boolean), [items])
  const some = useMemo(() => Object.values(items).some(Boolean), [items])
  const parentState: boolean | "indeterminate" = all ? true : some ? "indeterminate" : false

  function toggleAll(c: boolean | "indeterminate") {
    const v = c === true
    setItems({ a: v, b: v, c: v })
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3 dark:border-white/10">
        <Checkbox id="all" checked={parentState} onCheckedChange={toggleAll} />
        <Label htmlFor="all" className="font-medium">Select all</Label>
      </div>
      {(["a", "b", "c"] as const).map((k) => (
        <div key={k} className="flex items-center gap-3 ps-2">
          <Checkbox
            id={`sa-${k}`}
            checked={items[k]}
            onCheckedChange={(c) => setItems((p) => ({ ...p, [k]: c === true }))}
          />
          <Label htmlFor={`sa-${k}`}>Option {k.toUpperCase()}</Label>
        </div>
      ))}
    </div>
  )
}

const SERVICES = [
  { id: "trade-license", label: "Trade license renewal" },
  { id: "visa", label: "Residency visa" },
  { id: "vehicle", label: "Vehicle registration" },
] as const

function GroupExample() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  return (
    <div className="flex flex-col gap-3">
      {SERVICES.map((s) => (
        <div key={s.id} className="flex items-center gap-3">
          <Checkbox
            id={s.id}
            checked={selected.has(s.id)}
            onCheckedChange={(c) => {
              const next = new Set(selected)
              if (c === true) next.add(s.id)
              else next.delete(s.id)
              setSelected(next)
            }}
          />
          <Label htmlFor={s.id}>{s.label}</Label>
        </div>
      ))}
    </div>
  )
}

/* ── Page ── */

export default function CheckboxPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.checkbox.title")}
      description={t("docs.checkbox.description")}
      category={t("docs.checkbox.category")}
    >
      <Section title={t("docs.checkbox.preview.title")} description={t("docs.checkbox.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="flex items-center gap-3">
            <Checkbox id="preview-terms" />
            <Label htmlFor="preview-terms">I agree to the terms</Label>
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.checkbox.installation.title")} description={t("docs.checkbox.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.checkbox.installation.filename")} />
      </Section>

      <Section title={t("docs.checkbox.usage.title")} description={t("docs.checkbox.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.checkbox.examples.title")} description={t("docs.checkbox.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.checkbox.examples.default.label")}
            description={t("docs.checkbox.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <Checkbox />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.checkbox.examples.checked.label")}
            description={t("docs.checkbox.examples.checked.description")}
            code={EXAMPLE_SNIPPETS.checked}
          >
            <Checkbox defaultChecked />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.checkbox.examples.withLabel.label")}
            description={t("docs.checkbox.examples.withLabel.description")}
            code={EXAMPLE_SNIPPETS.withLabel}
          >
            <div className="flex items-center gap-3">
              <Checkbox id="ex-terms" />
              <Label htmlFor="ex-terms">I agree to the terms</Label>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.checkbox.examples.withDescription.label")}
            description={t("docs.checkbox.examples.withDescription.description")}
            code={EXAMPLE_SNIPPETS.withDescription}
          >
            <div className="flex items-start gap-3">
              <Checkbox id="ex-consent" />
              <div className="grid gap-1.5">
                <Label htmlFor="ex-consent">Send me service updates</Label>
                <p className="text-xs text-muted-foreground">
                  You can unsubscribe at any time from your profile.
                </p>
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.checkbox.examples.indeterminate.label")}
            description={t("docs.checkbox.examples.indeterminate.description")}
            code={EXAMPLE_SNIPPETS.indeterminate}
          >
            <IndeterminateExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.checkbox.examples.selectAll.label")}
            description={t("docs.checkbox.examples.selectAll.description")}
            code={EXAMPLE_SNIPPETS.selectAll}
          >
            <SelectAllExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.checkbox.examples.group.label")}
            description={t("docs.checkbox.examples.group.description")}
            code={EXAMPLE_SNIPPETS.group}
          >
            <GroupExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.checkbox.examples.disabled.label")}
            description={t("docs.checkbox.examples.disabled.description")}
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Checkbox id="dis-1" disabled />
                <Label htmlFor="dis-1" className="opacity-50">Disabled</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="dis-2" disabled defaultChecked />
                <Label htmlFor="dis-2" className="opacity-50">Disabled + checked</Label>
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.checkbox.examples.required.label")}
            description={t("docs.checkbox.examples.required.description")}
            code={EXAMPLE_SNIPPETS.required}
          >
            <div className="flex items-center gap-3">
              <Checkbox id="ex-required" required />
              <Label htmlFor="ex-required">I accept the terms (required)</Label>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.checkbox.props.title")} description={t("docs.checkbox.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.checkbox.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.checkbox.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.checkbox.accessibility.items.label")}</li>
          <li>{t("docs.checkbox.accessibility.items.indeterminate")}</li>
          <li>{t("docs.checkbox.accessibility.items.keyboard")}</li>
          <li>{t("docs.checkbox.accessibility.items.disabled")}</li>
          <li>{t("docs.checkbox.accessibility.items.group")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "motion"]} />

      <RelatedLinks
        title={t("docs.checkbox.related.title")}
        items={[
          { label: "Radio", href: "/forms/radio" },
          { label: "Switch", href: "/forms/switch" },
          { label: "Label", href: "/forms/label" },
          { label: "Form", href: "/forms/form" },
        ]}
      />
    </ComponentPage>
  )
}
