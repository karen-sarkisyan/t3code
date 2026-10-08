import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

if (process.platform !== "darwin") {
  throw new Error("This personal build command currently targets macOS.");
}

const { version } = JSON.parse(
  readFileSync(new URL("../apps/server/package.json", import.meta.url), "utf8"),
);
const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
// Preview versions ship without an update feed. Each rebuild has a unique version.
const buildVersion = `${version.split("-")[0]}-preview.${date}.${Math.floor(Date.now() / 1000)}`;
const result = spawnSync(
  "vp",
  [
    "run",
    "dist:desktop:artifact",
    "--platform",
    "mac",
    "--target",
    "dmg",
    "--arch",
    process.arch,
    "--build-version",
    buildVersion,
    ...process.argv.slice(2),
  ],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      T3CODE_DESKTOP_SIGNED: "false",
      T3CODE_DESKTOP_UPDATE_REPOSITORY: "",
      GITHUB_REPOSITORY: "",
      T3CODE_DESKTOP_MOCK_UPDATES: "false",
    },
  },
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
