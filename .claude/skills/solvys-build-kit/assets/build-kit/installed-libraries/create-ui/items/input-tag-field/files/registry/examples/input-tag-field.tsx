"use client"

import { InputTag } from "@/registry/pro/ui/input-tag"
import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field"

export default function InputTagField() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel>Topics</FieldLabel>
      <InputTag
        name="topics"
        defaultValue={["Design", "Engineering"]}
        placeholder="Add a topic..."
      />
      <FieldDescription>
        Press Enter or comma to add a topic. Backspace on an empty field removes
        the last one.
      </FieldDescription>
    </Field>
  )
}
