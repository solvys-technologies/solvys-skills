import { AppStoreBadge } from "@/registry/ui/app-store-badge"

export default function AppStoreBadgeVariants() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-xl bg-white p-6">
        <AppStoreBadge brand="app-store" variant="black" href="#" />
      </div>
      <div className="rounded-xl bg-black p-6">
        <AppStoreBadge brand="app-store" variant="white" href="#" />
      </div>
    </div>
  )
}
