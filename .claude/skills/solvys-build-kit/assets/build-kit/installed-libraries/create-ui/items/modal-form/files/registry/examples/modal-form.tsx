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
import { Field } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import {
  Label,
  LabelBlock,
  LabelDescription,
  LabelMain,
  LabelOptional,
  LabelRequired,
} from "@/registry/ui/label"
import { Progress } from "@/registry/ui/progress"

function FormField({ id, tooltip }: { id: string; tooltip: string }) {
  return (
    <Field className="w-full">
      <LabelBlock>
        <LabelMain>
          <Label htmlFor={id}>
            Default Input
            <LabelRequired />
            <LabelOptional />
            <InfoTooltip variant="neutral" size="md" side="top" showArrow>
              {tooltip}
            </InfoTooltip>
          </Label>
          <LabelDescription>
            Description or any kind of additional text.
          </LabelDescription>
        </LabelMain>
      </LabelBlock>
      <Input id={id} placeholder="Placeholder Text.." />
    </Field>
  )
}

export default function ModalForm() {
  return (
    <Modal variant="success">
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          Open form
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalMain>
          <ModalHeader align="vertical-center">
            <ModalIcon appearance="outline" type="plain">
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
            <div className="gap-section-sm flex flex-col">
              <FormField
                id="modal-form-name"
                tooltip="We use this to personalize your experience."
              />
              <FormField
                id="modal-form-email"
                tooltip="Optional. Add more detail if you need to."
              />
            </div>
          </ModalBody>
        </ModalMain>
        <ModalFooter align="between">
          <div className="gap-component-sm flex flex-1 items-center">
            <Progress value={42} className="min-w-0 flex-1" />
            <span className="text-body text-ui-control-md shrink-0 font-medium">
              42%
            </span>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <ModalClose asChild>
              <Button variant="primary" appearance="solid" size="md">
                Back to Home
              </Button>
            </ModalClose>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
