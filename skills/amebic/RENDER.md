# Rendering

Render compositions to PNG, WebP, JPEG, or SVG.

## When to Use

- Generating production assets
- Batch processing multiple compositions
- CI/CD integration
- Custom render workflows

## Prerequisites

```bash
bunx playwright install chromium
```

## CLI Commands

### List Compositions

```bash
bun run list
```

Shows all registered compositions and sets with their outputs.

### Render Single Composition

```bash
# All outputs
bun run render SocialCard --out-dir ./output

# With custom props
bun run render SocialCard --out-dir ./output --props ./props.json

# Override format
bun run render SocialCard --out-dir ./output --format webp
```

### Render Sets

```bash
bun run render ProductBranding --set --out-dir ./output
```

### Props JSON Format

```json
{
  "title": "My Post Title",
  "description": "A compelling description",
  "author": {
    "name": "Jane Doe",
    "avatar": "https://example.com/avatar.png"
  }
}
```

## CLI Options

| Option          | Description                            |
| --------------- | -------------------------------------- |
| `--out-dir, -o` | Output directory (default: `./output`) |
| `--props`       | Path to JSON props file                |
| `--format, -f`  | Override format: `png`, `webp`, `jpeg` |
| `--set, -s`     | Render as a set                        |

## Programmatic API

### Basic Render

```ts
import { renderComposition } from "@amebic/core/render";
import { getComposition } from "@amebic/core";

const meta = getComposition("SocialCard");

const files = await renderComposition(
  meta,
  { title: "Hello World" },
  {
    outDir: "./output",
    format: "png",
    omitBackground: true,
  }
);

console.log(files);
// ["output/SocialCard/og.png", "output/SocialCard/twitter.png"]
```

### Batch Rendering

```ts
import { getSet, getComposition } from "@amebic/core";
import { renderComposition } from "@amebic/core/render";

async function renderSet(setId: string, outDir: string) {
  const compositionIds = getSet(setId);
  if (!compositionIds) throw new Error(`Set not found: ${setId}`);

  const results: string[] = [];

  for (const id of compositionIds) {
    const meta = getComposition(id);
    if (!meta) continue;

    const files = await renderComposition(meta, meta.config.defaultProps ?? {}, {
      outDir,
      omitBackground: true,
    });

    results.push(...files);
  }

  return results;
}
```

## Render Options

```ts
interface RenderOptions {
  outDir: string; // Required: output directory
  format?: "png" | "webp" | "jpeg"; // Override all output formats
  omitBackground?: boolean; // Default: true (PNG/WebP only)
  styles?: string[]; // Additional CSS to inject
}
```

## Output Layout

```
output/
├── SocialCard/
│   ├── og.png          # 1200×630
│   └── twitter.png     # 1200×600
├── AppIcon/
│   ├── favicon-16.png  # 16×16
│   ├── favicon-32.png  # 32×32
│   └── ...
```

## Format Selection Guide

| Format   | Best For            | Pros                    | Cons                   |
| -------- | ------------------- | ----------------------- | ---------------------- |
| **PNG**  | Icons, transparency | Lossless, alpha channel | Larger files           |
| **WebP** | Web assets          | Small, supports alpha   | Less universal support |
| **JPEG** | Photos              | Smallest for photos     | No transparency        |
| **SVG**  | Simple logos        | Scalable, tiny          | Limited complexity     |

## Troubleshooting

### "Composition not found"

Ensure the composition is imported in the CLI's dependency tree:

```ts
// In cli.ts or entry point
import "@amebic/templates"; // Registers compositions
import "@amebic/branding"; // Registers branding
```

### Chromium not found

```bash
bunx playwright install chromium
```

### Fonts not loading

Use absolute URLs or data URIs:

```ts
// Bad - relative path won't work
fontFamily: "./fonts/Custom.ttf";

// Good - Google Fonts CDN
fonts: ["https://fonts.googleapis.com/css2?family=Inter&display=swap"];

// Good - data URI
backgroundImage: "url(data:image/png;base64,...)";
```

### Out of memory

Render sequentially, not in parallel:

```ts
// Bad - all at once
await Promise.all(compositions.map((c) => renderComposition(c, ...)));

// Good - sequential
for (const comp of compositions) {
  await renderComposition(comp, ...);
}
```

## References

- `packages/core/src/render.ts` — Render implementation
- `packages/cli/src/cli.ts` — CLI implementation
- `packages/core/src/types.ts` — Type definitions
