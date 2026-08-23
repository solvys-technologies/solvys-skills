import { RiMailOpenLine } from "@create-ui/assets/icons"

import { Field, FieldLabel } from "@/registry/ui/field"
import {
  InputGroup,
  InputGroupControl,
  InputGroupLeadingIcon,
  InputGroupSlot,
} from "@/registry/ui/input-group"

export default function InputGroupWithLeadingIcon() {
  return (
    <Field className="w-77 lg:w-sm">
      <FieldLabel htmlFor="input-group-leading-icon-email">Email</FieldLabel>
      <InputGroup>
        <InputGroupLeadingIcon>
          <RiMailOpenLine />
        </InputGroupLeadingIcon>
        <InputGroupSlot>
          <InputGroupControl
            id="input-group-leading-icon-email"
            type="email"
            placeholder="hi@createui.co"
          />
        </InputGroupSlot>
      </InputGroup>
    </Field>
  )
}
