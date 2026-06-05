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
import { Eye, EyeOff, Loader2, Lock, Mail, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@dpds-gov/design-system"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@dpds-gov/design-system"
import { Checkbox } from "@dpds-gov/design-system"
import { Separator } from "@dpds-gov/design-system"
import { Field, FieldError, FieldGroup, FieldLabel } from "@dpds-gov/design-system"

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
})

type LoginValues = z.infer<typeof schema>

export function LoginPattern() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: false },
  })

  async function onSubmit(values: LoginValues) {
    await new Promise((r) => setTimeout(r, 900))
    toast.success("Signed in", { description: \`Welcome back, \${values.email}\` })
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Form column */}
      <div className="flex flex-1 flex-col justify-center px-6 py-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[480px]">
          {/* brand mark + heading */}
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText><Mail /></InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput id="email" type="email" {...register("email")} />
                </InputGroup>
                <FieldError errors={errors.email ? [errors.email] : []} />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText><Lock /></InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-sm"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldError errors={errors.password ? [errors.password] : []} />
              </Field>

              <Button type="submit" size="xl" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                {isSubmitting ? "Signing in…" : "Sign in"}
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
        {/* tagline, stats placeholder, footer */}
      </div>
    </div>
  )
}`

const CUSTOMIZE_BRAND_SNIPPET = `<LoginPattern
  logo={
    <div className="inline-flex items-center gap-2">
      <img src="/img/dpds-mark.svg" alt="" className="size-9" />
      <span className="font-mono text-lg font-semibold">DPDS 2.0</span>
    </div>
  }
/>`

const CUSTOMIZE_COPY_SNIPPET = `// Pass copy inline...
<LoginPattern
  heading="Sign in to DPDS 2.0"
  subheading="Use your work email."
  tagline="Customer success at scale."
/>

// ...or override the i18n strings in src/locales/en.json
// "patterns.login.heading": "Sign in to DPDS 2.0",`

const CUSTOMIZE_ILLUSTRATION_SNIPPET = `<LoginPattern
  illustration={
    <img
      src="/img/login-illustration.svg"
      alt=""
      className="rounded-2xl w-full"
    />
  }
/>`

const CUSTOMIZE_LINKS_SNIPPET = `<LoginPattern
  signupHref="/auth/register"
  forgotHref="/auth/reset"
/>`

const USED: UsedComponentItem[] = [
  { label: "Button", href: "/buttons" },
  { label: "Input group", href: "/forms/input-group" },
  { label: "Checkbox", href: "/forms/checkbox" },
  { label: "Label", href: "/forms/label" },
  { label: "Field", href: "/forms/form" },
  { label: "Separator", href: "/ui/separator" },
]

export default function PatternsLoginPage() {
  const { t } = useTranslation()

  return (
    <PatternPage
      title={t("patterns.login.title")}
      description={t("patterns.login.description")}
      category={t("patterns.login.category")}
    >
      <Section
        title={t("patterns.login.docs.preview.title")}
        description={t("patterns.login.docs.preview.description")}
      >
        <PatternPreview
          standalonePath="/preview/login"
          iframeTitle={t("patterns.login.title")}
          height={780}
        />
      </Section>

      <Section
        title={t("patterns.login.docs.usedComponents.title")}
        description={t("patterns.login.docs.usedComponents.description")}
      >
        <UsedComponents items={USED} />
      </Section>

      <Section
        title={t("patterns.login.docs.source.title")}
        description={t("patterns.login.docs.source.description")}
      >
        <CodeBlock code={SOURCE_SNIPPET} language="tsx" filename="src/patterns/login.tsx" />
      </Section>

      <Section
        title={t("patterns.login.docs.customize.title")}
        description={t("patterns.login.docs.customize.description")}
      >
        <div className="flex flex-col gap-6">
          <CustomizeItem
            title={t("patterns.login.docs.customize.items.brand.title")}
            body={t("patterns.login.docs.customize.items.brand.body")}
            code={CUSTOMIZE_BRAND_SNIPPET}
          />
          <CustomizeItem
            title={t("patterns.login.docs.customize.items.copy.title")}
            body={t("patterns.login.docs.customize.items.copy.body")}
            code={CUSTOMIZE_COPY_SNIPPET}
          />
          <CustomizeItem
            title={t("patterns.login.docs.customize.items.illustration.title")}
            body={t("patterns.login.docs.customize.items.illustration.body")}
            code={CUSTOMIZE_ILLUSTRATION_SNIPPET}
          />
          <CustomizeItem
            title={t("patterns.login.docs.customize.items.links.title")}
            body={t("patterns.login.docs.customize.items.links.body")}
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
