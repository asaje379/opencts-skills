# @octs/skills

> Production-grade AI coding agent skills library — 28 reusable, security-audited skills for OpenCode, Claude Code, Cursor, Codex CLI, Windsurf, and GitHub Copilot.

Transform any AI coding agent into a disciplined, senior-level software engineer that understands your project, follows best practices, and never ships unchecked code.

---

## Quick Start

```bash
npx @octs/skills init
```

This auto-detects your AI coding agent, installs all 28 skills, and sets up project memory (`docs/` + `.project-ai/`).

### With options

```bash
# Target a specific agent
npx @octs/skills init --agent claude-code

# Install only specific categories
npx @octs/skills init --categories frontend,backend

# Install only project memory files
npx @octs/skills init --memory-only
```

---

## What's Included

### Architecture

Every skill depends on `@octs/project-awareness`, the foundational skill that auto-detects your tech stack, architecture, conventions, and existing components before any code is generated. No skill operates blind.

```
@octs/project-awareness        ← All skills depend on this
    ├── @octs/isolated-test-environment   ← Reproducible sandbox testing
    ├── @octs/frontend-verification       ← Frontend quality gate (11 phases)
    ├── @octs/backend-verification        ← Backend quality gate (10 phases)
    ├── ... (24 domain skills)
```

### 28 Skills — 7 Categories

| Category | Skills | Count |
|---|---|---|
| **infra** | `project-awareness`, `isolated-test-environment` | 2 |
| **verification** | `frontend-verification`, `backend-verification` | 2 |
| **frontend** | `landing-page`, `admin-dashboard`, `react-best-practices`, `tailwind-design-system`, `async-state` | 5 |
| **backend** | `rest-api`, `graphql`, `backend-security`, `observability`, `caching` | 5 |
| **tests** | `unit-testing`, `integration-testing`, `e2e`, `coverage` | 4 |
| **architecture** | `clean-architecture`, `ddd`, `event-driven`, `resilience`, `database` | 5 |
| **reasoning** | `feature-planner`, `bug-investigator`, `architecture-review`, `code-review`, `refactoring` | 5 |

### Project Memory (auto-initialized)

```
docs/
├── index.md          ← Project summary (< 300 lines)
├── conventions.md    ← Coding standards and conventions
├── architecture.md   ← Functional and technical architecture
├── decisions.md      ← Architecture Decision Records
└── glossary.md       ← Domain-specific terminology

.project-ai/
├── project.json      ← Technical manifest (stack, tools, architecture)
├── inventory.json    ← Auto-inventory of components, hooks, services
└── skills.lock.json  ← Installed skills with versions and hashes
```

---

## Installation

### npm (recommended)

```bash
npm install -g @octs/skills
octs-skills init
```

### npx (zero install)

```bash
npx @octs/skills init
```

### Local project dependency

```bash
npm install --save-dev @octs/skills
npx octs-skills init
```

---

## CLI Reference

```
octs-skills <command> [options]

Commands:
  init [dir]       Initialize skills in a project directory
  list             List all available skills by category
  info             Show library information

Options for init:
  --agent, -a      Target agent (opencode, claude-code, cursor, codex, windsurf, copilot)
  --categories, -c Comma-separated categories (infra, verification, frontend, backend, tests, architecture, reasoning)
  --no-memory      Skip project memory initialization
  --memory-only    Only initialize project memory
```

### Supported Agents

| Agent | Skills Directory |
|---|---|
| OpenCode | `.opencode/skills/` |
| Claude Code | `.claude/skills/` |
| Cursor | `.cursor/rules/` |
| Codex CLI | `.codex/skills/` |
| Windsurf | `.windsurf/rules/` |
| GitHub Copilot | `.github/copilot/skills/` |

---

## Universal Guardrails

Every skill enforces two non-negotiable rules:

1. **Project Context First** — Before generating any code, analyze the existing architecture, conventions, components, patterns, and dependencies. Never reinvent what already exists.

2. **Verify Before Declaring Done** — Never say "done" without verifying: code compiles, imports are valid, types check, tests pass, lint passes, no dead imports, architectural coherence. If verification is impossible, explicitly state what was and wasn't checked.

---

## Security

All skills are audited for:
- Prompt injection
- Hidden prompts / instructions
- Jailbreak attempts
- Data exfiltration
- Suspicious external references
- System prompt overrides

Only legitimate technical instructions are retained.

---

## Contributing

Skills are generated using the research pipeline defined in `prompts/master-prompt.md`:

1. Research public skills (official sources first)
2. Download and analyze
3. Security audit
4. Remove dangerous content
5. Merge with OpenCTS requirements
6. Generate personalized version

---

## License

MIT © OpenCTS
