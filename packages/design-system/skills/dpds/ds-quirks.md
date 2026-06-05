# What this covers

Living list of DS behaviours that bite consumers. Each entry names a DS version it applies to and the fix version where known. When the DS version bumps in `package.json`, re-read this and strip workarounds.

---

## Known DS quirks

Living list of DS behaviours that bite consumers. Each entry names a DS version it applies to and, where known, the version that fixes it. When you bump the DS, re-read this section and strip the workarounds whose fix-version you're now on.

### Responsive grid utilities need `!` modifier (DS 0.1.2)

The DS's published `styles.css` ships some base utility classes (e.g. `grid-cols-2`) at the root CSS level rather than wrapped inside `@layer utilities`. Consumer-written responsive utilities like `lg:grid-cols-4` are silently overridden by the DS's base rules — they appear to apply at first glance, but the cascade lets the base rule win, and you end up with the smaller column count at every breakpoint.

Workaround: add Tailwind's `!` important modifier to **responsive** utilities that involve grid columns or column spans:

```tsx
// ❌ Won't apply at `lg` viewport — silently overridden, stays as `grid-cols-1`
<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

// ✅ Applies correctly
<div className="grid grid-cols-1 lg:grid-cols-4! gap-4">
```

Same for `md:grid-cols-2!`, `lg:col-span-2!`, `lg:col-span-3!`, and similar grid-related responsive utilities. The **mobile-first** non-prefixed counterparts (`grid-cols-1`, `col-span-1`) don't need the modifier — the cascade lets the consumer's utility win at that breakpoint.

**Tracking the fix.** This will be addressed in DS 0.1.3 by wrapping the emitted utilities in `@layer utilities` (or stripping the generic layout utilities from the DS's published CSS entirely). When you bump `@dpds-gov/design-system` to `^0.1.3` or higher in `package.json`:

```bash
grep -rE "(grid-cols-[0-9]+|col-span-[0-9]+)!" src/
```

Any matches that came from this workaround should have the `!` stripped. Mobile-first utilities (no responsive prefix) and any genuine "must win" cases (rare) stay.

