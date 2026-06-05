import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ChevronDown, ChevronRight, Plus } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@dpds-gov/design-system"
import { ChevronDown } from "lucide-react"

export function TicketDetails() {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center gap-2">
        <ChevronDown className="size-4 transition-transform data-[state=closed]:-rotate-90" />
        Internal notes
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
        Customer called twice yesterday. Promised callback by EOD.
      </CollapsibleContent>
    </Collapsible>
  )
}`

const PREVIEW_SNIPPET = `<Collapsible>
  <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
  <CollapsibleContent>Hidden content here.</CollapsibleContent>
</Collapsible>`

const EXAMPLE_SNIPPETS = {
  basic: `<Collapsible>
  <CollapsibleTrigger>Show details</CollapsibleTrigger>
  <CollapsibleContent>
    Surfaced content lives here.
  </CollapsibleContent>
</Collapsible>`,
  withChevron: `// Chevron flips when open via data-[state=closed]:-rotate-90.
<Collapsible>
  <CollapsibleTrigger className="group flex items-center gap-2 text-sm font-medium">
    <ChevronDown className="size-4 transition-transform group-data-[state=closed]:-rotate-90" />
    Internal notes
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* content */}
  </CollapsibleContent>
</Collapsible>`,
  defaultOpen: `// Start expanded. Useful when the content is primary information.
<Collapsible defaultOpen>
  <CollapsibleTrigger>Activity log</CollapsibleTrigger>
  <CollapsibleContent>
    {/* default-visible content */}
  </CollapsibleContent>
</Collapsible>`,
  controlled: `const [open, setOpen] = useState(false)

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger>{open ? "Hide" : "Show"}</CollapsibleTrigger>
  <CollapsibleContent>
    {/* drive open from outside the primitive */}
  </CollapsibleContent>
</Collapsible>`,
  withCustomTrigger: `// Trigger as a Button via asChild — keeps all Button styling.
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outlineGray" size="sm">
      <Plus className="size-4" />
      Add details
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* content */}
  </CollapsibleContent>
</Collapsible>`,
  ticketDetail: `// CRM pattern — collapsible section inside a detail card.
<div className="rounded-xl border border-border bg-card p-4">
  <h3 className="font-medium">REQ-2025-0142</h3>
  <Collapsible className="mt-3">
    <CollapsibleTrigger className="group flex w-full items-center justify-between text-sm">
      <span>Internal notes (3)</span>
      <ChevronDown className="size-4 transition-transform group-data-[state=closed]:-rotate-90" />
    </CollapsibleTrigger>
    <CollapsibleContent className="mt-3 text-sm text-muted-foreground">
      Customer called twice yesterday. Promised callback by EOD.
    </CollapsibleContent>
  </Collapsible>
</div>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "Collapsible.open",
      type: "boolean",
      description: "Controlled open state. Pair with onOpenChange for React-driven toggle behaviour.",
    },
    {
      name: "Collapsible.defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Initial open state for uncontrolled usage.",
    },
    {
      name: "Collapsible.onOpenChange",
      type: "(open: boolean) => void",
      description: "Fires when the user toggles. Receives the new open state.",
    },
    {
      name: "Collapsible.disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Prevents the trigger from opening or closing. The content stays in whatever state it was in.",
    },
    {
      name: "CollapsibleTrigger",
      type: "button",
      description: "Toggles open / closed. Renders as a button by default — pass asChild + a custom element to keep your own button styling.",
    },
    {
      name: "CollapsibleContent",
      type: "div",
      description: "The hidden / shown content. Use data-[state=open] / data-[state=closed] selectors for open/close animations.",
    },
  ]
}

/* ── Live demo bits ── */

function ControlledExample() {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="w-full max-w-md rounded-lg border border-border bg-card p-3"
    >
      <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 text-sm font-medium">
        <span>{open ? "Hide" : "Show"} controlled section</span>
        <ChevronDown
          className={cn(
            "size-4 transition-transform",
            "group-data-[state=closed]:-rotate-90"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
        Open state lives in React. Toggle from the trigger above — or from the
        external button:{" "}
        <Button
          variant="text"
          size="sm"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close from outside" : "Open from outside"}
        </Button>
      </CollapsibleContent>
    </Collapsible>
  )
}

/* ── Page ── */

export default function CollapsiblePage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.collapsible.title")}
      description={t("docs.collapsible.description")}
      category={t("docs.collapsible.category")}
    >
      <Section title={t("docs.collapsible.preview.title")} description={t("docs.collapsible.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Collapsible className="w-full max-w-md">
            <CollapsibleTrigger className="group flex items-center gap-2 text-sm font-medium">
              <ChevronRight className="size-4 transition-transform group-data-[state=open]:rotate-90" />
              Show details
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
              The content reveals on click. Click the trigger again to hide it.
            </CollapsibleContent>
          </Collapsible>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.collapsible.installation.title")} description={t("docs.collapsible.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.collapsible.installation.filename")} />
      </Section>

      <Section title={t("docs.collapsible.usage.title")} description={t("docs.collapsible.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.collapsible.examples.title")} description={t("docs.collapsible.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.collapsible.examples.basic.label")}
            description={t("docs.collapsible.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <Collapsible className="w-full max-w-sm">
              <CollapsibleTrigger className="text-sm font-medium">Show details</CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
                Surfaced content lives here.
              </CollapsibleContent>
            </Collapsible>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.collapsible.examples.withChevron.label")}
            description={t("docs.collapsible.examples.withChevron.description")}
            code={EXAMPLE_SNIPPETS.withChevron}
          >
            <Collapsible className="w-full max-w-sm">
              <CollapsibleTrigger className="group flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="size-4 transition-transform group-data-[state=closed]:-rotate-90" />
                Internal notes
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
                Customer called twice yesterday. Promised callback by EOD.
              </CollapsibleContent>
            </Collapsible>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.collapsible.examples.defaultOpen.label")}
            description={t("docs.collapsible.examples.defaultOpen.description")}
            code={EXAMPLE_SNIPPETS.defaultOpen}
          >
            <Collapsible defaultOpen className="w-full max-w-sm">
              <CollapsibleTrigger className="group flex items-center gap-2 text-sm font-medium">
                <ChevronDown className="size-4 transition-transform group-data-[state=closed]:-rotate-90" />
                Activity log
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
                Default-open content shown immediately.
              </CollapsibleContent>
            </Collapsible>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.collapsible.examples.controlled.label")}
            description={t("docs.collapsible.examples.controlled.description")}
            code={EXAMPLE_SNIPPETS.controlled}
          >
            <ControlledExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.collapsible.examples.withCustomTrigger.label")}
            description={t("docs.collapsible.examples.withCustomTrigger.description")}
            code={EXAMPLE_SNIPPETS.withCustomTrigger}
          >
            <Collapsible className="w-full max-w-sm">
              <CollapsibleTrigger asChild>
                <Button variant="outlineGray" size="sm">
                  <Plus className="size-4" />
                  Add details
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
                Trigger styled as a Button via asChild.
              </CollapsibleContent>
            </Collapsible>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.collapsible.examples.ticketDetail.label")}
            description={t("docs.collapsible.examples.ticketDetail.description")}
            code={EXAMPLE_SNIPPETS.ticketDetail}
          >
            <div className="w-full max-w-md rounded-xl border border-border bg-card p-4">
              <h3 className="font-medium">REQ-2025-0142</h3>
              <Collapsible className="mt-3">
                <CollapsibleTrigger className="group flex w-full items-center justify-between text-sm">
                  <span>Internal notes (3)</span>
                  <ChevronDown className="size-4 transition-transform group-data-[state=closed]:-rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 text-sm text-muted-foreground">
                  Customer called twice yesterday. Promised callback by EOD.
                </CollapsibleContent>
              </Collapsible>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.collapsible.props.title")} description={t("docs.collapsible.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.collapsible.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.collapsible.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.collapsible.accessibility.items.keyboard")}</li>
          <li>{t("docs.collapsible.accessibility.items.aria")}</li>
          <li>{t("docs.collapsible.accessibility.items.accordion")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "spacing", "motion"]} />

      <RelatedLinks
        title={t("docs.collapsible.related.title")}
        items={[
          { label: "Accordion", href: "/ui/accordion" },
          { label: "Tabs", href: "/ui/tabs" },
        ]}
      />
    </ComponentPage>
  )
}
