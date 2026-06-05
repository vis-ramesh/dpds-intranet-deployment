import { useTranslation } from "react-i18next"
import { CheckCircle2 } from "lucide-react"

import {
  FoundationPage,
  RelatedLinks,
  Section,
} from "@/components/docs"

/* ── Page ── */

export default function AccessibilityPage() {
  const { t } = useTranslation()

  return (
    <FoundationPage
      title={t("foundations.accessibility.title")}
      description={t("foundations.accessibility.description")}
    >
      <ProseSection
        title={t("foundations.accessibility.keyboard.title")}
        intro={t("foundations.accessibility.keyboard.intro")}
        items={[
          t("foundations.accessibility.keyboard.items.tabOrder"),
          t("foundations.accessibility.keyboard.items.focusRing"),
          t("foundations.accessibility.keyboard.items.shortcuts"),
          t("foundations.accessibility.keyboard.items.trap"),
          t("foundations.accessibility.keyboard.items.restore"),
        ]}
      />

      <ProseSection
        title={t("foundations.accessibility.aria.title")}
        intro={t("foundations.accessibility.aria.intro")}
        items={[
          t("foundations.accessibility.aria.items.semantic"),
          t("foundations.accessibility.aria.items.labelOrLabelledby"),
          t("foundations.accessibility.aria.items.describedby"),
          t("foundations.accessibility.aria.items.current"),
          t("foundations.accessibility.aria.items.live"),
          t("foundations.accessibility.aria.items.divButton"),
        ]}
      />

      <ProseSection
        title={t("foundations.accessibility.contrast.title")}
        intro={t("foundations.accessibility.contrast.intro")}
        items={[
          t("foundations.accessibility.contrast.items.normal"),
          t("foundations.accessibility.contrast.items.large"),
          t("foundations.accessibility.contrast.items.nonText"),
          t("foundations.accessibility.contrast.items.tokens"),
          t("foundations.accessibility.contrast.items.tools"),
        ]}
      />

      <ProseSection
        title={t("foundations.accessibility.motion.title")}
        intro={t("foundations.accessibility.motion.intro")}
        items={[
          t("foundations.accessibility.motion.items.respect"),
          t("foundations.accessibility.motion.items.notSoleSignal"),
          t("foundations.accessibility.motion.items.scroll"),
          t("foundations.accessibility.motion.items.parallax"),
        ]}
      />

      <ProseSection
        title={t("foundations.accessibility.touch.title")}
        intro={t("foundations.accessibility.touch.intro")}
        items={[
          t("foundations.accessibility.touch.items.mobile"),
          t("foundations.accessibility.touch.items.desktop"),
          t("foundations.accessibility.touch.items.spacing"),
          t("foundations.accessibility.touch.items.iconButtons"),
        ]}
      />

      <Section
        title={t("foundations.accessibility.checklist.title")}
        description={t("foundations.accessibility.checklist.description")}
      >
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5">
          <ul className="flex flex-col gap-3">
            {[
              "tab",
              "screenReader",
              "contrast",
              "reducedMotion",
              "keyboard",
              "labels",
              "responsive",
              "zoom",
            ].map((key) => (
              <li key={key} className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-300">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success-600 dark:text-success-300" />
                <span>{t(`foundations.accessibility.checklist.items.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        title={t("foundations.accessibility.deeper.title")}
        description={t("foundations.accessibility.deeper.description")}
      >
        <ul className="flex flex-col gap-2 text-sm">
          {[
            { href: "https://www.w3.org/WAI/WCAG21/quickref/", label: "WCAG 2.1 Quick Reference" },
            { href: "https://www.w3.org/WAI/ARIA/apg/patterns/", label: "ARIA Authoring Practices Guide (APG)" },
            { href: "https://www.deque.com/axe/", label: "axe DevTools — browser extension for live audits" },
            { href: "https://webaim.org/articles/contrast/", label: "WebAIM: Understanding contrast ratios" },
            { href: "https://inclusive-components.design/", label: "Inclusive Components — pattern-by-pattern guide by Heydon Pickering" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-primary-700 dark:text-primary-300 hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <RelatedLinks
        title={t("foundations.accessibility.related.title")}
        items={[
          { label: "Colors", href: "/foundations/colors" },
          { label: "Motion", href: "/foundations/motion" },
          { label: "Typography", href: "/foundations/typography" },
          { label: "Iconography", href: "/foundations/iconography" },
        ]}
      />
    </FoundationPage>
  )
}

/* ── Prose-heavy section helper: title, intro paragraph, bulleted rules. ── */
function ProseSection({
  title,
  intro,
  items,
}: {
  title: string
  intro: string
  items: string[]
}) {
  return (
    <Section title={title}>
      <p className="max-w-3xl text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
        {intro}
      </p>
      <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Section>
  )
}
