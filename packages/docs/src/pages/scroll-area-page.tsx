import { useTranslation } from "react-i18next"

import { ScrollArea, ScrollBar } from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"
import { Card } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { ScrollArea, ScrollBar } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { ScrollArea } from "@dpds-gov/design-system"

export function TicketList({ tickets }: { tickets: Ticket[] }) {
  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <ul className="divide-y">
        {tickets.map((t) => (
          <li key={t.id} className="px-4 py-3 text-sm">
            {t.subject}
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}`

const PREVIEW_SNIPPET = `<ScrollArea className="h-60 w-full rounded-md border">
  {/* long content */}
</ScrollArea>`

const EXAMPLE_SNIPPETS = {
  vertical: `<ScrollArea className="h-60 w-full rounded-md border">
  <div className="p-4 text-sm">
    {items.map((i) => (<p key={i}>{i}</p>))}
  </div>
</ScrollArea>`,
  horizontal: `<ScrollArea className="w-full whitespace-nowrap rounded-md border">
  <div className="flex w-max gap-3 p-3">
    {tags.map((tag) => (
      <Badge key={tag}>{tag}</Badge>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
  both: `<ScrollArea className="h-72 w-full rounded-md border">
  <div className="w-[1200px] p-4">{/* wide content */}</div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
  customThumb: `// Override the thumb via a className on the bar.
<ScrollArea className="h-60 w-full rounded-md border">
  <div className="p-4">{/* content */}</div>
  <ScrollBar
    orientation="vertical"
    className="w-3 [&>[data-slot=scroll-area-thumb]]:bg-primary/40
               [&>[data-slot=scroll-area-thumb]]:hover:bg-primary/60"
  />
</ScrollArea>`,
  conversation: `<Card className="overflow-hidden">
  <ScrollArea className="h-80">
    <div className="space-y-4 p-4">
      {messages.map((m) => (
        <Message key={m.id} {...m} />
      ))}
    </div>
  </ScrollArea>
</Card>`,
  tagRow: `<ScrollArea className="w-full whitespace-nowrap">
  <div className="flex w-max gap-2 py-1">
    {customer.tags.map((t) => (
      <Badge key={t} variant="secondary">{t}</Badge>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "className",
      type: "string",
      description: "Tailwind classes on the Root. Set height (h-60, h-80) or max-height — without a constrained size the scrollbar will never appear.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Content rendered inside the Viewport. The viewport gets size-full automatically, so children can use width-based layout normally.",
    },
    {
      name: "scrollHideDelay",
      type: "number",
      defaultValue: "600",
      description: "Milliseconds before the scrollbars fade out after the user stops interacting. Forwarded to Radix Root.",
    },
    {
      name: "type",
      type: '"auto" | "always" | "scroll" | "hover"',
      defaultValue: '"hover"',
      description: "When the scrollbars appear. 'hover' shows them on hover/scroll; 'always' keeps them visible; 'auto' lets the OS decide; 'scroll' shows only while scrolling. Forwarded to Radix Root.",
    },
    {
      name: "dir",
      type: '"ltr" | "rtl"',
      description: "Reading direction. Defaults to the document's. Critical for RTL — the horizontal bar flips to the opposite side.",
    },
  ]
}

function getBarPropRows(): PropRow[] {
  return [
    {
      name: "orientation",
      type: '"vertical" | "horizontal"',
      defaultValue: '"vertical"',
      description: "Axis the bar controls. Always pair a horizontal viewport with <ScrollBar orientation='horizontal' />.",
    },
    {
      name: "className",
      type: "string",
      description: "Override the bar's classes — width/height of the track, color of the thumb (target [data-slot=scroll-area-thumb]).",
    },
  ]
}

/* ── Page ── */

const SAMPLE_PARAGRAPHS = [
  "Customer reported the integration stopped syncing at 14:32 UTC. No errors visible in the dashboard, but tickets aren't reaching their CRM. Confirmed credentials are still valid.",
  "Re-ran the connection test from the admin panel — handshake succeeds. Webhook delivery log shows 200s for the last 50 events. So the data is leaving us correctly.",
  "Followed up with their IT team. They confirmed firewall rules changed on Monday. Adding the new outbound IP range to the allowlist resolved the issue immediately.",
  "Closing as resolved. Suggested they subscribe to our IP range change notifications so this doesn't happen again. Created internal note in the customer record.",
  "Note for the next agent: this customer (Acme Industrial) is on the enterprise plan with custom IP requirements. Any IP changes need to be communicated to their ops@ alias 7 days in advance.",
  "Adding a workflow rule so we get pinged 30 days before any planned IP change touches enterprise customers. Linked to runbook RB-148.",
  "Customer Success will follow up next week to confirm everything's still running smoothly. Marking ticket complete.",
]

const TICKETS = [
  "TCK-1042 — Login failures after SSO upgrade",
  "TCK-1041 — Export CSV truncates at 10k rows",
  "TCK-1040 — Slack integration silent failure",
  "TCK-1039 — Refund processed twice on invoice 8821",
  "TCK-1038 — Quote PDF rendering broken on Safari",
  "TCK-1037 — Dashboard widgets misaligned on RTL",
  "TCK-1036 — Webhook retries firing 5x not 3x",
  "TCK-1035 — Customer search ignoring diacritics",
  "TCK-1034 — Email template rendering in plain text",
  "TCK-1033 — Avatar upload fails > 2MB",
  "TCK-1032 — Date picker default off by one in EU",
  "TCK-1031 — Tag filter persists across sessions",
]

const CUSTOMER_TAGS = [
  "enterprise",
  "renewal-due",
  "champion",
  "decision-maker",
  "billing-contact",
  "technical-lead",
  "executive-sponsor",
  "north-america",
  "high-value",
  "integration-heavy",
  "white-glove",
  "advocacy-candidate",
]

const CONVERSATION = [
  { id: 1, author: "Amal Hassan (customer)", at: "10:42", body: "Hi — none of our recent invoices are showing the new tax ID. Is there a setting we missed?" },
  { id: 2, author: "Daniel Park (agent)", at: "10:48", body: "Thanks for flagging, Amal. Tax IDs are pulled from your billing profile at the time of generation. Let me check what changed." },
  { id: 3, author: "Daniel Park (agent)", at: "10:55", body: "Found it — your billing profile was updated yesterday but the existing invoices were generated before that. New ones should pick up the change." },
  { id: 4, author: "Amal Hassan (customer)", at: "11:02", body: "Can you regenerate the last three? They're already with our finance team." },
  { id: 5, author: "Daniel Park (agent)", at: "11:10", body: "Done. INV-2041, 2042, and 2043 have been regenerated with the new tax ID. They're attached to this ticket and on the way to your finance team's inbox." },
  { id: 6, author: "Amal Hassan (customer)", at: "11:14", body: "Perfect, thank you!" },
  { id: 7, author: "Daniel Park (agent)", at: "11:16", body: "You're welcome — closing this one out. Reply if anything comes up." },
]

export default function ScrollAreaPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.scrollArea.title")}
      description={t("docs.scrollArea.description")}
      category={t("docs.scrollArea.category")}
    >
      <Section title={t("docs.scrollArea.preview.title")} description={t("docs.scrollArea.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <ScrollArea className="h-60 w-full max-w-md rounded-md border border-border">
            <div className="space-y-3 p-4 text-sm text-gray-700 dark:text-slate-300">
              {SAMPLE_PARAGRAPHS.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </ScrollArea>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.scrollArea.installation.title")} description={t("docs.scrollArea.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.scrollArea.installation.filename")} />
      </Section>

      <Section title={t("docs.scrollArea.usage.title")} description={t("docs.scrollArea.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.scrollArea.examples.title")} description={t("docs.scrollArea.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.scrollArea.examples.vertical.label")}
            description={t("docs.scrollArea.examples.vertical.description")}
            code={EXAMPLE_SNIPPETS.vertical}
          >
            <ScrollArea className="h-60 w-full rounded-md border border-border">
              <ul className="divide-y divide-border">
                {TICKETS.map((tt) => (
                  <li key={tt} className="px-4 py-2 text-sm font-mono text-gray-700 dark:text-slate-300">
                    {tt}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.scrollArea.examples.horizontal.label")}
            description={t("docs.scrollArea.examples.horizontal.description")}
            code={EXAMPLE_SNIPPETS.horizontal}
          >
            <ScrollArea className="w-full whitespace-nowrap rounded-md border border-border">
              <div className="flex w-max gap-2 p-3">
                {CUSTOMER_TAGS.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.scrollArea.examples.both.label")}
            description={t("docs.scrollArea.examples.both.description")}
            code={EXAMPLE_SNIPPETS.both}
          >
            <ScrollArea className="h-64 w-full rounded-md border border-border">
              <div className="w-[1200px] space-y-3 p-4 text-sm text-gray-700 dark:text-slate-300">
                <div className="grid grid-cols-6 gap-3 font-mono text-xs">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-md bg-muted px-3 py-4 text-center"
                    >
                      Column {i + 1}
                    </div>
                  ))}
                </div>
                {SAMPLE_PARAGRAPHS.map((p, i) => (
                  <p key={i} className="whitespace-normal">{p}</p>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.scrollArea.examples.customThumb.label")}
            description={t("docs.scrollArea.examples.customThumb.description")}
            code={EXAMPLE_SNIPPETS.customThumb}
          >
            <ScrollArea className="h-60 w-full rounded-md border border-border">
              <div className="space-y-3 p-4 text-sm text-gray-700 dark:text-slate-300">
                {SAMPLE_PARAGRAPHS.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <ScrollBar
                orientation="vertical"
                className="w-3 [&>[data-slot=scroll-area-thumb]]:bg-primary/40 [&>[data-slot=scroll-area-thumb]]:hover:bg-primary/60"
              />
            </ScrollArea>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.scrollArea.examples.tagRow.label")}
            description={t("docs.scrollArea.examples.tagRow.description")}
            code={EXAMPLE_SNIPPETS.tagRow}
          >
            <div className="w-full">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Acme Industrial — tags</p>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max gap-2 py-1">
                  {CUSTOMER_TAGS.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.scrollArea.examples.conversation.label")}
            description={t("docs.scrollArea.examples.conversation.description")}
            code={EXAMPLE_SNIPPETS.conversation}
          >
            <Card className="overflow-hidden p-0">
              <div className="border-b border-border bg-muted/40 px-4 py-2 text-xs font-medium text-muted-foreground">
                TCK-1029 — Tax ID missing on invoices
              </div>
              <ScrollArea className="h-80">
                <div className="space-y-4 p-4">
                  {CONVERSATION.map((m) => {
                    const isAgent = m.author.includes("agent")
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col gap-1 ${isAgent ? "items-end text-right" : "items-start"}`}
                      >
                        <div className="text-xs font-medium text-muted-foreground">
                          {m.author} · {m.at}
                        </div>
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            isAgent
                              ? "bg-primary/10 text-primary-800 dark:text-primary-200"
                              : "bg-muted text-gray-700 dark:text-slate-300"
                          }`}
                        >
                          {m.body}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </Card>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.scrollArea.props.title")} description={t("docs.scrollArea.props.description")}>
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm font-medium">ScrollArea</p>
            <PropsTable rows={getPropRows()} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">ScrollBar</p>
            <PropsTable rows={getBarPropRows()} />
          </div>
        </div>
      </Section>

      <Section title={t("docs.scrollArea.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.scrollArea.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.scrollArea.accessibility.items.keyboard")}</li>
          <li>{t("docs.scrollArea.accessibility.items.wheel")}</li>
          <li>{t("docs.scrollArea.accessibility.items.fallback")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["spacing", "radius", "colors"]} />

      <RelatedLinks
        title={t("docs.scrollArea.related.title")}
        items={[
          { label: "Container", href: "/ui/container" },
          { label: "Card", href: "/ui/card" },
          { label: "Table", href: "/ui/table" },
        ]}
      />
    </ComponentPage>
  )
}
