// Windsurf: Cascade reads .windsurf/rules/*.md. Rules have a character budget,
// so the entry stays small (just the index) with `trigger: model_decision` so it
// loads only when relevant; the bulky detail files sit in a subfolder.
import { existsSync } from "node:fs"
import { join, writeFile, writeDetails, rewriteRefs } from "../shared.mjs"

export const id = "windsurf"
export const label = "Windsurf"
export const detect = (cwd) => existsSync(join(cwd, ".windsurf"))

export function apply(skill, { cwd, force, dryRun }) {
  const opts = { force, dryRun }
  const rulesDir = join(cwd, ".windsurf", "rules")
  const body = rewriteRefs(skill.indexBody, "dpds/", skill.details)
  const md =
    "---\n" +
    "trigger: model_decision\n" +
    `description: ${skill.description}\n` +
    "---\n\n" +
    body +
    "\n\n> Reference files are in `.windsurf/rules/dpds/` — open the one that matches your task.\n"
  const results = []
  results.push(writeFile(join(rulesDir, "dpds.md"), md, opts))
  results.push(...writeDetails(join(rulesDir, "dpds"), skill.details, opts))
  return results
}
