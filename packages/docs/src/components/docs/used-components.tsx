import { Link } from "react-router-dom"
import { Boxes } from "lucide-react"

import { cn } from "@dpds-gov/design-system"

export interface UsedComponentItem {
  label: string
  href: string
}

export interface UsedComponentsProps {
  items: UsedComponentItem[]
  title?: string
  description?: string
  className?: string
}

export function UsedComponents({
  items,
  title = "Used components",
  description,
  className,
}: UsedComponentsProps) {
  if (items.length === 0) return null

  return (
    <div className={cn("flex flex-col gap-3 rounded-xl border border-dashed border-border bg-muted/20 p-4", className)}>
      <div className="flex items-center gap-2">
        <Boxes className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">{title}</p>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground max-w-2xl">{description}</p>
      )}
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 text-xs font-mono text-gray-800 dark:text-slate-200 border border-border hover:border-primary hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsedComponents
