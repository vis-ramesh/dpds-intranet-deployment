import type { ReactNode } from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@dpds-gov/design-system"
import { Badge, badgeVariants } from "@dpds-gov/design-system"

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

export interface DocsPageProps {
  title: string
  description: string
  /** Eyebrow label rendered above the title (e.g. "Getting started"). */
  eyebrow?: string
  /** Badge variant for the eyebrow. Defaults to "success". */
  eyebrowVariant?: BadgeVariant
  children: ReactNode
  className?: string
}

export function DocsPage({
  title,
  description,
  eyebrow,
  eyebrowVariant = "success",
  children,
  className,
}: DocsPageProps) {
  return (
    <div className={cn("flex flex-col flex-1 w-full", className)}>
      <main className="flex mx-auto flex-1 flex-col gap-8 p-4 pt-12 lg:gap-10 lg:p-8 lg:pt-12 max-w-6xl">
        <header className="flex flex-col gap-3">
          {eyebrow && (
            <Badge variant={eyebrowVariant} size="lg" className="w-fit font-mono lowercase capitalize">
              {eyebrow}
            </Badge>
          )}
          <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-gray-900 dark:text-slate-25">
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

export default DocsPage
