"use client"

import * as React from "react"
import {
  RiCheckFill,
  RiFileCloudLine,
  RiFolderOpenLine,
  RiLayoutGridLine,
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
  CommandList,
  CommandMain,
  CommandTrigger,
} from "@/registry/pro/ui/command"
import { Avatar, AvatarImage, AvatarText } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { CountryFlag } from "@/registry/ui/country-flag"
import { Progress } from "@/registry/ui/progress"
import { StatusBadge } from "@/registry/ui/status-badge"

const PROJECTS = [
  { value: "alpha", name: "Project Alpha", progress: 72, variant: "success" },
  { value: "orbit", name: "Orbit Redesign", progress: 45, variant: "primary" },
  { value: "atlas", name: "Atlas Migration", progress: 18, variant: "warning" },
] as const

const TEAM = [
  {
    name: "Ayla Karagoz",
    handle: "@ayla",
    presence: "success",
    label: "Online",
    image: "https://createui.co/avatars/ayla-karagoz.webp",
  },
  {
    name: "Luca Moretti",
    handle: "@moretti",
    presence: "away",
    label: "Away",
    image: "https://createui.co/avatars/luca-moretti.webp",
  },
  {
    name: "Yuki Tanaka",
    handle: "@yuki",
    presence: "neutral",
    label: "Offline",
    image: "https://createui.co/avatars/yuki-tanaka.webp",
  },
] as const

const LANGUAGES = [
  {
    value: "english",
    code: "US",
    name: "English",
    region: "United States",
    active: true,
  },
  {
    value: "german",
    code: "DE",
    name: "German",
    region: "Germany",
    active: false,
  },
  {
    value: "turkish",
    code: "TR",
    name: "Turkish",
    region: "Türkiye",
    active: false,
  },
]

const PROJECT_ICON = {
  alpha: <RiFileCloudLine />,
  orbit: <RiLayoutGridLine />,
  atlas: <RiFolderOpenLine />,
} as const

export default function CommandCustom() {
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
            placeholder="Search projects, people, languages..."
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {/* Progress in the slot */}
            <CommandGroup heading="Projects">
              {PROJECTS.map((project) => (
                <CommandItem key={project.value} value={project.value} href="#">
                  <CommandItemIcon>
                    {PROJECT_ICON[project.value]}
                  </CommandItemIcon>
                  <CommandItemContent inline>
                    <CommandItemTitle>{project.name}</CommandItemTitle>
                  </CommandItemContent>
                  <div className="gap-component-sm ml-auto flex items-center">
                    <Progress
                      value={project.progress}
                      variant={project.variant}
                      size="sm"
                      className="w-24 max-sm:hidden"
                    />
                    <CommandItemSecondary>
                      {project.progress}%
                    </CommandItemSecondary>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            {/* StatusBadge in the slot */}
            <CommandGroup heading="Team">
              {TEAM.map((person) => (
                <CommandItem key={person.handle} value={person.handle} href="#">
                  <Avatar size="xs" shape="circle">
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
                  <div className="gap-component-sm ml-auto flex items-center">
                    <StatusBadge variant={person.presence} />
                    <CommandItemSecondary className="max-sm:hidden">
                      {person.label}
                    </CommandItemSecondary>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            {/* CountryFlag in the slot */}
            <CommandGroup heading="Languages">
              {LANGUAGES.map((lang) => (
                <CommandItem key={lang.value} value={lang.value}>
                  <CountryFlag code={lang.code} className="size-6 shrink-0" />
                  <CommandItemContent inline>
                    <CommandItemTitle>{lang.name}</CommandItemTitle>
                    <CommandItemSecondary>{lang.region}</CommandItemSecondary>
                  </CommandItemContent>
                  {lang.active && (
                    <CommandItemIcon className="text-primary-base ml-auto">
                      <RiCheckFill />
                    </CommandItemIcon>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandMain>
      </CommandContent>
    </Command>
  )
}
