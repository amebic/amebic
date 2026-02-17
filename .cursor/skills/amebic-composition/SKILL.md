---
name: amebic-composition
description: Create React compositions for Amebic (still graphics generator). Use when building new compositions, templates, or graphic components for the Amebic project. Covers useComposition, registerComposition, outputName, and multi-output patterns.
---

# Amebic Composition Authoring

## Quick Start

Compositions are React components that render still graphics. They use `useComposition()` for viewport metadata and `registerComposition()` to declare outputs.

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

MyGraphic.displayName = "MyGraphic";

registerComposition(MyGraphic, {
  defaultProps: { title: "Hello" },
  outputs: [
    { name: "og", width: 1200, height: 630 },
    { name: "thumb", width: 400, height: 400 },
  ],
});
```

## useComposition() Returns

| Field | Type | Description |
|-------|------|-------------|
| `width` | number | Viewport width in pixels |
| `height` | number | Viewport height in pixels |
| `outputName` | string | Name of current output (e.g. "mdpi", "favicon-16") |

## Output-Specific Behavior

Branch on `outputName` when the same dimensions need different treatment:

```tsx
const simplified = outputName === "favicon-16" || outputName === "favicon-32";
return simplified ? <SimplifiedIcon /> : <FullIcon />;
```

## registerComposition Config

```ts
{
  defaultProps?: Record<string, unknown>;
  defaultDimensions?: { width: number; height: number };
  outputs: Array<{ name: string; width: number; height: number; format?: "png"|"webp"|"jpeg" }>;
}
```

## Patterns

- **Inline styles only** for MVP (no external CSS in headless render).
- **Set `displayName`** so the composition ID is readable.
- **Import in templates** so registration runs (e.g. `packages/templates/src/compositions/index.ts`).
