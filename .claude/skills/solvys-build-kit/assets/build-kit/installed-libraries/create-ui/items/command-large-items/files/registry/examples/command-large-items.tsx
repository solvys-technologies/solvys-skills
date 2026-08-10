"use client"

import * as React from "react"
import {
  RiFileAddFill,
  RiSparkling2Line,
  RiUserAddFill,
} from "@create-ui/assets/icons"

import {
  Command,
  CommandContent,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandItemContent,
  CommandItemDescription,
  CommandItemIcon,
  CommandItemSecondary,
  CommandItemTitle,
  CommandKbd,
  CommandList,
  CommandMain,
  CommandShortcut,
  CommandTrigger,
} from "@/registry/pro/ui/command"
import { Button } from "@/registry/ui/button"

export default function CommandLargeItems() {
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
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandGroup>
              <CommandItem featured value="ask-ai">
                <CommandItemIcon>
                  <RiSparkling2Line />
                </CommandItemIcon>
                <CommandItemContent inline>
                  <CommandItemTitle>Ask to AI</CommandItemTitle>
                  <CommandItemSecondary>Google Gemini</CommandItemSecondary>
                </CommandItemContent>
                <CommandShortcut>
                  <CommandKbd>M</CommandKbd>
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Create">
              <CommandItem large value="new-project">
                <CommandItemIcon>
                  <RiFileAddFill />
                </CommandItemIcon>
                <CommandItemContent>
                  <CommandItemTitle>Create a new project</CommandItemTitle>
                  <CommandItemDescription>
                    Start from scratch or spin one up from a template.
                  </CommandItemDescription>
                </CommandItemContent>
                <CommandShortcut>
                  <CommandKbd>P</CommandKbd>
                </CommandShortcut>
              </CommandItem>
              <CommandItem large value="invite">
                <CommandItemIcon>
                  <RiUserAddFill />
                </CommandItemIcon>
                <CommandItemContent>
                  <CommandItemTitle>Invite your teammates</CommandItemTitle>
                  <CommandItemDescription>
                    Add members to your workspace and set their roles.
                  </CommandItemDescription>
                </CommandItemContent>
                <CommandShortcut>
                  <CommandKbd>I</CommandKbd>
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandMain>
      </CommandContent>
    </Command>
  )
}
