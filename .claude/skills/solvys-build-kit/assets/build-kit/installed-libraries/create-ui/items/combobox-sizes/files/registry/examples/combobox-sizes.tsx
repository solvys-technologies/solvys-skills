"use client"

import { Combobox, type ComboboxSize } from "@/registry/ui/combobox"

function SizeCombobox({ size, width }: { size: ComboboxSize; width: string }) {
  return (
    <Combobox
      size={size}
      aria-label={`Currency (${size})`}
      menuTrigger="focus"
      defaultValue="usd"
      className={width}
    >
      <Combobox.Input placeholder="Search currency..." />
      <Combobox.Popover>
        <Combobox.Item id="usd">US Dollar</Combobox.Item>
        <Combobox.Item id="eur">Euro</Combobox.Item>
        <Combobox.Item id="gbp">British Pound</Combobox.Item>
        <Combobox.Item id="jpy">Japanese Yen</Combobox.Item>
      </Combobox.Popover>
    </Combobox>
  )
}

export default function ComboboxSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <SizeCombobox size="xs" width="w-full" />
      <SizeCombobox size="sm" width="w-full" />
      <SizeCombobox size="md" width="w-full" />
    </div>
  )
}
