import type { ReactNode } from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@dpds-gov/design-system"
import { Badge, badgeVariants } from "@dpds-gov/design-system"

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

export interface PatternPageProps {
  title: string
  description: string
  category?: string
  /** Badge variant for the category pill. Defaults to "success". */
  categoryVariant?: BadgeVariant
  children: ReactNode
  className?: string
}

export function PatternPage({
  title,
  description,
  category = "Pattern",
  categoryVariant = "success",
  children,
  className,
}: PatternPageProps) {
  return (
    <div className={cn("flex flex-col flex-1 w-full", className)}>
      <main className="flex mx-auto flex-1 flex-col gap-8 p-4 lg:gap-10 lg:p-8 max-w-6xl">
        <header className="flex flex-col gap-3">
          <Badge variant={categoryVariant} size="lg" className="w-fit font-mono lowercase capitalize">
            {category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-gray-900 dark:text-slate-50">
            {title}
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-slate-400 max-w-3xl">
            {description}
          </p>
        </header>

        {children}
      </main>
    </div>
  )
}

export default PatternPage
