import { RiSearch2Line } from "@create-ui/assets/icons"

import {
  InputGroup,
  InputGroupControl,
  InputGroupKbd,
  InputGroupSlot,
} from "@/registry/ui/input-group"

export default function InputGroupWithKbd() {
  return (
    <InputGroup className="w-77 lg:w-sm">
      <InputGroupSlot>
        <RiSearch2Line />
        <InputGroupControl placeholder="Search anything…" />
        <InputGroupKbd>K</InputGroupKbd>
      </InputGroupSlot>
    </InputGroup>
  )
}
