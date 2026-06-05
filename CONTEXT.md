# Where we left off — 2026-06-04

Pickup note for the next Claude Code session in this workspace. Read this first when resuming, then load the auto-memory.

## Current state

Both repos are clean and pushed. Architecture is settled.

| Repo | Local path | Branch | HEAD | Notes |
|---|---|---|---|---|
| Workspace (this folder) | `/Users/ramesh/Documents/Sandbox/dpds-intranet` | `main` | `b06c6e0` (was `crm-dashboard-template` until 2026-06-04) | DS 0.2.0 published; skills shipped in DS; charts-page UaeHex/UaeMap cleanup; full docs site (changelog through 2026-06-03) |
| Starter | `/Users/ramesh/Documents/Sandbox/dp-service-starter` | `main` | `f110930` | Postinstall syncs skills from `@dpds-gov/design-system@^0.2.0`; old skill-as-source approach frozen on `dp_v4` (NEVER merge) |

**Live branches alive on remotes (do not delete; they're rollback targets per the workflow rule):**
- Workspace: `main`, `dp_v1`, `dp_v2`, `dp_v3`, `dp_v4`
- Starter: `main`, `dp_v1`, `dp_v3`, `dp_v4` (frozen reference), `dp_v5`

## What just landed (recent steps)

- **Step 10.9** — DS `0.2.0` shipped skills (`packages/design-system/skills/dpds/`) inside the npm package. Tagged `v0.2.0`, pushed.
- **Phase B** — Starter consumes via `scripts/sync-skills-from-ds.mjs` run by `postinstall`. `.claude/skills/dpds/` gitignored.
- **Workspace rename** — folder `crm-dashboard-template` → `dpds-intranet`. Auto-memory + most transcripts migrated to the new `~/.claude/projects/-Users-...-dpds-intranet/` key. The orphan tail of *this* conversation is merged via `scripts/finalize-rename.sh` (run AFTER quitting Claude Code, BEFORE reopening).

## Outstanding follow-ups (none are blocking)

- The starter's `main` CLAUDE.md is still the 759-line all-in-one. The orchestrator rewrite (138-line CLAUDE.md + `.claude/skills/dpds/` skill folder) lives on starter `dp_v4` and *did not merge*. With Phase B, the synced `.claude/skills/dpds/` and the inline CLAUDE.md content now technically duplicate. A future `dp_v6` could restructure CLAUDE.md as a thin orchestrator referencing the auto-synced skill, removing the duplication. Not urgent; CLAUDE.md is the authoritative agent brief either way.
- DS 0.1.2 grid quirk (`lg:grid-cols-4!` workaround) is documented in `packages/design-system/skills/dpds/ds-quirks.md`. The fix (wrap emitted utilities in `@layer utilities`) is planned for DS 0.1.3 (or a 0.2.x point release). Workaround stays until then.

## Standing preferences (also in auto-memory)

- **Branching**: cut `dp_v<next>` from main, push, work, FF-merge to main, leave branch alive.
- **Changelog voice**: plain English for stakeholders. No jargon, no path/prop/class names in summaries.
- **Email examples**: `@dubaipolice.gov.ae` only.
- **Project name**: "DPDS 2.0" or "Dubai Police Design System 2.0".

## How to resume

1. After reopening Claude Code, pick the most recent transcript for this project (the migrated one — 6,188+ lines of history through 2026-06-04).
2. Skim auto-memory at `~/.claude/projects/-Users-...-dpds-intranet/memory/MEMORY.md` if needed.
3. Ask "what's next?" — I should be able to pick up from this CONTEXT.md and answer.
