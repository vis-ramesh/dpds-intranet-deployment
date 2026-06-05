import { useState } from "react"
import { Inbox, MoreHorizontal } from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"
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

/* ── Sample data ── */

interface Ticket {
  id: string
  customer: string
  service: string
  status: "new" | "in-progress" | "resolved" | "overdue"
  priority: "low" | "medium" | "high" | "critical"
  date: string
}

const TICKETS: Ticket[] = [
  { id: "REQ-2025-0142", customer: "Mohammed Al Mansoori", service: "Bounced cheque report", status: "in-progress", priority: "high", date: "28 Nov 2025" },
  { id: "REQ-2025-0141", customer: "Sarah Chen", service: "Civil case enquiry", status: "new", priority: "medium", date: "28 Nov 2025" },
  { id: "REQ-2025-0140", customer: "Khalifa Mohammed", service: "Document attestation", status: "resolved", priority: "low", date: "27 Nov 2025" },
  { id: "REQ-2025-0139", customer: "Layla Hussein", service: "Transaction enquiry", status: "overdue", priority: "critical", date: "26 Nov 2025" },
]

const STATUS_VARIANT: Record<Ticket["status"], "success" | "warning" | "danger" | "info"> = {
  resolved: "success",
  "in-progress": "info",
  overdue: "danger",
  new: "warning",
}

/* ── Snippets ── */

const INSTALL_SNIPPET = `import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@dpds-gov/design-system"

export function TicketTable({ tickets }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map(t => (
          <TableRow key={t.id}>
            <TableCell>{t.id}</TableCell>
            <TableCell>{t.customer}</TableCell>
            <TableCell>{t.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}`

const PREVIEW_SNIPPET = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Reference</TableHead>
      <TableHead>Customer</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {tickets.map(t => (
      <TableRow key={t.id}>
        <TableCell>{t.id}</TableCell>
        <TableCell>{t.customer}</TableCell>
        <TableCell><Badge>{t.status}</Badge></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`

const EXAMPLE_SNIPPETS = {
  basic: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Reference</TableHead>
      <TableHead>Customer</TableHead>
      <TableHead>Service</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>{rows.map(r => <TableRow key={r.id}>...</TableRow>)}</TableBody>
</Table>`,
  striped: `<Table>
  <TableBody>
    {rows.map((r, i) => (
      <TableRow key={r.id} className={i % 2 === 1 ? "bg-muted/30" : ""}>
        ...
      </TableRow>
    ))}
  </TableBody>
</Table>`,
  selection: `const [selected, setSelected] = useState<Set<string>>(new Set())

<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-10">
        <Checkbox checked={...} onCheckedChange={selectAll} />
      </TableHead>
      <TableHead>Reference</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map(r => (
      <TableRow key={r.id} data-state={selected.has(r.id) ? "selected" : undefined}>
        <TableCell><Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggle(r.id)} /></TableCell>
        <TableCell>{r.id}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
  stickyHeader: `<div className="max-h-64 overflow-y-auto rounded-lg border">
  <Table>
    <TableHeader className="sticky top-0 bg-background z-10">
      <TableRow><TableHead>Reference</TableHead></TableRow>
    </TableHeader>
    <TableBody>...</TableBody>
  </Table>
</div>`,
  empty: `{rows.length === 0 ? (
  <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
    <Inbox className="size-8 opacity-40" />
    <p>No tickets match these filters.</p>
  </div>
) : (
  <Table>...</Table>
)}`,
  rowActions: `<TableCell className="text-right">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="text" size="icon-sm" aria-label="Row actions">
        <MoreHorizontal className="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Open</DropdownMenuItem>
      <DropdownMenuItem>Reassign</DropdownMenuItem>
      <DropdownMenuItem className="text-error-600">Archive</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "Table",
      type: "HTMLAttributes<HTMLTableElement>",
      description: "Outer wrapper. Renders a horizontally scrolling div + <table>. Style with `className` for striped, dense, etc.",
    },
    {
      name: "TableHeader",
      type: "HTMLAttributes<HTMLTableSectionElement>",
      description: "Maps to <thead>. Add `className=\"sticky top-0 bg-background\"` for sticky headers inside scrollable containers.",
    },
    {
      name: "TableBody",
      type: "HTMLAttributes<HTMLTableSectionElement>",
      description: "Maps to <tbody>. The last row has its bottom border auto-removed for cleaner stacking.",
    },
    {
      name: "TableRow",
      type: "HTMLAttributes<HTMLTableRowElement>",
      description: "Maps to <tr>. Set `data-state=\"selected\"` to apply the selected-row background (used by checkbox-selection patterns).",
    },
    {
      name: "TableHead",
      type: "HTMLAttributes<HTMLTableCellElement>",
      description: "Maps to <th>. 11-row tall, muted text, left-aligned. Add `className=\"text-right\"` for numeric/action columns.",
    },
    {
      name: "TableCell",
      type: "HTMLAttributes<HTMLTableCellElement>",
      description: "Maps to <td>. Standard padding (px-4 py-3). Use `className=\"font-mono\"` for IDs / monospace data.",
    },
  ]
}

/* ── Live demos ── */

function BasicTable() {
  return (
    <div className="w-full max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-mono">Reference</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TICKETS.slice(0, 3).map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-mono">{t.id}</TableCell>
              <TableCell>{t.customer}</TableCell>
              <TableCell className="text-muted-foreground">{t.service}</TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[t.status]}>{t.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StripedTable() {
  return (
    <div className="w-full max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-mono">Reference</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TICKETS.map((t, i) => (
            <TableRow key={t.id} className={i % 2 === 1 ? "bg-muted/30 hover:bg-muted/40" : ""}>
              <TableCell className="font-mono">{t.id}</TableCell>
              <TableCell>{t.customer}</TableCell>
              <TableCell className="capitalize">{t.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function SelectionTable() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const allSelected = selected.size === TICKETS.length
  const someSelected = selected.size > 0 && !allSelected

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    setSelected((prev) => (prev.size === TICKETS.length ? new Set() : new Set(TICKETS.map((t) => t.id))))
  }

  return (
    <div className="w-full max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={toggleAll}
                aria-label="Select all rows"
              />
            </TableHead>
            <TableHead className="font-mono">Reference</TableHead>
            <TableHead>Customer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TICKETS.map((t) => {
            const isSelected = selected.has(t.id)
            return (
              <TableRow key={t.id} data-state={isSelected ? "selected" : undefined}>
                <TableCell>
                  <Checkbox checked={isSelected} onCheckedChange={() => toggle(t.id)} aria-label={`Select ${t.id}`} />
                </TableCell>
                <TableCell className="font-mono">{t.id}</TableCell>
                <TableCell>{t.customer}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <p className="text-xs text-muted-foreground mt-2">Selected: {selected.size}</p>
    </div>
  )
}

function StickyHeaderTable() {
  return (
    <div className="w-full max-w-3xl max-h-56 overflow-y-auto rounded-lg border">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead className="font-mono">Reference</TableHead>
            <TableHead>Customer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 20 }, (_, i) => (
            <TableRow key={i}>
              <TableCell className="font-mono">REQ-2025-{(200 - i).toString().padStart(4, "0")}</TableCell>
              <TableCell>Customer {i + 1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function EmptyStateTable() {
  return (
    <div className="w-full max-w-3xl rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-mono">Reference</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3}>
              <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
                <Inbox className="size-8 opacity-40" />
                <p className="text-sm">No tickets match these filters.</p>
                <p className="text-xs">Try clearing the priority filter, or expand the date range.</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

function RowActionsTable() {
  return (
    <div className="w-full max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-mono">Reference</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TICKETS.slice(0, 3).map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-mono">{t.id}</TableCell>
              <TableCell>{t.customer}</TableCell>
              <TableCell className="text-right">
                <Button variant="text" size="icon-sm" aria-label={`Actions for ${t.id}`}>
                  <MoreHorizontal className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/* ── Page ── */

export default function TablePage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.table.title")}
      description={t("docs.table.description")}
      category={t("docs.table.category")}
    >
      <Section title={t("docs.table.preview.title")} description={t("docs.table.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET} center={false}>
          <BasicTable />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.table.installation.title")} description={t("docs.table.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.table.installation.filename")} />
      </Section>

      <Section title={t("docs.table.usage.title")} description={t("docs.table.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.table.examples.title")} description={t("docs.table.examples.description")}>
        <div className="grid grid-cols-1 gap-4">
          <PreviewBlock
            title={t("docs.table.examples.basic.label")}
            description={t("docs.table.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
            center={false}
          >
            <BasicTable />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.table.examples.striped.label")}
            description={t("docs.table.examples.striped.description")}
            code={EXAMPLE_SNIPPETS.striped}
            center={false}
          >
            <StripedTable />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.table.examples.selection.label")}
            description={t("docs.table.examples.selection.description")}
            code={EXAMPLE_SNIPPETS.selection}
            center={false}
          >
            <SelectionTable />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.table.examples.stickyHeader.label")}
            description={t("docs.table.examples.stickyHeader.description")}
            code={EXAMPLE_SNIPPETS.stickyHeader}
            center={false}
          >
            <StickyHeaderTable />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.table.examples.empty.label")}
            description={t("docs.table.examples.empty.description")}
            code={EXAMPLE_SNIPPETS.empty}
            center={false}
          >
            <EmptyStateTable />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.table.examples.rowActions.label")}
            description={t("docs.table.examples.rowActions.description")}
            code={EXAMPLE_SNIPPETS.rowActions}
            center={false}
          >
            <RowActionsTable />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.table.props.title")} description={t("docs.table.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.table.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.table.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.table.accessibility.items.semantic")}</li>
          <li>{t("docs.table.accessibility.items.caption")}</li>
          <li>{t("docs.table.accessibility.items.checkbox")}</li>
          <li>{t("docs.table.accessibility.items.iconActions")}</li>
          <li>{t("docs.table.accessibility.items.responsive")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "spacing", "typography", "radius"]} />

      <RelatedLinks
        title={t("docs.table.related.title")}
        items={[
          { label: "Data Table", href: "/ui/table" },
          { label: "List", href: "/ui/list" },
          { label: "Pagination", href: "/ui/pagination" },
        ]}
      />
    </ComponentPage>
  )
}
