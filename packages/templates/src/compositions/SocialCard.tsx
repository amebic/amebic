/**
 * @fileoverview Example social card composition (OG image).
 * @module @amebic/templates/SocialCard
 */

import { useComposition, registerComposition } from "@amebic/core";

export interface SocialCardProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
}

/** Social card composition for OG/social sharing (1200×630) */
export const SocialCard: React.FC<SocialCardProps> = (props) => {
  const { width, height } = useComposition();

  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        background:
          props.backgroundColor ??
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 48,
        color: "white",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>{props.title}</h1>
      {props.subtitle && (
        <p style={{ fontSize: 24, opacity: 0.9 }}>{props.subtitle}</p>
      )}
    </div>
  );
};

SocialCard.displayName = "SocialCard";

registerComposition(SocialCard, {
  defaultProps: { title: "Hello", subtitle: "World" },
  defaultDimensions: { width: 1200, height: 630 },
  outputs: [
    { name: "og", width: 1200, height: 630 },
    { name: "twitter", width: 1200, height: 630 },
  ],
});
