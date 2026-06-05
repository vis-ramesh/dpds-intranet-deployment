import { useState } from "react"
import { useTranslation } from "react-i18next"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
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
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@dpds-gov/design-system"

export function TicketFaq() {
  return (
    <Accordion variant="rounded">
      <AccordionItem value="status">
        <AccordionTrigger>How are tickets prioritized?</AccordionTrigger>
        <AccordionContent>
          By SLA tier first, then by age within tier. Critical issues
          override standard ordering.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`

const PREVIEW_SNIPPET = `<Accordion variant="rounded">
  <AccordionItem value="a">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer.</AccordionContent>
  </AccordionItem>
</Accordion>`

const EXAMPLE_SNIPPETS = {
  transparent: `<Accordion variant="transparent">
  <AccordionItem value="a">
    <AccordionTrigger>Section A</AccordionTrigger>
    <AccordionContent>Body…</AccordionContent>
  </AccordionItem>
</Accordion>`,
  rounded: `<Accordion variant="rounded">
  <AccordionItem value="a">
    <AccordionTrigger>Section A</AccordionTrigger>
    <AccordionContent>Body…</AccordionContent>
  </AccordionItem>
</Accordion>`,
  multiple: `// Allow more than one panel open at a time.
<Accordion type="multiple" variant="rounded">
  <AccordionItem value="a">…</AccordionItem>
  <AccordionItem value="b">…</AccordionItem>
</Accordion>`,
  defaultOpen: `// Start with one item already open.
<Accordion variant="rounded" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">…</AccordionItem>
  <AccordionItem value="item-2">…</AccordionItem>
</Accordion>`,
  controlled: `const [open, setOpen] = useState<string[]>(["item-1"])

<Accordion
  variant="rounded"
  value={open}
  onValueChange={setOpen}
>
  <AccordionItem value="item-1">…</AccordionItem>
</Accordion>`,
  ticketFaq: `// CRM pattern — FAQ for new agents inside an onboarding card.
<Accordion variant="rounded">
  <AccordionItem value="sla">
    <AccordionTrigger>What's the response SLA?</AccordionTrigger>
    <AccordionContent>
      First reply within 1h for high priority, 4h for medium, 1 business day for low.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
}

/* ── Props tables ── */

function getRootPropRows(): PropRow[] {
  return [
    {
      name: "variant",
      type: '"transparent" | "rounded"',
      defaultValue: '"transparent"',
      description: "Visual style. 'transparent' is a bordered list — best inside a card. 'rounded' makes each item a self-contained card with background.",
    },
    {
      name: "type",
      type: '"single" | "multiple"',
      defaultValue: '"single"',
      description: "Single keeps one open at a time (canonical FAQ behaviour). Multiple lets users open several panels simultaneously.",
    },
    {
      name: "value",
      type: "string | string[]",
      description: "Controlled open state. For type='single' pass a string; for 'multiple' pass a string array.",
    },
    {
      name: "defaultValue",
      type: "string | string[]",
      description: "Initially open items (uncontrolled). Use defaultValue when you don't need to react to changes.",
    },
    {
      name: "onValueChange",
      type: "(value) => void",
      description: "Fires when the open state changes. Required when value is controlled.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra Tailwind classes on the root flex column.",
    },
  ]
}

function getItemPropRows(): PropRow[] {
  return [
    {
      name: "value",
      type: "string",
      required: true,
      description: "Unique identifier for the item. Used by value / defaultValue / onValueChange to track open state.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disable interaction with this item's trigger. Useful for FAQ entries that aren't ready yet.",
    },
  ]
}

/* ── Page ── */

export default function AccordionPage() {
  const { t } = useTranslation()
  const [controlled, setControlled] = useState<string[]>(["item-1"])

  return (
    <ComponentPage
      title={t("docs.accordion.title")}
      description={t("docs.accordion.description")}
      category={t("docs.accordion.category")}
    >
      <Section title={t("docs.accordion.preview.title")} description={t("docs.accordion.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="w-full max-w-xl">
            <Accordion variant="rounded">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is this dashboard?</AccordionTrigger>
                <AccordionContent>
                  A CRM template for managing customers, tickets, and agents. Built on shadcn/ui primitives with Tailwind tokens.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I customize it?</AccordionTrigger>
                <AccordionContent>
                  Yes — components use CVA variants and Tailwind tokens. Swap colors, spacing, and radii via className or variant props.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.accordion.installation.title")} description={t("docs.accordion.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.accordion.installation.filename")} />
      </Section>

      <Section title={t("docs.accordion.usage.title")} description={t("docs.accordion.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.accordion.examples.title")} description={t("docs.accordion.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.accordion.examples.transparent.label")}
            description={t("docs.accordion.examples.transparent.description")}
            code={EXAMPLE_SNIPPETS.transparent}
          >
            <Accordion variant="transparent" className="w-full">
              <AccordionItem value="a">
                <AccordionTrigger>How are tickets prioritized?</AccordionTrigger>
                <AccordionContent>
                  By SLA tier first, then by age within tier.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>How do escalations work?</AccordionTrigger>
                <AccordionContent>
                  Automatic after the SLA window expires; manual via the Escalate action.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="c">
                <AccordionTrigger>Where do I report bugs?</AccordionTrigger>
                <AccordionContent>
                  Use the #crm-feedback Slack channel or the internal Linear board.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.accordion.examples.rounded.label")}
            description={t("docs.accordion.examples.rounded.description")}
            code={EXAMPLE_SNIPPETS.rounded}
          >
            <Accordion variant="rounded" className="w-full">
              <AccordionItem value="a">
                <AccordionTrigger>How are tickets prioritized?</AccordionTrigger>
                <AccordionContent>
                  By SLA tier first, then by age within tier.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>How do escalations work?</AccordionTrigger>
                <AccordionContent>
                  Automatic after the SLA window expires; manual via the Escalate action.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.accordion.examples.multiple.label")}
            description={t("docs.accordion.examples.multiple.description")}
            code={EXAMPLE_SNIPPETS.multiple}
          >
            <Accordion variant="rounded" className="w-full">
              <AccordionItem value="a">
                <AccordionTrigger>Account</AccordionTrigger>
                <AccordionContent>Plan, billing, and seats.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>Notifications</AccordionTrigger>
                <AccordionContent>Email, in-app, and Slack channel routing.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="c">
                <AccordionTrigger>Integrations</AccordionTrigger>
                <AccordionContent>Slack, Stripe, HubSpot, and outbound webhooks.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.accordion.examples.defaultOpen.label")}
            description={t("docs.accordion.examples.defaultOpen.description")}
            code={EXAMPLE_SNIPPETS.defaultOpen}
          >
            <Accordion variant="rounded" defaultValue={["item-1"]} className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Start expanded</AccordionTrigger>
                <AccordionContent>
                  Use defaultValue when the first item contains primary information that should be visible by default.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Closed by default</AccordionTrigger>
                <AccordionContent>This stays closed until clicked.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.accordion.examples.controlled.label")}
            description={t("docs.accordion.examples.controlled.description")}
            code={EXAMPLE_SNIPPETS.controlled}
          >
            <div className="flex flex-col gap-2 w-full">
              <p className="text-xs font-mono text-muted-foreground">
                open: [{controlled.join(", ")}]
              </p>
              <Accordion
                variant="rounded"
                value={controlled}
                onValueChange={(v) => setControlled(v as string[])}
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>Item 1</AccordionTrigger>
                  <AccordionContent>Body of item 1.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Item 2</AccordionTrigger>
                  <AccordionContent>Body of item 2.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.accordion.examples.ticketFaq.label")}
            description={t("docs.accordion.examples.ticketFaq.description")}
            code={EXAMPLE_SNIPPETS.ticketFaq}
          >
            <div className="w-full rounded-2xl border border-border bg-card p-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                New agent onboarding · FAQ
              </p>
              <Accordion variant="rounded" className="w-full">
                <AccordionItem value="sla">
                  <AccordionTrigger>What's the response SLA?</AccordionTrigger>
                  <AccordionContent>
                    First reply within 1h for high priority, 4h for medium, 1 business day for low.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="escalation">
                  <AccordionTrigger>When do I escalate?</AccordionTrigger>
                  <AccordionContent>
                    Anything blocking a customer's workflow goes to the senior queue immediately. Otherwise follow standard tier-2 review.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tooling">
                  <AccordionTrigger>Which tools do I need access to?</AccordionTrigger>
                  <AccordionContent>
                    CRM dashboard, Slack #support-frontline, the runbook wiki, and the customer admin panel. Your manager grants each on day one.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.accordion.props.title")} description={t("docs.accordion.props.description")}>
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm font-medium">Accordion (Root)</p>
            <PropsTable rows={getRootPropRows()} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">AccordionItem</p>
            <PropsTable rows={getItemPropRows()} />
          </div>
        </div>
      </Section>

      <Section title={t("docs.accordion.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.accordion.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.accordion.accessibility.items.keyboard")}</li>
          <li>{t("docs.accordion.accessibility.items.aria")}</li>
          <li>{t("docs.accordion.accessibility.items.collapsible")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["spacing", "radius", "motion", "colors"]} />

      <RelatedLinks
        title={t("docs.accordion.related.title")}
        items={[
          { label: "Collapsible", href: "/ui/collapsible" },
          { label: "Tabs", href: "/ui/tabs" },
        ]}
      />
    </ComponentPage>
  )
}
