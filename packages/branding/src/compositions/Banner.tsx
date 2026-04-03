/**
 * @fileoverview Amebic repo banner - blob logo on gradient for README/docs.
 * @module @amebic/branding/Banner
 */

import { useComposition, registerComposition } from "@amebic/core";

const INTER_FONT_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap";

export interface BannerProps {
  tagline?: string;
}

/**
 * Banner for README: inline SVG blob logo + text on gradient background.
 * Uses CSS Grid for clean layout control.
 */
export const Banner: React.FC<BannerProps> = (props) => {
  const { width, height, outputName } = useComposition();

  // For compact output, use smaller sizes and horizontal layout
  const isCompact = outputName === "compact";
  const basePadding = isCompact ? 24 : 40;
  const logoSize = isCompact ? Math.min(width, height) * 0.5 : Math.min(width * 0.15, height * 0.4);
  const titleFontSize = isCompact ? Math.min(width * 0.12, height * 0.4) : Math.min(width * 0.08, height * 0.25);
  const taglineFontSize = isCompact ? Math.min(width * 0.04, 14) : Math.min(width * 0.025, 18);
  const gap = isCompact ? 12 : 16;

  // Blob logo parameters
  const blobScale = logoSize * 0.35;
  const blobColor = "#3b82f6";
  const textColor = "#ffffff";

  if (isCompact) {
    // Compact horizontal layout
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a1f 0%, #151519 50%, #0f0f12 100%)",
          padding: basePadding,
          gap,
        }}
      >
        {/* Inline SVG Blob Logo */}
        <svg
          width={logoSize}
          height={logoSize}
          viewBox={`0 0 ${logoSize} ${logoSize}`}
          style={{ display: "block", flexShrink: 0 }}
        >
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 25 -8"
                result="gooey"
              />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
            <radialGradient id="blobGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor={blobColor} stopOpacity="1" />
              <stop offset="100%" stopColor={blobColor} stopOpacity="0.8" />
            </radialGradient>
            <filter id="letterShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#gooey)" transform={`translate(${logoSize / 2}, ${logoSize / 2})`}>
            <circle cx="0" cy="0" r={blobScale} fill="url(#blobGradient)" />
            <circle cx={-blobScale * 0.6} cy={blobScale * 0.3} r={blobScale * 0.55} fill={blobColor} />
            <circle cx={blobScale * 0.5} cy={-blobScale * 0.4} r={blobScale * 0.5} fill={blobColor} />
            <circle cx={blobScale * 0.3} cy={blobScale * 0.6} r={blobScale * 0.45} fill={blobColor} />
            <circle cx={-blobScale * 0.3} cy={-blobScale * 0.5} r={blobScale * 0.4} fill={blobColor} />
            <circle cx={0} cy={blobScale * 0.8} r={blobScale * 0.35} fill={blobColor} />
          </g>
          <text
            x={logoSize / 2}
            y={logoSize / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill={textColor}
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            fontSize={logoSize * 0.5}
            fontWeight="700"
            filter="url(#letterShadow)"
            style={{ letterSpacing: "-0.02em" }}
          >
            A
          </text>
        </svg>

        {/* Text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: titleFontSize,
              color: "#f8fafc",
              textTransform: "lowercase",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            amebic
          </span>
          {props.tagline && (
            <span
              style={{
                fontSize: taglineFontSize,
                color: "rgba(248, 250, 252, 0.75)",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              {props.tagline}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Vertical layout (readme, og) - using CSS Grid for clean layout
  return (
    <div
      style={{
        width,
        height,
        display: "grid",
        gridTemplateRows: `${basePadding}px 1fr auto auto ${basePadding * 1.5}px`,
        gridTemplateColumns: "1fr",
        alignItems: "center",
        justifyItems: "center",
        background: "linear-gradient(135deg, #1a1a1f 0%, #151519 50%, #0f0f12 100%)",
        paddingLeft: basePadding,
        paddingRight: basePadding,
      }}
    >
      {/* Row 1: Top padding (empty) */}
      <div />

      {/* Row 2: Logo - centered in the available space */}
      <div
        style={{
          gridRow: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <svg
          width={logoSize}
          height={logoSize}
          viewBox={`0 0 ${logoSize} ${logoSize}`}
          style={{ display: "block" }}
        >
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 25 -8"
                result="gooey"
              />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
            <radialGradient id="blobGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor={blobColor} stopOpacity="1" />
              <stop offset="100%" stopColor={blobColor} stopOpacity="0.8" />
            </radialGradient>
            <filter id="letterShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#gooey)" transform={`translate(${logoSize / 2}, ${logoSize / 2})`}>
            <circle cx="0" cy="0" r={blobScale} fill="url(#blobGradient)" />
            <circle cx={-blobScale * 0.6} cy={blobScale * 0.3} r={blobScale * 0.55} fill={blobColor} />
            <circle cx={blobScale * 0.5} cy={-blobScale * 0.4} r={blobScale * 0.5} fill={blobColor} />
            <circle cx={blobScale * 0.3} cy={blobScale * 0.6} r={blobScale * 0.45} fill={blobColor} />
            <circle cx={-blobScale * 0.3} cy={-blobScale * 0.5} r={blobScale * 0.4} fill={blobColor} />
            <circle cx={0} cy={blobScale * 0.8} r={blobScale * 0.35} fill={blobColor} />
          </g>
          <text
            x={logoSize / 2}
            y={logoSize / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill={textColor}
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            fontSize={logoSize * 0.5}
            fontWeight="700"
            filter="url(#letterShadow)"
            style={{ letterSpacing: "-0.02em" }}
          >
            A
          </text>
        </svg>
      </div>

      {/* Row 3: Title */}
      <span
        style={{
          gridRow: 3,
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: titleFontSize,
          color: "#f8fafc",
          textTransform: "lowercase",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          marginTop: gap,
        }}
      >
        amebic
      </span>

      {/* Row 4: Tagline */}
      {props.tagline && (
        <span
          style={{
            gridRow: 4,
            fontSize: taglineFontSize,
            color: "rgba(248, 250, 252, 0.75)",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            lineHeight: 1.4,
            marginTop: 4,
          }}
        >
          {props.tagline}
        </span>
      )}

      {/* Row 5: Bottom padding (empty) */}
      <div />
    </div>
  );
};

Banner.displayName = "Banner";

registerComposition(Banner, {
  defaultProps: { tagline: "React compositions for graphics" },
  fonts: [INTER_FONT_URL],
  outputs: [
    { name: "readme", width: 1280, height: 320 },
    { name: "og", width: 1200, height: 630 },
    { name: "compact", width: 960, height: 200 },
  ],
});
