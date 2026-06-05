# Step 7A — Form & Input Migration

Phase 2 output. Phase 1 discovery is in [STEP_7A_DISCOVERY.md](./STEP_7A_DISCOVERY.md).

## Summary

Pre-flight discovery found 6/10 Form & Input pages already on the 8-section template (carried over from Step 4 + Step 6), so Phase 2 only built 4 net-new pages. One required installing a dependency and shipping a new composition primitive.

| # | Component | Bucket (discovery) | Action taken |
|---|---|---|---|
| 1 | Label | STUB / MISSING | **Built page** + new route + repointed broken sidebar link |
| 2 | Textarea | DONE | Skipped |
| 3 | Checkbox | DONE | Skipped |
| 4 | Radio Group | DONE | Skipped |
| 5 | Switch | STUB / MISSING | **Built page** + swapped legacy `FormsPage section="switch"` route |
| 6 | Slider | STUB / MISSING | **Built page** + swapped legacy `FormsPage section="slider"` route |
| 7 | Input OTP | DONE | Skipped |
| 8 | File Upload | DONE | Skipped |
| 9 | Date Picker | DONE | Skipped |
| 10 | Combobox | STUB / MISSING | **Built primitive + page** + installed cmdk + swapped ComingSoon route |

**4 commits, one per built page** (per the brief).

## Pages built

### 1. Label — [src/pages/label-page.tsx](../src/pages/label-page.tsx)

- **Route:** new — `/forms/label` did not exist before. Added to [src/App.tsx](../src/App.tsx).
- **Sidebar:** the existing entry was broken — it pointed at `/ui/label`, a route that doesn't exist. Repointed to `/forms/label` in [src/components/app-sidebar.tsx](../src/components/app-sidebar.tsx).
- **6 examples:** default, required (red asterisk + sr-only "required"), with helper text (right-aligned hint), for checkbox, visually hidden (sr-only) for icon-led search bars, disabled via `peer-disabled` selector.
- **CRM flavour:** ticket reference, customer name, Emirates ID, SLA-breach notification toggle.
- **Notes:** the primitive ([src/components/ui/label.tsx](../src/components/ui/label.tsx)) already handles `peer-disabled` dimming via Tailwind selectors — no extra `disabled` prop needed. The page documents that explicitly because it's non-obvious from the type signature.

### 2. Switch — [src/pages/switch-page.tsx](../src/pages/switch-page.tsx)

- **Route swapped:** `/forms/switch` was rendering `<FormsPage section="switch" />` (legacy dispatch). Now points at the dedicated page.
- **Toggle redirect untouched:** `/forms/toggle → Navigate /forms/switch` was already in place; left as is.
- **7 examples:** default unlabeled, with label, with description (MFA settings row), controlled (live demo showing on/off readout), disabled (two states), small size (sm vs default side-by-side), in a settings list (4-row notification preferences with icons).
- **Notes:** intro explicitly mentions the previous Toggle → Switch rename per the brief. The settings list example spans both columns of the lg grid (`className="lg:col-span-2"`) so it gets full width — common pattern when one example needs more horizontal room than the rest.

### 3. Slider — [src/pages/slider-page.tsx](../src/pages/slider-page.tsx)

- **Route swapped:** `/forms/slider` was the legacy `<FormsPage section="slider" />` dispatch. Now dedicated page.
- **7 examples:** default 0–100, with value label (controlled, live readout), range (two thumbs over 0–1000), step markers (tick row below the track for 0/25/50/75/100), qualitative min/max labels (Low/High for a priority weight), disabled, vertical orientation.
- **CRM flavour:** SLA response window in hours, price-range filter in AED, priority weight 1–5.
- **Notes:** the Radix `Slider` primitive renders one Thumb per array value, so range is implicit — pass `defaultValue={[100, 750]}` and you get two thumbs for free. Documented that pattern. The "step markers" example is custom render below the track, since Radix doesn't ship tick UI. Tab + arrow / PageUp/Down / Home/End keyboard rules called out in the a11y section, as is the `onValueChange` (live) vs `onValueCommit` (drag-release) split — important when feeding the value into a network call.

### 4. Combobox — [src/components/ui/combobox.tsx](../src/components/ui/combobox.tsx) + [src/pages/combobox-page.tsx](../src/pages/combobox-page.tsx)

This was the bigger lift.

- **Dependency added:** `cmdk@^1.1.1` (was absent — confirmed in package.json).
- **New primitive:** composition pattern with 10 exports (`Combobox`, `ComboboxTrigger`, `ComboboxContent`, `ComboboxInput`, `ComboboxList`, `ComboboxEmpty`, `ComboboxLoading`, `ComboboxGroup`, `ComboboxSeparator`, `ComboboxItem`). Wraps Radix Popover + cmdk. Standard shadcn-style composition; matches the rest of the codebase.
- **Route swapped:** `/forms/combobox` was `<ComingSoon />`. Now hits the page.
- **6 examples:** default single-select with check mark, multi-select with chip readout below the trigger, grouped agents by team (Tier 1 / Tier 2 / Tier 3 with `ComboboxSeparator`), creatable tags using the empty state as the create slot, async loading (mock 500ms timeout, `shouldFilter={false}` so cmdk doesn't fight the server), disabled trigger button.
- **CRM flavour:** agent assignee picker, ticket-tag filter, customer search.
- **Notes:**
  - `ComboboxContent` forwards `shouldFilter` to the internal cmdk `Command` — this is the key prop for async patterns; documented in the Props table.
  - The async example uses a debounced effect (500ms) and renders `ComboboxLoading` while the request is in flight. cmdk's `Command.Loading` shows up in the live region, so screen readers announce "Searching…" instead of "no results" during the wait.
  - The trigger uses `asChild` so consumers can drop any component (Button, Tag, Input-styled span) — shadcn convention.

## i18n additions

Four new namespaces under `docs.*` in [src/locales/en.json](../src/locales/en.json):

- `docs.label.*` — 10 top-level keys
- `docs.switch.*` — 10 top-level keys
- `docs.slider.*` — 10 top-level keys
- `docs.combobox.*` — 10 top-level keys

All four follow the canonical `docs.<component>.{title, description, category, preview, installation, usage, examples, props, accessibility, related}` shape from [STEP_3_TEMPLATE.md](./STEP_3_TEMPLATE.md).

## Routes table — final state of all 10 Form & Input routes

```
/forms/label       → LabelPage         (new this pass)
/forms/textarea    → TextareaPage      (Step 4)
/forms/checkbox    → CheckboxPage      (built earlier in Step 7-prep)
/forms/radio       → RadioPage         (built earlier in Step 7-prep)
/forms/switch      → SwitchPage        (new this pass)
/forms/slider      → SliderPage        (new this pass)
/forms/input-otp   → InputOtpPage      (built earlier)
/forms/fileupload  → FileUploadPage    (built earlier)
/forms/datepicker  → DatepickerPage    (built earlier)
/forms/combobox    → ComboboxPage      (new this pass)
/forms/toggle      → Navigate /forms/switch  (untouched)
```

No `<ComingSoon />` and no `<FormsPage section="…" />` dispatches remain for these 10 routes.

## Skipped pages (DONE bucket)

These six already had the full 8-section template + `UsesTokens` footer + populated i18n from Step 4 / Step 6. **No code changes**:

- [textarea-page.tsx](../src/pages/textarea-page.tsx)
- [checkbox-page.tsx](../src/pages/checkbox-page.tsx)
- [radio-page.tsx](../src/pages/radio-page.tsx)
- [input-otp-page.tsx](../src/pages/input-otp-page.tsx)
- [file-upload-page.tsx](../src/pages/file-upload-page.tsx)
- [datepicker-page.tsx](../src/pages/datepicker-page.tsx)

## Verification

- ✅ `npx tsc -b` clean after every commit and at the final state.
- ✅ All 10 `/forms/*` routes return HTTP 200.
- ✅ Each new page renders the full 8-section anatomy (title chip → preview → install → usage → examples → props → a11y → UsesTokens → related).
- ✅ `<UsesTokens>` footer applied to all 4 new pages with sensible foundation arrays:
  - Label: `colors, spacing, typography`
  - Switch: `colors, radius, spacing, motion`
  - Slider: `colors, radius, spacing, motion`
  - Combobox: `colors, radius, spacing, typography, elevation, motion`
- ✅ No `<ComingSoon />` or legacy `<FormsPage section="…" />` reachable for the 10 Form & Input routes.

## Cleanup debt (Step 7B candidates)

- **Legacy `FormsPage` section dispatches still present** for `slider`, `switch`, `text-editor`, and other forms sections — only the *routes* were repointed. The `section="…"` JSX inside [src/pages/forms-page.tsx](../src/pages/forms-page.tsx) is dead code reachable only via direct `<FormsPage>` import.
- **Sidebar Form & Input order** — Label sits between Textarea and Select in the sidebar nav, but that's the existing order. Worth re-evaluating in a polish pass alongside the rest of the navigation.
- **Combobox edge cases not documented:** virtualized lists for 1000+ rows, server-side cursor pagination, mixed-content items (avatar + label + meta). Could add in a follow-up if real-world usage surfaces a need.
- **Sidebar `sidebar.label` icon** is `Tag` (carried over from when it pointed at `/ui/label`). Could swap to a Label-specific icon, but the current `Tag` icon reads fine.
