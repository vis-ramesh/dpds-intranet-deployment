import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Archive, Copy, Edit, Star, Trash2, UserPlus } from "lucide-react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@dpds-gov/design-system"
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
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuSub,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuRadioGroup,
  ContextMenuShortcut,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@dpds-gov/design-system"

export function TicketRow({ ticket }: { ticket: Ticket }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <tr>...</tr>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => editTicket(ticket)}>Edit</ContextMenuItem>
        <ContextMenuItem onSelect={() => archiveTicket(ticket)}>Archive</ContextMenuItem>
        <ContextMenuItem destructive onSelect={() => deleteTicket(ticket)}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`

const PREVIEW_SNIPPET = `<ContextMenu>
  <ContextMenuTrigger asChild>
    <div className="...trigger area...">
      Right-click here
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Edit</ContextMenuItem>
    <ContextMenuItem>Duplicate</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem destructive>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`

const EXAMPLE_SNIPPETS = {
  basic: PREVIEW_SNIPPET,
  withIcons: `<ContextMenuItem>
  <Edit />
  Edit
  <ContextMenuShortcut>⌘ E</ContextMenuShortcut>
</ContextMenuItem>
<ContextMenuItem>
  <Copy />
  Duplicate
  <ContextMenuShortcut>⌘ D</ContextMenuShortcut>
</ContextMenuItem>`,
  submenu: `<ContextMenuSub>
  <ContextMenuSubTrigger>
    <UserPlus />
    Assign to...
  </ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>Amal Hassan</ContextMenuItem>
    <ContextMenuItem>Khalid Saeed</ContextMenuItem>
    <ContextMenuItem>Fatima Al Maktoum</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>`,
  checkboxItems: `const [pinned, setPinned] = useState(true)
const [muted, setMuted] = useState(false)

<ContextMenuLabel>Display</ContextMenuLabel>
<ContextMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
  Pin to top
</ContextMenuCheckboxItem>
<ContextMenuCheckboxItem checked={muted} onCheckedChange={setMuted}>
  Mute notifications
</ContextMenuCheckboxItem>`,
  radioItems: `const [priority, setPriority] = useState("medium")

<ContextMenuLabel>Priority</ContextMenuLabel>
<ContextMenuRadioGroup value={priority} onValueChange={setPriority}>
  <ContextMenuRadioItem value="low">Low</ContextMenuRadioItem>
  <ContextMenuRadioItem value="medium">Medium</ContextMenuRadioItem>
  <ContextMenuRadioItem value="high">High</ContextMenuRadioItem>
</ContextMenuRadioGroup>`,
  destructive: `<ContextMenuItem destructive>
  <Trash2 />
  Delete ticket
  <ContextMenuShortcut>⌘ ⌫</ContextMenuShortcut>
</ContextMenuItem>`,
  full: `// Combined real-world example for a ticket row in a CRM table.
<ContextMenu>
  <ContextMenuTrigger asChild>
    <TicketRow />
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem><Edit /> Edit <ContextMenuShortcut>⌘ E</ContextMenuShortcut></ContextMenuItem>
    <ContextMenuItem><Copy /> Duplicate</ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger><UserPlus /> Assign to</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Amal Hassan</ContextMenuItem>
        <ContextMenuItem>Khalid Saeed</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuItem><Archive /> Archive</ContextMenuItem>
    <ContextMenuItem destructive><Trash2 /> Delete <ContextMenuShortcut>⌘ ⌫</ContextMenuShortcut></ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "ContextMenu",
      type: "Radix ContextMenu.Root",
      description: "Root coordinator. Manages open / close state internally.",
    },
    {
      name: "ContextMenuTrigger",
      type: "Radix ContextMenu.Trigger",
      description: "The area that listens for right-click. Use asChild + an existing element (row, card, image) so the trigger isn't visible itself.",
    },
    {
      name: "ContextMenuContent",
      type: "Radix ContextMenu.Content",
      description: "The popover panel. Portalled to body — no parent overflow / z-index gotchas.",
    },
    {
      name: "ContextMenuItem",
      type: "Radix ContextMenu.Item",
      description: "Standard action row. Adds the destructive prop for red tinting; inset prop for items inside a labelled group.",
    },
    {
      name: "ContextMenuCheckboxItem",
      type: "Radix ContextMenu.CheckboxItem",
      description: "Item with a left-rail checkmark indicator. checked + onCheckedChange for controlled state.",
    },
    {
      name: "ContextMenuRadioGroup / ContextMenuRadioItem",
      type: "Radix",
      description: "Mutually exclusive selection. Wrap RadioItems in a RadioGroup with shared value + onValueChange.",
    },
    {
      name: "ContextMenuLabel",
      type: "Radix ContextMenu.Label",
      description: "Section heading inside the menu. Renders uppercase mono — non-interactive.",
    },
    {
      name: "ContextMenuSeparator",
      type: "Radix ContextMenu.Separator",
      description: "Hairline divider between item groups.",
    },
    {
      name: "ContextMenuSub / SubTrigger / SubContent",
      type: "Radix",
      description: "Nested submenu. SubTrigger renders the chevron automatically.",
    },
    {
      name: "ContextMenuShortcut",
      type: "span",
      description: "Right-aligned kbd hint. Pass the literal shortcut as children — ⌘ E, Ctrl+D, etc.",
    },
  ]
}

/* ── Live demo bits ── */

function CheckboxItemsExample() {
  const [pinned, setPinned] = useState(true)
  const [muted, setMuted] = useState(false)
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-32 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Display</ContextMenuLabel>
        <ContextMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
          Pin to top
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={muted} onCheckedChange={setMuted}>
          Mute notifications
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

function RadioItemsExample() {
  const [priority, setPriority] = useState("medium")
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-32 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
          Right-click here · Priority: <code className="font-mono ms-1">{priority}</code>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Priority</ContextMenuLabel>
        <ContextMenuRadioGroup value={priority} onValueChange={setPriority}>
          <ContextMenuRadioItem value="low">Low</ContextMenuRadioItem>
          <ContextMenuRadioItem value="medium">Medium</ContextMenuRadioItem>
          <ContextMenuRadioItem value="high">High</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

function TriggerBox({ label }: { label: string }) {
  return (
    <div className="flex h-32 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
      {label}
    </div>
  )
}

/* ── Page ── */

export default function ContextMenuPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.contextMenu.title")}
      description={t("docs.contextMenu.description")}
      category={t("docs.contextMenu.category")}
    >
      <Section title={t("docs.contextMenu.preview.title")} description={t("docs.contextMenu.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <TriggerBox label="Right-click here" />
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                <Edit />
                Edit
              </ContextMenuItem>
              <ContextMenuItem>
                <Copy />
                Duplicate
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem destructive>
                <Trash2 />
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.contextMenu.installation.title")} description={t("docs.contextMenu.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.contextMenu.installation.filename")} />
      </Section>

      <Section title={t("docs.contextMenu.usage.title")} description={t("docs.contextMenu.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.contextMenu.examples.title")} description={t("docs.contextMenu.examples.description")}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.contextMenu.examples.basic.label")}
            description={t("docs.contextMenu.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <TriggerBox label="Right-click here" />
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Edit</ContextMenuItem>
                <ContextMenuItem>Duplicate</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem destructive>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.contextMenu.examples.withIcons.label")}
            description={t("docs.contextMenu.examples.withIcons.description")}
            code={EXAMPLE_SNIPPETS.withIcons}
          >
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <TriggerBox label="Right-click here · with icons + shortcuts" />
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>
                  <Edit />
                  Edit
                  <ContextMenuShortcut>⌘ E</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <Copy />
                  Duplicate
                  <ContextMenuShortcut>⌘ D</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <Star />
                  Star
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.contextMenu.examples.submenu.label")}
            description={t("docs.contextMenu.examples.submenu.description")}
            code={EXAMPLE_SNIPPETS.submenu}
          >
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <TriggerBox label="Right-click · submenu" />
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <UserPlus />
                    Assign to...
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem>Amal Hassan</ContextMenuItem>
                    <ContextMenuItem>Khalid Saeed</ContextMenuItem>
                    <ContextMenuItem>Fatima Al Maktoum</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuItem>
                  <Archive />
                  Archive
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.contextMenu.examples.checkboxItems.label")}
            description={t("docs.contextMenu.examples.checkboxItems.description")}
            code={EXAMPLE_SNIPPETS.checkboxItems}
          >
            <CheckboxItemsExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.contextMenu.examples.radioItems.label")}
            description={t("docs.contextMenu.examples.radioItems.description")}
            code={EXAMPLE_SNIPPETS.radioItems}
          >
            <RadioItemsExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.contextMenu.examples.destructive.label")}
            description={t("docs.contextMenu.examples.destructive.description")}
            code={EXAMPLE_SNIPPETS.destructive}
          >
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <TriggerBox label="Right-click · destructive item" />
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>
                  <Edit />
                  Edit
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem destructive>
                  <Trash2 />
                  Delete ticket
                  <ContextMenuShortcut>⌘ ⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.contextMenu.examples.full.label")}
            description={t("docs.contextMenu.examples.full.description")}
            code={EXAMPLE_SNIPPETS.full}
            className="lg:col-span-2"
          >
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <TriggerBox label="Right-click · full ticket-row menu" />
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>
                  <Edit />
                  Edit
                  <ContextMenuShortcut>⌘ E</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <Copy />
                  Duplicate
                </ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <UserPlus />
                    Assign to
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem>Amal Hassan</ContextMenuItem>
                    <ContextMenuItem>Khalid Saeed</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem>
                  <Archive />
                  Archive
                </ContextMenuItem>
                <ContextMenuItem destructive>
                  <Trash2 />
                  Delete
                  <ContextMenuShortcut>⌘ ⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.contextMenu.props.title")} description={t("docs.contextMenu.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.contextMenu.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.contextMenu.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.contextMenu.accessibility.items.keyboard")}</li>
          <li>{t("docs.contextMenu.accessibility.items.discoverable")}</li>
          <li>{t("docs.contextMenu.accessibility.items.destructive")}</li>
          <li>{t("docs.contextMenu.accessibility.items.labels")}</li>
          <li>{t("docs.contextMenu.accessibility.items.touch")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.contextMenu.related.title")}
        items={[
          { label: "Menu", href: "/ui/navigation-menu" },
          { label: "Command", href: "/ui/command" },
        ]}
      />
    </ComponentPage>
  )
}
