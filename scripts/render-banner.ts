/**
 * Render the Banner composition using Amebic core directly.
 */

import { getComposition } from "@amebic/core";
import { renderComposition } from "@amebic/core/render";
import { resolve } from "path";
import { mkdir } from "fs/promises";

// Import the branding package to register compositions
import "../packages/branding/src/index.ts";

async function main() {
  const outDir = resolve(process.cwd(), "branding/output");
  await mkdir(outDir, { recursive: true });

  const meta = getComposition("Banner");
  if (!meta) {
    console.error("Banner composition not found");
    process.exit(1);
  }

  const props = { ...meta.config.defaultProps };
  const options = { outDir, format: "png" as const, omitBackground: true };

  console.log("Rendering Banner...");
  const files = await renderComposition(meta, props, options);
  console.log("Written files:", files);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
