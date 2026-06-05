import { useState } from "react"
import { toast } from "sonner"
import { Info, MoreHorizontal, TriangleAlert } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@dpds-gov/design-system"
import { DataTable, createSelectColumn, type ColumnDef } from "@dpds-gov/design-system"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@dpds-gov/design-system"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { CardWidget, CardWidgetContent, CardWidgetHeader, CardWidgetTitle } from "@dpds-gov/design-system"
import { Input } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@dpds-gov/design-system"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@dpds-gov/design-system"
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerTrigger, DrawerClose } from "@dpds-gov/design-system"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dpds-gov/design-system"
import { Progress } from "@dpds-gov/design-system"
import { ProfileSwitcher, type ProfileSwitcherOption } from "@dpds-gov/design-system"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { CodeBlock, PropsTable, DemoLabel, type PropRow } from "@/pages/ui-demo-helpers"
import {
  ProgressTracker, ProgressTrackerItem,
  ProgressTrackerHeader, ProgressTrackerContent,
} from "@dpds-gov/design-system"

type UiSection =
  | "toast" | "tabs" | "modal-popups" | "side-drawers"
  | "table" | "dropdown-menu" | "progress-bar"
  | "alert" | "profile-switcher"
  | "swiper" | "drawer" | "progress-tracker"

const profileOptions: ProfileSwitcherOption[] = [
  { value: "personal", label: "Personal Account", description: "Account type", icon: "" },
  { value: "lawyer",   label: "Lawyer Account",   description: "Account type", icon: "" },
]

type Request = {
  id: string; requestNo: string; clientName: string; clientEmail: string
  serviceName: string; status: "New" | "Under investigation" | "Completed" | "Pending approval"
  date: string; lastUpdate: string; requestedIn: string
}

const tableRows: Request[] = Array.from({ length: 47 }, (_, i) => ({
  id: String(i + 1),
  requestNo: `REQ-2025-${String(i + 1).padStart(3, "0")}`,
  clientName: ["Noura Mansour", "Ahmed Ali", "Sara Khalid", "Omar Hassan", "Layla Noor"][i % 5],
  clientEmail: ["noura@gmail.com", "ahmed@gmail.com", "sara@gmail.com", "omar@gmail.com", "layla@gmail.com"][i % 5],
  serviceName: ["TWIMC Certificate", "Criminal complaint", "Electronic agency", "Visiting an inmate", "Stop searching"][i % 5],
  status: (["New", "Under investigation", "Completed", "Pending approval", "Completed"] as Request["status"][])[i % 5],
  date: "09 Sep 2025", lastUpdate: "09 Sep 2025",
  requestedIn: ["Al Barsha Police Station", "Dubai Police HQ", "Deira Police Station"][i % 3],
}))

const statusVariant: Record<Request["status"], string> = {
  "New": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  "Under investigation": "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
  "Completed": "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "Pending approval": "bg-orange-500/15 text-orange-600 dark:text-orange-400",
}

const requestColumns: ColumnDef<Request>[] = [
  createSelectColumn<Request>(),
  { accessorKey: "requestNo", header: "Request No." },
  {
    accessorKey: "clientName", header: "Client's name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
          {row.original.clientName[0]}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-sm font-mono">{row.original.clientName}</span>
          <span className="text-xs text-muted-foreground">{row.original.clientEmail}</span>
        </div>
      </div>
    ),
  },
  { accessorKey: "serviceName", header: "Service Name" },
  {
    accessorKey: "status", header: "Status",
    cell: ({ row }) => (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusVariant[row.original.status]}`}>
        {row.original.status}
      </span>
    ),
  },
  { accessorKey: "date",        header: "Date",         enableSorting: false },
  { accessorKey: "lastUpdate",  header: "Last update",  enableSorting: false },
  { accessorKey: "requestedIn", header: "Requested in", enableSorting: false },
  {
    id: "actions", enableSorting: false,
    cell: ({ row: _row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex size-7 items-center justify-center rounded-md hover:bg-muted">
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <CardWidget>
      <CardWidgetHeader><CardWidgetTitle>{title}</CardWidgetTitle></CardWidgetHeader>
      <CardWidgetContent>{children}</CardWidgetContent>
    </CardWidget>
  )
}

function ControlledTabs() {
  const [tab, setTab] = useState("a")
  return (
    <div className="space-y-3">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
          <TabsTrigger value="c">Tab C</TabsTrigger>
        </TabsList>
        <TabsContent value="a"><div className="rounded-xl border p-4 text-sm text-muted-foreground mt-2">Content A</div></TabsContent>
        <TabsContent value="b"><div className="rounded-xl border p-4 text-sm text-muted-foreground mt-2">Content B</div></TabsContent>
        <TabsContent value="c"><div className="rounded-xl border p-4 text-sm text-muted-foreground mt-2">Content C</div></TabsContent>
      </Tabs>
      <p className="text-xs text-muted-foreground">Active: <span className="font-medium text-foreground font-mono">{tab}</span></p>
    </div>
  )
}

/* ── Props data ── */

const progressTrackerItemProps: PropRow[] = [
  { prop: "status",      type: '"completed" | "in-progress" | "pending"', description: "Visual state — controls dot color, badge color, and pulse ring" },
  { prop: "title",       type: "string",           description: "Step title text" },
  { prop: "statusLabel", type: "string",            description: "Badge label shown next to title" },
  { prop: "description", type: "string",            description: "Secondary text shown alongside status badge" },
  { prop: "children",    type: "ReactNode",         description: "ProgressTrackerHeader and/or ProgressTrackerContent slots" },
  { prop: "className",   type: "string",            description: "Extra Tailwind classes on the item card" },
]

const toastProps: PropRow[] = [
  { prop: "message",     type: "string",  description: "Primary toast text" },
  { prop: "description", type: "string",  description: "Secondary line shown below message" },
  { prop: "duration",    type: "number",  default: "4000", description: "Auto-dismiss delay in ms" },
  { prop: "action",      type: "{ label, onClick }", description: "Inline action button" },
  { prop: "id",          type: "string | number", description: "Unique ID — use to dismiss or update programmatically" },
]

const tabsProps: PropRow[] = [
  { prop: "defaultValue", type: "string",  description: "Initially active tab (uncontrolled)" },
  { prop: "value",        type: "string",  description: "Controlled active tab" },
  { prop: "onValueChange",type: "(v: string) => void", description: "Fires when active tab changes" },
  { prop: "orientation",  type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Tab list layout direction" },
]

const dialogProps: PropRow[] = [
  { prop: "open",          type: "boolean", description: "Controlled open state" },
  { prop: "onOpenChange",  type: "(open: boolean) => void", description: "Fires when open state changes" },
  { prop: "modal",         type: "boolean", default: "true", description: "Whether dialog traps focus" },
  { prop: "showCloseButton", type: "boolean", default: "true", description: "Show built-in × button in DialogContent" },
]

const sheetProps: PropRow[] = [
  { prop: "open",         type: "boolean", description: "Controlled open state" },
  { prop: "onOpenChange", type: "(open: boolean) => void", description: "Fires on open/close" },
  { prop: "side",         type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "Which edge the sheet slides from" },
]

const drawerProps: PropRow[] = [
  { prop: "open",         type: "boolean", description: "Controlled open state" },
  { prop: "onOpenChange", type: "(open: boolean) => void", description: "Fires on open/close" },
  { prop: "direction",    type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Edge the drawer slides from" },
  { prop: "dismissible",  type: "boolean", default: "true", description: "Allow drag-to-dismiss gesture" },
]

const dropdownProps: PropRow[] = [
  { prop: "open",         type: "boolean", description: "Controlled open state" },
  { prop: "onOpenChange", type: "(open: boolean) => void", description: "Fires on open/close" },
  { prop: "modal",        type: "boolean", default: "true", description: "Whether menu traps pointer events" },
  { prop: "align (MenuContent)", type: '"start" | "center" | "end"', default: '"start"', description: "Horizontal alignment relative to trigger" },
  { prop: "side (MenuContent)",  type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Which side content appears on" },
]

const progressProps: PropRow[] = [
  { prop: "value",   type: "number", description: "Current progress value" },
  { prop: "max",     type: "number", default: "100", description: "Maximum value" },
  { prop: "className", type: "string", description: "Extra Tailwind classes on the track" },
]

const alertProps: PropRow[] = [
  { prop: "variant", type: '"default" | "destructive"', default: '"default"', description: "Color scheme of the alert" },
  { prop: "className", type: "string", description: "Extra Tailwind classes" },
]

const profileSwitcherProps: PropRow[] = [
  { prop: "options",    type: "ProfileSwitcherOption[]", description: "List of profiles — value, label, description, icon" },
  { prop: "value",      type: "string", description: "Controlled selected value" },
  { prop: "onChange",   type: "(value: string) => void", description: "Fires when selection changes" },
  { prop: "className",  type: "string", description: "Extra Tailwind classes on the wrapper" },
]

/* ── Page ── */

export default function UiComponentsPage({ section }: { section: UiSection }) {
  const [profileValue, setProfileValue] = useState("personal")
  const [progress, setProgress] = useState(60)
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")

  const filteredRows = tableRows.filter(r =>
    statusFilter === "all" || r.status === statusFilter
  )

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div>
          <h1 className="text-[40px] font-bold font-mono tracking-tight text-secondary-600 dark:text-success-300 text-4xl">UI Components</h1>
          <p className="text-sm md:text-2xl text-gray-500">shadcn components showcase</p>
        </div>

        {/* ── TOAST ── */}
        {section === "toast" && (
          <>
            <SectionCard title="Types">
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => toast.success("Saved successfully", { description: "Your changes are now updated." })}>
                  Success
                </Button>
                <Button variant="filledDestructive" onClick={() => toast.error("Something went wrong", { description: "Please try again later." })}>
                  Error
                </Button>
                <Button variant="filledWarning" onClick={() => toast.warning("Heads up", { description: "This action cannot be undone." })}>
                  Warning
                </Button>
                <Button variant="outlineGray" onClick={() => toast.info("New update available", { description: "Refresh to get the latest version." })}>
                  Info
                </Button>
                <Button variant="gray" onClick={() => toast("Default toast message")}>
                  Default
                </Button>
                <Button variant="outlineGray" onClick={() =>
                  toast("File export ready", {
                    action: { label: "Download", onClick: () => {} },
                    description: "Your report has been generated.",
                  })
                }>
                  With Action
                </Button>
              </div>
            </SectionCard>

            <SectionCard title="Usage">
              <CodeBlock code={`import { toast } from "sonner"

toast.success("Saved successfully", {
  description: "Your changes are now updated.",
})

toast.error("Something went wrong")
toast.warning("Heads up", { description: "Irreversible action." })
toast.info("New update available")

// With action button
toast("Export ready", {
  action: { label: "Download", onClick: () => handleDownload() },
})

// Dismiss programmatically
const id = toast.loading("Uploading...")
toast.dismiss(id)`} />
            </SectionCard>

            <SectionCard title="Props">
              <PropsTable rows={toastProps} />
            </SectionCard>
          </>
        )}

        {/* ── TABS ── */}
        {section === "tabs" && (
          <>
            <SectionCard title="Default">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="requests">Requests</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="rounded-xl border border-border p-4 text-sm text-muted-foreground mt-2">
                    Overview content — summary stats, charts, recent activity.
                  </div>
                </TabsContent>
                <TabsContent value="requests">
                  <div className="rounded-xl border border-border p-4 text-sm text-muted-foreground mt-2">
                    Requests content — table of service requests with filters.
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  <div className="rounded-xl border border-border p-4 text-sm text-muted-foreground mt-2">
                    Settings content — profile, notifications, preferences.
                  </div>
                </TabsContent>
              </Tabs>
            </SectionCard>

            <SectionCard title="Controlled">
              <ControlledTabs />
            </SectionCard>

            <SectionCard title="Usage">
              <CodeBlock code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@dpds-gov/design-system"

// Uncontrolled
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="requests">Requests</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="requests">Requests content</TabsContent>
</Tabs>

// Controlled
const [tab, setTab] = useState("overview")
<Tabs value={tab} onValueChange={setTab}>...</Tabs>`} />
            </SectionCard>

            <SectionCard title="Props">
              <PropsTable rows={tabsProps} />
            </SectionCard>
          </>
        )}

        {/* ── MODAL POPUPS ── */}
        {section === "modal-popups" && (
          <>
            <SectionCard title="Basic Dialog">
              <Dialog>
                <DialogTrigger render={<Button>Open Modal</Button>} />
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm action</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground">Are you sure you want to proceed? This action cannot be undone.</p>
                  <DialogFooter>
                    <DialogClose render={<Button variant="outlineGray">Cancel</Button>} />
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </SectionCard>

            <SectionCard title="Sizes">
              <div className="flex flex-wrap gap-3">
                {(["sm", "md", "lg", "xl"] as const).map(size => (
                  <Dialog key={size}>
                    <DialogTrigger render={<Button variant="outlineGray">{size.toUpperCase()}</Button>} />
                    <DialogContent className={
                      size === "sm" ? "max-w-sm" :
                      size === "md" ? "max-w-md" :
                      size === "lg" ? "max-w-lg" : "max-w-xl"
                    }>
                      <DialogHeader><DialogTitle>{size.toUpperCase()} Modal</DialogTitle></DialogHeader>
                      <p className="text-sm text-muted-foreground">Modal content at <code className="font-mono">{`max-w-${size}`}</code> width.</p>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Usage">
              <CodeBlock code={`import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogClose, DialogTrigger,
} from "@dpds-gov/design-system"

// Note: DialogTrigger and DialogClose use render prop, not asChild
<Dialog>
  <DialogTrigger render={<Button>Open</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm action</DialogTitle>
    </DialogHeader>
    <p>Modal body content here.</p>
    <DialogFooter>
      <DialogClose render={<Button variant="outlineGray">Cancel</Button>} />
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} />
            </SectionCard>

            <SectionCard title="Props">
              <PropsTable rows={dialogProps} />
            </SectionCard>
          </>
        )}

        {/* ── SIDE DRAWERS ── */}
        {section === "side-drawers" && (
          <>
            <SectionCard title="Sides">
              <div className="flex flex-wrap gap-3">
                {(["left", "right", "top", "bottom"] as const).map(side => (
                  <Sheet key={side}>
                    <SheetTrigger asChild>
                      <Button variant="outlineGray" className="capitalize">{side}</Button>
                    </SheetTrigger>
                    <SheetContent side={side}>
                      <SheetHeader>
                        <SheetTitle className="capitalize">{side} Drawer</SheetTitle>
                        <SheetDescription>This sheet slides in from the {side}.</SheetDescription>
                      </SheetHeader>
                      <div className="space-y-3 p-4">
                        <Label htmlFor={`sheet-${side}`}>Email</Label>
                        <Input id={`sheet-${side}`} placeholder="name@example.com" />
                      </div>
                    </SheetContent>
                  </Sheet>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Usage">
              <CodeBlock code={`import {
  Sheet, SheetContent, SheetHeader,
  SheetTitle, SheetDescription, SheetTrigger,
} from "@dpds-gov/design-system"

<Sheet>
  <SheetTrigger asChild>
    <Button>Open</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Manage your preferences.</SheetDescription>
    </SheetHeader>
    {/* content */}
  </SheetContent>
</Sheet>`} />
            </SectionCard>

            <SectionCard title="Props">
              <PropsTable rows={sheetProps} />
            </SectionCard>
          </>
        )}

        {/* ── TABLE ── */}
        {section === "table" && (
          <CardWidget>
            <CardWidgetContent className="p-0">
              <DataTable
                columns={requestColumns}
                data={filteredRows}
                searchPlaceholder="Quick search"
                onAdd={() => {}}
                filterSlot={
                  <div className="flex items-center gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-36 text-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Under investigation">Under investigation</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Pending approval">Pending approval</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="w-28 text-xs">
                        <SelectValue placeholder="Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                }
              />
            </CardWidgetContent>
          </CardWidget>
        )}

        {/* ── DROPDOWN MENU ── */}
        {section === "dropdown-menu" && (
          <>
            <SectionCard title="Basic">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outlineGray">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SectionCard>

            <SectionCard title="Alignments">
              <div className="flex gap-3">
                {(["start", "center", "end"] as const).map(align => (
                  <DropdownMenu key={align}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outlineGray" size="sm">{align}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={align}>
                      <DropdownMenuItem>Item 1</DropdownMenuItem>
                      <DropdownMenuItem>Item 2</DropdownMenuItem>
                      <DropdownMenuItem>Item 3</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Usage">
              <CodeBlock code={`import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@dpds-gov/design-system"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outlineGray">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`} />
            </SectionCard>

            <SectionCard title="Props">
              <PropsTable rows={dropdownProps} />
            </SectionCard>
          </>
        )}

        {/* ── PROGRESS BAR ── */}
        {section === "progress-bar" && (
          <>
            <SectionCard title="Interactive">
              <div className="space-y-4">
                <Progress value={progress} />
                <p className="text-xs text-muted-foreground font-mono">{progress}%</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outlineGray" onClick={() => setProgress(v => Math.max(0, v - 10))}>−10</Button>
                  <Button size="sm" variant="outlineGray" onClick={() => setProgress(v => Math.min(100, v + 10))}>+10</Button>
                  <Button size="sm" variant="gray" onClick={() => setProgress(0)}>Reset</Button>
                  <Button size="sm" variant="gray" onClick={() => setProgress(100)}>Full</Button>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Fixed Values">
              <div className="space-y-4">
                {[25, 50, 75, 100].map(v => (
                  <div key={v} className="space-y-1">
                    <DemoLabel>{v}%</DemoLabel>
                    <Progress value={v} />
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Usage">
              <CodeBlock code={`import { Progress } from "@dpds-gov/design-system"

// Static
<Progress value={75} />

// Controlled
const [value, setValue] = useState(0)
<Progress value={value} />
<Button onClick={() => setValue(v => Math.min(100, v + 10))}>+10%</Button>`} />
            </SectionCard>

            <SectionCard title="Props">
              <PropsTable rows={progressProps} />
            </SectionCard>
          </>
        )}

        {/* ── ALERT ── */}
        {section === "alert" && (
          <>
            <SectionCard title="Variants">
              <div className="flex flex-col gap-3">
                <Alert>
                  <Info />
                  <AlertTitle>Default</AlertTitle>
                  <AlertDescription>This is a default informational alert.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <TriangleAlert />
                  <AlertTitle>Destructive</AlertTitle>
                  <AlertDescription>This action cannot be undone. All data will be permanently deleted.</AlertDescription>
                </Alert>
              </div>
            </SectionCard>

            <SectionCard title="Without icon">
              <div className="flex flex-col gap-3">
                <Alert>
                  <AlertTitle>Session expiring soon</AlertTitle>
                  <AlertDescription>Your session will expire in 5 minutes. Save your work.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTitle>Payment failed</AlertTitle>
                  <AlertDescription>Your payment method was declined. Update your billing details.</AlertDescription>
                </Alert>
              </div>
            </SectionCard>

            <SectionCard title="Usage">
              <CodeBlock code={`import { Alert, AlertTitle, AlertDescription } from "@dpds-gov/design-system"
import { Info } from "lucide-react"

// Default
<Alert>
  <Info />
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>You can add components to your app.</AlertDescription>
</Alert>

// Destructive
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>`} />
            </SectionCard>

            <SectionCard title="Props">
              <PropsTable rows={alertProps} />
            </SectionCard>
          </>
        )}

        {/* ── PROFILE SWITCHER ── */}
        {section === "profile-switcher" && (
          <>
            <SectionCard title="Default">
              <div className="max-w-xs">
                <ProfileSwitcher
                  options={profileOptions}
                  value={profileValue}
                  onChange={setProfileValue}
                />
                <p className="mt-3 text-xs text-muted-foreground">
                  Selected: <span className="font-medium text-foreground font-mono">{profileValue}</span>
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Three options">
              <div className="max-w-xs">
                <ProfileSwitcher
                  options={[
                    { value: "dubai-hq",  label: "Dubai Police HQ",    description: "Active station",    icon: "" },
                    { value: "al-barsha", label: "Al Barsha Station",   description: "Secondary station", icon: "" },
                    { value: "deira",     label: "Deira Station",       description: "Secondary station", icon: "" },
                  ]}
                />
              </div>
            </SectionCard>

            <SectionCard title="Usage">
              <CodeBlock code={`import { ProfileSwitcher } from "@dpds-gov/design-system"

const options = [
  { value: "dubai-hq",  label: "Dubai Police HQ",  description: "Active station",    icon: "" },
  { value: "al-barsha", label: "Al Barsha Station", description: "Secondary station", icon: "" },
]

// Uncontrolled
<ProfileSwitcher options={options} />

// Controlled
const [value, setValue] = useState("dubai-hq")
<ProfileSwitcher options={options} value={value} onChange={setValue} />`} />
            </SectionCard>

            <SectionCard title="Props">
              <PropsTable rows={profileSwitcherProps} />
            </SectionCard>
          </>
        )}

        {/* ── SWIPER ── */}
        {section === "swiper" && (
          <>
            <SectionCard title="Basic with navigation">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={16}
                slidesPerView={1}
                className="rounded-2xl overflow-hidden"
              >
                {["#16a34a", "#2563eb", "#9333ea", "#dc2626", "#d97706"].map((color, i) => (
                  <SwiperSlide key={i}>
                    <div className="h-48 rounded-2xl flex items-center justify-center font-mono font-bold text-white text-2xl" style={{ background: color }}>
                      Slide {i + 1}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SectionCard>

            <SectionCard title="Multi-slide responsive">
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={12}
                slidesPerView={1}
                breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <SwiperSlide key={i}>
                    <div className="rounded-2xl border border-border bg-muted/30 p-5 flex flex-col gap-2">
                      <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-mono font-bold text-primary text-sm shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="font-mono font-bold text-sm">Card {i + 1}</p>
                      <p className="text-xs text-muted-foreground">Slide content goes here.</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SectionCard>

            <SectionCard title="Autoplay + loop">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop
                pagination={{ clickable: true }}
                spaceBetween={16}
                className="rounded-2xl overflow-hidden"
              >
                {["Autoplay Slide 1", "Autoplay Slide 2", "Autoplay Slide 3"].map((label, i) => (
                  <SwiperSlide key={i}>
                    <div className="h-40 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center font-mono font-bold text-primary text-lg">
                      {label}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SectionCard>

            <SectionCard title="Usage">
              <CodeBlock code={`import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

<Swiper
  modules={[Navigation, Pagination]}
  navigation
  pagination={{ clickable: true }}
  spaceBetween={16}
  slidesPerView={1}
  breakpoints={{
    640:  { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
</Swiper>`} />
            </SectionCard>
          </>
        )}

        {/* ── DRAWER ── */}
        {section === "drawer" && (
          <>
            <SectionCard title="Bottom (default)">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outlineGray">Open Bottom Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Move Goal</DrawerTitle>
                      <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 text-sm text-muted-foreground">
                      Drag the handle at the top to dismiss, or use Cancel below.
                    </div>
                    <DrawerFooter>
                      <Button>Save</Button>
                      <DrawerClose asChild><Button variant="outlineGray">Cancel</Button></DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </SectionCard>

            <SectionCard title="Directions">
              <div className="flex flex-wrap gap-3">
                {(["bottom", "right", "left", "top"] as const).map(dir => (
                  <Drawer key={dir} direction={dir}>
                    <DrawerTrigger asChild>
                      <Button variant="outlineGray" className="capitalize">{dir}</Button>
                    </DrawerTrigger>
                    <DrawerContent className={dir === "right" || dir === "left" ? "sm:max-w-sm" : ""}>
                      <DrawerHeader className="border-b border-border">
                        <DrawerTitle className="capitalize">{dir} Drawer</DrawerTitle>
                        <DrawerDescription>Slides in from the {dir}.</DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 text-sm text-muted-foreground">Drawer content goes here.</div>
                      <DrawerFooter className="border-t border-border">
                        <DrawerClose asChild><Button variant="gray">Close</Button></DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Usage">
              <CodeBlock code={`import {
  Drawer, DrawerContent, DrawerHeader, DrawerFooter,
  DrawerTitle, DrawerDescription, DrawerTrigger, DrawerClose,
} from "@dpds-gov/design-system"

<Drawer direction="bottom">
  <DrawerTrigger asChild>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description text.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">Content here.</div>
    <DrawerFooter>
      <Button>Save</Button>
      <DrawerClose asChild>
        <Button variant="outlineGray">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`} />
            </SectionCard>

            <SectionCard title="Props">
              <PropsTable rows={drawerProps} />
            </SectionCard>
          </>
        )}

        {/* ── PROGRESS TRACKER ── */}
        {section === "progress-tracker" && (
          <>
            <SectionCard title="Status variants">
              <ProgressTracker className="w-full max-w-lg">
                <ProgressTrackerItem
                  status="completed"
                  title="Request Submitted"
                  statusLabel="Completed"
                  description="10:30 • 01/05/2025"
                />
                <ProgressTrackerItem
                  status="in-progress"
                  title="Under Review"
                  statusLabel="In Progress"
                  description="11:00 • 01/05/2025"
                />
                <ProgressTrackerItem
                  status="pending"
                  title="Final Approval"
                  statusLabel="Pending"
                />
              </ProgressTracker>
            </SectionCard>

            <SectionCard title="With action button (header slot)">
              <ProgressTracker className="w-full max-w-lg">
                <ProgressTrackerItem
                  status="completed"
                  title="Visit Details"
                  statusLabel="Completed"
                  description="12:34 • 01/01/2025"
                >
                  <ProgressTrackerHeader>
                    <Button size="sm" variant="outlineGray" className="rounded-[32px]">Inquire</Button>
                  </ProgressTrackerHeader>
                </ProgressTrackerItem>
                <ProgressTrackerItem
                  status="in-progress"
                  title="Review"
                  statusLabel="Under review"
                  description="12:34 • 01/01/2025"
                >
                  <ProgressTrackerHeader>
                    <Button size="sm" variant="outlineGray" className="rounded-[32px]">View</Button>
                  </ProgressTrackerHeader>
                </ProgressTrackerItem>
                <ProgressTrackerItem status="pending" title="Confirmation" />
              </ProgressTracker>
            </SectionCard>

            <SectionCard title="With expanded content slot">
              <ProgressTracker className="w-full max-w-lg">
                <ProgressTrackerItem
                  status="completed"
                  title="Request Submitted"
                  statusLabel="Completed"
                  description="10:30 • 01/05/2025"
                >
                  <ProgressTrackerContent>
                    <div className="border border-[#1C1D2580] rounded-xl overflow-hidden">
                      <div className="py-2 px-4 bg-[#1C1D2580]">
                        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-300">Documents</p>
                      </div>
                      <ul className="flex flex-col gap-1.5 p-4">
                        {["National ID verified", "Application form signed", "Fee payment confirmed"].map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                            <span className="mt-0.5 shrink-0 size-[6px] bg-[#99BCB4] rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ProgressTrackerContent>
                </ProgressTrackerItem>
                <ProgressTrackerItem
                  status="in-progress"
                  title="Under Investigation"
                  statusLabel="In Progress"
                  description="14:00 • 02/05/2025"
                />
                <ProgressTrackerItem status="pending" title="Decision Issued" />
              </ProgressTracker>
            </SectionCard>

            <SectionCard title="Usage">
              <CodeBlock code={`import {
  ProgressTracker, ProgressTrackerItem,
  ProgressTrackerHeader, ProgressTrackerContent,
} from "@dpds-gov/design-system"

// Basic
<ProgressTracker>
  <ProgressTrackerItem
    status="completed"
    title="Step 1"
    statusLabel="Completed"
    description="10:30 • 01/05/2025"
  />
  <ProgressTrackerItem
    status="in-progress"
    title="Step 2"
    statusLabel="Under review"
  />
  <ProgressTrackerItem status="pending" title="Step 3" />
</ProgressTracker>

// With header action + content
<ProgressTrackerItem status="completed" title="Visit Details" statusLabel="Completed">
  <ProgressTrackerHeader>
    <Button size="sm" variant="outlineGray">Inquire</Button>
  </ProgressTrackerHeader>
  <ProgressTrackerContent>
    {/* sub-items, tables, etc. */}
  </ProgressTrackerContent>
</ProgressTrackerItem>`} />
            </SectionCard>

            <SectionCard title="Props — ProgressTrackerItem">
              <PropsTable rows={progressTrackerItemProps} />
            </SectionCard>
          </>
        )}
      </main>
    </div>
  )
}
