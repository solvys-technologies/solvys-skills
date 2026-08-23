"use client"

import * as React from "react"
import { AppStore, ChatGpt, Clickup } from "@create-ui/assets/brands"
import {
  RiAddCircleLine,
  RiAppsLine,
  RiArrowDownLine,
  RiArrowRightUpLine,
  RiArrowUpLine,
  RiCalendarFill,
  RiCheckFill,
  RiCommandFill,
  RiCornerDownLeftLine,
  RiFileAddFill,
  RiFileCloudLine,
  RiFolderOpenLine,
  RiLayoutGridLine,
  RiMailAddLine,
  RiMenuAddLine,
  RiSparkling2Line,
  RiStickyNoteAddFill,
  RiTaskLine,
  RiUser4Line,
  RiUserAddFill,
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
  CommandItemChevron,
  CommandItemContent,
  CommandItemDescription,
  CommandItemIcon,
  CommandItemLink,
  CommandItemMeta,
  CommandItemSecondary,
  CommandItemTitle,
  CommandKbd,
  CommandList,
  CommandMain,
  CommandShortcut,
  CommandTrigger,
} from "@/registry/pro/ui/command"
import { FeaturedIcon } from "@/registry/pro/ui/featured-icon"
import { FileFormat } from "@/registry/pro/ui/file-format"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/pro/ui/tabs"
import {
  Avatar,
  AvatarBadge,
  AvatarBadgeIcon,
  AvatarBadgePolygon,
  AvatarImage,
  AvatarRing,
  AvatarText,
} from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Chip } from "@/registry/ui/chip"

export default function CommandDemo() {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "k" || !(event.metaKey || event.ctrlKey)) return
      if (event.defaultPrevented) return
      event.preventDefault()
      setOpen((value) => !value)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const recents = ["Design", "Ayla", "Budget", "ClickUp", "Create UI"]

  const websites = [
    {
      value: "app-store",
      logo: <AppStore className="size-10 shrink-0 lg:size-12" />,
      name: "App Store",
      url: "apps.apple.com",
      description:
        "Find apps and games for iPhone, iPad, Mac, and more on the App Store.",
    },
    {
      value: "clickup",
      logo: <Clickup className="size-10 shrink-0 lg:size-12" />,
      name: "ClickUp",
      url: "clickup.com",
      description:
        "Our mission is to make the world more productive. To do this, we built the everything app.",
    },
    {
      value: "chatgpt",
      logo: <ChatGpt className="size-10 shrink-0 lg:size-12" />,
      name: "ChatGPT",
      url: "chatgpt.com",
      description:
        "ChatGPT is your AI chatbot for everyday use. Chat with the most advanced AI today.",
    },
  ]

  const files = [
    {
      value: "deck",
      format: "PPTX",
      name: "Create UI Presentation Deck.pptx",
      size: "867.14 MB",
      date: "June 12, 2026",
      time: "14:42:57",
    },
    {
      value: "sales",
      format: "DOC",
      name: "Sales Document.docx",
      size: "148 KB",
      date: "May 23, 2026",
      time: "01:36:55",
    },
    {
      value: "video",
      format: "MP4",
      name: "Pre-sale launch video.mp4",
      size: "1.76 GB",
      date: "April 06, 2026",
      time: "07:46:12",
    },
  ]

  const people = [
    {
      name: "Ayla Karagoz",
      handle: "@ayla",
      role: "Designer",
      image: "https://createui.co/avatars/ayla-karagoz.webp",
    },
    {
      name: "Luca Moretti",
      handle: "@moretti",
      role: "Front-End Developer",
      image: "https://createui.co/avatars/luca-moretti.webp",
    },
    {
      name: "Yuki Tanaka",
      handle: "@yuki",
      role: "COO",
      image: "https://createui.co/avatars/yuki-tanaka.webp",
    },
  ]

  const notes = [
    "My 2026 habit plans",
    "Create UI Marketing Plan",
    "Q3 / 2026 - OKR Planning",
  ]

  const largeActions = [
    {
      value: "new-project",
      icon: <RiFileAddFill />,
      label: "Create a new project",
      description: "Start from scratch or spin one up from a template.",
      shortcut: "P",
    },
    {
      value: "invite",
      icon: <RiUserAddFill />,
      label: "Invite your teammates",
      description: "Add members to your workspace and set their roles.",
      shortcut: "I",
    },
    {
      value: "sticky",
      icon: <RiStickyNoteAddFill />,
      label: "Create a sticky note",
      description: "Drop a quick note onto your shared canvas.",
      shortcut: "N",
    },
  ]

  const moreLink = (
    <CommandItemLink variant="primary" underline>
      More
    </CommandItemLink>
  )

  const aiGroup = (
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
          <CommandKbd>
            <RiCommandFill />
          </CommandKbd>
          <CommandKbd>M</CommandKbd>
        </CommandShortcut>
      </CommandItem>
    </CommandGroup>
  )

  const recentGroup = (
    <CommandGroup heading="Recent">
      <div className="gap-component-sm p-component-sm flex flex-wrap items-center">
        {recents.map((label) => (
          <Chip
            key={label}
            size="md"
            variant="neutral"
            appearance="soft"
            closable
          >
            {label === "ClickUp" ? <Clickup /> : null}
            {label}
          </Chip>
        ))}
      </div>
    </CommandGroup>
  )

  const actionGroup = (
    <CommandGroup heading="Action">
      <CommandItem value="new-chat">
        <CommandItemIcon>
          <RiAddCircleLine />
        </CommandItemIcon>
        <CommandItemContent inline>
          <CommandItemTitle>Start a new chat</CommandItemTitle>
        </CommandItemContent>
        <CommandShortcut>
          <CommandKbd>
            <RiCommandFill />
          </CommandKbd>
          <CommandKbd>
            <RiArrowUpLine />
          </CommandKbd>
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
          <CommandKbd>
            <RiCommandFill />
          </CommandKbd>
          <CommandKbd>E</CommandKbd>
        </CommandShortcut>
      </CommandItem>
      <CommandItem value="create-task">
        <CommandItemIcon>
          <RiMenuAddLine />
        </CommandItemIcon>
        <CommandItemContent inline>
          <CommandItemTitle>Create a task</CommandItemTitle>
        </CommandItemContent>
        <CommandShortcut>
          <CommandKbd>
            <RiCommandFill />
          </CommandKbd>
          <CommandKbd>T</CommandKbd>
        </CommandShortcut>
      </CommandItem>
    </CommandGroup>
  )

  const websitesGroup = (
    <CommandGroup heading="Websites" action={moreLink}>
      {websites.map((site) => (
        <CommandItem
          key={site.value}
          large
          value={site.value}
          href={`https://${site.url}`}
        >
          {site.logo}
          <CommandItemContent>
            <CommandItemTitle>
              {site.name}
              <span className="text-body inline-flex shrink-0 items-center gap-0.5">
                {site.url}
                <RiArrowRightUpLine className="size-3.5" />
              </span>
            </CommandItemTitle>
            <CommandItemDescription>{site.description}</CommandItemDescription>
          </CommandItemContent>
          <CommandItemChevron />
        </CommandItem>
      ))}
    </CommandGroup>
  )

  const filesGroup = (
    <CommandGroup heading="Files" action={moreLink}>
      {files.map((file) => (
        <CommandItem key={file.value} large value={file.value} href="#">
          <FileFormat
            format={file.format}
            className="size-10 shrink-0 lg:size-12"
          />
          <CommandItemContent>
            <CommandItemTitle>{file.name}</CommandItemTitle>
            <CommandItemMeta className="max-sm:hidden">
              <span>Document</span>
              <span>{file.size}</span>
              <span>{file.date}</span>
              <span>{file.time}</span>
            </CommandItemMeta>
          </CommandItemContent>
          <CommandItemChevron />
        </CommandItem>
      ))}
    </CommandGroup>
  )

  const peopleGroup = (
    <CommandGroup heading="People">
      {people.map((person) => (
        <CommandItem key={person.handle} value={person.name} href="#">
          <Avatar size="xs" shape="circle">
            <AvatarImage src={person.image} alt={person.name} />
            <AvatarText>
              {person.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </AvatarText>
            <AvatarRing variant="progress" value={65} />
            <AvatarBadge position="top">
              <AvatarBadgePolygon color="sky">
                <RiCheckFill />
              </AvatarBadgePolygon>
            </AvatarBadge>
            <AvatarBadge position="bottom">
              <AvatarBadgeIcon shape="rounded" color="violet">
                <RiCalendarFill />
              </AvatarBadgeIcon>
            </AvatarBadge>
          </Avatar>
          <CommandItemContent inline>
            <CommandItemTitle>{person.name}</CommandItemTitle>
            <CommandItemSecondary>{person.handle}</CommandItemSecondary>
          </CommandItemContent>
          <Badge
            variant="neutral"
            appearance="soft"
            size="sm"
            className="max-sm:hidden"
          >
            {person.role}
          </Badge>
        </CommandItem>
      ))}
    </CommandGroup>
  )

  const notesGroup = (
    <CommandGroup heading="Notes">
      {notes.map((note) => (
        <CommandItem key={note} value={note} href="#">
          <CommandItemContent inline>
            <CommandItemTitle>{note}</CommandItemTitle>
          </CommandItemContent>
          <CommandItemChevron />
        </CommandItem>
      ))}
    </CommandGroup>
  )

  const actionLargeGroup = (
    <CommandGroup heading="Action Large">
      {largeActions.map((action) => (
        <CommandItem key={action.value} large value={action.value}>
          <FeaturedIcon
            variant="info"
            size="lg"
            appearance="soft"
            type="stylish"
            shape="circle"
          >
            {action.icon}
          </FeaturedIcon>
          <CommandItemContent>
            <CommandItemTitle>{action.label}</CommandItemTitle>
            <CommandItemDescription className="max-sm:hidden">
              {action.description}
            </CommandItemDescription>
          </CommandItemContent>
          <CommandShortcut>
            <CommandKbd>
              <RiCommandFill />
            </CommandKbd>
            <CommandKbd>{action.shortcut}</CommandKbd>
          </CommandShortcut>
        </CommandItem>
      ))}
    </CommandGroup>
  )

  return (
    <Command size="lg" open={open} onOpenChange={setOpen}>
      <CommandTrigger asChild>
        <Button variant="neutral-solid" appearance="outline" className="w-fit">
          Open command menu
        </Button>
      </CommandTrigger>
      <CommandContent>
        <CommandMain>
          <CommandInput
            ref={inputRef}
            placeholder="Type command, search files, talk with AI..."
          />
          <Tabs
            className="min-h-0 flex-1"
            defaultValue="all"
            variant="horizontal-line"
            indicator="bottom"
            size="md"
            onValueChange={() => {
              requestAnimationFrame(() => inputRef.current?.focus())
            }}
          >
            <TabsList className="px-component-md">
              <TabsTrigger value="all" leading={<RiLayoutGridLine />}>
                All
              </TabsTrigger>
              <TabsTrigger value="projects" leading={<RiFileCloudLine />}>
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="people"
                leading={<RiUser4Line />}
                trailing={
                  <Badge
                    variant="primary"
                    appearance="soft"
                    size="sm"
                    numberOnly
                  >
                    7
                  </Badge>
                }
              >
                People
              </TabsTrigger>
              <TabsTrigger value="files" leading={<RiFolderOpenLine />}>
                Files
              </TabsTrigger>
              <TabsTrigger value="tasks" leading={<RiTaskLine />}>
                Tasks
              </TabsTrigger>
              <TabsTrigger value="tools" leading={<RiAppsLine />}>
                Tools
              </TabsTrigger>
            </TabsList>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <TabsContent value="all" className="mt-0">
                {aiGroup}
                {recentGroup}
                {actionGroup}
                {websitesGroup}
                {filesGroup}
                {peopleGroup}
                {notesGroup}
                {actionLargeGroup}
              </TabsContent>
              <TabsContent value="projects" className="mt-0">
                {websitesGroup}
                {actionLargeGroup}
              </TabsContent>
              <TabsContent value="people" className="mt-0">
                {peopleGroup}
              </TabsContent>
              <TabsContent value="files" className="mt-0">
                {filesGroup}
              </TabsContent>
              <TabsContent value="tasks" className="mt-0">
                {actionGroup}
              </TabsContent>
              <TabsContent value="tools" className="mt-0">
                {aiGroup}
                {recentGroup}
                {notesGroup}
              </TabsContent>
            </CommandList>
          </Tabs>
        </CommandMain>
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
      </CommandContent>
    </Command>
  )
}
