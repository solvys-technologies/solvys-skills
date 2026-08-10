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

const paragraphs = [
  "Create UI ships a single unified styling system with themes applied on top, so every surface stays consistent across light and dark.",
  "Modals cascade their size from the root, which means the header, body, and footer all scale together without any extra wiring.",
  "The icon color is derived from the modal variant, while its size is derived from the modal size, keeping the API small.",
  "Footer buttons are composed as children, giving you full control over labels, variants, and ordering.",
  "The corner close button can be toggled per content, and any element can become a close trigger via ModalClose.",
  "Backdrops support opaque, blur, and transparent treatments to match the weight of the interaction.",
  "Placement can snap to top, center, or bottom, or follow the auto heuristic based on available space.",
  "Long bodies scroll independently of the header and footer, which stay pinned to the tray.",
  "Radix primitives power focus trapping, scroll locking, and accessible labelling out of the box.",
  "Semantic tokens drive spacing and color so designs stay faithful to the Figma source of truth.",
  "Compose, do not reroll: every composite is built from registry primitives rather than raw elements.",
  "When in doubt, set the size once on the root and let the rest of the modal follow along automatically.",
]

function SizedModal({ size }: { size: "md" | "lg" | "cover" }) {
  const footerSize = size === "md" ? "md" : "lg"
  const isCover = size === "cover"

  return (
    <Modal size={size}>
      <ModalTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          {size}
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
            {isCover ? (
              <div className="gap-component-md flex flex-col">
                {paragraphs.map((text, index) => (
                  <p key={index} className="text-body text-body-sm">
                    {text}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-body text-body-sm">
                This is a {size} modal. Confirm to proceed or cancel to dismiss.
              </p>
            )}
          </ModalBody>
        </ModalMain>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="neutral-light" appearance="soft" size={footerSize}>
              Cancel
            </Button>
          </ModalClose>
          <Button variant="primary" appearance="solid" size={footerSize}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function ModalSizes() {
  return (
    <div className="gap-component-sm flex flex-wrap items-center">
      <SizedModal size="md" />
      <SizedModal size="lg" />
      <SizedModal size="cover" />
    </div>
  )
}
