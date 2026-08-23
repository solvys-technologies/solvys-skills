"use client"

import { RiSparklingFill, RiUserAddLine } from "@create-ui/assets/icons"

import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalHeaderContent,
  ModalIcon,
  ModalMain,
  ModalTitle,
  ModalTrigger,
} from "@/registry/pro/ui/modal"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

const people = [
  {
    id: "ayla",
    name: "Ayla Karagöz",
    email: "ayla@acme.com",
    src: "https://createui.co/avatars/ayla-karagoz.webp",
  },
  {
    id: "luca",
    name: "Luca Moretti",
    email: "luca@acme.com",
    src: "https://createui.co/avatars/luca-moretti.webp",
  },
  {
    id: "priya",
    name: "Priya Sharma",
    email: "priya@acme.com",
    src: "https://createui.co/avatars/priya-sharma.webp",
  },
]

const channels = [
  {
    id: "body-notif-email",
    label: "Email",
    description: "Receipts, product updates, and security alerts.",
    defaultChecked: true,
  },
  {
    id: "body-notif-push",
    label: "Push",
    description: "Real-time alerts on your devices.",
    defaultChecked: false,
  },
]

// A form — Field + Input primitives for a create/edit flow.
function FormModal() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Form
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalMain>
          <ModalHeader align="horizontal">
            <ModalIcon>
              <RiSparklingFill />
            </ModalIcon>
            <ModalHeaderContent>
              <ModalTitle>Update workspace</ModalTitle>
              <ModalDescription>
                Change your workspace name and contact email.
              </ModalDescription>
            </ModalHeaderContent>
          </ModalHeader>
          <ModalBody>
            <div className="gap-component-lg flex flex-col">
              <Field>
                <FieldLabel htmlFor="body-name">Workspace name</FieldLabel>
                <Input id="body-name" placeholder="Acme Inc." />
              </Field>
              <Field>
                <FieldLabel htmlFor="body-email">Contact email</FieldLabel>
                <Input
                  id="body-email"
                  type="email"
                  placeholder="team@acme.com"
                />
                <FieldDescription>
                  We&apos;ll send billing receipts here.
                </FieldDescription>
              </Field>
            </div>
          </ModalBody>
        </ModalMain>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="neutral-light" appearance="soft" size="md">
              Cancel
            </Button>
          </ModalClose>
          <Button variant="primary" appearance="solid" size="md">
            Save changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

// A settings panel — a stack of Switch toggles.
function SettingsModal() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Settings
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalMain>
          <ModalHeader align="horizontal">
            <ModalIcon>
              <RiSparklingFill />
            </ModalIcon>
            <ModalHeaderContent>
              <ModalTitle>Notification settings</ModalTitle>
              <ModalDescription>
                Choose how you want to hear from us.
              </ModalDescription>
            </ModalHeaderContent>
          </ModalHeader>
          <ModalBody>
            <div className="gap-component-lg flex flex-col">
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
          </ModalBody>
        </ModalMain>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="neutral-light" appearance="soft" size="md">
              Cancel
            </Button>
          </ModalClose>
          <Button variant="primary" appearance="solid" size="md">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

// A list — selectable rows built from Avatar + Checkbox.
function ListModal() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          List
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalMain>
          <ModalHeader align="horizontal">
            <ModalIcon>
              <RiUserAddLine />
            </ModalIcon>
            <ModalHeaderContent>
              <ModalTitle>Invite to workspace</ModalTitle>
              <ModalDescription>
                Select the people you want to add.
              </ModalDescription>
            </ModalHeaderContent>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col">
              {people.map((person) => (
                <label
                  key={person.id}
                  htmlFor={`body-invite-${person.id}`}
                  className="gap-component-md flex items-center py-2"
                >
                  <Avatar size="sm" stroke={false}>
                    <AvatarImage src={person.src} alt={person.name} />
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-strongest text-body-sm font-medium">
                      {person.name}
                    </p>
                    <p className="text-body text-body-xs">{person.email}</p>
                  </div>
                  <Checkbox id={`body-invite-${person.id}`} />
                </label>
              ))}
            </div>
          </ModalBody>
        </ModalMain>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="neutral-light" appearance="soft" size="md">
              Cancel
            </Button>
          </ModalClose>
          <Button variant="primary" appearance="solid" size="md">
            Send invites
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

// A media banner — an AspectRatio visual with supporting copy and a Badge.
function MediaModal() {
  return (
    <Modal variant="info">
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Media
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalMain>
          <ModalHeader align="horizontal">
            <ModalIcon>
              <RiSparklingFill />
            </ModalIcon>
            <ModalHeaderContent>
              <ModalTitle>Introducing Insights</ModalTitle>
              <ModalDescription>
                See how your team is doing at a glance.
              </ModalDescription>
            </ModalHeaderContent>
          </ModalHeader>
          <ModalBody>
            <div className="gap-component-lg flex flex-col">
              <AspectRatio
                ratio={16 / 9}
                className="from-info-weakest to-weak rounded-lg bg-gradient-to-br"
              />
              <div className="gap-component-sm flex flex-col">
                <Badge variant="info" appearance="soft" size="sm">
                  New
                </Badge>
                <p className="text-body text-body-sm">
                  A new dashboard brings your metrics, activity, and reports
                  into one place — no setup required.
                </p>
              </div>
            </div>
          </ModalBody>
        </ModalMain>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="neutral-light" appearance="soft" size="md">
              Later
            </Button>
          </ModalClose>
          <Button variant="primary" appearance="solid" size="md">
            Explore
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function ModalBodyExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FormModal />
      <SettingsModal />
      <ListModal />
      <MediaModal />
    </div>
  )
}
