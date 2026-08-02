import { describe, it } from "node:test";
import { ok } from "node:assert";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillsDir = join(__dirname, "..", "skills");

describe("@asaje/skills", () => {
  it("skills directory exists", () => {
    ok(existsSync(skillsDir), "skills/ directory should exist");
  });

  it("has all 7 categories", () => {
    const expected = [
      "architecture",
      "backend",
      "frontend",
      "infra",
      "reasoning",
      "tests",
      "verification",
    ];
    for (const cat of expected) {
      ok(
        existsSync(join(skillsDir, cat)),
        `Category skills/${cat}/ should exist`
      );
    }
  });

  it("has a valid package.json", () => {
    const pkgPath = join(__dirname, "..", "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    ok(pkg.name === "@asaje/skills", "package name should be @asaje/skills");
    ok(pkg.bin, "should have bin entry");
    ok(typeof pkg.version === "string", "should have version");
  });

  it("has at least 28 skill files", () => {
    function countFiles(dir) {
      const entries = readdirSync(dir, { withFileTypes: true });
      let count = 0;
      for (const e of entries) {
        if (e.isDirectory()) {
          count += countFiles(join(dir, e.name));
        } else if (e.name.endsWith(".md")) {
          count++;
        }
      }
      return count;
    }
    const total = countFiles(skillsDir);
    ok(total >= 28, `Should have at least 28 skill files, found ${total}`);
  });
});
