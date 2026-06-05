import { Mail, MoreHorizontal, Phone, Star } from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dpds-gov/design-system"
import { Avatar, AvatarFallback, AvatarImage } from "@dpds-gov/design-system"
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
  { label: "Card",   href: "/ui/card" },
  { label: "Avatar", href: "/ui/avatar" },
  { label: "Badge",  href: "/ui/badges" },
  { label: "Button", href: "/buttons" },
]

/* ── Data ── */

interface Officer {
  id: string
  name: string
  rank: string
  station: string
  avatar: string
  email: string
  phone: string
  cases: number
  rating: number
  status: "on-duty" | "off-duty" | "leave"
}

const OFFICERS: Officer[] = [
  { id: "OF-001", name: "Mariam Ahmed",    rank: "Captain",          station: "Al Barsha", avatar: "/img/avatar/avatar-1.png", email: "mariam.ahmed@dubaipolice.ae",  phone: "+971 50 123 4567", cases: 42, rating: 4.9, status: "on-duty" },
  { id: "OF-002", name: "Khalid Bin Saif", rank: "First Lieutenant", station: "Deira HQ",  avatar: "/img/avatar/avatar-2.png", email: "khalid.binsaif@dubaipolice.ae",phone: "+971 50 234 5678", cases: 38, rating: 4.7, status: "on-duty" },
  { id: "OF-003", name: "Sara Al Hashimi", rank: "Major",            station: "Jumeirah",  avatar: "/img/avatar/avatar-3.png", email: "sara.alhashimi@dubaipolice.ae",phone: "+971 50 345 6789", cases: 56, rating: 4.8, status: "leave" },
  { id: "OF-004", name: "Faisal Al Marri", rank: "Lieutenant",       station: "Al Quoz",   avatar: "/img/avatar/avatar-4.png", email: "faisal.almarri@dubaipolice.ae",phone: "+971 50 456 7890", cases: 27, rating: 4.5, status: "off-duty" },
  { id: "OF-005", name: "Layla Al Falasi", rank: "Captain",          station: "Bur Dubai", avatar: "/img/avatar/avatar-5.png", email: "layla.alfalasi@dubaipolice.ae",phone: "+971 50 567 8901", cases: 49, rating: 4.9, status: "on-duty" },
  { id: "OF-006", name: "Hassan Suwaidi",  rank: "First Lieutenant", station: "Al Barsha", avatar: "/img/avatar/avatar-6.png", email: "hassan.suwaidi@dubaipolice.ae",phone: "+971 50 678 9012", cases: 33, rating: 4.6, status: "on-duty" },
]

const STATUS_MAP: Record<Officer["status"], { variant: "success" | "neutral" | "warning"; label: string }> = {
  "on-duty":  { variant: "success", label: "On duty" },
  "off-duty": { variant: "neutral", label: "Off duty" },
  leave:      { variant: "warning", label: "On leave" },
}

/* ── Snippet ── */

const PROFILE_GRID_SNIPPET = `const STATUS_MAP = {
  "on-duty":  { variant: "success", label: "On duty" },
  "off-duty": { variant: "neutral", label: "Off duty" },
  leave:      { variant: "warning", label: "On leave" },
}

function OfficerCard({ officer }) {
  const status = STATUS_MAP[officer.status]
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src={officer.avatar} alt={officer.name} />
            <AvatarFallback>{officer.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle>{officer.name}</CardTitle>
            <CardDescription>{officer.rank} · {officer.station}</CardDescription>
          </div>
        </div>
        <CardAction>
          <Button variant="text" size="icon-sm" aria-label="More">
            <MoreHorizontal className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Badge size="sm" variant={status.variant}>{status.label}</Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-warning-400 text-warning-400" />
            <span className="font-mono font-bold text-foreground">{officer.rating}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="size-3.5 shrink-0" />
            <span className="truncate">{officer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="size-3.5 shrink-0" />
            <span className="font-mono">{officer.phone}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="font-mono font-bold text-xl text-sub-title">{officer.cases}</span>
          <span className="text-xs text-muted-foreground">open cases</span>
        </div>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button variant="text" size="sm">Message</Button>
        <Button size="sm">View profile</Button>
      </CardFooter>
    </Card>
  )
}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
  {OFFICERS.map((o) => <OfficerCard key={o.id} officer={o} />)}
</div>`

/* ── Render ── */

function OfficerCard({ officer }: { officer: Officer }) {
  const status = STATUS_MAP[officer.status]
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src={officer.avatar} alt={officer.name} />
            <AvatarFallback>{officer.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle>{officer.name}</CardTitle>
            <CardDescription>{officer.rank} · {officer.station}</CardDescription>
          </div>
        </div>
        <CardAction>
          <Button variant="text" size="icon-sm" aria-label="More">
            <MoreHorizontal className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Badge size="sm" variant={status.variant}>{status.label}</Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-warning-400 text-warning-400" />
            <span className="font-mono font-bold text-foreground">{officer.rating}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="size-3.5 shrink-0" />
            <span className="truncate">{officer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="size-3.5 shrink-0" />
            <span className="font-mono">{officer.phone}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="font-mono font-bold text-xl text-sub-title">{officer.cases}</span>
          <span className="text-xs text-muted-foreground">open cases</span>
        </div>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button variant="text" size="sm">Message</Button>
        <Button size="sm">View profile</Button>
      </CardFooter>
    </Card>
  )
}

/* ── Page ── */

export default function CardProfileGridPage() {
  return (
    <ComponentPage
      title="Profile grid pattern"
      description="Officer / contact directory composed with the canonical `Card` primitive — header avatar, content metadata, footer actions."
      category="Card patterns"
    >
      <Section title="Officer directory grid" description="Responsive 1 → 2 → 3 column grid. Each card uses every `Card` subcomponent: Header, Action, Content, Footer.">
        <PreviewBlock code={PROFILE_GRID_SNIPPET}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            {OFFICERS.map((o) => <OfficerCard key={o.id} officer={o} />)}
          </div>
        </PreviewBlock>
      </Section>

      <UsedComponents items={USED} />
    </ComponentPage>
  )
}
