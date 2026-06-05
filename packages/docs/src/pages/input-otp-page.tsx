import { useState } from "react"
import { useTranslation } from "react-i18next"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"

export function PhoneVerification() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="otp">SMS verification code</Label>
      <InputOTP id="otp" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}`

const PREVIEW_SNIPPET = `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`

const EXAMPLE_SNIPPETS = {
  default: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  withSeparator: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  digitsOnly: `import { REGEXP_ONLY_DIGITS } from "input-otp"

<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  fourDigit: `<InputOTP maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`,
  controlled: `const [value, setValue] = useState("")

<InputOTP maxLength={6} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
<p className="text-sm text-muted-foreground">
  Entered: <code>{value || "(empty)"}</code>
</p>`,
  onComplete: `// Fires once when the user finishes typing the last slot.
// Pair with a verifier call so users don't need to press a button.
<InputOTP
  maxLength={6}
  onComplete={(code) => verifyCode(code)}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  error: `<div className="grid gap-1.5">
  <InputOTP maxLength={6} aria-invalid>
    <InputOTPGroup>
      <InputOTPSlot index={0} aria-invalid />
      <InputOTPSlot index={1} aria-invalid />
      <InputOTPSlot index={2} aria-invalid />
      <InputOTPSlot index={3} aria-invalid />
      <InputOTPSlot index={4} aria-invalid />
      <InputOTPSlot index={5} aria-invalid />
    </InputOTPGroup>
  </InputOTP>
  <p className="text-xs text-error-600">
    That code didn't match. Try again or request a new one.
  </p>
</div>`,
  disabled: `<InputOTP maxLength={6} disabled>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "maxLength",
      type: "number",
      required: true,
      description: "Total number of slots / characters. Must match the count of InputOTPSlot children.",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled value. Pair with onChange.",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Fires on every keystroke (including paste). Receives the full accumulated string so far.",
    },
    {
      name: "onComplete",
      type: "(value: string) => void",
      description: "Fires once when the user fills the last slot. Use to auto-submit verification codes without a button.",
    },
    {
      name: "pattern",
      type: "string (regex)",
      description: "Restrict allowed characters. Use REGEXP_ONLY_DIGITS, REGEXP_ONLY_CHARS, or REGEXP_ONLY_DIGITS_AND_CHARS from the input-otp package.",
    },
    {
      name: "inputMode",
      type: '"numeric" | "text" | "tel" | "email"',
      defaultValue: '"numeric"',
      description: "Mobile keyboard hint. Stick with numeric for digit-only codes — it gives the user the number pad.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables every slot and removes them from tab order. The container picks up has-disabled:opacity-50.",
    },
    {
      name: "containerClassName",
      type: "string",
      description: "Classes on the outer container (the flex row wrapping the groups). The standard className goes on the hidden underlying input.",
    },
    {
      name: "InputOTPSlot.index",
      type: "number",
      required: true,
      description: "Position in the slot row (0-based). Must match the order of slots within the group.",
    },
  ]
}

/* ── Live demo bits ── */

function ControlledExample() {
  const [value, setValue] = useState("")
  return (
    <div className="flex flex-col items-start gap-3">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-xs text-muted-foreground">
        Entered: <code className="font-mono">{value || "(empty)"}</code>
      </p>
    </div>
  )
}

function OnCompleteExample() {
  const [lastSubmitted, setLastSubmitted] = useState<string | null>(null)
  return (
    <div className="flex flex-col items-start gap-3">
      <InputOTP
        maxLength={6}
        onComplete={(code) => setLastSubmitted(code)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-xs text-muted-foreground">
        {lastSubmitted
          ? <>Auto-submitted: <code className="font-mono">{lastSubmitted}</code></>
          : "Fill all 6 slots to auto-submit."}
      </p>
    </div>
  )
}

/* ── Page ── */

export default function InputOtpPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.inputOtp.title")}
      description={t("docs.inputOtp.description")}
      category={t("docs.inputOtp.category")}
    >
      <Section title={t("docs.inputOtp.preview.title")} description={t("docs.inputOtp.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.inputOtp.installation.title")} description={t("docs.inputOtp.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.inputOtp.installation.filename")} />
      </Section>

      <Section title={t("docs.inputOtp.usage.title")} description={t("docs.inputOtp.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.inputOtp.examples.title")} description={t("docs.inputOtp.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.inputOtp.examples.default.label")}
            description={t("docs.inputOtp.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.inputOtp.examples.withSeparator.label")}
            description={t("docs.inputOtp.examples.withSeparator.description")}
            code={EXAMPLE_SNIPPETS.withSeparator}
          >
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.inputOtp.examples.digitsOnly.label")}
            description={t("docs.inputOtp.examples.digitsOnly.description")}
            code={EXAMPLE_SNIPPETS.digitsOnly}
          >
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.inputOtp.examples.fourDigit.label")}
            description={t("docs.inputOtp.examples.fourDigit.description")}
            code={EXAMPLE_SNIPPETS.fourDigit}
          >
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.inputOtp.examples.controlled.label")}
            description={t("docs.inputOtp.examples.controlled.description")}
            code={EXAMPLE_SNIPPETS.controlled}
          >
            <ControlledExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.inputOtp.examples.onComplete.label")}
            description={t("docs.inputOtp.examples.onComplete.description")}
            code={EXAMPLE_SNIPPETS.onComplete}
          >
            <OnCompleteExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.inputOtp.examples.error.label")}
            description={t("docs.inputOtp.examples.error.description")}
            code={EXAMPLE_SNIPPETS.error}
          >
            <div className="grid gap-1.5">
              <InputOTP maxLength={6} aria-invalid>
                <InputOTPGroup>
                  <InputOTPSlot index={0} aria-invalid />
                  <InputOTPSlot index={1} aria-invalid />
                  <InputOTPSlot index={2} aria-invalid />
                  <InputOTPSlot index={3} aria-invalid />
                  <InputOTPSlot index={4} aria-invalid />
                  <InputOTPSlot index={5} aria-invalid />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs text-error-600">
                That code didn't match. Try again or request a new one.
              </p>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.inputOtp.examples.disabled.label")}
            description={t("docs.inputOtp.examples.disabled.description")}
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <InputOTP maxLength={6} disabled>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.inputOtp.props.title")} description={t("docs.inputOtp.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.inputOtp.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.inputOtp.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.inputOtp.accessibility.items.label")}</li>
          <li>{t("docs.inputOtp.accessibility.items.autocomplete")}</li>
          <li>{t("docs.inputOtp.accessibility.items.paste")}</li>
          <li>{t("docs.inputOtp.accessibility.items.error")}</li>
          <li>{t("docs.inputOtp.accessibility.items.inputMode")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.inputOtp.related.title")}
        items={[
          { label: "Input", href: "/forms/input" },
          { label: "Form", href: "/forms/form" },
          { label: "Label", href: "/forms/label" },
          { label: "Button", href: "/buttons" },
        ]}
      />
    </ComponentPage>
  )
}
