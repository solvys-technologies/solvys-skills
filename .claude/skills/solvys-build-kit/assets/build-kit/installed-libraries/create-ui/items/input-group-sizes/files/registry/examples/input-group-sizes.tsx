import { RiMailOpenLine } from "@create-ui/assets/icons"

import { Field, FieldLabel } from "@/registry/ui/field"
import {
  InputGroup,
  InputGroupControl,
  InputGroupLeadingIcon,
  InputGroupSlot,
} from "@/registry/ui/input-group"

export default function InputGroupSizes() {
  return (
    <div className="flex flex-col items-start gap-6">
      <Field size="xs" className="w-60">
        <FieldLabel htmlFor="input-group-sizes-xs">Extra Small</FieldLabel>
        <InputGroup>
          <InputGroupLeadingIcon>
            <RiMailOpenLine />
          </InputGroupLeadingIcon>
          <InputGroupSlot>
            <InputGroupControl
              id="input-group-sizes-xs"
              placeholder="hi@createui.co"
            />
          </InputGroupSlot>
        </InputGroup>
      </Field>
      <Field size="sm" className="w-72">
        <FieldLabel htmlFor="input-group-sizes-sm">Small</FieldLabel>
        <InputGroup>
          <InputGroupLeadingIcon>
            <RiMailOpenLine />
          </InputGroupLeadingIcon>
          <InputGroupSlot>
            <InputGroupControl
              id="input-group-sizes-sm"
              placeholder="hi@createui.co"
            />
          </InputGroupSlot>
        </InputGroup>
      </Field>
      <Field size="md" className="w-77 lg:w-96">
        <FieldLabel htmlFor="input-group-sizes-md">Medium</FieldLabel>
        <InputGroup>
          <InputGroupLeadingIcon>
            <RiMailOpenLine />
          </InputGroupLeadingIcon>
          <InputGroupSlot>
            <InputGroupControl
              id="input-group-sizes-md"
              placeholder="hi@createui.co"
            />
          </InputGroupSlot>
        </InputGroup>
      </Field>
    </div>
  )
}
