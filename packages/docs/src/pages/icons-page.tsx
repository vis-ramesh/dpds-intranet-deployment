import { Bell, ChartLine, CircleUserRound, HeartHandshake, House, Search, Settings, ShieldCheck } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@dpds-gov/design-system"

export default function IconsPage() {
  const icons = [House, Search, Settings, Bell, CircleUserRound, ShieldCheck, ChartLine, HeartHandshake]

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div>
          <h1 className="text-[40px] font-bold font-mono tracking-tight text-secondary-600 dark:text-success-300 text-4xl">HugeIcons</h1>
          <p className="text-sm md:text-2xl text-gray-500">Icon set preview</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Icons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg- grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {icons.map((Icon, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 rounded-md border p-4">
                  <Icon className="size-8 text-primary" />
                  <span className="text-xs text-muted-foreground">Icon {idx + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
