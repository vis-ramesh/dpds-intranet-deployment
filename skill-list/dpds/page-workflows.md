# What this covers

How to add a service/page to a starter-based project and wire it in: the per-service folder, route registration, the sidebar update workflow (N6), and the topbar/header update workflow (N7). Replaces the old `plan.json` / `dpds apply` flow — services are scaffolded by hand and wired into the shell.

---

## Add a new service

One service = one folder under `src/services/<name>/`. Build `page.tsx` with imported DS primitives, then make exactly these additive edits to the shell:

1. **Route** — add a `<Route path="/services/<name>" element={<YourPage />} />` inside the `<Layout />` route in `src/App.tsx`.
2. **Sidebar** — add one entry to the `navItems` array in `src/components/app-sidebar.tsx`:
   ```ts
   { titleKey: "sidebar.yourKey", url: "/services/<name>", icon: SomeLucideIcon }
   ```
3. **i18n** — add `sidebar.yourKey` (and any page strings) to **both** `src/locales/en.json` and `src/locales/ar.json`. Every visible string flows through `useTranslation()`.

Don't modify the rest of the shell (`layout.tsx`, sidebar internals, header, `i18n.ts`, `main.tsx`). The shell is the consistent frame across every service.

---

## Breadcrumbs — use the shell slot (N8)

The shell wraps the app in `BreadcrumbProvider` and renders the trail in the header (via `useBreadcrumbSlot`). A page **does not** place a `<Breadcrumb>` in its rendered output — it builds the breadcrumb node and hands it to `useBreadcrumb(node)`, which portals it into the header slot and clears it on unmount. You pass the **node directly** — the hook owns the effect, so there's no setter and no `useEffect` to write.

```tsx
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator, useBreadcrumb,
} from "@dpds-gov/design-system"

export default function VehicleRegistrationPage() {
  // builds the trail and renders it in the shell header — not in this page's body
  useBreadcrumb(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Vehicle registration</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  return (/* page content — no <Breadcrumb> here */)
}
```

> Rule: build the `<Breadcrumb>` and pass it to `useBreadcrumb(...)`; never put it in the page's returned JSX. `useBreadcrumbSlot()` is the shell's consumer side — don't call it from a page.

---

## Wizard / multi-step services — stepper outside the step (N9)

For a service built as a wizard, the **stepper sits outside the step content** at page level, so it persists while the step body swaps beneath it. Never nest the stepper inside the `Card`/`CardWidget`/form that holds the current step.

```tsx
<div className="flex flex-col gap-6">
  {/* Stepper — page level, OUTSIDE the step surface, persists across steps */}
  <Stepper>
    <StepperStep status={step > 0 ? "completed" : "active"}>Vehicle</StepperStep>
    <StepperStep status={step > 1 ? "completed" : step === 1 ? "active" : "pending"}>Owner</StepperStep>
    <StepperStep status={step === 2 ? "active" : "pending"}>Review</StepperStep>
  </Stepper>

  {/* Step body — swaps per step, INSIDE its own surface */}
  <Card>
    <CardContent>
      {step === 0 && <VehicleStep />}
      {step === 1 && <OwnerStep />}
      {step === 2 && <ReviewStep />}
    </CardContent>
  </Card>
</div>
```

> Rule: one persistent stepper above; the per-step `Card`/form below it. Don't re-render the stepper inside each step.

---

## Sidebar from screenshot / PRD / prompt (N6)

When the user supplies a screenshot, PRD snippet, or description of the navigation, **rebuild** the sidebar — don't append.

1. **Extract** every nav item (label, path, optional children).
2. **Map** each to a lucide-react icon (`LayoutDashboard`, `Users`, `FileText`, `Settings`, `BarChart2`, `Bell`…). No emoji, no inline SVG.
3. **i18n keys** — convert each label to `sidebar.<slug>` and add EN + AR translations.
4. **Rebuild `navItems`** in `src/components/app-sidebar.tsx` from scratch (flat list; max 1 level of `children`).
5. **Routes** — add a matching `<Route>` in `src/App.tsx` for each item.

```ts
// src/components/app-sidebar.tsx — navItems rebuilt from a screenshot
const navItems = [
  { titleKey: "sidebar.dashboard", url: "/",          icon: LayoutDashboard },
  { titleKey: "sidebar.cases",     url: "/cases",      icon: FileText },
  { titleKey: "sidebar.officers",  url: "/officers",   icon: Users },
  { titleKey: "sidebar.reports",   url: "/reports",    icon: BarChart2 },
  { titleKey: "sidebar.settings",  url: "/settings",   icon: Settings,
    children: [
      { titleKey: "sidebar.settings_general",     url: "/settings/general" },
      { titleKey: "sidebar.settings_permissions", url: "/settings/permissions" },
    ] },
]
```

> The new `navItems` array is the single source of truth — old entries are discarded. Always add the EN + AR keys and the routes.

---

## Topbar / header from screenshot or PRD (N7)

When a screenshot/PRD shows a different topbar (search, action buttons, bell, avatar, theme toggle, etc.), **do not create a new header component**. There is one header in the shell.

- **Global controls** (always visible — logo, user menu, theme toggle): edit the shell header in place. Use existing DS primitives (`Button`, `Input`, `Avatar`, `Badge`, `DropdownMenu`, `Tooltip`). Keep RTL with logical props.
- **Page-specific controls** (a search box or export button on one page only): inject from the page via the header-action hook — don't touch the header component.

```tsx
// Page-specific header action — pass the node directly; the hook owns the effect.
useHeaderAction(
  <Button variant="tonal" size="sm">
    <Download className="size-4" aria-hidden="true" /> Export
  </Button>
)
```

| Control type | Where |
|---|---|
| Global (logo, user menu, theme toggle) | edit the shell header in place |
| Page-specific (search/export on one page) | inject via the header-action hook from the page |

> **Hard rule**: one header, always. A different-looking design is a modification of the existing header, never a new one.
