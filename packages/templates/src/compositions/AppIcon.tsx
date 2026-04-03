/**
 * @fileoverview Example app icon composition with multi-output support.
 * @module @amebic/templates/AppIcon
 */

import { useComposition, registerComposition } from "@amebic/core";

/** App icon composition - adapts via outputName and viewport */
export const AppIcon: React.FC = () => {
  const { width, height, outputName } = useComposition();
  const simplified = outputName === "favicon-16" || outputName === "favicon-32";

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
      <svg viewBox="0 0 24 24" width={width} height={height} style={{ display: "block" }}>
        {simplified ? (
          <path
            d="M12 2L2 7v10l10 5 10-5V7L12 2z"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M12 2L2 7v10l10 5 10-5V7L12 2z"
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
};

AppIcon.displayName = "AppIcon";

registerComposition(AppIcon, {
  outputs: [
    { name: "favicon-16", width: 16, height: 16 },
    { name: "favicon-32", width: 32, height: 32 },
    { name: "mdpi", width: 48, height: 48 },
    { name: "hdpi", width: 72, height: 72 },
    { name: "xhdpi", width: 96, height: 96 },
    { name: "xxhdpi", width: 144, height: 144 },
    { name: "xxxhdpi", width: 192, height: 192 },
    { name: "apple-touch-icon", width: 180, height: 180 },
  ],
});
