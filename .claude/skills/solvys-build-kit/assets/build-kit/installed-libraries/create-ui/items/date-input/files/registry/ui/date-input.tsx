"use client"

import * as React from "react"
import { RiCalendarLine } from "@create-ui/assets/icons"

import { useDateInput, type DateOrder } from "@/registry/hooks/use-date-input"
import {
  InputGroup,
  InputGroupControl,
  InputGroupSlot,
} from "@/registry/ui/input-group"

type InputSize = "xs" | "sm" | "md"

function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node
    }
  }
}

type DateInputProps = Omit<
  React.ComponentProps<"input">,
  "size" | "value" | "defaultValue" | "onChange"
> & {
  defaultValue?: string
  order?: DateOrder
  onValueChange?: (iso: string, date: Date | null) => void
  size?: InputSize
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  showLeadingIcon?: boolean
  leading?: React.ReactNode
  className?: string
  ref?: React.Ref<HTMLInputElement>
}

function DateInput({
  ref,
  defaultValue,
  order = "DMY",
  onValueChange,
  size,
  invalid,
  disabled,
  loading,
  showLeadingIcon = true,
  leading = <RiCalendarLine />,
  placeholder,
  className,
  ...inputProps
}: DateInputProps) {
  const onValueChangeRef = React.useRef(onValueChange)
  onValueChangeRef.current = onValueChange

  const date = useDateInput({
    defaultValue,
    order,
    onValueChange: (iso) =>
      onValueChangeRef.current?.(iso, iso ? new Date(iso) : null),
  })

  return (
    <InputGroup
      size={size}
      invalid={invalid}
      disabled={disabled}
      loading={loading}
      className={className}
    >
      <InputGroupSlot>
        {showLeadingIcon ? leading : null}
        <InputGroupControl
          ref={mergeRefs(date.ref, ref)}
          inputMode={date.inputMode}
          placeholder={placeholder ?? date.placeholder}
          {...inputProps}
        />
      </InputGroupSlot>
    </InputGroup>
  )
}

export { DateInput }
export type { DateInputProps }
export type { DateOrder } from "@/registry/hooks/use-date-input"
