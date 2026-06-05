import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"

export interface RelatedLink {
  label: string
  href: string
}

export interface RelatedLinksProps {
  items: RelatedLink[]
  title?: string
  className?: string
}

export function RelatedLinks({ items, title = "Related components", className }: RelatedLinksProps) {
  if (items.length === 0) return null

  return (
    <>
      <hr className="my-4 border-t border-border" />

      <div className={cn("flex flex-col gap-3", className)}>
        <h2 className="text-xl md:text-2xl font-semibold font-mono text-gray-900 dark:text-slate-100">
          {title}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item.href}>
              <Button variant="outlineGray" size="sm" asChild>
                <Link to={item.href}>
                  <span>{item.label}</span>
                  <ArrowUpRight className="size-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default RelatedLinks
