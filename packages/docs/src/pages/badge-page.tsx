import { useTranslation } from "react-i18next"
import { CheckCircle2, Circle, Clock, ShieldAlert } from "lucide-react"

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

const INSTALL_SNIPPET = `import { Badge } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Badge } from "@dpds-gov/design-system"
import { Circle } from "lucide-react"

export function TicketStatus({ status }: { status: string }) {
  return (
    <Badge variant="warning">
      <Circle className="fill-current" />
      {status}
    </Badge>
  )
}`

const PREVIEW_SNIPPET = `<div className="flex flex-wrap gap-2">
  <Badge>Default</Badge>
  <Badge variant="success">Resolved</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="danger">SLA breach</Badge>
</div>`

const EXAMPLE_SNIPPETS = {
  variants: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>`,
  statuses: `// Six built-in status variants matching common CRM ticket states.
<Badge variant="success">Resolved</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">SLA breach</Badge>
<Badge variant="info">Investigating</Badge>
<Badge variant="pending">Awaiting customer</Badge>
<Badge variant="neutral">Closed</Badge>`,
  sizes: `<Badge size="sm">3</Badge>
<Badge size="md">12</Badge>
<Badge size="lg">247</Badge>`,
  withDot: `// Use a filled circle icon as a status dot.
<Badge variant="success">
  <Circle className="fill-current" />
  Online
</Badge>
<Badge variant="neutral">
  <Circle className="fill-current" />
  Offline
</Badge>`,
  withNumber: `// Counter badges — pair with size="sm" or "md" for inline use.
<button className="relative inline-flex">
  Inbox
  <Badge size="sm" variant="danger" className="absolute -top-1 -right-1">
    9
  </Badge>
</button>`,
  withIcon: `<Badge variant="info">
  <Clock />
  Awaiting payment
</Badge>
<Badge variant="success">
  <CheckCircle2 />
  Verified
</Badge>`,
  asLink: `// Pass an anchor (or any element) via the render prop.
<Badge
  variant="outline"
  render={<a href="/customers/c-1234" />}
>
  Customer · C-1234
</Badge>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "variant",
      type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "success" | "warning" | "danger" | "info" | "pending" | "neutral"',
      defaultValue: '"default"',
      description: "Visual style. Status variants (success/warning/danger/info/pending/neutral) carry semantic meaning — don't use them for decoration.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Visual size. sm for counter badges inside tight UI (icon buttons), md for inline status indicators, lg for prominent labels in headers.",
    },
    {
      name: "render",
      type: "ReactElement | RenderFunction",
      description: "Render slot from base-ui. Pass an element (e.g. <a />) to render the Badge as that tag without losing the styling. Standard polymorphic pattern.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra Tailwind classes. Merges with the base styles via cn() — later utilities win.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Badge content. Wrap status dots and Lucide icons inside the children; the primitive sizes <svg> children to ~12px automatically.",
    },
  ]
}

/* ── Page ── */

export default function BadgePage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.badge.title")}
      description={t("docs.badge.description")}
      category={t("docs.badge.category")}
    >
      <Section title={t("docs.badge.preview.title")} description={t("docs.badge.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="success">Resolved</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="danger">SLA breach</Badge>
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.badge.installation.title")} description={t("docs.badge.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.badge.installation.filename")} />
      </Section>

      <Section title={t("docs.badge.usage.title")} description={t("docs.badge.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.badge.examples.title")} description={t("docs.badge.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.badge.examples.variants.label")}
            description={t("docs.badge.examples.variants.description")}
            code={EXAMPLE_SNIPPETS.variants}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="ghost">Ghost</Badge>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.badge.examples.statuses.label")}
            description={t("docs.badge.examples.statuses.description")}
            code={EXAMPLE_SNIPPETS.statuses}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success">Resolved</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="danger">SLA breach</Badge>
              <Badge variant="info">Investigating</Badge>
              <Badge variant="pending">Awaiting customer</Badge>
              <Badge variant="neutral">Closed</Badge>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.badge.examples.sizes.label")}
            description={t("docs.badge.examples.sizes.description")}
            code={EXAMPLE_SNIPPETS.sizes}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="sm">3</Badge>
              <Badge size="md">12</Badge>
              <Badge size="lg">247</Badge>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.badge.examples.withDot.label")}
            description={t("docs.badge.examples.withDot.description")}
            code={EXAMPLE_SNIPPETS.withDot}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success">
                <Circle className="fill-current" />
                Online
              </Badge>
              <Badge variant="neutral">
                <Circle className="fill-current" />
                Offline
              </Badge>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.badge.examples.withNumber.label")}
            description={t("docs.badge.examples.withNumber.description")}
            code={EXAMPLE_SNIPPETS.withNumber}
          >
            <button className="relative inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm">
              Inbox
              <Badge size="sm" variant="danger" className="absolute -top-1 -right-1">9</Badge>
            </button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.badge.examples.withIcon.label")}
            description={t("docs.badge.examples.withIcon.description")}
            code={EXAMPLE_SNIPPETS.withIcon}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="info">
                <Clock />
                Awaiting payment
              </Badge>
              <Badge variant="success">
                <CheckCircle2 />
                Verified
              </Badge>
              <Badge variant="danger">
                <ShieldAlert />
                Fraud check
              </Badge>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.badge.examples.asLink.label")}
            description={t("docs.badge.examples.asLink.description")}
            code={EXAMPLE_SNIPPETS.asLink}
          >
            <Badge variant="outline" render={<a href="#customer" />}>
              Customer · C-1234
            </Badge>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.badge.props.title")} description={t("docs.badge.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.badge.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.badge.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.badge.accessibility.items.semantic")}</li>
          <li>{t("docs.badge.accessibility.items.label")}</li>
          <li>{t("docs.badge.accessibility.items.color")}</li>
          <li>{t("docs.badge.accessibility.items.interactive")}</li>
          <li>{t("docs.badge.accessibility.items.tag")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.badge.related.title")}
        items={[
          { label: "Tag", href: "/ui/tag" },
          { label: "Avatar", href: "/ui/avatar" },
          { label: "Tooltip", href: "/ui/tooltip" },
          { label: "Button", href: "/buttons" },
        ]}
      />
    </ComponentPage>
  )
}
