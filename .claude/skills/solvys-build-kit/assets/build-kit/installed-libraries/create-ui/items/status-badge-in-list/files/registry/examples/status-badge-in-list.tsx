import { StatusBadge } from "@/registry/ui/status-badge"

export default function StatusBadgeInList() {
  return (
    <ul className="flex w-64 flex-col gap-3">
      <li className="flex items-center gap-3">
        <StatusBadge variant="success" />
        <span className="text-body text-sm">Ada Lovelace</span>
      </li>
      <li className="flex items-center gap-3">
        <StatusBadge variant="away" />
        <span className="text-body text-sm">Grace Hopper</span>
      </li>
      <li className="flex items-center gap-3">
        <StatusBadge variant="neutral" />
        <span className="text-body text-sm">Alan Turing</span>
      </li>
      <li className="flex items-center gap-3">
        <StatusBadge variant="success" />
        <span className="text-body text-sm">Katherine Johnson</span>
      </li>
    </ul>
  )
}
