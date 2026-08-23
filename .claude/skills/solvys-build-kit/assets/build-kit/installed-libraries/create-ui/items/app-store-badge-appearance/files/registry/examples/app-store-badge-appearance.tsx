import { AppStoreBadge } from "@/registry/ui/app-store-badge"

export default function AppStoreBadgeAppearance() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <AppStoreBadge brand="app-store" appearance="filled" href="#" />
      <AppStoreBadge brand="app-store" appearance="outline" href="#" />
    </div>
  )
}
