import { useTranslation } from "react-i18next"

import { Label } from "@dpds-gov/design-system"
import { Input } from "@dpds-gov/design-system"
import { Checkbox } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Label } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Label } from "@dpds-gov/design-system"
import { Input } from "@dpds-gov/design-system"

export function CustomerSearch() {
  return (
    <div className="grid w-full gap-2">
      <Label htmlFor="ticket">Ticket reference</Label>
      <Input id="ticket" placeholder="REQ-2025-0142" />
    </div>
  )
}`

const PREVIEW_SNIPPET = `<div className="grid w-full max-w-xs gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="sarah.chen@dubaipolice.gov.ae" />
</div>`

const EXAMPLE_SNIPPETS = {
  default: `<Label htmlFor="ticket">Ticket reference</Label>`,
  required: `<Label htmlFor="name">
  Customer name
  <span className="text-error-600 ms-0.5" aria-hidden>*</span>
  <span className="sr-only">required</span>
</Label>`,
  withHelp: `<div className="grid gap-1.5">
  <div className="flex items-baseline justify-between">
    <Label htmlFor="emirates-id">Emirates ID</Label>
    <span className="text-xs text-muted-foreground">15 digits</span>
  </div>
  <Input id="emirates-id" placeholder="784-XXXX-XXXXXXX-X" />
</div>`,
  forCheckbox: `<div className="flex items-center gap-2">
  <Checkbox id="notify" />
  <Label htmlFor="notify">Notify me when the SLA breaches</Label>
</div>`,
  srOnly: `// Visually hidden but read by screen readers — pair with a placeholder
// or icon that visually communicates the field's purpose.
<Label htmlFor="quick-search" className="sr-only">
  Search tickets
</Label>
<InputGroup>
  <InputGroupAddon>
    <InputGroupText><Search /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput id="quick-search" placeholder="Search tickets..." />
</InputGroup>`,
  disabled: `// Disabled labels dim automatically when the linked control is disabled
// via the peer-disabled selector.
<div className="grid gap-2">
  <Label htmlFor="closed-by">Closed by</Label>
  <Input id="closed-by" disabled defaultValue="System" className="peer" />
</div>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "htmlFor",
      type: "string",
      required: true,
      description: "DOM id of the input this Label labels. Without it, clicking the label won't focus the input and screen readers won't announce the pair.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "The label text. Keep it short (one to three words). For required indicators or hint text, render them as sibling nodes.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra Tailwind classes. The default already handles disabled-state opacity via the peer-disabled selector on the linked input.",
    },
    {
      name: "...props",
      type: "LabelHTMLAttributes<HTMLLabelElement>",
      description: "All standard label attributes (id, form, onClick, aria-*, etc.).",
    },
  ]
}

/* ── Page ── */

export default function LabelPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.label.title")}
      description={t("docs.label.description")}
      category={t("docs.label.category")}
    >
      <Section title={t("docs.label.preview.title")} description={t("docs.label.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="grid w-full max-w-xs gap-2">
            <Label htmlFor="preview-email">Email</Label>
            <Input id="preview-email" type="email" placeholder="sarah.chen@dubaipolice.gov.ae" />
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.label.installation.title")} description={t("docs.label.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.label.installation.filename")} />
      </Section>

      <Section title={t("docs.label.usage.title")} description={t("docs.label.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.label.examples.title")} description={t("docs.label.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.label.examples.default.label")}
            description={t("docs.label.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <div className="grid w-full max-w-xs gap-2">
              <Label htmlFor="ex-default">Ticket reference</Label>
              <Input id="ex-default" placeholder="REQ-2025-0142" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.label.examples.required.label")}
            description={t("docs.label.examples.required.description")}
            code={EXAMPLE_SNIPPETS.required}
          >
            <div className="grid w-full max-w-xs gap-2">
              <Label htmlFor="ex-required">
                Customer name
                <span className="text-error-600 ms-0.5" aria-hidden>*</span>
                <span className="sr-only">required</span>
              </Label>
              <Input id="ex-required" placeholder="Mohammed Al Mansoori" required />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.label.examples.withHelp.label")}
            description={t("docs.label.examples.withHelp.description")}
            code={EXAMPLE_SNIPPETS.withHelp}
          >
            <div className="grid w-full max-w-xs gap-1.5">
              <div className="flex items-baseline justify-between">
                <Label htmlFor="ex-help">Emirates ID</Label>
                <span className="text-xs text-muted-foreground">15 digits</span>
              </div>
              <Input id="ex-help" placeholder="784-XXXX-XXXXXXX-X" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.label.examples.forCheckbox.label")}
            description={t("docs.label.examples.forCheckbox.description")}
            code={EXAMPLE_SNIPPETS.forCheckbox}
          >
            <div className="flex items-center gap-2">
              <Checkbox id="ex-checkbox" />
              <Label htmlFor="ex-checkbox">Notify me when the SLA breaches</Label>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.label.examples.srOnly.label")}
            description={t("docs.label.examples.srOnly.description")}
            code={EXAMPLE_SNIPPETS.srOnly}
          >
            <div className="w-full max-w-xs">
              <Label htmlFor="ex-srOnly" className="sr-only">Search tickets</Label>
              <Input id="ex-srOnly" placeholder="Search tickets..." />
              <p className="mt-1 text-xs text-muted-foreground">
                The label is invisible but still announced by screen readers.
              </p>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.label.examples.disabled.label")}
            description={t("docs.label.examples.disabled.description")}
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <div className="grid w-full max-w-xs gap-2">
              <Label htmlFor="ex-disabled">Closed by</Label>
              <Input id="ex-disabled" disabled defaultValue="System" className="peer" />
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.label.props.title")} description={t("docs.label.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.label.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.label.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.label.accessibility.items.htmlFor")}</li>
          <li>{t("docs.label.accessibility.items.required")}</li>
          <li>{t("docs.label.accessibility.items.placeholder")}</li>
          <li>{t("docs.label.accessibility.items.srOnly")}</li>
          <li>{t("docs.label.accessibility.items.disabled")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.label.related.title")}
        items={[
          { label: "Input", href: "/forms/input" },
          { label: "Form", href: "/forms/form" },
          { label: "Checkbox", href: "/forms/checkbox" },
          { label: "Textarea", href: "/forms/textarea" },
        ]}
      />
    </ComponentPage>
  )
}
