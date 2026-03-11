/**
 * @fileoverview Resolve and load an Amebic project from the current working directory.
 * @module @amebic/cli/project
 */

import { access, readFile } from "fs/promises";
import { dirname, resolve } from "path";
import { pathToFileURL } from "url";
import { register } from "tsx/esm/api";

const CONFIG_CANDIDATES = [
  "amebic.config.ts",
  "amebic.config.tsx",
  "amebic.config.mts",
  "amebic.config.js",
  "amebic.config.mjs",
  "amebic.config.jsx",
] as const;

const ENTRY_CANDIDATES = [
  "src/amebic.ts",
  "src/amebic.tsx",
  "src/index.ts",
  "src/index.tsx",
  "amebic.ts",
  "amebic.tsx",
  "index.ts",
  "index.tsx",
  "index.js",
  "index.mjs",
] as const;

type AmebicConfig = {
  entry?: string;
};

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function importModule(modulePath: string): Promise<Record<string, unknown>> {
  const unregister = register();

  try {
    const imported: unknown = await import(pathToFileURL(modulePath).href);
    if (imported && typeof imported === "object") {
      return imported as Record<string, unknown>;
    }
    return {};
  } finally {
    await unregister();
  }
}

function getConfigEntry(configModule: Record<string, unknown>): string | undefined {
  const candidate = configModule.default ?? configModule.config ?? configModule;
  if (typeof candidate === "string") {
    return candidate;
  }
  if (
    candidate &&
    typeof candidate === "object" &&
    "entry" in candidate &&
    typeof (candidate as AmebicConfig).entry === "string"
  ) {
    return (candidate as AmebicConfig).entry;
  }
  return undefined;
}

async function resolveFromPackageJson(cwd: string): Promise<string | null> {
  const packageJsonPath = resolve(cwd, "package.json");
  if (!(await fileExists(packageJsonPath))) {
    return null;
  }

  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8")) as {
    amebic?: AmebicConfig;
  };
  const entry = packageJson.amebic?.entry;
  if (!entry) {
    return null;
  }

  return resolve(cwd, entry);
}

async function resolveFromConfig(cwd: string): Promise<string | null> {
  for (const candidate of CONFIG_CANDIDATES) {
    const configPath = resolve(cwd, candidate);
    if (!(await fileExists(configPath))) {
      continue;
    }

    const configModule = await importModule(configPath);
    const entry = getConfigEntry(configModule);
    if (!entry) {
      throw new Error(
        `Config file ${candidate} must export an entry string or an object with an entry field.`
      );
    }
    return resolve(dirname(configPath), entry);
  }

  return null;
}

async function resolveFromConventions(cwd: string): Promise<string | null> {
  for (const candidate of ENTRY_CANDIDATES) {
    const entryPath = resolve(cwd, candidate);
    if (await fileExists(entryPath)) {
      return entryPath;
    }
  }

  return null;
}

export async function resolveProjectEntry(cwd: string, explicitEntry?: string): Promise<string> {
  const resolvedEntry = explicitEntry
    ? resolve(cwd, explicitEntry)
    : ((await resolveFromPackageJson(cwd)) ??
      (await resolveFromConfig(cwd)) ??
      (await resolveFromConventions(cwd)));

  if (!resolvedEntry) {
    throw new Error(
      [
        `No Amebic entry file found in ${cwd}.`,
        "Pass --entry <path>, set package.json#amebic.entry, add an amebic.config.* file, or use one of the default entry names:",
        ...ENTRY_CANDIDATES.map((candidate) => `  - ${candidate}`),
      ].join("\n")
    );
  }

  if (!(await fileExists(resolvedEntry))) {
    throw new Error(`Amebic entry file not found: ${resolvedEntry}`);
  }

  return resolvedEntry;
}

export async function loadProject(cwd: string, explicitEntry?: string): Promise<string> {
  const entryPath = await resolveProjectEntry(cwd, explicitEntry);
  await importModule(entryPath);
  return entryPath;
}
