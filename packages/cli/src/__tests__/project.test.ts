import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, rm, writeFile } from "fs/promises";
import { dirname, join, relative, resolve } from "path";
import { fileURLToPath } from "url";
import { getAllCompositions, getSet } from "../../../core/src/index.ts";
import { _resetRegistry } from "../../../core/src/registry.ts";
import { loadProject, resolveProjectEntry } from "../project.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagesRoot = resolve(__dirname, "../../..");
const tempDirs: string[] = [];

async function writeProjectFile(projectDir: string, path: string, content: string) {
  const filePath = join(projectDir, path);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf-8");
}

async function createProjectFixture(files: Record<string, string>) {
  const projectDir = await mkdtemp(join(packagesRoot, ".tmp-cli-project-"));
  tempDirs.push(projectDir);

  for (const [path, content] of Object.entries(files)) {
    await writeProjectFile(projectDir, path, content);
  }

  return projectDir;
}

function coreImportSpecifier(fromPath: string) {
  return relative(dirname(fromPath), resolve(packagesRoot, "core/src/index.ts")).replaceAll(
    "\\",
    "/"
  );
}

afterEach(async () => {
  _resetRegistry();
  await Promise.all(tempDirs.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("resolveProjectEntry", () => {
  it("prefers package.json amebic.entry when present", async () => {
    const projectDir = await createProjectFixture({
      "package.json": JSON.stringify({
        name: "fixture-project",
        amebic: {
          entry: "./graphics/entry.ts",
        },
      }),
      "graphics/entry.ts": "",
      "src/index.ts": "",
    });

    await expect(resolveProjectEntry(projectDir)).resolves.toBe(
      resolve(projectDir, "graphics/entry.ts")
    );
  });

  it("reads entry from amebic.config.ts", async () => {
    const projectDir = await createProjectFixture({
      "amebic.config.ts": `export default { entry: "./src/from-config.ts" };`,
      "src/from-config.ts": "",
    });

    await expect(resolveProjectEntry(projectDir)).resolves.toBe(
      resolve(projectDir, "src/from-config.ts")
    );
  });

  it("falls back to default src/index.ts convention", async () => {
    const projectDir = await createProjectFixture({
      "src/index.ts": "",
    });

    await expect(resolveProjectEntry(projectDir)).resolves.toBe(
      resolve(projectDir, "src/index.ts")
    );
  });
});

describe("loadProject", () => {
  it("loads a project entry and populates the shared registry", async () => {
    const projectDir = await createProjectFixture({});
    const entryPath = resolve(projectDir, "src/index.ts");
    const entrySource = `
import { registerComposition, registerSet } from "${coreImportSpecifier(entryPath)}";

function FixtureGraphic() {
  return null;
}

FixtureGraphic.displayName = "FixtureGraphic";

registerComposition(FixtureGraphic, {
  outputs: [{ name: "default", width: 1200, height: 630 }],
});

registerSet("FixtureSet", ["FixtureGraphic"]);
`;
    await writeProjectFile(projectDir, "src/index.ts", entrySource);

    await expect(loadProject(projectDir)).resolves.toBe(entryPath);
    expect(getAllCompositions().map((composition) => composition.id)).toContain("FixtureGraphic");
    expect(getSet("FixtureSet")).toEqual(["FixtureGraphic"]);
  });
});
