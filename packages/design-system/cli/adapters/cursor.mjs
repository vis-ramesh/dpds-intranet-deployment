// Cursor: an .mdc rule with frontmatter (description / globs / alwaysApply) that
// the agent pulls in on demand, plus the detail files in a sibling subfolder.
import { existsSync } from "node:fs"
import { join, writeFile, writeDetails, rewriteRefs } from "../shared.mjs"

export const id = "cursor"
export const label = "Cursor"
export const detect = (cwd) => existsSync(join(cwd, ".cursor"))

export function apply(skill, { cwd, force, dryRun }) {
  const opts = { force, dryRun }
  const rulesDir = join(cwd, ".cursor", "rules")
  const body = rewriteRefs(skill.indexBody, "dpds/", skill.details)
  const mdc =
    "---\n" +
    `description: ${skill.description}\n` +
    "globs: \n" +
    "alwaysApply: false\n" +
    "---\n\n" +
    body +
    "\n\n> Reference files are in `.cursor/rules/dpds/` — open the one that matches your task.\n"
  const results = []
  results.push(writeFile(join(rulesDir, "dpds.mdc"), mdc, opts))
  results.push(...writeDetails(join(rulesDir, "dpds"), skill.details, opts))
  return results
}
