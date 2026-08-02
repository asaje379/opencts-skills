<p align="center">
  <img src="https://img.shields.io/npm/v/@asaje/skills?color=blue" alt="npm version">
  <img src="https://img.shields.io/github/license/asaje379/opencts-skills" alt="license">
  <img src="https://img.shields.io/npm/dt/@asaje/skills" alt="downloads">
  <img src="https://img.shields.io/badge/skills-28-blueviolet" alt="28 skills">
</p>

# @asaje/skills

Production-grade AI coding agent skills library — **28 reusable, security-audited skills** for OpenCode, Claude Code, Cursor, Codex CLI, Windsurf, and GitHub Copilot.

Transform any AI coding agent into a disciplined, senior-level software engineer that understands your project, follows best practices, and never ships unchecked code.

---

## Why @asaje/skills?

AI coding agents are powerful but undisciplined. They generate code without understanding your codebase, skip tests, ignore conventions, and declare work "done" without real verification.

`@asaje/skills` fixes this. Every skill enforces two non-negotiable rules:

1. **Project Context First** — Before generating code, analyze the existing architecture, conventions, components, and dependencies.
2. **Verify Before Declaring Done** — Never say "done" without verifying compile/lint/tests/types/coherence.

The result: your AI agent behaves like a senior developer who has worked on the project for months.

---

## Quick Start

### Zero-install (recommended)

```bash
npx @asaje/skills init
```

This auto-detects your AI coding agent, installs all 28 skills in the right directory, and sets up project memory.

### Global install

```bash
npm install -g @asaje/skills
octs-skills init
```

### With options

```bash
# Target a specific agent
npx @asaje/skills init --agent claude-code

# Install only specific categories
npx @asaje/skills init --categories frontend,backend,architecture

# Install in a different directory
npx @asaje/skills init /path/to/project --agent cursor

# Skip project memory
npx @asaje/skills init --no-memory

# Only initialize project memory
npx @asaje/skills init --memory-only
```

---

## Supported Agents

| Agent | Skills Directory | CLI flag |
|---|---|---|
| OpenCode | `.opencode/skills/` | `--agent opencode` |
| Claude Code | `.claude/skills/` | `--agent claude-code` |
| Cursor | `.cursor/rules/` | `--agent cursor` |
| Codex CLI | `.codex/skills/` | `--agent codex` |
| Windsurf | `.windsurf/rules/` | `--agent windsurf` |
| GitHub Copilot | `.github/copilot/skills/` | `--agent copilot` |

Auto-detection works by checking for existing agent configuration directories. Falls back to OpenCode if none is detected.

---

## Skills Catalog

### Skill Architecture

```
@octs/project-awareness        ← Root skill. All 27 others depend on it.
    ├── @octs/isolated-test-environment
    ├── @octs/frontend-verification       (11-phase quality gate)
    ├── @octs/backend-verification        (10-phase quality gate)
    ├── 5 frontend skills
    ├── 5 backend skills
    ├── 4 testing skills
    ├── 5 architecture skills
    └── 5 reasoning skills
```

### Infrastructure (2)

| Skill | Purpose |
|---|---|
| `@octs/project-awareness` | Auto-detect stack, architecture, conventions, existing components. Generate and maintain project memory (`docs/` + `.project-ai/`). All other skills depend on this. |
| `@octs/isolated-test-environment` | Create disposable, isolated test sandboxes with Docker. Lifecycle: create → init → seed → validate → collect → destroy. Ensures reproducibility. |

### Verification Gates (2)

| Skill | Purpose |
|---|---|
| `@octs/frontend-verification` | 11-phase frontend validation: code review, build/lint/tests, Playwright browser testing, visual/accessibility/responsive checks, state coverage, console audit, performance, SEO, backoffice. Mandatory report before declaring done. |
| `@octs/backend-verification` | 10-phase backend validation: architecture review, API contract check, OWASP security audit, database analysis, resilience patterns, tests, observability, performance, documentation. Mandatory report. |

### Frontend (5)

| Skill | Purpose |
|---|---|
| `@octs/landing-page` | Premium landing pages: Hero, Features, CTA, Pricing, FAQ, Testimonials, Bento Grid, animations, SEO, Core Web Vitals. |
| `@octs/admin-dashboard` | Admin interfaces: TanStack Table, filters, pagination, exports (CSV/Excel/PDF), KPI dashboards, Command Palette, keyboard shortcuts. |
| `@octs/react-best-practices` | React quality: composition over inheritance, proper hook usage, performance (memo/lazy/Suspense), feature-based architecture, TypeScript patterns. |
| `@octs/tailwind-design-system` | Design systems: design tokens, CVA variants, dark mode, responsive breakpoints, accessibility, class ordering conventions. |
| `@octs/async-state` | TanStack Query: useQuery/useMutation, cache strategy, optimistic updates, infinite queries, prefetching, server vs client state separation. |

### Backend (5)

| Skill | Purpose |
|---|---|
| `@octs/rest-api` | REST APIs: resource-oriented design, correct HTTP methods/status codes, OpenAPI 3.x, DTOs, validation, pagination (cursor/offset), Problem Details RFC 9457, idempotence. |
| `@octs/graphql` | GraphQL: schema-first design, Apollo/Yoga, DataLoader for N+1, persisted queries, complexity/depth limits, subscriptions, Relay pagination. |
| `@octs/backend-security` | Security: OWASP Top 10, JWT/OAuth2/OIDC, RBAC/ABAC, Helmet/CSP/CORS, rate limiting, CSRF/XSS/injection prevention, secrets management. |
| `@octs/observability` | Observability: structured JSON logging, OpenTelemetry tracing, RED/USE metrics, correlation IDs, health/readiness/liveness checks. |
| `@octs/caching` | Caching: Redis patterns (Cache Aside, Read/Write-Through), HTTP caching (ETag, Cache-Control), invalidation strategies, cache warming, stampede/avalanche prevention. |

### Tests (4)

| Skill | Purpose |
|---|---|
| `@octs/unit-testing` | Unit tests: AAA pattern, Vitest/Jest, mocking strategy, edge cases, property-based testing with fast-check, snapshot discipline, coverage targets. |
| `@octs/integration-testing` | Integration: Supertest, Testcontainers, Docker, factories/fixtures, API + database + cache testing, transaction-based isolation. |
| `@octs/e2e` | End-to-end: Playwright (Chromium/Firefox/WebKit), mobile emulation, visual regression, offline/upload scenarios, CI artifacts (screenshot/video/trace). |
| `@octs/coverage` | Coverage: targets (branches ≥80%, functions ≥90%, lines ≥85%), 100% on auth/security/business-logic/payments, mutation testing, CI thresholds. |

### Architecture (5)

| Skill | Purpose |
|---|---|
| `@octs/clean-architecture` | SOLID principles, Clean Architecture layers (Entities/UseCases/Adapters/Frameworks), Hexagonal (Ports & Adapters), dependency injection. |
| `@octs/ddd` | Domain-Driven Design: bounded contexts, entities/value objects/aggregates, repositories, domain services/events, ubiquitous language, strategic design. |
| `@octs/event-driven` | Event-driven: RabbitMQ/Kafka, Outbox pattern, Saga (orchestration/choreography), Event Sourcing, CQRS, DLQ, schema evolution with Avro. |
| `@octs/resilience` | Resilience: retry with exponential backoff + jitter, circuit breaker (Closed/Open/Half-Open), graceful shutdown, idempotence, bulkhead, fallbacks. |
| `@octs/database` | Databases: migrations, indexes (B-tree/GiST/GIN/composite/partial), audit trail, soft delete, multi-tenancy, SQL optimization, transactions, optimistic/pessimistic locking. |

### Reasoning (5)

| Skill | Purpose |
|---|---|
| `@octs/feature-planner` | Plan before coding: analyze need, identify constraints, propose multiple approaches, compare tradeoffs, decompose into atomic tasks. **Never start coding without a validated plan.** |
| `@octs/bug-investigator` | Scientific debugging: reproduce → collect logs → propose hypotheses → eliminate → identify root cause → fix → add regression test → verify. |
| `@octs/architecture-review` | Architecture audit: coherence, technical debt, duplication, performance, security, scalability, maintainability. Structured report with severity-ranked findings. |
| `@octs/code-review` | Code review: readability, architecture, SOLID, security, performance, duplication, naming, complexity. Constructive, never personal. Blocking vs suggestion classification. |
| `@octs/refactoring` | Safe refactoring: SOLID/DRY/KISS/YAGNI/AHA principles, incremental steps with test verification at each step. **Never change external behavior during refactoring.** |

---

## Project Memory

`octs-skills init` automatically creates a project memory structure that agents use to understand your project:

```
docs/
├── index.md          ← Project at a glance (stack, architecture, key rules, <300 lines)
├── conventions.md    ← Coding standards (TypeScript, React, API, Git, naming, tests)
├── architecture.md   ← Module responsibilities, dependencies, data flows, diagrams
├── decisions.md      ← Architecture Decision Records (date, context, options, rationale)
└── glossary.md       ← Domain-specific terminology (ubiquitous language)

.project-ai/
├── project.json      ← Machine-readable manifest (frameworks, versions, tools, CI/CD)
├── inventory.json    ← Auto-inventory (components, hooks, services, routes, schemas)
└── skills.lock.json  ← Installed skills registry (name, version, hash, validated)
```

---

## CLI Reference

```
octs-skills <command> [options]

Commands:
  init [dir]       Initialize skills in a project directory (default: cwd)
  list             List all available skills by category
  info             Show library information and version

Options for init:
  --agent, -a      Target agent (opencode, claude-code, cursor, codex, windsurf, copilot)
  --categories, -c Comma-separated categories to install
  --no-memory      Skip project memory initialization
  --memory-only    Only initialize project memory, skip skills
  --help, -h       Show help
```

### Examples

```bash
# Full setup for OpenCode
octs-skills init

# Claude Code with only backend + security skills
octs-skills init --agent claude-code --categories backend,tests

# Cursor project, only project memory (no skills)
octs-skills init /path/to/project --agent cursor --memory-only
```

---

## Security

Every skill in this library has been audited using the research pipeline in `prompts/master-prompt.md`:

1. **Research** public skills (official sources prioritized)
2. **Download** and analyze structure
3. **Audit** for: prompt injection, hidden instructions, jailbreak attempts, data exfiltration, suspicious external references, system prompt overrides
4. **Remove** any dangerous content
5. **Merge** with OpenCTS requirements and guardrails
6. **Generate** finalized, secured skill

Only legitimate technical instructions are retained. No skill attempts to override system prompts, exfiltrate data, or redirect agent behavior.

---

## Contributing

Skills are generated following the pipeline in `prompts/master-prompt.md`. To contribute a new skill:

1. Follow the 6-step research pipeline (official sources → audit → merge → generate)
2. Place the skill in the appropriate `skills/<category>/` directory
3. Use the `@octs/` name prefix
4. Include YAML frontmatter with `name`, `description`, `depends_on`, and `tools`
5. All skills must depend on `@octs/project-awareness` (except `project-awareness` itself)
6. Include both universal guardrails in every skill
7. Run `octs-skills list` to verify the skill is discoverable

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full authoring guide.

---

## Publishing to npm

```bash
# Manual publish
npm publish

# Automated: push a version tag
git tag v1.0.0
git push origin v1.0.0
# GitHub Actions publishes to npm automatically
```

Requires `NPM_TOKEN` secret set in GitHub repository settings.

---

## License

MIT © OpenCTS — See [LICENSE](LICENSE) for details.
