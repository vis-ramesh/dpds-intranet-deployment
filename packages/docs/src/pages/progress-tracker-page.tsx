import {
  ProgressTracker,
  ProgressTrackerItem,
  ProgressTrackerHeader,
  ProgressTrackerContent,
} from "@dpds-gov/design-system"
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

/* ── Snippets ── */

const INSTALL_SNIPPET = `import {
  ProgressTracker,
  ProgressTrackerItem,
  ProgressTrackerHeader,
  ProgressTrackerContent,
} from "@dpds-gov/design-system"
import type { StepStatus } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { ProgressTracker, ProgressTrackerItem } from "@dpds-gov/design-system"

export function RequestTimeline() {
  return (
    <ProgressTracker>
      <ProgressTrackerItem
        status="completed"
        title="Request submitted"
        statusLabel="Completed"
        description="12:34 · 01/01/2025"
      />
      <ProgressTrackerItem
        status="in-progress"
        title="Under review"
        statusLabel="In progress"
        description="Officer Khalid"
      />
      <ProgressTrackerItem status="pending" title="Decision" />
    </ProgressTracker>
  )
}`

const PREVIEW_SNIPPET = `<ProgressTracker>
  <ProgressTrackerItem status="completed" title="Submitted" statusLabel="Completed" description="12:34 · 01/01/2025" />
  <ProgressTrackerItem status="in-progress" title="Under review" statusLabel="In progress" description="Officer Khalid" />
  <ProgressTrackerItem status="pending" title="Decision" />
</ProgressTracker>`

const EXAMPLE_SNIPPETS = {
  threeStep: `<ProgressTracker>
  <ProgressTrackerItem status="completed" title="Submitted"     statusLabel="Completed" />
  <ProgressTrackerItem status="in-progress" title="Under review" statusLabel="In progress" />
  <ProgressTrackerItem status="pending"   title="Decision" />
</ProgressTracker>`,
  withHeader: `// ProgressTrackerHeader renders to the right of the title row.
<ProgressTracker>
  <ProgressTrackerItem status="completed" title="Submitted" statusLabel="Completed" description="01/01/2025">
    <ProgressTrackerHeader>
      <Button size="sm" variant="outlineGray">Inquire</Button>
    </ProgressTrackerHeader>
  </ProgressTrackerItem>
  <ProgressTrackerItem status="in-progress" title="Under review" statusLabel="In progress" />
</ProgressTracker>`,
  withContent: `// ProgressTrackerContent appears below the title — for sub-steps, evidence, court decisions.
<ProgressTrackerItem status="in-progress" title="Under review" statusLabel="In progress" description="Officer Mariam">
  <ProgressTrackerContent>
    <div className="rounded-xl border border-border p-3">
      <p className="text-xs font-semibold mb-2">Court decisions</p>
      <ul className="flex flex-col gap-1.5">
        <li className="text-xs text-muted-foreground">Hearing scheduled — 12 Feb 2026</li>
        <li className="text-xs text-muted-foreground">Counsel assigned — 08 Feb 2026</li>
      </ul>
    </div>
  </ProgressTrackerContent>
</ProgressTrackerItem>`,
  caseTimeline: `// Real-world case timeline — mixes header actions, content sub-items, and all 3 statuses.
<ProgressTracker>
  <ProgressTrackerItem status="completed" title="Report filed" statusLabel="Completed" description="08:12 · 18 May 2026">
    <ProgressTrackerHeader>
      <Button size="sm" variant="outlineGray">View report</Button>
    </ProgressTrackerHeader>
  </ProgressTrackerItem>
  <ProgressTrackerItem status="completed" title="Evidence collected" statusLabel="Completed" description="14:40 · 18 May 2026" />
  <ProgressTrackerItem status="in-progress" title="Forensic analysis" statusLabel="In progress" description="Lab #3 · est. 2 days">
    <ProgressTrackerContent>
      <div className="rounded-xl border border-border p-3 text-xs text-muted-foreground">
        DNA + fingerprint samples logged. Awaiting lab capacity.
      </div>
    </ProgressTrackerContent>
  </ProgressTrackerItem>
  <ProgressTrackerItem status="pending" title="Prosecution review" />
  <ProgressTrackerItem status="pending" title="Court hearing" />
</ProgressTracker>`,
}

/* ── Props tables ── */

function getItemPropRows(): PropRow[] {
  return [
    {
      name: "status",
      type: '"completed" | "in-progress" | "pending"',
      required: true,
      description: "Drives dot color, badge color, and pulse animation. in-progress shows an animated ping ring.",
    },
    {
      name: "title",
      type: "string",
      required: true,
      description: "Step title — rendered as font-mono font-bold. Pending steps render muted.",
    },
    {
      name: "statusLabel",
      type: "string",
      description: "Optional Badge label rendered beside the title (e.g. 'Completed', 'Under review').",
    },
    {
      name: "description",
      type: "string",
      description: "Subtle line beside the badge — typically a date / owner / metadata string.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Compose with ProgressTrackerHeader (right-side action) or ProgressTrackerContent (sub-content below).",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes on the item wrapper.",
    },
  ]
}

function getRootPropRows(): PropRow[] {
  return [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "ProgressTrackerItem children. Order = chronological order. First/last items hide their connector line automatically.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes on the outer flex column.",
    },
  ]
}

/* ── Page ── */

export default function ProgressTrackerPage() {
  return (
    <ComponentPage
      title="Progress tracker"
      description="Vertical timeline for multi-step service workflows — request submission, review, decision. Status-aware dots, animated connector lines, pulse ring on the active step."
      category="Data display"
    >
      <Section title="Preview" description="Default three-status tracker.">
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <div className="w-full max-w-md">
            <ProgressTracker>
              <ProgressTrackerItem
                status="completed"
                title="Request submitted"
                statusLabel="Completed"
                description="12:34 · 01/01/2025"
              />
              <ProgressTrackerItem
                status="in-progress"
                title="Under review"
                statusLabel="In progress"
                description="Officer Khalid"
              />
              <ProgressTrackerItem status="pending" title="Decision" />
            </ProgressTracker>
          </div>
        </PreviewBlock>
      </Section>

      <Section title="Installation" description="Import composition primitives + the StepStatus type.">
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename="progress-tracker-import.ts" />
      </Section>

      <Section title="Usage" description="Wire up a request timeline.">
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title="Examples" description="Common compositions.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PreviewBlock
            title="Three-status tracker"
            description="Shows completed → in-progress → pending. The active step pulses; the last step hides its trailing connector."
            code={EXAMPLE_SNIPPETS.threeStep}
          >
            <div className="w-full">
              <ProgressTracker>
                <ProgressTrackerItem status="completed"   title="Submitted"     statusLabel="Completed" />
                <ProgressTrackerItem status="in-progress" title="Under review"  statusLabel="In progress" />
                <ProgressTrackerItem status="pending"     title="Decision" />
              </ProgressTracker>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title="With header action"
            description="ProgressTrackerHeader places a button (or any node) at the right of the title row."
            code={EXAMPLE_SNIPPETS.withHeader}
          >
            <div className="w-full">
              <ProgressTracker>
                <ProgressTrackerItem status="completed" title="Submitted" statusLabel="Completed" description="01/01/2025">
                  <ProgressTrackerHeader>
                    <Button size="sm" variant="outlineGray">Inquire</Button>
                  </ProgressTrackerHeader>
                </ProgressTrackerItem>
                <ProgressTrackerItem status="in-progress" title="Under review" statusLabel="In progress" />
              </ProgressTracker>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title="With sub-content"
            description="ProgressTrackerContent flows below the title — use for evidence, court decisions, or nested tables."
            code={EXAMPLE_SNIPPETS.withContent}
            className="lg:col-span-2"
          >
            <div className="w-full">
              <ProgressTracker>
                <ProgressTrackerItem status="in-progress" title="Under review" statusLabel="In progress" description="Officer Mariam">
                  <ProgressTrackerContent>
                    <div className="rounded-xl border border-border p-3">
                      <p className="text-xs font-semibold mb-2">Court decisions</p>
                      <ul className="flex flex-col gap-1.5">
                        <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <span className="mt-0.5 shrink-0 size-[6px] bg-primary rounded-full" />
                          Hearing scheduled — 12 Feb 2026
                        </li>
                        <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <span className="mt-0.5 shrink-0 size-[6px] bg-primary rounded-full" />
                          Counsel assigned — 08 Feb 2026
                        </li>
                      </ul>
                    </div>
                  </ProgressTrackerContent>
                </ProgressTrackerItem>
              </ProgressTracker>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title="Full case timeline"
            description="DPDS canonical pattern — header actions, sub-content, and all three statuses across five steps."
            code={EXAMPLE_SNIPPETS.caseTimeline}
            className="lg:col-span-2"
          >
            <div className="w-full">
              <ProgressTracker>
                <ProgressTrackerItem status="completed" title="Report filed" statusLabel="Completed" description="08:12 · 18 May 2026">
                  <ProgressTrackerHeader>
                    <Button size="sm" variant="outlineGray">View report</Button>
                  </ProgressTrackerHeader>
                </ProgressTrackerItem>
                <ProgressTrackerItem status="completed" title="Evidence collected" statusLabel="Completed" description="14:40 · 18 May 2026" />
                <ProgressTrackerItem status="in-progress" title="Forensic analysis" statusLabel="In progress" description="Lab #3 · est. 2 days">
                  <ProgressTrackerContent>
                    <div className="rounded-xl border border-border p-3 text-xs text-muted-foreground">
                      DNA + fingerprint samples logged. Awaiting lab capacity.
                    </div>
                  </ProgressTrackerContent>
                </ProgressTrackerItem>
                <ProgressTrackerItem status="pending" title="Prosecution review" />
                <ProgressTrackerItem status="pending" title="Court hearing" />
              </ProgressTracker>
            </div>
          </PreviewBlock>
        </div>
      </Section>

      <Section title="Props" description="Item and root props.">
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm font-medium">ProgressTracker (Root)</p>
            <PropsTable rows={getRootPropRows()} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">ProgressTrackerItem</p>
            <PropsTable rows={getItemPropRows()} />
          </div>
        </div>
      </Section>

      <Section title="Accessibility">
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          ProgressTracker renders a static timeline — there's no interactive state to manage. Animations respect reduced-motion via framer-motion defaults; the in-progress pulse ring will pause when `prefers-reduced-motion: reduce` is set.
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>Status is conveyed via color AND text label (the Badge) — colorblind-safe.</li>
          <li>Pending steps mute the title via `text-muted-foreground` so they don't compete with active steps.</li>
          <li>Connector lines hide automatically on first/last items — no manual flag needed.</li>
        </ul>
      </Section>

      <UsesTokens foundations={["spacing", "radius", "motion", "colors"]} />

      <RelatedLinks
        title="Related"
        items={[
          { label: "Stepper", href: "/ui/stepper" },
          { label: "Accordion", href: "/ui/accordion" },
          { label: "Badge", href: "/ui/badges" },
        ]}
      />
    </ComponentPage>
  )
}
