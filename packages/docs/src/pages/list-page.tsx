import { useTranslation } from "react-i18next"
import { FileText, Mail, Paperclip, ChevronRight, AlertCircle } from "lucide-react"

import { List } from "@dpds-gov/design-system"
import { Avatar, AvatarFallback } from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"
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

const INSTALL_SNIPPET = `import { List } from "@dpds-gov/design-system"`

const USAGE_SNIPPET = `import { List } from "@dpds-gov/design-system"
import { Avatar, AvatarFallback } from "@dpds-gov/design-system"
import { ChevronRight } from "lucide-react"

export function TicketsList({ tickets }) {
  return (
    <List divided>
      {tickets.map((t) => (
        <List.Item key={t.id} interactive onClick={() => openTicket(t.id)}>
          <List.Leading>
            <Avatar className="size-9"><AvatarFallback>{t.initials}</AvatarFallback></Avatar>
          </List.Leading>
          <List.Content>
            <List.Title>{t.title}</List.Title>
            <List.Description>{t.customer} · {t.timeAgo}</List.Description>
          </List.Content>
          <List.Trailing>
            <ChevronRight className="text-muted-foreground" />
          </List.Trailing>
        </List.Item>
      ))}
    </List>
  )
}`

const PREVIEW_SNIPPET = `<List divided>
  <List.Item interactive onClick={() => {}}>
    <List.Leading>
      <Avatar className="size-9"><AvatarFallback>MA</AvatarFallback></Avatar>
    </List.Leading>
    <List.Content>
      <List.Title>Login flow broken on Android</List.Title>
      <List.Description>Mohammed Al Mansoori · 2h ago</List.Description>
    </List.Content>
    <List.Trailing>
      <Badge variant="warning">In review</Badge>
    </List.Trailing>
  </List.Item>
</List>`

const EXAMPLE_SNIPPETS = {
  simple: `<List>
  <List.Item><List.Content><List.Title>Onboarding</List.Title></List.Content></List.Item>
  <List.Item><List.Content><List.Title>Trade license</List.Title></List.Content></List.Item>
  <List.Item><List.Content><List.Title>Vehicle registration</List.Title></List.Content></List.Item>
</List>`,
  divided: `<List divided>
  {items.map((i) => (
    <List.Item key={i.id}>
      <List.Content>
        <List.Title>{i.title}</List.Title>
        <List.Description>{i.meta}</List.Description>
      </List.Content>
    </List.Item>
  ))}
</List>`,
  density: `<List density="dense" divided>{/* dense rows */}</List>
<List density="comfortable" divided>{/* comfortable rows */}</List>`,
  interactive: `<List divided>
  {tickets.map((t) => (
    <List.Item key={t.id} interactive onClick={() => open(t.id)}>
      <List.Content>
        <List.Title>{t.title}</List.Title>
        <List.Description>{t.meta}</List.Description>
      </List.Content>
      <List.Trailing><ChevronRight /></List.Trailing>
    </List.Item>
  ))}
</List>`,
  withAvatars: `<List divided>
  {comments.map((c) => (
    <List.Item key={c.id}>
      <List.Leading>
        <Avatar className="size-9"><AvatarFallback>{c.initials}</AvatarFallback></Avatar>
      </List.Leading>
      <List.Content>
        <List.Title>{c.author}</List.Title>
        <List.Description>{c.preview}</List.Description>
      </List.Content>
      <List.Trailing>
        <span className="text-xs text-muted-foreground">{c.timeAgo}</span>
      </List.Trailing>
    </List.Item>
  ))}
</List>`,
  withIcons: `<List divided>
  <List.Item><List.Leading><FileText /></List.Leading><List.Content><List.Title>Trade license</List.Title></List.Content></List.Item>
  <List.Item><List.Leading><Mail /></List.Leading><List.Content><List.Title>Mailing address</List.Title></List.Content></List.Item>
</List>`,
  withBadges: `<List divided>
  {notifications.map((n) => (
    <List.Item key={n.id} interactive onClick={() => mark(n.id)}>
      <List.Leading><Bell /></List.Leading>
      <List.Content>
        <List.Title>{n.title}</List.Title>
        <List.Description>{n.timeAgo}</List.Description>
      </List.Content>
      <List.Trailing>
        {n.unread && <Badge variant="primary" className="size-2 rounded-full p-0" />}
      </List.Trailing>
    </List.Item>
  ))}
</List>`,
}

/* ── Props table ── */

function getPropRows(): PropRow[] {
  return [
    {
      name: "List.density",
      type: '"dense" | "comfortable"',
      defaultValue: '"comfortable"',
      description:
        "Row padding. dense for compact rows in tables and side rails (py-2 px-3); comfortable for primary content lists (py-3 px-4).",
    },
    {
      name: "List.divided",
      type: "boolean",
      defaultValue: "false",
      description: "Adds a 1px divider between adjacent items. The last item never gets a bottom border.",
    },
    {
      name: "List.Item.interactive",
      type: "boolean",
      defaultValue: "false",
      description:
        "Marks the item as clickable — adds hover background, cursor, focus ring, role=\"button\", and Enter/Space keyboard activation.",
    },
    {
      name: "List.Item.onClick",
      type: "(event: MouseEvent<HTMLLIElement>) => void",
      description: "Fires when the user clicks the item or presses Enter / Space while focused. Pair with interactive.",
    },
    {
      name: "List.Leading",
      type: "ReactNode",
      description: "Left slot — typically an Avatar or icon. Sized at 16px for icons via [&_svg]:size-4. Override per use case.",
    },
    {
      name: "List.Content",
      type: "ReactNode",
      description: "Middle slot — wraps List.Title + List.Description. Always min-w-0 flex-1 so long titles truncate cleanly.",
    },
    {
      name: "List.Title",
      type: "ReactNode",
      description: "Primary text. Renders as <span> with truncation, font-medium.",
    },
    {
      name: "List.Description",
      type: "ReactNode",
      description: "Secondary text. Muted color, text-xs.",
    },
    {
      name: "List.Trailing",
      type: "ReactNode",
      description: "Right slot — action button, badge, timestamp, chevron. Shrinks to content; multiple items get gap-2.",
    },
  ]
}

/* ── Demo data ── */

const TICKETS = [
  { id: 1, title: "Login flow broken on Android", customer: "Mohammed Al Mansoori", timeAgo: "2h ago", initials: "MA", status: "In review", statusVariant: "warning" as const },
  { id: 2, title: "Trade license renewal stuck", customer: "Sarah Chen", timeAgo: "4h ago", initials: "SC", status: "Open", statusVariant: "default" as const },
  { id: 3, title: "Cannot upload supporting documents", customer: "Khalid Al Hashimi", timeAgo: "1d ago", initials: "KH", status: "Escalated", statusVariant: "destructive" as const },
]

const ATTACHMENTS = [
  { id: 1, name: "passport-scan.pdf", size: "1.4 MB", icon: <FileText /> },
  { id: 2, name: "emirates-id.jpg", size: "640 KB", icon: <FileText /> },
  { id: 3, name: "address-proof.pdf", size: "2.1 MB", icon: <FileText /> },
]

const NOTIFICATIONS = [
  { id: 1, title: "Mohammed approved your case escalation", timeAgo: "Just now", unread: true, icon: <AlertCircle /> },
  { id: 2, title: "Daily report ready", timeAgo: "1h ago", unread: true, icon: <Mail /> },
  { id: 3, title: "Khalid added 2 attachments to TKT-4521", timeAgo: "Yesterday", unread: false, icon: <Paperclip /> },
]

/* ── Page ── */

export default function ListPage() {
  const { t } = useTranslation()

  return (
    <ComponentPage
      title={t("docs.list.title")}
      description={t("docs.list.description")}
      category={t("docs.list.category")}
    >
      <Section title={t("docs.list.preview.title")} description={t("docs.list.preview.description")}>
        <PreviewBlock code={PREVIEW_SNIPPET}>
          <List divided className="max-w-md">
            {TICKETS.map((tk) => (
              <List.Item key={tk.id} interactive>
                <List.Leading>
                  <Avatar className="size-9">
                    <AvatarFallback>{tk.initials}</AvatarFallback>
                  </Avatar>
                </List.Leading>
                <List.Content>
                  <List.Title>{tk.title}</List.Title>
                  <List.Description>{tk.customer} · {tk.timeAgo}</List.Description>
                </List.Content>
                <List.Trailing>
                  <Badge variant={tk.statusVariant}>{tk.status}</Badge>
                </List.Trailing>
              </List.Item>
            ))}
          </List>
        </PreviewBlock>
      </Section>

      <Section title={t("docs.list.installation.title")} description={t("docs.list.installation.description")}>
        <CodeBlock code={INSTALL_SNIPPET} language="tsx" filename={t("docs.list.installation.filename")} />
      </Section>

      <Section title={t("docs.list.usage.title")} description={t("docs.list.usage.description")}>
        <CodeBlock code={USAGE_SNIPPET} language="tsx" />
      </Section>

      <Section title={t("docs.list.examples.title")} description={t("docs.list.examples.description")}>
        <div className="grid grid-cols-2 gap-4">
          <PreviewBlock
            title={t("docs.list.examples.simple.label")}
            description={t("docs.list.examples.simple.description")}
            code={EXAMPLE_SNIPPETS.simple}
          >
            <List className="max-w-sm">
              <List.Item><List.Content><List.Title>Onboarding</List.Title></List.Content></List.Item>
              <List.Item><List.Content><List.Title>Trade license renewal</List.Title></List.Content></List.Item>
              <List.Item><List.Content><List.Title>Vehicle registration</List.Title></List.Content></List.Item>
            </List>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.list.examples.divided.label")}
            description={t("docs.list.examples.divided.description")}
            code={EXAMPLE_SNIPPETS.divided}
          >
            <List divided className="max-w-sm">
              {ATTACHMENTS.map((a) => (
                <List.Item key={a.id}>
                  <List.Content>
                    <List.Title>{a.name}</List.Title>
                    <List.Description>{a.size}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.list.examples.density.label")}
            description={t("docs.list.examples.density.description")}
            code={EXAMPLE_SNIPPETS.density}
          >
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Dense</p>
                <List density="dense" divided className="max-w-sm">
                  {ATTACHMENTS.map((a) => (
                    <List.Item key={a.id}>
                      <List.Content><List.Title>{a.name}</List.Title></List.Content>
                    </List.Item>
                  ))}
                </List>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Comfortable</p>
                <List density="comfortable" divided className="max-w-sm">
                  {ATTACHMENTS.map((a) => (
                    <List.Item key={a.id}>
                      <List.Content><List.Title>{a.name}</List.Title></List.Content>
                    </List.Item>
                  ))}
                </List>
              </div>
            </div>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.list.examples.interactive.label")}
            description={t("docs.list.examples.interactive.description")}
            code={EXAMPLE_SNIPPETS.interactive}
          >
            <List divided className="max-w-sm">
              {TICKETS.slice(0, 2).map((tk) => (
                <List.Item key={tk.id} interactive>
                  <List.Content>
                    <List.Title>{tk.title}</List.Title>
                    <List.Description>{tk.customer}</List.Description>
                  </List.Content>
                  <List.Trailing>
                    <ChevronRight className="text-muted-foreground" />
                  </List.Trailing>
                </List.Item>
              ))}
            </List>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.list.examples.withAvatars.label")}
            description={t("docs.list.examples.withAvatars.description")}
            code={EXAMPLE_SNIPPETS.withAvatars}
          >
            <List divided className="max-w-sm">
              {TICKETS.map((tk) => (
                <List.Item key={tk.id}>
                  <List.Leading>
                    <Avatar className="size-9"><AvatarFallback>{tk.initials}</AvatarFallback></Avatar>
                  </List.Leading>
                  <List.Content>
                    <List.Title>{tk.customer}</List.Title>
                    <List.Description>{tk.title}</List.Description>
                  </List.Content>
                  <List.Trailing>
                    <span className="text-xs text-muted-foreground">{tk.timeAgo}</span>
                  </List.Trailing>
                </List.Item>
              ))}
            </List>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.list.examples.withIcons.label")}
            description={t("docs.list.examples.withIcons.description")}
            code={EXAMPLE_SNIPPETS.withIcons}
          >
            <List divided className="max-w-sm">
              {ATTACHMENTS.map((a) => (
                <List.Item key={a.id}>
                  <List.Leading>{a.icon}</List.Leading>
                  <List.Content>
                    <List.Title>{a.name}</List.Title>
                    <List.Description>{a.size}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </PreviewBlock>

          <PreviewBlock
            title={t("docs.list.examples.withBadges.label")}
            description={t("docs.list.examples.withBadges.description")}
            code={EXAMPLE_SNIPPETS.withBadges}
          >
            <List divided className="max-w-sm">
              {NOTIFICATIONS.map((n) => (
                <List.Item key={n.id} interactive>
                  <List.Leading>{n.icon}</List.Leading>
                  <List.Content>
                    <List.Title>{n.title}</List.Title>
                    <List.Description>{n.timeAgo}</List.Description>
                  </List.Content>
                  <List.Trailing>
                    {n.unread && <span aria-label="Unread" className="size-2 rounded-full bg-primary" />}
                  </List.Trailing>
                </List.Item>
              ))}
            </List>
          </PreviewBlock>
        </div>
      </Section>

      <Section title={t("docs.list.props.title")} description={t("docs.list.props.description")}>
        <PropsTable rows={getPropRows()} />
      </Section>

      <Section title={t("docs.list.accessibility.title")}>
        <p className="text-sm text-gray-700 dark:text-slate-300 max-w-3xl">
          {t("docs.list.accessibility.intro")}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-slate-300 list-disc ps-5 max-w-3xl">
          <li>{t("docs.list.accessibility.items.semantics")}</li>
          <li>{t("docs.list.accessibility.items.interactive")}</li>
          <li>{t("docs.list.accessibility.items.nestedActions")}</li>
          <li>{t("docs.list.accessibility.items.truncation")}</li>
        </ul>
      </Section>

      <UsesTokens foundations={["colors", "radius", "spacing", "typography"]} />

      <RelatedLinks
        title={t("docs.list.related.title")}
        items={[
          { label: "Table", href: "/ui/table" },
          { label: "Card", href: "/cards" },
          { label: "Avatar", href: "/ui/avatar" },
        ]}
      />
    </ComponentPage>
  )
}
