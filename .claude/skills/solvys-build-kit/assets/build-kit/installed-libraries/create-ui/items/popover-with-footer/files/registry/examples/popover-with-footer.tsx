"use client"

import { RiSparklingFill } from "@create-ui/assets/icons"

import {
  Popover,
  PopoverActions,
  PopoverActionText,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/pro/ui/popover"
import { Button } from "@/registry/ui/button"

export default function PopoverWithFooter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Start tour
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <PopoverHeader>
            <PopoverTitle>
              <RiSparklingFill />
              Invite your team
            </PopoverTitle>
            <PopoverDescription>
              Add teammates from the members panel to share boards and hand off
              work.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <PopoverActionText>Step 2 of 4</PopoverActionText>
            <PopoverActions>
              <Button variant="neutral-light" appearance="ghost" size="xs">
                Skip
              </Button>
              <PopoverClose asChild>
                <Button variant="neutral-solid" size="xs">
                  Next
                </Button>
              </PopoverClose>
            </PopoverActions>
          </PopoverFooter>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
