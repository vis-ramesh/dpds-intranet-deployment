import { Link } from "react-router-dom"

import { cn } from "@dpds-gov/design-system"

export type FoundationKey =
  | "colors"
  | "typography"
  | "spacing"
  | "iconography"
  | "elevation"
  | "radius"
  | "motion"
  | "accessibility"

const FOUNDATION_META: Record<FoundationKey, { label: string; href: string }> = {
  colors: { label: "Colors", href: "/foundations/colors" },
  typography: { label: "Typography", href: "/foundations/typography" },
  spacing: { label: "Spacing", href: "/foundations/spacing" },
  iconography: { label: "Iconography", href: "/foundations/iconography" },
  elevation: { label: "Elevation", href: "/foundations/elevation" },
  radius: { label: "Radius", href: "/foundations/radius" },
  motion: { label: "Motion", href: "/foundations/motion" },
  accessibility: { label: "Accessibility", href: "/foundations/accessibility" },
}

export interface UsesTokensProps {
  foundations: FoundationKey[]
  /** Override the leading label. Default: "Uses tokens from:" */
  label?: string
  className?: string
}

export function UsesTokens({
  foundations,
  label = "Uses tokens from:",
  className,
}: UsesTokensProps) {
  if (foundations.length === 0) return null

  return (
    <p
      className={cn(
        "text-xs text-gray-500 dark:text-slate-400",
        className
      )}
    >
      <span className="font-medium">{label}</span>{" "}
      {foundations.map((key, i) => {
        const meta = FOUNDATION_META[key]
        return (
          <span key={key}>
            <Link
              to={meta.href}
              className="font-medium text-gray-700 hover:text-primary-700 hover:underline dark:text-slate-200 dark:hover:text-primary-300"
            >
              {meta.label}
            </Link>
            {i < foundations.length - 1 && <span aria-hidden> · </span>}
          </span>
        )
      })}
    </p>
  )
}

export default UsesTokens
