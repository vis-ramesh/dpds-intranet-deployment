import { useTranslation } from "react-i18next"

import { AspectRatio } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { AspectRatio } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { AspectRatio } from "@dpds-gov/design-system"

export function CustomerPhoto({ src }: { src: string }) {
  return (
    <AspectRatio ratio={1}>
      <img src={src} alt="" className="size-full rounded-lg object-cover" />
    </AspectRatio>
  )
}`

const PREVIEW_SNIPPET = `<AspectRatio ratio={16 / 9}>
  <img src="/banner.jpg" alt="" className="size-full object-cover" />
</AspectRatio>`

const EXAMPLE_SNIPPETS = {
  widescreen: `<AspectRatio ratio={16 / 9}>
  <img src="/screenshot.jpg" alt="" className="size-full object-cover rounded-lg" />
</AspectRatio>`,
  classic: `<AspectRatio ratio={4 / 3}>{/* photo */}</AspectRatio>`,
  square: `<AspectRatio ratio={1}>{/* avatar / thumbnail */}</AspectRatio>`,
  portrait: `<AspectRatio ratio={3 / 4}>{/* portrait card */}</AspectRatio>`,
  customRatio: `// Any number works.
<AspectRatio ratio={21 / 9}>{/* ultrawide banner */}</AspectRatio>
<AspectRatio ratio={2 / 1}>{/* 2:1 hero */}</AspectRatio>`,
  attachmentGrid: `// Force consistent thumbnail proportions in an attachment grid.
<div className="grid grid-cols-3 gap-2">
  {attachments.map((a) => (
    <AspectRatio key={a.id} ratio={1}>
      <img src={a.thumb} alt={a.name} className="size-full rounded-md object-cover" />
    </AspectRatio>
  ))}
</div>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "ratio",
      type: "number",
      defaultValue: "1",
      description: "Width-to-height ratio expressed as a number. Common values: 16/9 = video, 4/3 = classic, 1 = square, 3/4 = portrait, 21/9 = ultrawide. The container expands to fit its parent's width.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Content to fit the ratio. Set the child to size-full so it stretches to the container.",
    },
    {
      name: "asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Render the ratio container as the child element instead of a default div (Radix Slot pattern).",
    },
  ]
}

/* ── Page ── */

function PlaceholderTile({ label }: { label: string }) {
  return (
    <div className="flex size-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 text-xs font-medium text-primary-700 dark:from-slate-300/15 dark:to-slate-300/5 dark:text-slate-200">
      {label}
    </div>
  )
}

export default function AspectRatioPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.aspectRatio.title")}
      description={t("docs.aspectRatio.description")}
      category={t("docs.aspectRatio.category")}
    >
      <Section title={t("docs.aspectRatio.preview.title")} description={t("docs.aspectRatio.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="w-full max-w-md">
            <AspectRatio ratio={16 / 9}>
              <PlaceholderTile label="16 : 9" />
            </AspectRatio>
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.aspectRatio.installation.title")} description={t("docs.aspectRatio.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.aspectRatio.installation.filename")} />
      </Section>

      <Section title={t("docs.aspectRatio.usage.title")} description={t("docs.aspectRatio.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.aspectRatio.examples.title")} description={t("docs.aspectRatio.examples.description")}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.aspectRatio.examples.widescreen.label")}
            description={t("docs.aspectRatio.examples.widescreen.description")}
            code={EXAMPLE_SNIPPETS.widescreen}
          >
            <div className="w-full max-w-md">
              <AspectRatio ratio={16 / 9}>
                <PlaceholderTile label="16 : 9" />
              </AspectRatio>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.aspectRatio.examples.classic.label")}
            description={t("docs.aspectRatio.examples.classic.description")}
            code={EXAMPLE_SNIPPETS.classic}
          >
            <div className="w-full max-w-sm">
              <AspectRatio ratio={4 / 3}>
                <PlaceholderTile label="4 : 3" />
              </AspectRatio>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.aspectRatio.examples.square.label")}
            description={t("docs.aspectRatio.examples.square.description")}
            code={EXAMPLE_SNIPPETS.square}
          >
            <div className="w-full max-w-[240px]">
              <AspectRatio ratio={1}>
                <PlaceholderTile label="1 : 1" />
              </AspectRatio>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.aspectRatio.examples.portrait.label")}
            description={t("docs.aspectRatio.examples.portrait.description")}
            code={EXAMPLE_SNIPPETS.portrait}
          >
            <div className="w-full max-w-[200px]">
              <AspectRatio ratio={3 / 4}>
                <PlaceholderTile label="3 : 4" />
              </AspectRatio>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.aspectRatio.examples.customRatio.label")}
            description={t("docs.aspectRatio.examples.customRatio.description")}
            code={EXAMPLE_SNIPPETS.customRatio}
            className="lg:col-span-2"
          >
            <div className="flex flex-col gap-3">
              <div className="w-full max-w-2xl">
                <AspectRatio ratio={21 / 9}>
                  <PlaceholderTile label="21 : 9 — ultrawide hero" />
                </AspectRatio>
              </div>
              <div className="w-full max-w-md">
                <AspectRatio ratio={2 / 1}>
                  <PlaceholderTile label="2 : 1" />
                </AspectRatio>
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.aspectRatio.examples.attachmentGrid.label")}
            description={t("docs.aspectRatio.examples.attachmentGrid.description")}
            code={EXAMPLE_SNIPPETS.attachmentGrid}
            className="lg:col-span-2"
          >
            <div className="grid w-full max-w-xl grid-cols-3 gap-2">
              {["IMG_001.jpg", "Quote.pdf", "Floor plan", "Invoice", "Site photo", "Contract"].map((label) => (
                <AspectRatio key={label} ratio={1}>
                  <PlaceholderTile label={label} />
                </AspectRatio>
              ))}
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.aspectRatio.props.title")} description={t("docs.aspectRatio.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.aspectRatio.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.aspectRatio.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.aspectRatio.accessibility.items.alt")}</li>
          <li>{t("docs.aspectRatio.accessibility.items.layout")}</li>
          <li>{t("docs.aspectRatio.accessibility.items.media")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["spacing", "radius"]} />

      <RelatedLinks
        title={t("docs.aspectRatio.related.title")}
        items={[
          { label: "Avatar", href: "/ui/avatar" },
          { label: "Container", href: "/ui/container" },
        ]}
      />
    </ComponentPage>
  )
}
