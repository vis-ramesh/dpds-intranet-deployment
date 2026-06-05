import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Calendar, FileText, Inbox, LifeBuoy, Plus, Search, Settings, User } from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
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
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@dpds-gov/design-system"

export function CmdKPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>New ticket</CommandItem>
          <CommandItem>Open inbox</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}`

const PREVIEW_SNIPPET = `<Command className="border border-border">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Quick actions">
      <CommandItem>
        <Plus />
        New ticket
        <CommandShortcut>⌘ N</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Search />
        Find a customer
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`

const EXAMPLE_SNIPPETS = {
  basic: `<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandItem>Open inbox</CommandItem>
    <CommandItem>Create ticket</CommandItem>
    <CommandItem>View dashboard</CommandItem>
  </CommandList>
</Command>`,
  groups: `<Command>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>New ticket</CommandItem>
      <CommandItem>New customer</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Navigation">
      <CommandItem>Inbox</CommandItem>
      <CommandItem>Reports</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
  shortcuts: `<CommandItem>
  <Plus />
  New ticket
  <CommandShortcut>⌘ N</CommandShortcut>
</CommandItem>
<CommandItem>
  <Search />
  Find customer
  <CommandShortcut>⌘ K</CommandShortcut>
</CommandItem>`,
  withIcons: `<CommandItem>
  <FileText />
  Open documentation
</CommandItem>
<CommandItem>
  <LifeBuoy />
  Contact support
</CommandItem>`,
  empty: `// Default empty state renders "No results."
<Command>
  <CommandInput placeholder="Search a customer ID..." />
  <CommandList>
    <CommandEmpty>No customers match.</CommandEmpty>
  </CommandList>
</Command>`,
  cmdK: `// Global ⌘K palette wired with a keydown listener.
const [open, setOpen] = useState(false)
useEffect(() => {
  function onKey(e: KeyboardEvent) {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((v) => !v)
    }
  }
  document.addEventListener("keydown", onKey)
  return () => document.removeEventListener("keydown", onKey)
}, [])

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    {/* groups + items */}
  </CommandList>
</CommandDialog>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "Command",
      type: "cmdk.Root",
      description: "Root of the command tree. Pass shouldFilter={false} to disable client-side filtering (use for async lists).",
    },
    {
      name: "CommandInput",
      type: "cmdk.Input",
      description: "Search input with a leading Search icon. value + onValueChange give controlled access for async / creatable patterns.",
    },
    {
      name: "CommandList",
      type: "cmdk.List",
      description: "Scrollable region. Caps at 300px max-height with overflow-y-auto.",
    },
    {
      name: "CommandEmpty",
      type: "cmdk.Empty",
      description: "Shown when no items match the current query. Render an action (create / contact support) for a more useful empty state.",
    },
    {
      name: "CommandLoading",
      type: "cmdk.Loading",
      description: "Renders inside CommandList while async results are loading. cmdk exposes it in the live region so screen readers announce \"loading\".",
    },
    {
      name: "CommandGroup",
      type: "cmdk.Group",
      description: "Heading + collection of items. The uppercase mono heading style is built in.",
    },
    {
      name: "CommandSeparator",
      type: "cmdk.Separator",
      description: "Divider between groups. Use sparingly — visual grouping via headings is usually enough.",
    },
    {
      name: "CommandItem",
      type: "cmdk.Item",
      description: "Selectable row. value attribute drives filtering and onSelect callbacks. disabled removes it from keyboard navigation.",
    },
    {
      name: "CommandShortcut",
      type: "span",
      description: "Right-aligned keyboard hint (kbd-style). Pass the literal shortcut as children — ⌘ N, Ctrl+K, etc.",
    },
    {
      name: "CommandDialog",
      type: "Dialog wrapper",
      description: "Convenience component — Dialog + Command together for the global cmd-K palette pattern. Forwards open / onOpenChange to Dialog.",
    },
  ]
}

/* ── Live demo bits ── */

function CmdKExample() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <Button variant="outlineGray" size="md" onClick={() => setOpen(true)} className="w-fit">
        Open palette
        <CommandShortcut>⌘ K</CommandShortcut>
      </Button>
      <p className="text-xs text-muted-foreground">
        Press <kbd className="rounded bg-muted px-1 py-0.5 font-mono">⌘ K</kbd> (or{" "}
        <kbd className="rounded bg-muted px-1 py-0.5 font-mono">Ctrl K</kbd>) to toggle.
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => setOpen(false)}>
              <Plus />
              New ticket
              <CommandShortcut>⌘ N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <User />
              New customer
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => setOpen(false)}>
              <Inbox />
              Inbox
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Calendar />
              Calendar
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Settings />
              Settings
              <CommandShortcut>⌘ ,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

/* ── Page ── */

export default function CommandPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.command.title")}
      description={t("docs.command.description")}
      category={t("docs.command.category")}
    >
      <Section title={t("docs.command.preview.title")} description={t("docs.command.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Command className="border border-border max-w-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup heading="Quick actions">
                <CommandItem>
                  <Plus />
                  New ticket
                  <CommandShortcut>⌘ N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Search />
                  Find a customer
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.command.installation.title")} description={t("docs.command.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.command.installation.filename")} />
      </Section>

      <Section title={t("docs.command.usage.title")} description={t("docs.command.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.command.examples.title")} description={t("docs.command.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.command.examples.basic.label")}
            description={t("docs.command.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <Command className="border border-border max-w-md">
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandItem>Open inbox</CommandItem>
                <CommandItem>Create ticket</CommandItem>
                <CommandItem>View dashboard</CommandItem>
              </CommandList>
            </Command>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.command.examples.groups.label")}
            description={t("docs.command.examples.groups.description")}
            code={EXAMPLE_SNIPPETS.groups}
          >
            <Command className="border border-border max-w-md">
              <CommandInput placeholder="Type a command..." />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup heading="Actions">
                  <CommandItem>New ticket</CommandItem>
                  <CommandItem>New customer</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Navigation">
                  <CommandItem>Inbox</CommandItem>
                  <CommandItem>Reports</CommandItem>
                  <CommandItem>Settings</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.command.examples.shortcuts.label")}
            description={t("docs.command.examples.shortcuts.description")}
            code={EXAMPLE_SNIPPETS.shortcuts}
          >
            <Command className="border border-border max-w-md">
              <CommandList>
                <CommandItem>
                  <Plus />
                  New ticket
                  <CommandShortcut>⌘ N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Search />
                  Find customer
                  <CommandShortcut>⌘ K</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings />
                  Settings
                  <CommandShortcut>⌘ ,</CommandShortcut>
                </CommandItem>
              </CommandList>
            </Command>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.command.examples.withIcons.label")}
            description={t("docs.command.examples.withIcons.description")}
            code={EXAMPLE_SNIPPETS.withIcons}
          >
            <Command className="border border-border max-w-md">
              <CommandList>
                <CommandItem>
                  <FileText />
                  Open documentation
                </CommandItem>
                <CommandItem>
                  <LifeBuoy />
                  Contact support
                </CommandItem>
                <CommandItem>
                  <User />
                  Account settings
                </CommandItem>
              </CommandList>
            </Command>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.command.examples.empty.label")}
            description={t("docs.command.examples.empty.description")}
            code={EXAMPLE_SNIPPETS.empty}
          >
            <Command className="border border-border max-w-md">
              <CommandInput placeholder="Search a customer ID..." />
              <CommandList>
                <CommandEmpty>No customers match.</CommandEmpty>
              </CommandList>
            </Command>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.command.examples.cmdK.label")}
            description={t("docs.command.examples.cmdK.description")}
            code={EXAMPLE_SNIPPETS.cmdK}
          >
            <CmdKExample />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.command.props.title")} description={t("docs.command.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.command.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.command.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.command.accessibility.items.keyboard")}</li>
          <li>{t("docs.command.accessibility.items.title")}</li>
          <li>{t("docs.command.accessibility.items.shortcuts")}</li>
          <li>{t("docs.command.accessibility.items.dialog")}</li>
          <li>{t("docs.command.accessibility.items.empty")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.command.related.title")}
        items={[
          { label: "Combobox", href: "/forms/combobox" },
          { label: "Dialog", href: "/ui/modal-popups" },
          { label: "Menu", href: "/ui/navigation-menu" },
        ]}
      />
    </ComponentPage>
  )
}
