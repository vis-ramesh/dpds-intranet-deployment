# Step 7C — Data Table

Single-page deliverable. Closes the hard-stop deferred from Step 7B.

## Deliverable

| File | Purpose |
|---|---|
| [src/pages/data-table-page.tsx](../src/pages/data-table-page.tsx) | Full 8-section docs page covering all 9 brief variants |
| [src/App.tsx](../src/App.tsx) | New route `/ui/data-table → <DataTablePage />` (the existing `/ui/table` route stays — it's for the basic Table primitive, a separate page) |
| [src/locales/en.json](../src/locales/en.json) | `docs.dataTable.*` namespace, 10 top-level keys |

**No primitive changes.** The existing [data-table.tsx](../src/components/ui/data-table.tsx) (370 lines, TanStack-backed) covers all the brief's variants out of the box.

## Variants documented

All 9 from the original brief:

1. **Basic** — `<DataTable columns={...} data={...} />` with no extra config. Toolbar + pagination come for free.
2. **Sortable columns** — `enableSorting: true` per column. Primitive renders chevron indicator automatically.
3. **Global search** — built-in toolbar search box. Demo with a richer placeholder.
4. **Custom filter slot** — pass a Select / Combobox into `filterSlot`. Live demo: status filter that pre-filters the data array.
5. **Row selection** — `createSelectColumn<TData>()` helper, prepended to the columns array.
6. **Row actions** — final column with a DropdownMenu (View / Edit / Archive / Delete). `enableSorting: false` so its header isn't clickable.
7. **With Add button** — `onAdd` callback renders a `+` button at the end of the toolbar.
8. **Empty state** — empty data array shows the built-in "No results." row, paired with a proper `<EmptyState>` for richer empty-state UX.
9. **Loading skeleton** — composed manually from `<Table>` + `<Skeleton>` rows (since the primitive doesn't ship a loading mode).

## Realistic CRM dataset

12 service-portal tickets across:
- IDs: REQ-2025-0142 → REQ-2025-0131 (descending)
- Statuses: open / in-progress / waiting / resolved / closed (Badge-tinted via STATUS_VARIANT map)
- Priorities: low / medium / high / urgent (Badge-tinted via PRIORITY_VARIANT map)
- Customers: Al Futtaim Trading, Etihad Aviation Group, Emaar Properties, Majid Al Futtaim, Dubai Holdings
- Assignees: Amal Hassan, Khalid Saeed, Fatima Al Maktoum, Raji Pillai, Noor Abdulla, Yusuf Tariq

Same dataset is reused across all 9 examples for consistency.

## Decisions worth flagging

- **No primitive changes.** The brief was approved as a docs-only build per the Step 7B Phase-1 decision. If a Step 7D pass wants to enrich the primitive (e.g. controlled sorting prop, server-side pagination, column visibility menu), that's a separate effort.
- **Pagination primitive not yet integrated.** [data-table.tsx](../src/components/ui/data-table.tsx) still uses inline `<Button>` page navigation in its footer. Step 7B's new [pagination.tsx](../src/components/ui/pagination.tsx) is the right replacement — flagged as a Step 7D candidate, not done here.
- **EmptyState in the "empty" example.** Shows both the built-in "No results." row and the recommended pattern of pairing the table with a proper `<EmptyState>` (with action button). The built-in row is honest but spartan; the `<EmptyState>` adds the missing context.

## Verification

- ✅ `npx tsc -b` clean.
- ✅ `/ui/data-table` returns HTTP 200.
- ✅ All 9 examples render in the live preview blocks.
- ✅ Row selection demo: check/uncheck rows; the header checkbox shows the indeterminate state with a partial selection.
- ✅ Row actions demo: clicking the More icon opens the DropdownMenu; clicking outside dismisses.

## Open items for Step 7D

1. **Pagination primitive integration** — replace inline page buttons in data-table.tsx with the new `<Pagination>` primitive so we have one source of truth.
2. **Controlled column sort prop** — currently sort is uncontrolled. For URL-synced state, expose `sorting` + `onSortingChange` props.
3. **Column visibility menu** — TanStack supports `columnVisibility` state; the primitive already accepts it but there's no UI to drive it. A "Columns" Dropdown in the toolbar would close the loop.
4. **Server-side data** — pagination, filtering, and sorting are all client-side today. For datasets beyond ~1k rows, server-side support needs explicit primitive flags (`manualPagination`, `manualSorting`, etc.).
5. **Skeleton mode** — current loading example composes Skeleton + Table manually. A `loading` boolean prop on DataTable would be a small primitive addition.

## Manual checks worth running (your side)

- [ ] Visual dark-mode pass on the table — Badge tints, status colors, sort chevrons.
- [ ] Type a customer name in the global search — confirm rows filter live.
- [ ] Click sortable column headers — confirm sort indicator flips, then click again to reset.
- [ ] Open a row's actions menu and tab through Delete/Archive — confirm focus order.
