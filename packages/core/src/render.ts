/**
 * @fileoverview Headless rendering of compositions to image files.
 * @module @amebic/core/render
 */

import { chromium } from "playwright";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import type { OutputConfig, OutputFormat, RenderOptions } from "./types.js";
import { Composition } from "./Composition.js";
import type { CompositionMeta } from "./types.js";

/** HTML template for rendering a composition */
function createHtml(
  bodyHtml: string,
  _width: number,
  _height: number,
  outputName: string,
  additionalStyles: string[] = []
): string {
  const styleBlocks = additionalStyles
    .map((s) => `<style>${s}</style>`)
    .join("\n");
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    #root { width: 100%; height: 100%; }
  </style>
  ${styleBlocks}
</head>
<body>
  <div id="root" data-output-name="${outputName}">${bodyHtml}</div>
</body>
</html>`;
}

/**
 * Render a composition to image file(s) using Playwright.
 *
 * @param meta - Composition metadata (from registry)
 * @param props - Props to pass to the composition
 * @param options - Render options (outDir, format, omitBackground)
 */
export async function renderComposition(
  meta: CompositionMeta,
  props: Record<string, unknown> = {},
  options: RenderOptions
): Promise<string[]> {
  const {
    outDir,
    format: formatOverride,
    omitBackground = true,
    styles: additionalStyles = [],
  } = options;
  const outputs = meta.config.outputs ?? [];

  if (outputs.length === 0) {
    throw new Error(
      `Composition "${meta.id}" has no outputs defined. Add outputs to the composition config.`
    );
  }

  const browser = await chromium.launch({ headless: true });
  const writtenFiles: string[] = [];

  try {
    const page = await browser.newPage();

    for (const output of outputs) {
      const format = (formatOverride ?? output.format ?? "png") as OutputFormat;
      const width = output.width;
      const height = output.height;
      const outputName = output.name;

      await page.setViewportSize({ width, height });

      const compositionElement = createElement(meta.component, props as never);
      const compositionWithContext = createElement(
        Composition,
        {
          width,
          height,
          outputName,
          children: compositionElement,
        }
      );

      const html = renderToStaticMarkup(compositionWithContext);
      const fullHtml = createHtml(
        html,
        width,
        height,
        outputName,
        additionalStyles
      );

      await page.setContent(fullHtml, {
        waitUntil: "networkidle",
      });

      const ext = format === "jpeg" ? "jpg" : format;
      const filename = `${outputName}.${ext}`;
      const filepath = join(outDir, meta.id, filename);

      await mkdir(dirname(filepath), { recursive: true });

      if (format === "png" || format === "jpeg" || format === "webp") {
        // Playwright types omit "webp" but Chromium supports it at runtime
        await page.screenshot({
          path: filepath,
          // @ts-expect-error - Playwright supports webp at runtime
          type: format,
          omitBackground: (format === "png" || format === "webp") && omitBackground,
        });
      } else {
        throw new Error(`Format "${format}" not yet supported`);
      }

      writtenFiles.push(filepath);
    }
  } finally {
    await browser.close();
  }

  return writtenFiles;
}
