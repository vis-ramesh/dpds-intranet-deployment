import { useTranslation } from "react-i18next"
import { ChevronRight, Home, Slash } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@dpds-gov/design-system"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@dpds-gov/design-system"

export function TicketBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/tickets">Tickets</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/tickets/open">Open</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>REQ-2025-0142</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`

const PREVIEW_SNIPPET = `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/tickets">Tickets</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/tickets/open">Open</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>REQ-2025-0142</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`

const EXAMPLE_SNIPPETS = {
  default: PREVIEW_SNIPPET,
  withHome: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">
        <Home className="size-3.5" />
        <span className="sr-only">Home</span>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/customers">Customers</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Al Futtaim Trading</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  customSeparator: `// BreadcrumbSeparator renders "/" by default; pass any node as children to override.
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/services">Services</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/services/licensing">Trade licensing</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Renewal</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  truncated: `// When the trail is long, collapse the middle into an ellipsis.
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/tickets/REQ-2025-0142">REQ-2025-0142</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Activity log</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  withDropdown: `// Pair the ellipsis with a Dropdown so users can jump to the collapsed steps.
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1">
          <BreadcrumbEllipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Services</DropdownMenuItem>
          <DropdownMenuItem>Trade licensing</DropdownMenuItem>
          <DropdownMenuItem>Renewals</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Q4 batch</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  currentNonClickable: `// BreadcrumbPage renders as a span with aria-current="page" and no href.
// Don't render the current step as a link — users have nowhere new to go.
<BreadcrumbItem>
  <BreadcrumbPage>Activity log</BreadcrumbPage>
</BreadcrumbItem>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "Breadcrumb",
      type: "nav",
      description: "Outer landmark. Renders <nav aria-label=\"breadcrumb\"> — screen readers announce the trail as a navigation region.",
    },
    {
      name: "BreadcrumbList",
      type: "ol",
      description: "Ordered list wrapping the items. Provides the visual rhythm and the semantic order.",
    },
    {
      name: "BreadcrumbItem",
      type: "li",
      description: "Single step. Wraps a Link or Page. Inline-flex so leading icons sit on the baseline.",
    },
    {
      name: "BreadcrumbLink",
      type: "a (via render slot)",
      description: "Clickable step. Pass an actual <a> via the render prop when integrating with a router (e.g. react-router-dom Link).",
    },
    {
      name: "BreadcrumbPage",
      type: "span",
      description: "Current page. Non-clickable; renders aria-current=\"page\" so assistive tech announces \"current page\".",
    },
    {
      name: "BreadcrumbSeparator",
      type: "li",
      description: "Visual divider. Renders \"/\" by default; pass any node as children to override (e.g. <ChevronRight />). aria-hidden so it's not read.",
    },
    {
      name: "BreadcrumbEllipsis",
      type: "span",
      description: "Collapsed-middle indicator (three dots). Pair with a Dropdown if the user should be able to expand the truncated steps.",
    },
  ]
}

/* ── Page ── */

export default function BreadcrumbPageDocs() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.breadcrumb.title")}
      description={t("docs.breadcrumb.description")}
      category={t("docs.breadcrumb.category")}
    >
      <Section title={t("docs.breadcrumb.preview.title")} description={t("docs.breadcrumb.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#tickets">Tickets</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#tickets-open">Open</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>REQ-2025-0142</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.breadcrumb.installation.title")} description={t("docs.breadcrumb.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.breadcrumb.installation.filename")} />
      </Section>

      <Section title={t("docs.breadcrumb.usage.title")} description={t("docs.breadcrumb.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.breadcrumb.examples.title")} description={t("docs.breadcrumb.examples.description")}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.breadcrumb.examples.default.label")}
            description={t("docs.breadcrumb.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#tickets">Tickets</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#tickets-open">Open</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>REQ-2025-0142</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.breadcrumb.examples.withHome.label")}
            description={t("docs.breadcrumb.examples.withHome.description")}
            code={EXAMPLE_SNIPPETS.withHome}
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#home" className="inline-flex items-center">
                    <Home className="size-3.5" />
                    <span className="sr-only">Home</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#customers">Customers</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Al Futtaim Trading</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.breadcrumb.examples.customSeparator.label")}
            description={t("docs.breadcrumb.examples.customSeparator.description")}
            code={EXAMPLE_SNIPPETS.customSeparator}
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#services">Services</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#trade">Trade licensing</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Renewal</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-3 text-xs text-muted-foreground">
              You can also use any other glyph — e.g. <Slash className="inline size-3" /> for a slash separator.
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.breadcrumb.examples.truncated.label")}
            description={t("docs.breadcrumb.examples.truncated.description")}
            code={EXAMPLE_SNIPPETS.truncated}
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#req">REQ-2025-0142</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Activity log</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.breadcrumb.examples.withDropdown.label")}
            description={t("docs.breadcrumb.examples.withDropdown.description")}
            code={EXAMPLE_SNIPPETS.withDropdown}
            className="lg:col-span-2"
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-foreground">
                      <BreadcrumbEllipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Services</DropdownMenuItem>
                      <DropdownMenuItem>Trade licensing</DropdownMenuItem>
                      <DropdownMenuItem>Renewals</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Q4 batch</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.breadcrumb.examples.currentNonClickable.label")}
            description={t("docs.breadcrumb.examples.currentNonClickable.description")}
            code={EXAMPLE_SNIPPETS.currentNonClickable}
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Activity log</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.breadcrumb.props.title")} description={t("docs.breadcrumb.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.breadcrumb.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.breadcrumb.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.breadcrumb.accessibility.items.landmark")}</li>
          <li>{t("docs.breadcrumb.accessibility.items.current")}</li>
          <li>{t("docs.breadcrumb.accessibility.items.separator")}</li>
          <li>{t("docs.breadcrumb.accessibility.items.iconOnly")}</li>
          <li>{t("docs.breadcrumb.accessibility.items.truncate")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.breadcrumb.related.title")}
        items={[
          { label: "Navbar", href: "/ui/navbar" },
          { label: "Tabs", href: "/ui/tabs" },
          { label: "Menu", href: "/ui/navigation-menu" },
        ]}
      />
    </ComponentPage>
  )
}
