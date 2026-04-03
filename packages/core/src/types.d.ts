/**
 * @fileoverview Core type definitions for Amebic.
 * @module @amebic/core/types
 */
import type { ComponentType } from "react";
/**
 * Output format for rendered images.
 */
export type OutputFormat = "png" | "webp" | "jpeg" | "svg";
/**
 * Configuration for a single output (named dimension + format).
 * One composition can produce many outputs at different sizes.
 */
export interface OutputConfig {
    /** Semantic name for the output (e.g. "mdpi", "favicon-32", "og") */
    name: string;
    /** Width in pixels */
    width: number;
    /** Height in pixels */
    height: number;
    /** Output format. Defaults to "png" */
    format?: OutputFormat;
}
/**
 * Registration options for a composition.
 */
export interface CompositionConfig<Props = Record<string, unknown>> {
    /** Default props when none are provided */
    defaultProps?: Props;
    /** Default dimensions when using single-output mode */
    defaultDimensions?: {
        width: number;
        height: number;
    };
    /** Output configs for multi-output rendering */
    outputs?: OutputConfig[];
    /** Font URLs to load (e.g. Google Fonts CSS) for headless render */
    fonts?: string[];
}
/**
 * Metadata for a registered composition.
 */
export interface CompositionMeta<Props = Record<string, unknown>> {
    id: string;
    component: ComponentType<Props>;
    config: CompositionConfig<Props>;
}
/**
 * Context provided to compositions during render.
 */
export interface CompositionContextValue {
    /** Name of the current output being rendered */
    outputName: string;
    /** Width of the current output viewport */
    width: number;
    /** Height of the current output viewport */
    height: number;
}
/**
 * Options for the render API.
 */
export interface RenderOptions {
    /** Output directory for rendered files */
    outDir: string;
    /** Override output format for all outputs */
    format?: OutputFormat;
    /** Omit background for transparency (PNG/WebP). Default: true */
    omitBackground?: boolean;
    /** Additional CSS strings to inject (e.g. from composition stylesheets) */
    styles?: string[];
}
//# sourceMappingURL=types.d.ts.map