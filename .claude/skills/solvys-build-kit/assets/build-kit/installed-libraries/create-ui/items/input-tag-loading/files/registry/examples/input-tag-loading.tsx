"use client"

import { InputTag } from "@/registry/pro/ui/input-tag"

export default function InputTagLoading() {
  return (
    <div className="w-full max-w-md">
      <InputTag
        defaultValue={["Design", "Development", "Project Management"]}
        placeholder="Type..."
        isLoading
      />
    </div>
  )
}
