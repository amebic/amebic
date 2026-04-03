/**
 * @fileoverview React context for composition metadata during render.
 * @module @amebic/core/context
 */
import type { CompositionContextValue } from "./types.js";
/** React context for composition metadata (outputName, width, height) */
export declare const CompositionContext: import("react").Context<CompositionContextValue | null>;
/**
 * Hook to access the current composition context.
 * Must be used within a Composition component.
 *
 * @returns The composition context (outputName, width, height)
 * @throws If used outside of a Composition
 */
export declare function useComposition(): CompositionContextValue;
//# sourceMappingURL=context.d.ts.map