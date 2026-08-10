import { AppStoreBadge } from "@/registry/ui/app-store-badge"

export default function AppStoreBadgeInSurface() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg bg-black p-6">
      <div className="flex flex-col gap-1">
        <p className="text-base font-medium text-neutral-50">Get the app</p>
        <p className="text-sm text-neutral-400">
          Take Create UI with you, on any device.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <AppStoreBadge brand="app-store" variant="white" href="#" />
        <AppStoreBadge brand="google-play" variant="white" href="#" />
      </div>
    </div>
  )
}
