import { type ReactNode } from "react"
import {
  AlertTriangle,
  ChevronRight,
  Inbox,
  LayoutDashboard,
  Mail,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  User,
  Users,
} from "lucide-react"
import { useTranslation } from "react-i18next"

import { cn } from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"
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

/* ── Mock primitives used by the docs previews only.

   The real Sidebar lives in src/components/ui/sidebar.tsx and depends on a
   SidebarProvider context + fixed positioning that fights the docs layout.
   These mock components reproduce the *visual* anatomy so the previews can
   sit inside a bordered container; the API/code snippets below remain the
   source of truth for using the real component. ── */

function SidebarShell({ children, className, width = 260 }: { children: ReactNode; className?: string; width?: number }) {
  return (
    <div
      className={cn(
        "flex flex-col bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden text-sm",
        className
      )}
      style={{ width }}
    >
      {children}
    </div>
  )
}

function SidebarHeaderMock({ children }: { children: ReactNode }) {
  return <div className="px-3 py-3 border-b border-gray-100 dark:border-slate-800 font-mono font-semibold text-xs uppercase tracking-wider text-gray-500">{children}</div>
}

function SidebarSection({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="px-2 py-2">
      {label && <p className="px-2 py-1 text-[10px] uppercase tracking-wider font-mono text-gray-500">{label}</p>}
      <ul className="flex flex-col gap-0.5">{children}</ul>
    </div>
  )
}

function SidebarItem({
  icon: Icon,
  label,
  badge,
  active,
  collapsed,
}: {
  icon: typeof LayoutDashboard
  label: string
  badge?: string
  active?: boolean
  collapsed?: boolean
}) {
  return (
    <li>
      <div
        className={cn(
          "flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors",
          active && "bg-primary-50 dark:bg-primary/20 text-primary-700 dark:text-primary-300 font-medium"
        )}
      >
        <Icon className="size-4 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{label}</span>
            {badge && <span className="text-[10px] rounded bg-gray-200 dark:bg-slate-700 px-1.5">{badge}</span>}
          </>
        )}
      </div>
    </li>
  )
}

function SidebarFooterMock({ children }: { children: ReactNode }) {
  return <div className="mt-auto px-3 py-3 border-t border-gray-100 dark:border-slate-800">{children}</div>
}

/* ── Snippets ── */

const INSTALL_SNIPPET = `import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuBadge,
  SidebarTrigger,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@dpds-gov/design-system"
import { LayoutDashboard, Inbox } from "lucide-react"

// Wrap your app once at the top of the layout.
export function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <LayoutDashboard /> Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Inbox /> Inbox
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main>{children}</main>
    </SidebarProvider>
  )
}`

const PREVIEW_SNIPPET = `<SidebarProvider>
  <Sidebar>
    <SidebarHeader>Service Portal</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>`

const EXAMPLE_SNIPPETS = {
  collapsible: `<Sidebar collapsible="icon">
  {/* ... */}
</Sidebar>

// Toggle programmatically:
const { toggleSidebar } = useSidebar()
<SidebarTrigger onClick={toggleSidebar} />`,
  sectionsDividers: `<SidebarContent>
  <SidebarGroup>
    <SidebarGroupLabel>Workspace</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>...</SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
  <SidebarSeparator />
  <SidebarGroup>
    <SidebarGroupLabel>Team</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>...</SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</SidebarContent>`,
  nested: `<SidebarMenuItem>
  <SidebarMenuButton>Services</SidebarMenuButton>
  <SidebarMenuSub>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton>Inquiry detail</SidebarMenuSubButton>
    </SidebarMenuSubItem>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton>Request detail</SidebarMenuSubButton>
    </SidebarMenuSubItem>
  </SidebarMenuSub>
</SidebarMenuItem>`,
  badges: `<SidebarMenuItem>
  <SidebarMenuButton>
    <Inbox /> Inbox
  </SidebarMenuButton>
  <SidebarMenuBadge>12</SidebarMenuBadge>
</SidebarMenuItem>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "SidebarProvider.defaultOpen",
      type: "boolean",
      defaultValue: "true",
      description: "Initial open state. Persisted to a cookie so the user's preference survives reloads.",
    },
    {
      name: "SidebarProvider.open",
      type: "boolean",
      description: "Controlled open state. Pair with onOpenChange. Omit for cookie-persisted default behavior.",
    },
    {
      name: "SidebarProvider.onOpenChange",
      type: "(open: boolean) => void",
      description: "Fires when the sidebar opens or closes (desktop expand/collapse or mobile sheet open/close).",
    },
    {
      name: "Sidebar.side",
      type: '"left" | "right"',
      defaultValue: '"left"',
      description: "Which edge the sidebar docks to. Use 'right' for RTL languages or supplementary panels.",
    },
    {
      name: "Sidebar.variant",
      type: '"sidebar" | "floating" | "inset"',
      defaultValue: '"sidebar"',
      description: "Visual style. 'floating' adds a card-like shadow; 'inset' pushes the main content into a rounded inset.",
    },
    {
      name: "Sidebar.collapsible",
      type: '"offcanvas" | "icon" | "none"',
      defaultValue: '"offcanvas"',
      description: "Collapse mode on desktop. 'icon' shrinks to a rail of icons; 'offcanvas' slides off-screen; 'none' disables collapse.",
    },
    {
      name: "SidebarMenuButton.isActive",
      type: "boolean",
      defaultValue: "false",
      description: "Highlights the item as the current route. Pair with react-router's NavLink + useLocation for automatic active-state.",
    },
    {
      name: "SidebarMenuButton.tooltip",
      type: "string | ComponentProps<typeof Tooltip>",
      description: "Tooltip shown when the sidebar is collapsed to icon mode. Pass a string for the simple case.",
    },
    {
      name: "useSidebar()",
      type: '() => { state: "expanded" | "collapsed"; open: boolean; setOpen(open: boolean): void; toggleSidebar(): void; isMobile: boolean }',
      description: "Hook for reading and updating sidebar state from any descendant.",
    },
  ]
}

/* ── Page ── */

export default function SidebarDocsPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.sidebar.title")}
      description={t("docs.sidebar.description")}
      category={t("docs.sidebar.category")}
    >
      <Section title={t("docs.sidebar.preview.title")} description={t("docs.sidebar.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET} center={false}>
          <SidebarShell>
            <SidebarHeaderMock>Service Portal</SidebarHeaderMock>
            <SidebarSection>
              <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
              <SidebarItem icon={Inbox} label="Inbox" />
              <SidebarItem icon={Mail} label="Email templates" />
              <SidebarItem icon={Users} label="Customers" />
              <SidebarItem icon={Settings} label="Settings" />
            </SidebarSection>
          </SidebarShell>
        </PreviewBlock>
        <p className="text-xs text-muted-foreground mt-2">
          The previews on this page are styled mocks that mirror the real Sidebar visual. The actual `Sidebar` component
          uses fixed positioning + a SidebarProvider context — see the live app's left rail for the real thing.
        </p>
      </Section>

      <Section title={t("docs.sidebar.installation.title")} description={t("docs.sidebar.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.sidebar.installation.filename")} />
      </Section>

      <Section title={t("docs.sidebar.usage.title")} description={t("docs.sidebar.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.sidebar.examples.title")} description={t("docs.sidebar.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.sidebar.examples.collapsible.label")}
            description={t("docs.sidebar.examples.collapsible.description")}
            code={EXAMPLE_SNIPPETS.collapsible}
            center={false}
          >
            <div className="flex gap-4 items-start">
              <SidebarShell>
                <SidebarHeaderMock>
                  <div className="flex items-center justify-between">
                    <span>Service Portal</span>
                    <PanelLeftClose className="size-3.5" />
                  </div>
                </SidebarHeaderMock>
                <SidebarSection>
                  <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
                  <SidebarItem icon={Inbox} label="Inbox" />
                  <SidebarItem icon={Settings} label="Settings" />
                </SidebarSection>
              </SidebarShell>
              <SidebarShell width={56}>
                <SidebarHeaderMock>
                  <PanelLeftOpen className="size-3.5" />
                </SidebarHeaderMock>
                <SidebarSection>
                  <SidebarItem icon={LayoutDashboard} label="" active collapsed />
                  <SidebarItem icon={Inbox} label="" collapsed />
                  <SidebarItem icon={Settings} label="" collapsed />
                </SidebarSection>
              </SidebarShell>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.sidebar.examples.sectionsDividers.label")}
            description={t("docs.sidebar.examples.sectionsDividers.description")}
            code={EXAMPLE_SNIPPETS.sectionsDividers}
            center={false}
          >
            <SidebarShell>
              <SidebarHeaderMock>Service Portal</SidebarHeaderMock>
              <SidebarSection label="Workspace">
                <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
                <SidebarItem icon={Inbox} label="Inbox" />
              </SidebarSection>
              <div className="mx-3 border-t border-gray-100 dark:border-slate-800" />
              <SidebarSection label="Team">
                <SidebarItem icon={Users} label="Customers" />
                <SidebarItem icon={Mail} label="Email templates" />
              </SidebarSection>
            </SidebarShell>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.sidebar.examples.nested.label")}
            description={t("docs.sidebar.examples.nested.description")}
            code={EXAMPLE_SNIPPETS.nested}
            center={false}
          >
            <SidebarShell>
              <SidebarHeaderMock>Service Portal</SidebarHeaderMock>
              <SidebarSection>
                <SidebarItem icon={LayoutDashboard} label="Dashboard" />
                <li>
                  <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-gray-700 dark:text-slate-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800">
                    <Inbox className="size-4" />
                    <span className="flex-1">Services</span>
                    <ChevronRight className="size-3.5 rotate-90 opacity-60" />
                  </div>
                  <ul className="ms-6 mt-0.5 border-s border-gray-200 dark:border-slate-700 ps-2 flex flex-col gap-0.5">
                    <li className="rounded-md px-2 py-1 text-xs text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800">Inquiry detail</li>
                    <li className="rounded-md px-2 py-1 text-xs text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800">Request detail</li>
                    <li className="rounded-md px-2 py-1 text-xs text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary/20 font-medium">Confirmation</li>
                  </ul>
                </li>
              </SidebarSection>
            </SidebarShell>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.sidebar.examples.badges.label")}
            description={t("docs.sidebar.examples.badges.description")}
            code={EXAMPLE_SNIPPETS.badges}
            center={false}
          >
            <SidebarShell>
              <SidebarHeaderMock>Service Portal</SidebarHeaderMock>
              <SidebarSection>
                <SidebarItem icon={LayoutDashboard} label="Dashboard" />
                <SidebarItem icon={Inbox} label="Inbox" badge="12" />
                <SidebarItem icon={AlertTriangle} label="SLA breaches" badge="3" />
                <SidebarItem icon={Mail} label="Drafts" badge="—" />
              </SidebarSection>
              <SidebarFooterMock>
                <div className="flex items-center gap-2">
                  <span className="size-8 rounded-full bg-primary-50 dark:bg-primary/20 flex items-center justify-center">
                    <User className="size-4 text-primary-700 dark:text-primary-300" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">Khalifa Mohammed</p>
                    <p className="text-[10px] text-muted-foreground truncate">First Lieutenant</p>
                  </div>
                </div>
              </SidebarFooterMock>
            </SidebarShell>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.sidebar.examples.activeState.label")}
            description={t("docs.sidebar.examples.activeState.description")}
            code={`<SidebarMenuButton asChild isActive={isActive}>
  <NavLink to="/dashboard">
    <LayoutDashboard />
    Dashboard
  </NavLink>
</SidebarMenuButton>`}
            center={false}
          >
            <SidebarShell>
              <SidebarHeaderMock>Service Portal</SidebarHeaderMock>
              <SidebarSection>
                <SidebarItem icon={LayoutDashboard} label="Dashboard" />
                <SidebarItem icon={Inbox} label="Inbox" />
                <SidebarItem icon={Mail} label="Email templates" />
                <SidebarItem icon={Users} label="Customers" active />
                <SidebarItem icon={Settings} label="Settings" />
              </SidebarSection>
            </SidebarShell>
            <Badge variant="outline" className="text-[10px]">isActive on "Customers"</Badge>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.sidebar.props.title")} description={t("docs.sidebar.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.sidebar.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.sidebar.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.sidebar.accessibility.items.shortcut")}</li>
          <li>{t("docs.sidebar.accessibility.items.landmark")}</li>
          <li>{t("docs.sidebar.accessibility.items.tooltip")}</li>
          <li>{t("docs.sidebar.accessibility.items.current")}</li>
          <li>{t("docs.sidebar.accessibility.items.mobile")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "spacing", "typography", "iconography", "radius"]} />

      <RelatedLinks
        title={t("docs.sidebar.related.title")}
        items={[
          { label: "Navbar", href: "/ui/navbar" },
          { label: "Breadcrumb", href: "/ui/breadcrumb" },
          { label: "Menu", href: "/ui/navigation-menu" },
        ]}
      />
    </ComponentPage>
  )
}
