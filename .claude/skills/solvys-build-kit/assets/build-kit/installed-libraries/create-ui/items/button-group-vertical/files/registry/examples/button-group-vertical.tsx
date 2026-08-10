import {
  RiBankCardLine,
  RiBold,
  RiItalic,
  RiSettings6Fill,
  RiUnderline,
  RiUserLine,
} from "@create-ui/assets/icons"

import { ButtonGroup, ButtonGroupItem } from "@/registry/pro/ui/button-group"

export default function ButtonGroupVertical() {
  return (
    <div className="flex flex-row items-start gap-8">
      {/* Vertical nav-style group with labels. */}
      <ButtonGroup variant="soft" orientation="vertical" size="md">
        <ButtonGroupItem leading={<RiUserLine />}>Profile</ButtonGroupItem>
        <ButtonGroupItem leading={<RiBankCardLine />} active>
          Billing
        </ButtonGroupItem>
        <ButtonGroupItem leading={<RiSettings6Fill />}>
          Settings
        </ButtonGroupItem>
      </ButtonGroup>
      {/* Vertical icon-only toolbar. */}
      <ButtonGroup variant="soft" orientation="vertical" size="md">
        <ButtonGroupItem iconOnly aria-label="Bold">
          <RiBold />
        </ButtonGroupItem>
        <ButtonGroupItem iconOnly aria-label="Italic" active>
          <RiItalic />
        </ButtonGroupItem>
        <ButtonGroupItem iconOnly aria-label="Underline">
          <RiUnderline />
        </ButtonGroupItem>
      </ButtonGroup>
    </div>
  )
}
