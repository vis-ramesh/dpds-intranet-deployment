// Shared helpers for the `dpds add skill` CLI.
// Dependency-free: only Node built-ins, so `npx @dpds-gov/design-system` stays light.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))

// The published skill lives at <package>/skills/dpds/. From cli/ that's ../skills/dpds.
export const SKILL_DIR = join(here, "..", "skills", "dpds")

// The index file every adapter transforms; the rest are detail files opened on demand.
export const INDEX_FILE = "SKILL.md"

/** Read the skill source: the index entry plus its detail files. */
export function readSkill() {
  if (!existsSync(SKILL_DIR)) {
    throw new Error(
      `DPDS skill source not found at ${SKILL_DIR}. ` +
      `Reinstall @dpds-gov/design-system (>=0.3.0) and try again.`,
    )
  }
  const names = readdirSync(SKILL_DIR).filter((n) => n.endsWith(".md"))
  const indexRaw = readFileSync(join(SKILL_DIR, INDEX_FILE), "utf8")
  const { data, body } = parseFrontmatter(indexRaw)
  const details = names
    .filter((n) => n !== INDEX_FILE)
    .map((name) => ({ name, content: readFileSync(join(SKILL_DIR, name), "utf8") }))
  return {
    description: data.description || "Dubai Police Design System skill.",
    name: data.name || "dpds",
    indexBody: body.trim(),
    indexRaw,
    details,
  }
}

/** Minimal YAML frontmatter parser — handles the flat `key: value` blocks our skills use. */
export function parseFrontmatter(raw) {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(raw)
  if (!match) return { data: {}, body: raw }
  const data = {}
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    value = value.replace(/^["']|["']$/g, "")
    if (key) data[key] = value
  }
  return { data, body: raw.slice(match[0].length) }
}

/**
 * Rewrite the index body's references to detail files so they point at the
 * subfolder where this adapter drops them (e.g. `component-catalog.md` ->
 * `dpds/component-catalog.md`). Claude keeps them as siblings, so it passes "".
 */
export function rewriteRefs(body, prefix, details) {
  if (!prefix) return body
  let out = body
  for (const { name } of details) {
    out = out.replaceAll("`" + name + "`", "`" + prefix + name + "`")
  }
  return out
}

export function ensureDir(dir) {
  mkdirSync(dir, { recursive: true })
}

export function writeFile(path, content, { force, dryRun }) {
  const exists = existsSync(path)
  if (exists && !force) {
    return { path, status: "skipped" }
  }
  if (dryRun) {
    return { path, status: "would-write" }
  }
  ensureDir(dirname(path))
  writeFileSync(path, content)
  return { path, status: "written" }
}

/** Copy the detail files into destDir. */
export function writeDetails(destDir, details, opts) {
  if (!opts.dryRun) ensureDir(destDir)
  const results = []
  for (const { name, content } of details) {
    results.push(writeFile(join(destDir, name), content, opts))
  }
  return results
}

export function replaceDir(dir) {
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
}

export { join }
