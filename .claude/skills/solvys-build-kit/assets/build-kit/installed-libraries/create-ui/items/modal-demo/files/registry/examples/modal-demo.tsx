"use client"

import { RiFlashlightFill } from "@create-ui/assets/icons"

import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"
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
import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import {
  LabelInfoSlot,
  LabelOptional,
  LabelRequired,
} from "@/registry/ui/label"
import { Progress } from "@/registry/ui/progress"

export default function ModalDemo() {
  return (
    <Modal size="md">
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Open modal
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalMain>
          <ModalHeader align="vertical-center">
            <ModalIcon>
              <RiFlashlightFill />
            </ModalIcon>
            <ModalHeaderContent>
              <ModalTitle>Successful</ModalTitle>
              <ModalDescription>
                Your transaction has been approved.
              </ModalDescription>
            </ModalHeaderContent>
          </ModalHeader>
          <ModalBody>
            <div className="gap-component-lg flex flex-col">
              <Field size="sm">
                <FieldLabel htmlFor="modal-demo-first">
                  Default Input
                  <LabelRequired />
                  <LabelOptional />
                  <LabelInfoSlot>
                    <InfoTooltip variant="inverse" side="top">
                      Description or any kind of additional text.
                    </InfoTooltip>
                  </LabelInfoSlot>
                </FieldLabel>
                <FieldDescription>
                  Description or any kind of additional text.
                </FieldDescription>
                <Input id="modal-demo-first" placeholder="Placeholder Text.." />
              </Field>
              <Field size="sm">
                <FieldLabel htmlFor="modal-demo-second">
                  Default Input
                  <LabelRequired />
                  <LabelOptional />
                  <LabelInfoSlot>
                    <InfoTooltip variant="inverse" side="top">
                      Description or any kind of additional text.
                    </InfoTooltip>
                  </LabelInfoSlot>
                </FieldLabel>
                <FieldDescription>
                  Description or any kind of additional text.
                </FieldDescription>
                <Input
                  id="modal-demo-second"
                  placeholder="Placeholder Text.."
                />
              </Field>
            </div>
          </ModalBody>
        </ModalMain>
        <ModalFooter align="between">
          <div className="gap-component-sm flex items-center">
            <Progress value={42} className="w-[156px]" />
            <span className="text-strongest text-ui-control-md font-medium">
              42%
            </span>
          </div>
          <ModalClose asChild>
            <Button variant="primary" appearance="solid" size="md">
              Back to Home
            </Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
