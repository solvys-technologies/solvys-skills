# Cardinal Design Sins

These are hard failures unless the current project source explicitly proves a
local exception and the plan documents that exception.

1. Generic SaaS slop: card grids, samey dashboards, polite filler sections, and
   no product-specific personality.
2. Decorative gradients, glows, auroras, blobs, sparkles, and blur used as taste
   substitutes.
3. Button/card over-chrome: borders plus fills plus hover boxes plus backplates
   on controls that should be quiet.
4. Fake Liquid Glass: homemade blur/rim/glow CSS without a source-backed pattern
   and repo-owned primitive.
5. Too many cards, nested cards, and page sections treated like floating cards
   instead of real layout.
6. Bad motion: instant drawers/modals, scroll-jacking, parallax gimmicks, bounce
   easing, or motion without a UX reason.
7. Icon sins: emojis, invented SVGs, filled/colorful icons, mixed icon sets, or
   missing tooltip/ARIA on icon-only controls.
8. Typography laziness: harsh browser defaults, too many sizes/weights/families,
   giant hero type inside compact panels, unreadable data digits.
9. Copy/data sins: duplicate labels, implementation narration in UI, raw backend
   strings, and text that overflows or overlaps.
10. No design process: building frontend before reference research, source
    inspection, Design.md guardrails, PRD decisions, and rendered proof.

## Scan Before Implementation

- Search CSS and class names for gradients, glow, blur, shadow, rounded-full,
  side stripes, decorative borders, and nested card wrappers.
- Inspect buttons and icon controls for unnecessary boxes, borders, labels,
  duplicated text, and missing accessibility names.
- Inspect data rendering for raw enum strings, unstable number alignment,
  missing tabular figures, and status colors applied to containers instead of
  values.
- Inspect motion for instant surfaces, excessive transforms, no reduced-motion
  fallback, and animation that does not explain state or attachment.
- Inspect responsive surfaces for overlap, horizontal scroll, clipped labels,
  hidden CTAs, and hero-scale type inside compact controls.

