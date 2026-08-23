"use client"

import { InputTag } from "@/registry/pro/ui/input-tag"

export default function InputTagOutside() {
  return (
    <div className="w-full max-w-md">
      <InputTag
        chips="outside"
        defaultValue={[
          "Design",
          "Development",
          "Project Management",
          "Marketing",
          "Invoicing",
          "Research",
        ]}
        placeholder="Type..."
      />
    </div>
  )
}
