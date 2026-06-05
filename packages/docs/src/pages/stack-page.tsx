import { useTranslation } from "react-i18next"

import { Stack, HStack, VStack } from "@dpds-gov/design-system"
import { Separator } from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Stack, HStack, VStack } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { HStack, VStack } from "@dpds-gov/design-system"

export function TicketHeader({ ticket }: { ticket: Ticket }) {
  return (
    <HStack justify="between" align="center" gap="4">
      <VStack gap="1" align="start">
        <h1 className="text-lg font-semibold">{ticket.subject}</h1>
        <p className="text-xs text-muted-foreground">#{ticket.id}</p>
      </VStack>
      <HStack gap="2">
        <Button variant="outlineGray">Assign</Button>
        <Button>Reply</Button>
      </HStack>
    </HStack>
  )
}`

const PREVIEW_SNIPPET = `<VStack gap="3">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</VStack>`

const EXAMPLE_SNIPPETS = {
  vstack: `<VStack gap="3">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</VStack>`,
  hstack: `<HStack gap="2">
  <Button variant="outlineGray">Cancel</Button>
  <Button>Save</Button>
</HStack>`,
  alignJustify: `<HStack justify="between" align="center" gap="4">
  <h2>Customers</h2>
  <Button>+ New customer</Button>
</HStack>`,
  divider: `// Divider renders between each child, not before/after.
<VStack gap="4" divider={<Separator />}>
  <Profile />
  <ContactDetails />
  <Notes />
</VStack>`,
  wrap: `// Wrap when children may overflow horizontally — tag rows, chip lists.
<HStack gap="2" wrap>
  {tags.map((t) => (<Badge key={t}>{t}</Badge>))}
</HStack>`,
  asElement: `<Stack as="ul" gap="2">
  {items.map((i) => <li key={i.id}>…</li>)}
</Stack>`,
  ticketRow: `<HStack justify="between" align="center" gap="3" className="px-4 py-3 border-b">
  <VStack gap="0" align="start">
    <p className="text-sm font-medium">{ticket.subject}</p>
    <p className="text-xs text-muted-foreground">{ticket.customer} · {ticket.age}</p>
  </VStack>
  <Badge variant={ticket.priority === "high" ? "destructive" : "secondary"}>
    {ticket.priority}
  </Badge>
</HStack>`,
}

/* ── Props tables ── */

function getStackPropRows(): PropRow[] {
  return [
    {
      name: "direction",
      type: '"row" | "column" | "row-reverse" | "column-reverse"',
      defaultValue: '"column"',
      description: "Flex direction. Use the HStack / VStack aliases instead of remembering which is which — they wrap Stack with the right default.",
    },
    {
      name: "gap",
      type: '"0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12"',
      defaultValue: '"4"',
      description: "Spacing scale token between children. Maps to Tailwind's gap-* (0.25rem increments × value).",
    },
    {
      name: "align",
      type: '"start" | "center" | "end" | "stretch" | "baseline"',
      description: "Cross-axis alignment (align-items). For HStack defaults to 'center'; for VStack/Stack defaults to flex's normal (stretch).",
    },
    {
      name: "justify",
      type: '"start" | "center" | "end" | "between" | "around" | "evenly"',
      description: "Main-axis distribution (justify-content). 'between' is the canonical pattern for header bars (title + actions).",
    },
    {
      name: "wrap",
      type: "boolean",
      defaultValue: "false",
      description: "Allow children to wrap to the next line when they overflow. Use for tag rows or chip lists where line count is variable.",
    },
    {
      name: "divider",
      type: "ReactElement",
      description: "Element rendered between each child (not before the first or after the last). Pass <Separator /> for hairline divisions.",
    },
    {
      name: "as",
      type: "ElementType",
      defaultValue: '"div"',
      description: "Render as a different element — 'ul' / 'ol' when children are list items, 'section' for labeled regions.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra Tailwind classes. Use for responsive direction (flex-col md:flex-row) or padding around the stack.",
    },
  ]
}

/* ── Page ── */

const TICKETS = [
  { id: "TCK-1042", subject: "Login failures after SSO upgrade", customer: "Acme Industrial", age: "12m ago", priority: "high" as const },
  { id: "TCK-1041", subject: "Export CSV truncates at 10k rows", customer: "Northwind", age: "1h ago", priority: "medium" as const },
  { id: "TCK-1040", subject: "Slack integration silent failure", customer: "Globex", age: "3h ago", priority: "low" as const },
]

const TAGS = ["enterprise", "renewal-due", "champion", "billing-contact", "north-america", "integration-heavy", "white-glove"]

export default function StackPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.stack.title")}
      description={t("docs.stack.description")}
      category={t("docs.stack.category")}
    >
      <Section title={t("docs.stack.preview.title")} description={t("docs.stack.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <VStack gap="3" className="w-full max-w-md">
            {["First", "Second", "Third"].map((label) => (
              <div
                key={label}
                className="rounded-lg bg-primary/10 px-4 py-3 text-sm font-mono text-primary-700 dark:bg-primary-300/15 dark:text-primary-200"
              >
                {label}
              </div>
            ))}
          </VStack>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.stack.installation.title")} description={t("docs.stack.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.stack.installation.filename")} />
      </Section>

      <Section title={t("docs.stack.usage.title")} description={t("docs.stack.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.stack.examples.title")} description={t("docs.stack.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.stack.examples.vstack.label")}
            description={t("docs.stack.examples.vstack.description")}
            code={EXAMPLE_SNIPPETS.vstack}
          >
            <VStack gap="3" className="w-full">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
                >
                  Item {i}
                </div>
              ))}
            </VStack>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.stack.examples.hstack.label")}
            description={t("docs.stack.examples.hstack.description")}
            code={EXAMPLE_SNIPPETS.hstack}
          >
            <HStack gap="2">
              <Button variant="outlineGray">Cancel</Button>
              <Button>Save</Button>
            </HStack>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.stack.examples.alignJustify.label")}
            description={t("docs.stack.examples.alignJustify.description")}
            code={EXAMPLE_SNIPPETS.alignJustify}
          >
            <HStack justify="between" align="center" gap="4" className="w-full">
              <h2 className="text-lg font-semibold">Customers</h2>
              <Button>+ New customer</Button>
            </HStack>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.stack.examples.divider.label")}
            description={t("docs.stack.examples.divider.description")}
            code={EXAMPLE_SNIPPETS.divider}
          >
            <VStack gap="4" className="w-full" divider={<Separator />}>
              <div>
                <p className="text-sm font-medium">Amal Hassan</p>
                <p className="text-xs text-muted-foreground">amal@acmeindustrial.com</p>
              </div>
              <div>
                <p className="text-sm font-medium">Contact details</p>
                <p className="text-xs text-muted-foreground">+971 50 123 4567</p>
              </div>
              <div>
                <p className="text-sm font-medium">Notes</p>
                <p className="text-xs text-muted-foreground">Prefers email after 4pm GST.</p>
              </div>
            </VStack>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.stack.examples.wrap.label")}
            description={t("docs.stack.examples.wrap.description")}
            code={EXAMPLE_SNIPPETS.wrap}
          >
            <HStack gap="2" wrap className="w-full">
              {TAGS.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </HStack>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.stack.examples.asElement.label")}
            description={t("docs.stack.examples.asElement.description")}
            code={EXAMPLE_SNIPPETS.asElement}
          >
            <Stack as="ul" gap="2" className="w-full">
              {["Amal Hassan", "Daniel Park", "Priya Shah"].map((n) => (
                <li
                  key={n}
                  className="rounded-md border border-border bg-card px-3 py-2 text-sm"
                >
                  {n}
                </li>
              ))}
            </Stack>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.stack.examples.ticketRow.label")}
            description={t("docs.stack.examples.ticketRow.description")}
            code={EXAMPLE_SNIPPETS.ticketRow}
          >
            <VStack gap="0" className="w-full rounded-md border border-border">
              {TICKETS.map((tk, i) => (
                <HStack
                  key={tk.id}
                  justify="between"
                  align="center"
                  gap="3"
                  className={`px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <VStack gap="0" align="start">
                    <p className="text-sm font-medium">{tk.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {tk.customer} · {tk.age}
                    </p>
                  </VStack>
                  <Badge variant={tk.priority === "high" ? "destructive" : "secondary"}>
                    {tk.priority}
                  </Badge>
                </HStack>
              ))}
            </VStack>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.stack.props.title")} description={t("docs.stack.props.description")}>
        <PropsTable rows={getStackPropRows()} />
      </Section>

      <Section title={t("docs.stack.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.stack.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.stack.accessibility.items.semantics")}</li>
          <li>{t("docs.stack.accessibility.items.order")}</li>
          <li>{t("docs.stack.accessibility.items.dividers")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["spacing"]} />

      <RelatedLinks
        title={t("docs.stack.related.title")}
        items={[
          { label: "Grid", href: "/ui/grid" },
          { label: "Container", href: "/ui/container" },
          { label: "Separator", href: "/ui/separator" },
        ]}
      />
    </ComponentPage>
  )
}
