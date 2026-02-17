/**
 * @fileoverview Card with neon glow effect.
 * @module @amebic/templates/NeonCard
 */

import { useComposition, registerComposition } from "@amebic/core";

export interface NeonCardProps {
  title: string;
  glowColor?: string;
}

/** Card with neon border glow effect */
export const NeonCard: React.FC<NeonCardProps> = (props) => {
  const { width, height } = useComposition();
  const glow = props.glowColor ?? "#06b6d4";

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0c0c0c",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: width * 0.9,
          height: height * 0.85,
          border: `3px solid ${glow}`,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: glow,
          fontSize: Math.min(width * 0.06, 36),
          fontWeight: 600,
          boxShadow: `
            0 0 10px ${glow}40,
            0 0 20px ${glow}30,
            0 0 40px ${glow}20,
            inset 0 0 20px ${glow}10
          `,
        }}
      >
        {props.title}
      </div>
    </div>
  );
};

NeonCard.displayName = "NeonCard";

registerComposition(NeonCard, {
  defaultProps: { title: "NEON", glowColor: "#06b6d4" },
  outputs: [
    { name: "card", width: 400, height: 300 },
    { name: "small", width: 200, height: 150 },
  ],
});
