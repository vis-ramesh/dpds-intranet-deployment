import { useTranslation } from "react-i18next"
import { BookOpen, FileText, LifeBuoy, Settings, ShieldCheck, Ticket } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@dpds-gov/design-system"

export function PortalNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-3 md:grid-cols-2">
              <li>
                <NavigationMenuLink href="/services/licensing">
                  <ShieldCheck />
                  Trade licensing
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/services/visas">
                  <FileText />
                  Residency visas
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/tickets">Tickets</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`

const PREVIEW_SNIPPET = `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Services</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* grid of NavigationMenuLink items */}
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/tickets">Tickets</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/customers">Customers</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`

const EXAMPLE_SNIPPETS = {
  basic: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/tickets">Tickets</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/customers">Customers</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  withContent: `<NavigationMenuItem>
  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
  <NavigationMenuContent>
    <ul className="grid w-[420px] gap-2 p-3 md:grid-cols-2">
      <li>
        <NavigationMenuLink href="/services/licensing">
          <ShieldCheck />
          Trade licensing
        </NavigationMenuLink>
      </li>
      <li>
        <NavigationMenuLink href="/services/visas">
          <FileText />
          Residency visas
        </NavigationMenuLink>
      </li>
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>`,
  withIcons: `<NavigationMenuLink href="/docs">
  <BookOpen />
  Documentation
</NavigationMenuLink>
<NavigationMenuLink href="/support">
  <LifeBuoy />
  Support
</NavigationMenuLink>`,
  active: `// data-active toggles the active style. Provide it from your router.
<NavigationMenuLink href="/tickets" data-active>
  <Ticket />
  Tickets
</NavigationMenuLink>`,
  grouped: `// Content panels can host their own grouped sub-sections.
<NavigationMenuContent>
  <div className="grid w-[520px] gap-4 p-4 md:grid-cols-2">
    <div>
      <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
        Customer-facing
      </h4>
      <ul className="grid gap-1">
        <li><NavigationMenuLink href="/services/licensing">Trade licensing</NavigationMenuLink></li>
        <li><NavigationMenuLink href="/services/visas">Visas</NavigationMenuLink></li>
      </ul>
    </div>
    <div>
      <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
        Internal
      </h4>
      <ul className="grid gap-1">
        <li><NavigationMenuLink href="/services/admin">Admin tools</NavigationMenuLink></li>
        <li><NavigationMenuLink href="/services/audit">Audit log</NavigationMenuLink></li>
      </ul>
    </div>
  </div>
</NavigationMenuContent>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "NavigationMenu",
      type: "base-ui NavigationMenu.Root",
      description: "Outer container. Accepts align prop forwarded to the positioner.",
    },
    {
      name: "NavigationMenuList",
      type: "ul",
      description: "Horizontal list of items. Sets the inline rhythm.",
    },
    {
      name: "NavigationMenuItem",
      type: "li",
      description: "Single top-level entry. Wraps a Trigger or Link.",
    },
    {
      name: "NavigationMenuTrigger",
      type: "button",
      description: "Top-level entry that opens a NavigationMenuContent panel. Renders a built-in chevron that flips when open.",
    },
    {
      name: "NavigationMenuContent",
      type: "div",
      description: "Panel that opens below a Trigger. Layout the children yourself — usually a grid of links.",
    },
    {
      name: "NavigationMenuLink",
      type: "a",
      description: "Clickable navigation row. Use data-active to mark the current page. Lucide icons render at 16px automatically.",
    },
    {
      name: "NavigationMenuIndicator",
      type: "div",
      description: "Decorative arrow that animates under the active Trigger. Optional but adds polish.",
    },
  ]
}

/* ── Page ── */

export default function MenuPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.menu.title")}
      description={t("docs.menu.description")}
      category={t("docs.menu.category")}
    >
      <Section title={t("docs.menu.preview.title")} description={t("docs.menu.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-3 md:grid-cols-2">
                    <li>
                      <NavigationMenuLink href="#licensing">
                        <ShieldCheck />
                        Trade licensing
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#visas">
                        <FileText />
                        Residency visas
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#tickets">Tickets</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#customers">Customers</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.menu.installation.title")} description={t("docs.menu.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.menu.installation.filename")} />
      </Section>

      <Section title={t("docs.menu.usage.title")} description={t("docs.menu.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.menu.examples.title")} description={t("docs.menu.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.menu.examples.basic.label")}
            description={t("docs.menu.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#dashboard">Dashboard</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#tickets">Tickets</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#customers">Customers</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.menu.examples.withContent.label")}
            description={t("docs.menu.examples.withContent.description")}
            code={EXAMPLE_SNIPPETS.withContent}
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[420px] gap-2 p-3 md:grid-cols-2">
                      <li>
                        <NavigationMenuLink href="#licensing">
                          <ShieldCheck />
                          Trade licensing
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink href="#visas">
                          <FileText />
                          Residency visas
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.menu.examples.withIcons.label")}
            description={t("docs.menu.examples.withIcons.description")}
            code={EXAMPLE_SNIPPETS.withIcons}
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#docs">
                    <BookOpen />
                    Documentation
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#support">
                    <LifeBuoy />
                    Support
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#settings">
                    <Settings />
                    Settings
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.menu.examples.active.label")}
            description={t("docs.menu.examples.active.description")}
            code={EXAMPLE_SNIPPETS.active}
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#dashboard">Dashboard</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#tickets" data-active>
                    <Ticket />
                    Tickets
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#customers">Customers</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.menu.examples.grouped.label")}
            description={t("docs.menu.examples.grouped.description")}
            code={EXAMPLE_SNIPPETS.grouped}
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[520px] gap-4 p-4 md:grid-cols-2">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                          Customer-facing
                        </h4>
                        <ul className="grid gap-1">
                          <li>
                            <NavigationMenuLink href="#licensing">Trade licensing</NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink href="#visas">Visas</NavigationMenuLink>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                          Internal
                        </h4>
                        <ul className="grid gap-1">
                          <li>
                            <NavigationMenuLink href="#admin">Admin tools</NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink href="#audit">Audit log</NavigationMenuLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.menu.props.title")} description={t("docs.menu.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.menu.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.menu.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.menu.accessibility.items.landmark")}</li>
          <li>{t("docs.menu.accessibility.items.keyboard")}</li>
          <li>{t("docs.menu.accessibility.items.current")}</li>
          <li>{t("docs.menu.accessibility.items.iconOnly")}</li>
          <li>{t("docs.menu.accessibility.items.dropdown")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.menu.related.title")}
        items={[
          { label: "Command", href: "/ui/command" },
          { label: "Context Menu", href: "/ui/context-menu" },
          { label: "Sidebar", href: "/ui/sidebar" },
        ]}
      />
    </ComponentPage>
  )
}
