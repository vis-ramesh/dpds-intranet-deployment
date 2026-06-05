import { useTranslation } from "react-i18next"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
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
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@dpds-gov/design-system"

export function TicketWorkspace() {
  return (
    <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
      <ResizablePanel defaultSize={25} minSize={15}>
        <TicketList />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <TicketDetail />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`

const PREVIEW_SNIPPET = `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>Left</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>Right</ResizablePanel>
</ResizablePanelGroup>`

const EXAMPLE_SNIPPETS = {
  horizontal: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>Left</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>Right</ResizablePanel>
</ResizablePanelGroup>`,
  vertical: `<ResizablePanelGroup direction="vertical">
  <ResizablePanel defaultSize={60}>Top</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={40}>Bottom</ResizablePanel>
</ResizablePanelGroup>`,
  withHandle: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={30}>Sidebar</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={70}>Main</ResizablePanel>
</ResizablePanelGroup>`,
  minMax: `<ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
  {/* clamped between 15% and 40% of the group */}
</ResizablePanel>`,
  threePanel: `// Email-style three-pane layout.
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={20} minSize={15}>Folders</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={30} minSize={20}>Conversations</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>Message</ResizablePanel>
</ResizablePanelGroup>`,
  nested: `// Nest groups for IDE-style layouts.
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={25}>Sidebar</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={75}>
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={70}>Editor</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={30}>Terminal</ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>`,
}

/* ── Props tables ── */

function getGroupPropRows(): PropRow[] {
  return [
    {
      name: "direction",
      type: '"horizontal" | "vertical"',
      required: true,
      description: "Layout axis. 'horizontal' renders panels side-by-side, 'vertical' top-to-bottom.",
    },
    {
      name: "autoSaveId",
      type: "string",
      description: "If set, the panel sizes persist to localStorage under this key. Pages reload back to the user's last layout.",
    },
    {
      name: "onLayout",
      type: "(sizes: number[]) => void",
      description: "Fires whenever the user drags. Receives an array of percentages — one per panel in order.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra Tailwind classes on the panel group. Set height (h-screen, h-96) — without it the group has no intrinsic size.",
    },
  ]
}

function getPanelPropRows(): PropRow[] {
  return [
    {
      name: "defaultSize",
      type: "number",
      description: "Initial size as a percentage of the group (0–100). All panels in a group must sum to 100.",
    },
    {
      name: "minSize",
      type: "number",
      description: "Minimum size as a percentage. The handle stops dragging once this floor is reached.",
    },
    {
      name: "maxSize",
      type: "number",
      description: "Maximum size as a percentage. Use to clamp wide panels (e.g., sidebars that shouldn't exceed 40% of the page).",
    },
    {
      name: "collapsible",
      type: "boolean",
      defaultValue: "false",
      description: "Allow the panel to fully collapse below its minSize. Use with collapsedSize for snap-to-collapsed behaviour.",
    },
    {
      name: "id",
      type: "string",
      description: "Stable identifier — required if you want autoSaveId to remember this panel's size across renders.",
    },
  ]
}

function getHandlePropRows(): PropRow[] {
  return [
    {
      name: "withHandle",
      type: "boolean",
      defaultValue: "false",
      description: "Render a visible grip dot at the center of the handle. Aids discoverability — without it the handle is a 1px line.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disable dragging. The handle still renders but doesn't respond to interaction.",
    },
  ]
}

/* ── Page ── */

function Panel({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex h-full items-center justify-center text-sm text-muted-foreground ${className}`}>
      {label}
    </div>
  )
}

const FOLDERS = ["Inbox · 12", "Assigned to me · 4", "Starred · 2", "Sent", "Archive"]
const TICKETS = [
  { id: "TCK-1042", subject: "Login failures after SSO upgrade", from: "Amal Hassan" },
  { id: "TCK-1041", subject: "Export CSV truncates at 10k rows", from: "Daniel Park" },
  { id: "TCK-1040", subject: "Slack integration silent failure", from: "Priya Shah" },
  { id: "TCK-1039", subject: "Refund processed twice on invoice 8821", from: "Marco Rossi" },
]

export default function ResizablePage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.resizable.title")}
      description={t("docs.resizable.description")}
      category={t("docs.resizable.category")}
    >
      <Section title={t("docs.resizable.preview.title")} description={t("docs.resizable.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="h-48 w-full max-w-xl">
            <ResizablePanelGroup
              direction="horizontal"
              className="rounded-lg border border-border"
            >
              <ResizablePanel defaultSize={50}>
                <Panel label="Left" />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <Panel label="Right" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.resizable.installation.title")} description={t("docs.resizable.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.resizable.installation.filename")} />
      </Section>

      <Section title={t("docs.resizable.usage.title")} description={t("docs.resizable.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.resizable.examples.title")} description={t("docs.resizable.examples.description")}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.resizable.examples.horizontal.label")}
            description={t("docs.resizable.examples.horizontal.description")}
            code={EXAMPLE_SNIPPETS.horizontal}
          >
            <div className="h-40 w-full">
              <ResizablePanelGroup direction="horizontal" className="rounded-lg border border-border">
                <ResizablePanel defaultSize={50}><Panel label="Left" /></ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}><Panel label="Right" /></ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.resizable.examples.vertical.label")}
            description={t("docs.resizable.examples.vertical.description")}
            code={EXAMPLE_SNIPPETS.vertical}
          >
            <div className="h-56 w-full">
              <ResizablePanelGroup direction="vertical" className="rounded-lg border border-border">
                <ResizablePanel defaultSize={60}><Panel label="Top" /></ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={40}><Panel label="Bottom" /></ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.resizable.examples.withHandle.label")}
            description={t("docs.resizable.examples.withHandle.description")}
            code={EXAMPLE_SNIPPETS.withHandle}
            className="lg:col-span-2"
          >
            <div className="h-44 w-full">
              <ResizablePanelGroup direction="horizontal" className="rounded-lg border border-border">
                <ResizablePanel defaultSize={30}><Panel label="Sidebar" /></ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={70}><Panel label="Main" /></ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.resizable.examples.minMax.label")}
            description={t("docs.resizable.examples.minMax.description")}
            code={EXAMPLE_SNIPPETS.minMax}
            className="lg:col-span-2"
          >
            <div className="h-44 w-full">
              <ResizablePanelGroup direction="horizontal" className="rounded-lg border border-border">
                <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
                  <Panel label="min 15% · max 40%" />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                  <Panel label="flexible" />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.resizable.examples.threePanel.label")}
            description={t("docs.resizable.examples.threePanel.description")}
            code={EXAMPLE_SNIPPETS.threePanel}
            className="lg:col-span-2"
          >
            <div className="h-64 w-full">
              <ResizablePanelGroup direction="horizontal" className="rounded-lg border border-border bg-card">
                <ResizablePanel defaultSize={20} minSize={15}>
                  <div className="flex h-full flex-col gap-1 p-3 text-xs">
                    {FOLDERS.map((f) => (
                      <div
                        key={f}
                        className="rounded-md px-2 py-1.5 hover:bg-muted text-gray-700 dark:text-slate-300"
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={35} minSize={20}>
                  <div className="flex h-full flex-col divide-y divide-border">
                    {TICKETS.map((tk) => (
                      <div key={tk.id} className="flex flex-col gap-0.5 px-3 py-2">
                        <p className="text-xs font-mono text-muted-foreground">{tk.id}</p>
                        <p className="truncate text-sm font-medium">{tk.subject}</p>
                        <p className="text-xs text-muted-foreground">{tk.from}</p>
                      </div>
                    ))}
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={45}>
                  <div className="flex h-full flex-col gap-3 p-4">
                    <p className="text-sm font-semibold">Login failures after SSO upgrade</p>
                    <p className="text-xs text-muted-foreground">From Amal Hassan · 12m ago</p>
                    <p className="text-sm text-gray-700 dark:text-slate-300">
                      We rolled out the new SSO provider yesterday and all our agents are now seeing 401s when trying to log in. Can someone take a look?
                    </p>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.resizable.examples.nested.label")}
            description={t("docs.resizable.examples.nested.description")}
            code={EXAMPLE_SNIPPETS.nested}
            className="lg:col-span-2"
          >
            <div className="h-72 w-full">
              <ResizablePanelGroup direction="horizontal" className="rounded-lg border border-border">
                <ResizablePanel defaultSize={25}><Panel label="Sidebar" /></ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={70}><Panel label="Editor" /></ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={30}><Panel label="Terminal" /></ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.resizable.props.title")} description={t("docs.resizable.props.description")}>
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm font-medium">ResizablePanelGroup</p>
            <PropsTable rows={getGroupPropRows()} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">ResizablePanel</p>
            <PropsTable rows={getPanelPropRows()} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">ResizableHandle</p>
            <PropsTable rows={getHandlePropRows()} />
          </div>
        </div>
      </Section>

      <Section title={t("docs.resizable.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.resizable.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.resizable.accessibility.items.keyboard")}</li>
          <li>{t("docs.resizable.accessibility.items.handle")}</li>
          <li>{t("docs.resizable.accessibility.items.touch")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["spacing", "radius", "colors"]} />

      <RelatedLinks
        title={t("docs.resizable.related.title")}
        items={[
          { label: "Scroll Area", href: "/ui/scroll-area" },
          { label: "Container", href: "/ui/container" },
          { label: "Stack", href: "/ui/stack" },
        ]}
      />
    </ComponentPage>
  )
}
