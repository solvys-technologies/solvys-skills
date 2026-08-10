import { useMemo } from "react";
import { barY, defineChart } from "@tanstack/charts";
import { scaleBand, scaleLinear } from "d3-scale";
import { tooltip } from "@tanstack/charts/tooltip";
import { Chart } from "@tanstack/charts/react";
import type { SolvysBarChartSpec, SolvysBarDatum } from "../chart-contracts";

function pointFromDatum(datum: SolvysBarDatum) {
  return { id: datum.id, label: datum.label, value: datum.value };
}

export function TanStackChartPanel({
  data,
  state = "ready",
  title = "Chart",
  description,
  ariaLabel,
  accent = "var(--solvys-kit-accent, #c79f4a)",
  height = 280,
  emptyMessage = "No data is available for this view.",
  errorMessage = "This chart could not load.",
  onPointFocus,
  onPointSelect,
}: SolvysBarChartSpec) {
  const definition = useMemo(() => defineChart({
    marks: [barY(data, { x: "label", y: "value", key: "id", fill: accent })],
    x: { scale: () => scaleBand().padding(0.18) },
    y: { scale: scaleLinear, nice: true, grid: true },
    tooltip,
  }), [accent, data]);

  if (state === "loading") {
    return <section className="solvys-kit-chart" aria-label={ariaLabel} aria-busy="true"><div className="solvys-kit-chart__heading"><strong>{title}</strong>{description ? <span>{description}</span> : null}</div><div className="solvys-kit-chart__state">Loading chart data</div></section>;
  }

  if (state === "empty" || data.length === 0) {
    return <section className="solvys-kit-chart" aria-label={ariaLabel}><div className="solvys-kit-chart__heading"><strong>{title}</strong>{description ? <span>{description}</span> : null}</div><div className="solvys-kit-chart__state">{emptyMessage}</div></section>;
  }

  if (state === "error") {
    return <section className="solvys-kit-chart" aria-label={ariaLabel} role="alert"><div className="solvys-kit-chart__heading"><strong>{title}</strong>{description ? <span>{description}</span> : null}</div><div className="solvys-kit-chart__state">{errorMessage}</div></section>;
  }

  return <section className="solvys-kit-chart" aria-label={ariaLabel}><div className="solvys-kit-chart__heading"><strong>{title}</strong>{description ? <span>{description}</span> : null}</div><Chart definition={definition} height={height} ariaLabel={ariaLabel} onFocusChange={(point) => { const datum = point?.datum as SolvysBarDatum | undefined; onPointFocus?.(datum ? pointFromDatum(datum) : null); }} onSelect={(point) => { const datum = point.datum as SolvysBarDatum; onPointSelect?.(pointFromDatum(datum)); }} /></section>;
}
