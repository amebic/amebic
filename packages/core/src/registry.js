/**
 * @fileoverview Registry for compositions and sets.
 * @module @amebic/core/registry
 */
/** Map of composition id -> metadata */
const compositions = new Map();
/** Map of set id -> composition ids */
const sets = new Map();
/**
 * Reset registry (for testing only).
 * @internal
 */
export function _resetRegistry() {
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
export function registerComposition(component, config = {}) {
    const id = component.displayName
        ?? component.name
        ?? "Anonymous";
    compositions.set(id, {
        id,
        component: component,
        config: config,
    });
    return id;
}
/**
 * Register a set of compositions (e.g. product branding pack).
 *
 * @param id - Unique set identifier
 * @param compositionIds - Array of composition ids in this set
 */
export function registerSet(id, compositionIds) {
    sets.set(id, compositionIds);
}
/**
 * Get a composition by id.
 */
export function getComposition(id) {
    return compositions.get(id);
}
/**
 * Get all registered compositions.
 */
export function getAllCompositions() {
    return Array.from(compositions.values());
}
/**
 * Get a set by id.
 */
export function getSet(id) {
    return sets.get(id);
}
/**
 * Get all registered sets.
 */
export function getAllSets() {
    return new Map(sets);
}
