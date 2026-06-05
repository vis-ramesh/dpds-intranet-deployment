// Claude Code: native multi-file skill. Copy index + details verbatim into
// .claude/skills/dpds/ — identical to the old postinstall sync.
import { existsSync } from "node:fs"
import { join, writeFile, replaceDir } from "../shared.mjs"

export const id = "claude"
export const label = "Claude Code"
export const detect = (cwd) => existsSync(join(cwd, ".claude"))

export function apply(skill, { cwd, force, dryRun }) {
  const dir = join(cwd, ".claude", "skills", "dpds")
  // Skill folders are fully owned by us, so replace wholesale on --force to drop
  // stale files; otherwise writeFile skips anything that already exists.
  if (force && !dryRun) replaceDir(dir)
  const opts = { force, dryRun }
  const results = []
  results.push(writeFile(join(dir, "SKILL.md"), skill.indexRaw, opts))
  for (const { name, content } of skill.details) {
    results.push(writeFile(join(dir, name), content, opts))
  }
  return results
}
