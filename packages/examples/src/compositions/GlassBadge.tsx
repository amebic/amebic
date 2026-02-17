/**
 * @fileoverview Badge with semi-transparent glass-like background.
 * @module @amebic/examples/GlassBadge
 */

import { useComposition, registerComposition } from "@amebic/core";

export interface GlassBadgeProps {
  label: string;
  opacity?: number;
}

/** Badge with rgba background - glass/frosted effect when overlaid */
export const GlassBadge: React.FC<GlassBadgeProps> = (props) => {
  const { width, height } = useComposition();
  const opacity = props.opacity ?? 0.85;

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <div
        style={{
          padding: `${height * 0.2}px ${width * 0.25}px`,
          borderRadius: 8,
          background: `rgba(255, 255, 255, ${opacity})`,
          color: "rgba(0, 0, 0, 0.9)",
          fontSize: Math.min(width * 0.2, 14),
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
          border: "1px solid rgba(255, 255, 255, 0.5)",
        }}
      >
        {props.label}
      </div>
    </div>
  );
};

GlassBadge.displayName = "GlassBadge";

registerComposition(GlassBadge, {
  defaultProps: { label: "NEW", opacity: 0.9 },
  outputs: [
    { name: "tiny", width: 32, height: 16 },
    { name: "small", width: 64, height: 28 },
    { name: "medium", width: 96, height: 40 },
  ],
});
