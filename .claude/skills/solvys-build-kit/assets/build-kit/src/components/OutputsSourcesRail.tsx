import type { DecisionStep } from "../contracts";

type OutputsSourcesRailProps = { title?: string; steps: DecisionStep[]; currentStepId?: string };

export function OutputsSourcesRail({ title = "Outputs & Sources", steps, currentStepId }: OutputsSourcesRailProps) {
  const complete = steps.filter((step) => step.complete).length;
  const percent = steps.length === 0 ? 0 : Math.round((complete / steps.length) * 100);
  return (
    <aside className="solvys-kit-rail" aria-label={title}>
      <header className="solvys-kit-rail__header"><h2>{title}</h2><output aria-label={`${percent}% complete`}>{percent}%</output></header>
      <progress max={100} value={percent}>{percent}%</progress>
      <ol>
        {steps.map((step, index) => (
          <li key={step.id} aria-current={step.id === currentStepId ? "step" : undefined} aria-label={`${step.title}, ${step.complete ? "complete" : "pending"}`} data-complete={step.complete || undefined}>
            <span className="solvys-kit-rail__index" aria-hidden="true">{index + 1}</span>
            <span><strong>{step.title}</strong><small>{step.selection ?? step.summary}</small>{step.source ? <small>Source: {step.source}</small> : null}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
