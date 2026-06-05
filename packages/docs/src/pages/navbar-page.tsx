import { useTranslation } from "react-i18next"
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, User } from "lucide-react"

import {
  Navbar,
  NavbarBrand,
  NavbarLink,
  NavbarLinks,
  NavbarSearch,
  NavbarTrailing,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { Avatar, AvatarFallback } from "@dpds-gov/design-system"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@dpds-gov/design-system"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  Navbar,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarSearch,
  NavbarTrailing,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import {
  Navbar,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarTrailing,
} from "@dpds-gov/design-system"

export function AppHeader() {
  return (
    <Navbar sticky>
      <NavbarBrand>
        <Logo className="size-5" />
        Service Portal
      </NavbarBrand>
      <NavbarLinks>
        <NavbarLink href="/dashboard" active>Dashboard</NavbarLink>
        <NavbarLink href="/tickets">Tickets</NavbarLink>
        <NavbarLink href="/customers">Customers</NavbarLink>
      </NavbarLinks>
      <NavbarTrailing>
        <Button variant="text" size="sm"><Bell className="size-4" /></Button>
        <Avatar size="sm"><AvatarFallback>AH</AvatarFallback></Avatar>
      </NavbarTrailing>
    </Navbar>
  )
}`

const PREVIEW_SNIPPET = `<Navbar>
  <NavbarBrand>Service Portal</NavbarBrand>
  <NavbarLinks>
    <NavbarLink href="/dashboard" active>Dashboard</NavbarLink>
    <NavbarLink href="/tickets">Tickets</NavbarLink>
    <NavbarLink href="/customers">Customers</NavbarLink>
  </NavbarLinks>
  <NavbarTrailing>
    <Avatar size="sm"><AvatarFallback>AH</AvatarFallback></Avatar>
  </NavbarTrailing>
</Navbar>`

const EXAMPLE_SNIPPETS = {
  basic: PREVIEW_SNIPPET,
  withSearch: `<Navbar>
  <NavbarBrand>Service Portal</NavbarBrand>
  <NavbarSearch>
    <InputGroup className="h-9">
      <InputGroupAddon>
        <InputGroupText><Search /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search tickets, customers..." />
    </InputGroup>
  </NavbarSearch>
  <NavbarTrailing>
    <Avatar size="sm"><AvatarFallback>AH</AvatarFallback></Avatar>
  </NavbarTrailing>
</Navbar>`,
  withUserMenu: `<NavbarTrailing>
  <Button variant="text" size="sm" aria-label="Notifications">
    <Bell className="size-4" />
  </Button>
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-2">
      <Avatar size="sm"><AvatarFallback>AH</AvatarFallback></Avatar>
      <span className="hidden text-sm font-medium md:inline">Amal Hassan</span>
      <ChevronDown className="size-4 text-muted-foreground" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel>My account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem><User className="size-4" />Profile</DropdownMenuItem>
      <DropdownMenuItem><Settings className="size-4" />Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem><LogOut className="size-4" />Sign out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</NavbarTrailing>`,
  sticky: `// Pass sticky to pin the Navbar at the top of its scroll container.
<div className="overflow-y-auto max-h-screen">
  <Navbar sticky>
    {/* ... */}
  </Navbar>
  <main>{/* page content */}</main>
</div>`,
  mobileCollapsed: `// Hide NavbarLinks below md; show a menu trigger that opens a Sheet.
<Navbar>
  <Button variant="text" size="sm" className="md:hidden" aria-label="Open menu">
    <Menu className="size-5" />
  </Button>
  <NavbarBrand>Service Portal</NavbarBrand>
  <NavbarLinks>
    <NavbarLink href="/dashboard" active>Dashboard</NavbarLink>
    <NavbarLink href="/tickets">Tickets</NavbarLink>
  </NavbarLinks>
  <NavbarTrailing>
    <Avatar size="sm"><AvatarFallback>AH</AvatarFallback></Avatar>
  </NavbarTrailing>
</Navbar>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "Navbar",
      type: "header",
      description: "Outer header row — h-14 with a bottom border. Renders as <header> so it's a real landmark.",
    },
    {
      name: "Navbar.sticky",
      type: "boolean",
      defaultValue: "false",
      description: "Pin to the top of the scroll container. Pair with a parent that scrolls (or apply on the page body).",
    },
    {
      name: "NavbarBrand",
      type: "div",
      description: "Logo + product name slot. Shrinks to fit; flex-row with a small gap.",
    },
    {
      name: "NavbarLinks",
      type: "nav",
      description: "Horizontal nav-link row. Hidden below md by default — drive your own mobile menu (Sheet, Dialog) at that breakpoint.",
    },
    {
      name: "NavbarLink",
      type: "a",
      description: "Single nav link. Pass active to mark the current route — sets aria-current=\"page\" and applies the active style.",
    },
    {
      name: "NavbarSearch",
      type: "div",
      description: "Optional search slot. Lays out a flex-1 max-w-md container — drop an Input or Combobox trigger inside.",
    },
    {
      name: "NavbarTrailing",
      type: "div",
      description: "Pushes right via ms-auto. Holds notification icons, user avatar dropdown, and other actions.",
    },
  ]
}

/* ── Live demo bits ── */

function NavbarPreview({
  withSearch = false,
  withUserMenu = false,
  withMobileTrigger = false,
  sticky = false,
}: {
  withSearch?: boolean
  withUserMenu?: boolean
  withMobileTrigger?: boolean
  sticky?: boolean
}) {
  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-border">
      <Navbar sticky={sticky}>
        {withMobileTrigger && (
          <Button variant="text" size="sm" className="md:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
        )}
        <NavbarBrand>
          <div className="size-5 rounded bg-primary" aria-hidden />
          Service Portal
        </NavbarBrand>
        {withSearch ? (
          <NavbarSearch>
            <InputGroup className="h-9">
              <InputGroupAddon>
                <InputGroupText><Search /></InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="Search tickets, customers..." />
            </InputGroup>
          </NavbarSearch>
        ) : (
          <NavbarLinks>
            <NavbarLink href="#dashboard" active>Dashboard</NavbarLink>
            <NavbarLink href="#tickets">Tickets</NavbarLink>
            <NavbarLink href="#customers">Customers</NavbarLink>
          </NavbarLinks>
        )}
        <NavbarTrailing>
          {withUserMenu ? (
            <>
              <Button variant="text" size="sm" aria-label="Notifications">
                <Bell className="size-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted">
                  <Avatar size="sm">
                    <AvatarFallback>AH</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium md:inline">Amal Hassan</span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="size-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="size-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="size-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Avatar size="sm">
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
          )}
        </NavbarTrailing>
      </Navbar>
      {sticky && (
        <div className="bg-muted/30 p-6 text-center text-sm text-muted-foreground">
          Page body — try scrolling this container to see the Navbar stay pinned.
        </div>
      )}
    </div>
  )
}

/* ── Page ── */

export default function NavbarPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.navbar.title")}
      description={t("docs.navbar.description")}
      category={t("docs.navbar.category")}
    >
      <Section title={t("docs.navbar.preview.title")} description={t("docs.navbar.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <NavbarPreview />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.navbar.installation.title")} description={t("docs.navbar.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.navbar.installation.filename")} />
      </Section>

      <Section title={t("docs.navbar.usage.title")} description={t("docs.navbar.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.navbar.examples.title")} description={t("docs.navbar.examples.description")}>
        <div className="grid grid-cols-1 gap-4">
          <PreviewBlock
            title={t("docs.navbar.examples.basic.label")}
            description={t("docs.navbar.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <NavbarPreview />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.navbar.examples.withSearch.label")}
            description={t("docs.navbar.examples.withSearch.description")}
            code={EXAMPLE_SNIPPETS.withSearch}
          >
            <NavbarPreview withSearch />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.navbar.examples.withUserMenu.label")}
            description={t("docs.navbar.examples.withUserMenu.description")}
            code={EXAMPLE_SNIPPETS.withUserMenu}
          >
            <NavbarPreview withUserMenu />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.navbar.examples.sticky.label")}
            description={t("docs.navbar.examples.sticky.description")}
            code={EXAMPLE_SNIPPETS.sticky}
          >
            <NavbarPreview sticky />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.navbar.examples.mobileCollapsed.label")}
            description={t("docs.navbar.examples.mobileCollapsed.description")}
            code={EXAMPLE_SNIPPETS.mobileCollapsed}
          >
            <NavbarPreview withMobileTrigger />
            <p className="mt-2 text-xs text-muted-foreground">
              Resize this preview below the md breakpoint to see the menu trigger appear and the NavbarLinks hide.
            </p>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.navbar.props.title")} description={t("docs.navbar.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.navbar.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.navbar.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.navbar.accessibility.items.landmark")}</li>
          <li>{t("docs.navbar.accessibility.items.current")}</li>
          <li>{t("docs.navbar.accessibility.items.mobile")}</li>
          <li>{t("docs.navbar.accessibility.items.skipLink")}</li>
          <li>{t("docs.navbar.accessibility.items.search")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "spacing", "typography", "elevation"]} />

      <RelatedLinks
        title={t("docs.navbar.related.title")}
        items={[
          { label: "Sidebar", href: "/ui/sidebar" },
          { label: "Breadcrumb", href: "/ui/breadcrumb" },
          { label: "Menu", href: "/ui/navigation-menu" },
        ]}
      />
    </ComponentPage>
  )
}
