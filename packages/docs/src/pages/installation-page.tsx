import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CodeXml,
  Component,
  GitBranch,
  History,
  KeyRound,
  RefreshCw,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from "@dpds-gov/design-system"
import { CodeBlock, DocsPage, Prose, Section } from "@/components/docs"

/* ── Code snippets (kept as constants so escaping stays clean) ────── */

const CLONE_SNIPPET = `cd ~/Documents/Sandbox    # or wherever you keep code
git clone https://github.com/dpds-gov/<your-service-name>.git
cd <your-service-name>
cp .env.example .env`

const INSTALL_SNIPPET = `npm install
npm run dev`

const SKILL_SNIPPET = `# Detect the AI tools in this project and install the skill
npx @dpds-gov/design-system add skill

# Or target one tool / every supported tool
npx @dpds-gov/design-system add skill --target cursor
npx @dpds-gov/design-system add skill --all`

const BUMP_SNIPPET = `npm install @dpds-gov/design-system@latest
git add package.json package-lock.json
git commit -m "chore: bump @dpds-gov/design-system to latest"`

/* ── Static, language-neutral chips ──────────────────────────────── */

const TECH_STACK = ["Vite", "React", "TypeScript", "Tailwind v4"]
const SKILL_TOOLS = ["Claude Code", "Cursor", "Windsurf", "GitHub Copilot", "Antigravity"]

/* ── Prerequisites (icon + i18n key) ─────────────────────────────── */

const PREREQS: { key: "node" | "github" | "pat" | "editor"; icon: LucideIcon }[] = [
  { key: "node", icon: Server },
  { key: "github", icon: GitBranch },
  { key: "pat", icon: KeyRound },
  { key: "editor", icon: CodeXml },
]

/* ── Troubleshooting rows ────────────────────────────────────────── */

interface TroubleRow {
  /** i18n key suffix under docs.gettingStarted.installation.troubleshooting.rows */
  key: "401" | "404" | "lightMode" | "ci"
}

const TROUBLE_ROWS: TroubleRow[] = [
  { key: "401" },
  { key: "404" },
  { key: "lightMode" },
  { key: "ci" },
]

/* ── Next-steps cards ─────────────────────────────────────────────── */

interface NextCard {
  /** i18n key suffix under docs.gettingStarted.installation.nextSteps.cards */
  key: "claudeMd" | "components" | "changelog"
  href: string
  external: boolean
  icon: LucideIcon
}

const NEXT_CARDS: NextCard[] = [
  { key: "claudeMd", href: "https://github.com/dpds-gov/service-starter/blob/main/CLAUDE.md", external: true, icon: BookOpen },
  { key: "components", href: "/buttons", external: false, icon: Component },
  { key: "changelog", href: "/docs/changelog", external: false, icon: History },
]

/* ── Small presentational helpers ────────────────────────────────── */

/** A numbered step list rendered as cards with a circular index badge. */
function StepList({ items }: { items: ReactNode[] }) {
  return (
    <ol className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold font-mono text-primary">
            {i + 1}
          </span>
          <div className="pt-0.5 text-sm leading-relaxed text-gray-700 dark:text-slate-300">{item}</div>
        </li>
      ))}
    </ol>
  )
}

/** Square icon chip used across cards and section accents. */
function IconChip({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
        className,
      )}
    >
      <Icon className="size-5" aria-hidden="true" />
    </span>
  )
}

export default function InstallationPage() {
  const { t } = useTranslation()

  const tInstall = (k: string) => t(`docs.gettingStarted.installation.${k}`)

  const patSteps = (["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((s) =>
    tInstall(`pat.steps.${s}`),
  )
  const repoSteps = (["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((s) =>
    tInstall(`repo.steps.${s}`),
  )
  const firstServiceSteps: ReactNode[] = [
    tInstall("firstService.steps.s1"),
    tInstall("firstService.steps.s2"),
    <>
      {tInstall("firstService.steps.s3.prefix")}{" "}
      <em className="font-medium not-italic text-gray-900 dark:text-slate-100">
        “{tInstall("firstService.steps.s3.prompt")}”
      </em>
    </>,
    tInstall("firstService.steps.s4"),
  ]

  return (
    <DocsPage
      eyebrow={t("docs.gettingStarted.eyebrow")}
      title={t("docs.gettingStarted.installation.title")}
      description={t("docs.gettingStarted.installation.description")}
    >
      {/* What you're building — intro + tech-stack chips */}
      <Section title={tInstall("whatBuilding.title")}>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <Badge key={tech} variant="neutral" size="sm" className="font-mono">
              {tech}
            </Badge>
          ))}
        </div>
        <Prose>
          <p>{tInstall("whatBuilding.p1")}</p>
          <p>{tInstall("whatBuilding.p2")}</p>
        </Prose>
      </Section>

      {/* Prerequisites — icon card grid */}
      <Section title={tInstall("prerequisites.title")}>
        <div className="grid gap-3 sm:grid-cols-2">
          {PREREQS.map(({ key, icon }) => (
            <div
              key={key}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
            >
              <IconChip icon={icon} />
              <p className="pt-0.5 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
                {tInstall(`prerequisites.items.${key}`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Personal Access Token — numbered steps */}
      <Section title={tInstall("pat.title")} description={tInstall("pat.description")}>
        <StepList items={patSteps} />
      </Section>

      {/* Create the repo — numbered steps + owner callout */}
      <Section title={tInstall("repo.title")} description={tInstall("repo.description")}>
        <StepList items={repoSteps} />
        <Alert variant="warning">
          <AlertTriangle className="size-4" aria-hidden="true" />
          <AlertTitle>{tInstall("repo.ownerCallout.title")}</AlertTitle>
          <AlertDescription>{tInstall("repo.ownerCallout.body")}</AlertDescription>
        </Alert>
      </Section>

      {/* Local setup — clone, install, run */}
      <Section title={tInstall("localSetup.title")}>
        <Prose>
          <p>{tInstall("localSetup.intro")}</p>
        </Prose>
        <CodeBlock code={CLONE_SNIPPET} language="bash" filename="Terminal" />
        <Prose>
          <p>{tInstall("localSetup.envInstruction")}</p>
        </Prose>
        <CodeBlock code={INSTALL_SNIPPET} language="bash" filename="Terminal" />
        <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <IconChip icon={Terminal} />
          <p className="pt-1 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
            {tInstall("localSetup.openUrl")}
          </p>
        </div>
      </Section>

      {/* Install the DPDS skill — CLI + tool chips */}
      <Section title={tInstall("skill.title")}>
        <Prose>
          <p>{tInstall("skill.intro")}</p>
        </Prose>
        <CodeBlock code={SKILL_SNIPPET} language="bash" filename="Terminal" />
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
          </span>
          {SKILL_TOOLS.map((tool) => (
            <Badge key={tool} variant="neutral" size="sm">
              {tool}
            </Badge>
          ))}
        </div>
        <Prose>
          <p>{tInstall("skill.autoNote")}</p>
          <p>{tInstall("skill.refresh")}</p>
        </Prose>
      </Section>

      {/* Build your first service — numbered steps + placeholder note */}
      <Section title={tInstall("firstService.title")} description={tInstall("firstService.description")}>
        <StepList items={firstServiceSteps} />
        <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
          <Rocket className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {tInstall("firstService.placeholderNote")}
          </p>
        </div>
      </Section>

      {/* Stay up to date — two cards + bump snippet */}
      <Section title={tInstall("stayUpToDate.title")}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <IconChip icon={RefreshCw} className="size-8" />
              <span className="font-semibold text-gray-900 dark:text-slate-100">
                {tInstall("stayUpToDate.dependabot.label")}
              </span>
              <Badge variant="success" size="sm">
                {tInstall("stayUpToDate.recommendedLabel")}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tInstall("stayUpToDate.dependabot.body")}
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <IconChip icon={Wrench} className="size-8" />
              <span className="font-semibold text-gray-900 dark:text-slate-100">
                {tInstall("stayUpToDate.manual.label")}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tInstall("stayUpToDate.manual.body")}
            </p>
          </div>
        </div>
        <CodeBlock code={BUMP_SNIPPET} language="bash" filename="Terminal" />
      </Section>

      {/* Troubleshooting — bordered table */}
      <Section title={tInstall("troubleshooting.title")}>
        <div className="overflow-hidden rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tInstall("troubleshooting.cols.symptom")}</TableHead>
                <TableHead>{tInstall("troubleshooting.cols.cause")}</TableHead>
                <TableHead>{tInstall("troubleshooting.cols.fix")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TROUBLE_ROWS.map((row) => (
                <TableRow key={row.key}>
                  <TableCell className="align-top">
                    <code className="font-mono text-xs">
                      {tInstall(`troubleshooting.rows.${row.key}.symptom`)}
                    </code>
                  </TableCell>
                  <TableCell className="align-top text-sm text-muted-foreground">
                    {tInstall(`troubleshooting.rows.${row.key}.cause`)}
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    {tInstall(`troubleshooting.rows.${row.key}.fix`)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      {/* Next steps — link cards */}
      <Section
        title={tInstall("nextSteps.title")}
        description={tInstall("nextSteps.description")}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {NEXT_CARDS.map((card) => {
            const title = tInstall(`nextSteps.cards.${card.key}.title`)
            const body = tInstall(`nextSteps.cards.${card.key}.body`)
            const link = tInstall(`nextSteps.cards.${card.key}.link`)
            const Icon = card.icon
            const externalLabel = tInstall("nextSteps.externalLabel")

            const cardInner = (
              <>
                <div className="flex items-center justify-between">
                  <IconChip icon={Icon} />
                  {card.external && (
                    <Badge variant="neutral" size="sm">
                      {externalLabel}
                    </Badge>
                  )}
                </div>
                <p className="text-base font-semibold text-gray-900 dark:text-slate-100">{title}</p>
                <p className="text-sm text-gray-600 dark:text-slate-400">{body}</p>
                <p className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {link}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </p>
              </>
            )

            const wrapperClass = cn(
              "group flex h-full flex-col gap-3 rounded-xl border border-border p-5 outline-none transition-colors",
              "hover:border-primary/50",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )

            if (card.external) {
              return (
                <a
                  key={card.key}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={wrapperClass}
                >
                  {cardInner}
                </a>
              )
            }

            return (
              <Link key={card.key} to={card.href} className={wrapperClass}>
                {cardInner}
              </Link>
            )
          })}
        </div>
      </Section>
    </DocsPage>
  )
}
