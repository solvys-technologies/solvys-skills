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
} from "@/registry/pro/ui/command"
import { Button } from "@/registry/ui/button"
import { Spinner } from "@/registry/ui/spinner"

function EmptyState() {
  const [open, setOpen] = React.useState(false)
  return (
    <Command open={open} onOpenChange={setOpen}>
      <CommandTrigger asChild>
        <Button variant="neutral-solid" appearance="outline" className="w-fit">
          Empty state
        </Button>
      </CommandTrigger>
      <CommandContent>
        <CommandMain>
          <CommandInput placeholder="Try searching for xyz..." />
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

function LoadingState() {
  const [open, setOpen] = React.useState(false)
  return (
    <Command open={open} onOpenChange={setOpen}>
      <CommandTrigger asChild>
        <Button variant="neutral-solid" appearance="outline" className="w-fit">
          Loading state
        </Button>
      </CommandTrigger>
      <CommandContent>
        <CommandMain>
          <CommandInput placeholder="Searching..." />
          <CommandList>
            {/* The list is a free slot: drop an async loader straight in. */}
            <div className="text-placeholder gap-component-sm flex flex-col items-center justify-center py-12">
              <Spinner size="lg" variant="neutral" />
              <span className="text-paragraph-sm">Searching…</span>
            </div>
          </CommandList>
        </CommandMain>
      </CommandContent>
    </Command>
  )
}

export default function CommandStates() {
  return (
    <div className="flex flex-wrap gap-3">
      <EmptyState />
      <LoadingState />
    </div>
  )
}
