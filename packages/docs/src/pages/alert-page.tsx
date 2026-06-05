import { useState } from "react"
import { useTranslation } from "react-i18next"
import { AlertTriangle, CheckCircle2, Info, Mail, X, XCircle } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Alert, AlertTitle, AlertDescription } from "@dpds-gov/design-system"
import { AlertTriangle } from "lucide-react"

export function SlaWarning() {
  return (
    <Alert variant="warning">
      <AlertTriangle />
      <AlertTitle>SLA breach risk</AlertTitle>
      <AlertDescription>
        This ticket has been open for 3 days 8 hours. SLA target is 4 days.
      </AlertDescription>
    </Alert>
  )
}`

const PREVIEW_SNIPPET = `<Alert variant="info">
  <Info />
  <AlertTitle>Ticket auto-closed</AlertTitle>
  <AlertDescription>
    Closed after 7 days of inactivity. Reply to reopen.
  </AlertDescription>
</Alert>`

const EXAMPLE_SNIPPETS = {
  variants: `<Alert variant="default">
  <AlertTitle>Default</AlertTitle>
  <AlertDescription>Plain card-tinted alert.</AlertDescription>
</Alert>

<Alert variant="info">
  <Info />
  <AlertTitle>Information</AlertTitle>
</Alert>

<Alert variant="success">
  <CheckCircle2 />
  <AlertTitle>Saved</AlertTitle>
</Alert>

<Alert variant="warning">
  <AlertTriangle />
  <AlertTitle>Heads up</AlertTitle>
</Alert>

<Alert variant="destructive">
  <XCircle />
  <AlertTitle>Action failed</AlertTitle>
</Alert>`,
  withIcon: `<Alert variant="info">
  <Info />
  <AlertTitle>Ticket auto-closed</AlertTitle>
  <AlertDescription>
    Closed after 7 days of inactivity. Reply to reopen.
  </AlertDescription>
</Alert>`,
  titleOnly: `<Alert variant="success">
  <CheckCircle2 />
  <AlertTitle>Ticket synced successfully</AlertTitle>
</Alert>`,
  descriptionOnly: `<Alert variant="info">
  <Info />
  <AlertDescription>
    Maintenance window scheduled for Sunday 2 AM – 4 AM GST.
  </AlertDescription>
</Alert>`,
  withAction: `<Alert variant="warning">
  <AlertTriangle />
  <AlertTitle>Customer email failed to send</AlertTitle>
  <AlertDescription>
    The address bounced. Update the customer record to retry.
  </AlertDescription>
  <AlertAction>
    <Button size="sm" variant="outlineGray">Update email</Button>
  </AlertAction>
</Alert>`,
  dismissible: `const [open, setOpen] = useState(true)

{open && (
  <Alert variant="info">
    <Info />
    <AlertTitle>Ticket auto-closed after 7 days of inactivity</AlertTitle>
    <AlertDescription>
      Reply within 24 hours to reopen, or archive to dismiss.
    </AlertDescription>
    <AlertAction>
      <Button
        size="icon-sm"
        variant="text"
        aria-label="Dismiss"
        onClick={() => setOpen(false)}
      >
        <X className="size-4" />
      </Button>
    </AlertAction>
  </Alert>
)}`,
  richContent: `<Alert variant="info">
  <Mail />
  <AlertTitle>Verification email sent</AlertTitle>
  <AlertDescription>
    Check your inbox for a 6-digit code.{" "}
    <a href="/resend" className="underline">Resend</a> if it doesn't arrive in 5 minutes.
  </AlertDescription>
</Alert>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "Alert.variant",
      type: '"default" | "info" | "success" | "warning" | "destructive"',
      defaultValue: '"default"',
      description: "Visual tone. Status variants (info / success / warning / destructive) carry semantic meaning — don't use them for decorative emphasis.",
    },
    {
      name: "Alert.className",
      type: "string",
      description: "Extra Tailwind classes. Merges with the variant styles via cn().",
    },
    {
      name: "Alert.children",
      type: "ReactNode",
      description: "Optional leading <svg> (icon) + AlertTitle + AlertDescription + AlertAction in that order. The primitive auto-arranges them via :has() selectors.",
    },
    {
      name: "AlertTitle",
      type: "div",
      description: "Short heading. Keep ≤80 chars — wraps cleanly to two lines on small viewports.",
    },
    {
      name: "AlertDescription",
      type: "div",
      description: "Body content. Supports inline links and multiple paragraphs. Anchors auto-underline.",
    },
    {
      name: "AlertAction",
      type: "div",
      description: "Absolutely positioned to the top-right. Use for a single action button or a dismiss icon. Adds right-padding to the alert body so content doesn't collide.",
    },
  ]
}

/* ── Live demo bits ── */

function DismissibleExample() {
  const [open, setOpen] = useState(true)
  return (
    <div className="flex flex-col gap-2">
      {open ? (
        <Alert variant="info">
          <Info />
          <AlertTitle>Ticket auto-closed after 7 days of inactivity</AlertTitle>
          <AlertDescription>
            Reply within 24 hours to reopen, or archive to dismiss.
          </AlertDescription>
          <AlertAction>
            <Button
              size="icon-sm"
              variant="text"
              aria-label="Dismiss"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </AlertAction>
        </Alert>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="self-start text-xs text-primary-600 hover:underline"
        >
          Restore alert
        </button>
      )}
    </div>
  )
}

/* ── Page ── */

export default function AlertPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.alert.title")}
      description={t("docs.alert.description")}
      category={t("docs.alert.category")}
    >
      <Section title={t("docs.alert.preview.title")} description={t("docs.alert.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Alert variant="info" className="max-w-md">
            <Info />
            <AlertTitle>Ticket auto-closed</AlertTitle>
            <AlertDescription>
              Closed after 7 days of inactivity. Reply to reopen.
            </AlertDescription>
          </Alert>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.alert.installation.title")} description={t("docs.alert.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.alert.installation.filename")} />
      </Section>

      <Section title={t("docs.alert.usage.title")} description={t("docs.alert.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.alert.examples.title")} description={t("docs.alert.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.alert.examples.variants.label")}
            description={t("docs.alert.examples.variants.description")}
            code={EXAMPLE_SNIPPETS.variants}
            className="lg:col-span-2"
          >
            <div className="flex flex-col gap-3">
              <Alert variant="default">
                <AlertTitle>Default</AlertTitle>
                <AlertDescription>Plain card-tinted alert with no semantic colour.</AlertDescription>
              </Alert>
              <Alert variant="info">
                <Info />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>Use for neutral system messages and reminders.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <CheckCircle2 />
                <AlertTitle>Action succeeded</AlertTitle>
                <AlertDescription>Pair with confirmation copy when a write completes.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTriangle />
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>For risk-of-failure or attention-needed states.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <XCircle />
                <AlertTitle>Action failed</AlertTitle>
                <AlertDescription>For errors and unrecoverable conditions.</AlertDescription>
              </Alert>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.alert.examples.withIcon.label")}
            description={t("docs.alert.examples.withIcon.description")}
            code={EXAMPLE_SNIPPETS.withIcon}
          >
            <Alert variant="info" className="max-w-md">
              <Info />
              <AlertTitle>Ticket auto-closed</AlertTitle>
              <AlertDescription>
                Closed after 7 days of inactivity. Reply to reopen.
              </AlertDescription>
            </Alert>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.alert.examples.titleOnly.label")}
            description={t("docs.alert.examples.titleOnly.description")}
            code={EXAMPLE_SNIPPETS.titleOnly}
          >
            <Alert variant="success" className="max-w-md">
              <CheckCircle2 />
              <AlertTitle>Ticket synced successfully</AlertTitle>
            </Alert>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.alert.examples.descriptionOnly.label")}
            description={t("docs.alert.examples.descriptionOnly.description")}
            code={EXAMPLE_SNIPPETS.descriptionOnly}
          >
            <Alert variant="info" className="max-w-md">
              <Info />
              <AlertDescription>
                Maintenance window scheduled for Sunday 2 AM – 4 AM GST.
              </AlertDescription>
            </Alert>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.alert.examples.withAction.label")}
            description={t("docs.alert.examples.withAction.description")}
            code={EXAMPLE_SNIPPETS.withAction}
            className="lg:col-span-2"
          >
            <Alert variant="warning" className="max-w-2xl">
              <AlertTriangle />
              <AlertTitle>Customer email failed to send</AlertTitle>
              <AlertDescription>
                The address bounced. Update the customer record to retry.
              </AlertDescription>
              <AlertAction>
                <Button size="sm" variant="outlineGray">
                  Update email
                </Button>
              </AlertAction>
            </Alert>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.alert.examples.dismissible.label")}
            description={t("docs.alert.examples.dismissible.description")}
            code={EXAMPLE_SNIPPETS.dismissible}
            className="lg:col-span-2"
          >
            <DismissibleExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.alert.examples.richContent.label")}
            description={t("docs.alert.examples.richContent.description")}
            code={EXAMPLE_SNIPPETS.richContent}
            className="lg:col-span-2"
          >
            <Alert variant="info" className="max-w-2xl">
              <Mail />
              <AlertTitle>Verification email sent</AlertTitle>
              <AlertDescription>
                Check your inbox for a 6-digit code.{" "}
                <a href="#resend" className="underline">
                  Resend
                </a>{" "}
                if it doesn't arrive in 5 minutes.
              </AlertDescription>
            </Alert>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.alert.props.title")} description={t("docs.alert.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.alert.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.alert.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.alert.accessibility.items.role")}</li>
          <li>{t("docs.alert.accessibility.items.semantic")}</li>
          <li>{t("docs.alert.accessibility.items.icon")}</li>
          <li>{t("docs.alert.accessibility.items.dismiss")}</li>
          <li>{t("docs.alert.accessibility.items.choice")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.alert.related.title")}
        items={[
          { label: "Banner", href: "/ui/banner" },
          { label: "Toast", href: "/ui/toast" },
          { label: "Dialog", href: "/ui/modal-popups" },
        ]}
      />
    </ComponentPage>
  )
}
