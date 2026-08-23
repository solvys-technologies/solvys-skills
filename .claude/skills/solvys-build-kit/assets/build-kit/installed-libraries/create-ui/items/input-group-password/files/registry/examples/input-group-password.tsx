import { RiLock2Line } from "@create-ui/assets/icons"

import { Field, FieldLabel } from "@/registry/ui/field"
import {
  InputGroup,
  InputGroupControl,
  InputGroupSlot,
} from "@/registry/ui/input-group"

export default function InputGroupPassword() {
  return (
    <Field className="w-77 lg:w-sm">
      <FieldLabel htmlFor="input-group-password-input">Password</FieldLabel>
      <InputGroup>
        <InputGroupSlot>
          <RiLock2Line />
          <InputGroupControl
            id="input-group-password-input"
            type="password"
            placeholder="••••••••••••"
            defaultValue="mysecretpassword"
          />
        </InputGroupSlot>
      </InputGroup>
    </Field>
  )
}
