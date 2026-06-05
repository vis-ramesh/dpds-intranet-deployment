import type { ReactNode } from "react"

import { cn } from "@dpds-gov/design-system"

export interface TokenScaleItem {
  /** Token identifier shown in the first column (e.g. "4", "md", "lg"). */
  token: string
  /** Resolved value (e.g. "1rem / 16px"). */
  value: string
  /** Matching Tailwind class (e.g. "p-4", "shadow-md"). Optional. */
  tailwindClass?: string
  /** Live visual example rendered in the last column. */
  example: ReactNode
}

export interface TokenScaleProps {
  items: TokenScaleItem[]
  /** Custom header for the visual column (default "Example"). */
  exampleHeader?: string
  className?: string
}

export function TokenScale({
  items,
  exampleHeader = "Example",
  className,
}: TokenScaleProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-left text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-slate-400">
              <th className="px-4 py-3 font-medium">Token</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">Tailwind</th>
              <th className="px-4 py-3 font-medium">{exampleHeader}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.token}
                className="border-b border-gray-200 last:border-0 dark:border-white/5"
              >
                <td className="px-4 py-3 align-middle">
                  <code className="font-mono text-gray-900 dark:text-slate-100">{item.token}</code>
                </td>
                <td className="px-4 py-3 align-middle text-gray-600 dark:text-slate-300">
                  <code className="font-mono text-xs">{item.value}</code>
                </td>
                <td className="px-4 py-3 align-middle">
                  {item.tailwindClass ? (
                    <code className="font-mono text-xs text-gray-500 dark:text-slate-400">
                      {item.tailwindClass}
                    </code>
                  ) : (
                    <span className="text-gray-300 dark:text-slate-600">—</span>
                  )}
                </td>
                <td className="px-4 py-3 align-middle">{item.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TokenScale
