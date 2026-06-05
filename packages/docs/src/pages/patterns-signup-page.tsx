import { useTranslation } from "react-i18next"

import {
  CodeBlock,
  PatternPage,
  PatternPreview,
  Section,
  UsedComponents,
} from "@/components/docs"
import type { UsedComponentItem } from "@/components/docs"

const SOURCE_SNIPPET = `import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, Eye, EyeOff, Loader2, Lock, Mail, Sparkles, User } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@dpds-gov/design-system"
import { Input } from "@dpds-gov/design-system"
import { Checkbox } from "@dpds-gov/design-system"
import { Separator } from "@dpds-gov/design-system"
import { Field, FieldError, FieldGroup, FieldLabel } from "@dpds-gov/design-system"

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  terms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
  updates: z.boolean().optional(),
})

type SignupValues = z.infer<typeof schema>

export function SignupPattern() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<SignupValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", updates: false },
  })

  async function onSubmit(values: SignupValues) {
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Account created", { description: \`Welcome aboard, \${values.firstName}\` })
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Form column */}
      <div className="flex flex-1 flex-col justify-center px-6 py-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[480px]">
          {/* brand mark, heading, subheading */}
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="firstName">First name</FieldLabel>
                  <Input id="firstName" {...register("firstName")} />
                  <FieldError errors={errors.firstName ? [errors.firstName] : []} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                  <Input id="lastName" {...register("lastName")} />
                  <FieldError errors={errors.lastName ? [errors.lastName] : []} />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Work email</FieldLabel>
                <Input id="email" type="email" {...register("email")} />
                <FieldError errors={errors.email ? [errors.email] : []} />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type={showPassword ? "text" : "password"} {...register("password")} />
                {/* password strength meter — see full source for the 4-tier bar */}
                <FieldError errors={errors.password ? [errors.password] : []} />
              </Field>

              <div className="flex items-start gap-2">
                <Checkbox id="terms" onCheckedChange={(v) => setValue("terms", v === true ? true : (false as unknown as true), { shouldValidate: true })} />
                <FieldLabel htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the <Link to="/terms" className="text-primary">Terms</Link> and <Link to="/privacy" className="text-primary">Privacy</Link>.
                </FieldLabel>
              </div>

              <Button type="submit" size="xl" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                {isSubmitting ? "Creating account…" : "Create account"}
              </Button>

              <div className="flex items-center gap-3 py-2">
                <Separator className="flex-1" />
                <span className="text-xs uppercase text-muted-foreground">Or continue with</span>
                <Separator className="flex-1" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button type="button" variant="outlineGray" size="lg">Continue with Google</Button>
                <Button type="button" variant="outlineGray" size="lg">Continue with Microsoft</Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>

      {/* Brand panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 dark:from-primary-800 dark:via-primary-900 dark:to-slate-950">
        {/* tagline, feature list, footer */}
      </div>
    </div>
  )
}`

const CUSTOMIZE_BRAND_SNIPPET = `<SignupPattern
  logo={
    <div className="inline-flex items-center gap-2">
      <img src="/img/dpds-mark.svg" alt="" className="size-9" />
      <span className="font-mono text-lg font-semibold">DPDS 2.0</span>
    </div>
  }
/>`

const CUSTOMIZE_COPY_SNIPPET = `// Pass copy inline...
<SignupPattern
  heading="Start your free trial"
  subheading="14 days, no credit card."
  tagline="The CRM your customers actually like."
/>

// ...or override the i18n strings in src/locales/en.json
// "patterns.signup.heading": "Start your free trial",`

const CUSTOMIZE_ILLUSTRATION_SNIPPET = `<SignupPattern
  illustration={
    <img
      src="/img/signup-illustration.svg"
      alt=""
      className="rounded-2xl w-full"
    />
  }
/>`

const CUSTOMIZE_LINKS_SNIPPET = `<SignupPattern
  loginHref="/auth/login"
  termsHref="/legal/terms"
  privacyHref="/legal/privacy"
/>`

const USED: UsedComponentItem[] = [
  { label: "Button", href: "/buttons" },
  { label: "Input group", href: "/forms/input-group" },
  { label: "Checkbox", href: "/forms/checkbox" },
  { label: "Label", href: "/forms/label" },
  { label: "Field", href: "/forms/form" },
  { label: "Separator", href: "/ui/separator" },
]

export default function PatternsSignupPage() {
  const { t } = useTranslation()

  return (
    <PatternPage
      title={t("patterns.signup.title")}
      description={t("patterns.signup.description")}
      category={t("patterns.signup.category")}
    >
      <Section
        title={t("patterns.signup.docs.preview.title")}
        description={t("patterns.signup.docs.preview.description")}
      >
        <PatternPreview
          standalonePath="/preview/signup"
          iframeTitle={t("patterns.signup.title")}
          height={860}
        />
      </Section>

      <Section
        title={t("patterns.signup.docs.usedComponents.title")}
        description={t("patterns.signup.docs.usedComponents.description")}
      >
        <UsedComponents items={USED} />
      </Section>

      <Section
        title={t("patterns.signup.docs.source.title")}
        description={t("patterns.signup.docs.source.description")}
      >
        <CodeBlock code={SOURCE_SNIPPET} language="tsx" filename="src/patterns/signup.tsx" />
      </Section>

      <Section
        title={t("patterns.signup.docs.customize.title")}
        description={t("patterns.signup.docs.customize.description")}
      >
        <div className="flex flex-col gap-6">
          <CustomizeItem
            title={t("patterns.signup.docs.customize.items.brand.title")}
            body={t("patterns.signup.docs.customize.items.brand.body")}
            code={CUSTOMIZE_BRAND_SNIPPET}
          />
          <CustomizeItem
            title={t("patterns.signup.docs.customize.items.copy.title")}
            body={t("patterns.signup.docs.customize.items.copy.body")}
            code={CUSTOMIZE_COPY_SNIPPET}
          />
          <CustomizeItem
            title={t("patterns.signup.docs.customize.items.illustration.title")}
            body={t("patterns.signup.docs.customize.items.illustration.body")}
            code={CUSTOMIZE_ILLUSTRATION_SNIPPET}
          />
          <CustomizeItem
            title={t("patterns.signup.docs.customize.items.links.title")}
            body={t("patterns.signup.docs.customize.items.links.body")}
            code={CUSTOMIZE_LINKS_SNIPPET}
          />
        </div>
      </Section>
    </PatternPage>
  )
}

function CustomizeItem({ title, body, code }: { title: string; body: string; code: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-slate-400 max-w-3xl">{body}</p>
      <CodeBlock code={code} language="tsx" />
    </div>
  )
}
