import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ArrowRight, Component, Layers, Palette, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@dpds-gov/design-system"
import { cn } from "@dpds-gov/design-system"
import { DocsPage, Prose, Section } from "@/components/docs"

interface StartCard {
  /** i18n key suffix under docs.gettingStarted.introduction.start.cards */
  key: "foundations" | "components" | "patterns"
  href: string
  icon: LucideIcon
  exists: boolean
}

const START_CARDS: StartCard[] = [
  { key: "foundations", href: "/foundations/colors", icon: Palette, exists: true },
  { key: "components", href: "/buttons", icon: Component, exists: true },
  { key: "patterns", href: "/patterns/login", icon: Layers, exists: true },
]

export default function IntroductionPage() {
  const { t } = useTranslation()

  return (
    <DocsPage
      eyebrow={t("docs.gettingStarted.eyebrow")}
      title={t("docs.gettingStarted.introduction.title")}
      description={t("docs.gettingStarted.introduction.description")}
    >
      <Badge variant="neutral" size="md" className="w-fit font-mono">
        <Sparkles className="size-3" aria-hidden="true" />
        {t("docs.gettingStarted.introduction.versionBadge")}
      </Badge>

      <Section title={t("docs.gettingStarted.introduction.whatIsThis.title")}>
        <Prose>
          <p>{t("docs.gettingStarted.introduction.whatIsThis.p1")}</p>
          <p>{t("docs.gettingStarted.introduction.whatIsThis.p2")}</p>
          <p>{t("docs.gettingStarted.introduction.whatIsThis.p3")}</p>
        </Prose>
      </Section>

      <Section title={t("docs.gettingStarted.introduction.whoItsFor.title")}>
        <Prose>
          <p>{t("docs.gettingStarted.introduction.whoItsFor.p1")}</p>
        </Prose>
      </Section>

      <Section title={t("docs.gettingStarted.introduction.inScope.title")}>
        <Prose>
          <ul>
            <li>
              <strong>{t("docs.gettingStarted.introduction.inScope.items.foundations.title")}</strong>
              {" — "}
              {t("docs.gettingStarted.introduction.inScope.items.foundations.body")}
            </li>
            <li>
              <strong>{t("docs.gettingStarted.introduction.inScope.items.components.title")}</strong>
              {" — "}
              {t("docs.gettingStarted.introduction.inScope.items.components.body")}
            </li>
            <li>
              <strong>{t("docs.gettingStarted.introduction.inScope.items.patterns.title")}</strong>
              {" — "}
              {t("docs.gettingStarted.introduction.inScope.items.patterns.body")}
            </li>
          </ul>
        </Prose>
      </Section>

      <Section title={t("docs.gettingStarted.introduction.outOfScope.title")}>
        <Prose>
          <ul>
            <li>{t("docs.gettingStarted.introduction.outOfScope.items.scaffolds")}</li>
            <li>{t("docs.gettingStarted.introduction.outOfScope.items.marketing")}</li>
            <li>{t("docs.gettingStarted.introduction.outOfScope.items.customer")}</li>
          </ul>
        </Prose>
      </Section>

      <Section
        title={t("docs.gettingStarted.introduction.start.title")}
        description={t("docs.gettingStarted.introduction.start.description")}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {START_CARDS.map((card) => {
            const title = t(`docs.gettingStarted.introduction.start.cards.${card.key}.title`)
            const body = t(`docs.gettingStarted.introduction.start.cards.${card.key}.body`)
            const link = t(`docs.gettingStarted.introduction.start.cards.${card.key}.link`)
            const Icon = card.icon
            const comingSoonLabel = t("docs.gettingStarted.introduction.start.comingSoon")

            if (!card.exists) {
              return (
                <div
                  key={card.key}
                  aria-disabled
                  className="flex flex-col gap-3 rounded-xl border border-border p-5 opacity-60 cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <Badge variant="warning" size="sm">
                      {comingSoonLabel}
                    </Badge>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-slate-100">{title}</p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">{body}</p>
                </div>
              )
            }

            return (
              <Link
                key={card.key}
                to={card.href}
                className={cn(
                  "group flex h-full flex-col gap-3 rounded-xl border border-border p-5 outline-none transition-colors",
                  "hover:border-primary/50",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <p className="text-base font-semibold text-gray-900 dark:text-slate-100">{title}</p>
                <p className="text-sm text-gray-600 dark:text-slate-400">{body}</p>
                <p className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {link}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </p>
              </Link>
            )
          })}
        </div>
      </Section>

      <Section title={t("docs.gettingStarted.introduction.conventions.title")}>
        <Prose>
          <p>{t("docs.gettingStarted.introduction.conventions.intro")}</p>
          <ul>
            <li>
              <strong>{t("docs.gettingStarted.introduction.conventions.items.component.title")}</strong>
              {" — "}
              {t("docs.gettingStarted.introduction.conventions.items.component.body")}
            </li>
            <li>
              <strong>{t("docs.gettingStarted.introduction.conventions.items.foundation.title")}</strong>
              {" — "}
              {t("docs.gettingStarted.introduction.conventions.items.foundation.body")}
            </li>
            <li>
              <strong>{t("docs.gettingStarted.introduction.conventions.items.pattern.title")}</strong>
              {" — "}
              {t("docs.gettingStarted.introduction.conventions.items.pattern.body")}
            </li>
          </ul>
        </Prose>
      </Section>
    </DocsPage>
  )
}
