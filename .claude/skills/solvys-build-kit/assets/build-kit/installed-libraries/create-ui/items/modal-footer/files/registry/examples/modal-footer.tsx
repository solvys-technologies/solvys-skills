"use client"

import { RiFlashlightFill, RiLinkM } from "@create-ui/assets/icons"

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
import { Button, ButtonLabel } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"

export default function ModalFooterExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Modal>
        <ModalTrigger asChild>
          <Button variant="neutral-light" appearance="soft" size="sm">
            actions
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
                Modal body content goes here.
              </p>
            </ModalBody>
          </ModalMain>
          <ModalFooter>
            <Button variant="neutral-light" appearance="ghost" size="md">
              <RiLinkM />
              <ButtonLabel>Copy Link</ButtonLabel>
            </Button>
            <Button variant="primary" appearance="solid" size="md">
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <Button variant="neutral-light" appearance="soft" size="sm">
            between
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
                Modal body content goes here.
              </p>
            </ModalBody>
          </ModalMain>
          <ModalFooter align="between">
            <div className="gap-component-sm flex items-center">
              <Checkbox id="modal-footer-dont-show" />
              <label
                htmlFor="modal-footer-dont-show"
                className="text-body text-body-sm"
              >
                Don&apos;t show again
              </label>
            </div>
            <div className="gap-component-sm flex items-center">
              <Button variant="neutral-light" appearance="ghost" size="md">
                <RiLinkM />
                <ButtonLabel>Copy Link</ButtonLabel>
              </Button>
              <Button variant="primary" appearance="solid" size="md">
                Next
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <Button variant="neutral-light" appearance="soft" size="sm">
            vertical
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
                Modal body content goes here.
              </p>
            </ModalBody>
          </ModalMain>
          <ModalFooter orientation="vertical">
            <Button
              variant="primary"
              appearance="solid"
              size="md"
              className="w-full"
            >
              Confirm
            </Button>
            <Button
              variant="neutral-light"
              appearance="soft"
              size="md"
              className="w-full"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
