/**
 * @fileoverview Square podcast/album art with radial gradient.
 * @module @amebic/templates/PodcastCover
 */

import { useComposition, registerComposition } from "@amebic/core";

export interface PodcastCoverProps {
  title: string;
  subtitle?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

/** Square podcast cover with radial gradient and centered text */
export const PodcastCover: React.FC<PodcastCoverProps> = (props) => {
  const { width, height } = useComposition();
  const primary = props.primaryColor ?? "#7c3aed";
  const secondary = props.secondaryColor ?? "#ec4899";

  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        background: `radial-gradient(circle at 30% 30%, ${primary}, transparent 50%),
          radial-gradient(circle at 70% 70%, ${secondary}, transparent 50%),
          linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: width * 0.1,
        color: "#f8fafc",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: Math.min(width * 0.12, 48),
          fontWeight: 700,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {props.title}
      </h1>
      {props.subtitle && (
        <p style={{ fontSize: Math.min(width * 0.04, 16), opacity: 0.9 }}>{props.subtitle}</p>
      )}
    </div>
  );
};

PodcastCover.displayName = "PodcastCover";

registerComposition(PodcastCover, {
  defaultProps: {
    title: "The Show",
    subtitle: "Episode 1",
  },
  outputs: [
    { name: "spotify", width: 3000, height: 3000 },
    { name: "apple", width: 1400, height: 1400 },
    { name: "thumbnail", width: 300, height: 300 },
  ],
});
