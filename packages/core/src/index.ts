/**
 * @fileoverview Amebic core - React compositions for still graphics.
 * @module @amebic/core
 */

export { Composition } from "./Composition.js";
export { CompositionContext, useComposition } from "./context.js";
export type { CompositionContextValue } from "./types.js";
export {
  registerComposition,
  registerSet,
  getComposition,
  getAllCompositions,
  getSet,
  getAllSets,
} from "./registry.js";
export { renderComposition } from "./render.js";
export type {
  OutputConfig,
  OutputFormat,
  CompositionConfig,
  CompositionMeta,
  RenderOptions,
} from "./types.js";
