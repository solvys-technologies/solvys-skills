"use client"

import * as React from "react"

import { InputTag } from "@/registry/pro/ui/input-tag"
import { Field, FieldError, FieldLabel } from "@/registry/ui/field"

const MAX_TAGS = 5

export default function InputTagMax() {
  const [tags, setTags] = React.useState([
    "Design",
    "Development",
    "Project Management",
    "Marketing",
    "Invoicing",
    "Research",
  ])
  const overLimit = tags.length > MAX_TAGS

  return (
    <Field className="w-full max-w-md" invalid={overLimit}>
      <FieldLabel>Enter Your Categories</FieldLabel>
      <InputTag
        value={tags}
        onChange={setTags}
        max={MAX_TAGS}
        placeholder="Type..."
      />
      {overLimit ? (
        <FieldError>You can select max {MAX_TAGS} tags.</FieldError>
      ) : null}
    </Field>
  )
}
