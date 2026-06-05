import { useState } from "react"
import { useTranslation } from "react-i18next"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@dpds-gov/design-system"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@dpds-gov/design-system"

export function TicketsPagination({ page, setPage, pageCount }: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPage(Math.max(0, page - 1))} />
        </PaginationItem>
        {Array.from({ length: pageCount }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === page}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => setPage(Math.min(pageCount - 1, page + 1))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`

const PREVIEW_SNIPPET = `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious />
    </PaginationItem>
    <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationLink>12</PaginationLink></PaginationItem>
    <PaginationItem>
      <PaginationNext />
    </PaginationItem>
  </PaginationContent>
</Pagination>`

const EXAMPLE_SNIPPETS = {
  numbered: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious /></PaginationItem>
    {[1, 2, 3, 4, 5].map((p) => (
      <PaginationItem key={p}>
        <PaginationLink isActive={p === 1}>{p}</PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem><PaginationNext /></PaginationItem>
  </PaginationContent>
</Pagination>`,
  prevNextOnly: `// Minimal — just step buttons + a caption. Best for infinite-scroll fallback.
<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious /></PaginationItem>
    <span className="px-3 text-sm text-muted-foreground">Page 3 of 12</span>
    <PaginationItem><PaginationNext /></PaginationItem>
  </PaginationContent>
</Pagination>`,
  firstLast: `<PaginationItem><PaginationFirst /></PaginationItem>
<PaginationItem><PaginationPrevious /></PaginationItem>
{/* page numbers */}
<PaginationItem><PaginationNext /></PaginationItem>
<PaginationItem><PaginationLast /></PaginationItem>`,
  pageSize: `// Page-size selector alongside the controls.
<div className="flex items-center justify-between gap-4">
  <span className="text-sm text-muted-foreground">Rows per page</span>
  <Select value="20" onValueChange={setPageSize}>
    <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
    <SelectContent>
      <SelectItem value="10">10</SelectItem>
      <SelectItem value="20">20</SelectItem>
      <SelectItem value="50">50</SelectItem>
    </SelectContent>
  </Select>
</div>`,
  withCaption: `// Caption above the controls — gives users a sense of scale.
<div className="flex flex-col items-center gap-2">
  <p className="text-xs text-muted-foreground tabular-nums">
    Showing 21–40 of 247 tickets
  </p>
  <Pagination>{/* ... */}</Pagination>
</div>`,
  disabledEdges: `// aria-disabled on edge buttons — pointer-events drop automatically.
<PaginationItem>
  <PaginationPrevious aria-disabled={page === 0} />
</PaginationItem>
<PaginationItem>
  <PaginationNext aria-disabled={page === pageCount - 1} />
</PaginationItem>`,
}

/* ── Live demo bits ── */

function buildPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i)
  const pages: (number | "ellipsis")[] = [0]
  const start = Math.max(1, current - 1)
  const end = Math.min(total - 2, current + 1)
  if (start > 1) pages.push("ellipsis")
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 2) pages.push("ellipsis")
  pages.push(total - 1)
  return pages
}

function NumberedExample() {
  const [page, setPage] = useState(0)
  const total = 12
  const list = buildPageList(page, total)
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page === 0}
            onClick={(e) => {
              e.preventDefault()
              setPage((p) => Math.max(0, p - 1))
            }}
          />
        </PaginationItem>
        {list.map((p, i) => (
          <PaginationItem key={`${p}-${i}`}>
            {p === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault()
                  setPage(p)
                }}
              >
                {p + 1}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            aria-disabled={page === total - 1}
            onClick={(e) => {
              e.preventDefault()
              setPage((p) => Math.min(total - 1, p + 1))
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function FirstLastExample() {
  const [page, setPage] = useState(5)
  const total = 12
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst aria-disabled={page === 0} onClick={(e) => { e.preventDefault(); setPage(0) }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious aria-disabled={page === 0} onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(0, p - 1)) }} />
        </PaginationItem>
        <span className="px-3 text-sm text-muted-foreground tabular-nums">
          Page {page + 1} of {total}
        </span>
        <PaginationItem>
          <PaginationNext aria-disabled={page === total - 1} onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(total - 1, p + 1)) }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast aria-disabled={page === total - 1} onClick={(e) => { e.preventDefault(); setPage(total - 1) }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function PageSizeExample() {
  const [pageSize, setPageSize] = useState("20")
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">Rows per page</span>
      <Select value={pageSize} onValueChange={setPageSize}>
        <SelectTrigger className="w-[80px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "Pagination",
      type: "nav",
      description: "Outer landmark. Renders <nav role=\"navigation\" aria-label=\"pagination\">.",
    },
    {
      name: "PaginationContent",
      type: "ul",
      description: "Flex container for items. Sets the inline rhythm and gap.",
    },
    {
      name: "PaginationItem",
      type: "li",
      description: "Single page item or control. Wraps a Link, Previous, Next, etc.",
    },
    {
      name: "PaginationLink.isActive",
      type: "boolean",
      description: "Marks the current page. Sets aria-current=\"page\" and applies the active style.",
    },
    {
      name: "PaginationLink.size",
      type: '"sm" | "md"',
      defaultValue: '"md"',
      description: "Visual size. sm fits in dense data-table footers; md is the default.",
    },
    {
      name: "PaginationPrevious / PaginationNext",
      type: "PaginationLink",
      description: "Convenience shortcuts with a built-in chevron and aria-label. Pass aria-disabled to lock at the edges of the range.",
    },
    {
      name: "PaginationFirst / PaginationLast",
      type: "PaginationLink",
      description: "Skip-to-end shortcuts. Use when the user has more than ~10 pages and jumping is faster than clicking through.",
    },
    {
      name: "PaginationEllipsis",
      type: "span",
      description: "Decorative \"more pages\" indicator with sr-only label. Don't make it clickable on its own — pair with a Dropdown if users need to jump.",
    },
  ]
}

/* ── Page ── */

export default function PaginationPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.pagination.title")}
      description={t("docs.pagination.description")}
      category={t("docs.pagination.category")}
    >
      <Section title={t("docs.pagination.preview.title")} description={t("docs.pagination.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <NumberedExample />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.pagination.installation.title")} description={t("docs.pagination.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.pagination.installation.filename")} />
      </Section>

      <Section title={t("docs.pagination.usage.title")} description={t("docs.pagination.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.pagination.examples.title")} description={t("docs.pagination.examples.description")}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.pagination.examples.numbered.label")}
            description={t("docs.pagination.examples.numbered.description")}
            code={EXAMPLE_SNIPPETS.numbered}
            className="lg:col-span-2"
          >
            <NumberedExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.pagination.examples.prevNextOnly.label")}
            description={t("docs.pagination.examples.prevNextOnly.description")}
            code={EXAMPLE_SNIPPETS.prevNextOnly}
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious /></PaginationItem>
                <span className="px-3 text-sm text-muted-foreground tabular-nums">Page 3 of 12</span>
                <PaginationItem><PaginationNext /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.pagination.examples.firstLast.label")}
            description={t("docs.pagination.examples.firstLast.description")}
            code={EXAMPLE_SNIPPETS.firstLast}
          >
            <FirstLastExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.pagination.examples.pageSize.label")}
            description={t("docs.pagination.examples.pageSize.description")}
            code={EXAMPLE_SNIPPETS.pageSize}
          >
            <PageSizeExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.pagination.examples.withCaption.label")}
            description={t("docs.pagination.examples.withCaption.description")}
            code={EXAMPLE_SNIPPETS.withCaption}
          >
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-muted-foreground tabular-nums">
                Showing 21–40 of 247 tickets
              </p>
              <NumberedExample />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.pagination.examples.disabledEdges.label")}
            description={t("docs.pagination.examples.disabledEdges.description")}
            code={EXAMPLE_SNIPPETS.disabledEdges}
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious aria-disabled /></PaginationItem>
                <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink>2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.pagination.props.title")} description={t("docs.pagination.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.pagination.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.pagination.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.pagination.accessibility.items.landmark")}</li>
          <li>{t("docs.pagination.accessibility.items.current")}</li>
          <li>{t("docs.pagination.accessibility.items.disabled")}</li>
          <li>{t("docs.pagination.accessibility.items.ellipsis")}</li>
          <li>{t("docs.pagination.accessibility.items.tabular")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.pagination.related.title")}
        items={[
          { label: "Table", href: "/ui/table" },
          { label: "Card", href: "/cards" },
          { label: "Button", href: "/buttons" },
        ]}
      />
    </ComponentPage>
  )
}
