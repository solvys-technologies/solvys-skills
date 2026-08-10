"use client"

import { RiSparklingFill } from "@create-ui/assets/icons"

import {
  Popover,
  PopoverActions,
  PopoverActionText,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverImage,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/pro/ui/popover"
import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Field, FieldContent, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

// A profile hovercard — Avatar + identity + follow/message actions.
function ProfilePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Profile
        </Button>
      </PopoverTrigger>
      <PopoverContent size="md">
        <PopoverBody>
          <div className="gap-component-sm flex items-center">
            <Avatar size="md" stroke={false}>
              <AvatarImage
                src="https://createui.co/avatars/ayla-karagoz.webp"
                alt="Ayla Karagöz"
              />
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-strongest text-body-sm truncate font-medium">
                Ayla Karagöz
              </p>
              <p className="text-body text-body-xs truncate">
                @ayla · Design Systems
              </p>
            </div>
          </div>
          <PopoverDescription>
            Building the Create UI design system. Occasionally writing about
            tokens and theming.
          </PopoverDescription>
          <PopoverFooter>
            <PopoverActionText>128 following</PopoverActionText>
            <PopoverActions>
              <Button variant="neutral-light" appearance="ghost" size="xs">
                Message
              </Button>
              <Button variant="neutral-solid" size="xs">
                Follow
              </Button>
            </PopoverActions>
          </PopoverFooter>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

// A mini-form — Field + Input for a quick rename.
function FormPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Rename
        </Button>
      </PopoverTrigger>
      <PopoverContent size="md">
        <PopoverBody>
          <PopoverHeader>
            <PopoverTitle>Rename board</PopoverTitle>
            <PopoverDescription>
              Give this board a name your team will recognize.
            </PopoverDescription>
          </PopoverHeader>
          <Field>
            <FieldLabel htmlFor="popover-board-name">Board name</FieldLabel>
            <Input
              id="popover-board-name"
              defaultValue="Q3 Roadmap"
              autoFocus
            />
          </Field>
          <PopoverFooter>
            <PopoverActions>
              <PopoverClose asChild>
                <Button variant="neutral-light" appearance="ghost" size="xs">
                  Cancel
                </Button>
              </PopoverClose>
              <PopoverClose asChild>
                <Button variant="neutral-solid" size="xs">
                  Save
                </Button>
              </PopoverClose>
            </PopoverActions>
          </PopoverFooter>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

// A settings panel — a stack of Switch toggles.
const channels = [
  {
    id: "popover-notif-email",
    label: "Email",
    description: "Receipts and product updates.",
    defaultChecked: true,
  },
  {
    id: "popover-notif-push",
    label: "Push",
    description: "Real-time alerts on your devices.",
    defaultChecked: false,
  },
]

function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Notifications
        </Button>
      </PopoverTrigger>
      <PopoverContent size="md">
        <PopoverBody>
          <PopoverHeader>
            <PopoverTitle>Notifications</PopoverTitle>
            <PopoverDescription>
              Choose how you want to hear from us.
            </PopoverDescription>
          </PopoverHeader>
          <div className="gap-component-md flex flex-col">
            {channels.map((channel) => (
              <SwitchGroup key={channel.id}>
                <Switch
                  id={channel.id}
                  defaultChecked={channel.defaultChecked}
                />
                <FieldContent>
                  <LabelMain>
                    <Label htmlFor={channel.id}>{channel.label}</Label>
                    <LabelDescription>{channel.description}</LabelDescription>
                  </LabelMain>
                </FieldContent>
              </SwitchGroup>
            ))}
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

// A release-notes panel — PopoverImage banner + Badge + copy.
function MediaPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          What&apos;s new
        </Button>
      </PopoverTrigger>
      <PopoverContent size="md">
        <PopoverImage>
          <img
            src="https://createui.co/images/create-banner.png"
            alt="Insights dashboard"
          />
        </PopoverImage>
        <PopoverBody>
          <PopoverHeader>
            <PopoverTitle>
              <RiSparklingFill />
              Introducing Insights
            </PopoverTitle>
            <PopoverDescription>
              See how your team is doing at a glance, no setup required.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <PopoverActions>
              <Badge variant="info" appearance="soft" size="sm">
                New
              </Badge>
            </PopoverActions>
            <PopoverActionText>v2.4</PopoverActionText>
          </PopoverFooter>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default function PopoverBodyExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ProfilePopover />
      <FormPopover />
      <SettingsPopover />
      <MediaPopover />
    </div>
  )
}
