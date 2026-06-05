import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Spinner } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Spinner } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Spinner } from "@dpds-gov/design-system"

export function TicketsLoading() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner size="sm" tone="muted" />
      Loading tickets…
    </div>
  )
}`

const PREVIEW_SNIPPET = `<Spinner />`

const EXAMPLE_SNIPPETS = {
  default: `<Spinner />`,
  sizes: `<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`,
  tones: `<Spinner tone="default" />
<Spinner tone="muted" />
<Spinner tone="foreground" />
<Spinner tone="destructive" />`,
  inlineWithText: `<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <Spinner size="sm" tone="muted" />
  Loading tickets…
</div>`,
  centered: `// Center vertically + horizontally in a container while content loads.
<div className="flex h-40 items-center justify-center">
  <Spinner size="lg" />
</div>`,
  onButton: `// Replace the button label with a spinner while the action is in-flight.
const [saving, setSaving] = useState(false)

<Button disabled={saving} onClick={async () => {
  setSaving(true)
  await saveTicket()
  setSaving(false)
}}>
  {saving ? <Spinner size="sm" tone="onPrimary" /> : "Save changes"}
</Button>`,
  overlay: `// Full-page overlay during a critical async transition (auth, route guard).
{loading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <Spinner size="xl" label="Loading application" />
  </div>
)}`,
  accessibility: `// Set a label to expose the spinner to screen readers via role="status".
// Otherwise it's decorative (aria-hidden).
<Spinner size="sm" label="Saving ticket" />`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      defaultValue: '"md"',
      description: "Pixel size — xs=12, sm=16, md=20, lg=24, xl=32. Pair size with text size: sm for body, md for buttons, lg for inline section loaders, xl for full-page overlays.",
    },
    {
      name: "tone",
      type: '"default" | "muted" | "foreground" | "destructive" | "onPrimary"',
      defaultValue: '"default"',
      description: "Color via currentColor. \"onPrimary\" is for spinners sitting on a primary-tinted surface (Button label replacement).",
    },
    {
      name: "label",
      type: "string",
      description: "Optional accessible name. When set, the spinner becomes a role=\"status\" live region for assistive tech. Without it, the spinner is decorative (aria-hidden).",
    },
    {
      name: "className",
      type: "string",
      description: "Extra Tailwind classes. Merges with the size + tone classes via cn().",
    },
    {
      name: "...props",
      type: "SVGAttributes<SVGSVGElement>",
      description: "All standard SVG attributes (id, data-*, etc.). color is omitted — use the tone prop or text-* classes via className.",
    },
  ]
}

/* ── Live demo bits ── */

function OnButtonExample() {
  const [saving, setSaving] = useState(false)
  return (
    <Button
      size="md"
      disabled={saving}
      onClick={() => {
        setSaving(true)
        setTimeout(() => setSaving(false), 1500)
      }}
    >
      {saving ? <Spinner size="sm" tone="onPrimary" /> : "Save changes"}
    </Button>
  )
}

/* ── Page ── */

export default function SpinnerPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.spinner.title")}
      description={t("docs.spinner.description")}
      category={t("docs.spinner.category")}
    >
      <Section title={t("docs.spinner.preview.title")} description={t("docs.spinner.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Spinner />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.spinner.installation.title")} description={t("docs.spinner.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.spinner.installation.filename")} />
      </Section>

      <Section title={t("docs.spinner.usage.title")} description={t("docs.spinner.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.spinner.examples.title")} description={t("docs.spinner.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.spinner.examples.default.label")}
            description={t("docs.spinner.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <Spinner />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.spinner.examples.sizes.label")}
            description={t("docs.spinner.examples.sizes.description")}
            code={EXAMPLE_SNIPPETS.sizes}
          >
            <div className="flex items-end gap-4">
              <Spinner size="xs" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.spinner.examples.tones.label")}
            description={t("docs.spinner.examples.tones.description")}
            code={EXAMPLE_SNIPPETS.tones}
          >
            <div className="flex items-center gap-4">
              <Spinner tone="default" />
              <Spinner tone="muted" />
              <Spinner tone="foreground" />
              <Spinner tone="destructive" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.spinner.examples.inlineWithText.label")}
            description={t("docs.spinner.examples.inlineWithText.description")}
            code={EXAMPLE_SNIPPETS.inlineWithText}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner size="sm" tone="muted" />
              Loading tickets…
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.spinner.examples.centered.label")}
            description={t("docs.spinner.examples.centered.description")}
            code={EXAMPLE_SNIPPETS.centered}
          >
            <div className="flex h-40 w-full items-center justify-center rounded-lg border border-dashed border-border">
              <Spinner size="lg" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.spinner.examples.onButton.label")}
            description={t("docs.spinner.examples.onButton.description")}
            code={EXAMPLE_SNIPPETS.onButton}
          >
            <OnButtonExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.spinner.examples.overlay.label")}
            description={t("docs.spinner.examples.overlay.description")}
            code={EXAMPLE_SNIPPETS.overlay}
          >
            <div className="relative flex h-40 w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
              <span className="text-sm text-muted-foreground opacity-40">Page content</span>
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
                <Spinner size="xl" label="Loading application" />
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.spinner.examples.accessibility.label")}
            description={t("docs.spinner.examples.accessibility.description")}
            code={EXAMPLE_SNIPPETS.accessibility}
          >
            <div className="flex items-center gap-2 text-sm">
              <Spinner size="sm" label="Saving ticket" />
              <span className="font-mono text-xs text-muted-foreground">{`label="Saving ticket"`}</span>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.spinner.props.title")} description={t("docs.spinner.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.spinner.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.spinner.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.spinner.accessibility.items.decorative")}</li>
          <li>{t("docs.spinner.accessibility.items.label")}</li>
          <li>{t("docs.spinner.accessibility.items.motion")}</li>
          <li>{t("docs.spinner.accessibility.items.duration")}</li>
          <li>{t("docs.spinner.accessibility.items.skeleton")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "spacing", "motion"]} />

      <RelatedLinks
        title={t("docs.spinner.related.title")}
        items={[
          { label: "Progress", href: "/ui/progress-bar" },
          { label: "Skeleton", href: "/ui/skeleton" },
        ]}
      />
    </ComponentPage>
  )
}
