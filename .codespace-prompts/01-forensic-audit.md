# PHASE 1 — FULL REPOSITORY FORENSIC AUDIT

Before modifying ANY application code:

1. Inspect package.json.
2. Inspect tsconfig files.
3. Inspect vite configuration.
4. Inspect Tailwind configuration.
5. Inspect src/main.tsx.
6. Inspect src/App.tsx.
7. Inspect src/app.
8. Inspect src/components.
9. Inspect src/features.
10. Inspect src/hooks.
11. Inspect src/services.
12. Inspect src/store.
13. Inspect src/types.
14. Inspect src/pages if present.
15. Inspect router implementation.
16. Inspect all providers.
17. Inspect authentication implementation.
18. Inspect cart implementation.
19. Inspect checkout implementation.
20. Inspect payment implementation.
21. Inspect wallet implementation.
22. Inspect product/catalogue implementation.
23. Inspect order implementation.
24. Inspect seller implementation.
25. Inspect logistics implementation.
26. Inspect admin implementation.
27. Inspect notification/support implementation.

Produce:

docs/reconciliation/ARCHITECTURE_AUDIT.md

Include:

- actual architecture
- intended architecture
- mismatches
- duplicate implementations
- orphan files
- broken imports
- missing dependencies
- missing providers
- provider nesting problems
- state management conflicts
- route conflicts
- page/component duplication
- service duplication
- type duplication
- placeholder pages
- dead code
- performance risks
- search implementation problems
- authentication risks
- authorization risks
- payment risks
- wallet risks
- seller isolation risks

DO NOT fix anything in this phase.

Also record:

git status --short
git log -10 --oneline --decorate

The audit is the source of truth for subsequent phases.
