import type { ReactNode } from "react";
import type { StateAction } from "../contracts";

type StateGateProps = { state: "ready" | "loading" | "empty" | "error" | "permission"; title?: string; detail?: string; action?: StateAction; children: ReactNode };

export function StateGate({ state, title, detail, action, children }: StateGateProps) {
  if (state === "ready") return <>{children}</>;
  const urgent = state === "error" || state === "permission";
  const stateLabel = { loading: "Loading", empty: "Nothing here yet", error: "Something went wrong", permission: "Access required" }[state];
  return (
    <section className={`solvys-kit-state solvys-kit-state--${state}`} role={urgent ? "alert" : "status"} aria-live={urgent ? "assertive" : "polite"} aria-busy={state === "loading"}>
      <strong>{title ?? stateLabel}</strong>
      {detail ? <p>{detail}</p> : null}
      {action ? <button type="button" onClick={action.onAction}>{action.label}</button> : null}
    </section>
  );
}
