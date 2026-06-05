import { CardWidget, CardWidgetContent, CardWidgetHeader, CardWidgetIcon, CardWidgetTitle } from "@dpds-gov/design-system"
import { GaugeChart } from "@dpds-gov/design-system"
// import { PointCloudChart } from "@dpds-gov/design-system"
// import { SalesReportChart } from "@dpds-gov/design-system"
import { SankeyChart } from "@dpds-gov/design-system"
// import { BubbleStatChart } from "@dpds-gov/design-system"
import { StackedBarChart } from "@dpds-gov/design-system"
import { StraightLineChart } from "@dpds-gov/design-system"
import { ActivityBarChart } from "@dpds-gov/design-system"
import { useTranslation } from "react-i18next"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { GlowRadarChart } from "@dpds-gov/design-system"

const trafficData = [
  { month: "Jan", visitors: 2200 },
  { month: "Feb", visitors: 2800 },
  { month: "Mar", visitors: 3100 },
  { month: "Apr", visitors: 2900 },
  { month: "May", visitors: 3600 },
  { month: "Jun", visitors: 4020 },
]

const revenueData = [
  { month: "Jan", online: 24, retail: 18 },
  { month: "Feb", online: 28, retail: 20 },
  { month: "Mar", online: 32, retail: 25 },
  { month: "Apr", online: 35, retail: 27 },
  { month: "May", online: 31, retail: 26 },
  { month: "Jun", online: 38, retail: 30 },
]

const conversionData = [
  { week: "W1", rate: 2.4 },
  { week: "W2", rate: 2.8 },
  { week: "W3", rate: 3.1 },
  { week: "W4", rate: 3.5 },
  { week: "W5", rate: 3.2 },
  { week: "W6", rate: 3.8 },
]

const radarData = [
  { metric: "Speed", value: 82 },
  { metric: "Reliability", value: 91 },
  { metric: "Security", value: 78 },
  { metric: "Scalability", value: 65 },
  { metric: "Usability", value: 88 },
  { metric: "Efficiency", value: 74 },
]


const radarsData = [
  { metric: "Response Time", current: 6, previous: 5 },
  { metric: "Ease of Use", current: 8, previous: 7.5 },
  { metric: "Satisfaction", current: 8.5, previous: 9.5 },
  { metric: "Complaint Handling", current: 7, previous: 6.5 }
];

export const kioskData = [
  { lat: 25.2048, lng: 55.2708, usage: 120 },
  { lat: 25.1972, lng: 55.2744, usage: 80 },
  { lat: 25.2040, lng: 55.2715, usage: 150 },
  { lat: 25.2100, lng: 55.2800, usage: 60 },

  { lat: 24.4539, lng: 54.3773, usage: 90 },
  { lat: 24.4600, lng: 54.3700, usage: 110 },
  { lat: 24.4700, lng: 54.3900, usage: 70 },

  { lat: 25.3463, lng: 55.4209, usage: 50 },
  { lat: 25.3500, lng: 55.4300, usage: 40 },

  { lat: 25.4052, lng: 55.5136, usage: 30 },

  { lat: 25.8007, lng: 55.9762, usage: 25 },

  { lat: 25.1288, lng: 56.3265, usage: 20 }
];

function WidgetHeader({ title }: { title: string }) {
  return (
    <CardWidgetHeader>
      <CardWidgetIcon>
        <div className="rounded-2xl p-2 bg-primary-25 dark:bg-emerald-50/10">
          <div className="aspect-square relative">
            <img src="/img/icon-channel.svg" alt={title} />
          </div>
        </div>
      </CardWidgetIcon>
      <CardWidgetTitle>{title}</CardWidgetTitle>
    </CardWidgetHeader>
  )
}

export default function ChartsPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div>
          <h1 className="text-[40px] font-bold font-mono tracking-tight text-secondary-600 dark:text-success-300 text-4xl">
            {t("charts.title")}
          </h1>
          <p className="text-sm md:text-2xl text-gray-500">{t("charts.subtitle")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <CardWidget>
            <WidgetHeader title={t("charts.monthlyTraffic")} />
            <CardWidgetContent>
              <div className="min-h-[260px] w-full">
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="4 4" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#15803d"
                      fill="url(#trafficGradient)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardWidgetContent>
          </CardWidget>


          <CardWidget wrapperClassName="md:col-span-2">
            <WidgetHeader title="Service Request Flow" />
            <CardWidgetContent>
              <SankeyChart />
            </CardWidgetContent>
          </CardWidget>


          <CardWidget>
            <WidgetHeader title={t("charts.revenueSplit")} />
            <CardWidgetContent>
              <ActivityBarChart
                data={revenueData}
                series={[
                  { key: "online", label: "Online", color: "var(--chart-primary)",   secondaryColor: "var(--chart-primary-light)" },
                  { key: "retail", label: "Retail", color: "var(--chart-secondary)", secondaryColor: "var(--chart-secondary-light)" },
                ]}
                xKey="month"
                height={260}
              />
            </CardWidgetContent>
          </CardWidget>

          <CardWidget>
            <WidgetHeader title={t("charts.conversionTrend")} />
            <CardWidgetContent>
              <StraightLineChart
                data={conversionData}
                series={[
                  { key: "rate", label: "Conversion Rate", color: "var(--chart-primary)" },
                ]}
                xKey="week"
                height={260}
              />
            </CardWidgetContent>
          </CardWidget>

          <CardWidget className="overflow-hidden p-0">
            <WidgetHeader title={t("charts.performanceRadar")} />
            <CardWidgetContent className="p-0">
              <GlowRadarChart
                data={radarData}
                metricKey="metric"
                series={[{ key: "value", label: "Score", color: "var(--chart-primary)" }]}
                height={400}
              />
            </CardWidgetContent>
          </CardWidget>

          <CardWidget className="overflow-hidden p-0">
            <WidgetHeader title={t("charts.performanceRadar")} />
            <CardWidgetContent className="p-0">
              <GlowRadarChart
                data={radarsData}
                metricKey="metric"
                series={[
                  { key: "current", label: "Current", color: "var(--chart-primary)" },
                  { key: "previous", label: "Previous", color: "var(--chart-tertiary)" },
                ]}
                height={400}
              />
            </CardWidgetContent>
          </CardWidget>

          <CardWidget>
            <WidgetHeader title="Compliance Rate" />
            <CardWidgetContent>
              <GaugeChart value={87} max={100} label="Compliance rate" />
            </CardWidgetContent>
          </CardWidget>

          {/* <CardWidget wrapperClassName="md:col-span-2">
            <WidgetHeader title="3D Point Cloud" />
            <CardWidgetContent className="p-0">
              <PointCloudChart className="h-[420px] rounded-b-2xl" />
            </CardWidgetContent>
          </CardWidget> */}




{/* 
          <CardWidget wrapperClassName="md:col-span-2">
            <WidgetHeader title="Key Statistics" />
            <CardWidgetContent>
              <BubbleStatChart />
            </CardWidgetContent>
          </CardWidget> */}

          <CardWidget>
            <WidgetHeader title="Activities" />
            <CardWidgetContent>
              <StackedBarChart />
            </CardWidgetContent>
          </CardWidget>

          <CardWidget wrapperClassName="md:col-span-2">
            <WidgetHeader title="Activities" />
            <CardWidgetContent>
              <StraightLineChart
                data={[
                  { month: "JAN", s1: 1,   s2: 1   },
                  { month: "FEB", s1: 2.2, s2: 1.7 },
                  { month: "MAR", s1: 6.2, s2: 2.2 },
                  { month: "APR", s1: 4.5, s2: 6.1 },
                  { month: "MAY", s1: 7.1, s2: 4.0 },
                  { month: "JUN", s1: 6.8, s2: 5.0 },
                  { month: "JUL", s1: 8.2, s2: 5.6 },
                ]}
                series={[
                  { key: "s1", label: "Series 1", color: "#26D07C", area: true },
                  { key: "s2", label: "Series 2", color: "#f59e0b", dashed: true },
                ]}
                xKey="month"
              />
            </CardWidgetContent>
          </CardWidget>
        </div>
      </main>
    </div>
  )
}
