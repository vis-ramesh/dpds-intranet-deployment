import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Filter, Menu, Pencil } from "lucide-react"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@dpds-gov/design-system"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { Input } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
import { Textarea } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `// Sheet — desktop side panels (Radix Dialog under the hood)
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@dpds-gov/design-system"

// Drawer — mobile drag-to-dismiss panels (vaul under the hood)
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"

export function EditCustomerSheet({ customer }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outlineGray" size="sm">Edit customer</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit customer</SheetTitle>
          <SheetDescription>{customer.name}</SheetDescription>
        </SheetHeader>
        {/* form fields */}
        <SheetFooter>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}`

const PREVIEW_SNIPPET = `<Sheet>
  <SheetTrigger asChild>
    <Button>Open sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    {/* header + body + footer */}
  </SheetContent>
</Sheet>`

const EXAMPLE_SNIPPETS = {
  sheetRight: `<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Quick ticket preview</SheetTitle>
      <SheetDescription>REQ-2025-0142</SheetDescription>
    </SheetHeader>
    {/* body */}
  </SheetContent>
</Sheet>`,
  sheetLeft: `// Mobile / responsive nav menu — from left.
<Sheet>
  <SheetTrigger asChild>
    <Button variant="text" size="icon-sm" aria-label="Open menu">
      <Menu className="size-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Service Portal</SheetTitle>
    </SheetHeader>
    {/* nav links */}
  </SheetContent>
</Sheet>`,
  sheetWithForm: `<Sheet>
  <SheetTrigger asChild><Button>Edit customer</Button></SheetTrigger>
  <SheetContent side="right" className="sm:max-w-md">
    <SheetHeader>
      <SheetTitle>Edit customer</SheetTitle>
    </SheetHeader>
    <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-3">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Al Futtaim Trading" />
      </div>
      {/* more fields */}
    </div>
    <SheetFooter>
      <Button variant="outlineGray">Cancel</Button>
      <Button>Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
  drawerBottom: `// Mobile filter panel — momentum-based drag-to-dismiss.
<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outlineGray"><Filter className="size-4" />Filter</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Filter tickets</DrawerTitle>
      <DrawerDescription>Swipe down to dismiss</DrawerDescription>
    </DrawerHeader>
    {/* filter controls */}
    <DrawerFooter>
      <Button>Apply</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
  drawerDirection: `// Drawer also supports left / right / top via the direction prop on the Root.
<Drawer direction="right">
  <DrawerTrigger asChild><Button>Open</Button></DrawerTrigger>
  <DrawerContent>
    {/* slides in from the right with drag-to-close */}
  </DrawerContent>
</Drawer>`,
  sizes: `// Sheet size via className on SheetContent.
<SheetContent side="right" className="sm:max-w-sm">sm</SheetContent>
<SheetContent side="right" className="sm:max-w-md">md (default)</SheetContent>
<SheetContent side="right" className="sm:max-w-lg">lg</SheetContent>
<SheetContent side="right" className="sm:max-w-xl">xl</SheetContent>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "Sheet (Radix Dialog)",
      type: "Composition",
      description: "Sheet + SheetTrigger + SheetContent + SheetHeader + SheetTitle + SheetDescription + SheetFooter + SheetClose. Use for desktop side panels.",
    },
    {
      name: "SheetContent.side",
      type: '"top" | "right" | "bottom" | "left"',
      defaultValue: '"right"',
      description: "Edge the sheet slides from. CSS-driven animation; no drag gesture.",
    },
    {
      name: "SheetContent.className",
      type: "string",
      description: "Override width / height. Default is responsive (full width on mobile, sm:max-w-md on desktop). Use sm:max-w-sm/md/lg/xl for size variants.",
    },
    {
      name: "Drawer (vaul)",
      type: "Composition",
      description: "Drawer + DrawerTrigger + DrawerContent + DrawerHeader + DrawerTitle + DrawerDescription + DrawerFooter + DrawerClose. Use for mobile drag-to-dismiss panels.",
    },
    {
      name: "Drawer.direction",
      type: '"top" | "right" | "bottom" | "left"',
      defaultValue: '"bottom"',
      description: "Edge the drawer slides from. Set on the Root, not on Content. Momentum-based open + drag-to-dismiss handled by vaul.",
    },
    {
      name: "Drawer.dismissible",
      type: "boolean",
      defaultValue: "true",
      description: "When false, the drawer can't be dismissed by drag — only by an explicit close action. Use for critical confirmations.",
    },
    {
      name: "Drawer.snapPoints",
      type: "(string | number)[]",
      description: "Optional snap heights (e.g. [0.4, 0.9]) for multi-stop drag. iOS Maps-style mobile sheets.",
    },
    {
      name: "Both: open / onOpenChange",
      type: "boolean / (open: boolean) => void",
      description: "Controlled state. Same shape across both primitives — pair with React state for URL sync or external triggers.",
    },
  ]
}

/* ── Live demo bits ── */

function SheetWithFormExample() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outlineGray" size="md">
          <Pencil className="size-4" />
          Edit customer
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit customer</SheetTitle>
          <SheetDescription>Al Futtaim Trading · C-1234</SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="cname">Name</Label>
            <Input id="cname" defaultValue="Al Futtaim Trading" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="cemail">Primary email</Label>
            <Input id="cemail" type="email" defaultValue="ops@alfuttaim.ae" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="cnotes">Notes</Label>
            <Textarea id="cnotes" rows={4} placeholder="Internal notes…" />
          </div>
        </div>
        <SheetFooter>
          <Button variant="outlineGray">Cancel</Button>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function MobileMenuExample() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="text" size="icon-sm" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <SheetHeader>
          <SheetTitle>Service Portal</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 py-2">
          {["Dashboard", "Tickets", "Customers", "Reports", "Settings"].map((label) => (
            <a
              key={label}
              href="#nav"
              className="rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              {label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

const FILTERS = ["Open", "In progress", "Waiting", "Resolved", "Closed"]

function DrawerFilterExample() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outlineGray" size="md">
          <Filter className="size-4" />
          Filter
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter tickets</DrawerTitle>
          <DrawerDescription>Swipe down or tap outside to dismiss.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-3 px-4 py-2">
          {FILTERS.map((f) => (
            <div key={f} className="flex items-center gap-3">
              <Checkbox
                id={`d-${f}`}
                checked={selected.has(f)}
                onCheckedChange={(c) => {
                  const next = new Set(selected)
                  if (c === true) next.add(f)
                  else next.delete(f)
                  setSelected(next)
                }}
              />
              <Label htmlFor={`d-${f}`}>{f}</Label>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <Button>Apply ({selected.size})</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

/* ── Page ── */

export default function DrawerSheetPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.drawer.title")}
      description={t("docs.drawer.description")}
      category={t("docs.drawer.category")}
    >
      <Section title={t("docs.drawer.preview.title")} description={t("docs.drawer.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="flex flex-wrap items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outlineGray" size="md">Open Sheet (right)</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Sheet from right</SheetTitle>
                  <SheetDescription>Radix-backed side panel. Click outside or Escape to close.</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outlineGray" size="md">Open Drawer (bottom)</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Drawer from bottom</DrawerTitle>
                  <DrawerDescription>vaul-backed sheet with drag-to-dismiss.</DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.drawer.intro.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.drawer.intro.body")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="text-sm font-semibold">Sheet</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Radix Dialog underneath. Snap-open, no drag physics, no momentum. Best for desktop side panels and utility panels where the user is mouse/keyboard-first.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="text-sm font-semibold">Drawer</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              vaul underneath. Spring-based open + drag-to-dismiss handle. Best for mobile bottom sheets and any context where touch feels native.
            </p>
          </div>
        </div>
      </Section>

      <Section title={t("docs.drawer.installation.title")} description={t("docs.drawer.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.drawer.installation.filename")} />
      </Section>

      <Section title={t("docs.drawer.usage.title")} description={t("docs.drawer.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.drawer.examples.title")} description={t("docs.drawer.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.drawer.examples.sheetRight.label")}
            description={t("docs.drawer.examples.sheetRight.description")}
            code={EXAMPLE_SNIPPETS.sheetRight}
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outlineGray" size="md">Quick preview</Button>
              </SheetTrigger>
              <SheetContent side="right" className="sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Quick ticket preview</SheetTitle>
                  <SheetDescription>REQ-2025-0142</SheetDescription>
                </SheetHeader>
                <div className="flex-1 px-4 py-2 text-sm text-muted-foreground">
                  Renewal certificate not generated. Open since May 12 · SLA 78% elapsed.
                </div>
              </SheetContent>
            </Sheet>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.drawer.examples.sheetLeft.label")}
            description={t("docs.drawer.examples.sheetLeft.description")}
            code={EXAMPLE_SNIPPETS.sheetLeft}
          >
            <MobileMenuExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.drawer.examples.sheetWithForm.label")}
            description={t("docs.drawer.examples.sheetWithForm.description")}
            code={EXAMPLE_SNIPPETS.sheetWithForm}
          >
            <SheetWithFormExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.drawer.examples.drawerBottom.label")}
            description={t("docs.drawer.examples.drawerBottom.description")}
            code={EXAMPLE_SNIPPETS.drawerBottom}
          >
            <DrawerFilterExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.drawer.examples.drawerDirection.label")}
            description={t("docs.drawer.examples.drawerDirection.description")}
            code={EXAMPLE_SNIPPETS.drawerDirection}
          >
            <div className="flex flex-wrap items-center gap-2">
              {(["bottom", "right", "left", "top"] as const).map((dir) => (
                <Drawer key={dir} direction={dir}>
                  <DrawerTrigger asChild>
                    <Button variant="outlineGray" size="sm">From {dir}</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Drawer from {dir}</DrawerTitle>
                      <DrawerDescription>direction="{dir}"</DrawerDescription>
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>
              ))}
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.drawer.examples.sizes.label")}
            description={t("docs.drawer.examples.sizes.description")}
            code={EXAMPLE_SNIPPETS.sizes}
          >
            <div className="flex flex-wrap items-center gap-2">
              {(["sm", "md", "lg", "xl"] as const).map((size) => (
                <Sheet key={size}>
                  <SheetTrigger asChild>
                    <Button variant="outlineGray" size="sm">{size.toUpperCase()}</Button>
                  </SheetTrigger>
                  <SheetContent side="right" className={`sm:max-w-${size}`}>
                    <SheetHeader>
                      <SheetTitle>{size.toUpperCase()} sheet</SheetTitle>
                      <SheetDescription>className="sm:max-w-{size}"</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.drawer.props.title")} description={t("docs.drawer.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.drawer.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.drawer.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.drawer.accessibility.items.focus")}</li>
          <li>{t("docs.drawer.accessibility.items.keyboard")}</li>
          <li>{t("docs.drawer.accessibility.items.title")}</li>
          <li>{t("docs.drawer.accessibility.items.touch")}</li>
          <li>{t("docs.drawer.accessibility.items.choice")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.drawer.related.title")}
        items={[
          { label: "Dialog", href: "/ui/modal-popups" },
          { label: "Popover", href: "/ui/popover" },
        ]}
      />
    </ComponentPage>
  )
}
