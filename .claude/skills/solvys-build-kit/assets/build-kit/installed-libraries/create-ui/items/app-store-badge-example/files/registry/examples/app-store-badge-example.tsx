"use client"

import { Example, ExampleWrapper } from "@/registry/components/example"
import { AppStoreBadge } from "@/registry/ui/app-store-badge"

const allBrands = [
  "app-store",
  "google-play",
  "galaxy-store",
  "shopify-store",
  "spotify",
  "add-on",
  "chrome-web-store",
  "app-gallery",
  "windows",
  "amazon-store",
  "microsoft",
  "youtube-music",
] as const

export default function AppStoreBadgeExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <FilledBlack />
      <FilledWhite />
      <OutlinedBlack />
      <OutlinedWhite />
      <IconOnly />
      <AsChildLink />
    </ExampleWrapper>
  )
}

function FilledBlack() {
  return (
    <Example title="Filled Black">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <AppStoreBadge
            key={brand}
            brand={brand}
            variant="black"
            appearance="filled"
            href="#"
          />
        ))}
      </div>
    </Example>
  )
}

function FilledWhite() {
  return (
    <Example title="Filled White">
      <div className="flex flex-wrap gap-2 rounded-lg bg-neutral-950 p-4">
        {allBrands.map((brand) => (
          <AppStoreBadge
            key={brand}
            brand={brand}
            variant="white"
            appearance="filled"
            href="#"
          />
        ))}
      </div>
    </Example>
  )
}

function OutlinedBlack() {
  return (
    <Example title="Outlined Black">
      <div className="flex flex-wrap gap-2">
        <AppStoreBadge
          brand="app-store"
          variant="black"
          appearance="outline"
          href="#"
        />
        <AppStoreBadge
          brand="google-play"
          variant="black"
          appearance="outline"
          href="#"
        />
        <AppStoreBadge
          brand="spotify"
          variant="black"
          appearance="outline"
          href="#"
        />
        <AppStoreBadge
          brand="microsoft"
          variant="black"
          appearance="outline"
          href="#"
        />
      </div>
    </Example>
  )
}

function OutlinedWhite() {
  return (
    <Example title="Outlined White">
      <div className="bg-static-black flex flex-wrap gap-2 rounded-lg p-4">
        <AppStoreBadge
          brand="app-store"
          variant="white"
          appearance="outline"
          href="#"
        />
        <AppStoreBadge
          brand="google-play"
          variant="white"
          appearance="outline"
          href="#"
        />
        <AppStoreBadge
          brand="spotify"
          variant="white"
          appearance="outline"
          href="#"
        />
        <AppStoreBadge
          brand="microsoft"
          variant="white"
          appearance="outline"
          href="#"
        />
        <AppStoreBadge
          brand="galaxy-store"
          variant="white"
          appearance="outline"
          href="#"
        />
      </div>
    </Example>
  )
}

function IconOnly() {
  return (
    <Example title="Icon Only">
      <div className="flex flex-wrap gap-2">
        <AppStoreBadge
          brand="app-store"
          variant="black"
          appearance="filled"
          iconOnly
          href="#"
        />
        <AppStoreBadge
          brand="google-play"
          variant="black"
          appearance="filled"
          iconOnly
          href="#"
        />
        <AppStoreBadge
          brand="spotify"
          variant="black"
          appearance="filled"
          iconOnly
          href="#"
        />
        <AppStoreBadge
          brand="windows"
          variant="black"
          appearance="filled"
          iconOnly
          href="#"
        />
      </div>
    </Example>
  )
}

function AsChildLink() {
  return (
    <Example title="asChild — slot into anchor / Link">
      <div className="flex flex-wrap gap-2">
        <AppStoreBadge
          asChild
          brand="app-store"
          variant="black"
          appearance="filled"
        >
          <a
            href="https://apps.apple.com"
            aria-label="Download on the App Store"
          />
        </AppStoreBadge>
        <AppStoreBadge
          asChild
          brand="google-play"
          variant="black"
          appearance="outline"
        >
          <a
            href="https://play.google.com"
            aria-label="Get it on Google Play"
          />
        </AppStoreBadge>
        <AppStoreBadge
          asChild
          brand="spotify"
          variant="black"
          appearance="filled"
        >
          <a href="https://spotify.com" aria-label="Listen on Spotify" />
        </AppStoreBadge>
        <AppStoreBadge
          asChild
          brand="microsoft"
          variant="black"
          appearance="filled"
          iconOnly
        >
          <a href="https://microsoft.com" aria-label="Get it from Microsoft" />
        </AppStoreBadge>
      </div>
    </Example>
  )
}
