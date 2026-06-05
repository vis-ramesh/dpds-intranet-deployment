import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Inbox,
  MoreHorizontal,
  TrendingUp,
  Users,
} from "lucide-react"

import {
  CardWidget,
  CardWidgetAction,
  CardWidgetContent,
  CardWidgetHeader,
  CardWidgetIcon,
  CardWidgetTitle,
} from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import {
  ComponentPage,
  PreviewBlock,
  Section,
  UsedComponents,
} from "@/components/docs"
import type { UsedComponentItem } from "@/components/docs"

const USED: UsedComponentItem[] = [
  { label: "CardWidget", href: "/ui/card-widget" },
  { label: "Badge",      href: "/ui/badges" },
  { label: "Button",     href: "/buttons" },
]

/* ── Data ── */

interface Kpi {
  label: string
  value: string
  delta: string
  trend: "up" | "down"
  icon: typeof Inbox
  caption: string
}

const KPIS: Kpi[] = [
  { label: "Total requests",  value: "1,284", delta: "+12.4%", trend: "up",   icon: Inbox,         caption: "vs 1,142 last week" },
  { label: "Active cases",    value: "432",   delta: "+3.1%",  trend: "up",   icon: Clock,         caption: "8 due in 24h" },
  { label: "Completed today", value: "186",   delta: "+18%",   trend: "up",   icon: CheckCircle2,  caption: "all under SLA" },
  { label: "Avg. resolution", value: "2.4d",  delta: "-0.3d",  trend: "down", icon: TrendingUp,    caption: "faster than target" },
]

const STATIONS = [
  { name: "Dubai HQ",  officers: 84, load: 92 },
  { name: "Al Barsha", officers: 56, load: 71 },
  { name: "Deira",     officers: 42, load: 64 },
  { name: "Bur Dubai", officers: 38, load: 58 },
]

/* ── Snippets ── */

const KPI_GRID_SNIPPET = `const KPIS = [
  { label: "Total requests",  value: "1,284", delta: "+12.4%", trend: "up",   icon: Inbox,        caption: "vs 1,142 last week" },
  { label: "Active cases",    value: "432",   delta: "+3.1%",  trend: "up",   icon: Clock,        caption: "8 due in 24h" },
  { label: "Completed today", value: "186",   delta: "+18%",   trend: "up",   icon: CheckCircle2, caption: "all under SLA" },
  { label: "Avg. resolution", value: "2.4d",  delta: "-0.3d",  trend: "down", icon: TrendingUp,   caption: "faster than target" },
]

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
  {KPIS.map((kpi) => {
    const Icon  = kpi.icon
    const Arrow = kpi.trend === "up" ? ArrowUpRight : ArrowDownRight
    return (
      <CardWidget key={kpi.label}>
        <CardWidgetHeader>
          <CardWidgetIcon><Icon className="size-6 text-primary-600" /></CardWidgetIcon>
          <CardWidgetTitle>{kpi.label}</CardWidgetTitle>
          <CardWidgetAction>
            <Button variant="text" size="icon-sm" aria-label="More">
              <MoreHorizontal className="size-4" />
            </Button>
          </CardWidgetAction>
        </CardWidgetHeader>
        <CardWidgetContent>
          <p className="font-mono font-bold text-3xl text-sub-title">{kpi.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{kpi.caption}</p>
          <Badge size="sm" variant={kpi.trend === "up" ? "success" : "warning"} className="mt-3">
            <Arrow className="size-3" />
            {kpi.delta}
          </Badge>
        </CardWidgetContent>
      </CardWidget>
    )
  })}
</div>`

const STATIONS_SNIPPET = `const STATIONS = [
  { name: "Dubai HQ",  officers: 84, load: 92 },
  { name: "Al Barsha", officers: 56, load: 71 },
  { name: "Deira",     officers: 42, load: 64 },
  { name: "Bur Dubai", officers: 38, load: 58 },
]

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
  {STATIONS.map((s) => (
    <CardWidget key={s.name} size="sm">
      <CardWidgetHeader>
        <CardWidgetIcon><Users className="size-5 text-primary-600" /></CardWidgetIcon>
        <CardWidgetTitle>{s.name}</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <p className="font-mono font-bold text-xl text-sub-title">{s.officers}</p>
        <p className="text-[11px] text-muted-foreground">officers on duty</p>
        <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-[linear-gradient(135deg,var(--chart-primary-light),var(--chart-primary))]"
            style={{ width: \`\${s.load}%\` }}
          />
        </div>
        <p className="text-[11px] text-muted-foreground mt-1.5">load · {s.load}%</p>
      </CardWidgetContent>
    </CardWidget>
  ))}
</div>`

/* ── Reusable rendered example ── */

function KpiStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
      {KPIS.map((kpi) => {
        const Icon = kpi.icon
        const Arrow = kpi.trend === "up" ? ArrowUpRight : ArrowDownRight
        return (
          <CardWidget key={kpi.label}>
            <CardWidgetHeader>
              <CardWidgetIcon>
                <Icon className="size-6 text-primary-600" />
              </CardWidgetIcon>
              <CardWidgetTitle>{kpi.label}</CardWidgetTitle>
              <CardWidgetAction>
                <Button variant="text" size="icon-sm" aria-label="More">
                  <MoreHorizontal className="size-4" />
                </Button>
              </CardWidgetAction>
            </CardWidgetHeader>
            <CardWidgetContent>
              <p className="font-mono font-bold text-3xl text-sub-title">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.caption}</p>
              <Badge size="sm" variant={kpi.trend === "up" ? "success" : "warning"} className="mt-3">
                <Arrow className="size-3" />
                {kpi.delta}
              </Badge>
            </CardWidgetContent>
          </CardWidget>
        )
      })}
    </div>
  )
}

function StationStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
      {STATIONS.map((s) => (
        <CardWidget key={s.name} size="sm">
          <CardWidgetHeader>
            <CardWidgetIcon>
              <Users className="size-5 text-primary-600" />
            </CardWidgetIcon>
            <CardWidgetTitle>{s.name}</CardWidgetTitle>
          </CardWidgetHeader>
          <CardWidgetContent>
            <p className="font-mono font-bold text-xl text-sub-title">{s.officers}</p>
            <p className="text-[11px] text-muted-foreground">officers on duty</p>
            <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-[linear-gradient(135deg,var(--chart-primary-light),var(--chart-primary))]"
                style={{ width: `${s.load}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5">load · {s.load}%</p>
          </CardWidgetContent>
        </CardWidget>
      ))}
    </div>
  )
}

/* ── Page ── */

export default function CardKpiGridPage() {
  return (
    <ComponentPage
      title="KPI grid pattern"
      description="Top-of-dashboard KPI strip and compact station widgets — both built on the `CardWidget` primitive."
      category="Card patterns"
    >
      <Section title="Four-column KPI strip" description="Hero KPI row — icon, title, value, caption, delta badge. Use `xl:grid-cols-4` so the row collapses on smaller screens.">
        <PreviewBlock code={KPI_GRID_SNIPPET}>
          <KpiStrip />
        </PreviewBlock>
      </Section>

      <Section title="Compact station widgets" description="Dense KPI row using `size='sm'`. Includes a gradient load bar to visualize utilization at a glance.">
        <PreviewBlock code={STATIONS_SNIPPET}>
          <StationStrip />
        </PreviewBlock>
      </Section>

      <UsedComponents items={USED} />
    </ComponentPage>
  )
}
