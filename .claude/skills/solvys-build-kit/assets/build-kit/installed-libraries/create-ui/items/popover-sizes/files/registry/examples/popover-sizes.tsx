"use client"

import { RiSparklingFill } from "@create-ui/assets/icons"

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

const tips = [
  {
    size: "sm",
    label: "Small",
    title: "Quick tip",
    description: "Press ⌘K anywhere to jump to a page or run a command.",
  },
  {
    size: "md",
    label: "Medium",
    title: "Save your view",
    description:
      "Filters and sorting are remembered per board, so your team always lands where they left off.",
  },
  {
    size: "lg",
    label: "Large",
    title: "Roles and access",
    description:
      "Members can edit content, while viewers get read-only access. Change a role anytime from the members panel without losing their history.",
  },
] as const

export default function PopoverSizes() {
  return (
    <div className="gap-component-sm flex flex-wrap items-center">
      {tips.map((tip) => (
        <Popover key={tip.size}>
          <PopoverTrigger asChild>
            <Button variant="neutral-light" appearance="soft" size="sm">
              {tip.label}
            </Button>
          </PopoverTrigger>
          <PopoverContent size={tip.size}>
            <PopoverBody>
              <PopoverHeader>
                <PopoverTitle>
                  <RiSparklingFill />
                  {tip.title}
                </PopoverTitle>
                <PopoverDescription>{tip.description}</PopoverDescription>
              </PopoverHeader>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
