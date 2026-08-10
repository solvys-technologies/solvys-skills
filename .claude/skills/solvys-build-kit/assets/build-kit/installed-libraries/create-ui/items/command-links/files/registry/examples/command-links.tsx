"use client"

import * as React from "react"
import { RiFileTextLine } from "@create-ui/assets/icons"

import {
  Command,
  CommandContent,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandItemChevron,
  CommandItemContent,
  CommandItemIcon,
  CommandItemTitle,
  CommandList,
  CommandMain,
  CommandTrigger,
} from "@/registry/pro/ui/command"
import { Button } from "@/registry/ui/button"

const NOTES = [
  "My 2026 habit plans",
  "Create UI Marketing Plan",
  "Q3 / 2026 - OKR Planning",
]

export default function CommandLinks() {
  const [open, setOpen] = React.useState(false)
  return (
    <Command open={open} onOpenChange={setOpen}>
      <CommandTrigger asChild>
        <Button variant="neutral-solid" appearance="outline" className="w-fit">
          Open command menu
        </Button>
      </CommandTrigger>
      <CommandContent>
        <CommandMain>
          <CommandInput placeholder="Jump to a note..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Notes">
              <CommandItem value="habits" href="#habits" target="_self">
                <CommandItemIcon>
                  <RiFileTextLine />
                </CommandItemIcon>
                <CommandItemContent inline>
                  <CommandItemTitle>{NOTES[0]}</CommandItemTitle>
                </CommandItemContent>
                <CommandItemChevron />
              </CommandItem>
              <CommandItem value="marketing" href="#marketing" target="_self">
                <CommandItemIcon>
                  <RiFileTextLine />
                </CommandItemIcon>
                <CommandItemContent inline>
                  <CommandItemTitle>{NOTES[1]}</CommandItemTitle>
                </CommandItemContent>
                <CommandItemChevron />
              </CommandItem>
              <CommandItem value="okr" href="#okr" target="_self">
                <CommandItemIcon>
                  <RiFileTextLine />
                </CommandItemIcon>
                <CommandItemContent inline>
                  <CommandItemTitle>{NOTES[2]}</CommandItemTitle>
                </CommandItemContent>
                <CommandItemChevron />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandMain>
      </CommandContent>
    </Command>
  )
}
