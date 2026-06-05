import { useTranslation } from "react-i18next"

import { Skeleton } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Skeleton } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Skeleton } from "@dpds-gov/design-system"

export function CustomerCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  )
}`

const PREVIEW_SNIPPET = `<div className="grid gap-2">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-2/3" />
  <Skeleton className="h-4 w-1/2" />
</div>`

const EXAMPLE_SNIPPETS = {
  textLine: `<Skeleton className="h-4 w-48" />`,
  paragraph: `<div className="grid gap-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-11/12" />
  <Skeleton className="h-4 w-3/4" />
</div>`,
  avatar: `<Skeleton className="size-10 rounded-full" />`,
  listItem: `<div className="flex items-center gap-3 p-3">
  <Skeleton className="size-10 rounded-full" />
  <div className="grid flex-1 gap-2">
    <Skeleton className="h-4 w-40" />
    <Skeleton className="h-3 w-24" />
  </div>
  <Skeleton className="h-6 w-12 rounded-full" />
</div>`,
  card: `<div className="rounded-xl border border-border bg-card p-5 max-w-md">
  <div className="flex items-center gap-3">
    <Skeleton className="size-10 rounded-full" />
    <div className="grid flex-1 gap-2">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-24" />
    </div>
  </div>
  <div className="mt-4 grid gap-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-11/12" />
    <Skeleton className="h-4 w-3/4" />
  </div>
  <div className="mt-5 flex gap-2">
    <Skeleton className="h-9 w-24 rounded-md" />
    <Skeleton className="h-9 w-20 rounded-md" />
  </div>
</div>`,
  tableRow: `<div className="overflow-hidden rounded-xl border border-border">
  {Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="grid grid-cols-[1fr_120px_100px_80px] items-center gap-4 border-b border-border last:border-0 px-4 py-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-4 w-12" />
    </div>
  ))}
</div>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "className",
      type: "string",
      description: "Size, shape, and corner radius of the placeholder. Defaults to a small block — pass h-*, w-*, rounded-* utilities to shape it.",
    },
    {
      name: "...props",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All standard div attributes. Use aria-hidden=\"true\" if the skeleton is paired with a live region that announces the loading state.",
    },
  ]
}

/* ── Page ── */

export default function SkeletonPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.skeleton.title")}
      description={t("docs.skeleton.description")}
      category={t("docs.skeleton.category")}
    >
      <Section title={t("docs.skeleton.preview.title")} description={t("docs.skeleton.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="grid w-full max-w-md gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.skeleton.installation.title")} description={t("docs.skeleton.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.skeleton.installation.filename")} />
      </Section>

      <Section title={t("docs.skeleton.usage.title")} description={t("docs.skeleton.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.skeleton.examples.title")} description={t("docs.skeleton.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.skeleton.examples.textLine.label")}
            description={t("docs.skeleton.examples.textLine.description")}
            code={EXAMPLE_SNIPPETS.textLine}
          >
            <Skeleton className="h-4 w-48" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.skeleton.examples.paragraph.label")}
            description={t("docs.skeleton.examples.paragraph.description")}
            code={EXAMPLE_SNIPPETS.paragraph}
          >
            <div className="grid w-full max-w-md gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.skeleton.examples.avatar.label")}
            description={t("docs.skeleton.examples.avatar.description")}
            code={EXAMPLE_SNIPPETS.avatar}
          >
            <Skeleton className="size-10 rounded-full" />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.skeleton.examples.listItem.label")}
            description={t("docs.skeleton.examples.listItem.description")}
            code={EXAMPLE_SNIPPETS.listItem}
          >
            <div className="flex w-full max-w-md items-center gap-3 rounded-md border border-border p-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="grid flex-1 gap-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.skeleton.examples.card.label")}
            description={t("docs.skeleton.examples.card.description")}
            code={EXAMPLE_SNIPPETS.card}
            className="lg:col-span-2"
          >
            <div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="grid flex-1 gap-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="mt-5 flex gap-2">
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="h-9 w-20 rounded-md" />
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.skeleton.examples.tableRow.label")}
            description={t("docs.skeleton.examples.tableRow.description")}
            code={EXAMPLE_SNIPPETS.tableRow}
            className="lg:col-span-2"
          >
            <div className="w-full overflow-hidden rounded-xl border border-border">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_120px_100px_80px] items-center gap-4 border-b border-border last:border-0 px-4 py-3"
                >
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.skeleton.props.title")} description={t("docs.skeleton.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.skeleton.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.skeleton.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.skeleton.accessibility.items.live")}</li>
          <li>{t("docs.skeleton.accessibility.items.shape")}</li>
          <li>{t("docs.skeleton.accessibility.items.motion")}</li>
          <li>{t("docs.skeleton.accessibility.items.duration")}</li>
          <li>{t("docs.skeleton.accessibility.items.empty")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "motion"]} />

      <RelatedLinks
        title={t("docs.skeleton.related.title")}
        items={[
          { label: "Empty State", href: "/ui/empty-state" },
          { label: "Card", href: "/cards" },
          { label: "List", href: "/ui/list" },
        ]}
      />
    </ComponentPage>
  )
}
