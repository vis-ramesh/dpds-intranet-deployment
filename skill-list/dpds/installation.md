# What this covers

Authenticating to GitHub Packages so `@dpds-gov/design-system` installs: the `GH_PACKAGES_TOKEN` flow, why the starter uses `npm run setup` instead of `npm install`, CI auth, staying up to date, and a troubleshooting table. This is the single most common thing that goes wrong.

---

## Why auth is required

The `@dpds-gov` scope is a **restricted** GitHub Packages registry, so every install needs a token. The project `.npmrc` reads it from the environment:

```
@dpds-gov:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

## Create the token

GitHub → Settings → Developer settings → **Personal access tokens (classic)**:
- Scope: **`read:packages`** — the only scope a service developer needs. Never `write:packages` or `admin:*`; those belong only to whoever publishes the design system. A write/admin token in a service repo or CI is a supply-chain risk.
- Must have access to the **`dpds-gov`** organisation (authorize SSO if the org enforces it).

Paste it into `.env`:

```
GH_PACKAGES_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

`.env` is git-ignored — never commit it.

## Why `npm run setup`, not `npm install`

`.npmrc` reads `GH_PACKAGES_TOKEN` from the **shell environment**, but nothing loads `.env` into the shell automatically. The starter bridges this:

- **`npm run setup`** — loads `.env`, then runs `npm install`. Use it for the first install and after pulling DS updates.
- A `preinstall` guard stops a bare `npm install` with a clear message if the token isn't in the environment, instead of a cryptic `401`.

So: **always `npm run setup`** unless you've exported `GH_PACKAGES_TOKEN` into your shell yourself.

## CI

In the service repo: **Settings → Secrets and variables → Actions** → add `GH_PACKAGES_TOKEN` (a `read:packages` PAT). The bundled `check.yml` writes it into `.npmrc` and runs `npm ci → lint → typecheck → build` on every push and PR. Prefer the built-in `GITHUB_TOKEN` with `permissions: { packages: read }` over a long-lived PAT where the package grants the repo read access.

## Staying up to date

```bash
npm install @dpds-gov/design-system@latest
git commit -am "chore: bump @dpds-gov/design-system"
npm run skill -- --force      # refresh the agent skill to match (see add-skill.md)
```

(`npm install` works here once your token is already in the environment; if you hit a 401, run `npm run setup`.)

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `npm error 401 Unauthorized` on install | token missing/expired, or not in shell env | `cp .env.example .env`, paste a `read:packages` token, run `npm run setup` |
| `✗ GH_PACKAGES_TOKEN is not set` | bare `npm install` without the token in env | run `npm run setup` (loads `.env`) |
| `403 Forbidden` on install | token lacks `dpds-gov` org access / SSO not authorized | re-create token with org access; authorize SSO |
| `could not determine executable to run` on `add skill` | stale/old DS version without the CLI `bin` | `npm run setup` to get the current version, then retry |
| CI `npm ci` fails auth | missing `GH_PACKAGES_TOKEN` Actions secret | add the secret (`read:packages`) in repo settings |
