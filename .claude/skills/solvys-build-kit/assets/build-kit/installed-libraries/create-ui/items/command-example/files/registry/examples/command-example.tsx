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

import { Example, ExampleWrapper } from "@/registry/components/example"
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
  useCommandSize,
  type CommandBackdrop,
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
import { CountryFlag } from "@/registry/ui/country-flag"
import { Progress } from "@/registry/ui/progress"
import { Spinner } from "@/registry/ui/spinner"
import { StatusBadge } from "@/registry/ui/status-badge"

export default function CommandExample() {
  return (
    <ExampleWrapper>
      <CommandShowcase />
      <CommandHelpFooter />
      <CommandBackdrops />
      <CommandCustomContent />
      <CommandLoadingState />
    </ExampleWrapper>
  )
}

const RECENTS = ["Design", "Ayla", "Budget", "ClickUp", "Create UI"]

const PEOPLE = [
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
] as const

const NOTES = [
  "My 2026 habit plans",
  "Create UI Marketing Plan",
  "Q3 / 2026 - OKR Planning",
]

function AiGroup() {
  return (
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
}

function RecentGroup() {
  return (
    <CommandGroup heading="Recent">
      <div className="gap-component-sm p-component-sm flex flex-wrap items-center">
        {RECENTS.map((label) => (
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
}

function ActionGroup() {
  return (
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
}

function WebsitesGroup() {
  return (
    <CommandGroup heading="Websites" action={<MoreLink />}>
      <WebsiteItem
        value="app-store"
        logo={<AppStore className="size-10 shrink-0 lg:size-12" />}
        name="App Store"
        url="apps.apple.com"
        description="Find apps and games for iPhone, iPad, Mac, and more on the App Store."
      />
      <WebsiteItem
        value="clickup"
        logo={<Clickup className="size-10 shrink-0 lg:size-12" />}
        name="ClickUp"
        url="clickup.com"
        description="Our mission is to make the world more productive. To do this, we built the everything app."
      />
      <WebsiteItem
        value="chatgpt"
        logo={<ChatGpt className="size-10 shrink-0 lg:size-12" />}
        name="ChatGPT"
        url="chatgpt.com"
        description="ChatGPT is your AI chatbot for everyday use. Chat with the most advanced AI today."
      />
    </CommandGroup>
  )
}

function FilesGroup() {
  return (
    <CommandGroup heading="Files" action={<MoreLink />}>
      <FileItem
        value="deck"
        format="PPTX"
        name="Create UI Presentation Deck.pptx"
        size="867.14 MB"
        date="June 12, 2026"
        time="14:42:57"
      />
      <FileItem
        value="sales"
        format="DOC"
        name="Sales Document.docx"
        size="148 KB"
        date="May 23, 2026"
        time="01:36:55"
      />
      <FileItem
        value="video"
        format="MP4"
        name="Pre-sale launch video.mp4"
        size="1.76 GB"
        date="April 06, 2026"
        time="07:46:12"
      />
    </CommandGroup>
  )
}

function PeopleGroup() {
  return (
    <CommandGroup heading="People">
      {PEOPLE.map((person) => (
        <PersonItem key={person.handle} {...person} />
      ))}
    </CommandGroup>
  )
}

function NotesGroup() {
  return (
    <CommandGroup heading="Notes">
      {NOTES.map((note) => (
        <CommandItem key={note} value={note} href="#">
          <CommandItemContent inline>
            <CommandItemTitle>{note}</CommandItemTitle>
          </CommandItemContent>
          <CommandItemChevron />
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

function ActionLargeGroup() {
  return (
    <CommandGroup heading="Action Large">
      <ActionLargeItem
        value="new-project"
        icon={<RiFileAddFill />}
        label="Create a new project"
        description="Start from scratch or spin one up from a template."
        shortcut="P"
      />
      <ActionLargeItem
        value="invite"
        icon={<RiUserAddFill />}
        label="Invite your teammates"
        description="Add members to your workspace and set their roles."
        shortcut="I"
      />
      <ActionLargeItem
        value="sticky"
        icon={<RiStickyNoteAddFill />}
        label="Create a sticky note"
        description="Drop a quick note onto your shared canvas."
        shortcut="N"
      />
    </CommandGroup>
  )
}

function CommandTabbedSlot({
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
        <TabsTrigger value="projects" leading={<RiFileCloudLine />}>
          Projects
        </TabsTrigger>
        <TabsTrigger
          value="people"
          leading={<RiUser4Line />}
          trailing={
            <Badge variant="primary" appearance="soft" size="sm" numberOnly>
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
          <AiGroup />
          <RecentGroup />
          <ActionGroup />
          <WebsitesGroup />
          <FilesGroup />
          <PeopleGroup />
          <NotesGroup />
          <ActionLargeGroup />
        </TabsContent>
        <TabsContent value="projects" className="mt-0">
          <WebsitesGroup />
          <ActionLargeGroup />
        </TabsContent>
        <TabsContent value="people" className="mt-0">
          <PeopleGroup />
        </TabsContent>
        <TabsContent value="files" className="mt-0">
          <FilesGroup />
        </TabsContent>
        <TabsContent value="tasks" className="mt-0">
          <ActionGroup />
        </TabsContent>
        <TabsContent value="tools" className="mt-0">
          <AiGroup />
          <RecentGroup />
          <NotesGroup />
        </TabsContent>
      </CommandList>
    </Tabs>
  )
}

function MoreLink() {
  return (
    <CommandItemLink variant="primary" underline>
      More
    </CommandItemLink>
  )
}

function PersonItem({
  name,
  handle,
  role,
  image,
}: {
  name: string
  handle: string
  role: string
  image: string
}) {
  const size = useCommandSize()
  return (
    <CommandItem value={name} href="#">
      <Avatar size={size === "md" ? "2xs" : "xs"} shape="circle">
        <AvatarImage src={image} alt={name} />
        <AvatarText>
          {name
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
        <CommandItemTitle>{name}</CommandItemTitle>
        <CommandItemSecondary>{handle}</CommandItemSecondary>
      </CommandItemContent>
      <Badge
        variant="neutral"
        appearance="soft"
        size="sm"
        className="max-sm:hidden"
      >
        {role}
      </Badge>
    </CommandItem>
  )
}

function WebsiteItem({
  value,
  logo,
  name,
  url,
  description,
}: {
  value: string
  logo: React.ReactNode
  name: string
  url: string
  description: string
}) {
  return (
    <CommandItem large value={value} href={`https://${url}`}>
      {logo}
      <CommandItemContent>
        <CommandItemTitle>
          {name}
          <span className="text-body inline-flex shrink-0 items-center gap-0.5">
            {url}
            <RiArrowRightUpLine className="size-3.5" />
          </span>
        </CommandItemTitle>
        <CommandItemDescription>{description}</CommandItemDescription>
      </CommandItemContent>
      <CommandItemChevron />
    </CommandItem>
  )
}

function FileItem({
  value,
  format,
  name,
  size,
  date,
  time,
}: {
  value: string
  format: string
  name: string
  size: string
  date: string
  time: string
}) {
  const commandSize = useCommandSize()
  return (
    <CommandItem large value={value} href="#">
      <FileFormat
        format={format}
        className={
          commandSize === "md"
            ? "size-8 shrink-0 lg:size-10.5"
            : "size-10 shrink-0 lg:size-12"
        }
      />
      <CommandItemContent>
        <CommandItemTitle>{name}</CommandItemTitle>
        <CommandItemMeta className="max-sm:hidden">
          <span>Document</span>
          <span>{size}</span>
          <span>{date}</span>
          <span>{time}</span>
        </CommandItemMeta>
      </CommandItemContent>
      <CommandItemChevron />
    </CommandItem>
  )
}

function ActionLargeItem({
  value,
  icon,
  label,
  description,
  shortcut,
}: {
  value: string
  icon: React.ReactNode
  label: string
  description: string
  shortcut: string
}) {
  const size = useCommandSize()
  return (
    <CommandItem large value={value}>
      <FeaturedIcon
        variant="info"
        size={size}
        appearance="soft"
        type="stylish"
        shape="circle"
      >
        {icon}
      </FeaturedIcon>
      <CommandItemContent>
        <CommandItemTitle>{label}</CommandItemTitle>
        <CommandItemDescription className="max-sm:hidden">
          {description}
        </CommandItemDescription>
      </CommandItemContent>
      <CommandShortcut>
        <CommandKbd>
          <RiCommandFill />
        </CommandKbd>
        <CommandKbd>{shortcut}</CommandKbd>
      </CommandShortcut>
    </CommandItem>
  )
}

// ---------------------------------------------------------------------------
// Footers
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Demos
// ---------------------------------------------------------------------------

function CommandShowcase() {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "k" || !(event.metaKey || event.ctrlKey)) return
      // Bail if another handler already claimed this ⌘K so two palettes
      // can't open at once.
      if (event.defaultPrevented) return
      event.preventDefault()
      setOpen((value) => !value)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <Example title="Button or ⌘K">
      <Command open={open} onOpenChange={setOpen}>
        <CommandTrigger asChild>
          <Button
            variant="neutral-solid"
            appearance="outline"
            className="w-fit"
          >
            Open command menu
          </Button>
        </CommandTrigger>
        <CommandContent>
          <CommandMain>
            <CommandInput
              ref={inputRef}
              placeholder="Type command, search files, talk with AI..."
            />
            <CommandTabbedSlot inputRef={inputRef} />
          </CommandMain>
          <ShortcutFooter />
        </CommandContent>
      </Command>
    </Example>
  )
}

function CommandHelpFooter() {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <Example title="Medium (md) + help footer">
      <Command size="md" open={open} onOpenChange={setOpen}>
        <CommandTrigger asChild>
          <Button
            variant="neutral-solid"
            appearance="outline"
            className="w-fit"
          >
            Open command menu
          </Button>
        </CommandTrigger>
        <CommandContent>
          <CommandMain>
            <CommandInput
              ref={inputRef}
              placeholder="Type command, search files, talk with AI..."
            />
            <CommandTabbedSlot inputRef={inputRef} />
          </CommandMain>
          <HelpFooter />
        </CommandContent>
      </Command>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// Backdrop variants
// ---------------------------------------------------------------------------

function BackdropCommand({
  backdrop,
  label,
}: {
  backdrop: CommandBackdrop
  label: string
}) {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <Command open={open} onOpenChange={setOpen} backdrop={backdrop}>
      <CommandTrigger asChild>
        <Button variant="neutral-solid" appearance="outline" className="w-fit">
          {label}
        </Button>
      </CommandTrigger>
      <CommandContent>
        <CommandMain>
          <CommandInput
            ref={inputRef}
            placeholder="Type a command or search..."
          />
          {/* A flat list (no tabs) — the middle is a free slot, so the existing
              archetype groups drop straight in. */}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <ActionGroup />
            <WebsitesGroup />
          </CommandList>
        </CommandMain>
        <ShortcutFooter />
      </CommandContent>
    </Command>
  )
}

function CommandBackdrops() {
  return (
    <Example title="Backdrop: blur · opaque · transparent">
      <div className="flex flex-wrap gap-3">
        <BackdropCommand backdrop="blur" label="Blur" />
        <BackdropCommand backdrop="opaque" label="Opaque" />
        <BackdropCommand backdrop="transparent" label="Transparent" />
      </div>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// Custom slot content — the middle accepts any of our components. Here:
// Progress (project completion), StatusBadge (presence), CountryFlag (locale).
// ---------------------------------------------------------------------------

function ProjectRow({
  value,
  icon,
  name,
  progress,
  variant,
}: {
  value: string
  icon: React.ReactNode
  name: string
  progress: number
  variant: React.ComponentProps<typeof Progress>["variant"]
}) {
  return (
    <CommandItem value={value} href="#">
      <CommandItemIcon>{icon}</CommandItemIcon>
      <CommandItemContent inline>
        <CommandItemTitle>{name}</CommandItemTitle>
      </CommandItemContent>
      <div className="gap-component-sm ml-auto flex items-center">
        <Progress
          value={progress}
          variant={variant}
          size="sm"
          className="w-24 max-sm:hidden"
        />
        <CommandItemSecondary>{progress}%</CommandItemSecondary>
      </div>
    </CommandItem>
  )
}

function ProjectsGroup() {
  return (
    <CommandGroup heading="Projects">
      <ProjectRow
        value="alpha"
        icon={<RiFileCloudLine />}
        name="Project Alpha"
        progress={72}
        variant="success"
      />
      <ProjectRow
        value="orbit"
        icon={<RiLayoutGridLine />}
        name="Orbit Redesign"
        progress={45}
        variant="primary"
      />
      <ProjectRow
        value="atlas"
        icon={<RiFolderOpenLine />}
        name="Atlas Migration"
        progress={18}
        variant="warning"
      />
    </CommandGroup>
  )
}

const PRESENCE = [
  { variant: "success", label: "Online" },
  { variant: "away", label: "Away" },
  { variant: "neutral", label: "Offline" },
] as const

function TeamGroup() {
  // Avatar scales with the command, like the People rows above.
  const size = useCommandSize()
  return (
    <CommandGroup heading="Team">
      {PEOPLE.map((person, index) => {
        const presence = PRESENCE[index % PRESENCE.length]
        return (
          <CommandItem key={person.handle} value={person.handle} href="#">
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
            <div className="gap-component-sm ml-auto flex items-center">
              <StatusBadge variant={presence.variant} />
              <CommandItemSecondary className="max-sm:hidden">
                {presence.label}
              </CommandItemSecondary>
            </div>
          </CommandItem>
        )
      })}
    </CommandGroup>
  )
}

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
    value: "japanese",
    code: "JP",
    name: "Japanese",
    region: "Japan",
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

function LanguagesGroup() {
  return (
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
  )
}

function CommandCustomContent() {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <Example title="Custom slot content (Progress · StatusBadge · CountryFlag)">
      <Command open={open} onOpenChange={setOpen}>
        <CommandTrigger asChild>
          <Button
            variant="neutral-solid"
            appearance="outline"
            className="w-fit"
          >
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
              <ProjectsGroup />
              <TeamGroup />
              <LanguagesGroup />
            </CommandList>
          </CommandMain>
          <ShortcutFooter />
        </CommandContent>
      </Command>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// Loading state — the list is a free slot, so an async Spinner drops right in.
// ---------------------------------------------------------------------------

function CommandLoadingState() {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <Example title="Loading state (Spinner)">
      <Command open={open} onOpenChange={setOpen}>
        <CommandTrigger asChild>
          <Button
            variant="neutral-solid"
            appearance="outline"
            className="w-fit"
          >
            Open command menu
          </Button>
        </CommandTrigger>
        <CommandContent>
          <CommandMain>
            <CommandInput ref={inputRef} placeholder="Searching..." />
            <CommandList>
              <div className="text-placeholder gap-component-sm flex flex-col items-center justify-center py-12">
                <Spinner size="lg" variant="neutral" />
                <span className="text-paragraph-sm">Searching…</span>
              </div>
            </CommandList>
          </CommandMain>
          <ShortcutFooter />
        </CommandContent>
      </Command>
    </Example>
  )
}
