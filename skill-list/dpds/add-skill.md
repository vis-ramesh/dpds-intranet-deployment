# What this covers

Installing the DPDS agent skill (this knowledge pack + its reference files) into an AI coding tool with `npm run skill` / `npx @dpds-gov/design-system add skill`: targets, options, auto-detection, and when to re-run.

---

## Install the skill

The skill ships **inside the design system**. One command writes it into your AI tool's native rules format from a single shared source:

```bash
# loads your .env token, auto-detects the AI tools set up in this folder:
npm run skill

# or call the CLI directly (token must already be in your shell env):
npx @dpds-gov/design-system add skill
```

## Targets and options

```bash
npm run skill -- --target cursor            # one tool (everything after -- is forwarded)
npm run skill -- --target claude,copilot    # several
npm run skill -- --all                       # every supported tool
npm run skill -- --force                     # overwrite existing files (default: skip)
npm run skill -- --dry-run                   # show what would be written
```

Supported targets:

| id | Tool |
| --- | --- |
| `claude` | Claude Code |
| `cursor` | Cursor |
| `windsurf` | Windsurf |
| `copilot` | GitHub Copilot |
| `antigravity` | Antigravity |

## Auto-detection

With no `--target`/`--all`, the CLI detects which tools exist in the current folder (`.claude`, `.cursor`, `.windsurf`, `.github`, `.agents`) and installs into those.

## Notes

- The generated skill files are git-ignored — **each developer installs the skill for their own tool**.
- Re-run after bumping `@dpds-gov/design-system` to pick up skill updates (add `--force` to overwrite existing files).
- The CLI's only command is `add skill`. There is **no** `add <component>` — components are imported from the installed package, not copied into the repo.
