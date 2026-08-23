"use client"

import * as React from "react"
import { RiFlashlightFill, RiLinkM } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
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
  type ModalBackdropVariant,
  type ModalHeaderAlign,
  type ModalIconAppearance,
  type ModalIconShape,
  type ModalIconType,
  type ModalPlacement,
  type ModalSize,
} from "@/registry/pro/ui/modal"
import { Badge } from "@/registry/ui/badge"
import { Button, ButtonLabel } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { CheckboxGroup } from "@/registry/ui/checkbox-group"
import { Field, FieldContent } from "@/registry/ui/field"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select"
import { Spinner } from "@/registry/ui/spinner"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"
import { TextLink } from "@/registry/ui/text-link"

// ---------------------------------------------------------------------------
// Composed example — "PRO upsell": a white header+body card floating on a weak
// footer tray, with a 1px hairline between header and body and a between-footer.
// Mirrors Figma 6108:5101 (md) / 6108:5139 (sm).
// ---------------------------------------------------------------------------

function ProDemoModal({ size }: { size: Extract<ModalSize, "md" | "lg"> }) {
  const isMd = size === "lg"
  return (
    <Modal size={size}>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="md">
          {size} · pro upsell
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
            <div className="h-[200px] w-full" />
          </ModalBody>
        </ModalMain>
        <ModalFooter align="between">
          <div className="gap-component-sm flex items-center">
            <Badge variant="info" appearance="soft" size={isMd ? "sm" : "xs"}>
              PRO
            </Badge>
            <span
              className={cn(
                "text-body font-medium",
                isMd ? "text-ui-control-md" : "text-ui-control-sm"
              )}
            >
              Unlock all features.
            </span>
          </div>
          <div className="gap-component-sm flex items-center">
            <Button
              variant="neutral-light"
              appearance="ghost"
              size={isMd ? "lg" : "md"}
            >
              <RiLinkM />
              <ButtonLabel>Copy Link</ButtonLabel>
            </Button>
            <Button
              variant="primary"
              appearance="solid"
              size={isMd ? "lg" : "md"}
            >
              Next
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const ProUpsellSection = React.memo(function ProUpsellSection() {
  return (
    <SectionFrame title="Composed example — PRO upsell (card on tray)">
      <div className="flex flex-wrap gap-2 p-6">
        <ProDemoModal size="lg" />
        <ProDemoModal size="md" />
      </div>
    </SectionFrame>
  )
})

function FormField({ id, tooltip }: { id: string; tooltip: string }) {
  return (
    <Field className="w-full">
      <LabelBlock>
        <LabelMain>
          <Label htmlFor={id}>
            Default Input
            <LabelRequired />
            <LabelOptional />
            <InfoTooltip variant="neutral" size="md" side="bottom" showArrow>
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

function SuccessFormModal() {
  return (
    <Modal size="md" variant="success">
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          success · form
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
                id="modal-form-1"
                tooltip="We use this to personalize your experience."
              />
              <FormField
                id="modal-form-2"
                tooltip="Optional — add more detail if you need to."
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
              <Button variant="primary" appearance="solid" size="lg">
                Back to Home
              </Button>
            </ModalClose>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const SuccessFormSection = React.memo(function SuccessFormSection() {
  return (
    <SectionFrame title="Composed example — Success + form (card on tray)">
      <div className="flex flex-wrap gap-2 p-6">
        <SuccessFormModal />
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Footer variations — same header + body, many composed footers. Each trigger
// opens the standard modal with one footer so they can be compared.
// ---------------------------------------------------------------------------

// The most common right-hand action group: a ghost "Copy Link" + primary "Next".
function FooterActions() {
  return (
    <div className="gap-component-sm flex items-center">
      <Button variant="neutral-light" appearance="ghost" size="lg">
        <RiLinkM />
        <ButtonLabel>Copy Link</ButtonLabel>
      </Button>
      <Button variant="primary" appearance="solid" size="lg">
        Next
      </Button>
    </div>
  )
}

const footerVariants: { label: string; footer: React.ReactNode }[] = [
  {
    label: "checkbox",
    footer: (
      <ModalFooter align="between">
        <CheckboxGroup size="sm">
          <Checkbox id="footer-checkbox" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="footer-checkbox">Don&apos;t show again</Label>
            </LabelMain>
          </FieldContent>
        </CheckboxGroup>
        <FooterActions />
      </ModalFooter>
    ),
  },
  {
    label: "switch",
    footer: (
      <ModalFooter align="between">
        <SwitchGroup size="sm" shape="rounded">
          <Switch id="footer-switch" defaultChecked />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="footer-switch">Remember</Label>
            </LabelMain>
          </FieldContent>
        </SwitchGroup>
        <FooterActions />
      </ModalFooter>
    ),
  },
  {
    label: "text link",
    footer: (
      <ModalFooter align="between">
        <TextLink href="#" variant="neutral" size="xs" underline>
          Skip for now
        </TextLink>
        <FooterActions />
      </ModalFooter>
    ),
  },
  {
    label: "label + info",
    footer: (
      <ModalFooter align="between">
        <Label>
          Label
          <InfoTooltip variant="neutral" size="md" side="top" showArrow>
            More information about this action.
          </InfoTooltip>
        </Label>
        <FooterActions />
      </ModalFooter>
    ),
  },
  {
    label: "select",
    footer: (
      <ModalFooter align="between">
        <div className="w-30 md:w-40">
          <Select size="sm">
            <SelectTrigger>
              <SelectValue placeholder="Save as a draft" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Save as a draft</SelectItem>
              <SelectItem value="publish">Publish</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <FooterActions />
      </ModalFooter>
    ),
  },
  {
    label: "badge",
    footer: (
      <ModalFooter align="between">
        <div className="gap-component-sm flex items-center">
          <Badge variant="info" appearance="soft" size="sm">
            PRO
          </Badge>
          <span className="text-body text-ui-control-md font-medium">
            Get pro
          </span>
        </div>
        <FooterActions />
      </ModalFooter>
    ),
  },
  {
    label: "spinner",
    footer: (
      <ModalFooter align="between">
        <span className="text-body text-ui-control-md flex items-center gap-2 font-medium">
          <Spinner variant="info" size="lg" />
          Applying changes..
        </span>
        <Button variant="neutral-solid" appearance="soft" size="lg" disabled>
          Cancel
        </Button>
      </ModalFooter>
    ),
  },
  {
    label: "progress",
    footer: (
      <ModalFooter align="between">
        <div className="gap-component-sm flex flex-1 items-center">
          <Progress value={42} className="min-w-0 flex-1" />
          <span className="text-body text-ui-control-md shrink-0 font-medium">
            42%
          </span>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Button variant="primary" appearance="solid" size="lg">
            Next
          </Button>
        </div>
      </ModalFooter>
    ),
  },
  {
    label: "back",
    footer: (
      <ModalFooter align="between">
        <Button variant="neutral-solid" appearance="soft" size="lg">
          Back
        </Button>
        <FooterActions />
      </ModalFooter>
    ),
  },
  {
    label: "next only",
    footer: (
      <ModalFooter align="end">
        <Button variant="primary" appearance="solid" size="lg">
          Next
        </Button>
      </ModalFooter>
    ),
  },
  {
    label: "copy link + next",
    footer: (
      <ModalFooter align="end">
        <Button variant="neutral-light" appearance="ghost" size="lg">
          <RiLinkM />
          <ButtonLabel>Copy Link</ButtonLabel>
        </Button>
        <Button variant="primary" appearance="solid" size="lg">
          Next
        </Button>
      </ModalFooter>
    ),
  },
  {
    label: "cancel / confirm",
    footer: (
      <ModalFooter>
        <Button
          variant="neutral-solid"
          appearance="soft"
          size="lg"
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          appearance="solid"
          size="lg"
          className="flex-1"
        >
          Confirm
        </Button>
      </ModalFooter>
    ),
  },
  {
    label: "vertical",
    footer: (
      <ModalFooter orientation="vertical">
        <Button
          variant="neutral-solid"
          appearance="soft"
          size="lg"
          className="w-full"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          appearance="solid"
          size="lg"
          className="w-full"
        >
          Confirm
        </Button>
      </ModalFooter>
    ),
  },
  {
    label: "full-width",
    footer: (
      <ModalFooter>
        <Button
          variant="primary"
          appearance="solid"
          size="lg"
          className="w-full"
        >
          Next
        </Button>
      </ModalFooter>
    ),
  },
]

function FooterDemoModal({
  label,
  footer,
}: {
  label: string
  footer: React.ReactNode
}) {
  return (
    <Modal size="lg">
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          {label}
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
            <div className="h-[200px] w-full" />
          </ModalBody>
        </ModalMain>
        {footer}
      </ModalContent>
    </Modal>
  )
}

const FooterVariantsSection = React.memo(function FooterVariantsSection() {
  return (
    <SectionFrame title="Footer variations (standard header + body)">
      <div className="flex flex-wrap gap-2 p-6">
        {footerVariants.map((v) => (
          <FooterDemoModal key={v.label} label={v.label} footer={v.footer} />
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Header — alignment × size × description (opened in a real Dialog context)
// ---------------------------------------------------------------------------

const aligns: ModalHeaderAlign[] = [
  "horizontal",
  "vertical-left",
  "vertical-center",
]

function DemoModal({
  align = "horizontal",
  size = "lg",
  description = true,
  backdrop,
  placement,
  label,
}: {
  align?: ModalHeaderAlign
  size?: Extract<ModalSize, "md" | "lg">
  description?: boolean
  backdrop?: ModalBackdropVariant
  placement?: ModalPlacement
  label: string
}) {
  return (
    <Modal size={size} backdrop={backdrop} placement={placement}>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          {label}
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
              {description && (
                <ModalDescription>
                  Please review the details and take action
                </ModalDescription>
              )}
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
            <Button variant="neutral-light" appearance="soft">
              Cancel
            </Button>
          </ModalClose>
          <Button variant="primary" appearance="solid">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const HeaderSection = React.memo(function HeaderSection() {
  return (
    <SectionFrame title="Header — alignment × size × description">
      <div className="flex flex-col gap-4 p-6">
        {(["lg", "md"] as const).map((size) => (
          <div key={size} className="space-y-2">
            <p className="text-disabled text-[9px] font-medium uppercase">
              {size}
            </p>
            <div className="flex flex-wrap gap-2">
              {aligns.map((align) => (
                <React.Fragment key={align}>
                  <DemoModal
                    align={align}
                    size={size}
                    description
                    label={`${align} · desc`}
                  />
                  <DemoModal
                    align={align}
                    size={size}
                    description={false}
                    label={align}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Backdrop — opaque · blur · transparent (styling filled in from Figma later)
// ---------------------------------------------------------------------------

const backdrops: ModalBackdropVariant[] = ["opaque", "blur", "transparent"]

const BackdropSection = React.memo(function BackdropSection() {
  return (
    <SectionFrame title="Backdrop — opaque · blur · transparent">
      <div className="flex flex-wrap gap-2 p-6">
        {backdrops.map((backdrop) => (
          <DemoModal key={backdrop} backdrop={backdrop} label={backdrop} />
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Sizes — sm · md · cover (cover fills the viewport minus a layout-sm gutter)
// ---------------------------------------------------------------------------

function SizeDemoModal({ size, label }: { size: ModalSize; label: string }) {
  const paragraphs = size === "cover" ? 18 : 8
  return (
    <Modal size={size}>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          {label}
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
            <div className="text-body text-body-sm space-y-4">
              {Array.from({ length: paragraphs }, (_, i) => (
                <p key={`p-${i}`}>
                  Modal body content goes here. Longer content scrolls inside
                  the body while the header and footer stay pinned.
                </p>
              ))}
            </div>
          </ModalBody>
        </ModalMain>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="neutral-light" appearance="soft">
              Cancel
            </Button>
          </ModalClose>
          <Button variant="primary" appearance="solid">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const SizesSection = React.memo(function SizesSection() {
  return (
    <SectionFrame title="Sizes — sm · md · cover">
      <div className="flex flex-wrap gap-2 p-6">
        <SizeDemoModal size="md" label="md" />
        <SizeDemoModal size="lg" label="lg" />
        <SizeDemoModal size="cover" label="cover" />
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Placement — auto · top · center · bottom (flex alignment in the padded box)
// ---------------------------------------------------------------------------

const placements: ModalPlacement[] = ["auto", "top", "center", "bottom"]

const PlacementSection = React.memo(function PlacementSection() {
  return (
    <SectionFrame title="Placement — auto · top · center · bottom">
      <div className="flex flex-wrap gap-2 p-6">
        {placements.map((placement) => (
          <DemoModal key={placement} placement={placement} label={placement} />
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Modal Icon — appearance × type × shape (color from the modal variant)
// ---------------------------------------------------------------------------

const appearances: ModalIconAppearance[] = [
  "solid",
  "soft",
  "neutral",
  "outline",
]
const types: ModalIconType[] = ["stylish", "plain"]
const shapes: ModalIconShape[] = ["rounded", "circle"]

// Variants implemented so far (filled in from Figma one at a time).
const doneVariants = [
  "primary",
  "neutral",
  "danger",
  "success",
  "warning",
  "info",
  "away",
] as const

const IconSection = React.memo(function IconSection() {
  return (
    <SectionFrame title="Modal Icon — variant × appearance × type × shape">
      <div className="flex flex-col gap-8 p-6">
        {doneVariants.map((variant) => (
          // Modal provides the variant/size context; no portal without ModalContent.
          <Modal key={variant} variant={variant} size="lg">
            <div className="space-y-3">
              <p className="text-strongest text-[11px] font-semibold uppercase">
                {variant}
              </p>
              {types.map((type) => (
                <div key={type} className="space-y-2">
                  <p className="text-disabled text-[9px] font-medium uppercase">
                    {type}
                  </p>
                  <div className="flex flex-wrap items-end gap-5">
                    {appearances.map((appearance) =>
                      shapes.map((shape) => (
                        <div
                          key={`${appearance}-${shape}`}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <ModalIcon
                            appearance={appearance}
                            type={type}
                            shape={shape}
                          >
                            <RiFlashlightFill />
                          </ModalIcon>
                          <span className="text-disabled text-[8px]">
                            {appearance}·{shape}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Modal>
        ))}
      </div>
    </SectionFrame>
  )
})

export default function ModalExample() {
  return (
    <div className="flex flex-col gap-16">
      <ProUpsellSection />
      <SuccessFormSection />
      <FooterVariantsSection />
      <HeaderSection />
      <BackdropSection />
      <SizesSection />
      <PlacementSection />
      <IconSection />
    </div>
  )
}
