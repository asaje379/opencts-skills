#!/usr/bin/env node

import { installSkills, initProjectMemory } from "../lib/install.js";
import { HARNESSES, SKILL_CATEGORIES } from "../lib/harnesses.js";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { readdir } from "node:fs/promises";
import { execSync } from "node:child_process";

const USAGE = `
@octs/skills — Production-grade AI coding agent skills library

Usage:
  octs-skills <command> [options]

Commands:
  init [dir]       Initialize skills in a project directory (default: cwd)
  list             List all available skills by category
  info             Show library information

Options for 'init':
  --agent, -a      Target agent (opencode, claude-code, cursor, codex, windsurf, copilot)
                   Default: auto-detect → opencode
  --categories, -c Comma-separated categories to install
                   (infra, verification, frontend, backend, tests, architecture, reasoning)
                   Default: all
  --no-memory      Skip project memory initialization (docs/ and .project-ai/)
  --memory-only    Only initialize project memory, skip skill installation
  --help, -h       Show this help

Examples:
  octs-skills init                          # Install all skills, auto-detect agent
  octs-skills init --agent claude-code      # Install for Claude Code
  octs-skills init --categories frontend    # Install only frontend skills
  octs-skills list                          # List available skills
`.trim();

function printUsage() {
  console.log(USAGE);
}

function getCwd() {
  return process.cwd();
}

function detectAgent(targetDir) {
  const checks = [
    { dir: ".opencode", agent: "opencode" },
    { dir: ".claude", agent: "claude-code" },
    { dir: ".cursor", agent: "cursor" },
    { dir: ".codex", agent: "codex" },
    { dir: ".windsurf", agent: "windsurf" },
    { dir: ".github/copilot", agent: "copilot" },
  ];

  for (const { dir, agent } of checks) {
    if (existsSync(join(targetDir, dir))) {
      return agent;
    }
  }

  return "opencode";
}

async function cmdList(skillsDir) {
  const skillsPath = skillsDir || join(import.meta.dirname, "..", "skills");

  if (!existsSync(skillsPath)) {
    console.error(`Skills directory not found: ${skillsPath}`);
    process.exit(1);
  }

  const entries = await readdir(skillsPath, { withFileTypes: true });
  const categories = entries.filter((e) => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));

  console.log("@octs/skills — Available skills\n");

  let total = 0;
  for (const cat of categories) {
    const files = await readdir(join(skillsPath, cat.name));
    const mdFiles = files.filter((f) => f.endsWith(".md")).sort();
    console.log(`  ${cat.name}/ (${mdFiles.length} skills)`);
    for (const f of mdFiles) {
      const name = f.replace(".md", "");
      console.log(`    @octs/${name}`);
    }
    console.log();
    total += mdFiles.length;
  }

  console.log(`  Total: ${total} skills`);
}

async function cmdInit(targetDir, options) {
  const {
    agent,
    categories: catsStr,
    noMemory,
    memoryOnly,
  } = options;

  const cwd = targetDir ? resolve(targetDir) : getCwd();

  const agentKey = agent || detectAgent(cwd);
  const harness = HARNESSES[agentKey];

  if (!harness) {
    console.error(`Unknown agent: ${agentKey}. Available: ${Object.keys(HARNESSES).join(", ")}`);
    process.exit(1);
  }

  console.log(`\n@octs/skills — Initialize\n`);
  console.log(`  Target:  ${cwd}`);
  console.log(`  Agent:   ${harness.name}`);
  console.log(`  Skills:  ${harness.skillsDir}/`);

  if (!memoryOnly) {
    let categories = null;
    if (catsStr) {
      categories = catsStr.split(",").map((c) => c.trim());
      console.log(`  Filter:  ${categories.join(", ")}`);
    } else {
      console.log(`  Filter:  all categories`);
    }

    console.log(`\n  Copying skills...`);

    try {
      const skillsTarget = join(cwd, harness.skillsDir);
      const result = await installSkills({
        targetDir: skillsTarget,
        categories,
        harnessName: agentKey,
      });

      console.log(`  Installed ${result.copied} skill(s) to skills/`);
    } catch (err) {
      console.error(`  Error: ${err.message}`);
      process.exit(1);
    }
  }

  if (!noMemory) {
    console.log(`\n  Initializing project memory...`);

    try {
      const memory = await initProjectMemory({ targetDir: cwd });
      console.log(`  Created docs/ (5 files)`);
      console.log(`  Created .project-ai/ (3 files)`);
    } catch (err) {
      console.error(`  Error initializing memory: ${err.message}`);
    }
  }

  console.log(`\n  Done. Next steps:`);
  console.log(`    • Fill in docs/index.md with your project details`);
  console.log(`    • Fill in docs/conventions.md with your coding standards`);
  console.log(`    • Run 'octs-skills list' to see all available skills`);
  console.log();
}

function cmdInfo() {
  console.log(`
@octs/skills v${getVersion()}
Production-grade AI coding agent skills library

  28 skills across 7 categories:
    infra/          project-awareness, isolated-test-environment
    verification/   frontend-verification, backend-verification
    frontend/       landing-page, admin-dashboard, react-best-practices,
                    tailwind-design-system, async-state
    backend/        rest-api, graphql, backend-security, observability, caching
    tests/          unit-testing, integration-testing, e2e, coverage
    architecture/   clean-architecture, ddd, event-driven, resilience, database
    reasoning/      feature-planner, bug-investigator, architecture-review,
                    code-review, refactoring

  Supported agents: OpenCode, Claude Code, Cursor, Codex CLI, Windsurf, Copilot
`);
}

function getVersion() {
  try {
    const pkg = JSON.parse(
      execSync("cat " + join(import.meta.dirname, "..", "package.json"), { encoding: "utf-8" })
    );
    return pkg.version;
  } catch {
    return "1.0.0";
  }
}

function parseArgs(args) {
  const result = { command: null, options: {} };
  const positional = [];

  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    switch (arg) {
      case "init":
        result.command = "init";
        break;
      case "list":
        result.command = "list";
        break;
      case "info":
        result.command = "info";
        break;
      case "--help":
      case "-h":
        result.command = "help";
        break;
      case "--agent":
      case "-a":
        result.options.agent = args[++i];
        break;
      case "--categories":
      case "-c":
        result.options.categories = args[++i];
        break;
      case "--no-memory":
        result.options.noMemory = true;
        break;
      case "--memory-only":
        result.options.memoryOnly = true;
        break;
      default:
        if (arg.startsWith("-")) {
          console.error(`Unknown option: ${arg}`);
          process.exit(1);
        }
        positional.push(arg);
        break;
    }
    i++;
  }

  if (positional.length > 0 && result.command === "init") {
    result.options.targetDir = positional[0];
  }

  if (!result.command) {
    result.command = "help";
  }

  return result;
}

async function main() {
  const args = process.argv.slice(2);
  const { command, options } = parseArgs(args);

  switch (command) {
    case "init":
      await cmdInit(options.targetDir, options);
      break;
    case "list":
      await cmdList();
      break;
    case "info":
      cmdInfo();
      break;
    case "help":
    default:
      printUsage();
      break;
  }
}

main().catch((err) => {
  console.error(`Fatal error: ${err.message}`);
  process.exit(1);
});
