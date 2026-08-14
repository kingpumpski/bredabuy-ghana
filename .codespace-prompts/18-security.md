# PHASE 18 — SECURITY RECONCILIATION

Audit frontend code for:

- secrets
- service-role keys
- provider private keys
- hardcoded credentials
- insecure localStorage usage
- unsafe HTML rendering
- unsafe URL handling
- authorization bypasses
- seller isolation issues
- admin access issues

Check environment usage.

Public frontend variables must only contain genuinely public values.

Never place:

SUPABASE_SERVICE_ROLE_KEY
payment secret keys
private API keys
database credentials

in frontend code.

Fix identified issues without breaking legitimate public configuration.
