import type { ControlInventoryItem } from "../contracts";

type ControlInventoryProps = { caption?: string; items: ControlInventoryItem[]; onInspect?: (controlId: string) => void };

export function ControlInventory({ caption = "Control inventory", items, onInspect }: ControlInventoryProps) {
  return (
    <div className="solvys-kit-table-wrap"><table className="solvys-kit-table">
      <caption>{caption}</caption>
      <thead><tr><th scope="col">Control</th><th scope="col">Route</th><th scope="col">Action</th><th scope="col">Feature</th><th scope="col">Proof</th>{onInspect ? <th scope="col">Review</th> : null}</tr></thead>
      <tbody>{items.map((item) => <tr key={item.id}><th scope="row">{item.label}</th><td>{item.route}</td><td>{item.action}</td><td data-status={item.featureStatus}>{item.featureStatus}</td><td data-status={item.proofStatus}>{item.proofStatus}</td>{onInspect ? <td><button type="button" onClick={() => onInspect(item.id)}>Inspect</button></td> : null}</tr>)}</tbody>
    </table></div>
  );
}
