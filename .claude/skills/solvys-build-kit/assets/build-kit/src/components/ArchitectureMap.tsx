import type { ArchitectureEdge, ArchitectureNode } from "../contracts";

type ArchitectureMapProps = { title: string; nodes: ArchitectureNode[]; edges: ArchitectureEdge[]; onNodeSelect: (nodeId: string) => void };

function safePosition(value: number) {
  return Math.max(12, Math.min(88, value));
}

export function ArchitectureMap({ title, nodes, edges, onNodeSelect }: ArchitectureMapProps) {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  return (
    <figure className="solvys-kit-map">
      <figcaption>{title}</figcaption>
      <div className="solvys-kit-map__canvas">
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
          {edges.map((edge) => { const source = nodeById.get(edge.source); const target = nodeById.get(edge.target); if (!source || !target) return null; return <line key={edge.id} x1={safePosition(source.x)} y1={safePosition(source.y)} x2={safePosition(target.x)} y2={safePosition(target.y)} data-status={edge.status} />; })}
        </svg>
        {nodes.map((node) => <button key={node.id} type="button" className="solvys-kit-map__node" style={{ left: `${safePosition(node.x)}%`, top: `${safePosition(node.y)}%` }} data-status={node.status} onClick={() => onNodeSelect(node.id)}><strong>{node.label}</strong><small>{node.detail}</small>{node.metaphor ? <small>{node.metaphor}</small> : null}</button>)}
      </div>
      <ul className="solvys-kit-sr-only">
        {edges.map((edge) => <li key={edge.id}>{nodeById.get(edge.source)?.label ?? edge.source} connects to {nodeById.get(edge.target)?.label ?? edge.target}{edge.label ? `: ${edge.label}` : ""}. Status: {edge.status}.</li>)}
      </ul>
      <ul className="solvys-kit-map__legend" aria-label="Status legend"><li data-status="working">Working</li><li data-status="warning">Needs attention</li><li data-status="blocked">Blocked</li><li data-status="unknown">Unknown</li></ul>
    </figure>
  );
}
