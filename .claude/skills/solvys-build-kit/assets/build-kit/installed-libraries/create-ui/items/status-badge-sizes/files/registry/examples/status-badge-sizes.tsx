import { StatusBadge } from "@/registry/ui/status-badge"

export default function StatusBadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <StatusBadge size="xs" />
      <StatusBadge size="sm" />
      <StatusBadge size="md" />
    </div>
  )
}
