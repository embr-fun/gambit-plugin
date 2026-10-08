// Builds dist/gambit-plugin-openai.zip for upload at platform.openai.com/plugins.
// The review block (test cases, demo link) lives in openai-review.json so the
// public plugin.json stays a plain install manifest; it is merged in here.
import { execFileSync } from "node:child_process"
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const review = JSON.parse(readFileSync(join(root, "openai-review.json"), "utf8"))
if (!review.demo_recording_url) {
  console.error("openai-review.json: set demo_recording_url before building the upload.")
  process.exit(1)
}

const manifest = JSON.parse(readFileSync(join(root, "plugin.json"), "utf8"))
manifest.extensions["com.openai"].review = review

const stage = join(root, "dist", "gambit-plugin")
rmSync(join(root, "dist"), { recursive: true, force: true })
mkdirSync(stage, { recursive: true })
for (const path of ["mcp.json", "skills", "assets", "README.md", "LICENSE"]) {
  cpSync(join(root, path), join(stage, path), { recursive: true })
}
writeFileSync(join(stage, "plugin.json"), JSON.stringify(manifest, null, 2) + "\n")

execFileSync("zip", ["-rq", "../gambit-plugin-openai.zip", "."], { cwd: stage })
console.log("Wrote dist/gambit-plugin-openai.zip")
