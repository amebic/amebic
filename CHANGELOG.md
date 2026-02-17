# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Documentation site with Nextra
- AI agent skills (`amebic-render`, `amebic-composition`)
- `AGENTS.md` for project guidance
- GitHub Actions workflows (disabled by default)
- ESLint and Prettier configuration
- Husky pre-commit hooks

## [0.1.0] - 2024-XX-XX

### Added

- **Core API** (`@amebic/core`)
  - Composition registry with `registerComposition()`
  - Set registry with `registerSet()`
  - `useComposition()` hook for viewport metadata
  - Headless render engine using Playwright
  - Support for PNG, WebP, JPEG, and SVG output formats

- **CLI** (`@amebic/cli`)
  - `list` command to show all compositions and sets
  - `render` command to render compositions to images
  - `--set` flag for rendering composition sets
  - `--props` flag for custom props from JSON file
  - `--format` flag for output format override
  - `--out-dir` flag for output directory

- **Preview UI** (`@amebic/preview`)
  - Vite + React development server
  - Live preview of compositions
  - Output switching
  - Props editing interface

- **Templates** (`@amebic/templates`)
  - `SocialCard` - OG and Twitter card images
  - `AppIcon` - Favicon and app icon set (8 sizes)
  - `GradientHero` - Hero banners and cards
  - `Badge` - Small badge graphics
  - `PodcastCover` - Podcast artwork
  - `NeonCard` - Neon-style cards

- **Examples** (`@amebic/examples`)
  - Transparency demonstrations
  - Overlay compositions
  - Glass badge effect

- **Branding** (`@amebic/branding`)
  - Amebic logo assets
  - Banner templates

### Technical

- Monorepo structure with Bun workspaces
- TypeScript 5.7+ strict mode
- Vitest for testing
- Playwright for headless rendering

[unreleased]: https://github.com/yourusername/amebic/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yourusername/amebic/releases/tag/v0.1.0
