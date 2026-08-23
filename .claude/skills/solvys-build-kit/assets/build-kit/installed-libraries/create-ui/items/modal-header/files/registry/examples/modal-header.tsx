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
  type ModalHeaderAlign,
} from "@/registry/pro/ui/modal"
import { Button } from "@/registry/ui/button"

const aligns: ModalHeaderAlign[] = [
  "horizontal",
  "vertical-left",
  "vertical-center",
]

function AlignmentModal({ align }: { align: ModalHeaderAlign }) {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          {align}
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalMain>
          <ModalHeader align={align}>
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
              Modal body content goes here.
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

export default function ModalHeaderAlignments() {
  return (
    <div className="flex flex-wrap gap-2">
      {aligns.map((align) => (
        <AlignmentModal key={align} align={align} />
      ))}
    </div>
  )
}
