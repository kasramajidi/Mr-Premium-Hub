/**
 * Build static HTML export (output in /out).
 * Usage: npm run build:static
 */

const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const appDir = path.join(root, "app");
const apiDir = path.join(appDir, "api");
const apiBackup = path.join(appDir, "_api_disabled_for_export");
const actionsFile = path.join(appDir, "(main)", "admin", "articles", "actions.ts");
const actionsBackup = path.join(appDir, "(main)", "admin", "articles", "actions.ts.bak");

const ACTIONS_STUB = `// Stub for static export (Server Actions not supported with output: export)
export async function revalidateNews(_slug?: string): Promise<void> {}
`;

function run() {
  try {
    if (!fs.existsSync(apiDir)) {
      console.log("app/api not found; running static build...");
      build();
      return;
    }
    console.log("Temporarily moving app/api...");
    if (fs.existsSync(apiBackup)) fs.rmSync(apiBackup, { recursive: true });
    fs.renameSync(apiDir, apiBackup);

    let restoredActions = false;
    if (fs.existsSync(actionsFile)) {
      console.log("Temporarily stubbing Server Actions for static export...");
      fs.copyFileSync(actionsFile, actionsBackup);
      fs.writeFileSync(actionsFile, ACTIONS_STUB, "utf8");
      restoredActions = true;
    }

    console.log("Building static output...");
    build();
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  } finally {
    if (fs.existsSync(apiBackup) && !fs.existsSync(apiDir)) {
      console.log("Restoring app/api...");
      fs.renameSync(apiBackup, apiDir);
    }
    if (fs.existsSync(actionsBackup)) {
      console.log("Restoring Server Actions file...");
      fs.copyFileSync(actionsBackup, actionsFile);
      fs.unlinkSync(actionsBackup);
    }
  }
  console.log("Done. Output is in the 'out' folder.");
}

function build() {
  execSync("npx next build", {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, BUILD_STATIC: "1" },
  });
}

run();
