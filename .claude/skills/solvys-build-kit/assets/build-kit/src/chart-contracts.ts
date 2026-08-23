export type SolvysChartState = "loading" | "empty" | "ready" | "error";

export interface SolvysBarDatum {
  id: string;
  label: string;
  value: number;
}

export interface SolvysChartPoint {
  id: string;
  label: string;
  value: number;
}

export interface SolvysBarChartSpec {
  data: readonly SolvysBarDatum[];
  state?: SolvysChartState;
  title?: string;
  description?: string;
  ariaLabel: string;
  accent?: string;
  height?: number;
  emptyMessage?: string;
  errorMessage?: string;
  onPointFocus?: (point: SolvysChartPoint | null) => void;
  onPointSelect?: (point: SolvysChartPoint) => void;
}
