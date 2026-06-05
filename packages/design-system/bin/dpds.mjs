#!/usr/bin/env node
// dpds CLI — installs the DPDS agent skill into the AI tool of your choice.
//
//   npx @dpds-gov/design-system add skill                 # auto-detect installed tools
//   npx @dpds-gov/design-system add skill --target cursor # one tool
//   npx @dpds-gov/design-system add skill --all           # every supported tool
//
import { readSkill } from "../cli/shared.mjs"
import * as claude from "../cli/adapters/claude.mjs"
import * as cursor from "../cli/adapters/cursor.mjs"
import * as windsurf from "../cli/adapters/windsurf.mjs"
import * as copilot from "../cli/adapters/copilot.mjs"
import * as antigravity from "../cli/adapters/antigravity.mjs"

const ADAPTERS = [claude, cursor, windsurf, copilot, antigravity]
const BY_ID = Object.fromEntries(ADAPTERS.map((a) => [a.id, a]))

const HELP = `dpds — Dubai Police Design System

Usage:
  dpds add skill [options]

Installs the DPDS agent skill into one or more AI coding tools, writing each
tool's native rules format from a single source.

Targets:
${ADAPTERS.map((a) => `  ${a.id.padEnd(13)} ${a.label}`).join("\n")}

Options:
  -t, --target <ids>   Comma-separated targets (e.g. --target claude,cursor)
      --all            Install into every supported tool
  -f, --force          Overwrite existing files (default: skip files that exist)
      --dry-run        Show what would be written without writing
  -h, --help           Show this help

With no --target/--all, dpds detects which tools are set up in this folder
(.claude, .cursor, .windsurf, .github, .agents) and installs into those.`

function parseArgs(argv) {
  const opts = { targets: [], all: false, force: false, dryRun: false, help: false, _: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "-h" || a === "--help") opts.help = true
    else if (a === "--all") opts.all = true
    else if (a === "-f" || a === "--force") opts.force = true
    else if (a === "--dry-run") opts.dryRun = true
    else if (a === "-t" || a === "--target") opts.targets.push(...splitList(argv[++i]))
    else if (a.startsWith("--target=")) opts.targets.push(...splitList(a.slice(9)))
    else opts._.push(a)
  }
  return opts
}

const splitList = (s) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [])

function fail(msg) {
  console.error(`✗ ${msg}`)
  process.exit(1)
}

function main() {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.help || opts._.length === 0) {
    console.log(HELP)
    process.exit(opts.help ? 0 : 1)
  }

  const [command, subject] = opts._
  if (command !== "add" || subject !== "skill") {
    fail(`Unknown command "${opts._.join(" ")}". Try: dpds add skill --help`)
  }

  const cwd = process.cwd()

  // Resolve the target list: explicit --target, --all, or auto-detect.
  let targets
  if (opts.all) {
    targets = ADAPTERS.map((a) => a.id)
  } else if (opts.targets.length) {
    for (const t of opts.targets) if (!BY_ID[t]) fail(`Unknown target "${t}". Valid: ${Object.keys(BY_ID).join(", ")}`)
    targets = opts.targets
  } else {
    targets = ADAPTERS.filter((a) => a.detect(cwd)).map((a) => a.id)
    if (targets.length === 0) {
      fail(
        "No AI tools detected in this folder.\n" +
        "  Pass --target <tool> or --all. Run `dpds add skill --help` for the list.",
      )
    }
    console.log(`Detected: ${targets.join(", ")}`)
  }

  const skill = readSkill()
  let written = 0
  let skipped = 0

  for (const id of targets) {
    const adapter = BY_ID[id]
    console.log(`\n${adapter.label} (${id})`)
    const results = adapter.apply(skill, { cwd, force: opts.force, dryRun: opts.dryRun })
    for (const r of results) {
      if (r.status === "would-write") {
        console.log(`  would write  ${rel(cwd, r.path)}`)
      } else if (r.status === "written") {
        written++
        console.log(`  ✓ ${rel(cwd, r.path)}`)
      } else {
        skipped++
        console.log(`  • ${rel(cwd, r.path)} (exists — use --force to overwrite)`)
      }
    }
  }

  if (opts.dryRun) {
    console.log("\nDry run — nothing written.")
    return
  }
  console.log(`\nDone. ${written} file(s) written${skipped ? `, ${skipped} skipped` : ""}.`)
  if (skipped) console.log("Re-run with --force to overwrite skipped files.")
}

const rel = (cwd, p) => (p.startsWith(cwd) ? p.slice(cwd.length + 1) : p)

main()
