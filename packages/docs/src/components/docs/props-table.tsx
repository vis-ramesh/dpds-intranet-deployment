import type { ReactNode } from "react"

import { cn } from "@dpds-gov/design-system"

export interface PropRow {
  name: string
  type: string
  defaultValue?: string
  description: ReactNode
  required?: boolean
}

export interface PropsTableProps {
  rows: PropRow[]
  className?: string
}

export function PropsTable({ rows, className }: PropsTableProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 dark:border-slate-700 overflow-x-auto",
        className
      )}
    >
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-slate-800/60 text-left text-xs uppercase tracking-wider text-gray-500 dark:text-slate-400">
            <th className="px-4 py-2.5 font-medium">Name</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Default</th>
            <th className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.name}
              className={cn(
                "align-top",
                idx !== rows.length - 1 && "border-b border-gray-100 dark:border-slate-800"
              )}
            >
              <td className="px-4 py-3 font-mono text-xs text-gray-900 dark:text-slate-100 whitespace-nowrap">
                {row.name}
                {row.required && (
                  <span
                    aria-label="Required"
                    title="Required"
                    className="ml-1 text-error-500 dark:text-error-300"
                  >
                    *
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <code className="inline-block max-w-[260px] overflow-x-auto rounded bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 text-xs font-mono text-primary-700 dark:text-primary-300 whitespace-pre">
                  {row.type}
                </code>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-gray-700 dark:text-slate-300 whitespace-nowrap">
                {row.defaultValue ?? <span className="text-gray-400">—</span>}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PropsTable
