import { useTranslation } from "react-i18next"

import { Container } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Container } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Container } from "@dpds-gov/design-system"

export function TicketsList() {
  return (
    <Container as="main" size="xl">
      <h1>Tickets</h1>
      {/* page content */}
    </Container>
  )
}`

const PREVIEW_SNIPPET = `<Container>
  <p>Centered, max-width, with horizontal padding.</p>
</Container>`

const EXAMPLE_SNIPPETS = {
  default: `<Container>
  {/* default: max-w-screen-lg (1024px) */}
</Container>`,
  sizes: `<Container size="sm">…</Container>   {/* 640px  */}
<Container size="md">…</Container>   {/* 768px  */}
<Container size="lg">…</Container>   {/* 1024px (default) */}
<Container size="xl">…</Container>   {/* 1280px */}
<Container size="2xl">…</Container>  {/* 1536px */}
<Container size="full">…</Container> {/* no max */}`,
  customPadding: `// Override the default px-4 sm:px-6 lg:px-8 via className.
<Container className="px-0 sm:px-4">…</Container>`,
  asElement: `<Container as="section">…</Container>
<Container as="main">…</Container>
<Container as="article">…</Container>`,
  nested: `// Page-level Container + a narrower content Container for prose.
<Container as="main" size="2xl">
  <Header />
  <Container size="md">
    <article>{/* article body */}</article>
  </Container>
</Container>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "size",
      type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
      defaultValue: '"lg"',
      description: "Max-width breakpoint. Maps to Tailwind's max-w-screen-* (640 / 768 / 1024 / 1280 / 1536px). Use 'full' for layouts that should hug the viewport.",
    },
    {
      name: "as",
      type: "ElementType",
      defaultValue: '"div"',
      description: "Render as a different element — most often <main> for the page root, <section> for nested content blocks. The semantic landmark is up to you.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra Tailwind classes. Default is px-4 sm:px-6 lg:px-8 + mx-auto + the max-w-screen-* for the chosen size.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Page content. Container is presentational — no slots, no layout opinions beyond width + padding.",
    },
  ]
}

/* ── Page ── */

function PreviewSurface({ label }: { label: string }) {
  return (
    <div className="rounded-lg bg-primary/10 px-4 py-6 text-center text-xs font-mono text-primary-700 dark:bg-primary-300/15 dark:text-primary-200">
      {label}
    </div>
  )
}

export default function ContainerPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.container.title")}
      description={t("docs.container.description")}
      category={t("docs.container.category")}
    >
      <Section title={t("docs.container.preview.title")} description={t("docs.container.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="w-full">
            <Container>
              <PreviewSurface label="max-w-screen-lg (1024px) with px-4 sm:px-6 lg:px-8" />
            </Container>
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.container.installation.title")} description={t("docs.container.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.container.installation.filename")} />
      </Section>

      <Section title={t("docs.container.usage.title")} description={t("docs.container.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.container.examples.title")} description={t("docs.container.examples.description")}>
        <div className="grid grid-cols-1 gap-4">
          <PreviewBlock
            title={t("docs.container.examples.default.label")}
            description={t("docs.container.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <Container>
              <PreviewSurface label="Default — size='lg' (1024px max)" />
            </Container>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.container.examples.sizes.label")}
            description={t("docs.container.examples.sizes.description")}
            code={EXAMPLE_SNIPPETS.sizes}
          >
            <div className="flex w-full flex-col gap-2">
              {(["sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
                <Container key={s} size={s} className="!px-0">
                  <PreviewSurface label={`size="${s}"`} />
                </Container>
              ))}
              <Container size="full" className="!px-0">
                <PreviewSurface label='size="full" — no max-width' />
              </Container>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.container.examples.customPadding.label")}
            description={t("docs.container.examples.customPadding.description")}
            code={EXAMPLE_SNIPPETS.customPadding}
          >
            <Container size="md" className="px-0 sm:px-4">
              <PreviewSurface label="Custom padding (px-0 mobile, px-4 sm+)" />
            </Container>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.container.examples.asElement.label")}
            description={t("docs.container.examples.asElement.description")}
            code={EXAMPLE_SNIPPETS.asElement}
          >
            <div className="flex flex-col gap-2 text-xs">
              <Container as="section" size="md">
                <PreviewSurface label='as="section"' />
              </Container>
              <Container as="article" size="md">
                <PreviewSurface label='as="article"' />
              </Container>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.container.examples.nested.label")}
            description={t("docs.container.examples.nested.description")}
            code={EXAMPLE_SNIPPETS.nested}
          >
            <Container as="div" size="2xl" className="rounded-lg border border-dashed border-border bg-muted/30 py-4">
              <p className="mb-2 px-2 text-xs font-mono text-muted-foreground">Outer Container — size="2xl"</p>
              <Container size="md">
                <PreviewSurface label="Inner Container — size='md' (768px) for prose" />
              </Container>
            </Container>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.container.props.title")} description={t("docs.container.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.container.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.container.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.container.accessibility.items.semantics")}</li>
          <li>{t("docs.container.accessibility.items.lineLength")}</li>
          <li>{t("docs.container.accessibility.items.padding")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["spacing"]} />

      <RelatedLinks
        title={t("docs.container.related.title")}
        items={[
          { label: "Grid", href: "/ui/grid" },
          { label: "Stack", href: "/ui/stack" },
        ]}
      />
    </ComponentPage>
  )
}
