/**
 * @fileoverview Amebic logo - product name in Inconsolata Light 300, lowercase.
 * @see https://fonts.google.com/specimen/Inconsolata
 * @module @amebic/branding/Logo
 */

import { useComposition, registerComposition } from "@amebic/core";

const INCONSOLATA_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&display=swap";

export interface LogoProps {
  color?: string;
}

/** Logo: "amebic" in Inconsolata Light 300, lowercase */
export const Logo: React.FC<LogoProps> = (props) => {
  const { width, height } = useComposition();
  const color = props.color ?? "#1a1a1a";

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
      <span
        style={{
          fontFamily: "'Inconsolata', monospace",
          fontWeight: 300,
          fontSize: Math.min(width * 0.35, height * 0.9),
          color,
          textTransform: "lowercase",
          letterSpacing: "-0.02em",
        }}
      >
        amebic
      </span>
    </div>
  );
};

Logo.displayName = "Logo";

registerComposition(Logo, {
  defaultProps: {},
  fonts: [INCONSOLATA_FONT_URL],
  outputs: [
    { name: "icon", width: 128, height: 48 },
    { name: "small", width: 256, height: 96 },
    { name: "medium", width: 512, height: 192 },
    { name: "large", width: 1024, height: 384 },
  ],
});
