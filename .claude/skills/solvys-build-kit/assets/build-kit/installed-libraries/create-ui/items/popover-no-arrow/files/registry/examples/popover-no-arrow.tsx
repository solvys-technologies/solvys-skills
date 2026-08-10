"use client"

import { RiInformationLine } from "@create-ui/assets/icons"

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

export default function PopoverNoArrow() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Storage
        </Button>
      </PopoverTrigger>
      <PopoverContent showArrow={false}>
        <PopoverBody>
          <PopoverHeader>
            <PopoverTitle>
              <RiInformationLine />
              Plan usage
            </PopoverTitle>
            <PopoverDescription>
              You have used 4.2 GB of 10 GB. Without the arrow the panel reads
              as a floating menu rather than a callout tied to one point.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
