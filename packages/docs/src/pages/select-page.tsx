import { useState } from "react"
import { AlertCircle, CheckCircle2, Clock, FileText, User } from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@dpds-gov/design-system"

export function PriorityFilter() {
  return (
    <Select onValueChange={(value) => console.log("priority:", value)}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="critical">Critical</SelectItem>
        <SelectItem value="high">High</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="low">Low</SelectItem>
      </SelectContent>
    </Select>
  )
}`

const PREVIEW_SNIPPET = `<Select>
  <SelectTrigger><SelectValue placeholder="Pick a status" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="new">New</SelectItem>
    <SelectItem value="in-progress">In progress</SelectItem>
    <SelectItem value="resolved">Resolved</SelectItem>
  </SelectContent>
</Select>`

const EXAMPLE_SNIPPETS = {
  default: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an assignee" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="mohammed">Mohammed Al Mansoori</SelectItem>
    <SelectItem value="sarah">Sarah Chen</SelectItem>
    <SelectItem value="khalifa">Khalifa Mohammed</SelectItem>
  </SelectContent>
</Select>`,
  placeholder: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Filter by status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="new">New</SelectItem>
    <SelectItem value="under-investigation">Under investigation</SelectItem>
    <SelectItem value="pending-approval">Pending approval</SelectItem>
    <SelectItem value="completed">Completed</SelectItem>
  </SelectContent>
</Select>`,
  grouped: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Pick a queue" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>My queues</SelectLabel>
      <SelectItem value="my-open">My open tickets</SelectItem>
      <SelectItem value="my-watching">Watching</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Team queues</SelectLabel>
      <SelectItem value="legal">Legal Affairs</SelectItem>
      <SelectItem value="finance">Finance</SelectItem>
      <SelectItem value="ops">Operations</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
  withIcons: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Filter by priority" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="critical">
      <AlertCircle className="size-4 text-error-500" /> Critical
    </SelectItem>
    <SelectItem value="high">
      <Clock className="size-4 text-warning-500" /> High
    </SelectItem>
    <SelectItem value="resolved">
      <CheckCircle2 className="size-4 text-primary-500" /> Resolved
    </SelectItem>
  </SelectContent>
</Select>`,
  controlled: `const [status, setStatus] = useState("new")

<Select value={status} onValueChange={setStatus}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="new">New</SelectItem>
    <SelectItem value="in-progress">In progress</SelectItem>
    <SelectItem value="resolved">Resolved</SelectItem>
  </SelectContent>
</Select>`,
  disabled: `<Select disabled defaultValue="locked">
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="locked">Locked by SLA policy</SelectItem>
  </SelectContent>
</Select>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "value",
      type: "string",
      description: "Controlled selected value. Pair with onValueChange.",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Initial value when the Select is uncontrolled.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Fires when the user picks an item. Receives the new value.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the trigger and prevents the menu from opening.",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Marks the Select as required inside a <form>.",
    },
    {
      name: "name",
      type: "string",
      description: "Form name — used when the parent <form> is submitted natively.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "SelectTrigger + SelectContent. Items live inside SelectContent.",
    },
  ]
}

/* ── Live demo bits ── */

function ControlledExample() {
  const [status, setStatus] = useState("new")
  return (
    <div className="flex flex-col gap-2 items-start">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[220px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="in-progress">In progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">Current value: <code className="font-mono">{status}</code></p>
    </div>
  )
}

/* ── Page ── */

export default function SelectPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.select.title")}
      description={t("docs.select.description")}
      category={t("docs.select.category")}
    >
      <Section title={t("docs.select.preview.title")} description={t("docs.select.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Select>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder={t("docs.select.preview.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.select.installation.title")} description={t("docs.select.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.select.installation.filename")} />
      </Section>

      <Section title={t("docs.select.usage.title")} description={t("docs.select.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.select.examples.title")} description={t("docs.select.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.select.examples.default.label")}
            description={t("docs.select.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <div className="grid w-full max-w-xs gap-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select>
                <SelectTrigger id="assignee">
                  <SelectValue placeholder="Select an assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mohammed">
                    <User className="size-4 text-muted-foreground" /> Mohammed Al Mansoori
                  </SelectItem>
                  <SelectItem value="sarah">
                    <User className="size-4 text-muted-foreground" /> Sarah Chen
                  </SelectItem>
                  <SelectItem value="khalifa">
                    <User className="size-4 text-muted-foreground" /> Khalifa Mohammed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.select.examples.placeholder.label")}
            description={t("docs.select.examples.placeholder.description")}
            code={EXAMPLE_SNIPPETS.placeholder}
          >
            <Select>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="under-investigation">Under investigation</SelectItem>
                <SelectItem value="pending-approval">Pending approval</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.select.examples.grouped.label")}
            description={t("docs.select.examples.grouped.description")}
            code={EXAMPLE_SNIPPETS.grouped}
          >
            <Select>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Pick a queue" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>My queues</SelectLabel>
                  <SelectItem value="my-open">My open tickets</SelectItem>
                  <SelectItem value="my-watching">Watching</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Team queues</SelectLabel>
                  <SelectItem value="legal"><FileText className="size-4 text-muted-foreground" /> Legal Affairs</SelectItem>
                  <SelectItem value="finance"><FileText className="size-4 text-muted-foreground" /> Finance</SelectItem>
                  <SelectItem value="ops"><FileText className="size-4 text-muted-foreground" /> Operations</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.select.examples.withIcons.label")}
            description={t("docs.select.examples.withIcons.description")}
            code={EXAMPLE_SNIPPETS.withIcons}
          >
            <Select>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">
                  <AlertCircle className="size-4 text-error-500" /> Critical
                </SelectItem>
                <SelectItem className="" value="high">
                  <Clock className="size-4 text-warning-500" /> High
                </SelectItem>
                <SelectItem value="resolved">
                  <CheckCircle2 className="size-4 text-primary-500" /> Resolved
                </SelectItem>
              </SelectContent>
            </Select>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.select.examples.controlled.label")}
            description={t("docs.select.examples.controlled.description")}
            code={EXAMPLE_SNIPPETS.controlled}
          >
            <ControlledExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.select.examples.disabled.label")}
            description={t("docs.select.examples.disabled.description")}
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <Select disabled defaultValue="locked">
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="locked">Locked by SLA policy</SelectItem>
              </SelectContent>
            </Select>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.select.props.title")} description={t("docs.select.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.select.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.select.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.select.accessibility.items.keyboard")}</li>
          <li>{t("docs.select.accessibility.items.label")}</li>
          <li>{t("docs.select.accessibility.items.placeholder")}</li>
          <li>{t("docs.select.accessibility.items.searchable")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.select.related.title")}
        items={[
          { label: "Combobox", href: "/forms/combobox" },
          { label: "Form", href: "/forms/form" },
          { label: "Input", href: "/forms/input" },
        ]}
      />
    </ComponentPage>
  )
}
