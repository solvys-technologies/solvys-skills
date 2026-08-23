import { RiToolsFill } from "@create-ui/assets/icons"

import {
  Label,
  LabelBlock,
  LabelDescription,
  LabelIcon,
  LabelMain,
} from "@/registry/ui/label"

export default function LabelDescriptionExample() {
  return (
    <LabelBlock size="sm" className="w-full max-w-xs">
      <LabelMain>
        <Label>
          <LabelIcon>
            <RiToolsFill />
          </LabelIcon>
          Preferred editor
        </Label>
        <LabelDescription>
          Used to pre-select your editor in tutorials and snippets.
        </LabelDescription>
      </LabelMain>
    </LabelBlock>
  )
}
