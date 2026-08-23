# Forbidden writing patterns

This file is a living Factory denylist. Apply it to agent messages, handoffs,
status reports, plans, receipts, documentation, and generated UI copy. When a
new pattern appears, add the pattern, a short example, the repair, and the date
that exposed it. Keep the list short enough to use during a real task.

## Four quality checks

Follow Zinsser's four principles of quality writing:

1. Simplicity
2. Brevity
3. Clarity
4. Humanity

Every pass must preserve technical precision, ownership, authority, safety, and
proof state. Simple language does not permit missing evidence.

## Patterns to avoid

### Staccato pairs

Avoid two clipped sentences that create fake force or a sales cadence.

Bad: “We inspect. We ship.”

Repair: “We inspect the accepted source, then ship after the required proof passes.”

### Antithesis reframe and negative parallelism

Avoid the scripted “not X, but Y” or “it is not X, it is Y” correction. State the
actual direction and the mechanism.

Bad: “It is not a blocker, it is a missing credential path.”

Repair: “The missing credential path is the repair seam. I’m checking the approved machine store now.”

### Isocolon metaphor-pairs

Avoid balanced metaphor pairs that sound polished while hiding the operating
detail.

Bad: “The engine is the backend; the chassis is the frontend.”

Repair: “The backend owns the data contract. The frontend consumes that contract and proves each state.”

### Backward-references

Avoid vague references such as “the above,” “that issue,” “as mentioned,” or “the
previous thing.” Repeat the exact noun when it keeps the reader from guessing.

Bad: “Apply the fix above to the other one.”

Repair: “Apply the Bitwarden origin check to the Fintheon login policy.”

### Corporate throat-clearing

Avoid openers that delay the action: “I hope this finds you well,” “It is worth
noting,” “As an AI,” or “To summarize.” Start with the state and the next action.

### Empty certainty

Avoid “done,” “production-ready,” “secure,” or “all set” without the proof rung,
source, and remaining human gate. Name the evidence that exists.

### Proxy completion

Avoid treating a passing test, HTTP 200, green build, successful OAuth page, or
visible button as proof of the user-visible outcome. Name the missing rung.

### Overloaded noun strings

Avoid chains of abstract nouns that make the action hard to find. Use a verb and
name the object.

Bad: “Credential custody alignment remediation.”

Repair: “Move the project token into the approved machine store.”

### Decorative headings and duplicated summaries

Avoid a heading that repeats the paragraph below it. Use one functional heading
only when it improves the next action.

### Unowned pronouns

Avoid “they,” “it,” “this,” or “that” when more than one project, provider,
agent, or artifact is in scope. Repeat the owner or artifact name.

## Enforcement

- Read this file with the Communication Style Protocol before sending a
  correction, handoff, status, or user-facing artifact.
- When a new pattern is found, append it here and add a focused regression check
  or prompt rule in the smallest durable Factory layer.
- Keep user quotes and required legal or product copy intact. The denylist
  governs agent-authored language.
