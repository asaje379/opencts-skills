import { homedir } from "node:os";
import { join } from "node:path";

export const HARNESSES = {
  opencode: {
    name: "OpenCode",
    skillsDir: ".opencode/skills",
    description: "OpenCode — native `.opencode/skills/` directory",
  },
  "claude-code": {
    name: "Claude Code",
    skillsDir: ".claude/skills",
    description: "Claude Code — `.claude/skills/` directory",
  },
  cursor: {
    name: "Cursor",
    skillsDir: ".cursor/rules",
    description: "Cursor — `.cursor/rules/` directory",
  },
  codex: {
    name: "Codex CLI",
    skillsDir: ".codex/skills",
    description: "Codex CLI — `.codex/skills/` directory",
  },
  windsurf: {
    name: "Windsurf",
    skillsDir: ".windsurf/rules",
    description: "Windsurf — `.windsurf/rules/` directory",
  },
  copilot: {
    name: "GitHub Copilot",
    skillsDir: ".github/copilot/skills",
    description: "GitHub Copilot — `.github/copilot/skills/` directory",
  },
};

export const SKILL_CATEGORIES = [
  { dir: "infra", label: "Infrastructure — project-awareness, isolated-test-environment" },
  { dir: "verification", label: "Verification — frontend-verification, backend-verification" },
  { dir: "frontend", label: "Frontend — landing-page, admin-dashboard, react, tailwind, async-state" },
  { dir: "backend", label: "Backend — rest-api, graphql, security, observability, caching" },
  { dir: "tests", label: "Testing — unit, integration, e2e, coverage" },
  { dir: "architecture", label: "Architecture — clean-arch, DDD, event-driven, resilience, database" },
  { dir: "reasoning", label: "Reasoning — feature-planner, bug-investigator, reviews, refactoring" },
];

export function getSourceSkillsDir() {
  const source = new URL("../skills", import.meta.url);
  return source.pathname;
}
