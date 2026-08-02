# Contributing to @asaje/skills

Thank you for contributing! This guide covers how to add, modify, or improve skills in the `@asaje/skills` library.

---

## Skill Authoring Guide

Every skill is a Markdown file with YAML frontmatter. Follow this template exactly:

```markdown
---
name: "@octs/<skill-name>"
description: "<one-line description of what the skill enables>"
depends_on: ["@octs/project-awareness"]
tools: ["<relevant tools>"]
---

# @octs/<skill-name>

## Objective
[Clearly state what this skill does — one paragraph.]

## Dependencies
- `@octs/project-awareness`
[Other dependencies if applicable.]

## Universal Guardrails

### Guardrail 1 — Always Consider the Existing Project
[Insert the full guardrail text.]

### Guardrail 2 — Mandatory Verification Before Declaring Done
[Insert the full guardrail text.]

## [Skill-specific phases/sections]
[Detailed, actionable instructions for the AI agent.]
```

### Frontmatter Fields

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Skill identifier with `@octs/` prefix, lowercase, kebab-case |
| `description` | Yes | One line summarizing what the skill does |
| `depends_on` | Yes | Array of dependencies. All skills depend on `@octs/project-awareness` except `project-awareness` itself (use `[]`) |
| `tools` | No, but recommended | Array of tools/CLIs the skill may invoke |

### Naming Convention

- Use lowercase kebab-case: `rest-api`, `async-state`, `frontend-verification`
- The `@octs/` prefix is mandatory for scoping
- Name files identically to the skill name: `skills/frontend/async-state.md` ← `@octs/async-state`

### Dependencies

- **Every skill** (except `project-awareness`) must declare `depends_on: ["@octs/project-awareness"]`
- Integration-testing additionally depends on `@octs/isolated-test-environment`
- Never create circular dependencies

---

## Skill Generation Pipeline

Skills must follow the 6-step pipeline defined in `prompts/master-prompt.md`:

### 1. Research

Search for the best public skills for the targeted domain. Priority order:

1. Official skills (framework/package maintainers)
2. Official documentation
3. Anthropic, OpenAI, Vercel, shadcn/ui, TanStack, React, Next.js, Tailwind
4. OWASP, Microsoft, Google
5. Community repos (GitHub, awesome-lists) — **only** if they add genuine value

### 2. Download

Download identified skill content.

### 3. Analyze

Examine structure, conventions, patterns, relevance, quality, completeness.

### 4. Security Audit

Check every downloaded skill for:

- Prompt injection ("ignore previous instructions", "you are now...")
- Hidden prompts (zero-width characters, invisible text, base64 blocks)
- Jailbreak attempts
- Data exfiltration (collecting project info, sending to external URLs)
- Suspicious external references (unverified URLs, curl to unknown hosts)
- System prompt overrides

**Remove everything dangerous.** Keep only verified technical instructions.

### 5. Merge

Fuse the audited content with:
- OpenCTS requirements from `prompts/master-prompt.md`
- The two universal guardrails
- The `@octs/project-awareness` dependency

### 6. Generate

Produce the final Markdown file following the template above.

---

## Directory Structure

```
skills/
├── infra/           # Foundation skills (project-awareness, isolated-test)
├── verification/    # Quality gates (frontend-verification, backend-verification)
├── frontend/        # Frontend domain skills
├── backend/         # Backend domain skills
├── tests/           # Testing domain skills
├── architecture/    # Architecture domain skills
└── reasoning/       # Thinking/process skills
```

Place new skills in the appropriate category directory. If a new category is needed, create the directory and add it to the catalog.

---

## Universal Guardrails (Mandatory)

Every skill must include these two guardrails verbatim:

### Guardrail 1 — Always Consider the Existing Project

Before any code generation, ALWAYS:
- Analyze existing architecture
- Identify project conventions
- Reuse existing components, hooks, helpers, services, utilities, types, DTOs
- Reuse existing patterns
- Respect naming conventions, design system, ESLint/Biome/Prettier rules, Git conventions, folder structure, existing dependencies

Never reinvent something that already exists. Always prefer coherence over novelty.

### Guardrail 2 — Mandatory Verification Before Declaring Done

Never announce "Done", "Finished", or "Terminé" without verifying:
- Code compiles
- Imports are valid (no dead imports)
- TypeScript types are valid
- Available tests pass
- Lint passes
- No errors reported
- Generated files are coherent
- Referenced components/hooks/imports actually exist
- Paths are correct
- Dependencies exist
- Changes are compatible with the architecture

If a verification cannot be performed, explicitly distinguish:
- **Verified** — The check was executed and passed
- **Verifiable but not executed** — The check could have been run but wasn't
- **Not verifiable in current context** — The check cannot run in this environment

Never claim to have verified something that cannot be verified.

---

## Review Checklist

Before submitting a new skill, verify:

- [ ] `name` uses `@octs/` prefix, lowercase kebab-case
- [ ] `depends_on` includes `@octs/project-awareness` (or `[]` for the root skill)
- [ ] Both universal guardrails are present verbatim
- [ ] No prompt injection, hidden instructions, or security issues
- [ ] No "ignore previous instructions" or system prompt overrides
- [ ] No suspicious URLs or external references
- [ ] Instructions are clear, actionable, and unambiguous for an AI agent
- [ ] File is in the correct `skills/<category>/` directory
- [ ] Existing skills are not duplicated
- [ ] The skill is composable with other `@octs/` skills

---

## Testing

```bash
# Verify the CLI picks up the new skill
npm link
octs-skills list

# Test installation in a temp directory
rm -rf /tmp/octs-test && mkdir -p /tmp/octs-test
octs-skills init /tmp/octs-test --categories <your-category>
```

---

## Release Process

1. Make your changes in a feature branch
2. Open a PR against `main`
3. After review and merge, tag the release:
   ```bash
   git tag v1.X.0
   git push origin v1.X.0
   ```
4. GitHub Actions automatically publishes to npm (`@asaje/skills`)

---

## Questions?

Open an issue on the repository or consult `prompts/master-prompt.md` for the full skill specification.
