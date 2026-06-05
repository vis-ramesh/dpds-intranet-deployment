import { useState } from "react"

import { ProfileSwitcher } from "@dpds-gov/design-system"
import type { ProfileSwitcherOption } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { ProfileSwitcher } from "@dpds-gov/design-system"
import type { ProfileSwitcherOption } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { useState } from "react"
import { ProfileSwitcher } from "@dpds-gov/design-system"

const stations = [
  { value: "dubai-hq",  label: "Dubai Police HQ",   description: "Active station",    icon: "/img/Dubai-Police-Default-Icon.svg" },
  { value: "al-barsha", label: "Al Barsha Station", description: "Secondary station", icon: "/img/logo-sm.svg" },
  { value: "deira",     label: "Deira Station",     description: "Field station",     icon: "/img/logo-sm.svg" },
]

export function FooterSwitcher() {
  const [active, setActive] = useState("dubai-hq")
  return (
    <ProfileSwitcher
      options={stations}
      value={active}
      onChange={setActive}
    />
  )
}`

const PREVIEW_SNIPPET = `<ProfileSwitcher
  options={[
    { value: "dubai-hq",  label: "Dubai Police HQ",   description: "Active station",    icon: "/img/Dubai-Police-Default-Icon.svg" },
    { value: "al-barsha", label: "Al Barsha Station", description: "Secondary station", icon: "/img/logo-sm.svg" },
    { value: "deira",     label: "Deira Station",     description: "Field station",     icon: "/img/logo-sm.svg" },
  ]}
/>`

const EXAMPLE_SNIPPETS = {
  uncontrolled: `// Uncontrolled — component tracks selection internally.
<ProfileSwitcher options={stations} />`,
  controlled: `// Controlled — parent owns the selected value.
const [active, setActive] = useState("dubai-hq")

<ProfileSwitcher
  options={stations}
  value={active}
  onChange={setActive}
/>`,
  sidebarFooter: `// Inside SidebarFooter — collapses with the sidebar.
<SidebarFooter className="p-3 group-data-[collapsible=icon]:p-2">
  <ProfileSwitcher
    options={stations}
    className="group-data-[collapsible=icon]:hidden"
  />
</SidebarFooter>`,
  twoOptions: `// Minimum is two — single-option case shows just the selected card.
<ProfileSwitcher
  options={[
    { value: "hq",  label: "HQ",       description: "Active",    icon: "/img/Dubai-Police-Default-Icon.svg" },
    { value: "alt", label: "Backup",   description: "Standby",   icon: "/img/logo-sm.svg" },
  ]}
/>`,
}

const sampleOptions: ProfileSwitcherOption[] = [
  { value: "dubai-hq",   label: "Dubai Police HQ",   description: "Active station",    icon: "/Dubai-Police-Default-Icon.svg" },
  { value: "al-barsha",  label: "Al Barsha Station", description: "Secondary station", icon: "/logo-sm.svg" },
  { value: "deira",      label: "Deira Station",     description: "Field station",     icon: "/logo-sm.svg" },
]

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "options",
      type: "ProfileSwitcherOption[]",
      required: true,
      description: "List of profiles/stations the user can switch between. Each option has value, label, optional description, and an icon path.",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled selected value. Pair with onChange. Omit to let the component manage selection internally.",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Fires when the user picks a different profile. Required when value is controlled.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes on the outer wrapper. Used to hide the switcher in collapsed sidebar with group-data-[collapsible=icon]:hidden.",
    },
  ]
}

/* ── Page ── */

export default function ProfileSwitcherPage() {
  const [active, setActive] = useState("dubai-hq")

  return (
    <ComponentPage
      title="Profile switcher"
      description="Animated stacked-card switcher for picking the active workspace, station, or profile. Designed for sidebar footers and account menus."
      category="Layout"
    >
      <Section title="Preview" description="Hover the stack and click the chevron to expand. Pick a profile to collapse back to the selected card.">
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="w-full max-w-sm">
            <ProfileSwitcher options={sampleOptions} />
          </div>
        </PreviewBlock>
      </Section>

      <Section title="Installation" description="Import from the UI directory.">
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename="profile-switcher-import.ts" />
      </Section>

      <Section title="Usage" description="Wire up controlled selection inside a parent component.">
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title="Examples" description="Common compositions for this component.">
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title="Uncontrolled"
            description="Drop in without state — defaults to the first option."
            code={EXAMPLE_SNIPPETS.uncontrolled}
          >
            <div className="w-full max-w-sm">
              <ProfileSwitcher options={sampleOptions} />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title="Controlled"
            description="Parent owns active value. Required when other UI depends on the selection."
            code={EXAMPLE_SNIPPETS.controlled}
          >
            <div className="flex flex-col gap-2 w-full max-w-sm">
              <p className="text-xs font-mono text-muted-foreground">active: {active}</p>
              <ProfileSwitcher options={sampleOptions} value={active} onChange={setActive} />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title="Sidebar footer"
            description="Hides cleanly when the sidebar collapses to icon mode."
            code={EXAMPLE_SNIPPETS.sidebarFooter}
          >
            <div className="w-full max-w-sm rounded-2xl border border-border bg-sidebar p-3">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Sidebar footer · station picker
              </p>
              <ProfileSwitcher options={sampleOptions} />
            </div>
          </PreviewBlock>

          <PreviewBlock
            title="Two options"
            description="Stack adapts when only one alternative profile exists."
            code={EXAMPLE_SNIPPETS.twoOptions}
          >
            <div className="w-full max-w-sm">
              <ProfileSwitcher options={sampleOptions.slice(0, 2)} />
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title="Props" description="ProfileSwitcher accepts these props.">
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title="Accessibility">
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          Each profile card is a real `&lt;button&gt;` — keyboard activation, focus visibility, and screen-reader announcements all work without extra wiring.
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>RTL-aware: the toggle chevron and stack origin flip automatically via useIsRtl.</li>
          <li>Mouse leave delays collapse 1s — lets users move into the popover area without losing it.</li>
          <li>Reduced motion: framer-motion respects the user's `prefers-reduced-motion` setting; cards fade rather than spring.</li>
        </ul>
      </Section>

      <UsesTokens foundations={["spacing", "radius", "motion", "colors"]} />

      <RelatedLinks
        title="Related"
        items={[
          { label: "Sidebar", href: "/ui/sidebar" },
          { label: "Dropdown menu", href: "/ui/dropdown-menu" },
          { label: "Avatar", href: "/ui/avatar" },
        ]}
      />
    </ComponentPage>
  )
}
