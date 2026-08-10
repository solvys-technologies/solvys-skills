"use client"

import * as React from "react"
import {
  RiFolderOpenLine,
  RiSettings3Line,
  RiUser4Line,
} from "@create-ui/assets/icons"

import {
  Command,
  CommandContent,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandItemContent,
  CommandItemIcon,
  CommandItemLink,
  CommandItemTitle,
  CommandList,
  CommandMain,
  CommandTrigger,
} from "@/registry/pro/ui/command"
import { Button } from "@/registry/ui/button"

export default function CommandGroups() {
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
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup
              heading="Workspace"
              action={
                <CommandItemLink variant="primary" underline>
                  More
                </CommandItemLink>
              }
            >
              <CommandItem value="files">
                <CommandItemIcon>
                  <RiFolderOpenLine />
                </CommandItemIcon>
                <CommandItemContent inline>
                  <CommandItemTitle>Open files</CommandItemTitle>
                </CommandItemContent>
              </CommandItem>
              <CommandItem value="people">
                <CommandItemIcon>
                  <RiUser4Line />
                </CommandItemIcon>
                <CommandItemContent inline>
                  <CommandItemTitle>Find people</CommandItemTitle>
                </CommandItemContent>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Preferences">
              <CommandItem value="settings">
                <CommandItemIcon>
                  <RiSettings3Line />
                </CommandItemIcon>
                <CommandItemContent inline>
                  <CommandItemTitle>Settings</CommandItemTitle>
                </CommandItemContent>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandMain>
      </CommandContent>
    </Command>
  )
}
