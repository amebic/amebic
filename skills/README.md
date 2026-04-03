# Amebic Skills

AI agent skill for working with the Amebic graphics toolkit.

## Installation

Install via the Vercel skills CLI:

```bash
npx skills add owner/amebic --skill amebic
```

Or manually:

```bash
# Clone or navigate to the Amebic repo
cd amebic

# Copy skill to global directory
mkdir -p ~/.cursor/skills
cp -r skills/amebic ~/.cursor/skills/
```

## Structure

```
skills/amebic/
├── SKILL.md           # Main skill entry point
├── COMPOSITION.md     # Creating compositions guide
└── RENDER.md          # Rendering guide
```

## Usage

Once installed, the skill activates when you:

- Mention "render" or "rendering" compositions
- Ask about creating compositions or templates
- Work with Amebic-specific code

## Documents

- **SKILL.md** — Overview, installation, commands
- **COMPOSITION.md** — Creating graphics, design patterns, hooks
- **RENDER.md** — CLI usage, programmatic API, troubleshooting

## Development

The skill in `.cursor/skills/` is a symlink to `skills/`. Edit files in `skills/amebic/` and both locations stay in sync.

To modify:

1. Edit files in `skills/amebic/`
2. Test with your AI agent
3. Commit changes

## License

MIT
