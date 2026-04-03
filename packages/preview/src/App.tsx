/**
 * @fileoverview Amebic Preview UI - ReMotion-style composition viewer.
 * Layout: left controls, center preview, right compositions list, bottom toolbar.
 * @module @amebic/preview/App
 */

import { useState, useMemo, useCallback, useRef } from "react";
import { Composition, getAllCompositions, getComposition } from "@amebic/core";
/** Import to trigger composition registration */
import "@amebic/templates";
import "@amebic/examples";
import "@amebic/branding";
import {
  HiOutlineMagnifyingGlassPlus,
  HiOutlineMagnifyingGlassMinus,
  HiOutlineArrowsPointingOut,
  HiOutlineSquares2X2,
  HiOutlineRocketLaunch,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/** Load compositions by importing templates (side effect registers them) */
const compositions = getAllCompositions();

/** Zoom scale options for the preview */
const ZOOM_MIN = 25;
const ZOOM_MAX = 200;
const ZOOM_DEFAULT = 100;

export function App() {
  const [selectedId, setSelectedId] = useState<string>(compositions[0]?.id ?? "");
  const [selectedOutputIndex, setSelectedOutputIndex] = useState(0);
  const [propsJson, setPropsJson] = useState("{}");
  const [showCheckerboard, setShowCheckerboard] = useState(true);
  const [zoom, setZoom] = useState(ZOOM_DEFAULT);
  const previewRef = useRef<HTMLDivElement>(null);

  const meta = useMemo(() => (selectedId ? getComposition(selectedId) : null), [selectedId]);

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

  const toggleFullscreen = useCallback(() => {
    if (!previewRef.current) return;
    if (!document.fullscreenElement) {
      void previewRef.current.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(ZOOM_MAX, z + 10));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(ZOOM_MIN, z - 10));
  }, []);

  const renderCliCommand = `bun run render ${selectedId} --out-dir ./output`;

  if (compositions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <p>No compositions registered. Add compositions in @amebic/templates.</p>
      </div>
    );
  }

  const logoMeta = getComposition("Logo");

  return (
    <div className="flex h-screen flex-col bg-background text-foreground dark">
      {/* Top bar with logo */}
      <header className="flex h-12 shrink-0 items-center border-b border-border bg-card px-4">
        <div className="flex h-8 w-[100px] shrink-0 items-center justify-center overflow-hidden">
          {logoMeta &&
            (() => {
              const LogoComponent = logoMeta.component;
              return (
                <Composition width={100} height={32} outputName="icon">
                  <LogoComponent color="currentColor" />
                </Composition>
              );
            })()}
        </div>
      </header>

      {/* Top-level layout: left | main | right */}
      <div className="flex flex-1 min-h-0">
        {/* Left sidebar: compositions list */}
        <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-card">
          <h2 className="border-b border-border px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Compositions
          </h2>
          <ScrollArea className="flex-1">
            <div className="flex flex-col p-2">
              {compositions.map((c) => {
                const compMeta = getComposition(c.id);
                const firstOutput = compMeta?.config.outputs?.[0];
                const isSelected = c.id === selectedId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(c.id);
                      setSelectedOutputIndex(0);
                    }}
                    className={`flex flex-col items-start gap-0.5 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                      isSelected ? "bg-accent text-accent-foreground" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <HiOutlineDocumentText className="h-4 w-4 shrink-0 text-muted-foreground" />
                      {c.id}
                    </span>
                    {firstOutput && (
                      <span className="text-xs text-muted-foreground">
                        {firstOutput.width}×{firstOutput.height}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </aside>

        {/* Center: preview canvas */}
        <main
          ref={previewRef}
          className="flex flex-1 items-center justify-center overflow-auto bg-muted/30 p-4"
        >
          <div
            className="flex shrink-0 items-center justify-center transition-transform"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center center",
            }}
          >
            <div
              className={`overflow-hidden shadow-lg ${
                showCheckerboard ? "checkerboard" : "bg-muted"
              }`}
              style={
                output
                  ? {
                      width: output.width,
                      height: output.height,
                    }
                  : undefined
              }
            >
              {meta && output && (
                <Composition width={output.width} height={output.height} outputName={output.name}>
                  {(() => {
                    const Component = meta.component;
                    return <Component {...mergedProps} />;
                  })()}
                </Composition>
              )}
            </div>
          </div>
        </main>

        {/* Right sidebar: output controls, props */}
        <aside className="flex w-64 shrink-0 flex-col gap-4 border-l border-border bg-card p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Output
          </h2>
          <div className="space-y-2">
            <Label>Preset</Label>
            <Select
              value={String(selectedOutputIndex)}
              onValueChange={(v) => setSelectedOutputIndex(Number(v))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {outputs.map((o, i) => (
                  <SelectItem key={o.name} value={String(i)}>
                    {o.name} ({o.width}×{o.height})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="checkerboard"
              checked={showCheckerboard}
              onCheckedChange={(c) => setShowCheckerboard(!!c)}
            />
            <Label htmlFor="checkerboard" className="cursor-pointer text-sm">
              Transparency (checkerboard)
            </Label>
          </div>

          <div className="flex-1 space-y-2 overflow-hidden">
            <Label>Props (JSON)</Label>
            <textarea
              className="h-32 w-full resize-none rounded-md border border-input bg-background px-3 py-2 font-mono text-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={propsJson}
              onChange={(e) => setPropsJson(e.target.value)}
              placeholder='{"title": "Hello", "subtitle": "World"}'
            />
          </div>
        </aside>
      </div>

      {/* Bottom toolbar: zoom, checkerboard, fullscreen, render */}
      <footer className="flex h-12 shrink-0 items-center justify-between gap-4 border-t border-border bg-card px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={zoomOut} title="Zoom out">
            <HiOutlineMagnifyingGlassMinus className="h-4 w-4" />
          </Button>
          <Slider
            value={[zoom]}
            onValueChange={([v]) => setZoom(typeof v === "number" ? v : ZOOM_DEFAULT)}
            min={ZOOM_MIN}
            max={ZOOM_MAX}
            step={5}
            className="w-24"
          />
          <Button variant="ghost" size="icon" onClick={zoomIn} title="Zoom in">
            <HiOutlineMagnifyingGlassPlus className="h-4 w-4" />
          </Button>
          <span className="ml-2 text-xs text-muted-foreground">{zoom}%</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant={showCheckerboard ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setShowCheckerboard(!showCheckerboard)}
            title="Toggle checkerboard (transparency)"
          >
            <HiOutlineSquares2X2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} title="Full screen">
            <HiOutlineArrowsPointingOut className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" title="Render composition">
                <HiOutlineRocketLaunch className="h-4 w-4" />
                Render
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Render to files</DialogTitle>
                <DialogDescription>
                  Run this command from the project root to render the current composition to image
                  files:
                </DialogDescription>
              </DialogHeader>
              <pre className="rounded-md bg-muted p-4 font-mono text-sm">{renderCliCommand}</pre>
              <p className="text-xs text-muted-foreground">
                Requires: <code>bunx playwright install chromium</code>
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </footer>
    </div>
  );
}
