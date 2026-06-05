import { Search, Mail, AtSign, Globe, Lock, DollarSign, Copy } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  Label,
} from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
  InputGroupTextarea,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@dpds-gov/design-system"

export function HeaderSearch() {
  return (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText><Search /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search tickets, customers..." />
    </InputGroup>
  )
}`

const PREVIEW_SNIPPET = `<InputGroup>
  <InputGroupAddon>
    <InputGroupText><Search /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Search tickets, customers..." />
</InputGroup>`

const EXAMPLE_SNIPPETS = {
  leadingIcon: `<InputGroup>
  <InputGroupAddon>
    <InputGroupText><Search /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Search tickets..." />
</InputGroup>`,
  trailingButton: `<InputGroup>
  <InputGroupInput defaultValue="https://dubaipolice.gov.ae/portal/REQ-2025-0142" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" aria-label="Copy URL">
      <Copy />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
  prefixText: `<InputGroup>
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>`,
  suffixText: `<InputGroup>
  <InputGroupInput placeholder="100.00" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>AED</InputGroupText>
  </InputGroupAddon>
</InputGroup>`,
  bothEnds: `<InputGroup>
  <InputGroupAddon>
    <InputGroupText><Mail /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="email" placeholder="you@dubaipolice.gov.ae" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs">Verify</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
  textarea: `<InputGroup>
  <InputGroupAddon align="block-start">
    <InputGroupText>Notes — visible to investigators only</InputGroupText>
  </InputGroupAddon>
  <InputGroupTextarea rows={3} placeholder="Add a note about this request..." />
</InputGroup>`,
  disabled: `<InputGroup>
  <InputGroupAddon>
    <InputGroupText><Lock /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput disabled defaultValue="Locked field" />
</InputGroup>`,
  invalid: `<div className="grid w-full gap-1.5">
  <Label htmlFor="email" className="text-error-600">Work email</Label>
  <InputGroup>
    <InputGroupAddon>
      <InputGroupText><AtSign /></InputGroupText>
    </InputGroupAddon>
    <InputGroupInput
      id="email"
      type="email"
      defaultValue="sarah.chen@"
      aria-invalid="true"
    />
  </InputGroup>
  <p className="text-xs text-error-600">Enter a complete email address.</p>
</div>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description:
        "Compose with InputGroupAddon, InputGroupInput / InputGroupTextarea, and InputGroupButton. Order matters — the addon's `align` decides whether it lays out as a leading or trailing slot.",
    },
    {
      name: "className",
      type: "string",
      description:
        "Extends the wrapper. Use for height overrides in dense surfaces (e.g. `h-9` inside a navbar) or to layer extra borders.",
    },
    {
      name: "...props",
      type: 'HTMLAttributes<"div">',
      description:
        "All standard div attributes (id, role, aria-*, data-*). The wrapper already sets role=\"group\".",
    },
  ]
}

function getAddonRows(): PropRow[] {
  return [
    {
      name: "align",
      type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
      defaultValue: '"inline-start"',
      description:
        "Where the addon sits. inline-* puts it left/right of the field; block-* stacks it above/below (used for textarea headers like a label or character counter).",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description:
        "Place an InputGroupText (icon or label) or an InputGroupButton inside. Multiple children get a 0.5rem horizontal gap.",
    },
    {
      name: "className",
      type: "string",
      description: "Extends the addon's classes — e.g. to tint an icon's color.",
    },
  ]
}

/* ── Page ── */

export default function InputGroupPage() {
  return (
    <ComponentPage
      title="Input group"
      description="Compose an input with leading or trailing addons — icons, text labels, action buttons, or block headers — without juggling absolute positioning."
      category="Form & Input"
    >
      {/* 1 — Title + description handled by <ComponentPage> above */}

      {/* 2 — Live preview */}
      <Section title="Preview" description="A search field with a leading icon — the canonical use case.">
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <InputGroup className="max-w-md">
            <InputGroupAddon>
              <InputGroupText><Search /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Search tickets, customers..." />
          </InputGroup>
        </PreviewBlock>
      </Section>

      {/* 3 — Installation */}
      <Section
        title="Installation"
        description="Import the InputGroup primitives from the design system."
      >
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename="your-file.tsx" />
      </Section>

      {/* 4 — Usage */}
      <Section
        title="Usage"
        description="The compound API — InputGroup wraps any combination of an InputGroupAddon and a single InputGroupInput (or InputGroupTextarea)."
      >
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      {/* 5 — Examples */}
      <Section title="Examples" description='Common compositions. Toggle "View code" on any preview to copy the snippet.'>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title="Leading icon"
            description="The most common pattern — an icon glued to the start of a search or filter field."
            code={EXAMPLE_SNIPPETS.leadingIcon}
          >
            <InputGroup className="max-w-sm">
              <InputGroupAddon>
                <InputGroupText><Search /></InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="Search tickets..." />
            </InputGroup>
          </PreviewBlock>

          <PreviewBlock
            title="Trailing button"
            description="Put a primary action right inside the field — copy-to-clipboard, paste, validate."
            code={EXAMPLE_SNIPPETS.trailingButton}
          >
            <InputGroup className="max-w-sm">
              <InputGroupInput defaultValue="REQ-2025-0142" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs" aria-label="Copy URL">
                  <Copy />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </PreviewBlock>

          <PreviewBlock
            title="Prefix text"
            description="Hint at the field's format — domain, currency code, country prefix. Click the prefix to focus the input."
            code={EXAMPLE_SNIPPETS.prefixText}
          >
            <InputGroup className="max-w-sm">
              <InputGroupAddon>
                <InputGroupText><Globe className="size-4" />https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="example.com" />
            </InputGroup>
          </PreviewBlock>

          <PreviewBlock
            title="Suffix text"
            description="Show the unit on the right — currency, percentage, time zone."
            code={EXAMPLE_SNIPPETS.suffixText}
          >
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="100.00" />
              <InputGroupAddon align="inline-end">
                <InputGroupText><DollarSign className="size-4" />AED</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </PreviewBlock>

          <PreviewBlock
            title="Both ends"
            description="Icon on the start, action on the end — useful for email + verify, phone + send code, etc."
            code={EXAMPLE_SNIPPETS.bothEnds}
          >
            <InputGroup className="max-w-sm">
              <InputGroupAddon>
                <InputGroupText><Mail /></InputGroupText>
              </InputGroupAddon>
              <InputGroupInput type="email" placeholder="you@dubaipolice.gov.ae" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="xs">Verify</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </PreviewBlock>

          <PreviewBlock
            title="With textarea"
            description='Use align="block-start" or "block-end" to stack a header or counter above/below the field.'
            code={EXAMPLE_SNIPPETS.textarea}
          >
            <InputGroup className="max-w-sm">
              <InputGroupAddon align="block-start">
                <InputGroupText>Notes — visible to investigators only</InputGroupText>
              </InputGroupAddon>
              <InputGroupTextarea rows={3} placeholder="Add a note about this request..." />
            </InputGroup>
          </PreviewBlock>

          <PreviewBlock
            title="Disabled"
            description="Setting disabled on the input cascades to the wrapper — the whole group dims and addon icons fade."
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <InputGroup className="max-w-sm">
              <InputGroupAddon>
                <InputGroupText><Lock /></InputGroupText>
              </InputGroupAddon>
              <InputGroupInput disabled defaultValue="Locked field" />
            </InputGroup>
          </PreviewBlock>

          <PreviewBlock
            title="Invalid"
            description="Set aria-invalid on the inner input and the whole group adopts the destructive border + focus ring."
            code={EXAMPLE_SNIPPETS.invalid}
          >
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="email" className="text-error-600">Work email</Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText><AtSign /></InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  type="email"
                  defaultValue="sarah.chen@"
                  aria-invalid="true"
                />
              </InputGroup>
              <p className="text-xs text-error-600">Enter a complete email address.</p>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      {/* 6 — API / Props table */}
      <Section title="API — InputGroup" description="The wrapping container.">
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title="API — InputGroupAddon" description="A leading or trailing slot for icons, text, or action buttons.">
        <PropsTable rows={getAddonRows()} />
      </Section>

      {/* 7 — Accessibility */}
      <Section title="Accessibility">
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          InputGroup composes the standard Input/Textarea primitives and stays a thin layout wrapper — accessibility responsibilities still belong with the consumer.
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>Pair every group with a <code className="font-mono text-xs">&lt;Label htmlFor=...&gt;</code> for the inner input. The addon is decorative, not the label.</li>
          <li>Icon-only InputGroupButtons must include an <code className="font-mono text-xs">aria-label</code>. The visual tooltip alone isn't enough.</li>
          <li>Set <code className="font-mono text-xs">aria-invalid="true"</code> on the inner input (not the wrapper) — the wrapper's <code className="font-mono text-xs">has-[…aria-invalid=true]</code> selector picks it up and surfaces the error ring.</li>
          <li>Addons run <code className="font-mono text-xs">.focus()</code> on the inner input when clicked. Don't break that by intercepting click events on the addon container.</li>
        </ul>
      </Section>

      {/* 8 — Related components */}
      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title="Related components"
        items={[
          { label: "Input", href: "/forms/input" },
          { label: "Textarea", href: "/forms/textarea" },
          { label: "Label", href: "/forms/label" },
          { label: "Button", href: "/buttons" },
          { label: "Navbar", href: "/ui/navbar" },
        ]}
      />
    </ComponentPage>
  )
}
