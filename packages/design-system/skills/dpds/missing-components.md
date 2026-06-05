# What this covers

The workflow when the DS doesn't export a primitive you need: render a visible placeholder, track it in MISSING_COMPONENTS.md, surface in the build summary. Includes the recipient email constant.

---

## When the DS is missing something

If the DS doesn't export a component you need (e.g. `DatePicker`, `CurrencyInput`, a domain-specific widget), do all three of these — not one of them:

### 1. Insert a visible placeholder

Render this exact pattern where the component would have gone:

```tsx
<Card className="border-2 border-dashed">
  <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
    <Badge variant="outline">Missing DS component</Badge>
    <p className="text-lg font-semibold">CalendarPicker</p>
    <p className="text-sm text-muted-foreground">
      Requested for: fine date range filter
    </p>
  </div>
</Card>
```

Use DS primitives (`Card`, `Badge`) so the placeholder still looks system-native. The dashed border + "Missing DS component" badge make the gap unmistakable in light, dark, and mobile. Never silently substitute a custom-styled `<div>`, `<input>`, or other raw HTML element — that hides the gap from reviewers.

### 2. Write `MISSING_COMPONENTS.md` in the service folder

At `src/services/<service-name>/MISSING_COMPONENTS.md`, write a markdown table:

| Component | Used in (file:line) | Purpose |
|-----------|---------------------|---------|
| CalendarPicker | search-form.tsx:42 | fine date range filter |
| CurrencyInput | pay-form.tsx:18 | AED amount input |

This persists the request beyond the chat session, so reviewers and the DS owner have a durable record. Append a new row every time you insert another placeholder; do not overwrite earlier rows.

### 3. Surface in the end-of-build summary

See the next section. Every placeholder you inserted in steps 1 and 2 must appear in the final summary message, along with a pre-filled mailto link to request the missing components.

Examples of legitimate gaps: a specialised UAE Pass document upload widget, a payment summary block tied to a specific gateway, a vehicle-class iconography set. Examples that are NOT gaps: a "primary blue button" (use `Button variant="filled"`), a "subtle card with a heading" (use `Card`).

