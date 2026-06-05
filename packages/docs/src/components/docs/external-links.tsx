import { ArrowUpRight } from "lucide-react"
import { cn } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"

export interface ExternalLink {
  label: string
  href: string
  description?: string
}

export interface ExternalLinksProps {
  items: ExternalLink[]
  title?: string
  className?: string
}

export function ExternalLinks({ items, title = "Related libraries", className }: ExternalLinksProps) {
  if (items.length === 0) return null

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h2 className="text-xl md:text-2xl font-semibold font-mono text-gray-900 dark:text-slate-100">
        {title}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Button variant="outlineGray" size="sm" asChild>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <span>{item.label}</span>
                <ArrowUpRight className="size-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExternalLinks
