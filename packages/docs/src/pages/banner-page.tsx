import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Banner } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Banner } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Banner } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"

export function TrialNotice() {
  return (
    <Banner
      variant="warning"
      title="Your trial ends in 3 days"
      description="Upgrade to keep access to advanced reporting and case routing."
      action={<Button variant="filled" size="sm">Upgrade</Button>}
      dismissible
    />
  )
}`

const PREVIEW_SNIPPET = `<Banner
  variant="info"
  title="Scheduled maintenance"
  description="The service portal will be unavailable Sunday 2am–4am Gulf Time for system upgrades."
  action={<Button size="sm" variant="outlineGray">Details</Button>}
  dismissible
/>`

const EXAMPLE_SNIPPETS = {
  info: `<Banner variant="info" title="Heads up" description="New filter shortcuts shipped today." />`,
  success: `<Banner variant="success" title="Ticket synced" description="All updates pushed to the CRM." />`,
  warning: `<Banner variant="warning" title="Trial ends soon" description="3 days remaining on your plan." />`,
  error: `<Banner variant="error" title="Connection to CRM lost" description="We'll keep retrying — your work is saved locally." />`,
  withAction: `<Banner
  variant="warning"
  title="2 tickets need review"
  description="Manager approval is required before they can be closed."
  action={<Button variant="filled" size="sm">Review now</Button>}
/>`,
  dismissible: `const [open, setOpen] = useState(true)

{open && (
  <Banner
    variant="info"
    title="New keyboard shortcuts"
    description="Press ? anywhere to view the full list."
    dismissible
    onDismiss={() => setOpen(false)}
  />
)}`,
  descriptionOnly: `<Banner variant="info" description="The service portal will be unavailable Sunday 2am–4am Gulf Time." />`,
  persistent: `<Banner variant="error" title="Connection to CRM lost" description="Reconnecting…" />`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "variant",
      type: '"info" | "success" | "warning" | "error"',
      defaultValue: '"info"',
      description:
        "Tone of the banner. Drives bg color, border, icon, and accent. Use error for blocking issues, warning for pre-action notices, success for confirmations, info for everything else.",
    },
    {
      name: "title",
      type: "string",
      description: "Short heading. Optional — a description-only banner is valid for ambient notices.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Body text. Supports plain strings or rich content (links, inline code, formatted lists).",
    },
    {
      name: "action",
      type: "ReactNode",
      description: "Trailing action element — typically a Button. Sits inline on desktop, stacks below on mobile.",
    },
    {
      name: "dismissible",
      type: "boolean",
      defaultValue: "false",
      description: "Renders the X dismiss button on the far right. Pair with onDismiss.",
    },
    {
      name: "onDismiss",
      type: "() => void",
      description: "Fires when the user clicks the dismiss button. You're responsible for hiding the banner in your own state.",
    },
    {
      name: "icon",
      type: "ReactNode",
      description: "Override the default variant icon. Pass null to render no icon (rare — usually preserve the icon for at-a-glance status).",
    },
  ]
}

/* ── Live demo bits ── */

function DismissibleExample() {
  const [open, setOpen] = useState(true)
  return open ? (
    <Banner
      variant="info"
      title="New keyboard shortcuts"
      description="Press ? anywhere to view the full list."
      dismissible
      onDismiss={() => setOpen(false)}
    />
  ) : (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span>Banner dismissed.</span>
      <Button variant="outlineGray" size="sm" onClick={() => setOpen(true)}>
        Restore
      </Button>
    </div>
  )
}

/* ── Page ── */

export default function BannerPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.banner.title")}
      description={t("docs.banner.description")}
      category={t("docs.banner.category")}
    >
      <Section title={t("docs.banner.preview.title")} description={t("docs.banner.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Banner
            variant="info"
            title="Scheduled maintenance"
            description="The service portal will be unavailable Sunday 2am–4am Gulf Time for system upgrades."
            action={
              <Button variant="outlineGray" size="sm">
                Details
              </Button>
            }
            dismissible
          />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.banner.installation.title")} description={t("docs.banner.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.banner.installation.filename")} />
      </Section>

      <Section title={t("docs.banner.usage.title")} description={t("docs.banner.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.banner.examples.title")} description={t("docs.banner.examples.description")}>
        <div className="grid grid-cols-1 gap-4">
          <PreviewBlock
            title={t("docs.banner.examples.info.label")}
            description={t("docs.banner.examples.info.description")}
            code={EXAMPLE_SNIPPETS.info}
          >
            <Banner variant="info" title="Heads up" description="New filter shortcuts shipped today." />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.banner.examples.success.label")}
            description={t("docs.banner.examples.success.description")}
            code={EXAMPLE_SNIPPETS.success}
          >
            <Banner variant="success" title="Ticket synced" description="All updates pushed to the CRM." />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.banner.examples.warning.label")}
            description={t("docs.banner.examples.warning.description")}
            code={EXAMPLE_SNIPPETS.warning}
          >
            <Banner variant="warning" title="Trial ends soon" description="3 days remaining on your plan." />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.banner.examples.error.label")}
            description={t("docs.banner.examples.error.description")}
            code={EXAMPLE_SNIPPETS.error}
          >
            <Banner
              variant="error"
              title="Connection to CRM lost"
              description="We'll keep retrying — your work is saved locally."
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.banner.examples.withAction.label")}
            description={t("docs.banner.examples.withAction.description")}
            code={EXAMPLE_SNIPPETS.withAction}
          >
            <Banner
              variant="warning"
              title="2 tickets need review"
              description="Manager approval is required before they can be closed."
              action={
                <Button variant="filled" size="sm">
                  Review now
                </Button>
              }
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.banner.examples.dismissible.label")}
            description={t("docs.banner.examples.dismissible.description")}
            code={EXAMPLE_SNIPPETS.dismissible}
          >
            <DismissibleExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.banner.examples.descriptionOnly.label")}
            description={t("docs.banner.examples.descriptionOnly.description")}
            code={EXAMPLE_SNIPPETS.descriptionOnly}
          >
            <Banner
              variant="info"
              description="The service portal will be unavailable Sunday 2am–4am Gulf Time."
            />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.banner.examples.persistent.label")}
            description={t("docs.banner.examples.persistent.description")}
            code={EXAMPLE_SNIPPETS.persistent}
          >
            <Banner variant="error" title="Connection to CRM lost" description="Reconnecting…" />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.banner.props.title")} description={t("docs.banner.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.banner.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.banner.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.banner.accessibility.items.role")}</li>
          <li>{t("docs.banner.accessibility.items.live")}</li>
          <li>{t("docs.banner.accessibility.items.dismiss")}</li>
          <li>{t("docs.banner.accessibility.items.colorMeaning")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "iconography"]} />

      <RelatedLinks
        title={t("docs.banner.related.title")}
        items={[
          { label: "Alert", href: "/ui/alert" },
          { label: "Toast", href: "/ui/toast" },
          { label: "Dialog", href: "/ui/modal-popups" },
        ]}
      />
    </ComponentPage>
  )
}
