import { ArrowUpRight, Gift } from "lucide-react"

import {
  CardWidget,
  CardWidgetAction,
  CardWidgetContent,
  CardWidgetFooter,
  CardWidgetHeader,
  CardWidgetIcon,
  CardWidgetTitle,
} from "@dpds-gov/design-system"
import { FlipCard, FlipCardBack, FlipCardFront } from "@dpds-gov/design-system"
import { Badge } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import {
  ComponentPage,
  PreviewBlock,
  Section,
  UsedComponents,
} from "@/components/docs"
import type { UsedComponentItem } from "@/components/docs"

/* ── Snippets ── */

const FLIP_WIDGET_SNIPPET = `<CardWidget>
  <CardWidgetHeader>
    <CardWidgetIcon>
      <img src="/img/esaad.svg" alt="Esaad" className="w-full h-full object-contain" />
    </CardWidgetIcon>
    <CardWidgetTitle>Esaad benefits</CardWidgetTitle>
    <CardWidgetAction>
      <Badge size="sm" variant="success">Active</Badge>
    </CardWidgetAction>
  </CardWidgetHeader>

  <CardWidgetContent>
    <FlipCard className="h-[220px] w-full">
      <FlipCardFront className="rounded-2xl overflow-hidden">
        <img src="/img/card.png" alt="Esaad card" className="w-full h-full object-cover" />
      </FlipCardFront>

      <FlipCardBack className="rounded-2xl overflow-hidden bg-card border border-border p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Gift className="size-4 text-primary-600" />
          <p className="font-mono font-bold text-sm">Top redemptions</p>
        </div>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Dining</span>
            <span className="font-mono font-bold">38%</span>
          </li>
          {/* …more rows */}
        </ul>
      </FlipCardBack>
    </FlipCard>
  </CardWidgetContent>

  <CardWidgetFooter>
    <Sparkles className="size-3.5 text-primary-600" />
    <span className="text-xs text-muted-foreground">Hover the card to flip</span>
    <Button variant="text" size="sm" className="ms-auto">
      Full report <ArrowUpRight className="size-3.5" />
    </Button>
  </CardWidgetFooter>
</CardWidget>`


const USED: UsedComponentItem[] = [
  { label: "CardWidget", href: "/ui/card-widget" },
  { label: "FlipCard",   href: "/ui/flip-card" },
  { label: "Badge",      href: "/ui/badges" },
  { label: "Button",     href: "/buttons" },
  { label: "Separator",  href: "/ui/separator" },
]

/* ── Page ── */

export default function CardFlipEsaadPage() {
  return (
    <ComponentPage
      title="Flip Card widget"
      description="CardWidget is the parent surface. FlipCard lives inside CardWidgetContent — hover flips to reveal back-side stats. Front face uses /img/card.png."
      category="Card patterns"
    >
      <Section
        title="Hero flip widget"
        description="CardWidget header + content + footer. The hover-flip lives inside CardWidgetContent — clean separation of widget chrome and animated content."
      >
        <PreviewBlock code={FLIP_WIDGET_SNIPPET}>
          <div className="w-full max-w-md mx-auto">
            <CardWidget>
              <CardWidgetHeader>
                <CardWidgetIcon>
                  <img src="/img/esaad.svg" alt="Esaad" className="w-full h-full object-contain" />
                </CardWidgetIcon>
                <CardWidgetTitle>Esaad benefits</CardWidgetTitle>
                <CardWidgetAction>
                  <Badge size="sm" variant="success">Active</Badge>
                </CardWidgetAction>
              </CardWidgetHeader>

              <CardWidgetContent>
                <FlipCard className="h-[220px] w-full">
                  <FlipCardFront className="rounded-2xl overflow-hidden">
                    <img src="/img/card.png" alt="Esaad card" className="w-full h-full object-cover" />
                  </FlipCardFront>

                  <FlipCardBack className="rounded-2xl overflow-hidden bg-card border border-border p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Gift className="size-4 text-primary-600" />
                      <p className="font-mono font-bold text-sm">Top redemptions</p>
                    </div>
                    <ul className="flex flex-col gap-2">
                      <li className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Dining</span>
                        <span className="font-mono font-bold">38%</span>
                      </li>
                      <li className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Health &amp; wellness</span>
                        <span className="font-mono font-bold">24%</span>
                      </li>
                      <li className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Retail</span>
                        <span className="font-mono font-bold">19%</span>
                      </li>
                      <li className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Travel</span>
                        <span className="font-mono font-bold">11%</span>
                      </li>
                    </ul>
                  </FlipCardBack>
                </FlipCard>
              </CardWidgetContent>

              <CardWidgetFooter>
                <Button variant="outlineGray" size="sm" className="w-full">
                  Download <ArrowUpRight className="size-3.5" />
                </Button>
              </CardWidgetFooter>
            </CardWidget>
          </div>
        </PreviewBlock>
      </Section>



      <UsedComponents items={USED} />
    </ComponentPage>
  )
}
