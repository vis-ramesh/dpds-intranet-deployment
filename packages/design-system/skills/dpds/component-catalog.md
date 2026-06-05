# What this covers

The full DS export catalog: every component you should reach for, with variants, sizes, props, and use-when guidance. Pulled directly from `node_modules/@dpds-gov/design-system/dist/index.d.ts` — variants/sizes are exhaustive.

---

## Component catalog

Every component, hook, and utility below is exported from `@dpds-gov/design-system`. Variants and sizes are taken from the installed `.d.ts` — they are exhaustive. Don't pass a variant or size string that isn't listed.

### Inputs

**Button** — `import { Button } from "@dpds-gov/design-system"`
- variants: `text`, `filled`, `filledDestructive`, `filledWarning`, `tonal`, `gray`, `outlineGray`, `outlineGreen`, `linkGray`, `linkGreen`
- sizes: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `icon-xs`, `icon-sm`, `icon-md`, `icon-lg`, `icon-xl`, `icon-xxl`
- props: `asChild` (render as child element via Slot)
- Use when: any clickable action. Default to `filled` for primary, `gray` for secondary, `text` for tertiary, `filledDestructive` for destructive.

```tsx
<Button variant="filled" size="lg">Submit</Button>
<Button variant="filledDestructive" size="md">Delete</Button>
<Button variant="gray" size="icon-md" aria-label="Settings"><Settings className="h-4 w-4" /></Button>
```

**Input** — plain text/email/date/number field. No variants; styled via `className`.
**Textarea** — multi-line text.
**Label** — `<Label htmlFor="id">` paired with an input. Always use this primitive, never a `<span>` or `<div>`.

**InputGroup** + **InputGroupAddon** + **InputGroupInput** + **InputGroupText** + **InputGroupButton** + **InputGroupTextarea**
- `InputGroupAddon` align: `inline-start`, `inline-end`, `block-start`, `block-end`
- `InputGroupButton` sizes: `xs`, `sm`, `icon-xs`, `icon-sm`
- Use when: you need an icon, prefix, or trailing button inside an input. Never absolute-position your own.

```tsx
<InputGroup>
  <InputGroupAddon align="inline-start"><Search className="h-4 w-4" /></InputGroupAddon>
  <InputGroupInput placeholder="Search by name" />
</InputGroup>
```

**Select** + **SelectTrigger** + **SelectValue** + **SelectContent** + **SelectItem** + **SelectGroup** + **SelectLabel** + **SelectSeparator**
- Use when: short list of choices (≤ ~15). For longer lists, use `Combobox`.

```tsx
<Select value={v} onValueChange={setV}>
  <SelectTrigger><SelectValue placeholder="Pick one" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>
```

**Combobox** + `ComboboxTrigger` + `ComboboxContent` + `ComboboxInput` + `ComboboxList` + `ComboboxGroup` + `ComboboxItem` + `ComboboxEmpty` + `ComboboxLoading` + `ComboboxSeparator`
- Use when: searchable list (e.g. emirate selection across the GCC, large reference data). Set `shouldFilter={false}` on `ComboboxContent` for async loading.

**Checkbox** — boolean. Always with a `<Label>`.

**RadioGroup** + **RadioGroupItem** — pick one of N. Always wrap each item in a labelled row.

**Switch** — boolean toggle, visually distinct from Checkbox. Use for "enable / disable" semantics, not for "agree to terms".

**Calendar** + **CalendarDayButton** — date picker surface. Wrap in `Popover` for a popup date input.

**Slider** — numeric range. Avoid for currency or precise values; use `Input` type="number" instead.

**InputOTP** + **InputOTPGroup** + **InputOTPSlot** + **InputOTPSeparator** — one-time-code entry. Use for SMS / email verification flows.

**PhoneInput** — UAE / international phone with built-in formatting. Props: `id`, `onChangeNumber`, `invalid`.

**FileInput** / **MultiFileInput** — file selection. Use these, not raw `<input type="file">`.

**Field** + **FieldLabel** + **FieldDescription** + **FieldError** + **FieldGroup** + **FieldContent** + **FieldSeparator** + **FieldSet** + **FieldLegend** + **FieldTitle**
- orientation: `horizontal`, `vertical`, `responsive`
- Use when: building a structured form with label + help text + error in one row/column block.

### Layout

**Card** + **CardHeader** + **CardTitle** + **CardDescription** + **CardAction** + **CardContent** + **CardFooter**
- Generic container for grouping any content that **isn't** a KPI display. Forms, list rows, descriptive content blocks, modal bodies — anything where you're framing related fields or copy. Never replicate with a `<div>` + Tailwind classes.
- **If the wireframe shows a number + label + icon, the answer is `CardWidget`, not `Card`.** Reaching for a generic `Card` with custom flex/padding when `CardWidget` would fit is a primitive-choice failure caught in review.

**CardWidget** + `CardWidgetHeader` + `CardWidgetIcon` + `CardWidgetTitle` + `CardWidgetContent` + `CardWidgetFooter` + `CardWidgetAction`
- size: `default`, `sm`
- **The default for KPI displays.** Any time you're rendering a labeled metric with an accompanying icon (e.g. "108+ Saved Products" with a heart icon), this is the primitive. The canonical composition pattern lives in `src/services/sample-dashboard/components/widgets.tsx` — read that file before composing KPIs.
- Also use for: dashboard chart tiles (chart inside `CardWidgetContent`), link-style entry points, summary tiles with a leading icon.

**Container** — width-constrained wrapper.
- size: `sm`, `md`, `lg`, `xl`, `2xl`, `full`

**Grid** + **Stack** + **HStack** + **VStack**
- `Grid` cols: `1`, `2`, `3`, `4`, `5`, `6`, `12`. gap: `0`–`12`.
- `Stack` direction: `row`, `column`, `row-reverse`, `column-reverse`. align: `start`, `center`, `end`, `baseline`, `stretch`. justify: `start`, `center`, `end`, `between`, `around`, `evenly`. `wrap` bool.
- Use when: composing layouts. `<Stack>` over `<div className="flex">` for anything more than a one-liner.

**Separator** — divider line. orientation: `horizontal`, `vertical`.

**AspectRatio** — ratio-locked container (`ratio` prop).

**ScrollArea** + **ScrollBar** — styled scroll surface.

**ResizablePanel** + **ResizablePanelGroup** + **ResizableHandle** — split panes.

### Data display

**Badge** — `import { Badge }`
- variants: `default`, `secondary`, `outline`, `ghost`, `info`, `success`, `warning`, `destructive`, `danger`, `pending`, `neutral`, `link`
- sizes: `sm`, `md`, `lg`
- Use when: status pill, count, label. For tag-style entities (chips that close, filter chips), use `Tag`.

**Tag** — `import { Tag }`
- variants: `default`, `primary`, `secondary`, `success`, `warning`, `destructive`
- sizes: `sm`, `md`

**Avatar** + **AvatarImage** + **AvatarFallback** + **AvatarBadge** + **AvatarGroup** + **AvatarGroupCount**
- Avatar size: `default`, `sm`, `lg`

**DataTable** + **DataTableToolbar** + table primitives (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`)
- Use `DataTable` for paginated / sortable / filterable data. The plain `Table` primitives are for static lists.
- `createSelectColumn` helper for row-selection columns.

**EmptyState** + **EmptyStateHero**
- Use when: no records, search returned zero, feature not yet enabled. Never a custom div.

**StatCard** — `{ title, description, data, glowPosition, index }`
- Denser/illustrated variant of `CardWidget`. Use when the wireframe explicitly shows a hero stat tile with an attached chart or trend line.

**StatTile** — compact KPI tile (`StatTileProps` exposes a `delta` for up/down indicators).
- Simplest/tightest variant. Use when the wireframe explicitly shows a label + number + delta, no large illustrated icon box.

For most KPI cards, `CardWidget` is the default. Reach for `StatCard` or `StatTile` only when the wireframe matches their specific visual shape.

**ProgressTracker** + **ProgressTrackerHeader** + **ProgressTrackerContent** + **ProgressTrackerItem**
- `ProgressTrackerItem` status: `pending`, `active`, `completed` (see `StepStatus` re-export).
- Use for: multi-step workflows (application progress, case stages).

**Progress** — single-value progress bar.

**Stepper** + **StepperStep** — alternative multi-step UI with explicit steps array.

**List** + **ListItem** + **ListLeading** + **ListContent** + **ListTitle** + **ListDescription** + **ListTrailing** — vertical list rows with leading icon / content / trailing action.

### Overlays

**Dialog** + **DialogTrigger** + **DialogContent** + **DialogHeader** + **DialogTitle** + **DialogDescription** + **DialogFooter** + **DialogClose** + **DialogOverlay** + **DialogPortal**
- Use for: confirm flows, destructive actions, focused tasks. `DialogContent` accepts `showCloseButton` boolean.

**Drawer** (vaul-backed) — same surface area as Dialog, slides from edge. Use on mobile-first flows.

**Sheet** + `SheetTrigger` + `SheetContent` + … — side panel.

**Popover** + **PopoverTrigger** + **PopoverContent** + **PopoverAnchor** + **PopoverHeader** + **PopoverTitle** + **PopoverDescription**

**Tooltip** + **TooltipProvider** + **TooltipTrigger** + **TooltipContent**
- Always wrap your tree in `<TooltipProvider>` once at the root or page level.

**HoverCard** + **HoverCardTrigger** + **HoverCardContent** — preview on hover. Don't use on touch-only flows.

**DropdownMenu** + `DropdownMenuTrigger` + `DropdownMenuContent` + `DropdownMenuItem` + `DropdownMenuCheckboxItem` + `DropdownMenuRadioItem` + `DropdownMenuLabel` + `DropdownMenuSeparator` + `DropdownMenuGroup` + `DropdownMenuPortal` + `DropdownMenuSub` + `DropdownMenuSubTrigger` + `DropdownMenuSubContent` + `DropdownMenuShortcut`

**ContextMenu** + `ContextMenuTrigger` + `ContextMenuContent` + … (mirror DropdownMenu surface).

**Command** + `CommandInput` + `CommandList` + `CommandEmpty` + `CommandGroup` + `CommandItem` + `CommandShortcut` + `CommandSeparator` + `CommandLoading` + `CommandDialog` — palette / cmdk.

### Navigation

**Breadcrumb** + **BreadcrumbList** + **BreadcrumbItem** + **BreadcrumbLink** + **BreadcrumbPage** + **BreadcrumbSeparator** + **BreadcrumbEllipsis** + **BreadcrumbProvider**
- Use `useBreadcrumb` + `useBreadcrumbSlot` for portal-driven breadcrumb updates from inside route children.

**Navbar** + **NavbarBrand** + **NavbarLinks** + **NavbarLink** + **NavbarSearch** + **NavbarTrailing** — top navigation bar.

**Sidebar** + the full `Sidebar*` surface (Provider, Header, Footer, Content, Group, Menu, MenuItem, MenuButton, MenuAction, MenuBadge, MenuSkeleton, MenuSub, Trigger, Rail, Inset, Separator, Input)
- `SidebarMenuButton` variants: `default`, `outline`. sizes: `default`, `sm`, `lg`.
- Use `useSidebar` to read/control the open state.

**Tabs** + **TabsList** + **TabsTrigger** + **TabsContent**
- `TabsList` variant: `default`, `line`.

**Pagination** + `PaginationContent` + `PaginationItem` + `PaginationLink` + `PaginationPrevious` + `PaginationNext` + `PaginationFirst` + `PaginationLast` + `PaginationEllipsis`.

**Menu** — flat menu primitive (separate from DropdownMenu).

**NavigationMenu** + the full `NavigationMenu*` surface — base-ui navigation menu with positioner.

### Feedback

**Alert** + **AlertTitle** + **AlertDescription** + **AlertAction**
- variants: `default`, `info`, `success`, `warning`, `destructive`

**Banner**
- variants: `info`, `success`, `warning`, `error`
- props: `title`, `description`, `action`, `dismissible`, `onDismiss`, `icon`

**Toaster** — the sonner-backed toast surface. Mount once near the root, then call `toast()` from sonner.

```tsx
import { Toaster } from "@dpds-gov/design-system"
import { toast } from "sonner"
// in App: <Toaster richColors />
// in handler: toast.success("Renewal submitted")
```

**Spinner**
- size: `xs`, `sm`, `md`, `lg`, `xl`
- tone: `default`, `destructive`, `muted`, `foreground`, `onPrimary`

**Skeleton** — loading placeholder. Always prefer this over a custom shimmer div.

### Theme

**ThemeProvider** — wrap your app once. Props: `defaultTheme` (`"light" | "dark" | "system"`), `storageKey`.
**ThemeToggle** — the user-facing switcher. Already mounted in `src/App.tsx`.
**useTheme()** — returns `{ theme, setTheme }`. Use only if you need theme-aware logic (e.g. choosing between two image assets). For styling, always rely on the CSS variable swap on `<html class="dark">`.

### Branded / opinionated

**UAEPassButton** — `import { UAEPassButton }`
- variants: `outline`, `black`, `white`
- radius: `default`, `rectangle`, `pill`
- The single canonical UAE Pass sign-in affordance. Don't roll your own.

**LoginModalContent** — drop-in inside a Dialog when you need a UAE-Pass login flow.

**LangDropdown** — English / Arabic switcher. Hosts already set `<html dir>`; `useIsRtl()` reads it.

**UserDropdown** — header-mounted user menu (name, email, avatar, profile / settings / sign-out actions).

**Header** — preassembled top header with theme + language controls.

**WalletCards** + `WalletCard` — UAE Pass wallet card stack.

**UpcomingAppointments** — branded appointments summary widget.

**ActivityCard** — branded activity callout.

**ProfileSwitcher** — multi-account switcher (used in dashboards).

**Walkthrough** + `WalkthroughStep` + `useWalkthrough` — guided product tour primitive.

### Charts

All charts live under `@dpds-gov/design-system`. Use them as-is; do not bring `recharts` or `nivo` into the consumer.

`ActivityBarChart`, `ActivityComposedChart`, `BubbleStatChart`, `GaugeChart`, `GlowRadarChart`, `InvertedPyramidChart`, `MultiLineChart`, `PointCloudChart`, `SalesReportChart`, `SankeyChart`, `StackedBarChart`, `StraightLineChart`.

Each takes `data`, the relevant `series` / `xKey` / `metricKey` props (see the type-defs in your editor), `height`, and `className`. The colour palette is driven by tokens — don't override fills with hex literals.

The sample dashboard (`src/services/sample-dashboard/`) demonstrates the canonical chart-tile composition: wrap each chart inside a `CardWidget` + `CardWidgetHeader` + `CardWidgetIcon` + `CardWidgetTitle` + `CardWidgetContent`. Series colours come from `var(--chart-primary)`, `var(--chart-secondary)`, `var(--chart-tertiary)`, etc. — never hex literals. See `src/services/sample-dashboard/components/widgets.tsx` for the full pattern across all eleven chart types.

### Animation primitives

`AnimatedBeam`, `AnimatedBeamMultipleOutputDemo`, `AnimatedList`, `AnimatedListItem`, `BentoGrid`, `BentoCard`, `FadeIn`, `MagicCard`, `Marquee`, `FlipCard` + `FlipCardFront` + `FlipCardBack`, `DecorImage`.

Use sparingly. A Dubai Police service page typically does not need a marquee or animated beam. `FadeIn` for first-paint of major sections is fine.

### Maps

`UaeHex` (hexbin map of the UAE), `UaeMap` (vector outline).

### Hooks

- `useTheme()` — `{ theme, setTheme }`
- `useIsMobile()` — boolean, mobile breakpoint
- `useIsRtl()` — boolean, reads `<html dir>` reactively via MutationObserver
- `useSidebar()` — sidebar open state + controls
- `useBreadcrumb()` / `useBreadcrumbSlot()` — programmatic breadcrumb portal updates
- `useHeaderAction()` — register a trailing action on the shared Header
- `useWalkthrough()` — drive a Walkthrough programmatically

### Utility

- `cn(...inputs)` — class-merging helper (`clsx` + `tailwind-merge` under the hood). Use this anywhere you'd otherwise template-literal classes together.

