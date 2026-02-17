---
name: amebic-render
description: Render Amebic compositions to image files. Use when running the Amebic CLI, batch rendering, or integrating the render API. Covers list, render, --set, --props, and programmatic renderComposition.
---

# Amebic Rendering

## CLI Commands

```bash
# List compositions and sets
bun run list

# Render a composition (all outputs)
bun run render AppIcon --out-dir ./output

# Render a set (all compositions)
bun run render ProductBranding --set --out-dir ./output

# With custom props (JSON file)
bun run render SocialCard --out-dir ./output --props ./props.json
```

## Programmatic API

```ts
import { renderComposition } from "@amebic/core/render";
import { getComposition } from "@amebic/core";

const meta = getComposition("SocialCard");
const files = await renderComposition(meta, { title: "Hi" }, {
  outDir: "./output",
  omitBackground: true,
  format: "png",
});
```

## Prerequisites

```bash
bunx playwright install chromium
```

## Output Layout

Files are written to `{outDir}/{compositionId}/{outputName}.{ext}`.
