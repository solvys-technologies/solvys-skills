"use client"

import * as React from "react"
import {
  RiAddCircleLine,
  RiLayoutGridLine,
  RiMailAddLine,
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
  CommandItemSecondary,
  CommandItemTitle,
  CommandKbd,
  CommandList,
  CommandMain,
  CommandShortcut,
  CommandTrigger,
  useCommandSize,
} from "@/registry/pro/ui/command"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/pro/ui/tabs"
import { Avatar, AvatarImage, AvatarText } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"

const PEOPLE = [
  {
    name: "Ayla Karagoz",
    handle: "@ayla",
    image: "https://createui.co/avatars/ayla-karagoz.webp",
  },
  {
    name: "Luca Moretti",
    handle: "@moretti",
    image: "https://createui.co/avatars/luca-moretti.webp",
  },
  {
    name: "Yuki Tanaka",
    handle: "@yuki",
    image: "https://createui.co/avatars/yuki-tanaka.webp",
  },
]

function ActionsGroup() {
  return (
    <CommandGroup heading="Actions">
      <CommandItem value="new-chat">
        <CommandItemIcon>
          <RiAddCircleLine />
        </CommandItemIcon>
        <CommandItemContent inline>
          <CommandItemTitle>Start a new chat</CommandItemTitle>
        </CommandItemContent>
        <CommandShortcut>
          <CommandKbd>C</CommandKbd>
        </CommandShortcut>
      </CommandItem>
      <CommandItem value="send-email">
        <CommandItemIcon>
          <RiMailAddLine />
        </CommandItemIcon>
        <CommandItemContent inline>
          <CommandItemTitle>Send an e-mail</CommandItemTitle>
        </CommandItemContent>
        <CommandShortcut>
          <CommandKbd>E</CommandKbd>
        </CommandShortcut>
      </CommandItem>
    </CommandGroup>
  )
}

function PeopleGroup() {
  const size = useCommandSize()
  return (
    <CommandGroup heading="People">
      {PEOPLE.map((person) => (
        <CommandItem key={person.handle} value={person.name} href="#">
          <Avatar size={size === "md" ? "2xs" : "xs"} shape="circle">
            <AvatarImage src={person.image} alt={person.name} />
            <AvatarText>
              {person.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </AvatarText>
          </Avatar>
          <CommandItemContent inline>
            <CommandItemTitle>{person.name}</CommandItemTitle>
            <CommandItemSecondary>{person.handle}</CommandItemSecondary>
          </CommandItemContent>
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

function TabbedSlot({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>
}) {
  const size = useCommandSize()
  return (
    <Tabs
      className="min-h-0 flex-1"
      defaultValue="all"
      variant="horizontal-line"
      indicator="bottom"
      size={size === "md" ? "sm" : "md"}
      onValueChange={() => {
        requestAnimationFrame(() => inputRef.current?.focus())
      }}
    >
      <TabsList
        className={size === "md" ? "px-component-sm" : "px-component-md"}
      >
        <TabsTrigger value="all" leading={<RiLayoutGridLine />}>
          All
        </TabsTrigger>
        <TabsTrigger value="actions" leading={<RiAddCircleLine />}>
          Actions
        </TabsTrigger>
        <TabsTrigger value="people" leading={<RiUser4Line />}>
          People
        </TabsTrigger>
      </TabsList>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <TabsContent value="all" className="mt-0">
          <ActionsGroup />
          <PeopleGroup />
        </TabsContent>
        <TabsContent value="actions" className="mt-0">
          <ActionsGroup />
        </TabsContent>
        <TabsContent value="people" className="mt-0">
          <PeopleGroup />
        </TabsContent>
      </CommandList>
    </Tabs>
  )
}

export default function CommandTabbed() {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <Command open={open} onOpenChange={setOpen}>
      <CommandTrigger asChild>
        <Button variant="neutral-solid" appearance="outline" className="w-fit">
          Open command menu
        </Button>
      </CommandTrigger>
      <CommandContent>
        <CommandMain>
          <CommandInput
            ref={inputRef}
            placeholder="Type a command or search..."
          />
          <TabbedSlot inputRef={inputRef} />
        </CommandMain>
      </CommandContent>
    </Command>
  )
}
