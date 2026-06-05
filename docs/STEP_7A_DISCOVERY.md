# Step 7A — Discovery

Phase 1 output. No code changed; classification only. **PAUSE before Phase 2 to confirm.**

## Method

For each of the 10 Form & Input components, checked:
1. Does the docs page file exist in `src/pages/`?
2. Does it use `<ComponentPage>` (template wrapper), `<UsesTokens>` (Step 5 footer), `<RelatedLinks>` (template close), and ≥6 `<Section>` blocks (template anatomy)?
3. Is the route in [src/App.tsx](../src/App.tsx) pointing at a real page or a stub/dispatch?
4. Are i18n keys present under `docs.<name>.*` in [src/locales/en.json](../src/locales/en.json)?

Classifications:

- **DONE** — file present, full anatomy, i18n populated, route hits the real page.
- **PARTIAL** — file exists with content but missing one or more pieces (wrapper, section, UsesTokens footer, i18n namespace).
- **STUB / MISSING** — page is `<ComingSoon />`, dispatches to legacy `<FormsPage section="…" />`, or the file doesn't exist at all.

## Result

| # | Component | Bucket | File | Route element | i18n | Notes |
|---|---|---|---|---|---|---|
| 1 | Label | **STUB** | MISSING | **No route at all** | MISSING | Needs page + route + i18n. Primitive at `src/components/ui/label.tsx` (18 lines, shadcn-style). |
| 2 | Textarea | **DONE** | [textarea-page.tsx](../src/pages/textarea-page.tsx) (312 L) | `<TextareaPage />` | `docs.textarea.*` (10 keys) | Built earlier; full template anatomy. |
| 3 | Checkbox | **DONE** | [checkbox-page.tsx](../src/pages/checkbox-page.tsx) (404 L) | `<CheckboxPage />` | `docs.checkbox.*` (10 keys) | Built earlier; full template. |
| 4 | Radio Group | **DONE** | [radio-page.tsx](../src/pages/radio-page.tsx) (474 L) | `<RadioPage />` | `docs.radio.*` (10 keys) | Built earlier; full template. |
| 5 | Switch (absorbs Toggle) | **STUB** | MISSING | `<FormsPage section="switch" />` (legacy dispatch) | MISSING | Toggle → Switch redirect already in place: `<Route path="/forms/toggle" element={<Navigate to="/forms/switch" replace />} />`. Primitive `src/components/ui/switch.tsx` (36 lines). |
| 6 | Slider | **STUB** | MISSING | `<FormsPage section="slider" />` (legacy dispatch) | MISSING | Primitive `src/components/ui/slider.tsx` (55 lines, Radix wrapper). |
| 7 | Input OTP | **DONE** | [input-otp-page.tsx](../src/pages/input-otp-page.tsx) (470 L) | `<InputOtpPage />` | `docs.inputOtp.*` (10 keys) | Built earlier; full template. |
| 8 | File Upload | **DONE** | [file-upload-page.tsx](../src/pages/file-upload-page.tsx) (357 L) | `<FileUploadPage />` | `docs.fileUpload.*` (12 keys — split single/multi) | Built earlier; full template with split usage/examples sections. |
| 9 | Date Picker | **DONE** | [datepicker-page.tsx](../src/pages/datepicker-page.tsx) (433 L) | `<DatepickerPage />` | `docs.datepicker.*` (10 keys) | Built earlier; full template documenting Popover + Calendar composition. |
| 10 | Combobox | **STUB** | MISSING | `<ComingSoon />` | MISSING | **No primitive in `src/components/ui/`.** `cmdk` is not a dependency in [package.json](../package.json). Phase 2 for this one is meaningfully bigger than the other 3. |

**Totals: 6 DONE · 0 PARTIAL · 4 STUB**

## Phase-2 scope flags

Two items in the STUB bucket are bigger than the brief implies:

### 1. Label — no route exists
The brief said *"Routes for these 5 components currently point to `<ComingSoon />` stubs"* but no `/forms/label` route exists in [src/App.tsx](../src/App.tsx) at all. Phase 2 for Label needs:
- Page file
- i18n namespace
- **New route added** (not just swap-the-element)
- Sidebar nav entry — TBD whether it's already there

### 2. Combobox — no primitive, no dep
No `src/components/ui/combobox.tsx`, and `cmdk` is not in [package.json](../package.json). Building Combobox per the brief requires:
- `npm install cmdk` (a new dep)
- `src/components/ui/combobox.tsx` (built from cmdk + Popover, per shadcn convention)
- Then the docs page with the 8-section template

This is a noticeably bigger lift than Switch / Slider. May warrant its own commit or its own confirmation gate.

### Switch & Slider — straightforward
Both have working primitives. Both currently dispatch via the legacy `FormsPage section="…"` route. Phase 2 is: build page from scratch with the template, swap the route to the new page, add i18n, and leave the legacy `FormsPage section` dispatch intact (it'll just become dead code reachable only via direct `<FormsPage>` import).

## Recommended Phase-2 order (when confirmed)

1. **Label** (smallest scope; new route is trivial; primitive is 18 lines)
2. **Switch** (medium; primitive ready; Toggle redirect already in place)
3. **Slider** (medium-plus; primitive has the most surface — value, defaultValue, min, max, step, orientation, disabled)
4. **Combobox** (largest; requires building both primitive + page + adding cmdk dep)

Commit after each, per the existing convention.

## Open questions for the user

- Confirm bucket assignments — anything to reclassify?
- Confirm scope on Combobox: build primitive + page + add cmdk, or skip Combobox in this pass and bring it back as Step 7C?
- For Label: add a sidebar nav entry too, or just the route?
