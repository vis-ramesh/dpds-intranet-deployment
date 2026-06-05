import { useTranslation } from "react-i18next"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
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
import { cn } from "@dpds-gov/design-system"

/* ── Snippets ── */

const INSTALL_SNIPPET = `import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Avatar, AvatarImage, AvatarFallback } from "@dpds-gov/design-system"

export function AssigneeChip({ agent }: { agent: Agent }) {
  return (
    <Avatar size="sm">
      <AvatarImage src={agent.avatarUrl} alt={agent.name} />
      <AvatarFallback>{initials(agent.name)}</AvatarFallback>
    </Avatar>
  )
}`

const PREVIEW_SNIPPET = `<Avatar>
  <AvatarImage src="/agents/amal.jpg" alt="Amal Hassan" />
  <AvatarFallback>AH</AvatarFallback>
</Avatar>`

const EXAMPLE_SNIPPETS = {
  withImage: `<Avatar>
  <AvatarImage src="/agents/amal.jpg" alt="Amal Hassan" />
  <AvatarFallback>AH</AvatarFallback>
</Avatar>`,
  fallback: `// AvatarFallback renders when the image fails to load or src is omitted.
<Avatar>
  <AvatarImage src="/missing.jpg" alt="Khalid Saeed" />
  <AvatarFallback>KS</AvatarFallback>
</Avatar>`,
  sizes: `<Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
<Avatar><AvatarFallback>MD</AvatarFallback></Avatar>
<Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>`,
  withBadge: `// Status dot — pair AvatarBadge with a color class.
<Avatar>
  <AvatarFallback>NA</AvatarFallback>
  <AvatarBadge className="bg-success-500" />
</Avatar>`,
  statuses: `// Compose status semantics by colouring AvatarBadge.
const STATUS = {
  online:  "bg-success-500",
  away:    "bg-warning-500",
  busy:    "bg-error-500",
  offline: "bg-gray-400",
}

<Avatar>
  <AvatarFallback>NA</AvatarFallback>
  <AvatarBadge className={STATUS.online} />
</Avatar>`,
  square: `// Override the rounded class for a square / "team mark" treatment.
<Avatar className="rounded-md">
  <AvatarFallback>AF</AvatarFallback>
</Avatar>`,
  group: `// Stack avatars with negative spacing and a "+N more" count.
<AvatarGroup>
  <Avatar><AvatarFallback>AH</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>KS</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>FM</AvatarFallback></Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "Avatar.size",
      type: '"sm" | "default" | "lg"',
      defaultValue: '"default"',
      description: "Pixel size: sm=24px (inline / list items), default=32px (most surfaces), lg=40px (profile cards).",
    },
    {
      name: "Avatar.className",
      type: "string",
      description: "Override the shape (e.g. rounded-md for a square treatment) or layer additional styling.",
    },
    {
      name: "AvatarImage.src",
      type: "string",
      description: "Image URL. The image element handles loading and emits onError up to the Avatar root.",
    },
    {
      name: "AvatarImage.alt",
      type: "string",
      required: true,
      description: "Alt text. Use the person's full name — screen readers and broken-image states both depend on it.",
    },
    {
      name: "AvatarFallback.children",
      type: "ReactNode",
      description: "Shown while the image loads or after it fails. Two-letter initials are the convention; an icon is also fine.",
    },
    {
      name: "AvatarFallback.delayMs",
      type: "number",
      defaultValue: "0",
      description: "Delay before showing the fallback. Set to ~600ms to avoid a flash of initials when the image loads quickly.",
    },
    {
      name: "AvatarBadge",
      type: "ComponentProps<\"span\">",
      description: "Status dot pinned to the bottom-right corner. Color it via className — the primitive defaults to bg-primary.",
    },
    {
      name: "AvatarGroup",
      type: "ComponentProps<\"div\">",
      description: "Container that stacks child Avatars with -space-x-2 and adds a background ring so they read as a group.",
    },
    {
      name: "AvatarGroupCount",
      type: "ComponentProps<\"div\">",
      description: "Overflow indicator (\"+3\"). Render at the end of an AvatarGroup to signal more team members than shown.",
    },
  ]
}

/* ── Live demo bits ── */

const AGENTS = [
  { name: "Amal Hassan", initials: "AH", color: "bg-primary-100 text-primary-700 dark:bg-primary-300/20 dark:text-primary-200" },
  { name: "Khalid Saeed", initials: "KS", color: "bg-secondary-100 text-secondary-700 dark:bg-secondary-300/20 dark:text-secondary-100" },
  { name: "Fatima Al Maktoum", initials: "FM", color: "bg-warning-100 text-warning-700 dark:bg-warning-300/20 dark:text-warning-200" },
] as const

function AssigneeAvatar({ size }: { size?: "sm" | "default" | "lg" }) {
  return (
    <Avatar size={size}>
      <AvatarFallback className={AGENTS[0].color}>{AGENTS[0].initials}</AvatarFallback>
    </Avatar>
  )
}

const STATUS_CLS = {
  online: "bg-success-500",
  away: "bg-warning-500",
  busy: "bg-error-500",
  offline: "bg-gray-400 dark:bg-gray-500",
} as const

/* ── Page ── */

export default function AvatarPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.avatar.title")}
      description={t("docs.avatar.description")}
      category={t("docs.avatar.category")}
    >
      <Section title={t("docs.avatar.preview.title")} description={t("docs.avatar.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Avatar>
            <AvatarFallback className={AGENTS[0].color}>AH</AvatarFallback>
          </Avatar>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.avatar.installation.title")} description={t("docs.avatar.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.avatar.installation.filename")} />
      </Section>

      <Section title={t("docs.avatar.usage.title")} description={t("docs.avatar.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.avatar.examples.title")} description={t("docs.avatar.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.avatar.examples.withImage.label")}
            description={t("docs.avatar.examples.withImage.description")}
            code={EXAMPLE_SNIPPETS.withImage}
          >
            <Avatar>
              {/* Image src is mock — primitive will fall through to AvatarFallback */}
              <AvatarImage src="/agents/amal.jpg" alt="Amal Hassan" />
              <AvatarFallback className={AGENTS[0].color}>AH</AvatarFallback>
            </Avatar>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.avatar.examples.fallback.label")}
            description={t("docs.avatar.examples.fallback.description")}
            code={EXAMPLE_SNIPPETS.fallback}
          >
            <div className="flex flex-wrap items-center gap-3">
              {AGENTS.map((a) => (
                <Avatar key={a.name}>
                  <AvatarFallback className={a.color}>{a.initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.avatar.examples.sizes.label")}
            description={t("docs.avatar.examples.sizes.description")}
            code={EXAMPLE_SNIPPETS.sizes}
          >
            <div className="flex flex-wrap items-end gap-3">
              <AssigneeAvatar size="sm" />
              <AssigneeAvatar />
              <AssigneeAvatar size="lg" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.avatar.examples.withBadge.label")}
            description={t("docs.avatar.examples.withBadge.description")}
            code={EXAMPLE_SNIPPETS.withBadge}
          >
            <Avatar>
              <AvatarFallback className={AGENTS[0].color}>AH</AvatarFallback>
              <AvatarBadge className={STATUS_CLS.online} />
            </Avatar>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.avatar.examples.statuses.label")}
            description={t("docs.avatar.examples.statuses.description")}
            code={EXAMPLE_SNIPPETS.statuses}
          >
            <div className="flex flex-wrap items-center gap-4">
              {(["online", "away", "busy", "offline"] as const).map((s, i) => (
                <div key={s} className="flex flex-col items-center gap-1">
                  <Avatar>
                    <AvatarFallback className={AGENTS[i % AGENTS.length].color}>
                      {AGENTS[i % AGENTS.length].initials}
                    </AvatarFallback>
                    <AvatarBadge className={STATUS_CLS[s]} />
                  </Avatar>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.avatar.examples.square.label")}
            description={t("docs.avatar.examples.square.description")}
            code={EXAMPLE_SNIPPETS.square}
          >
            <div className="flex items-center gap-3">
              <Avatar className="rounded-md">
                <AvatarFallback className={cn(AGENTS[0].color, "rounded-md")}>AF</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">Team mark</span>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.avatar.examples.group.label")}
            description={t("docs.avatar.examples.group.description")}
            code={EXAMPLE_SNIPPETS.group}
            className="lg:col-span-2"
          >
            <AvatarGroup>
              {AGENTS.map((a) => (
                <Avatar key={a.name}>
                  <AvatarFallback className={a.color}>{a.initials}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount>+3</AvatarGroupCount>
            </AvatarGroup>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.avatar.props.title")} description={t("docs.avatar.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.avatar.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.avatar.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.avatar.accessibility.items.alt")}</li>
          <li>{t("docs.avatar.accessibility.items.fallback")}</li>
          <li>{t("docs.avatar.accessibility.items.status")}</li>
          <li>{t("docs.avatar.accessibility.items.group")}</li>
          <li>{t("docs.avatar.accessibility.items.decoration")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.avatar.related.title")}
        items={[
          { label: "Badge", href: "/ui/badges" },
          { label: "Tag", href: "/ui/tag" },
          { label: "List", href: "/ui/list" },
        ]}
      />
    </ComponentPage>
  )
}
