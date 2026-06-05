import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@dpds-gov/design-system"
import { Input } from "@dpds-gov/design-system"
import { Textarea } from "@dpds-gov/design-system"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dpds-gov/design-system"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@dpds-gov/design-system"
import {
  CodeBlock,
  ComponentPage,
  ExternalLinks,
  PreviewBlock,
  PropsTable,
  RelatedLinks,
  Section,
  UsesTokens,
} from "@/components/docs"
import type { PropRow } from "@/components/docs"

/* ── Snippets ── */

const INSTALL_SNIPPET = `// Project pattern: react-hook-form + zod + Field helpers.
// There is no <Form> wrapper component — compose primitives directly.
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Field, FieldGroup, FieldLabel, FieldError, FieldDescription } from "@dpds-gov/design-system"
import { Input } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `const schema = z.object({
  reference: z.string().min(1, "Reference is required"),
  description: z.string().min(10, "Tell us a bit more (10+ chars)"),
})

type FormValues = z.infer<typeof schema>

export function NewTicketForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: FormValues) {
    await api.createTicket(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="reference">Reference</FieldLabel>
          <Input id="reference" {...register("reference")} aria-invalid={!!errors.reference} />
          <FieldError errors={errors.reference ? [errors.reference] : []} />
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea id="description" rows={4} {...register("description")} aria-invalid={!!errors.description} />
          <FieldError errors={errors.description ? [errors.description] : []} />
        </Field>
        <Button type="submit" disabled={isSubmitting}>
          Create ticket
        </Button>
      </FieldGroup>
    </form>
  )
}`

const PREVIEW_SNIPPET = `<form onSubmit={handleSubmit(onSubmit)}>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="reference">Reference</FieldLabel>
      <Input id="reference" {...register("reference")} />
    </Field>
    <Button type="submit">Submit</Button>
  </FieldGroup>
</form>`

const EXAMPLE_SNIPPETS = {
  simple: `const { register, handleSubmit } = useForm()

<form onSubmit={handleSubmit(values => console.log(values))}>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Customer name</FieldLabel>
      <Input id="name" {...register("name")} />
    </Field>
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" {...register("email")} />
    </Field>
    <Button type="submit">Save</Button>
  </FieldGroup>
</form>`,
  validation: `const schema = z.object({
  emiratesId: z.string().regex(/^784-\\d{4}-\\d{7}-\\d$/, "Format: 784-XXXX-XXXXXXX-X"),
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  mode: "onBlur",
})

<Field>
  <FieldLabel htmlFor="eid">Emirates ID</FieldLabel>
  <Input id="eid" {...register("emiratesId")} aria-invalid={!!errors.emiratesId} />
  <FieldError errors={errors.emiratesId ? [errors.emiratesId] : []} />
</Field>`,
  asyncSubmit: `async function onSubmit(values) {
  await api.submit(values)            // ~1.4s
}

const { register, handleSubmit, formState: { isSubmitting } } = useForm()

<form onSubmit={handleSubmit(onSubmit)}>
  <FieldGroup>
    <Field><Input {...register("ref")} /></Field>
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? <><Loader2 className="size-4 animate-spin" /> Submitting…</> : "Submit"}
    </Button>
  </FieldGroup>
</form>`,
  conditional: `const { register, watch } = useForm()
const priority = watch("priority")

<Field>
  <FieldLabel htmlFor="priority">Priority</FieldLabel>
  <Select {...register("priority")}>...</Select>
</Field>

{priority === "critical" && (
  <Field>
    <FieldLabel htmlFor="reason">Escalation reason</FieldLabel>
    <Textarea id="reason" {...register("reason")} />
    <FieldDescription>Required for Critical tickets.</FieldDescription>
  </Field>
)}`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "useForm() options",
      type: "{ resolver?, mode?, defaultValues?, ... }",
      description: "react-hook-form hook returns register, handleSubmit, watch, formState, etc. Pass `zodResolver(schema)` to validate against a Zod schema.",
    },
    {
      name: "Field",
      type: "{ orientation?: \"vertical\" | \"horizontal\" | \"responsive\"; data-invalid?: boolean }",
      description: "Wraps a single field row. orientation defaults to vertical; horizontal puts label and input side-by-side.",
    },
    {
      name: "FieldGroup",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "Stacks multiple Fields with consistent spacing. Use inside a <form> as the direct child.",
    },
    {
      name: "FieldLabel",
      type: '{ htmlFor: string; ...labelProps }',
      description: "Renders a <label>. The htmlFor must match the input's id for screen readers and click-to-focus.",
    },
    {
      name: "FieldError",
      type: "{ errors?: Array<{ message?: string }>; children?: ReactNode }",
      description: "Renders a list of validation errors below a field. Pass `errors={[formState.errors.fieldName]}` from react-hook-form, or pass `children` for static text.",
    },
    {
      name: "FieldDescription",
      type: "HTMLAttributes<HTMLParagraphElement>",
      description: "Secondary helper text under a field. Avoid when an error is also shown — they fight for attention.",
    },
    {
      name: "FieldSet + FieldLegend",
      type: "HTMLAttributes",
      description: "Group related fields (e.g. address line 1 + line 2 + city). Renders semantic <fieldset> + <legend>.",
    },
  ]
}

/* ── Live demo bits ── */

const SimpleSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
})
type SimpleValues = z.infer<typeof SimpleSchema>

function SimpleFormExample() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<SimpleValues>({
    resolver: zodResolver(SimpleSchema),
  })
  return (
    <form
      onSubmit={handleSubmit(() => reset())}
      className="w-full max-w-md"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="simple-name">Customer name</FieldLabel>
          <Input id="simple-name" placeholder="Mohammed Al Mansoori" {...register("name")} aria-invalid={!!errors.name} />
          <FieldError errors={errors.name ? [errors.name] : []} />
        </Field>
        <Field>
          <FieldLabel htmlFor="simple-email">Email</FieldLabel>
          <Input id="simple-email" type="email" placeholder="sarah@example.com" {...register("email")} aria-invalid={!!errors.email} />
          <FieldError errors={errors.email ? [errors.email] : []} />
        </Field>
        <Button type="submit">Save customer</Button>
        {isSubmitSuccessful && <p className="text-xs text-primary-600">Saved.</p>}
      </FieldGroup>
    </form>
  )
}

const ValidationSchema = z.object({
  emiratesId: z.string().regex(/^784-\d{4}-\d{7}-\d$/, "Format: 784-XXXX-XXXXXXX-X"),
})
type ValidationValues = z.infer<typeof ValidationSchema>

function ValidationExample() {
  const { register, handleSubmit, formState: { errors } } = useForm<ValidationValues>({
    resolver: zodResolver(ValidationSchema),
    mode: "onBlur",
  })
  return (
    <form onSubmit={handleSubmit(() => {})} className="w-full max-w-md">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="val-eid">Emirates ID</FieldLabel>
          <Input
            id="val-eid"
            placeholder="784-XXXX-XXXXXXX-X"
            defaultValue="784-2000-bad"
            {...register("emiratesId")}
            aria-invalid={!!errors.emiratesId}
          />
          <FieldError errors={errors.emiratesId ? [errors.emiratesId] : []} />
        </Field>
        <Button type="submit">Validate</Button>
      </FieldGroup>
    </form>
  )
}

function AsyncSubmitExample() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ ref: string }>()
  const [submitted, setSubmitted] = useState<string | null>(null)

  async function onSubmit(values: { ref: string }) {
    await new Promise((r) => setTimeout(r, 1400))
    setSubmitted(values.ref || "(empty)")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="async-ref">Reference</FieldLabel>
          <Input id="async-ref" placeholder="REQ-2025-0142" {...register("ref")} />
        </Field>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Submitting…
            </>
          ) : (
            "Submit"
          )}
        </Button>
        {submitted && <p className="text-xs text-primary-600">Submitted: {submitted}</p>}
      </FieldGroup>
    </form>
  )
}

function ConditionalFieldsExample() {
  const { register, handleSubmit, watch } = useForm<{ priority: string; reason: string }>({
    defaultValues: { priority: "medium", reason: "" },
  })
  const priority = watch("priority")
  return (
    <form onSubmit={handleSubmit(() => {})} className="w-full max-w-md">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="cond-priority">Priority</FieldLabel>
          <Select
            value={priority}
            onValueChange={(v) => {
              const evt = { target: { name: "priority", value: v } } as unknown as React.ChangeEvent<HTMLInputElement>
              register("priority").onChange(evt)
            }}
          >
            <SelectTrigger id="cond-priority">
              <SelectValue placeholder="Pick a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        {priority === "critical" && (
          <Field>
            <FieldLabel htmlFor="cond-reason">Escalation reason</FieldLabel>
            <Textarea id="cond-reason" rows={3} {...register("reason")} />
            <FieldDescription>Required for Critical tickets.</FieldDescription>
          </Field>
        )}
        <Button type="submit">Save</Button>
      </FieldGroup>
    </form>
  )
}

/* ── Page ── */

export default function FormPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.form.title")}
      description={t("docs.form.description")}
      category={t("docs.form.category")}
    >
      <Section title={t("docs.form.preview.title")} description={t("docs.form.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <SimpleFormExample />
        </PreviewBlock>
      </Section>

      <Section title={t("docs.form.installation.title")} description={t("docs.form.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.form.installation.filename")} />
      </Section>

      <Section title={t("docs.form.usage.title")} description={t("docs.form.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.form.examples.title")} description={t("docs.form.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.form.examples.simple.label")}
            description={t("docs.form.examples.simple.description")}
            code={EXAMPLE_SNIPPETS.simple}
          >
            <SimpleFormExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.form.examples.validation.label")}
            description={t("docs.form.examples.validation.description")}
            code={EXAMPLE_SNIPPETS.validation}
          >
            <ValidationExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.form.examples.asyncSubmit.label")}
            description={t("docs.form.examples.asyncSubmit.description")}
            code={EXAMPLE_SNIPPETS.asyncSubmit}
          >
            <AsyncSubmitExample />
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.form.examples.conditional.label")}
            description={t("docs.form.examples.conditional.description")}
            code={EXAMPLE_SNIPPETS.conditional}
          >
            <ConditionalFieldsExample />
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.form.props.title")} description={t("docs.form.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.form.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.form.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.form.accessibility.items.label")}</li>
          <li>{t("docs.form.accessibility.items.invalid")}</li>
          <li>{t("docs.form.accessibility.items.error")}</li>
          <li>{t("docs.form.accessibility.items.required")}</li>
          <li>{t("docs.form.accessibility.items.submit")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.form.related.title")}
        items={[
          { label: "Input", href: "/forms/input" },
          { label: "Select", href: "/forms/select" },
          { label: "Button", href: "/buttons" },
          { label: "Label", href: "/forms/label" },
        ]}
      />

      <ExternalLinks
        title="Related libraries"
        items={[
          { label: "react-hook-form", href: "https://react-hook-form.com" },
          { label: "Zod", href: "https://zod.dev" },
          { label: "@hookform/resolvers", href: "https://github.com/react-hook-form/resolvers" },
        ]}
      />
    </ComponentPage>
  )
}
