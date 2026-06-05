import { forwardRef, useRef, type ReactNode } from "react"
import { AppWindow, ExternalLink, FileText, Image as ImageIcon, PenLine, Sparkles } from "lucide-react"

import {
  AnimatedBeam,
  Button,
  ProgressTracker,
  ProgressTrackerContent,
  ProgressTrackerHeader,
  ProgressTrackerItem,
  cn,
} from "@dpds-gov/design-system"
import { CodeBlock, DocsPage, Prose, Section } from "@/components/docs"

/* ── AnimatedBeam node ──────────────────────────────────────────────────
 * A single labelled node in the build-flow diagram. forwardRef so the beam
 * can anchor to the icon box. The label sits below, outside the anchor box.
 * ------------------------------------------------------------------------ */
const FlowNode = forwardRef<HTMLDivElement, { children: ReactNode; label: string; className?: string }>(
  ({ children, label, className }, ref) => (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm",
          className,
        )}
      >
        {children}
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  ),
)
FlowNode.displayName = "FlowNode"

/* PRD / screenshot / sketch → DPDS skill → service app. The three inputs each
 * feed the skill; the skill produces the app. */
function BuildFlowBeams() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prdRef = useRef<HTMLDivElement>(null)
  const shotRef = useRef<HTMLDivElement>(null)
  const sketchRef = useRef<HTMLDivElement>(null)
  const skillRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex w-full items-stretch justify-between gap-4 rounded-xl border border-border bg-background/40 p-6"
    >
      {/* Inputs */}
      <div className="flex flex-col justify-between gap-6 py-1">
        <FlowNode className="rounded-full" ref={prdRef} label="PRD"><FileText className="size-5 text-primary" aria-hidden="true" /></FlowNode>
        <FlowNode className="rounded-full" ref={shotRef} label="Screenshot"><ImageIcon className="size-5 text-primary" aria-hidden="true" /></FlowNode>
        <FlowNode className="rounded-full" ref={sketchRef} label="Sketch"><PenLine className="size-5 text-primary" aria-hidden="true" /></FlowNode>
      </div>

      {/* DPDS skill */}
      <div className="flex items-center">
        <FlowNode ref={skillRef} label="DPDS skill" className="size-16 rounded-full border-primary/30 bg-white">
          <Sparkles className="size-7 text-primary" aria-hidden="true" />
        </FlowNode>
      </div>

      {/* Output app */}
      <div className="flex items-center">
        <FlowNode className="rounded-full" ref={appRef} label="Service app"><AppWindow className="size-5 text-primary" aria-hidden="true" /></FlowNode>
      </div>

      {/* Beams: each input → skill */}
      <AnimatedBeam containerRef={containerRef} fromRef={prdRef} toRef={skillRef} curvature={45} />
      <AnimatedBeam containerRef={containerRef} fromRef={shotRef} toRef={skillRef} />
      <AnimatedBeam containerRef={containerRef} fromRef={sketchRef} toRef={skillRef} curvature={-45} />
      {/* Beam: skill → app */}
      <AnimatedBeam containerRef={containerRef} fromRef={skillRef} toRef={appRef} />
    </div>
  )
}

export default function InstallationNewPage() {
  return (
    <DocsPage
      eyebrow="Getting started"
      title="Installation"
      description="The same setup flow as the installation guide, rendered as a step-by-step progress tracker — each step shows a status, a short description, a code demo, and its own action."
    >
      <Section title="Prerequisites">
        <Prose>
          <ul>
            <li>Node.js 20 or later, plus npm.</li>
            <li>
              A GitHub account with access to the dpds-gov organisation. If you don't have it,
              ask Ramesh or your team lead to invite you.
            </li>
            <li>
              A Personal Access Token with read:packages scope. The first step below walks you
              through generating it.
            </li>
            <li>
              Optional but recommended — Claude Code or Cowork installed locally. The starter's
              CLAUDE.md is written for AI-assisted building, and the workflow assumes you can paste
              a brief, wireframe, or screenshot into chat.
            </li>
          </ul>
        </Prose>
      </Section>

      <Section
        title="Setup steps"
        description="Follow the steps top to bottom. Each step has an action button on the right and a demo below it."
      >
        <ProgressTracker hideGlow>
          {/* Step 1 — repo from template */}
          <ProgressTrackerItem
            status="completed"
            title="Create your repo from the template"
            statusLabel="Done"
            description="Use this template → set Owner to dpds-gov → Private → Create repository."
          >
            <ProgressTrackerHeader>
              <Button variant="outlineGray" size="sm" asChild>
                <a href="https://github.com/dpds-gov/service-starter" target="_blank" rel="noopener noreferrer">
                  Use this template
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </ProgressTrackerHeader>
          </ProgressTrackerItem>

          {/* Step 2 — clone */}
          <ProgressTrackerItem
            status="completed"
            title="Clone it"
            statusLabel="Done"
            description="Clone the new repo to your machine."
          >
            <ProgressTrackerContent>
              <CodeBlock
                code={`git clone https://github.com/dpds-gov/<your-service-name>.git
cd <your-service-name>`}
                language="bash"
              />
            </ProgressTrackerContent>
          </ProgressTrackerItem>

          {/* Step 3 — PAT */}
          <ProgressTrackerItem
            status="completed"
            title="Create a personal access token"
            statusLabel="In progress"
            description="Classic token, scope read:packages, with access to the dpds-gov org."
          >
            <ProgressTrackerHeader>
              <Button variant="outlineGray" size="sm" asChild>
                <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
                  Open GitHub tokens
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </ProgressTrackerHeader>
          </ProgressTrackerItem>

          {/* Step 4 — add token + install */}
          <ProgressTrackerItem
            status="completed"
            title="Add your token and install"
            statusLabel="Pending"
            description="Paste your token into .env, then npm run setup loads it and installs."
          >
            <ProgressTrackerContent>
              <CodeBlock
                code={`cp .env.example .env
# open .env and paste your token
npm run setup
npm run dev`}
                language="bash"
              />
            </ProgressTrackerContent>
          </ProgressTrackerItem>

          {/* Step 5 — first service */}
          <ProgressTrackerItem
            status="completed"
            title="Build your first service"
            statusLabel="Pending"
            description="Ask your AI assistant to scaffold a service folder following the conventions."
          >
            <ProgressTrackerHeader>
            
            </ProgressTrackerHeader>
            <ProgressTrackerContent>
              <CodeBlock
                code={`# In your AI editor:
Build a service for renewing a driving licence.`}
                language="bash"
              />
              <p className="mt-4 mb-3 text-sm text-muted-foreground">
                Drop a PRD, screenshot, or sketch into your AI tool — the DPDS skill turns any of
                them into a working service.
              </p>
              <BuildFlowBeams />
            </ProgressTrackerContent>
          </ProgressTrackerItem>
        </ProgressTracker>
      </Section>
    </DocsPage>
  )
}
