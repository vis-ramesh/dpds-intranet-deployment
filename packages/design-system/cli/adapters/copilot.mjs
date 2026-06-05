// GitHub Copilot: path-scoped instructions at .github/instructions/*.instructions.md
// with an `applyTo` glob. Detail files live in a sibling subfolder.
import { existsSync } from "node:fs"
import { join, writeFile, writeDetails, rewriteRefs } from "../shared.mjs"

export const id = "copilot"
export const label = "GitHub Copilot"
// Require a real Copilot footprint — a bare `.github/` (CI workflows) is not a
// signal that this repo uses Copilot. Use `--target copilot` to opt in otherwise.
export const detect = (cwd) =>
  existsSync(join(cwd, ".github", "copilot-instructions.md")) ||
  existsSync(join(cwd, ".github", "instructions"))

export function apply(skill, { cwd, force, dryRun }) {
  const opts = { force, dryRun }
  const dir = join(cwd, ".github", "instructions")
  const body = rewriteRefs(skill.indexBody, "dpds/", skill.details)
  const md =
    "---\n" +
    'applyTo: "**"\n' +
    `description: ${skill.description}\n` +
    "---\n\n" +
    body +
    "\n\n> Reference files are in `.github/instructions/dpds/` — open the one that matches your task.\n"
  const results = []
  results.push(writeFile(join(dir, "dpds.instructions.md"), md, opts))
  results.push(...writeDetails(join(dir, "dpds"), skill.details, opts))
  return results
}
