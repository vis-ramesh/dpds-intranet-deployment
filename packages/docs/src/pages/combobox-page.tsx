import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxLoading,
  ComboboxSeparator,
  ComboboxTrigger,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
import { Tag } from "@dpds-gov/design-system"
import { cn } from "@dpds-gov/design-system"
import {
  CodeBlock,
  ComponentPage,
  PreviewBlock,
  PropsTable,
  RelatedLinks,
  Section,
  UsesTokens,
} from "@/components/docs"
import type { PropRow } from "@/components/docs"

/* ── Domain data — used across multiple examples ── */

interface Agent {
  value: string
  label: string
  team?: string
  description?: string
}

const AGENTS: Agent[] = [
  { value: "amal", label: "Amal Hassan", team: "Tier 1", description: "Customer service" },
  { value: "khalid", label: "Khalid Saeed", team: "Tier 2", description: "Escalations" },
  { value: "fatima", label: "Fatima Al Maktoum", team: "Tier 2", description: "Trade licensing" },
  { value: "raji", label: "Raji Pillai", team: "Tier 3", description: "Engineering on-call" },
  { value: "noor", label: "Noor Abdulla", team: "Tier 1", description: "Customer service" },
  { value: "yusuf", label: "Yusuf Tariq", team: "Tier 3", description: "Engineering on-call" },
]

/* ── Snippets ── */

const INSTALL_SNIPPET = `import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxItem,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"

export function AssigneePicker() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outlineGray" size="md" className="w-[240px] justify-between">
          {value ? AGENTS.find((a) => a.value === value)?.label : "Assign to agent..."}
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search agents..." />
        <ComboboxList>
          <ComboboxEmpty>No agents match.</ComboboxEmpty>
          {AGENTS.map((a) => (
            <ComboboxItem
              key={a.value}
              value={a.value}
              onSelect={(v) => {
                setValue(v === value ? "" : v)
                setOpen(false)
              }}
            >
              {a.label}
              <Check className={cn("ms-auto size-4", value === a.value ? "opacity-100" : "opacity-0")} />
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`

const PREVIEW_SNIPPET = `<Combobox>
  <ComboboxTrigger asChild>
    <Button variant="outlineGray" className="w-[240px] justify-between">
      Assign to agent...
      <ChevronsUpDown className="size-4 opacity-50" />
    </Button>
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput placeholder="Search agents..." />
    <ComboboxList>
      <ComboboxEmpty>No agents match.</ComboboxEmpty>
      {AGENTS.map((a) => (
        <ComboboxItem key={a.value} value={a.value}>
          {a.label}
        </ComboboxItem>
      ))}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const EXAMPLE_SNIPPETS = {
  default: PREVIEW_SNIPPET,
  multiSelect: `const [selected, setSelected] = useState<Set<string>>(new Set())

<Combobox>
  <ComboboxTrigger asChild>
    <Button variant="outlineGray" className="w-[280px] justify-between">
      {selected.size === 0 ? "Filter by tag..." : \`\${selected.size} selected\`}
      <ChevronsUpDown className="size-4 opacity-50" />
    </Button>
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput placeholder="Search tags..." />
    <ComboboxList>
      <ComboboxEmpty>No tags match.</ComboboxEmpty>
      {TAGS.map((tag) => (
        <ComboboxItem
          key={tag}
          value={tag}
          onSelect={(v) => {
            const next = new Set(selected)
            next.has(v) ? next.delete(v) : next.add(v)
            setSelected(next)
          }}
        >
          <Check className={cn("size-4", selected.has(tag) ? "opacity-100" : "opacity-0")} />
          {tag}
        </ComboboxItem>
      ))}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  withGroups: `<ComboboxList>
  <ComboboxEmpty>No agents match.</ComboboxEmpty>
  <ComboboxGroup heading="Tier 1">
    <ComboboxItem value="amal">Amal Hassan</ComboboxItem>
    <ComboboxItem value="noor">Noor Abdulla</ComboboxItem>
  </ComboboxGroup>
  <ComboboxSeparator />
  <ComboboxGroup heading="Tier 2">
    <ComboboxItem value="khalid">Khalid Saeed</ComboboxItem>
    <ComboboxItem value="fatima">Fatima Al Maktoum</ComboboxItem>
  </ComboboxGroup>
</ComboboxList>`,
  creatable: `const [query, setQuery] = useState("")
const [tags, setTags] = useState<string[]>(["VIP", "Escalated"])

<Combobox>
  <ComboboxTrigger asChild>
    <Button variant="outlineGray" className="w-[280px]">Add tag...</Button>
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput value={query} onValueChange={setQuery} placeholder="Search or create..." />
    <ComboboxList>
      <ComboboxEmpty>
        {query ? (
          <button onClick={() => { setTags([...tags, query]); setQuery("") }}>
            Create "{query}"
          </button>
        ) : "Type to search or create a tag."}
      </ComboboxEmpty>
      {tags.map((t) => <ComboboxItem key={t} value={t}>{t}</ComboboxItem>)}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  asyncLoading: `// Set shouldFilter={false} on ComboboxContent so cmdk doesn't filter — your server already did.
const [query, setQuery] = useState("")
const [loading, setLoading] = useState(false)
const [results, setResults] = useState<Customer[]>([])

useEffect(() => {
  if (!query) { setResults([]); return }
  setLoading(true)
  const t = setTimeout(async () => {
    const r = await searchCustomers(query)
    setResults(r)
    setLoading(false)
  }, 300)
  return () => clearTimeout(t)
}, [query])

<Combobox>
  <ComboboxTrigger asChild>
    <Button variant="outlineGray" className="w-[280px]">Find customer...</Button>
  </ComboboxTrigger>
  <ComboboxContent shouldFilter={false}>
    <ComboboxInput value={query} onValueChange={setQuery} placeholder="Type to search..." />
    <ComboboxList>
      {loading && <ComboboxLoading>Searching...</ComboboxLoading>}
      {!loading && results.length === 0 && <ComboboxEmpty>No customers found.</ComboboxEmpty>}
      {results.map((c) => <ComboboxItem key={c.id} value={c.id}>{c.name}</ComboboxItem>)}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  disabled: `<ComboboxTrigger asChild>
  <Button variant="outlineGray" disabled className="w-[240px]">
    Auto-assigned by SLA rules
  </Button>
</ComboboxTrigger>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "Combobox.open",
      type: "boolean",
      description: "Controlled open state. Pair with onOpenChange when you want to drive the popover from React state.",
    },
    {
      name: "Combobox.onOpenChange",
      type: "(open: boolean) => void",
      description: "Fires when the popover opens or closes. Use to commit selection-on-close, reset query on dismiss, etc.",
    },
    {
      name: "Combobox.defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Initial open state for uncontrolled usage.",
    },
    {
      name: "ComboboxContent.shouldFilter",
      type: "boolean",
      defaultValue: "true",
      description: "Set false when the server (or your own logic) already filtered — disables cmdk's client-side filter.",
    },
    {
      name: "ComboboxContent.align",
      type: '"start" | "center" | "end"',
      defaultValue: '"start"',
      description: "Where the content sits relative to the trigger.",
    },
    {
      name: "ComboboxInput.value",
      type: "string",
      description: "Controlled query value. Pair with onValueChange for async / creatable patterns.",
    },
    {
      name: "ComboboxInput.onValueChange",
      type: "(value: string) => void",
      description: "Fires on every keystroke. Receives the current query string.",
    },
    {
      name: "ComboboxGroup.heading",
      type: "string",
      description: "Group label shown above its items. Rendered as uppercase mono text.",
    },
    {
      name: "ComboboxItem.value",
      type: "string",
      required: true,
      description: "Unique id. Passed to onSelect. cmdk also uses it as the default match string for filtering.",
    },
    {
      name: "ComboboxItem.onSelect",
      type: "(value: string) => void",
      description: "Fires when the user picks the item (click or Enter). Receives the item's value prop.",
    },
    {
      name: "ComboboxItem.disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Removes the item from keyboard navigation and dims it.",
    },
  ]
}

/* ── Live demo bits ── */

function DefaultExample() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const selected = AGENTS.find((a) => a.value === value)

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outlineGray" size="md" className="w-[240px] justify-between">
          {selected ? selected.label : "Assign to agent..."}
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search agents..." />
        <ComboboxList>
          <ComboboxEmpty>No agents match.</ComboboxEmpty>
          {AGENTS.map((a) => (
            <ComboboxItem
              key={a.value}
              value={a.value}
              onSelect={(v) => {
                setValue(v === value ? "" : v)
                setOpen(false)
              }}
            >
              {a.label}
              <Check
                className={cn(
                  "ms-auto size-4",
                  value === a.value ? "opacity-100" : "opacity-0"
                )}
              />
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

const TAG_OPTIONS = ["VIP", "Escalated", "SLA Breach", "Refund", "Repeat customer", "Compliance"]

function MultiSelectExample() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["VIP"]))

  return (
    <div className="flex flex-col gap-2">
      <Combobox>
        <ComboboxTrigger asChild>
          <Button variant="outlineGray" size="md" className="w-[280px] justify-between">
            {selected.size === 0 ? "Filter by tag..." : `${selected.size} selected`}
            <ChevronsUpDown className="size-4 opacity-50" />
          </Button>
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Search tags..." />
          <ComboboxList>
            <ComboboxEmpty>No tags match.</ComboboxEmpty>
            {TAG_OPTIONS.map((tag) => (
              <ComboboxItem
                key={tag}
                value={tag}
                onSelect={(v) => {
                  const next = new Set(selected)
                  if (next.has(v)) next.delete(v)
                  else next.add(v)
                  setSelected(next)
                }}
              >
                <Check
                  className={cn(
                    "size-4",
                    selected.has(tag) ? "opacity-100" : "opacity-0"
                  )}
                />
                {tag}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {selected.size > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {Array.from(selected).map((s) => (
            <Tag key={s} size="sm">
              {s}
            </Tag>
          ))}
        </div>
      )}
    </div>
  )
}

function GroupsExample() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const grouped = AGENTS.reduce<Record<string, Agent[]>>((acc, a) => {
    const k = a.team ?? "Other"
    acc[k] = acc[k] ?? []
    acc[k].push(a)
    return acc
  }, {})

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outlineGray" size="md" className="w-[280px] justify-between">
          {value ? AGENTS.find((a) => a.value === value)?.label : "Pick an agent..."}
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search agents..." />
        <ComboboxList>
          <ComboboxEmpty>No agents match.</ComboboxEmpty>
          {Object.entries(grouped).map(([team, list], i) => (
            <div key={team}>
              {i > 0 && <ComboboxSeparator />}
              <ComboboxGroup heading={team}>
                {list.map((a) => (
                  <ComboboxItem
                    key={a.value}
                    value={a.value}
                    onSelect={(v) => {
                      setValue(v)
                      setOpen(false)
                    }}
                  >
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate">{a.label}</span>
                      {a.description && (
                        <span className="truncate text-xs text-muted-foreground">
                          {a.description}
                        </span>
                      )}
                    </div>
                    <Check
                      className={cn(
                        "ms-auto size-4",
                        value === a.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </div>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function CreatableExample() {
  const [query, setQuery] = useState("")
  const [tags, setTags] = useState<string[]>(["VIP", "Escalated"])
  const [open, setOpen] = useState(false)
  const exists = tags.some((t) => t.toLowerCase() === query.toLowerCase())

  function commit(value: string) {
    if (!tags.includes(value)) setTags([...tags, value])
    setQuery("")
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <Combobox open={open} onOpenChange={setOpen}>
        <ComboboxTrigger asChild>
          <Button variant="outlineGray" size="md" className="w-[280px] justify-between">
            Add a tag...
            <Plus className="size-4 opacity-50" />
          </Button>
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search or create..."
          />
          <ComboboxList>
            <ComboboxEmpty>
              {query && !exists ? (
                <button
                  type="button"
                  onClick={() => commit(query)}
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-accent"
                >
                  <Plus className="size-3.5" />
                  Create "<span className="font-medium">{query}</span>"
                </button>
              ) : (
                "Type to search or create a tag."
              )}
            </ComboboxEmpty>
            {tags.map((t) => (
              <ComboboxItem key={t} value={t} onSelect={commit}>
                {t}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <Tag key={t} size="sm">
            {t}
          </Tag>
        ))}
      </div>
    </div>
  )
}

/* Mock async search — pretend results come from a server. */
const CUSTOMERS = [
  { id: "c1", name: "Al Futtaim Trading" },
  { id: "c2", name: "Etihad Aviation Group" },
  { id: "c3", name: "Emaar Properties" },
  { id: "c4", name: "Majid Al Futtaim" },
  { id: "c5", name: "Dubai Holdings" },
]

function AsyncLoadingExample() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<typeof CUSTOMERS>([])

  useEffect(() => {
    if (!query) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    const t = setTimeout(() => {
      setResults(
        CUSTOMERS.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
      )
      setLoading(false)
    }, 500)
    return () => clearTimeout(t)
  }, [query])

  return (
    <Combobox>
      <ComboboxTrigger asChild>
        <Button variant="outlineGray" size="md" className="w-[280px] justify-between">
          Find customer...
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent shouldFilter={false}>
        <ComboboxInput
          value={query}
          onValueChange={setQuery}
          placeholder="Type to search..."
        />
        <ComboboxList>
          {loading && <ComboboxLoading>Searching...</ComboboxLoading>}
          {!loading && query && results.length === 0 && (
            <ComboboxEmpty>No customers found.</ComboboxEmpty>
          )}
          {!loading && !query && (
            <ComboboxEmpty>Start typing to search.</ComboboxEmpty>
          )}
          {!loading &&
            results.map((c) => (
              <ComboboxItem key={c.id} value={c.id}>
                {c.name}
              </ComboboxItem>
            ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

/* ── Page ── */

export default function ComboboxPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.combobox.title")}
      description={t("docs.combobox.description")}
      category={t("docs.combobox.category")}
    >
      <Section title={t("docs.combobox.preview.title")} description={t("docs.combobox.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <DefaultExample />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.combobox.installation.title")} description={t("docs.combobox.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.combobox.installation.filename")} />
      </Section>

      <Section title={t("docs.combobox.usage.title")} description={t("docs.combobox.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.combobox.examples.title")} description={t("docs.combobox.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.combobox.examples.default.label")}
            description={t("docs.combobox.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <DefaultExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.combobox.examples.multiSelect.label")}
            description={t("docs.combobox.examples.multiSelect.description")}
            code={EXAMPLE_SNIPPETS.multiSelect}
          >
            <MultiSelectExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.combobox.examples.withGroups.label")}
            description={t("docs.combobox.examples.withGroups.description")}
            code={EXAMPLE_SNIPPETS.withGroups}
          >
            <GroupsExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.combobox.examples.creatable.label")}
            description={t("docs.combobox.examples.creatable.description")}
            code={EXAMPLE_SNIPPETS.creatable}
          >
            <CreatableExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.combobox.examples.asyncLoading.label")}
            description={t("docs.combobox.examples.asyncLoading.description")}
            code={EXAMPLE_SNIPPETS.asyncLoading}
          >
            <AsyncLoadingExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.combobox.examples.disabled.label")}
            description={t("docs.combobox.examples.disabled.description")}
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <div>
              <Label htmlFor="ex-disabled" className="block mb-2 opacity-50">
                Assignee
              </Label>
              <Button
                id="ex-disabled"
                variant="outlineGray"
                size="md"
                disabled
                className="w-[240px] justify-between"
              >
                Auto-assigned by SLA rules
                <ChevronsUpDown className="size-4 opacity-50" />
              </Button>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.combobox.props.title")} description={t("docs.combobox.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.combobox.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.combobox.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.combobox.accessibility.items.keyboard")}</li>
          <li>{t("docs.combobox.accessibility.items.search")}</li>
          <li>{t("docs.combobox.accessibility.items.label")}</li>
          <li>{t("docs.combobox.accessibility.items.async")}</li>
          <li>{t("docs.combobox.accessibility.items.alternatives")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.combobox.related.title")}
        items={[
          { label: "Select", href: "/forms/select" },
          { label: "Input", href: "/forms/input" },
          { label: "Form", href: "/forms/form" },
          { label: "Popover", href: "/ui/popover" },
        ]}
      />
    </ComponentPage>
  )
}
