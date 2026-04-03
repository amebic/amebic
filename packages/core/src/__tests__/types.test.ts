/**
 * @fileoverview Tests for type exports and OutputConfig validation.
 */

import { describe, it, expect } from "vitest";
import type { OutputConfig, OutputFormat } from "../types.js";

describe("OutputConfig", () => {
  it("accepts valid output config", () => {
    const config: OutputConfig = {
      name: "og",
      width: 1200,
      height: 630,
      format: "png",
    };
    expect(config.name).toBe("og");
    expect(config.format).toBe("png");
  });

  it("format is optional", () => {
    const config: OutputConfig = {
      name: "thumb",
      width: 400,
      height: 400,
    };
    expect(config.format).toBeUndefined();
  });
});

describe("OutputFormat", () => {
  it("accepts all valid formats", () => {
    const formats: OutputFormat[] = ["png", "webp", "jpeg", "svg"];
    expect(formats).toHaveLength(4);
  });
});
