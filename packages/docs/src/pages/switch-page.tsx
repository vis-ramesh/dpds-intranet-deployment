import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Bell, Mail, MessageSquare, ShieldCheck } from "lucide-react"

import { Switch } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Switch } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Switch } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"

export function SlaAlertSetting() {
  return (
    <div className="flex items-center gap-3">
      <Switch id="sla-alerts" defaultChecked />
      <Label htmlFor="sla-alerts">Alert me when an SLA is breached</Label>
    </div>
  )
}`

const PREVIEW_SNIPPET = `<div className="flex items-center gap-3">
  <Switch id="auto-assign" defaultChecked />
  <Label htmlFor="auto-assign">Auto-assign new tickets to me</Label>
</div>`

const EXAMPLE_SNIPPETS = {
  default: `<Switch />`,
  labeled: `<div className="flex items-center gap-3">
  <Switch id="email-alerts" defaultChecked />
  <Label htmlFor="email-alerts">Email me when a ticket is reassigned</Label>
</div>`,
  withDescription: `<div className="flex items-start gap-3">
  <Switch id="mfa" defaultChecked className="mt-0.5" />
  <div className="grid gap-1">
    <Label htmlFor="mfa">Require multi-factor authentication</Label>
    <p className="text-xs text-muted-foreground">
      Agents will be prompted for a one-time code at sign-in.
    </p>
  </div>
</div>`,
  controlled: `const [open, setOpen] = useState(true)

<div className="flex items-center gap-3">
  <Switch id="bot" checked={open} onCheckedChange={setOpen} />
  <Label htmlFor="bot">Bot replies enabled</Label>
</div>
<p className="text-xs text-muted-foreground">
  Status: <code>{open ? "on" : "off"}</code>
</p>`,
  disabled: `<div className="flex flex-col gap-3">
  <div className="flex items-center gap-3">
    <Switch id="dis-off" disabled />
    <Label htmlFor="dis-off" className="opacity-50">Workflow automation (off, locked)</Label>
  </div>
  <div className="flex items-center gap-3">
    <Switch id="dis-on" disabled defaultChecked />
    <Label htmlFor="dis-on" className="opacity-50">SOC 2 logging (on, locked by policy)</Label>
  </div>
</div>`,
  small: `<Switch size="sm" />`,
  settingsList: `// A common notifications panel — Switch + Label + helper text per row.
<div className="flex flex-col divide-y divide-border">
  {settings.map((s) => (
    <div key={s.id} className="flex items-start justify-between gap-4 py-4">
      <div className="grid gap-1">
        <Label htmlFor={s.id} className="flex items-center gap-2">
          <s.icon className="size-4 text-muted-foreground" />
          {s.title}
        </Label>
        <p className="text-xs text-muted-foreground">{s.description}</p>
      </div>
      <Switch id={s.id} defaultChecked={s.defaultChecked} />
    </div>
  ))}
</div>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "checked",
      type: "boolean",
      description: "Controlled state. Pair with onCheckedChange.",
    },
    {
      name: "defaultChecked",
      type: "boolean",
      description: "Initial state for uncontrolled usage. Use for settings with a sensible default-on or default-off.",
    },
    {
      name: "onCheckedChange",
      type: "(checked: boolean) => void",
      description: "Fires when the user toggles the switch. Receives the new boolean state.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Greys out the switch and removes it from tab order. Mirror with opacity-50 on the linked Label.",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Participates in native form validation. The form won't submit unless the switch is on.",
    },
    {
      name: "name",
      type: "string",
      description: "Form name. Required when submitting via a native form.",
    },
    {
      name: "size",
      type: '"default" | "sm"',
      defaultValue: '"default"',
      description: "Visual size. \"sm\" is for dense settings lists where height matters; default for primary toggles.",
    },
    {
      name: "id",
      type: "string",
      description: "DOM id. Required for Label htmlFor association — without it, clicking the label won't toggle the switch.",
    },
  ]
}

/* ── Live demo bits ── */

function ControlledExample() {
  const [open, setOpen] = useState(true)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Switch id="ex-bot" checked={open} onCheckedChange={setOpen} />
        <Label htmlFor="ex-bot">Bot replies enabled</Label>
      </div>
      <p className="text-xs text-muted-foreground">
        Status: <code className="font-mono">{open ? "on" : "off"}</code>
      </p>
    </div>
  )
}

const SETTINGS = [
  { id: "ntf-email", title: "Email me on assignment", description: "When a ticket is assigned to me.", icon: Mail, defaultChecked: true },
  { id: "ntf-sms", title: "SMS for SLA breaches", description: "Send a text if a P1 ticket is unresponded for 15 minutes.", icon: Bell, defaultChecked: false },
  { id: "ntf-chat", title: "Slack notifications", description: "Mirror ticket comments to my Slack DMs.", icon: MessageSquare, defaultChecked: true },
  { id: "ntf-mfa", title: "Require MFA at sign-in", description: "Org-wide policy — agents are prompted for a one-time code.", icon: ShieldCheck, defaultChecked: true },
] as const

function SettingsListExample() {
  return (
    <div className="flex w-full max-w-md flex-col divide-y divide-border rounded-xl border border-border bg-card">
      {SETTINGS.map((s) => (
        <div key={s.id} className="flex items-start justify-between gap-4 p-4">
          <div className="grid min-w-0 gap-1">
            <Label htmlFor={s.id} className="flex items-center gap-2">
              <s.icon className="size-4 text-muted-foreground" />
              {s.title}
            </Label>
            <p className="text-xs text-muted-foreground">{s.description}</p>
          </div>
          <Switch id={s.id} defaultChecked={s.defaultChecked} />
        </div>
      ))}
    </div>
  )
}

/* ── Page ── */

export default function SwitchPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.switch.title")}
      description={t("docs.switch.description")}
      category={t("docs.switch.category")}
    >
      <Section title={t("docs.switch.preview.title")} description={t("docs.switch.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="flex items-center gap-3">
            <Switch id="preview-switch" defaultChecked />
            <Label htmlFor="preview-switch">Auto-assign new tickets to me</Label>
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.switch.installation.title")} description={t("docs.switch.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.switch.installation.filename")} />
      </Section>

      <Section title={t("docs.switch.usage.title")} description={t("docs.switch.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.switch.examples.title")} description={t("docs.switch.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.switch.examples.default.label")}
            description={t("docs.switch.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <Switch />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.switch.examples.labeled.label")}
            description={t("docs.switch.examples.labeled.description")}
            code={EXAMPLE_SNIPPETS.labeled}
          >
            <div className="flex items-center gap-3">
              <Switch id="ex-labeled" defaultChecked />
              <Label htmlFor="ex-labeled">Email me when a ticket is reassigned</Label>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.switch.examples.withDescription.label")}
            description={t("docs.switch.examples.withDescription.description")}
            code={EXAMPLE_SNIPPETS.withDescription}
          >
            <div className="flex items-start gap-3">
              <Switch id="ex-mfa" defaultChecked className="mt-0.5" />
              <div className="grid gap-1">
                <Label htmlFor="ex-mfa">Require multi-factor authentication</Label>
                <p className="text-xs text-muted-foreground">
                  Agents will be prompted for a one-time code at sign-in.
                </p>
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.switch.examples.controlled.label")}
            description={t("docs.switch.examples.controlled.description")}
            code={EXAMPLE_SNIPPETS.controlled}
          >
            <ControlledExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.switch.examples.disabled.label")}
            description={t("docs.switch.examples.disabled.description")}
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Switch id="ex-dis-off" disabled />
                <Label htmlFor="ex-dis-off" className="opacity-50">Workflow automation (off, locked)</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="ex-dis-on" disabled defaultChecked />
                <Label htmlFor="ex-dis-on" className="opacity-50">SOC 2 logging (on, locked by policy)</Label>
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.switch.examples.small.label")}
            description={t("docs.switch.examples.small.description")}
            code={EXAMPLE_SNIPPETS.small}
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch size="sm" id="ex-small-1" defaultChecked />
                <Label htmlFor="ex-small-1" className="text-xs">Small (sm)</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="ex-small-2" defaultChecked />
                <Label htmlFor="ex-small-2" className="text-xs">Default</Label>
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.switch.examples.settingsList.label")}
            description={t("docs.switch.examples.settingsList.description")}
            code={EXAMPLE_SNIPPETS.settingsList}
            className="lg:col-span-2"
          >
            <SettingsListExample />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.switch.props.title")} description={t("docs.switch.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.switch.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.switch.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.switch.accessibility.items.label")}</li>
          <li>{t("docs.switch.accessibility.items.keyboard")}</li>
          <li>{t("docs.switch.accessibility.items.role")}</li>
          <li>{t("docs.switch.accessibility.items.disabled")}</li>
          <li>{t("docs.switch.accessibility.items.checkbox")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "motion"]} />

      <RelatedLinks
        title={t("docs.switch.related.title")}
        items={[
          { label: "Checkbox", href: "/forms/checkbox" },
          { label: "Tabs", href: "/ui/tabs" },
          { label: "Form", href: "/forms/form" },
          { label: "Label", href: "/forms/label" },
        ]}
      />
    </ComponentPage>
  )
}
