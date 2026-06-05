# What this covers

The exact final-message structure to output when finishing a build: the Build summary block, the Missing DS components table, the mailto link template (URL-encoded), and the recipient email rules.

---

## End-of-build summary

When you finish building the service, output this exact structure as your final chat message — even if there are no missing components:

```
## Build summary

Service: <service name>
Routes: <list>
Files created: <count>
Lint: <pass/fail>
Typecheck: <pass/fail>
Build: <pass/fail>

## Missing DS components

<If none: "None — all UI built with existing DS primitives.">
<If any: a markdown table same as MISSING_COMPONENTS.md>

## Request missing components

<If none: omit this section.>
<If any: a mailto: link that opens the developer's email client with a pre-filled message to the DS owner.>
```

The mailto link format:

```
mailto:vis.rameshh@gmail.com?subject=DS%20Component%20Request%20-%20<URL-ENCODED-SERVICE-NAME>&body=<URL-ENCODED-BODY>
```

Body content (URL-encode newlines as `%0A`, spaces as `%20`):

```
Service: <service name>
Repo: <repo URL if known, or "(local)">
Branch: <branch name>

Missing components:
- CalendarPicker: fine date range filter (search-form.tsx:42)
- CurrencyInput: AED amount input (pay-form.tsx:18)

Built by: <user's name, or ask them>
```

Render the link as plain markdown so the user can click it:

```
[Email DS owner to request these components](mailto:...)
```

### Recipient email

The current DS owner email is `vis.rameshh@gmail.com`. If you see a different email in this CLAUDE.md (the template owner may update it later), use that one — read it from this section every time, do not cache or hardcode it anywhere else in your output.

