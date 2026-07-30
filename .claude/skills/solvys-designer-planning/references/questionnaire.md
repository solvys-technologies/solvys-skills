# Solvys Frontend Planning Questionnaire

Use these questions to build the PRD, project `Design.md`, CSS architecture, and
implementation brief. Do not dump all 50 questions on the user unless they ask
for the whole questionnaire. Ask the smallest useful subset, then proceed.

## Product And PRD

1. What is the project name and the one-sentence mission?
2. Who is the primary user, and what do they already believe or know?
3. What painful workflow, decision, or emotional state should this improve?
4. What is the first successful outcome a user should reach?
5. What does the product refuse to be?
6. What existing product, repo, or surface must this feel connected to?
7. What platform is primary: desktop web, mobile web, iOS, macOS, Electron, or
   embedded surface?
8. What must be functional in the first shipped version?
9. What can be obviously deferred without making the product feel hollow?
10. What is the highest-risk assumption in the product idea?

## Users, Content, And Data

11. What are the top three user jobs on the first screen?
12. What information must be visible without scrolling?
13. What information should stay hidden until intent is shown?
14. What data is live, stale, simulated, user-entered, or imported?
15. Which states need explicit design: empty, loading, saved, failed, blocked,
    offline, partial, unauthenticated, and permission denied?
16. What language should the UI never use?
17. Which raw backend/source values need display-name mapping?
18. What notifications belong inline instead of in toasts?
19. What needs auditability, provenance, citations, or receipts?
20. What proof should convince us the real workflow works?

## Visual Direction

21. Which vibe is dominant: Artsy, Tech SaaS, or Motion Designed?
22. What existing brand or product should be the closest family member?
23. What reference should be the primary design north star?
24. Which reference details are allowed as secondary borrowings?
25. What common reference-average should be rejected?
26. What emotional register should the first viewport create?
27. Should the interface feel dense and operational or spacious and editorial?
28. What visual element carries identity: product screenshot, video, type,
    data, illustration, photography, or 3D scene?
29. What is the dominant canvas color?
30. Which accent color is an event, not a default fill?

## Typography, Color, And Media

31. Which font kit is approved for body, heading, and data?
32. Which font or style is explicitly banned for this project?
33. What maximum type families, sizes, and weights are allowed per screen?
34. Which palette tokens are official, and which are one-off content colors?
35. How should success, warning, error, and information states be colored?
36. What imagery source is approved: real app capture, generated bitmap, user
    asset, stock, video, canvas, or none?
37. What effects are allowed on product mockups?
38. What effects are forbidden even on marketing pages?
39. What is the image/video aspect-ratio system?
40. How will dark, light, high-contrast, or glass-off modes behave?

## Components, CSS, And Motion

41. Which existing components must be reused before new components are created?
42. Which primitives need universal CSS class contracts?
43. What class family names will govern buttons, cards, feeds, widgets, rails,
    menus, drawers, toasts, queues, and overflow controls?
44. Where do design tokens live, and how are they imported?
45. What component library is approved, and what is it allowed to own?
46. Which chart library and graph library are approved?
47. What layout constraints prevent text overflow and mobile breakage?
48. What surfaces require enter and exit motion?
49. What is the reduced-motion behavior for every major animation?
50. Which rendered proof must be captured before the work can be called done?

