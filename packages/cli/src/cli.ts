#!/usr/bin/env node
/**
 * @fileoverview Amebic CLI - render compositions to image files.
 * @module @amebic/cli
 */

import { renderComposition } from "@amebic/core/render";
import {
  getComposition,
  getAllCompositions,
  getSet,
  getAllSets,
} from "@amebic/core";
import "@amebic/templates";
import "@amebic/examples";
import "@amebic/branding";
import { resolve } from "path";
import { readFile } from "fs/promises";

const args = process.argv.slice(2);
const command = args[0];

async function run() {
  if (command === "render") {
    await renderCommand(args.slice(1));
  } else if (command === "list" || !command) {
    listCommand();
  } else {
    console.error(`Unknown command: ${command}`);
    console.error("Usage: amebic [render|list]");
    process.exit(1);
  }
}

function listCommand() {
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
    } else if (!arg.startsWith("-") && !target) {
      target = arg;
    }
  }

  if (!target) {
    console.error("Usage: amebic render <composition-id|set-id> [--set] [--out-dir <dir>] [--props <path>] [--format png|webp|jpeg]");
    process.exit(1);
  }

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
        props = { ...props, ...JSON.parse(content) };
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
