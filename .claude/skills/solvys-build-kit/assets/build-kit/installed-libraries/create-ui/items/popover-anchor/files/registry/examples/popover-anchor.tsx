"use client"

import { RiBookOpenLine } from "@create-ui/assets/icons"

import {
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/pro/ui/popover"
import { Button } from "@/registry/ui/button"

export default function PopoverAnchorExample() {
  return (
    <Popover>
      <p className="text-body text-body-sm max-w-xs leading-relaxed">
        Every workspace on the Team plan ships with a{" "}
        <PopoverAnchor asChild>
          <mark className="bg-warning-weakest text-strongest rounded px-0.5 font-medium">
            99.9% SLA
          </mark>
        </PopoverAnchor>
        .{" "}
        <PopoverTrigger asChild>
          <Button variant="neutral-light" appearance="ghost" size="xs">
            What&apos;s this?
          </Button>
        </PopoverTrigger>
      </p>
      <PopoverContent side="bottom">
        <PopoverBody>
          <PopoverHeader>
            <PopoverTitle>
              <RiBookOpenLine />
              Service level agreement
            </PopoverTitle>
            <PopoverDescription>
              The panel points at the highlighted term, not the button that
              opened it, because PopoverAnchor wraps the term.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
