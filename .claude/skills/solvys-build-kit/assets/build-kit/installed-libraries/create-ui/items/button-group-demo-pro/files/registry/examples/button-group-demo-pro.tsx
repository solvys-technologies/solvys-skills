import {
  RiBookmarkFill,
  RiGitForkLine,
  RiStarFill,
} from "@create-ui/assets/icons"

import { ButtonGroup, ButtonGroupItem } from "@/registry/pro/ui/button-group"
import { Badge } from "@/registry/ui/badge"

export default function ButtonGroupDemoPro() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <ButtonGroup variant="soft" orientation="vertical">
        <ButtonGroupItem leading={<RiStarFill />}>
          Star
          <Badge variant="warning" appearance="soft" size="xs">
            148
          </Badge>
        </ButtonGroupItem>
        <ButtonGroupItem leading={<RiGitForkLine />}>
          Fork
          <Badge variant="info" size="xs" numberOnly>
            12
          </Badge>
        </ButtonGroupItem>
        <ButtonGroupItem leading={<RiBookmarkFill />}>
          Save
          <Badge variant="primary" appearance="soft" size="xs" numberOnly>
            36
          </Badge>
        </ButtonGroupItem>
      </ButtonGroup>
    </div>
  )
}
