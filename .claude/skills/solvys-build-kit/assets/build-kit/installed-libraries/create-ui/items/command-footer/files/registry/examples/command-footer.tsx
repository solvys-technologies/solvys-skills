"use client"

import * as React from "react"
import {
  RiAddCircleLine,
  RiArrowDownLine,
  RiArrowUpLine,
  RiCommandFill,
  RiCornerDownLeftLine,
  RiMailAddLine,
} from "@create-ui/assets/icons"

import {
  Command,
  CommandContent,
  CommandEmpty,
  CommandFooter,
  CommandFooterItem,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandItemContent,
  CommandItemIcon,
  CommandItemLink,
  CommandItemTitle,
  CommandKbd,
  CommandList,
  CommandMain,
  CommandTrigger,
} from "@/registry/pro/ui/command"
import { Button } from "@/registry/ui/button"

function ActionsList() {
  return (
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Actions">
        <CommandItem value="new-chat">
          <CommandItemIcon>
            <RiAddCircleLine />
          </CommandItemIcon>
          <CommandItemContent inline>
            <CommandItemTitle>Start a new chat</CommandItemTitle>
          </CommandItemContent>
        </CommandItem>
        <CommandItem value="send-email">
          <CommandItemIcon>
            <RiMailAddLine />
          </CommandItemIcon>
          <CommandItemContent inline>
            <CommandItemTitle>Send an e-mail</CommandItemTitle>
          </CommandItemContent>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  )
}

function ShortcutFooter() {
  return (
    <CommandFooter>
      <CommandFooterItem label="Navigate" className="mr-auto">
        <CommandKbd size="md">
          <RiArrowUpLine />
        </CommandKbd>
        <CommandKbd size="md">
          <RiArrowDownLine />
        </CommandKbd>
      </CommandFooterItem>
      <CommandFooterItem label="Open">
        <CommandKbd size="md">
          <RiCornerDownLeftLine />
        </CommandKbd>
      </CommandFooterItem>
      <CommandFooterItem label="Open in New Tab" className="max-sm:hidden">
        <CommandKbd size="md">
          <RiCommandFill />
        </CommandKbd>
        <CommandKbd size="md">
          <RiCornerDownLeftLine />
        </CommandKbd>
      </CommandFooterItem>
      <CommandFooterItem label="Exit">
        <CommandKbd size="md">ESC</CommandKbd>
      </CommandFooterItem>
    </CommandFooter>
  )
}

function HelpFooter() {
  return (
    <CommandFooter>
      <CommandFooterItem label="Navigate">
        <CommandKbd size="md">
          <RiArrowUpLine />
        </CommandKbd>
        <CommandKbd size="md">
          <RiArrowDownLine />
        </CommandKbd>
      </CommandFooterItem>
      <CommandFooterItem label="Open">
        <CommandKbd size="md">
          <RiCornerDownLeftLine />
        </CommandKbd>
      </CommandFooterItem>
      <div className="text-body text-paragraph-xs ml-auto flex items-center gap-1 max-sm:hidden">
        <span>Doesn&apos;t find the correct results?</span>
        <CommandItemLink variant="primary" underline>
          Click here
        </CommandItemLink>
      </div>
    </CommandFooter>
  )
}

function FooterCommand({
  label,
  footer,
}: {
  label: string
  footer: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <Command open={open} onOpenChange={setOpen}>
      <CommandTrigger asChild>
        <Button variant="neutral-solid" appearance="outline" className="w-fit">
          {label}
        </Button>
      </CommandTrigger>
      <CommandContent>
        <CommandMain>
          <CommandInput placeholder="Type a command or search..." />
          <ActionsList />
        </CommandMain>
        {footer}
      </CommandContent>
    </Command>
  )
}

export default function CommandFooterExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <FooterCommand label="Shortcut footer" footer={<ShortcutFooter />} />
      <FooterCommand label="Help footer" footer={<HelpFooter />} />
    </div>
  )
}
