/**
 * @fileoverview Registry for compositions and sets.
 * @module @amebic/core/registry
 */

import type { ComponentType } from "react";
import type { CompositionConfig, CompositionMeta } from "./types.js";

/** Map of composition id -> metadata */
const compositions = new Map<string, CompositionMeta>();

/** Map of set id -> composition ids */
const sets = new Map<string, string[]>();

/**
 * Reset registry (for testing only).
 * @internal
 */
export function _resetRegistry(): void {
  compositions.clear();
  sets.clear();
}

/**
 * Register a composition for preview and rendering.
 *
 * @param component - The React component (composition)
 * @param config - Composition config (defaultProps, outputs, etc.)
 * @returns The composition id (derived from component name)
 */
export function registerComposition<Props extends Record<string, unknown>>(
  component: ComponentType<Props>,
  config: CompositionConfig<Props> = {}
): string {
  const id =
    (component as { displayName?: string; name?: string }).displayName ??
    (component as { displayName?: string; name?: string }).name ??
    "Anonymous";
  compositions.set(id, {
    id,
    component: component as ComponentType<Record<string, unknown>>,
    config: config as CompositionConfig,
  });
  return id;
}

/**
 * Register a set of compositions (e.g. product branding pack).
 *
 * @param id - Unique set identifier
 * @param compositionIds - Array of composition ids in this set
 */
export function registerSet(id: string, compositionIds: string[]): void {
  sets.set(id, compositionIds);
}

/**
 * Get a composition by id.
 */
export function getComposition(id: string): CompositionMeta | undefined {
  return compositions.get(id);
}

/**
 * Get all registered compositions.
 */
export function getAllCompositions(): CompositionMeta[] {
  return Array.from(compositions.values());
}

/**
 * Get a set by id.
 */
export function getSet(id: string): string[] | undefined {
  return sets.get(id);
}

/**
 * Get all registered sets.
 */
export function getAllSets(): Map<string, string[]> {
  return new Map(sets);
}
