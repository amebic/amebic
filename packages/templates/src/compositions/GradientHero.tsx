/**
 * @fileoverview Bold gradient hero banner with typography.
 * @module @amebic/templates/GradientHero
 */

import { useComposition, registerComposition } from "@amebic/core";

export interface GradientHeroProps {
  title: string;
  tagline?: string;
  accent?: string;
}

/** Hero banner with mesh gradient and bold typography */
export const GradientHero: React.FC<GradientHeroProps> = (props) => {
  const { width, height } = useComposition();
  const accent = props.accent ?? "#f59e0b";

  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${accent}40, transparent),
          radial-gradient(ellipse 60% 40% at 100% 100%, #8b5cf640, transparent),
          linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 64,
        color: "#f8fafc",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: Math.min(width * 0.08, 72),
          fontWeight: 800,
          letterSpacing: "-0.03em",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        {props.title}
      </h1>
      {props.tagline && (
        <p
          style={{
            fontSize: Math.min(width * 0.025, 24),
            opacity: 0.85,
            maxWidth: width * 0.6,
            textAlign: "center",
          }}
        >
          {props.tagline}
        </p>
      )}
    </div>
  );
};

GradientHero.displayName = "GradientHero";

registerComposition(GradientHero, {
  defaultProps: {
    title: "Build Something Amazing",
    tagline: "One composition, infinite possibilities",
  },
  outputs: [
    { name: "hero", width: 1920, height: 600 },
    { name: "banner", width: 1200, height: 400 },
    { name: "card", width: 600, height: 300 },
  ],
});
