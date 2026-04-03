/**
 * @fileoverview React context for composition metadata during render.
 * @module @amebic/core/context
 */

import { createContext, useContext } from "react";
import type { CompositionContextValue } from "./types.js";

/** React context for composition metadata (outputName, width, height) */
export const CompositionContext = createContext<CompositionContextValue | null>(null);

/**
 * Hook to access the current composition context.
 * Must be used within a Composition component.
 *
 * @returns The composition context (outputName, width, height)
 * @throws If used outside of a Composition
 */
export function useComposition(): CompositionContextValue {
  const ctx = useContext(CompositionContext);
  if (!ctx) {
    throw new Error("useComposition must be used within a Composition component");
  }
  return ctx;
}
