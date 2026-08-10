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
  type ModalBackdropVariant,
} from "@/registry/pro/ui/modal"
import { Button } from "@/registry/ui/button"

const backdrops: ModalBackdropVariant[] = ["opaque", "blur", "transparent"]

function BackdropModal({ backdrop }: { backdrop: ModalBackdropVariant }) {
  return (
    <Modal backdrop={backdrop}>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          {backdrop}
        </Button>
      </ModalTrigger>
      <ModalContent>
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
              This modal uses the <strong>{backdrop}</strong> backdrop.
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

export default function ModalBackdrop() {
  return (
    <div className="flex flex-wrap gap-2">
      {backdrops.map((backdrop) => (
        <BackdropModal key={backdrop} backdrop={backdrop} />
      ))}
    </div>
  )
}
