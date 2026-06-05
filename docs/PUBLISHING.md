# Publishing `@dpds-gov/design-system`

How releases of the design system reach the GitHub Packages registry and how consumers (docs site, service starters) install them.

## Versioning

Semver. While the package is below `1.0.0`:

- **patch (`0.1.0` → `0.1.1`)** — bug fixes, internal refactors, type-only changes, doc-only updates that don't affect rendered output
- **minor (`0.1.0` → `0.2.0`)** — new components, new props with defaults that preserve behaviour, additive theme tokens, dependency bumps that don't change the public API
- **major (`0.1.0` → `1.0.0`)** — breaking changes to the public API, rendered output, peer-dep ranges, or token names

Pre-1.0 we treat minors as soft-breaking and announce in `packages/docs/src/data/changelog.json`. After 1.0 we follow strict semver.

## Skills ship with each release

Since `0.2.0`, the package ships AI agent skills at `packages/design-system/skills/dpds/` and exposes them via the package `exports` map (`./skills/*`). Consumers receive the latest agent instructions whenever they bump `@dpds-gov/design-system` — Dependabot's weekly bumps deliver skill updates the same way they deliver component updates. No separate sync mechanism, no snapshot drift between consumers.

Version skill edits the same way you version code:

| Skill change | Bump |
|---|---|
| Typo fix, clarification, single-line wording improvement | **patch** |
| New catalog entry (component, hook, variant, prop), new pattern, new bad/good example | **minor** |
| Restructuring the skill tree (renamed files, removed sections, reorganised SKILL.md index) | **major** |

A code change and a skill change in the same release roll up to whichever is higher. If a release adds a new component AND a new bad/good pair, that's one minor bump — the changelog covers both in one entry.

The skill files are markdown; the build doesn't compile or transform them. `npm publish --dry-run` should always show `skills/dpds/*.md` in the tarball — if it doesn't, the `files` field in `packages/design-system/package.json` is wrong.

## Pre-publish checklist

Run these from the **workspace root**:

```bash
# 1. Latest main and clean tree
git checkout main && git pull
git status                                # must be clean

# 2. Type check both packages
npm run typecheck

# 3. Build both packages (also produces the DS dist/ that ships)
npm run build

# 4. Spot-check the docs site still works
npm run dev                                # smoke-test a few routes
```

If any step fails, fix it before bumping the version.

## Cutting a release

```bash
# 1. Bump version on the DS package
npm version patch -w @dpds-gov/design-system        # or minor / major

# 2. Rebuild with the new version baked into dist/package.json
npm run build:ds

# 3. Authenticate with GitHub Packages
export GH_PACKAGES_TOKEN=ghp_xxx                    # PAT with write:packages

# 4. Dry-run — inspect file list and size before going live
cd packages/design-system
npm publish --dry-run

# 5. Publish for real
npm publish

# 6. Tag the commit and push the tag
cd ../..
git tag v$(node -p "require('./packages/design-system/package.json').version")
git push origin HEAD --tags
```

After step 5 the package should appear at <https://github.com/orgs/dpds-gov/packages>.

## Post-publish

1. Open the GitHub Release for the new tag and paste the matching entries from `packages/docs/src/data/changelog.json` into the body.
2. Notify service-starter maintainers if the bump is breaking. Pre-1.0 every minor counts as potentially breaking.

## Consuming the package

Service starters and other consumers need three things:

### `.npmrc` (committed)

```ini
@dpds-gov:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

The `${GH_PACKAGES_TOKEN}` reference is expanded by npm at install time from the environment — never commit a literal token.

### Personal access token

A classic PAT at <https://github.com/settings/tokens> with:

- `read:packages` — required to install
- Access to the `dpds-gov` organisation

Export it in every shell that runs `npm install`:

```bash
export GH_PACKAGES_TOKEN=ghp_xxx
```

In CI: store the value as the secret `GH_PACKAGES_TOKEN` and inject it as an env var on every install step.

### Install

```bash
npm install @dpds-gov/design-system
```

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `npm publish` → **401 Unauthorized** | PAT is missing, expired, or revoked. Regenerate at github.com/settings/tokens and re-export `GH_PACKAGES_TOKEN`. |
| `npm publish` → **403 Forbidden** | PAT lacks `write:packages`, or you're not a member of the `dpds-gov` org with publish rights. Check both. |
| `npm publish` → **"name must match scope"** | `name` field in `packages/design-system/package.json` doesn't start with `@dpds-gov/`. The scope and registry must match. |
| `npm publish` → **413 Payload Too Large** | Tarball over the registry limit. Check `"files"` in `package.json` and look for stray paths (sourcemaps, src/, node_modules) in `npm publish --dry-run`. |
| `npm install` (consumer) → **404 Not Found** | Consumer's `.npmrc` is missing the `@dpds-gov:registry=...` line, or the PAT lacks `read:packages`. |
| Dry-run shows `dist/fonts/fonts/...` | Stale dist from a previous build. The build script now runs `rm -rf dist/fonts` before copying, so this should not recur — but if it does, delete `packages/design-system/dist/` and rebuild. |

## Registry constants

| Setting | Value |
|---|---|
| Registry URL | `https://npm.pkg.github.com` |
| Scope | `@dpds-gov` |
| Org | `dpds-gov` |
| Access level | `restricted` (private) |
| Repository | `https://github.com/dpds-gov/design-system` |
