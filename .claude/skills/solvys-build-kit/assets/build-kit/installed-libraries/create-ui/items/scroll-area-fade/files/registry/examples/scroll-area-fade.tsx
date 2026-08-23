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

export default function ScrollAreaFade() {
  return (
    <ScrollArea fade className="bg-static text-strong h-72 w-48 rounded-md">
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
  )
}
