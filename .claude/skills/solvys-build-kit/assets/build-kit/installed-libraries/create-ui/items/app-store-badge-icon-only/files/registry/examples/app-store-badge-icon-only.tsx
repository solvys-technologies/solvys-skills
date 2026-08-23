import { AppStoreBadge } from "@/registry/ui/app-store-badge"

export default function AppStoreBadgeIconOnly() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white p-4">
      <AppStoreBadge
        brand="app-store"
        iconOnly
        href="#"
        aria-label="Download on the App Store"
      />
      <AppStoreBadge
        brand="google-play"
        iconOnly
        href="#"
        aria-label="Get it on Google Play"
      />
      <AppStoreBadge
        brand="spotify"
        iconOnly
        href="#"
        aria-label="Listen on Spotify"
      />
    </div>
  )
}
