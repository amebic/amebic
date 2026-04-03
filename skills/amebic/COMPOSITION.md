# Creating Compositions

Build polished still graphics with React components.

## When to Use

- Social media images (OG cards, Twitter images)
- App icons and favicons
- Marketing banners and hero images
- Badges, thumbnails, covers
- Any graphic needing multiple sizes

## Critical Rules

1. **INLINE STYLES ONLY** — External CSS doesn't work in headless render
2. **ALWAYS SET DISPLAYNAME** — Required for readable composition IDs
3. **FONTS VIA CDN** — Use Google Fonts or data URIs
4. **IMAGES VIA DATA URI OR ABSOLUTE URL** — Relative paths fail in headless mode
5. **NO EMOJIS** — Use icons from libraries like Lucide

## Quick Start

```tsx
import { useComposition, registerComposition } from "@amebic/core";

export const SocialCard: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  const { width, height } = useComposition();

  return (
    <div
      style={{
        width,
        height,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        color: "white",
        padding: 48,
      }}
    >
      <h1 style={{ fontSize: 64, margin: 0 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 32, opacity: 0.9 }}>{subtitle}</p>}
    </div>
  );
};

SocialCard.displayName = "SocialCard";

registerComposition(SocialCard, {
  defaultProps: { title: "Hello World", subtitle: "Subtitle here" },
  outputs: [
    { name: "og", width: 1200, height: 630 },
    { name: "twitter", width: 1200, height: 600 },
  ],
  fonts: ["https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"],
});
```

## useComposition Hook

Returns viewport metadata for the current render:

```ts
const { width, height, outputName } = useComposition();
```

| Field        | Type   | Description                                    |
| ------------ | ------ | ---------------------------------------------- |
| `width`      | number | Viewport width in pixels                       |
| `height`     | number | Viewport height in pixels                      |
| `outputName` | string | Current output name (e.g., "og", "favicon-16") |

## Output-Aware Rendering

Branch on `outputName` for different treatment at different sizes:

```tsx
const { outputName, width } = useComposition();

// Simplify for small icons
if (outputName.startsWith("favicon")) {
  return <SimplifiedIcon />;
}

// Compact layout for thumbnails
if (width < 400) {
  return <CompactLayout />;
}

return <FullLayout />;
```

## Registration Options

```ts
registerComposition(Component, {
  defaultProps?: Record<string, unknown>;
  defaultDimensions?: { width: number; height: number };
  outputs: OutputConfig[];
  fonts?: string[]; // Google Fonts URLs
});

type OutputConfig = {
  name: string;
  width: number;
  height: number;
  format?: "png" | "webp" | "jpeg" | "svg";
};
```

## Design Patterns

### Dark Backgrounds

```ts
const bg = "#0a0a0a"; // Modern dark
const gradient = "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)";
```

### Typography Scale

```ts
const text = {
  xs: { fontSize: 12 },
  sm: { fontSize: 14 },
  base: { fontSize: 16 },
  lg: { fontSize: 18 },
  xl: { fontSize: 20 },
  "2xl": { fontSize: 24 },
  "3xl": { fontSize: 30 },
  "4xl": { fontSize: 36 },
  "5xl": { fontSize: 48 },
  "6xl": { fontSize: 60 },
};
```

### Spacing Scale

```ts
const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
};
```

### Shadows

```ts
const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
};
```

## File Organization

Place compositions in `packages/templates/src/compositions/`:

```
compositions/
├── SocialCard.tsx
├── AppIcon.tsx
├── GradientHero.tsx
└── index.ts          # Export all compositions
```

Export from `index.ts`:

```ts
export { SocialCard } from "./SocialCard";
export { AppIcon } from "./AppIcon";
// Registry runs on import
```

## References

- `packages/templates/src/compositions/` — Example compositions
- `packages/core/src/types.ts` — TypeScript definitions
