"use client"

import { InputTag, type InputTagOption } from "@/registry/pro/ui/input-tag"

const OPTIONS: InputTagOption[] = [
  { value: "UI Design", badge: "primary", meta: "24 uses" },
  { value: "Front-End Development", badge: "danger", meta: "14 uses" },
  { value: "Back-End Development", badge: "success", meta: "7 uses" },
  { value: "Branding", badge: "warning", meta: "4 uses" },
  { value: "Marketing Design", badge: "info", meta: "2 uses" },
  { value: "Prompt Engineer", badge: "highlighted", meta: "1 uses" },
]

export default function InputTagAutocomplete() {
  return (
    <div className="w-full max-w-md">
      <InputTag
        options={OPTIONS}
        defaultValue={["UX Research"]}
        placeholder="Add a tag..."
        aria-label="Tags"
      />
    </div>
  )
}
