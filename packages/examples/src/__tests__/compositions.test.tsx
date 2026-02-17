/**
 * @fileoverview Tests for example compositions (transparency).
 */

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Composition } from "@amebic/core";
import { TransparentWatermark } from "../compositions/TransparentWatermark.js";
import { TransparentOverlay } from "../compositions/TransparentOverlay.js";
import { GlassBadge } from "../compositions/GlassBadge.js";

describe("TransparentWatermark", () => {
  it("renders semi-transparent text", () => {
    const { container } = render(
      <Composition width={200} height={100}>
        <TransparentWatermark text="DRAFT" opacity={0.3} />
      </Composition>
    );
    expect(container.textContent).toContain("DRAFT");
    const span = container.querySelector("span");
    expect(span?.style.color).toContain("rgba");
    expect(span?.style.color).toContain("0.3");
  });
});

describe("TransparentOverlay", () => {
  it("renders with rgba background", () => {
    const { container } = render(
      <Composition width={320} height={180}>
        <TransparentOverlay opacity={0.5} label="OVERLAY" />
      </Composition>
    );
    expect(container.textContent).toContain("OVERLAY");
    const root = container.querySelector("[data-amebic-composition]");
    const overlay = root?.querySelector("div");
    expect(overlay?.style.background).toContain("rgba");
  });
});

describe("GlassBadge", () => {
  it("renders with semi-transparent rgba", () => {
    const { container } = render(
      <Composition width={64} height={28}>
        <GlassBadge label="NEW" opacity={0.9} />
      </Composition>
    );
    expect(container.textContent).toContain("NEW");
    const withBg = container.querySelector("[style*='rgba']");
    expect(withBg).toBeTruthy();
  });
});
