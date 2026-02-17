/**
 * @fileoverview Amebic repo banner - logo on gradient for README/docs.
 * @module @amebic/branding/Banner
 */

import { useComposition, registerComposition } from "@amebic/core";

const INCONSOLATA_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&display=swap";

export interface BannerProps {
  tagline?: string;
}

/** Banner for README: logo + optional tagline on gradient */
export const Banner: React.FC<BannerProps> = (props) => {
  const { width, height } = useComposition();

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        padding: 32,
      }}
    >
      <span
        style={{
          fontFamily: "'Inconsolata', monospace",
          fontWeight: 300,
          fontSize: Math.min(width * 0.12, height * 0.5),
          color: "#f8fafc",
          textTransform: "lowercase",
          letterSpacing: "-0.02em",
        }}
      >
        amebic
      </span>
      {props.tagline && (
        <span
          style={{
            marginTop: 8,
            fontSize: Math.min(width * 0.03, 18),
            color: "rgba(248, 250, 252, 0.8)",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {props.tagline}
        </span>
      )}
    </div>
  );
};

Banner.displayName = "Banner";

registerComposition(Banner, {
  defaultProps: { tagline: "ReMotion for still graphics" },
  fonts: [INCONSOLATA_FONT_URL],
  outputs: [
    { name: "readme", width: 1280, height: 320 },
    { name: "og", width: 1200, height: 630 },
    { name: "compact", width: 960, height: 200 },
  ],
});
