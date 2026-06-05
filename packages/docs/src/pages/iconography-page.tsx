import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useLottie } from "lottie-react"
import {
  AlertCircle,
  ArrowUpRight,
  Bell,
  Calendar,
  Check,
  Download,
  Mail,
  Search,
  Settings,
  Trash2,
} from "lucide-react"

import {
  CodeBlock,
  FoundationPage,
  RelatedLinks,
  Section,
} from "@/components/docs"
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@dpds-gov/design-system"
import { lottieRegistry, type LottieIconEntry } from "@/components/lottie/registry"

/* ── Demo icon set — diverse roles so size and stroke previews stay representative ── */

const DEMO_ICONS = [
  { name: "Settings", Icon: Settings },
  { name: "Bell", Icon: Bell },
  { name: "Mail", Icon: Mail },
  { name: "Calendar", Icon: Calendar },
  { name: "Search", Icon: Search },
  { name: "Download", Icon: Download },
  { name: "Check", Icon: Check },
  { name: "AlertCircle", Icon: AlertCircle },
] as const

const SIZES = [
  { token: "size-4", px: "16px", label: "16" },
  { token: "size-5", px: "20px", label: "20" },
  { token: "size-6", px: "24px", label: "24" },
  { token: "size-8", px: "32px", label: "32" },
] as const

const STROKE_WIDTHS = [
  { value: 1.5, label: "1.5", note: "Light — for dense surfaces and small sizes." },
  { value: 2, label: "2", note: "Default. Use unless you have a specific reason." },
  { value: 2.5, label: "2.5", note: "Bold — for emphasis or large display icons." },
] as const

/* ── Animated (Lottie) icon subset — curated picks from the registry that span the
   common roles: KPI tiles, empty states, success/error feedback. Keep this small —
   the full searchable gallery lives at /lottie-icons. ── */

const ANIMATED_IDS = [
  "icon-01",
  "icon-02",
  "icon-03",
  "icon-04",
  "icon-05",
  "icon-06",
]

const ANIMATED_ENTRIES: LottieIconEntry[] = ANIMATED_IDS
  .map((id) => lottieRegistry.find((e) => e.id === id))
  .filter((e): e is LottieIconEntry => Boolean(e))

const LOTTIE_USAGE_SNIPPET = `import { useLottie } from "lottie-react"
import { lottieRegistry } from "@/components/lottie/registry"

// Only the icon you reference is fetched — tree-shaken per route.
const entry = lottieRegistry.find((i) => i.id === "completed-request")!
const data  = (await entry.load()).default

function Confirmation() {
  const { View } = useLottie({ animationData: data, loop: false, autoplay: true })
  return <div className="size-20">{View}</div>
}`

const INSTALL_SNIPPET = `// Import the icons you need from lucide-react.
// Tree-shaking ensures only what you import ships.
import { Search, Settings, Check } from "lucide-react"`

const USAGE_SNIPPET = `import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@dpds-gov/design-system"

export function SearchField() {
  return (
    <InputGroup>
      <InputGroupAddon>
        {/* Decorative — aria-hidden because the label below tells the story */}
        <InputGroupText><Search aria-hidden /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search tickets..." />
    </InputGroup>
  )
}`

const ICON_BUTTON_SNIPPET = `// Icon-only buttons MUST have an accessible name.
// Use aria-label so screen readers announce "Delete" instead of "button".
<Button variant="gray" size="icon-sm" aria-label="Delete">
  <Trash2 className="size-4" />
</Button>`

/* ── Slim Lottie tile — auto-plays, no controls. Lazy-loads the JSON per icon
   so we don't pull the whole registry into this page's bundle. ── */

function LottieTile({ entry }: { entry: LottieIconEntry }) {
  const [data, setData] = useState<unknown>(null)

  useEffect(() => {
    let cancelled = false
    entry.load().then((mod) => {
      if (!cancelled) setData(mod.default ?? mod)
    })
    return () => {
      cancelled = true
    }
  }, [entry])

  if (!data) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-4 animate-pulse">
        <div className="w-full aspect-square max-w-[96px] rounded-lg bg-gray-100 dark:bg-white/5" />
        <div className="h-2 w-2/3 rounded bg-gray-100 dark:bg-white/5" />
      </div>
    )
  }

  return <LottieTileInner entry={entry} data={data} />
}

function LottieTileInner({ entry, data }: { entry: LottieIconEntry; data: unknown }) {
  const { View } = useLottie({
    animationData: data,
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
  })
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5">
      <div className="relative w-full aspect-square max-w-[120px]">{View}</div>
      <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 text-center truncate w-full">
        {entry.name}
      </p>
      <code className="text-xs font-mono text-gray-400 dark:text-slate-500 text-center truncate w-full">
        {entry.id}
      </code>
    </div>
  )
}

/* ── Page ── */

export default function IconographyPage() {
  const { t } = useTranslation()

  return (
    <FoundationPage
      title={t("foundations.iconography.title")}
      description={t("foundations.iconography.description")}
    >
      <Section title={t("foundations.iconography.overview.title")}>
        <p className="max-w-3xl text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
          {t("foundations.iconography.overview.body")}
        </p>
        <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
          {t("foundations.iconography.overview.link")}{" "}
          <a
            href="https://lucide.dev/icons"
            target="_blank"
            rel="noreferrer"
            className="underline text-primary-700 dark:text-primary-300 hover:no-underline"
          >
            lucide.dev/icons
          </a>
        </p>
      </Section>

      <Section
        title={t("foundations.iconography.library.title")}
        description={t("foundations.iconography.library.description")}
      >
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6">
          <div className="grid grid-cols-8 gap-y-5 gap-x-2">
            {DEMO_ICONS.map(({ name, Icon }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <Icon className="size-6 text-gray-700 dark:text-slate-200" />
                <span className="text-xs font-mono text-gray-400 dark:text-slate-500">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        title={t("foundations.iconography.animated.title")}
        description={t("foundations.iconography.animated.description")}
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-6 gap-3">
            {ANIMATED_ENTRIES.map((entry) => (
              <LottieTile key={entry.id} entry={entry} />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-white/5 p-4">
            <p className="text-sm text-gray-700 dark:text-slate-300 max-w-prose">
              {t("foundations.iconography.animated.fullSetBody")}
            </p>
            <Link
              to="/lottie-icons"
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-slate-200 hover:border-primary-300 hover:text-primary-700 dark:hover:border-primary-300 dark:hover:text-primary-300 transition-colors"
            >
              {t("foundations.iconography.animated.fullSetLink")}
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <CodeBlock code={LOTTIE_USAGE_SNIPPET} language="tsx" filename="dashboard-tile.tsx" />
        </div>
      </Section>

      <Section
        title={t("foundations.iconography.sizes.title")}
        description={t("foundations.iconography.sizes.description")}
      >
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-left text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-slate-400">
                  <th className="px-4 py-3 font-medium">Token</th>
                  <th className="px-4 py-3 font-medium">Pixels</th>
                  <th className="px-4 py-3 font-medium">Preview</th>
                  <th className="px-4 py-3 font-medium">When to use</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((s) => (
                  <tr key={s.token} className="border-b border-gray-200 last:border-0 dark:border-white/5">
                    <td className="px-4 py-3 align-middle">
                      <code className="font-mono text-xs text-gray-900 dark:text-slate-100">{s.token}</code>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <code className="font-mono text-xs text-gray-600 dark:text-slate-300">{s.px}</code>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <Settings className={s.token + " text-gray-700 dark:text-slate-200"} />
                    </td>
                    <td className="px-4 py-3 align-middle text-sm text-gray-700 dark:text-slate-300">
                      {t(`foundations.iconography.sizes.uses.${s.label}`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section
        title={t("foundations.iconography.stroke.title")}
        description={t("foundations.iconography.stroke.description")}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STROKE_WIDTHS.map((w) => (
            <div
              key={w.value}
              className="flex flex-col items-start gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5"
            >
              <Settings className="size-10 text-gray-700 dark:text-slate-200" strokeWidth={w.value} />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
                  strokeWidth={`{${w.value}}`}
                </span>
                <code className="text-[11px] font-mono text-gray-500 dark:text-slate-400">
                  default {w.label === "2" ? "✓" : ""}
                </code>
              </div>
              <p className="text-xs text-gray-600 dark:text-slate-400">{w.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={t("foundations.iconography.color.title")}
        description={t("foundations.iconography.color.description")}
      >
        <div className="grid grid-cols-4 gap-3">
          {[
            { className: "text-foreground", label: "foreground" },
            { className: "text-muted-foreground", label: "muted" },
            { className: "text-primary", label: "primary" },
            { className: "text-error-500", label: "error-500" },
          ].map((c) => (
            <div
              key={c.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6"
            >
              <Bell className={`size-10 ${c.className}`} />
              <code className="text-xs font-mono text-gray-500 dark:text-slate-400">
                {c.className}
              </code>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={t("foundations.iconography.patterns.title")}
        description={t("foundations.iconography.patterns.description")}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Icon-only button */}
          <div className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5">
            <div className="flex items-center gap-2">
              <Button variant="gray" size="icon-sm" aria-label="Delete">
                <Trash2 className="size-4" />
              </Button>
              <span className="text-sm text-gray-700 dark:text-slate-300">
                {t("foundations.iconography.patterns.iconButton")}
              </span>
            </div>
            <code className="block bg-gray-50 dark:bg-white/5 rounded-md p-3 text-[11px] font-mono text-gray-700 dark:text-slate-200 overflow-x-auto">
              {`<Button size="icon-sm" aria-label="Delete">\n  <Trash2 className="size-4" />\n</Button>`}
            </code>
          </div>

          {/* Icon + text button */}
          <div className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5">
            <div className="flex items-center gap-2">
              <Button variant="filled" size="sm">
                <Download className="size-4" />
                {t("foundations.iconography.patterns.demo.exportLabel")}
              </Button>
              <span className="text-sm text-gray-700 dark:text-slate-300">
                {t("foundations.iconography.patterns.iconText")}
              </span>
            </div>
            <code className="block bg-gray-50 dark:bg-white/5 rounded-md p-3 text-[11px] font-mono text-gray-700 dark:text-slate-200 overflow-x-auto">
              {`<Button size="sm">\n  <Download className="size-4" />\n  Export\n</Button>`}
            </code>
          </div>

          {/* Decorative icon */}
          <div className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5">
            <div className="flex items-center gap-2 text-sm">
              <Check aria-hidden className="size-4 text-success-600" />
              <span className="text-gray-900 dark:text-slate-100">{t("foundations.iconography.patterns.demo.statusLabel")}</span>
            </div>
            <code className="block bg-gray-50 dark:bg-white/5 rounded-md p-3 text-[11px] font-mono text-gray-700 dark:text-slate-200 overflow-x-auto">
              {`<Check aria-hidden className="size-4 text-success-600" />\n<span>All systems operational</span>`}
            </code>
          </div>

          {/* Icon adjacent to input */}
          <div className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5">
            <InputGroup className="h-10">
              <InputGroupAddon>
                <InputGroupText><Search aria-hidden /></InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder={t("foundations.iconography.patterns.demo.searchPlaceholder")}
              />
            </InputGroup>
            <code className="block bg-gray-50 dark:bg-white/5 rounded-md p-3 text-[11px] font-mono text-gray-700 dark:text-slate-200 overflow-x-auto">
              {`<InputGroup>\n  <InputGroupAddon><InputGroupText><Search /></InputGroupText></InputGroupAddon>\n  <InputGroupInput placeholder="Search..." />\n</InputGroup>`}
            </code>
          </div>
        </div>
      </Section>

      <Section
        title={t("foundations.iconography.rules.title")}
        description={t("foundations.iconography.rules.description")}
      >
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("foundations.iconography.rules.items.ariaLabel")}</li>
          <li>{t("foundations.iconography.rules.items.ariaHidden")}</li>
          <li>{t("foundations.iconography.rules.items.sizing")}</li>
          <li>{t("foundations.iconography.rules.items.color")}</li>
          <li>{t("foundations.iconography.rules.items.alignment")}</li>
          <li>{t("foundations.iconography.rules.items.consistency")}</li>
        </ul>
      </Section>

      <Section
        title={t("foundations.iconography.install.title")}
        description={t("foundations.iconography.install.description")}
      >
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename="your-component.tsx" />
        <p className="mt-4 text-sm text-gray-700 dark:text-slate-300">
          {t("foundations.iconography.install.usageIntro")}
        </p>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
        <p className="mt-4 text-sm text-gray-700 dark:text-slate-300">
          {t("foundations.iconography.install.iconOnlyIntro")}
        </p>
        <CodeBlock code={ICON_BUTTON_SNIPPET} language="tsx" />
      </Section>

      <RelatedLinks
        title={t("foundations.iconography.related.title")}
        items={[
          { label: "Colors", href: "/foundations/colors" },
          { label: "Spacing", href: "/foundations/spacing" },
          { label: "Accessibility", href: "/foundations/accessibility" },
          { label: "Button", href: "/buttons" },
        ]}
      />
    </FoundationPage>
  )
}
