# Client intake

The intake is the difference between a site that describes a real business and
one that describes a plausible business. Run it before authoring source.

## Research gate

Find the facts. Do not invent them, and do not leave a placeholder where a fact
exists.

Research, in this order:

1. The client's current website: identity, offer, product list, copy that already
   works, contact details, imagery.
2. Their public catalog or gallery for product-level accuracy.
3. Business listings and public profiles for the legal name, ownership, hours,
   service area, and phone number.
4. Their existing brand assets for the real logo and real colours.

Record what the research could not settle. An unknown fact is a gap, not a
licence to write a plausible one.

## Fact table

Build this table and keep it in the run. Every claim on the site traces to a
row.

| Field | Value | Source |
| --- | --- | --- |
| Legal business name | | |
| Trading name | | |
| Owner or principal | | |
| Offer in one sentence | | |
| Product or service list | | |
| Differentiator | | |
| Service area | | |
| Phone | | |
| Email | | |
| Address | | |
| Social and marketplace links | | |
| Existing site URL | | |
| Real logo asset path | | |
| Real media inventory | | |
| Audience description | | |

A row left blank is either a research gap or a stop point. Decide which, and
record the decision.

## Copy rule

Marketing copy is written, not invented. Every sentence describes something in
the fact table.

- Write in simplified English. Short sentences, concrete nouns, no filler.
- Do not write a superlative the client cannot support.
- Do not describe a capability the client does not have.
- Preserve exact client-supplied copy when the request is legal, notice, or
  status sensitive.
- When the client's existing copy already works, reuse it rather than improving
  it.

The failure this rule prevents: a site that reads well and describes a company
that does not exist.

## Audience tailoring

Narrow the design to the people who will buy. The audience in the fact table
governs density, type size, control count, and imagery.

Two worked contrasts from this workflow:

- A fix-and-flip buyer audience needs a before-and-after narrative, because the
  product is a property with potential rather than a finished home. The page
  shows the distressed state becoming the finished state. It does not sell
  finished houses.
- An older homeowner audience needs larger type, a short navigation, a visible
  phone number, and fewer choices. A complicated catalogue was the reason their
  previous site failed.

Same visual system, different page. The audience decides which.

## Media rule

Use real client media wherever it exists. When a product has no real photograph,
remove the product rather than illustrating it.

- No AI-generated media on a client site unless the client asks for it.
- No invented photographs of the client's premises, staff, or work.
- Reference imagery may not be presented as the client's work.

When real media is unavailable for a product the client sells, record the gap and
ask. Do not substitute and do not silently drop the product without saying so.

## Reference sites

When the request supplies a reference site or benchmark:

- Run `/solvys-kirby` and consume its Interface Inventory. Do not reconstruct a
  benchmark from memory or from a screenshot alone.
- Reverse-engineer the reference for an authorized benchmark. The real-estate
  reference in this workflow produced both its own v0 site and the reusable
  scroll runtime, which is the expected secondary return.
- Keep the benchmark distinct from the client's site. Reproduce its structure,
  behavior, and visual language, then make the client's version unmistakably
  theirs.

A benchmark authorizes a fidelity study. It does not authorize copying
proprietary source, protected assets, brand marks, or copy the client does not
control.

## Intake output

Write `SITE-NOTES.md` at the workspace root with:

- The fact table and its sources.
- The audience description and the design decisions it drove.
- Real media inventory and the assets actually used.
- Every unresolved gap with its next action and its owner.
- Every control that ships disabled and unlinked, with the reason.
- Any benchmark studied and what was reproduced.
