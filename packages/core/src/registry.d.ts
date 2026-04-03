/**
 * @fileoverview Registry for compositions and sets.
 * @module @amebic/core/registry
 */
import type { ComponentType } from "react";
import type { CompositionConfig, CompositionMeta } from "./types.js";
/**
 * Reset registry (for testing only).
 * @internal
 */
export declare function _resetRegistry(): void;
/**
 * Register a composition for preview and rendering.
 *
 * @param component - The React component (composition)
 * @param config - Composition config (defaultProps, outputs, etc.)
 * @returns The composition id (derived from component name)
 */
export declare function registerComposition<Props extends Record<string, unknown>>(component: ComponentType<Props>, config?: CompositionConfig<Props>): string;
/**
 * Register a set of compositions (e.g. product branding pack).
 *
 * @param id - Unique set identifier
 * @param compositionIds - Array of composition ids in this set
 */
export declare function registerSet(id: string, compositionIds: string[]): void;
/**
 * Get a composition by id.
 */
export declare function getComposition(id: string): CompositionMeta | undefined;
/**
 * Get all registered compositions.
 */
export declare function getAllCompositions(): CompositionMeta[];
/**
 * Get a set by id.
 */
export declare function getSet(id: string): string[] | undefined;
/**
 * Get all registered sets.
 */
export declare function getAllSets(): Map<string, string[]>;
//# sourceMappingURL=registry.d.ts.map