# Amebic Test Output

Test run of compositions and sets. Run with:

```bash
bun run build
bun run list
bun run render <composition> --out-dir ./test-output
bun run render Creative --set --out-dir ./test-output
```

## Compositions Registered

| Composition  | Outputs                                                     |
| ------------ | ----------------------------------------------------------- |
| SocialCard   | og (1200×630), twitter (1200×630)                           |
| AppIcon      | favicon-16…apple-touch-icon (8 outputs)                     |
| GradientHero | hero (1920×600), banner (1200×400), card (600×300)          |
| Badge        | tiny (16×16), small (24×24), medium (32×32), large (48×48)  |
| PodcastCover | spotify (3000×3000), apple (1400×1400), thumbnail (300×300) |
| NeonCard     | card (400×300), small (200×150)                             |

## Sets

- **ProductBranding**: SocialCard, AppIcon
- **Creative**: GradientHero, Badge, PodcastCover, NeonCard
- **TransparencyExamples**: TransparentWatermark, TransparentOverlay, GlassBadge (from @amebic/examples)

## Sample Test Run

```
$ bun run list
Compositions:
  SocialCard (2 outputs)
  AppIcon (8 outputs)
  GradientHero (3 outputs)
  Badge (4 outputs)
  PodcastCover (3 outputs)
  NeonCard (2 outputs)
Sets:
  ProductBranding: SocialCard, AppIcon
  Creative: GradientHero, Badge, PodcastCover, NeonCard

$ bun run render GradientHero --out-dir ./test-output
Wrote 3 file(s): hero.png, banner.png, card.png

$ bun run render SocialCard --out-dir ./test-output --props ./props.json
Wrote 2 file(s): og.png, twitter.png

$ bun run render Creative --set --out-dir ./test-output
Wrote 12 file(s) (all compositions in set)
```
