"use client"

import { InputTag } from "@/registry/pro/ui/input-tag"

const TAGS = ["Design", "Development", "Project Management"]

export default function InputTagSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <InputTag size="md" defaultValue={TAGS} placeholder="Type..." />
      <InputTag size="sm" defaultValue={TAGS} placeholder="Type..." />
      <InputTag size="xs" defaultValue={TAGS} placeholder="Type..." />
    </div>
  )
}
