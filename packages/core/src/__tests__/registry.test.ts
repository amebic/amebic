/**
 * @fileoverview Tests for composition and set registry.
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  registerComposition,
  registerSet,
  getComposition,
  getAllCompositions,
  getSet,
  getAllSets,
  _resetRegistry,
} from "../registry.js";

beforeEach(() => {
  _resetRegistry();
});

describe("registerComposition", () => {
  it("registers a composition and returns its id", () => {
    const Comp = () => null;
    Comp.displayName = "TestComp";
    const id = registerComposition(Comp, { outputs: [{ name: "a", width: 10, height: 10 }] });
    expect(id).toBe("TestComp");
  });

  it("uses component name when displayName is missing", () => {
    const Comp = function NamedComp() {
      return null;
    };
    const id = registerComposition(Comp, { outputs: [{ name: "a", width: 10, height: 10 }] });
    expect(id).toBe("NamedComp");
  });
});

describe("getComposition", () => {
  it("returns undefined for unknown id", () => {
    expect(getComposition("NonExistent")).toBeUndefined();
  });

  it("returns meta for registered composition", () => {
    const Comp = () => null;
    Comp.displayName = "MyComp";
    registerComposition(Comp, {
      defaultProps: { x: 1 },
      outputs: [{ name: "out", width: 100, height: 100 }],
    });
    const meta = getComposition("MyComp");
    expect(meta).toBeDefined();
    expect(meta?.id).toBe("MyComp");
    expect(meta?.config.defaultProps).toEqual({ x: 1 });
    expect(meta?.config.outputs).toHaveLength(1);
    expect(meta?.config.outputs?.[0].name).toBe("out");
  });
});

describe("getAllCompositions", () => {
  it("returns empty array when no compositions registered", () => {
    expect(getAllCompositions()).toEqual([]);
  });

  it("returns all registered compositions", () => {
    const A = () => null;
    A.displayName = "A";
    const B = () => null;
    B.displayName = "B";
    registerComposition(A, { outputs: [{ name: "a", width: 1, height: 1 }] });
    registerComposition(B, { outputs: [{ name: "b", width: 1, height: 1 }] });
    const all = getAllCompositions();
    expect(all).toHaveLength(2);
    expect(all.map((c) => c.id).sort()).toEqual(["A", "B"]);
  });
});

describe("registerSet and getSet", () => {
  it("registers a set and retrieves composition ids", () => {
    registerSet("MySet", ["Comp1", "Comp2"]);
    const ids = getSet("MySet");
    expect(ids).toEqual(["Comp1", "Comp2"]);
  });

  it("returns undefined for unknown set", () => {
    expect(getSet("Unknown")).toBeUndefined();
  });
});

describe("getAllSets", () => {
  it("returns all registered sets", () => {
    registerSet("SetA", ["A"]);
    registerSet("SetB", ["B", "C"]);
    const sets = getAllSets();
    expect(sets.size).toBe(2);
    expect(sets.get("SetA")).toEqual(["A"]);
    expect(sets.get("SetB")).toEqual(["B", "C"]);
  });
});
