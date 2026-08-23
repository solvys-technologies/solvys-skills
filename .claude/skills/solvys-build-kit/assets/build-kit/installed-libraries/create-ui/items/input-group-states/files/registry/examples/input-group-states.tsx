import { RiMailOpenLine } from "@create-ui/assets/icons"

import { Field, FieldLabel } from "@/registry/ui/field"
import {
  InputGroup,
  InputGroupControl,
  InputGroupLeadingIcon,
  InputGroupSlot,
} from "@/registry/ui/input-group"

export default function InputGroupStates() {
  return (
    <div className="flex w-77 flex-col gap-10 py-4 lg:w-sm">
      <Field>
        <FieldLabel htmlFor="input-group-states-default">Default</FieldLabel>
        <InputGroup>
          <InputGroupLeadingIcon>
            <RiMailOpenLine />
          </InputGroupLeadingIcon>
          <InputGroupSlot>
            <InputGroupControl
              id="input-group-states-default"
              placeholder="hi@createui.co"
            />
          </InputGroupSlot>
        </InputGroup>
      </Field>
      <Field invalid>
        <FieldLabel htmlFor="input-group-states-invalid">Invalid</FieldLabel>
        <InputGroup>
          <InputGroupLeadingIcon>
            <RiMailOpenLine />
          </InputGroupLeadingIcon>
          <InputGroupSlot>
            <InputGroupControl
              id="input-group-states-invalid"
              defaultValue="not-an-email"
            />
          </InputGroupSlot>
        </InputGroup>
      </Field>
      <Field disabled>
        <FieldLabel htmlFor="input-group-states-disabled">Disabled</FieldLabel>
        <InputGroup>
          <InputGroupLeadingIcon>
            <RiMailOpenLine />
          </InputGroupLeadingIcon>
          <InputGroupSlot>
            <InputGroupControl
              id="input-group-states-disabled"
              placeholder="hi@createui.co"
            />
          </InputGroupSlot>
        </InputGroup>
      </Field>
      <Field loading>
        <FieldLabel htmlFor="input-group-states-loading">Loading</FieldLabel>
        <InputGroup>
          <InputGroupLeadingIcon>
            <RiMailOpenLine />
          </InputGroupLeadingIcon>
          <InputGroupSlot>
            <InputGroupControl
              id="input-group-states-loading"
              placeholder="Checking availability…"
            />
          </InputGroupSlot>
        </InputGroup>
      </Field>
    </div>
  )
}
