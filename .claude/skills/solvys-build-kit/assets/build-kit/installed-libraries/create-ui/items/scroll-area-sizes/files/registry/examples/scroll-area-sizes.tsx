import * as React from "react"

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

function ComponentList() {
  return (
    <div className="p-3">
      {components.map((component) => (
        <React.Fragment key={component}>
          <div>{component}</div>
          <Separator className="my-1.5" />
        </React.Fragment>
      ))}
    </div>
  )
}

export default function ScrollAreaSizes() {
  return (
    <div className="text-strong grid w-full grid-cols-3 gap-4 text-xs">
      <div className="flex flex-col items-center gap-2">
        <ScrollArea size="sm" className="bg-weakest h-48 w-full rounded-md">
          <ComponentList />
        </ScrollArea>
        <span className="font-medium uppercase">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ScrollArea size="md" className="bg-weakest h-48 w-full rounded-md">
          <ComponentList />
        </ScrollArea>
        <span className="font-medium uppercase">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ScrollArea size="lg" className="bg-weakest h-48 w-full rounded-md">
          <ComponentList />
        </ScrollArea>
        <span className="font-medium uppercase">lg</span>
      </div>
    </div>
  )
}
