/**
 * @fileoverview Notification badge with count.
 * @module @amebic/templates/Badge
 */

import { useComposition, registerComposition } from "@amebic/core";

export interface BadgeProps {
  count: number;
  maxCount?: number;
  color?: string;
}

/** Notification badge - adapts stroke/detail for small sizes */
export const Badge: React.FC<BadgeProps> = (props) => {
  const { width, height } = useComposition();
  const color = props.color ?? "#ef4444";
  const displayCount =
    props.maxCount && props.count > props.maxCount
      ? `${props.maxCount}+`
      : String(props.count);

  const isTiny = width <= 32;
  const fontSize = Math.max(10, width * 0.5);

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
          minWidth: width * 0.8,
          minHeight: height * 0.8,
          borderRadius: "50%",
          background: color,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize,
          fontFamily: "system-ui, sans-serif",
          boxShadow: isTiny ? "none" : `0 2px 8px ${color}60`,
        }}
      >
        {displayCount}
      </div>
    </div>
  );
};

Badge.displayName = "Badge";

registerComposition(Badge, {
  defaultProps: { count: 42, maxCount: 99 },
  outputs: [
    { name: "tiny", width: 16, height: 16 },
    { name: "small", width: 24, height: 24 },
    { name: "medium", width: 32, height: 32 },
    { name: "large", width: 48, height: 48 },
  ],
});
