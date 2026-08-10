import { RiSearch2Line } from "@create-ui/assets/icons"

import { Field, FieldLabel } from "@/registry/ui/field"
import {
  InputGroup,
  InputGroupButton,
  InputGroupControl,
  InputGroupSlot,
} from "@/registry/ui/input-group"

export default function InputGroupWithButton() {
  return (
    <Field className="w-77 lg:w-sm">
      <FieldLabel htmlFor="input-group-with-button-search">Search</FieldLabel>
      <InputGroup>
        <InputGroupSlot>
          <RiSearch2Line />
          <InputGroupControl
            id="input-group-with-button-search"
            type="search"
            placeholder="Search anything…"
          />
        </InputGroupSlot>
        <InputGroupButton>Search</InputGroupButton>
      </InputGroup>
    </Field>
  )
}
