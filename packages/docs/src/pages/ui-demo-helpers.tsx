import { cn } from "@dpds-gov/design-system"

/* ── Code Block ── */

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <pre className={cn(
      "rounded-xl bg-slate-950 dark:bg-slate-900 border border-slate-800 px-5 py-4 text-xs text-slate-200 overflow-x-auto leading-relaxed font-mono",
      className
    )}>
      <code>{code.trim()}</code>
    </pre>
  )
}

/* ── Props Table ── */

export interface PropRow {
  prop: string
  type: string
  default?: string
  description: string
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="px-4 py-2.5 text-left font-semibold text-foreground">Prop</th>
            <th className="px-4 py-2.5 text-left font-semibold text-foreground">Type</th>
            <th className="px-4 py-2.5 text-left font-semibold text-foreground">Default</th>
            <th className="px-4 py-2.5 text-left font-semibold text-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
              <td className="px-4 py-2.5 font-mono text-primary font-medium">{r.prop}</td>
              <td className="px-4 py-2.5 font-mono text-amber-600 dark:text-amber-400">{r.type}</td>
              <td className="px-4 py-2.5 font-mono text-muted-foreground">{r.default ?? "—"}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Section heading used inside demo cards ── */

export function DemoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">{children}</p>
  )
}
