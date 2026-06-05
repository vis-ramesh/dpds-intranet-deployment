import { Copy, Info, Save, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@dpds-gov/design-system"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
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

/* ── Snippets ── */

const INSTALL_SNIPPET = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { Copy } from "lucide-react"

export function CopyButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="text" size="icon-sm" aria-label="Copy reference">
            <Copy className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy reference number</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`

const PREVIEW_SNIPPET = `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="gray">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Tooltip content</TooltipContent>
  </Tooltip>
</TooltipProvider>`

const EXAMPLE_SNIPPETS = {
  placement: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outlineGray">Top</Button>
  </TooltipTrigger>
  <TooltipContent side="top">SLA breach at 4:00 PM</TooltipContent>
</Tooltip>`,
  iconButton: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="text" size="icon-sm" aria-label="Copy reference">
      <Copy className="size-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Copy reference number</TooltipContent>
</Tooltip>`,
  rich: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="text" size="icon-sm" aria-label="SLA info">
      <Info className="size-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <div className="text-sm font-medium">SLA status</div>
    <div className="text-xs opacity-80">4h 32m until breach</div>
  </TooltipContent>
</Tooltip>`,
  delay: `// Provider-level delay (ms before tooltip appears).
<TooltipProvider delayDuration={150}>
  <Tooltip>
    <TooltipTrigger asChild><Button>Quick</Button></TooltipTrigger>
    <TooltipContent>Appears after 150ms</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "TooltipProvider.delayDuration",
      type: "number",
      defaultValue: "700",
      description: "Milliseconds the user must hover before the tooltip opens. Lower it (150–300) for icon-only buttons where the label is essential.",
    },
    {
      name: "TooltipProvider.skipDelayDuration",
      type: "number",
      defaultValue: "300",
      description: "If the user moves between triggers within this window, the next tooltip skips its delay.",
    },
    {
      name: "Tooltip.open",
      type: "boolean",
      description: "Controlled open state. Pair with onOpenChange. Omit for default hover-driven behavior.",
    },
    {
      name: "Tooltip.defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Initial open state when uncontrolled.",
    },
    {
      name: "Tooltip.onOpenChange",
      type: "(open: boolean) => void",
      description: "Fires when the tooltip opens or closes.",
    },
    {
      name: "TooltipTrigger.asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Render as the single child (Radix Slot). Required when wrapping a Button to avoid nested buttons.",
    },
    {
      name: "TooltipContent.side",
      type: '"top" | "right" | "bottom" | "left"',
      defaultValue: '"top"',
      description: "Which side of the trigger the tooltip floats. Auto-flips if there isn't room.",
    },
    {
      name: "TooltipContent.sideOffset",
      type: "number",
      defaultValue: "4",
      description: "Pixels between trigger and tooltip. Larger values reduce visual collision with focus rings.",
    },
    {
      name: "TooltipContent.align",
      type: '"start" | "center" | "end"',
      defaultValue: '"center"',
      description: "Alignment along the chosen side.",
    },
  ]
}

/* ── Page ── */

export default function TooltipPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.tooltip.title")}
      description={t("docs.tooltip.description")}
      category={t("docs.tooltip.category")}
    >
      <Section title={t("docs.tooltip.preview.title")} description={t("docs.tooltip.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="gray">{t("docs.tooltip.preview.label")}</Button>
              </TooltipTrigger>
              <TooltipContent>{t("docs.tooltip.preview.content")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.tooltip.installation.title")} description={t("docs.tooltip.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.tooltip.installation.filename")} />
      </Section>

      <Section title={t("docs.tooltip.usage.title")} description={t("docs.tooltip.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.tooltip.examples.title")} description={t("docs.tooltip.examples.description")}>
        <TooltipProvider>
          <div className="grid grid-cols-2 gap-4">
            <PreviewBlock
              title={t("docs.tooltip.examples.placement.label")}
              description={t("docs.tooltip.examples.placement.description")}
              code={EXAMPLE_SNIPPETS.placement}
            >
              <div className="flex flex-wrap gap-3">
                <Tooltip>
                  <TooltipTrigger asChild><Button variant="outlineGray">Top</Button></TooltipTrigger>
                  <TooltipContent side="top">SLA breach at 4:00 PM</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild><Button variant="outlineGray">Right</Button></TooltipTrigger>
                  <TooltipContent side="right">Reference: REQ-2025-0142</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild><Button variant="outlineGray">Bottom</Button></TooltipTrigger>
                  <TooltipContent side="bottom">Assigned to Khalifa M.</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild><Button variant="outlineGray">Left</Button></TooltipTrigger>
                  <TooltipContent side="left">Created 28 Nov 2025</TooltipContent>
                </Tooltip>
              </div>
            </PreviewBlock>

            <PreviewBlock
              title={t("docs.tooltip.examples.iconButton.label")}
              description={t("docs.tooltip.examples.iconButton.description")}
              code={EXAMPLE_SNIPPETS.iconButton}
            >
              <div className="flex flex-wrap gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="text" size="icon-sm" aria-label="Copy reference">
                      <Copy className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy reference number</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="text" size="icon-sm" aria-label="Save draft">
                      <Save className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Save draft (⌘S)</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="text" size="icon-sm" aria-label="Delete ticket">
                      <Trash2 className="size-4 text-error-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete ticket</TooltipContent>
                </Tooltip>
              </div>
            </PreviewBlock>

            <PreviewBlock
              title={t("docs.tooltip.examples.rich.label")}
              description={t("docs.tooltip.examples.rich.description")}
              code={EXAMPLE_SNIPPETS.rich}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="text" size="icon-sm" aria-label="SLA info">
                    <Info className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm font-medium">SLA status</div>
                  <div className="text-xs opacity-80 mt-0.5">4h 32m until breach</div>
                </TooltipContent>
              </Tooltip>
            </PreviewBlock>

            <PreviewBlock
              title={t("docs.tooltip.examples.delay.label")}
              description={t("docs.tooltip.examples.delay.description")}
              code={EXAMPLE_SNIPPETS.delay}
            >
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild><Button>Quick</Button></TooltipTrigger>
                  <TooltipContent>Appears after 150ms</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </PreviewBlock>
          </div>
        </TooltipProvider>
      </Section>

      <Section title={t("docs.tooltip.props.title")} description={t("docs.tooltip.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.tooltip.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.tooltip.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.tooltip.accessibility.items.touch")}</li>
          <li>{t("docs.tooltip.accessibility.items.essential")}</li>
          <li>{t("docs.tooltip.accessibility.items.label")}</li>
          <li>{t("docs.tooltip.accessibility.items.interactive")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.tooltip.related.title")}
        items={[
          { label: "Popover", href: "/ui/popover" },
          { label: "Hover Card", href: "/ui/hover-card" },
          { label: "Dropdown", href: "/ui/dropdown-menu" },
        ]}
      />
    </ComponentPage>
  )
}
