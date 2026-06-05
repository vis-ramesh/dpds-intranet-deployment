import { ArrowRight, Clock, MoreHorizontal, TrendingUp, User } from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
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
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Card, CardHeader, CardTitle, CardContent } from "@dpds-gov/design-system"

export function TicketCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>REQ-2025-0142</CardTitle>
        <CardDescription>Open a Bounced Cheque Report</CardDescription>
      </CardHeader>
      <CardContent>Submitted 28 Nov 2025 · Under review</CardContent>
    </Card>
  )
}`

const PREVIEW_SNIPPET = `<Card>
  <CardHeader>
    <CardTitle>REQ-2025-0142</CardTitle>
    <CardDescription>Bounced cheque report</CardDescription>
    <CardAction>
      <Button variant="text" size="icon-sm" aria-label="More options">
        <MoreHorizontal className="size-4" />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent className="flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <span className="size-9 rounded-full bg-primary-50 flex items-center justify-center">
        <User className="size-4 text-primary-700" />
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-medium">Mohammed Al Mansoori</span>
        <span className="text-xs text-muted-foreground">Emirates ID · 784-XXXX</span>
      </div>
    </div>
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Clock className="size-3.5" />
      Submitted 28 Nov 2025 · SLA 4h remaining
    </div>
    <Badge size="sm" variant="warning">Under review</Badge>
  </CardContent>
  <CardFooter className="justify-between">
    <Button variant="text" size="sm">
      View history
    </Button>
    <Button size="sm">
      Open ticket <ArrowRight className="size-4" />
    </Button>
  </CardFooter>
</Card>`

const EXAMPLE_SNIPPETS = {
  basic: `<Card>
  <CardHeader>
    <CardTitle>Request summary</CardTitle>
  </CardHeader>
  <CardContent>Reference number, submission date, and current status appear here.</CardContent>
</Card>`,
  headerFooter: `<Card>
  <CardHeader>
    <CardTitle>REQ-2025-0142</CardTitle>
    <CardDescription>Open a Bounced Cheque Report</CardDescription>
  </CardHeader>
  <CardContent>Submitted 28 Nov 2025. Under review by First Lieutenant Khalifa Mohammed.</CardContent>
  <CardFooter>
    <Button size="sm">Open ticket</Button>
  </CardFooter>
</Card>`,
  withAction: `<Card>
  <CardHeader>
    <CardTitle>Customer profile</CardTitle>
    <CardDescription>Mohammed Al Mansoori · Emirates ID 784-XXXX</CardDescription>
    <CardAction>
      <Button variant="text" size="icon-sm" aria-label="More">
        <MoreHorizontal className="size-4" />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>Active client · 4 open requests · last contact 2h ago</CardContent>
</Card>`,
  withAvatar: `<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-3">
      <span className="size-9 rounded-full bg-primary-50 flex items-center justify-center">
        <User className="size-4 text-primary-700" />
      </span>
      Sarah Chen
    </CardTitle>
    <CardDescription>Legal Counsel · Active for 4y 2mo</CardDescription>
  </CardHeader>
  <CardContent>Handles cheque dispute and corporate restructuring matters.</CardContent>
</Card>`,
  hoverable: `<Card className="cursor-pointer transition-shadow hover:shadow-lg">
  <CardHeader>
    <CardTitle>TKT-9483</CardTitle>
    <CardDescription>Click to view ticket</CardDescription>
  </CardHeader>
  <CardContent>SLA: 4h remaining · High priority</CardContent>
</Card>`,
  statTile: `// Stat / KPI tile pattern — for the canonical version see /ui/stat
<Card size="sm">
  <CardHeader>
    <CardDescription>Open tickets</CardDescription>
    <CardTitle className="text-3xl font-mono">142</CardTitle>
  </CardHeader>
  <CardContent className="text-xs text-primary-600 flex items-center gap-1">
    <TrendingUp className="size-3.5" /> +12% vs last week
  </CardContent>
</Card>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "size",
      type: '"default" | "sm"',
      defaultValue: '"default"',
      description: "Padding scale. sm tightens vertical padding for dense layouts (stat tiles, list rows).",
    },
    {
      name: "className",
      type: "string",
      description: "Extends the card styles. Common patterns: cursor-pointer + hover:shadow-lg for interactive cards.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Compose with CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter.",
    },
    {
      name: "...props",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All standard div attributes (id, onClick, role, data-*, etc.).",
    },
  ]
}

/* ── Page ── */

export default function CardPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.card.title")}
      description={t("docs.card.description")}
      category={t("docs.card.category")}
    >
      <Section title={t("docs.card.preview.title")} description={t("docs.card.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle>REQ-2025-0142</CardTitle>
              <CardDescription>Bounced cheque report</CardDescription>
              <CardAction>
                <Button variant="text" size="icon-sm" aria-label="More options">
                  <MoreHorizontal className="size-4" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-full bg-primary-50 flex items-center justify-center">
                  <User className="size-4 text-primary-700" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Mohammed Al Mansoori</span>
                  <span className="text-xs text-muted-foreground">Emirates ID · 784-XXXX</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                Submitted 28 Nov 2025 · SLA 4h remaining
              </div>
              <Badge size="sm" variant="warning">Under review</Badge>
            </CardContent>
            <CardFooter className="justify-between">
              <Button size="sm">
                Open ticket <ArrowRight className="size-4" />
              </Button>
            </CardFooter>
          </Card>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.card.installation.title")} description={t("docs.card.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.card.installation.filename")} />
      </Section>

      <Section title={t("docs.card.usage.title")} description={t("docs.card.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.card.examples.title")} description={t("docs.card.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.card.examples.basic.label")}
            description={t("docs.card.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Request summary</CardTitle>
              </CardHeader>
              <CardContent>Reference number, submission date, and current status appear here.</CardContent>
            </Card>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.card.examples.headerFooter.label")}
            description={t("docs.card.examples.headerFooter.description")}
            code={EXAMPLE_SNIPPETS.headerFooter}
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>REQ-2025-0142</CardTitle>
                <CardDescription>Open a Bounced Cheque Report</CardDescription>
              </CardHeader>
              <CardContent>Submitted 28 Nov 2025. Under review by First Lieutenant Khalifa Mohammed.</CardContent>
              <CardFooter>
                <Button size="sm">Open ticket <ArrowRight className="size-3.5" /></Button>
              </CardFooter>
            </Card>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.card.examples.withAction.label")}
            description={t("docs.card.examples.withAction.description")}
            code={EXAMPLE_SNIPPETS.withAction}
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Customer profile</CardTitle>
                <CardDescription>Mohammed Al Mansoori · Emirates ID 784-XXXX</CardDescription>
                <CardAction>
                  <Button variant="text" size="icon-sm" aria-label="More">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>Active client · 4 open requests · last contact 2h ago</CardContent>
            </Card>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.card.examples.withAvatar.label")}
            description={t("docs.card.examples.withAvatar.description")}
            code={EXAMPLE_SNIPPETS.withAvatar}
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="size-9 rounded-full bg-primary-50 flex items-center justify-center">
                    <User className="size-4 text-primary-700" />
                  </span>
                  Sarah Chen
                </CardTitle>
                <CardDescription>Legal Counsel · Active for 4y 2mo</CardDescription>
              </CardHeader>
              <CardContent>Handles cheque dispute and corporate restructuring matters.</CardContent>
            </Card>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.card.examples.hoverable.label")}
            description={t("docs.card.examples.hoverable.description")}
            code={EXAMPLE_SNIPPETS.hoverable}
          >
            <Card className="w-full max-w-sm cursor-pointer transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>TKT-9483</CardTitle>
                <CardDescription>Click to view ticket</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-2 text-sm">
                <Badge variant="warning">High</Badge>
                <span className="text-muted-foreground inline-flex items-center gap-1">
                  <Clock className="size-3.5" /> SLA 4h remaining
                </span>
              </CardContent>
            </Card>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.card.examples.statTile.label")}
            description={t("docs.card.examples.statTile.description")}
            code={EXAMPLE_SNIPPETS.statTile}
          >
            <Card className="w-full max-w-xs">
              <CardHeader>
                <CardDescription>Open tickets</CardDescription>
                <CardTitle className="text-3xl font-mono">142</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-primary-600 flex items-center gap-1">
                <TrendingUp className="size-3.5" /> +12% vs last week
              </CardContent>
            </Card>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.card.props.title")} description={t("docs.card.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.card.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.card.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.card.accessibility.items.heading")}</li>
          <li>{t("docs.card.accessibility.items.interactive")}</li>
          <li>{t("docs.card.accessibility.items.contrast")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "elevation", "typography"]} />

      <RelatedLinks
        title={t("docs.card.related.title")}
        items={[
          { label: "Stat Tile", href: "/ui/stat" },
          { label: "List", href: "/ui/list" },
          { label: "Badge", href: "/ui/badges" },
        ]}
      />
    </ComponentPage>
  )
}
