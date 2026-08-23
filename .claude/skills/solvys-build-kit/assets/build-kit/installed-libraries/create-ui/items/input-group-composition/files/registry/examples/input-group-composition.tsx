import { RiSearch2Line } from "@create-ui/assets/icons"

import {
  InputGroupButton,
  InputGroupControl,
  InputGroupKbd,
  InputGroupProvider,
  InputGroupShell,
  InputGroupSlot,
} from "@/registry/ui/input-group"

export default function InputGroupComposition() {
  return (
    <InputGroupProvider>
      <InputGroupShell className="w-77 lg:w-sm">
        <InputGroupSlot>
          <RiSearch2Line />
          <InputGroupControl placeholder="Search anything…" />
          <InputGroupKbd>K</InputGroupKbd>
        </InputGroupSlot>
        <InputGroupButton>Search</InputGroupButton>
      </InputGroupShell>
    </InputGroupProvider>
  )
}
