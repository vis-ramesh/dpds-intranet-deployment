import { useTranslation } from "react-i18next"

import { CodeBlock, DocsPage, Prose, Section } from "@/components/docs"

const REPO_TREE = `src/
  components/
    ui/          # primitive components (Button, Input, ...)
    docs/        # doc-site helpers (DocsPage, ComponentPage, CodeBlock, ...)
    app-sidebar.tsx
    layout.tsx
    theme-provider.tsx
  pages/         # one page per route
  patterns/      # full-screen pattern compositions (login, signup, ...)
  locales/       # i18n strings (en.json, ar.json)
  data/          # static data (changelog.json, ...)
  lib/           # utilities (cn, ...)
  hooks/         # shared hooks (useIsRtl, ...)
  stores/        # Zustand / context stores
  assets/        # static images and SVGs
  App.tsx        # router + layout shell
  main.tsx       # Vite entry
  i18n.ts        # i18next bootstrap
  index.css      # Tailwind + design tokens`

const CONSUMER_TREE = `src/
  components/
    ui/          # imports from @serviceportal/ui
    features/    # app-specific composite components
  pages/         # app routes
  hooks/         # app-specific hooks
  lib/           # app utilities`

const WRAP_EXAMPLE = `// ❌ Don't fork — do not edit the source of a DS primitive in components/ui/.
// ✅ Compose — build your bespoke component in features/, using DS primitives.

// src/components/features/customer-table.tsx
import { Badge } from "@dpds-gov/design-system"
import { Avatar, AvatarFallback, AvatarImage } from "@dpds-gov/design-system"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dpds-gov/design-system"

import type { Customer } from "@/types"

export function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Tier</TableHead>
          <TableHead>Open tickets</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((c) => (
          <TableRow key={c.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={c.avatarUrl} />
                  <AvatarFallback>{c.initials}</AvatarFallback>
                </Avatar>
                <span>{c.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={c.tier === "enterprise" ? "success" : "neutral"}>
                {c.tier}
              </Badge>
            </TableCell>
            <TableCell>{c.openTickets}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}`

export default function ProjectStructurePage() {
  const { t } = useTranslation()

  return (
    <DocsPage
      eyebrow={t("docs.gettingStarted.eyebrow")}
      title={t("docs.gettingStarted.projectStructure.title")}
      description={t("docs.gettingStarted.projectStructure.description")}
    >
      <Section title={t("docs.gettingStarted.projectStructure.repo.title")}>
        <Prose>
          <p>{t("docs.gettingStarted.projectStructure.repo.intro")}</p>
        </Prose>
        <CodeBlock code={REPO_TREE} language="bash" filename="src/" />
        <Prose>
          <h3>{t("docs.gettingStarted.projectStructure.repo.folders.componentsUi.title")}</h3>
          <p>{t("docs.gettingStarted.projectStructure.repo.folders.componentsUi.body")}</p>

          <h3>{t("docs.gettingStarted.projectStructure.repo.folders.componentsDocs.title")}</h3>
          <p>{t("docs.gettingStarted.projectStructure.repo.folders.componentsDocs.body")}</p>

          <h3>{t("docs.gettingStarted.projectStructure.repo.folders.pages.title")}</h3>
          <p>{t("docs.gettingStarted.projectStructure.repo.folders.pages.body")}</p>

          <h3>{t("docs.gettingStarted.projectStructure.repo.folders.patterns.title")}</h3>
          <p>{t("docs.gettingStarted.projectStructure.repo.folders.patterns.body")}</p>

          <h3>{t("docs.gettingStarted.projectStructure.repo.folders.locales.title")}</h3>
          <p>{t("docs.gettingStarted.projectStructure.repo.folders.locales.body")}</p>

          <h3>{t("docs.gettingStarted.projectStructure.repo.folders.data.title")}</h3>
          <p>{t("docs.gettingStarted.projectStructure.repo.folders.data.body")}</p>

          <h3>{t("docs.gettingStarted.projectStructure.repo.folders.lib.title")}</h3>
          <p>{t("docs.gettingStarted.projectStructure.repo.folders.lib.body")}</p>

          <h3>{t("docs.gettingStarted.projectStructure.repo.folders.hooks.title")}</h3>
          <p>{t("docs.gettingStarted.projectStructure.repo.folders.hooks.body")}</p>
        </Prose>
      </Section>

      <Section title={t("docs.gettingStarted.projectStructure.consumer.title")}>
        <Prose>
          <p>{t("docs.gettingStarted.projectStructure.consumer.intro")}</p>
        </Prose>
        <CodeBlock code={CONSUMER_TREE} language="bash" filename="your-app/src/" />
        <Prose>
          <h3>{t("docs.gettingStarted.projectStructure.consumer.wrapNotFork.title")}</h3>
          <p>{t("docs.gettingStarted.projectStructure.consumer.wrapNotFork.p1")}</p>
          <p>{t("docs.gettingStarted.projectStructure.consumer.wrapNotFork.p2")}</p>
        </Prose>
        <CodeBlock
          code={WRAP_EXAMPLE}
          language="tsx"
          filename="src/components/features/customer-table.tsx"
        />
        <Prose>
          <p>{t("docs.gettingStarted.projectStructure.consumer.wrapNotFork.p3")}</p>
        </Prose>
      </Section>
    </DocsPage>
  )
}
