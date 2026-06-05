import {
  ArrowUpRight,
  BarChart2,
  Bell,
  CheckCircle2,
  Clock,
  Megaphone,
  MoreHorizontal,
  ShieldCheck,
} from "lucide-react"

import {
  CardWidget,
  CardWidgetContent,
  CardWidgetHeader,
  CardWidgetIcon,
  CardWidgetTitle,
} from "@dpds-gov/design-system"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dpds-gov/design-system"
import { Avatar, AvatarFallback, AvatarImage } from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { Separator } from "@dpds-gov/design-system"
import {
  ComponentPage,
  PreviewBlock,
  Section,
  UsedComponents,
} from "@/components/docs"
import type { UsedComponentItem } from "@/components/docs"

const USED: UsedComponentItem[] = [
  { label: "CardWidget", href: "/ui/card-widget" },
  { label: "Card",       href: "/ui/card" },
  { label: "Avatar",     href: "/ui/avatar" },
  { label: "Badge",      href: "/ui/badges" },
  { label: "Button",     href: "/buttons" },
  { label: "Separator",  href: "/ui/separator" },
]

/* ── Data ── */

const announcements = [
  { id: 1, title: "Quarterly compliance review", date: "20 May 2026", tone: "info"    as const, body: "Submit your unit reports by Friday — review window opens Monday." },
  { id: 2, title: "Network maintenance",          date: "22 May 2026", tone: "warning" as const, body: "Internal portal down 02:00–04:00. Plan field paperwork accordingly." },
  { id: 3, title: "New service portal live",      date: "18 May 2026", tone: "success" as const, body: "Citizen inquiry forms updated. Briefing video in the training hub." },
]

const recentRequests = [
  { id: "REQ-2026-031", title: "Lost passport report", citizen: "Aisha Al Mulla",  status: "in-progress" as const, time: "12m ago" },
  { id: "REQ-2026-030", title: "Vehicle clearance",    citizen: "Omar Al Suwaidi", status: "completed"   as const, time: "47m ago" },
  { id: "REQ-2026-029", title: "Noise complaint",      citizen: "Tarek Al Banna",  status: "pending"     as const, time: "1h ago"  },
  { id: "REQ-2026-028", title: "Background check",     citizen: "Reem Al Falasi",  status: "in-progress" as const, time: "2h ago"  },
]

const REQUEST_STATUS: Record<typeof recentRequests[number]["status"], { variant: "info" | "warning" | "success"; label: string }> = {
  "in-progress": { variant: "info",    label: "In progress" },
  completed:     { variant: "success", label: "Completed"  },
  pending:       { variant: "warning", label: "Pending"    },
}

const quickActions = [
  { icon: CheckCircle2, label: "Approve queue",  count: 12 as number | null },
  { icon: Clock,        label: "Awaiting reply", count: 7  as number | null },
  { icon: BarChart2,    label: "Weekly report",  count: null },
  { icon: ShieldCheck,  label: "Security log",   count: 3  as number | null },
]

/* ── Snippets ── */

const HERO_KPI_SNIPPET = `<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <CardWidget wrapperClassName="lg:col-span-2">
    <CardWidgetHeader>
      <CardWidgetIcon><BarChart2 className="size-7 text-primary-600" /></CardWidgetIcon>
      <CardWidgetTitle>This week at a glance</CardWidgetTitle>
    </CardWidgetHeader>
    <CardWidgetContent>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <span className="font-mono font-bold text-2xl text-sub-title">1,284</span>
          <span className="text-xs text-muted-foreground">Requests</span>
          <Badge size="sm" variant="success" className="mt-2 w-fit">
            <ArrowUpRight className="size-3" /> +12%
          </Badge>
        </div>
        {/* …repeat for Active, Compliance, Avg. SLA */}
      </div>
    </CardWidgetContent>
  </CardWidget>

  <CardWidget>
    <CardWidgetHeader>
      <CardWidgetIcon><ShieldCheck className="size-6 text-primary-600" /></CardWidgetIcon>
      <CardWidgetTitle>System health</CardWidgetTitle>
    </CardWidgetHeader>
    <CardWidgetContent>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">API uptime</span>
          <span className="font-mono text-sm text-sub-title">99.98%</span>
        </div>
        {/* …more metrics */}
        <Separator />
        <Badge size="sm" variant="success" className="w-fit">All systems operational</Badge>
      </div>
    </CardWidgetContent>
  </CardWidget>
</div>`

const ANNOUNCEMENTS_SNIPPET = `<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Megaphone className="size-4 text-primary-600" />
      Announcements
    </CardTitle>
    <CardDescription>Latest from HQ communications.</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-3">
    {announcements.map((a) => (
      <div key={a.id} className="flex flex-col gap-1 rounded-xl border border-border p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium truncate">{a.title}</span>
          <Badge size="sm" variant={a.tone}>{a.tone}</Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{a.body}</p>
        <span className="text-[11px] text-muted-foreground font-mono">{a.date}</span>
      </div>
    ))}
  </CardContent>
</Card>`

const REQUESTS_FEED_SNIPPET = `<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Bell className="size-4 text-primary-600" />
      Recent requests
    </CardTitle>
    <CardDescription>Live feed across all stations.</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-2">
    {recentRequests.map((r) => {
      const status = REQUEST_STATUS[r.status]
      return (
        <div key={r.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
          <Avatar className="size-9">
            <AvatarImage src={\`/img/avatar/avatar-\${(parseInt(r.id.slice(-1)) % 6) + 1}.png\`} alt={r.citizen} />
            <AvatarFallback>{r.citizen[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-muted-foreground">{r.id}</span>
              <Badge size="sm" variant={status.variant}>{status.label}</Badge>
            </div>
            <span className="text-sm font-medium truncate">{r.title}</span>
            <span className="text-xs text-muted-foreground truncate">{r.citizen}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
            <Clock className="size-3.5" />
            {r.time}
          </div>
          <Button variant="text" size="icon-sm" aria-label="More">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      )
    })}
  </CardContent>
</Card>`

const QUICK_ACTIONS_SNIPPET = `const quickActions = [
  { icon: CheckCircle2, label: "Approve queue",  count: 12   },
  { icon: Clock,        label: "Awaiting reply", count: 7    },
  { icon: BarChart2,    label: "Weekly report",  count: null },
  { icon: ShieldCheck,  label: "Security log",   count: 3    },
]

<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
  {quickActions.map((q) => {
    const Icon = q.icon
    return (
      <Card key={q.label} className="cursor-pointer transition-shadow hover:shadow-md">
        <CardContent className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary-50 dark:bg-primary/20">
            <Icon className="size-5 text-primary-700 dark:text-primary-200" />
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{q.label}</span>
            {q.count != null && (
              <span className="text-xs text-muted-foreground">{q.count} pending</span>
            )}
          </div>
        </CardContent>
      </Card>
    )
  })}
</div>`

/* ── Rendered examples ── */

function HeroKpiBlock() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      <CardWidget wrapperClassName="lg:col-span-2">
        <CardWidgetHeader>
          <CardWidgetIcon>
            <BarChart2 className="size-7 text-primary-600" />
          </CardWidgetIcon>
          <CardWidgetTitle>This week at a glance</CardWidgetTitle>
        </CardWidgetHeader>
        <CardWidgetContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="font-mono font-bold text-2xl text-sub-title">1,284</span>
              <span className="text-xs text-muted-foreground">Requests</span>
              <Badge size="sm" variant="success" className="mt-2 w-fit"><ArrowUpRight className="size-3" /> +12%</Badge>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-2xl text-sub-title">432</span>
              <span className="text-xs text-muted-foreground">Active</span>
              <Badge size="sm" variant="info" className="mt-2 w-fit">Live</Badge>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-2xl text-sub-title">87%</span>
              <span className="text-xs text-muted-foreground">Compliance</span>
              <Badge size="sm" variant="success" className="mt-2 w-fit"><ArrowUpRight className="size-3" /> +3%</Badge>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-2xl text-sub-title">2.4d</span>
              <span className="text-xs text-muted-foreground">Avg. SLA</span>
              <Badge size="sm" variant="success" className="mt-2 w-fit">Under target</Badge>
            </div>
          </div>
        </CardWidgetContent>
      </CardWidget>

      <CardWidget>
        <CardWidgetHeader>
          <CardWidgetIcon>
            <ShieldCheck className="size-6 text-primary-600" />
          </CardWidgetIcon>
          <CardWidgetTitle>System health</CardWidgetTitle>
        </CardWidgetHeader>
        <CardWidgetContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">API uptime</span>
              <span className="font-mono text-sm text-sub-title">99.98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Avg. response</span>
              <span className="font-mono text-sm text-sub-title">142ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Active sessions</span>
              <span className="font-mono text-sm text-sub-title">2,184</span>
            </div>
            <Separator />
            <Badge size="sm" variant="success" className="w-fit">All systems operational</Badge>
          </div>
        </CardWidgetContent>
      </CardWidget>
    </div>
  )
}

function AnnouncementsCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="size-4 text-primary-600" />
          Announcements
        </CardTitle>
        <CardDescription>Latest from HQ communications.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {announcements.map((a) => (
          <div key={a.id} className="flex flex-col gap-1 rounded-xl border border-border p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium truncate">{a.title}</span>
              <Badge size="sm" variant={a.tone}>{a.tone}</Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{a.body}</p>
            <span className="text-[11px] text-muted-foreground font-mono">{a.date}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function RecentRequestsCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="size-4 text-primary-600" />
          Recent requests
        </CardTitle>
        <CardDescription>Live feed across all stations.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {recentRequests.map((r) => {
          const status = REQUEST_STATUS[r.status]
          return (
            <div key={r.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
              <Avatar className="size-9">
                <AvatarImage src={`/img/avatar/avatar-${(parseInt(r.id.slice(-1)) % 6) + 1}.png`} alt={r.citizen} />
                <AvatarFallback>{r.citizen[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-muted-foreground">{r.id}</span>
                  <Badge size="sm" variant={status.variant}>{status.label}</Badge>
                </div>
                <span className="text-sm font-medium truncate">{r.title}</span>
                <span className="text-xs text-muted-foreground truncate">{r.citizen}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Clock className="size-3.5" />
                {r.time}
              </div>
              <Button variant="text" size="icon-sm" aria-label="More">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

function QuickActionsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
      {quickActions.map((q) => {
        const Icon = q.icon
        return (
          <Card key={q.label} className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-50 dark:bg-primary/20">
                <Icon className="size-5 text-primary-700 dark:text-primary-200" />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">{q.label}</span>
                {q.count != null && (
                  <span className="text-xs text-muted-foreground">{q.count} pending</span>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

/* ── Page ── */

export default function CardDashboardMixPage() {
  return (
    <ComponentPage
      title="Dashboard mix pattern"
      description="Mixed CardWidget + Card composition — hero KPI, side widget, announcements list, requests feed, and quick-action grid."
      category="Card patterns"
    >
      <Section title="Hero KPI + side widget" description="Wide CardWidget spanning 2 columns + a narrow side widget. Use `wrapperClassName` to apply grid spans without breaking the inner card surface.">
        <PreviewBlock code={HERO_KPI_SNIPPET}>
          <HeroKpiBlock />
        </PreviewBlock>
      </Section>

      <Section title="Announcements list" description="Canonical Card with nested item cards inside CardContent. Use `Badge` tone to map message severity.">
        <PreviewBlock code={ANNOUNCEMENTS_SNIPPET}>
          <AnnouncementsCard />
        </PreviewBlock>
      </Section>

      <Section title="Recent requests feed" description="Card with row-based items — Avatar + metadata + timestamp + action menu. Replaces a heavy DataTable when you only need 4–6 rows.">
        <PreviewBlock code={REQUESTS_FEED_SNIPPET}>
          <RecentRequestsCard />
        </PreviewBlock>
      </Section>

      <Section title="Quick-action grid" description="Compact clickable Cards for shortcuts and tools. Add `cursor-pointer transition-shadow hover:shadow-md` for an interactive feel.">
        <PreviewBlock code={QUICK_ACTIONS_SNIPPET}>
          <QuickActionsGrid />
        </PreviewBlock>
      </Section>

      <UsedComponents items={USED} />
    </ComponentPage>
  )
}
