"use client"

import * as React from "react"

import { Chip } from "@/registry/ui/chip"

const initialTags = ["Design", "Engineering", "Marketing", "Sales"]

export default function ChipClosable() {
  const [tags, setTags] = React.useState(initialTags)

  if (tags.length === 0) {
    return (
      <button
        type="button"
        onClick={() => setTags(initialTags)}
        className="text-ui-control-sm text-info-base font-medium hover:underline"
      >
        Reset
      </button>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <Chip
          key={tag}
          variant="info"
          appearance="soft"
          onClose={() => setTags((prev) => prev.filter((t) => t !== tag))}
        >
          {tag}
        </Chip>
      ))}
    </div>
  )
}
