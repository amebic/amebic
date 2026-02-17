/**
 * @fileoverview Tests for template compositions.
 */

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Composition } from "@amebic/core";
import { SocialCard } from "../compositions/SocialCard.js";
import { AppIcon } from "../compositions/AppIcon.js";

describe("SocialCard", () => {
  it("renders with default props", () => {
    const { container } = render(
      <Composition width={1200} height={630}>
        <SocialCard title="Hello" subtitle="World" />
      </Composition>
    );
    expect(container.textContent).toContain("Hello");
    expect(container.textContent).toContain("World");
  });

  it("renders without subtitle", () => {
    const { container } = render(
      <Composition width={1200} height={630}>
        <SocialCard title="Solo" />
      </Composition>
    );
    expect(container.textContent).toContain("Solo");
  });
});

describe("AppIcon", () => {
  it("renders without error", () => {
    const { container } = render(
      <Composition width={48} height={48} outputName="mdpi">
        <AppIcon />
      </Composition>
    );
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
