/**
 * @fileoverview Root component that wraps composition content with viewport dimensions.
 * @module @amebic/core/Composition
 */
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
export declare function Composition({ width, height, outputName, children, }: CompositionProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Composition.d.ts.map