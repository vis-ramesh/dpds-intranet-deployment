# What this covers

Side-by-side bad/good code pairs for the most common Golden Rule failures: hardcoded color, custom Card duplicate, raw Radix imports, service-local CSS, arbitrary Tailwind hex, gratuitous wrappers, missing-DS-component fake, and generic Card for KPI displays.

---

## What NOT to do (bad / good pairs)

```tsx
// ❌ BAD — hardcoded color, inline style
<button style={{ backgroundColor: "#1e40af", color: "white" }}>Submit</button>

// ✅ GOOD — DS Button with variant
<Button variant="filled">Submit</Button>
```

```tsx
// ❌ BAD — custom component duplicating Card
function MyBox({ children }) {
  return <div className="rounded-xl border bg-white p-6 shadow">{children}</div>
}

// ✅ GOOD — use the primitive
<Card><CardContent>{children}</CardContent></Card>
```

```tsx
// ❌ BAD — Radix imported directly (and the DS already re-exports it)
import * as DialogPrimitive from "@radix-ui/react-dialog"

// ✅ GOOD — Dialog re-exported from DS
import { Dialog, DialogContent, DialogTrigger } from "@dpds-gov/design-system"
```

```tsx
// ❌ BAD — service-local CSS file
import "./vehicle-registration.css"

// ✅ GOOD — Tailwind utility classes + DS semantic tokens
<div className="flex items-baseline justify-between border-b border-border pb-2">…</div>
```

```tsx
// ❌ BAD — arbitrary Tailwind hex colour
<div className="bg-[#0ea5e9] text-[#fff]">…</div>

// ✅ GOOD — semantic tokens
<div className="bg-primary text-primary-foreground">…</div>
```

```tsx
// ❌ BAD — wrapping a DS component for no reason
function PrimaryButton(props: ButtonProps) {
  return <Button variant="filled" {...props} />
}

// ✅ GOOD — use the DS export directly at the call site
<Button variant="filled" size="lg">Submit</Button>
```

```tsx
// ❌ BAD — silent fake of a missing DS component with custom styling
<input
  type="date"
  className="border border-gray-300 rounded-md px-3 py-2"
/>

// ✅ GOOD — visible placeholder + MISSING_COMPONENTS.md + end-of-build report
<Card className="border-2 border-dashed">
  <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
    <Badge variant="outline">Missing DS component</Badge>
    <p className="text-lg font-semibold">DatePicker</p>
    <p className="text-sm text-muted-foreground">
      Requested for: fine date range filter
    </p>
  </div>
</Card>
```

```tsx
// ❌ BAD — generic Card for a KPI display
<Card>
  <div className="flex items-center justify-between p-6">
    <div>
      <p className="text-sm text-muted-foreground">Saved Products</p>
      <p className="text-3xl font-bold">108+</p>
    </div>
    <Heart className="h-8 w-8" />
  </div>
</Card>

// ✅ GOOD — CardWidget family, the dedicated KPI primitive.
// Value goes inside CardWidgetContent (there is no CardWidgetValue export).
<CardWidget>
  <CardWidgetHeader>
    <CardWidgetTitle>Saved Products</CardWidgetTitle>
    <CardWidgetIcon><Heart /></CardWidgetIcon>
  </CardWidgetHeader>
  <CardWidgetContent>108+</CardWidgetContent>
</CardWidget>
```

