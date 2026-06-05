# Renaming workspace folder: `crm-dashboard-template` → `dpds-intranet`

Run this **after quitting Claude Code** and stopping any dev servers from this workspace. The current session's working directory is bound to the old absolute path; renaming while live can break file operations.

## What's already done (in this session)

- [x] `.claude/settings.local.json` — 10 absolute paths rewritten to `dpds-intranet` (Vercel domain `crm-dashboard-template-iota.vercel.app` left alone — that's a deployment URL, not a local folder)
- [x] Audited: no source code (TS/TSX/JS/MJS/JSON/YAML) hardcodes `crm-dashboard-template`. Root `package.json` is named `dpds-2-0`, not the folder name.
- [x] Audited: starter logs (`STEP_10_6_LOG.md`, `STEP_10_7_LOG.md`) have 7 historical mentions left intact — they describe state at the time of writing.

## Pre-flight (close + stop running things)

1. **Quit Claude Code** (CMD+Q if on macOS) so this conversation's session releases its lock on the old path.
2. **Stop any dev servers** started from the workspace:
   ```bash
   # Find any node processes serving from the workspace
   lsof -nP -iTCP -sTCP:LISTEN | grep node
   # Kill specific PIDs as needed
   ```
3. **Close VS Code windows** that have files open from `crm-dashboard-template/`.

## The rename

```bash
cd /Users/ramesh/Documents/Sandbox
mv crm-dashboard-template dpds-intranet
```

## Migrate Claude Code auto-memory + transcripts

Claude Code keys its project state off the absolute path. Without this step, the new session at `dpds-intranet` starts empty — no memory, no transcript history.

```bash
mv ~/.claude/projects/-Users-ramesh-Documents-Sandbox-crm-dashboard-template \
   ~/.claude/projects/-Users-ramesh-Documents-Sandbox-dpds-intranet
```

## Verify after reopening

Open Claude Code in the new folder:

```bash
cd /Users/ramesh/Documents/Sandbox/dpds-intranet
claude   # or however you launch it
```

Sanity checks:

```bash
# Git remote still works
git remote -v
git fetch origin

# npm scripts still resolve
npm run typecheck

# Workspace package still finds its sibling packages
npm ls @dpds-gov/design-system

# Auto-memory loaded?
ls ~/.claude/projects/-Users-ramesh-Documents-Sandbox-dpds-intranet/memory/
```

If `MEMORY.md` and the prior conversation transcripts are visible at the new path, the migration succeeded.

## Things that don't change

- Git remote (`github.com/dpds-gov/design-system`) — completely independent of local folder name
- npm package names (`@dpds-gov/design-system`, `@dpds-gov/docs`)
- Vercel deployment (`crm-dashboard-template-iota.vercel.app`) — the Vercel project keeps its name; only the local folder changes
- The starter repo at `/Users/ramesh/Documents/Sandbox/dp-service-starter/` — unrelated to this rename

## Rollback

If anything goes sideways after the rename, revert with the inverse:

```bash
cd /Users/ramesh/Documents/Sandbox
mv dpds-intranet crm-dashboard-template
mv ~/.claude/projects/-Users-ramesh-Documents-Sandbox-dpds-intranet \
   ~/.claude/projects/-Users-ramesh-Documents-Sandbox-crm-dashboard-template
git -C crm-dashboard-template checkout .claude/settings.local.json   # restores the old paths
```
