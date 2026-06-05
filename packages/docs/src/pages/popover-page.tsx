import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Calendar, Filter, MoreHorizontal } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { Input } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
import { Checkbox } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"

export function QuickEdit() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outlineGray">Edit name</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader>
          <PopoverTitle>Customer name</PopoverTitle>
          <PopoverDescription>Press Enter to save.</PopoverDescription>
        </PopoverHeader>
        <Input className="mt-3" defaultValue="Al Futtaim Trading" />
      </PopoverContent>
    </Popover>
  )
}`

const PREVIEW_SNIPPET = `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outlineGray">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Quick action</PopoverTitle>
      <PopoverDescription>Edit without leaving the page.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`

const EXAMPLE_SNIPPETS = {
  basic: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outlineGray">Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Hello</PopoverTitle>
    <PopoverDescription>Default popover anchored below the trigger.</PopoverDescription>
  </PopoverContent>
</Popover>`,
  placements: `// Combine side + align for nine total positions.
<PopoverContent side="top" align="start">…</PopoverContent>
<PopoverContent side="right" align="center">…</PopoverContent>
<PopoverContent side="bottom" align="end">…</PopoverContent>`,
  quickEdit: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outlineGray" size="sm">Edit name</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <PopoverHeader>
      <PopoverTitle>Customer name</PopoverTitle>
      <PopoverDescription>Press Enter to save.</PopoverDescription>
    </PopoverHeader>
    <Input className="mt-3" defaultValue="Al Futtaim Trading" />
  </PopoverContent>
</Popover>`,
  filterPanel: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outlineGray"><Filter className="size-4" />Filter</Button>
  </PopoverTrigger>
  <PopoverContent className="w-72">
    <PopoverHeader>
      <PopoverTitle>Filter tickets</PopoverTitle>
    </PopoverHeader>
    <div className="mt-3 flex flex-col gap-2">
      {STATUS.map((s) => (
        <div key={s} className="flex items-center gap-2">
          <Checkbox id={s} />
          <Label htmlFor={s}>{s}</Label>
        </div>
      ))}
    </div>
    <Button size="sm" className="mt-4 w-full">Apply</Button>
  </PopoverContent>
</Popover>`,
  controlled: `const [open, setOpen] = useState(false)

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button>Open / close from outside</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverDescription>Open state lives in React.</PopoverDescription>
    <Button size="sm" className="mt-2" onClick={() => setOpen(false)}>
      Close
    </Button>
  </PopoverContent>
</Popover>`,
  customOffset: `<PopoverContent sideOffset={16} alignOffset={-20}>
  …
</PopoverContent>`,
  iconTrigger: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="text" size="icon-sm" aria-label="More actions">
      <MoreHorizontal className="size-4" />
    </Button>
  </PopoverTrigger>
  <PopoverContent align="end" className="w-44">
    {/* compact menu */}
  </PopoverContent>
</Popover>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "Popover.open",
      type: "boolean",
      description: "Controlled open state. Pair with onOpenChange for React-driven open/close (URL sync, parent state, etc.).",
    },
    {
      name: "Popover.onOpenChange",
      type: "(open: boolean) => void",
      description: "Fires when the popover opens or closes — click outside, Escape, or programmatic.",
    },
    {
      name: "Popover.defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Initial open state for uncontrolled usage.",
    },
    {
      name: "Popover.modal",
      type: "boolean",
      defaultValue: "false",
      description: "When true, focus is trapped inside the content and the rest of the page becomes inert. Reserve for popovers that need a confirm (e.g. delete).",
    },
    {
      name: "PopoverTrigger.asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Render the trigger as the child component (Button, Tag, span, etc.) instead of a default button. Standard Radix slot pattern.",
    },
    {
      name: "PopoverContent.side",
      type: '"top" | "right" | "bottom" | "left"',
      defaultValue: '"bottom"',
      description: "Edge of the trigger the content sits on. Combine with align for 12 placements total.",
    },
    {
      name: "PopoverContent.align",
      type: '"start" | "center" | "end"',
      defaultValue: '"center"',
      description: "Alignment along the chosen side.",
    },
    {
      name: "PopoverContent.sideOffset",
      type: "number",
      defaultValue: "4",
      description: "Distance (px) between the trigger and the content.",
    },
    {
      name: "PopoverContent.alignOffset",
      type: "number",
      defaultValue: "0",
      description: "Shift along the alignment axis (px). Use for fine-tuning when the default center is slightly off.",
    },
    {
      name: "PopoverContent.collisionPadding",
      type: "number | { top?, right?, bottom?, left? }",
      defaultValue: "0",
      description: "Padding from viewport edges before the content flips/repositions to fit.",
    },
  ]
}

/* ── Live demo bits ── */

function ControlledExample() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex items-center gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outlineGray" size="md">
            Open / close from outside
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverDescription>Open state lives in React.</PopoverDescription>
          <Button size="sm" className="mt-3 w-full" onClick={() => setOpen(false)}>
            Close
          </Button>
        </PopoverContent>
      </Popover>
      <span className="text-xs text-muted-foreground">
        Open: <code className="font-mono">{String(open)}</code>
      </span>
      <Button variant="text" size="sm" onClick={() => setOpen((v) => !v)}>
        Toggle from out here
      </Button>
    </div>
  )
}

const STATUS = ["Open", "In progress", "Waiting", "Resolved", "Closed"]

function FilterPanelExample() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outlineGray" size="md">
          <Filter className="size-4" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader>
          <PopoverTitle>Filter tickets</PopoverTitle>
        </PopoverHeader>
        <div className="mt-3 flex flex-col gap-2">
          {STATUS.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <Checkbox id={`f-${s}`} />
              <Label htmlFor={`f-${s}`}>{s}</Label>
            </div>
          ))}
        </div>
        <Button size="sm" className="mt-4 w-full">
          Apply
        </Button>
      </PopoverContent>
    </Popover>
  )
}

/* ── Page ── */

export default function PopoverPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.popover.title")}
      description={t("docs.popover.description")}
      category={t("docs.popover.category")}
    >
      <Section title={t("docs.popover.preview.title")} description={t("docs.popover.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outlineGray" size="md">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Quick action</PopoverTitle>
                <PopoverDescription>Edit without leaving the page.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.popover.installation.title")} description={t("docs.popover.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.popover.installation.filename")} />
      </Section>

      <Section title={t("docs.popover.usage.title")} description={t("docs.popover.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.popover.examples.title")} description={t("docs.popover.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.popover.examples.basic.label")}
            description={t("docs.popover.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outlineGray" size="md">Open</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverTitle>Hello</PopoverTitle>
                <PopoverDescription>Default popover anchored below the trigger.</PopoverDescription>
              </PopoverContent>
            </Popover>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.popover.examples.placements.label")}
            description={t("docs.popover.examples.placements.description")}
            code={EXAMPLE_SNIPPETS.placements}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Popover>
                <PopoverTrigger asChild><Button variant="outlineGray" size="sm">Top</Button></PopoverTrigger>
                <PopoverContent side="top" align="start" className="w-auto px-3 py-2">
                  <span className="text-xs">side=top align=start</span>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild><Button variant="outlineGray" size="sm">Right</Button></PopoverTrigger>
                <PopoverContent side="right" align="center" className="w-auto px-3 py-2">
                  <span className="text-xs">side=right align=center</span>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild><Button variant="outlineGray" size="sm">Bottom</Button></PopoverTrigger>
                <PopoverContent side="bottom" align="end" className="w-auto px-3 py-2">
                  <span className="text-xs">side=bottom align=end</span>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild><Button variant="outlineGray" size="sm">Left</Button></PopoverTrigger>
                <PopoverContent side="left" align="center" className="w-auto px-3 py-2">
                  <span className="text-xs">side=left align=center</span>
                </PopoverContent>
              </Popover>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.popover.examples.quickEdit.label")}
            description={t("docs.popover.examples.quickEdit.description")}
            code={EXAMPLE_SNIPPETS.quickEdit}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outlineGray" size="sm">Edit name</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <PopoverHeader>
                  <PopoverTitle>Customer name</PopoverTitle>
                  <PopoverDescription>Press Enter to save.</PopoverDescription>
                </PopoverHeader>
                <Input className="mt-3" defaultValue="Al Futtaim Trading" />
              </PopoverContent>
            </Popover>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.popover.examples.filterPanel.label")}
            description={t("docs.popover.examples.filterPanel.description")}
            code={EXAMPLE_SNIPPETS.filterPanel}
          >
            <FilterPanelExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.popover.examples.controlled.label")}
            description={t("docs.popover.examples.controlled.description")}
            code={EXAMPLE_SNIPPETS.controlled}
            className="lg:col-span-2"
          >
            <ControlledExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.popover.examples.customOffset.label")}
            description={t("docs.popover.examples.customOffset.description")}
            code={EXAMPLE_SNIPPETS.customOffset}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outlineGray" size="md">
                  <Calendar className="size-4" />
                  Custom offset
                </Button>
              </PopoverTrigger>
              <PopoverContent sideOffset={16} alignOffset={-20}>
                <PopoverDescription>
                  sideOffset={"{16}"} alignOffset={"{-20}"} — the gap and shift are larger than default.
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.popover.examples.iconTrigger.label")}
            description={t("docs.popover.examples.iconTrigger.description")}
            code={EXAMPLE_SNIPPETS.iconTrigger}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="text" size="icon-sm" aria-label="More actions">
                  <MoreHorizontal className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-44">
                <div className="flex flex-col gap-1">
                  <Button variant="text" size="sm" className="justify-start">View ticket</Button>
                  <Button variant="text" size="sm" className="justify-start">Assign to me</Button>
                  <Button variant="text" size="sm" className="justify-start">Archive</Button>
                </div>
              </PopoverContent>
            </Popover>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.popover.props.title")} description={t("docs.popover.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.popover.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.popover.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.popover.accessibility.items.keyboard")}</li>
          <li>{t("docs.popover.accessibility.items.focus")}</li>
          <li>{t("docs.popover.accessibility.items.label")}</li>
          <li>{t("docs.popover.accessibility.items.modal")}</li>
          <li>{t("docs.popover.accessibility.items.touch")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.popover.related.title")}
        items={[
          { label: "Tooltip", href: "/ui/tooltip" },
          { label: "Hover Card", href: "/ui/hover-card" },
          { label: "Dialog", href: "/ui/modal-popups" },
        ]}
      />
    </ComponentPage>
  )
}
