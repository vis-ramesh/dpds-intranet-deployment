import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { Badge } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { ThemeToggle } from "@dpds-gov/design-system"
import {
  CodeBlock,
  DocsPage,
  Prose,
  RelatedLinks,
  Section,
} from "@/components/docs"

const STORAGE_KEY = "vite-ui-theme"

const WIRING_SNIPPET = `import { ThemeToggle } from "@dpds-gov/design-system"

export function AppHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      {/* …other header items */}
      <ThemeToggle align="end" />
    </header>
  )
}`

const HOOK_SNIPPET = `import { useTheme } from "@dpds-gov/design-system"

function CustomToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle theme
    </button>
  )
}`

const PREPAINT_SNIPPET = `<!-- Drop this in index.html <head> before <body> renders. -->
<script>
  (function () {
    var stored = localStorage.getItem("${STORAGE_KEY}")
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    var theme =
      stored === "dark" || (stored === "system" && prefersDark) || (!stored && prefersDark)
        ? "dark"
        : "light"
    document.documentElement.classList.toggle("dark", theme === "dark")
  })()
</script>`

export default function DarkModePage() {
  const { t } = useTranslation()
  const themeLabels = {
    toggleTheme: t("components.themeToggle.label"),
    light: t("components.themeToggle.light"),
    dark: t("components.themeToggle.dark"),
    system: t("components.themeToggle.system"),
  }

  return (
    <DocsPage
      eyebrow={t("docs.gettingStarted.eyebrow")}
      title={t("docs.gettingStarted.darkMode.title")}
      description={t("docs.gettingStarted.darkMode.description")}
    >
      {/* 1. How it works */}
      <Section title={t("docs.gettingStarted.darkMode.howItWorks.title")}>
        <Prose>
          <p>{t("docs.gettingStarted.darkMode.howItWorks.p1")}</p>
          <p>{t("docs.gettingStarted.darkMode.howItWorks.p2")}</p>
        </Prose>
      </Section>

      {/* 2. Live demo */}
      <Section
        title={t("docs.gettingStarted.darkMode.liveDemo.title")}
        description={t("docs.gettingStarted.darkMode.liveDemo.description")}
      >
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t("docs.gettingStarted.darkMode.liveDemo.toggleLabel")}
              </p>
              <ThemeToggle align="start" labels={themeLabels} />
              <p className="max-w-xs text-xs text-muted-foreground">
                {t("docs.gettingStarted.darkMode.liveDemo.hint")}
              </p>
            </div>

            <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">
                  {t("docs.gettingStarted.darkMode.liveDemo.preview.title")}
                </p>
                <Badge variant="success" size="sm">
                  {t("docs.gettingStarted.darkMode.liveDemo.preview.badge")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("docs.gettingStarted.darkMode.liveDemo.preview.body")}
              </p>
              <Button size="md" className="w-fit">
                {t("docs.gettingStarted.darkMode.liveDemo.preview.cta")}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Wiring the toggle */}
      <Section title={t("docs.gettingStarted.darkMode.wiring.title")}>
        <Prose>
          <p>{t("docs.gettingStarted.darkMode.wiring.intro")}</p>
        </Prose>
        <CodeBlock code={WIRING_SNIPPET} language="tsx" filename="src/components/app-header.tsx" />
        <Prose>
          <p>{t("docs.gettingStarted.darkMode.wiring.custom")}</p>
        </Prose>
        <CodeBlock code={HOOK_SNIPPET} language="tsx" filename="src/components/custom-toggle.tsx" />
        <Prose>
          <h3>{t("docs.gettingStarted.darkMode.wiring.api.title")}</h3>
          <ul>
            <li>
              <strong>theme</strong>
              {" — "}
              {t("docs.gettingStarted.darkMode.wiring.api.theme")}
            </li>
            <li>
              <strong>setTheme(theme)</strong>
              {" — "}
              {t("docs.gettingStarted.darkMode.wiring.api.setTheme")}
            </li>
          </ul>
          <p>{t("docs.gettingStarted.darkMode.wiring.api.note")}</p>
        </Prose>
      </Section>

      {/* 4. Persistence */}
      <Section title={t("docs.gettingStarted.darkMode.persistence.title")}>
        <Prose>
          <p>
            {t("docs.gettingStarted.darkMode.persistence.storage.before")}
            <code>{STORAGE_KEY}</code>
            {t("docs.gettingStarted.darkMode.persistence.storage.after")}
          </p>
          <p>{t("docs.gettingStarted.darkMode.persistence.coldLoad")}</p>
          <p>{t("docs.gettingStarted.darkMode.persistence.system")}</p>
        </Prose>
      </Section>

      {/* 5. Tokens that swap */}
      <Section title={t("docs.gettingStarted.darkMode.tokens.title")}>
        <Prose>
          <p>
            {t("docs.gettingStarted.darkMode.tokens.body.before")}
            <Link to="/docs/theming">{t("docs.gettingStarted.darkMode.tokens.link")}</Link>
            {t("docs.gettingStarted.darkMode.tokens.body.after")}
          </p>
        </Prose>
      </Section>

      {/* 6. Caveats */}
      <Section title={t("docs.gettingStarted.darkMode.caveats.title")}>
        <Prose>
          <h3>{t("docs.gettingStarted.darkMode.caveats.flash.title")}</h3>
          <p>{t("docs.gettingStarted.darkMode.caveats.flash.body")}</p>
        </Prose>
        <CodeBlock code={PREPAINT_SNIPPET} language="html" filename="index.html" />
        <Prose>
          <h3>{t("docs.gettingStarted.darkMode.caveats.brand.title")}</h3>
          <p>
            {t("docs.gettingStarted.darkMode.caveats.brand.body.before")}
            <Link to="/docs/theming">{t("docs.gettingStarted.darkMode.caveats.brand.link")}</Link>
            {t("docs.gettingStarted.darkMode.caveats.brand.body.after")}
          </p>
        </Prose>
      </Section>

      {/* 7. Related */}
      <RelatedLinks
        title={t("docs.gettingStarted.darkMode.related.title")}
        items={[
          { label: t("docs.gettingStarted.darkMode.related.theming"), href: "/docs/theming" },
          { label: t("docs.gettingStarted.darkMode.related.colors"), href: "/foundations/colors" },
        ]}
      />
    </DocsPage>
  )
}
