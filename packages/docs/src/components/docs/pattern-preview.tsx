import { useState } from "react"
import { ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react"

import { cn } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"

const VIEWPORTS = {
  desktop: { label: "Desktop", icon: Monitor, width: 1280 },
  tablet: { label: "Tablet", icon: Tablet, width: 768 },
  mobile: { label: "Mobile", icon: Smartphone, width: 375 },
} as const

type ViewportKey = keyof typeof VIEWPORTS

export interface PatternPreviewProps {
  /** Path to the standalone (outside Layout) preview route, e.g. "/preview/login". */
  standalonePath: string
  /** Accessible label for the iframe. */
  iframeTitle?: string
  /** Fixed iframe height. Defaults to 720. */
  height?: number
  /** Localized labels (so the toolbar respects i18n). */
  labels?: {
    desktop?: string
    tablet?: string
    mobile?: string
    openInNewTab?: string
  }
  className?: string
}

export function PatternPreview({
  standalonePath,
  iframeTitle = "Pattern preview",
  height = 720,
  labels,
  className,
}: PatternPreviewProps) {
  const [viewport, setViewport] = useState<ViewportKey>("desktop")
  const current = VIEWPORTS[viewport]

  const resolvedLabels = {
    desktop: labels?.desktop ?? "Desktop",
    tablet: labels?.tablet ?? "Tablet",
    mobile: labels?.mobile ?? "Mobile",
    openInNewTab: labels?.openInNewTab ?? "Open in new tab",
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-border bg-card p-3",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div
          role="radiogroup"
          aria-label={iframeTitle}
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1"
        >
          {(Object.keys(VIEWPORTS) as ViewportKey[]).map((key) => {
            const v = VIEWPORTS[key]
            const Icon = v.icon
            const active = key === viewport
            const localizedLabel =
              key === "desktop"
                ? resolvedLabels.desktop
                : key === "tablet"
                  ? resolvedLabels.tablet
                  : resolvedLabels.mobile
            return (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setViewport(key)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  active
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                <Icon className="size-3.5" />
                <span>{localizedLabel}</span>
                <span className="text-[10px] font-mono text-muted-foreground/80">
                  {v.width}px
                </span>
              </button>
            )
          })}
        </div>

        <Button variant="outlineGray" size="sm" asChild>
          <a href={standalonePath} target="_blank" rel="noreferrer">
            <ExternalLink className="size-3.5" />
            <span>{resolvedLabels.openInNewTab}</span>
          </a>
        </Button>
      </div>

      <div className="flex justify-center overflow-auto rounded-xl bg-muted/30 p-3">
        <div
          style={{ width: `${current.width}px`, maxWidth: "100%" }}
          className="transition-[width] duration-300 ease-out"
        >
          <iframe
            key={standalonePath}
            src={standalonePath}
            title={iframeTitle}
            style={{ height: `${height}px` }}
            className="block w-full rounded-lg border border-border bg-background"
          />
        </div>
      </div>
    </div>
  )
}

export default PatternPreview
