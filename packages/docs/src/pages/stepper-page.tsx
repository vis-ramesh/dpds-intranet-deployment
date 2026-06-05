import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Stepper } from "@dpds-gov/design-system"
import type { StepperStep } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Stepper } from "@dpds-gov/design-system"
import type { StepperStep } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Stepper } from "@dpds-gov/design-system"
import type { StepperStep } from "@dpds-gov/design-system"

const steps: StepperStep[] = [
  { title: "Customer details", status: "completed" },
  { title: "Service selection", status: "completed" },
  { title: "Review", status: "active" },
  { title: "Confirmation", status: "pending" },
]

export function TradeLicenseFlow() {
  return <Stepper steps={steps} />
}`

const PREVIEW_SNIPPET = `<Stepper
  steps={[
    { title: "Customer", status: "completed" },
    { title: "Service", status: "completed" },
    { title: "Review", status: "active" },
    { title: "Confirmation", status: "pending" },
  ]}
/>`

const EXAMPLE_SNIPPETS = {
  default: PREVIEW_SNIPPET,
  start: `<Stepper
  steps={[
    { title: "Customer", status: "active" },
    { title: "Service", status: "pending" },
    { title: "Review", status: "pending" },
    { title: "Confirmation", status: "pending" },
  ]}
/>`,
  done: `<Stepper
  steps={[
    { title: "Customer", status: "completed" },
    { title: "Service", status: "completed" },
    { title: "Review", status: "completed" },
    { title: "Confirmation", status: "completed" },
  ]}
/>`,
  controlled: `const [step, setStep] = useState(2)
const STEPS = ["Customer details", "Service selection", "Review", "Confirmation"]

<Stepper
  steps={STEPS.map((title, i) => ({
    title,
    status: i < step ? "completed" : i === step ? "active" : "pending",
  }))}
/>

<div className="flex gap-2">
  <Button variant="outlineGray" onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
  <Button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}>Next</Button>
</div>`,
  longFlow: `<Stepper
  steps={[
    { title: "Eligibility",       status: "completed" },
    { title: "Documents",         status: "completed" },
    { title: "Fees",              status: "completed" },
    { title: "Verification",      status: "active" },
    { title: "Issuance",          status: "pending" },
    { title: "Delivery",          status: "pending" },
  ]}
/>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "steps",
      type: "StepperStep[]",
      required: true,
      description: "Ordered list of steps. Each step needs a title and a status. Render order matches array order.",
    },
    {
      name: "StepperStep.title",
      type: "string",
      required: true,
      description: "Short label below the dot. Keep it ≤3 words — long titles wrap awkwardly.",
    },
    {
      name: "StepperStep.status",
      type: '"completed" | "active" | "pending"',
      required: true,
      description: 'Drives the visual treatment. "completed" shows a check, "active" pulses with a ripple, "pending" is muted outline.',
    },
    {
      name: "className",
      type: "string",
      description: "Override the outer flex container — useful for capping max-width or adjusting horizontal padding.",
    },
  ]
}

/* ── Live demo bits ── */

function ControlledExample() {
  const [step, setStep] = useState(2)
  const TITLES = ["Customer details", "Service selection", "Review", "Confirmation"]
  const steps: StepperStep[] = TITLES.map((title, i) => ({
    title,
    status: i < step ? "completed" : i === step ? "active" : "pending",
  }))
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <Stepper steps={steps} />
      <div className="flex justify-between gap-2">
        <Button
          variant="outlineGray"
          size="sm"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>
        <span className="text-xs text-muted-foreground self-center">
          Step {step + 1} of {TITLES.length}
        </span>
        <Button
          size="sm"
          disabled={step === TITLES.length - 1}
          onClick={() => setStep((s) => Math.min(TITLES.length - 1, s + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

/* ── Page ── */

export default function StepperPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.stepper.title")}
      description={t("docs.stepper.description")}
      category={t("docs.stepper.category")}
    >
      <Section title={t("docs.stepper.preview.title")} description={t("docs.stepper.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="w-full max-w-2xl">
            <Stepper
              steps={[
                { title: "Customer", status: "completed" },
                { title: "Service", status: "completed" },
                { title: "Review", status: "active" },
                { title: "Confirmation", status: "pending" },
              ]}
            />
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.stepper.installation.title")} description={t("docs.stepper.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.stepper.installation.filename")} />
      </Section>

      <Section title={t("docs.stepper.usage.title")} description={t("docs.stepper.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.stepper.examples.title")} description={t("docs.stepper.examples.description")}>
        <div className="grid grid-cols-1 gap-4">
          <PreviewBlock
            title={t("docs.stepper.examples.default.label")}
            description={t("docs.stepper.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <div className="w-full max-w-2xl">
              <Stepper
                steps={[
                  { title: "Customer", status: "completed" },
                  { title: "Service", status: "completed" },
                  { title: "Review", status: "active" },
                  { title: "Confirmation", status: "pending" },
                ]}
              />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.stepper.examples.start.label")}
            description={t("docs.stepper.examples.start.description")}
            code={EXAMPLE_SNIPPETS.start}
          >
            <div className="w-full max-w-2xl">
              <Stepper
                steps={[
                  { title: "Customer", status: "active" },
                  { title: "Service", status: "pending" },
                  { title: "Review", status: "pending" },
                  { title: "Confirmation", status: "pending" },
                ]}
              />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.stepper.examples.done.label")}
            description={t("docs.stepper.examples.done.description")}
            code={EXAMPLE_SNIPPETS.done}
          >
            <div className="w-full max-w-2xl">
              <Stepper
                steps={[
                  { title: "Customer", status: "completed" },
                  { title: "Service", status: "completed" },
                  { title: "Review", status: "completed" },
                  { title: "Confirmation", status: "completed" },
                ]}
              />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.stepper.examples.controlled.label")}
            description={t("docs.stepper.examples.controlled.description")}
            code={EXAMPLE_SNIPPETS.controlled}
          >
            <ControlledExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.stepper.examples.longFlow.label")}
            description={t("docs.stepper.examples.longFlow.description")}
            code={EXAMPLE_SNIPPETS.longFlow}
          >
            <div className="w-full max-w-3xl">
              <Stepper
                steps={[
                  { title: "Eligibility", status: "completed" },
                  { title: "Documents", status: "completed" },
                  { title: "Fees", status: "completed" },
                  { title: "Verification", status: "active" },
                  { title: "Issuance", status: "pending" },
                  { title: "Delivery", status: "pending" },
                ]}
              />
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.stepper.props.title")} description={t("docs.stepper.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.stepper.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.stepper.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.stepper.accessibility.items.live")}</li>
          <li>{t("docs.stepper.accessibility.items.titles")}</li>
          <li>{t("docs.stepper.accessibility.items.motion")}</li>
          <li>{t("docs.stepper.accessibility.items.vertical")}</li>
          <li>{t("docs.stepper.accessibility.items.color")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "spacing", "typography", "motion"]} />

      <RelatedLinks
        title={t("docs.stepper.related.title")}
        items={[
          { label: "Tabs", href: "/ui/tabs" },
          { label: "Pagination", href: "/ui/pagination" },
          { label: "Form", href: "/forms/form" },
        ]}
      />
    </ComponentPage>
  )
}
