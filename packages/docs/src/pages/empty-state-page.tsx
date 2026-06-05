import { useTranslation } from "react-i18next"
import { UserPlus, RotateCw } from "lucide-react"

import { EmptyState } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { EmptyState } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { EmptyState } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"

export function CustomersEmpty({ onAdd }: { onAdd: () => void }) {
  return (
    <EmptyState
      variant="no-data"
      title="No customers yet"
      description="Add your first customer to start tracking their cases."
      action={<Button onClick={onAdd}>Add customer</Button>}
    />
  )
}`

const PREVIEW_SNIPPET = `<EmptyState
  variant="no-data"
  title="No customers yet"
  description="Add your first customer to start tracking their cases."
  action={<Button>Add customer</Button>}
/>`

const EXAMPLE_SNIPPETS = {
  noResults: `<EmptyState
  variant="no-results"
  title="No tickets match these filters"
  description="Try removing a filter or clearing them all."
  action={<Button variant="outlineGray">Clear filters</Button>}
/>`,
  noData: `<EmptyState
  variant="no-data"
  title="No customers yet"
  description="Add your first customer to start tracking their cases."
  action={<Button>Add customer</Button>}
/>`,
  error: `<EmptyState
  variant="error"
  title="Failed to load"
  description="Something went wrong fetching the data."
  action={<Button>Retry</Button>}
  secondaryAction={<Button variant="text">Report issue</Button>}
/>`,
  permission: `<EmptyState
  variant="permission"
  title="You don't have permission to view this case"
  description="Ask your team lead to grant access, or pick another case from your queue."
/>`,
  bothActions: `<EmptyState
  variant="no-data"
  title="No customers yet"
  description="Add manually, or import from a CSV."
  action={<Button>Add customer</Button>}
  secondaryAction={<Button variant="outlineGray">Import CSV</Button>}
/>`,
  customIcon: `import { UserPlus } from "lucide-react"

<EmptyState
  icon={<UserPlus />}
  title="Invite your team"
  description="Add teammates so they can pick up tickets from the same queue."
  action={<Button>Send invites</Button>}
/>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "variant",
      type: '"no-results" | "no-data" | "error" | "permission"',
      defaultValue: '"no-data"',
      description:
        "Selection model. Determines the default icon and tint when no icon prop is provided. no-results for filtered-out lists, no-data for empty datasets, error for failed loads, permission for access-denied.",
    },
    {
      name: "title",
      type: "string",
      required: true,
      description: "Heading. Keep it specific — \"No customers yet\" beats \"Nothing to show\".",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Body content. Supports rich elements (links, inline code, lists). Tell the user what to do next, not just that something's missing.",
    },
    {
      name: "action",
      type: "ReactNode",
      description: "Primary action — typically a Button. The single most useful thing the user can do from this state.",
    },
    {
      name: "secondaryAction",
      type: "ReactNode",
      description: "Optional secondary action. Renders to the right of the primary on desktop, below on mobile.",
    },
    {
      name: "icon",
      type: "ReactNode",
      description: "Override the variant's default icon — pass a Lucide glyph, an image, or your own illustration. Pass null to render no icon.",
    },
  ]
}

/* ── Page ── */

export default function EmptyStatePage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.emptyState.title")}
      description={t("docs.emptyState.description")}
      category={t("docs.emptyState.category")}
    >
      <Section title={t("docs.emptyState.preview.title")} description={t("docs.emptyState.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <EmptyState
            variant="no-data"
            title="No customers yet"
            description="Add your first customer to start tracking their cases."
            action={<Button>Add customer</Button>}
          />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.emptyState.installation.title")} description={t("docs.emptyState.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.emptyState.installation.filename")} />
      </Section>

      <Section title={t("docs.emptyState.usage.title")} description={t("docs.emptyState.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.emptyState.examples.title")} description={t("docs.emptyState.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.emptyState.examples.noResults.label")}
            description={t("docs.emptyState.examples.noResults.description")}
            code={EXAMPLE_SNIPPETS.noResults}
          >
            <EmptyState
              variant="no-results"
              title="No tickets match these filters"
              description="Try removing a filter or clearing them all."
              action={<Button variant="outlineGray">Clear filters</Button>}
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.emptyState.examples.noData.label")}
            description={t("docs.emptyState.examples.noData.description")}
            code={EXAMPLE_SNIPPETS.noData}
          >
            <EmptyState
              variant="no-data"
              title="No customers yet"
              description="Add your first customer to start tracking their cases."
              action={<Button>Add customer</Button>}
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.emptyState.examples.error.label")}
            description={t("docs.emptyState.examples.error.description")}
            code={EXAMPLE_SNIPPETS.error}
          >
            <EmptyState
              variant="error"
              title="Failed to load"
              description="Something went wrong fetching the data."
              action={
                <Button>
                  <RotateCw className="size-4" />
                  Retry
                </Button>
              }
              secondaryAction={<Button variant="text">Report issue</Button>}
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.emptyState.examples.permission.label")}
            description={t("docs.emptyState.examples.permission.description")}
            code={EXAMPLE_SNIPPETS.permission}
          >
            <EmptyState
              variant="permission"
              title="You don't have permission to view this case"
              description="Ask your team lead to grant access, or pick another case from your queue."
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.emptyState.examples.bothActions.label")}
            description={t("docs.emptyState.examples.bothActions.description")}
            code={EXAMPLE_SNIPPETS.bothActions}
          >
            <EmptyState
              variant="no-data"
              title="No customers yet"
              description="Add manually, or import from a CSV."
              action={<Button>Add customer</Button>}
              secondaryAction={<Button variant="outlineGray">Import CSV</Button>}
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.emptyState.examples.customIcon.label")}
            description={t("docs.emptyState.examples.customIcon.description")}
            code={EXAMPLE_SNIPPETS.customIcon}
          >
            <EmptyState
              icon={<UserPlus />}
              title="Invite your team"
              description="Add teammates so they can pick up tickets from the same queue."
              action={<Button>Send invites</Button>}
            />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.emptyState.props.title")} description={t("docs.emptyState.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.emptyState.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.emptyState.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.emptyState.accessibility.items.heading")}</li>
          <li>{t("docs.emptyState.accessibility.items.actionLabel")}</li>
          <li>{t("docs.emptyState.accessibility.items.iconHidden")}</li>
          <li>{t("docs.emptyState.accessibility.items.notHero")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "iconography"]} />

      <RelatedLinks
        title={t("docs.emptyState.related.title")}
        items={[
          { label: "Skeleton", href: "/ui/skeleton" },
          { label: "Banner", href: "/ui/banner" },
          { label: "Alert", href: "/ui/alert" },
          { label: "Iconography", href: "/foundations/iconography" },
        ]}
      />
    </ComponentPage>
  )
}
