// Google Antigravity: workspace rules live in .agents/rules/ (v1.20.3+), plain
// markdown. Entry rule holds the index; detail files go in a subfolder.
import { existsSync } from "node:fs"
import { join, writeFile, writeDetails, rewriteRefs } from "../shared.mjs"

export const id = "antigravity"
export const label = "Antigravity"
export const detect = (cwd) =>
  existsSync(join(cwd, ".agents")) || existsSync(join(cwd, "AGENTS.md"))

export function apply(skill, { cwd, force, dryRun }) {
  const opts = { force, dryRun }
  const rulesDir = join(cwd, ".agents", "rules")
  const body = rewriteRefs(skill.indexBody, "dpds/", skill.details)
  const md =
    `_${skill.description}_\n\n` +
    body +
    "\n\n> Reference files are in `.agents/rules/dpds/` — open the one that matches your task.\n"
  const results = []
  results.push(writeFile(join(rulesDir, "dpds.md"), md, opts))
  results.push(...writeDetails(join(rulesDir, "dpds"), skill.details, opts))
  return results
}
