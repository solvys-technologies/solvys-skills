import { RiFileCopyLine, RiGlobalLine } from "@create-ui/assets/icons"

import { Field, FieldLabel } from "@/registry/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupControl,
  InputGroupSlot,
} from "@/registry/ui/input-group"

export default function InputGroupWithAddon() {
  return (
    <Field className="w-77 lg:w-sm">
      <FieldLabel htmlFor="input-group-addon-website">Website</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <RiGlobalLine />
          <span>https://</span>
        </InputGroupAddon>
        <InputGroupSlot>
          <InputGroupControl
            id="input-group-addon-website"
            placeholder="createui.co"
          />
        </InputGroupSlot>
        <InputGroupButton iconOnly aria-label="Copy URL">
          <RiFileCopyLine />
        </InputGroupButton>
      </InputGroup>
    </Field>
  )
}
