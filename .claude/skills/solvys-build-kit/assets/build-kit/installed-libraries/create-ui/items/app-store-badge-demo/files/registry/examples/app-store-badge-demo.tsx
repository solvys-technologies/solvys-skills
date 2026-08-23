import { AppStoreBadge } from "@/registry/ui/app-store-badge"

export default function AppStoreBadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <AppStoreBadge brand="app-store" href="#" iconOnly />
        <AppStoreBadge
          brand="app-gallery"
          href="#"
          variant="black"
          appearance="outline"
        />
        <AppStoreBadge brand="chrome-web-store" href="#" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <AppStoreBadge brand="windows" href="#" iconOnly />
        <AppStoreBadge brand="google-play" href="#" />
        <AppStoreBadge brand="microsoft" href="#" />
        <AppStoreBadge
          brand="amazon-store"
          href="#"
          variant="black"
          appearance="outline"
        />
        <AppStoreBadge brand="spotify" href="#" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <AppStoreBadge
          brand="youtube-music"
          href="#"
          variant="black"
          appearance="outline"
        />
        <AppStoreBadge brand="galaxy-store" href="#" />
        <AppStoreBadge brand="shopify-store" href="#" iconOnly />
      </div>
    </div>
  )
}
