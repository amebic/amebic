# Amebic

**ReMotion for still graphics.** One React composition → many still outputs in different formats.

## Quick Start

```bash
bun install
bun run build
```

### Preview UI

```bash
bun run dev
```

Opens the preview at http://localhost:5174. Pick a composition, switch outputs, edit props.

### Render to Images

```bash
# List registered compositions
bun run list

# Render a composition (all outputs)
bun run render AppIcon --out-dir ./output

# Render a set (all compositions in the set)
bun run render ProductBranding --set --out-dir ./output

# With custom props
bun run render SocialCard --out-dir ./output --props ./props.json
```

**First-time setup:** Install Chromium for Playwright:

```bash
bunx playwright install chromium
```

## Packages

| Package | Description |
|---------|-------------|
| `@amebic/core` | Composition API, registry, render (Node) |
| `@amebic/preview` | Vite + React preview UI |
| `@amebic/cli` | CLI for `render` and `list` |
| `@amebic/templates` | Example compositions (SocialCard, AppIcon) |

## Creating a Composition

```tsx
import { useComposition, registerComposition } from "@amebic/core";

export const MyGraphic: React.FC<{ title: string }> = (props) => {
  const { width, height, outputName } = useComposition();
  return (
    <div style={{ width, height, background: "#333", color: "#fff" }}>
      {props.title}
    </div>
  );
};

registerComposition(MyGraphic, {
  defaultProps: { title: "Hello" },
  outputs: [
    { name: "og", width: 1200, height: 630 },
    { name: "thumb", width: 400, height: 400 },
  ],
});
```

Import your composition (e.g. in `@amebic/templates`) to register it for preview and render.
