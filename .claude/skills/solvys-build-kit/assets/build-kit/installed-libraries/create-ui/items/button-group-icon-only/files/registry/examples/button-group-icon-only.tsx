import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiUnderline,
} from "@create-ui/assets/icons"

import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"

export default function ButtonGroupIconOnly() {
  return (
    <ButtonGroup>
      <ButtonGroupItem iconOnly aria-label="Bold" active>
        <RiBold />
      </ButtonGroupItem>
      <ButtonGroupItem iconOnly aria-label="Italic">
        <RiItalic />
      </ButtonGroupItem>
      <ButtonGroupItem iconOnly aria-label="Underline">
        <RiUnderline />
      </ButtonGroupItem>
      <ButtonGroupItem iconOnly aria-label="Strikethrough">
        <RiStrikethrough />
      </ButtonGroupItem>
    </ButtonGroup>
  )
}
