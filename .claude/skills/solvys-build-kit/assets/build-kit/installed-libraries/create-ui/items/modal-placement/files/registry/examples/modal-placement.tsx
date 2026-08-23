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

function PlacementModal({
  placement,
}: {
  placement: "auto" | "top" | "center" | "bottom"
}) {
  return (
    <Modal placement={placement}>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          {placement}
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalMain>
          <ModalHeader align="horizontal">
            <ModalIcon>
              <RiFlashlightFill />
            </ModalIcon>
            <ModalHeaderContent>
              <ModalTitle>Placement: {placement}</ModalTitle>
              <ModalDescription>
                This modal opens with the &quot;{placement}&quot; placement on
                the viewport.
              </ModalDescription>
            </ModalHeaderContent>
          </ModalHeader>
          <ModalBody>
            <p className="text-body text-body-sm">
              Use the placement prop to control where the modal sits vertically.
              The &quot;auto&quot; value lets the modal decide based on its size
              and the available space.
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

export default function ModalPlacement() {
  return (
    <div className="gap-component-sm flex flex-wrap">
      <PlacementModal placement="auto" />
      <PlacementModal placement="top" />
      <PlacementModal placement="center" />
      <PlacementModal placement="bottom" />
    </div>
  )
}
