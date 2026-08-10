"use client"

import { useState } from "react"
import { RiInformationFill } from "@create-ui/assets/icons"

import { Field, FieldHelper, FieldLabel } from "@/registry/ui/field"
import {
  LabelBlock,
  LabelCount,
  LabelMain,
  LabelOptional,
} from "@/registry/ui/label"
import { Textarea } from "@/registry/ui/textarea"

const MAX_LENGTH = 300

export default function TextareaWithHelper() {
  const [value, setValue] = useState("")

  return (
    <Field className="lg:w-100">
      <LabelBlock>
        <LabelMain>
          <FieldLabel htmlFor="textarea-with-helper">
            Message <LabelOptional />
          </FieldLabel>
        </LabelMain>
        <LabelCount>
          {value.length}/{MAX_LENGTH}
        </LabelCount>
      </LabelBlock>
      <Textarea
        id="textarea-with-helper"
        placeholder="Write your message..."
        maxLength={MAX_LENGTH}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FieldHelper icon={<RiInformationFill />}>
        Helper hint text for you.
      </FieldHelper>
    </Field>
  )
}
