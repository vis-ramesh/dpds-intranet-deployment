import type { VariantProps } from "class-variance-authority"

import { ComponentPage, Section } from "@/components/docs"
import { Badge, type badgeVariants } from "@dpds-gov/design-system"
import { CardWidget, CardWidgetContent } from "@dpds-gov/design-system"
import changelogData from "@/data/changelog.json"

type ChangeType = "added" | "changed" | "fixed" | "removed" | "docs" | "chore"
type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

interface ChangelogEntry {
  date: string
  type: ChangeType
  summary: string
  details?: string[]
  files?: string[]
}

const TYPE_VARIANT: Record<ChangeType, BadgeVariant> = {
  added: "success",
  changed: "info",
  fixed: "warning",
  removed: "danger",
  docs: "neutral",
  chore: "neutral",
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

function groupByDate(entries: ChangelogEntry[]): Array<{ date: string; items: ChangelogEntry[] }> {
  const map = new Map<string, ChangelogEntry[]>()
  for (const entry of entries) {
    const list = map.get(entry.date) ?? []
    list.push(entry)
    map.set(entry.date, list)
  }
  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([date, items]) => ({ date, items }))
}

export default function ChangelogPage() {
  const entries = (changelogData.entries as ChangelogEntry[]) ?? []
  const groups = groupByDate(entries)

  return (
    <ComponentPage
      category="Docs"
      title="Changelog"
      description="Notable changes to the design system and template, newest first."
    >
      {groups.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-slate-400">No entries yet.</p>
      ) : (
        groups.map(({ date, items }) => (
          <Section key={date} title={formatDate(date)}>
            <div className="flex flex-col gap-4">
              {items.map((entry, i) => (
                <CardWidget key={`${date}-${i}`} size="sm">
                  <CardWidgetContent className="p-8 md:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={TYPE_VARIANT[entry.type]}
                        size="md"
                        className="font-mono lowercase capitalize"
                      >
                        {entry.type}
                      </Badge>
                      <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
                        {entry.summary}
                      </span>
                    </div>

                    {entry.details && entry.details.length > 0 && (
                      <ul className="mt-3 ms-1 flex list-disc flex-col gap-1 ps-4 text-sm text-gray-700 dark:text-slate-300">
                        {entry.details.map((d, j) => (
                          <li key={j}>{d}</li>
                        ))}
                      </ul>
                    )}

                    {entry.files && entry.files.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {entry.files.map((f) => (
                          <code
                            key={f}
                            className="rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-[11px] text-gray-700 dark:bg-white/10 dark:text-slate-200"
                          >
                            {f}
                          </code>
                        ))}
                      </div>
                    )}
                  </CardWidgetContent>
                </CardWidget>
              ))}
            </div>
          </Section>
        ))
      )}
    </ComponentPage>
  )
}
