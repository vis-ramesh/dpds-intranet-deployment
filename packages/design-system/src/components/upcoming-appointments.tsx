import { Info } from "lucide-react"
import iconChannel from "../assets/img/icon-channel.svg"
import { Badge } from "./badge"
import { Button } from "./button"
import { CardWidget, CardWidgetContent, CardWidgetHeader, CardWidgetIcon, CardWidgetTitle } from "./card-widget"
import { EmptyStateHero } from "./empty-state-hero"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"

interface Appointment {
  title: string
  date: string
  status: string
}

const appointments: Record<string, Appointment[]> = {
  today: [
    { title: "Court session", date: "Today · 09 Sep 2025", status: "Tomorrow" },
    { title: "Court session", date: "Today · 09 Sep 2025", status: "Tomorrow" },
    { title: "Inquiry appointment", date: "Today · 09 Sep 2025", status: "Tomorrow" },
    { title: "Inquiry appointment", date: "Today · 09 Sep 2025", status: "Tomorrow" },
  ],
  tomorrow: [],
  thisweek: [],
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0">
      <div className=" min-w-0">
        <p className="font-mono font-bold text-sm leading-tight">{appointment.title}</p>
      </div>
      <div className="flex-1 flex justify-center w-full text-center">
        <p className="text-xs text-muted-foreground mt-0.5">{appointment.date}</p>

      <Badge variant="destructive" className="shrink-0 h-auto px-2.5 py-1 text-xs font-medium rounded-md">
        {appointment.status}
      </Badge>
      </div>
      <Button variant="gray" size="sm" className="shrink-0 gap-1.5  rounded-[32px]">
        <Info className="size-3.5" />
        Details
      </Button>
    </div>
  )
}

interface UpcomingAppointmentsProps {
  /** Lottie animation JSON shown inside the "Tomorrow" and "This week" empty states. */
  lottieData?: object
}

export function UpcomingAppointments({ lottieData }: UpcomingAppointmentsProps = {}) {
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetIcon>
              <img src={iconChannel} alt="Upcoming Appointments" />
        </CardWidgetIcon>
        <CardWidgetTitle>Upcoming Appointments</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        <Tabs defaultValue="today">
          <TabsList variant="default" className="mb-4 mx-auto">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="thisweek">This week</TabsTrigger>
          </TabsList>

          <TabsContent value="today">
            <div className="flex flex-col">
              {appointments.today.map((appt, i) => (
                <AppointmentRow key={i} appointment={appt} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tomorrow">
            <EmptyStateHero variant="small" title="No appointments" description="Nothing scheduled for tomorrow" isLottie lottieData={lottieData} />
          </TabsContent>

          <TabsContent value="thisweek">
            <EmptyStateHero variant="small" title="No appointments" description="Nothing scheduled this week" isLottie lottieData={lottieData} />
          </TabsContent>
        </Tabs>
      </CardWidgetContent>
    </CardWidget>
  )
}
