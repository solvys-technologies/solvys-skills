"use client"

import { RiFlashlightFill } from "@create-ui/assets/icons"

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
import { Button } from "@/registry/ui/button"
import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

const channels = [
  {
    id: "modal-notif-email",
    label: "Email",
    description: "Receipts, product updates, and security alerts.",
    defaultChecked: true,
  },
  {
    id: "modal-notif-push",
    label: "Push",
    description: "Real-time alerts on your devices.",
    defaultChecked: true,
  },
  {
    id: "modal-notif-sms",
    label: "SMS",
    description: "Critical account messages only.",
    defaultChecked: false,
  },
]

export default function ModalSettings() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Open settings
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalMain>
          <ModalHeader align="horizontal">
            <ModalIcon>
              <RiFlashlightFill />
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
