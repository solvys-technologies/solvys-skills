import { AppStoreBadge } from "@/registry/ui/app-store-badge"

export default function AppStoreBadgeBrands() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white p-4">
      <AppStoreBadge brand="app-store" href="#" />
      <AppStoreBadge brand="google-play" href="#" />
      <AppStoreBadge brand="galaxy-store" href="#" />
      <AppStoreBadge brand="shopify-store" href="#" />
      <AppStoreBadge brand="spotify" href="#" />
      <AppStoreBadge brand="add-on" href="#" />
      <AppStoreBadge brand="chrome-web-store" href="#" />
      <AppStoreBadge brand="app-gallery" href="#" />
      <AppStoreBadge brand="windows" href="#" />
      <AppStoreBadge brand="amazon-store" href="#" />
      <AppStoreBadge brand="microsoft" href="#" />
      <AppStoreBadge brand="youtube-music" href="#" />
    </div>
  )
}
