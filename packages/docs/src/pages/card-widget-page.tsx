import { ArrowUpRight, BarChart2, MoreHorizontal, TrendingUp, Users } from "lucide-react"

import {
  CardWidget,
  CardWidgetAction,
  CardWidgetContent,
  CardWidgetFooter,
  CardWidgetHeader,
  CardWidgetIcon,
  CardWidgetTitle,
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
  CardWidget,
  CardWidgetHeader,
  CardWidgetIcon,
  CardWidgetTitle,
  CardWidgetAction,
  CardWidgetContent,
  CardWidgetFooter,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import {
  CardWidget,
  CardWidgetHeader,
  CardWidgetIcon,
  CardWidgetTitle,
  CardWidgetContent,
} from "@dpds-gov/design-system"
import { TrendingUp } from "lucide-react"

export function RequestTrendsWidget() {
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetIcon>
          <TrendingUp className="size-7 text-primary-600" />
        </CardWidgetIcon>
        <CardWidgetTitle>Request Trends</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>
        {/* chart, table, or any visualization */}
      </CardWidgetContent>
    </CardWidget>
  )
}`

const PREVIEW_SNIPPET = `<CardWidget>
  <CardWidgetHeader>
    <CardWidgetIcon>
      <TrendingUp className="size-7 text-primary-600" />
    </CardWidgetIcon>
    <CardWidgetTitle>Request Trends</CardWidgetTitle>
    <CardWidgetAction>
      <Button variant="text" size="icon-sm" aria-label="More">
        <MoreHorizontal className="size-4" />
      </Button>
    </CardWidgetAction>
  </CardWidgetHeader>
  <CardWidgetContent>
    <p className="text-2xl font-mono font-bold text-sub-title">1,284</p>
    <p className="text-xs text-muted-foreground mt-1">vs 1,142 last week</p>
    <Badge size="sm" variant="success" className="mt-3">
      <ArrowUpRight className="size-3" /> +12.4%
    </Badge>
  </CardWidgetContent>
  <CardWidgetFooter>
    <Button variant="text" size="sm">View report</Button>
  </CardWidgetFooter>
</CardWidget>`

const EXAMPLE_SNIPPETS = {
  basic: `<CardWidget>
  <CardWidgetHeader>
    <CardWidgetIcon>
      <BarChart2 className="size-6 text-primary-600" />
    </CardWidgetIcon>
    <CardWidgetTitle>Monthly stats</CardWidgetTitle>
  </CardWidgetHeader>
  <CardWidgetContent>
    {/* chart or KPI */}
  </CardWidgetContent>
</CardWidget>`,
  small: `// size="sm" tightens spacing — useful in dense dashboard grids.
<CardWidget size="sm">
  <CardWidgetHeader>
    <CardWidgetIcon>
      <Users className="size-5 text-primary-600" />
    </CardWidgetIcon>
    <CardWidgetTitle>Active officers</CardWidgetTitle>
  </CardWidgetHeader>
  <CardWidgetContent>
    <p className="font-mono font-bold text-xl">42</p>
  </CardWidgetContent>
</CardWidget>`,
  withAction: `// Action slot in the header — buttons, dropdowns, or badges.
<CardWidget>
  <CardWidgetHeader>
    <CardWidgetIcon><TrendingUp className="size-6 text-primary-600" /></CardWidgetIcon>
    <CardWidgetTitle>Compliance rate</CardWidgetTitle>
    <CardWidgetAction>
      <Badge size="sm" variant="success">+3.2%</Badge>
      <Button variant="text" size="icon-sm" aria-label="More">
        <MoreHorizontal className="size-4" />
      </Button>
    </CardWidgetAction>
  </CardWidgetHeader>
  <CardWidgetContent>{/* gauge */}</CardWidgetContent>
</CardWidget>`,
  withFooter: `<CardWidget>
  <CardWidgetHeader>
    <CardWidgetIcon><BarChart2 className="size-6 text-primary-600" /></CardWidgetIcon>
    <CardWidgetTitle>Service breakdown</CardWidgetTitle>
  </CardWidgetHeader>
  <CardWidgetContent>{/* bar chart */}</CardWidgetContent>
  <CardWidgetFooter>
    <p className="text-xs text-muted-foreground">Updated 2m ago</p>
    <Button variant="text" size="sm" className="ms-auto">Export</Button>
  </CardWidgetFooter>
</CardWidget>`,
}

/* ── Props tables ── */

function getRootPropRows(): PropRow[] {
  return [
    {
      name: "size",
      type: '"default" | "sm"',
      defaultValue: '"default"',
      description: "Padding density. sm tightens header/content/footer padding — use in dense dashboard grids.",
    },
    {
      name: "wrapperClassName",
      type: "string",
      description: "Extra classes on the outer relative wrapper (controls outer sizing / glow positioning).",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes on the inner card surface (background, border, glassmorphism layer).",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Compose with CardWidgetHeader, CardWidgetContent, CardWidgetFooter (in that order).",
    },
  ]
}

function getHeaderPropRows(): PropRow[] {
  return [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Typically CardWidgetIcon + CardWidgetTitle + optional CardWidgetAction.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes on the header row.",
    },
  ]
}

/* ── Page ── */

export default function CardWidgetPage() {
  return (
    <ComponentPage
      title="Card widget"
      description="DPDS dashboard widget primitive — glassmorphism surface with animated border gradient, radial glow accent, and icon + title header. Used as the wrapper for every dashboard chart, KPI tile, and table card."
      category="Data display"
    >
      <Section title="Preview" description="KPI widget with header icon, action menu, content, and footer.">
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="w-full max-w-sm">
            <CardWidget>
              <CardWidgetHeader>
                <CardWidgetIcon>
                  <TrendingUp className="size-7 text-primary-600" />
                </CardWidgetIcon>
                <CardWidgetTitle>Request Trends</CardWidgetTitle>
                <CardWidgetAction>
                  <Button variant="text" size="icon-sm" aria-label="More">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </CardWidgetAction>
              </CardWidgetHeader>
              <CardWidgetContent>
                <p className="text-2xl font-mono font-bold text-sub-title">1,284</p>
                <p className="text-xs text-muted-foreground mt-1">vs 1,142 last week</p>
                <Badge size="sm" variant="success" className="mt-3">
                  <ArrowUpRight className="size-3" /> +12.4%
                </Badge>
              </CardWidgetContent>
              <CardWidgetFooter>
                <Button variant="text" size="sm">View report</Button>
              </CardWidgetFooter>
            </CardWidget>
          </div>
        </PreviewBlock>
      </Section>

      <Section title="Installation" description="Import the composition primitives.">
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename="card-widget-import.ts" />
      </Section>

      <Section title="Usage" description="Wrap any dashboard visualization in a CardWidget.">
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title="Examples" description="Common compositions.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PreviewBlock
            title="Basic widget"
            description="Icon + title header, content body. Most dashboard cards start here."
            code={EXAMPLE_SNIPPETS.basic}
          >
            <div className="w-full">
              <CardWidget>
                <CardWidgetHeader>
                  <CardWidgetIcon>
                    <BarChart2 className="size-6 text-primary-600" />
                  </CardWidgetIcon>
                  <CardWidgetTitle>Monthly stats</CardWidgetTitle>
                </CardWidgetHeader>
                <CardWidgetContent>
                  <p className="font-mono font-bold text-3xl text-sub-title">1,284</p>
                  <p className="text-xs text-muted-foreground mt-1">requests processed this month</p>
                </CardWidgetContent>
              </CardWidget>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title='size="sm"'
            description="Tightens header / content / footer padding — for compact KPI grids."
            code={EXAMPLE_SNIPPETS.small}
          >
            <div className="w-full">
              <CardWidget size="sm">
                <CardWidgetHeader>
                  <CardWidgetIcon>
                    <Users className="size-5 text-primary-600" />
                  </CardWidgetIcon>
                  <CardWidgetTitle>Active officers</CardWidgetTitle>
                </CardWidgetHeader>
                <CardWidgetContent>
                  <p className="font-mono font-bold text-xl">42</p>
                  <p className="text-[11px] text-muted-foreground">8 on patrol</p>
                </CardWidgetContent>
              </CardWidget>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title="With header action"
            description="CardWidgetAction renders flush-end inside the header — for badges, menus, or quick actions."
            code={EXAMPLE_SNIPPETS.withAction}
          >
            <div className="w-full">
              <CardWidget>
                <CardWidgetHeader>
                  <CardWidgetIcon>
                    <TrendingUp className="size-6 text-primary-600" />
                  </CardWidgetIcon>
                  <CardWidgetTitle>Compliance rate</CardWidgetTitle>
                  <CardWidgetAction>
                    <Badge size="sm" variant="success">+3.2%</Badge>
                    <Button variant="text" size="icon-sm" aria-label="More">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </CardWidgetAction>
                </CardWidgetHeader>
                <CardWidgetContent>
                  <p className="font-mono font-bold text-3xl text-sub-title">87%</p>
                  <p className="text-xs text-muted-foreground mt-1">orders completed within SLA</p>
                </CardWidgetContent>
              </CardWidget>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title="With footer"
            description="Footer ships with a top border + muted background. Use for metadata and contextual actions."
            code={EXAMPLE_SNIPPETS.withFooter}
          >
            <div className="w-full">
              <CardWidget>
                <CardWidgetHeader>
                  <CardWidgetIcon>
                    <BarChart2 className="size-6 text-primary-600" />
                  </CardWidgetIcon>
                  <CardWidgetTitle>Service breakdown</CardWidgetTitle>
                </CardWidgetHeader>
                <CardWidgetContent>
                  <p className="font-mono font-bold text-3xl text-sub-title">23</p>
                  <p className="text-xs text-muted-foreground mt-1">active service types</p>
                </CardWidgetContent>
                <CardWidgetFooter>
                  <p className="text-xs text-muted-foreground">Updated 2m ago</p>
                  <Button variant="text" size="sm" className="ms-auto">Export</Button>
                </CardWidgetFooter>
              </CardWidget>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title="Props">
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm font-medium">CardWidget (Root)</p>
            <PropsTable rows={getRootPropRows()} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">CardWidgetHeader</p>
            <PropsTable rows={getHeaderPropRows()} />
          </div>
        </div>
      </Section>

      <Section title="Accessibility">
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          CardWidget is a static visual container — no interactive state, no ARIA role. Interactive content inside (buttons, menus, charts) carries its own a11y semantics.
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>The animated gradient border + radial glow are decorative — never relied on for status communication.</li>
          <li>Header icon is decorative by default. If it carries meaning, wrap content with `aria-label` on the parent slot.</li>
          <li>CardWidgetTitle uses `font-mono font-bold` per DPDS heading convention — ensure visual hierarchy is preserved.</li>
        </ul>
      </Section>

      <UsesTokens foundations={["spacing", "radius", "colors", "elevation"]} />

      <RelatedLinks
        title="Related"
        items={[
          { label: "Card", href: "/ui/card" },
          { label: "Stat tile", href: "/ui/stat" },
          { label: "Empty state", href: "/ui/empty-state" },
        ]}
      />
    </ComponentPage>
  )
}
