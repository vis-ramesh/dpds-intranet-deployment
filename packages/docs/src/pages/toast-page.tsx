import { useTranslation } from "react-i18next"
import { toast } from "sonner"

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

const INSTALL_SNIPPET = `// Toaster is mounted once in App.tsx
import { Toaster } from "@dpds-gov/design-system"

// Trigger toasts from anywhere
import { toast } from "sonner"`

const USAGE_SNIPPET = `import { toast } from "sonner"

export function SaveButton() {
  return (
    <Button
      onClick={() =>
        toast.success("Ticket saved", {
          description: "REQ-2025-0142 was updated.",
        })
      }
    >
      Save ticket
    </Button>
  )
}`

const PREVIEW_SNIPPET = `toast("Ticket saved")`

const EXAMPLE_SNIPPETS = {
  default: `toast("REQ-2025-0142 was updated")`,
  success: `toast.success("Ticket assigned", {
  description: "Khalifa Mohammed is now the responsible investigator.",
})`,
  warning: `toast.warning("SLA breach in 30 minutes", {
  description: "Reassign or escalate to avoid breach.",
})`,
  error: `toast.error("Couldn't submit request", {
  description: "Network error. We've saved a draft locally.",
})`,
  info: `toast.info("New comment from Sarah Chen", {
  description: "Re: REQ-2025-0142",
})`,
  withAction: `toast("Ticket archived", {
  action: {
    label: "Undo",
    onClick: () => console.log("undo"),
  },
})`,
  promise: `toast.promise(submitTicket(), {
  loading: "Submitting…",
  success: "Ticket submitted",
  error: "Submission failed",
})`,
  dismiss: `const id = toast.loading("Working...")
// ...later
toast.dismiss(id)`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "message",
      type: "ReactNode",
      required: true,
      description: "Title of the toast. Keep it short — fits one line.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Secondary text shown below the message. Use for context like reference numbers or next steps.",
    },
    {
      name: "duration",
      type: "number",
      defaultValue: "4000",
      description: "Milliseconds before auto-dismiss. Set Infinity for sticky toasts that require user dismissal.",
    },
    {
      name: "action",
      type: "{ label: string; onClick: () => void }",
      description: "Optional action button (e.g. Undo, View). Renders on the right side of the toast.",
    },
    {
      name: "cancel",
      type: "{ label: string; onClick?: () => void }",
      description: "Secondary action that always dismisses the toast (whether you provide onClick or not).",
    },
    {
      name: "id",
      type: "string | number",
      description: "Custom id for updating or dismissing this toast later (e.g. for loading → resolved patterns).",
    },
    {
      name: "icon",
      type: "ReactNode",
      description: "Override the default variant icon. Pass null to hide the icon.",
    },
    {
      name: "position",
      type: '"top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"',
      description: "Override the Toaster's default position for this one toast.",
    },
  ]
}

/* ── Promise demo ── */

function fakeSubmit() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.2 ? resolve() : reject(new Error("Network"))), 1400)
  })
}

/* ── Page ── */

export default function ToastPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.toast.title")}
      description={t("docs.toast.description")}
      category={t("docs.toast.category")}
    >
      <Section title={t("docs.toast.preview.title")} description={t("docs.toast.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Button onClick={() => toast(t("docs.toast.preview.label"))}>{t("docs.toast.preview.button")}</Button>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.toast.installation.title")} description={t("docs.toast.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.toast.installation.filename")} />
      </Section>

      <Section title={t("docs.toast.usage.title")} description={t("docs.toast.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.toast.examples.title")} description={t("docs.toast.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.toast.examples.default.label")}
            description={t("docs.toast.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <Button variant="gray" onClick={() => toast("REQ-2025-0142 was updated")}>Show default</Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.toast.examples.success.label")}
            description={t("docs.toast.examples.success.description")}
            code={EXAMPLE_SNIPPETS.success}
          >
            <Button
              onClick={() =>
                toast.success("Ticket assigned", {
                  description: "Khalifa Mohammed is now the responsible investigator.",
                })
              }
            >
              Show success
            </Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.toast.examples.warning.label")}
            description={t("docs.toast.examples.warning.description")}
            code={EXAMPLE_SNIPPETS.warning}
          >
            <Button
              variant="filledWarning"
              onClick={() =>
                toast.warning("SLA breach in 30 minutes", {
                  description: "Reassign or escalate to avoid breach.",
                })
              }
            >
              Show warning
            </Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.toast.examples.error.label")}
            description={t("docs.toast.examples.error.description")}
            code={EXAMPLE_SNIPPETS.error}
          >
            <Button
              variant="filledDestructive"
              onClick={() =>
                toast.error("Couldn't submit request", {
                  description: "Network error. We've saved a draft locally.",
                })
              }
            >
              Show error
            </Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.toast.examples.info.label")}
            description={t("docs.toast.examples.info.description")}
            code={EXAMPLE_SNIPPETS.info}
          >
            <Button
              variant="outlineGray"
              onClick={() =>
                toast.info("New comment from Sarah Chen", {
                  description: "Re: REQ-2025-0142",
                })
              }
            >
              Show info
            </Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.toast.examples.withAction.label")}
            description={t("docs.toast.examples.withAction.description")}
            code={EXAMPLE_SNIPPETS.withAction}
          >
            <Button
              variant="gray"
              onClick={() =>
                toast("Ticket archived", {
                  action: { label: "Undo", onClick: () => toast.info("Restored") },
                })
              }
            >
              Show with action
            </Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.toast.examples.promise.label")}
            description={t("docs.toast.examples.promise.description")}
            code={EXAMPLE_SNIPPETS.promise}
          >
            <Button
              onClick={() =>
                toast.promise(fakeSubmit(), {
                  loading: "Submitting…",
                  success: "Ticket submitted",
                  error: "Submission failed",
                })
              }
            >
              Run promise
            </Button>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.toast.props.title")} description={t("docs.toast.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.toast.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.toast.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.toast.accessibility.items.live")}</li>
          <li>{t("docs.toast.accessibility.items.dismiss")}</li>
          <li>{t("docs.toast.accessibility.items.essential")}</li>
          <li>{t("docs.toast.accessibility.items.duration")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.toast.related.title")}
        items={[
          { label: "Banner", href: "/ui/banner" },
          { label: "Alert", href: "/ui/alert" },
          { label: "Dialog", href: "/ui/modal-popups" },
        ]}
      />
    </ComponentPage>
  )
}
