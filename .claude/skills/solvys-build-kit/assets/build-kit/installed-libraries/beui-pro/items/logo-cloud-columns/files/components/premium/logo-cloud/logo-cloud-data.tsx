import {
  Aperture,
  Atom,
  Box,
  Circle,
  Command,
  Diamond,
  Gem,
  Hexagon,
  Layers,
  type LucideIcon,
  Octagon,
  Orbit,
  Triangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type LogoCloudBrand = {
  name: string;
  icon?: LucideIcon;
  imageSrc?: string;
  category: string;
  metric: string;
  metricLabel: string;
  quote: string;
  result: string;
};

export const DEFAULT_LOGO_CLOUD_BRANDS: LogoCloudBrand[] = [
  {
    name: "Northwind",
    icon: Hexagon,
    category: "Commerce",
    metric: "42%",
    metricLabel: "faster launches",
    quote:
      "Our product team moved from rough direction to shipped pages in days.",
    result: "Launch cycles cut by 42%",
  },
  {
    name: "Relay",
    icon: Triangle,
    category: "Infrastructure",
    metric: "3.2×",
    metricLabel: "more experiments",
    quote:
      "The system gives us enough structure to move quickly without looking repetitive.",
    result: "3.2× more experiments",
  },
  {
    name: "Cortex",
    icon: Aperture,
    category: "AI workspace",
    metric: "18d",
    metricLabel: "saved per quarter",
    quote:
      "We stopped rebuilding the same polished interactions for every release.",
    result: "18 design days recovered",
  },
  {
    name: "Ledger",
    icon: Box,
    category: "Finance",
    metric: "27%",
    metricLabel: "higher conversion",
    quote:
      "The new product surfaces finally feel as considered as the platform behind them.",
    result: "Conversion lifted by 27%",
  },
  {
    name: "Beacon",
    icon: Gem,
    category: "Analytics",
    metric: "6wk",
    metricLabel: "to full redesign",
    quote:
      "A small team delivered the redesign without compromising motion or accessibility.",
    result: "Redesign shipped in 6 weeks",
  },
  {
    name: "Stacks",
    icon: Command,
    category: "Developer tools",
    metric: "91",
    metricLabel: "quality score",
    quote:
      "Every block feels intentional, but the underlying system stays predictable.",
    result: "Quality score reached 91",
  },
  {
    name: "Mosaic",
    icon: Octagon,
    category: "Collaboration",
    metric: "2.4×",
    metricLabel: "faster handoff",
    quote:
      "Design and engineering now discuss the same component instead of separate mockups.",
    result: "Handoff accelerated 2.4×",
  },
  {
    name: "Pulse",
    icon: Circle,
    category: "Health",
    metric: "34%",
    metricLabel: "less UI debt",
    quote:
      "The product became calmer and more coherent while our implementation got smaller.",
    result: "UI debt reduced by 34%",
  },
  {
    name: "Quartz",
    icon: Diamond,
    category: "Security",
    metric: "12",
    metricLabel: "markets launched",
    quote:
      "One flexible visual system now supports every market without flattening the brand.",
    result: "12 markets launched",
  },
  {
    name: "Vellum",
    icon: Layers,
    category: "Publishing",
    metric: "68%",
    metricLabel: "more engagement",
    quote:
      "Editorial layouts became easier to ship and noticeably better to explore.",
    result: "Engagement increased 68%",
  },
  {
    name: "Helix",
    icon: Atom,
    category: "Research",
    metric: "4.8×",
    metricLabel: "faster iteration",
    quote:
      "We can test expressive directions without turning the product into a prototype.",
    result: "Iteration speed up 4.8×",
  },
  {
    name: "Atlas",
    icon: Orbit,
    category: "Operations",
    metric: "29%",
    metricLabel: "fewer support tickets",
    quote:
      "Clearer product states made the experience easier for customers and operators.",
    result: "Support volume down 29%",
  },
];

export function LogoCloudMark({
  brand,
  className,
  iconClassName,
  nameClassName,
}: {
  brand: LogoCloudBrand;
  className?: string;
  iconClassName?: string;
  nameClassName?: string;
}) {
  const Icon = brand.icon;

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
      {brand.imageSrc ? (
        // biome-ignore lint/performance/noImgElement: consumer-supplied brand asset
        <img
          src={brand.imageSrc}
          alt=""
          aria-hidden
          className={cn("size-6 shrink-0 object-contain", iconClassName)}
        />
      ) : Icon ? (
        <Icon
          aria-hidden
          className={cn("size-5 shrink-0", iconClassName)}
          strokeWidth={1.75}
        />
      ) : null}
      <span
        className={cn(
          "truncate font-semibold text-lg tracking-tight",
          nameClassName,
        )}
      >
        {brand.name}
      </span>
    </span>
  );
}
