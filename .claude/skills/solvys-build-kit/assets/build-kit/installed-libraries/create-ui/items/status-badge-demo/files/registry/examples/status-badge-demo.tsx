import { StatusBadge } from "@/registry/ui/status-badge"

export default function StatusBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <StatusBadge variant="success" />
        <span className="text-body text-sm">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge variant="away" />
        <span className="text-body text-sm">Away</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge variant="danger" />
        <span className="text-body text-sm">Offline</span>
      </div>
    </div>
  )
}
