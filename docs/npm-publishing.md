# npm Publishing and Trusted Deployment

As of March 9, 2026, npm's recommended path for CI publishing is [trusted publishing](https://docs.npmjs.com/trusted-publishers): npm establishes trust with a specific GitHub Actions workflow via OIDC, which removes the need for long-lived `NPM_TOKEN` secrets and automatically generates provenance for public packages published from public repositories.

This repository is a Bun workspace, but the release path should still use `npm publish`. Bun is the package manager for install/build/test here; npm is the registry client.

## Current Repository State

`@amebic/core` is the only package wired into CI publishing today.

`@amebic/cli` now loads compositions from the consumer's project entry file instead of depending on private workspace packages, so it is structurally publishable. It is not included in the current workflow only because this repository has not defined its public release policy yet.

Recommended near-term release surface:

- Publish `@amebic/core`
- Add `@amebic/cli` once you are ready to version and support the project-entry loading contract publicly

## Trusted Publishing Requirements

The relevant npm requirements come from:

- [Trusted publishing for npm packages](https://docs.npmjs.com/trusted-publishers)
- [Generating provenance statements](https://docs.npmjs.com/generating-provenance-statements)

The main constraints that matter for this repo:

- Use GitHub Actions on a GitHub-hosted runner
- Grant the workflow `id-token: write`
- Configure the exact workflow filename in npm package settings
- Use npm CLI `11.5.1+` for trusted publishing
- Publish from a public GitHub repository if you want automatic provenance
- Ensure the published package's `repository` metadata matches the GitHub source repository exactly, including case
- Avoid reusable publish indirection with `workflow_call` for the actual `npm publish` step; npm documents that validation can key off the calling workflow name and cause mismatches

## Workflow Added In This Repo

The repository now includes [publish-npm.yml](/stores/storage/Users/Ky/Development/Reconciler/amebic/.github/workflows/publish-npm.yml).

It is intentionally conservative:

- Triggers only on tags matching `core-v*`
- Publishes only `@amebic/core`
- Uses a GitHub environment named `npm`
- Installs dependencies with Bun
- Runs lint, format check, tests, and build before publishing
- Runs `npm pack --dry-run` to verify tarball contents
- Publishes with `npm publish --access public`
- Uses OIDC trusted publishing instead of an npm token

## Required Setup On npmjs.com

Before the workflow can publish successfully, configure `@amebic/core` in npm:

1. Open the package settings on npmjs.com.
2. In **Trusted Publisher**, choose **GitHub Actions**.
3. Enter:
   - Organization or user: your GitHub owner
   - Repository: your GitHub repository name
   - Workflow filename: `publish-npm.yml`
   - Environment name: `npm`
4. Save the trusted publisher.

npm notes that each package can only have one trusted publisher configuration at a time, so if you later publish more packages from this repo, each package must point at the workflow you want to trust.

## Required Setup On GitHub

Create a GitHub Actions environment named `npm`.

Recommended environment settings:

- Restrict deployment to the default branch
- Require at least one reviewer for production publishes
- Keep environment secrets empty for npm publishing; trusted publishing should not need `NPM_TOKEN`

## Package Metadata You Should Add Before First Release

Before using the workflow for a real release, update the publishable package metadata for `@amebic/core`:

- Add a `repository` field that points at the public GitHub repo
- Add `license`, `homepage`, and `bugs` metadata if you want the npm page to be complete
- Add a `files` allowlist if you want tighter control over publish contents
- Optionally add `publishConfig.access: "public"` so local/manual publishes behave the same way as CI

Example shape:

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/<owner>/<repo>.git"
  },
  "homepage": "https://github.com/<owner>/<repo>#readme",
  "bugs": {
    "url": "https://github.com/<owner>/<repo>/issues"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

The repository URL matters for provenance. npm documents that the `repository` metadata must match the source repository exactly.

## Recommended Release Process

For `@amebic/core`, use package-specific tags:

1. Update `packages/core/package.json` to the release version.
2. Run local checks:
   - `bun install`
   - `bun run lint`
   - `bun run format:check`
   - `bun run test`
   - `bun run build`
   - `cd packages/core && npm pack --dry-run`
3. Commit the release change.
4. Create and push a tag matching the package version:
   - `git tag core-v0.1.0`
   - `git push origin core-v0.1.0`
5. Let GitHub Actions publish the package.

This tag format is deliberate. In a multi-package workspace, package-specific tags avoid ambiguity and keep later expansion to more packages straightforward.

## Post-Migration Security Hardening

Once a trusted-publishing release has succeeded, npm recommends tightening package publishing access:

1. Open the package settings on npmjs.com.
2. Go to **Publishing access**.
3. Select **Require two-factor authentication and disallow tokens**.
4. Revoke any old automation tokens that are no longer needed.

That preserves trusted publishing while closing the token-based path.

## Best Practices For A Project Like Amebic

### 1. Separate publishable packages from demo/template packages

For a toolkit repo, keep the npm surface small and deliberate. `core` is a library. The preview app, docs app, examples, and branding assets are development artifacts and should remain private unless you have a strong product reason to publish them.

### 2. Keep the CLI focused on loading the consumer's project

For a Remotion-style workflow, the CLI should resolve an entry file from the current project and let that entry register compositions. Avoid hardcoding internal sample packages into the CLI runtime path.

### 3. Make tarball contents explicit

Use `npm pack --dry-run` in CI and add a `files` list in publishable packages. This prevents shipping source files, screenshots, Playwright fixtures, local assets, or workspace-only docs by accident.

### 4. Prefer package-specific release automation in a monorepo

Do not use a single generic `v1.2.3` tag if the repository will publish multiple packages. Use tags like `core-v1.2.3` and later `cli-v1.2.3`.

### 5. Keep publish workflows first-party and direct

Trusted publishing is tied to a specific workflow identity. Keep the actual `npm publish` step in a top-level workflow file under `.github/workflows/` instead of hiding it behind indirection.

### 6. Build once, publish from the same workflow

Provenance is strongest when the workflow that builds the artifact is the same workflow that publishes it. Avoid manual local publishes for official releases.

### 7. Use GitHub environments as your approval boundary

For an open-source package, an environment such as `npm` is a clean place to add a human approval gate without reintroducing tokens.

### 8. Treat provenance as a user-facing feature

Trusted publishing automatically emits provenance for public packages from public repos. That gives consumers a verifiable supply-chain trail, which is increasingly expected for developer tooling.

Consumers can verify attestations with `npm audit signatures`.

### 9. Keep Node and npm current in release CI

npm's trusted publishing support is version-sensitive. The workflow upgrades npm explicitly so the publish job does not silently depend on whatever version ships with the selected Node image.

### 10. Document which packages are public and supported

The README and docs should clearly say:

- Which packages are intended for npm consumers
- Which packages are internal-only
- Whether the CLI is public, internal, or pending redesign

That prevents mismatched expectations and accidental publishes.

## Suggested Next Changes

If you want this repo to publish more than `@amebic/core`, the next step is to define a stable release policy for `@amebic/cli` and then add a second trusted-publishing job with package-specific tags such as `cli-v1.2.3`.
