/**
 * @fileoverview React context for composition metadata during render.
 * @module @amebic/core/context
 */
import { createContext, useContext } from "react";
/** React context for composition metadata (outputName, width, height) */
export const CompositionContext = createContext(null);
/**
 * Hook to access the current composition context.
 * Must be used within a Composition component.
 *
 * @returns The composition context (outputName, width, height)
 * @throws If used outside of a Composition
 */
export function useComposition() {
  const ctx = useContext(CompositionContext);
  if (!ctx) {
    throw new Error("useComposition must be used within a Composition component");
  }
  return ctx;
}
