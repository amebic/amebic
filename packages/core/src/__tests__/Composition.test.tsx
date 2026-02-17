/**
 * @fileoverview Tests for Composition component and useComposition hook.
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Composition } from "../Composition.js";
import { useComposition } from "../context.js";

describe("Composition", () => {
  it("renders children with correct dimensions", () => {
    render(
      <Composition width={100} height={50}>
        <span data-testid="child">Hello</span>
      </Composition>
    );
    expect(screen.getByTestId("child").textContent).toBe("Hello");
    const root = document.querySelector("[data-amebic-composition]") as HTMLElement;
    expect(root?.style.width).toBe("100px");
    expect(root?.style.height).toBe("50px");
  });

  it("sets data-output-name attribute", () => {
    render(
      <Composition width={10} height={10} outputName="favicon">
        <span>x</span>
      </Composition>
    );
    expect(document.querySelector("[data-output-name='favicon']")).toBeTruthy();
  });

  it("defaults outputName to 'default'", () => {
    render(
      <Composition width={10} height={10}>
        <span>x</span>
      </Composition>
    );
    expect(document.querySelector("[data-output-name='default']")).toBeTruthy();
  });
});

describe("useComposition", () => {
  it("provides width, height, outputName to children", () => {
    const Reader = () => {
      const ctx = useComposition();
      return (
        <span data-testid="ctx">
          {ctx.width}x{ctx.height}:{ctx.outputName}
        </span>
      );
    };
    render(
      <Composition width={120} height={60} outputName="og">
        <Reader />
      </Composition>
    );
    expect(screen.getByTestId("ctx").textContent).toBe("120x60:og");
  });

  it("throws when used outside Composition", () => {
    const Bad = () => {
      useComposition();
      return null;
    };
    expect(() => render(<Bad />)).toThrow(
      "useComposition must be used within a Composition component"
    );
  });
});
