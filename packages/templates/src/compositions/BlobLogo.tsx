/**
 * @fileoverview Blob logo with CSS/SVG filter shader effects.
 * @module @amebic/templates/BlobLogo
 */

import { useComposition, registerComposition } from "@amebic/core";

export interface BlobLogoProps {
  letter?: string;
  blobColor?: string;
  bgGradientStart?: string;
  bgGradientEnd?: string;
  textColor?: string;
  borderRadius?: number;
}

/**
 * A blob-style logo with SVG filter effects creating a gooey shader look.
 * Features a dark gray gradient card with rounded corners on a transparent background.
 */
export const BlobLogo: React.FC<BlobLogoProps> = (props) => {
  const { width, height } = useComposition();
  const letter = props.letter ?? "A";
  const blobColor = props.blobColor ?? "#3b82f6";
  const bgGradientStart = props.bgGradientStart ?? "#1a1a1f";
  const bgGradientEnd = props.bgGradientEnd ?? "#0f0f12";
  const textColor = props.textColor ?? "#ffffff";
  const borderRadius = props.borderRadius ?? 80;

  // Scale factor based on viewport size
  const size = Math.min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const blobScale = size * 0.35;

  // Padding for the rounded card
  const padding = size * 0.05;
  const cardSize = size - padding * 2;

  return (
    <div
      style={{
        width,
        height,
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ display: "block" }}
      >
        <defs>
          {/* Gooey blob filter effect */}
          <filter id="gooey">
            {/* Blur the shapes */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            {/* Increase contrast to create sharp edges from blur */}
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 35 -10"
              result="gooey"
            />
            {/* Composite with original to preserve colors */}
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>

          {/* Noise texture for subtle grain effect */}
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.03" />
            </feComponentTransfer>
          </filter>

          {/* Dark grayish gradient for the card background */}
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={bgGradientStart} />
            <stop offset="50%" stopColor="#151519" />
            <stop offset="100%" stopColor={bgGradientEnd} />
          </linearGradient>

          {/* Gradient for blob depth */}
          <radialGradient id="blobGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={blobColor} stopOpacity="1" />
            <stop offset="100%" stopColor={blobColor} stopOpacity="0.8" />
          </radialGradient>

          {/* Shadow filter for the letter */}
          <filter id="letterShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000000" floodOpacity="0.4" />
          </filter>

          {/* Soft shadow for the card */}
          <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="24" floodColor="#000000" floodOpacity="0.25" />
          </filter>

          {/* Clip path for rounded card */}
          <clipPath id="cardClip">
            <rect
              x={padding}
              y={padding}
              width={cardSize}
              height={cardSize}
              rx={borderRadius}
              ry={borderRadius}
            />
          </clipPath>
        </defs>

        {/* Rounded card with gradient background and shadow */}
        <rect
          x={padding}
          y={padding}
          width={cardSize}
          height={cardSize}
          rx={borderRadius}
          ry={borderRadius}
          fill="url(#cardGradient)"
          filter="url(#cardShadow)"
        />

        {/* Noise texture clipped to card */}
        <g clipPath="url(#cardClip)">
          <rect
            x={padding}
            y={padding}
            width={cardSize}
            height={cardSize}
            fill="#000000"
            opacity="0.02"
          />
        </g>

        {/* Blob container with gooey filter - centered on the card */}
        <g filter="url(#gooey)" transform={`translate(${centerX}, ${centerY})`}>
          {/* Main central blob */}
          <circle cx="0" cy="0" r={blobScale} fill="url(#blobGradient)" />

          {/* Satellite blobs for organic shape */}
          <circle cx={-blobScale * 0.6} cy={blobScale * 0.3} r={blobScale * 0.55} fill={blobColor} />
          <circle cx={blobScale * 0.5} cy={-blobScale * 0.4} r={blobScale * 0.5} fill={blobColor} />
          <circle cx={blobScale * 0.3} cy={blobScale * 0.6} r={blobScale * 0.45} fill={blobColor} />
          <circle cx={-blobScale * 0.3} cy={-blobScale * 0.5} r={blobScale * 0.4} fill={blobColor} />
          <circle cx={0} cy={blobScale * 0.8} r={blobScale * 0.35} fill={blobColor} />
        </g>

        {/* Letter with shadow */}
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          fill={textColor}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          fontSize={size * 0.5}
          fontWeight="700"
          filter="url(#letterShadow)"
          style={{
            letterSpacing: "-0.02em",
          }}
        >
          {letter}
        </text>
      </svg>
    </div>
  );
};

BlobLogo.displayName = "BlobLogo";

registerComposition(BlobLogo, {
  defaultProps: {
    letter: "A",
    blobColor: "#3b82f6",
    bgGradientStart: "#1a1a1f",
    bgGradientEnd: "#0f0f12",
    textColor: "#ffffff",
    borderRadius: 80,
  },
  outputs: [
    { name: "logo", width: 500, height: 500, format: "png" },
    { name: "logo-hd", width: 1024, height: 1024, format: "png" },
    { name: "favicon", width: 180, height: 180, format: "png" },
    { name: "og", width: 1200, height: 630, format: "png" },
  ],
});
