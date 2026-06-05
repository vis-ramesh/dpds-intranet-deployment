import type { ReactNode } from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@dpds-gov/design-system"
import { Badge, badgeVariants } from "@dpds-gov/design-system"

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

export interface ComponentPageProps {
  title: string
  description: string
  category?: string
  /** Badge variant for the category pill. Defaults to "success" (green). */
  categoryVariant?: BadgeVariant
  children: ReactNode
  className?: string
}

export function ComponentPage({
  title,
  description,
  category,
  categoryVariant = "success",
  children,
  className,
}: ComponentPageProps) {
  return (
    <div className={cn("flex-col flex-1 w-full", className)}>
      <main className="flex mx-auto flex-1 flex-col gap-8 p-4 pt-12 lg:gap-10 lg:p-8 lg:pt-12 max-w-6xl">
        <header className="flex flex-col gap-3">
          {category && (
            <Badge variant={categoryVariant} size="lg" className="w-fit font-mono lowercase capitalize">
              {category}
            </Badge>
          )}
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

export interface SectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ title, description, children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("flex flex-col gap-4", className)}>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold font-mono text-gray-900 dark:text-slate-25">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-1 max-w-3xl">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export default ComponentPage
