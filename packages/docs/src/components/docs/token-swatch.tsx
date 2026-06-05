import { useState, type ReactNode } from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@dpds-gov/design-system"

export interface TokenSwatchProps {
  /** Human-readable token name, e.g. "Primary" or "primary-500". */
  name: string
  /** Resolved value to display (e.g. "oklch(0.5495 0.1269 158.75)" or "12px"). Optional. */
  value?: string
  /** CSS custom-property name including the leading -- (e.g. "--primary"). Copied to clipboard when the user clicks Copy. */
  cssVar: string
  /** The Tailwind utility that maps to this token (e.g. "bg-primary"). Optional. */
  tailwindClass?: string
  /**
   * Visual preview. If omitted, the swatch box uses var(<cssVar>) as its background.
   * Supply your own node for non-color tokens (a shadow demo, a radius demo, etc.).
   */
  preview?: ReactNode
  /** Extra annotation shown under the name (e.g. contrast info). */
  note?: string
  className?: string
}

export function TokenSwatch({
  name,
  value,
  cssVar,
  tailwindClass,
  preview,
  note,
  className,
}: TokenSwatchProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`var(${cssVar})`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore
    }
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-3",
        className
      )}
    >
      <div
        aria-hidden
        className="size-12 shrink-0 rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden"
        style={preview ? undefined : { background: `var(${cssVar})` }}
      >
        {preview}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-slate-100">
            {name}
          </p>
          {note && (
            <span className="shrink-0 rounded-full bg-gray-100 dark:bg-white/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-gray-600 dark:text-slate-300">
              {note}
            </span>
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-500 dark:text-slate-400">
          <code className="font-mono">{cssVar}</code>
          {tailwindClass && (
            <code className="font-mono text-gray-400 dark:text-slate-500">
              {tailwindClass}
            </code>
          )}
          {value && (
            <code className="font-mono text-gray-400 dark:text-slate-500 truncate">
              {value}
            </code>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : `Copy var(${cssVar})`}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1 text-xs font-medium text-gray-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-gray-50 dark:hover:bg-slate-700"
      >
        {copied ? (
          <>
            <Check className="size-3.5 text-primary-600" />
            <span className="text-primary-600">Copied</span>
          </>
        ) : (
          <>
            <Copy className="size-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  )
}

export default TokenSwatch
