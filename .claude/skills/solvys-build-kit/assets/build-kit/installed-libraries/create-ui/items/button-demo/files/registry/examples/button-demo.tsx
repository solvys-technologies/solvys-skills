import {
  RiAddLine,
  RiArrowLeftSLine,
  RiDeleteBin6Line,
  RiDownloadLine,
  RiEdit2Line,
} from "@create-ui/assets/icons"

import { Button, ButtonLabel } from "@/registry/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-col flex-wrap items-center gap-6">
      <div className="item-center flex gap-2">
        <Button variant="neutral-light" appearance="soft" size="md">
          <RiAddLine />
          <ButtonLabel>Keep Article</ButtonLabel>
        </Button>
        <Button variant="danger" appearance="soft" size="md">
          <RiDeleteBin6Line />
          <ButtonLabel>Delete</ButtonLabel>
        </Button>
      </div>
      <div className="item-center flex gap-2">
        <Button variant="neutral-light" appearance="outline" size="md">
          <RiArrowLeftSLine />
          <ButtonLabel>Back</ButtonLabel>
        </Button>
        <Button variant="primary" appearance="soft" size="md">
          <ButtonLabel>Export PDF</ButtonLabel>
          <RiDownloadLine />
        </Button>
        <Button variant="primary" appearance="solid" size="md" loading>
          <ButtonLabel>Publish</ButtonLabel>
        </Button>
      </div>
      <div className="item-center flex gap-2">
        <Button variant="neutral-light" appearance="soft" size="md">
          <ButtonLabel>Cancel</ButtonLabel>
        </Button>
        <Button variant="neutral-solid" appearance="solid" size="md">
          <ButtonLabel>Save Changes</ButtonLabel>
        </Button>
        <Button variant="neutral-solid" appearance="outline" size="md" iconOnly>
          <RiEdit2Line />
        </Button>
      </div>
    </div>
  )
}
