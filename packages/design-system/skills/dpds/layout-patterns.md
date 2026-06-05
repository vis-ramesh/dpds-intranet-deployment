# What this covers

How to translate a wireframe or PRD into DS primitives with the right structure. Includes the layout-fidelity rule (from Golden Rule 9) and the canonical composition patterns — page header, two-column form+summary, list+detail, InputGroup, form with validation, empty state, modal confirm, loading, toast.

---

## Layout fidelity (Golden Rule 9 detail)

9. When given a visual reference (screenshot, wireframe, sketch, photo), translate the user's intent into DS primitives. Match structure and information hierarchy; let the DS define typography, spacing, and color. Never reproduce raw pixel details that conflict with the DS.

    **Layout fidelity is part of structure, not pixel detail.** When the wireframe shows N items in a horizontal row, render N items in a row at desktop widths — NOT a 2×N grid, NOT stacked. When the wireframe has a multi-column layout with a right sidebar, render the right sidebar (don't fold it into single-column). When the wireframe has a 4-column stat row, render 4 columns at `lg` and above. Use responsive utilities (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`) to handle smaller viewports; the desktop layout must match the wireframe.

---

## Common patterns

### Page header — title + breadcrumb + status Badge + action buttons

```tsx
<header className="flex flex-col gap-3">
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem><BreadcrumbPage>Vehicle registration</BreadcrumbPage></BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>

  <div className="flex flex-wrap items-center gap-3">
    <h1 className="text-3xl font-bold tracking-tight text-foreground">Vehicle registration renewal</h1>
    <Badge variant={submitted ? "success" : "secondary"}>
      {submitted ? "Submitted" : "Draft"}
    </Badge>
    <div className="ms-auto flex gap-2">
      <Button variant="gray">Save draft</Button>
      <Button variant="filled">Submit</Button>
    </div>
  </div>
</header>
```

### Two-column form + live summary

The starter's canonical sample is a dashboard (`src/services/sample-dashboard/page.tsx`) — hero greeting + a grid of `CardWidget` chart tiles + a `DataTable` of requests. For a form-plus-summary service, this is the skeleton:

```tsx
<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <Card>
    <CardHeader>
      <CardTitle>Vehicle details</CardTitle>
      <CardDescription>Required fields are marked.</CardDescription>
    </CardHeader>
    <CardContent>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* fields */}
      </form>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Summary</CardTitle>
      <CardDescription>Resident sees this before they confirm.</CardDescription>
    </CardHeader>
    <CardContent>
      {/* dl/dt/dd mirror of form state — empty fields render "—" */}
    </CardContent>
  </Card>
</div>
```

### InputGroup over absolute-positioned icons

```tsx
{/* ❌ Don't */}
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
  <Input className="pl-9" />
</div>

{/* ✅ Do */}
<InputGroup>
  <InputGroupAddon align="inline-start"><Search className="h-4 w-4" /></InputGroupAddon>
  <InputGroupInput placeholder="Search" />
</InputGroup>
```

### Form with validation messages

```tsx
<Field orientation="vertical">
  <FieldLabel htmlFor="plate">Plate</FieldLabel>
  <Input id="plate" value={plate} onChange={(e) => setPlate(e.target.value)} required />
  <FieldDescription>Format: emirate prefix + 1–5 digits.</FieldDescription>
  {error && <FieldError>{error}</FieldError>}
</Field>
```

### Empty state

```tsx
<EmptyState
  title="No applications yet"
  description="When you submit a service, it'll show up here."
  action={<Button variant="filled">Start an application</Button>}
/>
```

### Modal confirm flow

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="filledDestructive">Cancel registration</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Cancel registration?</DialogTitle>
      <DialogDescription>
        This can't be undone. Outstanding fees stay on the account.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild><Button variant="gray">Keep it</Button></DialogClose>
      <Button variant="filledDestructive" onClick={onCancel}>Yes, cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Loading state

```tsx
{loading ? (
  <div className="flex flex-col gap-3">
    <Skeleton className="h-8 w-1/3" />
    <Skeleton className="h-24 w-full" />
    <Skeleton className="h-24 w-full" />
  </div>
) : (
  <ApplicationList items={items} />
)}
```

### Toast on submit

```tsx
import { Toaster } from "@dpds-gov/design-system"
import { toast } from "sonner"

// mount once in App.tsx
<Toaster richColors position="top-center" />

// in a handler
async function onSubmit() {
  try {
    await submit(form)
    toast.success("Renewal submitted")
  } catch (e) {
    toast.error("Could not submit. Try again.")
  }
}
```

