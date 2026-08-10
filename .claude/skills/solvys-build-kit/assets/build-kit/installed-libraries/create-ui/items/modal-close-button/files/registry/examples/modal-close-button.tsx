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

function CloseButtonModal({
  showCloseButton,
  label,
}: {
  showCloseButton: boolean
  label: string
}) {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          {label}
        </Button>
      </ModalTrigger>
      <ModalContent showCloseButton={showCloseButton}>
        <ModalMain>
          <ModalHeader align="horizontal">
            <ModalIcon>
              <RiFlashlightFill />
            </ModalIcon>
            <ModalHeaderContent>
              <ModalTitle>System Notification</ModalTitle>
              <ModalDescription>
                Please review the details and take action
              </ModalDescription>
            </ModalHeaderContent>
          </ModalHeader>
          <ModalBody>
            <p className="text-body text-body-sm">
              {showCloseButton
                ? "The corner close button is shown. Dismiss with the X, Cancel, Escape, or an outside click."
                : "The corner close button is hidden. Dismiss with Cancel, Escape, or an outside click."}
            </p>
          </ModalBody>
        </ModalMain>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="neutral-light" appearance="soft" size="md">
              Cancel
            </Button>
          </ModalClose>
          <Button variant="primary" appearance="solid" size="md">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function ModalCloseButton() {
  return (
    <div className="flex flex-wrap gap-2">
      <CloseButtonModal showCloseButton label="With close" />
      <CloseButtonModal showCloseButton={false} label="Without close" />
    </div>
  )
}
