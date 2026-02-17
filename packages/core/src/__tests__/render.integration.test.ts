/**
 * @fileoverview Integration tests for render - requires Playwright Chromium.
 * Run with: bun run test
 */

import { describe, it, expect, beforeAll } from "vitest";
import { createElement } from "react";
import { renderComposition } from "../render.js";
import { registerComposition, getComposition, _resetRegistry } from "../registry.js";
import { readdir } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const TestComp = () =>
  createElement("div", {
    style: { width: "100%", height: "100%", background: "#ff0000" },
  });
TestComp.displayName = "TestComp";

describe("renderComposition (integration)", () => {
  const outDir = join(tmpdir(), `amebic-test-${Date.now()}`);

  beforeAll(() => {
    _resetRegistry();
    registerComposition(TestComp, {
      outputs: [
        { name: "small", width: 10, height: 10 },
        { name: "large", width: 50, height: 50 },
      ],
    });
  });

  it("writes PNG files for each output", async () => {
    const meta = getComposition("TestComp");
    if (!meta) throw new Error("TestComp not registered");
    const files = await renderComposition(meta, {}, { outDir, omitBackground: false });
    expect(files).toHaveLength(2);
    expect(files[0]).toContain("small.png");
    expect(files[1]).toContain("large.png");
    const dir = await readdir(join(outDir, "TestComp"));
    expect(dir).toContain("small.png");
    expect(dir).toContain("large.png");
  }, 15000);
});
