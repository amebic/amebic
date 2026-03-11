#!/usr/bin/env node
/**
 * @fileoverview Amebic CLI - render compositions to image files.
 * @module @amebic/cli
 */

import { renderComposition } from "@amebic/core/render";
import { getComposition, getAllCompositions, getSet, getAllSets } from "@amebic/core";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { loadProject } from "./project.js";

const args = process.argv.slice(2);
const command = args[0];

async function run() {
  if (command === "render") {
    await renderCommand(args.slice(1));
  } else if (command === "list" || !command) {
    await listCommand(args.slice(command === "list" ? 1 : 0));
  } else {
    console.error(`Unknown command: ${command}`);
    console.error("Usage: amebic [render|list] [--entry <path>]");
    process.exit(1);
  }
}

function parseSharedOptions(args: string[]) {
  let entryPath: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--entry" || arg === "-e") {
      entryPath = args[++i];
    }
  }

  return { entryPath };
}

function parseProps(content: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(content);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Props file must contain a JSON object.");
  }
  return parsed as Record<string, unknown>;
}

async function listCommand(args: string[]) {
  const { entryPath } = parseSharedOptions(args);
  await loadProject(process.cwd(), entryPath);

  const compositions = getAllCompositions();
  const sets = getAllSets();
  if (compositions.length === 0) {
    console.log("No compositions registered.");
    return;
  }
  console.log("Compositions:");
  for (const c of compositions) {
    const outputs = c.config.outputs ?? [];
    console.log(`  ${c.id} (${outputs.length} outputs)`);
    for (const o of outputs) {
      console.log(`    - ${o.name}: ${o.width}×${o.height} (${o.format ?? "png"})`);
    }
  }
  if (sets.size > 0) {
    console.log("\nSets:");
    for (const [id, compIds] of sets) {
      console.log(`  ${id}: ${compIds.join(", ")}`);
    }
  }
}

async function renderCommand(args: string[]) {
  let target = "";
  let outDir = "./output";
  let propsPath: string | undefined;
  let format: "png" | "webp" | "jpeg" | undefined;
  let isSet = false;
  let entryPath: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--out-dir" || arg === "-o") {
      outDir = args[++i] ?? outDir;
    } else if (arg === "--props") {
      propsPath = args[++i];
    } else if (arg === "--format" || arg === "-f") {
      format = args[++i] as "png" | "webp" | "jpeg";
    } else if (arg === "--set" || arg === "-s") {
      isSet = true;
    } else if (arg === "--entry" || arg === "-e") {
      entryPath = args[++i];
    } else if (!arg.startsWith("-") && !target) {
      target = arg;
    }
  }

  if (!target) {
    console.error(
      "Usage: amebic render <composition-id|set-id> [--set] [--entry <path>] [--out-dir <dir>] [--props <path>] [--format png|webp|jpeg]"
    );
    process.exit(1);
  }

  await loadProject(process.cwd(), entryPath);

  const baseOutDir = resolve(process.cwd(), outDir);
  const allFiles: string[] = [];

  if (isSet) {
    const compositionIds = getSet(target);
    if (!compositionIds) {
      console.error(`Set not found: ${target}`);
      process.exit(1);
    }
    for (const compositionId of compositionIds) {
      const meta = getComposition(compositionId);
      if (!meta) {
        console.error(`Composition not found: ${compositionId}`);
        continue;
      }
      const props = { ...meta.config.defaultProps };
      const options = { outDir: baseOutDir, format, omitBackground: true };
      console.log(`Rendering ${compositionId}...`);
      const files = await renderComposition(meta, props, options);
      allFiles.push(...files);
    }
  } else {
    const meta = getComposition(target);
    if (!meta) {
      console.error(`Composition not found: ${target}`);
      process.exit(1);
    }
    let props: Record<string, unknown> = { ...meta.config.defaultProps };
    if (propsPath) {
      try {
        const content = await readFile(resolve(process.cwd(), propsPath), "utf-8");
        props = { ...props, ...parseProps(content) };
      } catch (err) {
        console.error(`Failed to read props from ${propsPath}:`, err);
        process.exit(1);
      }
    }
    const options = { outDir: baseOutDir, format, omitBackground: true };
    console.log(`Rendering ${target} to ${baseOutDir}...`);
    const files = await renderComposition(meta, props, options);
    allFiles.push(...files);
  }

  console.log(`\nWrote ${allFiles.length} file(s):`);
  for (const f of allFiles) {
    console.log(`  ${f}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
