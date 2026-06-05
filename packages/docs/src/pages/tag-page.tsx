import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Star, Zap, AlertTriangle, ShieldCheck, Building2, Briefcase, Rocket } from "lucide-react"

import { Tag } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Tag } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Tag } from "@dpds-gov/design-system"
import { Star } from "lucide-react"

export function TicketHeader({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <Tag key={t} variant="primary" icon={<Star />} removable onRemove={() => removeTag(t)}>
          {t}
        </Tag>
      ))}
    </div>
  )
}`

const PREVIEW_SNIPPET = `<Tag variant="primary" icon={<Star />}>VIP</Tag>`

const EXAMPLE_SNIPPETS = {
  default: `<Tag>General</Tag>`,
  withIcon: `<Tag icon={<Star />}>VIP</Tag>`,
  selected: `<Tag selected>Active filter</Tag>`,
  removable: `<Tag variant="primary" removable onRemove={() => console.log("removed")}>
  Premium
</Tag>`,
  variants: `<Tag>Default</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="secondary">Secondary</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="destructive">Destructive</Tag>`,
  sizes: `<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>`,
  group: `const PRIORITIES = ["Low", "Medium", "High", "Urgent"]
const [selected, setSelected] = useState<Set<string>>(new Set())

<div className="flex flex-wrap gap-2">
  {PRIORITIES.map((p) => (
    <Tag
      key={p}
      selected={selected.has(p)}
      onClick={() => {
        const next = new Set(selected)
        next.has(p) ? next.delete(p) : next.add(p)
        setSelected(next)
      }}
    >
      {p}
    </Tag>
  ))}
</div>`,
  ticketTags: `<Tag variant="warning" icon={<Zap />}>Escalated</Tag>
<Tag variant="destructive" icon={<AlertTriangle />}>SLA Breach</Tag>
<Tag variant="primary" icon={<ShieldCheck />}>VIP</Tag>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "variant",
      type: '"default" | "primary" | "secondary" | "success" | "warning" | "destructive"',
      defaultValue: '"default"',
      description:
        "Color treatment. Use default for neutral labels, primary/secondary for brand surfaces, success/warning/destructive for status meaning.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      defaultValue: '"md"',
      description: "Height + padding. Use sm in dense rows and table cells, md in card headers and filter bars.",
    },
    {
      name: "selected",
      type: "boolean",
      defaultValue: "false",
      description: "Applies a stronger background + border. Use to indicate active multi-select filter state.",
    },
    {
      name: "removable",
      type: "boolean",
      defaultValue: "false",
      description: "Renders an X button on the right. Clicking it calls onRemove and stops propagation — the tag's onClick is not fired.",
    },
    {
      name: "onRemove",
      type: "() => void",
      description: "Fires when the user clicks the remove (X) button. Only meaningful when removable is true.",
    },
    {
      name: "icon",
      type: "ReactNode",
      description: "Leading icon (typically a Lucide glyph). Sized automatically at 14px regardless of tag size.",
    },
    {
      name: "onClick",
      type: "() => void",
      description: "Fires when the user clicks the tag body. If set, the tag renders as a <button> with focus + hover affordances.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Tag label. Keep it short — one or two words.",
    },
  ]
}

/* ── Live demo bits ── */

const PRIORITIES = ["Low", "Medium", "High", "Urgent"]

function GroupExample() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRIORITIES.map((p) => (
        <Tag
          key={p}
          selected={selected.has(p)}
          onClick={() => {
            const next = new Set(selected)
            if (next.has(p)) next.delete(p)
            else next.add(p)
            setSelected(next)
          }}
        >
          {p}
        </Tag>
      ))}
    </div>
  )
}

function RemovableSegmentsExample() {
  const [segments, setSegments] = useState([
    { id: "enterprise", label: "Enterprise", icon: <Building2 /> },
    { id: "smb", label: "SMB", icon: <Briefcase /> },
    { id: "startup", label: "Startup", icon: <Rocket /> },
  ])
  return (
    <div className="flex flex-wrap items-center gap-2">
      {segments.map((s) => (
        <Tag
          key={s.id}
          variant="primary"
          icon={s.icon}
          removable
          onRemove={() => setSegments((prev) => prev.filter((p) => p.id !== s.id))}
        >
          {s.label}
        </Tag>
      ))}
      {segments.length === 0 && (
        <p className="text-xs text-muted-foreground">All segments removed.</p>
      )}
    </div>
  )
}

/* ── Page ── */

export default function TagPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.tag.title")}
      description={t("docs.tag.description")}
      category={t("docs.tag.category")}
    >
      <Section title={t("docs.tag.preview.title")} description={t("docs.tag.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Tag variant="primary" icon={<Star />}>VIP</Tag>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.tag.installation.title")} description={t("docs.tag.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.tag.installation.filename")} />
      </Section>

      <Section title={t("docs.tag.usage.title")} description={t("docs.tag.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.tag.examples.title")} description={t("docs.tag.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.tag.examples.default.label")}
            description={t("docs.tag.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <Tag>General</Tag>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tag.examples.withIcon.label")}
            description={t("docs.tag.examples.withIcon.description")}
            code={EXAMPLE_SNIPPETS.withIcon}
          >
            <Tag icon={<Star />}>VIP</Tag>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tag.examples.selected.label")}
            description={t("docs.tag.examples.selected.description")}
            code={EXAMPLE_SNIPPETS.selected}
          >
            <Tag selected>Active filter</Tag>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tag.examples.removable.label")}
            description={t("docs.tag.examples.removable.description")}
            code={EXAMPLE_SNIPPETS.removable}
          >
            <RemovableSegmentsExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tag.examples.variants.label")}
            description={t("docs.tag.examples.variants.description")}
            code={EXAMPLE_SNIPPETS.variants}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Tag>Default</Tag>
              <Tag variant="primary">Primary</Tag>
              <Tag variant="secondary">Secondary</Tag>
              <Tag variant="success">Success</Tag>
              <Tag variant="warning">Warning</Tag>
              <Tag variant="destructive">Destructive</Tag>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tag.examples.sizes.label")}
            description={t("docs.tag.examples.sizes.description")}
            code={EXAMPLE_SNIPPETS.sizes}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Tag size="sm">Small</Tag>
              <Tag size="md">Medium</Tag>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tag.examples.group.label")}
            description={t("docs.tag.examples.group.description")}
            code={EXAMPLE_SNIPPETS.group}
          >
            <GroupExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.tag.examples.ticketTags.label")}
            description={t("docs.tag.examples.ticketTags.description")}
            code={EXAMPLE_SNIPPETS.ticketTags}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Tag variant="warning" icon={<Zap />}>Escalated</Tag>
              <Tag variant="destructive" icon={<AlertTriangle />}>SLA Breach</Tag>
              <Tag variant="primary" icon={<ShieldCheck />}>VIP</Tag>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.tag.props.title")} description={t("docs.tag.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.tag.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.tag.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.tag.accessibility.items.button")}</li>
          <li>{t("docs.tag.accessibility.items.removeLabel")}</li>
          <li>{t("docs.tag.accessibility.items.colorMeaning")}</li>
          <li>{t("docs.tag.accessibility.items.keyboard")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.tag.related.title")}
        items={[
          { label: "Badge", href: "/ui/badges" },
          { label: "Avatar", href: "/ui/avatar" },
          { label: "Button", href: "/buttons" },
          { label: "Iconography", href: "/foundations/iconography" },
        ]}
      />
    </ComponentPage>
  )
}
