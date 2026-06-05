import { useTranslation } from "react-i18next"
import { CalendarDays, Mail, MapPin, Ticket } from "lucide-react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@dpds-gov/design-system"
import { Avatar, AvatarFallback } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@dpds-gov/design-system"
import { Avatar, AvatarFallback } from "@dpds-gov/design-system"

export function AssigneePreview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="inline-flex items-center gap-2">
          <Avatar size="sm"><AvatarFallback>AH</AvatarFallback></Avatar>
          <span>Amal Hassan</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar><AvatarFallback>AH</AvatarFallback></Avatar>
          <div>
            <p className="font-medium">Amal Hassan</p>
            <p className="text-xs text-muted-foreground">Tier 2 · Trade licensing</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`

const PREVIEW_SNIPPET = `<HoverCard>
  <HoverCardTrigger asChild>
    <button>@amal-hassan</button>
  </HoverCardTrigger>
  <HoverCardContent>
    <UserPreview agent={amal} />
  </HoverCardContent>
</HoverCard>`

const EXAMPLE_SNIPPETS = {
  basic: `<HoverCard>
  <HoverCardTrigger asChild>
    <span className="underline cursor-help">@amal-hassan</span>
  </HoverCardTrigger>
  <HoverCardContent>
    Hover content goes here.
  </HoverCardContent>
</HoverCard>`,
  userPreview: `<HoverCard>
  <HoverCardTrigger asChild>
    <button className="inline-flex items-center gap-2">
      <Avatar size="sm"><AvatarFallback>AH</AvatarFallback></Avatar>
      <span className="underline-offset-2 hover:underline">Amal Hassan</span>
    </button>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-3">
      <Avatar size="lg"><AvatarFallback>AH</AvatarFallback></Avatar>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold">Amal Hassan</p>
        <p className="text-xs text-muted-foreground">Tier 2 · Trade licensing</p>
        <div className="mt-2 grid gap-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Mail className="size-3" /> amal@portal.gov</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-3" /> Dubai</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
  ticketPreview: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/tickets/REQ-2025-0142" className="text-primary underline-offset-2 hover:underline">
      REQ-2025-0142
    </a>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex items-center gap-2">
      <Ticket className="size-4 text-muted-foreground" />
      <span className="font-mono text-xs">REQ-2025-0142</span>
      <Badge variant="info" className="ms-auto">Open</Badge>
    </div>
    <p className="mt-2 text-sm font-medium">Renewal certificate not generated</p>
    <p className="mt-1 text-xs text-muted-foreground">Customer: Al Futtaim Trading</p>
    <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
      <CalendarDays className="size-3" /> Created May 12 · SLA 78% elapsed
    </p>
  </HoverCardContent>
</HoverCard>`,
  delayTuning: `// Two delay props — openDelay (ms to wait before opening) + closeDelay
// (ms to wait before closing after the pointer leaves). Both default ~700/300.
<HoverCard openDelay={150} closeDelay={150}>
  ...
</HoverCard>`,
  placements: `<HoverCardContent side="top" align="start">…</HoverCardContent>
<HoverCardContent side="right">…</HoverCardContent>
<HoverCardContent side="bottom" align="end">…</HoverCardContent>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "HoverCard.openDelay",
      type: "number",
      defaultValue: "700",
      description: "Milliseconds to wait after pointer-enter before opening. Lower it (~150–250) when the content is a quick reference — leave high if hover is incidental.",
    },
    {
      name: "HoverCard.closeDelay",
      type: "number",
      defaultValue: "300",
      description: "Milliseconds to wait after pointer-leave before closing. Bigger values let users move from trigger to content without it disappearing.",
    },
    {
      name: "HoverCard.open / onOpenChange",
      type: "boolean / (open: boolean) => void",
      description: "Controlled open state. Rarely needed — the default hover behavior is enough for most cases.",
    },
    {
      name: "HoverCardTrigger.asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Render the trigger as the child component (anchor, button, span). Standard Radix slot pattern.",
    },
    {
      name: "HoverCardContent.side",
      type: '"top" | "right" | "bottom" | "left"',
      defaultValue: '"bottom"',
      description: "Edge of the trigger the content sits on.",
    },
    {
      name: "HoverCardContent.align",
      type: '"start" | "center" | "end"',
      defaultValue: '"center"',
      description: "Alignment along the chosen side.",
    },
    {
      name: "HoverCardContent.sideOffset",
      type: "number",
      defaultValue: "4",
      description: "Gap (px) between the trigger and the content.",
    },
  ]
}

/* ── Page ── */

export default function HoverCardPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.hoverCard.title")}
      description={t("docs.hoverCard.description")}
      category={t("docs.hoverCard.category")}
    >
      <Section title={t("docs.hoverCard.preview.title")} description={t("docs.hoverCard.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="flex items-center gap-2 text-sm">
            Mentioned by{" "}
            <HoverCard>
              <HoverCardTrigger asChild>
                <button type="button" className="text-primary underline-offset-2 hover:underline">
                  @amal-hassan
                </button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex gap-3">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-primary-300/20 dark:text-primary-200">
                      AH
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold">Amal Hassan</p>
                    <p className="text-xs text-muted-foreground">Tier 2 · Trade licensing</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>{" "}
            in this comment.
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.hoverCard.installation.title")} description={t("docs.hoverCard.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.hoverCard.installation.filename")} />
      </Section>

      <Section title={t("docs.hoverCard.usage.title")} description={t("docs.hoverCard.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.hoverCard.examples.title")} description={t("docs.hoverCard.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.hoverCard.examples.basic.label")}
            description={t("docs.hoverCard.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-help underline underline-offset-2">@amal-hassan</span>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">Hover content goes here.</p>
              </HoverCardContent>
            </HoverCard>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.hoverCard.examples.userPreview.label")}
            description={t("docs.hoverCard.examples.userPreview.description")}
            code={EXAMPLE_SNIPPETS.userPreview}
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                <button type="button" className="inline-flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-primary-300/20 dark:text-primary-200">
                      AH
                    </AvatarFallback>
                  </Avatar>
                  <span className="underline-offset-2 hover:underline">Amal Hassan</span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex gap-3">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-primary-300/20 dark:text-primary-200">
                      AH
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold">Amal Hassan</p>
                    <p className="text-xs text-muted-foreground">Tier 2 · Trade licensing</p>
                    <div className="mt-2 grid gap-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="size-3" /> amal@portal.gov
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3" /> Dubai
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.hoverCard.examples.ticketPreview.label")}
            description={t("docs.hoverCard.examples.ticketPreview.description")}
            code={EXAMPLE_SNIPPETS.ticketPreview}
            className="lg:col-span-2"
          >
            <p className="text-sm">
              Linked from another ticket:{" "}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a href="#ticket" className="font-mono text-primary underline-offset-2 hover:underline">
                    REQ-2025-0142
                  </a>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex items-center gap-2">
                    <Ticket className="size-4 text-muted-foreground" />
                    <span className="font-mono text-xs">REQ-2025-0142</span>
                    <Badge variant="info" className="ms-auto">Open</Badge>
                  </div>
                  <p className="mt-2 text-sm font-medium">Renewal certificate not generated</p>
                  <p className="mt-1 text-xs text-muted-foreground">Customer: Al Futtaim Trading</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="size-3" /> Created May 12 · SLA 78% elapsed
                  </p>
                </HoverCardContent>
              </HoverCard>
              .
            </p>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.hoverCard.examples.delayTuning.label")}
            description={t("docs.hoverCard.examples.delayTuning.description")}
            code={EXAMPLE_SNIPPETS.delayTuning}
          >
            <div className="flex items-center gap-4 text-sm">
              <HoverCard openDelay={150} closeDelay={150}>
                <HoverCardTrigger asChild>
                  <span className="cursor-help underline underline-offset-2">Fast</span>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p className="text-sm">openDelay=150 closeDelay=150 — opens almost immediately.</p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard openDelay={700} closeDelay={300}>
                <HoverCardTrigger asChild>
                  <span className="cursor-help underline underline-offset-2">Default</span>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p className="text-sm">700ms open, 300ms close — Radix defaults.</p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard openDelay={1200} closeDelay={500}>
                <HoverCardTrigger asChild>
                  <span className="cursor-help underline underline-offset-2">Slow</span>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p className="text-sm">openDelay=1200 — only opens after a deliberate pause.</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.hoverCard.examples.placements.label")}
            description={t("docs.hoverCard.examples.placements.description")}
            code={EXAMPLE_SNIPPETS.placements}
          >
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <HoverCard key={side}>
                  <HoverCardTrigger asChild>
                    <span className="cursor-help underline underline-offset-2 capitalize">{side}</span>
                  </HoverCardTrigger>
                  <HoverCardContent side={side} className="w-auto px-3 py-2">
                    <span className="text-xs">side={side}</span>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.hoverCard.props.title")} description={t("docs.hoverCard.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.hoverCard.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.hoverCard.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.hoverCard.accessibility.items.touch")}</li>
          <li>{t("docs.hoverCard.accessibility.items.essential")}</li>
          <li>{t("docs.hoverCard.accessibility.items.keyboard")}</li>
          <li>{t("docs.hoverCard.accessibility.items.delay")}</li>
          <li>{t("docs.hoverCard.accessibility.items.alternative")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.hoverCard.related.title")}
        items={[
          { label: "Popover", href: "/ui/popover" },
          { label: "Tooltip", href: "/ui/tooltip" },
          { label: "Avatar", href: "/ui/avatar" },
        ]}
      />
    </ComponentPage>
  )
}
