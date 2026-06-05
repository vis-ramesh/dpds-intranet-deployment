import { useTranslation } from "react-i18next"
import { Ticket, Clock, Smile, UserPlus } from "lucide-react"

import { StatTile } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { StatTile } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { StatTile } from "@dpds-gov/design-system"
import { Ticket } from "lucide-react"

export function OpenTicketsTile() {
  return (
    <StatTile
      label="Open tickets"
      value={247}
      delta={{ value: "+12%", direction: "up", label: "this week" }}
      icon={<Ticket />}
      sparkline={[180, 210, 195, 220, 205, 235, 247]}
    />
  )
}`

const PREVIEW_SNIPPET = `<StatTile
  label="Open tickets"
  value={247}
  delta={{ value: "+12%", direction: "up", label: "this week" }}
  icon={<Ticket />}
  sparkline={[180, 210, 195, 220, 205, 235, 247]}
/>`

const EXAMPLE_SNIPPETS = {
  basic: `<StatTile label="New signups today" value={18} />`,
  deltaUp: `<StatTile
  label="Open tickets"
  value={247}
  delta={{ value: "+12%", direction: "up", label: "this week" }}
/>`,
  deltaDown: `<StatTile
  label="Backlog over 7 days"
  value={42}
  delta={{ value: "-18%", direction: "down", label: "this week" }}
/>`,
  neutralDelta: `<StatTile
  label="CSAT score"
  value="4.6"
  delta={{ value: "0.0", direction: "neutral", label: "no change" }}
/>`,
  toneOverride: `// "down" is good for response time — force positive tone.
<StatTile
  label="Avg response time"
  value="2h 14m"
  delta={{ value: "-18%", direction: "down", label: "this week" }}
  deltaTone="positive"
/>`,
  withIcon: `<StatTile
  label="Customer satisfaction"
  value="4.6"
  delta={{ value: "+0.2", direction: "up", label: "vs last month" }}
  icon={<Smile />}
/>`,
  withSparkline: `<StatTile
  label="Open tickets"
  value={247}
  delta={{ value: "+12%", direction: "up" }}
  sparkline={[180, 210, 195, 220, 205, 235, 247]}
/>`,
  loading: `<StatTile label="" value="" loading />`,
  interactive: `<StatTile
  label="Open tickets"
  value={247}
  icon={<Ticket />}
  sparkline={[180, 210, 195, 220, 205, 235, 247]}
  onClick={() => navigate("/tickets")}
/>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "label",
      type: "string",
      required: true,
      description: "Short uppercase caption. Two or three words — \"Open tickets\", \"Avg response time\".",
    },
    {
      name: "value",
      type: "string | number",
      required: true,
      description: "The number on display. Strings let you pre-format units and durations (\"2h 14m\", \"AED 1,200\").",
    },
    {
      name: "delta",
      type: "{ value: string | number; direction: \"up\" | \"down\" | \"neutral\"; label?: string }",
      description: "Optional change indicator. value is the displayed delta (\"+12%\"); direction picks the arrow; label is an optional period (\"this week\").",
    },
    {
      name: "deltaTone",
      type: '"positive" | "negative" | "neutral"',
      description:
        "Overrides direction-based coloring. Default: up=positive (green), down=negative (red), neutral=gray. Pass deltaTone explicitly when \"down\" is a good thing — e.g. response time.",
    },
    {
      name: "icon",
      type: "ReactNode",
      description: "Optional Lucide icon shown top-right in a tinted square. Skip on dense dashboards; include when the metric needs identity at a glance.",
    },
    {
      name: "sparkline",
      type: "number[]",
      description:
        "Recent trend as a numeric array. Renders an 80×24 SVG with currentColor stroke + 12% fill. Skipped silently when length < 2.",
    },
    {
      name: "loading",
      type: "boolean",
      defaultValue: "false",
      description: "Replaces label / value / delta / sparkline with animated skeleton placeholders. Used while data is fetching.",
    },
    {
      name: "onClick",
      type: "() => void",
      description: "Makes the tile a clickable button. Adds hover bg and focus ring. Use for tiles that drill down into a detail view.",
    },
  ]
}

/* ── Demo data ── */

const SPARK_TICKETS = [180, 210, 195, 220, 205, 235, 247]
const SPARK_RESPONSE = [180, 165, 170, 155, 148, 140, 134]
const SPARK_CSAT = [4.3, 4.4, 4.4, 4.5, 4.5, 4.6, 4.6]

/* ── Page ── */

export default function StatTilePage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.statTile.title")}
      description={t("docs.statTile.description")}
      category={t("docs.statTile.category")}
    >
      <Section title={t("docs.statTile.preview.title")} description={t("docs.statTile.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="max-w-xs">
            <StatTile
              label="Open tickets"
              value={247}
              delta={{ value: "+12%", direction: "up", label: "this week" }}
              icon={<Ticket />}
              sparkline={SPARK_TICKETS}
            />
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.statTile.installation.title")} description={t("docs.statTile.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.statTile.installation.filename")} />
      </Section>

      <Section title={t("docs.statTile.usage.title")} description={t("docs.statTile.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.statTile.examples.title")} description={t("docs.statTile.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.statTile.examples.basic.label")}
            description={t("docs.statTile.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <StatTile label="New signups today" value={18} />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.statTile.examples.deltaUp.label")}
            description={t("docs.statTile.examples.deltaUp.description")}
            code={EXAMPLE_SNIPPETS.deltaUp}
          >
            <StatTile
              label="Open tickets"
              value={247}
              delta={{ value: "+12%", direction: "up", label: "this week" }}
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.statTile.examples.deltaDown.label")}
            description={t("docs.statTile.examples.deltaDown.description")}
            code={EXAMPLE_SNIPPETS.deltaDown}
          >
            <StatTile
              label="Backlog over 7 days"
              value={42}
              delta={{ value: "-18%", direction: "down", label: "this week" }}
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.statTile.examples.neutralDelta.label")}
            description={t("docs.statTile.examples.neutralDelta.description")}
            code={EXAMPLE_SNIPPETS.neutralDelta}
          >
            <StatTile
              label="CSAT score"
              value="4.6"
              delta={{ value: "0.0", direction: "neutral", label: "no change" }}
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.statTile.examples.toneOverride.label")}
            description={t("docs.statTile.examples.toneOverride.description")}
            code={EXAMPLE_SNIPPETS.toneOverride}
          >
            <StatTile
              label="Avg response time"
              value="2h 14m"
              delta={{ value: "-18%", direction: "down", label: "this week" }}
              deltaTone="positive"
              icon={<Clock />}
              sparkline={SPARK_RESPONSE}
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.statTile.examples.withIcon.label")}
            description={t("docs.statTile.examples.withIcon.description")}
            code={EXAMPLE_SNIPPETS.withIcon}
          >
            <StatTile
              label="Customer satisfaction"
              value="4.6"
              delta={{ value: "+0.2", direction: "up", label: "vs last month" }}
              icon={<Smile />}
              sparkline={SPARK_CSAT}
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.statTile.examples.withSparkline.label")}
            description={t("docs.statTile.examples.withSparkline.description")}
            code={EXAMPLE_SNIPPETS.withSparkline}
          >
            <StatTile
              label="Open tickets"
              value={247}
              delta={{ value: "+12%", direction: "up" }}
              sparkline={SPARK_TICKETS}
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.statTile.examples.loading.label")}
            description={t("docs.statTile.examples.loading.description")}
            code={EXAMPLE_SNIPPETS.loading}
          >
            <StatTile label="" value="" loading />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.statTile.examples.interactive.label")}
            description={t("docs.statTile.examples.interactive.description")}
            code={EXAMPLE_SNIPPETS.interactive}
          >
            <StatTile
              label="New signups today"
              value={18}
              icon={<UserPlus />}
              onClick={() => alert("Drilled into signups")}
              delta={{ value: "+4", direction: "up", label: "vs yesterday" }}
            />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.statTile.props.title")} description={t("docs.statTile.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.statTile.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.statTile.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.statTile.accessibility.items.button")}</li>
          <li>{t("docs.statTile.accessibility.items.colorMeaning")}</li>
          <li>{t("docs.statTile.accessibility.items.sparklineHidden")}</li>
          <li>{t("docs.statTile.accessibility.items.loading")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "iconography", "motion"]} />

      <RelatedLinks
        title={t("docs.statTile.related.title")}
        items={[
          { label: "Card", href: "/cards" },
          { label: "Badge", href: "/ui/badges" },
          { label: "Charts", href: "/charts" },
        ]}
      />
    </ComponentPage>
  )
}
