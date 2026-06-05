import { Loader2, Plus } from "lucide-react"
import { useTranslation } from "react-i18next"

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

/* ── Code snippets shown in <PreviewBlock> "View code" toggle ── */

const INSTALL_SNIPPET = `import { Button } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Button } from "@dpds-gov/design-system"

export function Example() {
  return (
    <Button onClick={() => console.log("clicked")}>
      Click me
    </Button>
  )
}`

const PREVIEW_SNIPPET = `<Button>Click me</Button>`

const EXAMPLE_SNIPPETS = {
  default: `<Button variant="filled">Default</Button>`,
  secondary: `<Button variant="gray">Secondary</Button>`,
  tonal: `<Button variant="tonal">Tonal</Button>`,
  outline: `<Button variant="outlineGray">Outline</Button>`,
  ghost: `<Button variant="text">Ghost</Button>`,
  destructive: `<Button variant="filledDestructive">Destructive</Button>`,
  withIcon: `import { Plus } from "lucide-react"

<Button>
  <Plus className="size-4" />
  New item
</Button>`,
  loading: `import { Loader2 } from "lucide-react"

<Button disabled>
  <Loader2 className="size-4 animate-spin" />
  Saving…
</Button>`,
  disabled: `<Button disabled>Disabled</Button>`,
}

/* ── Props table rows ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "variant",
      type: '"filled" | "filledDestructive" | "filledWarning" | "tonal" | "gray" | "outlineGray" | "outlineGreen" | "text" | "linkGray" | "linkGreen"',
      defaultValue: '"filled"',
      description:
        "Visual hierarchy. Use filled for primary CTAs, gray for secondary, outlineGray for tertiary, and filledDestructive for irreversible actions.",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "icon-xs" | "icon-sm" | "icon-md" | "icon-lg" | "icon-xl" | "icon-xxl"',
      defaultValue: '"xl"',
      description:
        "Height + padding scale. Use the icon-* sizes when rendering an icon-only button (square aspect ratio).",
    },
    {
      name: "asChild",
      type: "boolean",
      defaultValue: "false",
      description:
        'When true, renders as the single child via Radix Slot. Use this to render a Button as a <Link> or <a> while keeping all button styles.',
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description:
        "Native HTML disabled. Prevents pointer/keyboard activation, applies the disabled styles, and removes the element from tab order.",
    },
    {
      name: "onClick",
      type: "(event: MouseEvent<HTMLButtonElement>) => void",
      description: "Standard click handler. Fires on mouse click, Enter, and Space when focused.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description:
        "Button content. Mix text, icons, and spinners freely. Don't nest interactive elements (links/buttons) inside.",
    },
    {
      name: "className",
      type: "string",
      description:
        "Extends the variant styles. Pass utility classes for one-off tweaks; prefer adding a new variant for repeated patterns.",
    },
    {
      name: "...props",
      type: "ButtonHTMLAttributes<HTMLButtonElement>",
      description:
        "All standard button attributes (type, name, value, form, autoFocus, aria-*, data-*, etc.).",
    },
  ]
}

/* ── Page ── */

export default function ButtonsPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.button.title")}
      description={t("docs.button.description")}
      category={t("docs.button.category")}
    >
      {/* 1 — Title + description handled by <ComponentPage> above */}

      {/* 2 — Live preview */}
      <Section title={t("docs.button.preview.title")} description={t("docs.button.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Button>{t("docs.button.preview.label")}</Button>
        </PreviewBlock>
      </Section>

      {/* 3 — Installation */}
      <Section
        title={t("docs.button.installation.title")}
        description={t("docs.button.installation.description")}
      >
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.button.installation.filename")} />
      </Section>

      {/* 4 — Usage */}
      <Section title={t("docs.button.usage.title")} description={t("docs.button.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      {/* 5 — Examples */}
      <Section title={t("docs.button.examples.title")} description={t("docs.button.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.button.examples.default.label")}
            description={t("docs.button.examples.default.description")}
            code={EXAMPLE_SNIPPETS.default}
          >
            <Button variant="filled">Default</Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.button.examples.secondary.label")}
            description={t("docs.button.examples.secondary.description")}
            code={EXAMPLE_SNIPPETS.secondary}
          >
            <Button variant="gray">Secondary</Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.button.examples.tonal.label")}
            description={t("docs.button.examples.tonal.description")}
            code={EXAMPLE_SNIPPETS.tonal}
          >
            <Button variant="tonal">Tonal</Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.button.examples.outline.label")}
            description={t("docs.button.examples.outline.description")}
            code={EXAMPLE_SNIPPETS.outline}
          >
            <Button variant="outlineGray">Outline</Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.button.examples.ghost.label")}
            description={t("docs.button.examples.ghost.description")}
            code={EXAMPLE_SNIPPETS.ghost}
          >
            <Button variant="text">Ghost</Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.button.examples.destructive.label")}
            description={t("docs.button.examples.destructive.description")}
            code={EXAMPLE_SNIPPETS.destructive}
          >
            <Button variant="filledDestructive">Destructive</Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.button.examples.withIcon.label")}
            description={t("docs.button.examples.withIcon.description")}
            code={EXAMPLE_SNIPPETS.withIcon}
          >
            <Button>
              <Plus className="size-4" />
              New item
            </Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.button.examples.loading.label")}
            description={t("docs.button.examples.loading.description")}
            code={EXAMPLE_SNIPPETS.loading}
          >
            <Button disabled>
              <Loader2 className="size-4 animate-spin" />
              Saving…
            </Button>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.button.examples.disabled.label")}
            description={t("docs.button.examples.disabled.description")}
            code={EXAMPLE_SNIPPETS.disabled}
          >
            <Button disabled>Disabled</Button>
          </PreviewBlock>
        </div>
      </Section>

      {/* 6 — API / Props table */}
      <Section title={t("docs.button.props.title")} description={t("docs.button.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      {/* 7 — Accessibility */}
      <Section title={t("docs.button.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.button.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.button.accessibility.items.keyboard")}</li>
          <li>{t("docs.button.accessibility.items.focus")}</li>
          <li>{t("docs.button.accessibility.items.aria")}</li>
          <li>{t("docs.button.accessibility.items.nesting")}</li>
          <li>{t("docs.button.accessibility.items.label")}</li>
        </ul>
      </Section>

      {/* 8 — Related components */}
      <UsesTokens foundations={["colors", "radius", "spacing", "motion", "typography"]} />

      <RelatedLinks
        title={t("docs.button.related.title")}
        items={[
          { label: "Input", href: "/forms/input" },
          { label: "Form", href: "/forms/form" },
          { label: "Dialog", href: "/ui/modal-popups" },
          { label: "Toast", href: "/ui/toast" },
        ]}
      />
    </ComponentPage>
  )
}
