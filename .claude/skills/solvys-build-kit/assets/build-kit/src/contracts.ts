import type { ReactNode } from "react";

export type BuildStatus = "working" | "warning" | "blocked" | "unknown";
export type DecisionStep = { id: string; title: string; summary: string; selection?: string; source?: string; complete: boolean };
export type ControlInventoryItem = { id: string; label: string; route: string; action: string; featureStatus: BuildStatus; proofStatus: BuildStatus };
export type ArchitectureNode = { id: string; label: string; detail: string; status: BuildStatus; x: number; y: number; metaphor?: string };
export type ArchitectureEdge = { id: string; source: string; target: string; label?: string; status: BuildStatus };
export type StateAction = { label: string; onAction: () => void };
export type DrawerControl = { id: string; label: string; content: ReactNode };
