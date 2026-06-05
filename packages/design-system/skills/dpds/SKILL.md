---
name: dpds
description: Dubai Police Design System skill. Reference when building any service that consumes @dpds-gov/design-system. Covers component selection, layout patterns, missing-component workflow, build summary, CSS quirks, and code examples.
---

# DPDS skill

This skill is the reference for AI agents building Dubai Police services using `@dpds-gov/design-system`. Read the relevant section based on what you're doing:

## Reference index

- **Picking a component?** See `component-catalog.md` — full list of DS exports with props, variants, and use-when guidance.
- **Composing a page from a wireframe/PRD?** See `layout-patterns.md` — multi-column, dashboard, form+summary, list+detail patterns plus layout-fidelity rules.
- **DS doesn't have a primitive you need?** See `missing-components.md` — placeholder pattern, MISSING_COMPONENTS.md tracking, email handoff.
- **Finishing a build?** See `end-of-build-summary.md` — exact final-message structure with build status, missing components table, mailto link.
- **CSS behaving unexpectedly?** See `ds-quirks.md` — known workarounds (e.g. `lg:grid-cols-4!` modifier pre-0.1.3).
- **Unsure if your code follows the rules?** See `bad-good-examples.md` — bad/good code pairs for every Golden Rule.

The Golden Rules themselves live in `CLAUDE.md` at the repo root. This skill provides the detailed reference behind those rules.
