import { StatusBadge } from "@/registry/ui/status-badge"

export default function StatusBadgeWithLabel() {
  return (
    <div className="text-strongest flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <StatusBadge variant="success" />
        <span className="text-sm">Operational</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge variant="warning" />
        <span className="text-sm">Degraded</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge variant="danger" />
        <span className="text-sm">Outage</span>
      </div>
    </div>
  )
}
