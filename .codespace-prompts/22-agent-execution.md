# MASTER AGENT EXECUTION INSTRUCTION

Execute the BredaBuy reconciliation prompts in this order:

00-global-rules.md
01-forensic-audit.md
02-foundation.md
03-routing.md
04-services.md
05-state-types.md
06-customer-flow.md
07-search.md
08-account-pages.md
09-marketplace.md
10-commerce-critical-flow.md
11-seller.md
12-logistics.md
13-admin.md
14-ui-modernization.md
15-performance.md
16-accessibility.md
17-state-ux.md
18-security.md
19-cleanup.md
20-integration.md
21-quality-gate.md

Do not skip architectural phases.

Before implementing each phase:

1. Read the previous phase output.
2. Inspect relevant source files.
3. Identify existing implementations.
4. Reuse them where possible.
5. Make the smallest coherent change.
6. Validate.
7. Document important architectural decisions.

Never create fake implementations simply to make the build pass.

If an external backend/service is missing:

- preserve the UI contract
- clearly document the missing dependency
- do not invent production behavior

At the end:

generate:

docs/reconciliation/FINAL_IMPLEMENTATION_REPORT.md

containing:

- architecture changes
- routes reconciled
- pages implemented
- services consolidated
- providers fixed
- state fixes
- search fixes
- performance improvements
- accessibility improvements
- security fixes
- unresolved limitations
- validation results

Only after the quality gate passes should the developer consider committing.
