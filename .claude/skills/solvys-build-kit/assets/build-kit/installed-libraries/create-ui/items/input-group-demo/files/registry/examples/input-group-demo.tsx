import { RiSearch2Line } from "@create-ui/assets/icons"

import {
  InputGroup,
  InputGroupButton,
  InputGroupControl,
  InputGroupKbd,
  InputGroupSlot,
} from "@/registry/ui/input-group"

export default function InputGroupDemo() {
  return (
    <InputGroup className="w-77 lg:w-sm">
      <InputGroupSlot>
        <RiSearch2Line />
        <InputGroupControl placeholder="Search anything…" />
        <InputGroupKbd>K</InputGroupKbd>
      </InputGroupSlot>
      <InputGroupButton>Search</InputGroupButton>
    </InputGroup>
  )
}
