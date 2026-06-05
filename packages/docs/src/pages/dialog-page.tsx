import { AlertTriangle } from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { Input } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
import { Textarea } from "@dpds-gov/design-system"
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"

export function ArchiveTicketDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="gray">Archive</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archive ticket?</DialogTitle>
          <DialogDescription>
            REQ-2025-0142 will be hidden from the active queue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outlineGray">Cancel</Button>} />
          <Button>Archive</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`

const PREVIEW_SNIPPET = `<Dialog>
  <DialogTrigger render={<Button>Open dialog</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm action</DialogTitle>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outlineGray">Cancel</Button>} />
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`

const EXAMPLE_SNIPPETS = {
  basic: `<Dialog>
  <DialogTrigger render={<Button>Open</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Ticket details</DialogTitle>
      <DialogDescription>REQ-2025-0142 · Mohammed Al Mansoori</DialogDescription>
    </DialogHeader>
    <p>Ticket body...</p>
    <DialogFooter>
      <DialogClose render={<Button variant="outlineGray">Close</Button>} />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  withForm: `<Dialog>
  <DialogTrigger render={<Button>Add note</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add internal note</DialogTitle>
      <DialogDescription>
        Visible only to the investigation team.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-3">
      <Label htmlFor="note-title">Subject</Label>
      <Input id="note-title" placeholder="e.g. Cheque image clarification" />
      <Label htmlFor="note-body">Note</Label>
      <Textarea id="note-body" rows={4} />
    </div>
    <DialogFooter>
      <DialogClose render={<Button variant="outlineGray">Cancel</Button>} />
      <Button>Save note</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  destructive: `// Alert Dialog pattern — a Dialog with destructive styling and confirm copy.
<Dialog>
  <DialogTrigger render={<Button variant="filledDestructive">Delete ticket</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <AlertTriangle className="size-5 text-error-500" />
        Delete ticket REQ-2025-0142?
      </DialogTitle>
      <DialogDescription>
        This permanently removes the ticket and all attached evidence. This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outlineGray">Cancel</Button>} />
      <DialogClose render={<Button variant="filledDestructive">Yes, delete</Button>} />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  scrollable: `<Dialog>
  <DialogTrigger render={<Button>Audit log</Button>} />
  <DialogContent className="max-h-[80vh]">
    <DialogHeader>
      <DialogTitle>Audit log — REQ-2025-0142</DialogTitle>
    </DialogHeader>
    <div className="overflow-y-auto pe-2">
      {entries.map((e) => <LogRow key={e.id} {...e} />)}
    </div>
    <DialogFooter>
      <DialogClose render={<Button variant="outlineGray">Close</Button>} />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  size: `<Dialog>
  <DialogTrigger render={<Button>Open large</Button>} />
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Wide content</DialogTitle>
    </DialogHeader>
    Use max-w-* to widen.
  </DialogContent>
</Dialog>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state. Pair with onOpenChange. Omit for uncontrolled.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Initial open state when uncontrolled.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Fires when the dialog opens or closes.",
    },
    {
      name: "modal",
      type: "boolean",
      defaultValue: "true",
      description: "When true (default), background is inert and a backdrop is rendered. Set false for non-blocking dialogs.",
    },
    {
      name: "DialogTrigger.render",
      type: "ReactElement",
      description: "Replace the default button with any element. Pass a Button, IconButton, or anchor — base-ui merges the trigger props onto it.",
    },
    {
      name: "DialogClose.render",
      type: "ReactElement",
      description: "Same render-prop pattern as DialogTrigger. Use this to wire a custom button (e.g. a destructive variant) to close the dialog.",
    },
    {
      name: "DialogContent.showCloseButton",
      type: "boolean",
      defaultValue: "true",
      description: "Toggle the top-right X close button. Hide it for required-decision flows where users must pick an action.",
    },
    {
      name: "DialogContent.className",
      type: "string",
      description: "Override sizing with max-w-* (e.g. max-w-2xl for wide, max-w-sm for narrow). Default is medium.",
    },
  ]
}

/* ── Page ── */

export default function DialogPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.dialog.title")}
      description={t("docs.dialog.description")}
      category={t("docs.dialog.category")}
    >
      <Section title={t("docs.dialog.preview.title")} description={t("docs.dialog.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <Dialog>
            <DialogTrigger render={<Button>{t("docs.dialog.preview.label")}</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm action</DialogTitle>
                <DialogDescription>
                  REQ-2025-0142 will be marked complete.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outlineGray">Cancel</Button>} />
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.dialog.installation.title")} description={t("docs.dialog.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.dialog.installation.filename")} />
      </Section>

      <Section title={t("docs.dialog.usage.title")} description={t("docs.dialog.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.dialog.examples.title")} description={t("docs.dialog.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.dialog.examples.basic.label")}
            description={t("docs.dialog.examples.basic.description")}
            code={EXAMPLE_SNIPPETS.basic}
          >
            <Dialog>
              <DialogTrigger render={<Button>Open</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ticket details</DialogTitle>
                  <DialogDescription>REQ-2025-0142 · Mohammed Al Mansoori</DialogDescription>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                  Open a Bounced Cheque Report submitted 28 Nov 2025. Currently under review by First Lieutenant Khalifa Mohammed.
                </p>
                <DialogFooter>
                  <DialogClose render={<Button variant="outlineGray">Close</Button>} />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dialog.examples.withForm.label")}
            description={t("docs.dialog.examples.withForm.description")}
            code={EXAMPLE_SNIPPETS.withForm}
          >
            <Dialog>
              <DialogTrigger render={<Button>Add note</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add internal note</DialogTitle>
                  <DialogDescription>Visible only to the investigation team.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                  <Label htmlFor="note-title">Subject</Label>
                  <Input id="note-title" placeholder="e.g. Cheque image clarification" />
                  <Label htmlFor="note-body">Note</Label>
                  <Textarea id="note-body" rows={4} />
                </div>
                <DialogFooter>
                  <DialogClose render={<Button variant="outlineGray">Cancel</Button>} />
                  <Button>Save note</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dialog.examples.destructive.label")}
            description={t("docs.dialog.examples.destructive.description")}
            code={EXAMPLE_SNIPPETS.destructive}
          >
            <Dialog>
              <DialogTrigger render={<Button variant="filledDestructive">Delete ticket</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="size-5 text-error-500" />
                    Delete ticket REQ-2025-0142?
                  </DialogTitle>
                  <DialogDescription>
                    This permanently removes the ticket and all attached evidence. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="outlineGray">Cancel</Button>} />
                  <DialogClose render={<Button variant="filledDestructive">Yes, delete</Button>} />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dialog.examples.scrollable.label")}
            description={t("docs.dialog.examples.scrollable.description")}
            code={EXAMPLE_SNIPPETS.scrollable}
          >
            <Dialog>
              <DialogTrigger render={<Button>Audit log</Button>} />
              <DialogContent className="max-h-[70vh]">
                <DialogHeader>
                  <DialogTitle>Audit log — REQ-2025-0142</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto pe-2 max-h-[40vh] text-sm space-y-2">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="rounded border border-input p-2">
                      <p className="font-medium">Event {i + 1}</p>
                      <p className="text-xs text-muted-foreground">28 Nov 2025, 09:30 AM · System</p>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <DialogClose render={<Button variant="outlineGray">Close</Button>} />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.dialog.examples.size.label")}
            description={t("docs.dialog.examples.size.description")}
            code={EXAMPLE_SNIPPETS.size}
          >
            <Dialog>
              <DialogTrigger render={<Button>Open large</Button>} />
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Wide content</DialogTitle>
                  <DialogDescription>Use max-w-* utilities on DialogContent to widen.</DialogDescription>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                  Good for showing rich tables, side-by-side comparisons, or long forms that don't fit the default width.
                </p>
                <DialogFooter>
                  <DialogClose render={<Button variant="outlineGray">Close</Button>} />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.dialog.props.title")} description={t("docs.dialog.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.dialog.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.dialog.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.dialog.accessibility.items.focus")}</li>
          <li>{t("docs.dialog.accessibility.items.escape")}</li>
          <li>{t("docs.dialog.accessibility.items.title")}</li>
          <li>{t("docs.dialog.accessibility.items.destructive")}</li>
          <li>{t("docs.dialog.accessibility.items.modal")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography", "elevation", "motion"]} />

      <RelatedLinks
        title={t("docs.dialog.related.title")}
        items={[
          { label: "Drawer / Sheet", href: "/ui/drawer" },
          { label: "Popover", href: "/ui/popover" },
          { label: "Alert", href: "/ui/alert" },
        ]}
      />
    </ComponentPage>
  )
}
