"use client"

import * as React from "react"
import { RiFolderOpenLine, RiSettings3Line } from "@create-ui/assets/icons"

import {
  Command,
  CommandContent,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandItemContent,
  CommandItemIcon,
  CommandItemTitle,
  CommandList,
  CommandMain,
  CommandTrigger,
  type CommandBackdrop,
} from "@/registry/pro/ui/command"
import { Button } from "@/registry/ui/button"

function Palette({
  backdrop,
  label,
}: {
  backdrop: CommandBackdrop
  label: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <Command backdrop={backdrop} open={open} onOpenChange={setOpen}>
      <CommandTrigger asChild>
        <Button variant="neutral-solid" appearance="outline" className="w-fit">
          {label}
        </Button>
      </CommandTrigger>
      <CommandContent>
        <CommandMain>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigate">
              <CommandItem value="files">
                <CommandItemIcon>
                  <RiFolderOpenLine />
                </CommandItemIcon>
                <CommandItemContent inline>
                  <CommandItemTitle>Open files</CommandItemTitle>
                </CommandItemContent>
              </CommandItem>
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

export default function CommandBackdrop() {
  return (
    <div className="flex flex-wrap gap-3">
      <Palette backdrop="blur" label="Blur" />
      <Palette backdrop="opaque" label="Opaque" />
      <Palette backdrop="transparent" label="Transparent" />
    </div>
  )
}
