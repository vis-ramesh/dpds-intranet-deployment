import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Textarea } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Textarea } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Textarea } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"

export function TicketComment() {
  return (
    <div className="grid w-full gap-2">
      <Label htmlFor="comment">Internal note</Label>
      <Textarea
        id="comment"
        placeholder="Add an internal note. Customers won't see this."
      />
    </div>
  )
}`

const PREVIEW_SNIPPET = `<Textarea placeholder="Add an internal note. Customers won't see this." />`

const EXAMPLE_SNIPPETS = {
  default: `<Textarea placeholder="Write something..." />`,
  withLabel: `<div className="grid w-full gap-2">
  <Label htmlFor="note">Internal note</Label>
  <Textarea id="note" placeholder="Visible to staff only." />
</div>`,
  withHelper: `<div className="grid w-full gap-1.5">
  <Label htmlFor="description">Service description</Label>
  <Textarea id="description" placeholder="Describe what the customer should expect." />
  <p className="text-xs text-muted-foreground">Markdown is not supported. Plain text only.</p>
</div>`,
  withError: `<div className="grid w-full gap-1.5">
  <Label htmlFor="reason" className="text-error-600">Reason for rejection</Label>
  <Textarea
    id="reason"
    defaultValue=""
    aria-invalid="true"
    placeholder="Required when status is 'Rejected'."
  />
  <p className="text-xs text-error-600">Reason is required.</p>
</div>`,
  autoResize: `// The base Textarea uses CSS field-sizing-content,
// so it grows with content automatically. No JS needed.
<Textarea placeholder="Try typing several lines..." />`,
  withCounter: `// Pair with a controlled value to show a live character count.
const [v, setV] = useState("")
const MAX = 280

<div className="grid w-full gap-1.5">
  <Label htmlFor="tweet">Public summary</Label>
  <Textarea
    id="tweet"
    maxLength={MAX}
    value={v}
    onChange={(e) => setV(e.target.value)}
    placeholder="Up to 280 characters."
  />
  <p className="text-xs text-muted-foreground self-end">{v.length}/{MAX}</p>
</div>`,
  fixedRows: `// Pass rows to set a fixed visible height (overrides field-sizing-content growth).
<Textarea rows={6} placeholder="Always 6 rows tall." />`,
  disabled: `<Textarea disabled defaultValue="This field is locked." />`,
  readOnly: `<Textarea readOnly defaultValue="System-generated transcript. Cannot edit." />`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "placeholder",
      type: "string",
      description: "Hint shown when the field is empty. Use a representative example, not a description of the field.",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled value. Pair with onChange.",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Initial value for an uncontrolled textarea.",
    },
    {
      name: "rows",
      type: "number",
      description: "Fixed visible row count. Omit to let the field auto-grow with content (default behavior).",
    },
    {
      name: "maxLength",
      type: "number",
      description: "Hard cap on character count. The browser blocks further typing at the limit — pair with a visible counter so users aren't surprised.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Greys out the textarea and removes it from tab order.",
    },
    {
      name: "readOnly",
      type: "boolean",
      defaultValue: "false",
      description: "Non-editable but still focusable and copyable. Use for system-generated content the user shouldn't change.",
    },
    {
      name: "aria-invalid",
      type: 'boolean | "true" | "false"',
      defaultValue: "false",
      description: "When true, applies the error border + focus-ring styles. Pair with an error message below the field.",
    },
    {
      name: "onChange",
      type: "(event: ChangeEvent<HTMLTextAreaElement>) => void",
      description: "Fires on every keystroke. For form-level validation prefer onBlur.",
    },
    {
      name: "...props",
      type: "TextareaHTMLAttributes<HTMLTextAreaElement>",
      description: "All standard textarea attributes (id, name, autoComplete, required, cols, wrap, etc.).",
    },
  ]
}

/* ── Live demo bits ── */

function CounterExample() {
  const [value, setValue] = useState("")
  const MAX = 280
  return (
    <div className="grid w-full max-w-md gap-1.5">
      <Label htmlFor="tweet">Public summary</Label>
      <Textarea
        id="tweet"
        maxLength={MAX}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Up to 280 characters."
      />
      <p className="text-xs text-muted-foreground self-end">
        {value.length}/{MAX}
      </p>
    </div>
  )
}

/* ── Page ── */

export default function TextareaPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.textarea.title")}
      description={t("docs.textarea.description")}
      category={t("docs.textarea.category")}
    >
      <Section title={t("docs.textarea.preview.title")} description={t("docs.textarea.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Textarea placeholder={t("docs.textarea.preview.placeholder")} className="max-w-md" />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.textarea.installation.title")} description={t("docs.textarea.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.textarea.installation.filename")} />
      </Section>

      <Section title={t("docs.textarea.usage.title")} description={t("docs.textarea.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.textarea.examples.title")} description={t("docs.textarea.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.textarea.examples.default.label")}
            description={t("docs.textarea.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <Textarea placeholder="Write something..." className="max-w-md" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.textarea.examples.withLabel.label")}
            description={t("docs.textarea.examples.withLabel.description")}
            code={EXAMPLE_SNIPPETS.withLabel}
          >
            <div className="grid w-full max-w-md gap-2">
              <Label htmlFor="note">Internal note</Label>
              <Textarea id="note" placeholder="Visible to staff only." />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.textarea.examples.withHelper.label")}
            description={t("docs.textarea.examples.withHelper.description")}
            code={EXAMPLE_SNIPPETS.withHelper}
          >
            <div className="grid w-full max-w-md gap-1.5">
              <Label htmlFor="description">Service description</Label>
              <Textarea id="description" placeholder="Describe what the customer should expect." />
              <p className="text-xs text-muted-foreground">Markdown is not supported. Plain text only.</p>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.textarea.examples.withError.label")}
            description={t("docs.textarea.examples.withError.description")}
            code={EXAMPLE_SNIPPETS.withError}
          >
            <div className="grid w-full max-w-md gap-1.5">
              <Label htmlFor="reason-err" className="text-error-600">Reason for rejection</Label>
              <Textarea
                id="reason-err"
                defaultValue=""
                aria-invalid="true"
                placeholder="Required when status is 'Rejected'."
              />
              <p className="text-xs text-error-600">Reason is required.</p>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.textarea.examples.autoResize.label")}
            description={t("docs.textarea.examples.autoResize.description")}
            code={EXAMPLE_SNIPPETS.autoResize}
          >
            <Textarea placeholder="Try typing several lines..." className="max-w-md" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.textarea.examples.withCounter.label")}
            description={t("docs.textarea.examples.withCounter.description")}
            code={EXAMPLE_SNIPPETS.withCounter}
          >
            <CounterExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.textarea.examples.fixedRows.label")}
            description={t("docs.textarea.examples.fixedRows.description")}
            code={EXAMPLE_SNIPPETS.fixedRows}
          >
            <Textarea rows={6} placeholder="Always 6 rows tall." className="max-w-md" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.textarea.examples.disabled.label")}
            description={t("docs.textarea.examples.disabled.description")}
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <Textarea disabled defaultValue="This field is locked." className="max-w-md" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.textarea.examples.readOnly.label")}
            description={t("docs.textarea.examples.readOnly.description")}
            code={EXAMPLE_SNIPPETS.readOnly}
          >
            <Textarea readOnly defaultValue="System-generated transcript. Cannot edit." className="max-w-md" />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.textarea.props.title")} description={t("docs.textarea.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.textarea.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.textarea.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.textarea.accessibility.items.label")}</li>
          <li>{t("docs.textarea.accessibility.items.error")}</li>
          <li>{t("docs.textarea.accessibility.items.counter")}</li>
          <li>{t("docs.textarea.accessibility.items.disabled")}</li>
          <li>{t("docs.textarea.accessibility.items.placeholder")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.textarea.related.title")}
        items={[
          { label: "Input", href: "/forms/input" },
          { label: "Label", href: "/forms/label" },
          { label: "Form", href: "/forms/form" },
          { label: "Button", href: "/buttons" },
        ]}
      />
    </ComponentPage>
  )
}
