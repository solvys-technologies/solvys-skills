export type ChangelogRelease = {
  version: string;
  date: string;
  title: string;
  summary: string;
  category: "Product" | "Workflow" | "Connections";
  highlights: string[];
};

export const CHANGELOG_RELEASES: ChangelogRelease[] = [
  {
    version: "4.8.0",
    date: "June 24, 2026",
    title: "A canvas that keeps up with the room",
    summary:
      "Working together on the same canvas now feels calmer. You can see where people are focused, follow a teammate, and keep every edit in step.",
    category: "Product",
    highlights: [
      "See where teammates are working",
      "Keep every edit in step",
      "Follow someone during a review",
    ],
  },
  {
    version: "4.7.2",
    date: "June 10, 2026",
    title: "Repeat exports take one click",
    summary:
      "Save the choices you use often and Northstar will remember the size, format, naming, and quality the next time around.",
    category: "Workflow",
    highlights: [
      "Save your usual export settings",
      "Prepare several files together",
      "Get smaller files with the same quality",
    ],
  },
  {
    version: "4.7.0",
    date: "May 28, 2026",
    title: "Bring your work together",
    summary:
      "Connect Northstar with the tools your team already uses, keep project details in sync, and choose exactly what each connection can see.",
    category: "Connections",
    highlights: [
      "Share new work automatically",
      "Keep project details in sync",
      "Choose what each connection can access",
    ],
  },
  {
    version: "4.6.4",
    date: "May 14, 2026",
    title: "A calmer way to review work",
    summary:
      "Review links now open in a focused presentation surface with pinned comments, resolved threads, and per-frame approvals.",
    category: "Product",
    highlights: [
      "Approve individual moments",
      "Invite guests without extra setup",
      "Keep resolved feedback out of the way",
    ],
  },
];
