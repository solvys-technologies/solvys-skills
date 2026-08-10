import {
  RiArticleLine,
  RiLayoutGridLine,
  RiListView,
  RiMacbookLine,
} from "@create-ui/assets/icons"

import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <ButtonGroup variant="soft">
        <ButtonGroupItem leading={<RiLayoutGridLine />}>Grid</ButtonGroupItem>
        <ButtonGroupItem leading={<RiArticleLine />}>Feed</ButtonGroupItem>
        <ButtonGroupItem leading={<RiMacbookLine />} active>
          Stack
        </ButtonGroupItem>
        <ButtonGroupItem leading={<RiListView />}>List</ButtonGroupItem>
      </ButtonGroup>
    </div>
  )
}
