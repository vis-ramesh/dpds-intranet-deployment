import { useTranslation } from "react-i18next"

import { Separator } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { Separator } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Separator } from "@dpds-gov/design-system"

export function CustomerCard() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold">Al Futtaim Trading</h3>
      <p className="text-sm text-muted-foreground">Customer · C-1234</p>
      <Separator />
      <p className="text-sm">Trade license renewal in progress.</p>
    </div>
  )
}`

const PREVIEW_SNIPPET = `<Separator />`

const EXAMPLE_SNIPPETS = {
  horizontal: `<Separator />`,
  vertical: `<div className="flex h-8 items-center gap-3">
  <span>Open</span>
  <Separator orientation="vertical" />
  <span>In progress</span>
  <Separator orientation="vertical" />
  <span>Resolved</span>
</div>`,
  withLabel: `// Compose with flexbox — separator on each side of the text.
<div className="flex items-center gap-3 text-xs uppercase text-muted-foreground">
  <Separator className="flex-1" />
  <span>or</span>
  <Separator className="flex-1" />
</div>`,
  inMenu: `// Separator inside a list / menu / nav.
<nav className="flex flex-col gap-1">
  <a>Profile</a>
  <a>Settings</a>
  <Separator />
  <a>Sign out</a>
</nav>`,
  inToolbar: `// Vertical separator between toolbar groups.
<div className="flex h-9 items-center gap-2">
  <Button size="sm" variant="text"><Bold /></Button>
  <Button size="sm" variant="text"><Italic /></Button>
  <Separator orientation="vertical" />
  <Button size="sm" variant="text"><AlignLeft /></Button>
  <Button size="sm" variant="text"><AlignCenter /></Button>
</div>`,
  inCard: `// Section breaks inside a card layout.
<div className="rounded-xl border border-border bg-card p-4">
  <h3 className="font-medium">Customer</h3>
  <p className="text-sm text-muted-foreground">Al Futtaim Trading</p>
  <Separator className="my-3" />
  <p className="text-sm">Trade license renewal in progress.</p>
</div>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      defaultValue: '"horizontal"',
      description: "Horizontal renders a full-width line (1px tall); vertical renders a 1px line that stretches to its container's height — pair with a flex parent.",
    },
    {
      name: "className",
      type: "string",
      description: "Override colour or thickness via Tailwind. The default is bg-border / h-px or w-px depending on orientation.",
    },
  ]
}

/* ── Page ── */

export default function SeparatorPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.separator.title")}
      description={t("docs.separator.description")}
      category={t("docs.separator.category")}
    >
      <Section title={t("docs.separator.preview.title")} description={t("docs.separator.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="flex w-full max-w-md flex-col gap-3">
            <span className="text-sm">Above the line</span>
            <Separator />
            <span className="text-sm">Below the line</span>
          </div>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.separator.installation.title")} description={t("docs.separator.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.separator.installation.filename")} />
      </Section>

      <Section title={t("docs.separator.usage.title")} description={t("docs.separator.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.separator.examples.title")} description={t("docs.separator.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.separator.examples.horizontal.label")}
            description={t("docs.separator.examples.horizontal.description")}
            code={EXAMPLE_SNIPPETS.horizontal}
          >
            <div className="w-full max-w-sm"><Separator /></div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.separator.examples.vertical.label")}
            description={t("docs.separator.examples.vertical.description")}
            code={EXAMPLE_SNIPPETS.vertical}
          >
            <div className="flex h-8 items-center gap-3 text-sm">
              <span>Open</span>
              <Separator orientation="vertical" />
              <span>In progress</span>
              <Separator orientation="vertical" />
              <span>Resolved</span>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.separator.examples.withLabel.label")}
            description={t("docs.separator.examples.withLabel.description")}
            code={EXAMPLE_SNIPPETS.withLabel}
          >
            <div className="flex w-full max-w-sm items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
              <Separator className="flex-1" />
              <span>OR</span>
              <Separator className="flex-1" />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.separator.examples.inMenu.label")}
            description={t("docs.separator.examples.inMenu.description")}
            code={EXAMPLE_SNIPPETS.inMenu}
          >
            <nav className="flex w-44 flex-col gap-1 rounded-md border border-border bg-card p-1.5 text-sm">
              <a className="rounded px-2 py-1 hover:bg-muted" href="#profile">Profile</a>
              <a className="rounded px-2 py-1 hover:bg-muted" href="#settings">Settings</a>
              <Separator className="my-1" />
              <a className="rounded px-2 py-1 hover:bg-muted text-error-700 dark:text-error-300" href="#signout">Sign out</a>
            </nav>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.separator.examples.inToolbar.label")}
            description={t("docs.separator.examples.inToolbar.description")}
            code={EXAMPLE_SNIPPETS.inToolbar}
          >
            <div className="flex h-9 items-center gap-1 rounded-md border border-border bg-card px-1">
              <button className="rounded px-2 py-1 text-xs font-semibold hover:bg-muted">B</button>
              <button className="rounded px-2 py-1 text-xs italic hover:bg-muted">I</button>
              <button className="rounded px-2 py-1 text-xs underline hover:bg-muted">U</button>
              <Separator orientation="vertical" className="mx-1 h-5" />
              <button className="rounded px-2 py-1 text-xs hover:bg-muted">Left</button>
              <button className="rounded px-2 py-1 text-xs hover:bg-muted">Center</button>
              <button className="rounded px-2 py-1 text-xs hover:bg-muted">Right</button>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.separator.examples.inCard.label")}
            description={t("docs.separator.examples.inCard.description")}
            code={EXAMPLE_SNIPPETS.inCard}
          >
            <div className="w-full max-w-sm rounded-xl border border-border bg-card p-4">
              <h3 className="font-medium">Customer</h3>
              <p className="text-sm text-muted-foreground">Al Futtaim Trading</p>
              <Separator className="my-3" />
              <p className="text-sm">Trade license renewal in progress.</p>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.separator.props.title")} description={t("docs.separator.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.separator.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.separator.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.separator.accessibility.items.role")}</li>
          <li>{t("docs.separator.accessibility.items.heading")}</li>
          <li>{t("docs.separator.accessibility.items.vertical")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "spacing"]} />

      <RelatedLinks
        title={t("docs.separator.related.title")}
        items={[
          { label: "Stack", href: "/ui/stack" },
          { label: "Container", href: "/ui/container" },
        ]}
      />
    </ComponentPage>
  )
}
