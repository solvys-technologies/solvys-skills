import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSettings6Fill,
} from "@create-ui/assets/icons"

import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"

export default function ButtonGroupWithIcon() {
  return (
    <ButtonGroup>
      <ButtonGroupItem leading={<RiArrowLeftSLine />}>Previous</ButtonGroupItem>
      <ButtonGroupItem leading={<RiSettings6Fill />}>Settings</ButtonGroupItem>
      <ButtonGroupItem trailing={<RiArrowRightSLine />}>Next</ButtonGroupItem>
    </ButtonGroup>
  )
}
