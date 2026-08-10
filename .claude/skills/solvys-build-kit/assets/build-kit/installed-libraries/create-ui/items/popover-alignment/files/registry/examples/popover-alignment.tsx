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

const alignments = [
  {
    align: "start",
    title: "Aligned to start",
    description:
      "The panel lines up with the leading edge of the trigger, so it grows toward the end.",
  },
  {
    align: "center",
    title: "Aligned to center",
    description:
      "The panel is centered on the trigger. This is the default alignment.",
  },
  {
    align: "end",
    title: "Aligned to end",
    description:
      "The panel lines up with the trailing edge, handy near the right side of a toolbar.",
  },
] as const

export default function PopoverAlignment() {
  return (
    <div className="gap-component-sm flex flex-wrap items-center">
      {alignments.map((alignment) => (
        <Popover key={alignment.align}>
          <PopoverTrigger asChild>
            <Button variant="neutral-light" appearance="soft" size="sm">
              {alignment.align}
            </Button>
          </PopoverTrigger>
          <PopoverContent align={alignment.align}>
            <PopoverBody>
              <PopoverHeader>
                <PopoverTitle>
                  <RiInformationFill />
                  {alignment.title}
                </PopoverTitle>
                <PopoverDescription>{alignment.description}</PopoverDescription>
              </PopoverHeader>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
