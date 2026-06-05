import { useState } from "react"
import { FileText, MessageSquare, Settings, ShieldCheck } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@dpds-gov/design-system"

export function TicketTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Client info, SLA, assignee.</TabsContent>
      <TabsContent value="documents">Attached documents.</TabsContent>
      <TabsContent value="activity">Action log.</TabsContent>
    </Tabs>
  )
}`

const PREVIEW_SNIPPET = `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="requests">Requests</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
</Tabs>`

const EXAMPLE_SNIPPETS = {
  default: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="documents">Documents</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
</Tabs>`,
  line: `<Tabs defaultValue="all">
  <TabsList variant="line">
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="open">Open</TabsTrigger>
    <TabsTrigger value="closed">Closed</TabsTrigger>
  </TabsList>
  <TabsContent value="all">...</TabsContent>
</Tabs>`,
  vertical: `<Tabs orientation="vertical" defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">...</TabsContent>
</Tabs>`,
  withIcons: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">
      <FileText className="size-4" /> Overview
    </TabsTrigger>
    <TabsTrigger value="chat">
      <MessageSquare className="size-4" /> Chat
    </TabsTrigger>
    <TabsTrigger value="settings">
      <Settings className="size-4" /> Settings
    </TabsTrigger>
  </TabsList>
</Tabs>`,
  withBadges: `<Tabs defaultValue="open">
  <TabsList>
    <TabsTrigger value="open">
      Open <Badge variant="warning" className="ms-1">12</Badge>
    </TabsTrigger>
    <TabsTrigger value="overdue">
      Overdue <Badge variant="destructive" className="ms-1">3</Badge>
    </TabsTrigger>
    <TabsTrigger value="closed">Closed</TabsTrigger>
  </TabsList>
</Tabs>`,
  controlled: `const [tab, setTab] = useState("overview")

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="docs">Docs</TabsTrigger>
  </TabsList>
</Tabs>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "defaultValue",
      type: "string",
      description: "Initial active tab when uncontrolled.",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled active tab. Pair with onValueChange.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Fires when the active tab changes.",
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      defaultValue: '"horizontal"',
      description: "Layout direction. Vertical lays out TabsList beside TabsContent.",
    },
    {
      name: "TabsList.variant",
      type: '"default" | "line"',
      defaultValue: '"default"',
      description: 'Pill (background fill) or underline style. "line" suits page-level navigation; "default" suits in-card content switching.',
    },
    {
      name: "TabsTrigger.value",
      type: "string",
      required: true,
      description: "Unique id linking the trigger to its TabsContent. Must match the corresponding TabsContent.value.",
    },
    {
      name: "TabsTrigger.disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Greys out the trigger and removes it from arrow-key navigation.",
    },
  ]
}

/* ── Live demo bits ── */

function ControlledExample() {
  const [tab, setTab] = useState("overview")
  return (
    <div className="w-full max-w-md flex flex-col gap-3">
      <Tabs value={tab} onValueChange={(v) => setTab(v as string)}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-4 text-sm text-muted-foreground">Overview panel</TabsContent>
        <TabsContent value="docs" className="p-4 text-sm text-muted-foreground">Documents panel</TabsContent>
        <TabsContent value="activity" className="p-4 text-sm text-muted-foreground">Activity log panel</TabsContent>
      </Tabs>
      <p className="text-xs text-muted-foreground">Current tab: <code className="font-mono">{tab}</code></p>
    </div>
  )
}

/* ── Page ── */

export default function TabsPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.tabs.title")}
      description={t("docs.tabs.description")}
      category={t("docs.tabs.category")}
    >
      <Section title={t("docs.tabs.preview.title")} description={t("docs.tabs.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Tabs defaultValue="overview" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 text-sm text-muted-foreground">Customer overview with SLA, last contact, and lifetime value.</TabsContent>
            <TabsContent value="requests" className="p-4 text-sm text-muted-foreground">Open and resolved request history.</TabsContent>
            <TabsContent value="settings" className="p-4 text-sm text-muted-foreground">Notification preferences and access permissions.</TabsContent>
          </Tabs>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.tabs.installation.title")} description={t("docs.tabs.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.tabs.installation.filename")} />
      </Section>

      <Section title={t("docs.tabs.usage.title")} description={t("docs.tabs.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.tabs.examples.title")} description={t("docs.tabs.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.tabs.examples.default.label")}
            description={t("docs.tabs.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="p-3 text-xs text-muted-foreground">Overview content</TabsContent>
            </Tabs>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tabs.examples.line.label")}
            description={t("docs.tabs.examples.line.description")}
            code={EXAMPLE_SNIPPETS.line}
          >
            <Tabs defaultValue="all" className="w-full">
              <TabsList variant="line">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="p-3 text-xs text-muted-foreground">All tickets</TabsContent>
            </Tabs>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tabs.examples.vertical.label")}
            description={t("docs.tabs.examples.vertical.description")}
            code={EXAMPLE_SNIPPETS.vertical}
            center={false}
          >
            <Tabs orientation="vertical" defaultValue="profile" className="w-full">
              <TabsList className="self-start">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">
                  <ShieldCheck className="size-4" /> Security
                </TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="p-3 text-xs text-muted-foreground">Profile settings</TabsContent>
              <TabsContent value="security" className="p-3 text-xs text-muted-foreground">Security and access</TabsContent>
              <TabsContent value="notifications" className="p-3 text-xs text-muted-foreground">Notification rules</TabsContent>
            </Tabs>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tabs.examples.withIcons.label")}
            description={t("docs.tabs.examples.withIcons.description")}
            code={EXAMPLE_SNIPPETS.withIcons}
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">
                  <FileText className="size-4" /> Overview
                </TabsTrigger>
                <TabsTrigger value="chat">
                  <MessageSquare className="size-4" /> Chat
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="size-4" /> Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tabs.examples.withBadges.label")}
            description={t("docs.tabs.examples.withBadges.description")}
            code={EXAMPLE_SNIPPETS.withBadges}
          >
            <Tabs defaultValue="open" className="w-full">
              <TabsList>
                <TabsTrigger value="open">
                  Open <Badge variant="warning" className="ms-1">12</Badge>
                </TabsTrigger>
                <TabsTrigger value="overdue">
                  Overdue <Badge variant="destructive" className="ms-1">3</Badge>
                </TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>
            </Tabs>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tabs.examples.controlled.label")}
            description={t("docs.tabs.examples.controlled.description")}
            code={EXAMPLE_SNIPPETS.controlled}
          >
            <ControlledExample />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.tabs.props.title")} description={t("docs.tabs.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.tabs.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.tabs.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.tabs.accessibility.items.keyboard")}</li>
          <li>{t("docs.tabs.accessibility.items.aria")}</li>
          <li>{t("docs.tabs.accessibility.items.focus")}</li>
          <li>{t("docs.tabs.accessibility.items.notNav")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "motion"]} />

      <RelatedLinks
        title={t("docs.tabs.related.title")}
        items={[
          { label: "Sidebar", href: "/ui/sidebar" },
          { label: "Navbar", href: "/ui/navbar" },
          { label: "Accordion", href: "/ui/accordion" },
        ]}
      />
    </ComponentPage>
  )
}
