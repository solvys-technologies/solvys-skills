export type Order = {
  id: string;
  customer: string;
  email: string;
  product: string;
  placed: string;
  status: "paid" | "processing" | "refunded";
  items: number;
  total: number;
};

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  team: string;
  location: string;
  joined: string;
  status: "active" | "away" | "offline";
};

export type PortfolioAsset = {
  id: string;
  symbol: string;
  name: string;
  allocation: number;
  price: number;
  change: number;
  value: number;
  sparkline: number[];
};

const CUSTOMERS = [
  "Maya Bennett",
  "Noah Williams",
  "Lena Ortiz",
  "Eli Thompson",
  "Ava Robinson",
  "Jon Bell",
  "Nora Kim",
  "Milo Carter",
] as const;
const PRODUCTS = [
  "Creator plan",
  "Team workspace",
  "Annual membership",
  "Design library",
  "Studio add-on",
  "Pro bundle",
] as const;

export function buildOrders(count = 5000): Order[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `#${String(18420 - index).padStart(5, "0")}`,
    customer: CUSTOMERS[(index * 5 + Math.floor(index / 8)) % CUSTOMERS.length],
    email: `customer${index + 1}@example.com`,
    product: PRODUCTS[(index * 7) % PRODUCTS.length],
    placed: new Date(
      Date.UTC(2026, 6, 25, 12) - index * 15 * 60 * 1000,
    ).toISOString(),
    status:
      index % 11 === 0 ? "refunded" : index % 4 === 0 ? "processing" : "paid",
    items: 1 + (index % 4),
    total: 49 + ((index * 37) % 620),
  }));
}

const FIRST_NAMES = [
  "Mara",
  "Theo",
  "Nia",
  "Sam",
  "Iris",
  "Jonah",
  "Amara",
  "Ren",
  "Lina",
  "Owen",
] as const;
const LAST_NAMES = [
  "Okafor",
  "Silva",
  "Chen",
  "Morgan",
  "Khan",
  "Ito",
  "Rossi",
  "Bennett",
  "Diaz",
  "Lund",
] as const;
const ROLES = [
  "Product designer",
  "Frontend engineer",
  "Data analyst",
  "Product manager",
  "Support lead",
] as const;
const TEAMS = ["Design", "Engineering", "Data", "Product", "Success"] as const;
const LOCATIONS = ["London", "Lagos", "Tokyo", "Toronto", "Lisbon"] as const;

export function buildTeam(count = 1200): TeamMember[] {
  return Array.from({ length: count }, (_, index) => {
    const first = FIRST_NAMES[index % FIRST_NAMES.length];
    const cohort = Math.floor(index / FIRST_NAMES.length);
    const last = LAST_NAMES[(index * 7 + cohort) % LAST_NAMES.length];
    return {
      id: `person-${index}`,
      name: `${first} ${last}`,
      initials: `${first[0]}${last[0]}`,
      email: `${first}.${last}${index}@northstar.co`.toLowerCase(),
      role: ROLES[(index * 3 + cohort) % ROLES.length],
      team: TEAMS[(index * 3 + cohort) % TEAMS.length],
      location: LOCATIONS[(index * 7 + cohort * 3) % LOCATIONS.length],
      joined: new Date(
        Date.UTC(2021 + (index % 5), (index * 5) % 12, 3 + (index % 24)),
      )
        .toISOString()
        .slice(0, 10),
      status: index % 9 === 0 ? "offline" : index % 5 === 0 ? "away" : "active",
    };
  });
}

export const PORTFOLIO_ASSETS: PortfolioAsset[] = [
  {
    id: "nvda",
    symbol: "NVDA",
    name: "NVIDIA",
    allocation: 24.8,
    price: 182.37,
    change: 2.84,
    value: 186402,
    sparkline: [24, 27, 26, 31, 29, 34, 38, 36, 42, 45],
  },
  {
    id: "msft",
    symbol: "MSFT",
    name: "Microsoft",
    allocation: 18.2,
    price: 517.91,
    change: 0.62,
    value: 136728,
    sparkline: [32, 31, 34, 33, 36, 38, 37, 39, 40, 42],
  },
  {
    id: "asml",
    symbol: "ASML",
    name: "ASML Holding",
    allocation: 15.6,
    price: 1094.2,
    change: -1.18,
    value: 117203,
    sparkline: [44, 42, 41, 43, 38, 40, 36, 35, 37, 34],
  },
  {
    id: "amzn",
    symbol: "AMZN",
    name: "Amazon",
    allocation: 13.4,
    price: 238.55,
    change: 1.37,
    value: 100684,
    sparkline: [28, 30, 29, 32, 31, 35, 34, 38, 40, 41],
  },
  {
    id: "crm",
    symbol: "CRM",
    name: "Salesforce",
    allocation: 10.8,
    price: 312.64,
    change: -0.44,
    value: 81152,
    sparkline: [41, 39, 40, 37, 38, 36, 35, 37, 34, 35],
  },
  {
    id: "spot",
    symbol: "SPOT",
    name: "Spotify",
    allocation: 9.1,
    price: 741.18,
    change: 3.12,
    value: 68391,
    sparkline: [22, 24, 25, 29, 28, 33, 36, 39, 43, 47],
  },
  {
    id: "cash",
    symbol: "USD",
    name: "Cash reserve",
    allocation: 8.1,
    price: 1,
    change: 0,
    value: 60884,
    sparkline: [34, 34, 34, 34, 34, 34, 34, 34, 34, 34],
  },
];
