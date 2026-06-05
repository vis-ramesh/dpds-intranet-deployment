// import { useRef } from "react"
import { FileTextIcon } from "@radix-ui/react-icons"
import { BellIcon, Share2Icon } from "lucide-react"
import { cn } from "@dpds-gov/design-system"
// import { Calendar } from "@dpds-gov/design-system"
import { BentoCard, BentoGrid } from "@dpds-gov/design-system"
import { Marquee } from "@dpds-gov/design-system"
import { AnimatedList, AnimatedListItem } from "@dpds-gov/design-system"
// import { AnimatedBeam } from "@dpds-gov/design-system"
import { FadeIn } from "@dpds-gov/design-system"
import { AnimatedBeamMultipleOutputDemo } from "@dpds-gov/design-system"

/* ── Marquee background ── */

const files = [
  { name: "report.pdf",     body: "Annual compliance report containing key metrics and performance indicators for the fiscal year." },
  { name: "data.xlsx",      body: "Spreadsheet with transaction records, sorted by date and station for monthly review." },
  { name: "logo.svg",       body: "Scalable vector graphic used across all Dubai Police digital assets and publications." },
  { name: "keys.gpg",       body: "Encrypted key file used to verify and authenticate system access across nodes." },
  { name: "backup.txt",     body: "Recovery seed phrase stored securely for disaster recovery and audit traceability." },
]

function MarqueeBackground() {
  return (
    <Marquee
      pauseOnHover
      className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
    >
      {files.map((f, i) => (
        <figure
          key={i}
          className={cn(
            "relative w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
          )}
        >
          <figcaption className="text-xs font-semibold dark:text-white truncate">{f.name}</figcaption>
          <blockquote className="mt-1 text-[10px] text-muted-foreground line-clamp-3">{f.body}</blockquote>
        </figure>
      ))}
    </Marquee>
  )
}

/* ── AnimatedList background ── */

const notifications = [
  { icon: "🔔", name: "New Request",       desc: "REQ-2025-047 submitted",     time: "just now",  color: "bg-primary/10 text-primary" },
  { icon: "✅", name: "Request Approved",  desc: "REQ-2025-043 completed",     time: "2m ago",    color: "bg-emerald-500/10 text-emerald-600" },
  { icon: "⚠️", name: "SLA Warning",       desc: "REQ-2025-039 nearing limit", time: "5m ago",    color: "bg-amber-500/10 text-amber-600" },
  { icon: "📋", name: "Report Ready",      desc: "Monthly PDF generated",      time: "12m ago",   color: "bg-blue-500/10 text-blue-600" },
  { icon: "🔐", name: "Login Detected",    desc: "New device signed in",       time: "1h ago",    color: "bg-red-500/10 text-red-600" },
]

function NotificationItem({ icon, name, desc, time, color }: typeof notifications[0]) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/80 px-3 py-2.5 shadow-sm backdrop-blur-sm">
      <span className={cn("size-8 rounded-lg flex items-center justify-center text-sm shrink-0", color)}>{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold truncate">{name}</p>
        <p className="text-[10px] text-muted-foreground truncate">{desc}</p>
      </div>
      <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">{time}</span>
    </div>
  )
}

function AnimatedListBackground({ className }: { className?: string }) {
  return (
    <AnimatedList className={cn("w-full px-3", className)} delay={1200}>
      {notifications.map((n, i) => (
        <AnimatedListItem key={i}>
          <NotificationItem {...n} />
        </AnimatedListItem>
      ))}
    </AnimatedList>
  )
}




/* ── Features config ── */

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "Files are automatically saved and indexed as you work.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <MarqueeBackground />,
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Stay updated with real-time activity alerts.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListBackground className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Connects to 100+ data sources and services.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute top-4 right-2 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
    ),
  },
  {
     Icon: FileTextIcon,
    name: "Save your files",
    description: "Files are automatically saved and indexed as you work.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <MarqueeBackground />,
  },
]

export default function BentoDemoPage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-6 lg:p-6">
        <FadeIn from="up">
          <div>
            <h1 className="text-[40px] font-bold font-mono tracking-tight text-secondary-600 dark:text-success-300">
              Bento Grid
            </h1>
            <p className="text-sm md:text-2xl text-gray-500">Animated bento card layouts with Marquee, AnimatedList &amp; AnimatedBeam</p>
          </div>
        </FadeIn>

        <FadeIn from="up" delay={0.1}>
          <BentoGrid>
            {features.map((f, i) => (
              <BentoCard key={i} {...f} />
            ))}
          </BentoGrid>
        </FadeIn>
      </main>
    </div>
  )
}
