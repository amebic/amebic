/**
 * @fileoverview Semi-transparent colored overlay (e.g. for video thumbnails).
 * @module @amebic/examples/TransparentOverlay
 */

import { useComposition, registerComposition } from "@amebic/core";

export interface TransparentOverlayProps {
  color?: string;
  opacity?: number;
  label?: string;
}

/** Semi-transparent overlay - rgba background with optional label */
export const TransparentOverlay: React.FC<TransparentOverlayProps> = (
  props
) => {
  const { width, height } = useComposition();
  const opacity = props.opacity ?? 0.5;
  const color = props.color ?? "#1e293b";

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `rgba(${hexToRgb(color)}, ${opacity})`,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {props.label && (
        <span
          style={{
            fontSize: Math.min(width * 0.05, 24),
            fontWeight: 600,
            color: "white",
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          {props.label}
        </span>
      )}
    </div>
  );
};

TransparentOverlay.displayName = "TransparentOverlay";

registerComposition(TransparentOverlay, {
  defaultProps: { color: "#1e293b", opacity: 0.6, label: "OVERLAY" },
  outputs: [
    { name: "thumb", width: 320, height: 180 },
    { name: "card", width: 640, height: 360 },
  ],
});

/** Convert hex to rgb string for rgba() */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "30, 41, 59"; // fallback slate-800
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ].join(", ");
}
