"use client"

import * as React from "react"

import { Combobox } from "@/registry/ui/combobox"

export default function ComboboxCustomValue() {
  const [value, setValue] = React.useState("Growth")

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Combobox
        aria-label="Label"
        menuTrigger="focus"
        allowsCustomValue
        allowsEmptyCollection
        inputValue={value}
        onInputChange={setValue}
      >
        <Combobox.Input placeholder="Type or pick a label..." />
        <Combobox.Popover
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              {value.trim() ? (
                <>
                  Use <span className="text-body font-medium">“{value}”</span>
                </>
              ) : (
                "No label found"
              )}
            </p>
          )}
        >
          <Combobox.Item id="Bug">Bug</Combobox.Item>
          <Combobox.Item id="Feature">Feature</Combobox.Item>
          <Combobox.Item id="Documentation">Documentation</Combobox.Item>
          <Combobox.Item id="Design">Design</Combobox.Item>
          <Combobox.Item id="Chore">Chore</Combobox.Item>
        </Combobox.Popover>
      </Combobox>
      <p className="text-placeholder text-ui-control-sm">
        Selected:{" "}
        <span className="text-body font-medium">{value || "none"}</span>
      </p>
    </div>
  )
}
