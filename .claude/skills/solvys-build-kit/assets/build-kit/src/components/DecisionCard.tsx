import { useId } from "react";

type DecisionChoice = { id: string; label: string; summary: string; foundation?: string; source?: string; details: string };
type DecisionCardProps = { groupName: string; choice: DecisionChoice; selected: boolean; expanded: boolean; onSelect: (choiceId: string) => void; onToggle: (choiceId: string) => void };

export function DecisionCard({ groupName, choice, selected, expanded, onSelect, onToggle }: DecisionCardProps) {
  const detailId = useId();
  return (
    <article className="solvys-kit-decision" data-selected={selected || undefined}>
      <div className="solvys-kit-decision__row">
        <label className="solvys-kit-decision__choice">
          <input type="radio" name={groupName} value={choice.id} checked={selected} onChange={() => onSelect(choice.id)} />
          <span><strong>{choice.label}</strong><small>{choice.summary}</small></span>
        </label>
        <button type="button" className="solvys-kit-decision__toggle" aria-expanded={expanded} aria-controls={detailId} onClick={() => onToggle(choice.id)}>
          {expanded ? "Hide details" : "Details"}
        </button>
      </div>
      {expanded ? (
        <div id={detailId} className="solvys-kit-decision__details">
          <p>{choice.details}</p>
          {choice.foundation ? <p><strong>Foundation:</strong> {choice.foundation}</p> : null}
          {choice.source ? <p><strong>Source:</strong> {choice.source}</p> : null}
        </div>
      ) : null}
    </article>
  );
}
