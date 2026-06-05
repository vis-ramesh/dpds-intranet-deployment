import { useTranslation } from "react-i18next"

import { Grid } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Grid } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Grid } from "@dpds-gov/design-system"

export function CustomerKpis() {
  return (
    <Grid cols="3" gap="6" className="md:grid-cols-3 grid-cols-1">
      <KpiCard label="Open tickets" value="142" />
      <KpiCard label="Avg first reply" value="2h 14m" />
      <KpiCard label="CSAT" value="94%" />
    </Grid>
  )
}`

const PREVIEW_SNIPPET = `<Grid cols="3" gap="4">
  <Cell />
  <Cell />
  <Cell />
</Grid>`

const EXAMPLE_SNIPPETS = {
  basic: `<Grid cols="3" gap="4">
  <Card>Tickets</Card>
  <Card>Customers</Card>
  <Card>Agents</Card>
</Grid>`,
  responsive: `// Default to 1 column; bump to 2 at md, 4 at lg.
<Grid cols="1" gap="4" className="md:grid-cols-2 lg:grid-cols-4">
  {kpis.map((k) => <KpiCard key={k.id} {...k} />)}
</Grid>`,
  twelveCol: `// 12-column grid with explicit col-span children — for asymmetric dashboards.
<Grid cols="12" gap="6">
  <section className="col-span-12 lg:col-span-8">{/* main */}</section>
  <aside className="col-span-12 lg:col-span-4">{/* sidebar */}</aside>
</Grid>`,
  gaps: `<Grid cols="4" gap="2">…</Grid>   {/* dense */}
<Grid cols="4" gap="4">…</Grid>   {/* default */}
<Grid cols="4" gap="8">…</Grid>   {/* breathing room */}`,
  asElement: `<Grid as="ul" cols="3" gap="4">
  {items.map((i) => <li key={i.id}>…</li>)}
</Grid>`,
  ticketBoard: `// Kanban-style three-column board.
<Grid cols="3" gap="6" className="grid-cols-1 lg:grid-cols-3">
  <Column title="Open"        tickets={open} />
  <Column title="In progress" tickets={inProgress} />
  <Column title="Resolved"    tickets={resolved} />
</Grid>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "cols",
      type: '"1" | "2" | "3" | "4" | "5" | "6" | "12"',
      defaultValue: '"1"',
      description: "Column count. Maps to Tailwind's grid-cols-*. Use '12' when children need col-span control. For asymmetric layouts beyond these presets, pass grid-cols-[...] in className.",
    },
    {
      name: "gap",
      type: '"0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12"',
      defaultValue: '"4"',
      description: "Spacing scale token, applied to both axes. Maps to Tailwind's gap-* (0.25rem increments × value). For different row/column gaps, override gap-x-* and gap-y-* via className.",
    },
    {
      name: "as",
      type: "ElementType",
      defaultValue: '"div"',
      description: "Render as a different element — use 'ul' / 'ol' when children are list items, 'section' for a labelled region.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra Tailwind classes. Use for responsive overrides (md:grid-cols-2), arbitrary tracks (grid-cols-[200px_1fr]), or axis-specific gaps (gap-x-6 gap-y-3).",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Grid cells. Each top-level child becomes one cell; nest a wrapper if you need cells to contain multiple elements.",
    },
  ]
}

/* ── Page ── */

function Cell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex h-16 items-center justify-center rounded-lg bg-primary/10 text-xs font-mono text-primary-700 dark:bg-primary-300/15 dark:text-primary-200 ${className}`}
    >
      {children}
    </div>
  )
}

const KPIS = [
  { id: 1, label: "Open tickets", value: "142", delta: "+12 from last week" },
  { id: 2, label: "Avg first reply", value: "2h 14m", delta: "−18m" },
  { id: 3, label: "CSAT", value: "94%", delta: "+2pt" },
  { id: 4, label: "Backlog age (median)", value: "3.4d", delta: "−0.6d" },
]

const TICKET_COLUMNS = [
  { id: "open", title: "Open", tickets: ["TCK-1042 Login failures", "TCK-1041 CSV export", "TCK-1040 Slack integration"] },
  { id: "in-progress", title: "In progress", tickets: ["TCK-1039 Refund issue", "TCK-1038 Quote PDF"] },
  { id: "resolved", title: "Resolved", tickets: ["TCK-1037 Dashboard RTL", "TCK-1036 Webhook retries", "TCK-1035 Search diacritics"] },
]

export default function GridPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.grid.title")}
      description={t("docs.grid.description")}
      category={t("docs.grid.category")}
    >
      <Section title={t("docs.grid.preview.title")} description={t("docs.grid.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Grid cols="3" gap="4" className="w-full">
            {[1, 2, 3].map((i) => (
              <Cell key={i}>Cell {i}</Cell>
            ))}
          </Grid>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.grid.installation.title")} description={t("docs.grid.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.grid.installation.filename")} />
      </Section>

      <Section title={t("docs.grid.usage.title")} description={t("docs.grid.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.grid.examples.title")} description={t("docs.grid.examples.description")}>
        <div className="flex flex-col gap-4">
          <PreviewBlock
            title={t("docs.grid.examples.basic.label")}
            description={t("docs.grid.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <Grid cols="3" gap="4" className="w-full">
              <Cell>Tickets</Cell>
              <Cell>Customers</Cell>
              <Cell>Agents</Cell>
            </Grid>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.grid.examples.responsive.label")}
            description={t("docs.grid.examples.responsive.description")}
            code={EXAMPLE_SNIPPETS.responsive}
          >
            <Grid cols="1" gap="4" className="w-full md:grid-cols-2 lg:grid-cols-4">
              {KPIS.map((k) => (
                <div
                  key={k.id}
                  className="flex flex-col gap-1 rounded-lg border border-border bg-card px-4 py-3"
                >
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <p className="text-xl font-semibold">{k.value}</p>
                  <p className="text-xs text-primary-700 dark:text-primary-200">{k.delta}</p>
                </div>
              ))}
            </Grid>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.grid.examples.twelveCol.label")}
            description={t("docs.grid.examples.twelveCol.description")}
            code={EXAMPLE_SNIPPETS.twelveCol}
          >
            <Grid cols="12" gap="6" className="w-full">
              <Cell className="col-span-12 lg:col-span-8">main · col-span-8</Cell>
              <Cell className="col-span-12 lg:col-span-4">sidebar · col-span-4</Cell>
            </Grid>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.grid.examples.gaps.label")}
            description={t("docs.grid.examples.gaps.description")}
            code={EXAMPLE_SNIPPETS.gaps}
          >
            <div className="flex flex-col gap-4">
              {(["2", "4", "8"] as const).map((g) => (
                <div key={g}>
                  <p className="mb-1 text-xs font-mono text-muted-foreground">gap="{g}"</p>
                  <Grid cols="4" gap={g} className="w-full">
                    {[1, 2, 3, 4].map((i) => (
                      <Cell key={i}>{i}</Cell>
                    ))}
                  </Grid>
                </div>
              ))}
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.grid.examples.asElement.label")}
            description={t("docs.grid.examples.asElement.description")}
            code={EXAMPLE_SNIPPETS.asElement}
          >
            <Grid as="ul" cols="3" gap="4" className="w-full">
              {["Amal Hassan", "Daniel Park", "Priya Shah"].map((n) => (
                <li
                  key={n}
                  className="flex h-16 items-center justify-center rounded-lg bg-muted text-sm"
                >
                  {n}
                </li>
              ))}
            </Grid>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.grid.examples.ticketBoard.label")}
            description={t("docs.grid.examples.ticketBoard.description")}
            code={EXAMPLE_SNIPPETS.ticketBoard}
          >
            <Grid cols="1" gap="6" className="w-full lg:grid-cols-3">
              {TICKET_COLUMNS.map((col) => (
                <div key={col.id} className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    {col.title} · {col.tickets.length}
                  </p>
                  <div className="flex flex-col gap-2">
                    {col.tickets.map((tt) => (
                      <div
                        key={tt}
                        className="rounded-md border border-border bg-card px-3 py-2 text-xs font-mono"
                      >
                        {tt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Grid>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.grid.props.title")} description={t("docs.grid.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.grid.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.grid.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.grid.accessibility.items.semantics")}</li>
          <li>{t("docs.grid.accessibility.items.order")}</li>
          <li>{t("docs.grid.accessibility.items.responsive")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["spacing"]} />

      <RelatedLinks
        title={t("docs.grid.related.title")}
        items={[
          { label: "Container", href: "/ui/container" },
          { label: "Stack", href: "/ui/stack" },
        ]}
      />
    </ComponentPage>
  )
}
