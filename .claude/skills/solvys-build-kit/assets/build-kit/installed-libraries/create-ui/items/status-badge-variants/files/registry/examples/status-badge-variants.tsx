import { StatusBadge } from "@/registry/ui/status-badge"

export default function StatusBadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <StatusBadge variant="primary" />
      <StatusBadge variant="danger" />
      <StatusBadge variant="success" />
      <StatusBadge variant="warning" />
      <StatusBadge variant="info" />
      <StatusBadge variant="highlighted" />
      <StatusBadge variant="away" />
      <StatusBadge variant="verified" />
      <StatusBadge variant="cyan" />
      <StatusBadge variant="lime" />
      <StatusBadge variant="neutral" />
      <div className="flex items-center rounded-sm bg-black p-2 dark:p-0">
        <StatusBadge variant="white" />
      </div>
    </div>
  )
}
