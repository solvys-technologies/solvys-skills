"use client"

import * as React from "react"
import { RiFolderOpenLine, RiUser4Line } from "@create-ui/assets/icons"

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
  type CommandSize,
} from "@/registry/pro/ui/command"
import { Button } from "@/registry/ui/button"

function Palette({ size, label }: { size: CommandSize; label: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Command size={size} open={open} onOpenChange={setOpen}>
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
              <CommandItem value="people">
                <CommandItemIcon>
                  <RiUser4Line />
                </CommandItemIcon>
                <CommandItemContent inline>
                  <CommandItemTitle>Find people</CommandItemTitle>
                </CommandItemContent>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandMain>
      </CommandContent>
    </Command>
  )
}

export default function CommandSizes() {
  return (
    <div className="flex flex-wrap gap-3">
      <Palette size="md" label="Medium (md)" />
      <Palette size="lg" label="Large (lg)" />
    </div>
  )
}
