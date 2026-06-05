import { useState } from "react"
import { Eye, EyeOff, Search } from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Input } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Input } from "@dpds-gov/design-system"

export function CustomerSearch() {
  return (
    <Input
      type="text"
      placeholder="Search customer name or ID"
      onChange={(e) => console.log(e.target.value)}
    />
  )
}`

const PREVIEW_SNIPPET = `<Input placeholder="Search customer name or ID" />`

const EXAMPLE_SNIPPETS = {
  default: `<Input placeholder="REQ-2025-0142" />`,
  withLabel: `<div className="grid w-full gap-2">
  <Label htmlFor="ticket">Ticket ID</Label>
  <Input id="ticket" placeholder="REQ-2025-0142" />
</div>`,
  withHelper: `<div className="grid w-full gap-1.5">
  <Label htmlFor="emirates-id">Emirates ID</Label>
  <Input id="emirates-id" placeholder="784-XXXX-XXXXXXX-X" />
  <p className="text-xs text-muted-foreground">15 digits, no spaces or dashes.</p>
</div>`,
  withError: `<div className="grid w-full gap-1.5">
  <Label htmlFor="email" className="text-error-600">Email address</Label>
  <Input
    id="email"
    type="email"
    defaultValue="sarah.chen@"
    aria-invalid="true"
  />
  <p className="text-xs text-error-600">Enter a valid email address.</p>
</div>`,
  password: `// Compose an eye-toggle with InputGroupButton — no absolute positioning.
<InputGroup>
  <InputGroupInput id="pw" type={visible ? "text" : "password"} placeholder="••••••••" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-sm" onClick={() => setVisible(v => !v)} aria-label="Toggle">
      {visible ? <EyeOff /> : <Eye />}
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
  search: `<InputGroup>
  <InputGroupAddon>
    <InputGroupText><Search /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Search tickets..." />
</InputGroup>`,
  disabled: `<Input disabled defaultValue="Mohammed Al Mansoori" />`,
  readOnly: `<Input readOnly defaultValue="REQ-2025-0142" />`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "type",
      type: '"text" | "email" | "password" | "number" | "tel" | "url" | "search" | "date" | "datetime-local" | string',
      defaultValue: '"text"',
      description: "HTML input type. Use email, tel, number, etc. so the right keyboard is shown on mobile and built-in validation fires.",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Greyed-out hint shown when the field is empty. Use a representative example, not a description of the field.",
    },
    {
      name: "value",
      type: "string | number",
      description: "Controlled value. Pair with onChange.",
    },
    {
      name: "defaultValue",
      type: "string | number",
      description: "Initial value for an uncontrolled input.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Greys out the input and removes it from tab order. Use when the field is conditionally locked.",
    },
    {
      name: "readOnly",
      type: "boolean",
      defaultValue: "false",
      description: "Renders the input as non-editable but still focusable and copyable. Use for system-generated values like reference numbers.",
    },
    {
      name: "aria-invalid",
      type: 'boolean | "true" | "false"',
      defaultValue: "false",
      description: "When true, applies the error border + focus-ring styles. Pair with an error message below the field.",
    },
    {
      name: "onChange",
      type: "(event: ChangeEvent<HTMLInputElement>) => void",
      description: "Fires on every keystroke. For form-level validation prefer onBlur.",
    },
    {
      name: "...props",
      type: "InputHTMLAttributes<HTMLInputElement>",
      description: "All standard input attributes (id, name, autoComplete, required, pattern, min/max, etc.).",
    },
  ]
}

/* ── Live demo bits ── */

function PasswordExample() {
  const [visible, setVisible] = useState(false)
  return (
    <InputGroup className="w-full max-w-xs">
      <InputGroupInput
        type={visible ? "text" : "password"}
        defaultValue="hunter2-don't-do-this"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-sm"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

function SearchExample() {
  return (
    <InputGroup className="w-full max-w-xs">
      <InputGroupAddon>
        <InputGroupText><Search /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search tickets..." />
    </InputGroup>
  )
}

/* ── Page ── */

export default function InputPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.input.title")}
      description={t("docs.input.description")}
      category={t("docs.input.category")}
    >
      <Section title={t("docs.input.preview.title")} description={t("docs.input.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Input placeholder={t("docs.input.preview.placeholder")} className="max-w-xs" />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.input.installation.title")} description={t("docs.input.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.input.installation.filename")} />
      </Section>

      <Section title={t("docs.input.usage.title")} description={t("docs.input.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.input.examples.title")} description={t("docs.input.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.input.examples.default.label")}
            description={t("docs.input.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <Input placeholder="REQ-2025-0142" className="max-w-xs" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.input.examples.withLabel.label")}
            description={t("docs.input.examples.withLabel.description")}
            code={EXAMPLE_SNIPPETS.withLabel}
          >
            <div className="grid w-full max-w-xs gap-2">
              <Label htmlFor="ticket">Ticket ID</Label>
              <Input id="ticket" placeholder="REQ-2025-0142" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.input.examples.withHelper.label")}
            description={t("docs.input.examples.withHelper.description")}
            code={EXAMPLE_SNIPPETS.withHelper}
          >
            <div className="grid w-full max-w-xs gap-1.5">
              <Label htmlFor="emirates-id">Emirates ID</Label>
              <Input id="emirates-id" placeholder="784-XXXX-XXXXXXX-X" />
              <p className="text-xs text-muted-foreground">15 digits, no spaces or dashes.</p>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.input.examples.withError.label")}
            description={t("docs.input.examples.withError.description")}
            code={EXAMPLE_SNIPPETS.withError}
          >
            <div className="grid w-full max-w-xs gap-1.5">
              <Label htmlFor="email-err" className="text-error-600">Email address</Label>
              <Input
                id="email-err"
                type="email"
                defaultValue="sarah.chen@"
                aria-invalid="true"
              />
              <p className="text-xs text-error-600">Enter a valid email address.</p>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.input.examples.password.label")}
            description={t("docs.input.examples.password.description")}
            code={EXAMPLE_SNIPPETS.password}
          >
            <PasswordExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.input.examples.search.label")}
            description={t("docs.input.examples.search.description")}
            code={EXAMPLE_SNIPPETS.search}
          >
            <SearchExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.input.examples.disabled.label")}
            description={t("docs.input.examples.disabled.description")}
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <Input disabled defaultValue="Mohammed Al Mansoori" className="max-w-xs" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.input.examples.readOnly.label")}
            description={t("docs.input.examples.readOnly.description")}
            code={EXAMPLE_SNIPPETS.readOnly}
          >
            <Input readOnly defaultValue="REQ-2025-0142" className="max-w-xs" />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.input.props.title")} description={t("docs.input.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.input.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.input.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.input.accessibility.items.label")}</li>
          <li>{t("docs.input.accessibility.items.error")}</li>
          <li>{t("docs.input.accessibility.items.autocomplete")}</li>
          <li>{t("docs.input.accessibility.items.disabled")}</li>
          <li>{t("docs.input.accessibility.items.placeholder")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.input.related.title")}
        items={[
          { label: "Form", href: "/forms/form" },
          { label: "Label", href: "/forms/label" },
          { label: "Textarea", href: "/forms/textarea" },
          { label: "Button", href: "/buttons" },
        ]}
      />
    </ComponentPage>
  )
}
