import { useState } from "react"
import { useTranslation } from "react-i18next"

import {
  CodeBlock,
  FoundationPage,
  RelatedLinks,
  Section,
} from "@/components/docs"

/* ── Motion token data — mirrors the @theme block in src/index.css ── */

interface DurationStep {
  token: string
  cssVar: string
  tailwind: string
  ms: string
}

const DURATIONS: DurationStep[] = [
  { token: "instant", cssVar: "--duration-instant", tailwind: "duration-instant", ms: "0ms" },
  { token: "fast",    cssVar: "--duration-fast",    tailwind: "duration-fast",    ms: "150ms" },
  { token: "normal",  cssVar: "--duration-normal",  tailwind: "duration-normal",  ms: "300ms" },
  { token: "slow",    cssVar: "--duration-slow",    tailwind: "duration-slow",    ms: "500ms" },
  { token: "slower",  cssVar: "--duration-slower",  tailwind: "duration-slower",  ms: "700ms" },
]

interface EasingStep {
  token: string
  cssVar: string
  tailwind: string
  value: string
  feel: string
}

const EASINGS: EasingStep[] = [
  { token: "linear",  cssVar: "—",             tailwind: "ease-linear",  value: "linear",                            feel: "Constant speed. Best for spinners and progress bars." },
  { token: "in",      cssVar: "—",             tailwind: "ease-in",      value: "cubic-bezier(0.4, 0, 1, 1)",        feel: "Starts slow, accelerates. Use when something exits." },
  { token: "out",     cssVar: "—",             tailwind: "ease-out",     value: "cubic-bezier(0, 0, 0.2, 1)",        feel: "Starts fast, decelerates. Use when something enters." },
  { token: "in-out",  cssVar: "—",             tailwind: "ease-in-out",  value: "cubic-bezier(0.4, 0, 0.2, 1)",      feel: "Slow on both ends. Smooth for paired in+out transitions." },
  { token: "custom",  cssVar: "--ease-custom", tailwind: "ease-custom",  value: "cubic-bezier(0.4, 0, 0.2, 1)",      feel: "Brand default. Matches Material's standard curve." },
  { token: "spring",  cssVar: "--ease-spring", tailwind: "ease-spring",  value: "cubic-bezier(0.34, 1.56, 0.64, 1)", feel: "Overshoots and settles. Use sparingly — for delight moments only." },
]

const OVERRIDE_SNIPPET = `/* app/styles/brand.css — adjust motion timings */
:root {
  /* Durations. Match perceived weight to component size:
     small (toast badge) → fast, large (page transition) → slow. */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;

  /* Easings. Tailwind's ease-in / ease-out / ease-in-out / ease-linear
     are built in; --ease-custom and --ease-spring are additive. */
  --ease-custom: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Respect users who request reduced motion. The design system
   doesn't enforce this for you — your app stylesheet should: */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`

/* ── A single token row that owns its own hover/focus state.
   Drives the ball's transform + transition entirely from inline style so each
   row's duration and easing are guaranteed to apply independently. ── */

interface TokenRowProps {
  title: string
  cssVarLabel: string
  metaLabel: string
  /** transition-duration value (e.g. "150ms" or "var(--duration-fast)"). */
  duration: string
  /** transition-timing-function value (e.g. "linear" or "cubic-bezier(...)" ). */
  timing: string
  /** Optional descriptive text shown on the right (e.g. easing "feel"). */
  rightLabel?: string
}

function TokenRow({ title, cssVarLabel, metaLabel, duration, timing, rightLabel }: TokenRowProps) {
  const [active, setActive] = useState(false)
  const trackPx = 160
  const ballPx = 12
  const targetPx = trackPx - ballPx - 4

  return (
    <div
      className="grid grid-cols-[140px_180px_1fr] items-center gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-4 cursor-pointer focus-within:ring-2 focus-within:ring-ring/40"
      role="button"
      tabIndex={0}
      aria-label={`Demo ${title}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{title}</span>
        <code className="text-[11px] font-mono text-gray-500 dark:text-slate-400">{cssVarLabel}</code>
        <code className="text-[11px] font-mono text-gray-400 dark:text-slate-500 truncate">{metaLabel}</code>
      </div>

      <div className="flex justify-start">
        <div
          className="relative h-3 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden"
          style={{ width: `${trackPx}px` }}
        >
          <div
            className="absolute top-0 h-full rounded-full bg-primary will-change-transform"
            style={{
              width: `${ballPx}px`,
              left: "2px",
              transform: active ? `translateX(${targetPx}px)` : "translateX(0)",
              transitionProperty: "transform",
              transitionDuration: duration,
              transitionTimingFunction: timing,
            }}
          />
        </div>
      </div>

      <span className="hidden md:block text-xs text-gray-500 dark:text-slate-400">
        {rightLabel ?? "Hover or focus to play"}
      </span>
    </div>
  )
}

/* ── Page ── */

export default function MotionPage() {
  const { t } = useTranslation()

  return (
    <FoundationPage
      title={t("foundations.motion.title")}
      description={t("foundations.motion.description")}
    >
      <Section title={t("foundations.motion.overview.title")}>
        <p className="max-w-3xl text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
          {t("foundations.motion.overview.body")}
        </p>
        <p className="mt-2 text-xs text-gray-500 dark:text-slate-400 italic">
          {t("foundations.motion.overview.hint")}
        </p>
      </Section>

      <Section
        title={t("foundations.motion.durations.title")}
        description={t("foundations.motion.durations.description")}
      >
        <div className="flex flex-col gap-2">
          {DURATIONS.map((d) => (
            <TokenRow
              key={d.token}
              title={d.token}
              cssVarLabel={d.cssVar}
              metaLabel={`${d.tailwind} · ${d.ms}`}
              duration={d.ms}
              timing="cubic-bezier(0.4, 0, 0.2, 1)"
            />
          ))}
        </div>
      </Section>

      <Section
        title={t("foundations.motion.easings.title")}
        description={t("foundations.motion.easings.description")}
      >
        <div className="flex flex-col gap-2">
          {EASINGS.map((e) => (
            <TokenRow
              key={e.token}
              title={e.token}
              cssVarLabel={e.cssVar !== "—" ? e.cssVar : e.tailwind}
              metaLabel={e.value}
              duration="500ms"
              timing={e.value}
              rightLabel={e.feel}
            />
          ))}
        </div>
      </Section>

      <Section
        title={t("foundations.motion.reducedMotion.title")}
        description={t("foundations.motion.reducedMotion.description")}
      >
        <div className="rounded-xl border border-warning-200 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/10 p-4">
          <p className="text-sm text-warning-700 dark:text-warning-200 max-w-3xl">
            {t("foundations.motion.reducedMotion.callout")}
          </p>
        </div>
        <p className="mt-4 text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("foundations.motion.reducedMotion.body")}
        </p>
      </Section>

      <Section
        title={t("foundations.motion.rules.title")}
        description={t("foundations.motion.rules.description")}
      >
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("foundations.motion.rules.items.purpose")}</li>
          <li>{t("foundations.motion.rules.items.duration")}</li>
          <li>{t("foundations.motion.rules.items.easing")}</li>
          <li>{t("foundations.motion.rules.items.transform")}</li>
          <li>{t("foundations.motion.rules.items.spring")}</li>
          <li>{t("foundations.motion.rules.items.state")}</li>
        </ul>
      </Section>

      <Section
        title={t("foundations.motion.override.title")}
        description={t("foundations.motion.override.description")}
      >
        <CodeBlock code={OVERRIDE_SNIPPET} language="css" filename="app/styles/brand.css" />
      </Section>

      <RelatedLinks
        title={t("foundations.motion.related.title")}
        items={[
          { label: "Accessibility", href: "/foundations/accessibility" },
          { label: "Colors", href: "/foundations/colors" },
          { label: "Elevation", href: "/foundations/elevation" },
        ]}
      />
    </FoundationPage>
  )
}
