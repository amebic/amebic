/**
 * @fileoverview Watermark with transparent background and semi-opaque text.
 * @module @amebic/examples/TransparentWatermark
 */

import { useComposition, registerComposition } from "@amebic/core";

export interface TransparentWatermarkProps {
  text: string;
  opacity?: number;
}

/** Watermark overlay - transparent background, semi-transparent text */
export const TransparentWatermark: React.FC<TransparentWatermarkProps> = (props) => {
  const { width, height } = useComposition();
  const opacity = props.opacity ?? 0.3;

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <span
        style={{
          fontSize: Math.min(width * 0.15, 72),
          fontWeight: 700,
          color: `rgba(0, 0, 0, ${opacity})`,
          transform: "rotate(-30deg)",
          whiteSpace: "nowrap",
        }}
      >
        {props.text}
      </span>
    </div>
  );
};

TransparentWatermark.displayName = "TransparentWatermark";

registerComposition(TransparentWatermark, {
  defaultProps: { text: "DRAFT", opacity: 0.25 },
  outputs: [
    { name: "small", width: 200, height: 100 },
    { name: "large", width: 600, height: 300 },
  ],
});
