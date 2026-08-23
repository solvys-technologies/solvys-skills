"use client"

import * as React from "react"
import { RiNotification3Line } from "@create-ui/assets/icons"

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

export default function PopoverControlled() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="gap-component-sm flex items-center">
      <Button variant="neutral-solid" size="sm" onClick={() => setOpen(true)}>
        Show notifications
      </Button>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="neutral-light" appearance="soft" size="sm">
            {open ? "Hide" : "Inbox"}
          </Button>
        </PopoverTrigger>
        <PopoverContent size="md">
          <PopoverBody>
            <PopoverHeader>
              <PopoverTitle>
                <RiNotification3Line />3 new notifications
              </PopoverTitle>
              <PopoverDescription>
                Drive the panel from your own state so a button outside the
                trigger can open or close it.
              </PopoverDescription>
            </PopoverHeader>
            <PopoverFooter>
              <PopoverActionText>Updated just now</PopoverActionText>
              <PopoverActions>
                <PopoverClose asChild>
                  <Button variant="neutral-solid" size="xs">
                    Mark all read
                  </Button>
                </PopoverClose>
              </PopoverActions>
            </PopoverFooter>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  )
}
