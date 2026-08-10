"use client"

import { useState } from "react"
import { RiErrorWarningFill, RiInformationFill } from "@create-ui/assets/icons"

import { Example, ExampleWrapper } from "@/registry/components/example"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldHelper,
  FieldLabel,
} from "@/registry/ui/field"
import {
  LabelBlock,
  LabelCount,
  LabelMain,
  LabelOptional,
  LabelRequired,
} from "@/registry/ui/label"
import { Textarea } from "@/registry/ui/textarea"

export default function TextareaExample() {
  return (
    <ExampleWrapper>
      <TextareaBasic />
      <TextareaWithLabel />
      <TextareaWithHelper />
      <TextareaWithDescription />
      <TextareaInvalid />
      <TextareaLoading />
      <TextareaDisabled />
      <TextareaResizable />
      <TextareaSizes />
    </ExampleWrapper>
  )
}

function TextareaBasic() {
  return (
    <Example title="Basic">
      <Textarea placeholder="Write something..." />
    </Example>
  )
}

function TextareaWithLabel() {
  return (
    <Example title="With Label">
      <Field>
        <FieldLabel htmlFor="textarea-label">
          Bio <LabelRequired />
        </FieldLabel>
        <Textarea id="textarea-label" placeholder="Tell us about yourself" />
      </Field>
    </Example>
  )
}

const MAX_LENGTH = 300

function TextareaWithHelper() {
  const [value, setValue] = useState("")

  return (
    <Example title="With Helper">
      <Field>
        <LabelBlock>
          <LabelMain>
            <FieldLabel htmlFor="textarea-helper">
              Message <LabelOptional />
            </FieldLabel>
          </LabelMain>
          <LabelCount>
            {value.length}/{MAX_LENGTH}
          </LabelCount>
        </LabelBlock>
        <Textarea
          id="textarea-helper"
          placeholder="Write your message..."
          maxLength={MAX_LENGTH}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <FieldHelper icon={<RiInformationFill />}>
          Helper hint text for you.
        </FieldHelper>
      </Field>
    </Example>
  )
}

function TextareaWithDescription() {
  return (
    <Example title="With Description">
      <Field>
        <FieldLabel htmlFor="textarea-feedback">Feedback</FieldLabel>
        <Textarea id="textarea-feedback" placeholder="Share your thoughts..." />
        <FieldDescription>
          Your feedback helps us improve the product.
        </FieldDescription>
      </Field>
    </Example>
  )
}

function TextareaInvalid() {
  return (
    <Example title="Invalid">
      <Field invalid>
        <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
        <Textarea
          id="textarea-invalid"
          aria-invalid="true"
          placeholder="Enter your message"
          defaultValue="Too short."
        />
        <FieldHelper icon={<RiErrorWarningFill />}>
          Message must be at least 20 characters.
        </FieldHelper>
      </Field>
    </Example>
  )
}

function TextareaLoading() {
  return (
    <Example title="Loading">
      <Field loading>
        <FieldLabel htmlFor="textarea-loading">Notes</FieldLabel>
        <Textarea
          id="textarea-loading"
          placeholder="Loading..."
          defaultValue="Saving your draft…"
        />
        <FieldHelper icon={<RiInformationFill />}>
          Helper hint text for you.
        </FieldHelper>
      </Field>
    </Example>
  )
}

function TextareaDisabled() {
  return (
    <Example title="Disabled">
      <Field disabled>
        <FieldLabel htmlFor="textarea-disabled">Notes</FieldLabel>
        <Textarea id="textarea-disabled" disabled placeholder="Not available" />
        <FieldHelper icon={<RiInformationFill />}>
          Helper hint text for you.
        </FieldHelper>
      </Field>
    </Example>
  )
}

function TextareaResizable() {
  return (
    <Example title="Resizable">
      <Field>
        <FieldLabel htmlFor="textarea-resizable">Notes</FieldLabel>
        <Textarea
          id="textarea-resizable"
          placeholder="Drag the corner to resize..."
          resizable="y"
        />
        <FieldHelper icon={<RiInformationFill />}>
          You can resize this textarea vertically.
        </FieldHelper>
      </Field>
    </Example>
  )
}

function TextareaSizes() {
  return (
    <Example title="Sizes">
      <FieldGroup>
        {(["xs", "sm", "md"] as const).map((size) => (
          <Field key={size} size={size}>
            <FieldLabel htmlFor={`textarea-size-${size}`}>
              Text Area <LabelRequired /> <LabelOptional />
            </FieldLabel>
            <Textarea
              id={`textarea-size-${size}`}
              placeholder={`${size.toUpperCase()} size placeholder...`}
            />
            <FieldHelper icon={<RiInformationFill />}>
              Helper hint text for you.
            </FieldHelper>
          </Field>
        ))}
      </FieldGroup>
    </Example>
  )
}
