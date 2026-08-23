export type SlaTicketStatus =
  | "in-review"
  | "in-progress"
  | "resolved"
  | "waiting";

export type SlaTicketPriority = "high" | "medium" | "low";

export type SlaTicket = {
  id: string;
  subject: string;
  account: string;
  owner: string;
  priority: SlaTicketPriority;
  status: SlaTicketStatus;
  opened: string;
  dueMinutes: number;
};

const SUBJECTS = [
  "Payment failed on invoice generation",
  "Login issue on the main dashboard",
  "Feature request: export account data",
  "Contract renewal approval",
  "Driver location tracking delay",
  "API rate limit exceeded",
  "Incorrect tax shown at checkout",
  "Team invite email not received",
  "Usage report is missing entries",
  "Webhook delivery keeps retrying",
  "Unable to update billing address",
  "Workspace permissions changed",
] as const;

const ACCOUNTS = [
  "Domora",
  "NexRoute",
  "CloudGuard",
  "Splitly",
  "Foresight",
  "Northstar",
  "Plane",
  "Relay",
] as const;

const OWNERS = [
  "John Doe",
  "Sarah Lee",
  "Michael Wong",
  "Ronald James",
  "Ana Silva",
  "Lena Ortiz",
] as const;

const STATUSES: SlaTicketStatus[] = [
  "in-review",
  "resolved",
  "in-progress",
  "waiting",
];

const PRIORITIES: SlaTicketPriority[] = ["high", "low", "medium", "medium"];

export function buildSlaTickets(count = 36): SlaTicket[] {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(Date.UTC(2026, 6, 18 + (index % 8)));

    return {
      id: `#${2319 + index}`,
      subject: SUBJECTS[index % SUBJECTS.length],
      account: ACCOUNTS[index % ACCOUNTS.length],
      owner: OWNERS[(index * 2) % OWNERS.length],
      priority: PRIORITIES[index % PRIORITIES.length],
      status: STATUSES[index % STATUSES.length],
      opened: date.toISOString().slice(0, 10),
      dueMinutes: [120, 60, 1440, 540, 180, 45][index % 6],
    };
  });
}
