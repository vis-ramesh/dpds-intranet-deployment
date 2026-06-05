import {
  Accessibility,
  AlertTriangle,
  BarChart2,
  Bell,
  BookOpen,
  Box,
  CalendarDays,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Command,
  CreditCard,
  Download,
  FileText,
  FileUp,
  Flag,
  FolderTree,
  History,
  Inbox,
  KeyRound,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  List,
  ListOrdered,
  Loader,
  Loader2,
  LogIn,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  Minus,
  Moon,
  MoreHorizontal,
  MousePointer,
  MousePointerClick,
  MoveHorizontal,
  MoveVertical,
  Palette,
  PanelLeft,
  PanelRight,
  Radio,
  Ruler,
  Search,
  SlidersHorizontal,
  Smile,
  Sparkles,
  Square,
  SquareStack,
  Table2,
  Tag,
  ToggleRight,
  Type,
  User,
  UserPlus,
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
  SidebarHeader, SidebarTrigger, useSidebar,
} from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"
// import { ProfileSwitcher } from "@dpds-gov/design-system"
import { useIsRtl } from "@dpds-gov/design-system"

/* ── Types ── */

type ItemStatus = "hold" | "progress" | "done" | "backlog"

type SubItem = { titleKey: string; url: string; icon: LucideIcon; status?: ItemStatus }
type SectionItem = { titleKey: string; url?: string; icon: LucideIcon; status?: ItemStatus; children?: SubItem[] }
type Section = { titleKey: string; items: SectionItem[] }

/* ── Status badge ── */

const STATUS_MAP: Record<ItemStatus, { variant: "warning" | "info" | "success" | "neutral"; label: string }> = {
  hold: { variant: "warning", label: "On hold" },
  progress: { variant: "info", label: "In progress" },
  done: { variant: "success", label: "Done" },
  backlog: { variant: "neutral", label: "Backlog" },
}

function StatusBadge({ status }: { status?: ItemStatus }) {
  if (!status) return null
  const { variant, label } = STATUS_MAP[status]
  return (
    <Badge
      size="sm"
      variant={variant}
      className="ms-auto group-data-[collapsible=icon]:hidden"
    >
      {label}
    </Badge>
  )
}

/* ── Data ── */

// const profileOptions = [
//   { value: "dubai-hq", label: "Dubai Police HQ", description: "Active station", icon: "/img/Dubai-Police-Default-Icon.svg" },
//   { value: "al-barsha", label: "Al Barsha Station", description: "Secondary station", icon: "/img/logo-sm.svg" },
//   { value: "al-barsha1", label: "Al Barsha Station", description: "Secondary station", icon: "/img/logo-sm.svg" },
// ]

const sections: Section[] = [
  {
    titleKey: "sidebar.gettingStarted",
    items: [
      { titleKey: "sidebar.introduction", url: "/docs/introduction", icon: BookOpen, status: "done" },
      { titleKey: "sidebar.projectStructure", url: "/docs/project-structure", icon: FolderTree, status: "done" },
      { titleKey: "sidebar.installation", url: "/docs/installation", icon: Download, status: "done" },
      { titleKey: "sidebar.installationNew", url: "/docs/installation-new", icon: Download, status: "done" },
      { titleKey: "sidebar.theming", url: "/docs/theming", icon: Palette, status: "done" },
      { titleKey: "sidebar.darkMode", url: "/docs/dark-mode", icon: Moon, status: "done" },
      { titleKey: "sidebar.changelog", url: "/docs/changelog", icon: History, status: "done" },
    ],
  },
  {
    titleKey: "sidebar.foundations",
    items: [
      { titleKey: "sidebar.colors", url: "/foundations/colors", icon: Palette, status: "done" },
      { titleKey: "sidebar.typography", url: "/foundations/typography", icon: Type, status: "done" },
      { titleKey: "sidebar.spacing", url: "/foundations/spacing", icon: Ruler, status: "done" },
      { titleKey: "sidebar.iconography", url: "/foundations/iconography", icon: Smile, status: "done" },
      { titleKey: "sidebar.elevation", url: "/foundations/elevation", icon: Layers, status: "progress" },
      { titleKey: "sidebar.radius", url: "/foundations/radius", icon: Square, status: "done" },
      { titleKey: "sidebar.motion", url: "/foundations/motion", icon: Sparkles, status: "done" },
      { titleKey: "sidebar.accessibility", url: "/foundations/accessibility", icon: Accessibility, status: "done" },
    ],
  },
  {
    titleKey: "sidebar.formInput",
    items: [
      { titleKey: "sidebar.button", url: "/buttons", icon: MousePointerClick, status: "done" },
      { titleKey: "sidebar.input", url: "/forms/input", icon: Type, status: "done" },
      { titleKey: "sidebar.inputGroup", url: "/forms/input-group", icon: Type, status: "done" },
      { titleKey: "sidebar.textarea", url: "/forms/textarea", icon: MessageSquare, status: "done" },
      { titleKey: "sidebar.label", url: "/forms/label", icon: Tag, status: "done" },
      { titleKey: "sidebar.select", url: "/forms/select", icon: ListOrdered, status: "progress" },
      { titleKey: "sidebar.combobox", url: "/forms/combobox", icon: Search, status: "done" },
      { titleKey: "sidebar.checkbox", url: "/forms/checkbox", icon: CheckSquare, status: "done" },
      { titleKey: "sidebar.radio", url: "/forms/radio", icon: Radio, status: "done" },
      { titleKey: "sidebar.switch", url: "/forms/switch", icon: ToggleRight, status: "progress" },
      { titleKey: "sidebar.slider", url: "/forms/slider", icon: SlidersHorizontal, status: "progress" },
      { titleKey: "sidebar.datepicker", url: "/forms/datepicker", icon: CalendarDays, status: "progress" },
      { titleKey: "sidebar.inputOtp", url: "/forms/input-otp", icon: KeyRound, status: "done" },
      { titleKey: "sidebar.fileupload", url: "/forms/fileupload", icon: FileUp, status: "progress" },
      { titleKey: "sidebar.form", url: "/forms/form", icon: FileText, status: "done" },
    ],
  },
  {
    titleKey: "sidebar.dataDisplay",
    items: [
      { titleKey: "sidebar.cards", url: "/cards", icon: CreditCard, status: "progress" },
      { titleKey: "sidebar.table", url: "/ui/table", icon: Table2, status: "progress" },
      { titleKey: "sidebar.badges", url: "/ui/badges", icon: Tag, status: "progress" },
      { titleKey: "sidebar.tag", url: "/ui/tag", icon: Tag, status: "progress" },
      { titleKey: "sidebar.avatar", url: "/ui/avatar", icon: User, status: "progress" },
      { titleKey: "sidebar.list", url: "/ui/list", icon: List, status: "progress" },
      { titleKey: "sidebar.stat", url: "/ui/stat", icon: BarChart2, status: "progress" },
      { titleKey: "sidebar.emptyState", url: "/ui/empty-state", icon: Inbox, status: "progress" },
      { titleKey: "sidebar.skeleton", url: "/ui/skeleton", icon: Loader, status: "progress" },
      { titleKey: "sidebar.tooltip", url: "/ui/tooltip", icon: MessageCircle, status: "progress" },
      { titleKey: "sidebar.progressTracker", url: "/ui/progress-tracker", icon: ListOrdered, status: "done" },
      { titleKey: "sidebar.cardWidget", url: "/ui/card-widget", icon: CreditCard, status: "done" },
    ],
  },
  {
    titleKey: "sidebar.navigationCat",
    items: [
      { titleKey: "sidebar.sidebarNav", url: "/ui/sidebar", icon: PanelLeft, status: "progress" },
      { titleKey: "sidebar.navbar", url: "/ui/navbar", icon: Menu, status: "progress" },
      { titleKey: "sidebar.breadcrumb", url: "/ui/breadcrumb", icon: ChevronRight, status: "progress" },
      { titleKey: "sidebar.tabs", url: "/ui/tabs", icon: SquareStack, status: "progress" },
      { titleKey: "sidebar.pagination", url: "/ui/pagination", icon: MoreHorizontal, status: "progress" },
      { titleKey: "sidebar.stepper", url: "/ui/stepper", icon: ListOrdered, status: "progress" },
      { titleKey: "sidebar.command", url: "/ui/command", icon: Command, status: "progress" },
      { titleKey: "sidebar.menu", url: "/ui/navigation-menu", icon: Menu, status: "progress" },
      { titleKey: "sidebar.dropdownMenu", url: "/ui/dropdown-menu", icon: Menu, status: "progress" },
      { titleKey: "sidebar.contextMenu", url: "/ui/context-menu", icon: MousePointer, status: "progress" },
    ],
  },
  {
    titleKey: "sidebar.feedbackOverlay",
    items: [
      { titleKey: "sidebar.alert", url: "/ui/alert", icon: AlertTriangle, status: "progress" },
      { titleKey: "sidebar.banner", url: "/ui/banner", icon: Flag, status: "progress" },
      { titleKey: "sidebar.toast", url: "/ui/toast", icon: Bell, status: "progress" },
      { titleKey: "sidebar.dialog", url: "/ui/modal-popups", icon: Layers, status: "progress" },
      { titleKey: "sidebar.drawer", url: "/ui/drawer", icon: PanelRight, status: "progress" },
      { titleKey: "sidebar.popover", url: "/ui/popover", icon: MessageSquare, status: "progress" },
      { titleKey: "sidebar.hoverCard", url: "/ui/hover-card", icon: MessageCircle, status: "progress" },
      { titleKey: "sidebar.progress", url: "/ui/progress-bar", icon: ListOrdered, status: "progress" },
      { titleKey: "sidebar.spinner", url: "/ui/spinner", icon: Loader2, status: "progress" },
    ],
  },
  {
    titleKey: "sidebar.layout",
    items: [
      { titleKey: "sidebar.container", url: "/ui/container", icon: Box, status: "progress" },
      { titleKey: "sidebar.grid", url: "/ui/grid", icon: LayoutGrid, status: "progress" },
      { titleKey: "sidebar.stack", url: "/ui/stack", icon: Layers, status: "progress" },
      { titleKey: "sidebar.separator", url: "/ui/separator", icon: Minus, status: "progress" },
      { titleKey: "sidebar.accordion", url: "/ui/accordion", icon: ChevronRight, status: "progress" },
      { titleKey: "sidebar.collapsible", url: "/ui/collapsible", icon: ChevronDown, status: "progress" },
      { titleKey: "sidebar.resizable", url: "/ui/resizable", icon: MoveHorizontal, status: "progress" },
      { titleKey: "sidebar.scrollArea", url: "/ui/scroll-area", icon: MoveVertical, status: "progress" },
      { titleKey: "sidebar.aspectRatio", url: "/ui/aspect-ratio", icon: Square, status: "progress" },
      { titleKey: "sidebar.profileSwitcher", url: "/ui/profile-switcher", icon: UserPlus, status: "done" },
    ],
  },
  {
    titleKey: "sidebar.patterns",
    items: [
      {
        titleKey: "sidebar.dashboardsGroup",
        url: "/",
        icon: LayoutDashboard,
        children: [
          { titleKey: "sidebar.dashboard", url: "/", icon: LayoutDashboard, status: "done" },
          { titleKey: "sidebar.analyticsPage", url: "/analytics", icon: BarChart2, status: "done" },
          { titleKey: "sidebar.resizableDashboard", url: "/dashboards/resizable", icon: MoveHorizontal, status: "done" },
        ],
      },
      { titleKey: "sidebar.charts", url: "/charts", icon: BarChart2 },
      { titleKey: "sidebar.login", url: "/patterns/login", icon: LogIn },
      { titleKey: "sidebar.signup", url: "/patterns/signup", icon: UserPlus },
      { titleKey: "sidebar.loginModal", url: "/ui/login-modal", icon: LogIn },
      { titleKey: "sidebar.emailTemplates", url: "/email-templates", icon: Mail },
      {
        titleKey: "sidebar.services",
        url: "/services",
        icon: LayoutGrid,
        children: [
          { titleKey: "sidebar.inquiryDetail", url: "/services/inquiry", icon: FileText, status: "done" },
          { titleKey: "sidebar.inquiryForm", url: "/services/inquiry/form", icon: FileText, status: "progress" },
          { titleKey: "sidebar.serviceStatus", url: "/services/status", icon: FileText, status: "done" },
          { titleKey: "sidebar.confirmation", url: "/services/confirmation", icon: CheckSquare, status: "hold" },
          { titleKey: "sidebar.transactionEnquiry", url: "/services/transaction-enquiry", icon: FileText, status: "progress" },
          { titleKey: "sidebar.requestDetail", url: "/services/request-detail", icon: FileText, status: "backlog" },
        ],
      },
      {
        titleKey: "sidebar.cardPatterns",
        url: "/patterns/cards",
        icon: CreditCard,
        children: [
          { titleKey: "sidebar.cardPatternKpi", url: "/patterns/cards/kpi-grid", icon: BarChart2, status: "done" },
          { titleKey: "sidebar.cardPatternProfile", url: "/patterns/cards/profile-grid", icon: User, status: "done" },
          { titleKey: "sidebar.cardPatternMix", url: "/patterns/cards/dashboard-mix", icon: LayoutGrid, status: "done" },
          { titleKey: "sidebar.cardPatternFlipEsaad", url: "/patterns/cards/flip-esaad", icon: Sparkles, status: "done" },
        ],
      },
    ],
  },
]

/* ── Section accordion (group-level collapse) ── */

function SectionAccordion({ section, defaultOpen }: { section: Section; defaultOpen: boolean }) {
  const { t } = useTranslation()
  const location = useLocation()
  const { state } = useSidebar()
  const [open, setOpen] = useState(defaultOpen)

  // In icon-collapsed sidebar mode the label is hidden and items render as
  // icon-only stubs — always show content there so navigation stays usable.
  const isIconMode = state === "collapsed"
  const showContent = isIconMode || open

  return (
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="flex w-full items-center justify-between cursor-pointer hover:text-sidebar-foreground"
        >
          <span>{t(section.titleKey)}</span>
          <ChevronDown
            className="size-3.5 shrink-0 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <AnimatePresence initial={false}>
          {showContent && (
            <motion.div
              key="section"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <SidebarMenu>
                {section.items.map((item) =>
                  item.children ? (
                    <AccordionMenuItem
                      key={item.titleKey}
                      item={item}
                      defaultOpen={item.children.some(c => location.pathname === c.url)}
                    />
                  ) : (
                    <SidebarMenuItem key={item.titleKey}>
                      <SidebarMenuButton
                        isActive={location.pathname === item.url}
                        asChild
                      >
                        <NavLink to={item.url!}>
                          <item.icon size={20} />
                          <span>{t(item.titleKey)}</span>
                          <StatusBadge status={item.status} />
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

/* ── Accordion menu item ── */

function AccordionMenuItem({ item, defaultOpen }: { item: SectionItem; defaultOpen: boolean }) {
  const location = useLocation()
  const { t } = useTranslation()
  const [open, setOpen] = useState(defaultOpen)
  const isChildActive = item.children?.some(c => location.pathname === c.url) ?? false

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isChildActive}
        onClick={() => setOpen(o => !o)}
        className="cursor-pointer"
      >
        <item.icon size={20} />
        <span>{t(item.titleKey)}</span>
        <StatusBadge status={item.status} />
        <ChevronDown
          className="size-3.5 shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </SidebarMenuButton>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="sub"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <SidebarMenuSub>
              {item.children!.map(child => (
                <SidebarMenuSubItem key={child.titleKey}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={location.pathname === child.url}
                  >
                    <NavLink to={child.url}>
                      <child.icon />
                      <span>{t(child.titleKey)}</span>
                      <StatusBadge status={child.status} />
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarMenuItem>
  )
}

/* ── AppSidebar ── */

export function AppSidebar() {
  const isRtl = useIsRtl()

  return (
    <Sidebar side={isRtl ? "right" : "left"} collapsible="icon" variant="floating" className="overflow-hidden">
      <SidebarHeader className="flex group-data-[collapsible=icon]:flex-col flex-row items-center justify-between border-b border-sidebar-border">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <img
              src="/img/dp-logo-color.svg"
              alt="Dubai Police"
              className="aspect-[16/5] h-12 w-auto object-contain group-data-[collapsible=icon]:hidden"
            />
            <img
              src="/img/Dubai-Police-Default-Icon.svg"
              alt="Dubai Police"
              className="aspect-square h-8 w-auto object-contain hidden group-data-[collapsible=icon]:block"
            />
          </NavLink>
        </div>
        <SidebarTrigger className="bg-transparent text-slate-700 dark:text-slate-500" />
      </SidebarHeader>

      <SidebarContent>
        {sections.map((section, idx) => (
          <SectionAccordion
            key={section.titleKey}
            section={section}
            defaultOpen={idx === 0}
          />
        ))}
      </SidebarContent>

      {/* <SidebarFooter className="p-3 group-data-[collapsible=icon]:p-2">
        <ProfileSwitcher
          options={profileOptions}
          className="group-data-[collapsible=icon]:hidden"
        />
      </SidebarFooter> */}
    </Sidebar>
  )
}
