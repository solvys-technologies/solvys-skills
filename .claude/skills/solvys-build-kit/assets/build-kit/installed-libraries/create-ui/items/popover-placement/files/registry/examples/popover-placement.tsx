"use client"

import { RiInformationFill } from "@create-ui/assets/icons"

import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/pro/ui/popover"
import { Button } from "@/registry/ui/button"

const placements = [
  {
    side: "top",
    title: "Above the trigger",
    description:
      "Use top when the trigger sits near the bottom of the viewport.",
  },
  {
    side: "left",
    title: "Beside the trigger",
    description: "Left keeps the panel clear of a right-hand sidebar.",
  },
  {
    side: "bottom",
    title: "Below the trigger",
    description: "Bottom is the default and reads naturally under toolbars.",
  },
  {
    side: "right",
    title: "Beside the trigger",
    description: "Right works well for inline hints next to a form field.",
  },
] as const

export default function PopoverPlacement() {
  return (
    <div className="gap-component-sm flex flex-wrap items-center">
      {placements.map((placement) => (
        <Popover key={placement.side}>
          <PopoverTrigger asChild>
            <Button variant="neutral-light" appearance="soft" size="sm">
              {placement.side}
            </Button>
          </PopoverTrigger>
          <PopoverContent side={placement.side}>
            <PopoverBody>
              <PopoverHeader>
                <PopoverTitle>
                  <RiInformationFill />
                  {placement.title}
                </PopoverTitle>
                <PopoverDescription>{placement.description}</PopoverDescription>
              </PopoverHeader>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
