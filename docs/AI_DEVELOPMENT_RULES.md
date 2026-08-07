# BredaBuy Ghana AI Development Rules

## Project Principles

- Never delete existing working functionality without approval.
- Always inspect existing files before modifying code.
- Maintain TypeScript strictness.
- Preserve backward compatibility.
- Avoid duplicate components.
- Reuse existing ShadCN UI components.
- Follow feature-based architecture.
- Document major changes.

## Development Process

Every implementation must follow:

1. Analyze existing code.
2. Create an implementation plan.
3. Modify files carefully.
4. Run lint checks.
5. Run production build.
6. Document changes.

## Architecture Rules

New features should be organized under:

src/modules

Shared resources belong under:

src/shared

API communication belongs under:

src/services

Application state belongs under:

src/store

## Quality Requirements

Before committing:

- npm run lint
- npm run build
- git status review

