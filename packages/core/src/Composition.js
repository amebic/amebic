import { jsx as _jsx } from "react/jsx-runtime";
import { CompositionContext } from "./context.js";
/**
 * Root wrapper for a composition. Provides viewport dimensions and output name
 * to children via useComposition(). The container is sized exactly to width×height.
 */
export function Composition({ width, height, outputName = "default", children, }) {
    const contextValue = {
        outputName,
        width,
        height,
    };
    const style = {
        width,
        height,
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
    };
    return (_jsx(CompositionContext.Provider, { value: contextValue, children: _jsx("div", { "data-amebic-composition": true, "data-output-name": outputName, style: style, children: children }) }));
}
