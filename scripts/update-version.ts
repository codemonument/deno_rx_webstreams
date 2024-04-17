import { updateConfig } from "@codemonument/update-denoconfig";
import { ZodSemver } from "@codemonument/zod-semver";

// Stage: Validate script input
const newVersionParse = ZodSemver.safeParse(Deno.args[0]);

if (!newVersionParse.success) {
  console.error(
    "Please provide a new semantic version number as the first positional param of this script",
  );
  Deno.exit(1);
}

const newVersion = newVersionParse.data;

// Stage: Input valid
// ------------------------------------------------

// STAGE: Update the version in the deno.jsonc file
// ------------------------------------------------
const updateObject = {
  version: newVersion,
};
// Note: The path is relative to the current working directory
await updateConfig("./deno.jsonc", updateObject);
console.log(`Updated 'version' field of ./deno.jsonc to ${newVersion}`);

// STAGE: Update the version in the version.ts file
// ------------------------------------------------
import { Project } from "npm:ts-morph";
const project = new Project();
const versionFile = project.addSourceFileAtPath("VERSION.ts");

const VERSION_variable = versionFile.getVariableDeclarationOrThrow("VERSION");
VERSION_variable.setInitializer(`"${newVersion}"`);

await project.save();

console.log(
  `Updated 'VERSION' variable export in ./VERSION.ts to ${newVersion}`,
);
