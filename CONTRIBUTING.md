# Contributing to Amebic

Thanks for your interest in contributing to Amebic!

## Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/amebic.git
cd amebic

# Install dependencies
bun install

# Build all packages
bun run build

# Run tests
bun run test
```

## Project Structure

- `packages/core/` - Core API, registry, render engine
- `packages/cli/` - Command line interface
- `packages/preview/` - Vite + React preview UI
- `packages/templates/` - Published compositions
- `packages/examples/` - Experimental compositions
- `packages/branding/` - Logo and banner assets
- `apps/docs/` - Nextra documentation site
- `skills/` - AI agent skills

## Making Changes

1. Create a new branch: `git checkout -b feat/your-feature-name`
2. Make your changes
3. Run tests: `bun run test`
4. Run linting: `bun run lint` (if available)
5. Format code: `bun run format` (if available)
6. Commit with a descriptive message
7. Push and open a pull request

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/). All commits must use this format:

```
<type>: <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New features or capabilities |
| `fix` | Bug fixes |
| `docs` | Documentation changes only |
| `style` | Code style changes (formatting, semicolons, etc) |
| `refactor` | Code changes that neither fix bugs nor add features |
| `perf` | Performance improvements |
| `test` | Adding or correcting tests |
| `chore` | Build process, dependencies, tooling changes |
| `ci` | CI/CD configuration changes |

### Guidelines

- Use lowercase for type and description
- Keep the first line under 72 characters
- Use present tense: "add feature" not "added feature"
- Be specific: `feat: add WebP output format` not `feat: update render`

### Examples

```
feat: add SVG output format support

fix: resolve transparent background in JPEG renders

docs: update COMPOSITION.md with shadow examples

refactor: extract color palette constants in SocialCard

test: add integration test for batch rendering

chore: upgrade Playwright to v1.40
```

## Adding a New Composition

1. Create component in `packages/templates/src/compositions/`
2. Use `useComposition()` hook for dimensions
3. Call `registerComposition()` with output configs
4. Export from `packages/templates/src/compositions/index.ts`
5. Test with `bun run dev`
6. Render with `bun run render <Name> --out-dir ./output`

## Code Style

- Use TypeScript for all new code
- Prefer explicit exports over wildcards
- Use inline styles for compositions (no external CSS)
- Set `displayName` on all composition components

## Testing

- Unit tests: `bun run test`
- Integration tests include render pipeline tests with Playwright
- Ensure all tests pass before submitting PR

## Pull Request Process

### Before Submitting

1. **Run quality checks:**
   ```bash
   bun run lint
   bun run format:check
   bun run test
   bun run build
   ```

2. **Update documentation** if your changes affect usage

3. **Add tests** for new functionality

### PR Requirements

- Follow the commit message format (Conventional Commits)
- Keep PRs focused — one feature or fix per PR
- Include a clear description of what changed and why
- Reference any related issues

### PR Title Format

PR titles should follow the same format as commits:

```
feat: add shadow design tokens to compositions
docs: update README with preview screenshot
fix: resolve font loading in headless render
```

### Review Process

1. Automated checks must pass (CI — when enabled)
2. At least one maintainer review required
3. Address review feedback with additional commits
4. Maintainer will merge using "Squash and merge"

## Questions?

Open an issue or start a discussion.
