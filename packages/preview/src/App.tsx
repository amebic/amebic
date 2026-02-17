/**
 * @fileoverview Amebic Preview UI - composition viewer with output preset switcher.
 * @module @amebic/preview/App
 */

import { useState, useMemo } from "react";
import {
  Composition,
  getAllCompositions,
  getComposition,
} from "@amebic/core";
/** Import to trigger composition registration */
import "@amebic/templates";
import styles from "./App.module.css";

/** Load compositions by importing templates (side effect registers them) */
const compositions = getAllCompositions();

export function App() {
  const [selectedId, setSelectedId] = useState<string>(
    compositions[0]?.id ?? ""
  );
  const [selectedOutputIndex, setSelectedOutputIndex] = useState(0);
  const [propsJson, setPropsJson] = useState("{}");
  const [showCheckerboard, setShowCheckerboard] = useState(true);

  const meta = useMemo(
    () => (selectedId ? getComposition(selectedId) : null),
    [selectedId]
  );

  const outputs = meta?.config.outputs ?? [];
  const output = outputs[selectedOutputIndex] ?? outputs[0];

  const props = useMemo(() => {
    try {
      return JSON.parse(propsJson || "{}");
    } catch {
      return {};
    }
  }, [propsJson]);

  const mergedProps = useMemo(
    () => ({ ...meta?.config.defaultProps, ...props }),
    [meta?.config.defaultProps, props]
  );

  if (compositions.length === 0) {
    return (
      <div className={styles.app}>
        <div className={styles.empty}>
          No compositions registered. Add compositions in @amebic/templates.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Compositions</h2>
        <select
          className={styles.select}
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            setSelectedOutputIndex(0);
          }}
        >
          {compositions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.id}
            </option>
          ))}
        </select>

        <h3 className={styles.sectionTitle}>Output</h3>
        <select
          className={styles.select}
          value={selectedOutputIndex}
          onChange={(e) => setSelectedOutputIndex(Number(e.target.value))}
        >
          {outputs.map((o, i) => (
            <option key={o.name} value={i}>
              {o.name} ({o.width}×{o.height})
            </option>
          ))}
        </select>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={showCheckerboard}
            onChange={(e) => setShowCheckerboard(e.target.checked)}
          />
          Transparency (checkerboard)
        </label>

        <h3 className={styles.sectionTitle}>Props</h3>
        <textarea
          className={styles.textarea}
          value={propsJson}
          onChange={(e) => setPropsJson(e.target.value)}
          placeholder='{"title": "Hello", "subtitle": "World"}'
          rows={6}
        />
      </aside>

      <main className={styles.main}>
        <div
          className={`${styles.canvas} ${showCheckerboard ? styles.checkerboard : ""}`}
          style={
            output
              ? {
                  width: output.width,
                  height: output.height,
                  maxWidth: "100%",
                  maxHeight: "calc(100vh - 2rem)",
                }
              : undefined
          }
        >
          {meta && output && (
            <Composition
              width={output.width}
              height={output.height}
              outputName={output.name}
            >
              {(() => {
                const Component = meta.component;
                return <Component {...mergedProps} />;
              })()}
            </Composition>
          )}
        </div>
      </main>
    </div>
  );
}
