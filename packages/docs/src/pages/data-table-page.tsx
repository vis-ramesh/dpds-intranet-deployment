import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Archive, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  createSelectColumn,
  type ColumnDef,
} from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dpds-gov/design-system"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dpds-gov/design-system"
import { Skeleton } from "@dpds-gov/design-system"
import { EmptyState } from "@dpds-gov/design-system"
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

/* ── Domain data — service-portal tickets ── */

type Status = "open" | "in-progress" | "waiting" | "resolved" | "closed"
type Priority = "low" | "medium" | "high" | "urgent"

interface Ticket {
  id: string
  subject: string
  customer: string
  assignee: string
  status: Status
  priority: Priority
  createdAt: string
}

const TICKETS: Ticket[] = [
  { id: "REQ-2025-0142", subject: "Renewal certificate not generated", customer: "Al Futtaim Trading", assignee: "Amal Hassan", status: "open", priority: "high", createdAt: "2026-05-12" },
  { id: "REQ-2025-0141", subject: "Mobile login redirect loop", customer: "Etihad Aviation Group", assignee: "Khalid Saeed", status: "in-progress", priority: "urgent", createdAt: "2026-05-12" },
  { id: "REQ-2025-0140", subject: "Update billing address", customer: "Emaar Properties", assignee: "Fatima Al Maktoum", status: "resolved", priority: "low", createdAt: "2026-05-11" },
  { id: "REQ-2025-0139", subject: "API key permissions question", customer: "Majid Al Futtaim", assignee: "Raji Pillai", status: "waiting", priority: "medium", createdAt: "2026-05-11" },
  { id: "REQ-2025-0138", subject: "Refund for duplicate charge", customer: "Dubai Holdings", assignee: "Noor Abdulla", status: "in-progress", priority: "high", createdAt: "2026-05-10" },
  { id: "REQ-2025-0137", subject: "Trade license amendment", customer: "Al Futtaim Trading", assignee: "Yusuf Tariq", status: "open", priority: "medium", createdAt: "2026-05-10" },
  { id: "REQ-2025-0136", subject: "Export compliance review", customer: "Etihad Aviation Group", assignee: "Amal Hassan", status: "closed", priority: "low", createdAt: "2026-05-09" },
  { id: "REQ-2025-0135", subject: "Add new user to admin role", customer: "Emaar Properties", assignee: "Khalid Saeed", status: "resolved", priority: "medium", createdAt: "2026-05-09" },
  { id: "REQ-2025-0134", subject: "Visa rejection appeal", customer: "Majid Al Futtaim", assignee: "Fatima Al Maktoum", status: "in-progress", priority: "urgent", createdAt: "2026-05-08" },
  { id: "REQ-2025-0133", subject: "SLA reporting glitch", customer: "Dubai Holdings", assignee: "Raji Pillai", status: "waiting", priority: "low", createdAt: "2026-05-08" },
  { id: "REQ-2025-0132", subject: "Bulk import customers", customer: "Al Futtaim Trading", assignee: "Noor Abdulla", status: "open", priority: "medium", createdAt: "2026-05-07" },
  { id: "REQ-2025-0131", subject: "Two-factor reset", customer: "Etihad Aviation Group", assignee: "Yusuf Tariq", status: "resolved", priority: "low", createdAt: "2026-05-07" },
]

const STATUS_VARIANT: Record<Status, "success" | "info" | "warning" | "neutral" | "pending"> = {
  open: "info",
  "in-progress": "pending",
  waiting: "warning",
  resolved: "success",
  closed: "neutral",
}

const PRIORITY_VARIANT: Record<Priority, "danger" | "warning" | "info" | "neutral"> = {
  urgent: "danger",
  high: "warning",
  medium: "info",
  low: "neutral",
}

/* ── Column factories ── */

function baseColumns(): ColumnDef<Ticket>[] {
  return [
    { accessorKey: "id", header: "Ticket", cell: ({ row }) => <code className="font-mono text-xs">{row.original.id}</code> },
    { accessorKey: "subject", header: "Subject", cell: ({ row }) => <span className="font-medium">{row.original.subject}</span> },
    { accessorKey: "customer", header: "Customer" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={STATUS_VARIANT[row.original.status]} className="capitalize">
          {row.original.status.replace("-", " ")}
        </Badge>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <Badge variant={PRIORITY_VARIANT[row.original.priority]} className="capitalize">
          {row.original.priority}
        </Badge>
      ),
    },
    { accessorKey: "assignee", header: "Assignee" },
  ]
}

function sortableColumns(): ColumnDef<Ticket>[] {
  return baseColumns().map((col) => ({ ...col, enableSorting: true }))
}

function rowActionsColumn(): ColumnDef<Ticket> {
  return {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="text" size="icon-sm" aria-label={`Actions for ${row.original.id}`}>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>{row.original.id}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Eye className="size-4" />
            View ticket
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Archive className="size-4" />
            Archive
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-error-700 dark:text-error-300 focus:bg-error-50 dark:focus:bg-error-500/15">
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }
}

/* ── Snippets ── */

const INSTALL_SNIPPET = `import {
  DataTable,
  createSelectColumn,
  type ColumnDef,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { DataTable, type ColumnDef } from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"

interface Ticket {
  id: string
  subject: string
  status: "open" | "resolved"
}

const columns: ColumnDef<Ticket>[] = [
  { accessorKey: "id", header: "Ticket" },
  { accessorKey: "subject", header: "Subject", enableSorting: true },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "open" ? "info" : "success"}>
        {row.original.status}
      </Badge>
    ),
  },
]

export function TicketsTable({ data }: { data: Ticket[] }) {
  return <DataTable columns={columns} data={data} searchPlaceholder="Search tickets..." />
}`

const PREVIEW_SNIPPET = `<DataTable columns={columns} data={tickets} searchPlaceholder="Search tickets..." />`

const EXAMPLE_SNIPPETS = {
  basic: PREVIEW_SNIPPET,
  sortable: `// Add enableSorting: true on any column to make its header clickable.
const columns: ColumnDef<Ticket>[] = [
  { accessorKey: "id",       header: "Ticket",   enableSorting: true },
  { accessorKey: "subject",  header: "Subject",  enableSorting: true },
  { accessorKey: "priority", header: "Priority", enableSorting: true },
]`,
  globalSearch: `// The toolbar's search box does global filtering across every column.
// Type in the search input to narrow rows by any text match.
<DataTable columns={columns} data={tickets} searchPlaceholder="Search tickets..." />`,
  filterSlot: `// Pass a custom filter (Select, Combobox, Date range) into the filterSlot prop.
const [status, setStatus] = useState<"all" | Status>("all")
const filtered = status === "all" ? tickets : tickets.filter((t) => t.status === status)

<DataTable
  columns={columns}
  data={filtered}
  filterSlot={
    <Select value={status} onValueChange={(v) => setStatus(v as never)}>
      <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All statuses</SelectItem>
        <SelectItem value="open">Open</SelectItem>
        <SelectItem value="in-progress">In progress</SelectItem>
        <SelectItem value="resolved">Resolved</SelectItem>
      </SelectContent>
    </Select>
  }
/>`,
  rowSelection: `// createSelectColumn() returns a column with a header checkbox + per-row checkboxes
// that drive TanStack's row selection model.
const columns: ColumnDef<Ticket>[] = [
  createSelectColumn<Ticket>(),
  { accessorKey: "id",       header: "Ticket" },
  { accessorKey: "subject",  header: "Subject" },
  // ...
]

<DataTable columns={columns} data={tickets} />`,
  rowActions: `// Render a DropdownMenu in a final column. Set enableSorting: false on it.
{
  id: "actions",
  enableSorting: false,
  cell: ({ row }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="text" size="icon-sm">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-error-700">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}`,
  withAdd: `// onAdd renders a + button at the end of the toolbar.
<DataTable
  columns={columns}
  data={tickets}
  onAdd={() => router.push("/tickets/new")}
/>`,
  empty: `// Pass an empty array to see the built-in "No results." row.
// For a more useful empty state, render <EmptyState /> beside or above the table.
<DataTable columns={columns} data={[]} />

// Better:
<EmptyState
  variant="no-data"
  title="No tickets yet"
  description="Add your first ticket to get started."
  action={<Button>Add ticket</Button>}
/>`,
  loading: `// While data is loading, render a Skeleton-row table that matches the columns.
<Table>
  <TableHeader>
    <TableRow>
      {columns.map((c) => (
        <TableHead key={c.id ?? c.accessorKey}>{c.header as string}</TableHead>
      ))}
    </TableRow>
  </TableHeader>
  <TableBody>
    {Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i}>
        {columns.map((_, j) => (
          <TableCell key={j}><Skeleton className="h-4 w-3/4" /></TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
</Table>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "columns",
      type: "ColumnDef<TData, TValue>[]",
      required: true,
      description: "TanStack column definitions. Each column needs a header and either an accessorKey or accessorFn + cell renderer.",
    },
    {
      name: "data",
      type: "TData[]",
      required: true,
      description: "Row data. The primitive doesn't memoize internally — pass a stable reference (via useMemo) to avoid re-creating the table on every render.",
    },
    {
      name: "searchPlaceholder",
      type: "string",
      defaultValue: '"Quick search"',
      description: "Placeholder for the toolbar's global filter input. Replace with something domain-specific (\"Search tickets...\", \"Search customers...\").",
    },
    {
      name: "filterSlot",
      type: "ReactNode",
      description: "Custom filter UI rendered next to the search box — a Select, Combobox, date range picker, etc. Manage the filtering yourself by passing a pre-filtered data array.",
    },
    {
      name: "onAdd",
      type: "() => void",
      description: "When set, the toolbar renders a + button on the right. Use for \"Add new ticket\" / \"New customer\" actions.",
    },
    {
      name: "globalFilter",
      type: "string",
      description: "Controlled value for the toolbar's search box. Pair with onGlobalFilterChange when you want to drive filtering from React state (e.g. URL sync).",
    },
    {
      name: "onGlobalFilterChange",
      type: "(value: string) => void",
      description: "Fires when the user types in the search box. Receives the current query string.",
    },
    {
      name: "ColumnDef.enableSorting",
      type: "boolean",
      defaultValue: "false",
      description: "Makes the column's header clickable to toggle sort direction. The primitive renders a chevron indicator automatically.",
    },
    {
      name: "createSelectColumn<T>()",
      type: "() => ColumnDef<T>",
      description: "Helper that returns a column with a header checkbox (select all on current page) and per-row checkboxes. enableSorting and enableHiding are off.",
    },
  ]
}

/* ── Live demo components ── */

function FilterSlotExample() {
  const [status, setStatus] = useState<"all" | Status>("all")
  const filtered = useMemo(
    () => (status === "all" ? TICKETS : TICKETS.filter((t) => t.status === status)),
    [status]
  )
  return (
    <DataTable
      columns={baseColumns()}
      data={filtered}
      searchPlaceholder="Search tickets..."
      filterSlot={
        <Select value={status} onValueChange={(v) => setStatus(v as never)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In progress</SelectItem>
            <SelectItem value="waiting">Waiting</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      }
    />
  )
}

function RowSelectionExample() {
  const columns = useMemo<ColumnDef<Ticket>[]>(
    () => [createSelectColumn<Ticket>(), ...baseColumns()],
    []
  )
  return <DataTable columns={columns} data={TICKETS} />
}

function RowActionsExample() {
  const columns = useMemo<ColumnDef<Ticket>[]>(
    () => [...baseColumns(), rowActionsColumn()],
    []
  )
  return <DataTable columns={columns} data={TICKETS} />
}

function WithAddExample() {
  const [count, setCount] = useState(0)
  return (
    <div className="flex flex-col gap-2">
      <DataTable
        columns={baseColumns()}
        data={TICKETS.slice(0, 5)}
        onAdd={() => setCount((c) => c + 1)}
      />
      <p className="text-xs text-muted-foreground">
        Add button clicked: <code className="font-mono">{count}</code> times
      </p>
    </div>
  )
}

function EmptyExample() {
  return (
    <div className="flex flex-col gap-4">
      <DataTable columns={baseColumns()} data={[]} />
      <div className="border border-dashed border-border rounded-lg">
        <EmptyState
          variant="no-data"
          title="No tickets yet"
          description="Service requests will appear here once customers start submitting them."
          action={<Button size="md">Create ticket</Button>}
        />
      </div>
    </div>
  )
}

function LoadingExample() {
  const cols = baseColumns()
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="border-0">
            {cols.map((c, i) => (
              <TableHead key={i}>{c.header as string}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              {cols.map((_, j) => (
                <TableCell key={j}>
                  <Skeleton className="h-4 w-3/4" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/* ── Page ── */

export default function DataTablePage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.dataTable.title")}
      description={t("docs.dataTable.description")}
      category={t("docs.dataTable.category")}
    >
      <Section title={t("docs.dataTable.preview.title")} description={t("docs.dataTable.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <DataTable
            columns={baseColumns()}
            data={TICKETS}
            searchPlaceholder="Search tickets..."
          />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.dataTable.installation.title")} description={t("docs.dataTable.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.dataTable.installation.filename")} />
      </Section>

      <Section title={t("docs.dataTable.usage.title")} description={t("docs.dataTable.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.dataTable.examples.title")} description={t("docs.dataTable.examples.description")}>
        <div className="grid grid-cols-1 gap-4">
          <PreviewBlock
            title={t("docs.dataTable.examples.basic.label")}
            description={t("docs.dataTable.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <DataTable columns={baseColumns()} data={TICKETS.slice(0, 6)} />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dataTable.examples.sortable.label")}
            description={t("docs.dataTable.examples.sortable.description")}
            code={EXAMPLE_SNIPPETS.sortable}
          >
            <DataTable columns={sortableColumns()} data={TICKETS} />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dataTable.examples.globalSearch.label")}
            description={t("docs.dataTable.examples.globalSearch.description")}
            code={EXAMPLE_SNIPPETS.globalSearch}
          >
            <DataTable
              columns={baseColumns()}
              data={TICKETS}
              searchPlaceholder="Search tickets, customers, assignees..."
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dataTable.examples.filterSlot.label")}
            description={t("docs.dataTable.examples.filterSlot.description")}
            code={EXAMPLE_SNIPPETS.filterSlot}
          >
            <FilterSlotExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dataTable.examples.rowSelection.label")}
            description={t("docs.dataTable.examples.rowSelection.description")}
            code={EXAMPLE_SNIPPETS.rowSelection}
          >
            <RowSelectionExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dataTable.examples.rowActions.label")}
            description={t("docs.dataTable.examples.rowActions.description")}
            code={EXAMPLE_SNIPPETS.rowActions}
          >
            <RowActionsExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dataTable.examples.withAdd.label")}
            description={t("docs.dataTable.examples.withAdd.description")}
            code={EXAMPLE_SNIPPETS.withAdd}
          >
            <WithAddExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dataTable.examples.empty.label")}
            description={t("docs.dataTable.examples.empty.description")}
            code={EXAMPLE_SNIPPETS.empty}
          >
            <EmptyExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dataTable.examples.loading.label")}
            description={t("docs.dataTable.examples.loading.description")}
            code={EXAMPLE_SNIPPETS.loading}
          >
            <LoadingExample />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.dataTable.props.title")} description={t("docs.dataTable.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.dataTable.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.dataTable.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.dataTable.accessibility.items.semantics")}</li>
          <li>{t("docs.dataTable.accessibility.items.sort")}</li>
          <li>{t("docs.dataTable.accessibility.items.selection")}</li>
          <li>{t("docs.dataTable.accessibility.items.actions")}</li>
          <li>{t("docs.dataTable.accessibility.items.empty")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "spacing", "typography", "radius"]} />

      <RelatedLinks
        title={t("docs.dataTable.related.title")}
        items={[
          { label: "Table", href: "/ui/table" },
          { label: "List", href: "/ui/list" },
          { label: "Pagination", href: "/ui/pagination" },
          { label: "Empty State", href: "/ui/empty-state" },
        ]}
      />
    </ComponentPage>
  )
}
