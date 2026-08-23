import { StatusBadge } from "@/registry/ui/status-badge"

export default function StatusBadgeInAvatar() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative">
        <div className="from-light to-weak size-10 rounded-full bg-gradient-to-br" />
        <StatusBadge variant="success" className="absolute right-0 bottom-0" />
      </div>
      <div className="relative">
        <div className="from-light to-weak size-10 rounded-full bg-gradient-to-br" />
        <StatusBadge variant="away" className="absolute right-0 bottom-0" />
      </div>
      <div className="relative">
        <div className="from-light to-weak size-10 rounded-full bg-gradient-to-br" />
        <StatusBadge variant="neutral" className="absolute right-0 bottom-0" />
      </div>
    </div>
  )
}
