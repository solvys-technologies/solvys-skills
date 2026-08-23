import * as React from "react"
import Image from "next/image"

import { Example, ExampleWrapper } from "@/registry/components/example"
import { ScrollArea } from "@/registry/ui/scroll-area"
import { Separator } from "@/registry/ui/separator"

const components = [
  "Accordion",
  "Alert Banner",
  "App Store Badge",
  "Aspect Ratio",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Button",
  "Button Group",
  "Checkbox",
  "Checkbox Group",
  "Chip",
  "Close Button",
  "Command",
  "Country Flag",
  "Credit Card Input",
  "Date Input",
  "Dialog",
  "Dropdown Menu",
  "Field",
  "Info Tooltip",
  "Inline Alert",
  "Input",
  "Input Group",
  "Input OTP",
  "Input Stepper",
  "Label",
  "Modal",
  "Pagination",
  "Password Strength",
  "Phone Input",
  "Popover",
  "Progress",
  "Radio",
  "Radio Group",
  "Scroll Area",
  "Segmented Control",
  "Select",
  "Separator",
  "Social Login Button",
  "Spinner",
  "Status Badge",
  "Switch",
  "Switch Group",
  "Tab Menu",
  "Text Link",
  "Textarea",
  "Toast",
  "Tooltip",
]

const works = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyav",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
] as const

const sizes = ["sm", "md", "lg"] as const
const appearances = ["filled", "ghost"] as const

export default function ScrollAreaExample() {
  return (
    <ExampleWrapper>
      <ScrollAreaVertical />
      <ScrollAreaHorizontal />
      <ScrollAreaBoth />
      <ScrollAreaVerticalFade />
      <ScrollAreaHorizontalFade />
      <ScrollAreaBothFade />
      {appearances.map((appearance) => (
        <ScrollAreaVerticalSizes
          key={`v-${appearance}`}
          appearance={appearance}
        />
      ))}
      {appearances.map((appearance) => (
        <ScrollAreaHorizontalSizes
          key={`h-${appearance}`}
          appearance={appearance}
        />
      ))}
    </ExampleWrapper>
  )
}

function ScrollAreaVertical() {
  return (
    <Example title="Vertical">
      <ScrollArea className="mx-auto h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Components</h4>
          {components.map((component) => (
            <React.Fragment key={component}>
              <div className="text-sm">{component}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </Example>
  )
}

function ScrollAreaHorizontal() {
  return (
    <Example title="Horizontal">
      <ScrollArea
        orientation="horizontal"
        className="mx-auto w-full max-w-96 rounded-md border p-4"
      >
        <div className="flex gap-4">
          {works.map((artwork) => (
            <figure key={artwork.artist} className="shrink-0">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  className="aspect-[3/4] h-fit w-fit object-cover"
                  width={300}
                  height={400}
                />
              </div>
              <figcaption className="text-body pt-2 text-xs">
                Photo by{" "}
                <span className="text-strongest font-semibold">
                  {artwork.artist}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </ScrollArea>
    </Example>
  )
}

function ScrollAreaBoth() {
  return (
    <Example title="Vertical + Horizontal">
      <ScrollArea
        orientation="both"
        className="mx-auto h-72 w-full max-w-96 rounded-md border"
      >
        <div className="w-[640px] p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">
            Release matrix
          </h4>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="bg-weak text-strongest flex h-16 items-center justify-center rounded-md text-xs font-medium"
              >
                v1.{Math.floor(i / 6)}.{i % 6}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </Example>
  )
}

function ScrollAreaVerticalFade() {
  return (
    <Example title="Vertical · Fade">
      <ScrollArea fade className="mx-auto h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Components</h4>
          {components.map((component) => (
            <React.Fragment key={component}>
              <div className="text-sm">{component}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </Example>
  )
}

function ScrollAreaHorizontalFade() {
  return (
    <Example title="Horizontal · Fade">
      <ScrollArea
        orientation="horizontal"
        fade
        className="mx-auto w-full max-w-96 rounded-md border p-4"
      >
        <div className="flex gap-4">
          {works.map((artwork) => (
            <figure key={artwork.artist} className="shrink-0">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  className="aspect-[3/4] h-fit w-fit object-cover"
                  width={300}
                  height={400}
                />
              </div>
              <figcaption className="text-body pt-2 text-xs">
                Photo by{" "}
                <span className="text-strongest font-semibold">
                  {artwork.artist}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </ScrollArea>
    </Example>
  )
}

function ScrollAreaBothFade() {
  return (
    <Example title="Vertical + Horizontal · Fade">
      <ScrollArea
        orientation="both"
        fade
        className="mx-auto h-72 w-full max-w-96 rounded-md border"
      >
        <div className="w-[640px] p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">
            Release matrix
          </h4>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="bg-weak text-strongest flex h-16 items-center justify-center rounded-md text-xs font-medium"
              >
                v1.{Math.floor(i / 6)}.{i % 6}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </Example>
  )
}

function ScrollAreaVerticalSizes({
  appearance,
}: {
  appearance: (typeof appearances)[number]
}) {
  return (
    <Example
      title={`Vertical · ${appearance.charAt(0).toUpperCase() + appearance.slice(1)}`}
    >
      <div className="grid w-full grid-cols-3 gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <ScrollArea
              size={size}
              appearance={appearance}
              className="h-48 w-full rounded-md border"
            >
              <div className="p-3">
                {components.slice(0, 20).map((component) => (
                  <React.Fragment key={component}>
                    <div className="text-xs">{component}</div>
                    <Separator className="my-1.5" />
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
            <span className="text-body text-[11px] font-medium uppercase">
              {size}
            </span>
          </div>
        ))}
      </div>
    </Example>
  )
}

function ScrollAreaHorizontalSizes({
  appearance,
}: {
  appearance: (typeof appearances)[number]
}) {
  return (
    <Example
      title={`Horizontal · ${appearance.charAt(0).toUpperCase() + appearance.slice(1)}`}
    >
      <div className="flex w-full flex-col gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-1.5">
            <span className="text-body text-[11px] font-medium uppercase">
              {size}
            </span>
            <ScrollArea
              orientation="horizontal"
              size={size}
              appearance={appearance}
              className="w-full rounded-md border"
            >
              <div className="flex gap-3 p-3">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-weak text-strongest flex h-16 w-24 shrink-0 items-center justify-center rounded-md text-xs font-medium"
                  >
                    Item {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
    </Example>
  )
}
