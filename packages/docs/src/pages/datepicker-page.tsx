import { useState } from "react"
import { useTranslation } from "react-i18next"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
import { Popover, PopoverContent, PopoverTrigger } from "@dpds-gov/design-system"
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

/* ── Snippets ── */

const INSTALL_SNIPPET = `import { Calendar } from "@dpds-gov/design-system"
import { Popover, PopoverContent, PopoverTrigger } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
import { Popover, PopoverContent, PopoverTrigger } from "@dpds-gov/design-system"
import { cn } from "@dpds-gov/design-system"

export function VisitDate() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="grid w-full gap-2">
      <Label>Visit date</Label>
      <Popover>
        <PopoverTrigger
          className={cn(
            "inline-flex w-[240px] items-center justify-start gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs hover:bg-accent",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="size-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  )
}`

const PREVIEW_SNIPPET = `<Popover>
  <PopoverTrigger className="inline-flex w-[240px] items-center justify-start gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs hover:bg-accent">
    <CalendarIcon className="size-4" />
    {date ? format(date, "PPP") : <span>Pick a date</span>}
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </PopoverContent>
</Popover>`

const EXAMPLE_SNIPPETS = {
  single: `const [date, setDate] = useState<Date | undefined>()

<Popover>
  <PopoverTrigger className="...trigger styles...">
    <CalendarIcon className="size-4" />
    {date ? format(date, "PPP") : "Pick a date"}
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </PopoverContent>
</Popover>`,
  range: `const [range, setRange] = useState<DateRange | undefined>()

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
/>`,
  multiple: `const [dates, setDates] = useState<Date[] | undefined>([])

<Calendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
/>`,
  withLimits: `// Disable past dates and anything more than 90 days out.
const today = new Date()
const max = new Date()
max.setDate(today.getDate() + 90)

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={(d) => d < today || d > max}
/>`,
  inline: `// Render the Calendar directly — no popover — for always-visible
// pickers like booking screens.
<Calendar mode="single" selected={date} onSelect={setDate} />`,
  defaultMonth: `// Open the calendar on a specific month, even if no date is selected.
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  defaultMonth={new Date(2026, 5, 1)}
/>`,
  dropdownNav: `// Year and month dropdowns let users jump faster than month-by-month paging.
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  captionLayout="dropdown"
  fromYear={1990}
  toYear={2030}
/>`,
  withLabel: `<div className="grid w-full gap-2">
  <Label htmlFor="visit-date">Visit date</Label>
  <Popover>
    <PopoverTrigger id="visit-date" className="...trigger styles...">
      <CalendarIcon className="size-4" />
      {date ? format(date, "PPP") : "Pick a date"}
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </PopoverContent>
  </Popover>
</div>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "mode",
      type: '"single" | "multiple" | "range"',
      defaultValue: '"single"',
      description: "Selection model. \"single\" returns a Date, \"multiple\" returns Date[], \"range\" returns { from, to }.",
    },
    {
      name: "selected",
      type: "Date | Date[] | DateRange",
      description: "Controlled selection. Shape depends on mode.",
    },
    {
      name: "onSelect",
      type: "(value) => void",
      description: "Fires when the user picks a day. Receives the new selection (Date | Date[] | DateRange | undefined).",
    },
    {
      name: "disabled",
      type: "Date | Date[] | (date: Date) => boolean | Matcher",
      description: "Disable specific dates. Accepts a single Date, an array, a predicate function, or a react-day-picker Matcher object (e.g. { before, after, dayOfWeek }).",
    },
    {
      name: "defaultMonth",
      type: "Date",
      description: "Month to display when first rendered. Useful when no date is selected but you want to focus a specific month.",
    },
    {
      name: "numberOfMonths",
      type: "number",
      defaultValue: "1",
      description: "Show N months side-by-side. Common pattern for range pickers is 2.",
    },
    {
      name: "captionLayout",
      type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
      defaultValue: '"label"',
      description: "Caption style. \"dropdown\" turns the month and year into selects — much faster than paging for distant dates.",
    },
    {
      name: "fromYear / toYear",
      type: "number",
      description: "When using a year dropdown, sets the available range.",
    },
    {
      name: "buttonVariant",
      type: "Button variant",
      defaultValue: '"gray"',
      description: "Style of the prev/next month buttons. Forwards to the design system Button.",
    },
    {
      name: "locale",
      type: "Locale",
      description: "date-fns locale for caption text and weekday headers. Defaults to English.",
    },
  ]
}

/* ── Live demo bits ── */

const TRIGGER_CLASS =
  "inline-flex w-[240px] items-center justify-start gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs hover:bg-accent hover:text-accent-foreground"

function SingleDateExample() {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <Popover>
      <PopoverTrigger className={cn(TRIGGER_CLASS, !date && "text-muted-foreground")}>
        <CalendarIcon className="size-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}

function RangeExample() {
  const [range, setRange] = useState<DateRange | undefined>()
  return (
    <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
  )
}

function MultipleExample() {
  const [dates, setDates] = useState<Date[] | undefined>([])
  return <Calendar mode="multiple" selected={dates} onSelect={setDates} />
}

function WithLimitsExample() {
  const [date, setDate] = useState<Date | undefined>()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const max = new Date(today)
  max.setDate(today.getDate() + 90)
  return (
    <Popover>
      <PopoverTrigger className={cn(TRIGGER_CLASS, !date && "text-muted-foreground")}>
        <CalendarIcon className="size-4" />
        {date ? format(date, "PPP") : <span>Within next 90 days</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(d) => d < today || d > max}
        />
      </PopoverContent>
    </Popover>
  )
}

function InlineExample() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} />
}

function DefaultMonthExample() {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(2026, 5, 1)}
    />
  )
}

function DropdownNavExample() {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      fromYear={1990}
      toYear={2030}
    />
  )
}

function WithLabelExample() {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="visit-date">Visit date</Label>
      <Popover>
        <PopoverTrigger
          id="visit-date"
          className={cn(TRIGGER_CLASS, !date && "text-muted-foreground")}
        >
          <CalendarIcon className="size-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

/* ── Page ── */

export default function DatepickerPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.datepicker.title")}
      description={t("docs.datepicker.description")}
      category={t("docs.datepicker.category")}
    >
      <Section title={t("docs.datepicker.preview.title")} description={t("docs.datepicker.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <SingleDateExample />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.datepicker.installation.title")} description={t("docs.datepicker.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.datepicker.installation.filename")} />
      </Section>

      <Section title={t("docs.datepicker.usage.title")} description={t("docs.datepicker.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.datepicker.examples.title")} description={t("docs.datepicker.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.datepicker.examples.single.label")}
            description={t("docs.datepicker.examples.single.description")}
            code={EXAMPLE_SNIPPETS.single}
          >
            <SingleDateExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.datepicker.examples.range.label")}
            description={t("docs.datepicker.examples.range.description")}
            code={EXAMPLE_SNIPPETS.range}
          >
            <RangeExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.datepicker.examples.multiple.label")}
            description={t("docs.datepicker.examples.multiple.description")}
            code={EXAMPLE_SNIPPETS.multiple}
          >
            <MultipleExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.datepicker.examples.withLimits.label")}
            description={t("docs.datepicker.examples.withLimits.description")}
            code={EXAMPLE_SNIPPETS.withLimits}
          >
            <WithLimitsExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.datepicker.examples.inline.label")}
            description={t("docs.datepicker.examples.inline.description")}
            code={EXAMPLE_SNIPPETS.inline}
          >
            <InlineExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.datepicker.examples.defaultMonth.label")}
            description={t("docs.datepicker.examples.defaultMonth.description")}
            code={EXAMPLE_SNIPPETS.defaultMonth}
          >
            <DefaultMonthExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.datepicker.examples.dropdownNav.label")}
            description={t("docs.datepicker.examples.dropdownNav.description")}
            code={EXAMPLE_SNIPPETS.dropdownNav}
          >
            <DropdownNavExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.datepicker.examples.withLabel.label")}
            description={t("docs.datepicker.examples.withLabel.description")}
            code={EXAMPLE_SNIPPETS.withLabel}
          >
            <WithLabelExample />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.datepicker.props.title")} description={t("docs.datepicker.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.datepicker.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.datepicker.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.datepicker.accessibility.items.label")}</li>
          <li>{t("docs.datepicker.accessibility.items.keyboard")}</li>
          <li>{t("docs.datepicker.accessibility.items.format")}</li>
          <li>{t("docs.datepicker.accessibility.items.disabled")}</li>
          <li>{t("docs.datepicker.accessibility.items.locale")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.datepicker.related.title")}
        items={[
          { label: "Popover", href: "/ui/popover" },
          { label: "Input", href: "/forms/input" },
          { label: "Form", href: "/forms/form" },
          { label: "Button", href: "/buttons" },
        ]}
      />
    </ComponentPage>
  )
}
