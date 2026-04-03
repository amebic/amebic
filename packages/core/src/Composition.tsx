/**
 * @fileoverview Root component that wraps composition content with viewport dimensions.
 * @module @amebic/core/Composition
 */

import type { CSSProperties } from "react";
import { CompositionContext } from "./context.js";

export interface CompositionProps {
  /** Width of the composition viewport */
  width: number;
  /** Height of the composition viewport */
  height: number;
  /** Output name (injected during multi-output render) */
  outputName?: string;
  /** Child content */
  children: React.ReactNode;
}

/**
 * Root wrapper for a composition. Provides viewport dimensions and output name
 * to children via useComposition(). The container is sized exactly to width×height.
 */
export function Composition({ width, height, outputName = "default", children }: CompositionProps) {
  const contextValue = {
    outputName,
    width,
    height,
  };

  const style: CSSProperties = {
    width,
    height,
    overflow: "hidden",
    position: "relative",
    boxSizing: "border-box",
  };

  return (
    <CompositionContext.Provider value={contextValue}>
      <div data-amebic-composition data-output-name={outputName} style={style}>
        {children}
      </div>
    </CompositionContext.Provider>
  );
}
