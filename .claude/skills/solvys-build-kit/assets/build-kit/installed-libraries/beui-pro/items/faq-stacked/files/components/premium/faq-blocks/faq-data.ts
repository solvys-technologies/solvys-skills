export type FaqCategory = "Getting started" | "Billing" | "Privacy" | "Support";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
};

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  "Getting started",
  "Billing",
  "Privacy",
  "Support",
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "trial",
    question: "Can I try the product before choosing a plan?",
    answer:
      "Yes. Every workspace starts with a 14-day trial, and you can explore the full product without adding a payment method.",
    category: "Getting started",
  },
  {
    id: "invite",
    question: "How do I bring my team in?",
    answer:
      "Invite people by email or share a private join link. You can change roles and access at any time from workspace settings.",
    category: "Getting started",
  },
  {
    id: "import",
    question: "Can I move my existing work over?",
    answer:
      "You can import common file formats or start from a template. Our support team can also help with larger moves.",
    category: "Getting started",
  },
  {
    id: "plans",
    question: "What is included in each plan?",
    answer:
      "Every plan includes the core workspace. Higher plans add more guests, longer history, and organization controls for larger teams.",
    category: "Billing",
  },
  {
    id: "change-plan",
    question: "Can I change my plan later?",
    answer:
      "Anytime. Upgrades take effect immediately, while downgrades begin at the end of your current billing period.",
    category: "Billing",
  },
  {
    id: "annual",
    question: "Do you offer annual billing?",
    answer:
      "Yes. Annual plans include two months at no additional cost and use the same features and support as monthly plans.",
    category: "Billing",
  },
  {
    id: "ownership",
    question: "Who owns the content we add?",
    answer:
      "You do. Your team keeps ownership of everything it creates and can export workspace content whenever needed.",
    category: "Privacy",
  },
  {
    id: "access",
    question: "Can guests see the whole workspace?",
    answer:
      "No. Guests only see the spaces and pages you explicitly share with them, and their access can be removed instantly.",
    category: "Privacy",
  },
  {
    id: "delete",
    question: "What happens when I delete a workspace?",
    answer:
      "The workspace enters a 30-day recovery period before permanent deletion. Owners receive a confirmation before that period ends.",
    category: "Privacy",
  },
  {
    id: "response",
    question: "How quickly will support reply?",
    answer:
      "Most questions receive a reply within one business day. Priority plans include a faster response window for urgent issues.",
    category: "Support",
  },
  {
    id: "cancel",
    question: "What happens if I cancel?",
    answer:
      "Your paid features remain available until the end of the billing period. After that, the workspace moves to the free plan.",
    category: "Support",
  },
  {
    id: "contact",
    question: "Can I speak with a real person?",
    answer:
      "Always. Send us a note from the help menu and a member of the team will reply—no automated support loop.",
    category: "Support",
  },
];
