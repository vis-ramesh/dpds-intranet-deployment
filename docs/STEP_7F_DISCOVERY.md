# Step 7F — Layout Discovery

Phase 1 output. **PAUSE before Phase 2 to confirm.** Same classification rubric as 7A/7B/7D/7E. Two-column status (page + primitive) per the brief.

## Method

For each of the 9 components: check whether the docs page exists, whether it uses the canonical 8-section anatomy, where its route points, whether `docs.<name>.*` i18n keys exist, AND whether the underlying primitive exists in [src/components/ui/](../src/components/ui/).

## Result

| # | Component | Page status | Primitive status | Route element | i18n |
|---|---|---|---|---|---|
| 1 | Container | **STUB** | **NEEDS BUILD** | `<ComingSoon />` | MISSING |
| 2 | Grid | **STUB** | **NEEDS BUILD** | `<ComingSoon />` | MISSING |
| 3 | Stack | **STUB** | **NEEDS BUILD** | `<ComingSoon />` | MISSING |
| 4 | Separator | **STUB** | ✅ EXISTS (23 L) | `<ComingSoon />` | MISSING |
| 5 | Accordion | **STUB** | ✅ EXISTS (132 L) | `<UiComponentsPage section="accordion" />` (legacy dispatch — must swap per brief) | MISSING |
| 6 | Collapsible | **STUB** | **NEEDS BUILD** | `<ComingSoon />` | MISSING |
| 7 | Resizable | **STUB** | **NEEDS BUILD** | `<ComingSoon />` | MISSING |
| 8 | Scroll Area | **STUB** | **NEEDS BUILD** | `<ComingSoon />` | MISSING |
| 9 | Aspect Ratio | **STUB** | **NEEDS BUILD** | `<ComingSoon />` | MISSING |

**Totals: 0 DONE · 0 PARTIAL · 9 STUB.** Only 2 primitives exist (Separator, Accordion). The other 7 need building.

## Phase-2 scope flags worth surfacing

### 1. Brief's primitive expectation was wrong

The brief said *"The other six (Separator, Accordion, Collapsible, Resizable, Scroll Area, Aspect Ratio) almost certainly have primitives already."* In reality:

- ✅ Separator + Accordion exist
- ❌ Collapsible, Resizable, Scroll Area, Aspect Ratio **need building from scratch**

That's 4 extra primitives on top of the brief's expected 3 (Container/Grid/Stack) — **7 total primitives to build this pass**.

### 2. New deps to install

Four standard shadcn-convention packages, all currently absent from [package.json](../package.json):

| Primitive | Package | Approx size |
|---|---|---|
| Collapsible | `@radix-ui/react-collapsible` | ~3 KB gzipped |
| Resizable | `react-resizable-panels` (shadcn's pick) | ~7 KB gzipped |
| Scroll Area | `@radix-ui/react-scroll-area` | ~4 KB gzipped |
| Aspect Ratio | `@radix-ui/react-aspect-ratio` | ~1 KB gzipped |

Container, Grid, Stack are pure layout — no deps.

### 3. Accordion route swap

`/ui/accordion` currently points at `<UiComponentsPage section="accordion" />` (legacy dispatch). Per the brief, when Phase 2 builds the Accordion docs page, **also swap the route AND remove the dispatch section JSX** from [ui-components-page.tsx](../src/pages/ui-components-page.tsx). This is the only candidate from 7E's dead-code follow-up list that's in scope this pass.

After this pass, the remaining dead-code follow-ups from 7E are: `dropdown-menu`, `profile-switcher`, `swiper`. Still parked.

### 4. Stack design choice — divider prop is a non-trivial addition

The brief specs `Stack` with a `divider?: ReactNode` prop that renders between children. That's the trickiest part of Stack's API — needs `React.Children.map` to inject the divider node between every pair. The brief flagged Stack as the likely scope-blower; this is why. Easy to implement but worth confirming the divider-injection pattern up front.

Also: `<HStack>` + `<VStack>` convenience exports. Standard pattern — small additional cost.

## Recommended Phase-2 order (when confirmed)

Smallest → largest, mirroring 7A/7B/7E:

1. **Aspect Ratio** (smallest primitive + page)
2. **Separator** (primitive ready)
3. **Container** (build primitive, page)
4. **Collapsible** (build primitive + page)
5. **Scroll Area** (build primitive + page)
6. **Grid** (build primitive, page)
7. **Stack** (build primitive with divider + HStack/VStack, page)
8. **Accordion** (primitive ready; also swap route + remove dispatch JSX)
9. **Resizable** (largest — multi-pane composition + nested splits)

Commit per page, matching the established cadence.

## Open questions for the user

1. **Scope expansion** — 4 primitives more than the brief expected. Approve building them this pass, or defer some to a follow-up?
2. **Dep choices** — confirm the 4 packages above. Alternatives:
   - Resizable could be hand-rolled with pointer events instead of `react-resizable-panels` (smaller; less feature-rich; ~80 lines of careful code)
   - Scroll Area could rely on browser-native scrollbars (skip the Radix wrapper entirely; less consistent across OSes)
3. **Stack API** — approve `<Stack divider>` + `<HStack>`/`<VStack>` exports per the brief, or trim to just `<Stack direction>` without the divider prop?
4. **Cadence** — commit per page (9 commits + 1 logs)?
