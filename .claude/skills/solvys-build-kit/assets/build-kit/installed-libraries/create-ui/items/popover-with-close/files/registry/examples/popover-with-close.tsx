"use client"

import { RiCommandLine } from "@create-ui/assets/icons"

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

export default function PopoverWithClose() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Show shortcut
        </Button>
      </PopoverTrigger>
      <PopoverContent showClose>
        <PopoverBody>
          <PopoverHeader>
            <PopoverTitle>
              <RiCommandLine />
              Command palette
            </PopoverTitle>
            <PopoverDescription>
              Press ⌘K to search pages and run actions. Dismiss this with the
              corner button.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
